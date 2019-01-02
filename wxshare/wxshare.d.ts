declare class Wxmodel {
	getLaunchOptionsSync(): any;
	together(key:string,query:string):void;
	getWxUserInfo(callback:any):any;
	/**
	 *
	 * @param {any} callFun
	 * @param {Function} args.success
	 * @param {Function} args.fail
	 * @param {string} args.style.backgroundColor
	 * @param {string} args.style.color
	 * @param {string} args.style.imageUrl
	 * @param {any} args.style
	 */
	UserAuthorButton(args:any):void;

	/**
	 * @param {any} args {success:function(res),fail:function(res)}
	 */
	getUserOpenID(args):void;
	constructor();//构造函数
}