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
    export type userSupportCallbackType = (resultInfo:nest.user.UserSupportCallbackInfo)=>void;
    export type shareSupportCallbackType = (resultInfo:nest.share.ShareSupportCallbackInfo)=>void;
    export type socialSupportCallbackType = (resultInfo:nest.social.SocialSupportCallbackInfo)=>void;
    export type appSupportCallbackType = (resultInfo:nest.app.AppSupportCallbackInfo)=>void;

    export module core {
        export interface ResultCallbackInfo {
            /**
             * 回调参数是否正确，0 正确，-1 用户取消操作, -2 失败，-3 平台登陆账号被踢掉，需要重新登陆, 其他 未知错误
             */
            result:number;
        }

        export interface StartupInfo {
            /**
             * egret 平台分配的 AppId
             */
            egretAppId: number;
            /**
             * 使用的 Nest 版本,默认为1
             * 使用新版 Nest 接口请传2
             */
            version?:number;
            /**
             * 是否是debug模式,debug模式在调用各个接口均有日志输出
             */
            debug?:boolean;
        }

        export interface CallbackInfo {
            /**
             * 登陆状态改变，1为已登录，2为未登录
             */
            loginState?:number;
            // /**
            //  * 用户信息改变
            //  */
            // userInfoChange?:number;
        }
    }

    /**
     * 登录功能逻辑：
     * 1.初始化项目数据
     * 2.在游戏中展示一张登录背景界面
     * 3.调用 checkLogin 函数判断是否已经登录过，如果登录过，进入步骤7，否则进入步骤4
     * 4.调用 isSupport 函数判断支持的登录类型，根据登录类型显示对应的登录图标
     * 5.用户点击登录图标后，调用 login 函数打开登录面板进行登录
     * 6.如果登录成功，进入步骤7
     * 7.退出登录界面，进入游戏
     *
     * 登出功能逻辑：
     * 1.在游戏中放置一个“退出游戏”或者“切换账号”的按钮
     * 2.用户点击“退出游戏”图标后，调用 logout 函数
     * 3.在登出成功后，返回到登录逻辑的步骤4
     * @private
     */
    export module user {
        /**
         * 登录接口传递参数
         *
         */
        export interface LoginInfo {
            /**
             * 登录类型：如 <code>qq</code>表示QQ登录，<code>wx</code>表示微信支付。
             * 如果没有，则不需要赋值
             */
            loginType?:string;
        }
        export interface LoginCallbackInfo extends core.ResultCallbackInfo {
            /**
             * checkLogin , login 函数返回。
             * 用户 token 信息，如果checkLogin函数中没有token则表示用户尚未登录
             */
            token:string;
        }
        export interface UserSupportCallbackInfo extends core.ResultCallbackInfo{
            /**
             * isSupport 函数返回。
             * 登录方式。
             * 以QQ浏览器为例，返回 ["qq","wx"]
             * 开发者应该主动判断登录方式，如果返回了 null ，则表示没有特殊登录方式
             * 需要优先判断loginTypes,如果有loginTypes用loginTypes里面的值
             */
            loginType:Array<string>;

            /**
             * isSupport 函数返回。
             * 登录方式。
             * 以QQ浏览器为例，返回 [{loginType:"qq",accInfo:{nickName:"",avatarUrl:""}},{loginType:"wx",accInfo:{nickName:"",avatarUrl:""}}]
             * 开发者应该主动判断登录方式，如果返回了 null ，则表示没有特殊登录方式
             */
            loginTypes:Array<Object>;

            /**
             * 是否支持获取用户信息
             */
            getInfo?:number;

            /**
             * 是否支持登出
             */
            logout?:number;
        }
    }

    /**
     * 
     * @private
     */
    export module user {
        /**
         * 检测是否已登录
         * @param loginInfo 请传递一个{}
         * @param callback
         * @callback-param  @see nest.user.LoginCallbackInfo
         * @example 以下代码检测是否已经登录
         * <pre>
         *     nest.user.checkLogin({}, function (data){
         *         if(data.result == 0) {
         *             //已经登录,获取登陆token信息
         *             var token = data.token;
         *         }
         *         else {
         *             //没有登录,之后需要用nest.user.isSupport接口获取loginType并根据loginType显示登录界面
         *         }
         *     });
         * </pre>
         */
        export var checkLogin:(loginInfo:nest.user.LoginInfo, callback:(resultInfo:nest.user.LoginCallbackInfo)=>void)=>void;
        /**
         * 调用渠道登录接口
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
        export var login:(loginInfo:nest.user.LoginInfo, callback:(resultInfo:nest.user.LoginCallbackInfo)=>void)=>void;
        /**
         * 登出接口
         * @param loginInfo 登出参数,没有可以传递{}
         * @param callback 回调函数
         * @callback-param   { result : 0 };
         * @example 以下代码调用渠道登出接口
         * <pre>
         *     nest.user.logout({}, function (data){
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
        export var logout:(loginInfo:nest.user.LoginInfo, callback:(resultInfo:core.ResultCallbackInfo)=>void)=>void;
        /**
         * 检测支持何种登录方式
         * @param info 请传递一个{}
         * @param callback 回调函数
         * @callback-param  @see nest.user.UserSupportCallbackInfo
         * @example 以下代码进行检测支持何种登录方式
         * <pre>
         *     nest.user.isSupport({}, function (data){
         *         if(data.result == 0) {
         *             //获取渠道支持的登陆方式,并根据登录方式显示登陆界面
         *             var loginType = data.loginType;
         *             //获取渠道是否支持获得用户信息接口,如果支持可以使用nest.user.getInfo获取用户信息
         *             var isSupportGetUserInfo = data.getInfo == 1;
         *         }
         *     });
         * </pre>
         */
        export var isSupport:(info:Object | userSupportCallbackType, callback?:userSupportCallbackType)=>void;
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
        export var getInfo:(loginInfo:nest.user.LoginInfo, callback:(resultInfo:Object)=>void)=>void;
    };

    export module iap {
        export interface PayInfo {
            //配置id
            goodsId:string;
            //购买数量
            goodsNumber:string;
            //哪个服
            serverId:string;
            //透传参数
            ext:string;
        }

        export interface PayCallbackInfo extends core.ResultCallbackInfo {
            ext?:string;
        }
    }

    export module share {
        /**
         * 分享接口传递参数
         */
        export interface ShareInfo {
            /**
             * 分享标题
             */
            title:string;
            /**
             * 分享文字内容
             */
            description:string;
            /**
             * 分享图片标题
             */
            img_title:string;
            /**
             * 分享图标地址
             */
            img_url:string;
            /**
             * 分享地址
             */
            url:string;
        }

        export interface ShareCallbackInfo extends core.ResultCallbackInfo{
        }

        export interface ShareSupportCallbackInfo extends core.ResultCallbackInfo{
            share:number;
        }
    }

    export module social {
        /**
         * social接口传递参数
         */
        export interface SocialSupportCallbackInfo extends core.ResultCallbackInfo {
            getFriends?:number;
            openBBS?:number;
        }
    }

    export module app {
        export interface AppSupportCallbackInfo extends core.ResultCallbackInfo{
            attention?:number;
            sendToDesktop?:number;
            exitGame?:number;
            getInfo?:number;
        }

        export interface GetInfoCallbackInfo extends core.ResultCallbackInfo {
            contact:ContactInfo;//可用联系方式
        }

        export interface ContactInfo {
            qq?:string[];//qq联系方式数组[],如果没有响应联系方式将没有该字段
            qqgroup?:string[];//qq群联系方式数组[],如果没有响应联系方式将没有该字段
            weixin?:string[];//微信联系方式数组[],如果没有响应联系方式将没有该字段
            email?:string[];//email联系方式数组[],如果没有响应联系方式将没有该字段
        }

        /**
         * 发送到桌面
         */
        export interface SendToDesktopInfo {
            /**
             * 透传参数
             */
            ext:string;
        }
    }

}

