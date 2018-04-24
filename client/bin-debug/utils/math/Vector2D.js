var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var math;
(function (math) {
    var Vector2D = (function () {
        function Vector2D(x, y) {
            this._x = x;
            this._y = y;
        }
        //拷贝向量
        Vector2D.prototype.clone = function () {
            return new Vector2D(this._x, this._y);
        };
        //将当前向量变成0向量
        Vector2D.prototype.zero = function () {
            this._x = 0;
            this._y = 0;
            return this;
        };
        //判断是否是0向量
        Vector2D.prototype.isZero = function () {
            return this._x == 0 && this._y == 0;
        };
        Object.defineProperty(Vector2D.prototype, "angle", {
            //获取弧度
            get: function () {
                return Math.atan2(this._y, this._x);
            },
            /**
             *  设置角度
             * @param value {number}
             */
            set: function (value) {
                var len = length;
                this._x = Math.cos(value) * len;
                this._y = Math.sin(value) * len;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2D.prototype, "rotation", {
            /**
             *获取角度
             * @returns {number}
             */
            get: function () {
                var cr = Math.atan2(this._y, this._x);
                return cr / Math.PI * 180;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2D.prototype, "length", {
            //获取当前向量大小
            get: function () {
                return Math.sqrt(this.lengthSQ);
            },
            //设置向量的大小
            set: function (value) {
                var a = this.angle;
                this._x = Math.cos(a) * value;
                this._y = Math.sin(a) * value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2D.prototype, "lengthSQ", {
            //获取当前向量大小的平方
            get: function () {
                return this._x * this._x + this._y * this._y;
            },
            enumerable: true,
            configurable: true
        });
        //将当前向量转化成单位向量
        Vector2D.prototype.normalize = function () {
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
        Vector2D.prototype.truncate = function (max) {
            length = Math.min(max, length);
            return this;
        };
        //反转向量
        Vector2D.prototype.reverse = function () {
            this._x = -this._x;
            this._y = -this._y;
            return this;
        };
        //判断当前向量是否是单位向量
        Vector2D.prototype.isNormalized = function () {
            return length == 1.0;
        };
        //向量积
        Vector2D.prototype.dotProd = function (v2) {
            return this._x * v2.x + this._y * v2.y;
        };
        //判断两向量是否垂直
        Vector2D.prototype.crossProd = function (v2) {
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
        Vector2D.prototype.sign = function (v2) {
            return this.perp.dotProd(v2) < 0 ? -1 : 1;
        };
        Object.defineProperty(Vector2D.prototype, "perp", {
            //返回坐标向量
            get: function () {
                return new Vector2D(-this.y, this.x);
            },
            enumerable: true,
            configurable: true
        });
        //返回当前向量与V2的距离
        Vector2D.prototype.dist = function (v2) {
            return Math.sqrt(this.distSQ(v2));
        };
        //返回当前向量与V2的距离的平方
        Vector2D.prototype.distSQ = function (v2) {
            var dx = v2.x - this.x;
            var dy = v2.y - this.y;
            return dx * dx + dy * dy;
        };
        //两向量相加
        Vector2D.prototype.add = function (v2) {
            return new Vector2D(this._x + v2.x, this._y + v2.y);
        };
        //两向量相减
        Vector2D.prototype.subtract = function (v2) {
            return new Vector2D(this._x - v2.x, this.y - v2.y);
        };
        //数与向量的乘积
        Vector2D.prototype.multiply = function (value) {
            return new Vector2D(this._x * value, this._y * value);
        };
        //数与向量的商
        Vector2D.prototype.divide = function (value) {
            return new Vector2D(this._x / value, this._y / value);
        };
        //判断两向量是否相等
        Vector2D.prototype.equals = function (v2) {
            return this._x == v2.x && this._y == v2.y;
        };
        Vector2D.gravityVector = function () {
            if (this._gravityVector == null) {
                this._gravityVector = new Vector2D(0, 9.8);
            }
            return this._gravityVector;
        };
        Object.defineProperty(Vector2D.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2D.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });
        Vector2D._gravityVector = null;
        return Vector2D;
    }());
    math.Vector2D = Vector2D;
    __reflect(Vector2D.prototype, "math.Vector2D");
})(math || (math = {}));
//# sourceMappingURL=Vector2D.js.map