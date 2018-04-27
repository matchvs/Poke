/**
 * 伪装成服务器
 * 游戏管理
 * @author
 *
 */
class RobotGameMgr {
    public static TurnTime: number = 25000;                          //一个玩家的思考时间
    private _card: controller.game.SendCard = null;                //发牌
    private _type: controller.game.Types = null;                   //判断牌类型
    private _compare: controller.game.Compare = null;              //比较牌
    private _prompt: controller.game.Prompt = null;                //提示牌

    private _gameState: number = 0;
    private _lastPlayer: data.Player = null;
    private _lanScore: number = 0;
    private _pointMax: number = 3;                              //用户数量
    private _playerPoint: number = 0;                           //用户指针,指向当前用户,,对应玩家tableid
    private _tablelistdata: controller.game.CardListData = null;                //当前桌面上的牌
    private _playerList: Array<data.Player> = [];               //用户数组
    private _landOwner: data.Player = null;                        //地主
    private _landMaxScore: number = 0;                             //叫地主的最高分
    private _TimeCount: number = 1;                                    //翻倍次数
    private _lanownList: Array<number> = [];                         //起始的三张地主牌
    private static _instance: RobotGameMgr = null;

    private _timeoutList: Array<number> = [];


    public constructor() {

    }

    public static get Instance(): RobotGameMgr {
        if (RobotGameMgr._instance == null) {
            RobotGameMgr._instance = new RobotGameMgr();
        }
        return RobotGameMgr._instance;
    }

