var net;
(function (net) {
    //使用第三方库 socket.io的时候用这个.
    var SocketIO = (function () {
        function SocketIO() {
        }
        var d = __define,c=SocketIO;p=c.prototype;
        p.connet = function (url) {
            this._socket = window["io"].connect(url);
            console.info(this._socket);
            var _this = this;
            this._socket.on('connect', function () {
                _this.onConnect();
            });
            this._socket.on('push message', function (data) {
                _this.onMsg(data);
            });
        };
        p.onConnect = function () {
            this.SendMsg({ type: 'sit' });
        };
        p.SendMsg = function (obj) {
            this._socket.emit("message", obj);
        };
        p.onMsg = function (obj) {
            console.info(obj);
        };
        return SocketIO;
    })();
    net.SocketIO = SocketIO;
    egret.registerClass(SocketIO,"net.SocketIO");
})(net || (net = {}));
