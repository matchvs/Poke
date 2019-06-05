class DisplayObjectPool {
	public constructor() {
	}
	private pool: Array<any> = [];
	public get(creater: Function):any {
		for (var i = 0; i < this.pool.length; i++) {
			if (this.pool[i].state === 0) {
				var o = creater(this.pool[i]);
				return o;
			}
		}

		var ne = creater();
		this.pool.unshift(ne);
		return ne;
	}
	public getAll(): Array<any> {
		return this.pool;
	}
	public destory(o, destoryer: Function) {
		if (o == null) {
			console.warn("[WARN] NullPointException: Can`t destory null ");
			return;
		}
		for (var i = 0; i < this.pool.length; i++) {
			if (this.pool[i] === o) {
				destoryer(this.pool[i]);
				this.pool[i].state = 0;
				return true;
			}
		}
		console.warn("[WARN] Not found the object from pool:" + JSON.stringify(o));
		return false;
	}
	public destoryAll(destoryer: Function) {
		for (var i = 0; i < this.pool.length; i++) {
			this.pool[i].visible = false;
			destoryer(this.pool[i]);
		}
		this.pool = [];
	}
	public getItemByName(name: string): any {
		for (var i = 0; i < this.pool.length; i++) {
			if (this.pool[i].name === name) {
				return this.pool[i];
			}
		}
	}
}