module windowui {
    /**
     * 结算面板
     * Created by Administrator on 2015/12/23.
     */
    export class ResoultInst extends WindowsBase {
        private _titleBitmap:egret.Bitmap=null;
        private _infoSprite:egret.Sprite=null;
        private _btn_continue:scene.SButton = null;
        private _whowintxt:egret.TextField=null;

        private static _instance:ResoultInst = null;

        public constructor() {
            super();
            this.createView();
        }

        public static get Instance():ResoultInst {
            if (ResoultInst._instance == null) {
                ResoultInst._instance = new ResoultInst();
            }
            return ResoultInst._instance;
        }

        private createView():void {

            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("ui_tips_bg"));
            bg.scale9Grid = new egret.Rectangle(50, 20, 20, 15);
            this.addChild(bg);
            bg.width = 450;
            bg.height = 475;
            bg.touchEnabled = true;
            bg.x = 100;
            bg.y = 350;

            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("title_win"));
            this.addChild(bg);
            bg.x = 125;
            bg.y = 310;
            this._titleBitmap=bg;

            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("ui_panel_bg"));
            bg.scale9Grid = new egret.Rectangle(16, 14, 8, 2);
            this.addChild(bg);
            bg.width=380;
            bg.height = 270;
            bg.x = 130;
            bg.y = 405;

            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("ui_panel_bg"));
            bg.scale9Grid = new egret.Rectangle(16, 14, 8, 2);
            this.addChild(bg);
            bg.width=380;
            bg.height = 80;
            bg.x = 130;
            bg.y = 675;


            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("ui_panel_txt"));
            bg.scale9Grid = new egret.Rectangle(13, 16, 6, 7);
            this.addChild(bg);
            bg.width=285;
            bg.height = 35;
            bg.x = 210;
            bg.y = 447;

            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("ui_panel_txt"));
            bg.scale9Grid = new egret.Rectangle(13, 16, 6, 7);
            this.addChild(bg);
            bg.width=285;
            bg.height = 35;
            bg.touchEnabled = true;
            bg.x = 210;
            bg.y = 533;

            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("ui_panel_txt"));
            bg.scale9Grid = new egret.Rectangle(13, 16, 6, 7);
            this.addChild(bg);
            bg.width=285;
            bg.height = 35;
            bg.touchEnabled = true;
            bg.x = 210;
            bg.y = 618;


            this._btn_continue=new scene.SButton("btn_queding",null,"");
            this.addChild(this._btn_continue);
            this._btn_continue.x=260;
            this._btn_continue.y=750;
            //
            this._btn_continue.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
            this._bgshap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }

        public InitInfo(p1:data.Player,p2:data.Player,p3:data.Player,iswin:boolean):void
        {
            if(this._infoSprite==null)
            {
                this._infoSprite=new egret.Sprite();
                this.addChild(this._infoSprite);
            }
            this._infoSprite.removeChildren();

            if(p1)
            {
                var playerHead1:scene.PlayerHeadFrame = new scene.PlayerHeadFrame();
                playerHead1.Init(p1.avatar);
                playerHead1.x = 142;
                playerHead1.y = 416;
                playerHead1.touchEnabled=false;
                playerHead1.touchChildren=false;
                playerHead1.scaleX=playerHead1.scaleY=0.65;
                this._infoSprite.addChild(playerHead1);

                var titletxt:egret.TextField = new egret.TextField();
                titletxt.x = 210;
                titletxt.y = 415;
                titletxt.size = 28;
                titletxt.textColor = 0xAA462E;
                titletxt.text = p1.nickname;
                titletxt.textAlign=egret.HorizontalAlign.LEFT;
                this._infoSprite.addChild(titletxt);

                var tcolor:number=0xAA462E;
                var txt:string="";
                if(p1.ResoultScore<0)
                {
                    tcolor=0x669900;
                    txt="失败-";
                }
                else
                {
                    tcolor=0xFF3300;
                    txt="胜利+";
                }

                var titletxt:egret.TextField = new egret.TextField();
                titletxt.x = 215;
                titletxt.y = 454;
                titletxt.size = 24;
                titletxt.textColor = tcolor;
                titletxt.text = txt+""+Math.abs(p1.ResoultScore);
                titletxt.width=140;
                titletxt.textAlign=egret.HorizontalAlign.LEFT;
                this._infoSprite.addChild(titletxt);
            }

            if(p2)
            {
                var playerHead2:scene.PlayerHeadFrame = new scene.PlayerHeadFrame();
                playerHead2.Init(p2.avatar);
                playerHead2.x = 142;
                playerHead2.y = 501;
                playerHead2.touchEnabled=false;
                playerHead2.touchChildren=false;
                playerHead2.scaleX=playerHead2.scaleY=0.65;
                this._infoSprite.addChild(playerHead2);

                var titletxt:egret.TextField = new egret.TextField();
                titletxt.x = 210;
                titletxt.y = 500;
                titletxt.size = 28;
                titletxt.textColor = 0xAA462E;
                titletxt.text = p2.nickname;
                titletxt.textAlign=egret.HorizontalAlign.LEFT;
                this._infoSprite.addChild(titletxt);

                var tcolor:number=0xAA462E;
                var txt:string="";
                if(p2.ResoultScore<0)
                {
                    tcolor=0x669900;
                    txt="失败-";
                }
                else
                {
                    tcolor=0xFF3300;
                    txt="胜利+";
                }

                var titletxt:egret.TextField = new egret.TextField();
                titletxt.x = 215;
                titletxt.y = 539;
                titletxt.size = 24;
                titletxt.textColor = tcolor;
                titletxt.text = txt+""+Math.abs(p2.ResoultScore);
                titletxt.width=140;
                titletxt.textAlign=egret.HorizontalAlign.LEFT;
                this._infoSprite.addChild(titletxt);
            }

            if(p3)
            {
                var playerHead3:scene.PlayerHeadFrame = new scene.PlayerHeadFrame();
                playerHead3.Init(p3.avatar);
                playerHead3.x = 142;
                playerHead3.y = 588;
                playerHead3.touchEnabled=false;
                playerHead3.touchChildren=false;
                playerHead3.scaleX=playerHead3.scaleY=0.65;
                this._infoSprite.addChild(playerHead3);

                var titletxt:egret.TextField = new egret.TextField();
                titletxt.x = 210;
                titletxt.y = 590;
                titletxt.size = 28;
                titletxt.textColor = 0xAA462E;
                titletxt.text = p3.nickname;
                titletxt.textAlign=egret.HorizontalAlign.LEFT;
                this._infoSprite.addChild(titletxt);

                var tcolor:number=0xAA462E;
                var txt:string="";
                if(p3.ResoultScore<0)
                {
                    tcolor=0x669900;
                    txt="失败-";
                }
                else
                {
                    tcolor=0xFF3300;
                    txt="胜利+";
                }

                var titletxt:egret.TextField = new egret.TextField();
                titletxt.x = 215;
                titletxt.y = 624;
                titletxt.size = 24;
                titletxt.textColor = tcolor;
                titletxt.text = txt+""+Math.abs(p3.ResoultScore);
                titletxt.width=140;
                titletxt.textAlign=egret.HorizontalAlign.LEFT;
                this._infoSprite.addChild(titletxt);
            }

            if(iswin)
            {
                this._titleBitmap.texture=RES.getRes("title_win");
            }
            else
            {
                this._titleBitmap.texture=RES.getRes("title_lose");
            }
        }


        private onTouchTap(e:egret.TouchEvent):void {
            if (e.currentTarget == this._bgshap) {
                (<GameScene>SceneMgr.Instance.GetCurrentScene()).ReStart();
                this.Hide();
            }
            else if (e.currentTarget == this._btn_continue) {
                (<GameScene>SceneMgr.Instance.GetCurrentScene()).ReStart();
                this.Hide();
            }
        }

        public Show() {
            super.Show();
            LayerMgr.Window.addChild(this);
            egret.setTimeout(function():void{
                if(this.IsShow)
                {
                    (<GameScene>SceneMgr.Instance.GetCurrentScene()).ReStart();
                    this.Hide();
                }
            },this,10000);
        }

        public Hide() {
            super.Hide();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}


