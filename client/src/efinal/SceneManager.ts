/**
 * 以栈(LIFO - Last in, First out)的形式对ViewTree进行管理,默认带动画效果
 */
class SceneManager {
    public static currentScene: egret.DisplayObjectContainer;
    public static root: egret.DisplayObjectContainer;
    public static animaLayer: egret.DisplayObjectContainer;
    public static isAnimation: boolean = true;
    public static AnimationTime: number = 300;

    // ShaderUtils.shader(this.lobbyLayout, ShaderUtils.CustomFilter.customFilter3);

    public static init(root: egret.DisplayObjectContainer) {
        this.root = root;
        this.animaLayer = new egret.DisplayObjectContainer();
        root.parent.addChild(this.animaLayer);
    }
    /**
     * @deprecated
     */
    public static showScene(scene: any, par?,isAnima?:boolean) {
        SceneManager.go(scene, par,isAnima&&true);
    }
    /**
     * 新建一个场景并显示,同时隐藏旧的场景
     */
    public static go(scene: any, par?,isAnima?:boolean): egret.DisplayObject {
        if (!this.root) { console.error("SceneManager not be init()"); return; }
        if (!scene) { console.error("scene is null"); return; }
        //hide top
        if (this.root.numChildren > 0) {
            var top: BaseScene = <BaseScene>this.root.getChildAt(this.root.numChildren - 1);
            top.onHide && top.onHide();

            if (isAnima&&SceneManager.isAnimation) {
                var x = top.x;
                egret.Tween.get(top, { loop: false }).to({ x: this.root.width * -1, y: 0 }, SceneManager.AnimationTime, egret.Ease.quadOut).call(function () {
                    top.x = x;
                    top.visible = false;
                }.bind(this));
            } else {
                top.visible = false;
            }
        }

        //new  a scene
        scene = new scene();
        scene.name = scene.constructor.name
        scene.addEventListener(egret.Event.COMPLETE, function () {
            scene.onCreated();
            scene.onShow && scene.onShow(par);
        }, this);

        this.root.addChild(scene);
        if (isAnima&&SceneManager.isAnimation) {
            scene.x = this.root.width;
            egret.Tween.get(scene, { loop: false }).to({ x: 0, y: 0 }, SceneManager.AnimationTime, egret.Ease.circIn);
        }
        console.debug("[SceneManager] show  scene:" , scene.constructor.name , "@" , scene.hashCode);
    }



    /**
     * 回退到某个页面
     */
    public static backToThePast(scece: any) {
        while (this.root.numChildren > 0) {
            var s: any = this.root.getChildAt(this.root.numChildren - 1);
            console.debug('[INFO] backToThePast s.constructor.name:', s.constructor.name);
            // console.debug('[INFO] scece.constructor.name', scece.name);
            if (s.constructor.name != scece.name) {
                SceneManager.back();
            } else {
                break;
            }
        }

    }
    /**
     * 回到上一个场景
     */
    public static back(): boolean {

        if (!this.root || this.root.numChildren <= 0) {
            console.warn('[WARN] preScene is undefine');
            return false;
        }
        var perScene: BaseScene = <BaseScene>this.root.getChildAt(this.root.numChildren - 1);
        if (!perScene) {
            console.warn("[SceneManager] Do`t Back!");
            return false;
        }

        perScene.onHide && perScene.onHide();
        perScene.onDestory && perScene.onDestory();

        if (this.root.numChildren > 1) {
            var currentScene: BaseScene = <BaseScene>this.root.getChildAt(this.root.numChildren - 2);
            console.debug("[SceneManager]  Back,  from scene:", perScene.constructor["name"], "@", perScene.hashCode, " to ", currentScene.constructor["name"], "@", currentScene.hashCode);
            currentScene.visible = true;
            currentScene.onShow && currentScene.onShow();
        }

        this.root.removeChild(perScene);


        if (SceneManager.isAnimation) {
            this.animaLayer.addChild(perScene);
            egret.Tween.get(perScene, { loop: false }).to({ x: this.root.width * -1, y: 0 }, SceneManager.AnimationTime, egret.Ease.quadOut).call(function () {
                perScene.x = 0;
                this.animaLayer.removeChild(perScene);
            }.bind(this));

        }

        return true;
    }
}