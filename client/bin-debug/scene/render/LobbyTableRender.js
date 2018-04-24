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
 *
 * @author
 *
 */
var LobbyTableRender = (function (_super) {
    __extends(LobbyTableRender, _super);
    function LobbyTableRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "skins.scene.render.LobbyTableRenderSkin";
        return _this;
    }
    LobbyTableRender.prototype.dataChanged = function () {
        var data = this.data;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleTouchHandler, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toggleTouchHandler, this)
    };
    LobbyTableRender.prototype.toggleTouchHandler = function (evt) {
        trace("222");
    };
    return LobbyTableRender;
}(egret.gui.ItemRenderer));
__reflect(LobbyTableRender.prototype, "LobbyTableRender");
//# sourceMappingURL=LobbyTableRender.js.map