class SceneManager {
    public static currentScene: egret.DisplayObjectContainer;
    public static root: egret.DisplayObjectContainer;
    public static sceneStack: egret.DisplayObjectContainer[] = [];
    public static init(root: egret.DisplayObjectContainer) {
        this.root = root;
    }
    public static showScene(scene: any) {
        if (!this.root) { console.error("SceneManager not be init()"); return; }
        if (!scene) { console.log("scene is null"); }

        var index = -1;
        for (var i = 0; i < this.root.numChildren; i++) {
            var child = this.root.getChildAt(i);
            if (child.constructor == scene) {
                index = i;
                scene = child;
            }
        }

        if (index >= 0) {
            console.log("[SceneManager] back  scene to front.:" + scene + "@" + scene.hashCode);
            this.root.swapChildren(scene, this.root.getChildAt(this.root.numChildren - 1));
        } else {
            var scene = new scene();
            this.root.addChild(scene);
        }

        // this.sceneStack.push(scene);
        console.log("[SceneManager] show  scene:" + scene + "@" + scene.hashCode);
        // this.currentScene && this.root.removeChild(this.currentScene);
        // this.currentScene = sceene;
        // console.log("[SceneManager] remove scene:" + this.currentScene);
    }
    public static back() {
        var perScene = this.sceneStack.pop();
        if (perScene) {
            this.root.removeChild(perScene);
            console.log("[SceneManager]  Back  to scene:" + perScene.name);
        } else {
            console.warn("[SceneManager] Not Back!");
        }

    }
}