export interface TextTargetConfig {
    text: string;
    region?: { x: number; y: number; w: number; h: number };
    exact?: boolean;
}

export interface ColorTargetConfig {
    firstColor: string;
    paths: (string | number)[][];
    region?: [number, number, number, number];
}

export interface PositionConfig {
    x: number;
    y: number;
}

export interface TapAction {
    type: "tap";
    position?: string;
    x?: number;
    y?: number;
    delay?: number;
}

export interface TapByTextAction {
    type: "tapByText";
    target?: string;
    text?: string;
    region?: { x: number; y: number; w: number; h: number };
    exact?: boolean;
    delay?: number;
}

export interface NoopAction {
    type: "noop";
}

export interface BranchByTextAction {
    type: "branchByText";
    branches: {
        target?: string;
        text?: string;
        region?: { x: number; y: number; w: number; h: number };
        exact?: boolean;
        then?: ActionConfig;
        next?: string;
    }[];
    defaultNext?: string;
}

export interface TapIfColorAction {
    type: "tapIfColor";
    colorConfig?: string;
    firstColor?: string;
    paths?: (string | number)[][];
    colorRegion?: [number, number, number, number];
}

export interface BackUntilAction {
    type: "backUntil";
    maxAttempts: number;
    interval: number;
    condition: ConditionConfig;
}

export interface PollUntilAction {
    type: "pollUntil";
    interval: number;
    timeout?: number;
    condition: ConditionConfig;
    onTimeout?: {
        action: ActionConfig;
        next: string;
    };
}

export type ActionConfig = TapAction | TapByTextAction | NoopAction | BranchByTextAction | TapIfColorAction | BackUntilAction | PollUntilAction;

export interface HasTextCondition {
    type: "hasText";
    target?: string;
    text?: string;
    region?: { x: number; y: number; w: number; h: number };
    exact?: boolean;
}

export interface HasColorCondition {
    type: "hasColor";
    colorConfig?: string;
    firstColor?: string;
    paths?: (string | number)[][];
    colorRegion?: [number, number, number, number];
}

export interface AlwaysCondition {
    type: "always";
}

export interface HomeCondition {
    type: "home";
}

export type ConditionConfig = HasTextCondition | HasColorCondition | AlwaysCondition | HomeCondition;

export interface StepConfig {
    id: string;
    name: string;
    action: ActionConfig;
    confirm: ConditionConfig;
    next?: string;
    confirmInterval?: number;
    confirmAttempts?: number;
    preCheckInterval?: number;
    preCheckAttempts?: number;
}

export interface TaskConfig {
    name: string;
    category: string;
    useBaseSteps?: boolean;
    targets?: { [key: string]: TextTargetConfig | ColorTargetConfig };
    positions?: { [key: string]: PositionConfig };
    steps: StepConfig[];
}
