const ReportData = require("./ReportData");
const log4js = require('log4js');

const log = log4js.getLogger();

class Player{
    constructor(userID){
        this.userID = userID;       //用户ID
        this.nickName = "";
        this.avator = "";
        this.cardList = [];         //手中的牌
        this.integral = 0;          //积分
        this.isLandOwner = false;   //是否是地主
        this.landOwnerScore = 0;    //叫地主的分数
        this.isAuto = false;        //托管
        this.localTableId = 0;      //桌子位置
        this.isReady = false;
        this.isCallLandOwner = false;
        this.gameScore = 0;
        this.ranking = 0;
        this.isOk = false;
    }

    reInitInfo(){
        this.cardList = [];         //手中的牌
        this.integral = 0;          //积分
        this.isLandOwner = false;   //是否是地主
        this.landOwnerScore = 0;    //叫地主的分数
        this.isAuto = false;        //托管
        this.localTableId = 0;      //桌子位置
        this.isReady = false;
        this.isCallLandOwner = false;
        this.gameScore = 0;
        this.ranking = 0;
        this.isOk = false;
    }

    PlayCards(cards){
        
    }

    /**
     * 
     * @param {object} data 分数 {times:1,model:1,value:19}
     * @param {function} _callback 结果回调函数 
     */
    reportGameScore(data, _callback){
        let model = data.model;
        let score = data.value;
        if("avator" in data ){
            this.avator = data.avator;
        }
        if("name" in data){
            this.nickName = data.name+"";
        }
        //计算游戏分数
        this.planGameScore(this.userID, _callback, (oriScore, incScore)=>{
            if(model == 1){
                this.gameScore = score;
            }else if(model == 2){
                this.gameScore = oriScore + score;
            }
            this.gameScore = this.gameScore < 0 ? 0: this.gameScore;
            //返回结果分数
            log.debug("reportGameScore",this.gameScore);
            return this.gameScore;
        });
    }


    /**
     * 
     * @param {userID} userID 用户ID
     * @param {function} resFun 结果出来回调函数
     * @param {function} operateFun 计算分数操作函数 (oriScore:number, incScore:number){return resScore}
     * oriScore 原来分数，resScore结果分数
     */
    planGameScore(userID, resFun, operateFun){
        let report = ReportData.getInstance();
        //先查询缓存里面是否有数据
        let buffdata = report.findScoreBuffData(userID);
        if(buffdata){
            log.debug("缓存中查找到：", buffdata);
            let resScore = operateFun(buffdata, 0);
            this.updateGameScore(userID, resScore, resFun);
        }else{
            //缓存中没有查询到就 查询http接口
            let keylist = [{key:userID}];
            //查询http接口 是否有保存这个用户的数据，有就取出，设置到缓存
            report.getGameScore(userID, keylist, (body)=>{
                let dataList = [];
                let repData = JSON.parse(body);
                log.debug("getGameScore body:" + body);
                if( repData.hasOwnProperty("status") && repData.hasOwnProperty("data")){
                    if(repData.status == 0){
                        //log.debug(repData.data.dataList);
                        dataList = repData.data.dataList;
                    }
                }
                log.debug("http接口查找到dataList：", dataList);
                let resScore = 0;
                if(dataList.length > 0){
                    resScore = operateFun(Number(dataList[0].value), Number(0));
                }else{
                    resScore = operateFun(Number(10000), Number(0));
                }
                this.updateGameScore(userID, resScore, resFun);
            });
        }
    }

    /**
     * 更新当前玩家的分数
     * @param {number} userid 
     * @param {number} _score 
     * @param {function} _callback function(event){}  event={rank:ranking, totleScore:value};
     */
    updateGameScore(userid, _score , _callback){
        let report = ReportData.getInstance();
        let event = null;
        //添加新分数到内存中
        report.addScoreBuff(userid, {value:_score,name:this.nickName,avator:this.avator});
        //排序一下
        report.scoreBuffToSort();

        //获取排名位置
        let ranking = report.getRankPosition(userid)+1;
        this.ranking = ranking;
        log.debug("rank:", ranking);

        let dataliet = [{key:userid,value:_score}];
        //保存当前用户的数据
        report.saveGameScore(dataliet, (body)=>{
            log.debug(body);
            let repData = JSON.parse(body);
            if(repData.status === 0){
                event = {rank:ranking, totleScore:dataliet[0].value};
                _callback(event);
                this.reInitInfo();
            }else{
                log.error("dataliet:",dataliet);
                log.error("save data error:",body);
            }
        },(err)=>{
            log.error("dataliet:",dataliet);
            log.error(err.message);
        });
    }

    /**
     * 
     * @param {Array} userlist [userid,userid]
     */
    clearScoreData(userlist){
        if(typeof(userlist) == undefined){
            return;
        }
        let report = ReportData.getInstance();
        let keylist = [];
        userlist.forEach(element => {
            keylist.push({key:element});
        });
        report.deleteGameScore(this.userID, keylist);
    }
}


module.exports = Player;

