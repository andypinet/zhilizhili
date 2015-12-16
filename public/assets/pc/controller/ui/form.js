(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2013 Andrea Giammarchi <spam@hater.me>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
*/
/*jslint browser: true, forin: true, plusplus: true, indent: 4 */
(function(Object, mixin) {
    "use strict"; // happy linter ^_____^

    /* <droppable> interesting code after line 110, here
     * ad-hoc polyfill section for this purpose only
     * never use these functions outside this closure ... like ...
ne*/var

        // borrowed methods for unknown Objects
        ObjectPrototype = Object.prototype,

        lookupGetter = ObjectPrototype.__lookupGetter__,
        lookupSetter = ObjectPrototype.__lookupSetter__,
        defineGetter = ObjectPrototype.__defineGetter__,
        defineSetter = ObjectPrototype.__defineSetter__,
        has          = ObjectPrototype.hasOwnProperty,

        emptyArray   = [],
        // slice        = emptyArray.slice,

        // for IE < 9 and non IE5 yet browsers
        goNative = true,
        defineProperty = (function(defineProperty){
          try{
            return defineProperty && defineProperty({},'_',{value:1})._ && defineProperty;
          } catch(IE8) {
            goNative = false;
          }
        }(Object.defineProperty)) ||
        function (o, k, d) {
            var
                get = d.get, // has.call(d, 'get') would be better but
                set = d.set; // ES5 is just like this
            if (get && defineGetter) {
                defineGetter.call(o, k, get);
            }
            if (set && defineSetter) {
                defineSetter.call(o, k, set);
            }
            if (!(get || set)) {
                o[k] = d.value;
            }
        },
        // for IE < 9 and non IE5 yet browsers
        getOwnPropertyNames = (goNative && Object.getOwnPropertyNames) ||
        (function () {
            var
                addHiddenOwnProperties = function (result) {
                    return result;
                },
                list = [],
                key,
                i,
                length;

            for (key in {valueOf: key}) {
                list.push(key);
            }

            if (!list.length) {
                length = list.push(
                    'constructor',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'toLocaleString',
                    'toString',
                    'valueOf'
                ) - 1;
                addHiddenOwnProperties = function (result, o) {
                    for (i = 0; i < length; i++) {
                        key = list[i];
                        if (has.call(o, key)) {
                            result.push(key);
                        }
                    }
                    return result;
                };
            }

            return function (o) {
                var
                    result = [],
                    key;
                for (key in o) {
                    if (has.call(o, key)) {
                        result.push(key);
                    }
                }
                return addHiddenOwnProperties(result, o);
            };
        }()),
        // IE < 9 or other non ES5 yet browsers
        getOwnPropertyDescriptor = (goNative && Object.getOwnPropertyDescriptor) ||
        function (o, k) {
            var
                descriptor = {
                    enumerable: true,
                    configurable: true
                },
                get = lookupGetter && lookupGetter.call(o, k),
                set = lookupSetter && lookupSetter.call(o, k);
            if (get) {
                descriptor.get = get;
            }
            if (set) {
                descriptor.set = set;
            }
            if (!(get || set)) {
                descriptor.writable = true;
                descriptor.value = o[k];
            }
            return descriptor;
        };
    // </droppable>

    // if already defined get out of here
    // this should be 
    // if (mixin in Object) return;
    // but for some reason I went for JSLint ... 
    if (Object[mixin]) {
        return;
    }
    // same descriptor as other spec'd methods
    defineProperty(
        Object,
        mixin,
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function (
                target, // object to enrich with
                source, // mixin object or Trait (Function)
                args    // optional arguments for Trait
            ) {
                var
                    i,
                    length,
                    keys,
                    key;

                if (typeof source === 'function') {
                    // if the source is a function
                    // it will be invoked with object as target
                    // this let us define mixin as closures
                    // function addFunctionality() {
                    //     this.functionality = function () {
                    //       // do amazing stuff
                    //     }
                    // }
                    // addFunctionality.call(Class.prototype);
                    // addFunctionality.call(genericObject);
                    // // or
                    // Object.mixin(Class.prototype, addFunctionality);

                    source.apply(target, args || emptyArray);
                    /*
                    // try to perform as fast as possible
                    if (arguments.length < 3) {
                        // so if no extra args are passed ...
                        source.call(target);
                    } else {
                        // there is no need to slice them as done here
                        source.apply(target, slice.call(arguments, 2));
                    }
                    */
                } else {
                    // if source is an object
                    // grab all possibe properties
                    // and per each of them ...
                    keys = getOwnPropertyNames(source);
                    length = keys.length;
                    i = 0;
                    while (i < length) {
                        key = keys[i++];
                        // ... define it ...
                        defineProperty(
                            target,
                            key,
                            // ... using the same descriptor
                            getOwnPropertyDescriptor(
                                source,
                                key
                            )
                        );
                    }
                }
                // always return the initial target
                // ignoring all possible different return with functions
                return target;
            }
        }
    );
}(Object, 'mixin'));
module.exports = Object.mixin;
},{}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = createStore;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsIsPlainObject = require('./utils/isPlainObject');

var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'
};

exports.ActionTypes = ActionTypes;
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [initialState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, initialState) {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = initialState;
  var listeners = [];
  var isDispatching = false;

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    listeners.push(listener);
    var isSubscribed = true;

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;
      var index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!_utilsIsPlainObject2['default'](action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    listeners.slice().forEach(function (listener) {
      return listener();
    });
    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  };
}
},{"./utils/isPlainObject":9}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _utilsCombineReducers = require('./utils/combineReducers');

var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

