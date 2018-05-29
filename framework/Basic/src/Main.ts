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
    // public rep:PokeMatchvsRep = null;

    protected createChildren(): void {
        super.createChildren();

        // egret.lifecycle.addLifecycleListener((context) => {
        //     // custom lifecycle plugin
        // })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        // let a :MatchvsImageView = new MatchvsImageView(this);
        // a.width = 200;
        // a.height = 200;
        // a.x = 200;
        // a.y = 50;
        // a.src("btnEquip_png");
        // a.backgrout("btnEquip_png");
        // this.addChild(a);
        egret.ImageLoader.crossOrigin = "anonymous";
        await this.getWxUserInfo();
        SceneManager.init(this);
        await this.loadResource()
        this.createGameScene();
        Toast.initRes(this, "resource/loading/toast-bg.png");
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);

    }

    /**
     * 获取微信头像，存储起来
     */
    private getWxUserInfo() {
        try{
            getWxUserInfo(function callback (userinfo){
                egret.log("main",userinfo);
                var data ;
                GlobalData.myUser.nickName =  userinfo.nickName;
                GlobalData.myUser.avator = userinfo.avatarUrl;
                //todo 
                PokeMatchvsEngine.getInstance().hashGet("integral");
            });
        } catch(e) {
            egret.log("错误",e.message);
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
            PokeMatchvsEngine.getInstance().init(MatchvsData.pChannel,MatchvsData.pPlatform,MatchvsData.gameID);
            
            // matchvsEngine.registerUser();
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
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
        egret.log(e);
        switch(e.type) {
            case MatchvsMessage.MATCHVS_INIT:
                //todo  在这里要获取一下本地的数据，如果本地有存储的用户信息就跳过注册，直接去登录
                // var userInfo:any = egret.localStorage.getItem("userInfo");
                // if(userInfo) {
                    
                // } else {
                    PokeMatchvsEngine.getInstance().registerUser();
                // }
            break;
            //注册
            case MatchvsMessage.MATCHVS_REGISTERUSER:
                // this.userID = e.data.id;
                this.userInfoStore(e.data);
                PokeMatchvsEngine.getInstance().login(e.data.id,e.data.token);
            break;
            case MatchvsMessage.MATCHVS_LOGIN:
                Toast.show("登录成功");
                this.wxInvite();
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
            this.getUserPointValue(GlobalData.myUser.userID);
            // if(userPointValue == null)  {
            //     egret.log("1111111111111")
      
            // } else {
            //       egret.log("2222222222")
            //         egret.log(" GlobalData.myUser.pointValue", GlobalData.myUser.pointValue)
            // }


            //将自己的数据存到本地
            // var key:string = "userInfo";
            // var value:any = {};
            // value.nickName = GlobalData.myUser.nickName;
            // value.avator = GlobalData.myUser.avator;
            // value.userID = GlobalData.myUser.userID;
            // value.token = GlobalData.myUser.token;
            // value.pointValue = GlobalData.myUser.pointValue;
            // egret.localStorage.setItem(key,JSON.stringify(value));
    }

    protected createGameScene(): void {
        var login = new Login();
        this.addChild(login);

        // var login = new BattleStageUI();
        // this.addChild(login);
        // login.init();
        // login.StartBattle(GUser.explameAddPlayer());
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
            var LaunchOption = getLaunchOptionsSync();
            console.log(JSON.stringify(LaunchOption.query)+"11");
            var roomID  = LaunchOption.query.roomID;
            console.log(LaunchOption.query+"22");
            console.log(LaunchOption.query.roomID+"是多少");
            if(roomID != null && roomID != "" && roomID !=0) {
                //昵称，头像，积分的顺序，用 /n 分割
                PokeMatchvsEngine.getInstance().joinRoom(roomID,MatchvsData.getDefaultUserProfile());
                this.removeEvent();
                SceneManager.showScene(Room);
            }
        } catch(err) {
            egret.log(err,err.message);
        }
    }


    /**
     * 在这里移除所有的监听
     */
    public removeEvent() {
        PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_LOGIN,this.onEvent,this);
        PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_INIT,this.onEvent,this);
        PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_REGISTERUSER,this.onEvent,this);
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    // private startAnimation(result: Array<any>): void {
    //     let parser = new egret.HtmlTextParser();

    //     let textflowArr = result.map(text => parser.parse(text));
    //     let textfield = this.textfield;
    //     let count = -1;
    //     let change = () => {
    //         count++;
    //         if (count >= textflowArr.length) {
    //             count = 0;
    //         }
    //         let textFlow = textflowArr[count];

    //         // 切换描述内容
    //         // Switch to described content
    //         textfield.textFlow = textFlow;
    //         let tw = egret.Tween.get(textfield);
    //         tw.to({ "alpha": 1 }, 200);
    //         tw.wait(2000);
    //         tw.to({ "alpha": 0 }, 200);
    //         tw.call(change, this);
    //     };

    //     change();
    // }

    public getUserPointValue (userID:any) {
		let keyList = JSON.stringify([{"key":userID}]);
		var params = "gameID=" + MatchvsData.gameID + "&userID="+userID+ "&keyList=" +keyList;
		var matchvsMD5 = new MD5();
		var sign = matchvsMD5.hex_md5(MatchvsData.appKey+"&gameID="+MatchvsData.gameID+"&userID="+userID+"&"+ MatchvsData.secret);
		var rankListUrl = MatchvsData.alphaHttpUrl+params+"&sign="+sign;
		var http = new MatchvsHttp({
            onMsg:function(buf){
                egret.log("玩家信息拿到了",buf);
                var buf = JSON.parse(buf);
                if(buf.data.dataList.length < 1) {
                    egret.log("没有拿到数据");
                    GlobalData.myUser.pointValue = MatchvsData.defaultScore;
                } else {
                    egret.log("玩家分数是",buf.data.dataList[0].value);
                    GlobalData.myUser.pointValue = buf.data.dataList[0].value;
                }
            },
            onErr:function(errCode,errMsg){
				egret.log("获取玩家错误信息",errMsg);
                // GlobalData.myUser.pointValue = ;
                return null;
			}
        });
		http.get(rankListUrl);
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
