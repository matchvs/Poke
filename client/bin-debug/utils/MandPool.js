/**
 * Created by andytang on 2015/4/17.
 */
var MandPool = (function () {
    function MandPool() {
    }
    var d = __define,c=MandPool;p=c.prototype;
    MandPool.getInsByParm = function (cT, parm1) {
        if (cT != null) {
            var strT = egret.getQualifiedClassName(cT);
            var arr = this.s_dict[strT];
            if (null == arr) {
                arr = [];
                this.s_dict[strT] = arr;
            }
            if (arr.length > 0) {
                var i = 0;
                var len = arr.length;
                for (i = len - 1; i >= 0; i--) {
                    var temp = arr[i];
                    if (temp && temp["paramflag"] == parm1) {
                        arr.splice(i, 1);
                        return temp;
                    }
                }
            }
            var rtemp = new cT(parm1);
            rtemp["paramflag"] = parm1;
            return rtemp;
        }
        return null;
    };
    /**
     * 获取一个实例，可能是新创建的，也可能是旧的
     */
    MandPool.getIns = function (cT, parm1) {
        if (parm1 === void 0) { parm1 = null; }
        if (cT != null) {
            var strT = egret.getQualifiedClassName(cT);
            var arr = this.s_dict[strT];
            if (null == arr) {
                arr = [];
                this.s_dict[strT] = arr;
            }
            if (arr.length > 0) {
                var obIns = arr.pop();
                if (obIns["onCheckout"]) {
                    obIns.onCheckout();
                }
                return obIns;
            }
            else {
                var rtemp = new cT(parm1);
                rtemp["paramflag"] = parm1;
                return rtemp;
            }
        }
        return null;
    };
    /**
     * 退还Object
     */
    MandPool.remand = function (obj) {
        if (obj != null) {
            var strT = egret.getQualifiedClassName(obj);
            var arr = this.s_dict[strT];
            if (arr != null) {
                arr.push(obj);
                if (obj["onRemand"]) {
                    obj.onRemand();
                }
            }
        }
    };
    /**
     *
     */
    MandPool.getCount = function (cT) {
        var arr = this.s_dict[cT];
        if (arr != null)
            return arr.length;
        return 0;
    };
    /**
     *
     */
    MandPool.s_dict = {};
    return MandPool;
})();
egret.registerClass(MandPool,"MandPool");
