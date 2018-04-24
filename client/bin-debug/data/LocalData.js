var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    //本地存储数据
    var LocalData = (function () {
        function LocalData() {
            this.SoundBG_Volume = 1;
            this.SoundMusic_Volume = 1;
            this.RecordObj = {};
        }
        LocalData.prototype.InitThis = function (obj) {
            for (var i in obj) {
                if (this.hasOwnProperty(i)) {
                    this[i] = obj[i];
                }
            }
        };
        LocalData.prototype.Clone = function () {
            var obj = {};
            obj.SoundBG_Volume = this.SoundBG_Volume;
            obj.SoundMusic_Volume = this.SoundMusic_Volume;
            obj.RecordObj = this.RecordObj;
            return obj;
        };
        return LocalData;
    }());
    data.LocalData = LocalData;
    __reflect(LocalData.prototype, "data.LocalData");
})(data || (data = {}));
//# sourceMappingURL=LocalData.js.map