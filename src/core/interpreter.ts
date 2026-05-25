import { Step, ITask, ICtx, STEP_END } from "./step";
import { TaskConfig, StepConfig, ActionConfig, ConditionConfig, TextTargetConfig, ColorTargetConfig, HasTextCondition, HasColorCondition } from "./config_types";
import { ClickHelper } from "../utils/click";
import { ScreenHelper, MultiColorTarget } from "../utils/screen";
import { Logger } from "../utils/logger";
import { OcrHelper, TextTarget } from "../utils/ocr";
import { createBaseSteps, isLobbyConfirmed } from "../tasks/game_base";
import { getConfig } from "../config/loader";
import { BaseTask } from "../tasks/base_task";
import { recycleImage } from "../utils/image";

const TAG = "Interpreter";

function toTextTarget(cfg: TextTargetConfig): TextTarget {
    return TextTarget({ desc: cfg.text, text: cfg.text, region: cfg.region });
}

function toMultiColorTarget(cfg: ColorTargetConfig): MultiColorTarget {
    return MultiColorTarget({ desc: cfg.firstColor as string, firstColor: cfg.firstColor, paths: cfg.paths, region: cfg.region });
}

function isTextTargetConfig(target: any): target is TextTargetConfig {
    return target && typeof target.text === "string";
}

function isColorTargetConfig(target: any): target is ColorTargetConfig {
    return target && typeof target.firstColor === "string";
}

function resolveTextTarget(condition: HasTextCondition, config: TaskConfig): TextTarget | null {
    if (condition.text) {
        return TextTarget({ desc: condition.text, text: condition.text, region: condition.region });
    }
    if (condition.target) {
        const targetCfg = config.targets?.[condition.target];
        if (!targetCfg || !isTextTargetConfig(targetCfg)) return null;
        return toTextTarget(targetCfg);
    }
    return null;
}

function resolveExactFlag(condition: HasTextCondition, config: TaskConfig): boolean {
    if (condition.exact !== undefined) return condition.exact;
    if (condition.target) {
        const targetCfg = config.targets?.[condition.target];
        if (targetCfg && isTextTargetConfig(targetCfg)) return targetCfg.exact ?? false;
    }
    return false;
}

function resolveColorConfig(condition: HasColorCondition, config: TaskConfig): MultiColorTarget | null {
    if (condition.firstColor && condition.paths) {
        return MultiColorTarget({ desc: condition.firstColor as string, firstColor: condition.firstColor, paths: condition.paths, region: condition.colorRegion });
    }
    if (condition.colorConfig) {
        const colorCfg = config.targets?.[condition.colorConfig];
        if (!colorCfg || !isColorTargetConfig(colorCfg)) return null;
        return toMultiColorTarget(colorCfg);
    }
    return null;
}

class ConditionEvaluator {
    static evaluate(condition: ConditionConfig, config: TaskConfig): () => boolean {
        switch (condition.type) {
            case "hasText": {
                const target = resolveTextTarget(condition, config);
                if (!target) return () => false;
                const exact = resolveExactFlag(condition, config);
                if (exact) {
                    return () => OcrHelper.hasTextExact(target);
                }
                return () => OcrHelper.hasText(target);
            }
            case "hasColor": {
                const mcConfig = resolveColorConfig(condition, config);
                if (!mcConfig) return () => false;
                return () => ScreenHelper.findMultiColors(mcConfig) !== null;
            }
            case "always":
                return () => true;
            case "home":
                return () => {
                    try {
                        return isLobbyConfirmed();
                    } catch {
                        return false;
                    }
                };
        }
    }

    static check(condition: ConditionConfig, config: TaskConfig): boolean {
        return ConditionEvaluator.evaluate(condition, config)();
    }

