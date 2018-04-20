/**
 * 发牌动画
 * Created by Administrator on 2015/12/19.
 */
var scene;
(function (scene) {
    var GameOverAniProxy = (function () {
        function GameOverAniProxy() {
            this._gameScene = null;
            this._txt1 = null;
            this._txt2 = null;
            this._txt3 = null;
        }
        var d = __define,c=GameOverAniProxy;p=c.prototype;
        p.Init = function (gs) {
            this._gameScene = gs;
            this._txt1 = new egret.TextField();
            this._txt2 = new egret.TextField();
            this._txt3 = new egret.TextField();
            this._txt1.size = 50;
            this._txt2.size = 50;
            this._txt3.size = 50;
            this._txt1.x = 150;
            this._txt1.y = 160;
            this._txt2.x = 435;
            this._txt2.y = 160;
            this._txt3.x = 380;
            this._txt3.y = 1060;
            this._txt1.stroke = 2;
            this._txt1.strokeColor = 0x000000;
            this._txt2.stroke = 2;
            this._txt2.strokeColor = 0x000000;
            this._txt3.stroke = 2;
            this._txt3.strokeColor = 0x000000;
        };
        //发牌
        p.Start = function (t1, t2, t3) {
            this._gameScene.removeChildren();
            egret.Tween.removeTweens(this._txt1);
            egret.Tween.removeTweens(this._txt2);
            egret.Tween.removeTweens(this._txt3);
            this._txt1.x = 150;
            this._txt1.y = 160;
            this._txt2.x = 435;
            this._txt2.y = 160;
            this._txt3.x = 380;
            this._txt3.y = 1060;
            //this._gameScene.addChild(this._txt1);
            //this._gameScene.addChild(this._txt2);
            //this._gameScene.addChild(this._txt3);
            if (t1 < 0) {
                this._txt1.textColor = 0xeb6751;
                this._txt1.text = "" + t1;
            }
            else {
                this._txt1.textColor = 0x71d06c;
                this._txt1.text = "+" + t1;
            }
            if (t2 < 0) {
                this._txt2.textColor = 0xeb6751;
                this._txt2.text = "" + t2;
            }
            else {
                this._txt2.textColor = 0x71d06c;
                this._txt2.text = "+" + t2;
            }
            if (t3 < 0) {
                this._txt3.textColor = 0xeb6751;
                this._txt3.text = "" + t3;
            }
            else {
                this._txt3.textColor = 0x71d06c;
                this._txt3.text = "+" + t3;
            }
            egret.Tween.get(this._txt1).to({ y: 0 }, 3000).call(function () {
                if (this._txt1.parent) {
                    this._txt1.parent.removeChild(this._txt1);
                }
            }, this);
            egret.Tween.get(this._txt2).to({ y: 0 }, 3000).call(function () {
                if (this._txt2.parent) {
                    this._txt2.parent.removeChild(this._txt2);
                }
            }, this);
            egret.Tween.get(this._txt3).to({ y: 900 }, 3000).call(function () {
                if (this._txt3.parent) {
                    this._txt3.parent.removeChild(this._txt3);
                }
            }, this);
        };
        p.Release = function () {
            this._gameScene.removeChildren();
        };
        return GameOverAniProxy;
    })();
    scene.GameOverAniProxy = GameOverAniProxy;
    egret.registerClass(GameOverAniProxy,"scene.GameOverAniProxy",["IInit","IRelease"]);
})(scene || (scene = {}));