    /**
     * 发送消息
     * @param str
     * @constructor
     */
    public SendMsg(type: number, value: any = null): void {
        //test
        var obj: any = {};
        switch (type) {
            //开始游戏
            case enums.NetEnum.GAME_START_GAME:
                this._playerList = value;
                 if (this._playerList.length === 3) {
                     obj.type = enums.NetEnum.GAME_2_CLIENT_INIT_ROOM;
                     obj.value = {};
                     obj.value.playerlist = this._playerList;
                     obj.value.gamestate = 0;
                     obj.value = JSON.stringify(obj.value);
                     var jstr: string = JSON.stringify(obj);
                     NetMgr.Instance.OnMessage(jstr);
                     this.Start();
                 }
                 
                break;
            //加入房间
            case enums.NetEnum.GAME_JOIN_ROOM:

        
            
                break;
            case enums.NetEnum.GAME_ROOM_PLAYER_FILL:
                break;

            case enums.NetEnum.CLIENT_2_GAME_REQ_EXIT:
                obj.type = enums.NetEnum.CENTER_2_CLIENT_LOGIN_LOBBY;
                obj.value = {};
                var jstr: string = JSON.stringify(obj);
                this.GameOver();
                data.GameData.IsRobot_Offline = false;
                NetMgr.Instance.OnMessage(jstr);
                break;
            case enums.NetEnum.NET_CSC_LOGIN_DEBUG:
            case enums.NetEnum.NET_CSC_LOGIN:
                obj.type = enums.NetEnum.NET_CSC_LOGIN;
                obj.value = 998;
                var jstr: string = JSON.stringify(obj);
                NetMgr.Instance.OnMessage(jstr);
                break;
            case enums.NetEnum.CLIENT_2_GAME_READY:
                for (var i in this._playerList) {
                    if (this._playerList[i].IsRobot == false) {
                        this._playerList[i].IsReady = true;
                    }
                }
                if (this._playerList.length == 3 && this.checkAllReady()) {
                    this.Start();
                }

                break;
            case enums.NetEnum.CLIENT_2_CENTER_LOGIN_OK:
                obj.type = enums.NetEnum.GAME_2_CLIENT_INIT_ROOM;
                obj.value = {};

                this._playerList = [];
                //创建两个机器人
                var p1: data.Player = new data.Player();
                p1.userid = data.GameData.userid;
                p1.avatar = data.GameData.avatar;
                p1.playerGuid = data.GameData.playerGuid;
                p1.nickname = data.GameData.nickname;
                p1.money = 0;
                p1.integral = data.GameData.integral;
                p1.TableId = 0;
                p1.IsReady = false;                       //让主玩家准备一下
                p1.IsRobot = false;
                p1.ShowCardNum = 17;
                p1.playerGuid = 1;

                var p2: data.Player = new data.Player();
                p2.avatar = "http://uc.9ria.com/data/avatar/000/06/11/49_avatar_middle.jpg";
                p2.nickname = "机器人1";
                p2.money = 0;
                p2.integral = 0;
                p2.IsReady = true;
                p2.TableId = 1;
                p2.IsRobot = true;
                p2.ShowCardNum = 17;
                p2.playerGuid = 2;

                //已经有两个人...再来一个人延时加入
                var p3: data.Player = new data.Player();
                p3.avatar = "http://uc.9ria.com/data/avatar/000/06/11/49_avatar_middle.jpg";
                p3.nickname = "机器人2";
                p3.money = 0;
                p3.integral = 0;
                p3.IsReady = true;
                p3.TableId = 2; //位置
                p3.IsRobot = true;
                p3.ShowCardNum = 17;
                p3.playerGuid = 3;

                this._playerList = [p1, p2, p3];
                //var tobj:any={};
                //tobj.type=enums.NetEnum.GAME_2_CLIENT_INIT_ROOM;
                //tobj.value=p3
                //
                //var jstr:string=JSON.stringify(tobj);
                //NetMgr.Instance.OnMessage(jstr);


                if (this._playerList.length == 3 && this.checkAllReady()) {
                    this.Start();
                }
                //座位顺序
                var plist = [p1, p2, p3];
                obj.value.playerlist = plist;
                obj.value.gamestate = 0;
                obj.value = JSON.stringify(obj.value);

                var jstr: string = JSON.stringify(obj);
                NetMgr.Instance.OnMessage(jstr);
                break;

            case enums.NetEnum.CLIENT_2_GAME_CALLLANDOWNER:                       //叫地主,1,2,3分
                obj.type = enums.NetEnum.GAME_2_CLIENT_CALLLANDOWNER;
                var player: data.Player = this._playerList[this._playerPoint];
                var svalue = value;
                var value: any = {};
                value.score = svalue.score;
                value.tableid = player.TableId;
                obj.value = JSON.stringify(value);
                var jstr = JSON.stringify(obj);

                // ??? 两次stringify
                // var valueString = JSON.stringify({
                //     type: enums.NetEnum.GAME_2_CLIENT_CALLLANDOWNER,
                //     value: JSON.stringify({
                //         score: svalue.score,
                //         tableid: player.TableId
                //     })
                // });

                NetMgr.Instance.OnMessage(jstr);

                var isover: boolean = this.CallLandOwners(svalue.score, this._playerPoint);
                if (isover) {
                    this._timeoutList.push(egret.setTimeout(function (): void {

                        this.BeginPlay(true);
                    }, this, 500));
                }
                else {
                    this.beginCallOwner();
                }
                break;
            case enums.NetEnum.CLIENT_2_GAME_SHOWCARD:
                var isok: boolean = false;
                var slist = value.cardlist;
                obj.type = enums.NetEnum.GAME_2_CLIENT_SHOWPLAY;
                var player: data.Player = this._playerList[this._playerPoint];
                if (slist == null || slist.length <= 0) {
                    isok = this.Pass(this._playerPoint);
                }
                else {
                    isok = this.ShowCard(slist, this._playerPoint);
                }
                if (isok == false || this._gameState == 0)//出牌失败
                {
                    return;
                }
                var value: any = {};
                value.tableid = player.TableId;
                value.cardlist = slist;
                value.cardnum = player.CardNum;
                value.timecount = this._TimeCount;
                value.isnew = this._tablelistdata == null;                    //是否发新牌
                obj.value = JSON.stringify(value);
                var jstr = JSON.stringify(obj);
                NetMgr.Instance.OnMessage(jstr);
                this.BeginPlay(false);
                break;
            case enums.NetEnum.CLIENT_2_GAME_SENDCHAT:
                obj.type = enums.NetEnum.GAME_2_CLIENT_SENDCHAT;
                obj.value = {};
                obj.value.msg = value;
                break;
            default :
                break;
        }
    }


