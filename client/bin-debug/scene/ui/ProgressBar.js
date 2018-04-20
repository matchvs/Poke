/**
 * Created by Administrator on 2015/12/21.
 */
var scene;
(function (scene) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar(bgurl, topurl) {
            if (topurl === void 0) { topurl = null; }
            _super.call(this);
            this._bg = null;
            this._top = null;
            this._topSp = null;
            this._mask = null;
            this._progress = 0;
            this.init(bgurl, topurl);
        }
        var d = __define,c=ProgressBar;p=c.prototype;
        p.init = function (topurl, bgurl) {
            if (bgurl === void 0) { bgurl = null; }
            this.touchEnabled = false;
            this.touchChildren = false;
            if (bgurl) {
                this._bg = new egret.Bitmap(RES.getRes(bgurl));
                this.addChild(this._bg);
            }
            this._top = new egret.Bitmap(RES.getRes(topurl));
            this._topSp = new egret.Sprite();
            if (this._bg) {
                this._topSp.x = (this._bg.width - this._top.width) / 2;
                this._topSp.y = (this._bg.height - this._top.height) / 2;
            }
            this.addChild(this._topSp);
            this._topSp.addChild(this._top);
            //this._mask = new egret.Shape();
            //this._mask.graphics.beginFill(0x000000);
            //this._mask.graphics.drawRect(0, 0, this._top.width, this._top.height);
            //this._topSp.addChild(this._mask);
            //this._topSp.mask = this._mask;
            this._mask = new egret.Bitmap(RES.getRes(topurl));
            this._topSp.addChild(this._mask);
            this._topSp.mask = this._mask;
            this.setProgress(0);
        };
        p.setProgress = function (prog) {
            if (prog > 1 || prog < 0) {
                return;
            }
            this._progress = prog;
            var h = this._top.width;
            this._top.x = -h + prog * h;
        };
        p.GetProgress = function () {
            return this._progress;
        };
        p.Release = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return ProgressBar;
    })(egret.Sprite);
    scene.ProgressBar = ProgressBar;
    egret.registerClass(ProgressBar,"scene.ProgressBar",["IRelease"]);
})(scene || (scene = {}));
