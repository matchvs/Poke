const ReportDataNew = require('./ReportDataNew');
const ArrayTools = require('./ArrayTools');

class Test_01{
    constructor(){
    }
    static Start(){

        let report = new ReportDataNew();
        // report.DeleteRankConfig();
        // report.CreatorRankConfig();
        for(let i = 0 ; i < 1; i++){
            let userID = ArrayTools.GetRandomNum(10, 99999);
            let value = ArrayTools.GetRandomNum(10000, 99999);
            console.log(JSON.stringify({ userID: userID, value: value }));
            report.UpdateScores({ userID: userID, value: value },(res, err)=>{
                if (err) {
                    console.log(i + " 排行榜分数上传失败：", JSON.stringify(err));
                } else {
                    let grades = {
                        userID: userID
                    }
                    report.GetUserRank(grades, (res, err) => {
                        if(err){
                            console.log(i + " 获取排位结果失败：", JSON.stringify(res));
                        }else{
                            console.log(i + " 获取排位结果成功：", JSON.stringify(res));
                            report.RecordUserListInfo(userID, [
                                { userID: userID, name: 'test', avatar: "http://www.villeboss.com/headimg/2.jpg" },
                                // { userID: 12346, name: 'test', avatar: "http://www.villeboss.com/headimg/4.jpg" },
                                // { userID: 12347, name: 'test', avatar: "http://www.villeboss.com/headimg/3.jpg" }
                            ], (res, err) => {
                                if (err) {
                                    console.log("保存用户数据失败：", JSON.stringify(err));
                                } else {
                                    console.log("保存用户数据成功：", JSON.stringify(res));
                                    report.GetUserListInfo(userID, [userID, 
                                    // "12346", 
                                    // "12347"
                                ], (res, err) => {
                                        if (err) {
                                            console.log("获取用户数据失败：", JSON.stringify(err));
                                        } else {
                                            console.log("获取用户数据成功：");
                                            if (res.status == 0) {
                                                console.log("数据为：", JSON.stringify(res.data));
                                                let dateList = res.data.dataList;
                                                dateList.forEach(d => {
                                                    console.log("key: ", d.key, "value: ", report.base64Decode(d.value));
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                }

                
            });
        }
        report.GetRankList({ userID: 12345}, (res, err)=>{
            if(err){
                console.log("获取排行榜错误：", JSON.stringify(err));
            }else{
                console.log("获取排行成功:", JSON.stringify(res));
            }
        }); 
    }
}

Test_01.Start();

module.exports = Test_01;