    private checkAllReady(): boolean {
        for (var i in this._playerList) {
            if (this._playerList[i].IsReady == false) {
                return false;
            }
        }
        return true;
    }

    private init(): void {


    }

    public Start(): void {
        this._gameState = 1;
        this._pointMax = this._playerList.length;
        this._playerPoint = 0;

        this._card = new controller.game.SendCard();
        this._type = new controller.game.Types();
        this._compare = new controller.game.Compare();
        this._prompt = new controller.game.Prompt();


        var cardArr = this._card.GetCardRandom();
        (<data.Player>this._playerList[0]).CardArr = cardArr[0];
        (<data.Player>this._playerList[1]).CardArr = cardArr[1];
        (<data.Player>this._playerList[2]).CardArr = cardArr[2];
        this._lanownList = cardArr[3];


        var obj: any = {};
        var value: any = {};
        obj.type = enums.NetEnum.GAME_2_CLIENT_SENDCARD;
        value.cardlist = cardArr[0];
        obj.value = JSON.stringify(value);
        NetMgr.Instance.OnMessage(JSON.stringify(obj))

        //等待客户端播放发牌动画.开始
        this._timeoutList.push(egret.setTimeout(this.beginCallOwner, this, 4000));
    }

    //开始叫地主
    private beginCallOwner(): void {
        var obj: any = {};

        var player: data.Player = this._playerList[this._playerPoint];
        if (player == null) {
            return;
        }
        if (player.IsRobot == false)         //如果自己则让自己叫分
        {
            obj.type = enums.NetEnum.GAME_2_CLIENT_TURNCALLLAND;
            var value: any = {};
            value.tableid = this._playerPoint;
            value.cardnum1 = this._playerList[0].CardNum;
            value.cardnum2 = this._playerList[1].CardNum;
            value.cardnum3 = this._playerList[2].CardNum;
            obj.value = JSON.stringify(value);
            var jstr: string = JSON.stringify(obj);
            NetMgr.Instance.OnMessage(jstr);
        } else                    //机器人的话机器人自动叫分
        {
            this._timeoutList.push(egret.setTimeout(function (): void {
                obj.type = enums.NetEnum.GAME_2_CLIENT_CALLLANDOWNER;
                var value: any = {};
                value.tableid = this._playerPoint;
                value.score = this._landMaxScore + Math.ceil(Math.random() * (3 - this._landMaxScore));
                var isover: boolean = this.CallLandOwners(value.score, this._playerPoint);
                obj.value = JSON.stringify(value);
                NetMgr.Instance.OnMessage(JSON.stringify(obj));
                if (isover) {
                    //obj.type= enums.NetEnum.GAME_2_CLIENT_CALLLANDOVER;
                    //var value:any={};
                    //value.landtableid=this._playerPoint;
                    //value.cardlist=this._lanownList           //是否发新牌
                    //value.landscore=this._lanScore;
                    //obj.value=JSON.stringify(value);
                    //var jstr:string=JSON.stringify(obj);
                    //NetMgr.Instance.OnMessage(jstr);
                    this._timeoutList.push(egret.setTimeout(function (): void {
                        this.BeginPlay(true);
                    }, this, 500));
                }
                else {
                    this.beginCallOwner();
                }
            }, this, 1000 + Math.random() * 2000));
        }

    }

