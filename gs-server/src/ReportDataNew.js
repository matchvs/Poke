const log4js        = require('log4js');
const GameData      = require("./GameData");
const ArrayTools    = require("./ArrayTools");
const crypto        = require('crypto');
const httpReq       = require('./HttpRequest');

const log               = log4js.getLogger();
const http              = new httpReq();

const rank_host         = (GameData.Conf.DATA_STORAGE_ENV == 1 ? GameData.HttpApi.RELEASE_HOST : GameData.HttpApi.ALPHA_HOST); // 排行榜接口地址
const rank_config       = "/rank/ranking_list_configs?";    // 排行榜配置
const rank_score        = "/rank/scores?";                  // 上传排行榜分数
const rank_snapshot     = "/rank/snapshot?";                // 创建排行榜快照
const rank_grades       = "/rank/grades?";                  // 查询用户排行
const rank_list         = "/rank/ranking_list?";            // 排版列表
const rank_delete = "/rank/ranking_list_configs?";


class ReportDataNew{
    constructor(){
        this.gameID = GameData.Conf.GAMEID;
        this.appkey = GameData.Conf.APPKEY;
        this.secret = GameData.Conf.SECRET;
        this.Sequence = 1;
        this.rankconfig = {
            gameID: this.gameID,
            rankinglistName: "totlal_rank",
            rankGist: "score",
            sortOrder: 0,
            updatePeriodType: 3,
            customStartTime: 0,
            customPeriod: 0,
            rankNum: 100,
            historyPeriodNum: 0,
            updateRuleType: 2,
            sign: "",
            userID: 0,
            mode:2,
        };
    }

    /**
     * md5加密
     * @param {string} content 
     */
    md5Encode(content) {
        let md5 = crypto.createHash("md5");
        md5.update(content);
        return md5.digest('hex');
    }

    /**
     * base64 编码
     * @param {string} str 
     */
    base64Encode(str) {
        var b = new Buffer(str);
        var s = b.toString('base64');
        return s;
    }

    /**
     * base 解码
     * @param {string} str 
     */
    base64Decode(str) {
        var c = new Buffer(str, 'base64')
        var d = c.toString();
        return d;
    } 

