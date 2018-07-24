/**
 *
 * @author
 *
 */
module battle {
    export class BattleBtnUI extends egret.Sprite {
        private _clickScale:boolean=true;
        private _downSp:egret.Sprite=null
        private _downimg:egret.Bitmap = null;
        private _grayimg:egret.Bitmap = null;
        private _txt:egret.TextField = null;
        private _downScale:number=0.9;
        private _offsetX:number=0;              //缩放左
        private _offsetY:number=0;              //缩放上
        private _bitTxt:egret.BitmapText=null;
        public constructor(downurl:string, upurl:string = null, downtxt:string = null) {
            super();
            this._downSp=new egret.Sprite();
            this._downimg = new egret.Bitmap(RES.getRes(downurl));
            this._grayimg = new egret.Bitmap(RES.getRes(upurl));
            this.addChild(this._downSp);
            this._downSp.addChild(this._downimg);
            this._downSp.addChild(this._grayimg);
            this._offsetX=this._downimg.width*(1-this._downScale)/2;
            this._offsetY=this._downimg.height*(1-this._downScale)/2;
            this.touchChildren = false;
            this.touchEnabled = true;
            this._grayimg.visible = false;

            var rt = RES.getRes(downtxt);
            if (rt == null) {
                this._txt = new egret.TextField();
                this._txt.text = downtxt;
                this._txt.textColor = 0xffffff;
                this.addChild(this._txt);
                this._txt.width = this._downSp.width;
                this._txt.textAlign = egret.HorizontalAlign.CENTER;
                this._txt.x = (this._downSp.width - this._txt.width) / 2;
                this._txt.y = (this._downSp.height - this._txt.height) / 2;
            }


            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        }

        public SetWidthHeight(w:number, h:number):void {
            this._downSp.width = w;
            this._downSp.height = h;
            this._grayimg.width = w;
            this._grayimg.height = h;
            this._txt.width = this._downSp.width;
            this._txt.y = (this._downSp.height - this._txt.height) / 2;
        }
        public set ClickScale(b:boolean)
        {
            this._clickScale=b;
        }

        public ChangeTxt(str:string):void
        {
            this._txt.text=str;
            this._txt.x = (this._downSp.width - this._txt.width) / 2;
            this._txt.y = (this._downSp.height - this._txt.height) / 2;
        }

        public SetBitTxt(str:string):void
        {
            if(this._bitTxt==null)
            {
                this._bitTxt = new egret.BitmapText();
                this._bitTxt.font = RES.getRes("timefont_fnt");
                this._bitTxt.scaleX=this._bitTxt.scaleY=0.5;
                this._downSp.addChild(this._bitTxt);
            }
            this._bitTxt.text = str;
            this._bitTxt.x = this._downSp.width - this._bitTxt.textWidth*0.5-15;
            this._bitTxt.y = this._downSp.height - this._bitTxt.textHeight*0.5-10;
        }
        public SetBit(downurl:string, upurl:string = null):void
        {
            this._downimg.texture = RES.getRes(downurl);
            this._grayimg.texture = RES.getRes(upurl);
        }
        public SetTxt(size:number=30, color:number=0xffffff,width:number=null,tx:number=null,ty:number=null):void {
            this._txt.size = size;
            this._txt.textColor = color;
            if(width)
            {
                this._txt.width=width;
            }

            this._txt.x = (this._downSp.width - this._txt.width) / 2;
            this._txt.y = (this._downSp.height - this._txt.height) / 2;
        }

        private onBegin(e:egret.TouchEvent) {
            if( this._clickScale)
            {
                this._downSp.scaleX=this._downSp.scaleY=this._downScale;
                this._grayimg.scaleX=this._grayimg.scaleY=this._downScale;
                this._downSp.x+=this._offsetX;
                this._downSp.y+=this._offsetY;
                this._grayimg.x+=this._offsetX;
                this._grayimg.y+=this._offsetY;
            }
            // SoundMgr.Instance.PlayEffect("btn_click_mp3");
        }

        private onEnd(e:egret.TouchEvent) {
            this._downSp.scaleX=this._downSp.scaleY=1;
            this._grayimg.scaleX=this._grayimg.scaleY=this._downScale;
            this._downSp.x=0;
            this._downSp.y=0;
            this._grayimg.x=0;
            this._grayimg.y=0;
        }

        private init() {

        }

    }
}
