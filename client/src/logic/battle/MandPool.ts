class MandPool {
	/**
     *
     */
    private static s_dict:Object = {};

    public static getInsByParm(cT:any,parm1:any):any
    {
        if ( cT != null ) {
            var strT:any = egret.getQualifiedClassName(cT);
            var arr:any[] = this.s_dict[strT];
            if (null == arr) {
                arr = [];
                this.s_dict[strT] = arr;
            }
            if ( arr.length > 0 ) {
                var i:number=0;
                var len:number=arr.length;
                for(i=len-1;i>=0;i--)
                {
                    var temp:any=arr[i];
                    if(temp&&temp["paramflag"]==parm1)
                    {
                        arr.splice(i,1);
                        return temp;
                    }
                }
            }
            var rtemp:any=new cT(parm1);
            rtemp["paramflag"]=parm1;
            return rtemp;

        }
        return null;
    }
    /**
     * 获取一个实例，可能是新创建的，也可能是旧的
     */
    public static getIns(cT:any,parm1:any=null):any
    {
        if ( cT != null ) {
            var strT:any = egret.getQualifiedClassName(cT);
            var arr:any[] = this.s_dict[strT];
            if (null == arr) {
                arr = [];
                this.s_dict[strT] = arr;
            }
            if ( arr.length > 0 ) {
                var obIns:any = arr.pop();
                if ( obIns["onCheckout"] )
                {
                    obIns.onCheckout();
                }
                return obIns;
            }
            else{
                var rtemp:any=new cT(parm1);
                rtemp["paramflag"]=parm1;
                return rtemp;
            }
        }
        return null;
    }

    /**
     * 退还Object
     */
    public static remand(obj:any):void
    {
        if ( obj != null ){
            var strT:any = egret.getQualifiedClassName(obj);
            var arr:any[] = this.s_dict[strT];
            if ( arr != null ){
                arr.push(obj);
                if ( obj["onRemand"] )
                {
                    console.log("MandPool.remand(this);");
                    obj.onRemand();
                }
            }
            /*以上为对象不为空的处理
            */
        }
    }
    /**
     *
     */
    public static getCount(cT:any):number
    {
        var arr:any[] = this.s_dict[cT];
        if ( arr != null )return arr.length;
        return 0;
    }
}