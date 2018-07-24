/**
 * 控制卡牌显示等规则
 * Created by Administrator on 2015/12/19.
 */
module battle {
    //import ChatInst = windowui.ChatInst;
    export class BattleBtnControl extends egret.EventDispatcher {
        public static STATE_HideAll: number = 0;
        public static STATE_Qiangdizhu: number = 1;
        public static STATE_Playing: number = 2;
        public static STATE_Ready: number = 3;

        public static PLAY_CARD_EVENT = "PLAY_CARD_EVENT";

        private _state: number = 0;

        private _gameScene: egret.Sprite = null;
        private _setting: BattleBtnUI = null;
        private _autoing: BattleBtnUI = null;
        private _exiting: BattleBtnUI = null;

        //private _talking: BattleBtnUI = null;
        //private _prompt: BattleBtnUI = null;
        //private _prompTips:egret.Bitmap=null;
        private _ready: BattleBtnUI = null;
        private _callNo: BattleBtnUI = null;
        private _call1: BattleBtnUI = null;
        private _call2: BattleBtnUI = null;
        private _call3: BattleBtnUI = null;
        private _sendNo: BattleBtnUI = null;
        private _sendReset: BattleBtnUI = null;
        private _sendPromt: BattleBtnUI = null;
        private _sendCard: BattleBtnUI = null;

        private _currentDownSprite: egret.Sprite = null;   //当前拖动容器
        private _callSprite: egret.Sprite = null;      //叫分按钮容器;
        private _playSprite: egret.Sprite = null;      //玩游戏按钮
        private _readySprite: egret.Sprite = null;     //准备按钮
        private _touchStart: egret.Point = null;
        private _objStart: egret.Point = null;

        private _myCardProxy: MyCardControl = null;
        public constructor() {
            super()
        }

        public get State(): number {
            return this._state;
        }
        public SetCardProxy(mcp: MyCardControl): void {
            this._myCardProxy = mcp;
        }
        public Init(gs: egret.Sprite): void {
            this._gameScene = gs;

            /**
             * btn_setting 设置按钮
             */
            this._setting = new BattleBtnUI("btn_setting");
            //LayerMgr.TopUI.addChild(this._setting);
            this._setting.x = 338;
            this._setting.y = 17;

            /**
             * btn_roomauto
             */
            this._autoing = new BattleBtnUI("btn_roomauto");
            //LayerMgr.TopUI.addChild(this._autoing);
            this._autoing.x = 517;
            this._autoing.y = 17;

            /**
             * btn_roomout 退出房间按钮
             */
            this._exiting = new BattleBtnUI("btn_roomout");
            //LayerMgr.TopUI.addChild(this._exiting);
            this._exiting.x = 583;
            this._exiting.y = 17;

            /**
             * btn_chat
             */
            // this._talking = new BattleBtnUI("ui_chat_btn");
            // this._gameScene.addChild(this._talking);
            // this._talking.x = 10;
            // this._talking.y = 1055;

            /**
             * robot
             */
            // this._prompt = new BattleBtnUI("ui_robot");
            // this._gameScene.addChild(this._prompt);
            // this._prompt.ClickScale = false;
            // this._prompt.x = 0;
            // this._prompt.y = 632;

            this.setBtnSprite();
            this._exiting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            //this._autoing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            //this._talking.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            //this._prompt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);

            // 注册返回按键事件
            document.addEventListener("plusready", function () {
                // 注册返回按键事件
                window["plus"].key.addEventListener('backbutton', function () {
                    // 事件处理
                    window["plus"].nativeUI.confirm("退出程序？", function (event) {
                        if (event.index) {
                            window["plus"].runtime.quit();
                        }
                    }, null, ["取消", "确定"]);
                }, false);
            });
        }
        //设置托管
        // public SetPlayerAuto(tableid: number, isauto: boolean): void {
        //     if (tableid != 3) {
        //         return;
        //     }
        //     this._prompt.visible = isauto;
        //     this._prompt.touchEnabled = isauto;
        // }

        // 设置一些按钮样式
        //打牌
        public Playing(isnew: boolean): void {
            this._state = BattleBtnControl.STATE_Playing;
            this._readySprite.visible = false;
            this._callSprite.visible = false;

            this._playSprite.visible = true;//iscanshow;
            this._sendNo.visible = true;
            this._sendCard.visible = true;

            // 不出
            this._sendNo.touchEnabled = true;
            this._sendNo.SetBit("btn_buchu");

            // 提示
            this._sendPromt.touchEnabled = true;
            this._sendPromt.SetBit("btn_tishi");

            // 出牌
            this._sendCard.touchEnabled = false;
            this._sendCard.SetBit("btn_chupai");

            // 不出牌,灰色按钮
            if (isnew) {
                this._sendNo.SetBit("btn_buchu_no");
                this._sendNo.touchEnabled = false;
            }
        }

        // 修改一些按钮可点击状态
        //可以出牌
        public PlayingShow(isshow: boolean): void {
            if (isshow) {
                this._sendCard.SetBit("btn_chupai");
                this._sendCard.touchEnabled = true;
            }
            else {
                this._sendCard.SetBit("btn_chupai_no");
                this._sendCard.touchEnabled = false;
            }
        }

