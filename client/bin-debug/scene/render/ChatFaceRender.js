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
            _super.call(this);
            this._str1 = null;
            this._str2 = null;
            this._str3 = null;
            this.touchChildren = true;
            this.touchEnabled = true;
            this.width = 465;
            this.height = 68;
            this._str1 = str1;
            this._str2 = str2;
            this._str3 = str3;
            var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes(str1 + "_json"), RES.getRes(str1 + "_png"));
            var mc1 = new egret.MovieClip(mcDataFactory.generateMovieClipData("chat"));
            mc1.name = "chat_facemc1";
            this.addChild(mc1);
            var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes(str2 + "_json"), RES.getRes(str2 + "_png"));
            var mc2 = new egret.MovieClip(mcDataFactory.generateMovieClipData("chat"));
            mc2.name = "chat_facemc2";
            this.addChild(mc2);
            var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes(str3 + "_json"), RES.getRes(str3 + "_png"));
            var mc3 = new egret.MovieClip(mcDataFactory.generateMovieClipData("chat"));
            mc3.name = "chat_facemc3";
            this.addChild(mc3);
            mc1.x = 10;
            mc1.y = 0;
            mc2.x = 170;
            mc2.y = 0;
            mc3.x = 330;
            mc3.y = 0;
            mc1.touchEnabled = true;
            mc2.touchEnabled = true;
            mc3.touchEnabled = true;
            mc1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            mc2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            mc3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            var shap = new egret.Shape();
            shap.graphics.beginFill(0x000000, 0);
            shap.graphics.drawRect(0, 0, 465, 150);
            shap.graphics.endFill();
            this.addChild(shap);
        }
        var d = __define,c=ChatFaceRender;p=c.prototype;
        p.onTap = function (e) {
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
    })(egret.Sprite);
    render.ChatFaceRender = ChatFaceRender;
    egret.registerClass(ChatFaceRender,"render.ChatFaceRender");
})(render || (render = {}));
