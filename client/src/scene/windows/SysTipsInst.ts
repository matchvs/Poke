module windowui {
    /**
     * 系统提示框
     * Created by Administrator on 2015/12/23.
     */
    export class SysTipsInst extends WindowsBase {
        private _iscreat:boolean=false;

        private _okfun:Function=null;
        private _okObj:any=null;

        private static _instance:SysTipsInst = null;
        private _txt:egret.TextField=null;
        private _okBtn:scene.SButton=null;
        private _bg:egret.Bitmap=null;
        public constructor() {
            super();
            this.touchChildren=true;
            this.touchEnabled=true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        }

        private createView():void {

            if(this._iscreat)
            {
                return;
            }
            var aa:any=RES.getRes("ui_tips_bg");
            this._bg = new egret.Bitmap(aa);
            this._bg.scale9Grid = new egret.Rectangle(50, 20, 20, 15);
            this.addChild(this._bg);
            this._bg.width = 438;
            this._bg.height = 285;
            this._bg.x = 115;
            this._bg.y = 440;

            var aa:any=RES.getRes("ui_panel_txt");
            var tbg:egret.Bitmap = new egret.Bitmap(aa);
            tbg.scale9Grid = new egret.Rectangle(13, 16, 6, 7);
            this.addChild(tbg);
            tbg.width = 285;
            tbg.height = 160;
            tbg.x = 224;
            tbg.y = 488;

            this._txt = new egret.TextField();
            this._txt.text = "";
            this._txt.textColor = 0xAA462E;
            this.addChild(this._txt);
            this._txt.width = 265;
            this._txt.height=143;
            this._txt.textAlign = egret.HorizontalAlign.LEFT;
            this._txt.x =235;
            this._txt.y =495;

            var aa:any=RES.getRes("title1");
            var tbg:egret.Bitmap = new egret.Bitmap(aa);
            this.addChild(tbg);
            tbg.x = 300;
            tbg.y = 425;

            var aa:any=RES.getRes("ui_role1");
            var tbg:egret.Bitmap = new egret.Bitmap(aa);
            this.addChild(tbg);
            tbg.x = 31;
            tbg.y = 470;

            this._okBtn=new scene.SButton("btn_queding");
            this._okBtn.x = 285;
            this._okBtn.y = 650;
            this.addChild(this._okBtn);

            this._iscreat=true;
        }

        public Show(txt:string,okfun:Function=null,thisObj:any=null,hasokbtn:boolean=false,btntxt:string="确定") {
            super.Show();
            this.createView();

            if(this._txt)
            {
                this._txt.textFlow = new egret.HtmlTextParser().parser(txt);
            }
            LayerMgr.TopWindow.addChild(this);
            if(hasokbtn)
            {
                this._okBtn.visible=true;
            }
            else
            {
                this._okBtn.visible=false;
            }
            this._okfun=okfun;
            this._okObj=thisObj;
        }

        private onTap(e:egret.TouchEvent):void
        {
            if(this._okBtn.visible&&e.target==this._okBtn)
            {
                if(this._okfun)
                {
                    if(this._okObj)
                    {
                        this._okfun.call(this._okObj);
                    }
                    else
                    {
                        this._okfun();
                    }
                }

                return;
            }

            if(this._okBtn.visible==false&&this._okfun)
            {
                if(this._okObj)
                {
                    this._okfun.call(this._okObj);
                }
                else
                {
                    this._okfun();
                }
            }
        }

        public getText():string
        {
            if(this._txt)
            {
                return this._txt.text;
            }
            return "";
        }
        public Hide() {
            super.Hide();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public static get Instance():SysTipsInst {
            if (SysTipsInst._instance == null) {
                SysTipsInst._instance = new SysTipsInst();
            }
            return SysTipsInst._instance;
        }

        public setSkin():void {

        }


    }
}

