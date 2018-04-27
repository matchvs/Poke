class SceneManager  {
    private static instance: SceneManager = new SceneManager();
    private constructor() { }
    private scenceQueue: Array<Scene> = [];
    public push(scene: Scene) {
        this.scenceQueue.unshift(scene);
    }
    public pop() {
        var toRemoveScence = this.scenceQueue.pop();
        while (toRemoveScence == undefined) {
            toRemoveScence = this.scenceQueue.pop();
            if (toRemoveScence == undefined) {
                toRemoveScence.onDestory();
            }
        };
    }
    public remove(toRemoveScence: Scene) {
        this.scenceQueue.forEach(function (item, index, scenes) {
            if (item == toRemoveScence) {
                item.onDestory();
                scenes[index] = undefined;
                return item;
            }
        });
    }
    public static getInstance(): SceneManager {
        return this.instance;
    }
    public sceneMap: Map<Scene>;
    public registScene(name: string, scence: Scene) {
        this.sceneMap[name] = scence;
    }
    public getRegistScene(name: string): Scene {
        return this.sceneMap[name];
    }
}