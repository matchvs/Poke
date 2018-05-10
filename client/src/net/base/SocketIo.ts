module net {

    //使用第三方库 socket.io的时候用这个.
    export class SocketIO {
        private _socket;

        public constructor() {

        }

        public connet(url:string) {
            this._socket = window["io"].connect(url);
            console.info(this._socket);
            var _this = this;
            this._socket.on('connect', function () {
                _this.onConnect();
            });
            this._socket.on('push message', function (data) {
                _this.onMsg(data);
            });
        }

        public onConnect() {
            this.SendMsg({type: 'sit'});
        }

        public SendMsg(obj:any) {
            this._socket.emit("message", obj)
        }

        public onMsg(obj:any) {
            console.info(obj);
        }

    }
}