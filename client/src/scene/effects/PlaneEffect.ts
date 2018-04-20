/**
 * Created by Administrator on 2016/2/4.
 */
module effect {
    export class PlaneEffect extends egret.Sprite implements IRelease,IUpdate,IInit {
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
                    this._mc1 = new egret.MovieClip(mcDataFactory.generateMovieClipData("plane"));
                }
                this.addChild(this._mc1);
                this._mc1.gotoAndPlay(1,-1);
                this._mc1.x=640;
                this._mc1.y=400;
            }
            catch(e)
            {
                this.Release();
            }


        }

        public Update():void
        {
            this._mc1.x-=10;
            if(this._mc1.x<-300)
            {
                this.Release();
            }
        }



        public Release():void
        {
            if(this._mc1)
            {
                this._mc1.gotoAndStop(1);
                if(this._mc1.parent){this._mc1.parent.removeChild(this._mc1);}
            }
        }

    }
}