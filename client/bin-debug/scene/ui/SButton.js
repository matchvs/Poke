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
            var _this = _super.call(this) || this;
            _this._clickScale = true;
            _this._downSp = null;
            _this._downimg = null;
            _this._grayimg = null;
            _this._txt = null;
            _this._downScale = 0.9;
            _this._offsetX = 0; //缩放左
            _this._offsetY = 0; //缩放上
            _this._bitTxt = null;
            _this._downSp = new egret.Sprite();
            _this._downimg = new egret.Bitmap(RES.getRes(downurl));
            _this._grayimg = new egret.Bitmap(RES.getRes(upurl));
            _this.addChild(_this._downSp);
            _this._downSp.addChild(_this._downimg);
            _this._downSp.addChild(_this._grayimg);
            _this._offsetX = _this._downimg.width * (1 - _this._downScale) / 2;
            _this._offsetY = _this._downimg.height * (1 - _this._downScale) / 2;
            _this.touchChildren = false;
            _this.touchEnabled = true;
            _this._grayimg.visible = false;
            var rt = RES.getRes(downtxt);
            if (rt == null) {
                _this._txt = new egret.TextField();
                _this._txt.text = downtxt;
                _this._txt.textColor = 0xffffff;
                _this.addChild(_this._txt);
                _this._txt.width = _this._downSp.width;
                _this._txt.textAlign = egret.HorizontalAlign.CENTER;
                _this._txt.x = (_this._downSp.width - _this._txt.width) / 2;
                _this._txt.y = (_this._downSp.height - _this._txt.height) / 2;
            }
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBegin, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onEnd, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.onEnd, _this);
            return _this;
        }
        SButton.prototype.SetWidthHeight = function (w, h) {
            this._downSp.width = w;
            this._downSp.height = h;
            this._grayimg.width = w;
            this._grayimg.height = h;
            this._txt.width = this._downSp.width;
            this._txt.y = (this._downSp.height - this._txt.height) / 2;
        };
        Object.defineProperty(SButton.prototype, "ClickScale", {
            set: function (b) {
                this._clickScale = b;
            },
            enumerable: true,
            configurable: true
        });
        SButton.prototype.ChangeTxt = function (str) {
            this._txt.text = str;
            this._txt.x = (this._downSp.width - this._txt.width) / 2;
            this._txt.y = (this._downSp.height - this._txt.height) / 2;
        };
        SButton.prototype.SetBitTxt = function (str) {
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
        SButton.prototype.SetBit = function (downurl, upurl) {
            if (upurl === void 0) { upurl = null; }
            this._downimg.texture = RES.getRes(downurl);
            this._grayimg.texture = RES.getRes(upurl);
        };
        SButton.prototype.SetTxt = function (size, color, width, tx, ty) {
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
        SButton.prototype.onBegin = function (e) {
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
        SButton.prototype.onEnd = function (e) {
            this._downSp.scaleX = this._downSp.scaleY = 1;
            this._grayimg.scaleX = this._grayimg.scaleY = this._downScale;
            this._downSp.x = 0;
            this._downSp.y = 0;
            this._grayimg.x = 0;
            this._grayimg.y = 0;
        };
        SButton.prototype.init = function () {
        };
        return SButton;
    }(egret.Sprite));
    scene.SButton = SButton;
    __reflect(SButton.prototype, "scene.SButton");
})(scene || (scene = {}));
//# sourceMappingURL=SButton.js.map