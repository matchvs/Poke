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
 * Created by Administrator on 2015/12/21.
 */
var scene;
(function (scene) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar(bgurl, topurl) {
            if (topurl === void 0) { topurl = null; }
            var _this = _super.call(this) || this;
            _this._bg = null;
            _this._top = null;
            _this._topSp = null;
            _this._mask = null;
            _this._progress = 0;
            _this.init(bgurl, topurl);
            return _this;
        }
        ProgressBar.prototype.init = function (topurl, bgurl) {
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
        ProgressBar.prototype.setProgress = function (prog) {
            if (prog > 1 || prog < 0) {
                return;
            }
            this._progress = prog;
            var h = this._top.width;
            this._top.x = -h + prog * h;
        };
        ProgressBar.prototype.GetProgress = function () {
            return this._progress;
        };
        ProgressBar.prototype.Release = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return ProgressBar;
    }(egret.Sprite));
    scene.ProgressBar = ProgressBar;
    __reflect(ProgressBar.prototype, "scene.ProgressBar", ["IRelease"]);
})(scene || (scene = {}));
//# sourceMappingURL=ProgressBar.js.map