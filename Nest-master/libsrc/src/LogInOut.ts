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

module nest {
    export module easyuser {
        /**
         * 启动Nest
         * @param startupInfo 启动参数
         * @param callback 启动完成回调
         * @example 以下代码设置appId为 88888,启动Nest
         * <pre>
         *     nest.core.startup({egretAppId:88888}, function (){
         *         //do something
         *     });
         * </pre>
         */
        export function startup(startupInfo:nest.core.StartupInfo, callback:(data:core.ResultCallbackInfo)=>any):void {
            nest.core.startup(startupInfo, function (resultInfo:nest.core.ResultCallbackInfo) {
                callCheckLogin(callback);
            });
        }

        function callCheckLogin(callback:(data:core.ResultCallbackInfo)=>any):void {
            nest.user.checkLogin({}, function (resultInfo:nest.user.LoginCallbackInfo) {
                $loginInfo = resultInfo;
                $loginInfo.result = 0;

                callSupport(function () {
                    callback({"result":0});
                });
            });
        }

        function callSupport(callback:Function):void {
            nest.user.isSupport({}, function (data) {
                //获取是否支持nest.user.getInfo接口，有该字段并且该字段值为1表示支持
                $getInfo = data.getInfo;

                //已经登录过的信息，该字段目前只有新版qq浏览器runtime有
                //如果有该字段，请放弃使用loginType字段，并用该字段获取可用的登录方式以及登录信息
                var loginTypes = <Array<ILoginType>>data.loginTypes;
                if(loginTypes && loginTypes.length) {
                    $loginTypes = loginTypes;
                }
                else if (data.loginType && data.loginType.length) {
                    //获取登录方式数组，如["qq","wx"]
                    //开发者应该主动判断登录方式，如果返回了 null ，则表示没有特殊登录方式
                    var loginType = data.loginType;

                    var arr:Array<easyuser.ILoginType> = [];
                    for (var i:number = 0; i < loginType.length; i++) {
                        arr.push({"loginType" : loginType[i]});
                    }

                    $loginTypes = arr;
                }
                else {
                    $loginTypes = [];
                }

                callback();
            })
        }

        /**
         * 获取登录按钮类型。登出后再次登录前此方法需要重新调用。
         * 目前为止出现能为 qq（显示 qq 按钮）、wx（显示微信按钮）、default（显示一个游戏内的默认按钮），可能只有1个）
         */
        export function getLoginTypes():Array<ILoginType> {
            if ($loginInfo && $loginInfo.token) {//第一次直接进入到游戏
                return [];
            }
            if (isLogout()) {//登出过，则需要去掉按钮内的信息
                if ($loginTypes && $loginTypes.length) {
                    for (var i:number = 0; i < $loginTypes.length; i++) {
                        var info:ILoginType = $loginTypes[i];
                        info.accInfo = null;
                        $loginTypes[i] = info;
                    }
                }
            }
            return $loginTypes.concat();
        }

        var $loginInfo:nest.user.LoginCallbackInfo;

        var $getInfo:number;

        /**
         * 单个按钮的信息
         */
        export interface ILoginType {
            /**
             * 登录类型
             */
            loginType:string;

            /**
             * 不存在，则不需要显示具体的内容
             */
            accInfo ?: {
                nickName ?: string;
                avatarUrl ?: string;
            }
        }

        var isFirst:boolean = true;
        var $loginTypes:Array<ILoginType>;

        /**
         * 调用渠道登录接口，调用登录接口前，请先根据 nest.easyuser.getLoginTypes 来获取实际显示的按钮类型。
         * @param loginInfo
         * @param callback
         * @callback-param  @see nest.user.LoginCallbackInfo
         * @example 以下代码调用渠道登录接口
         * <pre>
         *     nest.user.login({}, function (data){
         *         if(data.result == 0) {
         *             //登陆成功,获取用户token
         *             var token = data.token;
         *         }
         *         else {
         *             //登录失败,需要重新登录
         *         }
         *     });
         * </pre>
         */
        export function login(loginInfo:nest.user.LoginInfo, callback:(resultInfo:nest.user.LoginCallbackInfo)=>void):void {
            if (isFirst) {
                isFirst = false;

                if ($loginInfo && $loginInfo.token) {//第一次直接进入到游戏
                    callback($loginInfo);
                }
                else {
                    callLogin(loginInfo.loginType, callback);
                }
            }
            else {
                callLogin(loginInfo.loginType, callback);
            }
        }

