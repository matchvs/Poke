module scene {
    export class GameScene extends SceneBase {
        private _gameoverAniProxy: GameOverAniProxy = null;
        private _chatMsgProxy: ChatMsgProxy = null;
        private _sendCardAniProxy: SendCardAniProxy = null;
        private _mycardProxy: MyCardProxy = null;
        private _tableCardProxy: TableCardProxy = null;
        private _btnProxy: GameBtnProxy = null;
        private _uiProxy: GameUIProxy = null;
        private _uiSprite: egret.Sprite = null;
        private _btnSprite: egret.Sprite = null;
        private _sendSprite: egret.Sprite = null;
        private _cardSprite: egret.Sprite = null;
        private _tableSprite: egret.Sprite = null;
        private _effectSprite: egret.Sprite = null;
        private _chatSprite: egret.Sprite = null;
        private _overAniSprite: egret.Sprite;

        private _effectList: any = null;
        private _type: controller.game.Types = new controller.game.Types();
        private _playerList: Array<data.Player> = [];               //用户数组
        private p1: data.Player = new data.Player();
        private p2: data.Player = new data.Player();
        private p3: data.Player = new data.Player();
        private ownerId :any;
        private plist = [this.p1,this.p2,this.p3];


        public constructor() {
            super();
        }

        public Init(): void {
            var bg: egret.Bitmap = new egret.Bitmap(RES.getRes("bg_game_jpg"));
            this.addChild(bg);
            bg.touchEnabled = false;
            this._effectList = [];
            /**
             * _uiSprite
             */
            this._uiSprite = new egret.Sprite();
            this.addChild(this._uiSprite);

            /**
             * _tableSprite
             */
            this._tableSprite = new egret.Sprite();
            this.addChild(this._tableSprite);
            this._tableSprite.touchChildren = false;
            this._tableSprite.touchEnabled = false;

            /**
             * _cardSprite
             */
            this._cardSprite = new egret.Sprite();
            this.addChild(this._cardSprite);

            /**
             * _sendSprite
             */
            this._sendSprite = new egret.Sprite();
            this.addChild(this._sendSprite);
            this._sendSprite.touchChildren = false;
            this._sendSprite.touchEnabled = false;

            /**
             * _btnSprite
             */
            this._btnSprite = new egret.Sprite();
            this.addChild(this._btnSprite);



            /**
             * _overAniSprite
             */
            this._overAniSprite = new egret.Sprite();
            this.addChild(this._overAniSprite);
            this._overAniSprite.touchChildren = false;
            this._overAniSprite.touchEnabled = false;

            /**
             * _effectSprite
             */
            this._effectSprite = new egret.Sprite();
            this._effectSprite.touchChildren = false;
            this._effectSprite.touchEnabled = false;
            this.addChild(this._effectSprite);

            /**
             * _chatSprite
             */
            this._chatSprite = new egret.Sprite();
            this.addChild(this._chatSprite);
            this._chatSprite.touchChildren = false;
            this._chatSprite.touchEnabled = false;




            // 都在同一个命名空间中,不用加空间名字
            this._tableCardProxy = new TableCardProxy();
            this._tableCardProxy.Init(this._tableSprite);

            this._uiProxy = new GameUIProxy();
            this._uiProxy.Init(this._uiSprite);

            this._btnProxy = new GameBtnProxy();
            this._btnProxy.Init(this._btnSprite);

            this._chatMsgProxy = new ChatMsgProxy();
            this._chatMsgProxy.Init(this._chatSprite);

            this._sendCardAniProxy = new SendCardAniProxy();
            this._sendCardAniProxy.Init(this._sendSprite);

            this._mycardProxy = new MyCardProxy();
            this._mycardProxy.Init(this._cardSprite);

            this._gameoverAniProxy = new GameOverAniProxy();
            this._gameoverAniProxy.Init(this._overAniSprite);
            windowui.SysTipsInst.Instance.Show("正在进入房间");
            this.addEventListener(egret.Event.ENTER_FRAME, this.Update, this);


            SoundMgr.Instance.PlaySound("bg_lobby_mp3");
            PokesData.response.joinRoomResponse = this.joinRoomResponse.bind(this);
            PokesData.response.joinRoomNotify = this.joinRoomNotify.bind(this);
            PokesData.response.joinOverResponse = this.joinOverResponse.bind(this);
            PokesData.response.leaveRoomNotify = this.leaveRoomNotify.bind(this);
            PokesData.response.leaveRoomResponse = this.leaveRoomResponse.bind(this);
        }

        /**
         * 加入房间的回调
         */
        joinRoomResponse = function(status,roomUserInfoList,roomInfo) {
            if (status === 200) {
                egret.log("进入房间成功,房间ID："+roomInfo.roomID);
                this.ownerId = roomInfo.ownerId;
                data.GameData.playerGuid = 1;
                var userInfoListLength:number = roomUserInfoList.length;
                 this.addRoomInfoPlayer(data.GameData.userid);
                for (var i = 0; i < userInfoListLength; i ++) {
                    this.addRoomInfoPlayer(roomUserInfoList[i].userId);
                }
            }
        }

        /**
         * 离开房间的回调
         */
        leaveRoomResponse = function(leaveRoomInfo) {
            if(leaveRoomInfo.status === 200) {
                egret.log(leaveRoomInfo.userId+'玩家，离开了房间：'+leaveRoomInfo.roomID);
            }
        }

        /**
         * 
         */
        joinOverResponse = function() {
            
        }

        /**
         * 有其他玩家加入房间的推送
         */
        joinRoomNotify = function(roomUserInfo) {
            this.addRoomInfoPlayer(roomUserInfo.userId);
        }

        /**
         * 有其他玩家离开房间的推送
         */
        leaveRoomNotify = function(leaveRoomInfo) {
            this.removeRoomInfoPlayer(leaveRoomInfo.userId);
            egret.log(leaveRoomInfo.userId+'玩家，离开了房间：'+leaveRoomInfo.roomID+"说了"+leaveRoomInfo.cpProto);
        }

        //初始化玩家属性，出牌顺序没有确定的产生规则
        private addRoomInfoPlayer(userID:any){
            //默认将自己作为P1选手，在桌上的位置在最下方
            egret.log(userID+"进入桌子，开始初始化");
            // var plist = [this.p1, this.p2, this.p3];
            for (var i = 0; i < this.plist.length;i++) {
                if(this.plist[i].userid == '') {
                    this.plist[i].userid = userID;
                    //this.p1.integral = data.GameData.integral;//积分，暂时先不处理,准备在gameServer上处理
                    this.plist[i].TableId = i;//桌子上的ID 
                    this.plist[i].IsReady = true; // 默认准备，gameServer链接后  预计发一个 准备的消息
                    this.plist[i].IsRobot = false; //是否是机器人。
                    this.plist[i].ShowCardNum = 17;  //初始牌数目 17张
                    this.plist[i].playerGuid = i+1; //没搞懂啥意思，先递增。
                    this._playerList.push(this.plist[i]);
                    //长度为3，房间人满，这个时候展示开始按钮，就可以开始游戏了
                    if(this._playerList.length === 3 && data.GameData.userid === this.ownerId) {
                        //不是单机socket就会报错了，还得研究这个大坑
                        data.GameData.IsRobot_Offline = false;
                        NetMgr.Instance.SendMsg(enums.NetEnum.GAME_START_GAME,this._playerList);
                    }
                    return;
                }
    
            }
     
            // if (this.p1.userid == '') {

            // }else if(this.p2.userid == '') {
            //     this.p2.userid = userID;
            //     // this.p2.integral = data.GameData.integral;//积分
            //     this.p2.TableId = 1;//桌子上的ID 
            //     this.p2.IsReady = true; // 默认准备，gameServer链接后  预计发一个 准备的消息
            //     this.p2.IsRobot = false; //是否是机器人。
            //     this.p2.ShowCardNum = 17;  //初始牌数目 17张
            //     this.p2.playerGuid = 2; //没搞懂啥意思，先递增。
            //     this._playerList.push(this.p2);
            // } else {
            //     this.p3.userid = userID;
            //     // this.p3.integral = data.GameData.integral;//积分
            //     this.p3.TableId = 2;//桌子上的ID 
            //     this.p3.IsReady = true; // 默认准备，gameServer链接后  预计发一个 准备的消息
            //     this.p3.IsRobot = false; //是否是机器人。
            //     this.p3.ShowCardNum = 17;  //初始牌数目 17张
            //     this.p3.playerGuid = 3; //没搞懂啥意思，先递增。
            //     this._playerList.push(this.p3);
            // }

  
            egret.log(this._playerList.length+"已经push进来了");

        }

        private removeRoomInfoPlayer (userID:any) {
            for (var i = 0; i < this.plist.length;i++) {
                if (userID === this.plist[i].userid) {
                    this.plist[i].userid = "";
                }
            }
        }

        private playerInit(p:data.Player) {
            for(var i = 0; i < 3;i++) {
                egret.log(i);
            }
        }
        

    
        /**
         * 重新开始
         */
        public ReStart() {
            this._uiProxy.RoomIn([]);
            this._btnProxy.RoomIn();
            this._mycardProxy.Visible = false;
            this._tableCardProxy.clearAll(true);

            //NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_READY,{});
            //NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_AUTO,{isauto:!data.GameData.IsAuto});
        }
        /**
         * 进入游戏房间
         * @constructor
         */
        public RoomIn(plist: any): void {
            windowui.SysTipsInst.Instance.Hide();
            var playerlist = plist;
            this._uiProxy.RoomIn(playerlist);
            this._btnProxy.RoomIn();
            this._tableCardProxy.clearAll();
            this._mycardProxy.Release();
            this._sendCardAniProxy.Release(0);

        }

        public AddFreeMoney(): void {
            this._uiProxy.RefreshPlayerInfo();
        }
        //掉线重连
        public ReNet(landlist: Array<number>, landplayer: data.Player, mainplayer: data.Player, landscore: string, playerlist: Array<data.Player>): void {
            this._tableCardProxy.ShowLandCard(landlist);
            this._sendCardAniProxy.Release(0);
            this._mycardProxy.SetMainPlayer(mainplayer);
            this._btnProxy.SetCardProxy(this._mycardProxy);
            this._mycardProxy.SetBtnProxy(this._btnProxy);
            this._uiProxy.SetTimes(landscore);
            this._btnProxy.HideAll();
            this._uiProxy.SendCard();
            if (landplayer) {
                this._uiProxy.SetPlayerLandFlag(landplayer.LocalTableId);
                this._mycardProxy.SetPlayerLandFlag(landplayer.LocalTableId);
            }
            this._uiProxy.UpdateAllCardNum();
        }

        //玩家进入房间
        public PlayerIn(player: data.Player): void {
            this._uiProxy.SetPlayerHead(player, true)
        }

        public PlayerOut(player: data.Player, isme: boolean): void {
            //if(isme)
            //{
            //    this.ReStart();
            //    windowui.SysTipsInst.Instance.Show("由于您长时间没有准备,请点击屏幕重新匹配",function():void
            //    {
            //        trace("click");
            //        //todo 点击这里重新匹配
            //    });
            //}
            //else
            //{
            this._uiProxy.RemovePlayerHead(player)
            //}
        }

        //玩家是否托管
        public SetAuto(locid: number, isready: boolean): void {
            this._btnProxy.SetPlayerAuto(locid, isready);
        }

        //玩家进入房间
        public SetReady(locid: number, isready: boolean, isme: boolean): void {
            if (isme) {
                this._btnProxy.HideAll();
            }
            this._uiProxy.SetPlayerReady(locid, isready);
            //this._uiProxy.SetPlayerLandFlag(0);
            this._chatMsgProxy.ShowTableCard(locid, "准备");
        }

        //发牌动画
        public SendCard(player: data.Player): void {
            //发牌动画
            windowui.ResoultInst.Instance.Hide();
            windowui.ActivityResoultInst.Instance.Hide();
            this._uiProxy.SendCard();
            this._btnProxy.HideAll();

            // 这里才是发牌动画
            this._sendCardAniProxy.StartAni(player, function (): void {

                // 其他隐藏,除自己的
                //全部隐藏起来等待服务器下发叫地主通知
                if (this._btnProxy.State != GameBtnProxy.STATE_Qiangdizhu && this._btnProxy.State != GameBtnProxy.STATE_Playing) {
                    this._btnProxy.HideAll();
                }
            }, this);
        }

        //轮到该玩家叫地主
        public TurnCallLand(player: data.Player, isme: boolean, nowscore: number, delaytime: number): void {
            if (isme) {
                this._btnProxy.CallLandOwner(nowscore);
            }
            else {
                this._btnProxy.HideAll();
            }
            this._uiProxy.SetPlayerTime(player, delaytime);
            this._uiProxy.UpdateAllCardNum();
        }

        //轮到该玩家叫地主
        public ShowCallLand(score: number, tableid: number): void {
            this._chatMsgProxy.ShowTableCard(tableid, score + "分");
        }

        //叫地主结束
        public CallLandOver(landplayer: data.Player, landlist: Array<number>, mainplayer: data.Player, landscore: string): void {
            this._tableCardProxy.ShowLandCard(landlist);
            this._uiProxy.SetPlayerLandFlag(landplayer.LocalTableId);
            this._mycardProxy.SetPlayerLandFlag(landplayer.LocalTableId);
            this._sendCardAniProxy.Release(landplayer.LocalTableId);
            this._mycardProxy.SetMainPlayer(mainplayer);
            this._btnProxy.SetCardProxy(this._mycardProxy);
            this._mycardProxy.SetBtnProxy(this._btnProxy);
            this._uiProxy.SetTimes(landscore);
        }
        //轮到该玩家发牌
        public TurnPlay(player: data.Player, isme: boolean, isnew: boolean, tablelist: Array<number>, delaytime: number, canshowAll: boolean, lastplayer: data.Player = null): void {
            if (isnew) {
                this._sendCardAniProxy.Release(0);
                this._tableCardProxy.clearAll();
                this._mycardProxy.SetTableList([]);
                if (lastplayer) {
                    this._tableCardProxy.ShowTableCard(lastplayer.LocalTableId, null);
                }
            }

            if (isme) {
                this._mycardProxy.SetTableList(tablelist);
                if (lastplayer) {
                    this._tableCardProxy.ShowTableCard(lastplayer.LocalTableId, tablelist);
                }
                this._mycardProxy.CanShowAll = canshowAll;
                var hascar: boolean = true;
                this._btnProxy.Playing(isnew);
                this._mycardProxy.SetBtnVisible();
                if (player.CardNum == 1 && player.CardNum < tablelist.length)//自己单牌,别人打多张,没有牌直接过
                {
                    NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_SHOWCARD, { cardlist: [] });
                    this._btnProxy.HideAll();
                    return;
                }
            }
            else {
                this._btnProxy.HideAll();
            }
            this._uiProxy.SetPlayerTime(player, delaytime);
            this._uiProxy.UpdateAllCardNum();
        }

        //其他玩家发牌,包括主玩家
        public ShowPlay(player: data.Player, clist: Array<number>, isme: boolean, timestr: string, yasiloc: number): void {

            this._uiProxy.UpdateAllCardNum();
            if (isme) {
                this._mycardProxy.SendOver();
            }
            if (clist != null && clist.length > 0) {
                this._tableCardProxy.ShowTableCard(player.LocalTableId, clist);
                this._mycardProxy.SetTableList(clist);
            }
            else {
                this._tableCardProxy.ShowTableCard(player.LocalTableId, clist);
                this._chatMsgProxy.ShowTableCard(player.LocalTableId, "不要");
            }

            this._uiProxy.SetTimes(timestr);
            var cld: controller.game.CardListData = this._type.GetType(clist);
            if (cld.Type == controller.game.Types.Types_Bomb) {

                var eff: effect.BombEffect = MandPool.getIns(effect.BombEffect);
                eff.Init();
                this._effectSprite.addChild(eff);
                this._effectList.push(eff)
            }
            else if (cld.Type == controller.game.Types.Types_ThreeN_Double ||
                cld.Type == controller.game.Types.Types_ThreeN_Signal ||
                cld.Type == controller.game.Types.Types_ThreeN) {

                var eff2: effect.PlaneEffect = MandPool.getIns(effect.PlaneEffect);
                eff2.Init();
                this._effectSprite.addChild(eff2);
                this._effectList.push(eff2)
            }


            cld.PlaySound();
        }

        public GameOver(iswin: boolean, p1: data.Player, p2: data.Player, p3: data.Player,
            islandwin: boolean, timestr: string, isactover: boolean, actrank: number, actHScore: number, actmoney: number, winplayer: data.Player): void {
            this._uiProxy.SetTimes(timestr);
            this._btnProxy.HideAll();
            this._uiProxy.GameOver();

            var cld: controller.game.CardListData = this._type.GetType(winplayer.CardArr);
            cld.PlaySound();

            if (isactover) {
                windowui.SysTipsInst.Instance.Hide();
                windowui.ActivityOverInst.Instance.InitInfo(isactover, actrank, actHScore, actmoney);
                windowui.ActivityOverInst.Instance.Show();
                return;
            }

            if (data.GameData.IsActivityKick) {
                this.ReStart();
                windowui.SysTipsInst.Instance.Show("您的比赛积分不足,无法继续游戏,欢迎下次再次挑战", function (): void {
                    NativeMgr.Instance.ExitWindow();
                }, this, true, "退出游戏");
                return;
            }

            if (p1) {
                this._tableCardProxy.ShowTableCard(1, p1.CardArr);
            }
            if (p2) {
                this._tableCardProxy.ShowTableCard(2, p2.CardArr);
            }
            if (p3) {
                this._tableCardProxy.ShowTableCard(3, p3.CardArr);
                this._mycardProxy.Release();
            }
            this._gameoverAniProxy.Start(p1.ResoultScore, p2.ResoultScore, p3.ResoultScore);
            egret.setTimeout(function (): void {
                if (data.GameData.flag == data.GameData.GameFlag_Activity) {
                    windowui.ActivityResoultInst.Instance.InitInfo(p3, p1, p2, islandwin, actrank, actHScore, actmoney);
                    windowui.ActivityResoultInst.Instance.Show();
                }
                else {
                    windowui.ResoultInst.Instance.InitInfo(p3, p1, p2, iswin);
                    windowui.ResoultInst.Instance.Show();
                }
            }, this, 3500);
        }

        //播放聊天
        public PlayChat(tableid: number, txt: string): void {
            this._chatMsgProxy.ShowTableCard(tableid, txt);

        }
        //播放聊天
        public PlayHouseRunning(txt: string): void {
            this._uiProxy.PushHouseRunning(txt);
        }

        private _lastSendPing: number = 0;
        public Update(e: egret.Event): void {
            // if (NetMgr.Instance.IsConnect == false) {
            //     return;
            // }
            var nowTime: number = egret.getTimer();

            this._uiProxy.Update();
            for (var i in this._effectList) {
                if (this._effectList[i]) {
                    this._effectList[i].Update();
                }
                if (this._effectList[i].parent == null) {
                    var eff: any = this._effectList.splice(i, 1);
                    MandPool.remand(eff[0]);
                }
            }
        }
        public Release(): void {
            this.ReStart();
            this._uiProxy.Release();
            this._btnProxy.Release();
            this._tableCardProxy.clearAll();
            this._mycardProxy.Release();
            this._sendCardAniProxy.Release(0);
            super.Release();
        }

    }
}