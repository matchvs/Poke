const Room = require("./Room"); 
const log4js = require('log4js');
const textEncoding = require('text-encoding');
const log = log4js.getLogger();

class RoomsCtl{
    constructor(){
        this.roomMap = new Map();
    }

    //添加房间
    add(gameID, roomID, pushHander){
        let room = new Room(gameID, roomID, pushHander);
        this.roomMap.set(roomID,room);
    }

    showRoomNum(){
        return this.roomMap.size;
    }
    //获取房间
    get(roomID){
        return this.roomMap.get(roomID);
    }

    //删除房间
    delete(roomID){
        this.roomMap.delete(roomID);
    }

    //房间加玩家
    /**
     * 
     * @param {string} roomID 
     * @param {number} userID 
     * @param {string} userProfile
     */
    palyerEnter(roomID, userID, userProfile){
        log.debug("palyerEnter roomID:"+roomID);
        let room = this.get(roomID);
        if(room){
            log.debug("palyerEnter userID:"+userID);
            room.addPlayer(userID, userProfile);
        }else{
            log.debug("房间已经不存在:" + roomID);
        }
    }
    //退出房间
    playerExit(roomID, userID){
        log.debug("playerExit roomID:"+roomID);
        let room  = this.get(roomID);
        if(room){
            log.debug("玩家退出房间:"+userID);
            room.delPlayer(userID);
        }

    }

    messageEvent(roomID, userID, cpProto){
        let room = this.roomMap.get(roomID);
        if(room){
            log.debug("messageEvent:"+cpProto);
            let event = JSON.parse(cpProto);
            room.roomEvent(userID, event);
        }
    }
}

module.exports = RoomsCtl;