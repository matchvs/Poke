var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 控制卡牌显示等规则
 * Created by Administrator on 2015/12/19.
 */
var scene;
(function (scene) {
    var GameBtnProxy = (function () {
        function GameBtnProxy() {
            this._state = 0;
            this._gameScene = null;
            this._setting = null;
            this._autoing = null;
            this._exiting = null;
            this._talking = null;
            this._prompt = null;
            //private _prompTips:egret.Bitmap=null;
            this._ready = null;
            this._callNo = null;
            this._call1 = null;
            this._call2 = null;
            this._call3 = null;
            this._sendNo = null;
            this._sendReset = null;
            this._sendPromt = null;
            this._sendCard = null;
            this._currentDownSprite = null; //当前拖动容器
            this._callSprite = null; //叫分按钮容器;
            this._playSprite = null; //玩游戏按钮
            this._readySprite = null; //准备按钮
            this._touchStart = null;
            this._objStart = null;
            this._myCardProxy = null;
        }
        Object.defineProperty(GameBtnProxy.prototype, "State", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        GameBtnProxy.prototype.SetCardProxy = function (mcp) {
            this._myCardProxy = mcp;
        };
        GameBtnProxy.prototype.Init = function (gs) {
            this._gameScene = gs;
            /**
             * btn_setting
             */
            this._setting = new scene.SButton("btn_setting");
            LayerMgr.TopUI.addChild(this._setting);
            this._setting.x = 338;
            this._setting.y = 17;
            /**
             * btn_roomauto
             */
            this._autoing = new scene.SButton("btn_roomauto");
            LayerMgr.TopUI.addChild(this._autoing);
            this._autoing.x = 517;
            this._autoing.y = 17;
            /**
             * btn_roomout
             */
            this._exiting = new scene.SButton("btn_roomout");
            LayerMgr.TopUI.addChild(this._exiting);
            this._exiting.x = 583;
            this._exiting.y = 17;
            /**
             * btn_chat
             */
            this._talking = new scene.SButton("ui_chat_btn");
            this._gameScene.addChild(this._talking);
            this._talking.x = 10;
            this._talking.y = 1055;
            /**
             * robot
             */
            this._prompt = new scene.SButton("ui_robot");
            this._gameScene.addChild(this._prompt);
            this._prompt.ClickScale = false;
            this._prompt.x = 0;
            this._prompt.y = 632;
            /**
             * 初始化确认等按钮
             */
            this.setBtnSprite();
            this._exiting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._autoing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._talking.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._prompt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
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
            //            var tthis = this;
            //            document.onkeydown = function(event) {
            //                var e = event || window.event || arguments.callee.caller.arguments[0];
            //                if(e && e.keyCode == 13) { // enter 键
            //                    NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_AUTO,{ isauto: true });
            //                }
            //            };
        };
        //设置托管
        GameBtnProxy.prototype.SetPlayerAuto = function (tableid, isauto) {
            if (tableid != 3) {
                return;
            }
            this._prompt.visible = isauto;
            this._prompt.touchEnabled = isauto;
        };
        // 设置一些按钮样式
        //打牌
        GameBtnProxy.prototype.Playing = function (isnew) {
            this._state = GameBtnProxy.STATE_Playing;
            this._readySprite.visible = false;
            this._callSprite.visible = false;
            this._playSprite.visible = true; //iscanshow;
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
        };
        // 修改一些按钮可点击状态
        //可以出牌
        GameBtnProxy.prototype.PlayingShow = function (isshow) {
            if (isshow) {
                this._sendCard.SetBit("btn_chupai");
                this._sendCard.touchEnabled = true;
            }
            else {
                this._sendCard.SetBit("btn_chupai_no");
                this._sendCard.touchEnabled = false;
            }
        };
        //叫地主
        GameBtnProxy.prototype.CallLandOwner = function (nowscore) {
            this._state = GameBtnProxy.STATE_Qiangdizhu;
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
                this._call1.alpha = 0.3;
            }
            else if (nowscore == 2) {
                this._call1.touchEnabled = false;
                this._call1.alpha = 0.3;
                this._call2.touchEnabled = false;
                this._call2.alpha = 0.3;
            }
        };
        //全部隐藏
        GameBtnProxy.prototype.HideAll = function () {
            this._state = GameBtnProxy.STATE_HideAll;
            this._readySprite.visible = false;
            this._callSprite.visible = false;
            this._playSprite.visible = false;
        };
        //进入房间
        GameBtnProxy.prototype.RoomIn = function () {
            this._state = GameBtnProxy.STATE_Ready;
            this._readySprite.visible = true;
            this._callSprite.visible = false;
            this._playSprite.visible = false;
            if (SceneMgr.Instance.GetCurrentProxy() instanceof sceneproxy.GameSceneProxy) {
                var dp = (SceneMgr.Instance.GetCurrentProxy()).GetMainPlayer();
                if (dp && dp.IsReady) {
                    this._readySprite.visible = false;
                }
            }
        };
        GameBtnProxy.prototype.setBtnSprite = function () {
            this._callSprite = new egret.Sprite(); //叫分按钮容器;
            this._callSprite.touchChildren = true;
            this._callSprite.touchEnabled = true;
            this._callSprite.x = 0;
            this._callSprite.y = 550;
            this._playSprite = new egret.Sprite(); //玩游戏按钮
            this._playSprite.touchChildren = true;
            this._playSprite.touchEnabled = true;
            this._playSprite.x = 0;
            this._playSprite.y = 550;
            this._readySprite = new egret.Sprite(); //准备按钮this.//
            this._readySprite.touchChildren = true;
            this._readySprite.touchEnabled = true;
            this._readySprite.x = 255;
            this._readySprite.y = 650;
            this._gameScene.addChild(this._callSprite);
            this._gameScene.addChild(this._playSprite);
            this._gameScene.addChild(this._readySprite);
            this._readySprite.visible = true;
            this._callSprite.visible = false;
            this._playSprite.visible = false;
            this._ready = new scene.SButton("btn_zhunbei", null, "");
            this._readySprite.addChild(this._ready);
            this._ready.SetTxt(40, 0xffffff);
            this._ready.x = 4; //0;//4;
            this._ready.y = 20; //0;//20;
            /**
             * 叫地主时的按钮分布
             */
            // 不叫0分
            this._callNo = new scene.SButton("btn_bujiao", null, "");
            this._callSprite.addChild(this._callNo);
            this._callNo.x = 20;
            this._callNo.y = 0;
            // 1分
            this._call1 = new scene.SButton("btn_yifen", null, "");
            this._callSprite.addChild(this._call1);
            this._call1.x = 224;
            this._call1.y = 0;
            // 2分
            this._call2 = new scene.SButton("btn_erfen", null, "");
            this._callSprite.addChild(this._call2);
            this._call2.x = 360;
            this._call2.y = 0;
            // 3分
            this._call3 = new scene.SButton("btn_sanfen", null, "");
            this._callSprite.addChild(this._call3);
            this._call3.x = 495;
            this._call3.y = 0;
            /**
             * 重复定义???
             */
            this._sendNo = new scene.SButton("btn_buchu", null, "");
            this._playSprite.addChild(this._sendNo);
            this._sendNo.x = 20;
            this._sendNo.y = 0;
            this._sendReset = new scene.SButton("btn_chongxuan", null, "");
            this._playSprite.addChild(this._sendReset);
            this._sendReset.x = 224;
            this._sendReset.y = 0;
            this._sendPromt = new scene.SButton("btn_tishi", null, "");
            this._playSprite.addChild(this._sendPromt);
            this._sendPromt.x = 360;
            this._sendPromt.y = 0;
            this._sendCard = new scene.SButton("btn_chupai", null, "");
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
        };
        // 开始按钮的显示和隐藏
        GameBtnProxy.prototype.readyIsVisible = function (playeNum) {
            if (playeNum = 3) {
                this._readySprite.visible = true;
            }
            else {
                this._readySprite.visible = false;
            }
        };
        // 没有调用
        GameBtnProxy.prototype.onToouchBegin = function (e) {
            this._touchStart = new egret.Point();
            this._objStart = new egret.Point();
            this._touchStart.x = e.stageX;
            this._touchStart.y = e.stageY;
            this._objStart.x = e.currentTarget.x;
            this._objStart.y = e.currentTarget.y;
            this._currentDownSprite = e.currentTarget;
        };
        // 没有调用
        GameBtnProxy.prototype.onToouchMove = function (e) {
            if (e.currentTarget != this._currentDownSprite) {
                return;
            }
            var cx = e.stageX;
            var cy = e.stageY;
            var bx = cx - this._touchStart.x;
            var by = cy - this._touchStart.y;
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
        };
        // 没有调用
        GameBtnProxy.prototype.onToouchEnd = function (e) {
            if (e.currentTarget != this._currentDownSprite) {
                return;
            }
            var cx = e.stageX;
            var cy = e.stageY;
            var bx = cx - this._touchStart.x;
            var by = cy - this._touchStart.y;
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
        };
        GameBtnProxy.prototype.onTap = function (e) {
            if (e.currentTarget == this._setting) {
                windowui.SettingInst.Instance.Show();
            }
            if (e.currentTarget == this._autoing && this._prompt.visible == false) {
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_AUTO, { isauto: true });
            }
            if (e.currentTarget == this._prompt) {
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_AUTO, { isauto: false });
            }
            if (e.currentTarget == this._exiting) {
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_REQ_EXIT, {});
            }
            else if (e.currentTarget == this._talking) {
                windowui.ChatInst.Instance.Show();
            }
            else if (e.currentTarget == this._ready) {
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_READY, {});
            }
            else if (e.currentTarget == this._sendCard) {
                var cardArr = this._myCardProxy.GetWillShowList();
                if (cardArr == null) {
                    trace("牌类型出错");
                    return;
                }
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SHOWCARD, { cardlist: cardArr });
            }
            else if (e.currentTarget == this._sendPromt) {
                //NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_READY,{});
                var hasbigger = this._myCardProxy.getHasBigger();
                if (!hasbigger) {
                    NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SHOWCARD, { cardlist: [] });
                }
                else {
                    var hascar = this._myCardProxy.Prompt(false, true);
                    this._myCardProxy.SetBtnVisible();
                }
            }
            else if (e.currentTarget == this._sendReset) {
                this._myCardProxy.Reset();
            }
            else if (e.currentTarget == this._sendNo) {
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SHOWCARD, { cardlist: [] });
            }
            else if (e.currentTarget == this._call3) {
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_CALLLANDOWNER, { score: 3 });
                this.HideAll();
            }
            else if (e.currentTarget == this._call2) {
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_CALLLANDOWNER, { score: 2 });
                this.HideAll();
            }
            else if (e.currentTarget == this._call1) {
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_CALLLANDOWNER, { score: 1 });
                this.HideAll();
            }
            else if (e.currentTarget == this._callNo) {
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_CALLLANDOWNER, { score: 0 });
                this.HideAll();
            }
        };
        GameBtnProxy.prototype.Release = function () {
            this._gameScene.removeChildren();
            this._gameScene = null;
        };
        GameBtnProxy.STATE_HideAll = 0;
        GameBtnProxy.STATE_Qiangdizhu = 1;
        GameBtnProxy.STATE_Playing = 2;
        GameBtnProxy.STATE_Ready = 3;
        return GameBtnProxy;
    }());
    scene.GameBtnProxy = GameBtnProxy;
    __reflect(GameBtnProxy.prototype, "scene.GameBtnProxy", ["IInit", "IRelease"]);
})(scene || (scene = {}));
//# sourceMappingURL=GameBtnProxy.js.map