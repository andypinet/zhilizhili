export default function(superClass) {
		extend(systemView, superClass);

		function systemView(elm) {
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			systemView.__super__.constructor.call(this, elm);
			this._system;
		}

		systemView.prototype.addStage = function() {
			systemView.__super__.addStage.call(this);
			this._system = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.SYSTEM + "system.png", root.MY.app.conf.IMG_RETINA);
			return this._container.unshiftChild(this._system);
		};

		systemView.prototype.dispose2 = function() {
			if (this._system != null) {
				this._system.dispose();
				this._system = null;
			}
			return systemView.__super__.dispose2.call(this);
		};

		systemView.prototype.resize = function(w, h) {
			return systemView.__super__.resize.call(this, w, h);
		};

		return systemView;

	}