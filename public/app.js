/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getIterator2 = __webpack_require__(1);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _map = __webpack_require__(54);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _constants = __webpack_require__(74);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _article2 = __webpack_require__(75);
	
	var _article3 = _interopRequireDefault(_article2);
	
	var _source2 = __webpack_require__(125);
	
	var _source3 = _interopRequireDefault(_source2);
	
	var _moment = __webpack_require__(126);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	__webpack_require__(130);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ARTICLES_CONTAINER = document.getElementById('articles');
	var NOTIFICATION_CONTAINER = document.getElementById('notification');
	
	buildCategoriesMenu();
	buildCountriesSwitcher();
	buildLanguagesSwitcher();
	loadSources();
	
	function loadSources() {
	    var source = new _source3.default();
	    var params = new _map2.default([['category', _constants2.default.GLOBAL_SETTINGS.category], ['country', _constants2.default.GLOBAL_SETTINGS.country], ['language', _constants2.default.GLOBAL_SETTINGS.language]]);
	
	    source.get(params).then(function (sources) {
	        ARTICLES_CONTAINER.innerHTML = '';
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = (0, _getIterator3.default)(sources), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var _source = _step.value;
	
	                loadArticles(_source);
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    }).catch(function (err) {
	        ARTICLES_CONTAINER.innerHTML = '';
	        NOTIFICATION_CONTAINER.innerText = err.message;
	    });
	}
	
	function loadArticles(source) {
	    var article = new _article3.default();
	    var params = new _map2.default([['source', source.id]]);
	
	    article.get(params).then(function (articles) {
	        ARTICLES_CONTAINER.innerHTML = '';
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;
	
	        try {
	            for (var _iterator2 = (0, _getIterator3.default)(articles), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var _article = _step2.value;
	
	                displayArticle(_article);
	            }
	        } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                }
	            } finally {
	                if (_didIteratorError2) {
	                    throw _iteratorError2;
	                }
	            }
	        }
	    }).catch(function (err) {
	        ARTICLES_CONTAINER.innerHTML = '';
	        NOTIFICATION_CONTAINER.innerText = err.message;
	    });
	}
	
	function displayArticle(article) {
	    var articleContainer = document.createElement('div');
	    var img = document.createElement('div');
	    img.classList.add('image');
	    if (article.urlToImage) {
	        img.innerHTML = '<img src="' + (article.urlToImage || _constants2.default.IMAGES_DIR + 'no_image.png') + '" alt="' + article.title + '">';
	    } else {
	        img.classList.add('no-image');
	    }
	    articleContainer.setAttribute('class', 'article-container');
	    articleContainer.innerHTML = '\n<div class="header"><a target="_blank" href="' + article.url + '">' + article.title + '</a></div>\n' + img.outerHTML + '\n<div class="description">' + (article.description || '') + '</div>\n<div class="footer">\n    <div class="author">' + (article.author || 'anonymous') + '</div>\n    <div class="pubdate">' + (article.publishedAt ? (0, _moment2.default)(article.publishedAt).format('lll') : '') + '</div>\n</div>\n';
	    ARTICLES_CONTAINER.appendChild(articleContainer);
	}
	
	function buildCategoriesMenu() {
	    var categoryAttrName = 'data-category';
	    var listContainer = document.getElementById('categories-list');
	    for (var category in _constants2.default.CATEGORIES) {
	        if (!_constants2.default.CATEGORIES.hasOwnProperty(category)) {
	            continue;
	        }
	        var categoryListItem = document.createElement('li');
	        categoryListItem.setAttribute(categoryAttrName, category);
	        categoryListItem.innerText = _constants2.default.CATEGORIES[category];
	        categoryListItem.addEventListener('click', function () {
	            _constants2.default.GLOBAL_SETTINGS.category = this.getAttribute(categoryAttrName);
	            document.querySelector('#categories-list li.active').classList.remove('active');
	            this.classList.add('active');
	            loadSources();
	        });
	        if (category === _constants2.default.GLOBAL_SETTINGS.category) {
	            categoryListItem.classList.add('active');
	        }
	        listContainer.appendChild(categoryListItem);
	    }
	}
	
	function buildCountriesSwitcher() {
	    var countryAttrName = 'data-country';
	    var listContainer = document.getElementById('countries-list');
	    for (var country in _constants2.default.COUNTRIES) {
	        if (!_constants2.default.COUNTRIES.hasOwnProperty(country)) {
	            continue;
	        }
	        var countryListItem = document.createElement('li');
	        countryListItem.setAttribute(countryAttrName, country);
	        countryListItem.classList.add('flag', 'flag-icon-background', 'flag-icon-' + _constants2.default.COUNTRIES[country]);
	        countryListItem.addEventListener('click', function () {
	            _constants2.default.GLOBAL_SETTINGS.country = this.getAttribute(countryAttrName);
	            document.querySelector('#countries-list li.active').classList.remove('active');
	            this.classList.add('active');
	            loadSources();
	        });
	        if (country === _constants2.default.GLOBAL_SETTINGS.country) {
	            countryListItem.classList.add('active');
	        }
	        listContainer.appendChild(countryListItem);
	    }
	}
	
	function buildLanguagesSwitcher() {
	    var languageAttrName = 'data-language';
	    var listContainer = document.getElementById('languages-list');
	    for (var language in _constants2.default.LANGUAGES) {
	        if (!_constants2.default.LANGUAGES.hasOwnProperty(language)) {
	            continue;
	        }
	        var languageListItem = document.createElement('li');
	        languageListItem.setAttribute(languageAttrName, language);
	        languageListItem.classList.add('flag', 'flag-icon-background', 'flag-icon-' + _constants2.default.LANGUAGES[language]);
	        languageListItem.addEventListener('click', function () {
	            _constants2.default.GLOBAL_SETTINGS.language = this.getAttribute(languageAttrName);
	            document.querySelector('#languages-list li.active').classList.remove('active');
	            this.classList.add('active');
	            loadSources();
	        });
	        if (language === _constants2.default.GLOBAL_SETTINGS.language) {
	            languageListItem.classList.add('active');
	        }
	        listContainer.appendChild(languageListItem);
	    }
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(49);
	module.exports = __webpack_require__(51);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	var global        = __webpack_require__(15)
	  , hide          = __webpack_require__(19)
	  , Iterators     = __webpack_require__(7)
	  , TO_STRING_TAG = __webpack_require__(46)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(5)
	  , step             = __webpack_require__(6)
	  , Iterators        = __webpack_require__(7)
	  , toIObject        = __webpack_require__(8);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(12)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(9)
	  , defined = __webpack_require__(11);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(10);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(13)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(29)
	  , hide           = __webpack_require__(19)
	  , has            = __webpack_require__(30)
	  , Iterators      = __webpack_require__(7)
	  , $iterCreate    = __webpack_require__(31)
	  , setToStringTag = __webpack_require__(45)
	  , getPrototypeOf = __webpack_require__(47)
	  , ITERATOR       = __webpack_require__(46)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(16)
	  , ctx       = __webpack_require__(17)
	  , hide      = __webpack_require__(19)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(20)
	  , createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(24) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(21)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(27)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(24) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(24) && !__webpack_require__(25)(function(){
	  return Object.defineProperty(__webpack_require__(26)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22)
	  , document = __webpack_require__(15).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(22);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(32)
	  , descriptor     = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(45)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(46)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(21)
	  , dPs         = __webpack_require__(33)
	  , enumBugKeys = __webpack_require__(43)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(26)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(44).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(20)
	  , anObject = __webpack_require__(21)
	  , getKeys  = __webpack_require__(34);
	
	module.exports = __webpack_require__(24) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(35)
	  , enumBugKeys = __webpack_require__(43);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(30)
	  , toIObject    = __webpack_require__(8)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(40)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(8)
	  , toLength  = __webpack_require__(37)
	  , toIndex   = __webpack_require__(39);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(41)('keys')
	  , uid    = __webpack_require__(42);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15).document && document.documentElement;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).f
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(46)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(41)('wks')
	  , uid        = __webpack_require__(42)
	  , Symbol     = __webpack_require__(15).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(30)
	  , toObject    = __webpack_require__(48)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(11);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(50)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(12)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(11);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(21)
	  , get      = __webpack_require__(52);
	module.exports = __webpack_require__(16).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(53)
	  , ITERATOR  = __webpack_require__(46)('iterator')
	  , Iterators = __webpack_require__(7);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(10)
	  , TAG = __webpack_require__(46)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	__webpack_require__(49);
	__webpack_require__(3);
	__webpack_require__(57);
	__webpack_require__(71);
	module.exports = __webpack_require__(16).Map;

/***/ },
/* 56 */
/***/ function(module, exports) {



/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(58);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(66)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(20).f
	  , create      = __webpack_require__(32)
	  , redefineAll = __webpack_require__(59)
	  , ctx         = __webpack_require__(17)
	  , anInstance  = __webpack_require__(60)
	  , defined     = __webpack_require__(11)
	  , forOf       = __webpack_require__(61)
	  , $iterDefine = __webpack_require__(12)
	  , step        = __webpack_require__(6)
	  , setSpecies  = __webpack_require__(64)
	  , DESCRIPTORS = __webpack_require__(24)
	  , fastKey     = __webpack_require__(65).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(19);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(17)
	  , call        = __webpack_require__(62)
	  , isArrayIter = __webpack_require__(63)
	  , anObject    = __webpack_require__(21)
	  , toLength    = __webpack_require__(37)
	  , getIterFn   = __webpack_require__(52)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(21);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(7)
	  , ITERATOR   = __webpack_require__(46)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(15)
	  , core        = __webpack_require__(16)
	  , dP          = __webpack_require__(20)
	  , DESCRIPTORS = __webpack_require__(24)
	  , SPECIES     = __webpack_require__(46)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(42)('meta')
	  , isObject = __webpack_require__(22)
	  , has      = __webpack_require__(30)
	  , setDesc  = __webpack_require__(20).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(25)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(15)
	  , $export        = __webpack_require__(14)
	  , meta           = __webpack_require__(65)
	  , fails          = __webpack_require__(25)
	  , hide           = __webpack_require__(19)
	  , redefineAll    = __webpack_require__(59)
	  , forOf          = __webpack_require__(61)
	  , anInstance     = __webpack_require__(60)
	  , isObject       = __webpack_require__(22)
	  , setToStringTag = __webpack_require__(45)
	  , dP             = __webpack_require__(20).f
	  , each           = __webpack_require__(67)(0)
	  , DESCRIPTORS    = __webpack_require__(24);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(17)
	  , IObject  = __webpack_require__(9)
	  , toObject = __webpack_require__(48)
	  , toLength = __webpack_require__(37)
	  , asc      = __webpack_require__(68);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(69);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22)
	  , isArray  = __webpack_require__(70)
	  , SPECIES  = __webpack_require__(46)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(10);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(14);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(72)('Map')});

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(53)
	  , from    = __webpack_require__(73);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(61);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 74 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ROOT_DIR = '/daniil-gorbunov/';
	var IMAGES_DIR = ROOT_DIR + 'images/';
	
	exports.default = {
	    API_KEY: '6d2df7867b8e4cda9d90ea70b9895d9c',
	    NEWS_API_URL: 'https://newsapi.org/v1/',
	    NEWS_API_ARTICLES: 'articles',
	    NEWS_API_SOURCES: 'sources',
	    ROOT_DIR: ROOT_DIR,
	    IMAGES_DIR: IMAGES_DIR,
	    FLAGS_DIR: IMAGES_DIR + 'flags/',
	
	    COUNTRIES: {
	        au: 'au',
	        de: 'de',
	        gb: 'gb',
	        in: 'in',
	        it: 'it',
	        us: 'us'
	    },
	
	    LANGUAGES: {
	        en: 'us',
	        fr: 'fr',
	        de: 'de'
	    },
	
	    CATEGORIES: {
	        'business': 'Business',
	        'entertainment': 'Entertainment',
	        'gaming': 'Gaming',
	        'general': 'General',
	        'music': 'Music',
	        'science-and-nature': 'Science and Nature',
	        'sport': 'Sport',
	        'technology': 'Technology'
	    },
	
	    GLOBAL_SETTINGS: {
	        language: 'en',
	        country: 'us',
	        category: 'general'
	    }
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _map = __webpack_require__(54);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _getPrototypeOf = __webpack_require__(76);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(80);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(81);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(85);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _get2 = __webpack_require__(103);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _inherits2 = __webpack_require__(107);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _constants = __webpack_require__(74);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _generators = __webpack_require__(115);
	
	var _generators2 = _interopRequireDefault(_generators);
	
	var _model = __webpack_require__(120);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Article = function (_Model) {
	    (0, _inherits3.default)(Article, _Model);
	
	    function Article() {
	        (0, _classCallCheck3.default)(this, Article);
	        return (0, _possibleConstructorReturn3.default)(this, (Article.__proto__ || (0, _getPrototypeOf2.default)(Article)).call(this, '' + _constants2.default.NEWS_API_URL + _constants2.default.NEWS_API_ARTICLES));
	    }
	
	    (0, _createClass3.default)(Article, [{
	        key: 'get',
	        value: function get() {
	            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _map2.default();
	
	            return (0, _get3.default)(Article.prototype.__proto__ || (0, _getPrototypeOf2.default)(Article.prototype), 'get', this).call(this, params).then(function (data) {
	                if (data.status === 'ok') {
	                    return _generators2.default.articleGenerator(data);
	                } else {
	                    throw new Error(data.message);
	                }
	            });
	        }
	    }]);
	    return Article;
	}(_model2.default);
	
	exports.default = Article;
	;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(78);
	module.exports = __webpack_require__(16).Object.getPrototypeOf;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(48)
	  , $getPrototypeOf = __webpack_require__(47);
	
	__webpack_require__(79)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14)
	  , core    = __webpack_require__(16)
	  , fails   = __webpack_require__(25);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(82);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84);
	var $Object = __webpack_require__(16).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(24), 'Object', {defineProperty: __webpack_require__(20).f});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(86);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(87);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(90);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	__webpack_require__(3);
	module.exports = __webpack_require__(89).f('iterator');

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(46);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	__webpack_require__(56);
	__webpack_require__(101);
	__webpack_require__(102);
	module.exports = __webpack_require__(16).Symbol;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(15)
	  , has            = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(24)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(29)
	  , META           = __webpack_require__(65).KEY
	  , $fails         = __webpack_require__(25)
	  , shared         = __webpack_require__(41)
	  , setToStringTag = __webpack_require__(45)
	  , uid            = __webpack_require__(42)
	  , wks            = __webpack_require__(46)
	  , wksExt         = __webpack_require__(89)
	  , wksDefine      = __webpack_require__(93)
	  , keyOf          = __webpack_require__(94)
	  , enumKeys       = __webpack_require__(95)
	  , isArray        = __webpack_require__(70)
	  , anObject       = __webpack_require__(21)
	  , toIObject      = __webpack_require__(8)
	  , toPrimitive    = __webpack_require__(27)
	  , createDesc     = __webpack_require__(28)
	  , _create        = __webpack_require__(32)
	  , gOPNExt        = __webpack_require__(98)
	  , $GOPD          = __webpack_require__(100)
	  , $DP            = __webpack_require__(20)
	  , $keys          = __webpack_require__(34)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(99).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(97).f  = $propertyIsEnumerable;
	  __webpack_require__(96).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(13)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(19)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(15)
	  , core           = __webpack_require__(16)
	  , LIBRARY        = __webpack_require__(13)
	  , wksExt         = __webpack_require__(89)
	  , defineProperty = __webpack_require__(20).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(34)
	  , toIObject = __webpack_require__(8);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(34)
	  , gOPS    = __webpack_require__(96)
	  , pIE     = __webpack_require__(97);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 96 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 97 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(8)
	  , gOPN      = __webpack_require__(99).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(35)
	  , hiddenKeys = __webpack_require__(43).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(97)
	  , createDesc     = __webpack_require__(28)
	  , toIObject      = __webpack_require__(8)
	  , toPrimitive    = __webpack_require__(27)
	  , has            = __webpack_require__(30)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(24) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93)('asyncIterator');

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93)('observable');

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _getPrototypeOf = __webpack_require__(76);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _getOwnPropertyDescriptor = __webpack_require__(104);
	
	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);
	
	  if (desc === undefined) {
	    var parent = (0, _getPrototypeOf2.default)(object);
	
	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;
	
	    if (getter === undefined) {
	      return undefined;
	    }
	
	    return getter.call(receiver);
	  }
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(106);
	var $Object = __webpack_require__(16).Object;
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(8)
	  , $getOwnPropertyDescriptor = __webpack_require__(100).f;
	
	__webpack_require__(79)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(108);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(112);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(86);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(110);
	module.exports = __webpack_require__(16).Object.setPrototypeOf;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(14);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(111).set});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(22)
	  , anObject = __webpack_require__(21);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(17)(Function.call, __webpack_require__(100).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(114);
	var $Object = __webpack_require__(16).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(32)});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _regenerator = __webpack_require__(116);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _classCallCheck2 = __webpack_require__(80);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(81);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Generators = function () {
	    function Generators() {
	        (0, _classCallCheck3.default)(this, Generators);
	    }
	
	    (0, _createClass3.default)(Generators, null, [{
	        key: "articleGenerator",
	        value: _regenerator2.default.mark(function articleGenerator(response) {
	            var idx;
	            return _regenerator2.default.wrap(function articleGenerator$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            idx = 0;
	
	                        case 1:
	                            if (!(idx < response.articles.length)) {
	                                _context.next = 6;
	                                break;
	                            }
	
	                            _context.next = 4;
	                            return response.articles[idx++];
	
	                        case 4:
	                            _context.next = 1;
	                            break;
	
	                        case 6:
	                        case "end":
	                            return _context.stop();
	                    }
	                }
	            }, articleGenerator, this);
	        })
	    }, {
	        key: "sourceGenerator",
	        value: _regenerator2.default.mark(function sourceGenerator(response) {
	            var idx;
	            return _regenerator2.default.wrap(function sourceGenerator$(_context2) {
	                while (1) {
	                    switch (_context2.prev = _context2.next) {
	                        case 0:
	                            idx = 0;
	
	                        case 1:
	                            if (!(idx < response.sources.length)) {
	                                _context2.next = 6;
	                                break;
	                            }
	
	                            _context2.next = 4;
	                            return response.sources[idx++];
	
	                        case 4:
	                            _context2.next = 1;
	                            break;
	
	                        case 6:
	                        case "end":
	                            return _context2.stop();
	                    }
	                }
	            }, sourceGenerator, this);
	        })
	    }]);
	    return Generators;
	}();
	
	exports.default = Generators;
	;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(117);


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;
	
	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
	
	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;
	
	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;
	
	module.exports = __webpack_require__(118);
	
	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(119)))

