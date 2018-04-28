/*
 *
 * @author
 *
 */
class ArrayTools {
    constructor() {
    };


    //随机打乱数组
    static RandomSort(list) {
        list.sort(function () {
            return Math.random() - 0.5;
        });
    };

    //数组排序
    static Sort(list) {
        list.sort(function (a, b) {
            return a - b
        });
    };
}

module.exports = ArrayTools;