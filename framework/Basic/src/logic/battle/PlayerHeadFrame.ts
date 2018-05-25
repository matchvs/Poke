/**
 * Created by Administrator on 2015/12/25.
 */
module battle {
    export class PlayerHeadFrame extends egret.Sprite {
        private _headsp:egret.Sprite = null;
        public constructor() {
            super();
        }

        public Init(avatar:string):void {
            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("ui_head_bg"));
            this._headsp = new egret.Sprite();
            this.addChild(this._headsp);
            this._headsp.addChild(bg);
            let headImg = new  eui.Image();
            headImg.width = 88;
            headImg.height = 88;
            headImg.x = 6;
            headImg.y = 6;
            headImg.source = avatar;
            this._headsp.addChild(headImg);
            //RES.getResByUrl(avatar, this.getImgOver, this,RES.ResourceItem.TYPE_IMAGE);
            this.touchChildren=false;
        }

        // private getImgOver(event:egret.Texture):void {
        //     console.log("getImgOver",event);
        //     var bit:egret.Bitmap = new egret.Bitmap(event);
        //     bit.width = 88;
        //     bit.height = 88;
        //     bit.x=6;
        //     bit.y=6;
        //     if(this._headsp)
        //     {
        //         this._headsp.addChild(bit);
        //     }
        // }

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