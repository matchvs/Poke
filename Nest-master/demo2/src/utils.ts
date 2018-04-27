/**
 * Created by yjtx on 15-10-19.
 */
module utils {
    export var UIStage: egret.gui.UIStage;

    export function init(stage:egret.gui.UIStage){
        UIStage = stage;

        UIStage.addEventListener(GameEvent.LOGIN_IN_SUCCESS, onLoginInSuccess, this);
        UIStage.addEventListener(GameEvent.LOGIN_OUT_SUCCESS, onLoginOutSuccess, this);
    }

    export function changeView(view:egret.gui.UIComponent){
        UIStage.removeAllElements();
        UIStage.addElement(view);
    }

    export function addLog(msg:string):void {

    }

    function onLoginInSuccess(e:GameEvent):void {
        changeView(new GameView());
    }

    function onLoginOutSuccess(e:GameEvent):void {
        changeView(new LoginView());
    }
}