class Handler {

	private listenerMap: Object = {};
	private eventCacheQueue = [];
	private static instance = new Handler();
	public static getInstance(): Handler {
		return Handler.instance;
	}
	private callback(cb, data) {
		if (cb && cb.that) {
			cb.call(cb.that, data);
		} else {
			cb && cb(data);
		}
	}
	public receive(key: string, callback: Function) {
		console.debug(`[Handler] reg receiver %s `, key)
		if (!this.listenerMap[key]) {
			this.listenerMap[key] = [];
		}
		this.listenerMap[key].push(callback);
		for (var j = 0; j < this.eventCacheQueue.length; j++) {
			var ekey = this.eventCacheQueue[j].key;
			if (ekey == key) {
				// console.debug("found cache : %s , len: %d", key, this.eventCacheQueue.length);
				for (var i = 0; i < this.listenerMap[key].length; i++) {
					var cb = this.listenerMap[key][i];
					this.callback(cb, this.eventCacheQueue[j]);
				}
				this.eventCacheQueue.splice(j, 1);
				// console.debug("destroy cache : %s , len: %d", key, this.eventCacheQueue.length);
				j = 0;
			}
		}

	}

	public unReceive(key: string, callback?: Function) {
		if (!this.listenerMap[key]) return;
		if (callback) {
			for (var i = 0; i < this.listenerMap[key].length; i++) {
				if (this.listenerMap[key][i] == callback) {
					console.debug(`[Handler] remove Receiver with a callbck %s `, key)
					this.listenerMap[key].splice(i, 1)
				}
			}
		} else {
			console.debug(`[Handler] remove all Receiver at key: %s `, key)
			delete this.listenerMap[key];
		}

	}
	private pushCache(key: any, data?: any) {
		console.debug("push cache: %s->%s", key, data);
		this.eventCacheQueue.push({ key: key, data: data });
	}

	public dispatchEvent(key: any, data?: any) {
		if (!this.listenerMap[key]) {
			this.pushCache(key, data);
			return
		};
		var isNeedCache = true;
		for (var i = 0; i < this.listenerMap[key].length; i++) {
			if (this.listenerMap[key][i]) {
				console.debug(`dispatchEvent %s success`, key)
				this.callback(this.listenerMap[key][i], { type: key, data: data });
				isNeedCache = false;
			}
		}
		if (isNeedCache) {
			this.pushCache(key, data);
		}
	}
}