var sceneproxy;
(function (sceneproxy) {
    //游戏界面逻辑
    var LobbySceneProxy = (function (_super) {
        __extends(LobbySceneProxy, _super);
        function LobbySceneProxy() {
            _super.call(this);
            this._scene = null;
        }
        var d = __define,c=LobbySceneProxy;p=c.prototype;
        p.Init = function (sb) {
            this._scene = sb;
            //NetMgr.Instance.addEventListener(enums.NetEvent.NETEVENT_ROOMIN,this.onNetMsg,this);
            //NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_CENTER_LOGIN_OK);
            NetMgr.Instance.removeEventListener(enums.NetEvent.NETEVENT_ADDFREEMONEY, this.onNetMsg, this);
            SoundMgr.Instance.PlaySound("bg_lobby_mp3");
        };
        p.onNetMsg = function (e) {
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
    })(sceneproxy.SceneProxyBase);
    sceneproxy.LobbySceneProxy = LobbySceneProxy;
    egret.registerClass(LobbySceneProxy,"sceneproxy.LobbySceneProxy");
})(sceneproxy || (sceneproxy = {}));
