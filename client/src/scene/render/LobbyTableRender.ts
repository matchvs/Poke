/**
 *
 * @author
 *
 */
class LobbyTableRender extends egret.gui.ItemRenderer {
    public constructor() {
        super();
        this.skinName = "skins.scene.render.LobbyTableRenderSkin";
    }

    public dataChanged():void {
        var data = this.data;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleTouchHandler, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toggleTouchHandler, this)
    }

    private toggleTouchHandler(evt:egret.Event):void {
        trace("222");
    }
}
