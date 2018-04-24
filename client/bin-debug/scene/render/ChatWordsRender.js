var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
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
            var _this = _super.call(this) || this;
            _this._txtInput = null;
            _this._data = null;
            _this._data = data;
            _this.touchChildren = false;
            _this.touchEnabled = true;
            _this.width = 465;
            _this.height = 68;
            var bg = new egret.Bitmap(RES.getRes("ui_color1"));
            bg.width = 465;
            bg.height = 68;
            _this.addChild(bg);
            var bg = new egret.Bitmap(RES.getRes("ui_line1"));
            bg.width = 465;
            _this.addChild(bg);
            bg.y = 66;
            _this._txtInput = new egret.TextField();
            _this._txtInput.width = 465;
            _this._txtInput.height = 35;
            _this._txtInput.x = 0;
            _this._txtInput.y = 20;
            _this._txtInput.size = 30;
            _this._txtInput.textColor = 0xa9d1ed;
            _this._txtInput.maxChars = 25;
            _this._txtInput.text = data.txt;
            _this.addChild(_this._txtInput);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
            return _this;
        }
        ChatWordsRender.prototype.onTap = function (e) {
            //windowui.ChatInst.Instance.SetWords(this._txtInput.text);
            NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SENDCHAT, { chatStr: this._txtInput.text });
            windowui.ChatInst.Instance.Hide();
        };
        return ChatWordsRender;
    }(egret.Sprite));
    render.ChatWordsRender = ChatWordsRender;
    __reflect(ChatWordsRender.prototype, "render.ChatWordsRender");
})(render || (render = {}));
//# sourceMappingURL=ChatWordsRender.js.map