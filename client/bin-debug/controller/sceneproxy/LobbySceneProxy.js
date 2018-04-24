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
var sceneproxy;
(function (sceneproxy) {
    //游戏界面逻辑
    var LobbySceneProxy = (function (_super) {
        __extends(LobbySceneProxy, _super);
        function LobbySceneProxy() {
            var _this = _super.call(this) || this;
            _this._scene = null;
            return _this;
        }
        LobbySceneProxy.prototype.Init = function (sb) {
            this._scene = sb;
            //NetMgr.Instance.addEventListener(enums.NetEvent.NETEVENT_ROOMIN,this.onNetMsg,this);
            //NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_CENTER_LOGIN_OK);
            NetMgr.Instance.removeEventListener(enums.NetEvent.NETEVENT_ADDFREEMONEY, this.onNetMsg, this);
            SoundMgr.Instance.PlaySound("bg_lobby_mp3");
        };
        LobbySceneProxy.prototype.onNetMsg = function (e) {
            switch (e.type) {
                case enums.NetEvent.NETEVENT_ADDFREEMONEY:
                    var valueobj = JSON.parse(e.data.value);
                    windowui.SysTipsInst.Instance.Show("金币输光了,系统免费赠送您" + valueobj.addmoney + "金币,继续玩耍吧!", function () {
                        windowui.SysTipsInst.Instance.Hide();
                    }, this, true);
                    data.GameData.money = valueobj.nowmoney;
                    this._scene.AddFreeMoney();
                    break;
                default:
                    break;
            }
        };
        return LobbySceneProxy;
    }(sceneproxy.SceneProxyBase));
    sceneproxy.LobbySceneProxy = LobbySceneProxy;
    __reflect(LobbySceneProxy.prototype, "sceneproxy.LobbySceneProxy");
})(sceneproxy || (sceneproxy = {}));
//# sourceMappingURL=LobbySceneProxy.js.map