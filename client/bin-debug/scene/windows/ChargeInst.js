var windowui;
(function (windowui) {
    /**
     * 结算面板
     * Created by Administrator on 2015/12/23.
     */
    var ChargeInst = (function (_super) {
        __extends(ChargeInst, _super);
        function ChargeInst() {
            _super.call(this);
            this._titleBitmap = null;
            this._btn_continue1 = null;
            this._btn_continue2 = null;
            this._btn_continue3 = null;
            this._btn_continue4 = null;
            this.createView();
        }
        var d = __define,c=ChargeInst;p=c.prototype;
        d(ChargeInst, "Instance"
            ,function () {
                if (ChargeInst._instance == null) {
                    ChargeInst._instance = new ChargeInst();
                }
                return ChargeInst._instance;
            }
        );
        p.createView = function () {
            var bg = new egret.Bitmap(RES.getRes("ui_tips_bg"));
            bg.scale9Grid = new egret.Rectangle(50, 20, 20, 15);
            this.addChild(bg);
            bg.width = 450;
            bg.height = 475;
            bg.touchEnabled = true;
            bg.x = 100;
            bg.y = 350;
            var bg = new egret.Bitmap(RES.getRes("title_charge"));
            this.addChild(bg);
            bg.x = 125;
            bg.y = 310;
            this._titleBitmap = bg;
            var bg = new egret.Bitmap(RES.getRes("ui_panel_bg"));
            bg.scale9Grid = new egret.Rectangle(16, 14, 8, 2);
            this.addChild(bg);
            bg.width = 380;
            bg.height = 390;
            bg.x = 130;
            bg.y = 405;
            var bg = new egret.Bitmap(RES.getRes("ui_panel_txt"));
            bg.scale9Grid = new egret.Rectangle(13, 16, 6, 7);
            this.addChild(bg);
            bg.width = 230;
            bg.height = 35;
            bg.x = 140;
            bg.y = 447;
            var titletxt = new egret.TextField();
            titletxt.x = 150;
            titletxt.y = 454;
            titletxt.size = 24;
            titletxt.textColor = 0xff3300;
            titletxt.text = "100金币(1元)";
            titletxt.width = 200;
            titletxt.textAlign = egret.HorizontalAlign.LEFT;
            this.addChild(titletxt);
            this._btn_continue1 = new scene.SButton("btn_queding", null, "");
            this.addChild(this._btn_continue1);
            this._btn_continue1.x = 375;
            this._btn_continue1.y = 435;
            var bg = new egret.Bitmap(RES.getRes("ui_panel_txt"));
            bg.scale9Grid = new egret.Rectangle(13, 16, 6, 7);
            this.addChild(bg);
            bg.width = 230;
            bg.height = 35;
            bg.touchEnabled = true;
            bg.x = 140;
            bg.y = 533;
            var titletxt = new egret.TextField();
            titletxt.x = 150;
            titletxt.y = 540;
            titletxt.size = 24;
            titletxt.textColor = 0xff3300;
            titletxt.text = "600金币(5元)";
            titletxt.width = 200;
            titletxt.textAlign = egret.HorizontalAlign.LEFT;
            this.addChild(titletxt);
            this._btn_continue2 = new scene.SButton("btn_queding", null, "");
            this.addChild(this._btn_continue2);
            this._btn_continue2.x = 375;
            this._btn_continue2.y = 520;
            var bg = new egret.Bitmap(RES.getRes("ui_panel_txt"));
            bg.scale9Grid = new egret.Rectangle(13, 16, 6, 7);
            this.addChild(bg);
            bg.width = 230;
            bg.height = 35;
            bg.touchEnabled = true;
            bg.x = 140;
            bg.y = 618;
            var titletxt = new egret.TextField();
            titletxt.x = 150;
            titletxt.y = 625;
            titletxt.size = 24;
            titletxt.textColor = 0xff3300;
            titletxt.text = "1350金币(10元)";
            titletxt.width = 200;
            titletxt.textAlign = egret.HorizontalAlign.LEFT;
            this.addChild(titletxt);
            this._btn_continue3 = new scene.SButton("btn_queding", null, "");
            this.addChild(this._btn_continue3);
            this._btn_continue3.x = 374;
            this._btn_continue3.y = 605;
            var bg = new egret.Bitmap(RES.getRes("ui_panel_txt"));
            bg.scale9Grid = new egret.Rectangle(13, 16, 6, 7);
            this.addChild(bg);
            bg.width = 230;
            bg.height = 35;
            bg.touchEnabled = true;
            bg.x = 140;
            bg.y = 703;
            var titletxt = new egret.TextField();
            titletxt.x = 150;
            titletxt.y = 710;
            titletxt.size = 24;
            titletxt.textColor = 0xff3300;
            titletxt.text = "3000金币(20元)";
            titletxt.width = 200;
            titletxt.textAlign = egret.HorizontalAlign.LEFT;
            this.addChild(titletxt);
            this._btn_continue4 = new scene.SButton("btn_queding", null, "");
            this.addChild(this._btn_continue4);
            this._btn_continue4.x = 375;
            this._btn_continue4.y = 690;
            //
            this._btn_continue1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this._btn_continue2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this._btn_continue3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this._btn_continue4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this._bgshap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        p.onTouchTap = function (e) {
            var chargeid = 0;
            if (e.currentTarget == this._bgshap) {
                this.Hide();
            }
            else if (e.currentTarget == this._btn_continue1) {
                chargeid = 100;
            }
            else if (e.currentTarget == this._btn_continue2) {
                chargeid = 600;
            }
            else if (e.currentTarget == this._btn_continue3) {
                chargeid = 1350;
            }
            else if (e.currentTarget == this._btn_continue4) {
                chargeid = 3000;
            }
            if (chargeid != 0) {
                var info = {
                    //购买物品id，在开放平台配置的物品id
                    goodsId: "" + chargeid,
                    //购买数量，当前默认传1，暂不支持其他值
                    goodsNumber: "1",
                    //所在服
                    serverId: "1",
                    //透传参数
                    ext: "xx",
                };
                nest.iap.pay(info, function (data) {
                    if (data.result == 0) {
                        //支付成功
                        trace("charge sucess");
                    }
                    else if (data.result == -1) {
                        //支付取消
                        trace("charge cancel");
                    }
                    else {
                        //支付失败
                        trace("charge error");
                    }
                });
            }
        };
        p.Show = function () {
            _super.prototype.Show.call(this);
            LayerMgr.Window.addChild(this);
        };
        p.Hide = function () {
            _super.prototype.Hide.call(this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        ChargeInst._instance = null;
        return ChargeInst;
    })(windowui.WindowsBase);
    windowui.ChargeInst = ChargeInst;
    egret.registerClass(ChargeInst,"windowui.ChargeInst");
})(windowui || (windowui = {}));
