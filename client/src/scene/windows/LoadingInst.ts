module windowui {
    import Sprite = egret.Sprite;
    export class LoadingInst extends WindowsBase {
        private textField:egret.TextField;
        private _progress:scene.ProgressBar = null;
        private static _instance:LoadingInst = null;

        private _mask:egret.Sprite = new egret.Sprite();
        public constructor() {
            super();
            this.createView();
        }

        public createView():void {
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.y = Config.StageHeight/2-15;
            this.textField.width = 640;
            this.textField.height = 100;
            this.textField.textAlign = "center";

        }

        public Show() {
            LoadMgr.Instance.addEventListener(LoadMgr.LOAD_PROGRESS, this.setProgress, this);
            LayerMgr.TopWindow.addChild(this);
        }

        public Hide() {
            LoadMgr.Instance.removeEventListener(LoadMgr.LOAD_PROGRESS, this.setProgress, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public static get Instance():LoadingInst {
            if (LoadingInst._instance == null) {
                LoadingInst._instance = new LoadingInst();
            }
            return LoadingInst._instance;
        }

        public setSkin():void {
            this.removeChildren();
            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("bg_loading_jpg"));
            this.addChild(bg);
            this._progress=new scene.ProgressBar("ui_loading_top");
            this.addChild(this._progress);
            this._progress.x=87;
            this._progress.y=969;
            this._progress.setProgress(0);

            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.y = 974;
            this.textField.size=18;
            this.textField.width = 640;
            this.textField.textAlign = "center";
            this.textField.stroke=2;
            this.textField.strokeColor=0x131313;
        }

        private onTap(e:egret.TouchEvent):void
        {

        }


        public SetText(txt:string):void
        {
            this.textField.text=txt;
        }

        public setProgress(current, total):void {
            var per:number=LoadMgr.Instance.ItemsLoaded /LoadMgr.Instance.ItemsTotal;
            if(per<0){per=0;}
            if(per>1){per=1;}
            var sper:number=Math.ceil(per*100);
            this.textField.text = sper+"%";
            if(this._progress)
            {
                this._progress.setProgress(per);
            }
        }

    }
}

