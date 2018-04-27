/**
 *
 * @author 
 *
 */
class GameView extends egret.gui.SkinnableComponent{
    
    
    public payButton: egret.gui.Button;
    
    public shareButton: egret.gui.Button;
    public logoutButton: egret.gui.Button;

	public constructor() {
        super();
        this.skinName = skins.GameViewSkin;
	}
	
	public createChildren(){
        super.createChildren();
        
        this.payButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPayButtonTapHandler,this);
        this.shareButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareButtonTapHandler,this);
        this.logoutButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLogoutButtonTapHandler,this);
	}
	
	private onLogoutButtonTapHandler(e:egret.TouchEvent):void{

        var loginInfo: nest.user.LoginInfo = {};

        nest.user.logout(loginInfo, function (data) {
            alert(data);
        });
	}

	private onPayButtonTapHandler(e:egret.TouchEvent):void{

        var payInfo: nest.iap.PayInfo = {
            goodsId:"testpay2",
            goodsNumber:"1",
            serverId:"1",
            ext:"1"
        };

        nest.iap.pay(payInfo,this.onPayHandler.bind(this));
	}

	private onPayHandler(payInfo:nest.iap.PayCallbackInfo):void{
        console.log(payInfo);
	}
	
	private onShareButtonTapHandler(e:egret.TouchEvent):void{
        var self = this;
        nest.share.isSupport(function(supportData) {

            if (supportData.share){
                var shareInfo: nest.share.ShareInfo = {
                        title: "分享标题",
                        description: "分享内容",
                        img_title: "图片标题",
                        img_url: "file:///sdcard/QQBrowser/",
                        url: "分享URL"
                    };
                nest.share.share(shareInfo,this.onShareCompleteHandler.bind(self));
            }

        });
	}
	
	private onShareCompleteHandler(data:nest.share.ShareCallbackInfo){
	    if (data.result >= 0){
            console.log("分享成功");
	    }
	}
}
