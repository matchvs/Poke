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
    var ChatFaceRender = (function (_super) {
        __extends(ChatFaceRender, _super);
        function ChatFaceRender(str1, str2, str3) {
            var _this = _super.call(this) || this;
            _this._str1 = null;
            _this._str2 = null;
            _this._str3 = null;
            _this.touchChildren = true;
            _this.touchEnabled = true;
            _this.width = 465;
            _this.height = 68;
            _this._str1 = str1;
            _this._str2 = str2;
            _this._str3 = str3;
            var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes(str1 + "_json"), RES.getRes(str1 + "_png"));
            var mc1 = new egret.MovieClip(mcDataFactory.generateMovieClipData("chat"));
            mc1.name = "chat_facemc1";
            _this.addChild(mc1);
            var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes(str2 + "_json"), RES.getRes(str2 + "_png"));
            var mc2 = new egret.MovieClip(mcDataFactory.generateMovieClipData("chat"));
            mc2.name = "chat_facemc2";
            _this.addChild(mc2);
            var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes(str3 + "_json"), RES.getRes(str3 + "_png"));
            var mc3 = new egret.MovieClip(mcDataFactory.generateMovieClipData("chat"));
            mc3.name = "chat_facemc3";
            _this.addChild(mc3);
            mc1.x = 10;
            mc1.y = 0;
            mc2.x = 170;
            mc2.y = 0;
            mc3.x = 330;
            mc3.y = 0;
            mc1.touchEnabled = true;
            mc2.touchEnabled = true;
            mc3.touchEnabled = true;
            mc1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
            mc2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
            mc3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
            var shap = new egret.Shape();
            shap.graphics.beginFill(0x000000, 0);
            shap.graphics.drawRect(0, 0, 465, 150);
            shap.graphics.endFill();
            _this.addChild(shap);
            return _this;
        }
        ChatFaceRender.prototype.onTap = function (e) {
            var txt;
            if (e.currentTarget.name == "chat_facemc1") {
                txt = this._str1;
            }
            else if (e.currentTarget.name == "chat_facemc2") {
                txt = this._str2;
            }
            else if (e.currentTarget.name == "chat_facemc3") {
                txt = this._str3;
            }
            if (txt == null) {
                return;
            }
            NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SENDCHAT, { chatStr: txt });
            windowui.ChatInst.Instance.Hide();
        };
        return ChatFaceRender;
    }(egret.Sprite));
    render.ChatFaceRender = ChatFaceRender;
    __reflect(ChatFaceRender.prototype, "render.ChatFaceRender");
})(render || (render = {}));
//# sourceMappingURL=ChatFaceRender.js.map