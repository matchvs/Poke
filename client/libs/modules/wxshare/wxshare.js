var Wxmodel = (function(){
    var wxShareConf = {
        getOpenIDAddr:"http://test79open.matchvs.com/getOpenID?" //传入code获取微信openID的服务端地址
    };

    function Wxmodel(){
    };
    
    /**
     * 
     * @param {*} title 
     * @param {*} query 
     */
    Wxmodel.prototype.together = function(title, query) {
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

    /**
     * 微信创建一个获取用户权限按钮
     * @param {*} args
     * @param {*} args.success 
     * @param {*} args.fail
     * @param {*} args.complete
     * @param {*} args.style.backgroundColor
     * @param {*} args.style.color
     * @param {*} args.style.imageUrl
     * @param {*} args.style.text
     * @param {*} args.style.left
     * @param {*} args.style.top
     * @param {*} args.style.width
     * @param {*} args.style.height
     * @param {*} args.style
     */
    Wxmodel.prototype.UserAuthorButton = function (args, style){

        let sysInfo = wx.getSystemInfoSync();
        let left = (sysInfo.screenWidth / 2) -100;
        let top = (sysInfo.screenHeight / 2) -20;
        
        wx.getSetting({
            success:(res)=>{
                if(res.authSetting['scope.userInfo']){
                    console.log("getSetting成功:",res);
                    args.success();
                    return;
                }
                //没授权就创建一个授权按钮
                let button = wx.createUserInfoButton({
                    type: 'text',
                    text: args.style.text || "用户授权",
                    style: {
                        left: args.style.left || left,
                        top: args.style.top || top,
                        width: args.style.width || 200,
                        height: args.style.height || 40,
                        backgroundColor: args.style.bgcolor || '#00C1E0',
                        color: args.style.color || '#ffffff',
                        borderRadius: 4,
                        textAlign: 'center',
                        fontSize:  16,
                        lineHeight: 40,
                    },
                    withCredentials: true
                });
                button.onTap((re)=>{
                    button.destroy();
                    let userData = {
                        encryptedData: re.encryptedData,
                        iv: re.iv
                    }
                    button.destroy();
                    console.log("授权 success:", res);
                    args.success(userData, re.userInfo);
                });
            },
            fail:(res)=>{
                console.log("getSetting失败:",res);
                args.fail(res);
            }
        });


        // var sysInfo = wx.getSystemInfoSync();
        // var left = (sysInfo.screenWidth / 2) - 100;
        // var top = (sysInfo.screenHeight / 2) + 80;
        // let button = wx.createUserInfoButton({
        //     type: 'text',
        //     text: "微信授权",
        //     image:style.imageUrl,
        //     style: {
        //         left: left,
        //         top: top,
        //         width: 100,
        //         height: 30,
        //         backgroundColor: '#00C1E0',
        //         color: style.color === undefined ? style.color : '#ffffff',
        //         borderRadius: 4,
        //         textAlign: 'center',
        //         fontSize: 16,
        //         lineHeight:30,
        //     },
        //     withCredentials: true
        // });
        // button.onTap((re) => {
        //     button.destroy();
        //     wx.getSetting({
        //         success: function(res) {
        //             if (!res.authSetting['scope.userInfo']) {
        //                 button.show();
        //             } else {
        //                 button.hide();
        //                 //授权成功
        //                 let userData = {
        //                     encryptedData: re.encryptedData,
        //                     iv: re.iv
        //                 }
        //                 button.destroy();
        //                 console.log("授权 success:", res);
        //                 callFun.success(userData, re.userInfo);
        //             }
        //         },
        //         //申请授权失败
        //         fail: function(res){
        //             console.log("授权 fail:", res);
        //             callFun.fail(res);
        //             button.destroy();
        //         },
        //         complete:function(res){
        //             console.log("授权 complete:", res);callFun.complete(res);
        //             button.destroy();
        //         },    
        //     });
        // });
    };

    
    /**
     * 获取用户 openID
     */
    Wxmodel.prototype.getWxUserInfo = function(obj) {
        var callObj = obj;
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: function (res) {
                console.log('success', res.userInfo);
                return callObj.success(res.userInfo);
            },
            fail: function (res) {
                console.log("fail", res);
                return callObj.fail(res);
            }
        });
    };

    /**
     * 
     */
    Wxmodel.prototype.getLaunchOptionsSync = function() {
        var LaunchOption = wx.getLaunchOptionsSync();
        console.log("LaunchOption:" + JSON.stringify(LaunchOption));
        console.log("LaunchOption quary:" + JSON.stringify(LaunchOption.query));
        return LaunchOption;
    }
    /**
     * 获取用户OpenID
     * @param {object} obj {success:function(res),fail:function(res)}
     */
    Wxmodel.prototype.getUserOpenID = function(obj) {
        var callObj = obj;
        if( typeof(wx) == "undefined"){
            return;
        }
        wx.login({
            success: function (res) {
                var wcode = res.code;
                wx.request({
                    url: wxShareConf.getOpenIDAddr,
                    method: "GET",
                    data: {
                        code: wcode
                    },
                    success: function (res) {
                        if (callObj.success) {
                            callObj.success(res.data);
                        }
                    },
                    fail:function(res){
                        console.info("getOpenID failed url:",wxShareConf.getOpenIDAddr);
                        if (callObj.fail) {
                            callObj.fail(res);
                        }
                    }
                });
            },
            fail: function (res) {
                console.log("get code failed:",res);
                if (callObj.fail) {
                    callObj.fail(res);
                }
            },
        });
    }
    return Wxmodel;
})();

window.Wxmodel = Wxmodel;