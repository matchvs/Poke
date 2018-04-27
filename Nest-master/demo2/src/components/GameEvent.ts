/**
 *
 * @author 
 *
 */
class GameEvent extends egret.Event{
    
    public static LOGIN_IN_SUCCESS: string = "loginInSuccess";

    public static LOGIN_OUT_SUCCESS: string = "loginOutSuccess";


	public constructor(type:string) {
        super(type,true);
	}
}
