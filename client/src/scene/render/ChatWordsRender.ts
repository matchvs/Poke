module render {
    import ChatInst = windowui.ChatInst;
    /**
     *
     * @author
     *
     */
    export class ChatWordsRender extends egret.Sprite {
        private _txtInput:egret.TextField = null;
        private _data:any=null;

        public constructor(data:any) {
            super();
            this._data=data;
            this.touchChildren = false;
            this.touchEnabled = true;
            this.width = 465;
            this.height = 68;

            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("ui_color1"));
            bg.width = 465;
            bg.height = 68;
            this.addChild(bg);

            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("ui_line1"));
            bg.width = 465;
            this.addChild(bg);
            bg.y = 66;

            this._txtInput = new egret.TextField();
            this._txtInput.width = 465;
            this._txtInput.height = 35;
            this._txtInput.x = 0;
            this._txtInput.y = 20;
            this._txtInput.size = 30;
            this._txtInput.textColor = 0xa9d1ed;
            this._txtInput.maxChars = 25;
            this._txtInput.text = data.txt;
            this.addChild(this._txtInput);

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }

        private onTap(e:egret.TouchEvent):void {
            //windowui.ChatInst.Instance.SetWords(this._txtInput.text);
            NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SENDCHAT,{chatStr:this._txtInput.text});
            windowui.ChatInst.Instance.Hide();
        }
    }
}

