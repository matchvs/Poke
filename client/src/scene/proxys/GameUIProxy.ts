/**
 * 控制卡牌显示等规则
 * Created by Administrator on 2015/12/19.
 */
module scene {
    export class GameUIProxy implements IInit, IRelease, IUpdate {

        private _txt_money: egret.TextField = null
        private _txt_name: egret.TextField = null
        private _head: scene.PlayerHeadFrame = null;
        private _timesTxT: egret.BitmapText = null;
        private _gameScene: egret.Sprite = null;
        private _playerTime: PlayerTime = null;
        private _playerHead1: PlayerHead = null;
        private _playerHead2: PlayerHead = null;
        private _houseRunning: HouseRunning = null;
        private _timeTxt: egret.TextField = null;
        private _startTime: number = 0;
        private _autoing: egret.Bitmap = null;
        public constructor() {

        }

        public Init(gs: egret.Sprite): void {
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

            this._playerHead1 = new PlayerHead();
            this._playerHead2 = new PlayerHead();

            /**
             * 倒计时闹钟
             */
            this._playerTime = new PlayerTime();
            this._playerTime.Init();
            this._gameScene.addChild(this._playerTime);
            this._playerTime.visible = false;

            /**
             * 离开房间逃跑
             */
            this._houseRunning = new HouseRunning();
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
        }

        // 命名问题
        // 更新钱money
        public RefreshPlayerInfo(): void {
            this._txt_money.text = "" + data.GameData.money;
        }

        public getPlayerHeadByLoc(loc: number): PlayerHead {
            return this["_playerHead" + loc];
        }

        public UpdateAllCardNum(): void {
            if (<PlayerHead>this["_playerHead" + 1]) {
                (<PlayerHead>this["_playerHead" + 1]).ShowCard = true;
                (<PlayerHead>this["_playerHead" + 1]).UpdateCardNum();
            }

            if (<PlayerHead>this["_playerHead" + 2]) {
                (<PlayerHead>this["_playerHead" + 2]).ShowCard = true;
                (<PlayerHead>this["_playerHead" + 2]).UpdateCardNum();
            }
        }

        public GameOver(): void {
            if (<PlayerHead>this["_playerHead" + 1]) {
                (<PlayerHead>this["_playerHead" + 1]).Ready = false;
                (<PlayerHead>this["_playerHead" + 1]).ShowCard = false;
            }

            if (<PlayerHead>this["_playerHead" + 2]) {
                (<PlayerHead>this["_playerHead" + 2]).Ready = false;
                (<PlayerHead>this["_playerHead" + 2]).ShowCard = false;
            }
            this._playerTime.visible = false;

        }
        /**
         * 进入房间.显示自己的信息和房间已有人的信息
         * @constructor
         */
        public RoomIn(playerlist: Array<data.Player>): void {
           
            for (var p in playerlist) {
                if (playerlist[p].LocalTableId == 1 || playerlist[p].LocalTableId == 2) {
                    this.SetPlayerHead(playerlist[p], true);
                     egret.log(playerlist[p].ShowCardNum+"111111111111111");
                }
            }
            if (<PlayerHead>this["_playerHead" + 1]) {
                (<PlayerHead>this["_playerHead" + 1]).Ready = false;
                (<PlayerHead>this["_playerHead" + 1]).ShowCard = false;
                (<PlayerHead>this["_playerHead" + 1]).LandFlagVisible(false, false);
            }

            if (<PlayerHead>this["_playerHead" + 2]) {
                (<PlayerHead>this["_playerHead" + 2]).Ready = false;
                (<PlayerHead>this["_playerHead" + 2]).ShowCard = false;
                (<PlayerHead>this["_playerHead" + 2]).LandFlagVisible(false, false);
            }
            this.SetTimes("");
            this._playerTime.visible = false;
        }
        /**
         * 设置玩家进度条时间
         * @constructor
         */
        public SetPlayerTime(p: data.Player, delaytime: number): void {
            this._playerTime.SetPoint(p.LocalTableId, delaytime);
            this._playerTime.visible = true;
               this.SetTimes("");
        }

        public RemovePlayerHead(p: data.Player): void {
            if (p == null) {
                return;
            }
            if ((<PlayerHead>this["_playerHead" + p.LocalTableId])) {
                (<PlayerHead>this["_playerHead" + p.LocalTableId]).Release();
            }
        }

