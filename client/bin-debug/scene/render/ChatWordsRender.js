var render;
(function (render) {
    /**
     *
     * @author
     *
     */
    var ChatWordsRender = (function (_super) {
        __extends(ChatWordsRender, _super);
        function ChatWordsRender(data) {
            _super.call(this);
            this._txtInput = null;
            this._data = null;
            this._data = data;
            this.touchChildren = false;
            this.touchEnabled = true;
            this.width = 465;
            this.height = 68;
            var bg = new egret.Bitmap(RES.getRes("ui_color1"));
            bg.width = 465;
            bg.height = 68;
            this.addChild(bg);
            var bg = new egret.Bitmap(RES.getRes("ui_line1"));
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
        var d = __define,c=ChatWordsRender;p=c.prototype;
        p.onTap = function (e) {
            //windowui.ChatInst.Instance.SetWords(this._txtInput.text);
            NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SENDCHAT, { chatStr: this._txtInput.text });
            windowui.ChatInst.Instance.Hide();
        };
        return ChatWordsRender;
    })(egret.Sprite);
    render.ChatWordsRender = ChatWordsRender;
    egret.registerClass(ChatWordsRender,"render.ChatWordsRender");
})(render || (render = {}));