/***/ },
/* 119 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
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
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray2 = __webpack_require__(121);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _getIterator2 = __webpack_require__(1);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _map = __webpack_require__(54);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _classCallCheck2 = __webpack_require__(80);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(81);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _constants = __webpack_require__(74);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Model = function () {
	    function Model(apiUri) {
	        (0, _classCallCheck3.default)(this, Model);
	
	        this.apiUri = apiUri;
	        this.apiKey = _constants2.default.API_KEY;
	    }
	
	    (0, _createClass3.default)(Model, [{
	        key: 'get',
	        value: function get() {
	            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _map2.default();
	
	            params.set('apiKey', this.apiKey);
	            var uri = this.apiUri + '?' + Model.serialize(params);
	            var init = {
	                method: 'GET'
	            };
	            var request = new Request(uri, init);
	
	            return fetch(request).then(function (response) {
	                return response.json().then(function (json) {
	                    return json;
	                });
	            }).catch(function (err) {
	                return [];
	            });
	        }
	    }], [{
	        key: 'serialize',
	        value: function serialize() {
	            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _map2.default();
	
	            var result = [];
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = (0, _getIterator3.default)(params), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
	                        p = _step$value[0],
	                        v = _step$value[1];
	
	                    var param = encodeURIComponent(p);
	                    var value = encodeURIComponent(v);
	                    result.push(param + '=' + value);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return result.join('&');
	        }
	    }]);
	    return Model;
	}();
	
	exports.default = Model;
	;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(122);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(1);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(123), __esModule: true };

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(49);
	module.exports = __webpack_require__(124);

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(53)
	  , ITERATOR  = __webpack_require__(46)('iterator')
	  , Iterators = __webpack_require__(7);
	module.exports = __webpack_require__(16).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _map = __webpack_require__(54);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _getPrototypeOf = __webpack_require__(76);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(80);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(81);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(85);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _get2 = __webpack_require__(103);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _inherits2 = __webpack_require__(107);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _constants = __webpack_require__(74);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _generators = __webpack_require__(115);
	
	var _generators2 = _interopRequireDefault(_generators);
	
	var _model = __webpack_require__(120);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Source = function (_Model) {
	    (0, _inherits3.default)(Source, _Model);
	
	    function Source() {
	        (0, _classCallCheck3.default)(this, Source);
	        return (0, _possibleConstructorReturn3.default)(this, (Source.__proto__ || (0, _getPrototypeOf2.default)(Source)).call(this, '' + _constants2.default.NEWS_API_URL + _constants2.default.NEWS_API_SOURCES));
	    }
	
	    (0, _createClass3.default)(Source, [{
	        key: 'get',
	        value: function get() {
	            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _map2.default();
	
	            return (0, _get3.default)(Source.prototype.__proto__ || (0, _getPrototypeOf2.default)(Source.prototype), 'get', this).call(this, params).then(function (data) {
	                if (data.status === 'ok') {
	                    return _generators2.default.sourceGenerator(data);
	                } else {
	                    throw new Error(data.message);
	                }
	            });
	        }
	    }]);
	    return Source;
	}(_model2.default);
	
	exports.default = Source;
	;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.17.0
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com
	
	;(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, (function () { 'use strict';
	
	var hookCallback;
	
	function hooks () {
	    return hookCallback.apply(null, arguments);
	}
	
	// This is done to register the method called with moment()
	// without creating circular dependencies.
	function setHookCallback (callback) {
	    hookCallback = callback;
	}
	
	function isArray(input) {
	    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	}
	
	function isObject(input) {
	    // IE8 will treat undefined and null as object if it wasn't for
	    // input != null
	    return input != null && Object.prototype.toString.call(input) === '[object Object]';
	}
	
	function isObjectEmpty(obj) {
	    var k;
	    for (k in obj) {
	        // even if its not own property I'd still call it non-empty
	        return false;
	    }
	    return true;
	}
	
	function isNumber(input) {
	    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
	}
	
	function isDate(input) {
	    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	}
	
	function map(arr, fn) {
	    var res = [], i;
	    for (i = 0; i < arr.length; ++i) {
	        res.push(fn(arr[i], i));
	    }
	    return res;
	}
	
	function hasOwnProp(a, b) {
	    return Object.prototype.hasOwnProperty.call(a, b);
	}
	
	function extend(a, b) {
	    for (var i in b) {
	        if (hasOwnProp(b, i)) {
	            a[i] = b[i];
	        }
	    }
	
	    if (hasOwnProp(b, 'toString')) {
	        a.toString = b.toString;
	    }
	
	    if (hasOwnProp(b, 'valueOf')) {
	        a.valueOf = b.valueOf;
	    }
	
	    return a;
	}
	
	function createUTC (input, format, locale, strict) {
	    return createLocalOrUTC(input, format, locale, strict, true).utc();
	}
	
	function defaultParsingFlags() {
	    // We need to deep clone this object.
	    return {
	        empty           : false,
	        unusedTokens    : [],
	        unusedInput     : [],
	        overflow        : -2,
	        charsLeftOver   : 0,
	        nullInput       : false,
	        invalidMonth    : null,
	        invalidFormat   : false,
	        userInvalidated : false,
	        iso             : false,
	        parsedDateParts : [],
	        meridiem        : null
	    };
	}
	
	function getParsingFlags(m) {
	    if (m._pf == null) {
	        m._pf = defaultParsingFlags();
	    }
	    return m._pf;
	}
	
	var some;
	if (Array.prototype.some) {
	    some = Array.prototype.some;
	} else {
	    some = function (fun) {
	        var t = Object(this);
	        var len = t.length >>> 0;
	
	        for (var i = 0; i < len; i++) {
	            if (i in t && fun.call(this, t[i], i, t)) {
	                return true;
	            }
	        }
	
	        return false;
	    };
	}
	
	var some$1 = some;
	
	function isValid(m) {
	    if (m._isValid == null) {
	        var flags = getParsingFlags(m);
	        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
	            return i != null;
	        });
	        var isNowValid = !isNaN(m._d.getTime()) &&
	            flags.overflow < 0 &&
	            !flags.empty &&
	            !flags.invalidMonth &&
	            !flags.invalidWeekday &&
	            !flags.nullInput &&
	            !flags.invalidFormat &&
	            !flags.userInvalidated &&
	            (!flags.meridiem || (flags.meridiem && parsedParts));
	
	        if (m._strict) {
	            isNowValid = isNowValid &&
	                flags.charsLeftOver === 0 &&
	                flags.unusedTokens.length === 0 &&
	                flags.bigHour === undefined;
	        }
	
	        if (Object.isFrozen == null || !Object.isFrozen(m)) {
	            m._isValid = isNowValid;
	        }
	        else {
	            return isNowValid;
	        }
	    }
	    return m._isValid;
	}
	
	function createInvalid (flags) {
	    var m = createUTC(NaN);
	    if (flags != null) {
	        extend(getParsingFlags(m), flags);
	    }
	    else {
	        getParsingFlags(m).userInvalidated = true;
	    }
	
	    return m;
	}
	
	function isUndefined(input) {
	    return input === void 0;
	}
	
	// Plugins that add properties should also add the key here (null value),
	// so we can properly clone ourselves.
	var momentProperties = hooks.momentProperties = [];
	
	function copyConfig(to, from) {
	    var i, prop, val;
	
	    if (!isUndefined(from._isAMomentObject)) {
	        to._isAMomentObject = from._isAMomentObject;
	    }
	    if (!isUndefined(from._i)) {
	        to._i = from._i;
	    }
	    if (!isUndefined(from._f)) {
	        to._f = from._f;
	    }
	    if (!isUndefined(from._l)) {
	        to._l = from._l;
	    }
	    if (!isUndefined(from._strict)) {
	        to._strict = from._strict;
	    }
	    if (!isUndefined(from._tzm)) {
	        to._tzm = from._tzm;
	    }
	    if (!isUndefined(from._isUTC)) {
	        to._isUTC = from._isUTC;
	    }
	    if (!isUndefined(from._offset)) {
	        to._offset = from._offset;
	    }
	    if (!isUndefined(from._pf)) {
	        to._pf = getParsingFlags(from);
	    }
	    if (!isUndefined(from._locale)) {
	        to._locale = from._locale;
	    }
	
	    if (momentProperties.length > 0) {
	        for (i in momentProperties) {
	            prop = momentProperties[i];
	            val = from[prop];
	            if (!isUndefined(val)) {
	                to[prop] = val;
	            }
	        }
	    }
	
	    return to;
	}
	
	var updateInProgress = false;
	
	// Moment prototype object
	function Moment(config) {
	    copyConfig(this, config);
	    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	    if (!this.isValid()) {
	        this._d = new Date(NaN);
	    }
	    // Prevent infinite loop in case updateOffset creates new moment
	    // objects.
	    if (updateInProgress === false) {
	        updateInProgress = true;
	        hooks.updateOffset(this);
	        updateInProgress = false;
	    }
	}
	
	function isMoment (obj) {
	    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	}
	
	function absFloor (number) {
	    if (number < 0) {
	        // -0 -> 0
	        return Math.ceil(number) || 0;
	    } else {
	        return Math.floor(number);
	    }
	}
	
	function toInt(argumentForCoercion) {
	    var coercedNumber = +argumentForCoercion,
	        value = 0;
	
	    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	        value = absFloor(coercedNumber);
	    }
	
	    return value;
	}
	
	// compare two arrays, return the number of differences
	function compareArrays(array1, array2, dontConvert) {
	    var len = Math.min(array1.length, array2.length),
	        lengthDiff = Math.abs(array1.length - array2.length),
	        diffs = 0,
	        i;
	    for (i = 0; i < len; i++) {
	        if ((dontConvert && array1[i] !== array2[i]) ||
	            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	            diffs++;
	        }
	    }
	    return diffs + lengthDiff;
	}
	
	function warn(msg) {
	    if (hooks.suppressDeprecationWarnings === false &&
	            (typeof console !==  'undefined') && console.warn) {
	        console.warn('Deprecation warning: ' + msg);
	    }
	}
	
	function deprecate(msg, fn) {
	    var firstTime = true;
	
	    return extend(function () {
	        if (hooks.deprecationHandler != null) {
	            hooks.deprecationHandler(null, msg);
	        }
	        if (firstTime) {
	            var args = [];
	            var arg;
	            for (var i = 0; i < arguments.length; i++) {
	                arg = '';
	                if (typeof arguments[i] === 'object') {
	                    arg += '\n[' + i + '] ';
	                    for (var key in arguments[0]) {
	                        arg += key + ': ' + arguments[0][key] + ', ';
	                    }
	                    arg = arg.slice(0, -2); // Remove trailing comma and space
	                } else {
	                    arg = arguments[i];
	                }
	                args.push(arg);
	            }
	            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
	            firstTime = false;
	        }
	        return fn.apply(this, arguments);
	    }, fn);
	}
	
	var deprecations = {};
	
	function deprecateSimple(name, msg) {
	    if (hooks.deprecationHandler != null) {
	        hooks.deprecationHandler(name, msg);
	    }
	    if (!deprecations[name]) {
	        warn(msg);
	        deprecations[name] = true;
	    }
	}
	
	hooks.suppressDeprecationWarnings = false;
	hooks.deprecationHandler = null;
	
	function isFunction(input) {
	    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	}
	
	function set (config) {
	    var prop, i;
	    for (i in config) {
	        prop = config[i];
	        if (isFunction(prop)) {
	            this[i] = prop;
	        } else {
	            this['_' + i] = prop;
	        }
	    }
	    this._config = config;
	    // Lenient ordinal parsing accepts just a number in addition to
	    // number + (possibly) stuff coming from _ordinalParseLenient.
	    this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	}
	
	function mergeConfigs(parentConfig, childConfig) {
	    var res = extend({}, parentConfig), prop;
	    for (prop in childConfig) {
	        if (hasOwnProp(childConfig, prop)) {
	            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                res[prop] = {};
	                extend(res[prop], parentConfig[prop]);
	                extend(res[prop], childConfig[prop]);
	            } else if (childConfig[prop] != null) {
	                res[prop] = childConfig[prop];
	            } else {
	                delete res[prop];
	            }
	        }
	    }
	    for (prop in parentConfig) {
	        if (hasOwnProp(parentConfig, prop) &&
	                !hasOwnProp(childConfig, prop) &&
	                isObject(parentConfig[prop])) {
	            // make sure changes to properties don't modify parent config
	            res[prop] = extend({}, res[prop]);
	        }
	    }
	    return res;
	}
	
	function Locale(config) {
	    if (config != null) {
	        this.set(config);
	    }
	}
	
	var keys;
	
	if (Object.keys) {
	    keys = Object.keys;
	} else {
	    keys = function (obj) {
	        var i, res = [];
	        for (i in obj) {
	            if (hasOwnProp(obj, i)) {
	                res.push(i);
	            }
	        }
	        return res;
	    };
	}
	
	var keys$1 = keys;
	
	var defaultCalendar = {
	    sameDay : '[Today at] LT',
	    nextDay : '[Tomorrow at] LT',
	    nextWeek : 'dddd [at] LT',
	    lastDay : '[Yesterday at] LT',
	    lastWeek : '[Last] dddd [at] LT',
	    sameElse : 'L'
	};
	
	function calendar (key, mom, now) {
	    var output = this._calendar[key] || this._calendar['sameElse'];
	    return isFunction(output) ? output.call(mom, now) : output;
	}
	
	var defaultLongDateFormat = {
	    LTS  : 'h:mm:ss A',
	    LT   : 'h:mm A',
	    L    : 'MM/DD/YYYY',
	    LL   : 'MMMM D, YYYY',
	    LLL  : 'MMMM D, YYYY h:mm A',
	    LLLL : 'dddd, MMMM D, YYYY h:mm A'
	};
	
	function longDateFormat (key) {
	    var format = this._longDateFormat[key],
	        formatUpper = this._longDateFormat[key.toUpperCase()];
	
	    if (format || !formatUpper) {
	        return format;
	    }
	
	    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	        return val.slice(1);
	    });
	
	    return this._longDateFormat[key];
	}
	
	var defaultInvalidDate = 'Invalid date';
	
	function invalidDate () {
	    return this._invalidDate;
	}
	
	var defaultOrdinal = '%d';
	var defaultOrdinalParse = /\d{1,2}/;
	
	function ordinal (number) {
	    return this._ordinal.replace('%d', number);
	}
	
	var defaultRelativeTime = {
	    future : 'in %s',
	    past   : '%s ago',
	    s  : 'a few seconds',
	    m  : 'a minute',
	    mm : '%d minutes',
	    h  : 'an hour',
	    hh : '%d hours',
	    d  : 'a day',
	    dd : '%d days',
	    M  : 'a month',
	    MM : '%d months',
	    y  : 'a year',
	    yy : '%d years'
	};
	
	function relativeTime (number, withoutSuffix, string, isFuture) {
	    var output = this._relativeTime[string];
	    return (isFunction(output)) ?
	        output(number, withoutSuffix, string, isFuture) :
	        output.replace(/%d/i, number);
	}
	
	function pastFuture (diff, output) {
	    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	}
	
	var aliases = {};
	
	function addUnitAlias (unit, shorthand) {
	    var lowerCase = unit.toLowerCase();
	    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	}
	
	function normalizeUnits(units) {
	    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	}
	
	function normalizeObjectUnits(inputObject) {
	    var normalizedInput = {},
	        normalizedProp,
	        prop;
	
	    for (prop in inputObject) {
	        if (hasOwnProp(inputObject, prop)) {
	            normalizedProp = normalizeUnits(prop);
	            if (normalizedProp) {
	                normalizedInput[normalizedProp] = inputObject[prop];
	            }
	        }
	    }
	
	    return normalizedInput;
	}
	
	var priorities = {};
	
	function addUnitPriority(unit, priority) {
	    priorities[unit] = priority;
	}
	
	function getPrioritizedUnits(unitsObj) {
	    var units = [];
	    for (var u in unitsObj) {
	        units.push({unit: u, priority: priorities[u]});
	    }
	    units.sort(function (a, b) {
	        return a.priority - b.priority;
	    });
	    return units;
	}
	
	function makeGetSet (unit, keepTime) {
	    return function (value) {
	        if (value != null) {
	            set$1(this, unit, value);
	            hooks.updateOffset(this, keepTime);
	            return this;
	        } else {
	            return get(this, unit);
	        }
	    };
	}
	
	function get (mom, unit) {
	    return mom.isValid() ?
	        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	}
	
	function set$1 (mom, unit, value) {
	    if (mom.isValid()) {
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	    }
	}
	
	// MOMENTS
	
	function stringGet (units) {
	    units = normalizeUnits(units);
	    if (isFunction(this[units])) {
	        return this[units]();
	    }
	    return this;
	}
	
	
	function stringSet (units, value) {
	    if (typeof units === 'object') {
	        units = normalizeObjectUnits(units);
	        var prioritized = getPrioritizedUnits(units);
	        for (var i = 0; i < prioritized.length; i++) {
	            this[prioritized[i].unit](units[prioritized[i].unit]);
	        }
	    } else {
	        units = normalizeUnits(units);
	        if (isFunction(this[units])) {
	            return this[units](value);
	        }
	    }
	    return this;
	}
	
	function zeroFill(number, targetLength, forceSign) {
	    var absNumber = '' + Math.abs(number),
	        zerosToFill = targetLength - absNumber.length,
	        sign = number >= 0;
	    return (sign ? (forceSign ? '+' : '') : '-') +
	        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	}
	
	var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
	
	var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
	
	var formatFunctions = {};
	
	var formatTokenFunctions = {};
	
	// token:    'M'
	// padded:   ['MM', 2]
	// ordinal:  'Mo'
	// callback: function () { this.month() + 1 }
	function addFormatToken (token, padded, ordinal, callback) {
	    var func = callback;
	    if (typeof callback === 'string') {
	        func = function () {
	            return this[callback]();
	        };
	    }
	    if (token) {
	        formatTokenFunctions[token] = func;
	    }
	    if (padded) {
	        formatTokenFunctions[padded[0]] = function () {
	            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	        };
	    }
	    if (ordinal) {
	        formatTokenFunctions[ordinal] = function () {
	            return this.localeData().ordinal(func.apply(this, arguments), token);
	        };
	    }
	}
	
	function removeFormattingTokens(input) {
	    if (input.match(/\[[\s\S]/)) {
	        return input.replace(/^\[|\]$/g, '');
	    }
	    return input.replace(/\\/g, '');
	}
	
	function makeFormatFunction(format) {
	    var array = format.match(formattingTokens), i, length;
	
	    for (i = 0, length = array.length; i < length; i++) {
	        if (formatTokenFunctions[array[i]]) {
	            array[i] = formatTokenFunctions[array[i]];
	        } else {
	            array[i] = removeFormattingTokens(array[i]);
	        }
	    }
	
	    return function (mom) {
	        var output = '', i;
	        for (i = 0; i < length; i++) {
	            output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	        }
	        return output;
	    };
	}
	
	// format date using native date object
	function formatMoment(m, format) {
	    if (!m.isValid()) {
	        return m.localeData().invalidDate();
	    }
	
	    format = expandFormat(format, m.localeData());
	    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
	
	    return formatFunctions[format](m);
	}
	
	function expandFormat(format, locale) {
	    var i = 5;
	
	    function replaceLongDateFormatTokens(input) {
	        return locale.longDateFormat(input) || input;
	    }
	
	    localFormattingTokens.lastIndex = 0;
	    while (i >= 0 && localFormattingTokens.test(format)) {
	        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	        localFormattingTokens.lastIndex = 0;
	        i -= 1;
	    }
	
	    return format;
	}
	
	var match1         = /\d/;            //       0 - 9
	var match2         = /\d\d/;          //      00 - 99
	var match3         = /\d{3}/;         //     000 - 999
	var match4         = /\d{4}/;         //    0000 - 9999
	var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	var match1to2      = /\d\d?/;         //       0 - 99
	var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	var match1to3      = /\d{1,3}/;       //       0 - 999
	var match1to4      = /\d{1,4}/;       //       0 - 9999
	var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999
	
	var matchUnsigned  = /\d+/;           //       0 - inf
	var matchSigned    = /[+-]?\d+/;      //    -inf - inf
	
	var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z
	
	var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
	
	// any word (or two) characters or numbers including two/three word month in arabic.
	// includes scottish gaelic two word and hyphenated months
	var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
	
	
	var regexes = {};
	
	function addRegexToken (token, regex, strictRegex) {
	    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	        return (isStrict && strictRegex) ? strictRegex : regex;
	    };
	}
	
	function getParseRegexForToken (token, config) {
	    if (!hasOwnProp(regexes, token)) {
	        return new RegExp(unescapeFormat(token));
	    }
	
	    return regexes[token](config._strict, config._locale);
	}
	
	// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	function unescapeFormat(s) {
	    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	        return p1 || p2 || p3 || p4;
	    }));
	}
	
	function regexEscape(s) {
	    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	
	var tokens = {};
	
	function addParseToken (token, callback) {
	    var i, func = callback;
	    if (typeof token === 'string') {
	        token = [token];
	    }
	    if (isNumber(callback)) {
	        func = function (input, array) {
	            array[callback] = toInt(input);
	        };
	    }
	    for (i = 0; i < token.length; i++) {
	        tokens[token[i]] = func;
	    }
	}
	
	function addWeekParseToken (token, callback) {
	    addParseToken(token, function (input, array, config, token) {
	        config._w = config._w || {};
	        callback(input, config._w, config, token);
	    });
	}
	
	function addTimeToArrayFromToken(token, input, config) {
	    if (input != null && hasOwnProp(tokens, token)) {
	        tokens[token](input, config._a, config, token);
	    }
	}
	
	var YEAR = 0;
	var MONTH = 1;
	var DATE = 2;
	var HOUR = 3;
	var MINUTE = 4;
	var SECOND = 5;
	var MILLISECOND = 6;
	var WEEK = 7;
	var WEEKDAY = 8;
	
	var indexOf;
	
	if (Array.prototype.indexOf) {
	    indexOf = Array.prototype.indexOf;
	} else {
	    indexOf = function (o) {
	        // I know
	        var i;
	        for (i = 0; i < this.length; ++i) {
	            if (this[i] === o) {
	                return i;
	            }
	        }
	        return -1;
	    };
	}
	
	var indexOf$1 = indexOf;
	
	function daysInMonth(year, month) {
	    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	}
	
	// FORMATTING
	
	addFormatToken('M', ['MM', 2], 'Mo', function () {
	    return this.month() + 1;
	});
	
	addFormatToken('MMM', 0, 0, function (format) {
	    return this.localeData().monthsShort(this, format);
	});
	
	addFormatToken('MMMM', 0, 0, function (format) {
	    return this.localeData().months(this, format);
	});
	
	// ALIASES
	
	addUnitAlias('month', 'M');
	
	// PRIORITY
	
	addUnitPriority('month', 8);
	
	// PARSING
	
	addRegexToken('M',    match1to2);
	addRegexToken('MM',   match1to2, match2);
	addRegexToken('MMM',  function (isStrict, locale) {
	    return locale.monthsShortRegex(isStrict);
	});
	addRegexToken('MMMM', function (isStrict, locale) {
	    return locale.monthsRegex(isStrict);
	});
	
	addParseToken(['M', 'MM'], function (input, array) {
	    array[MONTH] = toInt(input) - 1;
	});
	
	addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	    var month = config._locale.monthsParse(input, token, config._strict);
	    // if we didn't find a month name, mark the date as invalid.
	    if (month != null) {
	        array[MONTH] = month;
	    } else {
	        getParsingFlags(config).invalidMonth = input;
	    }
	});
	
	// LOCALES
	
	var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
	var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	function localeMonths (m, format) {
	    if (!m) {
	        return this._months;
	    }
	    return isArray(this._months) ? this._months[m.month()] :
	        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
	}
	
	var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	function localeMonthsShort (m, format) {
	    if (!m) {
	        return this._monthsShort;
	    }
	    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	}
	
	function handleStrictParse(monthName, format, strict) {
	    var i, ii, mom, llc = monthName.toLocaleLowerCase();
	    if (!this._monthsParse) {
	        // this is not used
	        this._monthsParse = [];
	        this._longMonthsParse = [];
	        this._shortMonthsParse = [];
	        for (i = 0; i < 12; ++i) {
	            mom = createUTC([2000, i]);
	            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
	            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	        }
	    }
	
	    if (strict) {
	        if (format === 'MMM') {
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    } else {
	        if (format === 'MMM') {
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    }
	}
	
	function localeMonthsParse (monthName, format, strict) {
	    var i, mom, regex;
	
	    if (this._monthsParseExact) {
	        return handleStrictParse.call(this, monthName, format, strict);
	    }
	
	    if (!this._monthsParse) {
	        this._monthsParse = [];
	        this._longMonthsParse = [];
	        this._shortMonthsParse = [];
	    }
	
	    // TODO: add sorting
	    // Sorting makes sure if one month (or abbr) is a prefix of another
	    // see sorting in computeMonthsParse
	    for (i = 0; i < 12; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, i]);
	        if (strict && !this._longMonthsParse[i]) {
	            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	        }
	        if (!strict && !this._monthsParse[i]) {
	            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	        }
	        // test the regex
	        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	            return i;
	        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	            return i;
	        } else if (!strict && this._monthsParse[i].test(monthName)) {
	            return i;
	        }
	    }
	}
	
	// MOMENTS
	
	function setMonth (mom, value) {
	    var dayOfMonth;
	
	    if (!mom.isValid()) {
	        // No op
	        return mom;
	    }
	
	    if (typeof value === 'string') {
	        if (/^\d+$/.test(value)) {
	            value = toInt(value);
	        } else {
	            value = mom.localeData().monthsParse(value);
	            // TODO: Another silent failure?
	            if (!isNumber(value)) {
	                return mom;
	            }
	        }
	    }
	
	    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	    return mom;
	}
	
	function getSetMonth (value) {
	    if (value != null) {
	        setMonth(this, value);
	        hooks.updateOffset(this, true);
	        return this;
	    } else {
	        return get(this, 'Month');
	    }
	}
	
	function getDaysInMonth () {
	    return daysInMonth(this.year(), this.month());
	}
	
	var defaultMonthsShortRegex = matchWord;
	function monthsShortRegex (isStrict) {
	    if (this._monthsParseExact) {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            computeMonthsParse.call(this);
	        }
	        if (isStrict) {
	            return this._monthsShortStrictRegex;
	        } else {
	            return this._monthsShortRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_monthsShortRegex')) {
	            this._monthsShortRegex = defaultMonthsShortRegex;
	        }
	        return this._monthsShortStrictRegex && isStrict ?
	            this._monthsShortStrictRegex : this._monthsShortRegex;
	    }
	}
	
	var defaultMonthsRegex = matchWord;
	function monthsRegex (isStrict) {
	    if (this._monthsParseExact) {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            computeMonthsParse.call(this);
	        }
	        if (isStrict) {
	            return this._monthsStrictRegex;
	        } else {
	            return this._monthsRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            this._monthsRegex = defaultMonthsRegex;
	        }
	        return this._monthsStrictRegex && isStrict ?
	            this._monthsStrictRegex : this._monthsRegex;
	    }
	}
	
	function computeMonthsParse () {
	    function cmpLenRev(a, b) {
	        return b.length - a.length;
	    }
	
	    var shortPieces = [], longPieces = [], mixedPieces = [],
	        i, mom;
	    for (i = 0; i < 12; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, i]);
	        shortPieces.push(this.monthsShort(mom, ''));
	        longPieces.push(this.months(mom, ''));
	        mixedPieces.push(this.months(mom, ''));
	        mixedPieces.push(this.monthsShort(mom, ''));
	    }
	    // Sorting makes sure if one month (or abbr) is a prefix of another it
	    // will match the longer piece.
	    shortPieces.sort(cmpLenRev);
	    longPieces.sort(cmpLenRev);
	    mixedPieces.sort(cmpLenRev);
	    for (i = 0; i < 12; i++) {
	        shortPieces[i] = regexEscape(shortPieces[i]);
	        longPieces[i] = regexEscape(longPieces[i]);
	    }
	    for (i = 0; i < 24; i++) {
	        mixedPieces[i] = regexEscape(mixedPieces[i]);
	    }
	
	    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	    this._monthsShortRegex = this._monthsRegex;
	    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	}
	
	// FORMATTING
	
	addFormatToken('Y', 0, 0, function () {
	    var y = this.year();
	    return y <= 9999 ? '' + y : '+' + y;
	});
	
	addFormatToken(0, ['YY', 2], 0, function () {
	    return this.year() % 100;
	});
	
	addFormatToken(0, ['YYYY',   4],       0, 'year');
	addFormatToken(0, ['YYYYY',  5],       0, 'year');
	addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');
	
	// ALIASES
	
	addUnitAlias('year', 'y');
	
	// PRIORITIES
	
	addUnitPriority('year', 1);
	
	// PARSING
	
	addRegexToken('Y',      matchSigned);
	addRegexToken('YY',     match1to2, match2);
	addRegexToken('YYYY',   match1to4, match4);
	addRegexToken('YYYYY',  match1to6, match6);
	addRegexToken('YYYYYY', match1to6, match6);
	
	addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	addParseToken('YYYY', function (input, array) {
	    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
	});
	addParseToken('YY', function (input, array) {
	    array[YEAR] = hooks.parseTwoDigitYear(input);
	});
	addParseToken('Y', function (input, array) {
	    array[YEAR] = parseInt(input, 10);
	});
	
	// HELPERS
	
	function daysInYear(year) {
	    return isLeapYear(year) ? 366 : 365;
	}
	
	function isLeapYear(year) {
	    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}
	
	// HOOKS
	
	hooks.parseTwoDigitYear = function (input) {
	    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	};
	
	// MOMENTS
	
	var getSetYear = makeGetSet('FullYear', true);
	
	function getIsLeapYear () {
	    return isLeapYear(this.year());
	}
	
	function createDate (y, m, d, h, M, s, ms) {
	    //can't just apply() to create a date:
	    //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	    var date = new Date(y, m, d, h, M, s, ms);
	
	    //the date constructor remaps years 0-99 to 1900-1999
	    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	        date.setFullYear(y);
	    }
	    return date;
	}
	
	function createUTCDate (y) {
	    var date = new Date(Date.UTC.apply(null, arguments));
	
	    //the Date.UTC function remaps years 0-99 to 1900-1999
	    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	        date.setUTCFullYear(y);
	    }
	    return date;
	}
	
	// start-of-first-week - start-of-year
	function firstWeekOffset(year, dow, doy) {
	    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	        fwd = 7 + dow - doy,
	        // first-week day local weekday -- which local weekday is fwd
	        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
	
	    return -fwdlw + fwd - 1;
	}
	
	//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	    var localWeekday = (7 + weekday - dow) % 7,
	        weekOffset = firstWeekOffset(year, dow, doy),
	        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	        resYear, resDayOfYear;
	
	    if (dayOfYear <= 0) {
	        resYear = year - 1;
	        resDayOfYear = daysInYear(resYear) + dayOfYear;
	    } else if (dayOfYear > daysInYear(year)) {
	        resYear = year + 1;
	        resDayOfYear = dayOfYear - daysInYear(year);
	    } else {
	        resYear = year;
	        resDayOfYear = dayOfYear;
	    }
	
	    return {
	        year: resYear,
	        dayOfYear: resDayOfYear
	    };
	}
	
	function weekOfYear(mom, dow, doy) {
	    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	        resWeek, resYear;
	
	    if (week < 1) {
	        resYear = mom.year() - 1;
	        resWeek = week + weeksInYear(resYear, dow, doy);
	    } else if (week > weeksInYear(mom.year(), dow, doy)) {
	        resWeek = week - weeksInYear(mom.year(), dow, doy);
	        resYear = mom.year() + 1;
	    } else {
	        resYear = mom.year();
	        resWeek = week;
	    }
	
	    return {
	        week: resWeek,
	        year: resYear
	    };
	}
	
	function weeksInYear(year, dow, doy) {
	    var weekOffset = firstWeekOffset(year, dow, doy),
	        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	}
	
	// FORMATTING
	
	addFormatToken('w', ['ww', 2], 'wo', 'week');
	addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');
	
	// ALIASES
	
	addUnitAlias('week', 'w');
	addUnitAlias('isoWeek', 'W');
	
	// PRIORITIES
	
	addUnitPriority('week', 5);
	addUnitPriority('isoWeek', 5);
	
	// PARSING
	
	addRegexToken('w',  match1to2);
	addRegexToken('ww', match1to2, match2);
	addRegexToken('W',  match1to2);
	addRegexToken('WW', match1to2, match2);
	
	addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	    week[token.substr(0, 1)] = toInt(input);
	});
	
	// HELPERS
	
	// LOCALES
	
	function localeWeek (mom) {
	    return weekOfYear(mom, this._week.dow, this._week.doy).week;
	}
	
	var defaultLocaleWeek = {
	    dow : 0, // Sunday is the first day of the week.
	    doy : 6  // The week that contains Jan 1st is the first week of the year.
	};
	
	function localeFirstDayOfWeek () {
	    return this._week.dow;
	}
	
	function localeFirstDayOfYear () {
	    return this._week.doy;
	}
	
	// MOMENTS
	
	function getSetWeek (input) {
	    var week = this.localeData().week(this);
	    return input == null ? week : this.add((input - week) * 7, 'd');
	}
	
	function getSetISOWeek (input) {
	    var week = weekOfYear(this, 1, 4).week;
	    return input == null ? week : this.add((input - week) * 7, 'd');
	}
	
	// FORMATTING
	
	addFormatToken('d', 0, 'do', 'day');
	
	addFormatToken('dd', 0, 0, function (format) {
	    return this.localeData().weekdaysMin(this, format);
	});
	
	addFormatToken('ddd', 0, 0, function (format) {
	    return this.localeData().weekdaysShort(this, format);
	});
	
	addFormatToken('dddd', 0, 0, function (format) {
	    return this.localeData().weekdays(this, format);
	});
	
	addFormatToken('e', 0, 0, 'weekday');
	addFormatToken('E', 0, 0, 'isoWeekday');
	
	// ALIASES
	
	addUnitAlias('day', 'd');
	addUnitAlias('weekday', 'e');
	addUnitAlias('isoWeekday', 'E');
	
	// PRIORITY
	addUnitPriority('day', 11);
	addUnitPriority('weekday', 11);
	addUnitPriority('isoWeekday', 11);
	
	// PARSING
	
	addRegexToken('d',    match1to2);
	addRegexToken('e',    match1to2);
	addRegexToken('E',    match1to2);
	addRegexToken('dd',   function (isStrict, locale) {
	    return locale.weekdaysMinRegex(isStrict);
	});
	addRegexToken('ddd',   function (isStrict, locale) {
	    return locale.weekdaysShortRegex(isStrict);
	});
	addRegexToken('dddd',   function (isStrict, locale) {
	    return locale.weekdaysRegex(isStrict);
	});
	
	addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	    var weekday = config._locale.weekdaysParse(input, token, config._strict);
	    // if we didn't get a weekday name, mark the date as invalid
	    if (weekday != null) {
	        week.d = weekday;
	    } else {
	        getParsingFlags(config).invalidWeekday = input;
	    }
	});
	
	addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	    week[token] = toInt(input);
	});
	
	// HELPERS
	
	function parseWeekday(input, locale) {
	    if (typeof input !== 'string') {
	        return input;
	    }
	
	    if (!isNaN(input)) {
	        return parseInt(input, 10);
	    }
	
	    input = locale.weekdaysParse(input);
	    if (typeof input === 'number') {
	        return input;
	    }
	
	    return null;
	}
	
	function parseIsoWeekday(input, locale) {
	    if (typeof input === 'string') {
	        return locale.weekdaysParse(input) % 7 || 7;
	    }
	    return isNaN(input) ? null : input;
	}
	
	// LOCALES
	
	var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	function localeWeekdays (m, format) {
	    if (!m) {
	        return this._weekdays;
	    }
	    return isArray(this._weekdays) ? this._weekdays[m.day()] :
	        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	}
	
	var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	function localeWeekdaysShort (m) {
	    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
	}
	
	var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	function localeWeekdaysMin (m) {
	    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
	}
	
	function handleStrictParse$1(weekdayName, format, strict) {
	    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
	    if (!this._weekdaysParse) {
	        this._weekdaysParse = [];
	        this._shortWeekdaysParse = [];
	        this._minWeekdaysParse = [];
	
	        for (i = 0; i < 7; ++i) {
	            mom = createUTC([2000, 1]).day(i);
	            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
	            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
	            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	        }
	    }
	
	    if (strict) {
	        if (format === 'dddd') {
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else if (format === 'ddd') {
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    } else {
	        if (format === 'dddd') {
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else if (format === 'ddd') {
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    }
	}
	
	function localeWeekdaysParse (weekdayName, format, strict) {
	    var i, mom, regex;
	
	    if (this._weekdaysParseExact) {
	        return handleStrictParse$1.call(this, weekdayName, format, strict);
	    }
	
	    if (!this._weekdaysParse) {
	        this._weekdaysParse = [];
	        this._minWeekdaysParse = [];
	        this._shortWeekdaysParse = [];
	        this._fullWeekdaysParse = [];
	    }
	
	    for (i = 0; i < 7; i++) {
	        // make the regex if we don't have it already
	
	        mom = createUTC([2000, 1]).day(i);
	        if (strict && !this._fullWeekdaysParse[i]) {
	            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	        }
	        if (!this._weekdaysParse[i]) {
	            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	        }
	        // test the regex
	        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	            return i;
	        }
	    }
	}
	
	// MOMENTS
	
	function getSetDayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	    if (input != null) {
	        input = parseWeekday(input, this.localeData());
	        return this.add(input - day, 'd');
	    } else {
	        return day;
	    }
	}
	
	function getSetLocaleDayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	    return input == null ? weekday : this.add(input - weekday, 'd');
	}
	
	function getSetISODayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	
	    // behaves the same as moment#day except
	    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	    // as a setter, sunday should belong to the previous week.
	
	    if (input != null) {
	        var weekday = parseIsoWeekday(input, this.localeData());
	        return this.day(this.day() % 7 ? weekday : weekday - 7);
	    } else {
	        return this.day() || 7;
	    }
	}
	
	var defaultWeekdaysRegex = matchWord;
	function weekdaysRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysStrictRegex;
	        } else {
	            return this._weekdaysRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            this._weekdaysRegex = defaultWeekdaysRegex;
	        }
	        return this._weekdaysStrictRegex && isStrict ?
	            this._weekdaysStrictRegex : this._weekdaysRegex;
	    }
	}
	
	var defaultWeekdaysShortRegex = matchWord;
	function weekdaysShortRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysShortStrictRegex;
	        } else {
	            return this._weekdaysShortRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
	            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
	        }
	        return this._weekdaysShortStrictRegex && isStrict ?
	            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
	    }
	}
	
	var defaultWeekdaysMinRegex = matchWord;
	function weekdaysMinRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysMinStrictRegex;
	        } else {
	            return this._weekdaysMinRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
	            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
	        }
	        return this._weekdaysMinStrictRegex && isStrict ?
	            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
	    }
	}
	
	
	function computeWeekdaysParse () {
	    function cmpLenRev(a, b) {
	        return b.length - a.length;
	    }
	
	    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
	        i, mom, minp, shortp, longp;
	    for (i = 0; i < 7; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, 1]).day(i);
	        minp = this.weekdaysMin(mom, '');
	        shortp = this.weekdaysShort(mom, '');
	        longp = this.weekdays(mom, '');
	        minPieces.push(minp);
	        shortPieces.push(shortp);
	        longPieces.push(longp);
	        mixedPieces.push(minp);
	        mixedPieces.push(shortp);
	        mixedPieces.push(longp);
	    }
	    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	    // will match the longer piece.
	    minPieces.sort(cmpLenRev);
	    shortPieces.sort(cmpLenRev);
	    longPieces.sort(cmpLenRev);
	    mixedPieces.sort(cmpLenRev);
	    for (i = 0; i < 7; i++) {
	        shortPieces[i] = regexEscape(shortPieces[i]);
	        longPieces[i] = regexEscape(longPieces[i]);
	        mixedPieces[i] = regexEscape(mixedPieces[i]);
	    }
	
	    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	    this._weekdaysShortRegex = this._weekdaysRegex;
	    this._weekdaysMinRegex = this._weekdaysRegex;
	
	    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
	}
	
	// FORMATTING
	
	function hFormat() {
	    return this.hours() % 12 || 12;
	}
	
	function kFormat() {
	    return this.hours() || 24;
	}
	
	addFormatToken('H', ['HH', 2], 0, 'hour');
	addFormatToken('h', ['hh', 2], 0, hFormat);
	addFormatToken('k', ['kk', 2], 0, kFormat);
	
	addFormatToken('hmm', 0, 0, function () {
	    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	});
	
	addFormatToken('hmmss', 0, 0, function () {
	    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	        zeroFill(this.seconds(), 2);
	});
	
	addFormatToken('Hmm', 0, 0, function () {
	    return '' + this.hours() + zeroFill(this.minutes(), 2);
	});
	
	addFormatToken('Hmmss', 0, 0, function () {
	    return '' + this.hours() + zeroFill(this.minutes(), 2) +
	        zeroFill(this.seconds(), 2);
	});
	
	function meridiem (token, lowercase) {
	    addFormatToken(token, 0, 0, function () {
	        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	    });
	}
	
	meridiem('a', true);
	meridiem('A', false);
	
	// ALIASES
	
	addUnitAlias('hour', 'h');
	
	// PRIORITY
	addUnitPriority('hour', 13);
	
	// PARSING
	
	function matchMeridiem (isStrict, locale) {
	    return locale._meridiemParse;
	}
	
	addRegexToken('a',  matchMeridiem);
	addRegexToken('A',  matchMeridiem);
	addRegexToken('H',  match1to2);
	addRegexToken('h',  match1to2);
	addRegexToken('HH', match1to2, match2);
	addRegexToken('hh', match1to2, match2);
	
	addRegexToken('hmm', match3to4);
	addRegexToken('hmmss', match5to6);
	addRegexToken('Hmm', match3to4);
	addRegexToken('Hmmss', match5to6);
	
	addParseToken(['H', 'HH'], HOUR);
	addParseToken(['a', 'A'], function (input, array, config) {
	    config._isPm = config._locale.isPM(input);
	    config._meridiem = input;
	});
	addParseToken(['h', 'hh'], function (input, array, config) {
	    array[HOUR] = toInt(input);
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('hmm', function (input, array, config) {
	    var pos = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos));
	    array[MINUTE] = toInt(input.substr(pos));
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('hmmss', function (input, array, config) {
	    var pos1 = input.length - 4;
	    var pos2 = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos1));
	    array[MINUTE] = toInt(input.substr(pos1, 2));
	    array[SECOND] = toInt(input.substr(pos2));
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('Hmm', function (input, array, config) {
	    var pos = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos));
	    array[MINUTE] = toInt(input.substr(pos));
	});
	addParseToken('Hmmss', function (input, array, config) {
	    var pos1 = input.length - 4;
	    var pos2 = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos1));
	    array[MINUTE] = toInt(input.substr(pos1, 2));
	    array[SECOND] = toInt(input.substr(pos2));
	});
	
	// LOCALES
	
	function localeIsPM (input) {
	    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	    // Using charAt should be more compatible.
	    return ((input + '').toLowerCase().charAt(0) === 'p');
	}
	
	var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	function localeMeridiem (hours, minutes, isLower) {
	    if (hours > 11) {
	        return isLower ? 'pm' : 'PM';
	    } else {
	        return isLower ? 'am' : 'AM';
	    }
	}
	
	
	// MOMENTS
	
	// Setting the hour should keep the time, because the user explicitly
	// specified which hour he wants. So trying to maintain the same hour (in
	// a new timezone) makes sense. Adding/subtracting hours does not follow
	// this rule.
	var getSetHour = makeGetSet('Hours', true);
	
	// months
	// week
	// weekdays
	// meridiem
	var baseConfig = {
	    calendar: defaultCalendar,
	    longDateFormat: defaultLongDateFormat,
	    invalidDate: defaultInvalidDate,
	    ordinal: defaultOrdinal,
	    ordinalParse: defaultOrdinalParse,
	    relativeTime: defaultRelativeTime,
	
	    months: defaultLocaleMonths,
	    monthsShort: defaultLocaleMonthsShort,
	
	    week: defaultLocaleWeek,
	
	    weekdays: defaultLocaleWeekdays,
	    weekdaysMin: defaultLocaleWeekdaysMin,
	    weekdaysShort: defaultLocaleWeekdaysShort,
	
	    meridiemParse: defaultLocaleMeridiemParse
	};
	
	// internal storage for locale config files
	var locales = {};
	var localeFamilies = {};
	var globalLocale;
	
	function normalizeLocale(key) {
	    return key ? key.toLowerCase().replace('_', '-') : key;
	}
	
	// pick the locale from the array
	// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	function chooseLocale(names) {
	    var i = 0, j, next, locale, split;
	
	    while (i < names.length) {
	        split = normalizeLocale(names[i]).split('-');
	        j = split.length;
	        next = normalizeLocale(names[i + 1]);
	        next = next ? next.split('-') : null;
	        while (j > 0) {
	            locale = loadLocale(split.slice(0, j).join('-'));
	            if (locale) {
	                return locale;
	            }
	            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                //the next array item is better than a shallower substring of this one
	                break;
	            }
	            j--;
	        }
	        i++;
	    }
	    return null;
	}
	
	function loadLocale(name) {
	    var oldLocale = null;
	    // TODO: Find a better way to register and load all the locales in Node
	    if (!locales[name] && (typeof module !== 'undefined') &&
	            module && module.exports) {
	        try {
	            oldLocale = globalLocale._abbr;
	            __webpack_require__(128)("./" + name);
	            // because defineLocale currently also sets the global locale, we
	            // want to undo that for lazy loaded locales
	            getSetGlobalLocale(oldLocale);
	        } catch (e) { }
	    }
	    return locales[name];
	}
	
	// This function will load locale and then set the global locale.  If
	// no arguments are passed in, it will simply return the current global
	// locale key.
	function getSetGlobalLocale (key, values) {
	    var data;
	    if (key) {
	        if (isUndefined(values)) {
	            data = getLocale(key);
	        }
	        else {
	            data = defineLocale(key, values);
	        }
	
	        if (data) {
	            // moment.duration._locale = moment._locale = data;
	            globalLocale = data;
	        }
	    }
	
	    return globalLocale._abbr;
	}
	
	function defineLocale (name, config) {
	    if (config !== null) {
	        var parentConfig = baseConfig;
	        config.abbr = name;
	        if (locales[name] != null) {
	            deprecateSimple('defineLocaleOverride',
	                    'use moment.updateLocale(localeName, config) to change ' +
	                    'an existing locale. moment.defineLocale(localeName, ' +
	                    'config) should only be used for creating a new locale ' +
	                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
	            parentConfig = locales[name]._config;
	        } else if (config.parentLocale != null) {
	            if (locales[config.parentLocale] != null) {
	                parentConfig = locales[config.parentLocale]._config;
	            } else {
	                if (!localeFamilies[config.parentLocale]) {
	                    localeFamilies[config.parentLocale] = [];
	                }
	                localeFamilies[config.parentLocale].push({
	                    name: name,
	                    config: config
	                });
	                return null;
	            }
	        }
	        locales[name] = new Locale(mergeConfigs(parentConfig, config));
	
	        if (localeFamilies[name]) {
	            localeFamilies[name].forEach(function (x) {
	                defineLocale(x.name, x.config);
	            });
	        }
	
	        // backwards compat for now: also set the locale
	        // make sure we set the locale AFTER all child locales have been
	        // created, so we won't end up with the child locale set.
	        getSetGlobalLocale(name);
	
	
	        return locales[name];
	    } else {
	        // useful for testing
	        delete locales[name];
	        return null;
	    }
	}
	
	function updateLocale(name, config) {
	    if (config != null) {
	        var locale, parentConfig = baseConfig;
	        // MERGE
	        if (locales[name] != null) {
	            parentConfig = locales[name]._config;
	        }
	        config = mergeConfigs(parentConfig, config);
	        locale = new Locale(config);
	        locale.parentLocale = locales[name];
	        locales[name] = locale;
	
	        // backwards compat for now: also set the locale
	        getSetGlobalLocale(name);
	    } else {
	        // pass null for config to unupdate, useful for tests
	        if (locales[name] != null) {
	            if (locales[name].parentLocale != null) {
	                locales[name] = locales[name].parentLocale;
	            } else if (locales[name] != null) {
	                delete locales[name];
	            }
	        }
	    }
	    return locales[name];
	}
	
	// returns locale data
	function getLocale (key) {
	    var locale;
	
	    if (key && key._locale && key._locale._abbr) {
	        key = key._locale._abbr;
	    }
	
	    if (!key) {
	        return globalLocale;
	    }
	
	    if (!isArray(key)) {
	        //short-circuit everything else
	        locale = loadLocale(key);
	        if (locale) {
	            return locale;
	        }
	        key = [key];
	    }
	
	    return chooseLocale(key);
	}
	
	function listLocales() {
	    return keys$1(locales);
	}
	
	function checkOverflow (m) {
	    var overflow;
	    var a = m._a;
	
	    if (a && getParsingFlags(m).overflow === -2) {
	        overflow =
	            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	            -1;
	
	        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	            overflow = DATE;
	        }
	        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	            overflow = WEEK;
	        }
	        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	            overflow = WEEKDAY;
	        }
	
	        getParsingFlags(m).overflow = overflow;
	    }
	
	    return m;
	}
	
	// iso 8601 regex
	// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
	var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
	
	var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
	
	var isoDates = [
	    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	    ['YYYY-DDD', /\d{4}-\d{3}/],
	    ['YYYY-MM', /\d{4}-\d\d/, false],
	    ['YYYYYYMMDD', /[+-]\d{10}/],
	    ['YYYYMMDD', /\d{8}/],
	    // YYYYMM is NOT allowed by the standard
	    ['GGGG[W]WWE', /\d{4}W\d{3}/],
	    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	    ['YYYYDDD', /\d{7}/]
	];
	
	// iso time formats and regexes
	var isoTimes = [
	    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	    ['HH:mm', /\d\d:\d\d/],
	    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	    ['HHmmss', /\d\d\d\d\d\d/],
	    ['HHmm', /\d\d\d\d/],
	    ['HH', /\d\d/]
	];
	
	var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
	
	// date from iso format
	function configFromISO(config) {
	    var i, l,
	        string = config._i,
	        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	        allowTime, dateFormat, timeFormat, tzFormat;
	
	    if (match) {
	        getParsingFlags(config).iso = true;
	
	        for (i = 0, l = isoDates.length; i < l; i++) {
	            if (isoDates[i][1].exec(match[1])) {
	                dateFormat = isoDates[i][0];
	                allowTime = isoDates[i][2] !== false;
	                break;
	            }
	        }
	        if (dateFormat == null) {
	            config._isValid = false;
	            return;
	        }
	        if (match[3]) {
	            for (i = 0, l = isoTimes.length; i < l; i++) {
	                if (isoTimes[i][1].exec(match[3])) {
	                    // match[2] should be 'T' or space
	                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                    break;
	                }
	            }
	            if (timeFormat == null) {
	                config._isValid = false;
	                return;
	            }
	        }
	        if (!allowTime && timeFormat != null) {
	            config._isValid = false;
	            return;
	        }
	        if (match[4]) {
	            if (tzRegex.exec(match[4])) {
	                tzFormat = 'Z';
	            } else {
	                config._isValid = false;
	                return;
	            }
	        }
	        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	        configFromStringAndFormat(config);
	    } else {
	        config._isValid = false;
	    }
	}
	
	// date from iso format or fallback
	function configFromString(config) {
	    var matched = aspNetJsonRegex.exec(config._i);
	
	    if (matched !== null) {
	        config._d = new Date(+matched[1]);
	        return;
	    }
	
	    configFromISO(config);
	    if (config._isValid === false) {
	        delete config._isValid;
	        hooks.createFromInputFallback(config);
	    }
	}
	
	hooks.createFromInputFallback = deprecate(
	    'value provided is not in a recognized ISO format. moment construction falls back to js Date(), ' +
	    'which is not reliable across all browsers and versions. Non ISO date formats are ' +
	    'discouraged and will be removed in an upcoming major release. Please refer to ' +
	    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
	    function (config) {
	        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	    }
	);
	
	// Pick the first defined of two or three arguments.
	function defaults(a, b, c) {
	    if (a != null) {
	        return a;
	    }
	    if (b != null) {
	        return b;
	    }
	    return c;
	}
	
	function currentDateArray(config) {
	    // hooks is actually the exported moment object
	    var nowValue = new Date(hooks.now());
	    if (config._useUTC) {
	        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	    }
	    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	}
	
	// convert an array to a date.
	// the array should mirror the parameters below
	// note: all values past the year are optional and will default to the lowest possible value.
	// [year, month, day , hour, minute, second, millisecond]
	function configFromArray (config) {
	    var i, date, input = [], currentDate, yearToUse;
	
	    if (config._d) {
	        return;
	    }
	
	    currentDate = currentDateArray(config);
	
	    //compute day of the year from weeks and weekdays
	    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	        dayOfYearFromWeekInfo(config);
	    }
	
	    //if the day of the year is set, figure out what it is
	    if (config._dayOfYear) {
	        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
	
	        if (config._dayOfYear > daysInYear(yearToUse)) {
	            getParsingFlags(config)._overflowDayOfYear = true;
	        }
	
	        date = createUTCDate(yearToUse, 0, config._dayOfYear);
	        config._a[MONTH] = date.getUTCMonth();
	        config._a[DATE] = date.getUTCDate();
	    }
	
	    // Default to current date.
	    // * if no year, month, day of month are given, default to today
	    // * if day of month is given, default month and year
	    // * if month is given, default only year
	    // * if year is given, don't default anything
	    for (i = 0; i < 3 && config._a[i] == null; ++i) {
	        config._a[i] = input[i] = currentDate[i];
	    }
	
	    // Zero out whatever was not defaulted, including time
	    for (; i < 7; i++) {
	        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	    }
	
	    // Check for 24:00:00.000
	    if (config._a[HOUR] === 24 &&
	            config._a[MINUTE] === 0 &&
	            config._a[SECOND] === 0 &&
	            config._a[MILLISECOND] === 0) {
	        config._nextDay = true;
	        config._a[HOUR] = 0;
	    }
	
	    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	    // Apply timezone offset from input. The actual utcOffset can be changed
	    // with parseZone.
	    if (config._tzm != null) {
	        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	    }
	
	    if (config._nextDay) {
	        config._a[HOUR] = 24;
	    }
	}
	
	function dayOfYearFromWeekInfo(config) {
	    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
	
	    w = config._w;
	    if (w.GG != null || w.W != null || w.E != null) {
	        dow = 1;
	        doy = 4;
	
	        // TODO: We need to take the current isoWeekYear, but that depends on
	        // how we interpret now (local, utc, fixed offset). So create
	        // a now version of current config (take local/utc/offset flags, and
	        // create now).
	        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
	        week = defaults(w.W, 1);
	        weekday = defaults(w.E, 1);
	        if (weekday < 1 || weekday > 7) {
	            weekdayOverflow = true;
	        }
	    } else {
	        dow = config._locale._week.dow;
	        doy = config._locale._week.doy;
	
	        var curWeek = weekOfYear(createLocal(), dow, doy);
	
	        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
	
	        // Default to current week.
	        week = defaults(w.w, curWeek.week);
	
	        if (w.d != null) {
	            // weekday -- low day numbers are considered next week
	            weekday = w.d;
	            if (weekday < 0 || weekday > 6) {
	                weekdayOverflow = true;
	            }
	        } else if (w.e != null) {
	            // local weekday -- counting starts from begining of week
	            weekday = w.e + dow;
	            if (w.e < 0 || w.e > 6) {
	                weekdayOverflow = true;
	            }
	        } else {
	            // default to begining of week
	            weekday = dow;
	        }
	    }
	    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	        getParsingFlags(config)._overflowWeeks = true;
	    } else if (weekdayOverflow != null) {
	        getParsingFlags(config)._overflowWeekday = true;
	    } else {
	        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	        config._a[YEAR] = temp.year;
	        config._dayOfYear = temp.dayOfYear;
	    }
	}
	
	// constant that refers to the ISO standard
	hooks.ISO_8601 = function () {};
	
	// date from string and format string
	function configFromStringAndFormat(config) {
	    // TODO: Move this to another part of the creation flow to prevent circular deps
	    if (config._f === hooks.ISO_8601) {
	        configFromISO(config);
	        return;
	    }
	
	    config._a = [];
	    getParsingFlags(config).empty = true;
	
	    // This array is used to make a Date, either with `new Date` or `Date.UTC`
	    var string = '' + config._i,
	        i, parsedInput, tokens, token, skipped,
	        stringLength = string.length,
	        totalParsedInputLength = 0;
	
	    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
	
	    for (i = 0; i < tokens.length; i++) {
	        token = tokens[i];
	        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	        // console.log('token', token, 'parsedInput', parsedInput,
	        //         'regex', getParseRegexForToken(token, config));
	        if (parsedInput) {
	            skipped = string.substr(0, string.indexOf(parsedInput));
	            if (skipped.length > 0) {
	                getParsingFlags(config).unusedInput.push(skipped);
	            }
	            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	            totalParsedInputLength += parsedInput.length;
	        }
	        // don't parse if it's not a known token
	        if (formatTokenFunctions[token]) {
	            if (parsedInput) {
	                getParsingFlags(config).empty = false;
	            }
	            else {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	            addTimeToArrayFromToken(token, parsedInput, config);
	        }
	        else if (config._strict && !parsedInput) {
	            getParsingFlags(config).unusedTokens.push(token);
	        }
	    }
	
	    // add remaining unparsed input length to the string
	    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	    if (string.length > 0) {
	        getParsingFlags(config).unusedInput.push(string);
	    }
	
	    // clear _12h flag if hour is <= 12
	    if (config._a[HOUR] <= 12 &&
	        getParsingFlags(config).bigHour === true &&
	        config._a[HOUR] > 0) {
	        getParsingFlags(config).bigHour = undefined;
	    }
	
	    getParsingFlags(config).parsedDateParts = config._a.slice(0);
	    getParsingFlags(config).meridiem = config._meridiem;
	    // handle meridiem
	    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
	
	    configFromArray(config);
	    checkOverflow(config);
	}
	
	
	function meridiemFixWrap (locale, hour, meridiem) {
	    var isPm;
	
	    if (meridiem == null) {
	        // nothing to do
	        return hour;
	    }
	    if (locale.meridiemHour != null) {
	        return locale.meridiemHour(hour, meridiem);
	    } else if (locale.isPM != null) {
	        // Fallback
	        isPm = locale.isPM(meridiem);
	        if (isPm && hour < 12) {
	            hour += 12;
	        }
	        if (!isPm && hour === 12) {
	            hour = 0;
	        }
	        return hour;
	    } else {
	        // this is not supposed to happen
	        return hour;
	    }
	}
	
	// date from string and array of format strings
	function configFromStringAndArray(config) {
	    var tempConfig,
	        bestMoment,
	
	        scoreToBeat,
	        i,
	        currentScore;
	
	    if (config._f.length === 0) {
	        getParsingFlags(config).invalidFormat = true;
	        config._d = new Date(NaN);
	        return;
	    }
	
	    for (i = 0; i < config._f.length; i++) {
	        currentScore = 0;
	        tempConfig = copyConfig({}, config);
	        if (config._useUTC != null) {
	            tempConfig._useUTC = config._useUTC;
	        }
	        tempConfig._f = config._f[i];
	        configFromStringAndFormat(tempConfig);
	
	        if (!isValid(tempConfig)) {
	            continue;
	        }
	
	        // if there is any input that was not parsed add a penalty for that format
	        currentScore += getParsingFlags(tempConfig).charsLeftOver;
	
	        //or tokens
	        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
	
	        getParsingFlags(tempConfig).score = currentScore;
	
	        if (scoreToBeat == null || currentScore < scoreToBeat) {
	            scoreToBeat = currentScore;
	            bestMoment = tempConfig;
	        }
	    }
	
	    extend(config, bestMoment || tempConfig);
	}
	
	function configFromObject(config) {
	    if (config._d) {
	        return;
	    }
	
	    var i = normalizeObjectUnits(config._i);
	    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	        return obj && parseInt(obj, 10);
	    });
	
	    configFromArray(config);
	}
	
	function createFromConfig (config) {
	    var res = new Moment(checkOverflow(prepareConfig(config)));
	    if (res._nextDay) {
	        // Adding is smart enough around DST
	        res.add(1, 'd');
	        res._nextDay = undefined;
	    }
	
	    return res;
	}
	
	function prepareConfig (config) {
	    var input = config._i,
	        format = config._f;
	
	    config._locale = config._locale || getLocale(config._l);
	
	    if (input === null || (format === undefined && input === '')) {
	        return createInvalid({nullInput: true});
	    }
	
	    if (typeof input === 'string') {
	        config._i = input = config._locale.preparse(input);
	    }
	
	    if (isMoment(input)) {
	        return new Moment(checkOverflow(input));
	    } else if (isDate(input)) {
	        config._d = input;
	    } else if (isArray(format)) {
	        configFromStringAndArray(config);
	    } else if (format) {
	        configFromStringAndFormat(config);
	    }  else {
	        configFromInput(config);
	    }
	
	    if (!isValid(config)) {
	        config._d = null;
	    }
	
	    return config;
	}
	
	function configFromInput(config) {
	    var input = config._i;
	    if (input === undefined) {
	        config._d = new Date(hooks.now());
	    } else if (isDate(input)) {
	        config._d = new Date(input.valueOf());
	    } else if (typeof input === 'string') {
	        configFromString(config);
	    } else if (isArray(input)) {
	        config._a = map(input.slice(0), function (obj) {
	            return parseInt(obj, 10);
	        });
	        configFromArray(config);
	    } else if (typeof(input) === 'object') {
	        configFromObject(config);
	    } else if (isNumber(input)) {
	        // from milliseconds
	        config._d = new Date(input);
	    } else {
	        hooks.createFromInputFallback(config);
	    }
	}
	
	function createLocalOrUTC (input, format, locale, strict, isUTC) {
	    var c = {};
	
	    if (locale === true || locale === false) {
	        strict = locale;
	        locale = undefined;
	    }
	
	    if ((isObject(input) && isObjectEmpty(input)) ||
	            (isArray(input) && input.length === 0)) {
	        input = undefined;
	    }
	    // object construction must be done this way.
	    // https://github.com/moment/moment/issues/1423
	    c._isAMomentObject = true;
	    c._useUTC = c._isUTC = isUTC;
	    c._l = locale;
	    c._i = input;
	    c._f = format;
	    c._strict = strict;
	
	    return createFromConfig(c);
	}
	
	function createLocal (input, format, locale, strict) {
	    return createLocalOrUTC(input, format, locale, strict, false);
	}
	
	var prototypeMin = deprecate(
	    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
	    function () {
	        var other = createLocal.apply(null, arguments);
	        if (this.isValid() && other.isValid()) {
	            return other < this ? this : other;
	        } else {
	            return createInvalid();
	        }
	    }
	);
	
	var prototypeMax = deprecate(
	    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
	    function () {
	        var other = createLocal.apply(null, arguments);
	        if (this.isValid() && other.isValid()) {
	            return other > this ? this : other;
	        } else {
	            return createInvalid();
	        }
	    }
	);
	
	// Pick a moment m from moments so that m[fn](other) is true for all
	// other. This relies on the function fn to be transitive.
	//
	// moments should either be an array of moment objects or an array, whose
	// first element is an array of moment objects.
	function pickBy(fn, moments) {
	    var res, i;
	    if (moments.length === 1 && isArray(moments[0])) {
	        moments = moments[0];
	    }
	    if (!moments.length) {
	        return createLocal();
	    }
	    res = moments[0];
	    for (i = 1; i < moments.length; ++i) {
	        if (!moments[i].isValid() || moments[i][fn](res)) {
	            res = moments[i];
	        }
	    }
	    return res;
	}
	
	// TODO: Use [].sort instead?
	function min () {
	    var args = [].slice.call(arguments, 0);
	
	    return pickBy('isBefore', args);
	}
	
	function max () {
	    var args = [].slice.call(arguments, 0);
	
	    return pickBy('isAfter', args);
	}
	
	var now = function () {
	    return Date.now ? Date.now() : +(new Date());
	};
	
	function Duration (duration) {
	    var normalizedInput = normalizeObjectUnits(duration),
	        years = normalizedInput.year || 0,
	        quarters = normalizedInput.quarter || 0,
	        months = normalizedInput.month || 0,
	        weeks = normalizedInput.week || 0,
	        days = normalizedInput.day || 0,
	        hours = normalizedInput.hour || 0,
	        minutes = normalizedInput.minute || 0,
	        seconds = normalizedInput.second || 0,
	        milliseconds = normalizedInput.millisecond || 0;
	
	    // representation for dateAddRemove
	    this._milliseconds = +milliseconds +
	        seconds * 1e3 + // 1000
	        minutes * 6e4 + // 1000 * 60
	        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	    // Because of dateAddRemove treats 24 hours as different from a
	    // day when working around DST, we need to store them separately
	    this._days = +days +
	        weeks * 7;
	    // It is impossible translate months into days without knowing
	    // which months you are are talking about, so we have to store
	    // it separately.
	    this._months = +months +
	        quarters * 3 +
	        years * 12;
	
	    this._data = {};
	
	    this._locale = getLocale();
	
	    this._bubble();
	}
	
	function isDuration (obj) {
	    return obj instanceof Duration;
	}
	
	function absRound (number) {
	    if (number < 0) {
	        return Math.round(-1 * number) * -1;
	    } else {
	        return Math.round(number);
	    }
	}
	
	// FORMATTING
	
	function offset (token, separator) {
	    addFormatToken(token, 0, 0, function () {
	        var offset = this.utcOffset();
	        var sign = '+';
	        if (offset < 0) {
	            offset = -offset;
	            sign = '-';
	        }
	        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	    });
	}
	
	offset('Z', ':');
	offset('ZZ', '');
	
	// PARSING
	
	addRegexToken('Z',  matchShortOffset);
	addRegexToken('ZZ', matchShortOffset);
	addParseToken(['Z', 'ZZ'], function (input, array, config) {
	    config._useUTC = true;
	    config._tzm = offsetFromString(matchShortOffset, input);
	});
	
	// HELPERS
	
	// timezone chunker
	// '+10:00' > ['10',  '00']
	// '-1530'  > ['-15', '30']
	var chunkOffset = /([\+\-]|\d\d)/gi;
	
	function offsetFromString(matcher, string) {
	    var matches = (string || '').match(matcher);
	
	    if (matches === null) {
	        return null;
	    }
	
	    var chunk   = matches[matches.length - 1] || [];
	    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	    var minutes = +(parts[1] * 60) + toInt(parts[2]);
	
	    return minutes === 0 ?
	      0 :
	      parts[0] === '+' ? minutes : -minutes;
	}
	
	// Return a moment from input, that is local/utc/zone equivalent to model.
	function cloneWithOffset(input, model) {
	    var res, diff;
	    if (model._isUTC) {
	        res = model.clone();
	        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
	        // Use low-level api, because this fn is low-level api.
	        res._d.setTime(res._d.valueOf() + diff);
	        hooks.updateOffset(res, false);
	        return res;
	    } else {
	        return createLocal(input).local();
	    }
	}
	
	function getDateOffset (m) {
	    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	    // https://github.com/moment/moment/pull/1871
	    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	}
	
	// HOOKS
	
	// This function will be called whenever a moment is mutated.
	// It is intended to keep the offset in sync with the timezone.
	hooks.updateOffset = function () {};
	
	// MOMENTS
	
	// keepLocalTime = true means only change the timezone, without
	// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	// +0200, so we adjust the time as needed, to be valid.
	//
	// Keeping the time actually adds/subtracts (one hour)
	// from the actual represented time. That is why we call updateOffset
	// a second time. In case it wants us to change the offset again
	// _changeInProgress == true case, then we have to adjust, because
	// there is no such time in the given timezone.
	function getSetOffset (input, keepLocalTime) {
	    var offset = this._offset || 0,
	        localAdjust;
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    if (input != null) {
	        if (typeof input === 'string') {
	            input = offsetFromString(matchShortOffset, input);
	            if (input === null) {
	                return this;
	            }
	        } else if (Math.abs(input) < 16) {
	            input = input * 60;
	        }
	        if (!this._isUTC && keepLocalTime) {
	            localAdjust = getDateOffset(this);
	        }
	        this._offset = input;
	        this._isUTC = true;
	        if (localAdjust != null) {
	            this.add(localAdjust, 'm');
	        }
	        if (offset !== input) {
	            if (!keepLocalTime || this._changeInProgress) {
	                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
	            } else if (!this._changeInProgress) {
	                this._changeInProgress = true;
	                hooks.updateOffset(this, true);
	                this._changeInProgress = null;
	            }
	        }
	        return this;
	    } else {
	        return this._isUTC ? offset : getDateOffset(this);
	    }
	}
	
	function getSetZone (input, keepLocalTime) {
	    if (input != null) {
	        if (typeof input !== 'string') {
	            input = -input;
	        }
	
	        this.utcOffset(input, keepLocalTime);
	
	        return this;
	    } else {
	        return -this.utcOffset();
	    }
	}
	
	function setOffsetToUTC (keepLocalTime) {
	    return this.utcOffset(0, keepLocalTime);
	}
	
	function setOffsetToLocal (keepLocalTime) {
	    if (this._isUTC) {
	        this.utcOffset(0, keepLocalTime);
	        this._isUTC = false;
	
	        if (keepLocalTime) {
	            this.subtract(getDateOffset(this), 'm');
	        }
	    }
	    return this;
	}
	
	function setOffsetToParsedOffset () {
	    if (this._tzm != null) {
	        this.utcOffset(this._tzm);
	    } else if (typeof this._i === 'string') {
	        var tZone = offsetFromString(matchOffset, this._i);
	        if (tZone != null) {
	            this.utcOffset(tZone);
	        }
	        else {
	            this.utcOffset(0, true);
	        }
	    }
	    return this;
	}
	
	function hasAlignedHourOffset (input) {
	    if (!this.isValid()) {
	        return false;
	    }
	    input = input ? createLocal(input).utcOffset() : 0;
	
	    return (this.utcOffset() - input) % 60 === 0;
	}
	
	function isDaylightSavingTime () {
	    return (
	        this.utcOffset() > this.clone().month(0).utcOffset() ||
	        this.utcOffset() > this.clone().month(5).utcOffset()
	    );
	}
	
	function isDaylightSavingTimeShifted () {
	    if (!isUndefined(this._isDSTShifted)) {
	        return this._isDSTShifted;
	    }
	
	    var c = {};
	
	    copyConfig(c, this);
	    c = prepareConfig(c);
	
	    if (c._a) {
	        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
	        this._isDSTShifted = this.isValid() &&
	            compareArrays(c._a, other.toArray()) > 0;
	    } else {
	        this._isDSTShifted = false;
	    }
	
	    return this._isDSTShifted;
	}
	
	function isLocal () {
	    return this.isValid() ? !this._isUTC : false;
	}
	
	function isUtcOffset () {
	    return this.isValid() ? this._isUTC : false;
	}
	
	function isUtc () {
	    return this.isValid() ? this._isUTC && this._offset === 0 : false;
	}
	
	// ASP.NET json date format regex
	var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;
	
	// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	// and further modified to allow for strings containing both week and day
	var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
	
	function createDuration (input, key) {
	    var duration = input,
	        // matching against regexp is expensive, do it on demand
	        match = null,
	        sign,
	        ret,
	        diffRes;
	
	    if (isDuration(input)) {
	        duration = {
	            ms : input._milliseconds,
	            d  : input._days,
	            M  : input._months
	        };
	    } else if (isNumber(input)) {
	        duration = {};
	        if (key) {
	            duration[key] = input;
	        } else {
	            duration.milliseconds = input;
	        }
	    } else if (!!(match = aspNetRegex.exec(input))) {
	        sign = (match[1] === '-') ? -1 : 1;
	        duration = {
	            y  : 0,
	            d  : toInt(match[DATE])                         * sign,
	            h  : toInt(match[HOUR])                         * sign,
	            m  : toInt(match[MINUTE])                       * sign,
	            s  : toInt(match[SECOND])                       * sign,
	            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
	        };
	    } else if (!!(match = isoRegex.exec(input))) {
	        sign = (match[1] === '-') ? -1 : 1;
	        duration = {
	            y : parseIso(match[2], sign),
	            M : parseIso(match[3], sign),
	            w : parseIso(match[4], sign),
	            d : parseIso(match[5], sign),
	            h : parseIso(match[6], sign),
	            m : parseIso(match[7], sign),
	            s : parseIso(match[8], sign)
	        };
	    } else if (duration == null) {// checks for null or undefined
	        duration = {};
	    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
	
	        duration = {};
	        duration.ms = diffRes.milliseconds;
	        duration.M = diffRes.months;
	    }
	
	    ret = new Duration(duration);
	
	    if (isDuration(input) && hasOwnProp(input, '_locale')) {
	        ret._locale = input._locale;
	    }
	
	    return ret;
	}
	
	createDuration.fn = Duration.prototype;
	
	function parseIso (inp, sign) {
	    // We'd normally use ~~inp for this, but unfortunately it also
	    // converts floats to ints.
	    // inp may be undefined, so careful calling replace on it.
	    var res = inp && parseFloat(inp.replace(',', '.'));
	    // apply sign while we're at it
	    return (isNaN(res) ? 0 : res) * sign;
	}
	
	function positiveMomentsDifference(base, other) {
	    var res = {milliseconds: 0, months: 0};
	
	    res.months = other.month() - base.month() +
	        (other.year() - base.year()) * 12;
	    if (base.clone().add(res.months, 'M').isAfter(other)) {
	        --res.months;
	    }
	
	    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
	
	    return res;
	}
	
	function momentsDifference(base, other) {
	    var res;
	    if (!(base.isValid() && other.isValid())) {
	        return {milliseconds: 0, months: 0};
	    }
	
	    other = cloneWithOffset(other, base);
	    if (base.isBefore(other)) {
	        res = positiveMomentsDifference(base, other);
	    } else {
	        res = positiveMomentsDifference(other, base);
	        res.milliseconds = -res.milliseconds;
	        res.months = -res.months;
	    }
	
	    return res;
	}
	
	// TODO: remove 'name' arg after deprecation is removed
	function createAdder(direction, name) {
	    return function (val, period) {
	        var dur, tmp;
	        //invert the arguments, but complain about it
	        if (period !== null && !isNaN(+period)) {
	            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
	            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
	            tmp = val; val = period; period = tmp;
	        }
	
	        val = typeof val === 'string' ? +val : val;
	        dur = createDuration(val, period);
	        addSubtract(this, dur, direction);
	        return this;
	    };
	}
	
	function addSubtract (mom, duration, isAdding, updateOffset) {
	    var milliseconds = duration._milliseconds,
	        days = absRound(duration._days),
	        months = absRound(duration._months);
	
	    if (!mom.isValid()) {
	        // No op
	        return;
	    }
	
	    updateOffset = updateOffset == null ? true : updateOffset;
	
	    if (milliseconds) {
	        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	    }
	    if (days) {
	        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
	    }
	    if (months) {
	        setMonth(mom, get(mom, 'Month') + months * isAdding);
	    }
	    if (updateOffset) {
	        hooks.updateOffset(mom, days || months);
	    }
	}
	
	var add      = createAdder(1, 'add');
	var subtract = createAdder(-1, 'subtract');
	
	function getCalendarFormat(myMoment, now) {
	    var diff = myMoment.diff(now, 'days', true);
	    return diff < -6 ? 'sameElse' :
	            diff < -1 ? 'lastWeek' :
	            diff < 0 ? 'lastDay' :
	            diff < 1 ? 'sameDay' :
	            diff < 2 ? 'nextDay' :
	            diff < 7 ? 'nextWeek' : 'sameElse';
	}
	
	function calendar$1 (time, formats) {
	    // We want to compare the start of today, vs this.
	    // Getting start-of-today depends on whether we're local/utc/offset or not.
	    var now = time || createLocal(),
	        sod = cloneWithOffset(now, this).startOf('day'),
	        format = hooks.calendarFormat(this, sod) || 'sameElse';
	
	    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
	
	    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
	}
	
	function clone () {
	    return new Moment(this);
	}
	
	function isAfter (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input);
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() > localInput.valueOf();
	    } else {
	        return localInput.valueOf() < this.clone().startOf(units).valueOf();
	    }
	}
	
	function isBefore (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input);
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() < localInput.valueOf();
	    } else {
	        return this.clone().endOf(units).valueOf() < localInput.valueOf();
	    }
	}
	
	function isBetween (from, to, units, inclusivity) {
	    inclusivity = inclusivity || '()';
	    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
	        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
	}
	
	function isSame (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input),
	        inputMs;
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(units || 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() === localInput.valueOf();
	    } else {
	        inputMs = localInput.valueOf();
	        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
	    }
	}
	
	function isSameOrAfter (input, units) {
	    return this.isSame(input, units) || this.isAfter(input,units);
	}
	
	function isSameOrBefore (input, units) {
	    return this.isSame(input, units) || this.isBefore(input,units);
	}
	
	function diff (input, units, asFloat) {
	    var that,
	        zoneDelta,
	        delta, output;
	
	    if (!this.isValid()) {
	        return NaN;
	    }
	
	    that = cloneWithOffset(input, this);
	
	    if (!that.isValid()) {
	        return NaN;
	    }
	
	    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
	
	    units = normalizeUnits(units);
	
	    if (units === 'year' || units === 'month' || units === 'quarter') {
	        output = monthDiff(this, that);
	        if (units === 'quarter') {
	            output = output / 3;
	        } else if (units === 'year') {
	            output = output / 12;
	        }
	    } else {
	        delta = this - that;
	        output = units === 'second' ? delta / 1e3 : // 1000
	            units === 'minute' ? delta / 6e4 : // 1000 * 60
	            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	            delta;
	    }
	    return asFloat ? output : absFloor(output);
	}
	
	function monthDiff (a, b) {
	    // difference in months
	    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	        // b is in (anchor - 1 month, anchor + 1 month)
	        anchor = a.clone().add(wholeMonthDiff, 'months'),
	        anchor2, adjust;
	
	    if (b - anchor < 0) {
	        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	        // linear across the month
	        adjust = (b - anchor) / (anchor - anchor2);
	    } else {
	        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	        // linear across the month
	        adjust = (b - anchor) / (anchor2 - anchor);
	    }
	
	    //check for negative zero, return zero if negative zero
	    return -(wholeMonthDiff + adjust) || 0;
	}
	
	hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
	
	function toString () {
	    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	}
	
	function toISOString () {
	    var m = this.clone().utc();
	    if (0 < m.year() && m.year() <= 9999) {
	        if (isFunction(Date.prototype.toISOString)) {
	            // native implementation is ~50x faster, use it when we can
	            return this.toDate().toISOString();
	        } else {
	            return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    } else {
	        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	    }
	}
	
	/**
	 * Return a human readable representation of a moment that can
	 * also be evaluated to get a new moment which is the same
	 *
	 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
	 */
	function inspect () {
	    if (!this.isValid()) {
	        return 'moment.invalid(/* ' + this._i + ' */)';
	    }
	    var func = 'moment';
	    var zone = '';
	    if (!this.isLocal()) {
	        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
	        zone = 'Z';
	    }
	    var prefix = '[' + func + '("]';
	    var year = (0 < this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
	    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
	    var suffix = zone + '[")]';
	
	    return this.format(prefix + year + datetime + suffix);
	}
	
	function format (inputString) {
	    if (!inputString) {
	        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
	    }
	    var output = formatMoment(this, inputString);
	    return this.localeData().postformat(output);
	}
	
	function from (time, withoutSuffix) {
	    if (this.isValid() &&
	            ((isMoment(time) && time.isValid()) ||
	             createLocal(time).isValid())) {
	        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	    } else {
	        return this.localeData().invalidDate();
	    }
	}
	
	function fromNow (withoutSuffix) {
	    return this.from(createLocal(), withoutSuffix);
	}
	
	function to (time, withoutSuffix) {
	    if (this.isValid() &&
	            ((isMoment(time) && time.isValid()) ||
	             createLocal(time).isValid())) {
	        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	    } else {
	        return this.localeData().invalidDate();
	    }
	}
	
	function toNow (withoutSuffix) {
	    return this.to(createLocal(), withoutSuffix);
	}
	
	// If passed a locale key, it will set the locale for this
	// instance.  Otherwise, it will return the locale configuration
	// variables for this instance.
	function locale (key) {
	    var newLocaleData;
	
	    if (key === undefined) {
	        return this._locale._abbr;
	    } else {
	        newLocaleData = getLocale(key);
	        if (newLocaleData != null) {
	            this._locale = newLocaleData;
	        }
	        return this;
	    }
	}
	
	var lang = deprecate(
	    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	    function (key) {
	        if (key === undefined) {
	            return this.localeData();
	        } else {
	            return this.locale(key);
	        }
	    }
	);
	
	function localeData () {
	    return this._locale;
	}
	
	function startOf (units) {
	    units = normalizeUnits(units);
	    // the following switch intentionally omits break keywords
	    // to utilize falling through the cases.
	    switch (units) {
	        case 'year':
	            this.month(0);
	            /* falls through */
	        case 'quarter':
	        case 'month':
	            this.date(1);
	            /* falls through */
	        case 'week':
	        case 'isoWeek':
	        case 'day':
	        case 'date':
	            this.hours(0);
	            /* falls through */
	        case 'hour':
	            this.minutes(0);
	            /* falls through */
	        case 'minute':
	            this.seconds(0);
	            /* falls through */
	        case 'second':
	            this.milliseconds(0);
	    }
	
	    // weeks are a special case
	    if (units === 'week') {
	        this.weekday(0);
	    }
	    if (units === 'isoWeek') {
	        this.isoWeekday(1);
	    }
	
	    // quarters are also special
	    if (units === 'quarter') {
	        this.month(Math.floor(this.month() / 3) * 3);
	    }
	
	    return this;
	}
	
	function endOf (units) {
	    units = normalizeUnits(units);
	    if (units === undefined || units === 'millisecond') {
	        return this;
	    }
	
	    // 'date' is an alias for 'day', so it should be considered as such.
	    if (units === 'date') {
	        units = 'day';
	    }
	
	    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	}
	
	function valueOf () {
	    return this._d.valueOf() - ((this._offset || 0) * 60000);
	}
	
	function unix () {
	    return Math.floor(this.valueOf() / 1000);
	}
	
	function toDate () {
	    return new Date(this.valueOf());
	}
	
	function toArray () {
	    var m = this;
	    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	}
	
	function toObject () {
	    var m = this;
	    return {
	        years: m.year(),
	        months: m.month(),
	        date: m.date(),
	        hours: m.hours(),
	        minutes: m.minutes(),
	        seconds: m.seconds(),
	        milliseconds: m.milliseconds()
	    };
	}
	
	function toJSON () {
	    // new Date(NaN).toJSON() === null
	    return this.isValid() ? this.toISOString() : null;
	}
	
	function isValid$1 () {
	    return isValid(this);
	}
	
	function parsingFlags () {
	    return extend({}, getParsingFlags(this));
	}
	
	function invalidAt () {
	    return getParsingFlags(this).overflow;
	}
	
	function creationData() {
	    return {
	        input: this._i,
	        format: this._f,
	        locale: this._locale,
	        isUTC: this._isUTC,
	        strict: this._strict
	    };
	}
	
	// FORMATTING
	
	addFormatToken(0, ['gg', 2], 0, function () {
	    return this.weekYear() % 100;
	});
	
	addFormatToken(0, ['GG', 2], 0, function () {
	    return this.isoWeekYear() % 100;
	});
	
	function addWeekYearFormatToken (token, getter) {
	    addFormatToken(0, [token, token.length], 0, getter);
	}
	
	addWeekYearFormatToken('gggg',     'weekYear');
	addWeekYearFormatToken('ggggg',    'weekYear');
	addWeekYearFormatToken('GGGG',  'isoWeekYear');
	addWeekYearFormatToken('GGGGG', 'isoWeekYear');
	
	// ALIASES
	
	addUnitAlias('weekYear', 'gg');
	addUnitAlias('isoWeekYear', 'GG');
	
	// PRIORITY
	
	addUnitPriority('weekYear', 1);
	addUnitPriority('isoWeekYear', 1);
	
	
	// PARSING
	
	addRegexToken('G',      matchSigned);
	addRegexToken('g',      matchSigned);
	addRegexToken('GG',     match1to2, match2);
	addRegexToken('gg',     match1to2, match2);
	addRegexToken('GGGG',   match1to4, match4);
	addRegexToken('gggg',   match1to4, match4);
	addRegexToken('GGGGG',  match1to6, match6);
	addRegexToken('ggggg',  match1to6, match6);
	
	addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	    week[token.substr(0, 2)] = toInt(input);
	});
	
	addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	    week[token] = hooks.parseTwoDigitYear(input);
	});
	
	// MOMENTS
	
	function getSetWeekYear (input) {
	    return getSetWeekYearHelper.call(this,
	            input,
	            this.week(),
	            this.weekday(),
	            this.localeData()._week.dow,
	            this.localeData()._week.doy);
	}
	
	function getSetISOWeekYear (input) {
	    return getSetWeekYearHelper.call(this,
	            input, this.isoWeek(), this.isoWeekday(), 1, 4);
	}
	
	function getISOWeeksInYear () {
	    return weeksInYear(this.year(), 1, 4);
	}
	
	function getWeeksInYear () {
	    var weekInfo = this.localeData()._week;
	    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	}
	
	function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	    var weeksTarget;
	    if (input == null) {
	        return weekOfYear(this, dow, doy).year;
	    } else {
	        weeksTarget = weeksInYear(input, dow, doy);
	        if (week > weeksTarget) {
	            week = weeksTarget;
	        }
	        return setWeekAll.call(this, input, week, weekday, dow, doy);
	    }
	}
	
	function setWeekAll(weekYear, week, weekday, dow, doy) {
	    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
	
	    this.year(date.getUTCFullYear());
	    this.month(date.getUTCMonth());
	    this.date(date.getUTCDate());
	    return this;
	}
	
	// FORMATTING
	
	addFormatToken('Q', 0, 'Qo', 'quarter');
	
	// ALIASES
	
	addUnitAlias('quarter', 'Q');
	
	// PRIORITY
	
	addUnitPriority('quarter', 7);
	
	// PARSING
	
	addRegexToken('Q', match1);
	addParseToken('Q', function (input, array) {
	    array[MONTH] = (toInt(input) - 1) * 3;
	});
	
	// MOMENTS
	
	function getSetQuarter (input) {
	    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	}
	
	// FORMATTING
	
	addFormatToken('D', ['DD', 2], 'Do', 'date');
	
	// ALIASES
	
	addUnitAlias('date', 'D');
	
	// PRIOROITY
	addUnitPriority('date', 9);
	
	// PARSING
	
	addRegexToken('D',  match1to2);
	addRegexToken('DD', match1to2, match2);
	addRegexToken('Do', function (isStrict, locale) {
	    return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	});
	
	addParseToken(['D', 'DD'], DATE);
	addParseToken('Do', function (input, array) {
	    array[DATE] = toInt(input.match(match1to2)[0], 10);
	});
	
	// MOMENTS
	
	var getSetDayOfMonth = makeGetSet('Date', true);
	
	// FORMATTING
	
	addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
	
	// ALIASES
	
	addUnitAlias('dayOfYear', 'DDD');
	
	// PRIORITY
	addUnitPriority('dayOfYear', 4);
	
	// PARSING
	
	addRegexToken('DDD',  match1to3);
	addRegexToken('DDDD', match3);
	addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	    config._dayOfYear = toInt(input);
	});
	
	// HELPERS
	
	// MOMENTS
	
	function getSetDayOfYear (input) {
	    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	}
	
	// FORMATTING
	
	addFormatToken('m', ['mm', 2], 0, 'minute');
	
	// ALIASES
	
	addUnitAlias('minute', 'm');
	
	// PRIORITY
	
	addUnitPriority('minute', 14);
	
	// PARSING
	
	addRegexToken('m',  match1to2);
	addRegexToken('mm', match1to2, match2);
	addParseToken(['m', 'mm'], MINUTE);
	
	// MOMENTS
	
	var getSetMinute = makeGetSet('Minutes', false);
	
	// FORMATTING
	
	addFormatToken('s', ['ss', 2], 0, 'second');
	
	// ALIASES
	
	addUnitAlias('second', 's');
	
	// PRIORITY
	
	addUnitPriority('second', 15);
	
	// PARSING
	
	addRegexToken('s',  match1to2);
	addRegexToken('ss', match1to2, match2);
	addParseToken(['s', 'ss'], SECOND);
	
	// MOMENTS
	
	var getSetSecond = makeGetSet('Seconds', false);
	
	// FORMATTING
	
	addFormatToken('S', 0, 0, function () {
	    return ~~(this.millisecond() / 100);
	});
	
	addFormatToken(0, ['SS', 2], 0, function () {
	    return ~~(this.millisecond() / 10);
	});
	
	addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	addFormatToken(0, ['SSSS', 4], 0, function () {
	    return this.millisecond() * 10;
	});
	addFormatToken(0, ['SSSSS', 5], 0, function () {
	    return this.millisecond() * 100;
	});
	addFormatToken(0, ['SSSSSS', 6], 0, function () {
	    return this.millisecond() * 1000;
	});
	addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	    return this.millisecond() * 10000;
	});
	addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	    return this.millisecond() * 100000;
	});
	addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	    return this.millisecond() * 1000000;
	});
	
	
	// ALIASES
	
	addUnitAlias('millisecond', 'ms');
	
	// PRIORITY
	
	addUnitPriority('millisecond', 16);
	
	// PARSING
	
	addRegexToken('S',    match1to3, match1);
	addRegexToken('SS',   match1to3, match2);
	addRegexToken('SSS',  match1to3, match3);
	
	var token;
	for (token = 'SSSS'; token.length <= 9; token += 'S') {
	    addRegexToken(token, matchUnsigned);
	}
	
	function parseMs(input, array) {
	    array[MILLISECOND] = toInt(('0.' + input) * 1000);
	}
	
	for (token = 'S'; token.length <= 9; token += 'S') {
	    addParseToken(token, parseMs);
	}
	// MOMENTS
	
	var getSetMillisecond = makeGetSet('Milliseconds', false);
	
	// FORMATTING
	
	addFormatToken('z',  0, 0, 'zoneAbbr');
	addFormatToken('zz', 0, 0, 'zoneName');
	
	// MOMENTS
	
	function getZoneAbbr () {
	    return this._isUTC ? 'UTC' : '';
	}
	
	function getZoneName () {
	    return this._isUTC ? 'Coordinated Universal Time' : '';
	}
	
	var proto = Moment.prototype;
	
	proto.add               = add;
	proto.calendar          = calendar$1;
	proto.clone             = clone;
	proto.diff              = diff;
	proto.endOf             = endOf;
	proto.format            = format;
	proto.from              = from;
	proto.fromNow           = fromNow;
	proto.to                = to;
	proto.toNow             = toNow;
	proto.get               = stringGet;
	proto.invalidAt         = invalidAt;
	proto.isAfter           = isAfter;
	proto.isBefore          = isBefore;
	proto.isBetween         = isBetween;
	proto.isSame            = isSame;
	proto.isSameOrAfter     = isSameOrAfter;
	proto.isSameOrBefore    = isSameOrBefore;
	proto.isValid           = isValid$1;
	proto.lang              = lang;
	proto.locale            = locale;
	proto.localeData        = localeData;
	proto.max               = prototypeMax;
	proto.min               = prototypeMin;
	proto.parsingFlags      = parsingFlags;
	proto.set               = stringSet;
	proto.startOf           = startOf;
	proto.subtract          = subtract;
	proto.toArray           = toArray;
	proto.toObject          = toObject;
	proto.toDate            = toDate;
	proto.toISOString       = toISOString;
	proto.inspect           = inspect;
	proto.toJSON            = toJSON;
	proto.toString          = toString;
	proto.unix              = unix;
	proto.valueOf           = valueOf;
	proto.creationData      = creationData;
	
	// Year
	proto.year       = getSetYear;
	proto.isLeapYear = getIsLeapYear;
	
	// Week Year
	proto.weekYear    = getSetWeekYear;
	proto.isoWeekYear = getSetISOWeekYear;
	
	// Quarter
	proto.quarter = proto.quarters = getSetQuarter;
	
	// Month
	proto.month       = getSetMonth;
	proto.daysInMonth = getDaysInMonth;
	
	// Week
	proto.week           = proto.weeks        = getSetWeek;
	proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
	proto.weeksInYear    = getWeeksInYear;
	proto.isoWeeksInYear = getISOWeeksInYear;
	
	// Day
	proto.date       = getSetDayOfMonth;
	proto.day        = proto.days             = getSetDayOfWeek;
	proto.weekday    = getSetLocaleDayOfWeek;
	proto.isoWeekday = getSetISODayOfWeek;
	proto.dayOfYear  = getSetDayOfYear;
	
	// Hour
	proto.hour = proto.hours = getSetHour;
	
	// Minute
	proto.minute = proto.minutes = getSetMinute;
	
	// Second
	proto.second = proto.seconds = getSetSecond;
	
	// Millisecond
	proto.millisecond = proto.milliseconds = getSetMillisecond;
	
	// Offset
	proto.utcOffset            = getSetOffset;
	proto.utc                  = setOffsetToUTC;
	proto.local                = setOffsetToLocal;
	proto.parseZone            = setOffsetToParsedOffset;
	proto.hasAlignedHourOffset = hasAlignedHourOffset;
	proto.isDST                = isDaylightSavingTime;
	proto.isLocal              = isLocal;
	proto.isUtcOffset          = isUtcOffset;
	proto.isUtc                = isUtc;
	proto.isUTC                = isUtc;
	
	// Timezone
	proto.zoneAbbr = getZoneAbbr;
	proto.zoneName = getZoneName;
	
	// Deprecations
	proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
	proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);
	
	function createUnix (input) {
	    return createLocal(input * 1000);
	}
	
	function createInZone () {
	    return createLocal.apply(null, arguments).parseZone();
	}
	
	function preParsePostFormat (string) {
	    return string;
	}
	
	var proto$1 = Locale.prototype;
	
	proto$1.calendar        = calendar;
	proto$1.longDateFormat  = longDateFormat;
	proto$1.invalidDate     = invalidDate;
	proto$1.ordinal         = ordinal;
	proto$1.preparse        = preParsePostFormat;
	proto$1.postformat      = preParsePostFormat;
	proto$1.relativeTime    = relativeTime;
	proto$1.pastFuture      = pastFuture;
	proto$1.set             = set;
	
	// Month
	proto$1.months            =        localeMonths;
	proto$1.monthsShort       =        localeMonthsShort;
	proto$1.monthsParse       =        localeMonthsParse;
	proto$1.monthsRegex       = monthsRegex;
	proto$1.monthsShortRegex  = monthsShortRegex;
	
	// Week
	proto$1.week = localeWeek;
	proto$1.firstDayOfYear = localeFirstDayOfYear;
	proto$1.firstDayOfWeek = localeFirstDayOfWeek;
	
	// Day of Week
	proto$1.weekdays       =        localeWeekdays;
	proto$1.weekdaysMin    =        localeWeekdaysMin;
	proto$1.weekdaysShort  =        localeWeekdaysShort;
	proto$1.weekdaysParse  =        localeWeekdaysParse;
	
	proto$1.weekdaysRegex       =        weekdaysRegex;
	proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
	proto$1.weekdaysMinRegex    =        weekdaysMinRegex;
	
	// Hours
	proto$1.isPM = localeIsPM;
	proto$1.meridiem = localeMeridiem;
	
	function get$1 (format, index, field, setter) {
	    var locale = getLocale();
	    var utc = createUTC().set(setter, index);
	    return locale[field](utc, format);
	}
	
	function listMonthsImpl (format, index, field) {
	    if (isNumber(format)) {
	        index = format;
	        format = undefined;
	    }
	
	    format = format || '';
	
	    if (index != null) {
	        return get$1(format, index, field, 'month');
	    }
	
	    var i;
	    var out = [];
	    for (i = 0; i < 12; i++) {
	        out[i] = get$1(format, i, field, 'month');
	    }
	    return out;
	}
	
	// ()
	// (5)
	// (fmt, 5)
	// (fmt)
	// (true)
	// (true, 5)
	// (true, fmt, 5)
	// (true, fmt)
	function listWeekdaysImpl (localeSorted, format, index, field) {
	    if (typeof localeSorted === 'boolean') {
	        if (isNumber(format)) {
	            index = format;
	            format = undefined;
	        }
	
	        format = format || '';
	    } else {
	        format = localeSorted;
	        index = format;
	        localeSorted = false;
	
	        if (isNumber(format)) {
	            index = format;
	            format = undefined;
	        }
	
	        format = format || '';
	    }
	
	    var locale = getLocale(),
	        shift = localeSorted ? locale._week.dow : 0;
	
	    if (index != null) {
	        return get$1(format, (index + shift) % 7, field, 'day');
	    }
	
	    var i;
	    var out = [];
	    for (i = 0; i < 7; i++) {
	        out[i] = get$1(format, (i + shift) % 7, field, 'day');
	    }
	    return out;
	}
	
	function listMonths (format, index) {
	    return listMonthsImpl(format, index, 'months');
	}
	
	function listMonthsShort (format, index) {
	    return listMonthsImpl(format, index, 'monthsShort');
	}
	
	function listWeekdays (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	}
	
	function listWeekdaysShort (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	}
	
	function listWeekdaysMin (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	}
	
	getSetGlobalLocale('en', {
	    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (toInt(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    }
	});
	
	// Side effect imports
	hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
	hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);
	
	var mathAbs = Math.abs;
	
	function abs () {
	    var data           = this._data;
	
	    this._milliseconds = mathAbs(this._milliseconds);
	    this._days         = mathAbs(this._days);
	    this._months       = mathAbs(this._months);
	
	    data.milliseconds  = mathAbs(data.milliseconds);
	    data.seconds       = mathAbs(data.seconds);
	    data.minutes       = mathAbs(data.minutes);
	    data.hours         = mathAbs(data.hours);
	    data.months        = mathAbs(data.months);
	    data.years         = mathAbs(data.years);
	
	    return this;
	}
	
	function addSubtract$1 (duration, input, value, direction) {
	    var other = createDuration(input, value);
	
	    duration._milliseconds += direction * other._milliseconds;
	    duration._days         += direction * other._days;
	    duration._months       += direction * other._months;
	
	    return duration._bubble();
	}
	
	// supports only 2.0-style add(1, 's') or add(duration)
	function add$1 (input, value) {
	    return addSubtract$1(this, input, value, 1);
	}
	
	// supports only 2.0-style subtract(1, 's') or subtract(duration)
	function subtract$1 (input, value) {
	    return addSubtract$1(this, input, value, -1);
	}
	
	function absCeil (number) {
	    if (number < 0) {
	        return Math.floor(number);
	    } else {
	        return Math.ceil(number);
	    }
	}
	
	function bubble () {
	    var milliseconds = this._milliseconds;
	    var days         = this._days;
	    var months       = this._months;
	    var data         = this._data;
	    var seconds, minutes, hours, years, monthsFromDays;
	
	    // if we have a mix of positive and negative values, bubble down first
	    // check: https://github.com/moment/moment/issues/2166
	    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	            (milliseconds <= 0 && days <= 0 && months <= 0))) {
	        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	        days = 0;
	        months = 0;
	    }
	
	    // The following code bubbles up values, see the tests for
	    // examples of what that means.
	    data.milliseconds = milliseconds % 1000;
	
	    seconds           = absFloor(milliseconds / 1000);
	    data.seconds      = seconds % 60;
	
	    minutes           = absFloor(seconds / 60);
	    data.minutes      = minutes % 60;
	
	    hours             = absFloor(minutes / 60);
	    data.hours        = hours % 24;
	
	    days += absFloor(hours / 24);
	
	    // convert days to months
	    monthsFromDays = absFloor(daysToMonths(days));
	    months += monthsFromDays;
	    days -= absCeil(monthsToDays(monthsFromDays));
	
	    // 12 months -> 1 year
	    years = absFloor(months / 12);
	    months %= 12;
	
	    data.days   = days;
	    data.months = months;
	    data.years  = years;
	
	    return this;
	}
	
	function daysToMonths (days) {
	    // 400 years have 146097 days (taking into account leap year rules)
	    // 400 years have 12 months === 4800
	    return days * 4800 / 146097;
	}
	
	function monthsToDays (months) {
	    // the reverse of daysToMonths
	    return months * 146097 / 4800;
	}
	
	function as (units) {
	    var days;
	    var months;
	    var milliseconds = this._milliseconds;
	
	    units = normalizeUnits(units);
	
	    if (units === 'month' || units === 'year') {
	        days   = this._days   + milliseconds / 864e5;
	        months = this._months + daysToMonths(days);
	        return units === 'month' ? months : months / 12;
	    } else {
	        // handle milliseconds separately because of floating point math errors (issue #1867)
	        days = this._days + Math.round(monthsToDays(this._months));
	        switch (units) {
	            case 'week'   : return days / 7     + milliseconds / 6048e5;
	            case 'day'    : return days         + milliseconds / 864e5;
	            case 'hour'   : return days * 24    + milliseconds / 36e5;
	            case 'minute' : return days * 1440  + milliseconds / 6e4;
	            case 'second' : return days * 86400 + milliseconds / 1000;
	            // Math.floor prevents floating point math errors here
	            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	            default: throw new Error('Unknown unit ' + units);
	        }
	    }
	}
	
	// TODO: Use this.as('ms')?
	function valueOf$1 () {
	    return (
	        this._milliseconds +
	        this._days * 864e5 +
	        (this._months % 12) * 2592e6 +
	        toInt(this._months / 12) * 31536e6
	    );
	}
	
	function makeAs (alias) {
	    return function () {
	        return this.as(alias);
	    };
	}
	
	var asMilliseconds = makeAs('ms');
	var asSeconds      = makeAs('s');
	var asMinutes      = makeAs('m');
	var asHours        = makeAs('h');
	var asDays         = makeAs('d');
	var asWeeks        = makeAs('w');
	var asMonths       = makeAs('M');
	var asYears        = makeAs('y');
	
	function get$2 (units) {
	    units = normalizeUnits(units);
	    return this[units + 's']();
	}
	
	function makeGetter(name) {
	    return function () {
	        return this._data[name];
	    };
	}
	
	var milliseconds = makeGetter('milliseconds');
	var seconds      = makeGetter('seconds');
	var minutes      = makeGetter('minutes');
	var hours        = makeGetter('hours');
	var days         = makeGetter('days');
	var months       = makeGetter('months');
	var years        = makeGetter('years');
	
	function weeks () {
	    return absFloor(this.days() / 7);
	}
	
	var round = Math.round;
	var thresholds = {
	    s: 45,  // seconds to minute
	    m: 45,  // minutes to hour
	    h: 22,  // hours to day
	    d: 26,  // days to month
	    M: 11   // months to year
	};
	
	// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	}
	
	function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
	    var duration = createDuration(posNegDuration).abs();
	    var seconds  = round(duration.as('s'));
	    var minutes  = round(duration.as('m'));
	    var hours    = round(duration.as('h'));
	    var days     = round(duration.as('d'));
	    var months   = round(duration.as('M'));
	    var years    = round(duration.as('y'));
	
	    var a = seconds < thresholds.s && ['s', seconds]  ||
	            minutes <= 1           && ['m']           ||
	            minutes < thresholds.m && ['mm', minutes] ||
	            hours   <= 1           && ['h']           ||
	            hours   < thresholds.h && ['hh', hours]   ||
	            days    <= 1           && ['d']           ||
	            days    < thresholds.d && ['dd', days]    ||
	            months  <= 1           && ['M']           ||
	            months  < thresholds.M && ['MM', months]  ||
	            years   <= 1           && ['y']           || ['yy', years];
	
	    a[2] = withoutSuffix;
	    a[3] = +posNegDuration > 0;
	    a[4] = locale;
	    return substituteTimeAgo.apply(null, a);
	}
	
	// This function allows you to set the rounding function for relative time strings
	function getSetRelativeTimeRounding (roundingFunction) {
	    if (roundingFunction === undefined) {
	        return round;
	    }
	    if (typeof(roundingFunction) === 'function') {
	        round = roundingFunction;
	        return true;
	    }
	    return false;
	}
	
	// This function allows you to set a threshold for relative time strings
	function getSetRelativeTimeThreshold (threshold, limit) {
	    if (thresholds[threshold] === undefined) {
	        return false;
	    }
	    if (limit === undefined) {
	        return thresholds[threshold];
	    }
	    thresholds[threshold] = limit;
	    return true;
	}
	
	function humanize (withSuffix) {
	    var locale = this.localeData();
	    var output = relativeTime$1(this, !withSuffix, locale);
	
	    if (withSuffix) {
	        output = locale.pastFuture(+this, output);
	    }
	
	    return locale.postformat(output);
	}
	
	var abs$1 = Math.abs;
	
	function toISOString$1() {
	    // for ISO strings we do not use the normal bubbling rules:
	    //  * milliseconds bubble up until they become hours
	    //  * days do not bubble at all
	    //  * months bubble up until they become years
	    // This is because there is no context-free conversion between hours and days
	    // (think of clock changes)
	    // and also not between days and months (28-31 days per month)
	    var seconds = abs$1(this._milliseconds) / 1000;
	    var days         = abs$1(this._days);
	    var months       = abs$1(this._months);
	    var minutes, hours, years;
	
	    // 3600 seconds -> 60 minutes -> 1 hour
	    minutes           = absFloor(seconds / 60);
	    hours             = absFloor(minutes / 60);
	    seconds %= 60;
	    minutes %= 60;
	
	    // 12 months -> 1 year
	    years  = absFloor(months / 12);
	    months %= 12;
	
	
	    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	    var Y = years;
	    var M = months;
	    var D = days;
	    var h = hours;
	    var m = minutes;
	    var s = seconds;
	    var total = this.asSeconds();
	
	    if (!total) {
	        // this is the same as C#'s (Noda) and python (isodate)...
	        // but not other JS (goog.date)
	        return 'P0D';
	    }
	
	    return (total < 0 ? '-' : '') +
	        'P' +
	        (Y ? Y + 'Y' : '') +
	        (M ? M + 'M' : '') +
	        (D ? D + 'D' : '') +
	        ((h || m || s) ? 'T' : '') +
	        (h ? h + 'H' : '') +
	        (m ? m + 'M' : '') +
	        (s ? s + 'S' : '');
	}
	
	var proto$2 = Duration.prototype;
	
	proto$2.abs            = abs;
	proto$2.add            = add$1;
	proto$2.subtract       = subtract$1;
	proto$2.as             = as;
	proto$2.asMilliseconds = asMilliseconds;
	proto$2.asSeconds      = asSeconds;
	proto$2.asMinutes      = asMinutes;
	proto$2.asHours        = asHours;
	proto$2.asDays         = asDays;
	proto$2.asWeeks        = asWeeks;
	proto$2.asMonths       = asMonths;
	proto$2.asYears        = asYears;
	proto$2.valueOf        = valueOf$1;
	proto$2._bubble        = bubble;
	proto$2.get            = get$2;
	proto$2.milliseconds   = milliseconds;
	proto$2.seconds        = seconds;
	proto$2.minutes        = minutes;
	proto$2.hours          = hours;
	proto$2.days           = days;
	proto$2.weeks          = weeks;
	proto$2.months         = months;
	proto$2.years          = years;
	proto$2.humanize       = humanize;
	proto$2.toISOString    = toISOString$1;
	proto$2.toString       = toISOString$1;
	proto$2.toJSON         = toISOString$1;
	proto$2.locale         = locale;
	proto$2.localeData     = localeData;
	
	// Deprecations
	proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
	proto$2.lang = lang;
	
	// Side effect imports
	
	// FORMATTING
	
	addFormatToken('X', 0, 0, 'unix');
	addFormatToken('x', 0, 0, 'valueOf');
	
	// PARSING
	
	addRegexToken('x', matchSigned);
	addRegexToken('X', matchTimestamp);
	addParseToken('X', function (input, array, config) {
	    config._d = new Date(parseFloat(input, 10) * 1000);
	});
	addParseToken('x', function (input, array, config) {
	    config._d = new Date(toInt(input));
	});
	
	// Side effect imports
	
	
	hooks.version = '2.17.0';
	
	setHookCallback(createLocal);
	
	hooks.fn                    = proto;
	hooks.min                   = min;
	hooks.max                   = max;
	hooks.now                   = now;
	hooks.utc                   = createUTC;
	hooks.unix                  = createUnix;
	hooks.months                = listMonths;
	hooks.isDate                = isDate;
	hooks.locale                = getSetGlobalLocale;
	hooks.invalid               = createInvalid;
	hooks.duration              = createDuration;
	hooks.isMoment              = isMoment;
	hooks.weekdays              = listWeekdays;
	hooks.parseZone             = createInZone;
	hooks.localeData            = getLocale;
	hooks.isDuration            = isDuration;
	hooks.monthsShort           = listMonthsShort;
	hooks.weekdaysMin           = listWeekdaysMin;
	hooks.defineLocale          = defineLocale;
	hooks.updateLocale          = updateLocale;
	hooks.locales               = listLocales;
	hooks.weekdaysShort         = listWeekdaysShort;
	hooks.normalizeUnits        = normalizeUnits;
	hooks.relativeTimeRounding = getSetRelativeTimeRounding;
	hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
	hooks.calendarFormat        = getCalendarFormat;
	hooks.prototype             = proto;
	
	return hooks;
	
	})));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(127)(module)))

