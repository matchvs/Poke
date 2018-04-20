/**
 * Created by Administrator on 2016/2/4.
 */
module effect {
    export class BombEffect extends egret.Sprite implements IRelease,IUpdate,IInit {
        private _mc1:egret.MovieClip;
        public constructor() {
            super();

        }

        public Init():void {
            try
            {
                this.touchChildren=false;
                this.touchEnabled=false;

                if(this._mc1==null)
                {
                    var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes("effect_json"), RES.getRes("effect_png"));
                    this._mc1 = new egret.MovieClip(mcDataFactory.generateMovieClipData("bomb"));
                }
                this._mc1.addEventListener(egret.Event.ENTER_FRAME, this.mc1frame, this);
                this.addChild(this._mc1);
                this._mc1.gotoAndPlay(1);
                this._mc1.x=320;
                this._mc1.y=500;
            }
            catch(e)
            {
                this.Release();
            }


        }

        public Update():void
        {

        }

        private mc1frame(e:egret.Event):void
        {
            try
            {
                if (this._mc1.currentFrame == this._mc1.totalFrames) {
                    this.Release();
                }
            }
            catch(e)
            {
                this.Release();
            }
        }

        public Release():void
        {
            if(this._mc1)
            {
                this._mc1.gotoAndStop(1);
                this._mc1.removeEventListener(egret.Event.ENTER_FRAME, this.mc1frame, this);
                if(this._mc1.parent){this._mc1.parent.removeChild(this._mc1);}
            }
        }

    }
}