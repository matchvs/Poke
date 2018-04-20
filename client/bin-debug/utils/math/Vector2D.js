var math;
(function (math) {
    var Vector2D = (function () {
        function Vector2D(x, y) {
            this._x = x;
            this._y = y;
        }
        var d = __define,c=Vector2D;p=c.prototype;
        //拷贝向量
        p.clone = function () {
            return new Vector2D(this._x, this._y);
        };
        //将当前向量变成0向量
        p.zero = function () {
            this._x = 0;
            this._y = 0;
            return this;
        };
        //判断是否是0向量
        p.isZero = function () {
            return this._x == 0 && this._y == 0;
        };
        d(p, "angle"
            //获取弧度
            ,function () {
                return Math.atan2(this._y, this._x);
            }
            /**
             *  设置角度
             * @param value {number}
             */
            ,function (value) {
                var len = length;
                this._x = Math.cos(value) * len;
                this._y = Math.sin(value) * len;
            }
        );
        d(p, "rotation"
            /**
             *获取角度
             * @returns {number}
             */
            ,function () {
                var cr = Math.atan2(this._y, this._x);
                return cr / Math.PI * 180;
            }
        );
        d(p, "length"
            //获取当前向量大小
            ,function () {
                return Math.sqrt(this.lengthSQ);
            }
            //设置向量的大小
            ,function (value) {
                var a = this.angle;
                this._x = Math.cos(a) * value;
                this._y = Math.sin(a) * value;
            }
        );
        d(p, "lengthSQ"
            //获取当前向量大小的平方
            ,function () {
                return this._x * this._x + this._y * this._y;
            }
        );
        //将当前向量转化成单位向量
        p.normalize = function () {
            if (length == 0) {
                this._x = 1;
                return this;
            }
            var len = length;
            this._x /= len;
            this._y /= len;
            return this;
        };
        //截取当前向量
        p.truncate = function (max) {
            length = Math.min(max, length);
            return this;
        };
        //反转向量
        p.reverse = function () {
            this._x = -this._x;
            this._y = -this._y;
            return this;
        };
        //判断当前向量是否是单位向量
        p.isNormalized = function () {
            return length == 1.0;
        };
        //向量积
        p.dotProd = function (v2) {
            return this._x * v2.x + this._y * v2.y;
        };
        //判断两向量是否垂直
        p.crossProd = function (v2) {
            return this._x * v2.y - this._y * v2.x == 0;
        };
        //返回两向量夹角的弦度值
        Vector2D.angleBetween = function (v1, v2) {
            if (!v1.isNormalized())
                v1 = v1.clone().normalize();
            if (!v2.isNormalized())
                v2 = v2.clone().normalize();
            return Math.acos(v1.dotProd(v2));
        };
        //返回向量的符号值
        p.sign = function (v2) {
            return this.perp.dotProd(v2) < 0 ? -1 : 1;
        };
        d(p, "perp"
            //返回坐标向量
            ,function () {
                return new Vector2D(-this.y, this.x);
            }
        );
        //返回当前向量与V2的距离
        p.dist = function (v2) {
            return Math.sqrt(this.distSQ(v2));
        };
        //返回当前向量与V2的距离的平方
        p.distSQ = function (v2) {
            var dx = v2.x - this.x;
            var dy = v2.y - this.y;
            return dx * dx + dy * dy;
        };
        //两向量相加
        p.add = function (v2) {
            return new Vector2D(this._x + v2.x, this._y + v2.y);
        };
        //两向量相减
        p.subtract = function (v2) {
            return new Vector2D(this._x - v2.x, this.y - v2.y);
        };
        //数与向量的乘积
        p.multiply = function (value) {
            return new Vector2D(this._x * value, this._y * value);
        };
        //数与向量的商
        p.divide = function (value) {
            return new Vector2D(this._x / value, this._y / value);
        };
        //判断两向量是否相等
        p.equals = function (v2) {
            return this._x == v2.x && this._y == v2.y;
        };
        Vector2D.gravityVector = function () {
            if (this._gravityVector == null) {
                this._gravityVector = new Vector2D(0, 9.8);
            }
            return this._gravityVector;
        };
        d(p, "x"
            ,function () {
                return this._x;
            }
            ,function (value) {
                this._x = value;
            }
        );
        d(p, "y"
            ,function () {
                return this._y;
            }
            ,function (value) {
                this._y = value;
            }
        );
        Vector2D._gravityVector = null;
        return Vector2D;
    })();
    math.Vector2D = Vector2D;
    egret.registerClass(Vector2D,"math.Vector2D");
})(math || (math = {}));
