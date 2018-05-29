class PokeMatchvsRep extends egret.EventDispatcher{

    private static _instance ;
     

	private constructor() {
        super();
        MatchvsData.MatchvsRep.initResponse = this.initRsp.bind(this);
        MatchvsData.MatchvsRep.registerUserResponse = this.registerUserRsp.bind(this);
        MatchvsData.MatchvsRep.loginResponse = this.loginRsp.bind(this);
        MatchvsData.MatchvsRep.joinRoomResponse = this.joinRsp.bind(this);
        MatchvsData.MatchvsRep.joinRoomNotify = this.joinRoomNotify.bind(this);
        MatchvsData.MatchvsRep.createRoomResponse = this.createRoomRsp.bind(this);
        MatchvsData.MatchvsRep.leaveRoomNotify = this.leaveRoomNotify.bind(this);
        MatchvsData.MatchvsRep.leaveRoomResponse = this.leaveRoomRsp.bind(this);
        MatchvsData.MatchvsRep.kickPlayerResponse = this.kickPlayerRsp.bind(this);
        //todo 添加全局的一个异常监听
        MatchvsData.MatchvsRep.errorResponse = this.errorResponse.bind(this);
	}

    public static get getInstance():PokeMatchvsRep {  
         if (this._instance == null) {    
            this._instance = new PokeMatchvsRep();  
         }    
        return this._instance;  
    }  
	

	/**
     * 引擎初始化回调
     */
    initRsp= function(status) {
        if(status === 200) {
            egret.log("初始化成功"+status);
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_INIT,false,false,status));
        } else{
            egret.log("初始化失败，错误码"+status);
        }
    }

    /**
     * 注册
     */
	registerUserRsp = function(userInfo) {
        if (userInfo.status == 0) {
            egret.log("注册成功"+userInfo.status);

            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_REGISTERUSER,false,false,userInfo));
        } else {
            egret.log("注册失败，错误码："+userInfo.status);
        }
		
	}

    /**
     * 登录
     */
    loginRsp = function(loginRsp) {
        if(loginRsp.status == 200) {
            egret.log("登录成功"+loginRsp.status);
        } else {
            egret.log("登录失败，错误码："+loginRsp.status);
        }
         this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_LOGIN,false,false,loginRsp));
    }

    /**
     * 进入房间的回调
     */
    joinRsp = function(status,roomUserInfonList,roomInfo) {
        if(status == 200) {
            egret.log("进入房间成功"+status);
            roomUserInfonList.roomID = roomInfo.roomID;
            roomUserInfonList.ownerId = roomInfo.ownerId;
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_JOINROOM_RSP,false,false,roomUserInfonList));
        } else {
            egret.log("进入房间失败，错误码："+status);
        }
    }

    /**
     * 其他玩家进入房间回调
     */
    joinRoomNotify = function(roomUserInfon) {
        egret.log(roomUserInfon.userId+"进入了房间");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY,false,false,roomUserInfon));
    }

    /**
     * 其他玩家离开房间通知
     */
    leaveRoomNotify = function(leaveRoomNotify) {
        egret.log(leaveRoomNotify.userId+"离开了房间");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY,false,false,leaveRoomNotify));
    }

    /**
     * 离开房间回调函数
     */
    leaveRoomRsp = function(leaveRoomRsp) {
        egret.log("自己离开了房间");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_LEVAE_ROOM,false,false,leaveRoomRsp));
    }

    /**
     * 创建房间成功回调
     */
    createRoomRsp = function(createRoomRsp) {
        if (createRoomRsp.status == 200) {
            egret.log("进入房间成功");
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_CREATE_ROOM,false,false,createRoomRsp));
        } else {
            egret.log("进入房间失败："+createRoomRsp.status);
        }
    }

    /**
     * 踢出玩家的回调
     */
    kickPlayerRsp = function(kickPlayerRsp) {
        if (kickPlayerRsp.status == 200) {
            egret.log("玩家"+kickPlayerRsp.userID+"踢出房间成功");
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_KICK_PLAYER,false,false,kickPlayerRsp));
        } else {
           egret.log("玩家"+kickPlayerRsp.userID+"踢出房间失败 status"+kickPlayerRsp.status); 
        }
    }

    /**
     * 有玩家被踢出的通知
     */
    KickPlayerNotify = function(KickPlayerNotify) {
        egret.log("通知玩家"+KickPlayerNotify.userId+"被踢出");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_KICK_PLAYER_NOTIFY,false,false,KickPlayerNotify));
    }

    /**
     * 错误回调
     */
    errorResponse = function(errCode:number, errMsg:string) {
        egret.log("errCode"+errCode+"errMsg"+errMsg);
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_ERROR),false,false,errCode+","+errMsg);
    }

    /**
     * 排行榜正确回调
     */
    public onMsg(buf) {
        egret.log("排行榜请求成功",buf);
        var buf = JSON.parse(buf);
        var listData = JSON.parse(buf.data.dataList[0].value);
        egret.log(listData);
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_RANK_LIST,false,false,listData));
    }

    public onErr(errCode,errMsg) {
        egret.log(errCode,errMsg);
    }
	


}