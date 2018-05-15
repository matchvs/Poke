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
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super.call(this) || this;
        _this.that = _this;
        Toast.initRes(_this, "resource/loading/toast-bg.png");
        return _this;
        // this.skinName = skins.AnimationSkin;
    }
    // public tweenGroup: egret.tween.TweenGroup;
    Login.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            Toast.show("click:" + partName);
            if (partName == "play") {
                Toast.show("ceshi");
                // SceneManager.showScene(new Game());
            }
            else if (partName == "bg") {
                this.bgAnim.play();
            }
        }, this);
    };
    Login.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.that.btnAnim.play();
    };
    return Login;
}(eui.Component));
__reflect(Login.prototype, "Login", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Login.js.map