/**
 * CMCM Game SDK - CMGAME_SDK_EGRET.d.ts
 * version: 2.0.2
 * Build: Tue Feb 16 2016 14:55:02 GMT+0800 (中国标准时间)
 * link: http://game.liebao.cn/game/cm_game_sdk/doc/
 */
declare module CMGAME_SDK_EGRET {
    class ad {
		constructor(option:Object);
        show(option?:Object): void;
        static show(option:Object):void;
    }
    var client: {
        checkIsGameSDK(callback:Function): void;
        saveShortcutInfo(option:Object): void;
        pushIcon(option:Object): void;
        dispatchGameLoginData(option:Object, callback:Function):void;
        getGameSDKDeviceID():string;
        getGameSDKDeviceIDAsync(callback:Function):void;
    };
    var pay: {
        on(eventName: String, callback: Function):void;
        off(eventName: String, callback: Function): void;
        purchase(option: Object): void;
    };
}
declare var CMPAY_DEBUG: Boolean;
declare var CMGAME_EGRET: {
    checkIsGameSDK(callback:Function): void;
    saveShortcutInfo(option:Object): void;
    pushIcon(option:Object): void;
    dispatchGameLoginData(option:Object, callback:Function):void;
    getGameSDKDeviceID():string;
    getGameSDKDeviceIDAsync(callback:Function):void;
}
declare var CMPAY_EGRET: {
    on(eventName: String, callback: Function):void;
    off(eventName: String, callback: Function): void;
    fire(eventName: String, ...args): void;
    isReady: Boolean;
    type: String;
    getVersion();
    ready(callback: Function): void;
    purchase(option: Object): void;
}