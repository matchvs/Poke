const ReportData = require("./ReportData");

class Test_01{
    constructor(){
    }
    static Start(){
        let report = ReportData.getInstance();
        //读取当前排名
        ReportData.getInstance().readRankListFromHttp();
        // //console.info(report.findScoreBuffData(23));
        // for(var index = 0; index < 100; index++ ){
        //     report.addScoreBuff(1000+index,index);
        // }
        //report.addScoreBuff(10000000,89);
        //report.getRankUserData();
        //ReportData.getInstance().scoreBuffToSort();
        //report.saveRankData();
        //console.info("ranking:"+ ReportData.getInstance().getRankPosition(85566));
        //report.deleteGameScore(85566, [{key:85566}]);
        
    }
}

module.exports = Test_01;