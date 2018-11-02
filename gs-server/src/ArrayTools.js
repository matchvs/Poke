const crypto = require('crypto');

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

    static GetRandomNum(Min, Max) {
        let Range = Max - Min;
        let Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    } 

    //数组排序
    static Sort(list) {
        list.sort(function (a, b) {
            return a - b
        });
    };

    /**
     * md5加密
     * @param {string} content 
     */
    static md5Encode(content){
        let md5 = crypto.createHash("md5");
        md5.update(content);
        return md5.digest('hex');
    }
}

module.exports = ArrayTools;