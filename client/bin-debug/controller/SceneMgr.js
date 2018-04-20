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
    var d = __define,c=SceneMgr;p=c.prototype;
    d(SceneMgr, "Instance"
        ,function () {
            if (SceneMgr._instance == null) {
                SceneMgr._instance = new SceneMgr();
            }
            return SceneMgr._instance;
        }
    );
    p.GetCurrentProxy = function () {
        return this._currentProxy;
    };
    p.GetCurrentScene = function () {
        return this._currentScene;
    };
    p.ShowScene = function (scenecls) {
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
})();
egret.registerClass(SceneMgr,"SceneMgr");