    //叫完地主,开始游戏
    private BeginPlay(isfirst: boolean): void {
        var obj: any = {};
        var player: data.Player = this._playerList[this._playerPoint];
        if (player == null)//todo: test   检查一下为什么为空
        {
            return;
        }
        if (isfirst) {
            // 抢地主成功,通知地主和起始牌
            obj.type = enums.NetEnum.GAME_2_CLIENT_CALLLANDOVER;
            var value: any = {};
            value.landtableid = this._playerPoint;
            value.cardlist = this._lanownList; // 是否发新牌
            value.landscore = this._landMaxScore;
            obj.value = JSON.stringify(value);
            var jstr: string = JSON.stringify(obj);
            NetMgr.Instance.OnMessage(jstr);
        }

        if (player.IsRobot == false)         //如果自己则让自己游戏
        {
            obj.type = enums.NetEnum.GAME_2_CLIENT_TURNPLAY;
            var value: any = {};
            value.tableid = this._playerPoint;
            value.isnew = this._tablelistdata == null;            //是否发新牌
            value.cardnum = player.CardNum;
            value.cardnum1 = this._playerList[0].CardNum;
            value.cardnum2 = this._playerList[1].CardNum;
            value.cardnum3 = this._playerList[2].CardNum;
            obj.value = JSON.stringify(value);
            var jstr: string = JSON.stringify(obj);
            NetMgr.Instance.OnMessage(jstr);
        }
        else                    //机器人的话机器人自动游戏
        {
            obj.type = enums.NetEnum.GAME_2_CLIENT_TURNPLAY;
            var value: any = {};
            value.tableid = this._playerPoint;
            value.isnew = this._tablelistdata == null;            //是否发新牌
            value.cardnum = player.CardNum;
            value.cardnum1 = this._playerList[0].CardNum;
            value.cardnum2 = this._playerList[1].CardNum;
            value.cardnum3 = this._playerList[2].CardNum;
            obj.value = JSON.stringify(value);
            var jstr: string = JSON.stringify(obj);
            NetMgr.Instance.OnMessage(jstr);
            this._timeoutList.push(egret.setTimeout(function (): void {
                obj.type = enums.NetEnum.GAME_2_CLIENT_SHOWPLAY;
                var value: any = {};
                var cld: controller.game.CardListData = this.prompCard();
                var arr: any = [];
                var player: data.Player = this._playerList[this._playerPoint];
                if (cld && cld.Type != controller.game.Types.Types_Error) {
                    this.ShowCard(cld.List, this._playerPoint);
                    arr = cld.List;
                }
                else {
                    this.Pass(this._playerPoint);
                }
                if (this._gameState == 0)//出牌失败
                {
                    return;
                }
                value.tableid = player.TableId;
                value.cardlist = arr;
                value.timecount = this._TimeCount;
                value.cardnum = player.CardNum;
                value.isnew = this._tablelistdata == null;            //是否发新牌
                obj.value = JSON.stringify(value);
                var jstr: string = JSON.stringify(obj);
                NetMgr.Instance.OnMessage(jstr);
                this.BeginPlay(false);
            }, this, 1000 + Math.random() * 2000));

        }
    }

    public GetPlayerById(id: number): data.Player {
        return this._playerList[id];
    }

    public GetDizhuCard3(): Array<number> {
        return this._lanownList
    }

