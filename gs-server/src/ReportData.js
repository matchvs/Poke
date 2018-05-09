
const http = require("http");
const log4js = require('log4js');
const GameData = require("./GameData");
const ArrayTools = require("./ArrayTools");
const log = log4js.getLogger();
/**
 * 数据上报
 */
class ReportData{
    constructor(){
        var _reportData = this;
        this.gameID = GameData.Conf.GAMEID;
        this.appkey = GameData.Conf.APPKEY;
        this.secret = GameData.Conf.SECRET;
        this.scoreBuff = new Map();          //上报分数缓存列表 key = userID
        this.haveSort = new Array();         //用户分数排序列表 [{key:userID, value:score}]
        //this.rankUseList = new Array();      // [{userID:score},{userID:score}] length < 150
    }

    /**
     * 获取上报数据的实例，单例类型
     */
    static getInstance(){
        if(ReportData._reportData == null){
            log.debug("ReportData new")
            ReportData._reportData = new ReportData();
        }
        return ReportData._reportData;
    }

    /**
     * 添加分数列表
     * @param {number} userid 
     * @param {number} score 
     */
    addScoreBuff(userid, score){
        log.debug("userID:"+userid+" score:"+score);
        this.scoreBuff.set(userid, score);
        log.debug("addScoreBuff scoreBuff length:",this.scoreBuff.size);
    }

    findScoreBuffData(userid){
        return this.scoreBuff.get(userid);
    }

    /**
     * 把map数据转换成 [{key:"",value:0}] 数据类型
     * @param {Map} _map 
     */
    mapToKeyValuelist(_map){
        let list = [];
        for(let [k,p] of _map){
            list.push({key:k, value: p});
        }
        return list;
    }

    /**
     * 分数排行
     */
    scoreBuffToSort(){
        let list = this.mapToKeyValuelist(this.scoreBuff);
        this.haveSort = [];
        //排序 降序
        this.haveSort = list.sort((a,b)=>{
            return a.value > b.value ? -1 : 1;
        });
        //log.debug("scoreBuffToSort:",this.haveSort.length);
    }

    /**
     * 获取排名的位置
     * @param {number} userID 
     */
    getRankPosition(userID){
        //log.debug("rank data:"+userID);
        return this.haveSort.findIndex(function(ele){
            return ele.key == userID; 
        });
    }

    /**
     * 保存排名数据
     * @param {number} beforeNum <= 150
     */
    saveRankData(beforeNum){
        if(beforeNum === undefined){
            beforeNum = 150;
        }
        if(beforeNum > 150){
            log.error("Only allow 150 data at a time");
            return;
        }
        let list = [];
        //只取前150名保存 数据太多无法保存
        for(let i = 0; i < beforeNum && i < this.haveSort.length; i++){
            list.push(this.haveSort[i]);
        }
        this.saveGameScore(list, 0);
    }
    

    /**
     * http get 请求
     * @param {string} url 
     * @param {Function} refFun  function name(body){}
     * @param {Function} errFun  function name(err){}
     */
    httpGetReq(url, refFun, errFun){
        if(typeof(refFun) !== "function" && typeof(errFun) !== "function"){
            log.error("refFun or errFun is not a Function");
            return;
        }
        log.debug(url);
        http.get(url, (res)=>{
            let rawData = '';
            res.setEncoding('utf8');
            var size = 0;
            var chunks = [];
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', ()=>{
                refFun(rawData);
            });
        }).on('error', (err)=>{
            errFun(err);
        });
    }


    /**
     * 获取请求地主
     * @return {string} url
     */
    getUrl(){
        if(GameData.Conf.DATA_STORAGE_ENV == 1){
            return GameData.HttpApi.RELEASE_HOST;
        }else{
            return GameData.HttpApi.ALPHA_HOST;
        }
    }

    /**
     * 
     * @param {string} dataObj "[{key:"name",value:1},{key:"name",value:2},{key:"name",value:3}]"
     * @param {string} option the enum for GameData
     * @param {Function} callBack (body)=>{}
     */
    doRequest(userid, dataObj, option, callBack, errCall){
        if(dataObj.length > 150){
            log.error("datalist too long");
        }else{
            let url = this.getUrl()+option;
            let params = "gameID="+this.gameID+"&userID="+userid;
            let sign = ArrayTools.md5Encode(this.appkey+"&"+params+"&"+this.secret);
            let dataStr = JSON.stringify(dataObj);
            if(option == GameData.HttpApi.SET_GAMEDATA){
                url = url+params+"&dataList="+dataStr+"&sign="+sign;
            }else{
                url = url+params+"&keyList="+dataStr+"&sign="+sign;
            }
            this.httpGetReq(url, callBack, errCall);
        }
    }

    /**
     * 
     * @param {Array} dataList [{key:"name",value:1},{key:"name",value:2},{key:"name",value:3}]
     * @param {number} userID 
     * @param {function} callBack function name(body) {}
     * @param {function} errCall function name(err) {}
     */
    saveGameScore(dataList, userID, callBack, errCall){
        //log.log(typeof(callBack));
        if(typeof(callBack) === "undefined" || typeof(errCall) === "undefined" ){
            this.doRequest(userID, dataList, GameData.HttpApi.SET_GAMEDATA, (body)=>{
                log.info("saveGameScore body:" + body);
            },(err)=>{
                log.error(saveGameScore,err.message);
            });
        }else{
            this.doRequest(userID, dataList, GameData.HttpApi.SET_GAMEDATA, callBack, errCall);
        }
        
    }

    /**
     * 删除玩家分数
     * @param {number} userID 用户ID
     * @param {Array} keyList ["key1","key2"] 
     */
    deleteGameScore(userID, keyList){
        this.doRequest(userID, keyList, GameData.HttpApi.DELETE_GAMEDATA, (body)=>{
            log.info("body:" + body);
        },(err)=>{
            log.error(err.message);
        });
    }

    /**
     * 获取玩家分数
     * @param {Array} keyList ["key1","key2"]
     */
    getGameScore(userID, keyList, resFun){
        this.doRequest(userID, keyList, GameData.HttpApi.GET_GAMEDATA, resFun, (err)=>{
            log.error("getGameScore error:", err);
        });
    }
    
    getRankUserData(){
        let list = [];
        for(let k of this.scoreBuff.keys()){
            list.push({"key":k});
        }
        log.info(list);
        this.getGameScore(0, list);
    }


}

module.exports = ReportData;