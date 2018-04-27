//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////


/**
 * @private
 */
module nest.qqhall2 {
    var login_call_type = 100;
    var pay_call_type = 101;
    var share_call_type = 104;
    var friend_call_type = 105;
    var refresh_token_call_type = 106;
    var check_call_type = 107;
    var user_info_call_type = 108;
    var login_type_call_type = 109;

    var login_callback_type = 200;
    var pay_callback_type = 201;
    var share_callback_type = 204;
    var refresh_token_callback_type = 206;
    var check_callback_type = 207;
    var user_info_callback_type = 208;
    var login_type_callback_type = 209;

    var loginCallback:Function = null;
    var payCallback:Function = null;
    var shareCallback:Function = null;
    var refreshTokenCallback:Function = null;
    var checkCallback:Function = null;
    var userInfoCallback:Function = null;
    var loginTypeCallback:Function = null;

    var version:string = "1.0.0";

    var appid;
    var appsig;
    var appsigData;

    //默认没有余额
    var balance = 0;
    var gen_balance;
    var first_save;
    var save_amt;

    var baseinfo;

    var gameType;
    var gameVersion;
    var openId;
    var accessToken;
    var enterType;
    var enterId;
    var payToken;
    var qbopenid;
    var qbopenkey;
    var nickName;
    var avatarUrl;

    var userId;
    var pf;
    var loginType = [];

    var payOrderInfo;
    var payType;
    var payValue;
    var payItem;
    var payInfo;
    var customMeta;

