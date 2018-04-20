module math
{
    export class Vector2D
    {
        private _x:number;
        private _y:number;


        constructor(x:number,y:number)
        {
            this._x = x;
            this._y = y;
        }

        //拷贝向量
        public clone():Vector2D{
            return new Vector2D(this._x,this._y);
        }

        //将当前向量变成0向量
        public zero():Vector2D{
            this._x=0;
            this._y=0;
            return this;
        }

        //判断是否是0向量
        public isZero():Boolean{
            return this._x==0 && this._y==0;
        }

        /**
         *  设置角度
         * @param value {number}
         */
        public set angle(value:number){
            var len:number=length;
            this._x=Math.cos(value)*len;
            this._y=Math.sin(value)*len;
        }

        /**
         *获取角度
         * @returns {number}
         */
        public get rotation():number{
            var cr:number=Math.atan2(this._y,this._x);
            return cr/Math.PI*180;
        }
        //获取弧度
        public get angle():number{
            return Math.atan2(this._y,this._x);
        }

        //设置向量的大小
        public set length(value:number){
            var a:number=this.angle;
            this._x=Math.cos(a)*value;
            this._y=Math.sin(a)*value;
        }

        //获取当前向量大小
        public get length():number{
            return Math.sqrt(this.lengthSQ);
        }

        //获取当前向量大小的平方
        public get lengthSQ():number{
            return this._x*this._x+this._y*this._y;
        }

        //将当前向量转化成单位向量
        public normalize():Vector2D{
            if(length==0){
                this._x=1;
                return this;
            }
            var len:number=length;
            this._x/=len;
            this._y/=len;
            return this;
        }

        //截取当前向量
        public truncate(max:number):Vector2D{
            length=Math.min(max,length);
            return this;
        }

        //反转向量
        public reverse():Vector2D{
            this._x=-this._x;
            this._y=-this._y;
            return this;
        }

        //判断当前向量是否是单位向量
        public isNormalized():Boolean{
            return length==1.0;
        }

        //向量积
        public dotProd(v2:Vector2D):number{
            return this._x*v2.x+this._y*v2.y;
        }

        //判断两向量是否垂直
        public crossProd(v2:Vector2D):boolean{
            return this._x*v2.y-this._y*v2.x == 0;
        }

        //返回两向量夹角的弦度值
        public static angleBetween(v1:Vector2D,v2:Vector2D):number{
        if(!v1.isNormalized()) v1=v1.clone().normalize();
        if(!v2.isNormalized()) v2=v2.clone().normalize();
        return Math.acos(v1.dotProd(v2));
    }

        //返回向量的符号值
        public sign(v2:Vector2D):number{
            return this.perp.dotProd(v2)<0?-1:1;
        }

        //返回坐标向量
        public get perp():Vector2D{
            return new Vector2D(-this.y,this.x);
    }

        //返回当前向量与V2的距离
        public dist(v2:Vector2D):number{
            return Math.sqrt(this.distSQ(v2));
        }

        //返回当前向量与V2的距离的平方
        public distSQ(v2:Vector2D):number{
            var dx:number=v2.x-this.x;
            var dy:number=v2.y-this.y;
            return dx*dx+dy*dy;
        }

        //两向量相加
        public add(v2:Vector2D):Vector2D{
            return new Vector2D(this._x+v2.x,this._y+v2.y);
        }

        //两向量相减
        public subtract(v2:Vector2D):Vector2D{
            return new Vector2D(this._x-v2.x,this.y-v2.y);
        }

        //数与向量的乘积
        public multiply(value:number):Vector2D{
            return new Vector2D(this._x*value,this._y*value);
        }
        //数与向量的商
        public divide(value:number):Vector2D{
            return new Vector2D(this._x/value,this._y/value);
        }

        //判断两向量是否相等
        public equals(v2:Vector2D):Boolean{
            return this._x==v2.x && this._y==v2.y;
        }

        private static _gravityVector:Vector2D=null;
        public static gravityVector():Vector2D
        {
            if(this._gravityVector==null)
            {
                this._gravityVector=new Vector2D(0,9.8);
            }
            return this._gravityVector;
        }


        public get x():number
        {
            return this._x;
        }

        public set x(value:number)
        {
            this._x = value;
        }

        public get y():number
        {
            return this._y;
        }

        public set y(value:number)
        {
            this._y = value;
        }
    }
}
