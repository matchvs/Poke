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
module nest.runtime {
    export module core {
        export function callCustomMethod(customInfo:any, callback:Function) {
            var data = {module: "core", action: "callCustomMethod", param: customInfo};
            callRuntime(data, callback);
        }

        export function addCallback(callback:(callbackInfo:nest.core.CallbackInfo)=>void) {
            var tag = "nest_callback";
            egret.ExternalInterface.addCallback(tag, function (data) {
                var obj = JSON.parse(data);
                callback(obj);
            });
        };
    }

    export module user {
        export function isSupport(info:Object | userSupportCallbackType, callback?:userSupportCallbackType) {
            var data = {module: "user", action: "isSupport", param: info};
            //登出逻辑特殊处理
            //todo 等qq浏览器更新后删除
            if(nest.utils.$isQQBrowser()) {
                var cb = function (data) {
                    data.logout = 1;
                    callback.call(null, data);
                }
                callRuntime(data, cb);
            }
            else {
                callRuntime(data, callback);
            }
        }

        export function checkLogin(loginInfo:nest.user.LoginInfo, callback:Function) {
            var data = {module: "user", action: "checkLogin", param: loginInfo};
            callRuntime(data, callback);
        }

        export function login(loginInfo:nest.user.LoginInfo, callback:Function) {
            var data = {module: "user", action: "login", param: loginInfo};
            callRuntime(data, callback, true);
        }

        export function logout(loginInfo:nest.user.LoginInfo, callback:Function) {
            var nestVersion:any = egret.getOption("egret.runtime.nest");
            if (nestVersion >= 4 || nestVersion == "custom") {
                var data = {module: "user", action: "logout", param: loginInfo};
                callRuntime(data, callback);
            }
            else {
                callback({"result": 0});
            }
        }

        export function getInfo(loginInfo:nest.user.LoginInfo, callback:(resultInfo:Object)=>void) {
            var data = {module: "user", action: "getInfo", param: loginInfo};
            callRuntime(data, callback);
        }
    }

    export module iap {
        export function pay(orderInfo:nest.iap.PayInfo, callback:Function) {
            var data = {module: "iap", action: "pay", "param": orderInfo};
            callRuntime(data, callback);
        }
    }

    export module share {
        export function isSupport(info:Object | userSupportCallbackType, callback?:userSupportCallbackType) {
            var data = {module: "share", action: "isSupport", param: info};
            callRuntime(data, callback);
        }

        export function setDefaultData(shareInfo:nest.share.ShareInfo, callback:Function) {
            callback.call(null, {"result": -2});
        }

        export function share(shareInfo:nest.share.ShareInfo, callback:Function) {
            var data = {module: "share", action: "share", param: shareInfo};
            callRuntime(data, callback, true);
        }
    }

    export module social {
        export function isSupport(info:Object | userSupportCallbackType, callback?:userSupportCallbackType) {
            var data = {module: "social", action: "isSupport", param: info};
            callRuntime(data, callback);
        }

        export function getFriends(socialInfo, callback:Function) {
            var data = {module: "social", action: "getFriends", param: socialInfo};
            callRuntime(data, callback);
        }

        export function openBBS(socialInfo, callback:Function) {
            var data = {module: "social", action: "openBBS", param: socialInfo};
            callRuntime(data, callback);
        }
    }

    export module app {
        export function isSupport(info:Object | userSupportCallbackType, callback?:userSupportCallbackType) {
            var data = {module: "app", action: "isSupport", param: info};
            callRuntime(data, callback);
        }

        export function attention(appInfo:any, callback:Function) {
            var data = {module: "app", action: "attention", param: appInfo};
            callRuntime(data, callback);
        }

        export function exitGame(appInfo:any, callback:Function) {
            var data = {module: "app", action: "exitGame", param: appInfo};
            callRuntime(data, callback);
        }

        export function sendToDesktop(appInfo:any, callback:Function) {
            var data = {module: "app", action: "sendToDesktop", param: appInfo};
            callRuntime(data, callback);
        }

        export function getInfo(appInfo:any, callback:Function) {
            var url = nest.utils.$API_DOMAIN + "user/getCustomInfo";
            var data = {
                appId: utils.$APP_ID,
                runtime: 1,
                egretChanId: utils.$getSpid()
            };

            utils.setProxy(url, data, egret.URLRequestMethod.GET, function(data) {
                var callbackData = data.data;
                callbackData.result = 0;
                if(data.code == 0) {
                    callback.call(null, callbackData);
                }
                else {
                    callback.call(null, {result: -2});
                }
            }, function () {
                callback.call(null, {result: -2});
            });
        }
    }

    var externalArr:Array<any> = [];

    export interface NestData {

        module:string;

        action:string;

        param?:any;
    }

    export function callRuntime(data:NestData, callback, parallel:boolean = false) {
        var tag = "nest";
        if (parallel) {
            egret.ExternalInterface.addCallback(tag, function (data) {
                var obj = JSON.parse(data);
                callback(obj.data);
            });
            egret.ExternalInterface.call(tag, JSON.stringify(data));
        }
        else {
            externalArr.push({"data": data, "callback": callback});
            _getData();
        }
    }

    var isRunning:boolean = false;

    export function _getData():void {
        if (externalArr.length) {
            if (isRunning) {
                return;
            }
            isRunning = true;
            var info = externalArr.shift();

            var tag = "nest";
            egret.ExternalInterface.addCallback(tag, function (data) {
                var obj = JSON.parse(data);
                info["callback"](obj.data);

                isRunning = false;
                _getData();
            });
            egret.ExternalInterface.call(tag, JSON.stringify(info["data"]));
        }
    }
}