    function setProxy(url:string, postData:Object, method:string, callback:Function):void {
        var postdata = "";
        for (var key in postData) {
            postdata += key + "=" + encodeURIComponent(postData[key]) + "&";
        }
        if (postdata != "") {
            postdata = postdata.substr(0, postdata.length - 1);
        }

        var msg = "[Nest]qq hall2 send : " + url + "?" + postdata;
        for (var i = 0; i < Math.ceil(msg.length / 450); i++) {
            nest.utils.$log(msg.slice(i * 450, (i + 1) * 450));
        }

        var loader:egret.URLLoader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function () {
            nest.utils.$log("[Nest]qq hall2 get data : " + loader.data);
            var jsonObj = JSON.parse(loader.data);
            callback(jsonObj);
        }, this);
        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = method;
        request.data = new egret.URLVariables(postdata);
        loader.load(request);
    }

    function payBefore(orderInfo:nest.iap.PayInfo, callback):void {
        var url:string = nest.utils.$API_DOMAIN + "user/placeOrder";

        var postdata = {
            "id": userId,
            "appId": utils.$APP_ID,
            "time": Date.now(),
            "qbopenkey": qbopenkey,
            "runtime": 1
        };
        for (var k in orderInfo) {
            postdata[k] = orderInfo[k];
        }

        setProxy(url, postdata, egret.URLRequestMethod.GET, function (resultData) {
            callback(resultData);
        });
    }

    function payAfter(payInfo, callback):void {
        var url:string = nest.utils.$API_DOMAIN + "pay/" + utils.$getSpid() + "/" + utils.$APP_ID;

        setProxy(url, payInfo, egret.URLRequestMethod.GET, function (resultData) {
            callback(resultData);
        });
    }

    function callHall(data:any) {
        var msg:string = JSON.stringify(data);
        nest.utils.$log("call hall : " + msg);
        egret.ExternalInterface.call("HALL_EGRET_MSG_FROM", msg);
    }

    //查询钻石
    function check(callback) {
        checkCallback = callback;
        callHall({
            msgType: check_call_type,
            appid: appid,
            appsig: appsig,
            appsigData: appsigData,
            qbopenid: qbopenid,
            msgVersion: version
        });
    }

    //查询用户信息
    function userInfo(callback) {
        userInfoCallback = callback;
        callHall({
            msgType: user_info_call_type,
            appid: appid,
            appsig: appsig,
            msgVersion: version
        });
    }

    //刷新票据
    function refreshToken(callback) {
        refreshTokenCallback = callback;
        callHall({
            msgType: refresh_token_call_type,
            appid: appid,
            qbopenid: qbopenid,
            refreshToken: "",
            msgVersion: version
        });
    }

    //刷新票据
    function getLoginType(callback) {
        loginTypeCallback = callback;
        callHall({
            msgType: login_type_call_type,
            appid: appid,
            appsig: appsig,
            appsigData: appsigData,
            qbopenid: "",
            qbopenkey: "",
            msgVersion: version
        });
    }

    export function init():void {
        egret.ExternalInterface.addCallback("HALL_EGRET_MSG_TO", function (data:string) {
            nest.utils.$log("get hall data : " + data);
            for (var i = 0; i < Math.ceil(data.length / 450); i++) {
                nest.utils.$log(data.slice(i * 450, (i + 1) * 450));
            }
            var info:any = JSON.parse(data);
            var result:number;
            switch (info.msgType) {
                case login_callback_type:
                    if (loginCallback) {
                        result = info["result"];
                        if (result == 0) {
                            gameType = info["msgType"];
                            gameVersion = info["msgVersion"];
                            openId = info["openId"];
                            accessToken = info["accessToken"];
                            enterType = info["enterType"];
                            enterId = info["enterId"];
                            payToken = info["payToken"];
                            qbopenid = info["qbopenid"];
                            qbopenkey = info["qbopenkey"];
                            nickName = info["nickName"];
                            avatarUrl = info["avatarUrl"];
                            var send = function () {
                                if (loginCallback) {
                                    var api = nest.utils.$API_DOMAIN + "game/" + utils.$getSpid() + "/" + utils.$APP_ID;
                                    var sendData:any = {};
                                    sendData.openId = openId;
                                    sendData.accessToken = accessToken;
                                    sendData.payToken = payToken;
                                    sendData.qbopenid = qbopenid;
                                    sendData.qbopenkey = qbopenkey;
                                    sendData.nickName = nickName;
                                    sendData.avatarUrl = avatarUrl;
                                    sendData.balance = balance;
                                    sendData.gen_balance = gen_balance;
                                    sendData.first_save = first_save;
                                    sendData.save_amt = save_amt;
                                    sendData.pf = pf;
                                    sendData.baseinfo = JSON.stringify(baseinfo);
                                    sendData.runtime = 1;
                                    setProxy(api, sendData, egret.URLRequestMethod.GET, function (resultData) {
                                        var data = resultData.data;
                                        userId = data.id;
                                        loginCallback.call(null, data);
                                        loginCallback = null;

                                        //获取好友
                                        //callHall({
                                        //    msgType: friend_call_type,
                                        //    appid: appid,
                                        //    appsig: appsig,
                                        //    qbopenid: qbopenid,
                                        //    qbopenkey: qbopenkey,
                                        //    msgVersion: version
                                        //})
                                    });
                                }
                            };
                            var checkComplete = false;
                            var userInfoComplete = false;
                            check(function () {
                                checkComplete = true;
                                if (checkComplete && userInfoComplete) {
                                    send();
                                }
                            });
                            userInfo(function () {
                                userInfoComplete = true;
                                if (checkComplete && userInfoComplete) {
                                    send();
                                }
                            });
                        }
                        else {
                            //登录失败
                            loginCallback.call(null, {result: -2});
                            loginCallback = null;
                        }
                    }
                    break;
                case pay_callback_type:
                    if (payCallback) {
                        if (payType == 0) {
                            //支付取消
                            if(info.resultCode == 2) {
                                payOrderInfo = null;
                                payCallback.call(null, {result: -1, status: -1});
                                payCallback = null;
                            }
                            else if(info.resultCode == 0) {
                                check(function () {
                                    iap.repay();
                                })
                            }
                            //支付失败
                            else {
                                payOrderInfo = null;
                                payCallback.call(null, {result: -2, status: -2});
                                payCallback = null;
                            }
                        }
                        else {
                            //后台验证支付
                            var payAfterData:any = {};
                            payAfterData.realSaveNum = info.realSaveNum;
                            payAfterData.orderno = info.orderno;
                            payAfterData.customMeta = customMeta;
                            payAfter(payAfterData, function (data) {
                                if (data.code == 0) {
                                    payOrderInfo = null;
                                    payCallback.call(null, {result: 0, status: 0});
                                    payCallback = null;
                                    //刷新下余额
                                    check(null);
                                }
                                else {
                                    payOrderInfo = null;
                                    payCallback.call(null, {result: -2, status: -2});
                                    payCallback = null;
                                }
                            });
                            break;
                        }
                    }
                    break;
                case share_callback_type:
                    if (shareCallback) {
                        result = <number>info.errorid;
                        shareCallback.call(null, {result: result, status: result});
                        shareCallback = null;
                    }
                    break;
                case refresh_token_callback_type:
                    if (info.result == 0) {
                        qbopenkey = info.qbopenkey;
                    }
                    if (refreshTokenCallback) {
                        refreshTokenCallback.call(null);
                        refreshTokenCallback = null;
                    }
                    break;
                case check_callback_type:
                    //这里有可能报错token过期导致无法获取,用默认balance=0解决.这样充值时呼起米大师
                    if (info.result == 0) {
                        balance = info.balance;
                        gen_balance = info.gen_balance;
                        first_save = info.first_save;
                        save_amt = info.save_amt;
                    }
                    else {

                    }
                    if (checkCallback) {
                        checkCallback.call(null);
                        checkCallback = null;
                    }
                    break;
                case user_info_callback_type:
                    if (info.result == 0) {
                        baseinfo = info.baseinfo;
                    }
                    if (userInfoCallback) {
                        userInfoCallback.call(null);
                        userInfoCallback = null;
                    }
                    break;
                case login_type_callback_type:
                    if (info.loginType == 1) {
                        loginType.push("qq");
                    }
                    else if (info.loginType == 2) {
                        loginType.push("wx");
                    }
                    else if (info.loginType == 3) {
                        loginType.push("qq");
                        loginType.push("wx");
                    }
                    if (loginTypeCallback) {
                        loginTypeCallback.call(null);
                        loginTypeCallback = null;
                    }
                    break;
            }
        });
    }

    export module user {
        export function isSupport(info:Object | userSupportCallbackType, callback?:userSupportCallbackType) {
            getLoginType(function () {
                var result = 0;
                var loginCallbackInfo = {
                    "status": result,
                    "result": result,
                    "loginType": loginType,
                    "checkLogin": 0,
                    "login": 1,
                    "logout": 0,
                    "getInfo": 0
                };
                callback.call(null, loginCallbackInfo);
            })
        }

        export function checkLogin(loginInfo:nest.user.LoginInfo, callback:Function) {
            //获取appid
            var url:string = nest.utils.$API_DOMAIN + "app/getSignInfo";
            var postdata = {
                "egretChanId": utils.$getSpid(),
                "appId": utils.$APP_ID
            };
            setProxy(url, postdata, egret.URLRequestMethod.GET, function (resultData) {
                appid = resultData.data.appid;
                appsig = resultData.data.appsig;
                appsigData = resultData.data.appsigdata;

                var result = -2;
                var loginCallbackInfo = {
                    "status": result,
                    "result": result,
                    "loginType": undefined,
                    "token": undefined
                };
                callback.call(null, loginCallbackInfo);
            });
        }

        export function login(loginInfo:nest.user.LoginInfo, callback:Function) {
            loginCallback = callback;
            pf = loginInfo.loginType;
            callHall({
                msgType: login_call_type,
                appid: appid,
                appsig: appsig,
                appsigData: appsigData,
                loginType: pf,
                msgVersion: version
            });
        }
    }

    export module iap {
        export function pay(orderInfo:nest.iap.PayInfo, callback:Function) {
            if (payOrderInfo) {
                return;
            }
            payOrderInfo = orderInfo;
            //刷新票据,之后去开平获取金额,之后决定充值还是购买商品
            refreshToken(function () {
                payBefore(orderInfo, function (data:any) {
                    data = data.data;
                    payValue = data.payValue;
                    payInfo = data.payInfo;
                    payItem = data.payItem;
                    customMeta = data.customMeta;
                    payCallback = callback;
                    //余额不足
                    if (payValue > balance) {
                        payType = 0;
                    }
                    else {
                        payType = 1;
                    }
                    payCallHall();
                });
            });
        }

        /**
         * 大厅充值成功后，再次调用付费接口
         */
        export function repay():void {
            if (payValue > balance) {
                //充值的钱还是不够
                if (payCallback) {
                    payOrderInfo = null;
                    payCallback.call(null, {result: -2, status: -2});
                    payCallback = null;
                }
            }
            else {
                payType = 1;
                payCallHall();
            }
        }

        function payCallHall() {
            callHall({
                msgType: pay_call_type,
                msgVersion: version,
                payType: payType,
                appid: appid,
                appsig: appsig,
                appsigData: appsigData,
                payItem: payItem,
                payInfo: payInfo,
                reqTime: Date.now(),
                customMeta: customMeta,
                payValue: payValue,
                qbopenid: qbopenid,
                qbopenkey: qbopenkey,
                isCanChange: false//不可更改金额
            });
        }
    }

    export module app {
        export function isSupport(info:Object | appSupportCallbackType, callback?:appSupportCallbackType) {
            var result = 0;
            var loginCallbackInfo = {
                "status": result,
                "result": result,
                "attention": 0,
                "sendToDesktop": 0,
                "exitGame": 0
            };
            callback.call(null, loginCallbackInfo);
        }

        export function exitGame(appInfo:any, callback:(resultInfo:core.ResultCallbackInfo)=>void) {

        }

        export function attention(appInfo:any, callback:Function) {

        }

        export function sendToDesktop(appInfo:any, callback:Function) {

        }
    }

    export module share {
        export function isSupport(info:Object | shareSupportCallbackType, callback?:shareSupportCallbackType) {
            var result = 0;
            var loginCallbackInfo = {
                "status": result,
                "result": result,
                "share": 1
            };
            callback.call(null, loginCallbackInfo);
        }


        /**
         * 分享
         * @param shareInfo
         * @param callback
         * @callback-param result 0 表示分享成功，-1表示用户取消
         */
        export function share(shareInfo:nest.share.ShareInfo, callback:Function) {
            shareCallback = callback;
            refreshToken(function () {
                callHall({
                    msgType: share_call_type,
                    msgVersion: version,
                    appid: appid,
                    appsig: appsig,
                    appsigData: appsigData,
                    qbopenid: qbopenid,
                    qbopenkey: qbopenkey,
                    title: shareInfo.title,
                    summary: shareInfo.description,
                    imageLocalUrl: shareInfo.img_url,
                    img_title: shareInfo.img_title,
                    cus_txt: "",
                    targetUrl: shareInfo.url
                });
            })
        }
    }

    export module social {
        export function isSupport(info:Object | socialSupportCallbackType, callback?:socialSupportCallbackType) {
            var status = 0;
            var loginCallbackInfo = {
                "status": status,
                "result": status,
                "getFriends": 0,
                "openBBS": 0
            };
            callback.call(null, loginCallbackInfo);
        }

        export function getFriends(socialInfo, callback:Function) {

        }

        export function openBBS(socialInfo, callback:Function) {

        }
    }
}