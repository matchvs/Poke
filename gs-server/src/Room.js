const log4js = require('log4js');
const textEncoding = require('text-encoding');
const Player = require("./Player");
const SendCards = require("./SendCard");
const GameData = require("./GameData");

const log  = log4js.getLogger();

class Room{
    constructor(gameID, roomID,pushHander){
        this.gameID = gameID;
        this.roomID = roomID;
        this.players = new Map();
        this.pushHander = pushHander;//引擎业务处理对象
        this.isStart = false;
        this.gameState = 0;
        this.landOwner = null;
        this.landCards = [];
        this.callOwnerLocat = new Player();
    }

    //添加玩家
    addPlayer(userID){
        let p = new Player(userID);
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
                event.score && this.turnCallLand(userID, event.score);
                break;
            default:
                log.info("Invaild Event");
                break;
            }
        }
    }

    //用户准备
    eventReady(userID){
        log.debug("eventReady:"+userID);
        let player = this.players.get(userID);
        if(player){
            log.debug(userID+" had ready");
            player.isReady = true;
            this.checkGameStart();
        }
    }

    //检测是否可以开始
    checkGameStart(){
        if(!this.isStart && this.players.size >= GameData.Conf.MAX_PLAYER_NUM){
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
                this.isStart = true;
            }
        }
    }

    //发牌
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
        let callnum = Math.floor(Math.random()*3);
        this.callOwnerLocat = callnum;
        log.debug("callnum:"+callnum);
        let event = {
            action: GameData.MSG_EVENT.SEND_CARD,
            userCards: userCard,            //玩家牌列表
            lanownList:cardList[3],         //底牌
            callOwner: userCard[callnum].userID,       //第一次叫地主的人
        }
        log.debug("callOwner:"+userCard[callnum].userID);
        this.sendEvent(event);
    }

    //轮流叫地主
    turnCallLand(userID, score){
        //没有结束叫地主
        if(this.gameState !== 2 && this.isStart){
            let player = this.players.get(userID);
            if(player){
                player.landOwnerScore = score;
                player.isCallLandOwner = true;
                
                //第一个叫地主的
                if(this.landOwner === null){this.landOwner = player;}
                //如果叫的地主为地主分就马上停止叫地主
                if(score >= GameData.Conf.MAX_LAND_SCORE){
                    this.gameState = 2;
                    this.landOwner = player;
                }else{
                    if(this.landOwner.landOwnerScore < score){
                        this.landOwner = player;
                    }
                }
                this.callLandOver(userID,score);
            }else{
                log.info("user not in room");
            }
        }
    }

    callLandOver(userID,score){
        let callOver = true;
        for(let [k, p] of this.players){
            log.debug("callLandOver player:"+p)
            if(!p.isCallLandOwner){
                callOver = false;
            }
        }
        if(this.gameState === 2){
            callOver = true;
        }
        
        //如果都叫了地主就是发送地主信息
        if(callOver){
            let event = {
                action: GameData.MSG_EVENT.CALL_LAND_OVER,
                landOwner:this.landOwner.userID,
                landCards:this.landCards,
                score : this.landOwner.landOwnerScore,
            }
            this.sendEvent(event);
        }else{
            //如果没有确定地主 就让下一个人叫
            let next = this.getNextCall(userID);
            let event = {
                action: GameData.MSG_EVENT.NEXT_CALL_LAND,//广播下一个人抢
                userID: userID,
                score : score,
                nextUser:next,
            }
            this.sendEvent(event);
        }
    }
    //获取下一个叫地主的人
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
        let content = new textEncoding.TextEncoder("utf-8").encode(JSON.stringify(event));
        this.pushHander.pushEvent({
            gameID: this.gameID, 
            roomID: this.roomID, 
            pushType: 3,
            content: content,
        });
    }
}


module.exports = Room;

