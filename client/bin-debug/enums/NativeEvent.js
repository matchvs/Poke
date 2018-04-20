/**
 * Created by Administrator on 2016/1/1.
 */
var enums;
(function (enums) {
    //原生通信事件
    var NativeEvent = (function () {
        function NativeEvent() {
        }
        var d = __define,c=NativeEvent;p=c.prototype;
        NativeEvent.NATIVEEVENT_GETINITINFO = "NATIVEEVENT_GETINITINFO"; //获取信息成功
        return NativeEvent;
    })();
    enums.NativeEvent = NativeEvent;
    egret.registerClass(NativeEvent,"enums.NativeEvent");
})(enums || (enums = {}));
