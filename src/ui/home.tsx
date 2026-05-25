import { HomeController } from "./home_controller";

function buildLayout() {
    return (

        <vertical>
            <scroll layout_weight="1">
                <vertical padding="16">
                    <frame h="48">
                        <text text="AutoGameFlow" textSize="22sp" textStyle="bold" gravity="center" />
                        <button id="btnOpenLog" text="日志" textSize="12sp" layout_gravity="right|center_vertical" marginRight="4" />
                    </frame>

                    <card cardCornerRadius="8" cardElevation="2" marginBottom="10" w="*" h="auto">
                        <vertical padding="12">
                            <horizontal marginBottom="6" gravity="center_vertical">
                                <text text="启动配置" textSize="15sp" textStyle="bold" layout_weight="1" />
                            </horizontal>
                            <horizontal marginBottom="4" gravity="center_vertical">
                                <text text="双开模式:" textSize="13sp" />
                                <spinner id="spinner_dualApp" entries="未双开|双开1|双开2" selectedIndex="0" marginLeft="8" layout_weight="1" />
                            </horizontal>
                        </vertical>
                    </card>

                    <card cardCornerRadius="8" cardElevation="2" marginBottom="10" w="*" h="auto">
                        <vertical padding="12">
                            <horizontal marginBottom="6" gravity="center_vertical">
                                <text text="竞技对决" textSize="15sp" textStyle="bold" layout_weight="1" />
                                <checkbox id="catAll_arena" text="全选" textSize="12sp" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4" gravity="center_vertical">
                                <checkbox id="chk_单人匹配" text="单人匹配" textSize="13sp" layout_weight="1" checked="false" />
                                <text text="次数:" textSize="12sp" marginLeft="4" />
                                <input id="runs_单人匹配" text="1" textSize="13sp" inputType="number" w="80" marginLeft="4" singleLine="true" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_组队匹配" text="组队匹配" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                        </vertical>
                    </card>

                    <card cardCornerRadius="8" cardElevation="2" marginBottom="10" w="*" h="auto">
                        <vertical padding="12">
                            <horizontal marginBottom="6" gravity="center_vertical">
                                <text text="每日任务" textSize="15sp" textStyle="bold" layout_weight="1" />
                                <checkbox id="catAll_daily" text="全选" textSize="12sp" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_精彩活动" text="精彩活动" textSize="13sp" layout_weight="1" checked="false" />
                                <checkbox id="chk_签到福利" text="签到福利" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4" gravity="center_vertical">
                                <checkbox id="chk_主线关卡" text="主线关卡" textSize="13sp" layout_weight="1" checked="false" />
                                <text text="次数:" textSize="12sp" marginLeft="4" />
                                <input id="runs_主线关卡" text="1" textSize="13sp" inputType="number" w="80" marginLeft="4" singleLine="true" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_快速游历" text="快速游历" textSize="13sp" layout_weight="1" checked="false" />
                                <checkbox id="chk_购买体力" text="购买体力" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_赠送领取体力" text="赠送/领取体力" textSize="13sp" layout_weight="1" checked="false" />
                                <checkbox id="chk_商店购物" text="商店购物" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_商店购买1次" text="商店购买1次" textSize="13sp" layout_weight="1" checked="false" />
                                <checkbox id="chk_植物升级" text="植物升级" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_自然召唤" text="自然召唤" textSize="13sp" layout_weight="1" checked="false" />
                                <checkbox id="chk_植物祈愿" text="植物祈愿" textSize="13sp" layout_weight="1" checked="false" />
                                <checkbox id="chk_点赞其他玩家" text="点赞其他玩家" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_装备升级分解" text="装备升级分解" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                        </vertical>
                    </card>

                    <card cardCornerRadius="8" cardElevation="2" marginBottom="10" w="*" h="auto">
                        <vertical padding="12">
                            <horizontal marginBottom="6" gravity="center_vertical">
                                <text text="工会任务" textSize="15sp" textStyle="bold" layout_weight="1" />
                                <checkbox id="catAll_guild" text="全选" textSize="12sp" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_猎魔入侵" text="猎魔入侵" textSize="13sp" layout_weight="1" checked="false" />
                                <checkbox id="chk_工会捐献" text="工会捐献" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_工会发言" text="工会发言" textSize="13sp" layout_weight="1" checked="false" />
                                <checkbox id="chk_协助他人" text="协助他人" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                        </vertical>
                    </card>

                    <card cardCornerRadius="8" cardElevation="2" marginBottom="10" w="*" h="auto">
                        <vertical padding="12">
                            <horizontal marginBottom="6" gravity="center_vertical">
                                <text text="副本任务" textSize="15sp" textStyle="bold" layout_weight="1" />
                                <checkbox id="catAll_dungeon" text="全选" textSize="12sp" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_日常副本" text="日常副本" textSize="13sp" layout_weight="1" checked="false" />
                                <checkbox id="chk_深渊领主" text="深渊领主" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_精英挑战" text="精英挑战" textSize="13sp" layout_weight="1" checked="false" />
                                <checkbox id="chk_试炼之地" text="试炼之地" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                            <horizontal marginBottom="4">
                                <checkbox id="chk_巅峰对决" text="巅峰对决" textSize="13sp" layout_weight="1" checked="false" />
                            </horizontal>
                        </vertical>
                    </card>


                </vertical>
            </scroll>
            <vertical >
                <horizontal gravity="center" marginBottom="10">
                    <button id="btnRun" text="开始运行" style="Widget.AppCompat.Button.Colored" layout_weight="1" />
                    <button id="btnStop" text="停止" marginLeft="8" layout_weight="1" />
                </horizontal>

                <card cardCornerRadius="8" cardElevation="2" marginBottom="10" w="*" h="auto">
                    <vertical padding="12">
                        <text text="状态" textSize="14sp" textStyle="bold" marginBottom="8" />
                        <text id="statusText" text="就绪" textSize="14sp" />
                        <progressbar id="progressBar" indeterminate="true" visibility="gone" marginTop="8" />
                    </vertical>
                </card>
            </vertical>
        </vertical>


    );
}

class HomePage {
    show(): void {
        ui.layout(buildLayout());
        const controller = new HomeController();
        controller.onBind(ui, () => new HomePage().show());
    }
}

export default HomePage;
