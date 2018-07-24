
module battle
{
    export class HouseRunning extends egret.Sprite {
        private static BGCOLOR:number=0x000000;
        private static BGHeight:number=45;
        private static BGWidth:number=400;
        private static MaxLen:number=3;
        private _strList:Array<string>=null;
        private _txt:egret.TextField=null;
        private _bgSprite:egret.Shape=null;
        private _scrollRect:egret.Rectangle=null;
        constructor()
        {
            super();
        }

        public Init():void
        {
            this.touchChildren=false;
            this.touchEnabled=false;
            this.cacheAsBitmap=true;
            this._strList=new Array<string>();

            this._bgSprite=new egret.Shape();
            this.addChild(this._bgSprite);
            this.drawBg();

            this._txt=new egret.TextField();
            this._txt.textColor=0xffff00;
            this._txt.y=10;
            this._txt.x=HouseRunning.BGWidth;
            this._txt.size=30;
            this.addChild(this._txt);

            this._scrollRect=new egret.Rectangle(0,0,HouseRunning.BGWidth,HouseRunning.BGHeight);
            this.scrollRect=this._scrollRect;

        }

        public Push(str:string):void
        {
            if(this._strList.length>HouseRunning.MaxLen)
            {
                this._strList.shift();
            }
            this._strList.push(str);
            this.visible=true;
            if(this._strList.length==1)
            {
                this._scrollRect.x=0;
                this._txt.text=this._strList[0];
                this._scrollRect.width=(HouseRunning.BGWidth+this._txt.textWidth);
                this.drawBg();
            }
            this.scrollRect=this._scrollRect;
        }

        private drawBg():void
        {
            if(this._scrollRect==null)
            {
                return;
            }
            this._bgSprite.graphics.clear();
            this._bgSprite.graphics.beginFill(HouseRunning.BGCOLOR,0.4);
            this._bgSprite.graphics.drawRect(0,0,this._scrollRect.width+HouseRunning.BGWidth,HouseRunning.BGHeight);
            this._bgSprite.graphics.endFill();
        }

        public Update():void
        {
            if(this._strList.length<1)
            {
                return;
            }
            this._scrollRect.x+=1;
            if(this.scrollRect.x>(HouseRunning.BGWidth+this._txt.textWidth))
            {
                this._strList.shift();
                if(this._strList.length<1)
                {
                    this.visible=false;
                    return;
                }
                this._scrollRect.x=0;
                this._txt.text=this._strList[0];
                this._scrollRect.width=(HouseRunning.BGWidth+this._txt.textWidth);
                this.drawBg();
            }
            this.scrollRect=this._scrollRect;
        }
    }
}