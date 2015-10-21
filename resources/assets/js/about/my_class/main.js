export default function() {
		function main() {
			this.log = bind(this.log, this);
			this.contents = bind(this.contents, this);
			this.start = bind(this.start, this);
			this._myfw;
			this.conf;
			this._contents;
		}

		main.prototype.start = function() {
			this._myfw = new root._LIBS.myfw({
				fps: 60
			});
			root.MY.myfw = this._myfw;
			this.conf = new root.MY_CLASS.conf();
			if (this.conf.TEST.STATS) {
				this._myfw.setStats();
			}
			root.MY.gl = {};
			this._contents = new root.MY_CLASS.contents();
			return this._contents.start();
		};

		main.prototype.contents = function() {
			return this._contents;
		};

		main.prototype.log = function() {
			var params;
			params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
			if (root.MY.app.conf.LOG) {
				if ((typeof console !== "undefined" && console !== null) && (console.log != null)) {
					return console.log.apply(console, params);
				}
			}
		};

		return main;

	}