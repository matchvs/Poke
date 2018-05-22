/**
 * 显示对手头像
 */
module battle {
    export class PlayerHead extends egret.Sprite {
        private _playerData:Player=null;
        private _pInfo:PlayerInfo = null;
        private _headsp:PlayerHeadFrame = null;
        private _avatarsp:egret.Sprite=null;
        private _backCardSp:egret.Sprite=null;          //对手玩家的背面牌
        private _isReady:boolean = false;
        private _isAuto:boolean=false;
        private _isOwner:boolean = false;
        private _loc:number = 0;                      //位置 ,1左上,2右上,3下

        private _ready_hand:egret.Bitmap = null;
        private _landflag:egret.Bitmap=null;
        private _cardNumTxt:egret.TextField=null;

        public _init:boolean=false;

        public constructor() {
            super();
        }

        public Init(pd:Player):void {
            if(this._init)
            {
                console.log("请先执行release");
                return;
            }
            this.touchEnabled = false;
            this._loc = pd.LocalTableId;
            this._playerData=pd;

            this.setReady();
            this.setHead();
            this.setBackCard();
            this.setTapInfo();
            this.Ready=true;
            this.ShowCard=false;

            this._headsp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this._headsp.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this._headsp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);

            this._init=true;
        }

        private setHead():void
        {
            this._headsp = new PlayerHeadFrame();
            this._headsp.Init(this._playerData.avator);
            this.addChild(this._headsp);
            this._headsp.touchEnabled = true;
        }

        private setTapInfo():void
        {
            this._pInfo = new PlayerInfo();
            this._pInfo.Init(this._playerData);
            this.addChild(this._pInfo);
            if (this._loc == 1) {
                this._pInfo.x = 100;
                this._pInfo.y = 0;
            }
            else if (this._loc == 2) {
                this._pInfo.x = -202;
                this._pInfo.y = 0;
            }
            else if (this._loc == 3) {
                this._pInfo.x = 100;
                this._pInfo.y = -125;
            }
            this._pInfo.touchChildren = false;
            this._pInfo.touchEnabled = false;
            this._pInfo.visible = false;
        }

        private setReady():void
        {

            this._ready_hand = new egret.Bitmap(RES.getRes("ui_ready_hand"));
            this.addChild(this._ready_hand);
            this._ready_hand.x = -45;
            this._ready_hand.y = 0;
            this._ready_hand.visible = false;
        }

        private setBackCard():void
        {
            if(this._loc==3)
            {
                return;
            }
            this._backCardSp=new egret.Sprite();
            this.addChild(this._backCardSp);
            var i:number=0;
            for(i=0;i<1;i++)
            {
                var card:CardUI=MandPool.getInsByParm(CardUI,0);
                this._backCardSp.addChild(card);
                card.x=0+i*10;
                card.y=0;
            }
            this._backCardSp.scaleX=this._backCardSp.scaleY=0.5;

            this._cardNumTxt=new egret.TextField();
            this._cardNumTxt.width=200;//120;
            this._cardNumTxt.size=100;//90
            this._cardNumTxt.textColor=0xffff33;//0x00ffff;//0x3abdff;
            this._cardNumTxt.stroke=5;
            this._cardNumTxt.strokeColor=0x990000;
            this._cardNumTxt.textAlign=egret.HorizontalAlign.CENTER;
            this._backCardSp.addChild(this._cardNumTxt);
            this._cardNumTxt.text="17";

            this._cardNumTxt.x=-35;
            this._cardNumTxt.y=50;
            if(this._loc==1)
            {
                this._backCardSp.x=100;//45;
            }
            else if(this._loc==2)
            {
                this._backCardSp.x=-70;
            }
            this._backCardSp.y=10;
            this._backCardSp.cacheAsBitmap=true;
        }

        public set ShowCard(isshow)
        {
            if(this._backCardSp)
            {
                this._backCardSp.visible=isshow;
                if(isshow==false)
                {
                    this._cardNumTxt.text="";
                }
            }
        }

        public UpdateCardNum():void
        {
            console.info("UpdateCardNum "+this._playerData.cardNumber);
            if(this._cardNumTxt)
            {
                this._cardNumTxt.text=""+this._playerData.cardNumber;
            }
        }
        private onTouchBegin(e:egret.TouchEvent):void {
            this._pInfo.visible = true;
            this._pInfo.ReSet();
        }

        private onTouchEnd(e:egret.TouchEvent):void {
            this._pInfo.visible = false;
        }

        public set Ready(ready:boolean) {
            if (this._isReady == ready) {
                return;
            }
            this._isReady = ready;
            this._ready_hand.visible = this._isReady;
            if(this._loc==1)
            {
                this._ready_hand.x=100;
            }
            else if(this._loc==2)
            {
                this._ready_hand.x=-45;
            }
        }

        public set IsLandOwner(isowner:boolean) {
            this._isOwner = isowner;
            if(this._landflag&&this._landflag.parent)
            {
                this._landflag.parent.removeChild(this._landflag);
            }

            if (this._isOwner) {
                this._landflag = new egret.Bitmap(RES.getRes("ui_flag_landowner"));
            }
            else {
                this._landflag = new egret.Bitmap(RES.getRes("ui_flag_farmer"));
            }
            this.addChild(this._landflag);

            if(this._headsp)
            {
                this._headsp.visible=false;
            }
            this._landflag.x = 0;
            this._landflag.y = -90;

        }

        //是否显示地主图片,是否地主
        public LandFlagVisible(isshow:boolean,island:boolean):void
        {
            if(this._landflag)
            {
                this._landflag.visible = isshow;
            }
            if(this._headsp)
            {
                this._headsp.visible=!isshow;
            }
            if(isshow)
            {
                this.IsLandOwner=island;
            }

        }

        public Release():void {
            if(this._headsp)
            {
                this._headsp.removeChildren();
                this._headsp.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this._headsp.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this._headsp.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            }
            if(this._landflag)
            {
                egret.Tween.removeTweens(this._landflag);
            }
            this._playerData=null;
            this._pInfo = null;
            this._headsp = null;
            this._avatarsp=null;
            this._backCardSp=null;          //对手玩家的背面牌
            this._isReady = false;
            this._isOwner = false;
            this._isAuto=false;
            this._loc = 0;                      //位置 ,1左上,2右上,3下

            this._ready_hand = null;
            this._landflag=null;
            this._cardNumTxt=null;

            this.removeChildren();

            if (this.parent) {
                this.parent.removeChild(this);
            }

            this._init=false;
        }
    }
}