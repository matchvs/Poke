var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 *
 * @author
 *
 */
var ArrayTools = (function () {
    function ArrayTools() {
    }
    //随机打乱数组
    ArrayTools.RandomSort = function (list) {
        list.sort(function () {
            return Math.random() - 0.5;
        });
    };
    //数组排序
    ArrayTools.Sort = function (list) {
        list.sort(function (a, b) {
            return a - b;
        });
    };
    return ArrayTools;
}());
__reflect(ArrayTools.prototype, "ArrayTools");
//# sourceMappingURL=ArrayTools.js.map