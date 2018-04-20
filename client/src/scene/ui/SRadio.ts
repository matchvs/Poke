/**
 *
 * @author
 *
 */
module scene {
    export class SRadio extends egret.Sprite {
        private _downimg:egret.Bitmap = null;
        private _upimg:egret.Bitmap = null;
        private _isselect:boolean=true;
        private _callback:Function;

        public constructor(downurl:string, upurl:string, callback:Function) {
            super();
            this._downimg = new egret.Bitmap(RES.getRes(upurl));
            this._upimg = new egret.Bitmap(RES.getRes(downurl));
            this._callback=callback;
            this.addChild(this._downimg);
            this.addChild(this._upimg);
            this.touchChildren = false;
            this.touchEnabled = true;
            this._upimg.visible = false;
            this._isselect=true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }
        private onTap(e:egret.TouchEvent) {
            this.SetSelect(!this._isselect);
        }

        public SetSelect(s:boolean):void{
            this._isselect = s;
            this._upimg.visible=!this._isselect;
            SoundMgr.Instance.PlayEffect("btn_click_mp3");
            this._callback(this._isselect);
        }

    }
}
