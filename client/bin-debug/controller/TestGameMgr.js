// import TestGameScene = scene.TestGameScene;
// import Player = egret.sys.Player;
// /**
//  *
//  * 游戏管理
//  * @author
//  *
//  */
// class TestGameMgr {
//     private _testGameScene:TestGameScene = null;
//     private _card:controller.game.SendCard = null;                //发牌
//     private _type:controller.game.Types = null;                   //判断牌类型
//     private _compare:controller.game.Compare = null;              //比较牌
//     private _prompt:controller.game.Prompt = null;                //提示牌
//     private _lastPlayer:data.Player=null;
//     private _pointMax:number = 3;                              //用户数量
//     private _playerPoint:number = 0;                           //用户指针,指向当前用户
//     private _nowcardlistdata:CardListData = null;                //当前桌面上的牌
//     private _playerList:Array<data.Player> = [];               //用户数组
//     private _landOwner:data.Player = null;                        //地主
//     private _landMaxScore:number = 0;                             //叫地主的最高分
//     private _lanownList:Array<number> = [];                         //起始的三张地主牌
//     private _static:number = 0;                                   //0,发牌状态,1,叫地主状态,2:正在比赛中,3,胜利结束,4,匹配新人
//     private static _instance:TestGameMgr = null;
//     public constructor() {
//         this.init();
//     }
//     public static get Instance():TestGameMgr {
//         if (TestGameMgr._instance == null) {
//             TestGameMgr._instance = new TestGameMgr();
//         }
//         return TestGameMgr._instance;
//     }
//     private init():void {
//         var player1:data.Player = new data.Player();
//         var player2:data.Player = new data.Player();
//         var player3:data.Player = new data.Player();
//         player1.TableId = 0;
//         player2.TableId = 1;
//         player3.TableId = 2;
//         this._playerList.push(player1);
//         this._playerList.push(player2);
//         this._playerList.push(player3);
//         this._pointMax = this._playerList.length;
//         this._playerPoint = 0;
//         this._card = new controller.game.SendCard();
//         this._type = new controller.game.Types();
//         this._compare = new controller.game.Compare();
//         this._prompt = new controller.game.Prompt();
//     }
//     public Start(tgs:TestGameScene):void {
//         this._testGameScene = tgs;
//         var cardArr = this._card.GetCardRandom();
//         (<data.Player>this._playerList[0]).CardArr = cardArr[0];
//         (<data.Player>this._playerList[1]).CardArr = cardArr[1];
//         (<data.Player>this._playerList[2]).CardArr = cardArr[2];
//         this._lanownList = cardArr[3];
//     }
//     public GetPlayerById(id:number):data.Player {
//         return this._playerList[id];
//     }
//     public GetDizhuCard3():Array<number> {
//         return this._lanownList
//     }
//     //出牌
//     public ShowCard(slist:Array<number>, id:number):boolean {
//         if (this._landOwner == null) {
//             traceAndAlert("TestGameMgr-ShowCard> 没有产生地主,先叫分");
//             return false;
//         }
//         if (this._playerPoint != id) {
//             traceAndAlert("TestGameMgr-ShowCard> 没有轮到该玩家");
//             return false;
//         }
//         var cld:CardListData = this._type.GetType(slist);
//         if (cld.Type == controller.game.Types.Types_Error) {
//             traceAndAlert("TestGameMgr-ShowCard> 出牌不符合规则");
//             return false;
//         }
//         var isbig:boolean = this._compare.IsBiger(cld, this._nowcardlistdata)
//         if (!isbig) {
//             traceAndAlert("TestGameMgr-ShowCard> 出牌大不过桌面牌");
//             return false;
//         }
//         var player:data.Player = this._playerList[this._playerPoint];
//         this._lastPlayer=player;
//         player.removeCards(slist);
//         trace("TestGameMgr-ShowCard> 出牌成功");
//         this._playerPoint++;
//         if (this._playerPoint >= this._pointMax) {
//             this._playerPoint = 0;
//         }
//         this._nowcardlistdata = cld;
//         this._nowcardlistdata.FromId = id;
//         this._nowcardlistdata.PlaySound();
//         this.prompCard();
//         return true;
//     }
//     //提示牌
//     private prompCard():void {
//         var player:data.Player = this._playerList[this._playerPoint];
//         var pcld:CardListData = this._type.GetType(player.CardArr);
//         var len:number = this._playerList.length;
//         var nextplayer:data.Player = null;
//         var teamcount:number = 0;
//         var enemycount:number = 0;
//         var i:number = 0;
//         for (i = 0; i < len; i++) {
//             var other:data.Player = this._playerList[i];
//             if (other == player) {
//                 continue;
//             }
//             if (i == this._playerPoint + 1 || (this._playerPoint == len - 1 && i == 0)) {
//                 nextplayer = other;
//             }
//             if (other.IsLandOwner == player.IsLandOwner) {
//                 teamcount = other.CardNum;
//             }
//             else {
//                 enemycount = other.CardNum;
//             }
//         }
//         var nextisteam:boolean=false;
//         if(this._lastPlayer&&this._lastPlayer.IsLandOwner==player.IsLandOwner)
//         {
//             nextisteam=true;
//         }
//         var cld:CardListData = this._prompt.GetPrompt(pcld, this._nowcardlistdata, enemycount, teamcount,
//             nextplayer.IsLandOwner == player.IsLandOwner,nextisteam);
//         if (this._testGameScene)this._testGameScene.PrompCard(this._playerPoint, cld);
//     }
//     //过,要不起
//     public Pass(id:number):boolean {
//         if (this._landOwner == null) {
//             traceAndAlert("TestGameMgr-Pass> 没有产生地主");
//             return false;
//         }
//         if (this._playerPoint != id) {
//             traceAndAlert("TestGameMgr-Pass> 没有轮到该玩家");
//             return false;
//         }
//         traceAndAlert("TestGameMgr-Pass> 玩家pass,id:", id);
//         this._playerPoint++;
//         if (this._playerPoint >= this._pointMax) {
//             this._playerPoint = 0;
//         }
//         if (this._playerPoint == this._nowcardlistdata.FromId) {
//             traceAndAlert("TestGameMgr-Pass> 一轮结束 玩家可以重新出牌:", id);
//             //traceAndAlert("TestGameMgr-Pass> 一轮结束 玩家可以重新出牌:",id);
//             this._nowcardlistdata = null;
//         }
//         this.prompCard();
//         return true;
//     }
//     //叫地主,叫分,玩家id
//     public CallLandOwners(score:number, id:number):boolean {
//         if (this._playerPoint != id) {
//             traceAndAlert("TestGameMgr-CallLandOwners> 没有轮到该玩家");
//             return false;
//         }
//         if (this._landOwner != null) {
//             traceAndAlert("TestGameMgr-CallLandOwners> 已经有地主了");
//             return false
//         }
//         var player:data.Player = this._playerList[id];
//         player.LandOwnerScore = score;
//         if (score == 3) {
//             this._landMaxScore = score;
//             this._landOwner = player;
//             player.IsLandOwner = true;
//             player.CardArr = player.CardArr.concat(this._lanownList);
//             traceAndAlert("TestGameMgr-CallLandOwners> 3分直接搞定地主");
//             return true;
//         }
//         if (score > 0 && score <= this._landMaxScore) {
//             traceAndAlert("TestGameMgr-CallLandOwners> 不能叫" + this._landMaxScore + "分及以下");
//             return false;
//         }
//         if (score > 0 && score > this._landMaxScore) {
//             this._landMaxScore = score;
//         }
//         this._playerPoint++;
//         if (this._playerPoint >= this._pointMax) {
//             this._playerPoint = 0;
//             for (var i in this._playerList) {
//                 var cp:data.Player = this._playerList[i];
//                 if (cp.LandOwnerScore == this._landMaxScore) {
//                     this._landOwner = cp;
//                     cp.IsLandOwner = true;
//                     cp.CardArr = cp.CardArr.concat(this._lanownList)
//                     traceAndAlert("TestGameMgr-CallLandOwners> 玩家" + cp.TableId + "为地主");
//                     return true;
//                 }
//             }
//         }
//         traceAndAlert("TestGameMgr-CallLandOwners> 玩家" + id + "叫了" + score + "分");
//         return false;
//     }
//     public GetLanOwner():data.Player {
//         return this._landOwner;
//     }
// }
//# sourceMappingURL=TestGameMgr.js.map