/***/ },
/* 127 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./en-gb": 129,
		"./en-gb.js": 129
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 128;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (United Kingdom) [en-gb]
	//! author : Chris Gedrim : https://github.com/chrisgedrim
	
	;(function (global, factory) {
	    true ? factory(__webpack_require__(126)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';
	
	
	var enGb = moment.defineLocale('en-gb', {
	    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : '%s ago',
	        s : 'a few seconds',
	        m : 'a minute',
	        mm : '%d minutes',
	        h : 'an hour',
	        hh : '%d hours',
	        d : 'a day',
	        dd : '%d days',
	        M : 'a month',
	        MM : '%d months',
	        y : 'a year',
	        yy : '%d years'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return enGb;
	
	})));


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(131);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(644)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/stylus-loader/index.js?resolve url!./style.styl", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/stylus-loader/index.js?resolve url!./style.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(132)();
	// imports
	exports.i(__webpack_require__(133), "");
	
	// module
	exports.push([module.id, "body {\n  font-family: sans-serif;\n  color: #343434;\n  background-color: #f2f2f2;\n}\n.menu {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  align-items: center;\n  padding: 3px 7px;\n  font-size: 1.2em;\n}\n.menu ul {\n  padding: 0;\n  margin: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n.menu li {\n  cursor: pointer;\n  list-style-type: none;\n  display: block;\n  padding: 3px 7px;\n  margin: 3px 5px;\n  border-radius: 3px;\n}\n.menu li.active {\n  background-color: #777;\n  color: #d1d1d1;\n}\n.menu li.flag {\n  border: 3px solid #f2f2f2;\n  width: 20px;\n  height: 15px;\n}\n.menu li.flag.active {\n  border-color: #777;\n}\n.main-container {\n  margin-top: 40px;\n}\n.articles-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n.article-container {\n  width: 400px;\n  margin: 20px 15px;\n}\n.article-container .header a {\n  text-decoration: none;\n  font-weight: bold;\n  font-size: 1.4em;\n  color: #343434;\n}\n.article-container .footer {\n  margin-top: 15px;\n  float: right;\n  color: #848484;\n  font-size: 0.8em;\n}\n.article-container .no-image {\n  background-image: url(\"/images/no-image.png\");\n}\n.article-container .image img {\n  width: 100%;\n}\n", ""]);
	
	// exports


/***/ },
/* 132 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(132)();
	// imports
	
	
	// module
	exports.push([module.id, ".flag-icon-background {\n  background-size: contain;\n  background-position: 50%;\n  background-repeat: no-repeat;\n}\n.flag-icon {\n  background-size: contain;\n  background-position: 50%;\n  background-repeat: no-repeat;\n  position: relative;\n  display: inline-block;\n  width: 1.33333333em;\n  line-height: 1em;\n}\n.flag-icon:before {\n  content: \"\\A0\";\n}\n.flag-icon.flag-icon-squared {\n  width: 1em;\n}\n.flag-icon-ad {\n  background-image: url(" + __webpack_require__(134) + ");\n}\n.flag-icon-ad.flag-icon-squared {\n  background-image: url(" + __webpack_require__(135) + ");\n}\n.flag-icon-ae {\n  background-image: url(" + __webpack_require__(136) + ");\n}\n.flag-icon-ae.flag-icon-squared {\n  background-image: url(" + __webpack_require__(137) + ");\n}\n.flag-icon-af {\n  background-image: url(" + __webpack_require__(138) + ");\n}\n.flag-icon-af.flag-icon-squared {\n  background-image: url(" + __webpack_require__(139) + ");\n}\n.flag-icon-ag {\n  background-image: url(" + __webpack_require__(140) + ");\n}\n.flag-icon-ag.flag-icon-squared {\n  background-image: url(" + __webpack_require__(141) + ");\n}\n.flag-icon-ai {\n  background-image: url(" + __webpack_require__(142) + ");\n}\n.flag-icon-ai.flag-icon-squared {\n  background-image: url(" + __webpack_require__(143) + ");\n}\n.flag-icon-al {\n  background-image: url(" + __webpack_require__(144) + ");\n}\n.flag-icon-al.flag-icon-squared {\n  background-image: url(" + __webpack_require__(145) + ");\n}\n.flag-icon-am {\n  background-image: url(" + __webpack_require__(146) + ");\n}\n.flag-icon-am.flag-icon-squared {\n  background-image: url(" + __webpack_require__(147) + ");\n}\n.flag-icon-ao {\n  background-image: url(" + __webpack_require__(148) + ");\n}\n.flag-icon-ao.flag-icon-squared {\n  background-image: url(" + __webpack_require__(149) + ");\n}\n.flag-icon-aq {\n  background-image: url(" + __webpack_require__(150) + ");\n}\n.flag-icon-aq.flag-icon-squared {\n  background-image: url(" + __webpack_require__(151) + ");\n}\n.flag-icon-ar {\n  background-image: url(" + __webpack_require__(152) + ");\n}\n.flag-icon-ar.flag-icon-squared {\n  background-image: url(" + __webpack_require__(153) + ");\n}\n.flag-icon-as {\n  background-image: url(" + __webpack_require__(154) + ");\n}\n.flag-icon-as.flag-icon-squared {\n  background-image: url(" + __webpack_require__(155) + ");\n}\n.flag-icon-at {\n  background-image: url(" + __webpack_require__(156) + ");\n}\n.flag-icon-at.flag-icon-squared {\n  background-image: url(" + __webpack_require__(157) + ");\n}\n.flag-icon-au {\n  background-image: url(" + __webpack_require__(158) + ");\n}\n.flag-icon-au.flag-icon-squared {\n  background-image: url(" + __webpack_require__(159) + ");\n}\n.flag-icon-aw {\n  background-image: url(" + __webpack_require__(160) + ");\n}\n.flag-icon-aw.flag-icon-squared {\n  background-image: url(" + __webpack_require__(161) + ");\n}\n.flag-icon-ax {\n  background-image: url(" + __webpack_require__(162) + ");\n}\n.flag-icon-ax.flag-icon-squared {\n  background-image: url(" + __webpack_require__(163) + ");\n}\n.flag-icon-az {\n  background-image: url(" + __webpack_require__(164) + ");\n}\n.flag-icon-az.flag-icon-squared {\n  background-image: url(" + __webpack_require__(165) + ");\n}\n.flag-icon-ba {\n  background-image: url(" + __webpack_require__(166) + ");\n}\n.flag-icon-ba.flag-icon-squared {\n  background-image: url(" + __webpack_require__(167) + ");\n}\n.flag-icon-bb {\n  background-image: url(" + __webpack_require__(168) + ");\n}\n.flag-icon-bb.flag-icon-squared {\n  background-image: url(" + __webpack_require__(169) + ");\n}\n.flag-icon-bd {\n  background-image: url(" + __webpack_require__(170) + ");\n}\n.flag-icon-bd.flag-icon-squared {\n  background-image: url(" + __webpack_require__(171) + ");\n}\n.flag-icon-be {\n  background-image: url(" + __webpack_require__(172) + ");\n}\n.flag-icon-be.flag-icon-squared {\n  background-image: url(" + __webpack_require__(173) + ");\n}\n.flag-icon-bf {\n  background-image: url(" + __webpack_require__(174) + ");\n}\n.flag-icon-bf.flag-icon-squared {\n  background-image: url(" + __webpack_require__(175) + ");\n}\n.flag-icon-bg {\n  background-image: url(" + __webpack_require__(176) + ");\n}\n.flag-icon-bg.flag-icon-squared {\n  background-image: url(" + __webpack_require__(177) + ");\n}\n.flag-icon-bh {\n  background-image: url(" + __webpack_require__(178) + ");\n}\n.flag-icon-bh.flag-icon-squared {\n  background-image: url(" + __webpack_require__(179) + ");\n}\n.flag-icon-bi {\n  background-image: url(" + __webpack_require__(180) + ");\n}\n.flag-icon-bi.flag-icon-squared {\n  background-image: url(" + __webpack_require__(181) + ");\n}\n.flag-icon-bj {\n  background-image: url(" + __webpack_require__(182) + ");\n}\n.flag-icon-bj.flag-icon-squared {\n  background-image: url(" + __webpack_require__(183) + ");\n}\n.flag-icon-bl {\n  background-image: url(" + __webpack_require__(184) + ");\n}\n.flag-icon-bl.flag-icon-squared {\n  background-image: url(" + __webpack_require__(185) + ");\n}\n.flag-icon-bm {\n  background-image: url(" + __webpack_require__(186) + ");\n}\n.flag-icon-bm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(187) + ");\n}\n.flag-icon-bn {\n  background-image: url(" + __webpack_require__(188) + ");\n}\n.flag-icon-bn.flag-icon-squared {\n  background-image: url(" + __webpack_require__(189) + ");\n}\n.flag-icon-bo {\n  background-image: url(" + __webpack_require__(190) + ");\n}\n.flag-icon-bo.flag-icon-squared {\n  background-image: url(" + __webpack_require__(191) + ");\n}\n.flag-icon-bq {\n  background-image: url(" + __webpack_require__(192) + ");\n}\n.flag-icon-bq.flag-icon-squared {\n  background-image: url(" + __webpack_require__(193) + ");\n}\n.flag-icon-br {\n  background-image: url(" + __webpack_require__(194) + ");\n}\n.flag-icon-br.flag-icon-squared {\n  background-image: url(" + __webpack_require__(195) + ");\n}\n.flag-icon-bs {\n  background-image: url(" + __webpack_require__(196) + ");\n}\n.flag-icon-bs.flag-icon-squared {\n  background-image: url(" + __webpack_require__(197) + ");\n}\n.flag-icon-bt {\n  background-image: url(" + __webpack_require__(198) + ");\n}\n.flag-icon-bt.flag-icon-squared {\n  background-image: url(" + __webpack_require__(199) + ");\n}\n.flag-icon-bv {\n  background-image: url(" + __webpack_require__(200) + ");\n}\n.flag-icon-bv.flag-icon-squared {\n  background-image: url(" + __webpack_require__(201) + ");\n}\n.flag-icon-bw {\n  background-image: url(" + __webpack_require__(202) + ");\n}\n.flag-icon-bw.flag-icon-squared {\n  background-image: url(" + __webpack_require__(203) + ");\n}\n.flag-icon-by {\n  background-image: url(" + __webpack_require__(204) + ");\n}\n.flag-icon-by.flag-icon-squared {\n  background-image: url(" + __webpack_require__(205) + ");\n}\n.flag-icon-bz {\n  background-image: url(" + __webpack_require__(206) + ");\n}\n.flag-icon-bz.flag-icon-squared {\n  background-image: url(" + __webpack_require__(207) + ");\n}\n.flag-icon-ca {\n  background-image: url(" + __webpack_require__(208) + ");\n}\n.flag-icon-ca.flag-icon-squared {\n  background-image: url(" + __webpack_require__(209) + ");\n}\n.flag-icon-cc {\n  background-image: url(" + __webpack_require__(210) + ");\n}\n.flag-icon-cc.flag-icon-squared {\n  background-image: url(" + __webpack_require__(211) + ");\n}\n.flag-icon-cd {\n  background-image: url(" + __webpack_require__(212) + ");\n}\n.flag-icon-cd.flag-icon-squared {\n  background-image: url(" + __webpack_require__(213) + ");\n}\n.flag-icon-cf {\n  background-image: url(" + __webpack_require__(214) + ");\n}\n.flag-icon-cf.flag-icon-squared {\n  background-image: url(" + __webpack_require__(215) + ");\n}\n.flag-icon-cg {\n  background-image: url(" + __webpack_require__(216) + ");\n}\n.flag-icon-cg.flag-icon-squared {\n  background-image: url(" + __webpack_require__(217) + ");\n}\n.flag-icon-ch {\n  background-image: url(" + __webpack_require__(218) + ");\n}\n.flag-icon-ch.flag-icon-squared {\n  background-image: url(" + __webpack_require__(219) + ");\n}\n.flag-icon-ci {\n  background-image: url(" + __webpack_require__(220) + ");\n}\n.flag-icon-ci.flag-icon-squared {\n  background-image: url(" + __webpack_require__(221) + ");\n}\n.flag-icon-ck {\n  background-image: url(" + __webpack_require__(222) + ");\n}\n.flag-icon-ck.flag-icon-squared {\n  background-image: url(" + __webpack_require__(223) + ");\n}\n.flag-icon-cl {\n  background-image: url(" + __webpack_require__(224) + ");\n}\n.flag-icon-cl.flag-icon-squared {\n  background-image: url(" + __webpack_require__(225) + ");\n}\n.flag-icon-cm {\n  background-image: url(" + __webpack_require__(226) + ");\n}\n.flag-icon-cm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(227) + ");\n}\n.flag-icon-cn {\n  background-image: url(" + __webpack_require__(228) + ");\n}\n.flag-icon-cn.flag-icon-squared {\n  background-image: url(" + __webpack_require__(229) + ");\n}\n.flag-icon-co {\n  background-image: url(" + __webpack_require__(230) + ");\n}\n.flag-icon-co.flag-icon-squared {\n  background-image: url(" + __webpack_require__(231) + ");\n}\n.flag-icon-cr {\n  background-image: url(" + __webpack_require__(232) + ");\n}\n.flag-icon-cr.flag-icon-squared {\n  background-image: url(" + __webpack_require__(233) + ");\n}\n.flag-icon-cu {\n  background-image: url(" + __webpack_require__(234) + ");\n}\n.flag-icon-cu.flag-icon-squared {\n  background-image: url(" + __webpack_require__(235) + ");\n}\n.flag-icon-cv {\n  background-image: url(" + __webpack_require__(236) + ");\n}\n.flag-icon-cv.flag-icon-squared {\n  background-image: url(" + __webpack_require__(237) + ");\n}\n.flag-icon-cw {\n  background-image: url(" + __webpack_require__(238) + ");\n}\n.flag-icon-cw.flag-icon-squared {\n  background-image: url(" + __webpack_require__(239) + ");\n}\n.flag-icon-cx {\n  background-image: url(" + __webpack_require__(240) + ");\n}\n.flag-icon-cx.flag-icon-squared {\n  background-image: url(" + __webpack_require__(241) + ");\n}\n.flag-icon-cy {\n  background-image: url(" + __webpack_require__(242) + ");\n}\n.flag-icon-cy.flag-icon-squared {\n  background-image: url(" + __webpack_require__(243) + ");\n}\n.flag-icon-cz {\n  background-image: url(" + __webpack_require__(244) + ");\n}\n.flag-icon-cz.flag-icon-squared {\n  background-image: url(" + __webpack_require__(245) + ");\n}\n.flag-icon-de {\n  background-image: url(" + __webpack_require__(246) + ");\n}\n.flag-icon-de.flag-icon-squared {\n  background-image: url(" + __webpack_require__(247) + ");\n}\n.flag-icon-dj {\n  background-image: url(" + __webpack_require__(248) + ");\n}\n.flag-icon-dj.flag-icon-squared {\n  background-image: url(" + __webpack_require__(249) + ");\n}\n.flag-icon-dk {\n  background-image: url(" + __webpack_require__(250) + ");\n}\n.flag-icon-dk.flag-icon-squared {\n  background-image: url(" + __webpack_require__(251) + ");\n}\n.flag-icon-dm {\n  background-image: url(" + __webpack_require__(252) + ");\n}\n.flag-icon-dm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(253) + ");\n}\n.flag-icon-do {\n  background-image: url(" + __webpack_require__(254) + ");\n}\n.flag-icon-do.flag-icon-squared {\n  background-image: url(" + __webpack_require__(255) + ");\n}\n.flag-icon-dz {\n  background-image: url(" + __webpack_require__(256) + ");\n}\n.flag-icon-dz.flag-icon-squared {\n  background-image: url(" + __webpack_require__(257) + ");\n}\n.flag-icon-ec {\n  background-image: url(" + __webpack_require__(258) + ");\n}\n.flag-icon-ec.flag-icon-squared {\n  background-image: url(" + __webpack_require__(259) + ");\n}\n.flag-icon-ee {\n  background-image: url(" + __webpack_require__(260) + ");\n}\n.flag-icon-ee.flag-icon-squared {\n  background-image: url(" + __webpack_require__(261) + ");\n}\n.flag-icon-eg {\n  background-image: url(" + __webpack_require__(262) + ");\n}\n.flag-icon-eg.flag-icon-squared {\n  background-image: url(" + __webpack_require__(263) + ");\n}\n.flag-icon-eh {\n  background-image: url(" + __webpack_require__(264) + ");\n}\n.flag-icon-eh.flag-icon-squared {\n  background-image: url(" + __webpack_require__(265) + ");\n}\n.flag-icon-er {\n  background-image: url(" + __webpack_require__(266) + ");\n}\n.flag-icon-er.flag-icon-squared {\n  background-image: url(" + __webpack_require__(267) + ");\n}\n.flag-icon-es {\n  background-image: url(" + __webpack_require__(268) + ");\n}\n.flag-icon-es.flag-icon-squared {\n  background-image: url(" + __webpack_require__(269) + ");\n}\n.flag-icon-et {\n  background-image: url(" + __webpack_require__(270) + ");\n}\n.flag-icon-et.flag-icon-squared {\n  background-image: url(" + __webpack_require__(271) + ");\n}\n.flag-icon-fi {\n  background-image: url(" + __webpack_require__(272) + ");\n}\n.flag-icon-fi.flag-icon-squared {\n  background-image: url(" + __webpack_require__(273) + ");\n}\n.flag-icon-fj {\n  background-image: url(" + __webpack_require__(274) + ");\n}\n.flag-icon-fj.flag-icon-squared {\n  background-image: url(" + __webpack_require__(275) + ");\n}\n.flag-icon-fk {\n  background-image: url(" + __webpack_require__(276) + ");\n}\n.flag-icon-fk.flag-icon-squared {\n  background-image: url(" + __webpack_require__(277) + ");\n}\n.flag-icon-fm {\n  background-image: url(" + __webpack_require__(278) + ");\n}\n.flag-icon-fm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(279) + ");\n}\n.flag-icon-fo {\n  background-image: url(" + __webpack_require__(280) + ");\n}\n.flag-icon-fo.flag-icon-squared {\n  background-image: url(" + __webpack_require__(281) + ");\n}\n.flag-icon-fr {\n  background-image: url(" + __webpack_require__(282) + ");\n}\n.flag-icon-fr.flag-icon-squared {\n  background-image: url(" + __webpack_require__(283) + ");\n}\n.flag-icon-ga {\n  background-image: url(" + __webpack_require__(284) + ");\n}\n.flag-icon-ga.flag-icon-squared {\n  background-image: url(" + __webpack_require__(285) + ");\n}\n.flag-icon-gb {\n  background-image: url(" + __webpack_require__(286) + ");\n}\n.flag-icon-gb.flag-icon-squared {\n  background-image: url(" + __webpack_require__(287) + ");\n}\n.flag-icon-gd {\n  background-image: url(" + __webpack_require__(288) + ");\n}\n.flag-icon-gd.flag-icon-squared {\n  background-image: url(" + __webpack_require__(289) + ");\n}\n.flag-icon-ge {\n  background-image: url(" + __webpack_require__(290) + ");\n}\n.flag-icon-ge.flag-icon-squared {\n  background-image: url(" + __webpack_require__(291) + ");\n}\n.flag-icon-gf {\n  background-image: url(" + __webpack_require__(292) + ");\n}\n.flag-icon-gf.flag-icon-squared {\n  background-image: url(" + __webpack_require__(293) + ");\n}\n.flag-icon-gg {\n  background-image: url(" + __webpack_require__(294) + ");\n}\n.flag-icon-gg.flag-icon-squared {\n  background-image: url(" + __webpack_require__(295) + ");\n}\n.flag-icon-gh {\n  background-image: url(" + __webpack_require__(296) + ");\n}\n.flag-icon-gh.flag-icon-squared {\n  background-image: url(" + __webpack_require__(297) + ");\n}\n.flag-icon-gi {\n  background-image: url(" + __webpack_require__(298) + ");\n}\n.flag-icon-gi.flag-icon-squared {\n  background-image: url(" + __webpack_require__(299) + ");\n}\n.flag-icon-gl {\n  background-image: url(" + __webpack_require__(300) + ");\n}\n.flag-icon-gl.flag-icon-squared {\n  background-image: url(" + __webpack_require__(301) + ");\n}\n.flag-icon-gm {\n  background-image: url(" + __webpack_require__(302) + ");\n}\n.flag-icon-gm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(303) + ");\n}\n.flag-icon-gn {\n  background-image: url(" + __webpack_require__(304) + ");\n}\n.flag-icon-gn.flag-icon-squared {\n  background-image: url(" + __webpack_require__(305) + ");\n}\n.flag-icon-gp {\n  background-image: url(" + __webpack_require__(306) + ");\n}\n.flag-icon-gp.flag-icon-squared {\n  background-image: url(" + __webpack_require__(307) + ");\n}\n.flag-icon-gq {\n  background-image: url(" + __webpack_require__(308) + ");\n}\n.flag-icon-gq.flag-icon-squared {\n  background-image: url(" + __webpack_require__(309) + ");\n}\n.flag-icon-gr {\n  background-image: url(" + __webpack_require__(310) + ");\n}\n.flag-icon-gr.flag-icon-squared {\n  background-image: url(" + __webpack_require__(311) + ");\n}\n.flag-icon-gs {\n  background-image: url(" + __webpack_require__(312) + ");\n}\n.flag-icon-gs.flag-icon-squared {\n  background-image: url(" + __webpack_require__(313) + ");\n}\n.flag-icon-gt {\n  background-image: url(" + __webpack_require__(314) + ");\n}\n.flag-icon-gt.flag-icon-squared {\n  background-image: url(" + __webpack_require__(315) + ");\n}\n.flag-icon-gu {\n  background-image: url(" + __webpack_require__(316) + ");\n}\n.flag-icon-gu.flag-icon-squared {\n  background-image: url(" + __webpack_require__(317) + ");\n}\n.flag-icon-gw {\n  background-image: url(" + __webpack_require__(318) + ");\n}\n.flag-icon-gw.flag-icon-squared {\n  background-image: url(" + __webpack_require__(319) + ");\n}\n.flag-icon-gy {\n  background-image: url(" + __webpack_require__(320) + ");\n}\n.flag-icon-gy.flag-icon-squared {\n  background-image: url(" + __webpack_require__(321) + ");\n}\n.flag-icon-hk {\n  background-image: url(" + __webpack_require__(322) + ");\n}\n.flag-icon-hk.flag-icon-squared {\n  background-image: url(" + __webpack_require__(323) + ");\n}\n.flag-icon-hm {\n  background-image: url(" + __webpack_require__(324) + ");\n}\n.flag-icon-hm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(325) + ");\n}\n.flag-icon-hn {\n  background-image: url(" + __webpack_require__(326) + ");\n}\n.flag-icon-hn.flag-icon-squared {\n  background-image: url(" + __webpack_require__(327) + ");\n}\n.flag-icon-hr {\n  background-image: url(" + __webpack_require__(328) + ");\n}\n.flag-icon-hr.flag-icon-squared {\n  background-image: url(" + __webpack_require__(329) + ");\n}\n.flag-icon-ht {\n  background-image: url(" + __webpack_require__(330) + ");\n}\n.flag-icon-ht.flag-icon-squared {\n  background-image: url(" + __webpack_require__(331) + ");\n}\n.flag-icon-hu {\n  background-image: url(" + __webpack_require__(332) + ");\n}\n.flag-icon-hu.flag-icon-squared {\n  background-image: url(" + __webpack_require__(333) + ");\n}\n.flag-icon-id {\n  background-image: url(" + __webpack_require__(334) + ");\n}\n.flag-icon-id.flag-icon-squared {\n  background-image: url(" + __webpack_require__(335) + ");\n}\n.flag-icon-ie {\n  background-image: url(" + __webpack_require__(336) + ");\n}\n.flag-icon-ie.flag-icon-squared {\n  background-image: url(" + __webpack_require__(337) + ");\n}\n.flag-icon-il {\n  background-image: url(" + __webpack_require__(338) + ");\n}\n.flag-icon-il.flag-icon-squared {\n  background-image: url(" + __webpack_require__(339) + ");\n}\n.flag-icon-im {\n  background-image: url(" + __webpack_require__(340) + ");\n}\n.flag-icon-im.flag-icon-squared {\n  background-image: url(" + __webpack_require__(341) + ");\n}\n.flag-icon-in {\n  background-image: url(" + __webpack_require__(342) + ");\n}\n.flag-icon-in.flag-icon-squared {\n  background-image: url(" + __webpack_require__(343) + ");\n}\n.flag-icon-io {\n  background-image: url(" + __webpack_require__(344) + ");\n}\n.flag-icon-io.flag-icon-squared {\n  background-image: url(" + __webpack_require__(345) + ");\n}\n.flag-icon-iq {\n  background-image: url(" + __webpack_require__(346) + ");\n}\n.flag-icon-iq.flag-icon-squared {\n  background-image: url(" + __webpack_require__(347) + ");\n}\n.flag-icon-ir {\n  background-image: url(" + __webpack_require__(348) + ");\n}\n.flag-icon-ir.flag-icon-squared {\n  background-image: url(" + __webpack_require__(349) + ");\n}\n.flag-icon-is {\n  background-image: url(" + __webpack_require__(350) + ");\n}\n.flag-icon-is.flag-icon-squared {\n  background-image: url(" + __webpack_require__(351) + ");\n}\n.flag-icon-it {\n  background-image: url(" + __webpack_require__(352) + ");\n}\n.flag-icon-it.flag-icon-squared {\n  background-image: url(" + __webpack_require__(353) + ");\n}\n.flag-icon-je {\n  background-image: url(" + __webpack_require__(354) + ");\n}\n.flag-icon-je.flag-icon-squared {\n  background-image: url(" + __webpack_require__(355) + ");\n}\n.flag-icon-jm {\n  background-image: url(" + __webpack_require__(356) + ");\n}\n.flag-icon-jm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(357) + ");\n}\n.flag-icon-jo {\n  background-image: url(" + __webpack_require__(358) + ");\n}\n.flag-icon-jo.flag-icon-squared {\n  background-image: url(" + __webpack_require__(359) + ");\n}\n.flag-icon-jp {\n  background-image: url(" + __webpack_require__(360) + ");\n}\n.flag-icon-jp.flag-icon-squared {\n  background-image: url(" + __webpack_require__(361) + ");\n}\n.flag-icon-ke {\n  background-image: url(" + __webpack_require__(362) + ");\n}\n.flag-icon-ke.flag-icon-squared {\n  background-image: url(" + __webpack_require__(363) + ");\n}\n.flag-icon-kg {\n  background-image: url(" + __webpack_require__(364) + ");\n}\n.flag-icon-kg.flag-icon-squared {\n  background-image: url(" + __webpack_require__(365) + ");\n}\n.flag-icon-kh {\n  background-image: url(" + __webpack_require__(366) + ");\n}\n.flag-icon-kh.flag-icon-squared {\n  background-image: url(" + __webpack_require__(367) + ");\n}\n.flag-icon-ki {\n  background-image: url(" + __webpack_require__(368) + ");\n}\n.flag-icon-ki.flag-icon-squared {\n  background-image: url(" + __webpack_require__(369) + ");\n}\n.flag-icon-km {\n  background-image: url(" + __webpack_require__(370) + ");\n}\n.flag-icon-km.flag-icon-squared {\n  background-image: url(" + __webpack_require__(371) + ");\n}\n.flag-icon-kn {\n  background-image: url(" + __webpack_require__(372) + ");\n}\n.flag-icon-kn.flag-icon-squared {\n  background-image: url(" + __webpack_require__(373) + ");\n}\n.flag-icon-kp {\n  background-image: url(" + __webpack_require__(374) + ");\n}\n.flag-icon-kp.flag-icon-squared {\n  background-image: url(" + __webpack_require__(375) + ");\n}\n.flag-icon-kr {\n  background-image: url(" + __webpack_require__(376) + ");\n}\n.flag-icon-kr.flag-icon-squared {\n  background-image: url(" + __webpack_require__(377) + ");\n}\n.flag-icon-kw {\n  background-image: url(" + __webpack_require__(378) + ");\n}\n.flag-icon-kw.flag-icon-squared {\n  background-image: url(" + __webpack_require__(379) + ");\n}\n.flag-icon-ky {\n  background-image: url(" + __webpack_require__(380) + ");\n}\n.flag-icon-ky.flag-icon-squared {\n  background-image: url(" + __webpack_require__(381) + ");\n}\n.flag-icon-kz {\n  background-image: url(" + __webpack_require__(382) + ");\n}\n.flag-icon-kz.flag-icon-squared {\n  background-image: url(" + __webpack_require__(383) + ");\n}\n.flag-icon-la {\n  background-image: url(" + __webpack_require__(384) + ");\n}\n.flag-icon-la.flag-icon-squared {\n  background-image: url(" + __webpack_require__(385) + ");\n}\n.flag-icon-lb {\n  background-image: url(" + __webpack_require__(386) + ");\n}\n.flag-icon-lb.flag-icon-squared {\n  background-image: url(" + __webpack_require__(387) + ");\n}\n.flag-icon-lc {\n  background-image: url(" + __webpack_require__(388) + ");\n}\n.flag-icon-lc.flag-icon-squared {\n  background-image: url(" + __webpack_require__(389) + ");\n}\n.flag-icon-li {\n  background-image: url(" + __webpack_require__(390) + ");\n}\n.flag-icon-li.flag-icon-squared {\n  background-image: url(" + __webpack_require__(391) + ");\n}\n.flag-icon-lk {\n  background-image: url(" + __webpack_require__(392) + ");\n}\n.flag-icon-lk.flag-icon-squared {\n  background-image: url(" + __webpack_require__(393) + ");\n}\n.flag-icon-lr {\n  background-image: url(" + __webpack_require__(394) + ");\n}\n.flag-icon-lr.flag-icon-squared {\n  background-image: url(" + __webpack_require__(395) + ");\n}\n.flag-icon-ls {\n  background-image: url(" + __webpack_require__(396) + ");\n}\n.flag-icon-ls.flag-icon-squared {\n  background-image: url(" + __webpack_require__(397) + ");\n}\n.flag-icon-lt {\n  background-image: url(" + __webpack_require__(398) + ");\n}\n.flag-icon-lt.flag-icon-squared {\n  background-image: url(" + __webpack_require__(399) + ");\n}\n.flag-icon-lu {\n  background-image: url(" + __webpack_require__(400) + ");\n}\n.flag-icon-lu.flag-icon-squared {\n  background-image: url(" + __webpack_require__(401) + ");\n}\n.flag-icon-lv {\n  background-image: url(" + __webpack_require__(402) + ");\n}\n.flag-icon-lv.flag-icon-squared {\n  background-image: url(" + __webpack_require__(403) + ");\n}\n.flag-icon-ly {\n  background-image: url(" + __webpack_require__(404) + ");\n}\n.flag-icon-ly.flag-icon-squared {\n  background-image: url(" + __webpack_require__(405) + ");\n}\n.flag-icon-ma {\n  background-image: url(" + __webpack_require__(406) + ");\n}\n.flag-icon-ma.flag-icon-squared {\n  background-image: url(" + __webpack_require__(407) + ");\n}\n.flag-icon-mc {\n  background-image: url(" + __webpack_require__(408) + ");\n}\n.flag-icon-mc.flag-icon-squared {\n  background-image: url(" + __webpack_require__(409) + ");\n}\n.flag-icon-md {\n  background-image: url(" + __webpack_require__(410) + ");\n}\n.flag-icon-md.flag-icon-squared {\n  background-image: url(" + __webpack_require__(411) + ");\n}\n.flag-icon-me {\n  background-image: url(" + __webpack_require__(412) + ");\n}\n.flag-icon-me.flag-icon-squared {\n  background-image: url(" + __webpack_require__(413) + ");\n}\n.flag-icon-mf {\n  background-image: url(" + __webpack_require__(414) + ");\n}\n.flag-icon-mf.flag-icon-squared {\n  background-image: url(" + __webpack_require__(415) + ");\n}\n.flag-icon-mg {\n  background-image: url(" + __webpack_require__(416) + ");\n}\n.flag-icon-mg.flag-icon-squared {\n  background-image: url(" + __webpack_require__(417) + ");\n}\n.flag-icon-mh {\n  background-image: url(" + __webpack_require__(418) + ");\n}\n.flag-icon-mh.flag-icon-squared {\n  background-image: url(" + __webpack_require__(419) + ");\n}\n.flag-icon-mk {\n  background-image: url(" + __webpack_require__(420) + ");\n}\n.flag-icon-mk.flag-icon-squared {\n  background-image: url(" + __webpack_require__(421) + ");\n}\n.flag-icon-ml {\n  background-image: url(" + __webpack_require__(422) + ");\n}\n.flag-icon-ml.flag-icon-squared {\n  background-image: url(" + __webpack_require__(423) + ");\n}\n.flag-icon-mm {\n  background-image: url(" + __webpack_require__(424) + ");\n}\n.flag-icon-mm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(425) + ");\n}\n.flag-icon-mn {\n  background-image: url(" + __webpack_require__(426) + ");\n}\n.flag-icon-mn.flag-icon-squared {\n  background-image: url(" + __webpack_require__(427) + ");\n}\n.flag-icon-mo {\n  background-image: url(" + __webpack_require__(428) + ");\n}\n.flag-icon-mo.flag-icon-squared {\n  background-image: url(" + __webpack_require__(429) + ");\n}\n.flag-icon-mp {\n  background-image: url(" + __webpack_require__(430) + ");\n}\n.flag-icon-mp.flag-icon-squared {\n  background-image: url(" + __webpack_require__(431) + ");\n}\n.flag-icon-mq {\n  background-image: url(" + __webpack_require__(432) + ");\n}\n.flag-icon-mq.flag-icon-squared {\n  background-image: url(" + __webpack_require__(433) + ");\n}\n.flag-icon-mr {\n  background-image: url(" + __webpack_require__(434) + ");\n}\n.flag-icon-mr.flag-icon-squared {\n  background-image: url(" + __webpack_require__(435) + ");\n}\n.flag-icon-ms {\n  background-image: url(" + __webpack_require__(436) + ");\n}\n.flag-icon-ms.flag-icon-squared {\n  background-image: url(" + __webpack_require__(437) + ");\n}\n.flag-icon-mt {\n  background-image: url(" + __webpack_require__(438) + ");\n}\n.flag-icon-mt.flag-icon-squared {\n  background-image: url(" + __webpack_require__(439) + ");\n}\n.flag-icon-mu {\n  background-image: url(" + __webpack_require__(440) + ");\n}\n.flag-icon-mu.flag-icon-squared {\n  background-image: url(" + __webpack_require__(441) + ");\n}\n.flag-icon-mv {\n  background-image: url(" + __webpack_require__(442) + ");\n}\n.flag-icon-mv.flag-icon-squared {\n  background-image: url(" + __webpack_require__(443) + ");\n}\n.flag-icon-mw {\n  background-image: url(" + __webpack_require__(444) + ");\n}\n.flag-icon-mw.flag-icon-squared {\n  background-image: url(" + __webpack_require__(445) + ");\n}\n.flag-icon-mx {\n  background-image: url(" + __webpack_require__(446) + ");\n}\n.flag-icon-mx.flag-icon-squared {\n  background-image: url(" + __webpack_require__(447) + ");\n}\n.flag-icon-my {\n  background-image: url(" + __webpack_require__(448) + ");\n}\n.flag-icon-my.flag-icon-squared {\n  background-image: url(" + __webpack_require__(449) + ");\n}\n.flag-icon-mz {\n  background-image: url(" + __webpack_require__(450) + ");\n}\n.flag-icon-mz.flag-icon-squared {\n  background-image: url(" + __webpack_require__(451) + ");\n}\n.flag-icon-na {\n  background-image: url(" + __webpack_require__(452) + ");\n}\n.flag-icon-na.flag-icon-squared {\n  background-image: url(" + __webpack_require__(453) + ");\n}\n.flag-icon-nc {\n  background-image: url(" + __webpack_require__(454) + ");\n}\n.flag-icon-nc.flag-icon-squared {\n  background-image: url(" + __webpack_require__(455) + ");\n}\n.flag-icon-ne {\n  background-image: url(" + __webpack_require__(456) + ");\n}\n.flag-icon-ne.flag-icon-squared {\n  background-image: url(" + __webpack_require__(457) + ");\n}\n.flag-icon-nf {\n  background-image: url(" + __webpack_require__(458) + ");\n}\n.flag-icon-nf.flag-icon-squared {\n  background-image: url(" + __webpack_require__(459) + ");\n}\n.flag-icon-ng {\n  background-image: url(" + __webpack_require__(460) + ");\n}\n.flag-icon-ng.flag-icon-squared {\n  background-image: url(" + __webpack_require__(461) + ");\n}\n.flag-icon-ni {\n  background-image: url(" + __webpack_require__(462) + ");\n}\n.flag-icon-ni.flag-icon-squared {\n  background-image: url(" + __webpack_require__(463) + ");\n}\n.flag-icon-nl {\n  background-image: url(" + __webpack_require__(464) + ");\n}\n.flag-icon-nl.flag-icon-squared {\n  background-image: url(" + __webpack_require__(465) + ");\n}\n.flag-icon-no {\n  background-image: url(" + __webpack_require__(466) + ");\n}\n.flag-icon-no.flag-icon-squared {\n  background-image: url(" + __webpack_require__(467) + ");\n}\n.flag-icon-np {\n  background-image: url(" + __webpack_require__(468) + ");\n}\n.flag-icon-np.flag-icon-squared {\n  background-image: url(" + __webpack_require__(469) + ");\n}\n.flag-icon-nr {\n  background-image: url(" + __webpack_require__(470) + ");\n}\n.flag-icon-nr.flag-icon-squared {\n  background-image: url(" + __webpack_require__(471) + ");\n}\n.flag-icon-nu {\n  background-image: url(" + __webpack_require__(472) + ");\n}\n.flag-icon-nu.flag-icon-squared {\n  background-image: url(" + __webpack_require__(473) + ");\n}\n.flag-icon-nz {\n  background-image: url(" + __webpack_require__(474) + ");\n}\n.flag-icon-nz.flag-icon-squared {\n  background-image: url(" + __webpack_require__(475) + ");\n}\n.flag-icon-om {\n  background-image: url(" + __webpack_require__(476) + ");\n}\n.flag-icon-om.flag-icon-squared {\n  background-image: url(" + __webpack_require__(477) + ");\n}\n.flag-icon-pa {\n  background-image: url(" + __webpack_require__(478) + ");\n}\n.flag-icon-pa.flag-icon-squared {\n  background-image: url(" + __webpack_require__(479) + ");\n}\n.flag-icon-pe {\n  background-image: url(" + __webpack_require__(480) + ");\n}\n.flag-icon-pe.flag-icon-squared {\n  background-image: url(" + __webpack_require__(481) + ");\n}\n.flag-icon-pf {\n  background-image: url(" + __webpack_require__(482) + ");\n}\n.flag-icon-pf.flag-icon-squared {\n  background-image: url(" + __webpack_require__(483) + ");\n}\n.flag-icon-pg {\n  background-image: url(" + __webpack_require__(484) + ");\n}\n.flag-icon-pg.flag-icon-squared {\n  background-image: url(" + __webpack_require__(485) + ");\n}\n.flag-icon-ph {\n  background-image: url(" + __webpack_require__(486) + ");\n}\n.flag-icon-ph.flag-icon-squared {\n  background-image: url(" + __webpack_require__(487) + ");\n}\n.flag-icon-pk {\n  background-image: url(" + __webpack_require__(488) + ");\n}\n.flag-icon-pk.flag-icon-squared {\n  background-image: url(" + __webpack_require__(489) + ");\n}\n.flag-icon-pl {\n  background-image: url(" + __webpack_require__(490) + ");\n}\n.flag-icon-pl.flag-icon-squared {\n  background-image: url(" + __webpack_require__(491) + ");\n}\n.flag-icon-pm {\n  background-image: url(" + __webpack_require__(492) + ");\n}\n.flag-icon-pm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(493) + ");\n}\n.flag-icon-pn {\n  background-image: url(" + __webpack_require__(494) + ");\n}\n.flag-icon-pn.flag-icon-squared {\n  background-image: url(" + __webpack_require__(495) + ");\n}\n.flag-icon-pr {\n  background-image: url(" + __webpack_require__(496) + ");\n}\n.flag-icon-pr.flag-icon-squared {\n  background-image: url(" + __webpack_require__(497) + ");\n}\n.flag-icon-ps {\n  background-image: url(" + __webpack_require__(498) + ");\n}\n.flag-icon-ps.flag-icon-squared {\n  background-image: url(" + __webpack_require__(499) + ");\n}\n.flag-icon-pt {\n  background-image: url(" + __webpack_require__(500) + ");\n}\n.flag-icon-pt.flag-icon-squared {\n  background-image: url(" + __webpack_require__(501) + ");\n}\n.flag-icon-pw {\n  background-image: url(" + __webpack_require__(502) + ");\n}\n.flag-icon-pw.flag-icon-squared {\n  background-image: url(" + __webpack_require__(503) + ");\n}\n.flag-icon-py {\n  background-image: url(" + __webpack_require__(504) + ");\n}\n.flag-icon-py.flag-icon-squared {\n  background-image: url(" + __webpack_require__(505) + ");\n}\n.flag-icon-qa {\n  background-image: url(" + __webpack_require__(506) + ");\n}\n.flag-icon-qa.flag-icon-squared {\n  background-image: url(" + __webpack_require__(507) + ");\n}\n.flag-icon-re {\n  background-image: url(" + __webpack_require__(508) + ");\n}\n.flag-icon-re.flag-icon-squared {\n  background-image: url(" + __webpack_require__(509) + ");\n}\n.flag-icon-ro {\n  background-image: url(" + __webpack_require__(510) + ");\n}\n.flag-icon-ro.flag-icon-squared {\n  background-image: url(" + __webpack_require__(511) + ");\n}\n.flag-icon-rs {\n  background-image: url(" + __webpack_require__(512) + ");\n}\n.flag-icon-rs.flag-icon-squared {\n  background-image: url(" + __webpack_require__(513) + ");\n}\n.flag-icon-ru {\n  background-image: url(" + __webpack_require__(514) + ");\n}\n.flag-icon-ru.flag-icon-squared {\n  background-image: url(" + __webpack_require__(515) + ");\n}\n.flag-icon-rw {\n  background-image: url(" + __webpack_require__(516) + ");\n}\n.flag-icon-rw.flag-icon-squared {\n  background-image: url(" + __webpack_require__(517) + ");\n}\n.flag-icon-sa {\n  background-image: url(" + __webpack_require__(518) + ");\n}\n.flag-icon-sa.flag-icon-squared {\n  background-image: url(" + __webpack_require__(519) + ");\n}\n.flag-icon-sb {\n  background-image: url(" + __webpack_require__(520) + ");\n}\n.flag-icon-sb.flag-icon-squared {\n  background-image: url(" + __webpack_require__(521) + ");\n}\n.flag-icon-sc {\n  background-image: url(" + __webpack_require__(522) + ");\n}\n.flag-icon-sc.flag-icon-squared {\n  background-image: url(" + __webpack_require__(523) + ");\n}\n.flag-icon-sd {\n  background-image: url(" + __webpack_require__(524) + ");\n}\n.flag-icon-sd.flag-icon-squared {\n  background-image: url(" + __webpack_require__(525) + ");\n}\n.flag-icon-se {\n  background-image: url(" + __webpack_require__(526) + ");\n}\n.flag-icon-se.flag-icon-squared {\n  background-image: url(" + __webpack_require__(527) + ");\n}\n.flag-icon-sg {\n  background-image: url(" + __webpack_require__(528) + ");\n}\n.flag-icon-sg.flag-icon-squared {\n  background-image: url(" + __webpack_require__(529) + ");\n}\n.flag-icon-sh {\n  background-image: url(" + __webpack_require__(530) + ");\n}\n.flag-icon-sh.flag-icon-squared {\n  background-image: url(" + __webpack_require__(531) + ");\n}\n.flag-icon-si {\n  background-image: url(" + __webpack_require__(532) + ");\n}\n.flag-icon-si.flag-icon-squared {\n  background-image: url(" + __webpack_require__(533) + ");\n}\n.flag-icon-sj {\n  background-image: url(" + __webpack_require__(534) + ");\n}\n.flag-icon-sj.flag-icon-squared {\n  background-image: url(" + __webpack_require__(535) + ");\n}\n.flag-icon-sk {\n  background-image: url(" + __webpack_require__(536) + ");\n}\n.flag-icon-sk.flag-icon-squared {\n  background-image: url(" + __webpack_require__(537) + ");\n}\n.flag-icon-sl {\n  background-image: url(" + __webpack_require__(538) + ");\n}\n.flag-icon-sl.flag-icon-squared {\n  background-image: url(" + __webpack_require__(539) + ");\n}\n.flag-icon-sm {\n  background-image: url(" + __webpack_require__(540) + ");\n}\n.flag-icon-sm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(541) + ");\n}\n.flag-icon-sn {\n  background-image: url(" + __webpack_require__(542) + ");\n}\n.flag-icon-sn.flag-icon-squared {\n  background-image: url(" + __webpack_require__(543) + ");\n}\n.flag-icon-so {\n  background-image: url(" + __webpack_require__(544) + ");\n}\n.flag-icon-so.flag-icon-squared {\n  background-image: url(" + __webpack_require__(545) + ");\n}\n.flag-icon-sr {\n  background-image: url(" + __webpack_require__(546) + ");\n}\n.flag-icon-sr.flag-icon-squared {\n  background-image: url(" + __webpack_require__(547) + ");\n}\n.flag-icon-ss {\n  background-image: url(" + __webpack_require__(548) + ");\n}\n.flag-icon-ss.flag-icon-squared {\n  background-image: url(" + __webpack_require__(549) + ");\n}\n.flag-icon-st {\n  background-image: url(" + __webpack_require__(550) + ");\n}\n.flag-icon-st.flag-icon-squared {\n  background-image: url(" + __webpack_require__(551) + ");\n}\n.flag-icon-sv {\n  background-image: url(" + __webpack_require__(552) + ");\n}\n.flag-icon-sv.flag-icon-squared {\n  background-image: url(" + __webpack_require__(553) + ");\n}\n.flag-icon-sx {\n  background-image: url(" + __webpack_require__(554) + ");\n}\n.flag-icon-sx.flag-icon-squared {\n  background-image: url(" + __webpack_require__(555) + ");\n}\n.flag-icon-sy {\n  background-image: url(" + __webpack_require__(556) + ");\n}\n.flag-icon-sy.flag-icon-squared {\n  background-image: url(" + __webpack_require__(557) + ");\n}\n.flag-icon-sz {\n  background-image: url(" + __webpack_require__(558) + ");\n}\n.flag-icon-sz.flag-icon-squared {\n  background-image: url(" + __webpack_require__(559) + ");\n}\n.flag-icon-tc {\n  background-image: url(" + __webpack_require__(560) + ");\n}\n.flag-icon-tc.flag-icon-squared {\n  background-image: url(" + __webpack_require__(561) + ");\n}\n.flag-icon-td {\n  background-image: url(" + __webpack_require__(562) + ");\n}\n.flag-icon-td.flag-icon-squared {\n  background-image: url(" + __webpack_require__(563) + ");\n}\n.flag-icon-tf {\n  background-image: url(" + __webpack_require__(564) + ");\n}\n.flag-icon-tf.flag-icon-squared {\n  background-image: url(" + __webpack_require__(565) + ");\n}\n.flag-icon-tg {\n  background-image: url(" + __webpack_require__(566) + ");\n}\n.flag-icon-tg.flag-icon-squared {\n  background-image: url(" + __webpack_require__(567) + ");\n}\n.flag-icon-th {\n  background-image: url(" + __webpack_require__(568) + ");\n}\n.flag-icon-th.flag-icon-squared {\n  background-image: url(" + __webpack_require__(569) + ");\n}\n.flag-icon-tj {\n  background-image: url(" + __webpack_require__(570) + ");\n}\n.flag-icon-tj.flag-icon-squared {\n  background-image: url(" + __webpack_require__(571) + ");\n}\n.flag-icon-tk {\n  background-image: url(" + __webpack_require__(572) + ");\n}\n.flag-icon-tk.flag-icon-squared {\n  background-image: url(" + __webpack_require__(573) + ");\n}\n.flag-icon-tl {\n  background-image: url(" + __webpack_require__(574) + ");\n}\n.flag-icon-tl.flag-icon-squared {\n  background-image: url(" + __webpack_require__(575) + ");\n}\n.flag-icon-tm {\n  background-image: url(" + __webpack_require__(576) + ");\n}\n.flag-icon-tm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(577) + ");\n}\n.flag-icon-tn {\n  background-image: url(" + __webpack_require__(578) + ");\n}\n.flag-icon-tn.flag-icon-squared {\n  background-image: url(" + __webpack_require__(579) + ");\n}\n.flag-icon-to {\n  background-image: url(" + __webpack_require__(580) + ");\n}\n.flag-icon-to.flag-icon-squared {\n  background-image: url(" + __webpack_require__(581) + ");\n}\n.flag-icon-tr {\n  background-image: url(" + __webpack_require__(582) + ");\n}\n.flag-icon-tr.flag-icon-squared {\n  background-image: url(" + __webpack_require__(583) + ");\n}\n.flag-icon-tt {\n  background-image: url(" + __webpack_require__(584) + ");\n}\n.flag-icon-tt.flag-icon-squared {\n  background-image: url(" + __webpack_require__(585) + ");\n}\n.flag-icon-tv {\n  background-image: url(" + __webpack_require__(586) + ");\n}\n.flag-icon-tv.flag-icon-squared {\n  background-image: url(" + __webpack_require__(587) + ");\n}\n.flag-icon-tw {\n  background-image: url(" + __webpack_require__(588) + ");\n}\n.flag-icon-tw.flag-icon-squared {\n  background-image: url(" + __webpack_require__(589) + ");\n}\n.flag-icon-tz {\n  background-image: url(" + __webpack_require__(590) + ");\n}\n.flag-icon-tz.flag-icon-squared {\n  background-image: url(" + __webpack_require__(591) + ");\n}\n.flag-icon-ua {\n  background-image: url(" + __webpack_require__(592) + ");\n}\n.flag-icon-ua.flag-icon-squared {\n  background-image: url(" + __webpack_require__(593) + ");\n}\n.flag-icon-ug {\n  background-image: url(" + __webpack_require__(594) + ");\n}\n.flag-icon-ug.flag-icon-squared {\n  background-image: url(" + __webpack_require__(595) + ");\n}\n.flag-icon-um {\n  background-image: url(" + __webpack_require__(596) + ");\n}\n.flag-icon-um.flag-icon-squared {\n  background-image: url(" + __webpack_require__(597) + ");\n}\n.flag-icon-us {\n  background-image: url(" + __webpack_require__(598) + ");\n}\n.flag-icon-us.flag-icon-squared {\n  background-image: url(" + __webpack_require__(599) + ");\n}\n.flag-icon-uy {\n  background-image: url(" + __webpack_require__(600) + ");\n}\n.flag-icon-uy.flag-icon-squared {\n  background-image: url(" + __webpack_require__(601) + ");\n}\n.flag-icon-uz {\n  background-image: url(" + __webpack_require__(602) + ");\n}\n.flag-icon-uz.flag-icon-squared {\n  background-image: url(" + __webpack_require__(603) + ");\n}\n.flag-icon-va {\n  background-image: url(" + __webpack_require__(604) + ");\n}\n.flag-icon-va.flag-icon-squared {\n  background-image: url(" + __webpack_require__(605) + ");\n}\n.flag-icon-vc {\n  background-image: url(" + __webpack_require__(606) + ");\n}\n.flag-icon-vc.flag-icon-squared {\n  background-image: url(" + __webpack_require__(607) + ");\n}\n.flag-icon-ve {\n  background-image: url(" + __webpack_require__(608) + ");\n}\n.flag-icon-ve.flag-icon-squared {\n  background-image: url(" + __webpack_require__(609) + ");\n}\n.flag-icon-vg {\n  background-image: url(" + __webpack_require__(610) + ");\n}\n.flag-icon-vg.flag-icon-squared {\n  background-image: url(" + __webpack_require__(611) + ");\n}\n.flag-icon-vi {\n  background-image: url(" + __webpack_require__(612) + ");\n}\n.flag-icon-vi.flag-icon-squared {\n  background-image: url(" + __webpack_require__(613) + ");\n}\n.flag-icon-vn {\n  background-image: url(" + __webpack_require__(614) + ");\n}\n.flag-icon-vn.flag-icon-squared {\n  background-image: url(" + __webpack_require__(615) + ");\n}\n.flag-icon-vu {\n  background-image: url(" + __webpack_require__(616) + ");\n}\n.flag-icon-vu.flag-icon-squared {\n  background-image: url(" + __webpack_require__(617) + ");\n}\n.flag-icon-wf {\n  background-image: url(" + __webpack_require__(618) + ");\n}\n.flag-icon-wf.flag-icon-squared {\n  background-image: url(" + __webpack_require__(619) + ");\n}\n.flag-icon-ws {\n  background-image: url(" + __webpack_require__(620) + ");\n}\n.flag-icon-ws.flag-icon-squared {\n  background-image: url(" + __webpack_require__(621) + ");\n}\n.flag-icon-ye {\n  background-image: url(" + __webpack_require__(622) + ");\n}\n.flag-icon-ye.flag-icon-squared {\n  background-image: url(" + __webpack_require__(623) + ");\n}\n.flag-icon-yt {\n  background-image: url(" + __webpack_require__(624) + ");\n}\n.flag-icon-yt.flag-icon-squared {\n  background-image: url(" + __webpack_require__(625) + ");\n}\n.flag-icon-za {\n  background-image: url(" + __webpack_require__(626) + ");\n}\n.flag-icon-za.flag-icon-squared {\n  background-image: url(" + __webpack_require__(627) + ");\n}\n.flag-icon-zm {\n  background-image: url(" + __webpack_require__(628) + ");\n}\n.flag-icon-zm.flag-icon-squared {\n  background-image: url(" + __webpack_require__(629) + ");\n}\n.flag-icon-zw {\n  background-image: url(" + __webpack_require__(630) + ");\n}\n.flag-icon-zw.flag-icon-squared {\n  background-image: url(" + __webpack_require__(631) + ");\n}\n.flag-icon-eu {\n  background-image: url(" + __webpack_require__(632) + ");\n}\n.flag-icon-eu.flag-icon-squared {\n  background-image: url(" + __webpack_require__(633) + ");\n}\n.flag-icon-gb-eng {\n  background-image: url(" + __webpack_require__(634) + ");\n}\n.flag-icon-gb-eng.flag-icon-squared {\n  background-image: url(" + __webpack_require__(635) + ");\n}\n.flag-icon-gb-nir {\n  background-image: url(" + __webpack_require__(636) + ");\n}\n.flag-icon-gb-nir.flag-icon-squared {\n  background-image: url(" + __webpack_require__(637) + ");\n}\n.flag-icon-gb-sct {\n  background-image: url(" + __webpack_require__(638) + ");\n}\n.flag-icon-gb-sct.flag-icon-squared {\n  background-image: url(" + __webpack_require__(639) + ");\n}\n.flag-icon-gb-wls {\n  background-image: url(" + __webpack_require__(640) + ");\n}\n.flag-icon-gb-wls.flag-icon-squared {\n  background-image: url(" + __webpack_require__(641) + ");\n}\n.flag-icon-un {\n  background-image: url(" + __webpack_require__(642) + ");\n}\n.flag-icon-un.flag-icon-squared {\n  background-image: url(" + __webpack_require__(643) + ");\n}\n", ""]);
	
	// exports


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ad.svg.svg";

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ad.svg.svg";

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ae.svg.svg";

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ae.svg.svg";

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/af.svg.svg";

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/af.svg.svg";

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ag.svg.svg";

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ag.svg.svg";

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ai.svg.svg";

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ai.svg.svg";

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/al.svg.svg";

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/al.svg.svg";

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/am.svg.svg";

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/am.svg.svg";

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ao.svg.svg";

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ao.svg.svg";

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/aq.svg.svg";

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/aq.svg.svg";

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ar.svg.svg";

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ar.svg.svg";

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/as.svg.svg";

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/as.svg.svg";

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/at.svg.svg";

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/at.svg.svg";

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/au.svg.svg";

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/au.svg.svg";

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/aw.svg.svg";

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/aw.svg.svg";

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ax.svg.svg";

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ax.svg.svg";

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/az.svg.svg";

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/az.svg.svg";

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ba.svg.svg";

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ba.svg.svg";

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bb.svg.svg";

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bb.svg.svg";

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bd.svg.svg";

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bd.svg.svg";

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/be.svg.svg";

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/be.svg.svg";

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bf.svg.svg";

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bf.svg.svg";

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bg.svg.svg";

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bg.svg.svg";

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bh.svg.svg";

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bh.svg.svg";

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bi.svg.svg";

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bi.svg.svg";

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bj.svg.svg";

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bj.svg.svg";

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bl.svg.svg";

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bl.svg.svg";

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bm.svg.svg";

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bm.svg.svg";

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bn.svg.svg";

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bn.svg.svg";

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bo.svg.svg";

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bo.svg.svg";

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bq.svg.svg";

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bq.svg.svg";

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/br.svg.svg";

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/br.svg.svg";

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bs.svg.svg";

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bs.svg.svg";

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bt.svg.svg";

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bt.svg.svg";

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bv.svg.svg";

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bv.svg.svg";

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bw.svg.svg";

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bw.svg.svg";

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/by.svg.svg";

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/by.svg.svg";

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/bz.svg.svg";

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/bz.svg.svg";

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ca.svg.svg";

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ca.svg.svg";

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cc.svg.svg";

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cc.svg.svg";

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cd.svg.svg";

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cd.svg.svg";

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cf.svg.svg";

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cf.svg.svg";

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cg.svg.svg";

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cg.svg.svg";

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ch.svg.svg";

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ch.svg.svg";

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ci.svg.svg";

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ci.svg.svg";

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ck.svg.svg";

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ck.svg.svg";

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cl.svg.svg";

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cl.svg.svg";

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cm.svg.svg";

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cm.svg.svg";

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cn.svg.svg";

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cn.svg.svg";

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/co.svg.svg";

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/co.svg.svg";

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cr.svg.svg";

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cr.svg.svg";

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cu.svg.svg";

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cu.svg.svg";

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cv.svg.svg";

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cv.svg.svg";

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cw.svg.svg";

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cw.svg.svg";

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cx.svg.svg";

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cx.svg.svg";

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cy.svg.svg";

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cy.svg.svg";

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/cz.svg.svg";

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/cz.svg.svg";

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/de.svg.svg";

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/de.svg.svg";

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/dj.svg.svg";

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/dj.svg.svg";

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/dk.svg.svg";

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/dk.svg.svg";

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/dm.svg.svg";

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/dm.svg.svg";

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/do.svg.svg";

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/do.svg.svg";

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/dz.svg.svg";

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/dz.svg.svg";

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ec.svg.svg";

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ec.svg.svg";

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ee.svg.svg";

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ee.svg.svg";

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/eg.svg.svg";

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/eg.svg.svg";

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/eh.svg.svg";

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/eh.svg.svg";

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/er.svg.svg";

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/er.svg.svg";

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/es.svg.svg";

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/es.svg.svg";

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/et.svg.svg";

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/et.svg.svg";

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/fi.svg.svg";

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/fi.svg.svg";

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/fj.svg.svg";

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/fj.svg.svg";

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/fk.svg.svg";

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/fk.svg.svg";

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/fm.svg.svg";

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/fm.svg.svg";

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/fo.svg.svg";

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/fo.svg.svg";

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/fr.svg.svg";

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/fr.svg.svg";

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ga.svg.svg";

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ga.svg.svg";

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gb.svg.svg";

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gb.svg.svg";

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gd.svg.svg";

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gd.svg.svg";

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ge.svg.svg";

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ge.svg.svg";

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gf.svg.svg";

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gf.svg.svg";

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gg.svg.svg";

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gg.svg.svg";

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gh.svg.svg";

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gh.svg.svg";

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gi.svg.svg";

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gi.svg.svg";

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gl.svg.svg";

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gl.svg.svg";

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gm.svg.svg";

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gm.svg.svg";

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gn.svg.svg";

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gn.svg.svg";

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gp.svg.svg";

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gp.svg.svg";

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gq.svg.svg";

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gq.svg.svg";

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gr.svg.svg";

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gr.svg.svg";

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gs.svg.svg";

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gs.svg.svg";

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gt.svg.svg";

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gt.svg.svg";

/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gu.svg.svg";

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gu.svg.svg";

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gw.svg.svg";

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gw.svg.svg";

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gy.svg.svg";

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gy.svg.svg";

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/hk.svg.svg";

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/hk.svg.svg";

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/hm.svg.svg";

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/hm.svg.svg";

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/hn.svg.svg";

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/hn.svg.svg";

/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/hr.svg.svg";

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/hr.svg.svg";

/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ht.svg.svg";

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ht.svg.svg";

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/hu.svg.svg";

/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/hu.svg.svg";

/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/id.svg.svg";

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/id.svg.svg";

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ie.svg.svg";

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ie.svg.svg";

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/il.svg.svg";

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/il.svg.svg";

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/im.svg.svg";

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/im.svg.svg";

/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/in.svg.svg";

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/in.svg.svg";

/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/io.svg.svg";

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/io.svg.svg";

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/iq.svg.svg";

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/iq.svg.svg";

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ir.svg.svg";

/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ir.svg.svg";

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/is.svg.svg";

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/is.svg.svg";

/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/it.svg.svg";

/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/it.svg.svg";

/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/je.svg.svg";

/***/ },
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/je.svg.svg";

