const log4js = require('log4js');
const textEncoding = require('text-encoding');
const RoomsCtl = require("./RoomsCtl");

const log = log4js.getLogger();

/**
 * 游戏逻辑处理入口
 * @class App
 */
class App {
    /**
     * Creates an instance of App.
     * @memberof App
     */
    constructor() {
        this.roomCtl = new RoomsCtl();
    }

    /**
     * 设置推送handler
     * @param {Object} pushHander 
     * @memberof App
     */
    setPushHander(pushHander){
        this.pushHander = pushHander;
    }

    /**
     * 创建房间
     * @param {Object} request 
     * @param {number} request.gameID 游戏ID
     * @param {string} request.roomID 房间ID
     * @param {number} request.userID 用户ID
     * @param {Object} request.createExtInfo 房间创建扩展信息
     * @param {Number} request.createExtInfo.userID 创建者ID
     * @param {Uint8Array} request.createExtInfo.userProfile 创建者profile
     * @param {string} request.createExtInfo.roomID 房间ID
     * @param {number} request.createExtInfo.state 房间状态：1开放、2关闭
     * @param {number} request.createExtInfo.maxPlayer 最大人数
     * @param {number} request.createExtInfo.mode 游戏模式
     * @param {number} request.createExtInfo.canWatch 是否可观战
     * @param {Uint8Array} request.createExtInfo.roomProperty 房间属性
     * @param {number} request.createExtInfo.createFlag 房间创建途径：1系统创建房间、2玩家创建房间
     * @param {string} request.createExtInfo.createTime 创建时间
     * @memberof App
     */
    onCreateRoom(request) {
        log.debug(' onCreateRoom:', "roomID"+request.roomID, "userID:"+request.userID);
        this.roomCtl.add(request.gameID, request.roomID, this.pushHander);
        log.info(" 当前房间数量:"+this.roomCtl.showRoomNum());
    }

    /**
     * 删除房间
     * @param {Object} request
     * @param {number} request.gameID 游戏ID
     * @param {string} request.roomID 房间ID
     * @memberof App
     */
    onDeleteRoom(request) {
        log.debug('onDeleteRoom:' + request.roomID);
        this.roomCtl.delete(request.roomID);
    }
    
    /**
     * 玩家加入房间
     * @param {Object} request 
     * @param {number} request.gameID 游戏ID
     * @param {string} request.roomID 房间ID
     * @param {number} request.userID 用户ID
     * @param {Object} request.joinExtInfo 房间加入扩展信息
     * @param {number} request.joinExtInfo.userID 加入房间的玩家ID
     * @param {Uint8Array} request.joinExtInfo.userProfile 加入房间的玩家profile
     * @param {string} request.joinExtInfo.roomID 要加入的房间ID
     * @param {number} request.joinExtInfo.joinType 加入类型：1指定roomID、2属性匹配、3随机匹配、4重新加入、5创建房间并随后自动加入房间
     * @memberof App
     */
    onJoinRoom(request) {
        let con = new textEncoding.TextDecoder("utf-8").decode(request.joinExtInfo.userProfile);
        log.debug(' onJoinRoom:',con);
        this.roomCtl.palyerEnter(request.roomID, request.userID, con);
    }
    
    /**
     * 房间停止加人
     * @param {Object} request 
     * @param {number} request.gameID 游戏ID
     * @param {string} request.roomID 房间ID
     * @param {number} request.userID 用户ID
     * @memberof App
     */
    onJoinOver(request) {
        log.debug(' onJoinOver:');
    }
    
    /**
     * 玩家离开房间
     * @param {Object} request 
     * @param {number} request.gameID 游戏ID
     * @param {string} request.roomID 房间ID
     * @param {number} request.userID 用户ID
     * @memberof App
     */
    onLeaveRoom(request) {
        log.debug(' onLeaveRoom:', request.roomID, "userID:"+request.userID);
        let room = this.roomCtl.get(request.roomID);
        if(room){
            room.delPlayer(request.userID);
        }
    }
    
    /**
     * 踢人
     * @param {Object} request 
     * @param {number} request.gameID 游戏ID
     * @param {string} request.roomID 房间ID
     * @param {number} request.userID 用户ID
     * @memberof App
     */
    onKickPlayer(request) {
        log.debug('onKickPlayer:', request.roomID);
        let room = this.roomCtl.get(request.roomID);
        if(room){
            room.delPlayer(request.userID);
        }
    }
    
    /**
     * 同步玩家状态
     * @param {Object} request 
     * @param {number} request.gameID 游戏ID
     * @param {string} request.roomID 房间ID
     * @param {number} request.userID 用户ID
     * @param {number} request.state 1.网络异常、正在重连 2.重连成功 3.重连失败，退出房间
     * @memberof App
     */
    onUserState(request) {
        log.debug(' 玩家状态:', request.state, "roomID:" + request.roomID, "userID:" + request.userID);
        let room = this.roomCtl.get(request.roomID);
        if(room && request.state === 3){
            log.debug('玩家已离开:', request.userID);
            room.delPlayer(request.userID);
        }
    }

    /**
     * 自定义消息
     * @param {Object} request 
     * @param {number} request.gameID 游戏ID
     * @param {string} request.roomID 房间ID
     * @param {number} request.userID 用户ID
     * @param {number} request.flag
     * @param {number[]} request.destsList
     * @param {Uint8Array} request.cpProto 自定义消息内容
     * @memberof App
     */
    onReceiveEvent(request) {
        //log.debug('onReceiveEvent:', request);
        let content = new textEncoding.TextDecoder("utf-8").decode(request.cpProto);
        log.info("content:"+content);
        this.roomCtl.messageEvent(request.roomID, request.userID, content);
    }

    /**
     * 房间详情信息
     * @param {Object} request
     * @param {number} request.gameID 游戏ID
     * @param {string} request.roomID 房间ID
     * @param {number} request.userID 用户ID
     * @param {Object} request.roomDetail 房间详情
     * @param {string} request.roomDetail.roomID 房间ID 
     * @param {number} request.roomDetail.state 房间状态：1开放、2关闭
     * @param {number} request.roomDetail.maxPlayer 房间最大人数
     * @param {number} request.roomDetail.mode 模式
     * @param {number} request.roomDetail.canWatch 是否可观战
     * @param {Uint8Array} request.roomDetail.roomProperty 房间属性
     * @param {number} request.roomDetail.owner 房主
     * @param {number} request.roomDetail.createFlag 房间创建途径：1系统创建房间、2玩家创建房间
     * @param {Object[]} request.roomDetail.playersList 房间用户列表
     * @param {number} request.roomDetail.playersList[].userID 用户ID
     * @param {Uint8Array} request.roomDetail.playersList[].userProfile 用户profile
     * @memberof App
     */
    onRoomDetail(request) {
        log.debug('onRoomDetail:');
    }
}

module.exports = App;