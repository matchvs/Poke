var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PokeMatchvsRep = (function () {
    function PokeMatchvsRep() {
        /**
         * 引擎初始化回调
         */
        this.initResponse = function (status) {
            if (status === 200) {
                // windowui.LoadingInst.Instance.SetText("初始化成功");
                this.engine.registerUser();
            }
            else {
                egret.log("初始化失败，错误码" + status);
            }
        };
        this.registerUserResponse = function (status) {
        };
        var response = new MatchvsResponse();
        response.initResponse = this.initResponse.bind(this);
        response.registerUserResponse = this.registerUserResponse.bind(this);
    }
    return PokeMatchvsRep;
}());
__reflect(PokeMatchvsRep.prototype, "PokeMatchvsRep");
//# sourceMappingURL=PokeMatchvsRep.js.map