        public TurnCallLand(): void {
            if (<PlayerHead>this["_playerHead" + 1]) {
                (<PlayerHead>this["_playerHead" + 1]).ShowCard = true;
            }
            if (<PlayerHead>this["_playerHead" + 2]) {
                (<PlayerHead>this["_playerHead" + 2]).ShowCard = true;
            }

        }

        public SetPlayerHead(p: data.Player, isin: boolean = false): void {
            if (p == null) {
                return;
            }
            (<PlayerHead>this["_playerHead" + p.LocalTableId]).Release();
            (<PlayerHead>this["_playerHead" + p.LocalTableId]).Init(p);
            this._gameScene.addChildAt((<PlayerHead>this["_playerHead" + p.LocalTableId]), 0);
            (<PlayerHead>this["_playerHead" + p.LocalTableId]).Ready = p.IsReady;
            (<PlayerHead>this["_playerHead" + p.LocalTableId]).UpdateCardNum();
            (<PlayerHead>this["_playerHead" + p.LocalTableId]).LandFlagVisible(false, false);
            if (p.LocalTableId == 1) {
                this._playerHead1.x = 65;
                this._playerHead1.y = 190;
            }
            else if (p.LocalTableId == 2) {
                this._playerHead2.x = 475;
                this._playerHead2.y = 190;
            }

            if (isin && p.LocalTableId != 3) {
                var ph: PlayerHead = (<PlayerHead>this["_playerHead" + p.LocalTableId]);
                if (ph) {
                    egret.Tween.removeTweens(ph);
                    var tx: number = ph.x;
                    var fx: number = 0;
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
        }

        //设置地主标
        public SetPlayerLandFlag(landid: number): void {

            if ((<PlayerHead>this["_playerHead" + 1])) {
                (<PlayerHead>this["_playerHead" + 1]).IsLandOwner = false;
                (<PlayerHead>this["_playerHead" + 1]).LandFlagVisible(true, false);
            }
            if ((<PlayerHead>this["_playerHead" + 2])) {
                (<PlayerHead>this["_playerHead" + 2]).IsLandOwner = false;
                (<PlayerHead>this["_playerHead" + 2]).LandFlagVisible(true, false);
            }
            if ((<PlayerHead>this["_playerHead" + landid])) {
                (<PlayerHead>this["_playerHead" + landid]).IsLandOwner = true;
                (<PlayerHead>this["_playerHead" + landid]).LandFlagVisible(true, true);
            }
        }

        //设置准备标
        public SetPlayerReady(tableid: number, isready: boolean): void {
            if (<PlayerHead>this["_playerHead" + tableid]) {
                (<PlayerHead>this["_playerHead" + tableid]).Ready = isready;
            }
        }

        //开始发牌
        public SendCard(): void {
            if (<PlayerHead>this["_playerHead" + 1]) {
                (<PlayerHead>this["_playerHead" + 1]).Ready = false;
                (<PlayerHead>this["_playerHead" + 1]).ShowCard = false;
            }

            if (<PlayerHead>this["_playerHead" + 2]) {
                (<PlayerHead>this["_playerHead" + 2]).Ready = false;
                (<PlayerHead>this["_playerHead" + 2]).ShowCard = false;
            }
            this._startTime = egret.getTimer();
        }


        /**
         * 设置倍数文字
         * @param str
         * @constructor
         */
        public SetTimes(str: string): void {

            if (str != "") {
                this._timesTxT.text = str + "倍";
            }
            else {
                this._timesTxT.text = str;
            }
            this._timesTxT.x = Config.StageWidth - this._timesTxT.textWidth - 10;
        }


        public PushHouseRunning(str): void {
            this._houseRunning.Push(str);
        }
        public Update(): void {
            var ntimer: number = egret.getTimer();
            if (this._playerTime) {
                this._playerTime.Update();
            }
            if (this._houseRunning) {
                this._houseRunning.Update();
            }

            if (this._timeTxt && this._startTime > 0) {
                var dectimer: number = ntimer - this._startTime;
                var strtimer: string = DateTimeTool.GetMinString(dectimer);
                this._timeTxt.text = strtimer;
            }
        }

        public Release(): void {
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
        }

    }
}
