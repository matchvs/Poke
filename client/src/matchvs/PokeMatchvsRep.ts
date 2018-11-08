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
        MatchvsData.MatchvsRep.kickPlayerNotify = this.KickPlayerNotify.bind(this);
        MatchvsData.MatchvsRep.networkStateNotify = this.networkStateNotify.bind(this);
        //todo 添加全局的一个异常监听
        MatchvsData.MatchvsRep.errorResponse = this.errorResponse.bind(this);
        MatchvsData.MatchvsRep.getRoomDetailResponse = this.getRoomDetailResponse.bind(this);
        MatchvsData.MatchvsRep.sendEventResponse = this.sendEventResponse.bind(this);
        MatchvsData.MatchvsRep.sendEventNotify = this.sendEventNotify.bind(this);
        
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
            console.log("初始化成功"+status);
            PokeMatchvsEngine.getInstance.registerUser();
            // this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_INIT,false,false,status));
        } else{
            console.log("初始化失败，错误码"+status);
        }
    }

    /**
     * 注册
     */
	registerUserRsp = function(userInfo) {
        if (userInfo.status == 0) {
            console.log("注册成功"+userInfo.status);
            PokeMatchvsEngine.getInstance.login(userInfo.id,userInfo.token);
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_REGISTERUSER,false,false,userInfo));
        } else {
            console.log("注册失败，错误码："+userInfo.status);
        }
		
	}

    /**
     * 登录
     */
    loginRsp = function(loginRsp) {
        // if(loginRsp.status == 200) {
        console.log("登录:"+loginRsp.status);
        // 没有断线重连功能，登陆成功后发现还再房间中就退出房间
        if(loginRsp.roomID != undefined && loginRsp.roomID != "0") {
            PokeMatchvsEngine.getInstance.leaveRoom(MatchvsData.getDefaultUserProfile());
        }
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_LOGIN,false,false,loginRsp));

        // } else {
            // console.log("登录失败，错误码："+loginRsp.status);
        // }
    }

    /**
     * 进入房间的回调
     */
    joinRsp = function(status,roomUserInfonList,roomInfo) {
        if(status == 200) {
            console.log("进入房间成功"+status);
            roomUserInfonList.roomID = roomInfo.roomID;
            roomUserInfonList.ownerId = roomInfo.ownerId;
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_JOINROOM_RSP,false,false,roomUserInfonList));
        } else {
            console.log("进入房间失败，错误码："+status);
            Toast.show("进入房间失败");
        }
    }

    /**
     * 其他玩家进入房间回调
     */
    joinRoomNotify = function(roomUserInfon) {
        console.log(roomUserInfon.userId+"进入了房间");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY,false,false,roomUserInfon));
    }

    /**
     * 其他玩家离开房间通知
     */
    leaveRoomNotify = function(leaveRoomNotify) {
        console.log(leaveRoomNotify.userId+"离开了房间");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY,false,false,leaveRoomNotify));
    }

    /**
     * 离开房间回调函数
     */
    leaveRoomRsp = function(leaveRoomRsp) {
        console.log("自己离开了房间");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_LEVAE_ROOM,false,false,leaveRoomRsp));
    }

    /**
     * 创建房间成功回调
     */
    createRoomRsp = function(createRoomRsp) {
        // if (createRoomRsp.status == 200) {
            // console.log("进入房间成功");
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_CREATE_ROOM,false,false,createRoomRsp));
        // } else {
            // console.log("进入房间失败："+createRoomRsp.status);
        // }
    }

    /**
     * 踢出玩家的回调
     */
    kickPlayerRsp = function(kickPlayerRsp) {
        if (kickPlayerRsp.status == 200) {
            console.log("玩家"+kickPlayerRsp.userID+"踢出房间成功");
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_KICK_PLAYER,false,false,kickPlayerRsp));
        } else {
           console.log("玩家"+kickPlayerRsp.userID+"踢出房间失败 status"+kickPlayerRsp.status); 
        }
    }

    /**
     * 有玩家被踢出的通知
     */
    KickPlayerNotify = function(KickPlayerNotify) {
        console.log("通知玩家"+KickPlayerNotify.userId+"被踢出");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_KICK_PLAYER_NOTIFY,false,false,KickPlayerNotify));
    }

    /**
     * 错误回调
     */
    public errorResponse = function(errCode:number, errMsg:string) {
        console.log("errCode："+errCode+" errMsg:"+errMsg);
        if(errCode == 1001){
            if(errMsg != "" && errMsg.indexOf("hotel") >= 0){
                errCode = 1002; //这里自定义把hotel断开改为 1002
            }
        }
        let data ={
            code:errCode,
            msg:errMsg
        }
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_ERROR,false,false,data));
    }

    /**
     * 排行榜正确回调
     */
    public onMsg(buf) {
        var buf = JSON.parse(buf);
        //var listData = this.ab2str(egret.Base64Util.decode(buf.data.dataList[0].value));
        var listData = ArrayTools.Base64Decode(buf.data.dataList[0].value);
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_RANK_LIST,false,false,listData));
    }

    public onErr(errCode,errMsg) {
        console.log(errCode,errMsg);
    }

    /**
     * 获取房间详情
     */
    getRoomDetailResponse = function(rsp) {
        console.log("获取房间详情成功");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_ROOM_DETAIL_RSP,false,false,rsp));
    }
	
    /**
     * 有人房间状态出现异常时回调
     */
    private networkStateNotify(netnotify:MsNetworkStateNotify){
        let event ={userID:netnotify.userID,state:netnotify.state};
        console.log("networkStateNotify",event);
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_NETWORKSTATE,false,false,event));
    }

    /**
     * 发送消息回调
     */
    private sendEventResponse (sendEventRsp) {
        if(sendEventRsp.status === 200) {
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_SEND_EVENT_RSP,false,false,sendEventRsp));
        } else {
            console.log("发送消息失败 status"+sendEventRsp.status);
        }
    }

    /**
     * 收到消息通知
     */
    private sendEventNotify (eventInfo) {
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_SEND_EVENT_NOTIFY,false,false,eventInfo));
        console.log("收到消息 status"+eventInfo);
    }




    private ab2str(buf) {
		return String.fromCharCode.apply(null, new Uint8Array(buf));
	}

}