class Context {
    public static ActionScence: string = "scene:";
    private mIntent: Intent;
    /**
     * 上文
     */
    private preContext: Context;
    

    public constructor(intent: Intent,context: Context) {
        this.mIntent = intent;
        this.preContext = context;
    }
    public getIntent(): Intent {
        return this.mIntent;
    }


    public static start(context: Context, intent: Intent) {
        if (intent && intent.action.indexOf(this.ActionScence) > 0) {
            var scene: Scene = SceneManager.getInstance().getRegistScene(intent.action.split(this.ActionScence)[1]);
            SceneManager.getInstance().push(scene);
            scene.onCreate(new Context(intent,context));
        }else{
            console.error("Not Found the Scence to match action:"+intent.action);
        }
    }
}