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
            _super.call(this);
            this._downimg = null;
            this._upimg = null;
            this._isselect = true;
            this._downimg = new egret.Bitmap(RES.getRes(upurl));
            this._upimg = new egret.Bitmap(RES.getRes(downurl));
            this._callback = callback;
            this.addChild(this._downimg);
            this.addChild(this._upimg);
            this.touchChildren = false;
            this.touchEnabled = true;
            this._upimg.visible = false;
            this._isselect = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }
        var d = __define,c=SRadio;p=c.prototype;
        p.onTap = function (e) {
            this.SetSelect(!this._isselect);
        };
        p.SetSelect = function (s) {
            this._isselect = s;
            this._upimg.visible = !this._isselect;
            SoundMgr.Instance.PlayEffect("btn_click_mp3");
            this._callback(this._isselect);
        };
        return SRadio;
    })(egret.Sprite);
    scene.SRadio = SRadio;
    egret.registerClass(SRadio,"scene.SRadio");
})(scene || (scene = {}));
