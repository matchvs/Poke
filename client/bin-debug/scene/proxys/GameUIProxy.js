var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 控制卡牌显示等规则
 * Created by Administrator on 2015/12/19.
 */
var scene;
(function (scene) {
    var GameUIProxy = (function () {
        function GameUIProxy() {
            this._txt_money = null;
            this._txt_name = null;
            this._head = null;
            this._timesTxT = null;
            this._gameScene = null;
            this._playerTime = null;
            this._playerHead1 = null;
            this._playerHead2 = null;
            this._houseRunning = null;
            this._timeTxt = null;
            this._startTime = 0;
            this._autoing = null;
        }
        GameUIProxy.prototype.Init = function (gs) {
            this._gameScene = gs;
            /**
             * avatar
             */
            this._head = new scene.PlayerHeadFrame();
            this._gameScene.addChild(this._head);
            this._head.Init(data.GameData.avatar);
            this._head.x = 2;
            this._head.y = 2;
            this._head.scaleX = this._head.scaleY = 0.7;
            /**
             * name
             */
            this._txt_name = new egret.TextField();
            this._txt_name.size = 20;
            this._txt_name.textColor = 0xe6b980;
            this._txt_name.text = data.GameData.nickname;
            this._gameScene.addChild(this._txt_name);
            this._txt_name.x = 78;
            this._txt_name.y = 12;
            /**
             * money
             */
            this._txt_money = new egret.TextField();
            this._txt_money.size = 20;
            this._txt_money.textColor = 0xe6b980;
            this._txt_money.text = "" + data.GameData.money;
            this._gameScene.addChild(this._txt_money);
            this._txt_money.x = 105;
            this._txt_money.y = 43;
            /**
             * time
             */
            this._timeTxt = new egret.TextField();
            this._timeTxt.size = 35;
            this._timeTxt.textColor = 0xffffff;
            this._timeTxt.text = "00:00";
            this._gameScene.addChild(this._timeTxt);
            this._timeTxt.x = 405;
            this._timeTxt.y = 23;
            // ???
            this._timesTxT = new egret.BitmapText();
            this._timesTxT.font = RES.getRes("timefont_fnt");
            this._timesTxT.y = 1060;
            this._timesTxT.text = "";
            this._gameScene.addChild(this._timesTxT);
            this._timesTxT.x = Config.StageWidth - this._timesTxT.textWidth - 10;
            this._playerHead1 = new scene.PlayerHead();
            this._playerHead2 = new scene.PlayerHead();
            /**
             * 倒计时闹钟
             */
            this._playerTime = new scene.PlayerTime();
            this._playerTime.Init();
            this._gameScene.addChild(this._playerTime);
            this._playerTime.visible = false;
            /**
             * 离开房间逃跑
             */
            this._houseRunning = new scene.HouseRunning();
            this._houseRunning.x = 90;
            this._houseRunning.Init();
            this._gameScene.addChild(this._houseRunning);
            /**
             * 挂机显示机器人
             */
            this._autoing = new egret.Bitmap(RES.getRes("ui_robot"));
            this._autoing.y = 632;
            this._gameScene.addChild(this._autoing);
            this._autoing.visible = false;
        };
        // 命名问题
        // 更新钱money
        GameUIProxy.prototype.RefreshPlayerInfo = function () {
            this._txt_money.text = "" + data.GameData.money;
        };
        GameUIProxy.prototype.getPlayerHeadByLoc = function (loc) {
            return this["_playerHead" + loc];
        };
        GameUIProxy.prototype.UpdateAllCardNum = function () {
            if (this["_playerHead" + 1]) {
                this["_playerHead" + 1].ShowCard = true;
                this["_playerHead" + 1].UpdateCardNum();
            }
            if (this["_playerHead" + 2]) {
                this["_playerHead" + 2].ShowCard = true;
                this["_playerHead" + 2].UpdateCardNum();
            }
        };
        GameUIProxy.prototype.GameOver = function () {
            if (this["_playerHead" + 1]) {
                this["_playerHead" + 1].Ready = false;
                this["_playerHead" + 1].ShowCard = false;
            }
            if (this["_playerHead" + 2]) {
                this["_playerHead" + 2].Ready = false;
                this["_playerHead" + 2].ShowCard = false;
            }
            this._playerTime.visible = false;
        };
        /**
         * 进入房间.显示自己的信息和房间已有人的信息
         * @constructor
         */
        GameUIProxy.prototype.RoomIn = function (playerlist) {
            for (var p in playerlist) {
                if (playerlist[p].LocalTableId == 1 || playerlist[p].LocalTableId == 2) {
                    this.SetPlayerHead(playerlist[p], true);
                }
            }
            if (this["_playerHead" + 1]) {
                this["_playerHead" + 1].Ready = false;
                this["_playerHead" + 1].ShowCard = false;
                this["_playerHead" + 1].LandFlagVisible(false, false);
            }
            if (this["_playerHead" + 2]) {
                this["_playerHead" + 2].Ready = false;
                this["_playerHead" + 2].ShowCard = false;
                this["_playerHead" + 2].LandFlagVisible(false, false);
            }
            this.SetTimes("");
            this._playerTime.visible = false;
        };
        /**
         * 设置玩家进度条时间
         * @constructor
         */
        GameUIProxy.prototype.SetPlayerTime = function (p, delaytime) {
            this._playerTime.SetPoint(p.LocalTableId, delaytime);
            this._playerTime.visible = true;
        };
        GameUIProxy.prototype.RemovePlayerHead = function (p) {
            if (p == null) {
                return;
            }
            if (this["_playerHead" + p.LocalTableId]) {
                this["_playerHead" + p.LocalTableId].Release();
            }
        };
        GameUIProxy.prototype.TurnCallLand = function () {
            if (this["_playerHead" + 1]) {
                this["_playerHead" + 1].ShowCard = true;
            }
            if (this["_playerHead" + 2]) {
                this["_playerHead" + 2].ShowCard = true;
            }
        };
        GameUIProxy.prototype.SetPlayerHead = function (p, isin) {
            if (isin === void 0) { isin = false; }
            if (p == null) {
                return;
            }
            this["_playerHead" + p.LocalTableId].Release();
            this["_playerHead" + p.LocalTableId].Init(p);
            this._gameScene.addChildAt(this["_playerHead" + p.LocalTableId], 0);
            this["_playerHead" + p.LocalTableId].Ready = p.IsReady;
            this["_playerHead" + p.LocalTableId].UpdateCardNum();
            this["_playerHead" + p.LocalTableId].LandFlagVisible(false, false);
            if (p.LocalTableId == 1) {
                this._playerHead1.x = 65;
                this._playerHead1.y = 190;
            }
            else if (p.LocalTableId == 2) {
                this._playerHead2.x = 475;
                this._playerHead2.y = 190;
            }
            if (isin && p.LocalTableId != 3) {
                var ph = this["_playerHead" + p.LocalTableId];
                if (ph) {
                    egret.Tween.removeTweens(ph);
                    var tx = ph.x;
                    var fx = 0;
                    if (p.LocalTableId == 1) {
                        fx = tx - 300;
                    }
                    else if (p.LocalTableId == 2) {
                        fx = tx + 300;
                    }
                    ph.x = fx;
                    egret.Tween.get(ph).to({ x: tx }, 600);
                }
            }
        };
        //设置地主标
        GameUIProxy.prototype.SetPlayerLandFlag = function (landid) {
            if (this["_playerHead" + 1]) {
                this["_playerHead" + 1].IsLandOwner = false;
                this["_playerHead" + 1].LandFlagVisible(true, false);
            }
            if (this["_playerHead" + 2]) {
                this["_playerHead" + 2].IsLandOwner = false;
                this["_playerHead" + 2].LandFlagVisible(true, false);
            }
            if (this["_playerHead" + landid]) {
                this["_playerHead" + landid].IsLandOwner = true;
                this["_playerHead" + landid].LandFlagVisible(true, true);
            }
        };
        //设置准备标
        GameUIProxy.prototype.SetPlayerReady = function (tableid, isready) {
            if (this["_playerHead" + tableid]) {
                this["_playerHead" + tableid].Ready = isready;
            }
        };
        //开始发牌
        GameUIProxy.prototype.SendCard = function () {
            if (this["_playerHead" + 1]) {
                this["_playerHead" + 1].Ready = false;
                this["_playerHead" + 1].ShowCard = false;
            }
            if (this["_playerHead" + 2]) {
                this["_playerHead" + 2].Ready = false;
                this["_playerHead" + 2].ShowCard = false;
            }
            this._startTime = egret.getTimer();
        };
        /**
         * 设置倍数文字
         * @param str
         * @constructor
         */
        GameUIProxy.prototype.SetTimes = function (str) {
            if (str != "") {
                this._timesTxT.text = str + "倍";
            }
            else {
                this._timesTxT.text = str;
            }
            this._timesTxT.x = Config.StageWidth - this._timesTxT.textWidth - 10;
        };
        GameUIProxy.prototype.PushHouseRunning = function (str) {
            this._houseRunning.Push(str);
        };
        GameUIProxy.prototype.Update = function () {
            var ntimer = egret.getTimer();
            if (this._playerTime) {
                this._playerTime.Update();
            }
            if (this._houseRunning) {
                this._houseRunning.Update();
            }
            if (this._timeTxt && this._startTime > 0) {
                var dectimer = ntimer - this._startTime;
                var strtimer = DateTimeTool.GetMinString(dectimer);
                this._timeTxt.text = strtimer;
            }
        };
        GameUIProxy.prototype.Release = function () {
            this._playerTime.Release();
            if (this._playerHead1) {
                this._playerHead1.Release();
            }
            if (this._playerHead2) {
                this._playerHead2.Release();
            }
            this._gameScene = null;
            this._playerTime = null;
            this._playerHead1 = null;
            this._playerHead2 = null;
        };
        return GameUIProxy;
    }());
    scene.GameUIProxy = GameUIProxy;
    __reflect(GameUIProxy.prototype, "scene.GameUIProxy", ["IInit", "IRelease", "IUpdate"]);
})(scene || (scene = {}));
//# sourceMappingURL=GameUIProxy.js.map