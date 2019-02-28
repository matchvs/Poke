//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
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

class Main extends eui.UILayer {

    public root:egret.DisplayObjectContainer;
    private topMask = new egret.Shape();
    private userID:string;
    private roomID:any;
    private timer:egret.Timer;


    protected createChildren(): void {
        super.createChildren();

        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        Toast.initRes(this, "resource/loading/toast-bg.png");

        var rootView = new egret.Sprite();
        rootView.width = this.stage.width;
        rootView.height = this.stage.height;
        rootView.x = 0;
        rootView.y = 0;
        this.addChild(rootView);
        SceneManager.init(rootView);

        egret.ImageLoader.crossOrigin = "anonymous";
        await this.getWxUserInfo();
        // SceneManager.init(this);
        await this.loadResource()

    }


    // /**
    //  * faceBook
    //  */
    // private initializeAsync(): void {
    //     FBInstant.initializeAsync().then(function () {
    //         console.log("getLocale:", FBInstant.getLocale());
    //         console.log("getPlatform:", FBInstant.getPlatform());
    //         console.log("getSDKVersion", FBInstant.getSDKVersion());
    //         console.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
    //         console.log("getEntryPointData", FBInstant.getEntryPointData());
            
    //     })
    //     setTimeout(function () {
    //         FBInstant.setLoadingProgress(100);
    //     }, 1000);
    //     this.initStartGameAsync();
    // }


    // /**
    //  * faceBook
    //  */
    // private initStartGameAsync() {
    //     FBInstant.startGameAsync().then(
    //         function () {
    //             // Retrieving context and player information can only be done
    //             // once startGameAsync() resolves
    //             var contextId = FBInstant.context.getID();
    //             var contextType = FBInstant.context.getType();
    //             var playerName = FBInstant.player.getName();
    //             var playerPic = FBInstant.player.getPhoto();
    //             var playerId = FBInstant.player.getID();
 
    //             // Once startGameAsync() resolves it also means the loading view has 
    //             // been removed and the user can see the game viewport
    //         }).catch(function (e) {
    //             console.log("startgame error", e)
    //         });
    // }

    /**
     * 获取微信头像，存储起来
     */
    private getWxUserInfo() {
        try{
            var wxm = new Wxmodel();
            wxm.getWxUserInfo(function callback (userinfo){
                console.log("main",userinfo);
                var data ;
                GlobalData.myUser.nickName =  userinfo.nickName;
                GlobalData.myUser.avator = userinfo.avatarUrl;
                //todo 
                // PokeMatchvsEngine.getInstance.hashGet("integral");
            });
        } catch(e) {
            console.log("错误",e.message);
        }
        
    }
    

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_INIT,this.onEvent,this);
            PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_REGISTERUSER,this.onEvent,this);
            PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LOGIN,this.onEvent,this);
            //初始化
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
            this.createGameScene();
            PokeMatchvsEngine.getInstance.init(MatchvsData.pChannel,MatchvsData.pPlatform,MatchvsData.gameID);
        }
        catch (e) {
            console.error(e);
            
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    public onEvent(e:egret.Event):void {
        console.log(e);
        switch(e.type) {
            case MatchvsMessage.MATCHVS_INIT:
                    PokeMatchvsEngine.getInstance.registerUser();
            break;
            //注册
            case MatchvsMessage.MATCHVS_REGISTERUSER:
                MvsHttpApi.TestReportScore();
                // this.userID = e.data.id;
                this.userInfoStore(e.data);
            break;
            case MatchvsMessage.MATCHVS_LOGIN:
                if (e.data.status == 200) {
                    Toast.show("登录成功");
                    MatchvsData.loginStatus = true;
                    this.timer = new egret.Timer(1000,1);
                    this.timer.addEventListener(egret.TimerEvent.TIMER,this.wxInvite,this)
                    this.timer.start();
                } else {
                    Toast.show("登录失败");
                }
      
            break;
            case MatchvsMessage.MATCHVS_JOINROOM_RSP:
                this.removeEvent();
                var obj = {roomID: this.roomID, gameMode:MatchvsData.gameMode,isInvite:false,isRestart:true};
                MatchvsData.gameMode = true;
                SceneManager.showScene(Room,obj);
            break;
        }
    }


    protected userInfoStore(userInfo:any): void {
            /**
             * 微信头像与昵称的获取在注册之前，如果已经存在，就使用微信的，如果为"",就使用ID代替昵称，头像为随机；
             * 还需要存在本地
             */
            if (GlobalData.myUser.nickName == "")  {
                GlobalData.myUser.nickName = userInfo.id;
            }
            if (GlobalData.myUser.avator == "") {
           	    GlobalData.myUser.avator = MatchvsData.defaultIcon[Math.round(10*Math.random())];
            }
            GlobalData.myUser.userID = userInfo.id;
           	GlobalData.myUser.token = userInfo.token;
            this.getUserPointValueNew(GlobalData.myUser.userID);

    }

    protected createGameScene(): void {
        // this.removeEvent()
        SceneManager.showScene(Login);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 微信邀请
     */
    public wxInvite () {
        try {
            var wxm = new Wxmodel();
            var LaunchOption = wxm.getLaunchOptionsSync();
             this.roomID  =  LaunchOption.query.roomID;
            if(  this.roomID  != null &&   this.roomID  != "" &&  this.roomID  !=0) {
                //昵称，头像，积分的顺序，用 /n 分割
                PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
                PokeMatchvsEngine.getInstance.joinRoom(this.roomID,MatchvsData.getDefaultUserProfile());
            }
        } catch(err) {
            console.log(err,err.message);
        }
    }


    /**
     * 在这里移除所有的监听
     */
    public removeEvent() {
        PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_LOGIN,this.onEvent,this);
        PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_INIT,this.onEvent,this);
        PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_REGISTERUSER,this.onEvent,this);
        PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
    }

    public getUserPointValueNew (userID:any) {
		let http = new MvsHttpApi();
        http.GetUserRank(userID, (res, err)=>{
            if(res && res.statusCode == 200){
                if(res.data){
                    GlobalData.myUser.pointValue = res.data.value;
                    return;
                }
            }
            GlobalData.myUser.pointValue = MatchvsData.defaultScore;
        });
	}




    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        if(e.$currentTarget == this.topMask) {

        }
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}
