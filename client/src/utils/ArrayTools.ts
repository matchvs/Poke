/*
 *
 * @author
 *
 */
class ArrayTools {
    public constructor() {
    }
    public static seed:number = 5;
    public static seededRandom = function (max, min) {
        max = max || 1;
        min = min || 0;
        this.seed = (this.seed * 9301 + 49297) % 233280;
        var rnd = this.seed / 233280.0;
        return min + rnd * (max - min);
    };

    //随机打乱数组
    public static RandomSort(list:any):void {
        list.sort(function () {
            return this.seededRandom;
        });
    }

    //数组排序
    public static Sort(list:any):void {
        list.sort(function (a, b) {
            return a - b
        });
    }
}