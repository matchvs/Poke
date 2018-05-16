
class GUser {

	protected _nickName:string = "";
	protected _userID:number = 0;
    protected _token:string = "";
    protected _avator:string = "";
    protected _pointValue:number = 0;
    protected _rank:number = 0;


	public constructor() {
	}


	get nickName():string{
		return this._nickName;
	}
	set nickName(_name:string){
		this._nickName = _name;
	}

	get token():string{
		return this._token;
	}
	set token(tok:string){
		this._token = tok;
	}

	get avator():string{
		return this._avator;
	}
	set avator(ava:string){
		this._avator = ava;
	}

	get pointValue():number{
		return this._pointValue;
	}
	set pointValue(value:number){
		this._pointValue = value;
	}

	get rank():number{
		return this._rank;
	}
	set rank(rk:number){
		this._rank = rk;
	}

	get userID():number{
		return this._userID;
	}

	set userID(id:number){
		this._userID = id;
	}
}