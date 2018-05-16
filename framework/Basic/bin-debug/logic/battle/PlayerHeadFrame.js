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
var battle;
(function (battle) {
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
            RES.getResByUrl(avatar, this.getImgOver, this, RES.ResourceItem.TYPE_IMAGE);
            this.touchChildren = false;
        };
        PlayerHeadFrame.prototype.getImgOver = function (event) {
            console.log("getImgOver", event);
            var bit = new egret.Bitmap(event);
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
    battle.PlayerHeadFrame = PlayerHeadFrame;
    __reflect(PlayerHeadFrame.prototype, "battle.PlayerHeadFrame");
})(battle || (battle = {}));
//# sourceMappingURL=PlayerHeadFrame.js.map