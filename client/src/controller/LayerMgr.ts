/**
 *
 * @author
 *
 */
class LayerMgr {
    public static Scene:egret.Sprite = null;       //场景
    public static Window:egret.Sprite = null;
    public static TopUI:egret.Sprite = null;        //位于window上层的ui,那两个按钮
    public static MinTop:egret.Sprite =null;        //位于window上层的ui,那两个按钮
    public static TopWindow:egret.Sprite = null;
    public static SysTip:egret.Sprite = null;  //系统消息

    private static _instance:LayerMgr = null;

    public constructor() {
    }

    public static get Instance():LayerMgr {
        if (LayerMgr._instance == null) {
            LayerMgr._instance = new LayerMgr();
        }
        return LayerMgr._instance;
    }

    public Init(main:egret.DisplayObjectContainer) {
        LayerMgr.Scene = new egret.Sprite();
        LayerMgr.Window = new egret.Sprite();
        LayerMgr.TopUI=new egret.Sprite();
        LayerMgr.MinTop=new egret.Sprite();
        LayerMgr.TopWindow=new egret.Sprite();
        LayerMgr.SysTip = new egret.Sprite();

        main.addChild(LayerMgr.Scene);
        main.addChild(LayerMgr.Window);
        main.addChild(LayerMgr.TopWindow);
        main.addChild(LayerMgr.TopUI);    //那个按钮永远都能点
        main.addChild(LayerMgr.MinTop);    //那个按钮永远都能点
        main.addChild(LayerMgr.SysTip);
    }
}
