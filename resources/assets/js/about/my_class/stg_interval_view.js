export default function(superClass) {
		extend(stgIntervalView, superClass);

		function stgIntervalView() {
			this.hideTitle = bind(this.hideTitle, this);
			this.showTitle = bind(this.showTitle, this);
			this.hideNext = bind(this.hideNext, this);
			this.showNext = bind(this.showNext, this);
			this.hideClear = bind(this.hideClear, this);
			this.showClear = bind(this.showClear, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			stgIntervalView.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._clear;
			this._next;
			this._title;
		}

		stgIntervalView.prototype.addStage = function() {
			this._clear = new root.MY_CLASS.stgIntervalClearView();
			this.addChild(this._clear);
			this._next = new root.MY_CLASS.stgIntervalNextView();
			this.addChild(this._next);
			this._title = new root.MY_CLASS.stgIntervalTitleView();
			return this.addChild(this._title);
		};

		stgIntervalView.prototype.update = function() {};

		stgIntervalView.prototype.dispose2 = function() {};

		stgIntervalView.prototype.resize = function(w, h) {};

		stgIntervalView.prototype.showClear = function(clearStgNum) {
			return this._clear.show(clearStgNum);
		};

		stgIntervalView.prototype.hideClear = function() {
			return this._clear.hide();
		};

		stgIntervalView.prototype.showNext = function() {
			return this._next.show();
		};

		stgIntervalView.prototype.hideNext = function() {
			return this._next.hide();
		};

		stgIntervalView.prototype.showTitle = function(clearStgNum) {
			this._title.setStageNum(clearStgNum + 1);
			this._title.setTitle(clearStgNum);
			return this._title.show();
		};

		stgIntervalView.prototype.hideTitle = function() {
			return this._title.hide();
		};

		return stgIntervalView;

	}