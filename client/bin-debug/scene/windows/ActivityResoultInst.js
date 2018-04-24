var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var windowui;
(function (windowui) {
    /**
     * 结算面板
     * Created by Administrator on 2015/12/23.
     */
    var ActivityResoultInst = (function (_super) {
        __extends(ActivityResoultInst, _super);
        function ActivityResoultInst() {
            var _this = _super.call(this) || this;
            _this._infoSprite = null;
            _this._btn_continue = null;
            _this._whowintxt = null;
            _this.createView();
            return _this;
        }
        Object.defineProperty(ActivityResoultInst, "Instance", {
            get: function () {
                if (ActivityResoultInst._instance == null) {
                    ActivityResoultInst._instance = new ActivityResoultInst();
                }
                return ActivityResoultInst._instance;
            },
            enumerable: true,
            configurable: true
        });
        ActivityResoultInst.prototype.createView = function () {
            var bg = new egret.Bitmap(RES.getRes("ui_window_bg"));
            bg.scale9Grid = new egret.Rectangle(45, 135, 440, 20);
            this.addChild(bg);
            bg.height = 800;
            bg.touchEnabled = true;
            bg.x = 55;
            bg.y = 140;
            var bg = new egret.Bitmap(RES.getRes("ui_window_item1"));
            bg.scale9Grid = new egret.Rectangle(16, 14, 8, 2);
            this.addChild(bg);
            bg.width = 505;
            bg.height = 110;
            bg.touchEnabled = true;
            bg.x = 67;
            bg.y = 290;
            var bg = new egret.Bitmap(RES.getRes("ui_window_item1"));
            bg.scale9Grid = new egret.Rectangle(16, 14, 8, 2);
            this.addChild(bg);
            bg.width = 505;
            bg.height = 110;
            bg.touchEnabled = true;
            bg.x = 67;
            bg.y = 410;
            var bg = new egret.Bitmap(RES.getRes("ui_window_item1"));
            bg.scale9Grid = new egret.Rectangle(16, 14, 8, 2);
            this.addChild(bg);
            bg.width = 505;
            bg.height = 110;
            bg.touchEnabled = true;
            bg.x = 67;
            bg.y = 530;
            var bg = new egret.Bitmap(RES.getRes("ui_window_item2"));
            bg.scale9Grid = new egret.Rectangle(14, 14, 3, 28);
            this.addChild(bg);
            bg.width = 505;
            bg.touchEnabled = true;
            bg.x = 67;
            bg.y = 660;
            var bg = new egret.Bitmap(RES.getRes("ui_window_item2"));
            bg.scale9Grid = new egret.Rectangle(14, 14, 3, 28);
            this.addChild(bg);
            bg.width = 505;
            bg.touchEnabled = true;
            bg.x = 67;
            bg.y = 740;
            var bg = new egret.Bitmap(RES.getRes("ui_window_item2"));
            bg.scale9Grid = new egret.Rectangle(14, 14, 3, 28);
            this.addChild(bg);
            bg.width = 505;
            bg.touchEnabled = true;
            bg.x = 67;
            bg.y = 820;
            var titletxt = new egret.TextField();
            titletxt.x = 105;
            titletxt.y = 670;
            titletxt.size = 28;
            titletxt.textColor = 0xffffff;
            titletxt.text = "当前活动排名";
            titletxt.textAlign = egret.HorizontalAlign.LEFT;
            this.addChild(titletxt);
            var titletxt = new egret.TextField();
            titletxt.x = 105;
            titletxt.y = 750;
            titletxt.size = 28;
            titletxt.textColor = 0xffffff;
            titletxt.text = "当前活动积分";
            titletxt.textAlign = egret.HorizontalAlign.LEFT;
            this.addChild(titletxt);
            var titletxt = new egret.TextField();
            titletxt.x = 105;
            titletxt.y = 830;
            titletxt.size = 28;
            titletxt.textColor = 0xffffff;
            titletxt.text = "本次活动最高积分";
            titletxt.textAlign = egret.HorizontalAlign.LEFT;
            this.addChild(titletxt);
            var titletxt = new egret.TextField();
            titletxt.x = 67;
            titletxt.y = 160;
            titletxt.size = 28;
            titletxt.width = 505;
            titletxt.textColor = 0xa9d1ed;
            titletxt.text = "结算";
            titletxt.textAlign = egret.HorizontalAlign.CENTER;
            this.addChild(titletxt);
            this._whowintxt = new egret.TextField();
            this._whowintxt.x = 67;
            this._whowintxt.y = 228;
            this._whowintxt.size = 32;
            this._whowintxt.width = 505;
            this._whowintxt.textColor = 0xffffff;
            this._whowintxt.text = "地主胜";
            this._whowintxt.textAlign = egret.HorizontalAlign.CENTER;
            this.addChild(this._whowintxt);
            //this._btn_continue=new scene.SButton("btn_common",null,"继续");
            //this.addChild(this._btn_continue);
            //this._btn_continue.x=150;
            //this._btn_continue.y=940;
            //
            //this._btn_continue.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
            this._bgshap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        ActivityResoultInst.prototype.InitInfo = function (p1, p2, p3, islandwin, actrank, actHScore, actmoney) {
            if (this._infoSprite == null) {
                this._infoSprite = new egret.Sprite();
                this.addChild(this._infoSprite);
            }
            this._infoSprite.removeChildren();
            if (p1) {
                var playerHead1 = new scene.PlayerHead();
                playerHead1.Init(p1);
                playerHead1.x = 88;
                playerHead1.y = 310;
                playerHead1.Ready = false;
                playerHead1.touchEnabled = false;
                playerHead1.touchChildren = false;
                this._infoSprite.addChild(playerHead1);
                var titletxt = new egret.TextField();
                titletxt.x = 203;
                titletxt.y = 310;
                titletxt.size = 28;
                titletxt.textColor = 0xffeb41;
                titletxt.text = p1 ? p1.nickname : "";
                titletxt.textAlign = egret.HorizontalAlign.CENTER;
                this._infoSprite.addChild(titletxt);
                if ((p1.money + p1.ResoultScore) <= 0) {
                    titletxt.textColor = 0xaaaaaa;
                }
                var tcolor = 0xeb6751;
                if (p1.ResoultScore < 0) {
                    tcolor = 0xeb6751;
                }
                else {
                    tcolor = 0x71d06c;
                }
                var titletxt = new egret.TextField();
                titletxt.x = 340;
                titletxt.y = 340;
                titletxt.size = 32;
                titletxt.textColor = 0xffeb41;
                titletxt.text = "" + p1.ResoultScore;
                titletxt.width = 200;
                titletxt.textAlign = egret.HorizontalAlign.RIGHT;
                this._infoSprite.addChild(titletxt);
                if ((p1.money + p1.ResoultScore) <= 0) {
                    titletxt.textColor = 0xaaaaaa;
                    titletxt.textFlow = new egret.HtmlTextParser().parser(titletxt.text + "<font color='0xff0000'>(已淘汰)</font>");
                }
            }
            if (p2) {
                var playerHead2 = new scene.PlayerHead();
                playerHead2.Init(p2);
                playerHead2.x = 88;
                playerHead2.y = 430;
                playerHead2.Ready = false;
                playerHead2.touchEnabled = false;
                playerHead2.touchChildren = false;
                this._infoSprite.addChild(playerHead2);
                var titletxt = new egret.TextField();
                titletxt.x = 203;
                titletxt.y = 430;
                titletxt.size = 28;
                titletxt.textColor = 0x71d06c;
                titletxt.text = p2 ? p2.nickname : "";
                titletxt.textAlign = egret.HorizontalAlign.CENTER;
                this._infoSprite.addChild(titletxt);
                if ((p2.money + p2.ResoultScore) <= 0) {
                    titletxt.textColor = 0xaaaaaa;
                }
                var tcolor = 0xeb6751;
                if (p2.ResoultScore < 0) {
                    tcolor = 0xeb6751;
                }
                else {
                    tcolor = 0x71d06c;
                }
                var titletxt = new egret.TextField();
                titletxt.x = 340;
                titletxt.y = 450;
                titletxt.size = 32;
                titletxt.textColor = 0x71d06c;
                titletxt.text = "" + (p2 ? p2.ResoultScore : "");
                titletxt.width = 200;
                titletxt.textAlign = egret.HorizontalAlign.RIGHT;
                this._infoSprite.addChild(titletxt);
                if ((p2.money + p2.ResoultScore) <= 0) {
                    titletxt.textColor = 0xaaaaaa;
                    titletxt.textFlow = new egret.HtmlTextParser().parser(titletxt.text + "<font color='0xff0000'>(已淘汰)</font>");
                }
            }
            if (p3) {
                var playerHead3 = new scene.PlayerHead();
                playerHead3.Init(p3);
                playerHead3.x = 88;
                playerHead3.y = 550;
                playerHead3.Ready = false;
                playerHead3.touchEnabled = false;
                playerHead3.touchChildren = false;
                this._infoSprite.addChild(playerHead3);
                var titletxt = new egret.TextField();
                titletxt.x = 203;
                titletxt.y = 550;
                titletxt.size = 28;
                titletxt.textColor = 0x71d06c;
                titletxt.text = p3 ? p3.nickname : "";
                titletxt.textAlign = egret.HorizontalAlign.CENTER;
                this._infoSprite.addChild(titletxt);
                if ((p3.money + p3.ResoultScore) <= 0) {
                    titletxt.textColor = 0xaaaaaa;
                }
                var tcolor = 0xeb6751;
                if (p3.ResoultScore < 0) {
                    tcolor = 0xeb6751;
                }
                else {
                    tcolor = 0x71d06c;
                }
                var titletxt = new egret.TextField();
                titletxt.x = 340;
                titletxt.y = 570;
                titletxt.size = 32;
                titletxt.textColor = 0x71d06c;
                titletxt.text = "" + (p3 ? p3.ResoultScore : "");
                titletxt.width = 200;
                titletxt.textAlign = egret.HorizontalAlign.RIGHT;
                this._infoSprite.addChild(titletxt);
                if ((p3.money + p3.ResoultScore) <= 0) {
                    titletxt.textColor = 0xaaaaaa;
                    titletxt.textFlow = new egret.HtmlTextParser().parser(titletxt.text + "<font color='0xff0000'>(已淘汰)</font>");
                }
            }
            if (islandwin) {
                this._whowintxt.text = "地主胜";
            }
            else {
                this._whowintxt.text = "农民胜";
            }
            //活动排名
            var titletxt = new egret.TextField();
            titletxt.x = 360;
            titletxt.y = 670;
            titletxt.width = 190;
            titletxt.size = 28;
            titletxt.textColor = 0xe3b259;
            titletxt.text = "NO." + actrank;
            titletxt.textAlign = egret.HorizontalAlign.RIGHT;
            this._infoSprite.addChild(titletxt);
            //活动积分
            var titletxt = new egret.TextField();
            titletxt.x = 360;
            titletxt.y = 750;
            titletxt.width = 190;
            titletxt.size = 28;
            titletxt.textColor = 0xe3b259;
            titletxt.text = "" + actmoney;
            titletxt.textAlign = egret.HorizontalAlign.RIGHT;
            this._infoSprite.addChild(titletxt);
            //最高积分
            var titletxt = new egret.TextField();
            titletxt.x = 360;
            titletxt.y = 830;
            titletxt.width = 190;
            titletxt.size = 28;
            titletxt.textColor = 0xe3b259;
            titletxt.text = "" + actHScore;
            titletxt.textAlign = egret.HorizontalAlign.RIGHT;
            this._infoSprite.addChild(titletxt);
        };
        ActivityResoultInst.prototype.onTouchTap = function (e) {
            if (e.currentTarget == this._bgshap) {
                SceneMgr.Instance.GetCurrentScene().ReStart();
                this.Hide();
            }
            else if (e.currentTarget == this._btn_continue) {
                SceneMgr.Instance.GetCurrentScene().ReStart();
                this.Hide();
            }
        };
        ActivityResoultInst.prototype.Show = function () {
            _super.prototype.Show.call(this);
            LayerMgr.Window.addChild(this);
            egret.setTimeout(function () {
                if (this.IsShow) {
                    SceneMgr.Instance.GetCurrentScene().ReStart();
                    this.Hide();
                }
            }, this, 10000);
        };
        ActivityResoultInst.prototype.Hide = function () {
            _super.prototype.Hide.call(this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        ActivityResoultInst._instance = null;
        return ActivityResoultInst;
    }(windowui.WindowsBase));
    windowui.ActivityResoultInst = ActivityResoultInst;
    __reflect(ActivityResoultInst.prototype, "windowui.ActivityResoultInst");
})(windowui || (windowui = {}));
//# sourceMappingURL=ActivityResoultInst.js.map