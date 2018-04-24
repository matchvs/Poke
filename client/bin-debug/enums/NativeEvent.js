var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Administrator on 2016/1/1.
 */
var enums;
(function (enums) {
    //原生通信事件
    var NativeEvent = (function () {
        function NativeEvent() {
        }
        NativeEvent.NATIVEEVENT_GETINITINFO = "NATIVEEVENT_GETINITINFO"; //获取信息成功
        return NativeEvent;
    }());
    enums.NativeEvent = NativeEvent;
    __reflect(NativeEvent.prototype, "enums.NativeEvent");
})(enums || (enums = {}));
//# sourceMappingURL=NativeEvent.js.map