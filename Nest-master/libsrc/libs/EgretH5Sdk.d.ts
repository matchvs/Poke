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
declare class EgretH5Sdk
{
    static checkLogin(fun:any, thisObj:any);
    static login(fun:any, thisObj:any, loginType?:string);
    static logout(fun:any, thisObj:any);
    static pay(para:any, fun:any, thisObj?:any);
    static attention(appId:any, id:any);
    static isOpenAttention(appId:any, id:any, callbackFun:Function, callbackFunClass:any);
    static getCustomInfo(appId:any, id:any, callbackFun?:Function, callbackFunClass?:any);

    static isOpenShare(appId:any, id:any, callbackFun:Function, callbackFunClass:any);
    static share(appId:any, id:any, shareTxt?:any, callbackFun?:Function, callbackFunClass?:any);

    //以下为v2版本新增接口
    static init(data:any, callbackFun:Function);
    static isSupportShare(data:any, callbackFun:Function);
    static isSupportAttention(data:any, callbackFun:Function);
    static setShareDefaultData(data:any, callbackFun:Function);
    static getLoginType(data:any, callbackFun:Function);

    static isSupportOpenBBS(data:any, callbackFun:Function);
    static openBBS(data:any, callbackFun:Function);
    static isSupportSendToDesktop(data:any, callbackFun:Function);
    static sendToDesktop(data:any, callbackFun:Function);
}
