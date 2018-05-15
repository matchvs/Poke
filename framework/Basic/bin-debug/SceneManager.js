var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
    }
    SceneManager.init = function (root) {
        this.root = root;
    };
    SceneManager.showScene = function (sceene) {
        if (!this.root) {
            console.error("SceneManager not be init()");
            return;
        }
        ;
        this.root.addChild(sceene);
        this.sceneStack.push(sceene);
        console.log("[SceneManager] go  scene:" + sceene);
        this.currentScene && this.root.removeChild(this.currentScene);
        console.log("[SceneManager] remove scene:" + this.currentScene);
    };
    SceneManager.back = function () {
        var perScene = this.sceneStack.pop();
        if (perScene) {
            this.root.removeChild(perScene);
            console.log("[SceneManager]  Back  to scene:" + perScene);
        }
        else {
            console.warn("[SceneManager] Not Back!");
        }
    };
    SceneManager.sceneStack = [];
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map