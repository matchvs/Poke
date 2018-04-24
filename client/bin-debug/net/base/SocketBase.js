var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var net;
(function (net) {
    //使用第三方库 socket.io的时候用这个.
    var SocketBase = (function (_super) {
        __extends(SocketBase, _super);
        function SocketBase() {
            return _super.call(this) || this;
        }
        SocketBase.prototype.connet = function (url) {
            //创建 WebSocket 对象
            this._socket = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            this._socket.type = egret.WebSocket.TYPE_STRING;
            //添加收到数据侦听，收到数据会调用此方法
            this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //添加链接打开侦听，连接成功会调用此方法
            this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //添加异常侦听，出现异常会调用此方法
            this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            //连接服务器
            this._socket.connectByUrl("ws://" + url);
        };
        Object.defineProperty(SocketBase.prototype, "IsConnect", {
            get: function () {
                return this._socket.connected;
            },
            enumerable: true,
            configurable: true
        });
        SocketBase.prototype.sendDataByByte = function () {
            //创建 ByteArray 对象
            var byte = new egret.ByteArray();
            //写入字符串信息
            byte.writeUTF("Hello Egret WebSocket");
            //写入布尔值信息
            byte.writeBoolean(false);
            //写入int值信息
            byte.writeInt(123);
            byte.position = 0;
            //发送数据
            this._socket.writeBytes(byte, 0, byte.bytesAvailable);
        };
        SocketBase.prototype.sendDataByString = function (message) {
            //发送数据
            this._socket.writeUTF(message);
        };
        SocketBase.prototype.onSocketOpen = function () {
            this.dispatchEvent(new egret.Event(SocketBase.Event_Open));
        };
        SocketBase.prototype.onSocketClose = function () {
            this.dispatchEvent(new egret.Event(SocketBase.Event_Close));
        };
        SocketBase.prototype.onSocketError = function () {
            this.dispatchEvent(new egret.Event(SocketBase.Event_Error));
        };
        SocketBase.prototype.onReceiveMessage = function (e) {
            if (this._socket.type == egret.WebSocket.TYPE_BINARY) {
                //创建 ByteArray 对象
                var byte = new egret.ByteArray();
                //读取数据
                this._socket.readBytes(byte);
                //读取字符串信息
                var msg = byte.readUTF();
                //读取布尔值信息
                var boo = byte.readBoolean();
                //读取int值信息
                var num = byte.readInt();
                trace("SocketBase::onSocketClose->收到数据");
                trace("SocketBase::onSocketClose->" + "readUTF : " + msg);
                trace("SocketBase::onSocketClose->" + "readBoolean : " + boo.toString());
                trace("SocketBase::onSocketClose->" + "readInt : " + num.toString());
            }
            else if (this._socket.type == egret.WebSocket.TYPE_STRING) {
                var str = this._socket.readUTF();
                trace("SocketBase::onReceiveMessage->" + str);
                NetMgr.Instance.OnMessage(str);
            }
        };
        SocketBase.prototype.Close = function () {
            if (this._socket == null) {
                return;
            }
            this._socket.close();
        };
        SocketBase.Event_Open = "Event_Open";
        SocketBase.Event_Close = "onSocketClose";
        SocketBase.Event_Error = "onSocketError";
        return SocketBase;
    }(egret.EventDispatcher));
    net.SocketBase = SocketBase;
    __reflect(SocketBase.prototype, "net.SocketBase");
})(net || (net = {}));
//# sourceMappingURL=SocketBase.js.map