    /**
     * 把参数中的 key, value  转为 key=value&key1=value2&key3=value3 形式
     * @param {object} args {key:value[, ...]} 形式
     */
    paramsParse(args){
        let str = "";
        for(let k in args){
            //console.log(k, args[k]);
            let val = "";
            if (typeof args[k] == "object" || typeof args[k] == "Array") { 
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

    getTimeStamp() {
        return Math.floor(Date.now() / 1000);
    }

    getSequence() {
        return this.Sequence++;
    }

    /**
     * 签名
     * @param {object|string} args 
     * @param {Array} points 
     */
    SignParse(args, points){
        if (typeof args !== "object") {
            console.log("args 参数类型不对");
            return "";
        }
        points.sort();
        let tempArgs = {};
        points.forEach((val)=>{
            tempArgs[val] = args[val];
        });

        if("seq" in args){
            tempArgs["seq"] = args["seq"];
        }

        if("ts" in args){
            tempArgs["ts"] = args["ts"];
        }

        let paramStr = "";
        paramStr = this.paramsParse(tempArgs);
        let sign = this.md5Encode(this.appkey+"&"+paramStr+"&"+this.secret);
        return sign;
    }
    
    /**
     * 创建排行榜
     * @param {Function} callback 回调函数
     */
    CreatorRankConfig(callback){
        this.rankconfig["seq"] = this.getSequence();
        this.rankconfig["ts"]= this.getTimeStamp();
        this.rankconfig.sign = this.SignParse(this.rankconfig, ["gameID"]);
        http.post(httpReq.url_Join(rank_host, rank_config), this.rankconfig, callback);
    }

    /**
     * 上传分数
     * @param {object} args 请求参数 {userID:1,value:0}
     * @param {Function} callback 回调函数
     */
    UpdateScores(args, callback){
        let data = {
            userID:args.userID,
            gameID:this.gameID,
            sign:"",
            items:[
                {fieldName:this.rankconfig.rankGist, value:args.value}
            ],
            mode:2,
            seq:this.getSequence(),
            ts:this.getTimeStamp()
        };
        data.sign = this.SignParse(data, ["gameID","userID"]);
        let userid = args.userID;
        console.log("上报数据参数：", JSON.stringify(data));
        http.put(httpReq.url_Join(rank_host, rank_score) , data, callback);
    }

    /**
     * 获取指定用户排行榜数据
     * @param {object} args {userID:,}
     * @param {Function} callback 
     */
    GetUserRank(args, callback){
        let grades = {
            userID: args.userID,
            gameID: this.gameID,
            type: 0,                 // 类型，取值0或者1，0排行榜，1快照
            rankName: this.rankconfig.rankinglistName,//排行榜名称
            snapshotName: "",        //快照名称
            rank: 0,                 //范围
            period: 0,               //周期，取值0或1，0当前周期，1上一周期
            sing: "",                //签名
            mode:2,
            seq: this.getSequence(),
            ts: this.getTimeStamp()
        }
        grades.sign = this.SignParse(grades, ["gameID", "userID"]);
        let param = this.paramsParse(grades);
        http.get(httpReq.url_Join(rank_host, rank_grades) + param, callback);
    }

    /**
     * 获取排行榜列表
     * @param {object} args 参数 {userID: ,gameID:,rankName:,period:0,top: 50,pageIndex:1,pageMax:10,self:1,sign:""}
     * @param {Function} callback 回调函数 (res, err)=>{}
     */
    GetRankList(args, callback){
        args = {
            userID: args.userID,
            gameID:this.gameID,
            rankName:this.rankconfig.rankinglistName,
            period:0,
            top: 50,
            pageIndex:1,
            pageMax:10,
            self:1,
            sign:"",
            mode:2,
            seq: this.getSequence(),
            ts: this.getTimeStamp()
        }
        args.sign = this.SignParse(args,["gameID", "userID"]);
        let param = this.paramsParse(args);
        http.get(httpReq.url_Join(rank_host, rank_list) + param, callback);
    }

    /**
     * 保存用户信息
     * @param {number} userID
     * @param {Array<object>} userInfo [{userID:123, name:'', avatar:''}]
     * @param {Function} callback 
     */
    RecordUserListInfo(userID , InfoList , callback){
        let listInfo =[];
        InfoList.forEach(user=>{
            listInfo.push({
                key: user.userID,
                value: this.base64Encode(JSON.stringify({ name: user.name, avatar: user.avatar })),
            });
        });

        let data = {
            gameID   : this.gameID,
            userID   : userID, 
            dataList : listInfo,
            sign     : "",
            mode:2,
            seq: this.getSequence(),
            ts: this.getTimeStamp()
        }

        data.sign = this.SignParse(data, ["gameID","userID"]);
        let param = this.paramsParse(data);
        http.get(httpReq.url_Join(rank_host, GameData.HttpApi.SET_GAMEDATA) + param, callback);
    }

    /**
     * 保存用户信息
     * @param {Array<object>} userList {userID:, list:[]}
     * @param {Function} callback 
     */
    GetUserListInfo(userID, list, callback) {
        let keyList = [];
        list.forEach(k=>{
            keyList.push({key:k});
        });
        let data = {
            gameID   : this.gameID,
            userID   : userID,
            keyList  : keyList,
            sign : "",
            mode: 2,
            seq: this.getSequence(),
            ts: this.getTimeStamp()
        }
        data.sign = this.SignParse(data, ["gameID", "userID"]);
        let param = this.paramsParse(data);
        http.get(httpReq.url_Join(rank_host, GameData.HttpApi.GET_GAMEDATA) + param, callback);
    }

    DeleteRankConfig(callback){
        let args = {
            gameID: this.gameID,
            rankinglistName: this.rankconfig.rankinglistName,
            userID:0,
            mode:2,
            seq: this.getSequence(),
            ts: this.getTimeStamp()
        }
        args.sign = this.SignParse(args, ["gameID", "userID"]);
        http.delete(httpReq.url_Join(rank_host, rank_delete),args, callback);
    }
}

module.exports = ReportDataNew;