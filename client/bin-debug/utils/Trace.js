/**
 * Created by Administrator on 2015/12/14.
 */
//class Trace
//{
function trace(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    console.log(message, optionalParams);
    //Main.textlog.text+="\n"+message;
}
function traceAndAlert(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    alert(message);
    console.log(message, optionalParams);
}
//} 
//# sourceMappingURL=Trace.js.map