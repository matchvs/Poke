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
 * Created by Administrator on 2015/12/25.
 */
var scene;
(function (scene) {
    var PlayerHeadFrame = (function (_super) {
        __extends(PlayerHeadFrame, _super);
        function PlayerHeadFrame() {
            var _this = _super.call(this) || this;
            _this._headsp = null;
            return _this;
        }
        PlayerHeadFrame.prototype.Init = function (avatar) {
            var bg = new egret.Bitmap(RES.getRes("ui_head_bg"));
            this._headsp = new egret.Sprite();
            this.addChild(this._headsp);
            this._headsp.addChild(bg);
            RES.getResByUrl(avatar, this.getImgOver, this);
            this.touchChildren = false;
        };
        PlayerHeadFrame.prototype.getImgOver = function (data, url) {
            var bit = new egret.Bitmap(data);
            bit.width = 88;
            bit.height = 88;
            bit.x = 6;
            bit.y = 6;
            if (this._headsp) {
                this._headsp.addChild(bit);
            }
        };
        PlayerHeadFrame.prototype.Release = function () {
            if (this._headsp) {
                this._headsp.removeChildren();
            }
            this.removeChildren();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PlayerHeadFrame;
    }(egret.Sprite));
    scene.PlayerHeadFrame = PlayerHeadFrame;
    __reflect(PlayerHeadFrame.prototype, "scene.PlayerHeadFrame", ["IInit", "IRelease"]);
})(scene || (scene = {}));
//# sourceMappingURL=PlayerHeadFrame.js.map