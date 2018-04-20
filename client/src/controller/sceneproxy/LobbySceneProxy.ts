module sceneproxy {
    //游戏界面逻辑
    export class LobbySceneProxy extends sceneproxy.SceneProxyBase {
        private _scene:scene.LobbyScene=null;
        public constructor() {
            super();
        }

        public Init(sb:scene.SceneBase):void {
            this._scene=<scene.LobbyScene>sb;
            //NetMgr.Instance.addEventListener(enums.NetEvent.NETEVENT_ROOMIN,this.onNetMsg,this);
            //NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_CENTER_LOGIN_OK);


            NetMgr.Instance.removeEventListener(enums.NetEvent.NETEVENT_ADDFREEMONEY,this.onNetMsg,this);
            SoundMgr.Instance.PlaySound("bg_lobby_mp3");
        }

        public onNetMsg(e:egret.Event):void {
            switch (e.type)
            {
                case enums.NetEvent.NETEVENT_ADDFREEMONEY:
                    var valueobj:any=JSON.parse(e.data.value);
                    windowui.SysTipsInst.Instance.Show("金币输光了,系统免费赠送您"+valueobj.addmoney+"金币,继续玩耍吧!",function():void
                    {
                        windowui.SysTipsInst.Instance.Hide();
                    },this,true)
                    data.GameData.money=valueobj.nowmoney;
                    this._scene.AddFreeMoney();
                    break;
                default :
                    break;
            }

        }

    }
}


