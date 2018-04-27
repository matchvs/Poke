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

nest.core = nest.core || <any>{};
//给一个默认空实现
nest.core.addCallback = function (){};
nest.core.startup = function (info:nest.core.StartupInfo, callback:Function) {
    try {
        new egret.HashObject();
        nest.utils.$EGRET_SUPPORT = true;
    }
    catch (e) {
        nest.utils.$EGRET_SUPPORT = false;
    }
    var api:string = "http://api.egret-labs.org/v2/";
    nest.utils.$APP_ID = info.egretAppId;

    nest.utils.$DEBUG_LOG = info.debug;

    if (nest.utils.$isRuntime) {
        //qq渠道换为腾讯云
        if (nest.utils.$isQQBrowser() || nest.utils.$isTargetPlatform(10080) || nest.utils.$isTargetPlatform(10835) || nest.utils.$isTargetPlatform(20546)) {
            api = "http://api.gz.1251278653.clb.myqcloud.com/v2/";
        }
        nest.utils.$API_DOMAIN = api;

        nest.core.callCustomMethod = nest.runtime.core.callCustomMethod;
        //猎豹
        if (nest.utils.$isTargetPlatform(10044) || (!nest.utils.$getOption("egret.runtime.nest"))) {
            egret_native["setOption"]("channelTag", "liebao");
            CMPAY_DEBUG = false;
            var spid:number;
            if (nest.utils.$APP_ID == 85 || nest.utils.$APP_ID == 88) {
                spid = 10044;
            }
            else {
                spid = 18287;
            }
            egret_native["setOption"]("egret.runtime.spid", spid);
            nest.utils.$spid = spid;
            nest.utils.$changeMethod("cm");
        }
        //qq大厅
        else if (nest.utils.$isTargetPlatform(10835) || nest.utils.$isTargetPlatform(20546)) {
            var spid:number;
            //古龙和萌战机用旧版API
            if(nest.utils.$APP_ID == 66 || nest.utils.$APP_ID == 86) {
                nest.qqhall.init();
                nest.utils.$changeMethod("qqhall");
            }
            else {
                nest.qqhall2.init();
                nest.utils.$changeMethod("qqhall2");
            }
        }
        else {
            nest.utils.$changeMethod("runtime");
        }
    }
    //h5
    else {
        var domain = nest.utils.$getOption("egretServerDomain");
        if(domain) {
            api = domain + "/";
        }
        else {
            nest.utils.$API_DOMAIN = api;
        }
        var sdkDomain = nest.utils.$getOption("egretSdkDomain");
        if(!sdkDomain) {
            sdkDomain = nest.utils.$API_DOMAIN;
        }
        if (info.version == 2) {
            //新版api
            nest.utils.$changeMethod("h5_2");

            //加载h5sdk
            var url = sdkDomain + "/misc/scripts/egreth5sdk.js";
            var s = document.createElement('script');
            if (s.hasOwnProperty("async")) {
                s.async = false;
            }
            s.src = url;
            s.id = "egreth5sdk";
            s.addEventListener('load', function f1() {
                this.removeEventListener('load', f1, false);
                EgretH5Sdk.init({}, callback);
            }, false);
            s.addEventListener('error', function f2() {
                s.parentNode.removeChild(s);
                this.removeEventListener('error', f2, false);
                callback({"result": -2});
            }, false);
            document.head.appendChild(s);
            return;
        }
        else {
            //旧版api
            nest.utils.$changeMethod("h5");
        }
    }

    callback({"result": 0});
};