    static checkWithImg(condition: ConditionConfig, config: TaskConfig, img: Image): boolean {
        if (condition.type === "hasText") {
            const target = resolveTextTarget(condition, config);
            if (!target) return false;
            const exact = resolveExactFlag(condition, config);
            if (exact) {
                return OcrHelper.hasTextExact(target, img);
            }
            return OcrHelper.hasText(target, img);
        }
        if (condition.type === "hasColor") {
            const mcConfig = resolveColorConfig(condition, config);
            if (!mcConfig) return false;
            return ScreenHelper.findMultiColorsInImg(img, mcConfig) !== null;
        }
        if (condition.type === "always") return true;
        if (condition.type === "home") return ConditionEvaluator.evaluate(condition, config)();
        return false;
    }
}

class ActionExecutor {
    static execute(
        action: ActionConfig,
        config: TaskConfig,
        step: ConfigDrivenStep,
        ctx: ICtx,
        task: ITask
    ): void {
        switch (action.type) {
            case "tap": {
                if (action.x !== undefined && action.y !== undefined) {
                    ClickHelper.tap(action.x, action.y);
                } else if (action.position) {
                    const pos = config.positions?.[action.position];
                    if (!pos) {
                        Logger.error(TAG, `position "${action.position}" 未定义`);
                        return;
                    }
                    ClickHelper.tap(pos.x, pos.y);
                } else {
                    Logger.error(TAG, "tap 动作缺少坐标: 需要提供 x/y 或 position");
                    return;
                }
                if (action.delay) sleep(action.delay);
                break;
            }
            case "tapByText": {
                let target: TextTarget | null = null;
                let exact = false;
                if (action.text) {
                    target = { desc: action.text, text: action.text };
                    if (action.region) target.region = action.region;
                    exact = action.exact ?? false;
                } else if (action.target) {
                    const targetCfg = config.targets?.[action.target];
                    if (!targetCfg || !isTextTargetConfig(targetCfg)) {
                        Logger.error(TAG, `target "${action.target}" 未定义或非文字目标`);
                        return;
                    }
                    target = toTextTarget(targetCfg);
                    exact = targetCfg.exact ?? false;
                } else {
                    Logger.error(TAG, "tapByText 动作缺少文字: 需要提供 text 或 target");
                    return;
                }
                if (exact) {
                    ClickHelper.tapByText(target);
                } else {
                    ClickHelper.tapByText(target);
                }
                if (action.delay) sleep(action.delay);
                break;
            }
            case "noop":
                break;
            case "branchByText": {
                const img = ScreenHelper.tryCapture();
                if (!img) {
                    if (action.defaultNext) step.setDynamicNext(action.defaultNext);
                    return;
                }
                try {
                    let matched = false;
                    for (const branch of action.branches) {
                        let branchTarget: TextTarget | null = null;
                        let branchExact = false;
                        if (branch.text) {
                            branchTarget = { desc: branch.text, text: branch.text };
                            if (branch.region) branchTarget.region = branch.region;
                            branchExact = branch.exact ?? false;
                        } else if (branch.target) {
                            const targetCfg = config.targets?.[branch.target];
                            if (!targetCfg || !isTextTargetConfig(targetCfg)) continue;
                            branchTarget = toTextTarget(targetCfg);
                            branchExact = targetCfg.exact ?? false;
                        } else {
                            continue;
                        }
                        const matchFn = branchExact ? OcrHelper.hasTextExact : OcrHelper.hasText;
                        if (matchFn(branchTarget, img)) {
                            Logger.info(TAG, `分支匹配: ${branch.text ?? branch.target}`);
                            matched = true;
                            if (branch.then) {
                                ActionExecutor.execute(branch.then, config, step, ctx, task);
                            }
                            if (branch.next) {
                                step.setDynamicNext(branch.next);
                            }
                            return;
                        }
                    }
                    if (!matched && action.defaultNext) {
                        Logger.info(TAG, `无匹配分支，走默认: ${action.defaultNext}`);
                        step.setDynamicNext(action.defaultNext);
                    }
                } finally {
                    recycleImage(img);
                }
                break;
            }
            case "tapIfColor": {
                let mcConfig: MultiColorTarget | null = null;
                if (action.firstColor && action.paths) {
                    mcConfig = MultiColorTarget({ desc: action.firstColor as string, firstColor: action.firstColor, paths: action.paths, region: action.colorRegion });
                } else if (action.colorConfig) {
                    const colorCfg = config.targets?.[action.colorConfig];
                    if (!colorCfg || !isColorTargetConfig(colorCfg)) {
                        Logger.error(TAG, `colorConfig "${action.colorConfig}" 未定义或非颜色目标`);
                        return;
                    }
                    mcConfig = toMultiColorTarget(colorCfg);
                } else {
                    Logger.error(TAG, "tapIfColor 动作缺少颜色配置: 需要提供 firstColor/paths 或 colorConfig");
                    return;
                }
                const result = ScreenHelper.findMultiColors(mcConfig);
                if (result) {
                    Logger.info(TAG, "颜色匹配成功，点击");
                    ClickHelper.tap(result.x, result.y);
                    sleep(1000);
                } else {
                    Logger.info(TAG, "颜色未匹配，跳过");
                }
                break;
            }
            case "backUntil": {
                for (let i = 0; i < action.maxAttempts; i++) {
                    if (ConditionEvaluator.check(action.condition, config)) {
                        Logger.info(TAG, "backUntil 条件满足");
                        return;
                    }
                    back();
                    sleep(action.interval);
                }
                Logger.error(TAG, "backUntil 超过最大尝试次数");
                break;
            }
            case "pollUntil": {
                const startTime = Date.now();
                const timeout = action.timeout ?? Infinity;
                while (Date.now() - startTime < timeout) {
                    if (ConditionEvaluator.check(action.condition, config)) {
                        Logger.info(TAG, "pollUntil 条件满足");
                        return;
                    }
                    sleep(action.interval);
                }
                Logger.info(TAG, "pollUntil 超时");
                if (action.onTimeout) {
                    ActionExecutor.execute(action.onTimeout.action, config, step, ctx, task);
                    step.setDynamicNext(action.onTimeout.next);
                }
                break;
            }
        }
    }
}

