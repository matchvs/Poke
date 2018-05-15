class PokeMatchvsRep {

	public constructor() {
		var response = new MatchvsResponse();
		response.initResponse = this.initResponse.bind(this);
		response.registerUserResponse = this.registerUserResponse.bind(this);
	}


	/**
     * 引擎初始化回调
     */
    initResponse = function(status) {
        if(status === 200) {
            // windowui.LoadingInst.Instance.SetText("初始化成功");
            this.engine.registerUser();
        } else{
            egret.log("初始化失败，错误码"+status);
        }
    }

	registerUserResponse = function(status) {
		
	}

	


}