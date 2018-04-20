/*
 *
 * @author
 *
 */
var ArrayTools = (function () {
    function ArrayTools() {
    }
    var d = __define,c=ArrayTools;p=c.prototype;
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
})();
egret.registerClass(ArrayTools,"ArrayTools");