/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/jm.svg.svg";

/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/jm.svg.svg";

/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/jo.svg.svg";

/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/jo.svg.svg";

/***/ },
/* 360 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/jp.svg.svg";

/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/jp.svg.svg";

/***/ },
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ke.svg.svg";

/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ke.svg.svg";

/***/ },
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/kg.svg.svg";

/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/kg.svg.svg";

/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/kh.svg.svg";

/***/ },
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/kh.svg.svg";

/***/ },
/* 368 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ki.svg.svg";

/***/ },
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ki.svg.svg";

/***/ },
/* 370 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/km.svg.svg";

/***/ },
/* 371 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/km.svg.svg";

/***/ },
/* 372 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/kn.svg.svg";

/***/ },
/* 373 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/kn.svg.svg";

/***/ },
/* 374 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/kp.svg.svg";

/***/ },
/* 375 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/kp.svg.svg";

/***/ },
/* 376 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/kr.svg.svg";

/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/kr.svg.svg";

/***/ },
/* 378 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/kw.svg.svg";

/***/ },
/* 379 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/kw.svg.svg";

/***/ },
/* 380 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ky.svg.svg";

/***/ },
/* 381 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ky.svg.svg";

/***/ },
/* 382 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/kz.svg.svg";

/***/ },
/* 383 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/kz.svg.svg";

/***/ },
/* 384 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/la.svg.svg";

/***/ },
/* 385 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/la.svg.svg";

/***/ },
/* 386 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/lb.svg.svg";

/***/ },
/* 387 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/lb.svg.svg";

/***/ },
/* 388 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/lc.svg.svg";

/***/ },
/* 389 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/lc.svg.svg";

/***/ },
/* 390 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/li.svg.svg";

/***/ },
/* 391 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/li.svg.svg";

/***/ },
/* 392 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/lk.svg.svg";

/***/ },
/* 393 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/lk.svg.svg";

/***/ },
/* 394 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/lr.svg.svg";

/***/ },
/* 395 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/lr.svg.svg";

/***/ },
/* 396 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ls.svg.svg";

/***/ },
/* 397 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ls.svg.svg";

/***/ },
/* 398 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/lt.svg.svg";

/***/ },
/* 399 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/lt.svg.svg";

/***/ },
/* 400 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/lu.svg.svg";

/***/ },
/* 401 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/lu.svg.svg";

/***/ },
/* 402 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/lv.svg.svg";

/***/ },
/* 403 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/lv.svg.svg";

/***/ },
/* 404 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ly.svg.svg";

/***/ },
/* 405 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ly.svg.svg";

/***/ },
/* 406 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ma.svg.svg";

/***/ },
/* 407 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ma.svg.svg";

/***/ },
/* 408 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mc.svg.svg";

/***/ },
/* 409 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mc.svg.svg";

/***/ },
/* 410 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/md.svg.svg";

/***/ },
/* 411 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/md.svg.svg";

/***/ },
/* 412 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/me.svg.svg";

/***/ },
/* 413 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/me.svg.svg";

/***/ },
/* 414 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mf.svg.svg";

/***/ },
/* 415 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mf.svg.svg";

/***/ },
/* 416 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mg.svg.svg";

/***/ },
/* 417 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mg.svg.svg";

/***/ },
/* 418 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mh.svg.svg";

/***/ },
/* 419 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mh.svg.svg";

/***/ },
/* 420 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mk.svg.svg";

/***/ },
/* 421 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mk.svg.svg";

/***/ },
/* 422 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ml.svg.svg";

/***/ },
/* 423 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ml.svg.svg";

/***/ },
/* 424 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mm.svg.svg";

/***/ },
/* 425 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mm.svg.svg";

/***/ },
/* 426 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mn.svg.svg";

/***/ },
/* 427 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mn.svg.svg";

/***/ },
/* 428 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mo.svg.svg";

/***/ },
/* 429 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mo.svg.svg";

/***/ },
/* 430 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mp.svg.svg";

/***/ },
/* 431 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mp.svg.svg";

/***/ },
/* 432 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mq.svg.svg";

/***/ },
/* 433 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mq.svg.svg";

/***/ },
/* 434 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mr.svg.svg";

/***/ },
/* 435 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mr.svg.svg";

/***/ },
/* 436 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ms.svg.svg";

/***/ },
/* 437 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ms.svg.svg";

/***/ },
/* 438 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mt.svg.svg";

/***/ },
/* 439 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mt.svg.svg";

/***/ },
/* 440 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mu.svg.svg";

/***/ },
/* 441 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mu.svg.svg";

/***/ },
/* 442 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mv.svg.svg";

/***/ },
/* 443 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mv.svg.svg";

/***/ },
/* 444 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mw.svg.svg";

/***/ },
/* 445 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mw.svg.svg";

/***/ },
/* 446 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mx.svg.svg";

/***/ },
/* 447 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mx.svg.svg";

/***/ },
/* 448 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/my.svg.svg";

/***/ },
/* 449 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/my.svg.svg";

/***/ },
/* 450 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/mz.svg.svg";

/***/ },
/* 451 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/mz.svg.svg";

/***/ },
/* 452 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/na.svg.svg";

/***/ },
/* 453 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/na.svg.svg";

/***/ },
/* 454 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/nc.svg.svg";

/***/ },
/* 455 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/nc.svg.svg";

/***/ },
/* 456 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ne.svg.svg";

/***/ },
/* 457 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ne.svg.svg";

/***/ },
/* 458 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/nf.svg.svg";

/***/ },
/* 459 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/nf.svg.svg";

/***/ },
/* 460 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ng.svg.svg";

/***/ },
/* 461 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ng.svg.svg";

/***/ },
/* 462 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ni.svg.svg";

/***/ },
/* 463 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ni.svg.svg";

/***/ },
/* 464 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/nl.svg.svg";

/***/ },
/* 465 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/nl.svg.svg";

/***/ },
/* 466 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/no.svg.svg";

/***/ },
/* 467 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/no.svg.svg";

/***/ },
/* 468 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/np.svg.svg";

/***/ },
/* 469 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/np.svg.svg";

/***/ },
/* 470 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/nr.svg.svg";

/***/ },
/* 471 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/nr.svg.svg";

/***/ },
/* 472 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/nu.svg.svg";

/***/ },
/* 473 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/nu.svg.svg";

/***/ },
/* 474 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/nz.svg.svg";

/***/ },
/* 475 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/nz.svg.svg";

/***/ },
/* 476 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/om.svg.svg";

/***/ },
/* 477 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/om.svg.svg";

/***/ },
/* 478 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/pa.svg.svg";

/***/ },
/* 479 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/pa.svg.svg";

/***/ },
/* 480 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/pe.svg.svg";

/***/ },
/* 481 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/pe.svg.svg";

/***/ },
/* 482 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/pf.svg.svg";

/***/ },
/* 483 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/pf.svg.svg";

/***/ },
/* 484 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/pg.svg.svg";

/***/ },
/* 485 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/pg.svg.svg";

/***/ },
/* 486 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ph.svg.svg";

/***/ },
/* 487 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ph.svg.svg";

/***/ },
/* 488 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/pk.svg.svg";

/***/ },
/* 489 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/pk.svg.svg";

/***/ },
/* 490 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/pl.svg.svg";

/***/ },
/* 491 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/pl.svg.svg";

/***/ },
/* 492 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/pm.svg.svg";

/***/ },
/* 493 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/pm.svg.svg";

/***/ },
/* 494 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/pn.svg.svg";

/***/ },
/* 495 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/pn.svg.svg";

/***/ },
/* 496 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/pr.svg.svg";

/***/ },
/* 497 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/pr.svg.svg";

/***/ },
/* 498 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ps.svg.svg";

/***/ },
/* 499 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ps.svg.svg";

/***/ },
/* 500 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/pt.svg.svg";

/***/ },
/* 501 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/pt.svg.svg";

/***/ },
/* 502 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/pw.svg.svg";

/***/ },
/* 503 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/pw.svg.svg";

/***/ },
/* 504 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/py.svg.svg";

/***/ },
/* 505 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/py.svg.svg";

/***/ },
/* 506 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/qa.svg.svg";

/***/ },
/* 507 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/qa.svg.svg";

/***/ },
/* 508 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/re.svg.svg";

/***/ },
/* 509 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/re.svg.svg";

/***/ },
/* 510 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ro.svg.svg";

/***/ },
/* 511 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ro.svg.svg";

/***/ },
/* 512 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/rs.svg.svg";

/***/ },
/* 513 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/rs.svg.svg";

/***/ },
/* 514 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ru.svg.svg";

/***/ },
/* 515 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ru.svg.svg";

/***/ },
/* 516 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/rw.svg.svg";

/***/ },
/* 517 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/rw.svg.svg";

/***/ },
/* 518 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sa.svg.svg";

/***/ },
/* 519 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sa.svg.svg";

/***/ },
/* 520 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sb.svg.svg";

/***/ },
/* 521 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sb.svg.svg";

/***/ },
/* 522 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sc.svg.svg";

/***/ },
/* 523 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sc.svg.svg";

/***/ },
/* 524 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sd.svg.svg";

/***/ },
/* 525 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sd.svg.svg";

/***/ },
/* 526 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/se.svg.svg";

/***/ },
/* 527 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/se.svg.svg";

/***/ },
/* 528 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sg.svg.svg";

/***/ },
/* 529 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sg.svg.svg";

/***/ },
/* 530 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sh.svg.svg";

/***/ },
/* 531 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sh.svg.svg";

/***/ },
/* 532 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/si.svg.svg";

/***/ },
/* 533 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/si.svg.svg";

/***/ },
/* 534 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sj.svg.svg";

/***/ },
/* 535 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sj.svg.svg";

/***/ },
/* 536 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sk.svg.svg";

/***/ },
/* 537 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sk.svg.svg";

/***/ },
/* 538 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sl.svg.svg";

/***/ },
/* 539 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sl.svg.svg";

/***/ },
/* 540 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sm.svg.svg";

/***/ },
/* 541 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sm.svg.svg";

/***/ },
/* 542 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sn.svg.svg";

/***/ },
/* 543 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sn.svg.svg";

/***/ },
/* 544 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/so.svg.svg";

/***/ },
/* 545 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/so.svg.svg";

/***/ },
/* 546 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sr.svg.svg";

/***/ },
/* 547 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sr.svg.svg";

/***/ },
/* 548 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ss.svg.svg";

/***/ },
/* 549 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ss.svg.svg";

/***/ },
/* 550 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/st.svg.svg";

/***/ },
/* 551 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/st.svg.svg";

/***/ },
/* 552 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sv.svg.svg";

/***/ },
/* 553 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sv.svg.svg";

/***/ },
/* 554 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sx.svg.svg";

/***/ },
/* 555 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sx.svg.svg";

/***/ },
/* 556 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sy.svg.svg";

/***/ },
/* 557 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sy.svg.svg";

/***/ },
/* 558 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/sz.svg.svg";

/***/ },
/* 559 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/sz.svg.svg";

/***/ },
/* 560 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tc.svg.svg";

/***/ },
/* 561 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tc.svg.svg";

/***/ },
/* 562 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/td.svg.svg";

/***/ },
/* 563 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/td.svg.svg";

/***/ },
/* 564 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tf.svg.svg";

/***/ },
/* 565 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tf.svg.svg";

/***/ },
/* 566 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tg.svg.svg";

/***/ },
/* 567 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tg.svg.svg";

/***/ },
/* 568 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/th.svg.svg";

/***/ },
/* 569 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/th.svg.svg";

/***/ },
/* 570 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tj.svg.svg";

/***/ },
/* 571 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tj.svg.svg";

/***/ },
/* 572 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tk.svg.svg";

/***/ },
/* 573 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tk.svg.svg";

/***/ },
/* 574 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tl.svg.svg";

/***/ },
/* 575 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tl.svg.svg";

/***/ },
/* 576 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tm.svg.svg";

/***/ },
/* 577 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tm.svg.svg";

/***/ },
/* 578 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tn.svg.svg";

/***/ },
/* 579 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tn.svg.svg";

/***/ },
/* 580 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/to.svg.svg";

/***/ },
/* 581 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/to.svg.svg";

/***/ },
/* 582 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tr.svg.svg";

/***/ },
/* 583 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tr.svg.svg";

/***/ },
/* 584 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tt.svg.svg";

/***/ },
/* 585 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tt.svg.svg";

/***/ },
/* 586 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tv.svg.svg";

/***/ },
/* 587 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tv.svg.svg";

/***/ },
/* 588 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tw.svg.svg";

/***/ },
/* 589 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tw.svg.svg";

/***/ },
/* 590 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/tz.svg.svg";

/***/ },
/* 591 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/tz.svg.svg";

/***/ },
/* 592 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ua.svg.svg";

/***/ },
/* 593 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ua.svg.svg";

/***/ },
/* 594 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ug.svg.svg";

/***/ },
/* 595 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ug.svg.svg";

/***/ },
/* 596 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/um.svg.svg";

/***/ },
/* 597 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/um.svg.svg";

/***/ },
/* 598 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/us.svg.svg";

/***/ },
/* 599 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/us.svg.svg";

/***/ },
/* 600 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/uy.svg.svg";

/***/ },
/* 601 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/uy.svg.svg";

/***/ },
/* 602 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/uz.svg.svg";

/***/ },
/* 603 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/uz.svg.svg";

/***/ },
/* 604 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/va.svg.svg";

/***/ },
/* 605 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/va.svg.svg";

/***/ },
/* 606 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/vc.svg.svg";

/***/ },
/* 607 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/vc.svg.svg";

/***/ },
/* 608 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ve.svg.svg";

/***/ },
/* 609 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ve.svg.svg";

/***/ },
/* 610 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/vg.svg.svg";

/***/ },
/* 611 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/vg.svg.svg";

/***/ },
/* 612 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/vi.svg.svg";

/***/ },
/* 613 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/vi.svg.svg";

/***/ },
/* 614 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/vn.svg.svg";

/***/ },
/* 615 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/vn.svg.svg";

/***/ },
/* 616 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/vu.svg.svg";

/***/ },
/* 617 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/vu.svg.svg";

/***/ },
/* 618 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/wf.svg.svg";

/***/ },
/* 619 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/wf.svg.svg";

/***/ },
/* 620 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ws.svg.svg";

/***/ },
/* 621 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ws.svg.svg";

/***/ },
/* 622 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/ye.svg.svg";

/***/ },
/* 623 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/ye.svg.svg";

/***/ },
/* 624 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/yt.svg.svg";

/***/ },
/* 625 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/yt.svg.svg";

/***/ },
/* 626 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/za.svg.svg";

/***/ },
/* 627 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/za.svg.svg";

/***/ },
/* 628 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/zm.svg.svg";

/***/ },
/* 629 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/zm.svg.svg";

/***/ },
/* 630 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/zw.svg.svg";

/***/ },
/* 631 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/zw.svg.svg";

/***/ },
/* 632 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/eu.svg.svg";

/***/ },
/* 633 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/eu.svg.svg";

/***/ },
/* 634 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gb-eng.svg.svg";

/***/ },
/* 635 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gb-eng.svg.svg";

/***/ },
/* 636 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gb-nir.svg.svg";

/***/ },
/* 637 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gb-nir.svg.svg";

/***/ },
/* 638 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gb-sct.svg.svg";

/***/ },
/* 639 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gb-sct.svg.svg";

/***/ },
/* 640 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/gb-wls.svg.svg";

/***/ },
/* 641 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/gb-wls.svg.svg";

/***/ },
/* 642 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/4x3/un.svg.svg";

/***/ },
/* 643 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "flag-icon-css/flags/1x1/un.svg.svg";

/***/ },
/* 644 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map