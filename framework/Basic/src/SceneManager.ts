class SceneManager {
    public static currentScene: egret.DisplayObjectContainer;
    public static root: egret.DisplayObjectContainer;
    public static isAnimation: boolean = false;
    public static sceneStack: egret.DisplayObjectContainer[] = [];
    public static init(root: egret.DisplayObjectContainer) {
        this.root = root;
    }
    public static showScene(scene: any, par?): egret.DisplayObject {
        if (!this.root) { console.error("SceneManager not be init()"); return; }
        if (!scene) { console.error("scene is null"); return; }
        //hide top
        if (this.root.numChildren > 0) {
            var top: any = this.root.getChildAt(this.root.numChildren - 1);
            top.onHide && top.onHide();
        }

        //new  a scene
        scene = new scene(par);
        scene.name = scene.constructor.name
        scene.onShow && scene.onShow(par);
        //show currentScene
        this.root.addChild(scene);

        if (SceneManager.isAnimation) {
            scene.x = 480;
            egret.Tween.get(scene, { loop: false }).to({ x: 0, y: 0 }, 300, egret.Ease.circInOut);
        }
        // }
        console.log("[SceneManager] show  scene:" + scene.constructor.name + "@" + scene.hashCode);
    }

    public static back(): boolean {
        if (this.root.numChildren > 0) {
            var perScene: any = this.root.getChildAt(this.root.numChildren - 1);
            if (perScene) {
                perScene.onHide && perScene.onHide();
                if (!SceneManager.isAnimation) {
                    if (this.root.numChildren > 1) {
                        var top: any = this.root.getChildAt(this.root.numChildren - 2);
                        console.log("[SceneManager]  Back,  from scene:" + perScene.constructor.name + "@" + perScene.hashCode+" to "+top.constructor.name+"@"+top.hashCode);
                        top.onShow && top.onShow();

                        
                    }
                    this.root.removeChild(perScene);
                } else {
                    perScene.x = 0;
                    egret.Tween.get(perScene, { loop: false }).to({ x: 800, y: 0 }, 600, egret.Ease.quadIn).call(function () {
                        perScene.x = 0;
                        this.root.removeChild(perScene);
                    }.bind(this));
                    //show top
                    if (this.root.numChildren > 1) {
                        var top: any = this.root.getChildAt(this.root.numChildren - 2);
                        top.onShow && top.onShow();
                        top.x = -480;
                        egret.Tween.get(top, { loop: false }).to({ x: 0, y: 0 }, 400, egret.Ease.backIn);
                    }
                }
                
                return true;
            } else {
                console.warn('[WARN] preScene is undefine');
                return false;
            }
        } else {
            console.warn("[SceneManager] Do`t Back!");
            return false;
        }
    }

    public static JumpResultUI(p3,p1,p2,iswin,islandwin,timestr , roomid:string){
        SceneManager.root.removeChildren();
        let re = new ResultUI();
        SceneManager.root.addChild(re);
        if(p1.isLandLord){
			re.showResult(p1,p2,p3,iswin,islandwin,timestr,roomid);
		}else if(p2.isLandLord){
			re.showResult(p2,p1,p3,iswin,islandwin,timestr,roomid);
		}else if(p3.isLandLord){
			re.showResult(p3,p1,p2,iswin,islandwin,timestr,roomid);
		}
        
    }

    public static ErrorPage(msg:string, callFun:Function, obj:any){
        SceneManager.root.removeChildren();
        let errpage:ErrorNote = new ErrorNote();
        errpage.SetErrorMsg(msg, callFun);
        SceneManager.root.addChild(errpage);
    }
}
   



