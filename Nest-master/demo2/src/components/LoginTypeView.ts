/**
 *
 * @author
 *
 */
class LoginTypeView extends egret.gui.SkinnableComponent {


    public btnGroup:egret.gui.Group;

    private loginTypes:Array<nest.easyuser.ILoginType>;

    private onChoose:(logType:nest.easyuser.ILoginType)=>void;

    public constructor(loginTypes:Array<nest.easyuser.ILoginType>, onChoose:(logType:nest.easyuser.ILoginType)=>void) {
        super();

        this.loginTypes = loginTypes;
        this.onChoose = onChoose;
        this.skinName = skins.LoginTypeViewSkin;
    }

    public childrenCreated() {
        super.childrenCreated();

        var self = this;

        for (var i:number = 0; i < this.loginTypes.length; i++) {
            var logT:nest.easyuser.ILoginType = this.loginTypes[i];

            var url = "";
            if (logT.accInfo && logT.accInfo.avatarUrl) {
                url = logT.accInfo.avatarUrl;
            }
            var btn:LoginButtonView = new LoginButtonView(logT.loginType, url);
            btn.name = i + "";
            this.btnGroup.addElement(btn);
            btn.scaleX = btn.scaleY = 0.5;

            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                this.onChoose(this.loginTypes[parseInt(e.currentTarget.name)]);
            }, this);
        }
    }
}
