/*
 *
 * @author
 *
 */
class DateTimeTool {
    public constructor() {
    }


    //随机打乱数组 2016-12-12 10:30
    public static GetDateString(time:number):string {
        var date:any=new Date(time);
        var y=date.getFullYear();
        var mon=date.getMonth()+1;
        var d=date.getDate();
        var h=date.getHours();
        var m=date.getMinutes();
        var s=date.getSeconds();
        return y+"-"+mon+"-"+d+" "+h+":"+m;
    }

    //随机打乱数组 2016-12-12 10:30
    public static GetMinString(time:number):string {
        var min:number=Math.floor(time/1000/60);
        var sce:number=Math.floor(time/1000)%60;
        var minstr:string=""+min;
        var scestr:string=""+sce;
        if(min<10)
        {
            minstr="0"+min;
        }
        if(sce<10)
        {
            scestr="0"+sce;
        }
        return minstr+":"+scestr;
    }

}