    //出牌
    public ShowCard(slist: Array<number>, id: number): boolean {
        if (this._landOwner == null) {
            trace("RobotGameMgr-ShowCard> 没有产生地主,先叫分");
            return false;
        }
        if (this._playerPoint != id) {
            trace("RobotGameMgr-ShowCard> 没有轮到该玩家");
            return false;
        }
        var cld: controller.game.CardListData = this._type.GetType(slist);
        if (cld.Type == controller.game.Types.Types_Error) {
            trace("RobotGameMgr-ShowCard> 出牌不符合规则");
            return false;
        }

        var isbig: boolean = this._compare.IsBiger(cld, this._tablelistdata)
        if (!isbig) {
            trace("RobotGameMgr-ShowCard> 出牌大不过桌面牌");
            return false;
        }
        if (cld.Type == controller.game.Types.Types_Bomb) {
            this._TimeCount++;
        }
        var player: data.Player = this._playerList[this._playerPoint];
        player.removeCards(slist);
        this._lastPlayer = player;
        if (player.CardNum <= 0) {
            var enelist: Array<data.Player> = this.getEnemy(player);
            var isspring: boolean = true;
            for (var i: number = 0; i < enelist.length; i++) {
                if (enelist[i].CardNum > 0) {
                    isspring = false;
                }
            }
            if (isspring) {
                this._TimeCount++;              //春天
            }
            player.CardArr = slist;               //显示最后玩家牌
            var obj: any = {};
            obj.type = enums.NetEnum.GAME_2_CLIENT_GAMEOVER;
            var value: any = {};
            value.wintableid = player.TableId;
            value.islandwin = player.IsLandOwner;
            value.timecount = this._TimeCount;
            value.tablelist_0 = this._playerList[0].CardArr;
            value.tablelist_1 = this._playerList[1].CardArr;
            value.tablelist_2 = this._playerList[2].CardArr;
            obj.value = JSON.stringify(value);
            var jstr: string = JSON.stringify(obj);
            NetMgr.Instance.OnMessage(jstr);


            this.GameOver();

            return;
        }
        trace("RobotGameMgr-ShowCard> 出牌成功");
        this._playerPoint++;
        if (this._playerPoint >= this._pointMax) {
            this._playerPoint = 0;
        }
        this._tablelistdata = cld;
        this._tablelistdata.FromId = id;

        return true;
    }

    private getEnemy(p: data.Player): Array<data.Player> {
        var len: number = this._playerList.length;
        var i: number = 0;
        var enelist: Array<data.Player> = [];
        for (i = 0; i < len; i++) {
            if (this._playerList[i].userid != p.userid && this._playerList[i].IsLandOwner != p.IsLandOwner) {
                enelist.push(this._playerList[i]);
            }
        }
        return enelist;
    }

    public GameOver(): void {
        this._gameState = 0;
        this._pointMax = 3;                              //用户数量
        this._playerPoint = 0;                           //用户指针,指向当前用户,,对应玩家tableid
        this._tablelistdata = null;                //当前桌面上的牌
        this._landOwner = null;                        //地主
        this._landMaxScore = 0;                             //叫地主的最高分
        this._TimeCount = 1;
        this._lanownList = [];                         //起始的三张地主牌
        while (this._timeoutList.length > 0) {
            egret.clearTimeout(this._timeoutList.pop());
        }


        var p1: data.Player = this._playerList[0];
        p1.userid = data.GameData.userid;
        p1.avatar = data.GameData.avatar;
        p1.playerGuid = data.GameData.playerGuid;
        p1.nickname = data.GameData.nickname;
        p1.money = 0;
        p1.integral = data.GameData.integral;
        p1.TableId = 0;
        p1.IsReady = false;                       //让主玩家准备一下
        p1.IsRobot = false;
        p1.IsLandOwner = false;
        p1.CardArr = [];
        p1.ShowCardNum = 17;

        var p2: data.Player = this._playerList[1];
        p2.avatar = "http://uc.9ria.com/data/avatar/000/06/11/49_avatar_middle.jpg";
        p2.nickname = "机器人1";
        p2.money = 0;
        p2.integral = 0;
        p2.IsReady = true;
        p2.TableId = 1;
        p2.IsRobot = true;
        p2.IsLandOwner = false;
        p2.CardArr = [];
        p2.ShowCardNum = 17;


        var p3: data.Player = this._playerList[2];
        p3.avatar = "http://uc.9ria.com/data/avatar/000/06/11/49_avatar_middle.jpg";
        p3.nickname = "机器人2";
        p3.money = 0;
        p3.integral = 0;
        p3.IsReady = true;
        p3.TableId = 2;
        p3.IsRobot = true;
        p3.IsLandOwner = false;
        p3.CardArr = [];
        p3.ShowCardNum = 17;

        this._playerList = [p1, p2, p3];
    }