        //叫地主
        public CallLandOwner(nowscore: number): void {
            this._state = BattleBtnControl.STATE_Qiangdizhu;
            this._readySprite.visible = false;
            this._callSprite.visible = true;
            this._playSprite.visible = false;
            this._call1.touchEnabled = true;
            this._call2.touchEnabled = true;
            this._call3.touchEnabled = true;
            this._callNo.touchEnabled = true;

            this._call1.alpha = 1;
            this._call2.alpha = 1;
            this._call3.alpha = 1;
            this._callNo.alpha = 1;
            if (nowscore == 1) {
                this._call1.touchEnabled = false;
                this._call1.alpha = 0.3
            }
            else if (nowscore == 2) {
                this._call1.touchEnabled = false;
                this._call1.alpha = 0.3
                this._call2.touchEnabled = false;
                this._call2.alpha = 0.3
            }
        }
        //全部隐藏
        public HideAll(): void {
            this._state = BattleBtnControl.STATE_HideAll;
            this._readySprite.visible = false;
            this._callSprite.visible = false;
            this._playSprite.visible = false;
        }
        //进入房间
        public RoomIn(): void {
            this._state = BattleBtnControl.STATE_Ready;
            this._callSprite.visible = false;
            this._playSprite.visible = false;

            this._readySprite.visible = false;
            // if (SceneMgr.Instance.GetCurrentProxy() instanceof sceneproxy.GameSceneProxy) {
            //      //隐藏ready 按钮
            //     var dp: data.Player = (<sceneproxy.GameSceneProxy>(SceneMgr.Instance.GetCurrentProxy())).GetMainPlayer();
            //     if (dp && dp.IsReady) {
            //         this._readySprite.visible = false;
            //     }
            // }
        }

