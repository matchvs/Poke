/**
 *
 * @author 
 *
 */
class GameView extends egret.gui.SkinnableComponent{
    
    
    public shareButton: egret.gui.Button;
    public logoutButton: egret.gui.Button;
    
    num_txt:egret.gui.Label;
    
	public constructor() {
        super();
        this.skinName = skins.GameViewSkin;
	}
	
	public createChildren(){
        super.createChildren();

        this.shareButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareButtonTapHandler,this);
        this.logoutButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLogoutButtonTapHandler,this);
	}
	
	private onLogoutButtonTapHandler(e:egret.TouchEvent):void{

        var loginInfo: nest.user.LoginInfo = {};

        var self = this;
        egret.log("logout start");
        nest.easyuser.logout(loginInfo, function (data) {
            egret.log(JSON.stringify(data));
            egret.log("logout end");
            if (data["result"] == 0) {
                self.dispatchEvent(new GameEvent(GameEvent.LOGIN_OUT_SUCCESS));
            }
            else {
                alert("登出失败！");
            }
        });
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
