export default function(superClass) {
		extend(topView, superClass);

		function topView() {
			this._eClickStart = bind(this._eClickStart, this);
			this.showUi = bind(this.showUi, this);
			this.hide = bind(this.hide, this);
			this.dispose = bind(this.dispose, this);
			this.start = bind(this.start, this);
			topView.__super__.constructor.call(this);
			this._ui;
			this._bg;
			this.onClickStart;
		}

		topView.prototype.start = function() {
			topView.__super__.start.call(this);
			this._ui = new root.MY_CLASS.topUiView($("#top"));
			this._ui.setup();
			this._ui.onClickStart = this._eClickStart;
			this.showUi();
			this._bg = new root.MY_CLASS.topBgView();
			return this._bg.start();
		};

		topView.prototype.dispose = function() {
			if (this._bg != null) {
				this._bg.dispose();
				this._bg = null;
			}
			if (this._ui != null) {
				this._ui.dispose();
				this._ui = null;
			}
			this.onClickStart = null;
			return topView.__super__.dispose.call(this);
		};

		topView.prototype.hide = function() {
			this._ui.hide();
			return this._bg.hide();
		};

		topView.prototype.showUi = function() {
			return this._ui.show(true, [200, 200][this._device]);
		};

		topView.prototype._eClickStart = function() {
			if (this.onClickStart != null) {
				return this.onClickStart();
			}
		};

		return topView;

	}