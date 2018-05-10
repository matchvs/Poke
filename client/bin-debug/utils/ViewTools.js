var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 *
 * @author
 *
 */
var ViewTools = (function () {
    function ViewTools() {
    }
    /**
     * 根据全角半角获取字符串长度,中文2,英文1
     * **/
    ViewTools.ASCLength = function (format) {
        var len = format.length;
        var count = 0;
        var hcount = 0;
        for (var i = 0; i < len; i++) {
            var cc = format.charCodeAt(i);
            if (cc > 31 && cc < 127) {
                hcount += 1;
            }
            else {
                count += 1;
            }
        }
        return count + Math.ceil(hcount / 2);
    };
    ViewTools.ReduceStr = function (format, mlen) {
        var len = format.length;
        var count = 0;
        var hcount = 0;
        for (var i = 0; i < len; i++) {
            var cc = format.charCodeAt(i);
            if (cc > 31 && cc < 127) {
                hcount += 1;
            }
            else {
                count += 1;
            }
            var acount = count + Math.ceil(hcount / 2);
            if (acount > mlen) {
                return format.slice(0, i);
            }
        }
        return format;
    };
    ViewTools.shake = function (dis, times, offset, speed) {
        if (times === void 0) { times = 2; }
        if (offset === void 0) { offset = 3; }
        if (speed === void 0) { speed = 32; }
        if (ViewTools.isShake) {
            return;
        }
        ViewTools.isShake = true;
        var point = new egret.Point(dis.x, dis.y);
        var offsetXYArray = [0, 0];
        var num = 0;
        var u = setInterval(function () {
            offsetXYArray[num % 2] = (num++) % 4 < 2 ? 0 : offset;
            if (num > (times * 4 + 1)) {
                clearInterval(u);
                num = 0;
                ViewTools.isShake = false;
            }
            dis.x = offsetXYArray[0] + point.x;
            //dis.y = offsetXYArray[1] + point.y;
        }, speed);
    };
    //图片遮罩另一个图
    ViewTools.displayObjectMask = function (sourceDisplayObject, maskDisplayObject, renderTexture) {
        var texture = renderTexture || new egret.RenderTexture();
        var sourceParent = sourceDisplayObject.parent;
        var container;
        if (sourceDisplayObject instanceof egret.DisplayObjectContainer) {
        }
        else {
            container = new egret.DisplayObjectContainer();
            maskDisplayObject.width = sourceDisplayObject.width;
            maskDisplayObject.height = sourceDisplayObject.height;
            container.addChild(sourceDisplayObject);
            container.addChild(maskDisplayObject);
            maskDisplayObject.blendMode = egret.BlendMode.ERASE;
            var sx = sourceDisplayObject.x;
            var sy = sourceDisplayObject.y;
            var mx = maskDisplayObject.x;
            var my = maskDisplayObject.y;
            texture.drawToTexture(container, new egret.Rectangle(mx, my, maskDisplayObject.width, maskDisplayObject.height));
            texture.$offsetX = -sx + mx;
            texture.$offsetY = -sy + my;
            if (sourceParent)
                sourceParent.addChild(sourceDisplayObject);
            maskDisplayObject.blendMode = egret.BlendMode.NORMAL;
            if (container == maskDisplayObject.parent)
                container.removeChild(maskDisplayObject);
        }
        return texture;
    };
    ViewTools.isShake = false;
    return ViewTools;
}());
__reflect(ViewTools.prototype, "ViewTools");
//# sourceMappingURL=ViewTools.js.map