declare module nest {

    module core {
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
         * @private
         */
        function startup(startupInfo:nest.core.StartupInfo, callback:(resultInfo:nest.core.ResultCallbackInfo)=>void):void;

        function callCustomMethod(customInfo:any, callback:Function):void;

        /**
         * 添加回调函数
         * 渠道有可能有自己的逻辑进行一些操作，这时候会把操作带来的变化回调回来
         * @param callback 回调
         */
        function addCallback(callback:(callbackInfo:nest.core.CallbackInfo)=>void):void;
    }
    
    module iap {
        /**
         * 支付
         * @param payInfo 支付信息
         * @param callback 支付回调
         * @example 以下代码进行支付
         * <pre>
         *     nest.iap.pay({goodsId:"1",goodsNumber:"1",serverId:"1",ext:"msg"}, function (data){
         *         if(data.result == 0) {
         *             //支付成功
         *         }
         *         else {
         *             //支付失败
         *         }
         *     });
         * </pre>
         */
       function pay(payInfo:nest.iap.PayInfo, callback:(result:nest.iap.PayCallbackInfo)=>void):void;
    }

    module share {
        /**
         * 是否支持分享
         * @param info 请传递一个{}
         * @param callback 回调函数
         * @example 以下代码获取是否支持分享
         * <pre>
         *     nest.share.isSupport({}, function (data){
         *         if(data.result == 0) {
         *             //获取是否支持分享
         *             var share = data.share == 1;
         *         }
         *     });
         * </pre>
         */
        function isSupport(info:Object | shareSupportCallbackType, callback?:shareSupportCallbackType):void;

