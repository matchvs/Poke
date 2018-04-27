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
/*
 * @private
 */
module nest.utils {
    /*
     * @private
     */
    export var $API_DOMAIN:string;
    /*
     * @private
     */
    export var $APP_ID:number;
    /*
     * @private
     */
    export var $DEBUG_LOG:boolean = false;
    /*
     * @private
     */
    export var $EGRET_SUPPORT:boolean;
    /*
     * @private
     */
    export function $changeMethod(version:string):void {
        //console.log("[Nest]use module : " + version);
        var arr = ["core", "user", "iap", "share", "social", "app"];
        for (var i = 0; i < arr.length; i++) {
            var module = arr[i];
            if (nest[version] && nest[version][module]) {
                if (nest[module] == null) {
                    nest[module] = {};
                }
                for (var key in nest[version][module]) {
                    nest[module][key] = nest[version][module][key];
                }

                for (var key in nest[module]) {
                    var fun = nest[module][key];
                    if (typeof fun == "function") {
                        modifyFunction(module, key);
                    }
                }
            }
        }
    }

    function modifyFunction(module:string, key:string) {
        var fun = nest[module][key];
        var newFun:Function;
        //这里兼容下老版本,老版本isSupport函数传一个参数的
        if (key == "isSupport") {
            newFun = function (info:any, callback?:Function) {
                $log("[Nest]调用接口nest." + module + "." + key);
                var rInfo = info;
                var rCallback = callback;
                if(typeof info == "function") {
                    rInfo = {};
                    rCallback = info;
                }
                var debugCallback = function (data) {
                    $log("[Nest]获得nest." + module + "." + key + "接口返回 : " + JSON.stringify(data));
                    rCallback.call(null, data);
                };
                fun.call(null, rInfo, debugCallback);
            };
        }
        else {
            newFun = function (info:any, callback:Function) {
                $log("[Nest]调用接口nest." + module + "." + key);
                var debugCallback = function (data) {
                    $log("[Nest]获得nest." + module + "." + key + "接口返回 : " + JSON.stringify(data));
                    callback.call(null, data);
                };
                fun.call(null, info, debugCallback);
            };
        }
        nest[module][key] = newFun;
    }

    /*
     * @private
     */
    export var $isRuntime:boolean;
    /*
     * @private
     */
    export var $spid:number;
    /*
     * @private
     */
    export function $getSpid():number {
        if ($spid == undefined) {
            $spid = parseInt($getOption("egret.runtime.spid"));
        }
        return $spid;
    }

    /*
     * @private
     */
    var $channelTag:string;
    /*
     * @private
     */
    export function $getChannelTag():string {
        if ($channelTag == undefined) {
            $channelTag = $getOption("channelTag");
        }
        return $channelTag;
    }

    /*
     * @private
     */
    var $QQBrowser:boolean;
    /*
     * @private
     */
    export function $isQQBrowser():boolean {
        if ($QQBrowser == undefined) {
            $QQBrowser = $isTargetPlatform(9392);
        }
        return $QQBrowser;
    }

    /*
     * @private
     */
    export function $isTargetPlatform(target:number):boolean {
        return $getSpid() == target;
    }

    /*
     * @private
     */
    export function $getOption(key:string):string {
        if ($EGRET_SUPPORT) {
            return egret.getOption(key);
        }
        else {
            if (window.location) {
                var search = location.search;
                if (search == "") {
                    return "";
                }
                search = search.slice(1);
                var searchArr = search.split("&");
                var length = searchArr.length;
                for (var i:number = 0; i < length; i++) {
                    var str = searchArr[i];
                    var arr = str.split("=");
                    if (arr[0] == key) {
                        return arr[1];
                    }
                }
            }
            return "";
        }
    }

    /*
     * @private
     */
    export function $log(msg:string):void {
        if ($DEBUG_LOG) {
            if ($EGRET_SUPPORT && egret["log"]) {
                egret["log"](msg);
            }
            else {
                console.log(msg);
            }
        }
    }

    export function setProxy(url:string, postData:Object, method:string, callback:Function, errCallback:Function):void {
        var cmpostdata = "";
        for (var key in postData) {
            cmpostdata += key + "=" + postData[key] + "&";
        }
        if (cmpostdata != "") {
            cmpostdata = cmpostdata.substr(0, cmpostdata.length - 1);
        }
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function () {
            var jsonObj = JSON.parse(loader.data);
            callback(jsonObj);
        }, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
            errCallback();
        }, this);
        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = method;
        request.data = new egret.URLVariables(cmpostdata);
        loader.load(request);
    }
}

/**
 * @private
 */
module nest.utils.localStorage {
    export function setItem(key:string, value:string):void {
        if ($isRuntime) {
            egret.localStorage.setItem(key, value);
        }
        else {
            try {
                window.localStorage.setItem(key, value);
            }
            catch(e){
                
            }
        }
    }

    export function getItem(key:string):string {
        if ($isRuntime) {
            return egret.localStorage.getItem(key);
        }
        else {
            try {
                return window.localStorage.getItem(key);
            }
            catch(e){
                return undefined;
            }
        }
    }
}

if (this["navigator"]) {
    nest.utils.$isRuntime = false;
}
else {
    nest.utils.$isRuntime = true;
}