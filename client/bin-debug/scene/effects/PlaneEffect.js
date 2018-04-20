/**
 * Created by Administrator on 2016/2/4.
 */
var effect;
(function (effect) {
    var PlaneEffect = (function (_super) {
        __extends(PlaneEffect, _super);
        function PlaneEffect() {
            _super.call(this);
        }
        var d = __define,c=PlaneEffect;p=c.prototype;
        p.Init = function () {
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
        p.Update = function () {
            this._mc1.x -= 10;
            if (this._mc1.x < -300) {
                this.Release();
            }
        };
        p.Release = function () {
            if (this._mc1) {
                this._mc1.gotoAndStop(1);
                if (this._mc1.parent) {
                    this._mc1.parent.removeChild(this._mc1);
                }
            }
        };
        return PlaneEffect;
    })(egret.Sprite);
    effect.PlaneEffect = PlaneEffect;
    egret.registerClass(PlaneEffect,"effect.PlaneEffect",["IRelease","IUpdate","IInit"]);
})(effect || (effect = {}));
