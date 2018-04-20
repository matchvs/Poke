module windowui {
    /**
     * 系统提示框
     * Created by Administrator on 2015/12/23.
     */
    export class WindowsBase extends egret.Sprite implements IWindow {
        public _bgshap:egret.Shape = null;
        public IsShow:boolean=false;
        public constructor() {
            super();
            this.createBaseView();
        }

        public createBaseView():void {
            this._bgshap = new egret.Shape();
            this._bgshap.graphics.beginFill(0x000000, 0.35);
            this._bgshap.graphics.drawRect(0, 0, Config.StageWidth, Config.StageHeight);
            this._bgshap.graphics.endFill();
            this._bgshap.touchEnabled = true;
            this.addChild(this._bgshap);
        }

        public Show(...args) {
            this.IsShow=true;
        }

        public Hide(...args) {
            this.IsShow=false;
        }

    }
}

