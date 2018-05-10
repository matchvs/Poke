var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var net;
(function (net) {
    //使用第三方库 socket.io的时候用这个.
    var SocketIO = (function () {
        function SocketIO() {
        }
        SocketIO.prototype.connet = function (url) {
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
        SocketIO.prototype.onConnect = function () {
            this.SendMsg({ type: 'sit' });
        };
        SocketIO.prototype.SendMsg = function (obj) {
            this._socket.emit("message", obj);
        };
        SocketIO.prototype.onMsg = function (obj) {
            console.info(obj);
        };
        return SocketIO;
    }());
    net.SocketIO = SocketIO;
    __reflect(SocketIO.prototype, "net.SocketIO");
})(net || (net = {}));
//# sourceMappingURL=SocketIo.js.map