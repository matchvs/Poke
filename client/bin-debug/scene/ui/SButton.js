/**
 *
 * @author
 *
 */
var scene;
(function (scene) {
    var SButton = (function (_super) {
        __extends(SButton, _super);
        function SButton(downurl, upurl, downtxt) {
            if (upurl === void 0) { upurl = null; }
            if (downtxt === void 0) { downtxt = null; }
            _super.call(this);
            this._clickScale = true;
            this._downSp = null;
            this._downimg = null;
            this._grayimg = null;
            this._txt = null;
            this._downScale = 0.9;
            this._offsetX = 0; //缩放左
            this._offsetY = 0; //缩放上
            this._bitTxt = null;
            this._downSp = new egret.Sprite();
            this._downimg = new egret.Bitmap(RES.getRes(downurl));
            this._grayimg = new egret.Bitmap(RES.getRes(upurl));
            this.addChild(this._downSp);
            this._downSp.addChild(this._downimg);
            this._downSp.addChild(this._grayimg);
            this._offsetX = this._downimg.width * (1 - this._downScale) / 2;
            this._offsetY = this._downimg.height * (1 - this._downScale) / 2;
            this.touchChildren = false;
            this.touchEnabled = true;
            this._grayimg.visible = false;
            var rt = RES.getRes(downtxt);
            if (rt == null) {
                this._txt = new egret.TextField();
                this._txt.text = downtxt;
                this._txt.textColor = 0xffffff;
                this.addChild(this._txt);
                this._txt.width = this._downSp.width;
                this._txt.textAlign = egret.HorizontalAlign.CENTER;
                this._txt.x = (this._downSp.width - this._txt.width) / 2;
                this._txt.y = (this._downSp.height - this._txt.height) / 2;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        }
        var d = __define,c=SButton;p=c.prototype;
        p.SetWidthHeight = function (w, h) {
            this._downSp.width = w;
            this._downSp.height = h;
            this._grayimg.width = w;
            this._grayimg.height = h;
            this._txt.width = this._downSp.width;
            this._txt.y = (this._downSp.height - this._txt.height) / 2;
        };
        d(p, "ClickScale",undefined
            ,function (b) {
                this._clickScale = b;
            }
        );
        p.ChangeTxt = function (str) {
            this._txt.text = str;
            this._txt.x = (this._downSp.width - this._txt.width) / 2;
            this._txt.y = (this._downSp.height - this._txt.height) / 2;
        };
        p.SetBitTxt = function (str) {
            if (this._bitTxt == null) {
                this._bitTxt = new egret.BitmapText();
                this._bitTxt.font = RES.getRes("timefont_fnt");
                this._bitTxt.scaleX = this._bitTxt.scaleY = 0.5;
                this._downSp.addChild(this._bitTxt);
            }
            this._bitTxt.text = str;
            this._bitTxt.x = this._downSp.width - this._bitTxt.textWidth * 0.5 - 15;
            this._bitTxt.y = this._downSp.height - this._bitTxt.textHeight * 0.5 - 10;
        };
        p.SetBit = function (downurl, upurl) {
            if (upurl === void 0) { upurl = null; }
            this._downimg.texture = RES.getRes(downurl);
            this._grayimg.texture = RES.getRes(upurl);
        };
        p.SetTxt = function (size, color, width, tx, ty) {
            if (size === void 0) { size = 30; }
            if (color === void 0) { color = 0xffffff; }
            if (width === void 0) { width = null; }
            if (tx === void 0) { tx = null; }
            if (ty === void 0) { ty = null; }
            this._txt.size = size;
            this._txt.textColor = color;
            if (width) {
                this._txt.width = width;
            }
            //if(tx)
            //{
            //    this._txt.x=tx;
            //}
            //if(ty)
            //{
            //    this._txt.y=ty;
            //}
            this._txt.x = (this._downSp.width - this._txt.width) / 2;
            this._txt.y = (this._downSp.height - this._txt.height) / 2;
        };
        p.onBegin = function (e) {
            if (this._clickScale) {
                this._downSp.scaleX = this._downSp.scaleY = this._downScale;
                this._grayimg.scaleX = this._grayimg.scaleY = this._downScale;
                this._downSp.x += this._offsetX;
                this._downSp.y += this._offsetY;
                this._grayimg.x += this._offsetX;
                this._grayimg.y += this._offsetY;
            }
            SoundMgr.Instance.PlayEffect("btn_click_mp3");
        };
        p.onEnd = function (e) {
            this._downSp.scaleX = this._downSp.scaleY = 1;
            this._grayimg.scaleX = this._grayimg.scaleY = this._downScale;
            this._downSp.x = 0;
            this._downSp.y = 0;
            this._grayimg.x = 0;
            this._grayimg.y = 0;
        };
        p.init = function () {
        };
        return SButton;
    })(egret.Sprite);
    scene.SButton = SButton;
    egret.registerClass(SButton,"scene.SButton");
})(scene || (scene = {}));
