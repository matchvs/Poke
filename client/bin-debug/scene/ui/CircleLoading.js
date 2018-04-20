/**
 * Created by Administrator on 2015/12/21.
 */
var scene;
(function (scene) {
    var CircleLoading = (function (_super) {
        __extends(CircleLoading, _super);
        function CircleLoading(bgurl) {
            _super.call(this);
            this._bg = null;
            this._mask = null;
            this.init(bgurl);
        }
        var d = __define,c=CircleLoading;p=c.prototype;
        p.init = function (bgurl) {
            this.touchEnabled = false;
            this.touchChildren = false;
            this._bg = new egret.Bitmap(RES.getRes(bgurl));
            this.addChild(this._bg);
            this._mask = new egret.Shape();
            this.addChild(this._mask);
            this.mask = this._mask;
            this.setProgress(0);
        };
        p.setProgress = function (prog) {
            if (prog > 1 || prog <= 0) {
                return;
            }
            var bgwidth = this._bg.width;
            var bgheight = this._bg.height;
            var angle = Math.ceil(360 * prog);
            this.DrawSector(this._mask, bgwidth / 2, bgheight / 2, bgwidth / 2, angle, -90);
        };
        p.DrawSector = function (mc, x, y, r, angle, startFrom) {
            if (x === void 0) { x = 200; }
            if (y === void 0) { y = 200; }
            if (r === void 0) { r = 100; }
            if (angle === void 0) { angle = -90; }
            if (startFrom === void 0) { startFrom = -90; }
            mc.graphics.clear();
            //var colorArr:Array<number>=[color1,color2];
            //var alphaArr:Array<number>=[255,255];
            //var ratioArr:Array<number>=[0,255];
            //var matrix:egret.Matrix=new egret.Matrix()
            //matrix.createGradientBox (50,50,Math.PI / 2,0,0) //在这里设置填充的宽高
            //mc.graphics.beginGradientFill(egret.GradientType.LINEAR,colorArr,alphaArr,ratioArr,matrix);   //remove this line to unfill the sector
            mc.graphics.beginFill(0x000000);
            //mc.graphics.lineStyle(0,0xff0000);
            mc.graphics.moveTo(x, y);
            angle = (Math.abs(angle) > 360) ? 360 : angle;
            var n = Math.ceil(Math.abs(angle) / 45);
            var angleA = angle / n;
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
            mc.graphics.endFill(); // if you want a sector without filling color , please remove this line.
        };
        p.Release = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return CircleLoading;
    })(egret.Sprite);
    scene.CircleLoading = CircleLoading;
    egret.registerClass(CircleLoading,"scene.CircleLoading",["IRelease"]);
})(scene || (scene = {}));
