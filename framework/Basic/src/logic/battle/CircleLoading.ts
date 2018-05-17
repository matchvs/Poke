
module battle {
    import Bitmap = egret.Bitmap;
    export class CircleLoading extends egret.Sprite {
        private _bg:Bitmap = null;
        private _mask:egret.Shape = null;

        public constructor(bgurl:string) {
            super();
            this.init(bgurl);
        }

        private init(bgurl:string):void {
            this.touchEnabled = false;
            this.touchChildren = false;
            this._bg = new egret.Bitmap(RES.getRes(bgurl));
            this.addChild(this._bg);


            this._mask = new egret.Shape();
            this.addChild(this._mask);
            this.mask = this._mask;
            this.setProgress(0);
        }

        public setProgress(prog:number):void {
            if (prog > 1 || prog <= 0) {
                return;
            }
            var bgwidth:number = this._bg.width;
            var bgheight:number = this._bg.height;
            var angle:number = Math.ceil(360 * prog);
            this.DrawSector(this._mask, bgwidth / 2, bgheight / 2, bgwidth / 2, angle, -90);
        }

        public DrawSector(mc:egret.Shape, x:number = 200, y:number = 200, r:number = 100, angle:number = -90, startFrom:number = -90):void {
            mc.graphics.clear();
            
            mc.graphics.beginFill(0x000000);
            mc.graphics.lineStyle(0,0xff0000);
            mc.graphics.moveTo(x, y);
            angle = (Math.abs(angle) > 360) ? 360 : angle;
            var n:number = Math.ceil(Math.abs(angle) / 45);
            var angleA:number = angle / n;
            angleA = angleA * Math.PI / 180;
            startFrom = startFrom * Math.PI / 180;
            mc.graphics.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
            for (var i = 1; i <= n; i++) {
                startFrom += angleA;
                var angleMid = startFrom - angleA / 2;
                var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
                var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
                var cx = x + r * Math.cos(startFrom);
                var cy = y + r * Math.sin(startFrom);
                mc.graphics.curveTo(bx, by, cx, cy);
            }

            if (angle != 360) {
                mc.graphics.lineTo(x, y);
            }
            mc.graphics.endFill();  // if you want a sector without filling color , please remove this line.
        }

        public Release():void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}