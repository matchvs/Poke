class PokeMatchvsRep extends egret.EventDispatcher{

    private static _instance ;

	private constructor() {
        super();
        egret.log(this);
        MatchvsData.MatchvsRep.initResponse = this.initRsp.bind(this);
        MatchvsData.MatchvsRep.registerUserResponse = this.registerUserRsp.bind(this);
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
            egret.log("初始化成功，错误码"+status);
            this.dispatchEvent(new egret.Event("init",false,false,"obj"));
        } else{
            egret.log("初始化失败，错误码"+status);
        }
    }

	registerUserRsp = function(status) {
		
	}

	


}