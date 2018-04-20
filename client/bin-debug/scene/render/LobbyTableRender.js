/**
 *
 * @author
 *
 */
var LobbyTableRender = (function (_super) {
    __extends(LobbyTableRender, _super);
    function LobbyTableRender() {
        _super.call(this);
        this.skinName = "skins.scene.render.LobbyTableRenderSkin";
    }
    var d = __define,c=LobbyTableRender;p=c.prototype;
    p.dataChanged = function () {
        var data = this.data;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleTouchHandler, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toggleTouchHandler, this)
    };
    p.toggleTouchHandler = function (evt) {
        trace("222");
    };
    return LobbyTableRender;
})(egret.gui.ItemRenderer);
egret.registerClass(LobbyTableRender,"LobbyTableRender");
