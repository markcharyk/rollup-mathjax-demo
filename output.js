define('mathml', ['exports'], function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var Options = createCommonjsModule(function (module, exports) {
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
	    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
	    return ar;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var OBJECT = {}.constructor;
	function isObject(obj) {
	    return typeof obj === 'object' && obj !== null &&
	        (obj.constructor === OBJECT || obj.constructor === Expandable);
	}
	exports.APPEND = '[+]';
	exports.REMOVE = '[-]';
	var Expandable = (function () {
	    function Expandable() {
	    }
	    return Expandable;
	}());
	exports.Expandable = Expandable;
	function expandable(def) {
	    return Object.assign(Object.create(Expandable.prototype), def);
	}
	exports.expandable = expandable;
	function makeArray(x) {
	    return Array.isArray(x) ? x : [x];
	}
	exports.makeArray = makeArray;
	function keys(def) {
	    if (!def) {
	        return [];
	    }
	    return Object.keys(def).concat(Object.getOwnPropertySymbols(def));
	}
	exports.keys = keys;
	function copy(def) {
	    var e_1, _a;
	    var props = {};
	    try {
	        for (var _b = __values(keys(def)), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var key = _c.value;
	            var prop = Object.getOwnPropertyDescriptor(def, key);
	            var value = prop.value;
	            if (Array.isArray(value)) {
	                prop.value = insert([], value, false);
	            }
	            else if (isObject(value)) {
	                prop.value = copy(value);
	            }
	            if (prop.enumerable) {
	                props[key] = prop;
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    return Object.defineProperties(def.constructor === Expandable ? expandable({}) : {}, props);
	}
	exports.copy = copy;
	function insert(dst, src, warn) {
	    var e_2, _a;
	    if (warn === void 0) { warn = true; }
	    var _loop_1 = function (key) {
	        if (warn && dst[key] === undefined && dst.constructor !== Expandable) {
	            if (typeof key === 'symbol') {
	                key = key.toString();
	            }
	            throw new Error('Invalid option "' + key + '" (no default value).');
	        }
	        var sval = src[key], dval = dst[key];
	        if (isObject(sval) && dval !== null &&
	            (typeof dval === 'object' || typeof dval === 'function')) {
	            var ids = keys(sval);
	            if (Array.isArray(dval) &&
	                ((ids.length === 1 && (ids[0] === exports.APPEND || ids[0] === exports.REMOVE) && Array.isArray(sval[ids[0]])) ||
	                    (ids.length === 2 && ids.sort().join(',') === exports.APPEND + ',' + exports.REMOVE &&
	                        Array.isArray(sval[exports.APPEND]) && Array.isArray(sval[exports.REMOVE])))) {
	                if (sval[exports.REMOVE]) {
	                    dval = dst[key] = dval.filter(function (x) { return sval[exports.REMOVE].indexOf(x) < 0; });
	                }
	                if (sval[exports.APPEND]) {
	                    dst[key] = __spread(dval, sval[exports.APPEND]);
	                }
	            }
	            else {
	                insert(dval, sval, warn);
	            }
	        }
	        else if (Array.isArray(sval)) {
	            dst[key] = [];
	            insert(dst[key], sval, false);
	        }
	        else if (isObject(sval)) {
	            dst[key] = copy(sval);
	        }
	        else {
	            dst[key] = sval;
	        }
	    };
	    try {
	        for (var _b = __values(keys(src)), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var key = _c.value;
	            _loop_1(key);
	        }
	    }
	    catch (e_2_1) { e_2 = { error: e_2_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_2) throw e_2.error; }
	    }
	    return dst;
	}
	exports.insert = insert;
	function defaultOptions(options) {
	    var defs = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        defs[_i - 1] = arguments[_i];
	    }
	    defs.forEach(function (def) { return insert(options, def, false); });
	    return options;
	}
	exports.defaultOptions = defaultOptions;
	function userOptions(options) {
	    var defs = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        defs[_i - 1] = arguments[_i];
	    }
	    defs.forEach(function (def) { return insert(options, def, true); });
	    return options;
	}
	exports.userOptions = userOptions;
	function selectOptions(options) {
	    var e_3, _a;
	    var keys = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        keys[_i - 1] = arguments[_i];
	    }
	    var subset = {};
	    try {
	        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
	            var key = keys_1_1.value;
	            if (options.hasOwnProperty(key)) {
	                subset[key] = options[key];
	            }
	        }
	    }
	    catch (e_3_1) { e_3 = { error: e_3_1 }; }
	    finally {
	        try {
	            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
	        }
	        finally { if (e_3) throw e_3.error; }
	    }
	    return subset;
	}
	exports.selectOptions = selectOptions;
	function selectOptionsFromKeys(options, object) {
	    return selectOptions.apply(void 0, __spread([options], Object.keys(object)));
	}
	exports.selectOptionsFromKeys = selectOptionsFromKeys;
	function separateOptions(options) {
	    var e_4, _a, e_5, _b;
	    var objects = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        objects[_i - 1] = arguments[_i];
	    }
	    var results = [];
	    try {
	        for (var objects_1 = __values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
	            var object = objects_1_1.value;
	            var exists = {}, missing = {};
	            try {
	                for (var _c = (e_5 = void 0, __values(Object.keys(options || {}))), _d = _c.next(); !_d.done; _d = _c.next()) {
	                    var key = _d.value;
	                    (object[key] === undefined ? missing : exists)[key] = options[key];
	                }
	            }
	            catch (e_5_1) { e_5 = { error: e_5_1 }; }
	            finally {
	                try {
	                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
	                }
	                finally { if (e_5) throw e_5.error; }
	            }
	            results.push(exists);
	            options = missing;
	        }
	    }
	    catch (e_4_1) { e_4 = { error: e_4_1 }; }
	    finally {
	        try {
	            if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return)) _a.call(objects_1);
	        }
	        finally { if (e_4) throw e_4.error; }
	    }
	    results.unshift(options);
	    return results;
	}
	exports.separateOptions = separateOptions;

	});

	unwrapExports(Options);
	var Options_1 = Options.APPEND;
	var Options_2 = Options.REMOVE;
	var Options_3 = Options.Expandable;
	var Options_4 = Options.expandable;
	var Options_5 = Options.makeArray;
	var Options_6 = Options.keys;
	var Options_7 = Options.copy;
	var Options_8 = Options.insert;
	var Options_9 = Options.defaultOptions;
	var Options_10 = Options.userOptions;
	var Options_11 = Options.selectOptions;
	var Options_12 = Options.selectOptionsFromKeys;
	var Options_13 = Options.separateOptions;

	var PrioritizedList_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var PrioritizedList = (function () {
	    function PrioritizedList() {
	        this.items = [];
	        this.items = [];
	    }
	    PrioritizedList.prototype[Symbol.iterator] = function () {
	        var i = 0;
	        var items = this.items;
	        return {
	            next: function () {
	                return { value: items[i++], done: (i > items.length) };
	            }
	        };
	    };
	    PrioritizedList.prototype.add = function (item, priority) {
	        if (priority === void 0) { priority = PrioritizedList.DEFAULTPRIORITY; }
	        var i = this.items.length;
	        do {
	            i--;
	        } while (i >= 0 && priority < this.items[i].priority);
	        this.items.splice(i + 1, 0, { item: item, priority: priority });
	        return item;
	    };
	    PrioritizedList.prototype.remove = function (item) {
	        var i = this.items.length;
	        do {
	            i--;
	        } while (i >= 0 && this.items[i].item !== item);
	        if (i >= 0) {
	            this.items.splice(i, 1);
	        }
	    };
	    PrioritizedList.prototype.toArray = function () {
	        return Array.from(this);
	    };
	    PrioritizedList.DEFAULTPRIORITY = 5;
	    return PrioritizedList;
	}());
	exports.PrioritizedList = PrioritizedList;

	});

	unwrapExports(PrioritizedList_1);
	var PrioritizedList_2 = PrioritizedList_1.PrioritizedList;

	var FunctionList_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
	    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
	    return ar;
	};
	Object.defineProperty(exports, "__esModule", { value: true });

	var FunctionList = (function (_super) {
	    __extends(FunctionList, _super);
	    function FunctionList() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    FunctionList.prototype.execute = function () {
	        var e_1, _a;
	        var data = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            data[_i] = arguments[_i];
	        }
	        try {
	            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var item = _c.value;
	                var result = item.item.apply(item, __spread(data));
	                if (result === false) {
	                    return false;
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        return true;
	    };
	    FunctionList.prototype.asyncExecute = function () {
	        var data = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            data[_i] = arguments[_i];
	        }
	        var i = -1;
	        var items = this.items;
	        return new Promise(function (ok, fail) {
	            (function execute() {
	                var _a;
	                while (++i < items.length) {
	                    var result = (_a = items[i]).item.apply(_a, __spread(data));
	                    if (result instanceof Promise) {
	                        result.then(execute).catch(function (err) { return fail(err); });
	                        return;
	                    }
	                    if (result === false) {
	                        ok(false);
	                        return;
	                    }
	                }
	                ok(true);
	            })();
	        });
	    };
	    return FunctionList;
	}(PrioritizedList_1.PrioritizedList));
	exports.FunctionList = FunctionList;

	});

	unwrapExports(FunctionList_1);
	var FunctionList_2 = FunctionList_1.FunctionList;

	var InputJax = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var AbstractInputJax = (function () {
	    function AbstractInputJax(options) {
	        if (options === void 0) { options = {}; }
	        this.adaptor = null;
	        this.mmlFactory = null;
	        var CLASS = this.constructor;
	        this.options = Options.userOptions(Options.defaultOptions({}, CLASS.OPTIONS), options);
	        this.preFilters = new FunctionList_1.FunctionList();
	        this.postFilters = new FunctionList_1.FunctionList();
	    }
	    Object.defineProperty(AbstractInputJax.prototype, "name", {
	        get: function () {
	            return this.constructor.NAME;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractInputJax.prototype.setAdaptor = function (adaptor) {
	        this.adaptor = adaptor;
	    };
	    AbstractInputJax.prototype.setMmlFactory = function (mmlFactory) {
	        this.mmlFactory = mmlFactory;
	    };
	    AbstractInputJax.prototype.initialize = function () {
	    };
	    Object.defineProperty(AbstractInputJax.prototype, "processStrings", {
	        get: function () {
	            return true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractInputJax.prototype.findMath = function (node, options) {
	        return [];
	    };
	    AbstractInputJax.prototype.executeFilters = function (filters, math, document, data) {
	        var args = { math: math, document: document, data: data };
	        filters.execute(args);
	        return args.data;
	    };
	    AbstractInputJax.NAME = 'generic';
	    AbstractInputJax.OPTIONS = {};
	    return AbstractInputJax;
	}());
	exports.AbstractInputJax = AbstractInputJax;

	});

	unwrapExports(InputJax);
	var InputJax_1 = InputJax.AbstractInputJax;

	var FindMath = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var AbstractFindMath = (function () {
	    function AbstractFindMath(options) {
	        var CLASS = this.constructor;
	        this.options = Options.userOptions(Options.defaultOptions({}, CLASS.OPTIONS), options);
	    }
	    AbstractFindMath.OPTIONS = {};
	    return AbstractFindMath;
	}());
	exports.AbstractFindMath = AbstractFindMath;

	});

	unwrapExports(FindMath);
	var FindMath_1 = FindMath.AbstractFindMath;

	var FindMathML_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });

	var NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
	var FindMathML = (function (_super) {
	    __extends(FindMathML, _super);
	    function FindMathML() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    FindMathML.prototype.findMath = function (node) {
	        var set = new Set();
	        this.findMathNodes(node, set);
	        this.findMathPrefixed(node, set);
	        var html = this.adaptor.root(this.adaptor.document);
	        if (this.adaptor.kind(html) === 'html' && set.size === 0) {
	            this.findMathNS(node, set);
	        }
	        return this.processMath(set);
	    };
	    FindMathML.prototype.findMathNodes = function (node, set) {
	        var e_1, _a;
	        try {
	            for (var _b = __values(this.adaptor.tags(node, 'math')), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var math = _c.value;
	                set.add(math);
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	    };
	    FindMathML.prototype.findMathPrefixed = function (node, set) {
	        var e_2, _a, e_3, _b;
	        var html = this.adaptor.root(this.adaptor.document);
	        try {
	            for (var _c = __values(this.adaptor.allAttributes(html)), _d = _c.next(); !_d.done; _d = _c.next()) {
	                var attr = _d.value;
	                if (attr.name.substr(0, 6) === 'xmlns:' && attr.value === NAMESPACE) {
	                    var prefix = attr.name.substr(6);
	                    try {
	                        for (var _e = (e_3 = void 0, __values(this.adaptor.tags(node, prefix + ':math'))), _f = _e.next(); !_f.done; _f = _e.next()) {
	                            var math = _f.value;
	                            set.add(math);
	                        }
	                    }
	                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
	                    finally {
	                        try {
	                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
	                        }
	                        finally { if (e_3) throw e_3.error; }
	                    }
	                }
	            }
	        }
	        catch (e_2_1) { e_2 = { error: e_2_1 }; }
	        finally {
	            try {
	                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
	            }
	            finally { if (e_2) throw e_2.error; }
	        }
	    };
	    FindMathML.prototype.findMathNS = function (node, set) {
	        var e_4, _a;
	        try {
	            for (var _b = __values(this.adaptor.tags(node, 'math', NAMESPACE)), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var math = _c.value;
	                set.add(math);
	            }
	        }
	        catch (e_4_1) { e_4 = { error: e_4_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_4) throw e_4.error; }
	        }
	    };
	    FindMathML.prototype.processMath = function (set) {
	        var e_5, _a;
	        var math = [];
	        try {
	            for (var _b = __values(Array.from(set)), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var mml = _c.value;
	                var display = (this.adaptor.getAttribute(mml, 'display') === 'block' ||
	                    this.adaptor.getAttribute(mml, 'mode') === 'display');
	                var start = { node: mml, n: 0, delim: '' };
	                var end = { node: mml, n: 0, delim: '' };
	                math.push({ math: this.adaptor.outerHTML(mml), start: start, end: end, display: display });
	            }
	        }
	        catch (e_5_1) { e_5 = { error: e_5_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_5) throw e_5.error; }
	        }
	        return math;
	    };
	    FindMathML.OPTIONS = {};
	    return FindMathML;
	}(FindMath.AbstractFindMath));
	exports.FindMathML = FindMathML;

	});

	unwrapExports(FindMathML_1);
	var FindMathML_2 = FindMathML_1.FindMathML;

	var Attributes_1 = createCommonjsModule(function (module, exports) {
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.INHERIT = '_inherit_';
	var Attributes = (function () {
	    function Attributes(defaults, global) {
	        this.global = global;
	        this.defaults = Object.create(global);
	        this.inherited = Object.create(this.defaults);
	        this.attributes = Object.create(this.inherited);
	        Object.assign(this.defaults, defaults);
	    }
	    Attributes.prototype.set = function (name, value) {
	        this.attributes[name] = value;
	    };
	    Attributes.prototype.setList = function (list) {
	        Object.assign(this.attributes, list);
	    };
	    Attributes.prototype.get = function (name) {
	        var value = this.attributes[name];
	        if (value === exports.INHERIT) {
	            value = this.global[name];
	        }
	        return value;
	    };
	    Attributes.prototype.getExplicit = function (name) {
	        if (!this.attributes.hasOwnProperty(name)) {
	            return undefined;
	        }
	        return this.attributes[name];
	    };
	    Attributes.prototype.getList = function () {
	        var e_1, _a;
	        var names = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            names[_i] = arguments[_i];
	        }
	        var values = {};
	        try {
	            for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
	                var name_1 = names_1_1.value;
	                values[name_1] = this.get(name_1);
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        return values;
	    };
	    Attributes.prototype.setInherited = function (name, value) {
	        this.inherited[name] = value;
	    };
	    Attributes.prototype.getInherited = function (name) {
	        return this.inherited[name];
	    };
	    Attributes.prototype.getDefault = function (name) {
	        return this.defaults[name];
	    };
	    Attributes.prototype.isSet = function (name) {
	        return this.attributes.hasOwnProperty(name) || this.inherited.hasOwnProperty(name);
	    };
	    Attributes.prototype.hasDefault = function (name) {
	        return (name in this.defaults);
	    };
	    Attributes.prototype.getExplicitNames = function () {
	        return Object.keys(this.attributes);
	    };
	    Attributes.prototype.getInheritedNames = function () {
	        return Object.keys(this.inherited);
	    };
	    Attributes.prototype.getDefaultNames = function () {
	        return Object.keys(this.defaults);
	    };
	    Attributes.prototype.getGlobalNames = function () {
	        return Object.keys(this.global);
	    };
	    Attributes.prototype.getAllAttributes = function () {
	        return this.attributes;
	    };
	    Attributes.prototype.getAllInherited = function () {
	        return this.inherited;
	    };
	    Attributes.prototype.getAllDefaults = function () {
	        return this.defaults;
	    };
	    Attributes.prototype.getAllGlobals = function () {
	        return this.global;
	    };
	    return Attributes;
	}());
	exports.Attributes = Attributes;

	});

	unwrapExports(Attributes_1);
	var Attributes_2 = Attributes_1.INHERIT;
	var Attributes_3 = Attributes_1.Attributes;

	var Node = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var AbstractNode = (function () {
	    function AbstractNode(factory, properties, children) {
	        var e_1, _a;
	        if (properties === void 0) { properties = {}; }
	        if (children === void 0) { children = []; }
	        this.parent = null;
	        this.properties = {};
	        this._factory = null;
	        this.childNodes = [];
	        this._factory = factory;
	        try {
	            for (var _b = __values(Object.keys(properties)), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var name_1 = _c.value;
	                this.setProperty(name_1, properties[name_1]);
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        if (children.length) {
	            this.setChildren(children);
	        }
	    }
	    Object.defineProperty(AbstractNode.prototype, "factory", {
	        get: function () {
	            return this._factory;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractNode.prototype, "kind", {
	        get: function () {
	            return 'unknown';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractNode.prototype.setProperty = function (name, value) {
	        this.properties[name] = value;
	    };
	    AbstractNode.prototype.getProperty = function (name) {
	        return this.properties[name];
	    };
	    AbstractNode.prototype.getPropertyNames = function () {
	        return Object.keys(this.properties);
	    };
	    AbstractNode.prototype.getAllProperties = function () {
	        return this.properties;
	    };
	    AbstractNode.prototype.removeProperty = function () {
	        var e_2, _a;
	        var names = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            names[_i] = arguments[_i];
	        }
	        try {
	            for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
	                var name_2 = names_1_1.value;
	                delete this.properties[name_2];
	            }
	        }
	        catch (e_2_1) { e_2 = { error: e_2_1 }; }
	        finally {
	            try {
	                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
	            }
	            finally { if (e_2) throw e_2.error; }
	        }
	    };
	    AbstractNode.prototype.isKind = function (kind) {
	        return this.factory.nodeIsKind(this, kind);
	    };
	    AbstractNode.prototype.setChildren = function (children) {
	        var e_3, _a;
	        this.childNodes = [];
	        try {
	            for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
	                var child = children_1_1.value;
	                this.appendChild(child);
	            }
	        }
	        catch (e_3_1) { e_3 = { error: e_3_1 }; }
	        finally {
	            try {
	                if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
	            }
	            finally { if (e_3) throw e_3.error; }
	        }
	    };
	    AbstractNode.prototype.appendChild = function (child) {
	        this.childNodes.push(child);
	        child.parent = this;
	        return child;
	    };
	    AbstractNode.prototype.replaceChild = function (newChild, oldChild) {
	        var i = this.childIndex(oldChild);
	        if (i !== null) {
	            this.childNodes[i] = newChild;
	            newChild.parent = this;
	        }
	        return newChild;
	    };
	    AbstractNode.prototype.childIndex = function (node) {
	        var i = this.childNodes.indexOf(node);
	        return (i === -1 ? null : i);
	    };
	    AbstractNode.prototype.findNodes = function (kind) {
	        var nodes = [];
	        this.walkTree(function (node) {
	            if (node.isKind(kind)) {
	                nodes.push(node);
	            }
	        });
	        return nodes;
	    };
	    AbstractNode.prototype.walkTree = function (func, data) {
	        var e_4, _a;
	        func(this, data);
	        try {
	            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var child = _c.value;
	                if (child) {
	                    child.walkTree(func, data);
	                }
	            }
	        }
	        catch (e_4_1) { e_4 = { error: e_4_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_4) throw e_4.error; }
	        }
	        return data;
	    };
	    AbstractNode.prototype.toString = function () {
	        return this.kind + '(' + this.childNodes.join(',') + ')';
	    };
	    return AbstractNode;
	}());
	exports.AbstractNode = AbstractNode;
	var AbstractEmptyNode = (function (_super) {
	    __extends(AbstractEmptyNode, _super);
	    function AbstractEmptyNode() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    AbstractEmptyNode.prototype.setChildren = function (children) {
	    };
	    AbstractEmptyNode.prototype.appendChild = function (child) {
	        return child;
	    };
	    AbstractEmptyNode.prototype.replaceChild = function (newChild, oldChild) {
	        return oldChild;
	    };
	    AbstractEmptyNode.prototype.childIndex = function (node) {
	        return null;
	    };
	    AbstractEmptyNode.prototype.walkTree = function (func, data) {
	        func(this, data);
	        return data;
	    };
	    AbstractEmptyNode.prototype.toString = function () {
	        return this.kind;
	    };
	    return AbstractEmptyNode;
	}(AbstractNode));
	exports.AbstractEmptyNode = AbstractEmptyNode;

	});

	unwrapExports(Node);
	var Node_1 = Node.AbstractNode;
	var Node_2 = Node.AbstractEmptyNode;

	var MmlNode = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	Object.defineProperty(exports, "__esModule", { value: true });


	exports.TEXCLASS = {
	    ORD: 0,
	    OP: 1,
	    BIN: 2,
	    REL: 3,
	    OPEN: 4,
	    CLOSE: 5,
	    PUNCT: 6,
	    INNER: 7,
	    VCENTER: 8,
	    NONE: -1
	};
	exports.TEXCLASSNAMES = ['ORD', 'OP', 'BIN', 'REL', 'OPEN', 'CLOSE', 'PUNCT', 'INNER', 'VCENTER'];
	var TEXSPACELENGTH = ['', 'thinmathspace', 'mediummathspace', 'thickmathspace'];
	var TEXSPACE = [
	    [0, -1, 2, 3, 0, 0, 0, 1],
	    [-1, -1, 0, 3, 0, 0, 0, 1],
	    [2, 2, 0, 0, 2, 0, 0, 2],
	    [3, 3, 0, 0, 3, 0, 0, 3],
	    [0, 0, 0, 0, 0, 0, 0, 0],
	    [0, -1, 2, 3, 0, 0, 0, 1],
	    [1, 1, 0, 1, 1, 1, 1, 1],
	    [1, -1, 2, 3, 1, 0, 1, 1]
	];
	exports.indentAttributes = [
	    'indentalign', 'indentalignfirst',
	    'indentshift', 'indentshiftfirst'
	];
	var AbstractMmlNode = (function (_super) {
	    __extends(AbstractMmlNode, _super);
	    function AbstractMmlNode(factory, attributes, children) {
	        if (attributes === void 0) { attributes = {}; }
	        if (children === void 0) { children = []; }
	        var _this = _super.call(this, factory) || this;
	        _this.texClass = null;
	        _this.prevClass = null;
	        _this.prevLevel = null;
	        if (_this.arity < 0) {
	            _this.childNodes = [factory.create('inferredMrow')];
	            _this.childNodes[0].parent = _this;
	        }
	        _this.setChildren(children);
	        _this.attributes = new Attributes_1.Attributes(factory.getNodeClass(_this.kind).defaults, factory.getNodeClass('math').defaults);
	        _this.attributes.setList(attributes);
	        return _this;
	    }
	    Object.defineProperty(AbstractMmlNode.prototype, "isToken", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlNode.prototype, "isEmbellished", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlNode.prototype, "isSpacelike", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlNode.prototype, "linebreakContainer", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlNode.prototype, "hasNewLine", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlNode.prototype, "arity", {
	        get: function () {
	            return Infinity;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlNode.prototype, "isInferred", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlNode.prototype, "Parent", {
	        get: function () {
	            var parent = this.parent;
	            while (parent && parent.notParent) {
	                parent = parent.Parent;
	            }
	            return parent;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlNode.prototype, "notParent", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractMmlNode.prototype.setChildren = function (children) {
	        if (this.arity < 0) {
	            return this.childNodes[0].setChildren(children);
	        }
	        return _super.prototype.setChildren.call(this, children);
	    };
	    AbstractMmlNode.prototype.appendChild = function (child) {
	        if (this.arity < 0) {
	            this.childNodes[0].appendChild(child);
	            return child;
	        }
	        return _super.prototype.appendChild.call(this, child);
	    };
	    AbstractMmlNode.prototype.replaceChild = function (newChild, oldChild) {
	        if (this.arity < 0) {
	            this.childNodes[0].replaceChild(newChild, oldChild);
	            return newChild;
	        }
	        return _super.prototype.replaceChild.call(this, newChild, oldChild);
	    };
	    AbstractMmlNode.prototype.core = function () {
	        return this;
	    };
	    AbstractMmlNode.prototype.coreMO = function () {
	        return this;
	    };
	    AbstractMmlNode.prototype.coreIndex = function () {
	        return 0;
	    };
	    AbstractMmlNode.prototype.childPosition = function () {
	        var e_1, _a;
	        var child = this;
	        var parent = child.parent;
	        while (parent && parent.notParent) {
	            child = parent;
	            parent = parent.parent;
	        }
	        if (parent) {
	            var i = 0;
	            try {
	                for (var _b = __values(parent.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
	                    var node = _c.value;
	                    if (node === child) {
	                        return i;
	                    }
	                    i++;
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	        }
	        return null;
	    };
	    AbstractMmlNode.prototype.setTeXclass = function (prev) {
	        this.getPrevClass(prev);
	        return (this.texClass != null ? this : prev);
	    };
	    AbstractMmlNode.prototype.updateTeXclass = function (core) {
	        if (core) {
	            this.prevClass = core.prevClass;
	            this.prevLevel = core.prevLevel;
	            core.prevClass = core.prevLevel = null;
	            this.texClass = core.texClass;
	        }
	    };
	    AbstractMmlNode.prototype.getPrevClass = function (prev) {
	        if (prev) {
	            this.prevClass = prev.texClass;
	            this.prevLevel = prev.attributes.get('scriptlevel');
	        }
	    };
	    AbstractMmlNode.prototype.texSpacing = function () {
	        var prevClass = (this.prevClass != null ? this.prevClass : exports.TEXCLASS.NONE);
	        var texClass = this.texClass || exports.TEXCLASS.ORD;
	        if (prevClass === exports.TEXCLASS.NONE || texClass === exports.TEXCLASS.NONE) {
	            return '';
	        }
	        if (prevClass === exports.TEXCLASS.VCENTER) {
	            prevClass = exports.TEXCLASS.ORD;
	        }
	        if (texClass === exports.TEXCLASS.VCENTER) {
	            texClass = exports.TEXCLASS.ORD;
	        }
	        var space = TEXSPACE[prevClass][texClass];
	        if ((this.prevLevel > 0 || this.attributes.get('scriptlevel') > 0) && space >= 0) {
	            return '';
	        }
	        return TEXSPACELENGTH[Math.abs(space)];
	    };
	    AbstractMmlNode.prototype.hasSpacingAttributes = function () {
	        return this.isEmbellished && this.coreMO().hasSpacingAttributes();
	    };
	    AbstractMmlNode.prototype.setInheritedAttributes = function (attributes, display, level, prime) {
	        var e_2, _a;
	        if (attributes === void 0) { attributes = {}; }
	        if (display === void 0) { display = false; }
	        if (level === void 0) { level = 0; }
	        if (prime === void 0) { prime = false; }
	        var defaults = this.attributes.getAllDefaults();
	        try {
	            for (var _b = __values(Object.keys(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var key = _c.value;
	                if (defaults.hasOwnProperty(key)) {
	                    var _d = __read(attributes[key], 2), node = _d[0], value = _d[1];
	                    var noinherit = (AbstractMmlNode.noInherit[node] || {})[this.kind] || {};
	                    if (!noinherit[key]) {
	                        this.attributes.setInherited(key, value);
	                    }
	                }
	            }
	        }
	        catch (e_2_1) { e_2 = { error: e_2_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_2) throw e_2.error; }
	        }
	        var displaystyle = this.attributes.getExplicit('displaystyle');
	        if (displaystyle === undefined) {
	            this.attributes.setInherited('displaystyle', display);
	        }
	        var scriptlevel = this.attributes.getExplicit('scriptlevel');
	        if (scriptlevel === undefined) {
	            this.attributes.setInherited('scriptlevel', level);
	        }
	        if (prime) {
	            this.setProperty('texprimestyle', prime);
	        }
	        var arity = this.arity;
	        if (arity >= 0 && arity !== Infinity && ((arity === 1 && this.childNodes.length === 0) ||
	            (arity !== 1 && this.childNodes.length !== arity))) {
	            if (arity < this.childNodes.length) {
	                this.childNodes = this.childNodes.slice(0, arity);
	            }
	            else {
	                while (this.childNodes.length < arity) {
	                    this.appendChild(this.factory.create('mrow'));
	                }
	            }
	        }
	        this.setChildInheritedAttributes(attributes, display, level, prime);
	    };
	    AbstractMmlNode.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
	        var e_3, _a;
	        try {
	            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var child = _c.value;
	                child.setInheritedAttributes(attributes, display, level, prime);
	            }
	        }
	        catch (e_3_1) { e_3 = { error: e_3_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_3) throw e_3.error; }
	        }
	    };
	    AbstractMmlNode.prototype.addInheritedAttributes = function (current, attributes) {
	        var e_4, _a;
	        var updated = __assign({}, current);
	        try {
	            for (var _b = __values(Object.keys(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var name_1 = _c.value;
	                if (name_1 !== 'displaystyle' && name_1 !== 'scriptlevel' && name_1 !== 'style') {
	                    updated[name_1] = [this.kind, attributes[name_1]];
	                }
	            }
	        }
	        catch (e_4_1) { e_4 = { error: e_4_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_4) throw e_4.error; }
	        }
	        return updated;
	    };
	    AbstractMmlNode.prototype.inheritAttributesFrom = function (node) {
	        var attributes = node.attributes;
	        var display = attributes.get('displaystyle');
	        var scriptlevel = attributes.get('scriptlevel');
	        var defaults = (!attributes.isSet('mathsize') ? {} : {
	            mathsize: ['math', attributes.get('mathsize')]
	        });
	        var prime = node.getProperty('texprimestyle') || false;
	        this.setInheritedAttributes(defaults, display, scriptlevel, prime);
	    };
	    AbstractMmlNode.prototype.verifyTree = function (options) {
	        if (options === void 0) { options = null; }
	        if (options === null) {
	            return;
	        }
	        this.verifyAttributes(options);
	        var arity = this.arity;
	        if (options['checkArity']) {
	            if (arity >= 0 && arity !== Infinity &&
	                ((arity === 1 && this.childNodes.length === 0) ||
	                    (arity !== 1 && this.childNodes.length !== arity))) {
	                this.mError('Wrong number of children for "' + this.kind + '" node', options, true);
	            }
	        }
	        this.verifyChildren(options);
	    };
	    AbstractMmlNode.prototype.verifyAttributes = function (options) {
	        var e_5, _a;
	        if (options['checkAttributes']) {
	            var attributes = this.attributes;
	            var bad = [];
	            try {
	                for (var _b = __values(attributes.getExplicitNames()), _c = _b.next(); !_c.done; _c = _b.next()) {
	                    var name_2 = _c.value;
	                    if (name_2.substr(0, 5) !== 'data-' && attributes.getDefault(name_2) === undefined &&
	                        !name_2.match(/^(?:class|style|id|(?:xlink:)?href)$/)) {
	                        bad.push(name_2);
	                    }
	                }
	            }
	            catch (e_5_1) { e_5 = { error: e_5_1 }; }
	            finally {
	                try {
	                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                }
	                finally { if (e_5) throw e_5.error; }
	            }
	            if (bad.length) {
	                this.mError('Unknown attributes for ' + this.kind + ' node: ' + bad.join(', '), options);
	            }
	        }
	    };
	    AbstractMmlNode.prototype.verifyChildren = function (options) {
	        var e_6, _a;
	        try {
	            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var child = _c.value;
	                child.verifyTree(options);
	            }
	        }
	        catch (e_6_1) { e_6 = { error: e_6_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_6) throw e_6.error; }
	        }
	    };
	    AbstractMmlNode.prototype.mError = function (message, options, short) {
	        if (short === void 0) { short = false; }
	        if (this.parent && this.parent.isKind('merror')) {
	            return;
	        }
	        var merror = this.factory.create('merror');
	        if (options['fullErrors'] || short) {
	            var mtext = this.factory.create('mtext');
	            var text = this.factory.create('text');
	            text.setText(options['fullErrors'] ? message : this.kind);
	            mtext.appendChild(text);
	            merror.appendChild(mtext);
	            this.parent.replaceChild(merror, this);
	        }
	        else {
	            this.parent.replaceChild(merror, this);
	            merror.appendChild(this);
	        }
	        return merror;
	    };
	    AbstractMmlNode.defaults = {
	        mathbackground: Attributes_1.INHERIT,
	        mathcolor: Attributes_1.INHERIT,
	        mathsize: Attributes_1.INHERIT,
	        dir: Attributes_1.INHERIT
	    };
	    AbstractMmlNode.noInherit = {
	        mstyle: {
	            mpadded: { width: true, height: true, depth: true, lspace: true, voffset: true },
	            mtable: { width: true, height: true, depth: true, align: true }
	        },
	        maligngroup: {
	            mrow: { groupalign: true },
	            mtable: { groupalign: true }
	        }
	    };
	    AbstractMmlNode.verifyDefaults = {
	        checkArity: true,
	        checkAttributes: false,
	        fullErrors: false,
	        fixMmultiscripts: true,
	        fixMtables: true
	    };
	    return AbstractMmlNode;
	}(Node.AbstractNode));
	exports.AbstractMmlNode = AbstractMmlNode;
	var AbstractMmlTokenNode = (function (_super) {
	    __extends(AbstractMmlTokenNode, _super);
	    function AbstractMmlTokenNode() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Object.defineProperty(AbstractMmlTokenNode.prototype, "isToken", {
	        get: function () {
	            return true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractMmlTokenNode.prototype.getText = function () {
	        var e_7, _a;
	        var text = '';
	        try {
	            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var child = _c.value;
	                if (child instanceof TextNode) {
	                    text += child.getText();
	                }
	            }
	        }
	        catch (e_7_1) { e_7 = { error: e_7_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_7) throw e_7.error; }
	        }
	        return text;
	    };
	    AbstractMmlTokenNode.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
	        var e_8, _a;
	        try {
	            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var child = _c.value;
	                if (child instanceof AbstractMmlNode) {
	                    child.setInheritedAttributes(attributes, display, level, prime);
	                }
	            }
	        }
	        catch (e_8_1) { e_8 = { error: e_8_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_8) throw e_8.error; }
	        }
	    };
	    AbstractMmlTokenNode.prototype.walkTree = function (func, data) {
	        var e_9, _a;
	        func(this, data);
	        try {
	            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var child = _c.value;
	                if (child instanceof AbstractMmlNode) {
	                    child.walkTree(func, data);
	                }
	            }
	        }
	        catch (e_9_1) { e_9 = { error: e_9_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_9) throw e_9.error; }
	        }
	        return data;
	    };
	    AbstractMmlTokenNode.defaults = __assign({}, AbstractMmlNode.defaults, { mathvariant: 'normal', mathsize: Attributes_1.INHERIT });
	    return AbstractMmlTokenNode;
	}(AbstractMmlNode));
	exports.AbstractMmlTokenNode = AbstractMmlTokenNode;
	var AbstractMmlLayoutNode = (function (_super) {
	    __extends(AbstractMmlLayoutNode, _super);
	    function AbstractMmlLayoutNode() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Object.defineProperty(AbstractMmlLayoutNode.prototype, "isSpacelike", {
	        get: function () {
	            return this.childNodes[0].isSpacelike;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlLayoutNode.prototype, "isEmbellished", {
	        get: function () {
	            return this.childNodes[0].isEmbellished;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlLayoutNode.prototype, "arity", {
	        get: function () {
	            return -1;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractMmlLayoutNode.prototype.core = function () {
	        return this.childNodes[0];
	    };
	    AbstractMmlLayoutNode.prototype.coreMO = function () {
	        return this.childNodes[0].coreMO();
	    };
	    AbstractMmlLayoutNode.prototype.setTeXclass = function (prev) {
	        prev = this.childNodes[0].setTeXclass(prev);
	        this.updateTeXclass(this.childNodes[0]);
	        return prev;
	    };
	    AbstractMmlLayoutNode.defaults = AbstractMmlNode.defaults;
	    return AbstractMmlLayoutNode;
	}(AbstractMmlNode));
	exports.AbstractMmlLayoutNode = AbstractMmlLayoutNode;
	var AbstractMmlBaseNode = (function (_super) {
	    __extends(AbstractMmlBaseNode, _super);
	    function AbstractMmlBaseNode() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Object.defineProperty(AbstractMmlBaseNode.prototype, "isEmbellished", {
	        get: function () {
	            return this.childNodes[0].isEmbellished;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractMmlBaseNode.prototype.core = function () {
	        return this.childNodes[0];
	    };
	    AbstractMmlBaseNode.prototype.coreMO = function () {
	        return this.childNodes[0].coreMO();
	    };
	    AbstractMmlBaseNode.prototype.setTeXclass = function (prev) {
	        var e_10, _a;
	        this.getPrevClass(prev);
	        this.texClass = exports.TEXCLASS.ORD;
	        var base = this.childNodes[0];
	        if (base) {
	            if (this.isEmbellished || base.isKind('mi')) {
	                prev = base.setTeXclass(prev);
	                this.updateTeXclass(this.core());
	            }
	            else {
	                base.setTeXclass(null);
	                prev = this;
	            }
	        }
	        else {
	            prev = this;
	        }
	        try {
	            for (var _b = __values(this.childNodes.slice(1)), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var child = _c.value;
	                if (child) {
	                    child.setTeXclass(null);
	                }
	            }
	        }
	        catch (e_10_1) { e_10 = { error: e_10_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_10) throw e_10.error; }
	        }
	        return prev;
	    };
	    AbstractMmlBaseNode.defaults = AbstractMmlNode.defaults;
	    return AbstractMmlBaseNode;
	}(AbstractMmlNode));
	exports.AbstractMmlBaseNode = AbstractMmlBaseNode;
	var AbstractMmlEmptyNode = (function (_super) {
	    __extends(AbstractMmlEmptyNode, _super);
	    function AbstractMmlEmptyNode() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isToken", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isEmbellished", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isSpacelike", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "linebreakContainer", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "hasNewLine", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "arity", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isInferred", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "notParent", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "Parent", {
	        get: function () {
	            return this.parent;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "texClass", {
	        get: function () {
	            return exports.TEXCLASS.NONE;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "prevClass", {
	        get: function () {
	            return exports.TEXCLASS.NONE;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "prevLevel", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractMmlEmptyNode.prototype.hasSpacingAttributes = function () {
	        return false;
	    };
	    Object.defineProperty(AbstractMmlEmptyNode.prototype, "attributes", {
	        get: function () {
	            return null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractMmlEmptyNode.prototype.core = function () {
	        return this;
	    };
	    AbstractMmlEmptyNode.prototype.coreMO = function () {
	        return this;
	    };
	    AbstractMmlEmptyNode.prototype.coreIndex = function () {
	        return 0;
	    };
	    AbstractMmlEmptyNode.prototype.childPosition = function () {
	        return 0;
	    };
	    AbstractMmlEmptyNode.prototype.setTeXclass = function (prev) {
	        return prev;
	    };
	    AbstractMmlEmptyNode.prototype.texSpacing = function () {
	        return '';
	    };
	    AbstractMmlEmptyNode.prototype.setInheritedAttributes = function (attributes, display, level, prime) { };
	    AbstractMmlEmptyNode.prototype.inheritAttributesFrom = function (node) { };
	    AbstractMmlEmptyNode.prototype.verifyTree = function (options) { };
	    AbstractMmlEmptyNode.prototype.mError = function (message, options, short) {
	    };
	    return AbstractMmlEmptyNode;
	}(Node.AbstractEmptyNode));
	exports.AbstractMmlEmptyNode = AbstractMmlEmptyNode;
	var TextNode = (function (_super) {
	    __extends(TextNode, _super);
	    function TextNode() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.text = '';
	        return _this;
	    }
	    Object.defineProperty(TextNode.prototype, "kind", {
	        get: function () {
	            return 'text';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TextNode.prototype.getText = function () {
	        return this.text;
	    };
	    TextNode.prototype.setText = function (text) {
	        this.text = text;
	        return this;
	    };
	    TextNode.prototype.toString = function () {
	        return this.text;
	    };
	    return TextNode;
	}(AbstractMmlEmptyNode));
	exports.TextNode = TextNode;
	var XMLNode = (function (_super) {
	    __extends(XMLNode, _super);
	    function XMLNode() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.xml = null;
	        _this.adaptor = null;
	        return _this;
	    }
	    Object.defineProperty(XMLNode.prototype, "kind", {
	        get: function () {
	            return 'XML';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    XMLNode.prototype.getXML = function () {
	        return this.xml;
	    };
	    XMLNode.prototype.setXML = function (xml, adaptor) {
	        if (adaptor === void 0) { adaptor = null; }
	        this.xml = xml;
	        this.adaptor = adaptor;
	        return this;
	    };
	    XMLNode.prototype.getSerializedXML = function () {
	        return this.adaptor.outerHTML(this.xml);
	    };
	    XMLNode.prototype.toString = function () {
	        return 'XML data';
	    };
	    return XMLNode;
	}(AbstractMmlEmptyNode));
	exports.XMLNode = XMLNode;

	});

	unwrapExports(MmlNode);
	var MmlNode_1 = MmlNode.TEXCLASS;
	var MmlNode_2 = MmlNode.TEXCLASSNAMES;
	var MmlNode_3 = MmlNode.indentAttributes;
	var MmlNode_4 = MmlNode.AbstractMmlNode;
	var MmlNode_5 = MmlNode.AbstractMmlTokenNode;
	var MmlNode_6 = MmlNode.AbstractMmlLayoutNode;
	var MmlNode_7 = MmlNode.AbstractMmlBaseNode;
	var MmlNode_8 = MmlNode.AbstractMmlEmptyNode;
	var MmlNode_9 = MmlNode.TextNode;
	var MmlNode_10 = MmlNode.XMLNode;

	var Retries = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function handleRetriesFor(code) {
	    return new Promise(function run(ok, fail) {
	        try {
	            ok(code());
	        }
	        catch (err) {
	            if (err.retry && err.retry instanceof Promise) {
	                err.retry.then(function () { return run(ok, fail); })
	                    .catch(function (perr) { return fail(perr); });
	            }
	            else if (err.restart && err.restart.isCallback) {
	                MathJax.Callback.After(function () { return run(ok, fail); }, err.restart);
	            }
	            else {
	                fail(err);
	            }
	        }
	    });
	}
	exports.handleRetriesFor = handleRetriesFor;
	function retryAfter(promise) {
	    var err = new Error('MathJax retry');
	    err.retry = promise;
	    throw err;
	}
	exports.retryAfter = retryAfter;

	});

	unwrapExports(Retries);
	var Retries_1 = Retries.handleRetriesFor;
	var Retries_2 = Retries.retryAfter;

	var HandlerList_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });

	var HandlerList = (function (_super) {
	    __extends(HandlerList, _super);
	    function HandlerList() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    HandlerList.prototype.register = function (handler) {
	        return this.add(handler, handler.priority);
	    };
	    HandlerList.prototype.unregister = function (handler) {
	        this.remove(handler);
	    };
	    HandlerList.prototype.handlesDocument = function (document) {
	        var e_1, _a;
	        try {
	            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var item = _c.value;
	                var handler = item.item;
	                if (handler.handlesDocument(document)) {
	                    return handler;
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        throw new Error("Can't find handler for document");
	    };
	    HandlerList.prototype.document = function (document, options) {
	        if (options === void 0) { options = null; }
	        return this.handlesDocument(document).create(document, options);
	    };
	    return HandlerList;
	}(PrioritizedList_1.PrioritizedList));
	exports.HandlerList = HandlerList;

	});

	unwrapExports(HandlerList_1);
	var HandlerList_2 = HandlerList_1.HandlerList;

	var mathjax = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	exports.mathjax = {
	    version: '3.0.1',
	    handlers: new HandlerList_1.HandlerList(),
	    document: function (document, options) {
	        return exports.mathjax.handlers.document(document, options);
	    },
	    handleRetriesFor: Retries.handleRetriesFor,
	    retryAfter: Retries.retryAfter,
	    asyncLoad: null,
	};

	});

	unwrapExports(mathjax);
	var mathjax_1 = mathjax.mathjax;

	var AsyncLoad = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function asyncLoad(name) {
	    if (!mathjax.mathjax.asyncLoad) {
	        return Promise.reject("Can't load '" + name + "': No asyncLoad method specified");
	    }
	    return new Promise(function (ok, fail) {
	        var result = mathjax.mathjax.asyncLoad(name);
	        if (result instanceof Promise) {
	            result.then(function (value) { return ok(value); }).catch(function (err) { return fail(err); });
	        }
	        else {
	            ok(result);
	        }
	    });
	}
	exports.asyncLoad = asyncLoad;

	});

	unwrapExports(AsyncLoad);
	var AsyncLoad_1 = AsyncLoad.asyncLoad;

	var Entities = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	exports.options = {
	    loadMissingEntities: true
	};
	exports.entities = {
	    ApplyFunction: '\u2061',
	    Backslash: '\u2216',
	    Because: '\u2235',
	    Breve: '\u02D8',
	    Cap: '\u22D2',
	    CenterDot: '\u00B7',
	    CircleDot: '\u2299',
	    CircleMinus: '\u2296',
	    CirclePlus: '\u2295',
	    CircleTimes: '\u2297',
	    Congruent: '\u2261',
	    ContourIntegral: '\u222E',
	    Coproduct: '\u2210',
	    Cross: '\u2A2F',
	    Cup: '\u22D3',
	    CupCap: '\u224D',
	    Dagger: '\u2021',
	    Del: '\u2207',
	    Delta: '\u0394',
	    Diamond: '\u22C4',
	    DifferentialD: '\u2146',
	    DotEqual: '\u2250',
	    DoubleDot: '\u00A8',
	    DoubleRightTee: '\u22A8',
	    DoubleVerticalBar: '\u2225',
	    DownArrow: '\u2193',
	    DownLeftVector: '\u21BD',
	    DownRightVector: '\u21C1',
	    DownTee: '\u22A4',
	    Downarrow: '\u21D3',
	    Element: '\u2208',
	    EqualTilde: '\u2242',
	    Equilibrium: '\u21CC',
	    Exists: '\u2203',
	    ExponentialE: '\u2147',
	    FilledVerySmallSquare: '\u25AA',
	    ForAll: '\u2200',
	    Gamma: '\u0393',
	    Gg: '\u22D9',
	    GreaterEqual: '\u2265',
	    GreaterEqualLess: '\u22DB',
	    GreaterFullEqual: '\u2267',
	    GreaterLess: '\u2277',
	    GreaterSlantEqual: '\u2A7E',
	    GreaterTilde: '\u2273',
	    Hacek: '\u02C7',
	    Hat: '\u005E',
	    HumpDownHump: '\u224E',
	    HumpEqual: '\u224F',
	    Im: '\u2111',
	    ImaginaryI: '\u2148',
	    Integral: '\u222B',
	    Intersection: '\u22C2',
	    InvisibleComma: '\u2063',
	    InvisibleTimes: '\u2062',
	    Lambda: '\u039B',
	    Larr: '\u219E',
	    LeftAngleBracket: '\u27E8',
	    LeftArrow: '\u2190',
	    LeftArrowRightArrow: '\u21C6',
	    LeftCeiling: '\u2308',
	    LeftDownVector: '\u21C3',
	    LeftFloor: '\u230A',
	    LeftRightArrow: '\u2194',
	    LeftTee: '\u22A3',
	    LeftTriangle: '\u22B2',
	    LeftTriangleEqual: '\u22B4',
	    LeftUpVector: '\u21BF',
	    LeftVector: '\u21BC',
	    Leftarrow: '\u21D0',
	    Leftrightarrow: '\u21D4',
	    LessEqualGreater: '\u22DA',
	    LessFullEqual: '\u2266',
	    LessGreater: '\u2276',
	    LessSlantEqual: '\u2A7D',
	    LessTilde: '\u2272',
	    Ll: '\u22D8',
	    Lleftarrow: '\u21DA',
	    LongLeftArrow: '\u27F5',
	    LongLeftRightArrow: '\u27F7',
	    LongRightArrow: '\u27F6',
	    Longleftarrow: '\u27F8',
	    Longleftrightarrow: '\u27FA',
	    Longrightarrow: '\u27F9',
	    Lsh: '\u21B0',
	    MinusPlus: '\u2213',
	    NestedGreaterGreater: '\u226B',
	    NestedLessLess: '\u226A',
	    NotDoubleVerticalBar: '\u2226',
	    NotElement: '\u2209',
	    NotEqual: '\u2260',
	    NotExists: '\u2204',
	    NotGreater: '\u226F',
	    NotGreaterEqual: '\u2271',
	    NotLeftTriangle: '\u22EA',
	    NotLeftTriangleEqual: '\u22EC',
	    NotLess: '\u226E',
	    NotLessEqual: '\u2270',
	    NotPrecedes: '\u2280',
	    NotPrecedesSlantEqual: '\u22E0',
	    NotRightTriangle: '\u22EB',
	    NotRightTriangleEqual: '\u22ED',
	    NotSubsetEqual: '\u2288',
	    NotSucceeds: '\u2281',
	    NotSucceedsSlantEqual: '\u22E1',
	    NotSupersetEqual: '\u2289',
	    NotTilde: '\u2241',
	    NotVerticalBar: '\u2224',
	    Omega: '\u03A9',
	    OverBar: '\u203E',
	    OverBrace: '\u23DE',
	    PartialD: '\u2202',
	    Phi: '\u03A6',
	    Pi: '\u03A0',
	    PlusMinus: '\u00B1',
	    Precedes: '\u227A',
	    PrecedesEqual: '\u2AAF',
	    PrecedesSlantEqual: '\u227C',
	    PrecedesTilde: '\u227E',
	    Product: '\u220F',
	    Proportional: '\u221D',
	    Psi: '\u03A8',
	    Rarr: '\u21A0',
	    Re: '\u211C',
	    ReverseEquilibrium: '\u21CB',
	    RightAngleBracket: '\u27E9',
	    RightArrow: '\u2192',
	    RightArrowLeftArrow: '\u21C4',
	    RightCeiling: '\u2309',
	    RightDownVector: '\u21C2',
	    RightFloor: '\u230B',
	    RightTee: '\u22A2',
	    RightTeeArrow: '\u21A6',
	    RightTriangle: '\u22B3',
	    RightTriangleEqual: '\u22B5',
	    RightUpVector: '\u21BE',
	    RightVector: '\u21C0',
	    Rightarrow: '\u21D2',
	    Rrightarrow: '\u21DB',
	    Rsh: '\u21B1',
	    Sigma: '\u03A3',
	    SmallCircle: '\u2218',
	    Sqrt: '\u221A',
	    Square: '\u25A1',
	    SquareIntersection: '\u2293',
	    SquareSubset: '\u228F',
	    SquareSubsetEqual: '\u2291',
	    SquareSuperset: '\u2290',
	    SquareSupersetEqual: '\u2292',
	    SquareUnion: '\u2294',
	    Star: '\u22C6',
	    Subset: '\u22D0',
	    SubsetEqual: '\u2286',
	    Succeeds: '\u227B',
	    SucceedsEqual: '\u2AB0',
	    SucceedsSlantEqual: '\u227D',
	    SucceedsTilde: '\u227F',
	    SuchThat: '\u220B',
	    Sum: '\u2211',
	    Superset: '\u2283',
	    SupersetEqual: '\u2287',
	    Supset: '\u22D1',
	    Therefore: '\u2234',
	    Theta: '\u0398',
	    Tilde: '\u223C',
	    TildeEqual: '\u2243',
	    TildeFullEqual: '\u2245',
	    TildeTilde: '\u2248',
	    UnderBar: '\u005F',
	    UnderBrace: '\u23DF',
	    Union: '\u22C3',
	    UnionPlus: '\u228E',
	    UpArrow: '\u2191',
	    UpDownArrow: '\u2195',
	    UpTee: '\u22A5',
	    Uparrow: '\u21D1',
	    Updownarrow: '\u21D5',
	    Upsilon: '\u03A5',
	    Vdash: '\u22A9',
	    Vee: '\u22C1',
	    VerticalBar: '\u2223',
	    VerticalTilde: '\u2240',
	    Vvdash: '\u22AA',
	    Wedge: '\u22C0',
	    Xi: '\u039E',
	    amp: '\u0026',
	    acute: '\u00B4',
	    aleph: '\u2135',
	    alpha: '\u03B1',
	    amalg: '\u2A3F',
	    and: '\u2227',
	    ang: '\u2220',
	    angmsd: '\u2221',
	    angsph: '\u2222',
	    ape: '\u224A',
	    backprime: '\u2035',
	    backsim: '\u223D',
	    backsimeq: '\u22CD',
	    beta: '\u03B2',
	    beth: '\u2136',
	    between: '\u226C',
	    bigcirc: '\u25EF',
	    bigodot: '\u2A00',
	    bigoplus: '\u2A01',
	    bigotimes: '\u2A02',
	    bigsqcup: '\u2A06',
	    bigstar: '\u2605',
	    bigtriangledown: '\u25BD',
	    bigtriangleup: '\u25B3',
	    biguplus: '\u2A04',
	    blacklozenge: '\u29EB',
	    blacktriangle: '\u25B4',
	    blacktriangledown: '\u25BE',
	    blacktriangleleft: '\u25C2',
	    bowtie: '\u22C8',
	    boxdl: '\u2510',
	    boxdr: '\u250C',
	    boxminus: '\u229F',
	    boxplus: '\u229E',
	    boxtimes: '\u22A0',
	    boxul: '\u2518',
	    boxur: '\u2514',
	    bsol: '\u005C',
	    bull: '\u2022',
	    cap: '\u2229',
	    check: '\u2713',
	    chi: '\u03C7',
	    circ: '\u02C6',
	    circeq: '\u2257',
	    circlearrowleft: '\u21BA',
	    circlearrowright: '\u21BB',
	    circledR: '\u00AE',
	    circledS: '\u24C8',
	    circledast: '\u229B',
	    circledcirc: '\u229A',
	    circleddash: '\u229D',
	    clubs: '\u2663',
	    colon: '\u003A',
	    comp: '\u2201',
	    ctdot: '\u22EF',
	    cuepr: '\u22DE',
	    cuesc: '\u22DF',
	    cularr: '\u21B6',
	    cup: '\u222A',
	    curarr: '\u21B7',
	    curlyvee: '\u22CE',
	    curlywedge: '\u22CF',
	    dagger: '\u2020',
	    daleth: '\u2138',
	    ddarr: '\u21CA',
	    deg: '\u00B0',
	    delta: '\u03B4',
	    digamma: '\u03DD',
	    div: '\u00F7',
	    divideontimes: '\u22C7',
	    dot: '\u02D9',
	    doteqdot: '\u2251',
	    dotplus: '\u2214',
	    dotsquare: '\u22A1',
	    dtdot: '\u22F1',
	    ecir: '\u2256',
	    efDot: '\u2252',
	    egs: '\u2A96',
	    ell: '\u2113',
	    els: '\u2A95',
	    empty: '\u2205',
	    epsi: '\u03B5',
	    epsiv: '\u03F5',
	    erDot: '\u2253',
	    eta: '\u03B7',
	    eth: '\u00F0',
	    flat: '\u266D',
	    fork: '\u22D4',
	    frown: '\u2322',
	    gEl: '\u2A8C',
	    gamma: '\u03B3',
	    gap: '\u2A86',
	    gimel: '\u2137',
	    gnE: '\u2269',
	    gnap: '\u2A8A',
	    gne: '\u2A88',
	    gnsim: '\u22E7',
	    gt: '\u003E',
	    gtdot: '\u22D7',
	    harrw: '\u21AD',
	    hbar: '\u210F',
	    hellip: '\u2026',
	    hookleftarrow: '\u21A9',
	    hookrightarrow: '\u21AA',
	    imath: '\u0131',
	    infin: '\u221E',
	    intcal: '\u22BA',
	    iota: '\u03B9',
	    jmath: '\u0237',
	    kappa: '\u03BA',
	    kappav: '\u03F0',
	    lEg: '\u2A8B',
	    lambda: '\u03BB',
	    lap: '\u2A85',
	    larrlp: '\u21AB',
	    larrtl: '\u21A2',
	    lbrace: '\u007B',
	    lbrack: '\u005B',
	    le: '\u2264',
	    leftleftarrows: '\u21C7',
	    leftthreetimes: '\u22CB',
	    lessdot: '\u22D6',
	    lmoust: '\u23B0',
	    lnE: '\u2268',
	    lnap: '\u2A89',
	    lne: '\u2A87',
	    lnsim: '\u22E6',
	    longmapsto: '\u27FC',
	    looparrowright: '\u21AC',
	    lowast: '\u2217',
	    loz: '\u25CA',
	    lt: '\u003C',
	    ltimes: '\u22C9',
	    ltri: '\u25C3',
	    macr: '\u00AF',
	    malt: '\u2720',
	    mho: '\u2127',
	    mu: '\u03BC',
	    multimap: '\u22B8',
	    nLeftarrow: '\u21CD',
	    nLeftrightarrow: '\u21CE',
	    nRightarrow: '\u21CF',
	    nVDash: '\u22AF',
	    nVdash: '\u22AE',
	    natur: '\u266E',
	    nearr: '\u2197',
	    nharr: '\u21AE',
	    nlarr: '\u219A',
	    not: '\u00AC',
	    nrarr: '\u219B',
	    nu: '\u03BD',
	    nvDash: '\u22AD',
	    nvdash: '\u22AC',
	    nwarr: '\u2196',
	    omega: '\u03C9',
	    omicron: '\u03BF',
	    or: '\u2228',
	    osol: '\u2298',
	    period: '\u002E',
	    phi: '\u03C6',
	    phiv: '\u03D5',
	    pi: '\u03C0',
	    piv: '\u03D6',
	    prap: '\u2AB7',
	    precnapprox: '\u2AB9',
	    precneqq: '\u2AB5',
	    precnsim: '\u22E8',
	    prime: '\u2032',
	    psi: '\u03C8',
	    quot: '\u0022',
	    rarrtl: '\u21A3',
	    rbrace: '\u007D',
	    rbrack: '\u005D',
	    rho: '\u03C1',
	    rhov: '\u03F1',
	    rightrightarrows: '\u21C9',
	    rightthreetimes: '\u22CC',
	    ring: '\u02DA',
	    rmoust: '\u23B1',
	    rtimes: '\u22CA',
	    rtri: '\u25B9',
	    scap: '\u2AB8',
	    scnE: '\u2AB6',
	    scnap: '\u2ABA',
	    scnsim: '\u22E9',
	    sdot: '\u22C5',
	    searr: '\u2198',
	    sect: '\u00A7',
	    sharp: '\u266F',
	    sigma: '\u03C3',
	    sigmav: '\u03C2',
	    simne: '\u2246',
	    smile: '\u2323',
	    spades: '\u2660',
	    sub: '\u2282',
	    subE: '\u2AC5',
	    subnE: '\u2ACB',
	    subne: '\u228A',
	    supE: '\u2AC6',
	    supnE: '\u2ACC',
	    supne: '\u228B',
	    swarr: '\u2199',
	    tau: '\u03C4',
	    theta: '\u03B8',
	    thetav: '\u03D1',
	    tilde: '\u02DC',
	    times: '\u00D7',
	    triangle: '\u25B5',
	    triangleq: '\u225C',
	    upsi: '\u03C5',
	    upuparrows: '\u21C8',
	    veebar: '\u22BB',
	    vellip: '\u22EE',
	    weierp: '\u2118',
	    xi: '\u03BE',
	    yen: '\u00A5',
	    zeta: '\u03B6',
	    zigrarr: '\u21DD'
	};
	var loaded = {};
	function add(additions, file) {
	    Object.assign(exports.entities, additions);
	    loaded[file] = true;
	}
	exports.add = add;
	function remove(entity) {
	    delete exports.entities[entity];
	}
	exports.remove = remove;
	function translate(text) {
	    return text.replace(/&([a-z][a-z0-9]*|#(?:[0-9]+|x[0-9a-f]+));/ig, replace);
	}
	exports.translate = translate;
	function replace(match, entity) {
	    if (entity.charAt(0) === '#') {
	        return numeric(entity.slice(1));
	    }
	    if (exports.entities[entity]) {
	        return exports.entities[entity];
	    }
	    if (exports.options['loadMissingEntities']) {
	        var file = (entity.match(/^[a-zA-Z](fr|scr|opf)$/) ? RegExp.$1 : entity.charAt(0).toLowerCase());
	        if (!loaded[file]) {
	            loaded[file] = true;
	            Retries.retryAfter(AsyncLoad.asyncLoad('./util/entities/' + file + '.js'));
	        }
	    }
	    return match;
	}
	function numeric(entity) {
	    var n = (entity.charAt(0) === 'x' ?
	        parseInt(entity.slice(1), 16) :
	        parseInt(entity));
	    if (n < 0x10000) {
	        return String.fromCharCode(n);
	    }
	    n -= 0x10000;
	    var hi = (n >> 10) + 0xD800;
	    var lo = (n & 0x3FF) + 0xDC00;
	    return String.fromCharCode(hi, lo);
	}
	exports.numeric = numeric;

	});

	unwrapExports(Entities);
	var Entities_1 = Entities.options;
	var Entities_2 = Entities.entities;
	var Entities_3 = Entities.add;
	var Entities_4 = Entities.remove;
	var Entities_5 = Entities.translate;
	var Entities_6 = Entities.numeric;

	var MathMLCompile_1 = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });



	var MathMLCompile = (function () {
	    function MathMLCompile(options) {
	        if (options === void 0) { options = {}; }
	        var Class = this.constructor;
	        this.options = Options.userOptions(Options.defaultOptions({}, Class.OPTIONS), options);
	        if (this.options['verify']) {
	            this.options['verify'] = Options.userOptions(Options.defaultOptions({}, Class.VERIFY), this.options['verify']);
	        }
	    }
	    MathMLCompile.prototype.setMmlFactory = function (mmlFactory) {
	        this.factory = mmlFactory;
	    };
	    MathMLCompile.prototype.compile = function (node) {
	        var mml = this.makeNode(node);
	        mml.verifyTree(this.options['verify']);
	        mml.setInheritedAttributes({}, false, 0, false);
	        mml.walkTree(this.markMrows);
	        return mml;
	    };
	    MathMLCompile.prototype.makeNode = function (node) {
	        var e_1, _a;
	        var adaptor = this.adaptor;
	        var limits = false;
	        var kind = adaptor.kind(node).replace(/^.*:/, '');
	        var texClass = adaptor.getAttribute(node, 'data-mjx-texclass') || '';
	        var type = texClass && kind === 'mrow' ? 'TeXAtom' : kind;
	        try {
	            for (var _b = __values(adaptor.allClasses(node)), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var name_1 = _c.value;
	                if (name_1.match(/^MJX-TeXAtom-/)) {
	                    texClass = name_1.substr(12);
	                    type = 'TeXAtom';
	                }
	                else if (name_1 === 'MJX-fixedlimits') {
	                    limits = true;
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        this.factory.getNodeClass(type) || this.error('Unknown node type "' + type + '"');
	        var mml = this.factory.create(type);
	        if (type === 'TeXAtom') {
	            this.texAtom(mml, texClass, limits);
	        }
	        else if (texClass) {
	            mml.texClass = MmlNode.TEXCLASS[texClass];
	            mml.setProperty('texClass', mml.texClass);
	        }
	        this.addAttributes(mml, node);
	        this.checkClass(mml, node);
	        this.addChildren(mml, node);
	        return mml;
	    };
	    MathMLCompile.prototype.addAttributes = function (mml, node) {
	        var e_2, _a;
	        var ignoreVariant = false;
	        try {
	            for (var _b = __values(this.adaptor.allAttributes(node)), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var attr = _c.value;
	                var name_2 = attr.name;
	                if (name_2.substr(0, 9) === 'data-mjx-') {
	                    if (name_2 === 'data-mjx-alternate') {
	                        mml.setProperty('variantForm', true);
	                    }
	                    else if (name_2 === 'data-mjx-variant') {
	                        mml.attributes.set('mathvariant', this.filterAttribute('mathvariant', attr.value));
	                        ignoreVariant = true;
	                    }
	                }
	                else if (name_2 !== 'class') {
	                    var value = this.filterAttribute(name_2, attr.value);
	                    if (value !== null) {
	                        var val = value.toLowerCase();
	                        if (val === 'true' || val === 'false') {
	                            mml.attributes.set(name_2, val === 'true');
	                        }
	                        else if (!ignoreVariant || name_2 !== 'mathvariant') {
	                            mml.attributes.set(name_2, value);
	                        }
	                    }
	                }
	            }
	        }
	        catch (e_2_1) { e_2 = { error: e_2_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_2) throw e_2.error; }
	        }
	    };
	    MathMLCompile.prototype.filterAttribute = function (name, value) {
	        return value;
	    };
	    MathMLCompile.prototype.addChildren = function (mml, node) {
	        var e_3, _a;
	        if (mml.arity === 0) {
	            return;
	        }
	        var adaptor = this.adaptor;
	        try {
	            for (var _b = __values(adaptor.childNodes(node)), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var child = _c.value;
	                var name_3 = adaptor.kind(child);
	                if (name_3 === '#comment') {
	                    continue;
	                }
	                if (name_3 === '#text') {
	                    this.addText(mml, child);
	                }
	                else if (mml.isKind('annotation-xml')) {
	                    mml.appendChild(this.factory.create('XML').setXML(child, adaptor));
	                }
	                else {
	                    var childMml = mml.appendChild(this.makeNode(child));
	                    if (childMml.arity === 0 && adaptor.childNodes(child).length) {
	                        if (this.options['fixMisplacedChildren']) {
	                            this.addChildren(mml, child);
	                        }
	                        else {
	                            childMml.mError('There should not be children for ' + childMml.kind + ' nodes', this.options['verify'], true);
	                        }
	                    }
	                }
	            }
	        }
	        catch (e_3_1) { e_3 = { error: e_3_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_3) throw e_3.error; }
	        }
	    };
	    MathMLCompile.prototype.addText = function (mml, child) {
	        var text = this.adaptor.value(child);
	        if ((mml.isToken || mml.getProperty('isChars')) && mml.arity) {
	            if (mml.isToken) {
	                text = Entities.translate(text);
	                text = this.trimSpace(text);
	            }
	            mml.appendChild(this.factory.create('text').setText(text));
	        }
	        else if (text.match(/\S/)) {
	            this.error('Unexpected text node "' + text + '"');
	        }
	    };
	    MathMLCompile.prototype.checkClass = function (mml, node) {
	        var e_4, _a;
	        var classList = [];
	        try {
	            for (var _b = __values(this.adaptor.allClasses(node)), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var name_4 = _c.value;
	                if (name_4.substr(0, 4) === 'MJX-') {
	                    if (name_4 === 'MJX-variant') {
	                        mml.setProperty('variantForm', true);
	                    }
	                    else if (name_4.substr(0, 11) !== 'MJX-TeXAtom') {
	                        mml.attributes.set('mathvariant', this.fixCalligraphic(name_4.substr(3)));
	                    }
	                }
	                else {
	                    classList.push(name_4);
	                }
	            }
	        }
	        catch (e_4_1) { e_4 = { error: e_4_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_4) throw e_4.error; }
	        }
	        if (classList.length) {
	            mml.attributes.set('class', classList.join(' '));
	        }
	    };
	    MathMLCompile.prototype.fixCalligraphic = function (variant) {
	        return variant.replace(/caligraphic/, 'calligraphic');
	    };
	    MathMLCompile.prototype.texAtom = function (mml, texClass, limits) {
	        mml.texClass = MmlNode.TEXCLASS[texClass];
	        mml.setProperty('texClass', mml.texClass);
	        if (texClass === 'OP' && !limits) {
	            mml.setProperty('movesupsub', true);
	            mml.attributes.setInherited('movablelimits', true);
	        }
	    };
	    MathMLCompile.prototype.markMrows = function (mml) {
	        if (mml.isKind('mrow') && !mml.isInferred && mml.childNodes.length >= 2) {
	            var first = mml.childNodes[0];
	            var last = mml.childNodes[mml.childNodes.length - 1];
	            if (first.isKind('mo') && first.attributes.get('fence') &&
	                last.isKind('mo') && last.attributes.get('fence')) {
	                if (first.childNodes.length) {
	                    mml.setProperty('open', first.getText());
	                }
	                if (last.childNodes.length) {
	                    mml.setProperty('close', last.getText());
	                }
	            }
	        }
	    };
	    MathMLCompile.prototype.trimSpace = function (text) {
	        return text.replace(/[\t\n\r]/g, ' ')
	            .replace(/^ +/, '')
	            .replace(/ +$/, '')
	            .replace(/  +/g, ' ');
	    };
	    MathMLCompile.prototype.error = function (message) {
	        throw new Error(message);
	    };
	    MathMLCompile.OPTIONS = {
	        MmlFactory: null,
	        fixMisplacedChildren: true,
	        verify: {},
	        translateEntities: true
	    };
	    MathMLCompile.VERIFY = __assign({}, MmlNode.AbstractMmlNode.verifyDefaults);
	    return MathMLCompile;
	}());
	exports.MathMLCompile = MathMLCompile;

	});

	unwrapExports(MathMLCompile_1);
	var MathMLCompile_2 = MathMLCompile_1.MathMLCompile;

	var mathml = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	Object.defineProperty(exports, "__esModule", { value: true });





	var MathML = (function (_super) {
	    __extends(MathML, _super);
	    function MathML(options) {
	        if (options === void 0) { options = {}; }
	        var _this = this;
	        var _a = __read(Options.separateOptions(options, FindMathML_1.FindMathML.OPTIONS, MathMLCompile_1.MathMLCompile.OPTIONS), 3), mml = _a[0], find = _a[1], compile = _a[2];
	        _this = _super.call(this, mml) || this;
	        _this.findMathML = _this.options['FindMathML'] || new FindMathML_1.FindMathML(find);
	        _this.mathml = _this.options['MathMLCompile'] || new MathMLCompile_1.MathMLCompile(compile);
	        _this.mmlFilters = new FunctionList_1.FunctionList();
	        return _this;
	    }
	    MathML.prototype.setAdaptor = function (adaptor) {
	        _super.prototype.setAdaptor.call(this, adaptor);
	        this.findMathML.adaptor = adaptor;
	        this.mathml.adaptor = adaptor;
	    };
	    MathML.prototype.setMmlFactory = function (mmlFactory) {
	        _super.prototype.setMmlFactory.call(this, mmlFactory);
	        this.mathml.setMmlFactory(mmlFactory);
	    };
	    Object.defineProperty(MathML.prototype, "processStrings", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MathML.prototype.compile = function (math, document) {
	        var mml = math.start.node;
	        if (!mml || this.options['forceReparse'] || this.adaptor.kind(mml) === '#text') {
	            var mathml = this.executeFilters(this.preFilters, math, document, math.math || '<math></math>');
	            var doc = this.checkForErrors(this.adaptor.parse(mathml, 'text/' + this.options['parseAs']));
	            var body = this.adaptor.body(doc);
	            if (this.adaptor.childNodes(body).length !== 1) {
	                this.error('MathML must consist of a single element');
	            }
	            mml = this.adaptor.remove(this.adaptor.firstChild(body));
	            if (this.adaptor.kind(mml).replace(/^[a-z]+:/, '') !== 'math') {
	                this.error('MathML must be formed by a <math> element, not <' +
	                    this.adaptor.kind(mml) + '>');
	            }
	        }
	        mml = this.executeFilters(this.mmlFilters, math, document, mml);
	        return this.executeFilters(this.postFilters, math, document, this.mathml.compile(mml));
	    };
	    MathML.prototype.checkForErrors = function (doc) {
	        var err = this.adaptor.tags(this.adaptor.body(doc), 'parsererror')[0];
	        if (err) {
	            if (this.adaptor.textContent(err) === '') {
	                this.error('Error processing MathML');
	            }
	            this.options['parseError'].call(this, err);
	        }
	        return doc;
	    };
	    MathML.prototype.error = function (message) {
	        throw new Error(message);
	    };
	    MathML.prototype.findMath = function (node) {
	        return this.findMathML.findMath(node);
	    };
	    MathML.NAME = 'MathML';
	    MathML.OPTIONS = Options.defaultOptions({
	        parseAs: 'html',
	        forceReparse: false,
	        FindMathML: null,
	        MathMLCompile: null,
	        parseError: function (node) {
	            this.error(this.adaptor.textContent(node).replace(/\n.*/g, ''));
	        }
	    }, InputJax.AbstractInputJax.OPTIONS);
	    return MathML;
	}(InputJax.AbstractInputJax));
	exports.MathML = MathML;

	});

	var mathml$1 = unwrapExports(mathml);
	var mathml_1 = mathml.MathML;

	exports.MathML = mathml_1;
	exports.default = mathml$1;

	Object.defineProperty(exports, '__esModule', { value: true });

});
