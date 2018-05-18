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
        
        SceneManager.init(this);
        await this.loadResource()
        this.createGameScene();
        Toast.initRes(this, "resource/loading/toast-bg.png");
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
        this.getWxUserInfo();

    }

    /**
     * 获取微信头像，存储起来
     */
    private getWxUserInfo() {
        try{
            getWxUserInfo(function callback (userinfo){
                egret.log(userinfo);
                var data ;
                data.nickname =  userinfo.nickName;
                data.rank = MatchvsData.defaultScore;
                data.avator = userinfo.avatarUrl;
                data.value = 0;
                PokeMatchvsEngine.getInstance().hashSet(this.userID,data);
            });
        } catch(e) {
            egret.log("错误",e.message);
        }
        
    }
    

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            // const matchvsEngine = PokeMatchvsEngine.getInstance();
            // const rep = PokeMatchvsRep.getInstance();
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
                PokeMatchvsEngine.getInstance().registerUser();
            break;
            //注册
            case MatchvsMessage.MATCHVS_REGISTERUSER:
                this.userID = e.data.id;
                PokeMatchvsEngine.getInstance().login(e.data.id,e.data.token);
            break;
            case MatchvsMessage.MATCHVS_LOGIN:
                Toast.show("登录成功");
            break;
        }
    }

    // private textfield: egret.TextField;
    // /**
    //  * 创建场景界面
    //  * Create scene interface
    //  */
    protected createGameScene(): void {
    //     let sky = this.createBitmapByName("bg_jpg");
    //     this.addChild(sky);
    //     let stageW = this.stage.stageWidth;
    //     let stageH = this.stage.stageHeight;
    //     sky.width = stageW;
    //     sky.height = stageH;

    //     let topMask = new egret.Shape();
    //     topMask.graphics.beginFill(0x000000, 0.5);
    //     topMask.graphics.drawRect(0, 0, stageW, 172);
    //     topMask.graphics.endFill();
    //     topMask.y = 33;
    //     this.addChild(topMask);

    //     let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
    //     this.addChild(icon);
    //     icon.x = 26;
    //     icon.y = 33;

    //     let line = new egret.Shape();
    //     line.graphics.lineStyle(2, 0xffffff);
    //     line.graphics.moveTo(0, 0);
    //     line.graphics.lineTo(0, 117);
    //     line.graphics.endFill();
    //     line.x = 172;
    //     line.y = 61;
    //     this.addChild(line);


    //     let colorLabel = new egret.TextField();
    //     colorLabel.textColor = 0xffffff;
    //     colorLabel.width = stageW - 172;
    //     colorLabel.textAlign = "center";
    //     colorLabel.text = "Hello Egret";
    //     colorLabel.size = 24;
    //     colorLabel.x = 172;
    //     colorLabel.y = 80;
    //     this.addChild(colorLabel);

    //     let textfield = new egret.TextField();
    //     this.addChild(textfield);
    //     textfield.alpha = 0;
    //     textfield.width = stageW - 172;
    //     textfield.textAlign = egret.HorizontalAlign.CENTER;
    //     textfield.size = 24;
    //     textfield.textColor = 0xffffff;
    //     textfield.x = 172;
    //     textfield.y = 135;
    //     this.textfield = textfield;

    //     let button = new eui.Button();
    //     button.label = "Click!";
    //     button.horizontalCenter = 0;
    //     button.verticalCenter = 0;
    //     this.addChild(button);
    //     button.addEventListener(egret.TouchEvent.TOUCH_TAP, function(e){


        // let a :MatchvsImageView = new MatchvsImageView();
        // a.width = 200;
        // a.height = 200;
        // a.x = 200;
        // a.y = 50;
        // a.src("resource/addets/bg.png");
        // a.backgrout("resource/loading/toast-bg.png");
        // this.addChild(a);

        // }, this);

        var login = new Login();
        
        this.addChild(login);
        // login.init();
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
