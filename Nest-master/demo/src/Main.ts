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

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        
        egret.gui.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        egret.gui.Theme.load("resource/theme.thm");
        
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
       
    }
    
    /**
    * 配置文件加载完成,开始预加载preload资源组。
    * Loading of configuration file is complete, start to pre-load the preload resource group
    */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    }
    
    
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.createGameScene();               
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        
        var uistage: egret.gui.UIStage = new egret.gui.UIStage();
        this.addChild(uistage);
        
        uistage.addEventListener(GameEvent.LOGIN_SUCCESS,this.onLoginSuccess,this);
                            
        
        utils.init(uistage);
        nest.core.startup({egretAppId:230}, function (){
            utils.changeView(new LoginView());
        });
    }
    
    private onLoginSuccess(e:GameEvent):void{
        utils.changeView(new GameView());
    }
}

module utils {
    
    
    var _stage: egret.gui.UIStage;
    
    export function init(stage:egret.gui.UIStage){
        _stage = stage;
    }
    
    export function changeView(view:egret.gui.UIComponent){
        _stage.removeAllElements();
        _stage.addElement(view);
    }
}