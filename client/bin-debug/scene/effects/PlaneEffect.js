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
 * Created by Administrator on 2016/2/4.
 */
var effect;
(function (effect) {
    var PlaneEffect = (function (_super) {
        __extends(PlaneEffect, _super);
        function PlaneEffect() {
            return _super.call(this) || this;
        }
        PlaneEffect.prototype.Init = function () {
            try {
                this.touchChildren = false;
                this.touchEnabled = false;
                if (this._mc1 == null) {
                    var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("effect_json"), RES.getRes("effect_png"));
                    this._mc1 = new egret.MovieClip(mcDataFactory.generateMovieClipData("plane"));
                }
                this.addChild(this._mc1);
                this._mc1.gotoAndPlay(1, -1);
                this._mc1.x = 640;
                this._mc1.y = 400;
            }
            catch (e) {
                this.Release();
            }
        };
        PlaneEffect.prototype.Update = function () {
            this._mc1.x -= 10;
            if (this._mc1.x < -300) {
                this.Release();
            }
        };
        PlaneEffect.prototype.Release = function () {
            if (this._mc1) {
                this._mc1.gotoAndStop(1);
                if (this._mc1.parent) {
                    this._mc1.parent.removeChild(this._mc1);
                }
            }
        };
        return PlaneEffect;
    }(egret.Sprite));
    effect.PlaneEffect = PlaneEffect;
    __reflect(PlaneEffect.prototype, "effect.PlaneEffect", ["IRelease", "IUpdate", "IInit"]);
})(effect || (effect = {}));
//# sourceMappingURL=PlaneEffect.js.map