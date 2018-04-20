/**
 * Created by Administrator on 2015/12/21.
 */
module scene {
    export class ProgressBar extends egret.Sprite implements IRelease {
        private _bg:egret.Bitmap = null;
        private _top:egret.Bitmap = null;
        private _topSp:egret.Sprite = null;
        private _mask:egret.Bitmap = null;
        private _progress:number=0;

        public constructor(bgurl:string,topurl:string=null) {
            super();
            this.init(bgurl,topurl);
        }

        private init(topurl:string,bgurl:string=null):void {
            this.touchEnabled = false;
            this.touchChildren = false;
            if(bgurl)
            {
                this._bg = new egret.Bitmap(RES.getRes(bgurl));
                this.addChild(this._bg);
            }

            this._top = new egret.Bitmap(RES.getRes(topurl));
            this._topSp = new egret.Sprite();

            if(this._bg) {
                this._topSp.x = (this._bg.width - this._top.width) / 2;
                this._topSp.y = (this._bg.height - this._top.height) / 2;
            }
            this.addChild(this._topSp);
            this._topSp.addChild(this._top);

            //this._mask = new egret.Shape();
            //this._mask.graphics.beginFill(0x000000);
            //this._mask.graphics.drawRect(0, 0, this._top.width, this._top.height);
            //this._topSp.addChild(this._mask);
            //this._topSp.mask = this._mask;

            this._mask = new egret.Bitmap(RES.getRes(topurl));
            this._topSp.addChild(this._mask);
            this._topSp.mask = this._mask;

            this.setProgress(0);
        }

        public setProgress(prog:number):void {
            if (prog > 1 || prog < 0) {
                return;
            }
            this._progress=prog;
            var h:number = this._top.width;
            this._top.x = -h + prog * h;
        }

        public GetProgress():number {
            return  this._progress;
        }


        public Release():void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}