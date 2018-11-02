const log4js = require('log4js');
const textEncoding = require('text-encoding');
const Player = require("./Player");
const SendCards = require("./SendCard");
const GameData = require("./GameData");

const log  = log4js.getLogger();

const ROOMSTATE ={
    NONE:0x00000000,
    GAME_READ:1<<1,
    CALL_LANDOVER: 1<<2,
    GAME_START: 1<<3,
    GAME_REPORT:1<<4,
}

class Room{
    constructor(gameID, roomID,pushHander){
        this.gameID = gameID;
        this.roomID = roomID;
        this.players = new Map();
        this.pushHander = pushHander;//引擎业务处理对象
        this.roomState = ROOMSTATE.NONE;
        this.landOwner = null;
        this.landCards = [];
        this.callOwnerLocat = new Player();
    }

    reInitRoom(){
        this.roomState = ROOMSTATE.NONE;
        this.landOwner = null;
        this.landCards = [];
        this.callOwnerLocat = new Player();
    }

    //添加玩家
    addPlayer(userID, userProfile){
        let p = new Player(userID);
        p.userID = userID;
        if(userProfile){
            let obj = JSON.parse(userProfile);
            if("nickName" in obj){
                p.nickName = obj.nickName;
                //log.debug(p.nickName);
            }
            if("avator" in obj){
                p.avator = obj.avator;
                //log.debug(p.avator);
            }
        }
        this.players.set(userID,p);
        log.debug("players count :"+this.players.size);
    }

    getPlayer(userID){
        return this.players.get(userID);
    }

    //删除玩家
    delPlayer(userID){
        let player = this.players.get(userID)
        if(player){
            log.debug("player had exit"+userID);
            this.players.delete(userID);
        }else{
            log.debug("player not exist:"+userID);
        }
        log.debug("players count :"+this.players.size);
    }

    //房间消息处理
    roomEvent(userID, event){
        if(userID && event && event.action){
            switch(event.action){
            case GameData.MSG_EVENT.READY://准备
                this.eventReady(userID);
                break;
            case GameData.MSG_EVENT.SEND_CARD:
                break;
            case GameData.MSG_EVENT.TURN_CALL_LAND://叫地主
                this.turnCallLand(userID, event.data.score);
                break;
            case GameData.MSG_EVENT.REPROT_SCORE://上报分数
                this.reportPlayerScore(userID, event.data);
                break;
            case GameData.MSG_EVENT.RESET_ROOM://重置房间
                this.reSetRoom(userID);
                break;
            case GameData.MSG_EVENT.CLEAR_SCROE://清空分数
                this.clearPlayersScore(userID, event.data.userList);
                break;
            case GameData.MSG_EVENT.PLAY_CARDS://出牌
                this.playCards(userID, event.data);
                break;
            case GameData.MSG_EVENT.GAME_OVER_S://游戏结束
                this.gameOver(userID, event.data);
            case GameData.MSG_EVENT.INROOM_ISOK_S://加入指定房间OK
                this.checkIsOk(userID);
                break;
            default:
                log.info("Invaild Event");
                break;
            }
        }
    }

    /**
     * 玩家准备事件
     * @param {number} userID 
     */
    eventReady(userID){
        let player = this.players.get(userID);
        if(player){
            log.debug("  eventReady 用户存在："+userID);
            player.isReady = true;
            this.checkGameStart();
        }else{
            log.debug(" eventReady 没有找到这个用户："+userID);
        }
    }

    /**
     * 检测是否可以开始游戏，如果所有玩家都准备了就可以开始游戏，发放牌
     */
    checkGameStart(){
        if(!(this.roomState & ROOMSTATE.GAME_START) && this.players.size >= GameData.Conf.MAX_PLAYER_NUM){
            log.debug(" 可以发牌");
            let allReady = true;
            for (let [k, p] of this.players) {
                if (!p.isReady) {
                    allReady = false;
                }
            }
            if (allReady) {
                log.debug("gameID:"+this.gameID+" joinOver roomID:"+this.roomID);
                // 房间停止加人
                this.pushHander.joinOver({
                    gameID: this.gameID, 
                    roomID: this.roomID,
                });
                // 通知房间内玩家开始游戏,并发牌
                this.noticeSendCards();
                this.roomState |= ROOMSTATE.GAME_START;
            }else{
                log.debug("还有人没有准备好！");
            }
        }else{
            log.debug(" 检测是否都准备好，房间状态：" + this.roomState, "房间人数：" + this.players.size);
        }
    }

