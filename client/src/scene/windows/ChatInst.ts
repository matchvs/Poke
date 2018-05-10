module windowui {
    /**
     * 游戏记录列表
     * Created by Administrator on 2015/12/23.
     */
    export class ChatInst extends WindowsBase {
        private _tabSprite_1:egret.ScrollView ;
        private _tabSprite_2:egret.ScrollView ;
        private _tabBtn_1:scene.SButton;
        private _tabBtn_2:scene.SButton;
        private _tab:number = 0;
        public static WordList = [
            "大家好,很高兴见到各位!",
            "快点吧,我等的花都谢了!",
            "炸你!",
            "和你合作真是太愉快了!",
            "你是MM还是GG啊!"
        ];

        private _faceList = [
            "ani_chat_1",
            "ani_chat_2",
            "ani_chat_3",
            "ani_chat_4",
            "ani_chat_5",
            "ani_chat_6",
            "ani_chat_7",
            "ani_chat_8",
            "ani_chat_9"
        ];
        private _txtInput:egret.TextField = null;
        private _btnSend:scene.SButton = null;
        private static _instance:ChatInst = null;

        public constructor() {
            super();
            this.createView();
        }

        public static get Instance():ChatInst {
            if (ChatInst._instance == null) {
                ChatInst._instance = new ChatInst();
            }
            return ChatInst._instance;
        }

        private createView():void {

            this._tab = 0;

            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("panel_chat"));
            this.addChild(bg);
            bg.touchEnabled = true;
            bg.x = 0;
            bg.y = 455;

            this._txtInput = new egret.TextField();
            this._txtInput.type = egret.TextFieldType.INPUT;
            this._txtInput.width = 380;
            this._txtInput.height = 35;
            this._txtInput.x = 5;
            this._txtInput.y = 997;
            this._txtInput.size = 30;
            this._txtInput.textColor = 0xffffff;
            this._txtInput.maxChars = 30;
            this._txtInput.text = "点击输入文字";
            this._txtInput.type
            this.addChild(this._txtInput);

            this._btnSend = new scene.SButton("btn_fasong");
            this._btnSend.x = 385;
            this._btnSend.y = 985;
            this.addChild(this._btnSend);

            this._btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this._bgshap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this._txtInput.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusin, this);

            this.setWordUI();
            this.setGifUI();
            this.setTab(2);

            var tthis=this;
            document.onkeydown=function(event){
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if(e && e.keyCode==13){ // enter 键
                    if(tthis.IsShow==false||tthis._txtInput==null||tthis._txtInput.text=="")
                    {
                        return;
                    }
                    NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SENDCHAT,{chatStr:tthis._txtInput.text});
                    windowui.ChatInst.Instance.Hide();
                }
            };
        }

        private setTab(tab:number):void {
            if (this._tab == tab) {
                return;
            }
            this._tab = tab;
            if (this._tab == 1) {
                this._tabSprite_1.visible = true;
                this._tabSprite_2.visible = false;
            }
            else if (this._tab == 2) {
                this._tabSprite_1.visible = false;
                this._tabSprite_2.visible = true;
            }
        }

        public SetWords(txt:string):void {
            if (txt == "" || txt == null || txt == "点击输入文字") {
                return;
            }
            this._txtInput.text = txt;
        }

        private setWordUI():void {
            var sp:egret.Sprite = new egret.Sprite();
            var wlen:number = ChatInst.WordList.length;
            var i:number = 0;
            for (i = 0; i < wlen; i++) {
                var rlR:render.ChatWordsRender = new render.ChatWordsRender({id:i,txt:ChatInst.WordList[i]});
                rlR.y = i * rlR.height;
                sp.addChild(rlR);
            }
            this._tabSprite_1 = new egret.ScrollView(sp);
            this._tabSprite_1.width = 465;
            this._tabSprite_1.height = 465;
            this._tabSprite_1.horizontalScrollPolicy = "off";
            this._tabSprite_1.x = 16;
            this._tabSprite_1.y = 485;
            this.addChild(this._tabSprite_1);

            this._tabSprite_1.visible = false;
        }

        private setGifUI():void {
            var sp:egret.Sprite = new egret.Sprite();
            var wlen:number = this._faceList.length;
            var i:number = 0;
            for (i = 0; i < wlen; i+=3) {
                var rlR:render.ChatFaceRender = new render.ChatFaceRender(this._faceList[i],this._faceList[i+1],this._faceList[i+2]);
                rlR.y = i * 50;
                sp.addChild(rlR);
            }
            this._tabSprite_2 = new egret.ScrollView(sp);
            this._tabSprite_2.width = 465;
            this._tabSprite_2.height = 465;
            this._tabSprite_2.horizontalScrollPolicy = "off";
            this._tabSprite_2.x = 16;
            this._tabSprite_2.y = 510;
            this.addChild(this._tabSprite_2);

            this._tabSprite_2.visible = false;
        }

        private onFocusin(e:egret.FocusEvent):void {
            if (this._txtInput.text == "点击输入文字") {
                this._txtInput.text = "";
            }
        }

        private onTouchTap(e:egret.TouchEvent):void {
            if (e.currentTarget == this._btnSend) {
                var txt:string = this._txtInput.text;
                if (txt == "" || txt == null || txt == "点击输入文字") {
                    this.Hide();
                    return;
                }
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SENDCHAT,{chatStr:txt});
                this.Hide();
            }
            else if (e.currentTarget == this._bgshap) {
                this.Hide();
            }
            else if (e.currentTarget == this._tabBtn_1) {
                this.setTab(1);
                this._tabBtn_1.SetTxt(28, 0xa9d1ed);
                this._tabBtn_2.SetTxt(28, 0x005681);
            }
            else if (e.currentTarget == this._tabBtn_2) {
                this.setTab(2);
                this._tabBtn_1.SetTxt(28, 0x005681);
                this._tabBtn_2.SetTxt(28, 0xa9d1ed);
            }
        }

        public Show() {
            if(data.GameData.IsRobot_Offline)
            {
                return ;
            }
            super.Show();
            LayerMgr.Window.addChild(this);
            this._txtInput.text = "点击输入文字";
        }

        public Hide() {
            super.Hide();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}