    //提示牌
    private prompCard(): controller.game.CardListData {
        var player: data.Player = this._playerList[this._playerPoint];
        var pcld: controller.game.CardListData = this._type.GetType(player.CardArr);
        var len: number = this._playerList.length;
        var nextplayer: data.Player = null;
        var teamcount: number = 0;
        var enemycount: number = 0;
        var i: number = 0;

        for (i = 0; i < len; i++) {
            var other: data.Player = this._playerList[i];
            if (other == player) {
                continue;
            }
            if (i == this._playerPoint + 1 || (this._playerPoint == len - 1 && i == 0)) {
                nextplayer = other;
            }

            if (other.IsLandOwner == player.IsLandOwner) {
                teamcount = other.CardNum;
            }
            else {
                enemycount = other.CardNum;
            }

        }

        var nextisteam: boolean = false;
        if (this._lastPlayer && this._lastPlayer.IsLandOwner == player.IsLandOwner) {
            nextisteam = true;
        }
        var cld: controller.game.CardListData = this._prompt.GetPrompt(pcld, this._tablelistdata,
            enemycount, teamcount, nextplayer.IsLandOwner == player.IsLandOwner, nextisteam);
        return cld;
    }

    //过,要不起
    public Pass(id: number): boolean {
        if (this._landOwner == null) {
            trace("RobotGameMgr-Pass> 没有产生地主");
            return false;
        }
        if (this._playerPoint != id) {
            trace("RobotGameMgr-Pass> 没有轮到该玩家");
            return false;
        }
        trace("RobotGameMgr-Pass> 玩家pass,id:", id);
        this._playerPoint++;
        if (this._playerPoint >= this._pointMax) {
            this._playerPoint = 0;
        }
        if (this._tablelistdata && this._playerPoint == this._tablelistdata.FromId) {
            trace("RobotGameMgr-Pass> 一轮结束 玩家可以重新出牌:", id);
            //trace("RobotGameMgr-Pass> 一轮结束 玩家可以重新出牌:",id);
            this._tablelistdata = null;
        }
        return true;
    }

    //叫地主,叫分,玩家id
    public CallLandOwners(score: number, id: number): boolean {
        if (this._playerPoint != id) {
            trace("RobotGameMgr-CallLandOwners> 没有轮到该玩家");
            return false;
        }
        if (this._landOwner != null) {
            trace("RobotGameMgr-CallLandOwners> 已经有地主了");
            return false
        }
        var player: data.Player = this._playerList[id];
        player.LandOwnerScore = score;
        if (score == 3) {
            this._landMaxScore = score;
            this._landOwner = player;
            player.IsLandOwner = true;
            player.CardArr = player.CardArr.concat(this._lanownList);
            trace("RobotGameMgr-CallLandOwners> " + "玩家" + id + "  3分直接搞定地主");
            this._lanScore = score;
            return true;
        }
        if (score > 0 && score <= this._landMaxScore) {
            trace("RobotGameMgr-CallLandOwners> 不能叫" + this._landMaxScore + "分及以下");
            return false;
        }
        if (score > 0 && score > this._landMaxScore) {
            this._landMaxScore = score;
        }

        if (this._playerPoint >= this._pointMax - 1) {
            this._playerPoint = 0;
            for (var i in this._playerList) {
                var cp: data.Player = this._playerList[i];
                if (cp.LandOwnerScore == this._landMaxScore) {
                    this._landOwner = cp;
                    cp.IsLandOwner = true;
                    cp.CardArr = cp.CardArr.concat(this._lanownList)
                    this._lanScore = score;
                    this._playerPoint = <number><any>i;
                    trace("RobotGameMgr-CallLandOwners> 玩家" + id + "叫了" + score + "分,玩家" + cp.TableId + "最高分为地主");
                    return true;
                }
            }
        }

        this._playerPoint++;
        trace("RobotGameMgr-CallLandOwners> 玩家" + id + "叫了" + score + "分");
        return false;
    }

    public GetLanOwner(): data.Player {
        return this._landOwner;
    }

}
