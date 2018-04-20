/**
 * Created by Administrator on 2016/2/4.
 */
var effect;
(function (effect) {
    var BombEffect = (function (_super) {
        __extends(BombEffect, _super);
        function BombEffect() {
            _super.call(this);
        }
        var d = __define,c=BombEffect;p=c.prototype;
        p.Init = function () {
            try {
                this.touchChildren = false;
                this.touchEnabled = false;
                if (this._mc1 == null) {
                    var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("effect_json"), RES.getRes("effect_png"));
                    this._mc1 = new egret.MovieClip(mcDataFactory.generateMovieClipData("bomb"));
                }
                this._mc1.addEventListener(egret.Event.ENTER_FRAME, this.mc1frame, this);
                this.addChild(this._mc1);
                this._mc1.gotoAndPlay(1);
                this._mc1.x = 320;
                this._mc1.y = 500;
            }
            catch (e) {
                this.Release();
            }
        };
        p.Update = function () {
        };
        p.mc1frame = function (e) {
            try {
                if (this._mc1.currentFrame == this._mc1.totalFrames) {
                    this.Release();
                }
            }
            catch (e) {
                this.Release();
            }
        };
        p.Release = function () {
            if (this._mc1) {
                this._mc1.gotoAndStop(1);
                this._mc1.removeEventListener(egret.Event.ENTER_FRAME, this.mc1frame, this);
                if (this._mc1.parent) {
                    this._mc1.parent.removeChild(this._mc1);
                }
            }
        };
        return BombEffect;
    })(egret.Sprite);
    effect.BombEffect = BombEffect;
    egret.registerClass(BombEffect,"effect.BombEffect",["IRelease","IUpdate","IInit"]);
})(effect || (effect = {}));
