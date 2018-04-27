/**
 *
 * @author 
 *
 */
class GameEvent extends egret.Event{
    
    public static LOGIN_SUCCESS: string = "loginSuccess";
    
	public constructor(type:string) {
        super(type,true);
	}
}
