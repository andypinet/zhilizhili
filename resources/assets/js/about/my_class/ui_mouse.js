export default function(superClass) {
		extend(uiMouse, superClass);

		function uiMouse() {
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			uiMouse.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._mouseImg;
			this._interaction;
		}

		uiMouse.prototype.addStage = function() {
			this._interaction = root.MY.gl.interaction;
			this._mouseImg = new root._LIBS.displayImage("./assets/img/mouse.png");
			return this.addChild(this._mouseImg);
		};

		uiMouse.prototype.update = function() {
			var mx, my;
			mx = this._interaction.mouse().x;
			my = this._interaction.mouse().y;
			this._mouseImg.translate(mx - this._mouseImg.width() * 0.5, my - this._mouseImg.height() * 0.5);
			return this._mouseImg.setTransform();
		};

		uiMouse.prototype.dispose2 = function() {};

		uiMouse.prototype.resize = function(w, h) {};

		return uiMouse;

	}