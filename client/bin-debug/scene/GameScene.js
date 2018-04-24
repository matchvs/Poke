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
var scene;
(function (scene) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this._gameoverAniProxy = null;
            _this._chatMsgProxy = null;
            _this._sendCardAniProxy = null;
            _this._mycardProxy = null;
            _this._tableCardProxy = null;
            _this._btnProxy = null;
            _this._uiProxy = null;
            _this._uiSprite = null;
            _this._btnSprite = null;
            _this._sendSprite = null;
            _this._cardSprite = null;
            _this._tableSprite = null;
            _this._effectSprite = null;
            _this._chatSprite = null;
            _this._effectList = null;
            _this._type = new controller.game.Types();
            _this.joinRoomResponse = function (status, roomUserInfoList, roomInfo) {
                if (status === 200) {
                    egret.log("进入房间成功,房间ID：" + roomInfo.roomId);
                }
                else {
                    egret.log("进入房间失败，错误码：" + status);
                }
            };
            _this._lastSendPing = 0;
            return _this;
        }
        GameScene.prototype.Init = function () {
            var bg = new egret.Bitmap(RES.getRes("bg_game_jpg"));
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
            this._tableCardProxy = new scene.TableCardProxy();
            this._tableCardProxy.Init(this._tableSprite);
            this._uiProxy = new scene.GameUIProxy();
            this._uiProxy.Init(this._uiSprite);
            this._btnProxy = new scene.GameBtnProxy();
            this._btnProxy.Init(this._btnSprite);
            this._chatMsgProxy = new scene.ChatMsgProxy();
            this._chatMsgProxy.Init(this._chatSprite);
            this._sendCardAniProxy = new scene.SendCardAniProxy();
            this._sendCardAniProxy.Init(this._sendSprite);
            this._mycardProxy = new scene.MyCardProxy();
            this._mycardProxy.Init(this._cardSprite);
            this._gameoverAniProxy = new scene.GameOverAniProxy();
            this._gameoverAniProxy.Init(this._overAniSprite);
            windowui.SysTipsInst.Instance.Show("正在进入房间");
            this.addEventListener(egret.Event.ENTER_FRAME, this.Update, this);
            SoundMgr.Instance.PlaySound("bg_lobby_mp3");
            PokesData.engine.joinRandomRoom(3, "");
            PokesData.response.joinRoomResponse = this.joinRoomResponse;
        };
        /**
         * 重新开始
         */
        GameScene.prototype.ReStart = function () {
            this._uiProxy.RoomIn([]);
            this._btnProxy.RoomIn();
            this._mycardProxy.Visible = false;
            this._tableCardProxy.clearAll(true);
            //NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_READY,{});
            //NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_GAME_AUTO,{isauto:!data.GameData.IsAuto});
        };
        /**
         * 进入游戏房间
         * @constructor
         */
        GameScene.prototype.RoomIn = function (plist) {
            windowui.SysTipsInst.Instance.Hide();
            var playerlist = plist;
            this._uiProxy.RoomIn(playerlist);
            this._btnProxy.RoomIn();
            this._tableCardProxy.clearAll();
            this._mycardProxy.Release();
            this._sendCardAniProxy.Release(0);
        };
        GameScene.prototype.AddFreeMoney = function () {
            this._uiProxy.RefreshPlayerInfo();
        };
        //掉线重连
        GameScene.prototype.ReNet = function (landlist, landplayer, mainplayer, landscore, playerlist) {
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
        };
        //玩家进入房间
        GameScene.prototype.PlayerIn = function (player) {
            this._uiProxy.SetPlayerHead(player, true);
        };
        GameScene.prototype.PlayerOut = function (player, isme) {
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
            this._uiProxy.RemovePlayerHead(player);
            //}
        };
        //玩家是否托管
        GameScene.prototype.SetAuto = function (locid, isready) {
            this._btnProxy.SetPlayerAuto(locid, isready);
        };
        //玩家进入房间
        GameScene.prototype.SetReady = function (locid, isready, isme) {
            if (isme) {
                this._btnProxy.HideAll();
            }
            this._uiProxy.SetPlayerReady(locid, isready);
            //this._uiProxy.SetPlayerLandFlag(0);
            this._chatMsgProxy.ShowTableCard(locid, "准备");
        };
        //发牌动画
        GameScene.prototype.SendCard = function (player) {
            //发牌动画
            windowui.ResoultInst.Instance.Hide();
            windowui.ActivityResoultInst.Instance.Hide();
            this._uiProxy.SendCard();
            this._btnProxy.HideAll();
            // 这里才是发牌动画
            this._sendCardAniProxy.StartAni(player, function () {
                // 其他隐藏,除自己的
                //全部隐藏起来等待服务器下发叫地主通知
                if (this._btnProxy.State != scene.GameBtnProxy.STATE_Qiangdizhu && this._btnProxy.State != scene.GameBtnProxy.STATE_Playing) {
                    this._btnProxy.HideAll();
                }
            }, this);
        };
        //轮到该玩家叫地主
        GameScene.prototype.TurnCallLand = function (player, isme, nowscore, delaytime) {
            if (isme) {
                this._btnProxy.CallLandOwner(nowscore);
            }
            else {
                this._btnProxy.HideAll();
            }
            this._uiProxy.SetPlayerTime(player, delaytime);
            this._uiProxy.UpdateAllCardNum();
        };
        //轮到该玩家叫地主
        GameScene.prototype.ShowCallLand = function (score, tableid) {
            this._chatMsgProxy.ShowTableCard(tableid, score + "分");
        };
        //叫地主结束
        GameScene.prototype.CallLandOver = function (landplayer, landlist, mainplayer, landscore) {
            this._tableCardProxy.ShowLandCard(landlist);
            this._uiProxy.SetPlayerLandFlag(landplayer.LocalTableId);
            this._mycardProxy.SetPlayerLandFlag(landplayer.LocalTableId);
            this._sendCardAniProxy.Release(landplayer.LocalTableId);
            this._mycardProxy.SetMainPlayer(mainplayer);
            this._btnProxy.SetCardProxy(this._mycardProxy);
            this._mycardProxy.SetBtnProxy(this._btnProxy);
            this._uiProxy.SetTimes(landscore);
        };
        //轮到该玩家发牌
        GameScene.prototype.TurnPlay = function (player, isme, isnew, tablelist, delaytime, canshowAll, lastplayer) {
            if (lastplayer === void 0) { lastplayer = null; }
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
                var hascar = true;
                this._btnProxy.Playing(isnew);
                this._mycardProxy.SetBtnVisible();
                if (player.CardNum == 1 && player.CardNum < tablelist.length) {
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
        };
        //其他玩家发牌,包括主玩家
        GameScene.prototype.ShowPlay = function (player, clist, isme, timestr, yasiloc) {
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
            var cld = this._type.GetType(clist);
            if (cld.Type == controller.game.Types.Types_Bomb) {
                var eff = MandPool.getIns(effect.BombEffect);
                eff.Init();
                this._effectSprite.addChild(eff);
                this._effectList.push(eff);
            }
            else if (cld.Type == controller.game.Types.Types_ThreeN_Double ||
                cld.Type == controller.game.Types.Types_ThreeN_Signal ||
                cld.Type == controller.game.Types.Types_ThreeN) {
                var eff2 = MandPool.getIns(effect.PlaneEffect);
                eff2.Init();
                this._effectSprite.addChild(eff2);
                this._effectList.push(eff2);
            }
            cld.PlaySound();
        };
        GameScene.prototype.GameOver = function (iswin, p1, p2, p3, islandwin, timestr, isactover, actrank, actHScore, actmoney, winplayer) {
            this._uiProxy.SetTimes(timestr);
            this._btnProxy.HideAll();
            this._uiProxy.GameOver();
            var cld = this._type.GetType(winplayer.CardArr);
            cld.PlaySound();
            if (isactover) {
                windowui.SysTipsInst.Instance.Hide();
                windowui.ActivityOverInst.Instance.InitInfo(isactover, actrank, actHScore, actmoney);
                windowui.ActivityOverInst.Instance.Show();
                return;
            }
            if (data.GameData.IsActivityKick) {
                this.ReStart();
                windowui.SysTipsInst.Instance.Show("您的比赛积分不足,无法继续游戏,欢迎下次再次挑战", function () {
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
            egret.setTimeout(function () {
                if (data.GameData.flag == data.GameData.GameFlag_Activity) {
                    windowui.ActivityResoultInst.Instance.InitInfo(p3, p1, p2, islandwin, actrank, actHScore, actmoney);
                    windowui.ActivityResoultInst.Instance.Show();
                }
                else {
                    windowui.ResoultInst.Instance.InitInfo(p3, p1, p2, iswin);
                    windowui.ResoultInst.Instance.Show();
                }
            }, this, 3500);
        };
        //播放聊天
        GameScene.prototype.PlayChat = function (tableid, txt) {
            this._chatMsgProxy.ShowTableCard(tableid, txt);
        };
        //播放聊天
        GameScene.prototype.PlayHouseRunning = function (txt) {
            this._uiProxy.PushHouseRunning(txt);
        };
        GameScene.prototype.Update = function (e) {
            if (NetMgr.Instance.IsConnect == false) {
                return;
            }
            var nowTime = egret.getTimer();
            this._uiProxy.Update();
            for (var i in this._effectList) {
                if (this._effectList[i]) {
                    this._effectList[i].Update();
                }
                if (this._effectList[i].parent == null) {
                    var eff = this._effectList.splice(i, 1);
                    MandPool.remand(eff[0]);
                }
            }
        };
        GameScene.prototype.Release = function () {
            this.ReStart();
            this._uiProxy.Release();
            this._btnProxy.Release();
            this._tableCardProxy.clearAll();
            this._mycardProxy.Release();
            this._sendCardAniProxy.Release(0);
            _super.prototype.Release.call(this);
        };
        return GameScene;
    }(scene.SceneBase));
    scene.GameScene = GameScene;
    __reflect(GameScene.prototype, "scene.GameScene");
})(scene || (scene = {}));
//# sourceMappingURL=GameScene.js.map