class ConfigDrivenStep extends Step {
    private _dynamicNext: string | null = null;
    name: string;

    constructor(
        private stepCfg: StepConfig,
        private taskCfg: TaskConfig
    ) {
        super();
        this.name = stepCfg.name;
        this.confirmInterval = stepCfg.confirmInterval ?? 500;
        this.confirmAttempts = stepCfg.confirmAttempts ?? 6;
        this.preCheckInterval = stepCfg.preCheckInterval ?? 500;
        this.preCheckAttempts = stepCfg.preCheckAttempts ?? 6;
    }

    action(ctx: ICtx, task: ITask): void {
        this._dynamicNext = null;
        ActionExecutor.execute(this.stepCfg.action, this.taskCfg, this, ctx, task);
    }

    confirmCondition(): () => boolean {
        return ConditionEvaluator.evaluate(this.stepCfg.confirm, this.taskCfg);
    }

    nextStep(ctx: ICtx): string {
        if (this._dynamicNext !== null) return this._dynamicNext;
        return this.stepCfg.next ?? STEP_END;
    }

    setDynamicNext(next: string): void {
        this._dynamicNext = next;
    }
}

export function parseTaskConfig(config: TaskConfig): ITask {
    const steps: Record<string, Step> = {};

    for (const stepCfg of config.steps) {
        steps[stepCfg.id] = new ConfigDrivenStep(stepCfg, config);
    }

    return new BaseTask({
        name: config.name,
        firstStep: config.steps[0]?.id ?? STEP_END,
        packageName: getConfig().system.game.packageName,
        skipHomeCheck: !config.useBaseSteps,
        launchSteps: config.useBaseSteps ? createBaseSteps() : undefined,
        businessSteps: steps,
    });
}

