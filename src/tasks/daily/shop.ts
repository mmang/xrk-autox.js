import { Step, HomeStep, ITask, ICtx, STEP_END } from "../../core/step";
import { BaseTask } from "../base_task";
import { OcrHelper } from "../../utils/ocr";
import { ClickHelper } from "../../utils/click";
import { getConfig } from "../../config/loader";

class ShopHome extends HomeStep {
  nextStep(ctx: ICtx): string {
    return "OpenShop";
  }
}

class OpenShop extends Step {
  name = "进入商店";
  action(ctx: ICtx, task: ITask): void {
    ClickHelper.tapByText(getConfig().daily.shop.shop);
  }
  confirmCondition(): () => boolean {
    return () => OcrHelper.hasText(getConfig().daily.shop.dailyDeals);
  }
  nextStep(ctx: ICtx): string {
    return "BuyItem";
  }
}

class BuyItem extends Step {
  name = "购买物品";
  action(ctx: ICtx, task: ITask): void {
    ClickHelper.tapByText(getConfig().daily.shop.expPotion);
  }
  confirmCondition(): () => boolean {
    return () => OcrHelper.hasText(getConfig().daily.shop.buySuccess) || OcrHelper.hasText(getConfig().daily.shop.dailyDeals);
  }
  nextStep(ctx: ICtx): string {
    return STEP_END;
  }
}

export const shopTask = new BaseTask({
  name: "商店购物",
  firstStep: "Home",
  businessSteps: {
    Home: new ShopHome(),
    OpenShop: new OpenShop(),
    BuyItem: new BuyItem(),
  },
});
