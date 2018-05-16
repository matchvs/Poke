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
/**
 * Created by Administrator on 2015/12/29.
 */
var battle;
(function (battle) {
    var PlayerInfo = (function (_super) {
        __extends(PlayerInfo, _super);
        function PlayerInfo() {
            var _this = _super.call(this) || this;
            _this._scoretxt = null;
            _this._cointxt = null;
            _this._player = null;
            _this._jifen = "积分: ";
            return _this;
        }
        PlayerInfo.prototype.ReSet = function () {
            this._scoretxt.text = this._jifen + this._player.pointValue;
        };
        PlayerInfo.prototype.Init = function (pld) {
            // if(data.GameData.flag==data.GameData.GameFlag_Activity)
            // {
            //     this._jifen="积分: ";
            //     this._jinbi="比赛积分: ";
            // }
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
            nametxt.text = pld.nickName;
            var scoretxt = new egret.TextField();
            scoretxt.textColor = 0x804813;
            scoretxt.textAlign = egret.HorizontalAlign.LEFT;
            scoretxt.size = 24;
            scoretxt.x = 25;
            scoretxt.y = 70;
            scoretxt.width = 170;
            scoretxt.text = this._jifen + pld.pointValue;
            this._scoretxt = scoretxt;
            var cointxt = new egret.TextField();
            cointxt.textColor = 0x804813;
            cointxt.textAlign = egret.HorizontalAlign.LEFT;
            cointxt.size = 24;
            cointxt.x = 25;
            cointxt.y = 100;
            cointxt.width = 170;
            // cointxt.text = this._jinbi + pld.money;
            this._cointxt = cointxt;
            // if(data.GameData.flag==data.GameData.GameFlag_Activity)
            // {
            //     cointxt.y = 70;
            //     bg.height=120;
            //     this.addChild(cointxt);
            // }
            // else
            // {
            this.addChild(scoretxt);
            // this.addChild(cointxt);
            // }
        };
        return PlayerInfo;
    }(egret.Sprite));
    battle.PlayerInfo = PlayerInfo;
    __reflect(PlayerInfo.prototype, "battle.PlayerInfo");
})(battle || (battle = {}));
//# sourceMappingURL=PlayerInfo.js.map