export function validateTaskConfig(config: TaskConfig): string[] {
    const errors: string[] = [];
    const ids = config.steps.map(s => s.id);

    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length) errors.push(`步骤 id 重复: ${[...new Set(dupes)].join(", ")}`);

    for (const s of config.steps) {
        if (s.next && s.next !== STEP_END && !ids.includes(s.next)) {
            errors.push(`步骤 ${s.id}.next "${s.next}" 不存在`);
        }
        validateActionRefs(s.action, config, errors, s.id);
        validateConditionRefs(s.confirm, config, errors, s.id);
    }

    return errors;
}

function validateActionRefs(action: ActionConfig, config: TaskConfig, errors: string[], stepId: string): void {
    switch (action.type) {
        case "tap":
            if (action.x !== undefined && action.y !== undefined) {
                // 内联坐标，无需校验引用
            } else if (action.position) {
                if (!config.positions?.[action.position]) {
                    errors.push(`步骤 ${stepId} 的 position "${action.position}" 不存在`);
                }
            } else {
                errors.push(`步骤 ${stepId} 的 tap 动作缺少坐标: 需要提供 x/y 或 position`);
            }
            break;
        case "tapByText":
            if (action.text) {
                // 内联文字，无需校验引用
            } else if (action.target) {
                if (!config.targets?.[action.target]) {
                    errors.push(`步骤 ${stepId} 的 target "${action.target}" 不存在`);
                }
            } else {
                errors.push(`步骤 ${stepId} 的 tapByText 动作缺少文字: 需要提供 text 或 target`);
            }
            break;
        case "noop":
            break;
        case "branchByText":
            for (const branch of action.branches) {
                if (branch.text) {
                    // 内联文字，无需校验引用
                } else if (branch.target) {
                    if (!config.targets?.[branch.target]) {
                        errors.push(`步骤 ${stepId} 的 branch target "${branch.target}" 不存在`);
                    }
                } else {
                    errors.push(`步骤 ${stepId} 的分支缺少文字: 需要提供 text 或 target`);
                }
                if (branch.then) validateActionRefs(branch.then, config, errors, stepId);
                if (branch.next && branch.next !== STEP_END && !config.steps.find(s => s.id === branch.next)) {
                    errors.push(`步骤 ${stepId} 的 branch next "${branch.next}" 不存在`);
                }
            }
            if (action.defaultNext && action.defaultNext !== STEP_END && !config.steps.find(s => s.id === action.defaultNext)) {
                errors.push(`步骤 ${stepId} 的 defaultNext "${action.defaultNext}" 不存在`);
            }
            break;
        case "tapIfColor":
            if (action.firstColor && action.paths) {
                // 内联颜色，无需校验引用
            } else if (action.colorConfig) {
                if (!config.targets?.[action.colorConfig]) {
                    errors.push(`步骤 ${stepId} 的 colorConfig "${action.colorConfig}" 不存在`);
                }
            } else {
                errors.push(`步骤 ${stepId} 的 tapIfColor 动作缺少颜色配置: 需要提供 firstColor/paths 或 colorConfig`);
            }
            break;
        case "backUntil":
        case "pollUntil":
            validateConditionRefs(action.condition, config, errors, stepId);
            break;
    }
}

function validateConditionRefs(condition: ConditionConfig, config: TaskConfig, errors: string[], stepId: string): void {
    if (condition.type === "hasText") {
        if (condition.text) {
            // 内联文字，无需校验引用
        } else if (condition.target) {
            if (!config.targets?.[condition.target]) {
                errors.push(`步骤 ${stepId} 的 confirm target "${condition.target}" 不存在`);
            }
        } else {
            errors.push(`步骤 ${stepId} 的 hasText 条件缺少文字: 需要提供 text 或 target`);
        }
    }
    if (condition.type === "hasColor") {
        if (condition.firstColor && condition.paths) {
            // 内联颜色，无需校验引用
        } else if (condition.colorConfig) {
            if (!config.targets?.[condition.colorConfig]) {
                errors.push(`步骤 ${stepId} 的 confirm colorConfig "${condition.colorConfig}" 不存在`);
            }
        } else {
            errors.push(`步骤 ${stepId} 的 hasColor 条件缺少颜色配置: 需要提供 firstColor/paths 或 colorConfig`);
        }
    }
}
