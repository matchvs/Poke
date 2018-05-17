class PokeMatchvsRep extends egret.EventDispatcher{

    private static _instance ;
    private _myUser:GUser;

	private constructor() {
        super();
        egret.log(this);
        MatchvsData.MatchvsRep.initResponse = this.initRsp.bind(this);
        MatchvsData.MatchvsRep.registerUserResponse = this.registerUserRsp.bind(this);
        MatchvsData.MatchvsRep.loginResponse = this.loginRsp.bind(this);
        MatchvsData.MatchvsRep.joinRoomResponse = this.joinRsp.bind(this);
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

	registerUserRsp = function(userInfo) {
        if (userInfo.status == 0) {
            egret.log("注册成功"+userInfo.status);
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_REGISTERUSER,false,false,userInfo));
        } else {
            egret.log("注册失败，错误码："+userInfo.status);
        }
		
	}

    loginRsp = function(loginRsp) {
        if(loginRsp.status == 200) {
            egret.log("登录成功"+loginRsp.status);
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_LOGIN,false,false,loginRsp));
        } else {
            egret.log("登录失败，错误码："+loginRsp.status);
        }
    }

    joinRsp = function(status,roomUserInfonList,roomInfo) {
        if(status == 200) {
            egret.log("进入房间成功"+status);
            var userPlayer = [];
            var user:GUser;
            for(var i in roomUserInfonList) {
                user.nickName = roomUserInfonList[i].userId;
                user.avator = roomUserInfonList[i].userProfile;
                user.pointValue = 10000;
            }
            userPlayer.push(user);
            egret.log("userPlayer的长度"+userPlayer.length);
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_JOINROOM_RSP,false,false,userPlayer));
        } else {
            egret.log("进入房间失败，错误码："+status);
        }
    }

	


}