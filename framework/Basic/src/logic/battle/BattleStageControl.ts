module battle {
	export class BattleStageControl {

		private _stage:BattleStageUI = null;
		public _playerList = new Array<Player>(); //用户列表
    	public _cardControl = new CardControl();  //牌控制
		public myOwner = new Player();
		private _landlordList = [];
		private _playerHeader_left:PlayerHead = null;		//上家
		private _playerHeader_right:PlayerHead = null;		//下家
    


		public constructor(stage:BattleStageUI) {
			this._stage = stage;
		}

		//设置底牌
		set landLordList(arr:Array<number>){
			this._landlordList = arr;
		}

		/**
		 * 添加用户
		 * @param {GUser} user
		 */
		public addPlayer(user:GUser){
			if(user){
				let player = new Player();
				player.avator = user.avator;
				player.nickName = user.nickName;
				player.userID = user.userID;
				player.pointValue = user.pointValue;
				player.rank = user.rank;
				this._playerList.push(player);
				this.SetPlayerHead(player);
			}
		}

		/**
		 * 给用户添加假数据
		 */
		public explameAddPlayer(){
			let player1 = new battle.Player();
			player1.avator = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526393669326&di=835161a2290b3b6ae1740bd39eb52f3e&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201609%2F16%2F20160916214658_UcHjJ.jpeg";
			player1.nickName = "微微";
			player1.pointValue = 10002;
			player1.userID = 85642;
			player1.cardList = [210,420,214,403,103,310,304,106,303,212,205,414,203,109,999,998,307];
			player1.seatNo = 1;
			player1.LocalTableId = 3;


			let player2 = new battle.Player();
			player2.avator = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=913343495,873855432&fm=27&gp=0.jpg";
			player2.nickName = "小妞";
			player2.pointValue = 534;
			player2.userID = 75646;
			player2.seatNo = 2;
			player2.LocalTableId = 1;
			player2.cardList = [411,306,120,311,105,207,206,112,412,208,114,313,213,409,314,320,404];

			let player3 = new battle.Player();
			player3.avator = "https://img2.woyaogexing.com/2018/05/15/2bf1c62d1b036564!400x400_big.jpg";
			player3.nickName = "子琪";
			player3.pointValue = 6534;
			player3.userID = 96648;
			player3.seatNo = 3;
			player3.LocalTableId = 2;
			player3.cardList = [408,308,406,204,113,305,107,211,110,413,220,312,104,111,405,209,108];

			this._playerList = [];
			this._playerList.push(player1);
			this._playerList.push(player2);
			this._playerList.push(player3);
			this._landlordList = [309,407,410];
		}

		public init(){
			this.explameAddPlayer();
			this._playerHeader_left = new battle.PlayerHead();
			this._playerHeader_right = new battle.PlayerHead();
			// this._playerHeader_left.Release();
			// this._playerHeader_left.Init(this._playerList[2]);
			// this._stage._battleSprite.addChild(this._playerHeader_left);
			this.SetPlayerHead(this._playerList[1],true);
			this.SetPlayerHead(this._playerList[2],true);
		}



		/**
		 * 显示对手玩家的头像
		 */
		public SetPlayerHead(p: Player, isin: boolean = false){
			if (p == null) {
                return;
            }
			//判断上下家 我
			if(p.userID == GlobalData.myUser.userID){
				return;
			}

			let localid = "left";
			if(p.LocalTableId == 2){
				localid = "right";
			}
			console.log("_playerHeader_",this["_playerHeader_" + localid]);
            (<PlayerHead>this["_playerHeader_" + localid]).Release();
            (<PlayerHead>this["_playerHeader_" + localid]).Init(p);
            this._stage._battleSprite.addChildAt((<PlayerHead>this["_playerHeader_" + localid]), 0);
            (<PlayerHead>this["_playerHeader_" + localid]).Ready = p.IsReady;
            (<PlayerHead>this["_playerHeader_" + localid]).UpdateCardNum();
            (<PlayerHead>this["_playerHeader_" + localid]).LandFlagVisible(false, false);
            if (p.LocalTableId == 1) {
                this._playerHeader_left.x = 65;
                this._playerHeader_left.y = 190;
            }
            else if (p.LocalTableId == 2) {
                this._playerHeader_right.x = 475;
                this._playerHeader_right.y = 190;
            }

            if (isin && p.LocalTableId != 3) {
                var ph: PlayerHead = (<PlayerHead>this["_playerHeader_" + localid]);
                if (ph) {
                    egret.Tween.removeTweens(ph);
                    var tx: number = ph.x;
                    var fx: number = 0;
                    if (p.LocalTableId == 1) {
                        fx = tx - 300;
                    }
                    else if (p.LocalTableId == 2) {
                        fx = tx + 300;
                    }
                    ph.x = fx;
                    egret.Tween.get(ph).to({ x: tx }, 600);
                }
            }
		}
	}
}