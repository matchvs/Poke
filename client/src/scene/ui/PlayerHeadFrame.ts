/**
 * Created by Administrator on 2015/12/25.
 */
module scene {
    export class PlayerHeadFrame extends egret.Sprite implements IInit,IRelease {
        private _headsp:egret.Sprite = null;
        public constructor() {
            super();
        }

        public Init(avatar:string):void {
            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("ui_head_bg"));
            this._headsp = new egret.Sprite();
            this.addChild(this._headsp);
            this._headsp.addChild(bg);

            RES.getResByUrl(avatar, this.getImgOver, this);
            this.touchChildren=false;
        }

        private getImgOver(data, url):void {
            var bit:egret.Bitmap = new egret.Bitmap(data);
            bit.width = 88;
            bit.height = 88;
            bit.x=6;
            bit.y=6;
            if(this._headsp)
            {
                this._headsp.addChild(bit);
            }
        }

        public Release():void {
            if(this._headsp)
            {
                this._headsp.removeChildren();
            }
            this.removeChildren();

            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}