var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameScene = scene.GameScene;
/**
 *
 * @author
 *
 */
var SceneMgr = (function () {
    function SceneMgr() {
        this._lobbySceneProxy = null;
        this._gameSceneProxy = null;
        this._currentScene = null;
        this._currentProxy = null;
        this._gameSceneProxy = new sceneproxy.GameSceneProxy();
        this._lobbySceneProxy = new sceneproxy.LobbySceneProxy();
    }
    Object.defineProperty(SceneMgr, "Instance", {
        get: function () {
            if (SceneMgr._instance == null) {
                SceneMgr._instance = new SceneMgr();
            }
            return SceneMgr._instance;
        },
        enumerable: true,
        configurable: true
    });
    SceneMgr.prototype.GetCurrentProxy = function () {
        return this._currentProxy;
    };
    SceneMgr.prototype.GetCurrentScene = function () {
        return this._currentScene;
    };
    SceneMgr.prototype.ShowScene = function (scenecls) {
        if (this._currentScene == null) {
            this._currentScene = new scenecls();
            LayerMgr.Scene.addChild(this._currentScene);
        }
        else {
            this._currentScene.Release();
            this._currentScene = new scenecls();
            LayerMgr.Scene.addChild(this._currentScene);
        }
        if (this._currentProxy) {
            this._currentProxy.Release();
        }
        if (this._currentScene instanceof scene.GameScene) {
            this._currentProxy = this._gameSceneProxy;
        }
        else if (this._currentScene instanceof scene.LobbyScene) {
            this._currentProxy = this._lobbySceneProxy;
        }
        var temp = this._currentScene;
        this._currentScene.Init();
        if (temp != this._currentScene) {
            return;
        }
        this._currentProxy.Init(this._currentScene);
    };
    SceneMgr._instance = null;
    return SceneMgr;
}());
__reflect(SceneMgr.prototype, "SceneMgr");
//# sourceMappingURL=SceneMgr.js.map