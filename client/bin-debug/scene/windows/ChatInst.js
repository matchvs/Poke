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
var windowui;
(function (windowui) {
    /**
     * 游戏记录列表
     * Created by Administrator on 2015/12/23.
     */
    var ChatInst = (function (_super) {
        __extends(ChatInst, _super);
        function ChatInst() {
            var _this = _super.call(this) || this;
            _this._tab = 0;
            _this._faceList = [
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
            _this._txtInput = null;
            _this._btnSend = null;
            _this.createView();
            return _this;
        }
        Object.defineProperty(ChatInst, "Instance", {
            get: function () {
                if (ChatInst._instance == null) {
                    ChatInst._instance = new ChatInst();
                }
                return ChatInst._instance;
            },
            enumerable: true,
            configurable: true
        });
        ChatInst.prototype.createView = function () {
            this._tab = 0;
            var bg = new egret.Bitmap(RES.getRes("panel_chat"));
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
            this._txtInput.type;
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
            var tthis = this;
            document.onkeydown = function (event) {
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if (e && e.keyCode == 13) {
                    if (tthis.IsShow == false || tthis._txtInput == null || tthis._txtInput.text == "") {
                        return;
                    }
                    NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SENDCHAT, { chatStr: tthis._txtInput.text });
                    windowui.ChatInst.Instance.Hide();
                }
            };
        };
        ChatInst.prototype.setTab = function (tab) {
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
        };
        ChatInst.prototype.SetWords = function (txt) {
            if (txt == "" || txt == null || txt == "点击输入文字") {
                return;
            }
            this._txtInput.text = txt;
        };
        ChatInst.prototype.setWordUI = function () {
            var sp = new egret.Sprite();
            var wlen = ChatInst.WordList.length;
            var i = 0;
            for (i = 0; i < wlen; i++) {
                var rlR = new render.ChatWordsRender({ id: i, txt: ChatInst.WordList[i] });
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
        };
        ChatInst.prototype.setGifUI = function () {
            var sp = new egret.Sprite();
            var wlen = this._faceList.length;
            var i = 0;
            for (i = 0; i < wlen; i += 3) {
                var rlR = new render.ChatFaceRender(this._faceList[i], this._faceList[i + 1], this._faceList[i + 2]);
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
        };
        ChatInst.prototype.onFocusin = function (e) {
            if (this._txtInput.text == "点击输入文字") {
                this._txtInput.text = "";
            }
        };
        ChatInst.prototype.onTouchTap = function (e) {
            if (e.currentTarget == this._btnSend) {
                var txt = this._txtInput.text;
                if (txt == "" || txt == null || txt == "点击输入文字") {
                    this.Hide();
                    return;
                }
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SENDCHAT, { chatStr: txt });
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
        };
        ChatInst.prototype.Show = function () {
            if (data.GameData.IsRobot_Offline) {
                return;
            }
            _super.prototype.Show.call(this);
            LayerMgr.Window.addChild(this);
            this._txtInput.text = "点击输入文字";
        };
        ChatInst.prototype.Hide = function () {
            _super.prototype.Hide.call(this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        ChatInst.WordList = [
            "大家好,很高兴见到各位!",
            "快点吧,我等的花都谢了!",
            "炸你!",
            "和你合作真是太愉快了!",
            "你是MM还是GG啊!"
        ];
        ChatInst._instance = null;
        return ChatInst;
    }(windowui.WindowsBase));
    windowui.ChatInst = ChatInst;
    __reflect(ChatInst.prototype, "windowui.ChatInst");
})(windowui || (windowui = {}));
//# sourceMappingURL=ChatInst.js.map