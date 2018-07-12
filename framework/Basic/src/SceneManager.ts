class SceneManager {
    public static currentScene: egret.DisplayObjectContainer;
    public static root: egret.DisplayObjectContainer;
    public static sceneStack: egret.DisplayObjectContainer[] = [];
    public static init(root: egret.DisplayObjectContainer) {
        this.root = root;
    }
    
    public static showScene(scene: any, par?): egret.DisplayObject {
        if (!this.root) { console.error("SceneManager not be init()"); return; }
        if (!scene) { console.log("scene is null"); }
        // console.log("send",scene.constructor)
        var index = -1;
        for (var i = 0; i < this.root.numChildren; i++) {
            var child = this.root.getChildAt(i);
            if (child.constructor == scene) {
                index = i;
                scene = child;
                if (scene.onShow) scene.onShow(par);

            }
        }

        if (index >= 0) {
            // console.log("[SceneManager] back  scene to front.:" + scene.constructor + "@" + scene.hashCode);
            this.root.swapChildren(scene, this.root.getChildAt(this.root.numChildren - 1));
        } else {
            scene = new scene(par);
            if (scene.onShow) {
                // console.log(scene.constructor ,"onShow");
                scene.onShow(par);
            }  
            this.root.addChild(scene);
        }
        // this.sceneStack.push(scene);
        // console.log("[SceneManager] show  scene:" + scene.constructor  + "@" + scene.hashCode);
        // this.currentScene && this.root.removeChild(this.currentScene);
        // this.currentScene = sceene;
        // console.log("[SceneManager] remove scene:" + this.currentScene);
    }

    public static back() {
        if (this.root.numChildren > 0) {
            var perScene = this.root.getChildAt(this.root.numChildren - 1);
            if (perScene) {
                this.root.removeChild(perScene);
                console.log("[SceneManager]  Back  to scene:" + perScene.name);
            }
        }
        else {
            console.warn("[SceneManager] Not Back!");
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


