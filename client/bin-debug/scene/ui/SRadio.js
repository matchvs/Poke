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
    var SRadio = (function (_super) {
        __extends(SRadio, _super);
        function SRadio(downurl, upurl, callback) {
            var _this = _super.call(this) || this;
            _this._downimg = null;
            _this._upimg = null;
            _this._isselect = true;
            _this._downimg = new egret.Bitmap(RES.getRes(upurl));
            _this._upimg = new egret.Bitmap(RES.getRes(downurl));
            _this._callback = callback;
            _this.addChild(_this._downimg);
            _this.addChild(_this._upimg);
            _this.touchChildren = false;
            _this.touchEnabled = true;
            _this._upimg.visible = false;
            _this._isselect = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
            return _this;
        }
        SRadio.prototype.onTap = function (e) {
            this.SetSelect(!this._isselect);
        };
        SRadio.prototype.SetSelect = function (s) {
            this._isselect = s;
            this._upimg.visible = !this._isselect;
            SoundMgr.Instance.PlayEffect("btn_click_mp3");
            this._callback(this._isselect);
        };
        return SRadio;
    }(egret.Sprite));
    scene.SRadio = SRadio;
    __reflect(SRadio.prototype, "scene.SRadio");
})(scene || (scene = {}));
//# sourceMappingURL=SRadio.js.map