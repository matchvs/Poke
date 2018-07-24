/**
 * Created by Administrator on 2015/12/25.
 */


// 倒计时'闹钟'
module battle {
    export class PlayerTime extends egret.Sprite {
        private _contain:egret.Sprite=null;
        private _loc:number=0;
        private PlayerTime:number=25000;
        private _bg:egret.Sprite = null;
        private _startTime:number = 0;
        private _alert:boolean=false;
        private static FlashDelay:number=500;           //闪动间隔
        private _flashTime:number=0;
        private _txt:egret.TextField=null;

        public constructor() {
            super();
        }

        public Init():void {
            this._contain=new egret.Sprite();
            this.addChild(this._contain);

            this._bg = new egret.Sprite();
            this._contain.addChild(this._bg);

            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("ui_clock"));
            this._bg.addChild(bg);
            bg.x = 0;
            bg.y = 0;

            this._txt = new egret.TextField();
            this._txt.text = "";
            this._txt.width=50;
            this._txt.textColor = 0xff0000;
            this._contain.addChild(this._txt);
            this._txt.textAlign = egret.HorizontalAlign.CENTER;
            this._txt.x = 12;
            this._txt.y = 23;

            this._alert=false;
            this._contain.visible=true;

        }

        public SetPoint(loc:number,delaytime:number):void {
            if (loc == 1) {
                this.x = 60;
                this.y = 250;
            }
            else if (loc == 2) {
                this.x = 500;
                this.y = 250;
            }
            else if (loc == 3) {
                this.x = 147;
                this.y = 540;
            }

            this._loc=loc;
            this.PlayerTime=delaytime;
            this._startTime = egret.getTimer();
            this._alert=false;
            this._contain.visible=true;
            this._txt.text="OK";
        }

        public Update():void {
            var ntimer:number = egret.getTimer();
            var pstimer:number = ntimer - this._startTime;
            var progree:number = pstimer / this.PlayerTime;
            if (progree > 1) {
                progree = 1;
                //this._startTime = ntimer;
            }

            var hastime:number=Math.floor((this.PlayerTime-pstimer)/1000);
            if(hastime<0){
                hastime=0
            };
            var hasstr:string=""+hastime;
            if(hasstr!=this._txt.text)
            {
                this._txt.text=hasstr;
            }


            if(this._loc!=3)
            {
                return;
            }
            if(progree>0.5&&this._alert==false&&this.visible)
            {
                this._alert=true;
                //SoundMgr.Instance.PlayEffect("alert_mp3");
            }
            if(this._alert)
            {
                if(hastime<=0)
                {
                    this._contain.visible=true;
                }
                else if((ntimer-this._flashTime)>PlayerTime.FlashDelay)
                {
                    this._flashTime=ntimer;
                    this._contain.visible=!this._contain.visible;
                }
            }
        }

        public Release():void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}