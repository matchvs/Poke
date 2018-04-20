var data;
(function (data) {
    //本地存储数据
    var LocalData = (function () {
        function LocalData() {
            this.SoundBG_Volume = 1;
            this.SoundMusic_Volume = 1;
            this.RecordObj = {};
        }
        var d = __define,c=LocalData;p=c.prototype;
        p.InitThis = function (obj) {
            for (var i in obj) {
                if (this.hasOwnProperty(i)) {
                    this[i] = obj[i];
                }
            }
        };
        p.Clone = function () {
            var obj = {};
            obj.SoundBG_Volume = this.SoundBG_Volume;
            obj.SoundMusic_Volume = this.SoundMusic_Volume;
            obj.RecordObj = this.RecordObj;
            return obj;
        };
        return LocalData;
    })();
    data.LocalData = LocalData;
    egret.registerClass(LocalData,"data.LocalData");
})(data || (data = {}));