    /**
     * 开始游戏，并且发放牌
     */
    noticeSendCards(){
        let userCard = [];
        let sc = new SendCards();
        let cardList = sc.GetCardRandom();
        let index = 0;
        //给玩家分配牌
        for (let [id, p] of this.players) {
            p.localTableId = index;//设置在桌子的位置
            p.cardList = cardList[index];//设置牌列表
            userCard.push({
                userID:id,
                card:cardList[index++]
            });
        }
        this.landCards = cardList[3];
        //生成随机位置，指定第一次叫地主的人
        let callnum = Math.floor(Math.random()*3);
        callnum = 0;
        this.callOwnerLocat = callnum;
        log.debug("叫地主的人:"+userCard[callnum].userID);
        this.sendEvent({
            action: GameData.RSP_EVENT.SEND_CARD,
            data:{
                userCards: userCard,            //玩家牌列表
                lanownList:cardList[3],         //底牌
                callOwner: userCard[callnum].userID,       //第一次叫地主的人
            }
        });
    }

    /**
     * 轮流叫地主
     * @param {number} userID 
     * @param {number} score 
     */
    turnCallLand(userID, score){
        //没有结束叫地主
        if((this.roomState & ROOMSTATE.CALL_LANDOVER) !== ROOMSTATE.CALL_LANDOVER 
            && (this.roomState & ROOMSTATE.GAME_START)){
            let player = this.players.get(userID);
            if(player){
                player.landOwnerScore = score;
                player.isCallLandOwner = true;
                
                //第一个叫地主的
                if(this.landOwner === null){this.landOwner = player;}
                //如果叫的地主为地主分就马上停止叫地主
                if(score >= GameData.Conf.MAX_LAND_SCORE){
                    this.roomState |= ROOMSTATE.CALL_LANDOVER;
                    player.isCallLandOwner = true;
                    this.landOwner = player;
                }else{
                    if(this.landOwner.landOwnerScore < score){
                        this.landOwner = player;
                    }
                }
                this.checkLandOver(userID,score);
            }else{
                log.info("user not in room");
            }
        }
    }

    /**
     * 结束叫地主，发送消息到玩家
     * @param {number} userID 
     * @param {number} score 
     */
    checkLandOver(userID,score){
        let callOver = true;    //标识是否完成叫地主
        let dropCnt = 0;        //放弃地主人数
        for(let [k, p] of this.players){
            if(!p.isCallLandOwner){
                callOver = false;
                break;
            }
            if(p.landOwnerScore == 0){
                dropCnt++;
            }
        }
        log.debug("dropCnt:",dropCnt);

        //所有人都不要地主,重开局 重新发牌
        if(dropCnt >= 3){
            for(let [k, p] of this.players){
                p.reInitInfo();
            }
            this.noticeSendCards();
            return;
        }

        if((this.roomState & ROOMSTATE.CALL_LANDOVER) == ROOMSTATE.CALL_LANDOVER){
            callOver = true;
        }

        //如果都叫了地主就是发送地主信息
        if(callOver){
            this.sendEvent({
                action: GameData.RSP_EVENT.LAND_CALL_OVER,
                data:{
                    landOwner:this.landOwner.userID,
                    landCards:this.landCards,
                    value : this.landOwner.landOwnerScore,
                }
            });
        }else{
            //如果没有确定地主 就让下一个人叫
            let next = this.getNextCall(userID);
            this.sendEvent({
                action: GameData.RSP_EVENT.NEXT_CALL_LAND,//广播下一个人抢
                data:{userID: userID,
                value : score,
                nextUser:next,}
            });
        }
    }

