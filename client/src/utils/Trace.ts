/**
 * Created by Administrator on 2015/12/14.
 */
//class Trace
//{
function trace(message?:any, ...optionalParams:any[]):void {
    console.log(message, optionalParams);
    //Main.textlog.text+="\n"+message;
}
function traceAndAlert(message?:any, ...optionalParams:any[]):void {
    alert(message);
    console.log(message, optionalParams);
}
//}