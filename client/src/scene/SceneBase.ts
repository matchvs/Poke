module scene {
    export class SceneBase extends egret.Sprite implements IRelease,IInit {
        public constructor() {
            super();
            this.height = Config.StageHeight;
            this.width = Config.StageWidth;
        }

        public Release() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            LayerMgr.Scene.removeChildren();
            LayerMgr.Window.removeChildren();
            LayerMgr.TopUI.removeChildren();
            LayerMgr.MinTop.removeChildren();
            LayerMgr.TopWindow.removeChildren();
            LayerMgr.SysTip.removeChildren();
        }

        public ResetMin(){

        }

        public Init(...args):void
        {

        }
    }
}