    /**
     * 获取下一个叫地主的人
     * @param {*} userID 
     */
    getNextCall(userID){
        let nextCall = this.callOwnerLocat+1;
        if(nextCall >= GameData.Conf.MAX_PLAYER_NUM){
            nextCall = 0;
        }

        for(let [id, p] of this.players){
            if(p.localTableId == nextCall){
                this.callOwnerLocat = nextCall;
                return id;
            }
        }
        return userID;
    }

    
    /**
     *  推送房间消息
     * @param {Object} event
     * @memberof Room
     */
    sendEvent(event) {
        log.debug("event:",event);
        let content = new textEncoding.TextEncoder("utf-8").encode(JSON.stringify(event));
        this.pushHander.pushEvent({
            gameID: this.gameID, 
            roomID: this.roomID, 
            pushType: 3,
            content: content,
        });
    }

    /**
     * 收到上报分数的消息调用上报分数模块接口
     * @param {number} userID 上报的玩家ID
     * @param {number} dt 上报的数据
     */
    reportPlayerScore(userID, dt){
        //房间上报数据状态
        this.roomState |= ROOMSTATE.GAME_REPORT;
        let player = this.players.get(userID);
        let event = {
            action: GameData.RSP_EVENT.REPROT_RESULT,
            data:{
                userID:userID,
                status:1,
                rank:0,
                totleScore:0,
            }
        };
        let self  = this;
        if(player){
            log.debug("userID:"+userID+" data:",dt);
            player.reportGameScoreNew(dt, function(res, err){
                if(res !== null){
                    log.info("上报成功：", res);
                    event.data.rank = res.data.rank;
                    event.data.totleScore = res.data.value;
                    event.data.status = 0;
                    self.reInitRoom(); 
                    self.sendEvent(event);
                }else{
                    log.error("report data error ", JSON.stringify(err));
                    self.sendEvent(event);
                }
            });
        }else{
            log.error("This userID is invaild");
            self.sendEvent(event);
        }
    }

    clearPlayersScore(userID, userList){
        let player = this.players.get(userID);
        if(player){
            player.clearScoreData(userList);
        }
    }

    /**
     * 重置房间中的参数
     * @param {number} userID 
     */
    reSetRoom(userID){
        if((this.roomState & ROOMSTATE.GAME_REPORT)){
            this.roomState = ROOMSTATE.NONE;
            this.landOwner = null;
            this.landCards = [];
            this.callOwnerLocat = new Player();
            let tempPlayers = this.players;
            this.players = new Map();
            for(let k of tempPlayers.keys()){
                let p = new Player();
                p.userID = k ;
                this.players.set(k,p);
            }
            this.sendEvent({
                action:GameData.RSP_EVENT.RESET_OK,
                userID:userID,
                status:0,
            });
        }
        
    }

    /**
     * 出牌,只做转发
     */
    playCards(userid,dt){
        this.sendEvent({
            action:GameData.RSP_EVENT.PLAY_CARDS_R,
            data:{
                userID:userid,
                cardlist:dt.cardlist,
            }
        });
    }

    /**
     * 
     * @param {number} userid 
     * @param {any} dt 
     */
    gameOver(userid, dt){
        dt.winerID = userid;
        this.sendEvent({
            action:GameData.RSP_EVENT.GAME_OVER_R,
            data:dt
        });
    }

    /**
     * 加入指定房间的时候，判断是否所有人都加入，而且Ok了
     * @param {number} userid
     */
    checkIsOk(userid){
        let player = this.players.get(userid);
        if (player) {
            log.debug(userid + " had ready");
            player.isOk = true;
            //如果人数少了就返回
            if (this.players.size < GameData.Conf.MAX_PLAYER_NUM) {
                return ;
            }
            for (let [k, p] of this.players) {
                //如果有一个人没有OK就 不行
                if (!p.isOk) {
                    return;
                }
            }
            this.sendEvent({
                action: GameData.RSP_EVENT.INROOM_ISOK_R,
                data:{
                    canStart:1
                }
            });
        }
    }
}


module.exports = Room;

