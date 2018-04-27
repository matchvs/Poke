class Log {
    

    public static toArray(argument) {
        var args = [];
        for (var i = 0; i < argument.length; i++) {
            args.push(argument[i]);
        }
        return args;
    }
    public static getNowFormatDate() {
        var date = new Date();
        var ___ = "-";
        var __ = ":";
        var month:any = date.getMonth() + 1;
        var strDate:any = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentDate = "[" + date.getFullYear() + ___ + month
            + ___ + strDate + " " + date.getHours() + __
            + date.getMinutes() + __ + date.getSeconds() + "."
            + date.getMilliseconds() + "]";
        return currentDate;
    }

    public static i(msg:any) {
        var loc = "";
        try {
            throw new Error();
        } catch (e) {
            // alert("Stack:" + e.stack);
            var line = e.stack.split(/\n/)[2];
            loc = line.slice(line.lastIndexOf("/"), line.lastIndexOf(")"));
        }
        console.log(this.getNowFormatDate() + "[INFO](" + loc + ") " + this.toArray(arguments));
    }

}