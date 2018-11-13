class MvsHttpApi {
	
	public static open_host:string = MatchvsData.pPlatform == "release"? "https://vsopen.matchvs.com":"https://alphavsopen.matchvs.com";
	public static rank_list:string = "/rank/ranking_list?";
    public static rank_user:string = "/rank/grades?";

	public static get_game_data:string = "/wc5/getGameData.do?";
	public static set_game_data:string = "/wc5/setGameData.do?";
    public static del_game_data:string = "/wc5/delGameData.do?";

    public static set_user_data:string = "/wc5/setUserData.do?";
    public static get_user_data:string = "/wc5/getUserData.do?";
    public static del_user_data:string = "/wc5/delUserData.do?";

    public static hase_set:string = "/wc5/hashSet.do?";
    public static hash_get:string = "/wc5/hashGet.do?";
	
	public constructor() {
	}

	/**
     * 把参数中的 key, value  转为 key=value&key1=value2&key3=value3 形式
     * @param {any} args {key:value[, ...]} 形式
     */
	public static paramsParse(args:any){
        let str = "";
        for(let k in args){
            let val = "";
			if ( 'object' == (typeof args[k]) ) { 
                val = JSON.stringify(args[k]);
            }else{
                val = args[k];
            }

            if(str == ""){
                
                str = k + "=" + val;
            }else{
                str = str + "&" + k + "=" + val;
            }
        }
        return str;
    }

	/**
     * 组合 url 防止出现 host + path 出现两个 // 符号
     * @param {string} host 
     * @param  {...string} params 
     */
    public static url_Join(host, ...params) {
        let p = "";
        params.forEach(a => {
            if (typeof a == "object") {
                throw 'the parameter can only be string ';
            }
            if (a.substring(0,1) == '/'){
                p = p + a;
            }else{
                p = p + '/' + a;
            }
        });
        if (host.substring(host.length - 1, host.length) == '/') {
            p = host.substring(0, host.length - 1) + p;
        } else {
            p = host + p;
        }
        return p;
    }

	 /**
     * 签名
     * @param {object|string} args object格式为{gameID:"xx",userID:0} string 格式为 gameID=xx&userID=0
     * @return {string} MD5 string
     */
    public static SignParse(args){
        let paramStr = "";
        if(typeof args == "object"){
            if (!("gameID" in args) || !("userID" in args)) {
                console.log("参数中没有 gameID，或者 userID");
                return;
            }
            paramStr = MvsHttpApi.paramsParse({ gameID: args.gameID, userID: args.userID });
        }else if (typeof args == "string"){
            paramStr = args;
        }
		let md5Encode = new MD5()
        let sign = md5Encode.hex_md5(MatchvsData.appKey+"&"+paramStr+"&"+MatchvsData.secret);
        return sign;
    }
    /**
     * 签名
     * @param {object|string} args object格式为{gameID:"xx",userID:0} string 格式为 gameID=xx&userID=0
     * @return {string} MD5 string
     */
    public static SignParse2(args, appkey, token){
        let paramStr = "";
        if(typeof args == "object"){
            if (!("gameID" in args) || !("userID" in args)) {
                console.log("参数中没有 gameID，或者 userID");
                return;
            }
            paramStr = MvsHttpApi.paramsParse({ gameID: args.gameID, userID: args.userID });
        }else if (typeof args == "string"){
            paramStr = args;
        }
		let md5Encode = new MD5()
        let sign = md5Encode.hex_md5(appkey+"&"+paramStr+"&"+token);
        return sign;
    }


    /**
     * 签名
     * @param {object|string} args {gameID:, key:, userID:, value:}
     * @return {string} MD5 string
     */
    public static SignParse3(args, appkey, token){
        let paramStr = "";
        if(typeof args == "object"){
            // 这里固定使用这几个参数作为签名
            // 这里参数的位置必须是按照 a-z 的顺序排序然后再签名，不然会报错
            if("value" in args){
                paramStr = MvsHttpApi.paramsParse({gameID:args.gameID, key:args.key, userID:args.userID, value:args.value});
            }else{
                paramStr = MvsHttpApi.paramsParse({gameID:args.gameID, key:args.key, userID:args.userID});
            }
        }else if (typeof args == "string"){
            paramStr = args;
        }
		let md5Encode = new MD5()
        let sign = md5Encode.hex_md5(appkey+"&"+paramStr+"&"+token);
        return sign;
    }

	private dohttp( url:string, method:string, params:any, callback:Function){
		var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, method);
        request.setRequestHeader("Content-Type", method == "GET" ? "text/plain" : "application/json" );
		method == "GET" ? request.send() : request.send(params);
        request.addEventListener(egret.Event.COMPLETE,(event:egret.Event)=>{
            var request = <egret.HttpRequest>event.currentTarget;
            callback(JSON.parse(request.response), null);
        },this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event:egret.IOErrorEvent)=>{
			 callback(null, " http request error");
        },this);
	}

	public http_get(url, callback){
		this.dohttp(url, "GET", {}, callback);
	}

	public http_post(url, params ,callback){
		this.dohttp(url, "POST", params, callback);
	}

	public GetRankListData(callback){
		let params = {
            userID: GlobalData.myUser.userID || 0,
            gameID: MatchvsData.gameID,
            rankName:"totlal_rank",
            period:0,
            top: 50,
            pageIndex:1,
            pageMax:10,
            self:0,
            sign:"",
        }
        params.sign = MvsHttpApi.SignParse(params);
        let param = MvsHttpApi.paramsParse(params);
		this.http_get(MvsHttpApi.url_Join(MvsHttpApi.open_host,MvsHttpApi.rank_list)+param,callback);
	}

    /**
     * 获取保存在全局 http 接口列表的用户信息
     */
    public GetUserInfoList(list:Array<any>,callback:Function){
        let keyList = [];
        list.forEach(k=>{
            keyList.push({key:k});
        });

        let data = {
            gameID   : MatchvsData.gameID,
            userID   : GlobalData.myUser.userID || 0,
            keyList  : keyList,
            sign : "",
        }

        data.sign = MvsHttpApi.SignParse(data);
        let param = MvsHttpApi.paramsParse(data);
		this.http_get(MvsHttpApi.url_Join(MvsHttpApi.open_host, MvsHttpApi.get_game_data)+param, callback);
    }

    /**
     * 保存全局数据
     */
    public setGameData(userID:number, list:Array<any>, callback:Function){
        let listInfo = [];
        list.forEach(user=>{
            listInfo.push({
                key: user.userID,
                value: ArrayTools.Base64Encode(JSON.stringify({ name: user.name, avatar: user.avatar })),
            });
        });
        let params = {
            gameID : MatchvsData.gameID,
            userID : userID,
            dataList: listInfo,
            sign : ""
        }
        params.sign = MvsHttpApi.SignParse(params);
		this.http_post(MvsHttpApi.url_Join(MvsHttpApi.open_host,MvsHttpApi.set_game_data), params, callback);
    }

    /**
     * 删除全局接口数据
     */
    public delGameData(userID:number, list:Array<any>, callback){
        let keyList = [];
        list.forEach(k=>{
            keyList.push({key:k});
        });
        let args = {
            gameID:  MatchvsData.gameID,
            userID:  userID,
            keyList: keyList,
            sign: ""
        }
        args.sign = MvsHttpApi.SignParse(args);
        let params = MvsHttpApi.paramsParse(args);
		this.http_get(MvsHttpApi.url_Join(MvsHttpApi.open_host, MvsHttpApi.del_game_data) + params, callback);
    }

    public GetUserRank(userID, callback){
        let grades = {
            userID: userID,
            gameID: MatchvsData.gameID,
            type: 0,                 // 类型，取值0或者1，0排行榜，1快照
            rankName: "totlal_rank",//排行榜名称
            snapshotName: "",        //快照名称
            rank: 0,                 //范围
            period: 0,               //周期，取值0或1，0当前周期，1上一周期
            sign: "",                //签名
        }
        grades.sign = MvsHttpApi.SignParse(grades);
        let param = MvsHttpApi.paramsParse(grades);
		this.http_get(MvsHttpApi.url_Join(MvsHttpApi.open_host,MvsHttpApi.rank_user)+param,callback);
    }

    /**
     * 保存用户接口数据
     */
    public setUserData(userID, list, callback){
        let listInfo = [];
        list.forEach(user=>{
            listInfo.push({
                key: user.userID,
                value: ArrayTools.Base64Encode(JSON.stringify({ name: user.name, avatar: user.avatar })),
            });
        });
        let params = {
            gameID : MatchvsData.gameID,
            userID : userID,
            dataList: listInfo,
            sign : ""
        }
        params.sign = MvsHttpApi.SignParse2(params, "appkey", "token");
		this.http_post(MvsHttpApi.url_Join(MvsHttpApi.open_host,MvsHttpApi.set_user_data), params, callback);
    }

    /**
     * 获取用户接口数据 
     * @param {Array<number>} List
     */
    public getUserData(userID:number, list:Array<number>, callback:Function){
        let keyList = [];
        list.forEach(k=>{
            keyList.push({key:k});
        });
        let args = {
            gameID:  MatchvsData.gameID,
            userID:  userID,
            keyList: keyList,
            sign: ""
        }
        args.sign = MvsHttpApi.SignParse2(args, "appkey", "token");
        let params = MvsHttpApi.paramsParse(args);
		this.http_get(MvsHttpApi.url_Join(MvsHttpApi.open_host,MvsHttpApi.get_user_data)+params, callback);
    }

    /**
     * 删除用户接口数据
     */
    public delUserData(userID, list, callback){
        let keyList = [];
        list.forEach(k=>{
            keyList.push({key:k});
        });
        let args = {
            gameID:  MatchvsData.gameID,
            userID:  userID,
            keyList: keyList,
            sign: ""
        }
        args.sign = MvsHttpApi.SignParse2(args, "appkey", "token");
        let params = MvsHttpApi.paramsParse(args);
		this.http_get(MvsHttpApi.url_Join(MvsHttpApi.open_host,MvsHttpApi.del_user_data)+params, callback);
    }

    /**
     * 存哈希
     */
    public hashSet(userID:number, k:string, v:string, callback:Function){
        let params = {
            gameID: MatchvsData.gameID,
            key: k,
            userID: userID,
            value: v,
            sign:""
        }
        params.sign = MvsHttpApi.SignParse3(params, "appkey", "token")
        this.http_post(MvsHttpApi.url_Join(MvsHttpApi.open_host,MvsHttpApi.hash_get), params, callback);
    }

    /**
     * 取哈希
     */
    public hashGet(userID:number, k:string, callback:Function){
        let params = {
            gameID: MatchvsData.gameID,
            key: k,
            userID: userID,
            sign:""
        }
        params.sign = MvsHttpApi.SignParse3(params, "appkey", "token")
        this.http_get(MvsHttpApi.url_Join(MvsHttpApi.open_host,MvsHttpApi.hash_get) + params, callback);
    }



}