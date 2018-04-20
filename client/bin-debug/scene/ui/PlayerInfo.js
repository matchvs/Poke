/**
 * Created by Administrator on 2015/12/29.
 */
var scene;
(function (scene) {
    var PlayerInfo = (function (_super) {
        __extends(PlayerInfo, _super);
        function PlayerInfo() {
            _super.call(this);
            this._scoretxt = null;
            this._cointxt = null;
            this._player = null;
            this._jifen = "积分: ";
            this._jinbi = "金币: ";
        }
        var d = __define,c=PlayerInfo;p=c.prototype;
        p.ReSet = function () {
            this._scoretxt.text = this._jifen + this._player.integral;
            this._cointxt.text = this._jinbi + this._player.money;
        };
        p.Init = function (pld) {
            if (data.GameData.flag == data.GameData.GameFlag_Activity) {
                this._jifen = "积分: ";
                this._jinbi = "比赛积分: ";
            }
            var bg = new egret.Bitmap(RES.getRes("ui_info_bg"));
            bg.scale9Grid = new egret.Rectangle(35, 75, 130, 60);
            this.addChild(bg);
            this._player = pld;
            var nametxt = new egret.TextField();
            nametxt.textColor = 0x804813;
            nametxt.textAlign = egret.HorizontalAlign.LEFT;
            nametxt.size = 24;
            this.addChild(nametxt);
            nametxt.x = 5;
            nametxt.y = 20;
            nametxt.width = 190;
            nametxt.text = pld.nickname;
            var scoretxt = new egret.TextField();
            scoretxt.textColor = 0x804813;
            scoretxt.textAlign = egret.HorizontalAlign.LEFT;
            scoretxt.size = 24;
            scoretxt.x = 25;
            scoretxt.y = 70;
            scoretxt.width = 170;
            scoretxt.text = this._jifen + pld.integral;
            this._scoretxt = scoretxt;
            var cointxt = new egret.TextField();
            cointxt.textColor = 0x804813;
            cointxt.textAlign = egret.HorizontalAlign.LEFT;
            cointxt.size = 24;
            cointxt.x = 25;
            cointxt.y = 100;
            cointxt.width = 170;
            cointxt.text = this._jinbi + pld.money;
            this._cointxt = cointxt;
            if (data.GameData.flag == data.GameData.GameFlag_Activity) {
                cointxt.y = 70;
                bg.height = 120;
                this.addChild(cointxt);
            }
            else {
                this.addChild(scoretxt);
                this.addChild(cointxt);
            }
        };
        return PlayerInfo;
    })(egret.Sprite);
    scene.PlayerInfo = PlayerInfo;
    egret.registerClass(PlayerInfo,"scene.PlayerInfo",["IInit"]);
})(scene || (scene = {}));
