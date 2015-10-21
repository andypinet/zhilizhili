export default function() {
		function delayCall() {
			this.watchStart = bind(this.watchStart, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			this._cnt = 0;
			this._cntMax = 0;
			this._isWatch = false;
			this.onComplete;
		}

		delayCall.prototype.start = function() {
			return root.MY.myfw.addUpdate(this.update);
		};

		delayCall.prototype.update = function() {
			if (this._isWatch) {
				if (++this._cnt > this._cntMax) {
					if (this.onComplete != null) {
						this.onComplete();
					}
					return this._isWatch = false;
				}
			}
		};

		delayCall.prototype.watchStart = function(d) {
			this._isWatch = true;
			this._cnt = 0;
			return this._cntMax = d;
		};

		return delayCall;

	}