var _utilsBindActionCreators = require('./utils/bindActionCreators');

var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

var _utilsApplyMiddleware = require('./utils/applyMiddleware');

var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

var _utilsCompose = require('./utils/compose');

var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

exports.createStore = _createStore2['default'];
exports.combineReducers = _utilsCombineReducers2['default'];
exports.bindActionCreators = _utilsBindActionCreators2['default'];
exports.applyMiddleware = _utilsApplyMiddleware2['default'];
exports.compose = _utilsCompose2['default'];
},{"./createStore":3,"./utils/applyMiddleware":5,"./utils/bindActionCreators":6,"./utils/combineReducers":7,"./utils/compose":8}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (next) {
    return function (reducer, initialState) {
      var store = next(reducer, initialState);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

module.exports = exports['default'];
},{"./compose":8}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsMapValues = require('../utils/mapValues');

var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
    // eslint-disable-line no-eq-null
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
    return bindActionCreator(actionCreator, dispatch);
  });
}

module.exports = exports['default'];
},{"../utils/mapValues":10}],7:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createStore = require('../createStore');

var _utilsIsPlainObject = require('../utils/isPlainObject');

var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

var _utilsMapValues = require('../utils/mapValues');

var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

var _utilsPick = require('../utils/pick');

var _utilsPick2 = _interopRequireDefault(_utilsPick);

/* eslint-disable no-console */

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
  var reducerKeys = Object.keys(outputState);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!_utilsIsPlainObject2['default'](inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return reducerKeys.indexOf(key) < 0;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */

function combineReducers(reducers) {
  var finalReducers = _utilsPick2['default'](reducers, function (val) {
    return typeof val === 'function';
  });
  var sanityError;

  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  var defaultState = _utilsMapValues2['default'](finalReducers, function () {
    return undefined;
  });

  return function combination(state, action) {
    if (state === undefined) state = defaultState;

    if (sanityError) {
      throw sanityError;
    }

    var hasChanged = false;
    var finalState = _utilsMapValues2['default'](finalReducers, function (reducer, key) {
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      return nextStateForKey;
    });

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
      if (warningMessage) {
        console.error(warningMessage);
      }
    }

    return hasChanged ? finalState : state;
  };
}

module.exports = exports['default'];
}).call(this,require("wGbZKt"))
},{"../createStore":3,"../utils/isPlainObject":9,"../utils/mapValues":10,"../utils/pick":11,"wGbZKt":2}],8:[function(require,module,exports){
/**
 * Composes single-argument functions from right to left.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing functions from right to
 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
 */
"use strict";

exports.__esModule = true;
exports["default"] = compose;

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function (arg) {
    return funcs.reduceRight(function (composed, f) {
      return f(composed);
    }, arg);
  };
}

module.exports = exports["default"];
},{}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = isPlainObject;
var fnToString = function fnToString(fn) {
  return Function.prototype.toString.call(fn);
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

function isPlainObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

  if (proto === null) {
    return true;
  }

  var constructor = proto.constructor;

  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
}

