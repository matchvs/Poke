var windowui;
(function (windowui) {
    /**
     * 系统提示框
     * Created by Administrator on 2015/12/23.
     */
    var SysTipsInst = (function (_super) {
        __extends(SysTipsInst, _super);
        function SysTipsInst() {
            _super.call(this);
            this._iscreat = false;
            this._okfun = null;
            this._okObj = null;
            this._txt = null;
            this._okBtn = null;
            this._bg = null;
            this.touchChildren = true;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }
        var d = __define,c=SysTipsInst;p=c.prototype;
        p.createView = function () {
            if (this._iscreat) {
                return;
            }
            var aa = RES.getRes("ui_tips_bg");
            this._bg = new egret.Bitmap(aa);
            this._bg.scale9Grid = new egret.Rectangle(50, 20, 20, 15);
            this.addChild(this._bg);
            this._bg.width = 438;
            this._bg.height = 285;
            this._bg.x = 115;
            this._bg.y = 440;
            var aa = RES.getRes("ui_panel_txt");
            var tbg = new egret.Bitmap(aa);
            tbg.scale9Grid = new egret.Rectangle(13, 16, 6, 7);
            this.addChild(tbg);
            tbg.width = 285;
            tbg.height = 160;
            tbg.x = 224;
            tbg.y = 488;
            this._txt = new egret.TextField();
            this._txt.text = "";
            this._txt.textColor = 0xAA462E;
            this.addChild(this._txt);
            this._txt.width = 265;
            this._txt.height = 143;
            this._txt.textAlign = egret.HorizontalAlign.LEFT;
            this._txt.x = 235;
            this._txt.y = 495;
            var aa = RES.getRes("title1");
            var tbg = new egret.Bitmap(aa);
            this.addChild(tbg);
            tbg.x = 300;
            tbg.y = 425;
            var aa = RES.getRes("ui_role1");
            var tbg = new egret.Bitmap(aa);
            this.addChild(tbg);
            tbg.x = 31;
            tbg.y = 470;
            this._okBtn = new scene.SButton("btn_queding");
            this._okBtn.x = 285;
            this._okBtn.y = 650;
            this.addChild(this._okBtn);
            this._iscreat = true;
        };
        p.Show = function (txt, okfun, thisObj, hasokbtn, btntxt) {
            if (okfun === void 0) { okfun = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (hasokbtn === void 0) { hasokbtn = false; }
            if (btntxt === void 0) { btntxt = "确定"; }
            _super.prototype.Show.call(this);
            this.createView();
            if (this._txt) {
                this._txt.textFlow = new egret.HtmlTextParser().parser(txt);
            }
            LayerMgr.TopWindow.addChild(this);
            if (hasokbtn) {
                this._okBtn.visible = true;
            }
            else {
                this._okBtn.visible = false;
            }
            this._okfun = okfun;
            this._okObj = thisObj;
        };
        p.onTap = function (e) {
            if (this._okBtn.visible && e.target == this._okBtn) {
                if (this._okfun) {
                    if (this._okObj) {
                        this._okfun.call(this._okObj);
                    }
                    else {
                        this._okfun();
                    }
                }
                return;
            }
            if (this._okBtn.visible == false && this._okfun) {
                if (this._okObj) {
                    this._okfun.call(this._okObj);
                }
                else {
                    this._okfun();
                }
            }
        };
        p.getText = function () {
            if (this._txt) {
                return this._txt.text;
            }
            return "";
        };
        p.Hide = function () {
            _super.prototype.Hide.call(this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        d(SysTipsInst, "Instance"
            ,function () {
                if (SysTipsInst._instance == null) {
                    SysTipsInst._instance = new SysTipsInst();
                }
                return SysTipsInst._instance;
            }
        );
        p.setSkin = function () {
        };
        SysTipsInst._instance = null;
        return SysTipsInst;
    })(windowui.WindowsBase);
    windowui.SysTipsInst = SysTipsInst;
    egret.registerClass(SysTipsInst,"windowui.SysTipsInst");
})(windowui || (windowui = {}));
