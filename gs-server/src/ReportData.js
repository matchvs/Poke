
const http = require("http");
const log4js = require('log4js');
const GameData = require("./GameData");
const ArrayTools = require("./ArrayTools");
const log = log4js.getLogger();
/**
 * 数据上报
 */
var _reportData = null;
class ReportData{
    
    constructor(){
        this.gameID = GameData.Conf.GAMEID;
        this.appkey = GameData.Conf.APPKEY;
        this.secret = GameData.Conf.SECRET;
        this.scoreBuff = new Map();          //上报分数缓存列表 key = userID
        this.haveSort = new Array();         //用户分数排序列表 [{key:userID, value:score}]
        this.timerTasks = [];
    }

    /**
     * base64 编码
     * @param {string} str 
     */
    base64Encode(str){
        var b = new Buffer(str);
        var s = b.toString('base64');
        return s;
    }

    /**
     * base 解码
     * @param {string} str 
     */
    base64Decode(str){
        var c = new Buffer(str, 'base64')
        var d = c.toString();
        return d;
    } 

    /**
     * 获取上报数据的实例，单例类型
     */
    static getInstance(){
        if(_reportData == null){
            log.debug("ReportData new")
            _reportData = new ReportData();
        }
        return _reportData;
    }

    /**
     * 读取排行榜数据
     */
    readRankListFromHttp(){
        let self = this
        let keylist = [{key:"rankList"}];
        log.debug("readRankListFromHttp keylist",keylist);
        this.getGameScore(0,keylist,(body)=>{
            let resData = JSON.parse(body);
            log.debug("readRankListFromHttp keylist",body);
            if( resData.hasOwnProperty("status") && resData.hasOwnProperty("data")){
                if(resData.status == 0){
                    if(resData.data.dataList[0].hasOwnProperty("value")){
                        // let vl = self.base64Decode(resData.data.dataList[0].value);
                        // let datas = JSON.parse(vl);
                        // datas.forEach(function(element){
                        //     self.scoreBuff.set(element.key, self.MapdataPare(element));
                        // });
                        let element = {
                            key:3634266,
                            name:"维维",
                            value:104200,
                            avator:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIK942UaccTwGKEgIUhxibu1JYGp7BdfNLofiav05CUJDHn9cm7Vs9tCjljVticyoeWWq02C4nVnoChg/132"
                        }
                        self.scoreBuff.set(element.key, self.MapdataPare(element));
                        self.scoreBuffToSort();
                        //self.writeRankListToHttp();
                    }
                }
            }
        });
    }

    /**
     * 定时写入排行榜数据
     */
    writeRankListToHttp(){
        let self = this;
        this.timerTasks.push(setInterval(function(){
            log.info("writ rank data to http");
            self.saveRankData(GameData.Conf.RANK_NUM);
        },30000));
    }

    MapdataPare(data, k){
        let name = "";
        let avator = "";
        let score = 0;
        if("name" in data){
            name = data.name;
        }
        if("avator" in data){
            avator = data.avator;
        }
        if("value" in data){
            score = data.value
        }
        if(k){
            return {key:k, value: score, name:name, avator:avator};
        }
        return {value: score, name:name,avator:avator};
    }

    /**
     * 添加分数列表
     * @param {number} userid 
     * @param {number} score 
     */
    addScoreBuff(userid, data){
        log.debug("userID:"+userid+" score:",data);
        this.scoreBuff.set(userid, this.MapdataPare(data));
        log.debug("addScoreBuff scoreBuff length:",this.scoreBuff.size);
    }

    /**
     * 查询用户是否存在缓存中
     * @param {number} userid 
     */
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
            list.push(this.MapdataPare(p,k));
        }
        return list;
    }

    /**
     * 计算排行
     */
    scoreBuffToSort(){
        let list = this.mapToKeyValuelist(this.scoreBuff);
        this.haveSort = [];
        //排序 降序
        this.haveSort = list.sort((a,b)=>{
            return a.value > b.value ? -1 : 1;
        });
        this.saveRankData(GameData.Conf.RANK_NUM);
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
     * 保存前多少名的排名数据
     * @param {number} beforeNum <= 120
     */
    saveRankData(beforeNum){
        if(beforeNum === undefined){
            beforeNum = 120;
        }
        if(beforeNum > 120){
            log.error("Only allow 150 data at a time");
            return;
        }
        let list = [];
        //只取前150名保存 数据太多无法保存
        for(let i = 0; i < beforeNum && i < this.haveSort.length; i++){
            list.push(this.haveSort[i]);
        }
        log.debug("saveRankData list length:",list.length);
        if(list.length == 0){
            return;
        }
        let rankListSt = JSON.stringify(list);
        let ec = this.base64Encode(rankListSt);
        log.debug("rankListSt encode:",rankListSt);

        //log.debug("rankListSt encode:", this.base64Decode(ec));

        let datalist = [{key:"rankList",value:ec}];
        this.saveGameScore(datalist);
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
     * 
     * @param {string} dataObj "[{key:k, value: score, name:name, avator:avator},{key:k, value: score, name:name, avator:avator}]"
     * @param {string} option the enum for GameData
     * @param {Function} callBack (body)=>{}
     */
    doRequest(userid, dataObj, option, callBack, errCall){
        if(dataObj.length > 150){
            log.error("datalist too long");
        }else{
            let url = (GameData.Conf.DATA_STORAGE_ENV == 1 ? GameData.HttpApi.RELEASE_HOST:GameData.HttpApi.ALPHA_HOST)+option;
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
     * 保存列表数据
     * @param {Array} dataList [{key:k, value: score, name:name, avator:avator},{key:k, value: score, name:name, avator:avator}]
     * @param {number} userID 
     * @param {function} callBack function name(body) {}
     * @param {function} errCall function name(err) {}
     */
    saveGameScore(dataList, callBack, errCall){
        //log.log(typeof(callBack));
        if(typeof(callBack) === "undefined" || typeof(errCall) === "undefined" ){
            this.doRequest(0, dataList, GameData.HttpApi.SET_GAMEDATA, (body)=>{
                log.info("saveGameScore body:" + body);
            },(err)=>{
                log.error("saveGameScore",err.message);
            });
        }else{
            this.doRequest(0, dataList, GameData.HttpApi.SET_GAMEDATA, callBack, errCall);
        }
        
    }

    /**
     * 删除列表数据
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
     * 获取列表数据
     * @param {Array} keyList ["key1","key2"]
     */
    getGameScore(userID, keyList, resFun){
        this.doRequest(userID, keyList, GameData.HttpApi.GET_GAMEDATA, resFun, (err)=>{
            log.error("getGameScore error:", err);
        });
    }
    
    /**
     * 从数据库中更新缓存列表中的数据
     */
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