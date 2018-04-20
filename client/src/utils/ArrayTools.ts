/*
 *
 * @author
 *
 */
class ArrayTools {
    public constructor() {
    }


    //随机打乱数组
    public static RandomSort(list:any):void {
        list.sort(function () {
            return Math.random() - 0.5;
        });
    }

    //数组排序
    public static Sort(list:any):void {
        list.sort(function (a, b) {
            return a - b
        });
    }
}