        private setBtnSprite(): void {
            this._callSprite = new egret.Sprite();      //叫分按钮容器;
            this._callSprite.touchChildren = true;
            this._callSprite.touchEnabled = true;
            this._callSprite.x = 0;
            this._callSprite.y = 550;

            this._playSprite = new egret.Sprite();      //玩游戏按钮
            this._playSprite.touchChildren = true;
            this._playSprite.touchEnabled = true;
            this._playSprite.x = 0;
            this._playSprite.y = 550;

            this._readySprite = new egret.Sprite();     //准备按钮this.//
            this._readySprite.touchChildren = true;
            this._readySprite.touchEnabled = true;
            this._readySprite.x = 255;
            this._readySprite.y = 650;

            this._gameScene.addChild(this._callSprite);
            this._gameScene.addChild(this._playSprite);
            this._gameScene.addChild(this._readySprite);

            this._readySprite.visible = false;
            this._callSprite.visible = false;
            this._playSprite.visible = false;

            this._ready = new BattleBtnUI("btn_zhunbei", null, "");
            this._readySprite.addChild(this._ready);
            this._ready.SetTxt(40, 0xffffff);
            this._ready.x = 4;//0;//4;
            this._ready.y = 20;//0;//20;

            /**
             * 叫地主时的按钮分布
             */
            // 不叫0分
            this._callNo = new BattleBtnUI("btn_bujiao", null, "");
            this._callSprite.addChild(this._callNo);
            this._callNo.x = 20;
            this._callNo.y = 0;

            // 1分
            this._call1 = new BattleBtnUI("btn_yifen", null, "");
            this._callSprite.addChild(this._call1);
            this._call1.x = 224;
            this._call1.y = 0;

            // 2分
            this._call2 = new BattleBtnUI("btn_erfen", null, "");
            this._callSprite.addChild(this._call2);
            this._call2.x = 360;
            this._call2.y = 0;

            // 3分
            this._call3 = new BattleBtnUI("btn_sanfen", null, "");
            this._callSprite.addChild(this._call3);
            this._call3.x = 495;
            this._call3.y = 0;


            /**
             * 添加完游戏按钮，不要，重置，提示，出牌
             */
            this._sendNo = new BattleBtnUI("btn_buchu", null, "");
            this._playSprite.addChild(this._sendNo);
            this._sendNo.x = 20;
            this._sendNo.y = 0;

            this._sendReset = new BattleBtnUI("btn_chongxuan", null, "");
            this._playSprite.addChild(this._sendReset);
            this._sendReset.x = 224;
            this._sendReset.y = 0;

            this._sendPromt = new BattleBtnUI("btn_tishi", null, "");
            this._playSprite.addChild(this._sendPromt);
            this._sendPromt.x = 360;
            this._sendPromt.y = 0;

            this._sendCard = new BattleBtnUI("btn_chupai", null, "");
            this._playSprite.addChild(this._sendCard);
            this._sendCard.x = 495;
            this._sendCard.y = 0;

            this._sendReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false);
            this._sendCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false);
            this._sendPromt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false);
            this._sendNo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false);
            this._call3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false);
            this._call2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false);
            this._call1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false);
            this._callNo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false);
            this._ready.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false);
        }

        // 没有调用
        private onToouchBegin(e: egret.TouchEvent): void {
            this._touchStart = new egret.Point();
            this._objStart = new egret.Point();
            this._touchStart.x = e.stageX;
            this._touchStart.y = e.stageY;
            this._objStart.x = e.currentTarget.x;
            this._objStart.y = e.currentTarget.y;
            this._currentDownSprite = e.currentTarget;
        }

        // 没有调用
        private onToouchMove(e: egret.TouchEvent): void {
            if (e.currentTarget != this._currentDownSprite) {
                return;
            }
            var cx: number = e.stageX;
            var cy: number = e.stageY;
            var bx: number = cx - this._touchStart.x;
            var by: number = cy - this._touchStart.y;
            e.currentTarget.x = this._objStart.x + bx;
            e.currentTarget.y = this._objStart.y + by;

            if (e.currentTarget.x > 366) {
                e.currentTarget.x = 366;
            }
            if (e.currentTarget.x < 0) {
                e.currentTarget.x = 0;
            }

            if (e.currentTarget.y < 0) {
                e.currentTarget.y = 0;
            }

            if (e.currentTarget.y > (Config.StageHeight - e.currentTarget.height)) {
                e.currentTarget.y = (Config.StageHeight - e.currentTarget.height);
            }
            this._currentDownSprite.touchChildren = false;
        }

        // 没有调用
        private onToouchEnd(e: egret.TouchEvent): void {
            if (e.currentTarget != this._currentDownSprite) {
                return;
            }
            var cx: number = e.stageX;
            var cy: number = e.stageY;
            var bx: number = cx - this._touchStart.x;
            var by: number = cy - this._touchStart.y;
            e.currentTarget.x = this._objStart.x + bx;
            e.currentTarget.y = this._objStart.y + by;
            this._touchStart = null;
            this._objStart = null;

            if (e.currentTarget.x > 366) {
                e.currentTarget.x = 366;
            }
            if (e.currentTarget.x < 0) {
                e.currentTarget.x = 0;
            }

            if (e.currentTarget.y < 0) {
                e.currentTarget.y = 0;
            }

            if (e.currentTarget.y > (Config.StageHeight - e.currentTarget.height)) {
                e.currentTarget.y = (Config.StageHeight - e.currentTarget.height);
            }
            this._currentDownSprite.touchChildren = true;
            this._currentDownSprite = null;

        }

        private onTap(e: egret.TouchEvent): void {
            // if (e.currentTarget == this._setting) {
            //     windowui.SettingInst.Instance.Show();
            // }
            // if (e.currentTarget == this._autoing && this._prompt.visible == false) {
            //     NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_AUTO, { isauto: true });
            // }
            // if (e.currentTarget == this._prompt) {
            //     NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_AUTO, { isauto: false });
            // }
            
            // else if (e.currentTarget == this._talking) {
            //     windowui.ChatInst.Instance.Show();
            // }
            if (e.currentTarget == this._exiting) {
                //network.BattleMsg.getInstance().sendToPlayers(enums.NetEnum.CLIENT_2_GAME_REQ_EXIT, {});
            }
            else if (e.currentTarget == this._ready) {
                //network.BattleMsg.getInstance().sendToPlayers(enums.NetEnum.CLIENT_2_GAME_READY, {});
            }
            else if (e.currentTarget == this._sendCard) {
                var cardArr: Array<number> = this._myCardProxy.GetWillShowList();
                if (cardArr == null) {
                    console.info("牌类型出错");
                    return;
                }
                //this.dispatchEvent(new egret.Event(BattleBtnControl.PLAY_CARD_EVENT, false, false,  { cardlist: cardArr }));
                network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.PLAY_CARDS_S, { cardlist: cardArr });
            }
            else if (e.currentTarget == this._sendPromt) {
                //NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_READY,{});
                var hasbigger: boolean = this._myCardProxy.getHasBigger();
                if (!hasbigger) {
                   network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.PLAY_CARDS_S, { cardlist: [] });
                }
                else {
                    var hascar: boolean = this._myCardProxy.Prompt(false, true);
                    this._myCardProxy.SetBtnVisible();
                }
            }
            else if (e.currentTarget == this._sendReset) {
                this._myCardProxy.Reset();
            }
            else if (e.currentTarget == this._sendNo) {
                network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.PLAY_CARDS_S, { cardlist: [] });
            }
            else if (e.currentTarget == this._call3) {
                this.HideAll();
                network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.CALL_LAND_S, { score:3 });
                console.log("叫地主 _call3");
            }else if (e.currentTarget == this._call2) {
                this.HideAll();
                network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.CALL_LAND_S, { score:2 });
                console.log("叫地主_call2");
            }
            else if (e.currentTarget == this._call1) {
                this.HideAll();
                network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.CALL_LAND_S, { score:1 });
                console.log("叫地主 _call1");
            }
            else if (e.currentTarget == this._callNo) {
                this.HideAll();
                network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.CALL_LAND_S, { score:0 });
                console.log("叫地主 _callNo");
            }
        }

        public Release(): void {
            this._gameScene.removeChildren();
            this._gameScene = null;
        }
    }
}