        function callLogin(type:string, callback:(resultInfo:nest.user.LoginCallbackInfo)=>void):void {
            //如果用户点击某个登录按钮，则传递loginType，否则不传
            var loginTypeInfo = {};
            if (type && type != "" && type != "default") {
                loginTypeInfo["loginType"] = type;
            }

            nest.user.login(loginTypeInfo, function (data) {
                if(data.token) {
                    //登录成功，获取用户token，并根据token获取用户id，之后进入游戏
                    clearLogout();
                    data.result = 0;
                    callback(data);
                }
                else {
                    //登录失败，需要重新登陆
                    if (data.result == null) {
                        data.result = -2;
                    }
                    callback(data);
                }
            })
        }

        function isLogout():boolean {
            return utils.localStorage.getItem("egret_logout") == "1";
        }

        function clearLogout():void {
            return utils.localStorage.setItem("egret_logout", null);
        }

        /**
         * 登出接口
         * @param loginInfo 登出参数,没有可以传递{}
         * @param callback 回调函数
         * @callback-param   { result : 0 };
         * @example 以下代码调用渠道登出接口
         * <pre>
         *     nest.easyuser.logout({}, function (data){
         *         if(data.result == 0) {
         *             //登出成功,需要显示登陆界面供玩家重新登录
         *             //这里后续不需要继续调用nest.user.checkLogin
         *         }
         *         else {
         *             //登出失败,可能相应渠道不支持登出
         *         }
         *     });
         * </pre>
         */
        export function logout(loginInfo: nest.user.LoginInfo, callback:(data:nest.core.ResultCallbackInfo)=>void):void {
            var egretH5SdkCallback = function (data:nest.core.ResultCallbackInfo):void {
                if (data.result == 0) {
                    $loginInfo = null;
                    //登出保存登出状态
                    utils.localStorage.setItem("egret_logout", "1");
                }

                callback(data);
            };
            nest.user.logout(loginInfo, egretH5SdkCallback);
        }

        export interface UserSupportCallbackInfo extends core.ResultCallbackInfo {
            /**
             * 是否支持获取用户信息，值为 1 时支持获取用户信息
             */
            getInfo: number;

            /**
             * 是否支持登出，值为 1 时支持登出
             */
            logout?:number;
        }

        /**
         * 检测支持何种登录方式
         * @param info 请传递一个{}
         * @param callback 回调函数
         * @callback-param  @see nest.user.UserSupportCallbackInfo
         * @example 以下代码进行检测支持何种登录方式
         * <pre>
         *     nest.user.isSupport({}, function (data){
         *         if(data.result == 0) {
         *             //获取渠道是否支持获得用户信息接口,如果支持可以使用nest.user.getInfo获取用户信息
         *             var isSupportGetUserInfo = data.getInfo == 1;
         *         }
         *     });
         * </pre>
         */
        export function isSupport(info:Object, callback:(resultInfo:easyuser.UserSupportCallbackInfo)=>void):void {
            var callbackInfo = {"result": 0, "getInfo": $getInfo};

            callback(callbackInfo);
        }

        /**
         * 获取用户信息，目前只有qq浏览器runtime支持
         * @param callback 回调函数
         * @example 以下代码获取用户信息
         * <pre>
         *     nest.user.getInfo({}, function (data){
         *         if(data.result == 0) {
         *             var msg = data.msg;              //传回的提示信息
         *             var nickName = data.nickName;     //昵称
         *             var avatarUrl = data.avatarUrl;  //头像
         *             var sex = data.sex;              //性别, 0未知，1男，2女
         *             var city = data.city;            //城市
         *             var language = data.language;    //语言
         *             var isVip = data.isVip;          //是否vip, 1是，0不是
         *             var province = data.province;    //省份
         *             var country = data.country;      //国家
         *         }
         *     });
         * </pre>
         */
        export function getInfo(loginInfo:nest.user.LoginInfo, callback:(resultInfo:Object)=>void):void {
            nest.user.getInfo(loginInfo, callback);
        }
    }
}