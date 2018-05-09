const ReportData = require("./ReportData");
const log4js = require('log4js');

const log = log4js.getLogger();

class Player{
    constructor(userID){
        this.userID = userID;       //用户ID
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
    }

    PlayCards(cards){
        
    }

    /**
     * 
     * @param {*} score 
     */
    planGameScore(score, _callback){
        this.gameScore += score;
        let report = ReportData.getInstance();
        //先查询缓存里面是否有数据
        let buffdata = report.findScoreBuffData(this.userID);
        if(buffdata){
            log.debug("缓存中查找到：", buffdata);
            this.gameScore = buffdata+score;
            this.updateGameScore(_callback);
        }else{
            //缓存中没有查询到就 查询http接口
            let keylist = [{key:this.userID}];
            //查询http接口 是否有保存这个用户的数据，有就取出，设置到缓存
            report.getGameScore(this.userID, keylist, (body)=>{

                let dataList = [];
                
                let repData = JSON.parse(body);
                log.debug("getGameScore body:" + body);
                if( repData.hasOwnProperty("status") && repData.hasOwnProperty("data")){
                    if(repData.status == 0){
                        log.debug(repData.data.dataList);
                        dataList = repData.data.dataList;
                    }
                }
                log.debug("http接口查找到dataList：", dataList);
                if(dataList.length > 0){
                    this.gameScore = Number(dataList[0].value) + Number(score);
                }
                this.updateGameScore(_callback);
            });
        }
    }

    /**
     * 更新当前玩家的分数
     */
    updateGameScore(_callback){
        let report = ReportData.getInstance();
        let event = null;
        //添加新分数到内存中
        report.addScoreBuff(this.userID, this.gameScore);
        //排序一下
        report.scoreBuffToSort();

        //获取排名位置
        this.ranking = report.getRankPosition(this.userID)+1;
        log.debug("rank:", this.ranking);

        let dataliet = [{key:this.userID,value:this.gameScore}];

        //保存当前用户的数据
        report.saveGameScore(dataliet, this.userID, (body)=>{
            log.debug(body);
            let repData = JSON.parse(body);
            if(repData.status === 0){
                event = {rank:this.ranking, totleScore:this.gameScore};
                _callback(event);
            }else{
                log.error("dataliet:",dataliet);
                log.error("save data error:",body);
            }
        },(err)=>{
            log.error("dataliet:",dataliet);
            log.error(err.message);
        });
    }

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

