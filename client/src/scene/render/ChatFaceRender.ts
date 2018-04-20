module render {
    import ChatInst = windowui.ChatInst;
    /**
     *
     * @author
     *
     */
    export class ChatFaceRender extends egret.Sprite {
        private _str1:string=null;
        private _str2:string=null;
        private _str3:string=null;
        public constructor(str1:string,str2:string,str3:string) {
            super();
            this.touchChildren = true;
            this.touchEnabled = true;
            this.width = 465;
            this.height = 68;

            this._str1=str1;
            this._str2=str2;
            this._str3=str3;

            var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes(str1+"_json"), RES.getRes(str1+"_png"));
            var mc1:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("chat"));
            mc1.name="chat_facemc1";
            this.addChild(mc1);

            var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes(str2+"_json"), RES.getRes(str2+"_png"));
            var mc2:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("chat"));
            mc2.name="chat_facemc2";
            this.addChild(mc2);

            var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes(str3+"_json"), RES.getRes(str3+"_png"));
            var mc3:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("chat"));
            mc3.name="chat_facemc3";
            this.addChild(mc3);

            mc1.x=10;
            mc1.y=0;

            mc2.x=170;
            mc2.y=0;

            mc3.x=330;
            mc3.y=0;
            mc1.touchEnabled=true;
            mc2.touchEnabled=true;
            mc3.touchEnabled=true;
            mc1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            mc2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            mc3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);

            var shap:egret.Shape=new egret.Shape();
            shap.graphics.beginFill(0x000000,0);
            shap.graphics.drawRect(0,0,465,150);
            shap.graphics.endFill();
            this.addChild(shap);

        }

        private onTap(e:egret.TouchEvent):void {
            var txt:string;
            if(e.currentTarget.name=="chat_facemc1")
            {
                txt=this._str1;
            }
            else if(e.currentTarget.name=="chat_facemc2")
            {
                txt=this._str2;
            }
            else if(e.currentTarget.name=="chat_facemc3")
            {
                txt=this._str3;
            }
            if(txt==null)
            {
                return;
            }
            NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SENDCHAT,{chatStr:txt});
            windowui.ChatInst.Instance.Hide();
        }
    }
}

