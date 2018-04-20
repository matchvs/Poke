import GameScene = scene.GameScene;

/**
 *
 * @author
 *
 */
class SceneMgr {
    private _lobbySceneProxy: sceneproxy.LobbySceneProxy = null;
    private _gameSceneProxy: sceneproxy.GameSceneProxy = null;
    private _currentScene: scene.SceneBase = null;
    private _currentProxy: sceneproxy.SceneProxyBase = null;

    private static _instance: SceneMgr = null;

    public constructor() {
        this._gameSceneProxy = new sceneproxy.GameSceneProxy();
        this._lobbySceneProxy = new sceneproxy.LobbySceneProxy();
    }

    public static get Instance(): SceneMgr {
        if (SceneMgr._instance == null) {
            SceneMgr._instance = new SceneMgr();
        }
        return SceneMgr._instance;
    }

    public GetCurrentProxy(): sceneproxy.SceneProxyBase {
        return this._currentProxy;
    }

    public GetCurrentScene(): scene.SceneBase {
        return this._currentScene;
    }

    public ShowScene(scenecls: any): void {
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
        var temp: any = this._currentScene;
        this._currentScene.Init();
        if (temp != this._currentScene) {
            return;
        }
        this._currentProxy.Init(this._currentScene)
    }
}
