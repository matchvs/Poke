function getLaunchOptionsSync() {
    var LaunchOption = wx.getLaunchOptionsSync();
    console.log("LaunchOption:" + JSON.stringify(LaunchOption));
    console.log("LaunchOption quary:" + JSON.stringify(LaunchOption.query));
    return LaunchOption;
}

function together(title, query) {
    wx.shareAppMessage({
        title: title,
        query: query,
        complete: function () {
            console.log(arguments);
        },
        success: function (shareTickets, groupMsgInfos) {
            console.log(shareTickets);
            console.log(groupMsgInfos);
        }
    })

    wx.updateShareMenu({
        withShareTicket: true,//开启群发
        success: function () {
            console.log("updateShareMenu success");
        },
        fail: function (e) {
            console.log("updateShareMenu fail" + e);
        }
    });
}


function getWxUserInfo(data) {
    wx.getUserInfo({
        openIdList: ['selfOpenId'],
        lang: 'zh_CN',
        success: function (res) {
            console.log('success', res.userInfo);
            return data(res.userInfo);
        },
        fail: function (res) {
            reject(res);
            console.log("fail", res);
            return '';
        }});

}

window.getLaunchOptionsSync = getLaunchOptionsSync;
window.together = together;
window.getWxUserInfo = getWxUserInfo;