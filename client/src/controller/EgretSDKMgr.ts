// /**
//  * Created by Administrator on 2016/4/30.
//  */
// /**
//  * Created by yjtx on 15-10-19.
//  */

// class EgretSDKMgr extends egret.EventDispatcher{
//     private static _instance:EgretSDKMgr = null;
//     constructor() {
//         super();
//     }
//     public static get Instance():EgretSDKMgr {
//         if (EgretSDKMgr._instance == null) {
//             EgretSDKMgr._instance = new EgretSDKMgr();
//         }
//         return EgretSDKMgr._instance;
//     }
//     public Init():void
//     {
//         var info:any = {};//设置游戏id，这里是在测试步骤1中获取的游戏appId
//         info.egretAppId = 90052;//设置使用 Nest 版本。默认为1，新版请传递2
//         info.version = 2;//在debug模式下，请求nest接口会有日志输出。建议调试时开启
//         info.debug = true;
//         var tth=this;
//         nest.core.startup(info, function (data) {
//             if (data.result == 0) {
//                 tth.checkLogin();
//             }
//         });
//     }
//     private checkLogin():void
//     {
//         trace("正在检查是否已登录...");
// //        var loginInfo: nest.user.LoginInfo = {};

//         if(data.GameData.playerGuid!=0)
//         {
//             location.reload();
//         }
//         var loginInfo:any = {}
//         nest.user.checkLogin(loginInfo, this.onCheckLoginCallback.bind(this));
//     }
//     private onCheckLoginCallback(data:nest.user.LoginCallbackInfo):void {

//         if (!data.token) {
//             trace("\n正在登录...");
//             var loginInfo:nest.user.LoginInfo = {};
//             nest.user.login(loginInfo, this.onLoginCallback.bind(this));
//         }
//         else {
//             this.onLoginCallback(data);
//         }
//     }
//     private onLoginCallback(data:nest.user.LoginCallbackInfo):void {

//         if (data.result == 0) {
//             this.getUserInfo(data, this.onGetUserInfoCallback);
//         }
//         else {
//             //登录失败
//            trace("登陆失败...");
//         }

//     }

//     private getUserInfo(data:nest.user.LoginCallbackInfo, onGetUserInfoCallback:Function) {

//         onGetUserInfoCallback.call(this,data);
//     }
//     private onGetUserInfoCallback(data: any) {
//         this.dispatchEvent(new egret.Event(enums.NativeEvent.NATIVEEVENT_GETINITINFO,false,false,data));
// //        console.log(data);
// //        if(data.msg=="success")
// //        {
// //            trace("登陆成功...");
// //            var backobj= {
// //                userid : data.data.id,
// //                nickName : data.data.name,
// //                avatarUrl : data.data.pic,
// //                sex : data.data.sex,
// //                serverInfo : data.data.serverInfo,//sgId startServerId
// //            }
// //            this.dispatchEvent(new egret.Event(enums.NativeEvent.NATIVEEVENT_GETINITINFO,false,false,backobj));
// //        }
//     }

// }