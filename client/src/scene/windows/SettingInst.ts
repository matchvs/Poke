module windowui {
    /**
     * 游戏记录列表
     * Created by Administrator on 2015/12/23.
     */
    export class SettingInst extends WindowsBase {
        private _btn_close:scene.SButton = null;
        private _bg:egret.Bitmap=null;
        private _yinxiao:scene.SRadio=null;
        private _yinyue:scene.SRadio=null;
        private static _instance:SettingInst = null;

        public constructor() {
            super();
            this.createView();
        }

        public static get Instance():SettingInst {
            if (SettingInst._instance == null) {
                SettingInst._instance = new SettingInst();
            }
            return SettingInst._instance;
        }

        private createView():void {
            var aa:any=RES.getRes("ui_tips_bg");
            this._bg = new egret.Bitmap(aa);
            this._bg.scale9Grid = new egret.Rectangle(50, 20, 20, 15);
            this.addChild(this._bg);
            this._bg.width = 450;
            this._bg.height = 362;
            this._bg.x = 100;
            this._bg.y = 418;

            var aa:any=RES.getRes("title2");
            var tbg:egret.Bitmap = new egret.Bitmap(aa);
            this.addChild(tbg);
            tbg.x = 270;
            tbg.y = 395;

            var aa:any=RES.getRes("ui_set_yinxiao");
            var tbg:egret.Bitmap = new egret.Bitmap(aa);
            this.addChild(tbg);
            tbg.x = 142;
            tbg.y = 495;

            var aa:any=RES.getRes("ui_set_yinyue");
            var tbg:egret.Bitmap = new egret.Bitmap(aa);
            this.addChild(tbg);
            tbg.x = 332;
            tbg.y = 495;

            this._yinxiao = new scene.SRadio("radio_prompt_up","radio_prompt_down",function(isselect:boolean):void
            {
                if(isselect)
                {
                    SoundMgr.Instance.SetEffectVolume(0.5);
                }
                else
                {
                    SoundMgr.Instance.SetEffectVolume(0);
                }

            });
            this._yinxiao.SetSelect(SoundMgr.Instance.SoundVolume!=0);
            this.addChild(this._yinxiao);
            this._yinxiao.x = 231;
            this._yinxiao.y = 497;

            this._yinyue = new scene.SRadio("radio_prompt_up","radio_prompt_down",function(isselect:boolean):void
            {
                if(isselect)
                {
                    SoundMgr.Instance.SetSoundVolume(0.5);
                }
                else
                {
                    SoundMgr.Instance.SetSoundVolume(0);
                }
            });
            this._yinyue.SetSelect(SoundMgr.Instance.EffectVolume!=0);
            this.addChild(this._yinyue);
            this._yinyue.x = 417;
            this._yinyue.y = 497;

            this._btn_close=new scene.SButton("btn_close");
            this._btn_close.x = 495;
            this._btn_close.y = 385;
            this.addChild(this._btn_close);

            this._btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
            this._bgshap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

        }
        private onTouchTap(e:egret.TouchEvent):void {
            if (e.currentTarget == this._bgshap) {
                this.Hide();
            }
            else if (e.currentTarget == this._btn_close) {
                this.Hide();
            }
        }
        public Show() {
            LayerMgr.SysTip.addChild(this);
        }

        public Hide() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}