        /**
         * 设置默认分享内容,以便某些渠道在游戏外点击分享按钮时显示分享内容
         * @param shareInfo
         * @param callback
         * @callback-param result 0 表示成功，-2表示失败
         */
        function setDefaultData(shareInfo:nest.share.ShareInfo, callback:Function):void;

        /**
         * 分享
         * @param shareInfo 分享参数
         * @param callback 回调函数
         * @callback-param result 0 表示分享成功，-1表示用户取消
         * @example 以下代码获取是否支持分享
         * <pre>
         *     var shareInfo = {title:"title", description:"description", img_title:"img_title", img_url:"http://www.example.com/example.jpg", url:"http://www.example.com"};;
         *     nest.share.share(shareInfo, function (data) {
         *         if(data.result == 0) {
         *             //分享成功
         *         }
         *         else {
         *             //分享失败
         *         }
         *     });
         * </pre>
         */
        function share(shareInfo:share.ShareInfo, callback:(resultInfo:share.ShareCallbackInfo)=>void):void;
    }

    module social {
        /**
         * social接口支持
         * @param info 请传递一个{}
         * @param callback 回调函数
         * @example 以下代码获取是否支持
         * <pre>
         *     nest.social.isSupport({}, function (data){
         *         if(data.result == 0) {
         *             //获取是否支持获得好友列表
         *             var getFriends = data.getFriends == 1;
         *             //获取是否支持打开BBS
         *             var openBBS = data.openBBS == 1;
         *         }
         *     });
         * </pre>
         */
        function isSupport(info:Object | socialSupportCallbackType, callback?:socialSupportCallbackType):void;
        function getFriends(socialInfo:any, callback:(resultInfo:core.ResultCallbackInfo)=>void):void;
        /**
         * 打开BBS
         * @param socialInfo 请传递一个{}
         * @param callback 回调
         * @example 以下代码进行打开BBS
         * <pre>
         *     nest.social.openBBS({}, function (data){
         *         if(data.result == 0) {
         *             //打开成功
         *         }
         *         else {
         *             //打开失败
         *         }
         *     });
         * </pre>
         */
        function openBBS(socialInfo:any, callback:(resultInfo:core.ResultCallbackInfo)=>void):void;
    }

    module app {
        /**
         * 是否支持特定功能
         * @param info 请传递一个{}
         * @param callback 回调函数
         * @callback-param  { result:"0" , attention :"1" , sendToDesktop : "1" , exitGame : "1" , getInfo : "1"}
         * attention|sendToDesktop|exitGame|getInfo 1支持 0不支持
         */
        function isSupport(info:Object | appSupportCallbackType, callback?:appSupportCallbackType):void;
        /**
         * 关注
         * @param appInfo
         * @param callback
         */
        function attention(appInfo:any, callback:(resultInfo:core.ResultCallbackInfo)=>void):void;
        /**
         * 退出游戏，回到 App 界面
         * @param appInfo
         * @param callback
         */
        function exitGame(appInfo:any, callback:(resultInfo:core.ResultCallbackInfo)=>void):void;
        /**
         * 发送到桌面
         * @param appInfo
         * @param callback
         * @param callback-param result 0表示添加桌面成功，-1表示添加失败
         */
        function sendToDesktop(appInfo:app.SendToDesktopInfo, callback:(resultInfo:core.ResultCallbackInfo)=>void):void;
        /**
         * 获取渠道信息
         * @param appInfo 获取信息参数,没有请传递{}
         * @param callback 回调函数
         * 回调参数:
         * {
	     * "result": , //result为0说明成功
	     * "contact": , //可用联系方式
	     *   "qq": //qq联系方式数组[],如果没有响应联系方式将没有该字段
	     *   "qqgroup": //qq群联系方式数组[],如果没有响应联系方式将没有该字段
	     *   "weixin": //微信联系方式数组[],如果没有响应联系方式将没有该字段
	     *   "email": //email联系方式数组[],如果没有响应联系方式将没有该字段
	     * }
         */
        function getInfo(appInfo:any, callback:(resultInfo:app.GetInfoCallbackInfo)=>void):void;
    }
}