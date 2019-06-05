class BaseScene extends eui.Component implements eui.UIComponent {
    private root: any = this;
    private receiverMap: Object = {};
    public constructor() {
        super();
        this.root = this;
        // console.log('[BaseScene] constructor');
        this.width = App.W;
        this.height = App.H;
    }
    public menuAnimation: egret.tween.TweenGroup;
    // private hashMap = {};
    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
        instance.name = partName;
        // if (partName !== "") {
        //     this.hashMap[partName] = instance;
        // }
        if (partName === "" || (instance.touchEnabled === false)) {
            // console.log("[BaseScene] [W] [Touch Unable]: " + partName);
        } else {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
                // Toast.show("[BaseScene]  click:" + partName);
                return this.onClick(partName, instance);
            }, this);
        }
    }
    protected childrenCreated(): void {
        super.childrenCreated();
        console.debug("[BaseScene] childrenCreated");
    }
    public onShow(par?: any) {
        console.debug("[BaseScene] [onShow]: ", this.name, ",par:", par);
    }
    public onHide() {
        console.debug("[BaseScene] [onHide]", this.name);
        for(var key in this.receiverMap){
            this.unReceive(key);
        }
    }

    public onCreated(): void {
        console.debug("[BaseScene] [onCreated] ", this.name);
    }


    public onDestory(): void {
        console.debug("[BaseScene] [onDestory] ", this.name);
    }

    public finish() {
        console.debug('[BaseScene] [finish] ', this.name);
        SceneManager.back();
    }

    /**
     * 注册一个自动释放(depend @super.onHide())的消息接受者
     */
    protected receive(key: string, callback: Function) {
        Handler.getInstance().receive(key, callback);
        this.receiverMap[key] = callback;
    }
    protected unReceive(key: string, callback?: Function) {
        Handler.getInstance().unReceive(key, callback);
    }
    public findChild(name: string): egret.DisplayObject {
        var view = this.findChildFrom(this.root, name);
        if (!view) {
            console.warn('[WARN] Not Found the view:' + name);
        }
        return view;
        // return this.hashMap[name];
    }
    private findChildFrom(parent: egret.DisplayObjectContainer, name: string): egret.DisplayObject {
        // console.log("findChildFrom " + parent.name);

        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.getChildAt(i);
            // console.log("childname:" + child.name);
            if (name === child.name) {
                return child;
            } else {
                if (child instanceof egret.DisplayObjectContainer) {
                    var p1 = <egret.DisplayObjectContainer>child;
                    var r = this.findChildFrom(p1, name);
                    if (r) {
                        return r;
                    } else {
                        continue;
                    }
                } else {
                    continue;
                }
            }

        }
        return null;
    }
    public onClick(name: string, v: egret.DisplayObject) {
        switch (name) {
            case "back":
                this.finish();
                break;
            default:
                console.log("[BaseScene] No Handler for  click " + name);
                break;
        }
    }
}