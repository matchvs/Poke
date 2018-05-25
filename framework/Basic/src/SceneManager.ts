class SceneManager {
    public static currentScene: egret.DisplayObjectContainer;
    public static root: egret.DisplayObjectContainer;
    public static sceneStack: egret.DisplayObjectContainer[] = [];
    public static init(root: egret.DisplayObjectContainer) {
        SceneManager.root = root;
    }
    public static showScene(sceene: egret.DisplayObjectContainer) {
        if (!SceneManager.root) { console.error("SceneManager not be init()"); return };
        SceneManager.root.addChild(sceene);
        SceneManager.sceneStack.push(sceene);
        console.log("[SceneManager] go  scene:" + sceene);
        SceneManager.currentScene && SceneManager.root.removeChild(SceneManager.currentScene);
        console.log("[SceneManager] remove scene:" + SceneManager.currentScene);
       
    }
    public static back() {
        var perScene = SceneManager.sceneStack.pop();
        if (perScene) {
            SceneManager.root.removeChild(perScene);
            console.log("[SceneManager]  Back  to scene:" , perScene);
        } else {
            console.warn("[SceneManager] Not Back!");
        }
    }

    public static removeAll(){
        SceneManager.root.removeChildren();
    }

    
}