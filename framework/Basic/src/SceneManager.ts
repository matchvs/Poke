class SceneManager {
    public static currentScene: egret.DisplayObjectContainer;
    public static root: egret.DisplayObjectContainer;
    public static sceneStack: egret.DisplayObjectContainer[] = [];
    public static init(root: egret.DisplayObjectContainer) {
        this.root = root;
    }
    public static showScene(sceene: egret.DisplayObjectContainer) {
        if (!this.root) { console.error("SceneManager not be init()"); return };
        this.root.addChild(sceene);
        this.sceneStack.push(sceene);
        console.log("[SceneManager] go  scene:" + sceene);
        this.currentScene && this.root.removeChild(this.currentScene);
        console.log("[SceneManager] remove scene:" + this.currentScene);
    }
    public static back() {
        var perScene = this.sceneStack.pop();
        if (perScene) {
            this.root.removeChild(perScene);
            console.log("[SceneManager]  Back  to scene:" + perScene);
        } else {
            console.warn("[SceneManager] Not Back!");
        }

    }

    
}