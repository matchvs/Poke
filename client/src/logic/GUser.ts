
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

		/**
	 * 给用户添加假数据
	 */
	public static explameAddPlayer():Array<GUser>{
		let player1 = new GUser();
		player1.avator = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526393669326&di=835161a2290b3b6ae1740bd39eb52f3e&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201609%2F16%2F20160916214658_UcHjJ.jpeg";
		player1.nickName = "微微";
		player1.pointValue = 10002;
		player1.userID = 85642;
		
		
		let player2 = new GUser();
		player2.avator = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=913343495,873855432&fm=27&gp=0.jpg";
		player2.nickName = "小妞";
		player2.pointValue = 534;
		player2.userID = 75646;

		let player3 = new GUser();
		player3.avator = "https://img2.woyaogexing.com/2018/05/15/2bf1c62d1b036564!400x400_big.jpg";
		player3.nickName = "子琪";
		player3.pointValue = 6534;
		player3.userID = 96648;

		GlobalData.myUser = player1;
		let userlist = [];
		userlist.push(player1);
		userlist.push(player2);
		userlist.push(player3);
		return userlist;
	}
}