export default function() {
		function myView() {
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			this._scene;
			this._camera;
			this._parameter;
			this._interaction;
			this._audio;
			this._u = root.MY.myfw.util;
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this._device = this._isSmt ? 1 : 0;
			this._conf = root.MY.app.conf;
		}

		myView.prototype.start = function() {
			this._scene = root.MY.gl.scene;
			this._camera = root.MY.gl.camera;
			this._parameter = root.MY.gl.parameter;
			this._interaction = root.MY.gl.interaction;
			this._audio = root.MY.gl.audio;
			this._data = root.MY.gl.data;
			this._game = root.MY.gl.game;
			return root.MY.myfw.addUpdate(this.update);
		};

		myView.prototype.update = function() {};

		myView.prototype.dispose = function() {
			root.MY.myfw.delUpdate(this.update);
			this._scene = null;
			this._camera = null;
			this._parameter = null;
			this._interaction = null;
			this._game = null;
			this._data = null;
			this._audio = null;
			this._u = null;
			return this._conf = null;
		};

		return myView;

	}