module.exports = exports['default'];
},{}],10:[function(require,module,exports){
/**
 * Applies a function to every key-value pair inside an object.
 *
 * @param {Object} obj The source object.
 * @param {Function} fn The mapper function that receives the value and the key.
 * @returns {Object} A new object that contains the mapped values for the keys.
 */
"use strict";

exports.__esModule = true;
exports["default"] = mapValues;

function mapValues(obj, fn) {
  return Object.keys(obj).reduce(function (result, key) {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
}

module.exports = exports["default"];
},{}],11:[function(require,module,exports){
/**
 * Picks key-value pairs from an object where values satisfy a predicate.
 *
 * @param {Object} obj The object to pick from.
 * @param {Function} fn The predicate the values must satisfy to be copied.
 * @returns {Object} The object with the values that satisfied the predicate.
 */
"use strict";

exports.__esModule = true;
exports["default"] = pick;

function pick(obj, fn) {
  return Object.keys(obj).reduce(function (result, key) {
    if (fn(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

module.exports = exports["default"];
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var EVENT_LISTENER_LIST = 'eventListenerList';
var newLineAndTabRegexp = new RegExp('/[\\n\\t]/', 'g');
var MAX_SET_BY_DEFAULT = 100;
var HANDLE_RESIZE_DELAY = 300;
var HANDLE_RESIZE_DEBOUNCE = 50;

/**
 * Range feature detection
 * @return {Boolean}
 */
function supportsRange() {
    var input = document.createElement('input');
    input.setAttribute('type', 'range');
    return input.type !== 'text';
}

var pluginName = 'rangeSlider',
    pluginIdentifier = 0,
    inputrange = supportsRange(),
    defaults = {
    polyfill: true,
    rangeClass: 'rangeSlider',
    disabledClass: 'rangeSlider--disabled',
    fillClass: 'rangeSlider__fill',
    bufferClass: 'rangeSlider__buffer',
    handleClass: 'rangeSlider__handle',
    startEvent: ['mousedown', 'touchstart', 'pointerdown'],
    moveEvent: ['mousemove', 'touchmove', 'pointermove'],
    endEvent: ['mouseup', 'touchend', 'pointerup'],
    min: null,
    max: null,
    step: null,
    value: null,
    buffer: null,
    borderRadius: 10
};

/**
 * Delays a function for the given number of milliseconds, and then calls
 * it with the arguments supplied.
 *
 * @param  {Function} fn   [description]
 * @param  {Number}   wait [description]
 * @return {Function}
 */
function delay(fn, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function () {
        return fn.apply(null, args);
    }, wait);
}

/**
 * Returns a debounced function that will make sure the given
 * function is not triggered too much.
 *
 * @param  {Function} fn Function to debounce.
 * @param  {Number}   debounceDuration OPTIONAL. The amount of time in milliseconds for which we will debounce the function. (defaults to 100ms)
 * @return {Function}
 */
function debounce(fn, debounceDuration) {
    debounceDuration = debounceDuration || 100;
    return function () {
        if (!fn.debouncing) {
            var args = Array.prototype.slice.apply(arguments);
            fn.lastReturnVal = fn.apply(window, args);
            fn.debouncing = true;
        }
        clearTimeout(fn.debounceTimeout);
        fn.debounceTimeout = setTimeout(function () {
            fn.debouncing = false;
        }, debounceDuration);
        return fn.lastReturnVal;
    };
}

/**
 * Check if a `element` is visible in the DOM
 *
 * @param  {Element}  element
 * @return {Boolean}
 */
function isHidden(element) {
    return !!(element.offsetWidth === 0 || element.offsetHeight === 0 || element.open === false);
}

/**
 * Get hidden parentNodes of an `element`
 *
 * @param  {Element} element
 * @return {[type]}
 */
function getHiddenParentNodes(element) {
    var parents = [],
        node = element.parentNode;

    while (isHidden(node)) {
        parents.push(node);
        node = node.parentNode;
    }
    return parents;
}

/**
 * Returns dimensions for an element even if it is not visible in the DOM.
 *
 * @param  {Element} element
 * @param  {string}  key     (e.g. offsetWidth …)
 * @return {Number}
 */
function getDimension(element, key) {
    var hiddenParentNodes = getHiddenParentNodes(element),
        hiddenParentNodesLength = hiddenParentNodes.length,
        displayProperty = [],
        dimension = element[key];

    // Used for native `<details>` elements
    function toggleOpenProperty(element) {
        if (typeof element.open !== 'undefined') {
            element.open = element.open ? false : true;
        }
    }

    if (hiddenParentNodesLength) {
        for (var i = 0; i < hiddenParentNodesLength; i++) {
            // Cache the display property to restore it later.
            displayProperty[i] = hiddenParentNodes[i].style.display;

            hiddenParentNodes[i].style.display = 'block';
            hiddenParentNodes[i].style.height = '0';
            hiddenParentNodes[i].style.overflow = 'hidden';
            hiddenParentNodes[i].style.visibility = 'hidden';
            toggleOpenProperty(hiddenParentNodes[i]);
        }

        dimension = element[key];

        for (var j = 0; j < hiddenParentNodesLength; j++) {
            toggleOpenProperty(hiddenParentNodes[j]);
            hiddenParentNodes[j].style.display = displayProperty[j];
            hiddenParentNodes[j].style.height = '';
            hiddenParentNodes[j].style.overflow = '';
            hiddenParentNodes[j].style.visibility = '';
        }
    }
    return dimension;
}

function isString(obj) {
    return obj === '' + obj;
}

function isNumberLike(obj) {
    return obj !== null && obj !== undefined && (isString(obj) && isFinite(parseFloat(obj)) || isFinite(obj));
}

function getFirsNumberLike() {
    if (!arguments.length) {
        return null;
    }
    for (var i = 0, len = arguments.length; i < len; i++) {
        if (isNumberLike(arguments[i])) {
            return arguments[i];
        }
    }
}

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

function simpleExtend(defaultOpt, options) {
    var opt = {},
        key;
    for (key in defaultOpt) {
        opt[key] = defaultOpt[key];
    }
    for (key in options) {
        opt[key] = options[key];
    }

    return opt;
}

/**
 *
 * @param {HTMLElement} el
 * @param {Object} cssObj
 * @returns {*}
 */
function setCss(el, cssObj) {
    for (var key in cssObj) {
        el.style[key] = cssObj[key];
    }
    return el.style;
}

/**
 *
 * @param {HTMLElement} elem
 * @param {string} className
 */
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

/**
 *
 * @param {HTMLElement} elem
 * @param {string} className
 */
function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

/**
 *
 * @param {HTMLElement} el
 * @callback callback
 * @param {boolean} andForElement - apply callback for el
 * @returns {HTMLElement}
 */
function forEachAncestors(el, callback, andForElement) {
    if (andForElement) {
        callback(el);
    }

    while (el.parentNode && !callback(el)) {
        el = el.parentNode;
    }

    return el;
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} name event name
 * @param {Object} data
 */
function triggerEvent(el, name, data) {
    if (!isString(name)) {
        throw new TypeError('event name must be String');
    }
    if (!(el instanceof HTMLElement)) {
        throw new TypeError('element must be HTMLElement');
    }
    name = name.trim();
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(name, false, false, data);
    el.dispatchEvent(event);
}

/**
 *
 * @param {HTMLElement} elem
 * @param {string} className
 */
function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

/**
 * @param {Object} referenceNode after this
 * @param {Object} newNode insert this
 */
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/**
 * Add event listeners and push them to el[EVENT_LISTENER_LIST]
 * @param {HTMLElement} el DOM element
 * @param {Array} events
 * @callback listener
 */
function addEventListeners(el, events, listener) {
    events.forEach(function (eventName) {
        if (!el[EVENT_LISTENER_LIST]) {
            el[EVENT_LISTENER_LIST] = {};
        }
        if (!el[EVENT_LISTENER_LIST][eventName]) {
            el[EVENT_LISTENER_LIST][eventName] = [];
        }

        el.addEventListener(eventName, listener, false);
        if (el[EVENT_LISTENER_LIST][eventName].indexOf(listener) < 0) {
            el[EVENT_LISTENER_LIST][eventName].push(listener);
        }
    });
}

/**
 * Remove event listeners and remove them from el[EVENT_LISTENER_LIST]
 * @param {HTMLElement} el DOM element
 * @param {Array} events
 * @callback listener
 */
function removeEventListeners(el, events, listener) {
    events.forEach(function (eventName) {
        el.removeEventListener(eventName, listener, false);

        var index;
        if (el[EVENT_LISTENER_LIST] && el[EVENT_LISTENER_LIST][eventName] && (index = el[EVENT_LISTENER_LIST][eventName].indexOf(listener)) > -1) {
            el[EVENT_LISTENER_LIST][eventName].splice(index, 1);
        }
    });
}

/**
 * Remove ALL event listeners which exists in el[EVENT_LISTENER_LIST]
 * @param {HTMLElement} el DOM element
 */
function removeAllListenersFromEl(el) {
    if (!el[EVENT_LISTENER_LIST]) {
        return;
    }
    /* jshint ignore:start */
    var instance = this;

    /**
     *
     * @callback listener
     * @this {Object} event name
     */
    function rm(listener) {
        if (listener === instance._startEventListener) {
            this.el.removeEventListener(this.eventName, listener, false);
        }
    }

    for (var eventName in el[EVENT_LISTENER_LIST]) {
        el[EVENT_LISTENER_LIST][eventName].forEach(rm, { eventName: eventName, el: el });
    }

    el[EVENT_LISTENER_LIST] = {};
    /* jshint ignore:end */
}

/**
 * Plugin
 * @param {HTMLElement} element
 * @param {this} options
 */
function Plugin(element, options) {
    var minSetByDefault, maxSetByDefault, stepSetByDefault;
    console.dir(element);
    this.element = element;
    this.options = simpleExtend(defaults, options);
    this.polyfill = this.options.polyfill;
    this.onInit = this.options.onInit;
    this.onSlide = this.options.onSlide;
    this.onSlideStart = this.options.onSlideStart;
    this.onSlideEnd = this.options.onSlideEnd;
    this.onSlideEventsCount = -1;
    this.isInteractsNow = false;
    this.needTriggerEvents = false;

    // Plugin should only be used as a polyfill
    if (!this.polyfill) {
        // Input range support?
        if (inputrange) {
            return false;
        }
    }

    this.options.buffer = this.options.buffer || parseFloat(this.element.getAttribute('data-buffer'));

    this.identifier = 'js-' + pluginName + '-' + pluginIdentifier++;
    this.min = getFirsNumberLike(this.options.min, parseFloat(this.element.getAttribute('min')), minSetByDefault = 0);
    this.max = getFirsNumberLike(this.options.max, parseFloat(this.element.getAttribute('max')), maxSetByDefault = MAX_SET_BY_DEFAULT);
    this.value = getFirsNumberLike(this.options.value, this.element.value, parseFloat(this.element.value || this.min + (this.max - this.min) / 2));
    this.step = getFirsNumberLike(this.options.step, parseFloat(this.element.getAttribute('step')) || (stepSetByDefault = 1));
    this.percent = null;
    this._updatePercentFromValue();

    this.toFixed = this._toFixed(this.step);

    this.fill = document.createElement('div');
    this.fill.className = this.options.fillClass;

    this.handle = document.createElement('div');
    this.handle.className = this.options.handleClass;

    this.range = document.createElement('div');
    this.range.className = this.options.rangeClass;
    this.range.id = this.identifier;
    this.range.appendChild(this.handle);
    this.range.appendChild(this.fill);

    if (this.options.bufferClass) {
        this.buffer = document.createElement('div');
        this.buffer.className = this.options.bufferClass;
        this.range.appendChild(this.buffer);
    }

    if (isNumberLike(this.options.value)) {
        this._setValue(this.options.value, true);
        this.element.value = this.options.value;
    }

    if (isNumberLike(this.options.buffer)) {
        this.element.setAttribute('data-buffer', this.options.buffer);
    }

    if (isNumberLike(this.options.min) || minSetByDefault) {
        this.element.setAttribute('min', '' + this.min);
    }

    if (isNumberLike(this.options.max) || maxSetByDefault) {
        this.element.setAttribute('max', '' + this.max);
    }

    if (isNumberLike(this.options.step) || stepSetByDefault) {
        this.element.setAttribute('step', '' + this.step);
    }

    insertAfter(this.element, this.range);

    // visually hide the input
    setCss(this.element, {
        'position': 'absolute',
        'width': '1px',
        'height': '1px',
        'overflow': 'hidden',
        'opacity': '0'
    });

    // Store context
    this._handleDown = this._handleDown.bind(this);
    this._handleMove = this._handleMove.bind(this);
    this._handleEnd = this._handleEnd.bind(this);
    this._startEventListener = this._startEventListener.bind(this);
    this._changeEventListener = this._changeEventListener.bind(this);
    this._handleResize = this._handleResize.bind(this);

    this._init();

    //// Attach Events
    window.addEventListener('resize', this._handleResize, false);

    addEventListeners(document, this.options.startEvent, this._startEventListener);

    // Listen to programmatic value changes
    this.element.addEventListener('change', this._changeEventListener, false);
}

Plugin.prototype.constructor = Plugin;

Plugin.prototype._toFixed = function (step) {
    return (step + '').replace('.', '').length - 1;
};

Plugin.prototype._init = function () {
    if (this.onInit && typeof this.onInit === 'function') {
        this.onInit();
    }
    this._update();
};

Plugin.prototype._updatePercentFromValue = function () {
    this.percent = (this.value - this.min) / (this.max - this.min);
};

/**
 * This method check if this.identifier exists in ev.target's ancestors
 * @param ev
 * @param data
 */
Plugin.prototype._startEventListener = function (ev, data) {
    var _this = this;
    var el = ev.target;
    var isEventOnSlider = false;
    forEachAncestors(el, function (el) {
        return isEventOnSlider = el.id === _this.identifier && !hasClass(el, _this.options.disabledClass);
    }, true);
    if (isEventOnSlider) {
        this._handleDown(ev, data);
    }
};

Plugin.prototype._changeEventListener = function (ev, data) {
    if (data && data.origin === this.identifier) {
        return;
    }

    var value = ev.target.value,
        pos = this._getPositionFromValue(value);
    this._setPosition(pos);
};

Plugin.prototype._update = function () {
    this.handleWidth = getDimension(this.handle, 'offsetWidth');
    this.rangeWidth = getDimension(this.range, 'offsetWidth');
    this.maxHandleX = this.rangeWidth - this.handleWidth;
    this.grabX = this.handleWidth / 2;
    this.position = this._getPositionFromValue(this.value);

    // Consider disabled state
    if (this.element.disabled) {
        addClass(this.range, this.options.disabledClass);
    } else {
        removeClass(this.range, this.options.disabledClass);
    }

    this._setPosition(this.position);
    if (this.options.bufferClass && this.options.buffer) {
        this._setBufferPosition(this.options.buffer);
    }
    this._updatePercentFromValue();
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);
    this.element.dispatchEvent(event);
};

Plugin.prototype._handleResize = function () {
    var _this = this;
    return debounce(function () {
        // Simulate resizeEnd event.
        delay(function () {
            _this._update();
        }, HANDLE_RESIZE_DELAY);
    }, HANDLE_RESIZE_DEBOUNCE)();
};

Plugin.prototype._handleDown = function (e) {
    this.isInteractsNow = true;
    e.preventDefault();
    addEventListeners(document, this.options.moveEvent, this._handleMove);
    addEventListeners(document, this.options.endEvent, this._handleEnd);

    // If we click on the handle don't set the new position
    if ((' ' + e.target.className + ' ').replace(newLineAndTabRegexp, ' ').indexOf(this.options.handleClass) > -1) {
        return;
    }

    var posX = this._getRelativePosition(e),
        rangeX = this.range.getBoundingClientRect().left,
        handleX = this._getPositionFromNode(this.handle) - rangeX;

    this._setPosition(posX - this.grabX);

    if (posX >= handleX && posX < handleX + this.handleWidth) {
        this.grabX = posX - handleX;
    }
    this._updatePercentFromValue();
};

Plugin.prototype._handleMove = function (e) {
    this.isInteractsNow = true;
    e.preventDefault();
    var posX = this._getRelativePosition(e);
    this._setPosition(posX - this.grabX);
    //this.isInteractsNow = false;
};

Plugin.prototype._handleEnd = function (e) {
    e.preventDefault();
    removeEventListeners(document, this.options.moveEvent, this._handleMove);
    removeEventListeners(document, this.options.endEvent, this._handleEnd);

    // Ok we're done fire the change event
    triggerEvent(this.element, 'change', { origin: this.identifier });

    if (this.isInteractsNow || this.needTriggerEvents) {
        if (this.onSlideEnd && typeof this.onSlideEnd === 'function') {
            this.onSlideEnd(this.value, this.percent, this.position);
        }
    }
    this.onSlideEventsCount = 0;
    this.isInteractsNow = false;
};

Plugin.prototype._cap = function (pos, min, max) {
    if (pos < min) {
        return min;
    }
    if (pos > max) {
        return max;
    }
    return pos;
};

Plugin.prototype._setPosition = function (pos) {
    var value, left;

    // Snapping steps
    value = this._getValueFromPosition(this._cap(pos, 0, this.maxHandleX));
    left = this._getPositionFromValue(value);

    // Update ui
    this.fill.style.width = left + this.grabX + 'px';
    this.handle.style.left = left + 'px';
    this._setValue(value);

    // Update globals
    this.position = left;
    this.value = value;
    this._updatePercentFromValue();

    if (this.isInteractsNow || this.needTriggerEventss) {
        if (this.onSlideStart && typeof this.onSlideStart === 'function' && this.onSlideEventsCount === 0) {
            this.onSlideStart(this.value, this.percent, this.position);
        }

        if (this.onSlide && typeof this.onSlide === 'function') {
            this.onSlide(this.value, this.percent, this.position);
        }
    }

    this.onSlideEventsCount++;
};

Plugin.prototype._setBufferPosition = function (pos) {
    var isPercent = true,
        bufferWidth,
        paddingWidth,
        bufferWidthWithPadding;
    if (isFinite(pos)) {
        pos = parseFloat(pos);
    } else if (isString(pos)) {
        if (pos.indexOf('px') > 0) {
            isPercent = false;
        }
        pos = parseFloat(pos);
    } else {
        console.warn('New position must be XXpx or XX%');
        return;
    }

    if (isNaN(pos)) {
        console.warn('New position is NaN');
        return;
    }
    if (!this.options.bufferClass) {
        console.warn('You disabled buffer, it\'s className is empty');
        return;
    }
    bufferWidth = isPercent ? pos : pos / this.rangeWidth * 100;
    if (bufferWidth < 0) {
        bufferWidth = 0;
    }
    if (bufferWidth > 100) {
        bufferWidth = 100;
    }
    this.options.buffer = bufferWidth;

    paddingWidth = this.options.borderRadius / this.rangeWidth * 100;
    bufferWidthWithPadding = bufferWidth - paddingWidth;
    if (bufferWidthWithPadding < 0) {
        bufferWidthWithPadding = 0;
    }

    this.buffer.style.width = bufferWidthWithPadding + '%';
    this.buffer.style.left = paddingWidth * 0.5 + '%';
    this.element.setAttribute('data-buffer', bufferWidth);
};

// Returns element position relative to the parent
Plugin.prototype._getPositionFromNode = function (node) {
    var i = 0;
    while (node !== null) {
        i += node.offsetLeft;
        node = node.offsetParent;
    }
    return i;
};

/**
 *
 * @param {(MouseEvent|TouchEvent)}e
 * @returns {number}
 */
Plugin.prototype._getRelativePosition = function (e) {
    // Get the offset left relative to the viewport
    var rangeX = this.range.getBoundingClientRect().left,
        pageX = 0;

    if (typeof e.pageX !== 'undefined') {
        pageX = e.touches && e.touches.length ? e.touches[0].pageX : e.pageX;
    } else if (typeof e.originalEvent !== 'undefined') {
        if (typeof e.originalEvent.clientX !== 'undefined') {
            pageX = e.originalEvent.clientX;
        } else if (e.originalEvent.touches && e.originalEvent.touches[0] && typeof e.originalEvent.touches[0].clientX !== 'undefined') {
            pageX = e.originalEvent.touches[0].clientX;
        }
    } else if (e.touches && e.touches[0] && typeof e.touches[0].clientX !== 'undefined') {
        pageX = e.touches[0].clientX;
    } else if (e.currentPoint && typeof e.currentPoint.x !== 'undefined') {
        pageX = e.currentPoint.x;
    }

    return pageX - rangeX;
};

Plugin.prototype._getPositionFromValue = function (value) {
    var percentage, pos;
    percentage = (value - this.min) / (this.max - this.min);
    pos = percentage * this.maxHandleX;
    return pos;
};

Plugin.prototype._getValueFromPosition = function (pos) {
    var percentage, value;
    percentage = pos / (this.maxHandleX || 1);
    value = this.step * Math.round(percentage * (this.max - this.min) / this.step) + this.min;
    return Number(value.toFixed(this.toFixed));
};

Plugin.prototype._setValue = function (value, force) {
    if (value === this.value && !force) {
        return;
    }

    // Set the new value and fire the `input` event
    this.element.value = value;
    this.value = value;
    triggerEvent(this.element, 'input', { origin: this.identifier });
};

/**
 *
 * @param {Object} obj like {min : Number, max : Number, value : Number, step : Number, buffer : [String|Number]}
 * @param {Boolean} triggerEvents
 * @returns {Plugin}
 */
Plugin.prototype.update = function (obj, triggerEvents) {
    if (triggerEvents) {
        this.needTriggerEvents = true;
    }
    if (isObject(obj)) {
        if (isNumberLike(obj.min)) {
            this.element.setAttribute('min', '' + obj.min);
            this.min = obj.min;
        }

        if (isNumberLike(obj.max)) {
            this.element.setAttribute('max', '' + obj.max);
            this.max = obj.max;
        }

        if (isNumberLike(obj.step)) {
            this.element.setAttribute('step', '' + obj.step);
            this.step = obj.step;
            this.toFixed = this._toFixed(obj.step);
        }

        if (isNumberLike(obj.buffer)) {
            this._setBufferPosition(obj.buffer);
        }

        if (isNumberLike(obj.value)) {
            this._setValue(obj.value);
        }
    }
    this._update();
    this.onSlideEventsCount = 0;
    this.needTriggerEvents = false;
    return this;
};

Plugin.prototype.destroy = function () {
    removeAllListenersFromEl.call(this, document);
    window.removeEventListener('resize', this._handleResize, false);
    this.element.removeEventListener('change', this._changeEventListener, false);

    this.element.style.cssText = '';
    delete this.element[pluginName];

    // Remove the generated markup
    if (this.range) {
        this.range.parentNode.removeChild(this.range);
    }
};

// A really lightweight plugin wrapper around the constructor,
// preventing against multiple instantiations

Plugin.create = function (el, options) {
    function createInstance(el) {
        var data = el[pluginName];

        // Create a new instance.
        if (!data) {
            data = new Plugin(el, options);
            el[pluginName] = data;
        }
    }

    if (el.length) {
        Array.prototype.slice.call(el).forEach(function (el) {
            createInstance(el);
        });
    } else {
        createInstance(el);
    }
};

exports.default = Plugin;

},{}],13:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UISelectBehaviorTrait = (function () {
    function UISelectBehaviorTrait() {
        _classCallCheck(this, UISelectBehaviorTrait);
    }

    _createClass(UISelectBehaviorTrait, [{
        key: 'data',
        value: function data() {
            return {
                selectState: {
                    'form-select--focus': false
                }
            };
        }
    }, {
        key: 'attached',
        value: function attached() {
            return function () {
                var self = this;
                document.addEventListener('click', self.handleBlur.bind(self), false);
            };
        }
    }, {
        key: 'methods',
        value: function methods() {
            return {
                changeState: function changeState(e) {
                    this.selectState["form-select--focus"] = !this.selectState["form-select--focus"];
                },
                changeSelected: function changeSelected(index, e) {
                    this.selectedIndex = index;
                    this.selectedValue = this.options[index].value;
                    this.$el.querySelector("select").value = this.selectedValue;
                    this.changeState();
                },
                handleBlur: function handleBlur(e) {
                    var target = e.target;
                    if (this.selectState["form-select--focus"] && !this.$el.contains(target)) {
                        this.changeState();
                    }
                }
            };
        }
    }]);

    return UISelectBehaviorTrait;
})();

function selectAdpater(ele) {
    var selectIndex = null;
    var selectValue = null;
    var ret = {};
    ret.options = Array.prototype.slice.call(ele.children).map(function (item, index) {
        var value = item.textContent.trim();
        if (item.getAttribute("selected") != null) {
            selectIndex = index;
            selectValue = value;
        }
        return {
            value: value
        };
    });
    ret["selectedIndex"] = selectIndex;
    ret["selectedValue"] = selectValue;
    return ret;
}

var tpl = '\n    <div class="form-select" v-bind:class="selectState">\n        <div class="form-select__box">\n            <select v-model="selectedValue" name="" id="">\n                <option v-for="option in options" v-bind:value="option.value">\n                </option>\n            </select>\n        </div>\n        <div class="dropdown form-select__dropdown">\n            <div class="dropdown__toggle" v-on:click="changeState">\n                <div class="layout new-left-right full-parent">\n                    <div class="float-left">\n                        <div class="center-set">\n                            <div class="center-set__item">\n                                {{ selectedValue  }}\n                            </div>\n                        </div>\n                        <div class="float-right">\n                            <div class="icon-btn icon-btn--block">\n                                <div class="icon icon-angle-up"></div>\n                                <div class="icon icon-angle-down"></div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="dropdown__list">\n                <div class="dropdown__listitem" v-for="option in options" v-show="$index != selectedIndex"\n                    v-on:click="changeSelected($index, $event)" v-bind:value="option.value">\n                    {{ option.value }}\n                </div>\n            </div>\n        </div>\n    </div>\n';

document.queryAll('[element="ui-select"]').forEach(function (element) {
    var data = selectAdpater(element.querySelector("select"));
    var id = "select" + utils.Math.getRandomInt(0, 100000);
    element.innerHTML = tpl;
    element.querySelector(".form-select").setAttribute("id", id);
    element.removeAttribute("compile");
    utils.component("#" + id, data, {
        behaviors: [UISelectBehaviorTrait]
    });
});

},{}],14:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _redux = require("redux");

require("../utils");

require("../../components/ui-select/index");

var _index = require("../../components/ui-rangeslider/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your project.
 */
function counter() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
var store = (0, _redux.createStore)(counter);

// You can subscribe to the updates manually, or use bindings to your view layer.
store.subscribe(function () {
    return console.log(store.getState());
});

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1

(function () {
    validator.extend('min', function (length, str) {
        return str.length > parseInt(length) - 1;
    });

    validator.extend('max', function (length, str) {
        return str.length < parseInt(length) + 1;
    });

    var RegexTrait = (function () {
        function RegexTrait() {
            _classCallCheck(this, RegexTrait);
        }

        _createClass(RegexTrait, [{
            key: "methods",
            value: function methods() {
                return {
                    handleRegexError: function handleRegexError(e) {},
                    handleRegexSuccess: function handleRegexSuccess(e) {
                        console.log(e);
                        var self = this;
                        //utils.validator.unuseregex(self.$el, self.$el.querySelector('input'));
                    }
                };
            }
        }]);

        return RegexTrait;
    })();

    var TestTrait = (function () {
        function TestTrait() {
            _classCallCheck(this, TestTrait);
        }

        _createClass(TestTrait, [{
            key: "attached",
            value: function attached() {
                return function () {
                    var self = this;
                    utils.validator.initregex.bind(self)(self.$el, self.$el.querySelector('input'), true);
                };
            }
        }]);

        return TestTrait;
    })();

    utils.component("#pat", {}, {
        behaviors: [RegexTrait, TestTrait]
    });

    utils.component("#sat", {}, {
        behaviors: [RegexTrait, TestTrait]
    });

    var regexFields = document.querySelector('#testForm').queryAll("[data-regex]");

    document.querySelector('#testForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var formRegexHandles = [];
        regexFields.forEach(function (el, index) {
            formRegexHandles.push({
                element: el,
                index: index,
                handle: utils.validator.getHandle(el)
            });
        });

        for (var i = 0; i < formRegexHandles.length; i++) {
            var element = formRegexHandles[i].element;
            var formRegexHandle = formRegexHandles[i].handle;
            console.dir(formRegexHandle.fun);
            if (!formRegexHandle.fun(element.querySelector("input").value)) {
                console.log(element.querySelector("input").value);
            }
        }
    });

    document.queryAll('[element="ui-rangeslider"]').forEach(function (element) {
        var data = {};
        var id = "rangeslider" + utils.Math.getRandomInt(0, 100000);
        element.querySelector("input").setAttribute("id", id);
        element.removeAttribute("compile");
        _index2.default.create(element.querySelector("input"));
        //utils.component("#" + id, data, {
        //    behaviors: []
        //});
    });
})();

},{"../../components/ui-rangeslider/index":12,"../../components/ui-select/index":13,"../utils":15,"redux":4}],15:[function(require,module,exports){
'use strict';

require('Object-mixin');

// ie9 input 事件polyfill
(function (d) {
    if (navigator.userAgent.indexOf('MSIE 9') === -1) return;
    var elements = [],
        values = [],
        ev = d.createEvent('CustomEvent');
    ev.initCustomEvent('input', true, true, {});

    d.addEventListener('selectionchange', function () {
        var actEl = d.activeElement;

        if (actEl.tagName === 'TEXTAREA' || actEl.tagName === 'INPUT') {
            var idx = elements.indexOf(actEl),
                el = elements[idx] || elements.push(actEl);
            if (actEl.type === 'text' || actEl.type === 'password' || actEl.type === 'search') {
                if (el.value !== values[idx]) {
                    values[idx] = el.value;
                    el.dispatchEvent(ev);
                }
            }
        }
    });
})(document);

(function () {
    var forEach = [].forEach,
        regex = /^data-(.+)/,
        dashChar = /\-([a-z])/ig,
        el = document.createElement('div'),
        mutationSupported = false,
        match;

    function detectMutation() {
        mutationSupported = true;
        this.removeEventListener('DOMAttrModified', detectMutation, false);
    }

    function toCamelCase(s) {
        return s.replace(dashChar, function (m, l) {
            return l.toUpperCase();
        });
    }

    function updateDataset() {
        var dataset = {};
        forEach.call(this.attributes, function (attr) {
            if (match = attr.name.match(regex)) dataset[toCamelCase(match[1])] = attr.value;
        });
        return dataset;
    }

    // only add support if the browser doesn't support data-* natively
    if (el.dataset != undefined) return;

    el.addEventListener('DOMAttrModified', detectMutation, false);
    el.setAttribute('foo', 'bar');

    function defineElementGetter(obj, prop, getter) {
        if (Object.defineProperty) {
            Object.defineProperty(obj, prop, {
                get: getter
            });
        } else {
            obj.__defineGetter__(prop, getter);
        }
    }

    defineElementGetter(Element.prototype, 'dataset', mutationSupported ? function () {
        if (!this._datasetCache) {
            this._datasetCache = updateDataset.call(this);
        }
        return this._datasetCache;
    } : updateDataset);

    document.addEventListener('DOMAttrModified', function (event) {
        delete event.target._datasetCache;
    }, false);
})();

// 解析sml
utils.sml = (function () {
    function parse(str) {
        var parseobj = {};
        parseobj["event"] = str.match(/(?:if:)\s*\w*/g)[0].replace("if:", "").trim();
        parseobj["regex"] = str.match(/(?:do:)[\s\w\(\),|]+/g)[0].replace("do:", "").split("|").map(function (item) {
            var args = [];
            var reg = /(?:\()[\w\s,]+/g;
            if (item.indexOf("(") > -1 && item.indexOf(")") > -1) {
                var val = item.match(reg)[0].replace("(", "").split(",");
                args = args.concat(val);
            }
            return {
                name: item.trim().replace(reg, "").replace(")", ""),
                args: args
            };
        });
        return parseobj;
    }

    return {
        parse: parse
    };
})();

utils.Math = (function () {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return {
        getRandomInt: getRandomInt
    };
})();

utils.validator = (function () {
    var handles = {};

    function handle(eventName, ele, parseobj) {
        var fun = function fun(e) {
            var args = e;
            var str = null;
            if (Object.prototype.toString.call(args) == '[object String]') {
                str = args;
            } else {
                str = e.target.value;
            }
            var ispass = true;
            for (var i = 0; i < parseobj.regex.length; i++) {
                var regex = parseobj.regex[i];
                var fun = validator[regex.name];
                if (fun) {
                    var args = regex.args.concat([str]);
                    var ret = fun.apply(fun, args);
                    if (!ret) {
                        var event = new CustomEvent("regex-error", {
                            detail: regex
                        });
                        ele.dispatchEvent(event);
                        ispass = false;
                        break;
                    }
                }
            }
            if (ispass) {
                var event = new CustomEvent("regex-success", {
                    detail: regex
                });
                ele.dispatchEvent(event);
                return true;
            } else {
                return false;
            }
        };
        return fun;
    }

    return {
        initregex: function initregex(ele, bindele, isAddListener) {
            var parseobj = utils.sml.parse(ele.getAttribute("data-regex"));
            ele.setAttribute("regex-id", "regex" + utils.Math.getRandomInt(0, 100000));
            var fun = handle(parseobj.event, ele, parseobj);
            handles[ele.getAttribute("regex-id")] = {
                eventName: parseobj.event,
                fun: fun
            };
            if (isAddListener) {
                bindele.addEventListener(parseobj.event, fun, false);
            }
        },
        unuseregex: function unuseregex(ele, bindele) {
            var s = handles[ele.getAttribute("regex-id")];
            bindele.removeEventListener(s.eventName, s.fun, false);
            delete handles[ele.getAttribute("regex-id")];
        },
        getHandle: function getHandle(ele) {
            var s = handles[ele.getAttribute("regex-id")];
            if (s) {
                return s;
            }
            return false;
        }
    };
})();

utils.component = (function () {
    return function component(id, state, options) {
        var defaults = {
            behaviors: []
        };

        var op = Object.mixin(defaults, options);
        var instance = Object.mixin({ el: id }, { data: state });
        instance["attachedFunctions"] = [];

        for (var i = 0; i < options.behaviors.length; i++) {
            var trait = new options.behaviors[i]();
            var keys = Object.getOwnPropertyNames(Object.getPrototypeOf(trait));
            for (var j = 0; j < keys.length; j++) {
                var key = keys[j];
                if (key == "attached") {
                    instance["attachedFunctions"].push(trait[key]);
                    continue;
                }

                if (key != "constructor") {
                    if (instance[key]) {
                        instance[key] = Object.mixin(instance[key], trait[key]());
                    } else {
                        instance[key] = Object.mixin({}, trait[key]());
                    }
                }
            }
        }

        instance["attached"] = function () {
            var self = this;
            for (var i = 0; i < instance["attachedFunctions"].length; i++) {
                instance["attachedFunctions"][i]().bind(self)();
            }
        };
        return new Vue(instance);
    };
})();

},{"Object-mixin":1}]},{},[14])