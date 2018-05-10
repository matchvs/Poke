/*
 *
 * @author
 *
 */
class ViewTools {
    public constructor() {
    }

    /**
     * 根据全角半角获取字符串长度,中文2,英文1
     * **/
    public static ASCLength(format: string): number {
        var len = format.length;
        var count = 0;
        var hcount = 0;
        for (var i: number = 0; i < len; i++) {
            var cc: number = format.charCodeAt(i);
            if (cc > 31 && cc < 127) {
                hcount += 1;
            }
            else {
                count += 1;
            }
        }
        return count + Math.ceil(hcount / 2);
    }

    public static ReduceStr(format: string, mlen: number): string {
        var len = format.length;
        var count = 0;
        var hcount = 0;
        for (var i: number = 0; i < len; i++) {
            var cc: number = format.charCodeAt(i);
            if (cc > 31 && cc < 127) {
                hcount += 1;
            }
            else {
                count += 1;
            }
            var acount: number = count + Math.ceil(hcount / 2);
            if (acount > mlen) {
                return format.slice(0, i);
            }
        }
        return format;
    }

    static isShake: boolean = false;
    public static shake(dis: egret.DisplayObject, times: number = 2, offset: number = 3, speed: number = 32): void {
        if (ViewTools.isShake) {
            return;
        }
        ViewTools.isShake = true;
        var point: egret.Point = new egret.Point(dis.x, dis.y);
        var offsetXYArray: any = [0, 0];
        var num: number = 0;
        var u: number = setInterval(function (): void {
            offsetXYArray[num % 2] = (num++) % 4 < 2 ? 0 : offset;
            if (num > (times * 4 + 1)) {
                clearInterval(u);
                num = 0;
                ViewTools.isShake = false;
            }
            dis.x = offsetXYArray[0] + point.x;
            //dis.y = offsetXYArray[1] + point.y;
        }, speed);
    }

    //图片遮罩另一个图
    public static displayObjectMask(sourceDisplayObject: egret.DisplayObject, maskDisplayObject: egret.DisplayObject, renderTexture?: egret.RenderTexture): egret.Texture {
        var texture: egret.RenderTexture = renderTexture || new egret.RenderTexture();
        var sourceParent: egret.DisplayObjectContainer = sourceDisplayObject.parent;
        var container: egret.DisplayObjectContainer;
        if (sourceDisplayObject instanceof egret.DisplayObjectContainer) {
        } else {
            container = new egret.DisplayObjectContainer();
            maskDisplayObject.width = sourceDisplayObject.width;
            maskDisplayObject.height = sourceDisplayObject.height;
            container.addChild(sourceDisplayObject);
            container.addChild(maskDisplayObject);
            maskDisplayObject.blendMode = egret.BlendMode.ERASE
            var sx: number = sourceDisplayObject.x;
            var sy: number = sourceDisplayObject.y;
            var mx: number = maskDisplayObject.x;
            var my: number = maskDisplayObject.y;
            texture.drawToTexture(container, new egret.Rectangle(mx, my, maskDisplayObject.width, maskDisplayObject.height));
            texture.$offsetX = -sx + mx;
            texture.$offsetY = -sy + my;
            if (sourceParent) sourceParent.addChild(sourceDisplayObject);
            maskDisplayObject.blendMode = egret.BlendMode.NORMAL;
            if (container == maskDisplayObject.parent) container.removeChild(maskDisplayObject);
        }
        return texture;
    }
}
