module net {
    //使用第三方库 socket.io的时候用这个.
    export class SocketBase extends egret.EventDispatcher{
        public static Event_Open:string="Event_Open";
        public static Event_Close:string="onSocketClose";
        public static Event_Error:string="onSocketError";

        private _socket:egret.WebSocket;

        public  constructor() {
            super();
        }

        public connet(url:string) {
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
            this._socket.connectByUrl("ws://"+url);
        }

        public get IsConnect():boolean
        {
            return this._socket.connected;
        }
        private sendDataByByte():void {
            //创建 ByteArray 对象
            var byte:egret.ByteArray = new egret.ByteArray();
            //写入字符串信息
            byte.writeUTF("Hello Egret WebSocket");
            //写入布尔值信息
            byte.writeBoolean(false);
            //写入int值信息
            byte.writeInt(123);
            byte.position = 0;
            //发送数据
            this._socket.writeBytes(byte, 0, byte.bytesAvailable);
        }

        public sendDataByString(message:string):void {
            //发送数据
            this._socket.writeUTF(message);
        }

        private onSocketOpen():void {
            this.dispatchEvent(new egret.Event(SocketBase.Event_Open));
        }

        private onSocketClose():void {
            this.dispatchEvent(new egret.Event(SocketBase.Event_Close));
        }

        private onSocketError():void {
            this.dispatchEvent(new egret.Event(SocketBase.Event_Error));
        }

        private onReceiveMessage(e:egret.Event):void {
            if (this._socket.type == egret.WebSocket.TYPE_BINARY) {
                //创建 ByteArray 对象
                var byte:egret.ByteArray = new egret.ByteArray();
                //读取数据
                this._socket.readBytes(byte);
                //读取字符串信息
                var msg:string = byte.readUTF();
                //读取布尔值信息
                var boo:boolean = byte.readBoolean();
                //读取int值信息
                var num:number = byte.readInt();
                trace("SocketBase::onSocketClose->收到数据");
                trace("SocketBase::onSocketClose->" + "readUTF : " + msg);
                trace("SocketBase::onSocketClose->" + "readBoolean : " + boo.toString());
                trace("SocketBase::onSocketClose->" + "readInt : " + num.toString());
            }
            else if (this._socket.type == egret.WebSocket.TYPE_STRING) {
                var str:string = this._socket.readUTF();
                trace("SocketBase::onReceiveMessage->" + str);
                NetMgr.Instance.OnMessage(str);
            }
        }

        public Close():void
        {
            if(this._socket==null)
            {
                return;
            }
            this._socket.close();
        }

    }
}