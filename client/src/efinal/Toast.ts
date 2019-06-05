class Toast extends egret.DisplayObjectContainer {
    private static _txtrToastBg: egret.Texture;
    private static context: egret.DisplayObjectContainer;
    public static init(cont: egret.DisplayObjectContainer, txtrToastBg: egret.Texture): void {
        if(this.context){
            console.warn("Toast has init, so ignore this action");
            return;
        }
        console.log("Toast.init", txtrToastBg);
        this.context = cont;
        this._txtrToastBg = txtrToastBg;
    }
    public static initRes(cont: egret.DisplayObjectContainer, img: string): void {
        if(this.context){
            console.warn("Toast has init, so ignore this action");
            return;
        }

        console.log("Toast.init", img);
        this.context = cont;
      
        var loader: egret.ImageLoader = new egret.ImageLoader();
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event): void {
            var loader: egret.ImageLoader = <egret.ImageLoader>event.target;
            //获取加载到的纹理对象
            var bitmapData: egret.BitmapData = loader.data;
            //创建纹理对象
            var texture = new egret.Texture();
            texture.bitmapData = bitmapData;
            this._txtrToastBg = texture;
            //创建 Bitmap 进行显示
            // this.addChild(new egret.Bitmap(texture));
        }, this);
        //开始加载
        loader.load(img);
    }

    public static show(msg: string): void {
        if (this.context) {
            var toast: Toast = new Toast(msg, this.context.stage.stageWidth, this.context.stage.stageHeight);
            this.context.addChild(toast);
        }
    }



    constructor(msg: string, w: number, h: number) {
        super();

        console.log("Toast:", msg);

        var bg: egret.Bitmap = new egret.Bitmap(Toast._txtrToastBg);
        this.x = w * .5;
        this.y = h * .85;
        this.addChild(bg);
        bg.$anchorOffsetX = bg.width/2;
        // bg.$anchorOffsetY = bg.height/2;

        var tx: egret.TextField = new egret.TextField;
        tx.multiline = true;
        tx.size = 30;
        tx.bold = true;
        tx.textColor = 0xFFFFFF;
        tx.stroke = 6;
        tx.strokeColor = 0;
        tx.text = msg;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER;
        tx.width = w * 1.0;
        tx.x = bg.x;
        tx.y = bg.y+tx.size/10;
        tx.anchorOffsetX = tx.width/2;

        this.addChild(tx);

        bg.height = 12 + tx.height;


        this.alpha = 0;

        egret.Tween.get(this)
            .to({ alpha: 1 }, 200, egret.Ease.quintOut)
            //.to( { scaleX: 1.2, scaleY: 1.2 }, 100, egret.Ease.quintOut )
            //.call( ()=>{ console.log( "tween tween tween" ); } ) 
            //.to( { scaleX: 1.0, scaleY: 1.0 }, 300, egret.Ease.quintIn )
            .wait(600)
            .to({ alpha: 0 }, 200, egret.Ease.quintIn).call(() => {      /*  y: this.y - 50, */
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            });
    }
}