var root,
	bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	hasProp = {}.hasOwnProperty,
	slice = [].slice;

export { root, bind, extend, hasProp, slice };