/**
 * Created by Administrator on 2015/12/25.
 */
var scene;
(function (scene) {
    var PlayerHeadFrame = (function (_super) {
        __extends(PlayerHeadFrame, _super);
        function PlayerHeadFrame() {
            _super.call(this);
            this._headsp = null;
        }
        var d = __define,c=PlayerHeadFrame;p=c.prototype;
        p.Init = function (avatar) {
            var bg = new egret.Bitmap(RES.getRes("ui_head_bg"));
            this._headsp = new egret.Sprite();
            this.addChild(this._headsp);
            this._headsp.addChild(bg);
            RES.getResByUrl(avatar, this.getImgOver, this);
            this.touchChildren = false;
        };
        p.getImgOver = function (data, url) {
            var bit = new egret.Bitmap(data);
            bit.width = 88;
            bit.height = 88;
            bit.x = 6;
            bit.y = 6;
            if (this._headsp) {
                this._headsp.addChild(bit);
            }
        };
        p.Release = function () {
            if (this._headsp) {
                this._headsp.removeChildren();
            }
            this.removeChildren();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PlayerHeadFrame;
    })(egret.Sprite);
    scene.PlayerHeadFrame = PlayerHeadFrame;
    egret.registerClass(PlayerHeadFrame,"scene.PlayerHeadFrame",["IInit","IRelease"]);
})(scene || (scene = {}));
