var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var LayerMgr = (function () {
    function LayerMgr() {
    }
    Object.defineProperty(LayerMgr, "Instance", {
        get: function () {
            if (LayerMgr._instance == null) {
                LayerMgr._instance = new LayerMgr();
            }
            return LayerMgr._instance;
        },
        enumerable: true,
        configurable: true
    });
    LayerMgr.prototype.Init = function (main) {
        LayerMgr.Scene = new egret.Sprite();
        LayerMgr.Window = new egret.Sprite();
        LayerMgr.TopUI = new egret.Sprite();
        LayerMgr.MinTop = new egret.Sprite();
        LayerMgr.TopWindow = new egret.Sprite();
        LayerMgr.SysTip = new egret.Sprite();
        main.addChild(LayerMgr.Scene);
        main.addChild(LayerMgr.Window);
        main.addChild(LayerMgr.TopWindow);
        main.addChild(LayerMgr.TopUI); //那个按钮永远都能点
        main.addChild(LayerMgr.MinTop); //那个按钮永远都能点
        main.addChild(LayerMgr.SysTip);
    };
    LayerMgr.Scene = null; //场景
    LayerMgr.Window = null;
    LayerMgr.TopUI = null; //位于window上层的ui,那两个按钮
    LayerMgr.MinTop = null; //位于window上层的ui,那两个按钮
    LayerMgr.TopWindow = null;
    LayerMgr.SysTip = null; //系统消息
    LayerMgr._instance = null;
    return LayerMgr;
}());
__reflect(LayerMgr.prototype, "LayerMgr");
//# sourceMappingURL=LayerMgr.js.map