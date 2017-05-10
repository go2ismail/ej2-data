this["ej"] = this["ej"] || {}; this["ej"]["dataModule"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = createInstance;
/* harmony export (immutable) */ __webpack_exports__["l"] = setImmediate;
/* harmony export (immutable) */ __webpack_exports__["f"] = getValue;
/* harmony export (immutable) */ __webpack_exports__["g"] = setValue;
/* harmony export (immutable) */ __webpack_exports__["h"] = deleteObject;
/* unused harmony export isObject */
/* unused harmony export getEnumValue */
/* harmony export (immutable) */ __webpack_exports__["e"] = merge;
/* harmony export (immutable) */ __webpack_exports__["a"] = extend;
/* harmony export (immutable) */ __webpack_exports__["b"] = isNullOrUndefined;
/* harmony export (immutable) */ __webpack_exports__["d"] = isUndefined;
/* harmony export (immutable) */ __webpack_exports__["m"] = getUniqueID;
/* harmony export (immutable) */ __webpack_exports__["j"] = debounce;
/* unused harmony export queryParams */
/* unused harmony export isObjectArray */
/* harmony export (immutable) */ __webpack_exports__["k"] = compareElementParent;
/* harmony export (immutable) */ __webpack_exports__["i"] = throwError;
/* unused harmony export print */
/* unused harmony export formatUnit */
/* unused harmony export getInstance */
/* unused harmony export addInstance */
var instances = 'ej2_instances';
var uid = 0;
function createInstance(classFunction, params) {
    var arrayParam = params;
    arrayParam.unshift(undefined);
    return new (Function.prototype.bind.apply(classFunction, arrayParam));
}
function setImmediate(handler) {
    var unbind;
    var num = new Uint16Array(5);
    var intCrypto = window.msCrypto || window.crypto;
    intCrypto.getRandomValues(num);
    var secret = 'ej2' + combineArray(num);
    var messageHandler = function (event) {
        if (event.source === window && typeof event.data === 'string' && event.data.length <= 32 && event.data === secret) {
            handler();
            unbind();
        }
    };
    window.addEventListener('message', messageHandler, false);
    window.postMessage(secret, '*');
    return unbind = function () {
        window.removeEventListener('message', messageHandler);
    };
}
function getValue(nameSpace, obj) {
    var value = obj;
    var splits = nameSpace.split('.');
    for (var i = 0; i < splits.length && !isUndefined(value); i++) {
        value = value[splits[i]];
    }
    return value;
}
function setValue(nameSpace, value, obj) {
    var keys = nameSpace.split('.');
    var start = obj || {};
    var fromObj = start;
    var i;
    var length = keys.length;
    var key;
    for (i = 0; i < length; i++) {
        key = keys[i];
        if (i + 1 === length) {
            fromObj[key] = value === undefined ? {} : value;
        }
        else if (isNullOrUndefined(fromObj[key])) {
            fromObj[key] = {};
        }
        fromObj = fromObj[key];
    }
    return start;
}
function deleteObject(obj, key) {
    delete obj[key];
}
function isObject(obj) {
    var objCon = {};
    return (!isNullOrUndefined(obj) && obj.constructor === objCon.constructor);
}
function getEnumValue(enumObject, enumValue) {
    return enumObject[enumValue];
}
function merge(source, destination) {
    if (!isNullOrUndefined(destination)) {
        var temrObj = source;
        var tempProp = destination;
        var keys = Object.keys(destination);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            temrObj[key] = tempProp[key];
        }
    }
}
function extend(copied, first, second, deep) {
    var result = copied || {};
    var length = arguments.length;
    if (deep) {
        length = length - 1;
    }
    var _loop_1 = function (i) {
        if (!arguments_1[i]) {
            return "continue";
        }
        var obj1 = arguments_1[i];
        Object.keys(obj1).forEach(function (key) {
            var src = result[key];
            var copy = obj1[key];
            var clone;
            if (deep && isObject(copy)) {
                clone = isObject(src) ? src : {};
                result[key] = extend({}, clone, copy, true);
            }
            else {
                result[key] = copy;
            }
        });
    };
    var arguments_1 = arguments;
    for (var i = 1; i < length; i++) {
        _loop_1(i);
    }
    return result;
}
function isNullOrUndefined(value) {
    return value === undefined || value === null;
}
function isUndefined(value) {
    return ('undefined' === typeof value);
}
function getUniqueID(definedName) {
    return definedName + '_' + uid++;
}
function debounce(eventFunction, delay) {
    var _this = this;
    var out;
    return function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var args = arg[0];
        var later = function () {
            out = null;
            return eventFunction.call(_this, args);
        };
        clearTimeout(out);
        out = setTimeout(later, delay);
    };
}
function queryParams(data) {
    var array = [];
    var keys = Object.keys(data);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        array.push(encodeURIComponent(key) + '=' + encodeURIComponent('' + data[key]));
    }
    return array.join('&');
}
function isObjectArray(value) {
    var parser = Object.prototype.toString;
    if (parser.call(value) === '[object Array]') {
        if (parser.call(value[0]) === '[object Object]') {
            return true;
        }
    }
    return false;
}
function compareElementParent(child, parent) {
    var node = child;
    if (node === parent) {
        return true;
    }
    else if (node === document || !node) {
        return false;
    }
    else {
        return compareElementParent(node.parentNode, parent);
    }
}
function throwError(message) {
    try {
        throw new Error(message);
    }
    catch (e) {
        throw e.message + '\n' + e.stack;
    }
}
function print(element, printWindow) {
    var div = document.createElement('div');
    var links = [].slice.call(document.getElementsByTagName('head')[0].querySelectorAll('link, style'));
    var reference = '';
    if (isNullOrUndefined(printWindow)) {
        printWindow = window.open('', 'print', 'height=452,width=1024,tabbar=no');
    }
    div.appendChild(element.cloneNode(true));
    for (var i = 0, len = links.length; i < len; i++) {
        reference += links[i].outerHTML;
    }
    printWindow.document.write('<!DOCTYPE html> <html><head>' + reference + '</head><body>' + div.innerHTML +
        '<script> (function() { window.ready = true; })(); </script>' + '</body></html>');
    printWindow.document.close();
    printWindow.focus();
    var interval = setInterval(function () {
        if (printWindow.ready) {
            printWindow.print();
            printWindow.close();
            clearInterval(interval);
        }
    }, 500);
    return printWindow;
}
function formatUnit(value) {
    var result = value + '';
    if (result === 'auto' || result.indexOf('%') !== -1 || result.indexOf('px') !== -1) {
        return result;
    }
    return result + 'px';
}
function getInstance(element, component) {
    var elem = (typeof (element) === 'string') ? document.querySelector(element) : element;
    if (elem[instances]) {
        for (var _i = 0, _a = elem[instances]; _i < _a.length; _i++) {
            var inst = _a[_i];
            if (inst instanceof component) {
                return inst;
            }
        }
    }
    return null;
}
function addInstance(element, instance) {
    var elem = (typeof (element) === 'string') ? document.querySelector(element) : element;
    if (elem[instances]) {
        elem[instances].push(instance);
    }
    else {
        elem[instances] = [instance];
    }
}
function combineArray(num) {
    var ret = '';
    for (var i = 0; i < 5; i++) {
        ret += (i ? ',' : '') + num[i];
    }
    return ret;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Base; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__observer__ = __webpack_require__(12);



var Base = (function () {
    function Base(options, element) {
        this.isProtectedOnChange = true;
        this.properties = {};
        this.changedProperties = {};
        this.oldProperties = {};
        this.finalUpdate = function () { };
        this.childChangedProperties = {};
        this.modelObserver = new __WEBPACK_IMPORTED_MODULE_2__observer__["a" /* Observer */](this);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(element)) {
            if ('string' === typeof (element)) {
                this.element = document.querySelector(element);
            }
            else {
                this.element = element;
            }
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.element)) {
                this.isProtectedOnChange = false;
                this.addInstance();
            }
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(options)) {
            this.setProperties(options, true);
        }
        this.isDestroyed = false;
    }
    Base.prototype.setProperties = function (prop, muteOnChange) {
        var prevDetection = this.isProtectedOnChange;
        this.isProtectedOnChange = !!muteOnChange;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(this, prop);
        if (muteOnChange !== true) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(this.changedProperties, prop);
            this.dataBind();
        }
        this.finalUpdate();
        this.changedProperties = {};
        this.oldProperties = {};
        this.isProtectedOnChange = prevDetection;
    };
    ;
    Base.callChildDataBind = function (obj, parent) {
        var keys = Object.keys(obj);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (parent[key] instanceof Array) {
                for (var _a = 0, _b = parent[key]; _a < _b.length; _a++) {
                    var obj_1 = _b[_a];
                    if (obj_1.dataBind !== undefined) {
                        obj_1.dataBind();
                    }
                }
            }
            else {
                parent[key].dataBind();
            }
        }
    };
    Base.prototype.clearChanges = function () {
        this.finalUpdate();
        this.changedProperties = {};
        this.oldProperties = {};
        this.childChangedProperties = {};
    };
    Base.prototype.dataBind = function () {
        Base.callChildDataBind(this.childChangedProperties, this);
        if (Object.getOwnPropertyNames(this.changedProperties).length) {
            var prevDetection = this.isProtectedOnChange;
            var newChanges = this.changedProperties;
            var oldChanges = this.oldProperties;
            this.clearChanges();
            this.isProtectedOnChange = true;
            this.onPropertyChanged(newChanges, oldChanges);
            this.isProtectedOnChange = prevDetection;
        }
    };
    ;
    Base.prototype.saveChanges = function (key, newValue, oldValue) {
        if (this.isProtectedOnChange) {
            return;
        }
        this.oldProperties[key] = oldValue;
        this.changedProperties[key] = newValue;
        this.finalUpdate();
        this.finalUpdate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["l" /* setImmediate */])(this.dataBind.bind(this));
    };
    ;
    Base.prototype.addEventListener = function (eventName, handler) {
        this.modelObserver.on(eventName, handler);
    };
    Base.prototype.removeEventListener = function (eventName, handler) {
        this.modelObserver.off(eventName, handler);
    };
    Base.prototype.trigger = function (eventName, eventProp) {
        if (this.isDestroyed !== true) {
            var prevDetection = this.isProtectedOnChange;
            this.isProtectedOnChange = false;
            this.modelObserver.notify(eventName, eventProp);
            this.isProtectedOnChange = prevDetection;
        }
    };
    Base.prototype.addInstance = function () {
        var moduleClass = 'e-' + this.getModuleName().toLowerCase();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__dom__["f" /* addClass */])([this.element], ['e-control', moduleClass]);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.element.ej2_instances)) {
            this.element.ej2_instances.push(this);
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])('ej2_instances', [this], this.element);
        }
    };
    Base.prototype.destroy = function () {
        var _this = this;
        this.element.ej2_instances =
            this.element.ej2_instances.filter(function (i) { return i !== _this; });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__dom__["i" /* removeClass */])([this.element], ['e-' + this.getModuleName()]);
        if (this.element.ej2_instances.length === 0) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__dom__["i" /* removeClass */])([this.element], ['e-control']);
        }
        this.clearChanges();
        this.modelObserver.destroy();
        this.isDestroyed = true;
    };
    return Base;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Property;
/* harmony export (immutable) */ __webpack_exports__["b"] = Complex;
/* harmony export (immutable) */ __webpack_exports__["c"] = Collection;
/* harmony export (immutable) */ __webpack_exports__["d"] = Event;
/* harmony export (immutable) */ __webpack_exports__["e"] = NotifyPropertyChanges;
/* harmony export (immutable) */ __webpack_exports__["f"] = CreateBuilder;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

function getObject(instance, curKey, defaultValue, type) {
    if (!instance.properties.hasOwnProperty(curKey)) {
        instance.properties[curKey] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* createInstance */])(type, [instance, curKey, defaultValue]);
    }
    return instance.properties[curKey];
}
function getObjectArray(instance, curKey, defaultValue, type, isSetter) {
    var result = [];
    var len = defaultValue.length;
    for (var i = 0; i < len; i++) {
        if (isSetter) {
            var inst = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* createInstance */])(type, [instance, curKey, {}, true]);
            inst.setProperties(defaultValue[i], true);
            result.push(inst);
        }
        else {
            result.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* createInstance */])(type, [instance, curKey, defaultValue[i], true]));
        }
    }
    return result;
}
function propertyGetter(defaultValue, curKey) {
    return function () {
        if (!this.properties.hasOwnProperty(curKey)) {
            this.properties[curKey] = defaultValue;
        }
        return this.properties[curKey];
    };
}
function propertySetter(defaultValue, curKey) {
    return function (newValue) {
        if (this.properties[curKey] !== newValue) {
            var oldVal = this.properties.hasOwnProperty(curKey) ? this.properties[curKey] : defaultValue;
            this.saveChanges(curKey, newValue, oldVal);
            this.properties[curKey] = newValue;
        }
    };
}
function complexGetter(defaultValue, curKey, type) {
    return function () {
        return getObject(this, curKey, defaultValue, type);
    };
}
function complexSetter(defaultValue, curKey, type) {
    return function (newValue) {
        getObject(this, curKey, defaultValue, type).setProperties(newValue);
    };
}
function complexArrayGetter(defaultValue, curKey, type) {
    return function () {
        if (!this.properties.hasOwnProperty(curKey)) {
            var defCollection = getObjectArray(this, curKey, defaultValue, type);
            this.properties[curKey] = defCollection;
        }
        return this.properties[curKey];
    };
}
function complexArraySetter(defaultValue, curKey, type) {
    return function (newValue) {
        var oldValueCollection = getObjectArray(this, curKey, defaultValue, type);
        var newValCollection = getObjectArray(this, curKey, newValue, type, true);
        this.saveChanges(curKey, newValCollection, oldValueCollection);
        this.properties[curKey] = newValCollection;
    };
}
function Property(defaultValue) {
    return function (target, key) {
        var propertyDescriptor = {
            set: propertySetter(defaultValue, key),
            get: propertyGetter(defaultValue, key),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, propertyDescriptor);
        addPropertyCollection(target, key, 'prop', defaultValue);
    };
}
function Complex(defaultValue, type) {
    return function (target, key) {
        var propertyDescriptor = {
            set: complexSetter(defaultValue, key, type),
            get: complexGetter(defaultValue, key, type),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, propertyDescriptor);
        addPropertyCollection(target, key, 'complexProp', defaultValue, type);
    };
}
function Collection(defaultValue, type) {
    return function (target, key) {
        var propertyDescriptor = {
            set: complexArraySetter(defaultValue, key, type),
            get: complexArrayGetter(defaultValue, key, type),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, propertyDescriptor);
        addPropertyCollection(target, key, 'colProp', defaultValue, type);
    };
}
function Event() {
    return function (target, key) {
        var eventDescriptor = {
            set: function (newValue) {
                var oldValue = this.properties[key];
                if (oldValue !== newValue) {
                    var finalContext = getParentContext(this, key);
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(oldValue) === false) {
                        finalContext.context.removeEventListener(finalContext.prefix, oldValue);
                    }
                    finalContext.context.addEventListener(finalContext.prefix, newValue);
                    this.properties[key] = newValue;
                }
            },
            get: propertyGetter(undefined, key),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, eventDescriptor);
        addPropertyCollection(target, key, 'event');
    };
}
function NotifyPropertyChanges(classConstructor) {
}
function addPropertyCollection(target, key, propertyType, defaultValue, type) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(target.propList)) {
        target.propList = {
            props: [],
            complexProps: [],
            colProps: [],
            events: [],
            propNames: [],
            complexPropNames: [],
            colPropNames: [],
            eventNames: []
        };
    }
    target.propList[propertyType + 's'].push({
        propertyName: key,
        defaultValue: defaultValue,
        type: type
    });
    target.propList[propertyType + 'Names'].push(key);
}
function getBuilderProperties(component) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(component.prototype.builderObject)) {
        component.prototype.builderObject = {
            properties: {}, propCollections: [], add: function () {
                this.isPropertyArray = true;
                this.propCollections.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])({}, this.properties, {}));
            }
        };
        var rex = /complex/;
        for (var _i = 0, _a = Object.keys(component.prototype.propList); _i < _a.length; _i++) {
            var key = _a[_i];
            var _loop_1 = function (prop) {
                if (rex.test(key)) {
                    component.prototype.builderObject[prop.propertyName] = function (value) {
                        var childType = {};
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(childType, getBuilderProperties(prop.type));
                        value(childType);
                        var tempValue;
                        if (!childType.isPropertyArray) {
                            tempValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])({}, childType.properties, {});
                        }
                        else {
                            tempValue = childType.propCollections;
                        }
                        this.properties[prop.propertyName] = tempValue;
                        childType.properties = {};
                        childType.propCollections = [];
                        childType.isPropertyArray = false;
                        return this;
                    };
                }
                else {
                    component.prototype.builderObject[prop.propertyName] = function (value) {
                        this.properties[prop.propertyName] = value;
                        return this;
                    };
                }
            };
            for (var _b = 0, _c = component.prototype.propList[key]; _b < _c.length; _b++) {
                var prop = _c[_b];
                _loop_1(prop);
            }
        }
    }
    return component.prototype.builderObject;
}
function CreateBuilder(component) {
    var builderFunction = function (element) {
        this.element = element;
        return this;
    };
    var instanceFunction = function (element) {
        if (!builderFunction.prototype.hasOwnProperty('create')) {
            builderFunction.prototype = getBuilderProperties(component);
            builderFunction.prototype.create = function () {
                var temp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])({}, {}, this.properties);
                this.properties = {};
                return new component(temp, this.element);
            };
        }
        return new builderFunction(element);
    };
    return instanceFunction;
}
function getParentContext(context, prefix) {
    if (context.hasOwnProperty('parentObj') === false) {
        return { context: context, prefix: prefix };
    }
    else {
        var curText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('propName', context);
        if (curText) {
            prefix = curText + '-' + prefix;
        }
        return getParentContext(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('parentObj', context), prefix);
    }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

var EventHandler = (function () {
    function EventHandler() {
    }
    EventHandler.addOrGetEventData = function (element) {
        if ('__eventList' in element) {
            return element.__eventList.events;
        }
        else {
            element.__eventList = {};
            return element.__eventList.events = [];
        }
    };
    EventHandler.add = function (element, eventName, listener, bindTo, intDebounce) {
        var eventData = EventHandler.addOrGetEventData(element);
        var debounceListener;
        if (intDebounce) {
            debounceListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["j" /* debounce */])(listener, intDebounce);
        }
        else {
            debounceListener = listener;
        }
        if (bindTo) {
            debounceListener = debounceListener.bind(bindTo);
        }
        var event = eventName.split(' ');
        for (var i = 0; i < event.length; i++) {
            eventData.push({
                name: event[i],
                listener: listener,
                debounce: debounceListener
            });
            element.addEventListener(event[i], debounceListener);
        }
    };
    EventHandler.remove = function (element, eventName, listener) {
        var eventData = EventHandler.addOrGetEventData(element);
        var event = eventName.split(' ');
        var _loop_1 = function (j) {
            var index = -1;
            var debounceListener;
            if (eventData && eventData.length !== 0) {
                eventData.some(function (x, i) {
                    return x.name === event[j] && x.listener.toString() === listener.toString() ?
                        (index = i, debounceListener = x.debounce, true) : false;
                });
            }
            if (index !== -1) {
                eventData.splice(index, 1);
            }
            element.removeEventListener(event[j], debounceListener);
        };
        for (var j = 0; j < event.length; j++) {
            _loop_1(j);
        }
    };
    EventHandler.clearEvents = function (element) {
        var eventData;
        var copyData;
        eventData = EventHandler.addOrGetEventData(element);
        copyData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])([], copyData, eventData);
        for (var i = 0; i < copyData.length; i++) {
            element.removeEventListener(copyData[i].name, copyData[i].debounce);
            eventData.shift();
        }
    };
    EventHandler.trigger = function (element, eventName, eventProp) {
        var eventData = EventHandler.addOrGetEventData(element);
        var fn = null;
        for (var _i = 0, eventData_1 = eventData; _i < eventData_1.length; _i++) {
            var event_1 = eventData_1[_i];
            if (event_1.name === eventName) {
                event_1.debounce.call(this, eventProp);
            }
        }
    };
    return EventHandler;
}());



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = createElement;
/* harmony export (immutable) */ __webpack_exports__["f"] = addClass;
/* harmony export (immutable) */ __webpack_exports__["i"] = removeClass;
/* harmony export (immutable) */ __webpack_exports__["d"] = isVisible;
/* unused harmony export prepend */
/* unused harmony export append */
/* unused harmony export detach */
/* unused harmony export remove */
/* unused harmony export attributes */
/* harmony export (immutable) */ __webpack_exports__["a"] = select;
/* harmony export (immutable) */ __webpack_exports__["b"] = selectAll;
/* harmony export (immutable) */ __webpack_exports__["g"] = closest;
/* unused harmony export siblings */
/* unused harmony export getAttributeOrDefault */
/* harmony export (immutable) */ __webpack_exports__["h"] = setStyleAttribute;
/* unused harmony export classList */
/* harmony export (immutable) */ __webpack_exports__["e"] = matches;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);


function createElement(tagName, properties) {
    var element = document.createElement(tagName);
    if (typeof (properties) === 'undefined') {
        return element;
    }
    element.innerHTML = (properties.innerHTML ? properties.innerHTML : '');
    if (properties.className !== undefined) {
        element.className = properties.className;
    }
    if (properties.id !== undefined) {
        element.id = properties.id;
    }
    if (properties.styles !== undefined) {
        element.setAttribute('style', properties.styles);
    }
    if (properties.attrs !== undefined) {
        attributes(element, properties.attrs);
    }
    return element;
}
function addClass(elements, classes) {
    var classList = getClassList(classes);
    for (var _i = 0, _a = elements; _i < _a.length; _i++) {
        var ele = _a[_i];
        for (var _b = 0, classList_1 = classList; _b < classList_1.length; _b++) {
            var className = classList_1[_b];
            if (!ele.classList.contains(className)) {
                ele.classList.add(className);
            }
        }
    }
    return elements;
}
function removeClass(elements, classes) {
    var classList = getClassList(classes);
    for (var _i = 0, _a = elements; _i < _a.length; _i++) {
        var ele = _a[_i];
        if (ele.className !== '') {
            for (var _b = 0, classList_2 = classList; _b < classList_2.length; _b++) {
                var className = classList_2[_b];
                ele.classList.remove(className);
            }
        }
    }
    return elements;
}
function getClassList(classes) {
    var classList = [];
    if (typeof classes === 'string') {
        classList.push(classes);
    }
    else {
        classList = classes;
    }
    return classList;
}
function isVisible(element) {
    var ele = element;
    return (ele.style.visibility === '' && ele.offsetWidth > 0);
}
function prepend(fromElements, toElement) {
    var docFrag = document.createDocumentFragment();
    for (var _i = 0, _a = fromElements; _i < _a.length; _i++) {
        var ele = _a[_i];
        docFrag.appendChild(ele);
    }
    toElement.insertBefore(docFrag, toElement.firstElementChild);
    return fromElements;
}
function append(fromElements, toElement) {
    var docFrag = document.createDocumentFragment();
    for (var _i = 0, _a = fromElements; _i < _a.length; _i++) {
        var ele = _a[_i];
        docFrag.appendChild(ele);
    }
    toElement.appendChild(docFrag);
    return fromElements;
}
function detach(element) {
    var parentNode = element.parentNode;
    return parentNode.removeChild(element);
}
function remove(element) {
    var parentNode = element.parentNode;
    __WEBPACK_IMPORTED_MODULE_0__event_handler__["a" /* EventHandler */].clearEvents(element);
    parentNode.removeChild(element);
}
function attributes(element, attributes) {
    var keys = Object.keys(attributes);
    var ele = element;
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        ele.setAttribute(key, attributes[key]);
    }
    return ele;
}
function select(selector, context) {
    if (context === void 0) { context = document; }
    return context.querySelector(selector);
}
function selectAll(selector, context) {
    if (context === void 0) { context = document; }
    var nodeList = context.querySelectorAll(selector);
    return nodeList;
}
function closest(element, selector) {
    var el = element;
    if (typeof el.closest === 'function') {
        return el.closest(selector);
    }
    while (el && el.nodeType === 1) {
        if (matches(el, selector)) {
            return el;
        }
        el = el.parentNode;
    }
    return null;
}
function siblings(element) {
    var siblings = [];
    var childNodes = Array.prototype.slice.call(element.parentNode.childNodes);
    for (var _i = 0, childNodes_1 = childNodes; _i < childNodes_1.length; _i++) {
        var curNode = childNodes_1[_i];
        if (curNode.nodeType === Node.ELEMENT_NODE && element !== curNode) {
            siblings.push(curNode);
        }
    }
    return siblings;
}
function getAttributeOrDefault(element, property, value) {
    var attrVal = element.getAttribute(property);
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* isNullOrUndefined */])(attrVal)) {
        element.setAttribute(property, value.toString());
        attrVal = value;
    }
    return attrVal;
}
function setStyleAttribute(element, attrs) {
    if (attrs !== undefined) {
        Object.keys(attrs).forEach(function (key) {
            element.style[key] = attrs[key];
        });
    }
}
function classList(element, addClasses, removeClasses) {
    addClass([element], addClasses);
    removeClass([element], removeClasses);
}
function matches(element, selector) {
    var matches = element.matches || element.msMatchesSelector || element.webkitMatchesSelector;
    if (matches) {
        return matches.call(element, selector);
    }
    else {
        return [].indexOf.call(document.querySelectorAll(selector), element) !== -1;
    }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntlBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parser_base__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__number_formatter__ = __webpack_require__(14);



var IntlBase;
(function (IntlBase) {
    IntlBase.negativeDataRegex = /^(('[^']+'|''|[^*#@0,.E])*)(\*.)?((([#,]*[0,]*0+)(\.0*[0-9]*#*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
    IntlBase.customRegex = /^(('[^']+'|''|[^*#@0,.])*)(\*.)?((([0#,]*[0,]*[0#]*)(\.[0#]*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
    IntlBase.latnParseRegex = /0|1|2|3|4|5|6|7|8|9/g;
    var fractionRegex = /[0-9]/g;
    IntlBase.defaultCurrency = '$';
    var mapper = ['infinity', 'nan', 'group', 'decimal'];
    IntlBase.formatRegex = /(^[ncpa]{1})([0-1]?[0-9]|20)?$/i;
    var typeMapper = {
        '$': 'isCurrency',
        '%': 'isPercent',
        '-': 'isNegative',
        0: 'nlead',
        1: 'nend'
    };
    IntlBase.dateParseRegex = /([a-z])\1*|'([^']|'')+'|''|./gi;
    IntlBase.basicPatterns = ['short', 'medium', 'long', 'full'];
    IntlBase.defaultObject = {
        'dates': {
            'calendars': {
                'gregorian': {
                    'months': {
                        'stand-alone': {
                            'abbreviated': {
                                '1': 'Jan',
                                '2': 'Feb',
                                '3': 'Mar',
                                '4': 'Apr',
                                '5': 'May',
                                '6': 'Jun',
                                '7': 'Jul',
                                '8': 'Aug',
                                '9': 'Sep',
                                '10': 'Oct',
                                '11': 'Nov',
                                '12': 'Dec'
                            },
                            'narrow': {
                                '1': 'J',
                                '2': 'F',
                                '3': 'M',
                                '4': 'A',
                                '5': 'M',
                                '6': 'J',
                                '7': 'J',
                                '8': 'A',
                                '9': 'S',
                                '10': 'O',
                                '11': 'N',
                                '12': 'D'
                            },
                            'wide': {
                                '1': 'January',
                                '2': 'February',
                                '3': 'March',
                                '4': 'April',
                                '5': 'May',
                                '6': 'June',
                                '7': 'July',
                                '8': 'August',
                                '9': 'September',
                                '10': 'October',
                                '11': 'November',
                                '12': 'December'
                            }
                        }
                    },
                    "days": {
                        "stand-alone": {
                            "abbreviated": {
                                "sun": "Sun",
                                "mon": "Mon",
                                "tue": "Tue",
                                "wed": "Wed",
                                "thu": "Thu",
                                "fri": "Fri",
                                "sat": "Sat"
                            },
                            "narrow": {
                                "sun": "S",
                                "mon": "M",
                                "tue": "T",
                                "wed": "W",
                                "thu": "T",
                                "fri": "F",
                                "sat": "S"
                            },
                            "short": {
                                "sun": "Su",
                                "mon": "Mo",
                                "tue": "Tu",
                                "wed": "We",
                                "thu": "Th",
                                "fri": "Fr",
                                "sat": "Sa"
                            },
                            "wide": {
                                "sun": "Sunday",
                                "mon": "Monday",
                                "tue": "Tuesday",
                                "wed": "Wednesday",
                                "thu": "Thursday",
                                "fri": "Friday",
                                "sat": "Saturday"
                            }
                        }
                    },
                    "dayPeriods": {
                        "format": {
                            "wide": {
                                "am": "AM",
                                "pm": "PM"
                            }
                        }
                    },
                    'eras': {
                        'eraNames': {
                            '0': 'Before Christ',
                            '0-alt-variant': 'Before Common Era',
                            '1': 'Anno Domini',
                            "1-alt-variant": "Common Era"
                        },
                        'eraAbbr': {
                            '0': 'BC',
                            '0-alt-variant': 'BCE',
                            '1': 'AD',
                            '1-alt-variant': 'CE'
                        },
                        'eraNarrow': {
                            '0': 'B',
                            '0-alt-variant': 'BCE',
                            '1': 'A',
                            '1-alt-variant': 'CE'
                        }
                    },
                    'dateFormats': {
                        'full': 'EEEE, MMMM d, y',
                        'long': 'MMMM d, y',
                        'medium': 'MMM d, y',
                        'short': 'M/d/yy'
                    },
                    'timeFormats': {
                        'full': 'h:mm:ss a zzzz',
                        'long': 'h:mm:ss a z',
                        'medium': 'h:mm:ss a',
                        'short': 'h:mm a'
                    },
                    'dateTimeFormats': {
                        'full': "{1} 'at' {0}",
                        'long': "{1} 'at' {0}",
                        'medium': '{1}, {0}',
                        'short': '{1}, {0}',
                        'availableFormats': {
                            'd': 'd',
                            'E': 'ccc',
                            'Ed': 'd E',
                            'Ehm': 'E h:mm a',
                            'EHm': 'E HH:mm',
                            'Ehms': 'E h:mm:ss a',
                            'EHms': 'E HH:mm:ss',
                            'Gy': 'y G',
                            'GyMMM': 'MMM y G',
                            'GyMMMd': 'MMM d, y G',
                            'GyMMMEd': 'E, MMM d, y G',
                            'h': 'h a',
                            'H': 'HH',
                            'hm': 'h:mm a',
                            'Hm': 'HH:mm',
                            'hms': 'h:mm:ss a',
                            'Hms': 'HH:mm:ss',
                            'hmsv': 'h:mm:ss a v',
                            'Hmsv': 'HH:mm:ss v',
                            'hmv': 'h:mm a v',
                            'Hmv': 'HH:mm v',
                            'M': 'L',
                            'Md': 'M/d',
                            'MEd': 'E, M/d',
                            'MMM': 'LLL',
                            'MMMd': 'MMM d',
                            'MMMEd': 'E, MMM d',
                            'MMMMd': 'MMMM d',
                            'ms': 'mm:ss',
                            'y': 'y',
                            'yM': 'M/y',
                            'yMd': 'M/d/y',
                            'yMEd': 'E, M/d/y',
                            'yMMM': 'MMM y',
                            'yMMMd': 'MMM d, y',
                            'yMMMEd': 'E, MMM d, y',
                            'yMMMM': 'MMMM y',
                        },
                    }
                }
            },
            'timeZoneNames': {
                "hourFormat": "+HH:mm;-HH:mm",
                "gmtFormat": "GMT{0}",
                "gmtZeroFormat": "GMT",
            }
        },
        'numbers': {
            'currencies': {
                'USD': {
                    'displayName': 'US Dollar',
                    'symbol': '$',
                    'symbol-alt-narrow': '$'
                },
                'EUR': {
                    'displayName': 'Euro',
                    'symbol': '€',
                    'symbol-alt-narrow': '€'
                },
                'GBP': {
                    'displayName': 'British Pound',
                    'symbol-alt-narrow': '£'
                },
            },
            'defaultNumberingSystem': 'latn',
            'minimumGroupingDigits': '1',
            'symbols-numberSystem-latn': {
                'decimal': '.',
                'group': ',',
                'list': ';',
                'percentSign': '%',
                'plusSign': '+',
                'minusSign': '-',
                'exponential': 'E',
                'superscriptingExponent': '×',
                'perMille': '‰',
                'infinity': '∞',
                'nan': 'NaN',
                'timeSeparator': ':'
            },
            'decimalFormats-numberSystem-latn': {
                'standard': '#,##0.###',
            },
            'percentFormats-numberSystem-latn': {
                'standard': '#,##0%'
            },
            'currencyFormats-numberSystem-latn': {
                'standard': '¤#,##0.00',
                'accounting': '¤#,##0.00;(¤#,##0.00)'
            }
        }
    };
    IntlBase.monthIndex = {
        3: 'abbreviated',
        4: 'wide',
        5: 'narrow',
        1: 'abbreviated'
    };
    IntlBase.month = 'months';
    IntlBase.days = 'days';
    IntlBase.patternMatcher = {
        C: 'currency',
        P: 'percent',
        N: 'decimal',
        A: 'currency'
    };
    function getResultantPattern(skeleton, dateObject, type) {
        var resPattern;
        var iType = type || 'date';
        if (IntlBase.basicPatterns.indexOf(skeleton) !== -1) {
            resPattern = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(iType + 'Formats.' + skeleton, dateObject);
            if (iType === 'dateTime') {
                var dPattern = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('dateFormats.' + skeleton, dateObject);
                var tPattern = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('timeFormats.' + skeleton, dateObject);
                resPattern = resPattern.replace('{1}', dPattern).replace('{0}', tPattern);
            }
        }
        else {
            resPattern = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('dateTimeFormats.availableFormats.' + skeleton, dateObject);
        }
        return resPattern;
    }
    IntlBase.getResultantPattern = getResultantPattern;
    function getDependables(cldr, culture, isNumber) {
        var ret = {};
        ret.parserObject = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getMainObject(cldr, culture) || IntlBase.defaultObject;
        if (isNumber) {
            ret.numericObject = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('numbers', ret.parserObject);
        }
        else {
            ret.dateObject = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('dates.calendars.gregorian', ret.parserObject);
        }
        return ret;
    }
    IntlBase.getDependables = getDependables;
    function getSymbolPattern(type, numSystem, obj, isAccount) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(type + 'Formats-numberSystem-' +
            numSystem + (isAccount ? '.accounting' : '.standard'), obj) || (isAccount ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(type + 'Formats-numberSystem-' +
            numSystem + '.standard', obj) : '');
    }
    IntlBase.getSymbolPattern = getSymbolPattern;
    function getProperNumericSkeleton(skeleton) {
        var matches = skeleton.match(IntlBase.formatRegex);
        var ret = {};
        var pattern = matches[1].toUpperCase();
        ret.isAccount = (pattern === 'A');
        ret.type = IntlBase.patternMatcher[pattern];
        if (skeleton.length > 1) {
            ret.fractionDigits = parseInt(matches[2], 10);
        }
        return ret;
    }
    IntlBase.getProperNumericSkeleton = getProperNumericSkeleton;
    function getFormatData(pattern, needFraction, cSymbol, fractionOnly) {
        var nData = fractionOnly ? {} : { nlead: '', nend: '' };
        var match = pattern.match(IntlBase.customRegex);
        if (match) {
            if (!fractionOnly) {
                nData.nlead = changeCurrencySymbol(match[1], cSymbol);
                nData.nend = changeCurrencySymbol(match[10], cSymbol);
                nData.groupPattern = match[4];
            }
            var fraction = match[7];
            if (fraction && needFraction) {
                var fmatch = fraction.match(fractionRegex);
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(fmatch)) {
                    nData.minimumFraction = fmatch.length;
                }
                else {
                    nData.minimumFraction = 0;
                }
                nData.maximumFraction = fraction.length - 1;
            }
        }
        return nData;
    }
    IntlBase.getFormatData = getFormatData;
    function changeCurrencySymbol(val, sym) {
        if (val) {
            return val.replace(IntlBase.defaultCurrency, sym);
        }
        return '';
    }
    function getCurrencySymbol(numericObject, currencyCode) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('currencies.' + currencyCode + '.symbol', numericObject) || '$';
    }
    IntlBase.getCurrencySymbol = getCurrencySymbol;
    function customFormat(format, dOptions, obj) {
        var options = {};
        var formatSplit = format.split(';');
        var data = ['pData', 'nData', 'zeroData'];
        for (var i = 0; i < formatSplit.length; i++) {
            options[data[i]] = customNumberFormat(formatSplit[i], dOptions, obj);
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(options.nData)) {
            options.nData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])({}, options.pData);
            options.nData.nlead = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(dOptions) ? '-' + options.nData.nlead : dOptions.minusSymbol + options.nData.nlead;
        }
        return options;
    }
    IntlBase.customFormat = customFormat;
    function customNumberFormat(format, dOptions, numObject) {
        var cOptions = { type: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 };
        var pattern = format.match(IntlBase.customRegex);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(pattern) || pattern[5] === '') {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["i" /* throwError */])('Given Format is not valid or Cldr data not loaded');
        }
        cOptions.nlead = pattern[1];
        cOptions.nend = pattern[10];
        var integerPart = pattern[6];
        cOptions.useGrouping = integerPart.indexOf(',') !== -1;
        integerPart = integerPart.replace(/,/g, '');
        var fractionPart = pattern[7];
        if (integerPart.indexOf('0') !== -1) {
            cOptions.minimumIntegerDigits = integerPart.length - integerPart.indexOf('0');
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(fractionPart)) {
            cOptions.minimumFractionDigits = fractionPart.lastIndexOf('0');
            cOptions.maximumFractionDigits = fractionPart.lastIndexOf('#');
            if (cOptions.minimumFractionDigits === -1) {
                cOptions.minimumFractionDigits = 0;
            }
            if (cOptions.maximumFractionDigits === -1 || cOptions.maximumFractionDigits < cOptions.minimumFractionDigits) {
                cOptions.maximumFractionDigits = cOptions.minimumFractionDigits;
            }
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(dOptions)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '$', dOptions.currencySymbol));
            if (!cOptions.isCurrency) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '%', dOptions.percentSymbol));
            }
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '%', '%'));
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(numObject)) {
            var symbolPattern = getSymbolPattern(cOptions.type, dOptions.numberMapper.numberSystem, numObject, false);
            if (cOptions.useGrouping) {
                cOptions.groupSeparator = dOptions.numberMapper.numberSymbols[mapper[2]];
                cOptions.groupData = __WEBPACK_IMPORTED_MODULE_2__number_formatter__["a" /* NumberFormat */].getGroupingDetails(symbolPattern.split(';')[0]);
            }
            cOptions.nlead = cOptions.nlead.replace(/\'/g, '');
            cOptions.nend = cOptions.nend.replace(/\'/g, '');
        }
        return cOptions;
    }
    function isCurrencyPercent(parts, actual, symbol) {
        var options = { nlead: parts[0], nend: parts[1] };
        for (var i = 0; i < 2; i++) {
            var part = parts[i];
            var loc = part.indexOf(actual);
            if ((loc !== -1) && ((loc < part.indexOf('\'')) || (loc > part.lastIndexOf('\'')))) {
                options[typeMapper[i]] = part.substr(0, loc) + symbol + part.substr(loc + 1);
                options[typeMapper[actual]] = true;
                options.type = options.isCurrency ? 'currency' : 'percent';
                break;
            }
        }
        return options;
    }
    IntlBase.isCurrencyPercent = isCurrencyPercent;
    function getDateSeparator(dateObj) {
        var value = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('dateFormats.short', dateObj) || '').match(/[d‏M‏]([^d‏M])[d‏M‏]/i);
        return value ? value[1] : '/';
    }
    IntlBase.getDateSeparator = getDateSeparator;
})(IntlBase || (IntlBase = {}));


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParserBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
var defaultNumberingSystem = {
    'latn': {
        '_digits': '0123456789',
        '_type': 'numeric'
    }
};

var latnRegex = /^[0-9]*$/;
var defaultNumberSymbols = {
    'decimal': '.',
    'group': ',',
    'percentSign': '%',
    'plusSign': '+',
    'minusSign': '-',
    'infinity': '∞',
    'nan': 'NaN',
    'exponential': 'E'
};
var latnNumberSystem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var ParserBase = (function () {
    function ParserBase() {
    }
    ParserBase.getMainObject = function (obj, cName) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('main.' + cName, obj);
    };
    ParserBase.getNumberingSystem = function (obj) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('supplemental.numberingSystems', obj) || this.numberingSystems;
    };
    ParserBase.reverseObject = function (prop, keys) {
        var propKeys = keys || Object.keys(prop);
        var res = {};
        for (var _i = 0, propKeys_1 = propKeys; _i < propKeys_1.length; _i++) {
            var key = propKeys_1[_i];
            res[prop[key]] = key;
        }
        return res;
    };
    ParserBase.getSymbolRegex = function (props) {
        var regexStr = props.map(function (str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
        }).join('|');
        return new RegExp(regexStr, 'g');
    };
    ParserBase.getSymbolMatch = function (prop) {
        var matchKeys = Object.keys(defaultNumberSymbols);
        var ret = {};
        for (var _i = 0, matchKeys_1 = matchKeys; _i < matchKeys_1.length; _i++) {
            var key = matchKeys_1[_i];
            ret[prop[key]] = defaultNumberSymbols[key];
        }
        return ret;
    };
    ParserBase.constructRegex = function (val) {
        var len = val.length;
        var ret = '';
        for (var i = 0; i < len; i++) {
            if (i !== len - 1) {
                ret += val[i] + '|';
            }
            else {
                ret += val[i];
            }
        }
        return ret;
    };
    ParserBase.convertValueParts = function (value, regex, obj) {
        return value.replace(regex, function (str) {
            return obj[str];
        });
    };
    ParserBase.getDefaultNumberingSystem = function (obj) {
        var ret = {};
        ret.obj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('numbers', obj);
        ret.nSystem = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('defaultNumberingSystem', ret.obj);
        return ret;
    };
    ParserBase.getCurrentNumericOptions = function (curObj, numberSystem, needSymbols) {
        var ret = {};
        var cur = this.getDefaultNumberingSystem(curObj);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(cur.nSystem)) {
            var digits = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(cur.nSystem + '._digits', numberSystem);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(digits)) {
                ret.numericPair = this.reverseObject(digits, latnNumberSystem);
                ret.numberParseRegex = new RegExp(this.constructRegex(digits), 'g');
                ret.numericRegex = '[' + digits[0] + '-' + digits[9] + ']';
                if (needSymbols) {
                    ret.numericRegex = digits[0] + '-' + digits[9];
                    ret.symbolNumberSystem = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('symbols-numberSystem-' + cur.nSystem, cur.obj);
                    ret.symbolMatch = this.getSymbolMatch(ret.symbolNumberSystem);
                    ret.numberSystem = cur.nSystem;
                }
            }
        }
        return ret;
    };
    ParserBase.getNumberMapper = function (curObj, numberSystem, isNumber) {
        var ret = { mapper: {} };
        var cur = this.getDefaultNumberingSystem(curObj);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(cur.nSystem)) {
            ret.numberSystem = cur.nSystem;
            ret.numberSymbols = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('symbols-numberSystem-' + cur.nSystem, cur.obj);
            ret.timeSeparator = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('timeSeparator', ret.numberSymbols);
            var digits = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(cur.nSystem + '._digits', numberSystem);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(digits)) {
                for (var _i = 0, latnNumberSystem_1 = latnNumberSystem; _i < latnNumberSystem_1.length; _i++) {
                    var i = latnNumberSystem_1[_i];
                    ret.mapper[i] = digits[i];
                }
            }
        }
        return ret;
    };
    return ParserBase;
}());

ParserBase.nPair = 'numericPair';
ParserBase.nRegex = 'numericRegex';
ParserBase.numberingSystems = defaultNumberingSystem;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Browser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

var REGX_MOBILE = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;
var REGX_IE = /msie|trident/i;
var REGX_IE11 = /Trident\/7\./;
var REGX_IOS = /(ipad|iphone|ipod touch)/i;
var REGX_IOS7 = /(ipad|iphone|ipod touch);.*os 7_\d|(ipad|iphone|ipod touch);.*os 8_\d/i;
var REGX_ANDROID = /android/i;
var REGX_WINDOWS = /trident|windows phone|edge/i;
var REGX_VERSION = /(version)[ \/]([\w.]+)/i;
var REGX_BROWSER = {
    OPERA: /(opera|opr)(?:.*version|)[ \/]([\w.]+)/i,
    EDGE: /(edge)(?:.*version|)[ \/]([\w.]+)/i,
    CHROME: /(chrome)[ \/]([\w.]+)/i,
    PANTHOMEJS: /(phantomjs)[ \/]([\w.]+)/i,
    SAFARI: /(safari)[ \/]([\w.]+)/i,
    WEBKIT: /(webkit)[ \/]([\w.]+)/i,
    MSIE: /(msie|trident) ([\w.]+)/i,
    MOZILLA: /(mozilla)(?:.*? rv:([\w.]+)|)/i
};
window.browserDetails = window.browserDetails || {};
var Browser = (function () {
    function Browser() {
    }
    Browser.extractBrowserDetail = function () {
        var browserInfo = { culture: {} };
        var keys = Object.keys(REGX_BROWSER);
        var clientInfo = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            clientInfo = Browser.userAgent.match(REGX_BROWSER[key]);
            if (clientInfo) {
                browserInfo.name = (clientInfo[1].toLowerCase() === 'opr' ? 'opera' : clientInfo[1].toLowerCase());
                browserInfo.version = clientInfo[2];
                browserInfo.culture.name = browserInfo.culture.language = navigator.language;
                if (!!Browser.userAgent.match(REGX_IE11)) {
                    browserInfo.name = 'msie';
                    break;
                }
                if (browserInfo.name === 'safari') {
                    browserInfo.version = Browser.userAgent.match(REGX_VERSION)[2];
                }
                break;
            }
        }
        return browserInfo;
    };
    Browser.getEvent = function (event) {
        var events = {
            start: {
                isPointer: 'pointerdown', isTouch: 'touchstart', isDevice: 'mousedown'
            },
            move: {
                isPointer: 'pointermove', isTouch: 'touchmove', isDevice: 'mousemove'
            },
            end: {
                isPointer: 'pointerup', isTouch: 'touchend', isDevice: 'mouseup'
            }
        };
        return (Browser.isPointer ? events[event].isPointer :
            (Browser.isTouch ? events[event].isTouch + (!Browser.isDevice ? ' ' + events[event].isDevice : '')
                : events[event].isDevice));
    };
    Browser.getTouchStartEvent = function () {
        return Browser.getEvent('start');
    };
    Browser.getTouchEndEvent = function () {
        return Browser.getEvent('end');
    };
    Browser.getTouchMoveEvent = function () {
        return Browser.getEvent('move');
    };
    Browser.getValue = function (key, regX) {
        var browserDetails = window.browserDetails;
        if ('undefined' === typeof browserDetails[key]) {
            return browserDetails[key] = regX.test(Browser.userAgent);
        }
        return browserDetails[key];
    };
    Object.defineProperty(Browser, "userAgent", {
        get: function () {
            return Browser.uA;
        },
        set: function (uA) {
            Browser.uA = uA;
            window.browserDetails = {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "info", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.info)) {
                return window.browserDetails.info = Browser.extractBrowserDetail();
            }
            return window.browserDetails.info;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isIE", {
        get: function () {
            return Browser.getValue('isIE', REGX_IE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isTouch", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.isTouch)) {
                return window.browserDetails.isTouch = ('ontouchstart' in window);
            }
            return window.browserDetails.isTouch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isPointer", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.isPointer)) {
                return window.browserDetails.isPointer = ('pointerEnabled' in window.navigator);
            }
            return window.browserDetails.isPointer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isMSPointer", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.isMSPointer)) {
                return window.browserDetails.isMSPointer = ('msPointerEnabled' in window.navigator);
            }
            return window.browserDetails.isMSPointer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isDevice", {
        get: function () {
            return Browser.getValue('isDevice', REGX_MOBILE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isIos", {
        get: function () {
            return Browser.getValue('isIos', REGX_IOS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isIos7", {
        get: function () {
            return Browser.getValue('isIos7', REGX_IOS7);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isAndroid", {
        get: function () {
            return Browser.getValue('isAndroid', REGX_ANDROID);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isWebView", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.isWebView)) {
                window.browserDetails.isWebView = !(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.cordova) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.PhoneGap)
                    && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.phonegap) && window.forge !== 'object');
                return window.browserDetails.isWebView;
            }
            return window.browserDetails.isWebView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isWindows", {
        get: function () {
            return Browser.getValue('isWindows', REGX_WINDOWS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "touchStartEvent", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.touchStartEvent)) {
                return window.browserDetails.touchStartEvent = Browser.getTouchStartEvent();
            }
            return window.browserDetails.touchStartEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "touchMoveEvent", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.touchMoveEvent)) {
                return window.browserDetails.touchMoveEvent = Browser.getTouchMoveEvent();
            }
            return window.browserDetails.touchMoveEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "touchEndEvent", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.touchEndEvent)) {
                return window.browserDetails.touchEndEvent = Browser.getTouchEndEvent();
            }
            return window.browserDetails.touchEndEvent;
        },
        enumerable: true,
        configurable: true
    });
    return Browser;
}());

Browser.uA = navigator.userAgent;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChildProperty; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(1);


var ChildProperty = (function () {
    function ChildProperty(parent, propName, defaultValue, isArray) {
        this.properties = {};
        this.changedProperties = {};
        this.childChangedProperties = {};
        this.oldProperties = {};
        this.finalUpdate = function () { };
        this.callChildDataBind = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('callChildDataBind', __WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */]);
        this.parentObj = parent;
        this.controlParent = this.parentObj.controlParent || this.parentObj;
        this.propName = propName;
        this.setProperties(defaultValue, true);
        this.isParentArray = isArray;
    }
    ChildProperty.prototype.updateChange = function (val, propName) {
        if (val === true) {
            this.parentObj.childChangedProperties[propName] = val;
        }
        else {
            delete this.parentObj.childChangedProperties[propName];
        }
        if (this.parentObj.updateChange) {
            this.parentObj.updateChange(val, this.parentObj.propName);
        }
    };
    ChildProperty.prototype.updateTimeOut = function () {
        if (this.parentObj.updateTimeOut) {
            this.parentObj.finalUpdate();
            this.parentObj.updateTimeOut();
        }
        else {
            this.parentObj.finalUpdate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["l" /* setImmediate */])(this.parentObj.dataBind.bind(this.parentObj));
        }
    };
    ChildProperty.prototype.clearChanges = function () {
        this.finalUpdate();
        this.updateChange(false, this.propName);
        this.oldProperties = {};
        this.changedProperties = {};
    };
    ChildProperty.prototype.setProperties = function (prop, muteOnChange) {
        if (muteOnChange === true) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(this, prop);
            this.updateChange(false, this.propName);
            this.clearChanges();
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(this, prop);
        }
    };
    ChildProperty.prototype.dataBind = function () {
        this.callChildDataBind(this.childChangedProperties, this);
        if (this.isParentArray) {
            var curIndex = this.parentObj[this.propName].indexOf(this);
            if (Object.keys(this.changedProperties).length) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])(this.propName + '.' + curIndex, this.changedProperties, this.parentObj.changedProperties);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])(this.propName + '.' + curIndex, this.oldProperties, this.parentObj.oldProperties);
            }
        }
        else {
            this.parentObj.changedProperties[this.propName] = this.changedProperties;
            this.parentObj.oldProperties[this.propName] = this.oldProperties;
        }
        this.clearChanges();
    };
    ChildProperty.prototype.saveChanges = function (key, newValue, oldValue) {
        if (this.controlParent.isProtectedOnChange) {
            return;
        }
        this.oldProperties[key] = oldValue;
        this.changedProperties[key] = newValue;
        this.updateChange(true, this.propName);
        this.finalUpdate();
        this.updateTimeOut();
    };
    return ChildProperty;
}());



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return onIntlChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rightToLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return cldrData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return defaultCulture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return defaultCurrencyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Internationalization; });
/* harmony export (immutable) */ __webpack_exports__["g"] = setCulture;
/* harmony export (immutable) */ __webpack_exports__["h"] = setCurrencyCode;
/* harmony export (immutable) */ __webpack_exports__["i"] = loadCldr;
/* harmony export (immutable) */ __webpack_exports__["j"] = enableRtl;
/* harmony export (immutable) */ __webpack_exports__["k"] = getNumericObject;
/* harmony export (immutable) */ __webpack_exports__["l"] = getDefaultDateObject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Internationalization_date_formatter__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Internationalization_number_formatter__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Internationalization_date_parser__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Internationalization_number_parser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__observer__ = __webpack_require__(12);







var onIntlChange = new __WEBPACK_IMPORTED_MODULE_6__observer__["a" /* Observer */]();
var rightToLeft = false;
var cldrData = {};
var defaultCulture = 'en-US';
var defaultCurrencyCode = 'USD';
var mapper = ['numericObject', 'dateObject'];
var Internationalization = (function () {
    function Internationalization(cultureName) {
        if (cultureName) {
            this.culture = cultureName;
        }
    }
    Internationalization.prototype.getDateFormat = function (options) {
        return __WEBPACK_IMPORTED_MODULE_0__Internationalization_date_formatter__["a" /* DateFormat */].dateFormat(this.getCulture(), options || { type: 'date', skeleton: 'short' }, cldrData);
    };
    Internationalization.prototype.getNumberFormat = function (options) {
        if (options && !options.currency) {
            options.currency = defaultCurrencyCode;
        }
        return __WEBPACK_IMPORTED_MODULE_1__Internationalization_number_formatter__["a" /* NumberFormat */].numberFormatter(this.getCulture(), options || {}, cldrData);
    };
    Internationalization.prototype.getDateParser = function (options) {
        return __WEBPACK_IMPORTED_MODULE_2__Internationalization_date_parser__["a" /* DateParser */].dateParser(this.getCulture(), options || { skeleton: 'short', type: 'date' }, cldrData);
    };
    Internationalization.prototype.getNumberParser = function (options) {
        return __WEBPACK_IMPORTED_MODULE_3__Internationalization_number_parser__["a" /* NumberParser */].numberParser(this.getCulture(), options || { format: 'N' }, cldrData);
    };
    Internationalization.prototype.formatNumber = function (value, option) {
        return this.getNumberFormat(option)(value);
    };
    Internationalization.prototype.formatDate = function (value, option) {
        return this.getDateFormat(option)(value);
    };
    Internationalization.prototype.parseDate = function (value, option) {
        return this.getDateParser(option)(value);
    };
    Internationalization.prototype.parseNumber = function (value, option) {
        return this.getNumberParser(option)(value);
    };
    Internationalization.prototype.getCulture = function () {
        return this.culture || defaultCulture;
    };
    return Internationalization;
}());

function setCulture(cultureName) {
    defaultCulture = cultureName;
    onIntlChange.notify('notifyExternalChange', { 'locale': defaultCulture });
}
function setCurrencyCode(currencyCode) {
    defaultCurrencyCode = currencyCode;
}
function loadCldr() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
        var obj = data_1[_a];
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["a" /* extend */])(cldrData, obj, {}, true);
    }
}
function enableRtl(status) {
    if (status === void 0) { status = true; }
    rightToLeft = status;
    onIntlChange.notify('notifyExternalChange', { enableRtl: rightToLeft });
}
function getNumericObject(locale, type) {
    var numObject = __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getDependables(cldrData, locale, true)[mapper[0]];
    var dateObject = __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getDependables(cldrData, locale)[mapper[1]];
    var numSystem = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["f" /* getValue */])('defaultNumberingSystem', numObject);
    var symbPattern = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["f" /* getValue */])('symbols-numberSystem-' + numSystem, numObject);
    var pattern = __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getSymbolPattern(type || 'decimal', numSystem, numObject, false);
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["a" /* extend */])(symbPattern, __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getFormatData(pattern, true, '', true), { 'dateSeparator': __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getDateSeparator(dateObject) });
}
function getDefaultDateObject() {
    return __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getDependables(cldrData, '', false)[mapper[1]];
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Query = (function () {
        function Query(from) {
            this.subQuery = null;
            this.isChild = false;
            this.queries = [];
            this.key = '';
            this.fKey = '';
            if (typeof from === 'string') {
                this.fromTable = from;
            }
            else if (from && from instanceof Array) {
                this.lookups = from;
            }
            this.expands = [];
            this.sortedColumns = [];
            this.groupedColumns = [];
            this.subQuery = null;
            this.isChild = false;
            this.params = [];
            return this;
        }
        Query.prototype.setKey = function (field) {
            this.key = field;
            return this;
        };
        Query.prototype.using = function (dataManager) {
            this.dataManager = dataManager;
            return this;
        };
        Query.prototype.execute = function (dataManager, done, fail, always) {
            dataManager = dataManager || this.dataManager;
            if (dataManager) {
                return dataManager.executeQuery(this, done, fail, always);
            }
            return util_1.DataUtil.throwError('Query - execute() : dataManager needs to be is set using "using" function or should be passed as argument');
        };
        Query.prototype.executeLocal = function (dataManager) {
            dataManager = dataManager || this.dataManager;
            if (dataManager) {
                return dataManager.executeLocal(this);
            }
            return util_1.DataUtil.throwError('Query - executeLocal() : dataManager needs to be is set using "using" function or should be passed as argument');
        };
        Query.prototype.clone = function () {
            var cloned = new Query();
            cloned.queries = this.queries.slice(0);
            cloned.key = this.key;
            cloned.isChild = this.isChild;
            cloned.dataManager = this.dataManager;
            cloned.fromTable = this.fromTable;
            cloned.params = this.params.slice(0);
            cloned.expands = this.expands.slice(0);
            cloned.sortedColumns = this.sortedColumns.slice(0);
            cloned.groupedColumns = this.groupedColumns.slice(0);
            cloned.subQuerySelector = this.subQuerySelector;
            cloned.subQuery = this.subQuery;
            cloned.fKey = this.fKey;
            cloned.requiresCounts = this.requiresCounts;
            return cloned;
        };
        Query.prototype.from = function (tableName) {
            this.fromTable = tableName;
            return this;
        };
        Query.prototype.addParams = function (key, value) {
            if (typeof value === 'function') {
                this.params.push({ key: key, fn: value });
            }
            else {
                this.params.push({ key: key, value: value });
            }
            return this;
        };
        Query.prototype.expand = function (tables) {
            if (typeof tables === 'string') {
                this.expands = [].slice.call([tables], 0);
            }
            else {
                this.expands = tables.slice(0);
            }
            return this;
        };
        Query.prototype.where = function (fieldName, operator, value, ignoreCase) {
            operator = operator ? (operator).toLowerCase() : null;
            var predicate = null;
            if (typeof fieldName === 'string') {
                predicate = new Predicate(fieldName, operator, value, ignoreCase);
            }
            else if (fieldName instanceof Predicate) {
                predicate = fieldName;
            }
            this.queries.push({
                fn: 'onWhere',
                e: predicate
            });
            return this;
        };
        Query.prototype.search = function (searchKey, fieldNames, operator, ignoreCase) {
            if (typeof fieldNames === 'string') {
                fieldNames = [fieldNames];
            }
            operator = operator || 'contains';
            var comparer = util_1.DataUtil.fnOperators[operator];
            this.queries.push({
                fn: 'onSearch',
                e: {
                    fieldNames: fieldNames,
                    operator: operator,
                    searchKey: searchKey,
                    ignoreCase: ignoreCase,
                    comparer: comparer
                }
            });
            return this;
        };
        Query.prototype.sortBy = function (fieldName, comparer, isFromGroup) {
            var order = 'ascending';
            var sorts;
            var temp;
            if (typeof fieldName === 'string' && util_1.DataUtil.endsWith(fieldName.toLowerCase(), ' desc')) {
                fieldName = fieldName.replace(/ desc$/i, '');
                comparer = 'descending';
            }
            if (!comparer || typeof comparer === 'string') {
                order = comparer ? comparer.toLowerCase() : 'ascending';
                comparer = util_1.DataUtil.fnSort(comparer);
            }
            if (isFromGroup) {
                sorts = Query.filterQueries(this.queries, 'onSortBy');
                for (var i = 0; i < sorts.length; i++) {
                    temp = sorts[i].e.fieldName;
                    if (typeof temp === 'string') {
                        if (temp === fieldName) {
                            return this;
                        }
                    }
                    else if (temp instanceof Array) {
                        for (var j = 0; j < temp.length; j++) {
                            if (temp[j] === fieldName || fieldName.toLowerCase() === temp[j] + ' desc') {
                                return this;
                            }
                        }
                    }
                }
            }
            this.queries.push({
                fn: 'onSortBy',
                e: {
                    fieldName: fieldName,
                    comparer: comparer,
                    direction: order
                }
            });
            return this;
        };
        Query.prototype.sortByDesc = function (fieldName) {
            return this.sortBy(fieldName, 'descending');
        };
        Query.prototype.group = function (fieldName) {
            this.sortBy(fieldName, null, true);
            this.queries.push({
                fn: 'onGroup',
                e: {
                    fieldName: fieldName
                }
            });
            return this;
        };
        Query.prototype.page = function (pageIndex, pageSize) {
            this.queries.push({
                fn: 'onPage',
                e: {
                    pageIndex: pageIndex,
                    pageSize: pageSize
                }
            });
            return this;
        };
        Query.prototype.range = function (start, end) {
            this.queries.push({
                fn: 'onRange',
                e: {
                    start: start,
                    end: end
                }
            });
            return this;
        };
        Query.prototype.take = function (nos) {
            this.queries.push({
                fn: 'onTake',
                e: {
                    nos: nos
                }
            });
            return this;
        };
        Query.prototype.skip = function (nos) {
            this.queries.push({
                fn: 'onSkip',
                e: { nos: nos }
            });
            return this;
        };
        Query.prototype.select = function (fieldNames) {
            if (typeof fieldNames === 'string') {
                fieldNames = [].slice.call([fieldNames], 0);
            }
            this.queries.push({
                fn: 'onSelect',
                e: { fieldNames: fieldNames }
            });
            return this;
        };
        Query.prototype.hierarchy = function (query, selectorFn) {
            this.subQuerySelector = selectorFn;
            this.subQuery = query;
            return this;
        };
        Query.prototype.foreignKey = function (key) {
            this.fKey = key;
            return this;
        };
        Query.prototype.requiresCount = function () {
            this.requiresCounts = true;
            return this;
        };
        Query.prototype.aggregate = function (type, field) {
            this.queries.push({
                fn: 'onAggregates',
                e: { field: field, type: type }
            });
            return this;
        };
        Query.filterQueries = function (queries, name) {
            return queries.filter(function (q) {
                return q.fn === name;
            });
        };
        Query.filterQueryLists = function (queries, singles) {
            var filtered = queries.filter(function (q) {
                return singles.indexOf(q.fn) !== -1;
            });
            var res = {};
            for (var i = 0; i < filtered.length; i++) {
                if (!res[filtered[i].fn]) {
                    res[filtered[i].fn] = filtered[i].e;
                }
            }
            return res;
        };
        return Query;
    }());
    exports.Query = Query;
    var Predicate = (function () {
        function Predicate(field, operator, value, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = false; }
            this.isComplex = false;
            if (typeof field === 'string') {
                this.field = field;
                this.operator = operator.toLowerCase();
                this.value = value;
                this.ignoreCase = ignoreCase;
                this.isComplex = false;
                this.comparer = util_1.DataUtil.fnOperators.processOperator(this.operator);
            }
            else if (field instanceof Predicate && value instanceof Predicate || value instanceof Array) {
                this.isComplex = true;
                this.condition = operator.toLowerCase();
                this.predicates = [field];
                if (value instanceof Array) {
                    [].push.apply(this.predicates, value);
                }
                else {
                    this.predicates.push(value);
                }
            }
            return this;
        }
        Predicate.and = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return Predicate.combinePredicates([].slice.call(args, 0), 'and');
        };
        Predicate.prototype.and = function (field, operator, value, ignoreCase) {
            return Predicate.combine(this, field, operator, value, 'and', ignoreCase);
        };
        Predicate.or = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return Predicate.combinePredicates([].slice.call(args, 0), 'or');
        };
        Predicate.prototype.or = function (field, operator, value, ignoreCase) {
            return Predicate.combine(this, field, operator, value, 'or', ignoreCase);
        };
        Predicate.fromJson = function (json) {
            if (json instanceof Array) {
                var res = [];
                for (var i = 0, len = json.length; i < len; i++) {
                    res.push(this.fromJSONData(json[i]));
                }
                return res;
            }
            var pred = json;
            return this.fromJSONData(pred);
        };
        Predicate.prototype.validate = function (record) {
            var predicate = this.predicates ? this.predicates : [];
            var isAnd;
            var ret;
            if (!this.isComplex && this.comparer) {
                return this.comparer.call(this, util_1.DataUtil.getObject(this.field, record), this.value, this.ignoreCase);
            }
            isAnd = this.condition === 'and';
            for (var i = 0; i < predicate.length; i++) {
                ret = predicate[i].validate(record);
                if (isAnd) {
                    if (!ret) {
                        return false;
                    }
                }
                else {
                    if (ret) {
                        return true;
                    }
                }
            }
            return isAnd;
        };
        Predicate.prototype.toJson = function () {
            var predicates;
            var p;
            if (this.isComplex) {
                predicates = [];
                p = this.predicates;
                for (var i = 0; i < p.length; i++) {
                    predicates.push(p[i].toJson());
                }
            }
            return {
                isComplex: this.isComplex,
                field: this.field,
                operator: this.operator,
                value: this.value,
                ignoreCase: this.ignoreCase,
                condition: this.condition,
                predicates: predicates
            };
        };
        Predicate.combinePredicates = function (predicates, operator) {
            if (predicates.length === 1) {
                if (!(predicates[0] instanceof Array)) {
                    return predicates[0];
                }
                predicates = predicates[0];
            }
            return new Predicate(predicates[0], operator, predicates.slice(1));
        };
        Predicate.combine = function (pred, field, operator, value, condition, ignoreCase) {
            if (field instanceof Predicate) {
                return Predicate[condition](pred, field);
            }
            if (typeof field === 'string') {
                return Predicate[condition](pred, new Predicate(field, operator, value, ignoreCase));
            }
            return util_1.DataUtil.throwError('Predicate - ' + condition + ' : invalid arguments');
        };
        Predicate.fromJSONData = function (json) {
            var preds = json.predicates || [];
            var len = preds.length;
            var predicates = [];
            var result;
            for (var i = 0; i < len; i++) {
                predicates.push(this.fromJSONData(preds[i]));
            }
            if (!json.isComplex) {
                result = new Predicate(json.field, json.operator, json.value, json.ignoreCase);
            }
            else {
                result = new Predicate(predicates[0], json.condition, predicates.slice(1));
            }
            return result;
        };
        return Predicate;
    }());
    exports.Predicate = Predicate;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(13), __webpack_require__(17), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1, manager_1, query_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var consts = { GroupGuid: '{271bbba0-1ee7}' };
    var DataUtil = (function () {
        function DataUtil() {
        }
        DataUtil.getValue = function (value, inst) {
            if (typeof value === 'function') {
                return value.call(inst || {});
            }
            return value;
        };
        DataUtil.endsWith = function (input, substr) {
            return input.slice(-substr.length) === substr;
        };
        DataUtil.startsWith = function (input, start) {
            return input.slice(0, start.length) === start;
        };
        DataUtil.fnSort = function (order) {
            order = order ? order.toLowerCase() : 'ascending';
            if (order === 'ascending') {
                return this.fnAscending;
            }
            return this.fnDescending;
        };
        DataUtil.fnAscending = function (x, y) {
            if (y === null || y === undefined) {
                return -1;
            }
            if (typeof x === 'string') {
                return x.localeCompare(y);
            }
            if (x === null || x === undefined) {
                return 1;
            }
            return x - y;
        };
        DataUtil.fnDescending = function (x, y) {
            if (y === null || y === undefined) {
                return 1;
            }
            if (typeof x === 'string') {
                return x.localeCompare(y) * -1;
            }
            if (x === null || x === undefined) {
                return -1;
            }
            return y - x;
        };
        DataUtil.extractFields = function (obj, fields) {
            var newObj = {};
            if (fields.length === 1) {
                return this.getObject(fields[0], obj);
            }
            for (var i = 0; i < fields.length; i++) {
                newObj[fields[i].replace('.', '_')] = this.getObject(fields[i], obj);
            }
            return newObj;
        };
        DataUtil.select = function (jsonArray, fields) {
            var newData = [];
            for (var i = 0; i < jsonArray.length; i++) {
                newData.push(this.extractFields(jsonArray[i], fields));
            }
            return newData;
        };
        DataUtil.group = function (jsonArray, field, aggregates, level, groupDs) {
            level = level || 1;
            var jsonData = jsonArray;
            var guid = 'GroupGuid';
            if (jsonData.GroupGuid === consts[guid]) {
                var _loop_1 = function (j) {
                    if (!util_1.isNullOrUndefined(groupDs)) {
                        var indx = -1;
                        var temp = groupDs.filter(function (e) { return e.key === jsonData[j].key; });
                        indx = groupDs.indexOf(temp[0]);
                        jsonData[j].items = this_1.group(jsonData[j].items, field, aggregates, jsonData.level + 1, groupDs[indx].items);
                        jsonData[j].count = groupDs[indx].count;
                    }
                    else {
                        jsonData[j].items = this_1.group(jsonData[j].items, field, aggregates, jsonData.level + 1);
                        jsonData[j].count = jsonData[j].items.length;
                    }
                };
                var this_1 = this;
                for (var j = 0; j < jsonData.length; j++) {
                    _loop_1(j);
                }
                jsonData.childLevels += 1;
                return jsonData;
            }
            var grouped = {};
            var groupedArray = [];
            groupedArray.GroupGuid = consts[guid];
            groupedArray.level = level;
            groupedArray.childLevels = 0;
            groupedArray.records = jsonData;
            var _loop_2 = function (i) {
                var val = this_2.getVal(jsonData, i, field);
                if (!grouped[val]) {
                    grouped[val] = {
                        key: val,
                        count: 0,
                        items: [],
                        aggregates: {},
                        field: field
                    };
                    groupedArray.push(grouped[val]);
                    if (!util_1.isNullOrUndefined(groupDs)) {
                        var tempObj = groupDs.filter(function (e) { return e.key === grouped[val].key; });
                        grouped[val].count = tempObj[0].count;
                    }
                }
                grouped[val].count = !util_1.isNullOrUndefined(groupDs) ? grouped[val].count : grouped[val].count += 1;
                grouped[val].items.push(jsonData[i]);
            };
            var this_2 = this;
            for (var i = 0; i < jsonData.length; i++) {
                _loop_2(i);
            }
            if (aggregates && aggregates.length) {
                var _loop_3 = function (i) {
                    var res = {};
                    var fn = void 0;
                    var aggs = aggregates;
                    for (var j = 0; j < aggregates.length; j++) {
                        fn = DataUtil.aggregates[aggregates[j].type];
                        if (!util_1.isNullOrUndefined(groupDs)) {
                            var temp = groupDs.filter(function (e) { return e.key === groupedArray[i].key; });
                            if (fn) {
                                res[aggs[j].field + ' - ' + aggs[j].type] = fn(temp[0].items, aggs[j].field);
                            }
                        }
                        else {
                            if (fn) {
                                res[aggs[j].field + ' - ' + aggs[j].type] = fn(groupedArray[i].items, aggs[j].field);
                            }
                        }
                    }
                    groupedArray[i].aggregates = res;
                };
                for (var i = 0; i < groupedArray.length; i++) {
                    _loop_3(i);
                }
            }
            return groupedArray;
        };
        DataUtil.buildHierarchy = function (fKey, from, source, lookup, pKey) {
            var i;
            var grp = {};
            var temp;
            if (lookup.result) {
                lookup = lookup.result;
            }
            if (lookup.GroupGuid) {
                this.throwError('DataManager: Do not have support Grouping in hierarchy');
            }
            for (i = 0; i < lookup.length; i++) {
                var fKeyData = this.getObject(fKey, lookup[i]);
                temp = grp[fKeyData] || (grp[fKeyData] = []);
                temp.push(lookup[i]);
            }
            for (i = 0; i < source.length; i++) {
                var fKeyData = this.getObject(pKey || fKey, source[i]);
                source[i][from] = grp[fKeyData];
            }
        };
        DataUtil.getFieldList = function (obj, fields, prefix) {
            if (prefix === undefined) {
                prefix = '';
            }
            if (fields === undefined || fields === null) {
                return this.getFieldList(obj, [], prefix);
            }
            var copyObj = obj;
            var keys = Object.keys(obj);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var prop = keys_1[_i];
                if (typeof copyObj[prop] === 'object' && !(copyObj[prop] instanceof Array)) {
                    this.getFieldList(copyObj[prop], fields, prefix + prop + '.');
                }
                else {
                    fields.push(prefix + prop);
                }
            }
            return fields;
        };
        DataUtil.getObject = function (nameSpace, from) {
            if (!nameSpace) {
                return from;
            }
            if (nameSpace.indexOf('.') === -1) {
                return from[nameSpace];
            }
            var value = from;
            var splits = nameSpace.split('.');
            for (var i = 0; i < splits.length; i++) {
                if (value == null) {
                    break;
                }
                value = value[splits[i]];
            }
            return value;
        };
        DataUtil.sort = function (ds, field, comparer) {
            if (ds.length <= 1) {
                return ds;
            }
            var middle = parseInt((ds.length / 2).toString(), 10);
            var left = ds.slice(0, middle);
            var right = ds.slice(middle);
            left = this.sort(left, field, comparer);
            right = this.sort(right, field, comparer);
            return this.merge(left, right, field, comparer);
        };
        DataUtil.merge = function (left, right, fieldName, comparer) {
            var result = [];
            var current;
            while (left.length > 0 || right.length > 0) {
                if (left.length > 0 && right.length > 0) {
                    if (comparer) {
                        current = comparer(this.getVal(left, 0, fieldName), this.getVal(right, 0, fieldName)) <= 0 ? left : right;
                    }
                    else {
                        current = left[0][fieldName] < left[0][fieldName] ? left : right;
                    }
                }
                else {
                    current = left.length > 0 ? left : right;
                }
                result.push(current.shift());
            }
            return result;
        };
        DataUtil.getVal = function (array, index, field) {
            return field ? this.getObject(field, array[index]) : array[index];
        };
        DataUtil.toLowerCase = function (val) {
            return val ? typeof val === 'string' ? val.toLowerCase() : val.toString() : (val === 0 || val === false) ? val.toString() : '';
        };
        DataUtil.callAdaptorFunction = function (adaptor, fnName, param1, param2) {
            if (fnName in adaptor) {
                var res = adaptor[fnName](param1, param2);
                if (!this.fnOperators.isnull(res)) {
                    param1 = res;
                }
            }
            return param1;
        };
        DataUtil.isPlainObject = function (obj) {
            return (!!obj) && (obj.constructor === Object);
        };
        DataUtil.isCors = function () {
            var xhr = null;
            var request = 'XMLHttpRequest';
            try {
                xhr = new window[request]();
            }
            catch (e) {
            }
            return !!xhr && ('withCredentials' in xhr);
        };
        DataUtil.getGuid = function (prefix) {
            var hexs = '0123456789abcdef';
            var rand;
            return (prefix || '') + '00000000-0000-4000-0000-000000000000'.replace(/0/g, function (val, i) {
                if ('crypto' in window && 'getRandomValues' in crypto) {
                    var arr = new Uint8Array(1);
                    window.crypto.getRandomValues(arr);
                    rand = arr[0] % 16 | 0;
                }
                else {
                    rand = Math.random() * 16 | 0;
                }
                return hexs[i === 19 ? rand & 0x3 | 0x8 : rand];
            });
        };
        DataUtil.isNull = function (val) {
            return val === undefined || val === null;
        };
        DataUtil.getItemFromComparer = function (array, field, comparer) {
            var keyVal;
            var current;
            var key;
            var i = 0;
            var castRequired = typeof DataUtil.getVal(array, 0, field) === 'string';
            if (array.length) {
                while (util_1.isNullOrUndefined(keyVal) && i < array.length) {
                    keyVal = DataUtil.getVal(array, i, field);
                    key = array[i++];
                }
            }
            for (; i < array.length; i++) {
                current = DataUtil.getVal(array, i, field);
                if (util_1.isNullOrUndefined(current)) {
                    continue;
                }
                if (castRequired) {
                    keyVal = +keyVal;
                    current = +current;
                }
                if (comparer(keyVal, current) > 0) {
                    keyVal = current;
                    key = array[i];
                }
            }
            return key;
        };
        return DataUtil;
    }());
    DataUtil.serverTimezoneOffset = 0;
    DataUtil.throwError = function (error) {
        try {
            throw new Error(error);
        }
        catch (e) {
            throw e.message + '\n' + e.stack;
        }
    };
    DataUtil.aggregates = {
        sum: function (ds, field) {
            var result = 0;
            var val;
            var castRequired = typeof DataUtil.getVal(ds, 0, field) !== 'number';
            for (var i = 0; i < ds.length; i++) {
                val = DataUtil.getVal(ds, i, field);
                if (!isNaN(val) && val !== null) {
                    if (castRequired) {
                        val = +val;
                    }
                    result += val;
                }
            }
            return result;
        },
        average: function (ds, field) {
            return DataUtil.aggregates.sum(ds, field) / ds.length;
        },
        min: function (ds, field) {
            var comparer;
            if (typeof field === 'function') {
                comparer = field;
                field = null;
            }
            return DataUtil.getObject(field, DataUtil.getItemFromComparer(ds, field, comparer || DataUtil.fnAscending));
        },
        max: function (ds, field) {
            var comparer;
            if (typeof field === 'function') {
                comparer = field;
                field = null;
            }
            return DataUtil.getObject(field, DataUtil.getItemFromComparer(ds, field, comparer || DataUtil.fnDescending));
        },
        truecount: function (ds, field) {
            return new manager_1.DataManager(ds).executeLocal(new query_1.Query().where(field, 'equal', true, true)).length;
        },
        falsecount: function (ds, field) {
            return new manager_1.DataManager(ds).executeLocal(new query_1.Query().where(field, 'equal', false, true)).length;
        },
        count: function (ds, field) {
            return ds.length;
        }
    };
    DataUtil.operatorSymbols = {
        '<': 'lessthan',
        '>': 'greaterthan',
        '<=': 'lessthanorequal',
        '>=': 'greaterthanorequal',
        '==': 'equal',
        '!=': 'notequal',
        '*=': 'contains',
        '$=': 'endswith',
        '^=': 'startswith'
    };
    DataUtil.odBiOperator = {
        '<': ' lt ',
        '>': ' gt ',
        '<=': ' le ',
        '>=': ' ge ',
        '==': ' eq ',
        '!=': ' ne ',
        'lessthan': ' lt ',
        'lessthanorequal': ' le ',
        'greaterthan': ' gt ',
        'greaterthanorequal': ' ge ',
        'equal': ' eq ',
        'notequal': ' ne '
    };
    DataUtil.odUniOperator = {
        '$=': 'endswith',
        '^=': 'startswith',
        '*=': 'substringof',
        'endswith': 'endswith',
        'startswith': 'startswith',
        'contains': 'substringof'
    };
    DataUtil.fnOperators = {
        equal: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return DataUtil.toLowerCase(actual) === DataUtil.toLowerCase(expected);
            }
            return actual === expected;
        },
        notequal: function (actual, expected, ignoreCase) {
            return !DataUtil.fnOperators.equal(actual, expected, ignoreCase);
        },
        lessthan: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return DataUtil.toLowerCase(actual) < DataUtil.toLowerCase(expected);
            }
            return actual < expected;
        },
        greaterthan: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return DataUtil.toLowerCase(actual) > DataUtil.toLowerCase(expected);
            }
            return actual > expected;
        },
        lessthanorequal: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return DataUtil.toLowerCase(actual) <= DataUtil.toLowerCase(expected);
            }
            return actual <= expected;
        },
        greaterthanorequal: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return DataUtil.toLowerCase(actual) >= DataUtil.toLowerCase(expected);
            }
            return actual >= expected;
        },
        contains: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return !util_1.isNullOrUndefined(actual) && !util_1.isNullOrUndefined(expected) &&
                    DataUtil.toLowerCase(actual).indexOf(DataUtil.toLowerCase(expected)) !== -1;
            }
            return !util_1.isNullOrUndefined(actual) && !util_1.isNullOrUndefined(expected) &&
                actual.toString().indexOf(expected) !== -1;
        },
        notnull: function (actual) {
            return actual !== null;
        },
        isnull: function (actual) {
            return actual === null;
        },
        startswith: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return actual && expected && DataUtil.startsWith(actual.toLowerCase(), expected.toLowerCase());
            }
            return actual && expected && DataUtil.startsWith(actual, expected);
        },
        endswith: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return actual && expected && DataUtil.endsWith(actual.toLowerCase(), expected.toLowerCase());
            }
            return actual && expected && DataUtil.endsWith(actual, expected);
        },
        processSymbols: function (operator) {
            var fnName = DataUtil.operatorSymbols[operator];
            if (fnName) {
                var fn = DataUtil.fnOperators[fnName];
                return fn;
            }
            return DataUtil.throwError('Query - Process Operator : Invalid operator');
        },
        processOperator: function (operator) {
            var fn = DataUtil.fnOperators[operator];
            if (fn) {
                return fn;
            }
            return DataUtil.fnOperators.processSymbols(operator);
        }
    };
    DataUtil.parse = {
        parseJson: function (jsonText) {
            if (typeof jsonText === 'string') {
                jsonText = JSON.parse(jsonText, DataUtil.parse.jsonReviver);
            }
            else if (jsonText instanceof Array) {
                DataUtil.parse.iterateAndReviveArray(jsonText);
            }
            else if (typeof jsonText === 'object') {
                DataUtil.parse.iterateAndReviveJson(jsonText);
            }
            return jsonText;
        },
        iterateAndReviveArray: function (array) {
            for (var i = 0; i < array.length; i++) {
                if (typeof array[i] === 'object') {
                    DataUtil.parse.iterateAndReviveJson(array[i]);
                }
                else if (typeof array[i] === 'string' && !/^[\s]*\[|^[\s]*\{|\"/g.test(array[i])) {
                    array[i] = DataUtil.parse.jsonReviver('', array[i]);
                }
                else {
                    array[i] = DataUtil.parse.parseJson(array[i]);
                }
            }
        },
        iterateAndReviveJson: function (json) {
            var value;
            var keys = Object.keys(json);
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var prop = keys_2[_i];
                if (DataUtil.startsWith(prop, '__')) {
                    continue;
                }
                value = json[prop];
                if (typeof value === 'object') {
                    if (value instanceof Array) {
                        DataUtil.parse.iterateAndReviveArray(value);
                    }
                    else if (value) {
                        DataUtil.parse.iterateAndReviveJson(value);
                    }
                }
                else {
                    json[prop] = DataUtil.parse.jsonReviver(json[prop], value);
                }
            }
        },
        jsonReviver: function (field, value) {
            var dupValue = value;
            if (typeof value === 'string') {
                var ms = /^\/Date\(([+-]?[0-9]+)([+-][0-9]{4})?\)\/$/.exec(value);
                if (ms) {
                    return DataUtil.parse.jsonReplacer({ value: new Date(parseInt(ms[1], 10)) }, false).value;
                }
                else if (/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
                    var arr = dupValue.split(/[^0-9]/);
                    value = DataUtil.parse.jsonReplacer({ value: new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5], 10)) }, false).value;
                }
            }
            return value;
        },
        isJson: function (jsonData) {
            if (typeof jsonData[0] === 'string') {
                return jsonData;
            }
            return DataUtil.parse.parseJson(jsonData);
        },
        isGuid: function (value) {
            var regex = /[A-Fa-f0-9]{8}(?:-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}/i;
            var match = regex.exec(value);
            return match != null;
        },
        replacer: function (value) {
            if (DataUtil.isPlainObject(value)) {
                return DataUtil.parse.jsonReplacer(value);
            }
            if (value instanceof Array) {
                return DataUtil.parse.arrayReplacer(value);
            }
            if (value instanceof Date) {
                return DataUtil.parse.jsonReplacer({ val: value }).val;
            }
            return value;
        },
        jsonReplacer: function (val, stringify) {
            if (stringify === void 0) { stringify = true; }
            var value;
            var keys = Object.keys(val);
            for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
                var prop = keys_3[_i];
                value = val[prop];
                if (!(value instanceof Date)) {
                    continue;
                }
                var d = value;
                var unixstamp = +d - (d.getTimezoneOffset() * 60000);
                val[prop] = new Date(unixstamp - (DataUtil.serverTimezoneOffset * 3600000));
                if (stringify) {
                    val[prop] = val[prop].toJSON();
                }
            }
            return val;
        },
        arrayReplacer: function (val) {
            for (var i = 0; i < val.length; i++) {
                if (DataUtil.isPlainObject(val[i])) {
                    val[i] = DataUtil.parse.jsonReplacer(val[i]);
                }
                else if (val[i] instanceof Date) {
                    val[i] = DataUtil.parse.jsonReplacer({ date: val[i] }).date;
                }
            }
            return val;
        }
    };
    exports.DataUtil = DataUtil;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

var Observer = (function () {
    function Observer(context) {
        this.boundedEvents = {};
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(context)) {
            return;
        }
        this.context = context;
    }
    ;
    Observer.prototype.on = function (property, handler, context) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(handler)) {
            return;
        }
        var cntxt = context || this.context;
        if (this.notExist(property)) {
            this.boundedEvents[property] = [{ handler: handler, context: cntxt }];
            return;
        }
        if (!this.isHandlerPresent(this.boundedEvents[property], handler)) {
            this.boundedEvents[property].push({ handler: handler, context: cntxt });
        }
    };
    Observer.prototype.off = function (property, handler) {
        if (this.notExist(property)) {
            return;
        }
        var curObject = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(property, this.boundedEvents);
        if (handler) {
            for (var i = 0; i < curObject.length; i++) {
                if (handler === curObject[i].handler) {
                    curObject.splice(i, 1);
                    break;
                }
            }
        }
        else {
            delete this.boundedEvents[property];
        }
    };
    Observer.prototype.notify = function (property, argument) {
        if (this.notExist(property)) {
            return;
        }
        if (argument) {
            argument.name = property;
        }
        var curObject = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(property, this.boundedEvents).slice(0);
        for (var _i = 0, curObject_1 = curObject; _i < curObject_1.length; _i++) {
            var cur = curObject_1[_i];
            cur.handler.call(cur.context, argument);
        }
    };
    Observer.prototype.destroy = function () {
        this.boundedEvents = this.context = undefined;
    };
    Observer.prototype.notExist = function (prop) {
        return this.boundedEvents.hasOwnProperty(prop) === false;
    };
    Observer.prototype.isHandlerPresent = function (boundedEvents, handler) {
        for (var _i = 0, boundedEvents_1 = boundedEvents; _i < boundedEvents_1.length; _i++) {
            var cur = boundedEvents_1[_i];
            if (cur.handler === handler) {
                return true;
            }
        }
        return false;
    };
    return Observer;
}());



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(36)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(util_1);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberFormat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internationalization__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intl_base__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parser_base__ = __webpack_require__(6);




var errorText = {
    'ms': 'minimumSignificantDigits',
    'ls': 'maximumSignificantDigits',
    'mf': 'minimumFractionDigits',
    'lf': 'maximumFractionDigits',
};
var integerError = 'minimumIntegerDigits';
var percentSign = 'percentSign';
var minusSign = 'minusSign';
var spaceRegex = /\s/;
var mapper = ['infinity', 'nan', 'group', 'decimal'];
var infinity = 'infinity';
var nan = 'nan';
var NumberFormat = (function () {
    function NumberFormat() {
    }
    NumberFormat.numberFormatter = function (culture, option, cldr) {
        var _this = this;
        var fOptions = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])({}, option);
        var cOptions = {};
        var dOptions = {};
        var symbolPattern;
        var dependable = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getDependables(cldr, culture, true);
        dOptions.numberMapper = __WEBPACK_IMPORTED_MODULE_3__parser_base__["a" /* ParserBase */].getNumberMapper(dependable.parserObject, __WEBPACK_IMPORTED_MODULE_3__parser_base__["a" /* ParserBase */].getNumberingSystem(cldr), true);
        dOptions.currencySymbol = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getCurrencySymbol(dependable.numericObject, fOptions.currency || __WEBPACK_IMPORTED_MODULE_1__internationalization__["e" /* defaultCurrencyCode */]);
        dOptions.percentSymbol = dOptions.numberMapper.numberSymbols[percentSign];
        dOptions.minusSymbol = dOptions.numberMapper.numberSymbols[minusSign];
        var symbols = dOptions.numberMapper.numberSymbols;
        if ((option.format) && !(__WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].formatRegex.test(option.format))) {
            cOptions = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].customFormat(option.format, dOptions, dependable.numericObject);
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(fOptions, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getProperNumericSkeleton(option.format || 'N'));
            fOptions.isCurrency = fOptions.type === 'currency';
            fOptions.isPercent = fOptions.type === 'percent';
            symbolPattern = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getSymbolPattern(fOptions.type, dOptions.numberMapper.numberSystem, dependable.numericObject, fOptions.isAccount);
            fOptions.groupOne = this.checkValueRange(fOptions.maximumSignificantDigits, fOptions.minimumSignificantDigits, true);
            this.checkValueRange(fOptions.maximumFractionDigits, fOptions.minimumFractionDigits, false, true);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(fOptions.fractionDigits)) {
                fOptions.minimumFractionDigits = fOptions.maximumFractionDigits = fOptions.fractionDigits;
            }
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(fOptions.useGrouping)) {
                fOptions.useGrouping = true;
            }
            if (fOptions.isCurrency) {
                symbolPattern = symbolPattern.replace(/\u00A4/g, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].defaultCurrency);
            }
            var split = symbolPattern.split(';');
            cOptions.nData = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getFormatData(split[1] || '-' + split[0], true, dOptions.currencySymbol);
            cOptions.pData = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getFormatData(split[0], false, dOptions.currencySymbol);
            if (fOptions.useGrouping) {
                fOptions.groupSeparator = symbols[mapper[2]];
                fOptions.groupData = this.getGroupingDetails(split[0]);
            }
            var minFrac = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(fOptions.minimumFractionDigits);
            if (minFrac) {
                fOptions.minimumFractionDigits = cOptions.nData.minimumFraction;
            }
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(fOptions.maximumFractionDigits)) {
                var mval = cOptions.nData.maximumFraction;
                fOptions.maximumFractionDigits = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(mval) && fOptions.isPercent ? 0 : mval;
            }
            var mfrac = fOptions.minimumFractionDigits;
            var lfrac = fOptions.maximumFractionDigits;
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(mfrac) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(lfrac)) {
                if (mfrac > lfrac) {
                    fOptions.maximumFractionDigits = mfrac;
                }
            }
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(cOptions.nData, fOptions);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(cOptions.pData, fOptions);
        return function (value) {
            if (isNaN(value)) {
                return symbols[mapper[1]];
            }
            else if (!isFinite(value)) {
                return symbols[mapper[0]];
            }
            return _this.intNumberFormatter(value, cOptions, dOptions);
        };
    };
    NumberFormat.getGroupingDetails = function (pattern) {
        var ret = {};
        var match = pattern.match(__WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].negativeDataRegex);
        if (match && match[4]) {
            var pattern_1 = match[4];
            var p = pattern_1.lastIndexOf(',');
            if (p !== -1) {
                var temp = pattern_1.split('.')[0];
                ret.primary = (temp.length - p) - 1;
                var s = pattern_1.lastIndexOf(',', p - 1);
                if (s !== -1) {
                    ret.secondary = p - 1 - s;
                }
            }
        }
        return ret;
    };
    NumberFormat.checkValueRange = function (val1, val2, checkbothExist, isFraction) {
        var decide = isFraction ? 'f' : 's';
        var dint = 0;
        var str1 = errorText['l' + decide];
        var str2 = errorText['m' + decide];
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(val1)) {
            this.checkRange(val1, str1, isFraction);
            dint++;
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(val2)) {
            this.checkRange(val2, str2, isFraction);
            dint++;
        }
        if (dint === 2) {
            if (val1 < val2) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["i" /* throwError */])(str2 + 'specified must be less than the' + str1);
            }
            else {
                return true;
            }
        }
        else if (checkbothExist && dint === 1) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["i" /* throwError */])('Both' + str2 + 'and' + str2 + 'must be present');
        }
        return false;
    };
    NumberFormat.checkRange = function (val, text, isFraction) {
        var range = isFraction ? [0, 20] : [1, 21];
        if (val < range[0] || val > range[1]) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["i" /* throwError */])(text + 'value must be within the range' + range[0] + 'to' + range[1]);
        }
    };
    NumberFormat.intNumberFormatter = function (value, fOptions, dOptions) {
        var curData;
        if (value < 0) {
            value = value * -1;
            curData = fOptions.nData;
        }
        else if (value === 0) {
            curData = fOptions.zeroData || fOptions.pData;
        }
        else {
            curData = fOptions.pData;
        }
        var fValue = '';
        if (curData.isPercent) {
            value = value * 100;
        }
        if (curData.groupOne) {
            fValue = this.processSignificantDigits(value, curData.minimumSignificantDigits, curData.maximumSignificantDigits);
        }
        else {
            fValue = this.processFraction(value, curData.minimumFractionDigits, curData.maximumFractionDigits);
            if (curData.minimumIntegerDigits) {
                fValue = this.processMinimumIntegers(fValue, curData.minimumIntegerDigits);
            }
        }
        fValue = fValue.replace('.', dOptions.numberMapper.numberSymbols[mapper[3]]);
        if (curData.useGrouping) {
            fValue = this.groupNumbers(fValue, curData.groupData.primary, curData.groupSeparator || ',', dOptions.numberMapper.numberSymbols[mapper[3]] || '.', curData.groupData.secondary);
        }
        fValue = __WEBPACK_IMPORTED_MODULE_3__parser_base__["a" /* ParserBase */].convertValueParts(fValue, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].latnParseRegex, dOptions.numberMapper.mapper);
        return curData.nlead + fValue + curData.nend;
    };
    NumberFormat.processSignificantDigits = function (value, min, max) {
        var temp = value + '';
        var tn;
        var length = temp.length;
        if (length < min) {
            return value.toPrecision(min);
        }
        else {
            temp = value.toPrecision(max);
            tn = +temp;
            return tn + '';
        }
    };
    NumberFormat.groupNumbers = function (val, level1, sep, decimalSymbol, level2) {
        var flag = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(level2) && level2 !== 0;
        var split = val.split(decimalSymbol);
        var prefix = split[0];
        var length = prefix.length;
        var str = '';
        while (length > level1) {
            str = prefix.slice(length - level1, length) + (str.length ?
                (sep + str) : '');
            length -= level1;
            if (flag) {
                level1 = level2;
                flag = false;
            }
        }
        split[0] = prefix.slice(0, length) + (str.length ? sep : '') + str;
        return split.join(decimalSymbol);
    };
    NumberFormat.processFraction = function (value, min, max) {
        var temp = (value + '').split('.')[1];
        var length = temp ? temp.length : 0;
        if (min && length < min) {
            var ret = '';
            if (length === 0) {
                ret = value.toFixed(min);
            }
            else {
                ret += value;
                for (var j = 0; j < min - length; j++) {
                    ret += '0';
                }
                return ret;
            }
            return value.toFixed(min);
        }
        else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(max) && (length > max || max === 0)) {
            return value.toFixed(max);
        }
        return value + '';
    };
    NumberFormat.processMinimumIntegers = function (value, min) {
        var temp = value.split('.');
        var lead = temp[0];
        var len = lead.length;
        if (len < min) {
            for (var i = 0; i < min - len; i++) {
                lead = '0' + lead;
            }
            temp[0] = lead;
        }
        return temp.join('.');
    };
    return NumberFormat;
}());



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

var MODULE_SUFFIX = 'Module';
var ModuleLoader = (function () {
    function ModuleLoader(parent) {
        this.loadedModules = [];
        this.parent = parent;
    }
    ;
    ModuleLoader.prototype.inject = function (requiredModules, moduleList) {
        var reqLength = requiredModules.length;
        if (reqLength === 0) {
            this.clean();
            return;
        }
        if (this.loadedModules.length) {
            this.clearUnusedModule(requiredModules);
        }
        for (var i = 0; i < reqLength; i++) {
            var modl = requiredModules[i];
            for (var _i = 0, moduleList_1 = moduleList; _i < moduleList_1.length; _i++) {
                var module = moduleList_1[_i];
                var modName = modl.member;
                if (module.prototype.getModuleName() === modl.member && !this.isModuleLoaded(modName)) {
                    var moduleObject = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* createInstance */])(module, modl.args);
                    var memberName = this.getMemberName(modName);
                    if (modl.isProperty) {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])(memberName, module, this.parent);
                    }
                    else {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])(memberName, moduleObject, this.parent);
                    }
                    var loadedModule = modl;
                    loadedModule.member = memberName;
                    this.loadedModules.push(loadedModule);
                }
            }
        }
    };
    ModuleLoader.prototype.clean = function () {
        for (var _i = 0, _a = this.loadedModules; _i < _a.length; _i++) {
            var modules = _a[_i];
            if (!modules.isProperty) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(modules.member, this.parent).destroy();
            }
        }
        this.loadedModules = [];
    };
    ModuleLoader.prototype.clearUnusedModule = function (moduleList) {
        var _this = this;
        var usedModules = moduleList.map(function (arg) { return _this.getMemberName(arg.member); });
        var removableModule = this.loadedModules.filter(function (module) {
            return usedModules.indexOf(module.member) === -1;
        });
        for (var _i = 0, removableModule_1 = removableModule; _i < removableModule_1.length; _i++) {
            var mod = removableModule_1[_i];
            if (!mod.isProperty) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(mod.member, this.parent).destroy();
            }
            this.loadedModules.splice(this.loadedModules.indexOf(mod), 1);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["h" /* deleteObject */])(this.parent, mod.member);
        }
    };
    ModuleLoader.prototype.getMemberName = function (name) {
        return name[0].toLowerCase() + name.substring(1) + MODULE_SUFFIX;
    };
    ModuleLoader.prototype.isModuleLoaded = function (modName) {
        for (var _i = 0, _a = this.loadedModules; _i < _a.length; _i++) {
            var mod = _a[_i];
            if (mod.member === this.getMemberName(modName)) {
                return true;
            }
        }
        return false;
    };
    return ModuleLoader;
}());



/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(13), __webpack_require__(11), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1, util_2, query_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Adaptor = (function () {
        function Adaptor(ds) {
            this.options = {
                from: 'table',
                requestType: 'json',
                sortBy: 'sorted',
                select: 'select',
                skip: 'skip',
                group: 'group',
                take: 'take',
                search: 'search',
                count: 'requiresCounts',
                where: 'where',
                aggregates: 'aggregates'
            };
            this.type = Adaptor;
            this.dataSource = ds;
            this.pvt = {};
        }
        Adaptor.prototype.processResponse = function (data, ds, query, xhr) {
            return data;
        };
        return Adaptor;
    }());
    exports.Adaptor = Adaptor;
    var JsonAdaptor = (function (_super) {
        __extends(JsonAdaptor, _super);
        function JsonAdaptor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JsonAdaptor.prototype.processQuery = function (dataManager, query) {
            var result = dataManager.dataSource.json.slice(0);
            var count = result.length;
            var countFlg = true;
            var ret;
            var key;
            var agg = {};
            for (var i = 0; i < query.queries.length; i++) {
                key = query.queries[i];
                ret = this[key.fn].call(this, result, key.e, query);
                if (key.fn === 'onAggregates') {
                    agg[key.e.field + ' - ' + key.e.type] = ret;
                }
                else {
                    result = ret !== undefined ? ret : result;
                }
                if (key.fn === 'onPage' || key.fn === 'onSkip' || key.fn === 'onTake' || key.fn === 'onRange') {
                    countFlg = false;
                }
                if (countFlg) {
                    count = result.length;
                }
            }
            if (query.requiresCounts) {
                result = {
                    result: result,
                    count: count,
                    aggregates: agg
                };
            }
            return result;
        };
        JsonAdaptor.prototype.batchRequest = function (dm, changes, e) {
            var i;
            for (i = 0; i < changes.addedRecords.length; i++) {
                this.insert(dm, changes.addedRecords[i]);
            }
            for (i = 0; i < changes.changedRecords.length; i++) {
                this.update(dm, e.key, changes.changedRecords[i]);
            }
            for (i = 0; i < changes.deletedRecords.length; i++) {
                this.remove(dm, e.key, changes.deletedRecords[i]);
            }
            return changes;
        };
        JsonAdaptor.prototype.onWhere = function (ds, e) {
            if (!ds || !ds.length) {
                return ds;
            }
            return ds.filter(function (obj) {
                if (e) {
                    return e.validate(obj);
                }
            });
        };
        JsonAdaptor.prototype.onAggregates = function (ds, e) {
            var fn = util_2.DataUtil.aggregates[e.type];
            if (!ds || !fn || ds.length === 0) {
                return null;
            }
            return fn(ds, e.field);
        };
        JsonAdaptor.prototype.onSearch = function (ds, e) {
            if (!ds || !ds.length) {
                return ds;
            }
            if (e.fieldNames.length === 0) {
                util_2.DataUtil.getFieldList(ds[0], e.fieldNames);
            }
            return ds.filter(function (obj) {
                for (var j = 0; j < e.fieldNames.length; j++) {
                    if (e.comparer.call(obj, util_2.DataUtil.getObject(e.fieldNames[j], obj), e.searchKey, e.ignoreCase)) {
                        return true;
                    }
                }
                return false;
            });
        };
        JsonAdaptor.prototype.onSortBy = function (ds, e, query) {
            if (!ds || !ds.length) {
                return ds;
            }
            var fnCompare;
            var field = util_2.DataUtil.getValue(e.fieldName, query);
            if (!field) {
                return ds.sort(e.comparer);
            }
            if (field instanceof Array) {
                field = field.slice(0);
                for (var i = field.length - 1; i >= 0; i--) {
                    if (!field[i]) {
                        continue;
                    }
                    fnCompare = e.comparer;
                    if (util_2.DataUtil.endsWith(field[i], ' desc')) {
                        fnCompare = util_2.DataUtil.fnSort('descending');
                        field[i] = field[i].replace(' desc', '');
                    }
                    ds = util_2.DataUtil.sort(ds, field[i], fnCompare);
                }
                return ds;
            }
            return util_2.DataUtil.sort(ds, field, e.comparer);
        };
        JsonAdaptor.prototype.onGroup = function (ds, e, query) {
            if (!ds || !ds.length) {
                return ds;
            }
            var aggQuery = query_1.Query.filterQueries(query.queries, 'onAggregates');
            var agg = [];
            if (aggQuery.length) {
                var tmp = void 0;
                for (var i = 0; i < aggQuery.length; i++) {
                    tmp = aggQuery[i].e;
                    agg.push({ type: tmp.type, field: util_2.DataUtil.getValue(tmp.field, query) });
                }
            }
            return util_2.DataUtil.group(ds, util_2.DataUtil.getValue(e.fieldName, query), agg);
        };
        JsonAdaptor.prototype.onPage = function (ds, e, query) {
            var size = util_2.DataUtil.getValue(e.pageSize, query);
            var start = (util_2.DataUtil.getValue(e.pageIndex, query) - 1) * size;
            var end = start + size;
            if (!ds || !ds.length) {
                return ds;
            }
            return ds.slice(start, end);
        };
        JsonAdaptor.prototype.onRange = function (ds, e) {
            if (!ds || !ds.length) {
                return ds;
            }
            return ds.slice(util_2.DataUtil.getValue(e.start), util_2.DataUtil.getValue(e.end));
        };
        JsonAdaptor.prototype.onTake = function (ds, e) {
            if (!ds || !ds.length) {
                return ds;
            }
            return ds.slice(0, util_2.DataUtil.getValue(e.nos));
        };
        JsonAdaptor.prototype.onSkip = function (ds, e) {
            if (!ds || !ds.length) {
                return ds;
            }
            return ds.slice(util_2.DataUtil.getValue(e.nos));
        };
        JsonAdaptor.prototype.onSelect = function (ds, e) {
            if (!ds || !ds.length) {
                return ds;
            }
            return util_2.DataUtil.select(ds, util_2.DataUtil.getValue(e.fieldNames));
        };
        JsonAdaptor.prototype.insert = function (dm, data) {
            return dm.dataSource.json.push(data);
        };
        JsonAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
            var ds = dm.dataSource.json;
            var i;
            if (typeof value === 'object') {
                value = value[keyField];
            }
            for (i = 0; i < ds.length; i++) {
                if (ds[i][keyField] === value) {
                    break;
                }
            }
            return i !== ds.length ? ds.splice(i, 1) : null;
        };
        JsonAdaptor.prototype.update = function (dm, keyField, value, tableName) {
            var ds = dm.dataSource.json;
            var i;
            var key = value[keyField];
            for (i = 0; i < ds.length; i++) {
                if (ds[i][keyField] === key) {
                    break;
                }
            }
            return i < ds.length ? util_1.merge(ds[i], value) : null;
        };
        return JsonAdaptor;
    }(Adaptor));
    exports.JsonAdaptor = JsonAdaptor;
    var UrlAdaptor = (function (_super) {
        __extends(UrlAdaptor, _super);
        function UrlAdaptor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UrlAdaptor.prototype.processQuery = function (dm, query, hierarchyFilters) {
            var queries = this.getQueryRequest(query);
            var singles = query_1.Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
            var params = query.params;
            var url = dm.dataSource.url;
            var temp;
            var skip;
            var take = null;
            var options = this.options;
            var request = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
            if ('onPage' in singles) {
                temp = singles.onPage;
                skip = util_2.DataUtil.getValue(temp.pageIndex, query);
                take = util_2.DataUtil.getValue(temp.pageSize, query);
                skip = (skip - 1) * take;
            }
            else if ('onRange' in singles) {
                temp = singles.onRange;
                skip = temp.start;
                take = temp.end - temp.start;
            }
            for (var i = 0; i < queries.sorts.length; i++) {
                temp = util_2.DataUtil.getValue(queries.sorts[i].e.fieldName, query);
                request.sorts.push(util_2.DataUtil.callAdaptorFunction(this, 'onEachSort', { name: temp, direction: queries.sorts[i].e.direction }, query));
            }
            if (hierarchyFilters) {
                temp = this.getFiltersFrom(hierarchyFilters, query);
                if (temp) {
                    request.filters.push(util_2.DataUtil.callAdaptorFunction(this, 'onEachWhere', temp.toJson(), query));
                }
            }
            for (var i = 0; i < queries.filters.length; i++) {
                request.filters.push(util_2.DataUtil.callAdaptorFunction(this, 'onEachWhere', queries.filters[i].e.toJson(), query));
                var keys_1 = typeof request.filters[i] === 'object' ? Object.keys(request.filters[i]) : [];
                for (var _i = 0, keys_2 = keys_1; _i < keys_2.length; _i++) {
                    var prop = keys_2[_i];
                    if (util_2.DataUtil.isNull((request)[prop])) {
                        delete request[prop];
                    }
                }
            }
            for (var i = 0; i < queries.searches.length; i++) {
                temp = queries.searches[i].e;
                request.searches.push(util_2.DataUtil.callAdaptorFunction(this, 'onEachSearch', {
                    fields: temp.fieldNames,
                    operator: temp.operator,
                    key: temp.searchKey,
                    ignoreCase: temp.ignoreCase
                }, query));
            }
            for (var i = 0; i < queries.groups.length; i++) {
                request.groups.push(util_2.DataUtil.getValue(queries.groups[i].e.fieldName, query));
            }
            for (var i = 0; i < queries.aggregates.length; i++) {
                temp = queries.aggregates[i].e;
                request.aggregates.push({ type: temp.type, field: util_2.DataUtil.getValue(temp.field, query) });
            }
            var req = {};
            this.getRequestQuery(options, query, singles, request, req);
            util_2.DataUtil.callAdaptorFunction(this, 'addParams', { dm: dm, query: query, params: params, reqParams: req });
            var keys = Object.keys(req);
            for (var _a = 0, keys_3 = keys; _a < keys_3.length; _a++) {
                var prop = keys_3[_a];
                if (util_2.DataUtil.isNull(req[prop]) || req[prop] === '' || req[prop].length === 0) {
                    delete req[prop];
                }
            }
            if (!(options.skip in req && options.take in req) && take !== null) {
                req[options.skip] = util_2.DataUtil.callAdaptorFunction(this, 'onSkip', skip, query);
                req[options.take] = util_2.DataUtil.callAdaptorFunction(this, 'onTake', take, query);
            }
            var p = this.pvt;
            this.pvt = {};
            if (this.options.requestType === 'json') {
                return {
                    data: JSON.stringify(req),
                    url: url,
                    pvtData: p,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8'
                };
            }
            temp = this.convertToQueryString(req, query, dm);
            temp = (dm.dataSource.url.indexOf('?') !== -1 ? '&' : '/') + temp;
            return {
                type: 'GET', url: temp.length ? url.replace(/\/*$/, temp) : url, pvtData: p
            };
        };
        UrlAdaptor.prototype.getRequestQuery = function (options, query, singles, request, request1) {
            var param = 'param';
            var req = request1;
            req[options.from] = query.fromTable;
            if (options.expand) {
                req[options.expand] = query.expands;
            }
            req[options.select] = 'onSelect' in singles ?
                util_2.DataUtil.callAdaptorFunction(this, 'onSelect', util_2.DataUtil.getValue(singles.onSelect.fieldNames, query), query) : '';
            req[options.count] = query.requiresCounts ? util_2.DataUtil.callAdaptorFunction(this, 'onCount', query.requiresCounts, query) : '';
            req[options.search] = request.searches.length ? util_2.DataUtil.callAdaptorFunction(this, 'onSearch', request.searches, query) : '';
            req[options.skip] = 'onSkip' in singles ?
                util_2.DataUtil.callAdaptorFunction(this, 'onSkip', util_2.DataUtil.getValue(singles.onSkip.nos, query), query) : '';
            req[options.take] = 'onTake' in singles ?
                util_2.DataUtil.callAdaptorFunction(this, 'onTake', util_2.DataUtil.getValue(singles.onTake.nos, query), query) : '';
            req[options.where] = request.filters.length || request.searches.length ?
                util_2.DataUtil.callAdaptorFunction(this, 'onWhere', request.filters, query) : '';
            req[options.sortBy] = request.sorts.length ? util_2.DataUtil.callAdaptorFunction(this, 'onSortBy', request.sorts, query) : '';
            req[options.group] = request.groups.length ? util_2.DataUtil.callAdaptorFunction(this, 'onGroup', request.groups, query) : '';
            req[options.aggregates] = request.aggregates.length ?
                util_2.DataUtil.callAdaptorFunction(this, 'onAggregates', request.aggregates, query) : '';
            req[param] = [];
        };
        UrlAdaptor.prototype.convertToQueryString = function (request, query, dm) {
            return '';
        };
        UrlAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
            var requests = request;
            var pvt = requests.pvtData || {};
            var groupDs = data.groupDs;
            if (xhr && xhr.getResponseHeader('Content-Type') &&
                xhr.getResponseHeader('Content-Type').indexOf('xml') !== -1) {
                return query.requiresCounts ? { result: [], count: 0 } : [];
            }
            var d = JSON.parse(requests.data);
            if (d && d.action === 'batch' && data.addedRecords) {
                changes.addedRecords = data.addedRecords;
                return changes;
            }
            if (data.d) {
                data = data.d;
            }
            var args = {};
            if ('count' in data) {
                args.count = data.count;
            }
            args.result = data.result ? data.result : data;
            this.getAggregateResult(pvt, data, args, groupDs);
            return util_2.DataUtil.isNull(args.count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
        };
        UrlAdaptor.prototype.onGroup = function (e) {
            this.pvt.groups = e;
        };
        UrlAdaptor.prototype.onAggregates = function (e) {
            this.pvt.aggregates = e;
        };
        UrlAdaptor.prototype.batchRequest = function (dm, changes, e) {
            var url;
            var key;
            return {
                type: 'POST',
                url: dm.dataSource.batchUrl || dm.dataSource.crudUrl || dm.dataSource.removeUrl || dm.dataSource.url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    changed: changes.changedRecords,
                    added: changes.addedRecords,
                    deleted: changes.deletedRecords,
                    action: 'batch',
                    table: e[url],
                    key: e[key]
                })
            };
        };
        UrlAdaptor.prototype.beforeSend = function (dm, request) {
        };
        UrlAdaptor.prototype.insert = function (dm, data, tableName) {
            return {
                url: dm.dataSource.insertUrl || dm.dataSource.crudUrl || dm.dataSource.url,
                data: JSON.stringify({
                    value: data,
                    table: tableName,
                    action: 'insert'
                })
            };
        };
        UrlAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
            return {
                type: 'POST',
                url: dm.dataSource.removeUrl || dm.dataSource.crudUrl || dm.dataSource.url,
                data: JSON.stringify({
                    key: value,
                    keyColumn: keyField,
                    table: tableName,
                    action: 'remove'
                })
            };
        };
        UrlAdaptor.prototype.update = function (dm, keyField, value, tableName) {
            return {
                type: 'POST',
                url: dm.dataSource.updateUrl || dm.dataSource.crudUrl || dm.dataSource.url,
                data: JSON.stringify({
                    value: value,
                    action: 'update',
                    keyColumn: keyField,
                    key: value[keyField],
                    table: tableName
                })
            };
        };
        UrlAdaptor.prototype.getFiltersFrom = function (data, query) {
            var key = query.fKey;
            var value;
            var prop = key;
            var pKey = query.key;
            var predicats = [];
            if (typeof data[0] !== 'object') {
                prop = null;
            }
            for (var i = 0; i < data.length; i++) {
                if (typeof data[0] === 'object') {
                    value = util_2.DataUtil.getObject(pKey || prop, data[i]);
                }
                else {
                    value = data[i];
                }
                predicats.push(new query_1.Predicate(key, 'equal', value));
            }
            return query_1.Predicate.or(predicats);
        };
        UrlAdaptor.prototype.getAggregateResult = function (pvt, data, args, groupDs) {
            var pData = data;
            if (data && data.result) {
                pData = data.result;
            }
            if (pvt && pvt.aggregates && pvt.aggregates.length) {
                var agg = pvt.aggregates;
                var fn = void 0;
                var aggregateData = pData;
                var res = {};
                if (data.aggregate) {
                    aggregateData = data.aggregate;
                }
                for (var i = 0; i < agg.length; i++) {
                    fn = util_2.DataUtil.aggregates[agg[i].type];
                    if (fn) {
                        res[agg[i].field + ' - ' + agg[i].type] = fn(aggregateData, agg[i].field);
                    }
                }
                args.aggregates = res;
            }
            if (pvt && pvt.groups && pvt.groups.length) {
                var groups = pvt.groups;
                for (var i = 0; i < groups.length; i++) {
                    var level = null;
                    if (!util_1.isNullOrUndefined(groupDs)) {
                        groupDs = util_2.DataUtil.group(groupDs, groups[i]);
                    }
                    pData = util_2.DataUtil.group(pData, groups[i], pvt.aggregates, level, groupDs);
                }
                args.result = pData;
            }
            return args;
        };
        UrlAdaptor.prototype.getQueryRequest = function (query) {
            var req = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
            req.sorts = query_1.Query.filterQueries(query.queries, 'onSortBy');
            req.groups = query_1.Query.filterQueries(query.queries, 'onGroup');
            req.filters = query_1.Query.filterQueries(query.queries, 'onWhere');
            req.searches = query_1.Query.filterQueries(query.queries, 'onSearch');
            req.aggregates = query_1.Query.filterQueries(query.queries, 'onAggregates');
            return req;
        };
        return UrlAdaptor;
    }(Adaptor));
    exports.UrlAdaptor = UrlAdaptor;
    var ODataAdaptor = (function (_super) {
        __extends(ODataAdaptor, _super);
        function ODataAdaptor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.options = util_1.extend({}, _this.options, {
                requestType: 'get',
                accept: 'application/json;odata=light;q=1,application/json;odata=verbose;q=0.5',
                multipartAccept: 'multipart/mixed',
                sortBy: '$orderby',
                select: '$select',
                skip: '$skip',
                take: '$top',
                count: '$inlinecount',
                where: '$filter',
                expand: '$expand',
                batch: '$batch',
                changeSet: '--changeset_',
                batchPre: 'batch_',
                contentId: 'Content-Id: ',
                batchContent: 'Content-Type: multipart/mixed; boundary=',
                changeSetContent: 'Content-Type: application/http\nContent-Transfer-Encoding: binary ',
                batchChangeSetContentType: 'Content-Type: application/json; charset=utf-8 '
            });
            return _this;
        }
        ODataAdaptor.prototype.onPredicate = function (predicate, query, requiresCast) {
            var returnValue = '';
            var operator;
            var guid;
            var val = predicate.value;
            var type = typeof val;
            var field = predicate.field ? ODataAdaptor.getField(predicate.field) : null;
            if (val instanceof Date) {
                val = 'datetime\'' + util_2.DataUtil.parse.replacer(val) + '\'';
            }
            if (type === 'string') {
                val = '\'' + val + '\'';
                if (requiresCast) {
                    field = 'cast(' + field + ', \'Edm.String\')';
                }
                if (util_2.DataUtil.parse.isGuid(val)) {
                    guid = 'guid';
                }
                if (predicate.ignoreCase) {
                    if (!guid) {
                        field = 'tolower(' + field + ')';
                    }
                    val = val.toLowerCase();
                }
            }
            operator = util_2.DataUtil.odBiOperator[predicate.operator];
            if (operator) {
                returnValue += field;
                returnValue += operator;
                if (guid) {
                    returnValue += guid;
                }
                return returnValue + val;
            }
            operator = util_2.DataUtil.odUniOperator[predicate.operator];
            if (operator === 'substringof') {
                var temp = val;
                val = field;
                field = temp;
            }
            returnValue += operator + '(';
            returnValue += field + ',';
            if (guid) {
                returnValue += guid;
            }
            returnValue += val + ')';
            return returnValue;
        };
        ODataAdaptor.prototype.onComplexPredicate = function (predicate, query, requiresCast) {
            var res = [];
            for (var i = 0; i < predicate.predicates.length; i++) {
                res.push('(' + this.onEachWhere(predicate.predicates[i], query, requiresCast) + ')');
            }
            return res.join(' ' + predicate.condition + ' ');
        };
        ODataAdaptor.prototype.onEachWhere = function (filter, query, requiresCast) {
            return filter.isComplex ? this.onComplexPredicate(filter, query, requiresCast) : this.onPredicate(filter, query, requiresCast);
        };
        ODataAdaptor.prototype.onWhere = function (filters) {
            if (this.pvt.search) {
                filters.push(this.onEachWhere(this.pvt.search, null, true));
            }
            return filters.join(' and ');
        };
        ODataAdaptor.prototype.onEachSearch = function (e) {
            if (e.fields && e.fields.length === 0) {
                util_2.DataUtil.throwError('Query() - Search : oData search requires list of field names to search');
            }
            var filter = this.pvt.search || [];
            for (var i = 0; i < e.fields.length; i++) {
                filter.push(new query_1.Predicate(e.fields[i], e.operator, e.key, e.ignoreCase));
            }
            this.pvt.search = filter;
        };
        ODataAdaptor.prototype.onSearch = function (e) {
            this.pvt.search = query_1.Predicate.or(this.pvt.search);
            return '';
        };
        ODataAdaptor.prototype.onEachSort = function (e) {
            var res = [];
            if (e.name instanceof Array) {
                for (var i = 0; i < e.name.length; i++) {
                    res.push(ODataAdaptor.getField(e.name[i]) + (e.direction === 'descending' ? ' desc' : ''));
                }
            }
            else {
                res.push(ODataAdaptor.getField(e.name) + (e.direction === 'descending' ? ' desc' : ''));
            }
            return res.join(',');
        };
        ODataAdaptor.prototype.onSortBy = function (e) {
            return e.reverse().join(',');
        };
        ODataAdaptor.prototype.onGroup = function (e) {
            this.pvt.groups = e;
            return '';
        };
        ODataAdaptor.prototype.onSelect = function (e) {
            for (var i = 0; i < e.length; i++) {
                e[i] = ODataAdaptor.getField(e[i]);
            }
            return e.join(',');
        };
        ODataAdaptor.prototype.onAggregates = function (e) {
            this.pvt.aggregates = e;
            return '';
        };
        ODataAdaptor.prototype.onCount = function (e) {
            return e === true ? 'allpages' : '';
        };
        ODataAdaptor.prototype.beforeSend = function (dm, request, settings) {
            if (util_2.DataUtil.endsWith(settings.url, this.options.batch) && settings.type.toLowerCase() === 'post') {
                request.setRequestHeader('Accept', this.options.multipartAccept);
                request.setRequestHeader('DataServiceVersion', '2.0');
                request.overrideMimeType('text/plain; charset=x-user-defined');
            }
            else {
                request.setRequestHeader('Accept', this.options.accept);
            }
            request.setRequestHeader('DataServiceVersion', '2.0');
            request.setRequestHeader('MaxDataServiceVersion', '2.0');
        };
        ODataAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
            var pvtData = 'pvtData';
            if (!util_1.isNullOrUndefined(data.d)) {
                var dataCopy = (query && query.requiresCounts) ? data.d.results : data.d;
                var metaData = '__metadata';
                if (!util_1.isNullOrUndefined(dataCopy)) {
                    for (var i = 0; i < dataCopy.length; i++) {
                        if (!util_1.isNullOrUndefined(dataCopy[i][metaData])) {
                            delete dataCopy[i][metaData];
                        }
                    }
                }
            }
            var pvt = request && request[pvtData];
            var emptyAndBatch = this.processBatchResponse(data, query, xhr, request, changes);
            if (emptyAndBatch) {
                return emptyAndBatch;
            }
            var versionCheck = xhr && request.getResponseHeader('DataServiceVersion');
            var count = null;
            var version = (versionCheck && parseInt(versionCheck, 10)) || 2;
            if (query && query.requiresCounts) {
                var oDataCount = '__count';
                if (data[oDataCount] || data['odata.count']) {
                    count = data[oDataCount] || data['odata.count'];
                }
                if (data.d) {
                    data = data.d;
                }
                if (data[oDataCount] || data['odata.count']) {
                    count = data[oDataCount] || data['odata.count'];
                }
            }
            if (version === 3 && data.value) {
                data = data.value;
            }
            if (data.d) {
                data = data.d;
            }
            if (version < 3 && data.results) {
                data = data.results;
            }
            var args = {};
            args.count = count;
            args.result = data;
            this.getAggregateResult(pvt, data, args);
            return util_2.DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
        };
        ODataAdaptor.prototype.convertToQueryString = function (request, query, dm) {
            var res = [];
            var table = 'table';
            var tableName = request[table] || '';
            var format = '$format';
            delete request[table];
            if (dm.dataSource.requiresFormat) {
                request[format] = 'json';
            }
            var keys = Object.keys(request);
            for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
                var prop = keys_4[_i];
                res.push(prop + '=' + request[prop]);
            }
            res = res.join('&');
            if (dm.dataSource.url && dm.dataSource.url.indexOf('?') !== -1 && !tableName) {
                return res;
            }
            return res.length ? tableName + '?' + res : tableName || '';
        };
        ODataAdaptor.prototype.insert = function (dm, data, tableName) {
            return {
                url: dm.dataSource.url.replace(/\/*$/, tableName ? '/' + tableName : ''),
                data: JSON.stringify(data)
            };
        };
        ODataAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
            return {
                type: 'DELETE',
                url: dm.dataSource.url.replace(/\/*$/, tableName ? '/' + tableName : '') + '(' + value + ')'
            };
        };
        ODataAdaptor.prototype.update = function (dm, keyField, value, tableName) {
            return {
                type: 'PUT',
                url: dm.dataSource.url.replace(/\/*$/, tableName ? '/' + tableName : '') + '(' + value[keyField] + ')',
                data: JSON.stringify(value),
                accept: this.options.accept
            };
        };
        ODataAdaptor.prototype.batchRequest = function (dm, changes, e) {
            var initialGuid = e.guid = util_2.DataUtil.getGuid(this.options.batchPre);
            var url = dm.dataSource.url.replace(/\/*$/, '/' + this.options.batch);
            var args = {
                url: e.url,
                key: e.key,
                cid: 1,
                cSet: util_2.DataUtil.getGuid(this.options.changeSet)
            };
            var req = '--' + initialGuid + '\n';
            req += 'Content-Type: multipart/mixed; boundary=' + args.cSet.replace('--', '') + '\n';
            this.pvt.changeSet = 0;
            req += this.generateInsertRequest(changes.addedRecords, args);
            req += this.generateUpdateRequest(changes.changedRecords, args);
            req += this.generateDeleteRequest(changes.deletedRecords, args);
            req += args.cSet + '--\n';
            req += '--' + initialGuid + '--';
            return {
                type: 'POST',
                url: url,
                dataType: 'json',
                contentType: 'multipart/mixed; charset=UTF-8;boundary=' + initialGuid,
                data: req
            };
        };
        ODataAdaptor.prototype.generateDeleteRequest = function (arr, e) {
            if (!arr) {
                return '';
            }
            var req = '';
            var stat = {
                'method': 'DELETE ',
                'url': function (data, i, key) { return '(' + data[i][key] + ')'; },
                'data': function (data, i) { return ''; }
            };
            req = this.generateBodyContent(arr, e, stat);
            return req + '\n';
        };
        ODataAdaptor.prototype.generateInsertRequest = function (arr, e) {
            if (!arr) {
                return '';
            }
            var req = '';
            var stat = {
                'method': 'POST ',
                'url': function (data, i, key) { return ''; },
                'data': function (data, i) { return JSON.stringify(data[i]) + '\n\n'; }
            };
            req = this.generateBodyContent(arr, e, stat);
            return req;
        };
        ODataAdaptor.prototype.generateUpdateRequest = function (arr, e) {
            if (!arr) {
                return '';
            }
            var req = '';
            var stat = {
                'method': 'PUT ',
                'url': function (data, i, key) { return '(' + data[i][key] + ')'; },
                'data': function (data, i) { return JSON.stringify(data[i]) + '\n\n'; }
            };
            req = this.generateBodyContent(arr, e, stat);
            return req;
        };
        ODataAdaptor.getField = function (prop) {
            return prop.replace(/\./g, '/');
        };
        ODataAdaptor.prototype.generateBodyContent = function (arr, e, stat) {
            var req = '';
            for (var i = 0; i < arr.length; i++) {
                req += '\n' + e.cSet + '\n';
                req += this.options.changeSetContent + '\n\n';
                req += stat.method;
                req += e.url + stat.url(arr, i, e.key) + ' HTTP/1.1\n';
                req += 'Accept: ' + this.options.accept + '\n';
                req += 'Content-Id: ' + this.pvt.changeSet++ + '\n';
                req += this.options.batchChangeSetContentType + '\n\n';
                req += stat.data(arr, i);
            }
            return req;
        };
        ODataAdaptor.prototype.processBatchResponse = function (data, query, xhr, request, changes) {
            if (xhr && xhr.getResponseHeader('Content-Type') && xhr.getResponseHeader('Content-Type').indexOf('xml') !== -1) {
                return query.requiresCounts ? { result: [], count: 0 } : [];
            }
            if (request && this.options.batch && util_2.DataUtil.endsWith(request.url, this.options.batch) && request.type.toLowerCase() === 'post') {
                var guid = xhr.getResponseHeader('Content-Type');
                var cIdx = void 0;
                var jsonObj = void 0;
                guid = guid.substring(guid.indexOf('=batchresponse') + 1);
                data = data.split(guid);
                if (data.length < 2) {
                    return {};
                }
                data = data[1];
                var exVal = /(?:\bContent-Type.+boundary=)(changesetresponse.+)/i.exec(data);
                if (exVal) {
                    data.replace(exVal[0], '');
                }
                var changeGuid = exVal ? exVal[1] : '';
                data = data.split(changeGuid);
                for (var i = data.length; i > -1; i--) {
                    if (!/\bContent-ID:/i.test(data[i]) || !/\bHTTP.+201/.test(data[i])) {
                        continue;
                    }
                    cIdx = parseInt(/\bContent-ID: (\d+)/i.exec(data[i])[1], 10);
                    if (changes.addedRecords[cIdx]) {
                        jsonObj = util_2.DataUtil.parse.parseJson(/^\{.+\}/m.exec(data[i])[0]);
                        util_1.extend({}, changes.addedRecords[cIdx], this.processResponse(jsonObj));
                    }
                }
                return changes;
            }
            return null;
        };
        return ODataAdaptor;
    }(UrlAdaptor));
    exports.ODataAdaptor = ODataAdaptor;
    var ODataV4Adaptor = (function (_super) {
        __extends(ODataV4Adaptor, _super);
        function ODataV4Adaptor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.options = util_1.extend({}, _this.options, {
                requestType: 'get',
                accept: 'application/json, text/javascript, */*; q=0.01',
                multipartAccept: 'multipart/mixed',
                sortBy: '$orderby',
                select: '$select',
                skip: '$skip',
                take: '$top',
                count: '$count',
                search: '$search',
                where: '$filter',
                expand: '$expand',
                batch: '$batch',
                changeSet: '--changeset_',
                batchPre: 'batch_',
                contentId: 'Content-Id: ',
                batchContent: 'Content-Type: multipart/mixed; boundary=',
                changeSetContent: 'Content-Type: application/http\nContent-Transfer-Encoding: binary ',
                batchChangeSetContentType: 'Content-Type: application/json; charset=utf-8 '
            });
            return _this;
        }
        ODataV4Adaptor.prototype.onCount = function (e) {
            return e === true ? 'true' : '';
        };
        ODataV4Adaptor.prototype.onPredicate = function (predicate, requiresCast) {
            var returnValue = '';
            var val = predicate.value;
            var isDate = val instanceof Date;
            returnValue = _super.prototype.onPredicate.call(this, predicate, requiresCast);
            if (isDate) {
                returnValue = returnValue.replace(/datetime'(.*)'$/, '$1');
            }
            return returnValue;
        };
        ODataV4Adaptor.prototype.onEachSearch = function (e) {
            var search = this.pvt.searches || [];
            search.push(e.key);
            this.pvt.searches = search;
        };
        ODataV4Adaptor.prototype.onSearch = function (e) {
            return this.pvt.searches.join(' OR ');
        };
        ODataV4Adaptor.prototype.beforeSend = function (dm, request, settings) {
            request.setRequestHeader('Accept', this.options.accept);
        };
        ODataV4Adaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
            var pvtData = 'pvtData';
            var pvt = request && request[pvtData];
            var emptyAndBatch = _super.prototype.processBatchResponse.call(this, data, query, xhr, request, changes);
            if (emptyAndBatch) {
                return emptyAndBatch;
            }
            var count = null;
            var dataCount = '@odata.count';
            if (query && query.requiresCounts) {
                if (dataCount in data) {
                    count = data[dataCount];
                }
            }
            data = data.value;
            var args = {};
            args.count = count;
            args.result = data;
            this.getAggregateResult(pvt, data, args);
            return util_2.DataUtil.isNull(count) ? args.result : { result: args.result, count: count, aggregates: args.aggregates };
        };
        return ODataV4Adaptor;
    }(ODataAdaptor));
    exports.ODataV4Adaptor = ODataV4Adaptor;
    var WebApiAdaptor = (function (_super) {
        __extends(WebApiAdaptor, _super);
        function WebApiAdaptor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WebApiAdaptor.prototype.insert = function (dm, data, tableName) {
            return {
                type: 'POST',
                url: dm.dataSource.url,
                data: JSON.stringify(data)
            };
        };
        WebApiAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
            return {
                type: 'DELETE',
                url: dm.dataSource.url + '/' + value,
                data: JSON.stringify(value)
            };
        };
        WebApiAdaptor.prototype.update = function (dm, keyField, value, tableName) {
            return {
                type: 'PUT',
                url: dm.dataSource.url,
                data: JSON.stringify(value)
            };
        };
        WebApiAdaptor.prototype.beforeSend = function (dm, request, settings) {
            request.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
        };
        WebApiAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
            var pvtData = 'pvtData';
            var pvt = request && request[pvtData];
            var count = null;
            var args = {};
            if (request && request.type.toLowerCase() !== 'post') {
                var versionCheck = xhr && request.getResponseHeader('DataServiceVersion');
                var version = (versionCheck && parseInt(versionCheck, 10)) || 2;
                if (query && query.requiresCounts) {
                    if (!util_2.DataUtil.isNull(data.Count)) {
                        count = data.Count;
                    }
                }
                if (version < 3 && data.Items) {
                    data = data.Items;
                }
                args.count = count;
                args.result = data;
                this.getAggregateResult(pvt, data, args);
            }
            args.result = args.result || data;
            return util_2.DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
        };
        return WebApiAdaptor;
    }(ODataAdaptor));
    exports.WebApiAdaptor = WebApiAdaptor;
    var WebMethodAdaptor = (function (_super) {
        __extends(WebMethodAdaptor, _super);
        function WebMethodAdaptor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WebMethodAdaptor.prototype.processQuery = function (dm, query, hierarchyFilters) {
            var obj = new UrlAdaptor().processQuery(dm, query, hierarchyFilters);
            var getData = 'data';
            var data = util_2.DataUtil.parse.parseJson(obj[getData]);
            var result = {};
            var value = 'value';
            if (data.param) {
                for (var i = 0; i < data.param.length; i++) {
                    var param = data.param[i];
                    var key = Object.keys(param)[0];
                    result[key] = param[key];
                }
            }
            result[value] = data;
            var pvtData = 'pvtData';
            var url = 'url';
            return {
                data: JSON.stringify(result),
                url: obj[url],
                pvtData: obj[pvtData],
                type: 'POST',
                contentType: 'application/json; charset=utf-8'
            };
        };
        return WebMethodAdaptor;
    }(UrlAdaptor));
    exports.WebMethodAdaptor = WebMethodAdaptor;
    var RemoteSaveAdaptor = (function (_super) {
        __extends(RemoteSaveAdaptor, _super);
        function RemoteSaveAdaptor() {
            var _this = _super.call(this) || this;
            util_1.setValue('beforeSend', UrlAdaptor.prototype.beforeSend, _this);
            util_1.setValue('insert', UrlAdaptor.prototype.insert, _this);
            util_1.setValue('update', UrlAdaptor.prototype.update, _this);
            util_1.setValue('remove', UrlAdaptor.prototype.remove, _this);
            return _this;
        }
        RemoteSaveAdaptor.prototype.batchRequest = function (dm, changes, e) {
            var i;
            for (i = 0; i < changes.addedRecords.length; i++) {
                JsonAdaptor.prototype.insert(dm, changes.addedRecords[i]);
            }
            for (i = 0; i < changes.changedRecords.length; i++) {
                JsonAdaptor.prototype.update(dm, e.key, changes.changedRecords[i]);
            }
            for (i = 0; i < changes.deletedRecords.length; i++) {
                JsonAdaptor.prototype.remove(dm, e.key, changes.deletedRecords[i]);
            }
            return {
                type: 'POST',
                url: dm.dataSource.batchUrl || dm.dataSource.crudUrl || dm.dataSource.url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    changed: changes.changedRecords,
                    added: changes.addedRecords,
                    deleted: changes.deletedRecords,
                    action: 'batch',
                    table: e.url,
                    key: e.key
                })
            };
        };
        return RemoteSaveAdaptor;
    }(JsonAdaptor));
    exports.RemoteSaveAdaptor = RemoteSaveAdaptor;
    var CacheAdaptor = (function (_super) {
        __extends(CacheAdaptor, _super);
        function CacheAdaptor(adaptor, timeStamp, pageSize) {
            var _this = _super.call(this) || this;
            _this.isCrudAction = false;
            _this.isInsertAction = false;
            if (!util_1.isNullOrUndefined(adaptor)) {
                _this.cacheAdaptor = adaptor;
            }
            _this.pageSize = pageSize;
            _this.guidId = util_2.DataUtil.getGuid('cacheAdaptor');
            var obj = { keys: [], results: [] };
            window.localStorage.setItem(_this.guidId, JSON.stringify(obj));
            var guid = _this.guidId;
            if (!util_1.isNullOrUndefined(timeStamp)) {
                setInterval(function () {
                    var data;
                    data = util_2.DataUtil.parse.parseJson(window.localStorage.getItem(guid));
                    var forDel = [];
                    for (var i = 0; i < data.results.length; i++) {
                        var currentTime = +new Date();
                        var requestTime = +new Date(data.results[i].timeStamp);
                        data.results[i].timeStamp = currentTime - requestTime;
                        if (currentTime - requestTime > timeStamp) {
                            forDel.push(i);
                        }
                    }
                    for (var i = 0; i < forDel.length; i++) {
                        data.results.splice(forDel[i], 1);
                        data.keys.splice(forDel[i], 1);
                    }
                    window.localStorage.removeItem(guid);
                    window.localStorage.setItem(guid, JSON.stringify(data));
                }, timeStamp);
            }
            return _this;
        }
        CacheAdaptor.prototype.generateKey = function (url, query) {
            var queries = this.getQueryRequest(query);
            var singles = query_1.Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
            var key = url;
            var page = 'onPage';
            if (page in singles) {
                key += singles[page].pageIndex;
            }
            queries.sorts.forEach(function (obj) {
                key += obj.e.direction + obj.e.fieldName;
            });
            queries.groups.forEach(function (obj) {
                key += obj.e.fieldName;
            });
            queries.searches.forEach(function (obj) {
                key += obj.e.searchKey;
            });
            for (var filter = 0; filter < queries.filters.length; filter++) {
                var currentFilter = queries.filters[filter];
                if (currentFilter.e.isComplex) {
                    var newQuery = query.clone();
                    newQuery.queries = [];
                    for (var i = 0; i < currentFilter.e.predicates.length; i++) {
                        newQuery.queries.push({ fn: 'onWhere', e: currentFilter.e.predicates[i], filter: query.queries.filter });
                    }
                    key += currentFilter.e.condition + this.generateKey(url, newQuery);
                }
                else {
                    key += currentFilter.e.field + currentFilter.e.operator + currentFilter.e.value;
                }
            }
            return key;
        };
        CacheAdaptor.prototype.processQuery = function (dm, query, hierarchyFilters) {
            var key = this.generateKey(dm.dataSource.url, query);
            var cachedItems;
            cachedItems = util_2.DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
            var data = cachedItems ? cachedItems.results[cachedItems.keys.indexOf(key)] : null;
            if (data != null && !this.isCrudAction && !this.isInsertAction) {
                return data;
            }
            this.isCrudAction = null;
            this.isInsertAction = null;
            return this.cacheAdaptor.processQuery.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
        };
        CacheAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
            if (this.isInsertAction || (request && this.cacheAdaptor.options.batch &&
                util_2.DataUtil.endsWith(request.url, this.cacheAdaptor.options.batch) && request.type.toLowerCase() === 'post')) {
                return this.cacheAdaptor.processResponse(data, ds, query, xhr, request, changes);
            }
            data = this.cacheAdaptor.processResponse.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
            var key = query ? this.generateKey(ds.dataSource.url, query) : ds.dataSource.url;
            var obj = {};
            obj = util_2.DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
            var index = obj.keys.indexOf(key);
            if (index !== -1) {
                obj.results.splice(index, 1);
                obj.keys.splice(index, 1);
            }
            obj.results[obj.keys.push(key) - 1] = { keys: key, result: data.result, timeStamp: new Date(), count: data.count };
            while (obj.results.length > this.pageSize) {
                obj.results.splice(0, 1);
                obj.keys.splice(0, 1);
            }
            window.localStorage.setItem(this.guidId, JSON.stringify(obj));
            return data;
        };
        CacheAdaptor.prototype.beforeSend = function (dm, request, settings) {
            if (util_2.DataUtil.endsWith(settings.url, this.cacheAdaptor.options.batch) && settings.type.toLowerCase() === 'post') {
                request.setRequestHeader('Accept', this.cacheAdaptor.options.multipartAccept);
            }
            if (!dm.dataSource.crossDomain) {
                request.setRequestHeader('Accept', this.cacheAdaptor.options.accept);
            }
        };
        CacheAdaptor.prototype.update = function (dm, keyField, value, tableName) {
            this.isCrudAction = true;
            return this.cacheAdaptor.update(dm, keyField, value, tableName);
        };
        CacheAdaptor.prototype.insert = function (dm, data, tableName) {
            this.isInsertAction = true;
            return this.cacheAdaptor.insert(dm, data, tableName);
        };
        CacheAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
            this.isCrudAction = true;
            return this.cacheAdaptor.remove(dm, keyField, value, tableName);
        };
        CacheAdaptor.prototype.batchRequest = function (dm, changes, e) {
            return this.cacheAdaptor.batchRequest(dm, changes, e);
        };
        return CacheAdaptor;
    }(UrlAdaptor));
    exports.CacheAdaptor = CacheAdaptor;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(30), __webpack_require__(13), __webpack_require__(11), __webpack_require__(10), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, util_1, util_2, query_1, adaptors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataManager = (function () {
        function DataManager(dataSource, query, adaptor) {
            var _this = this;
            this.dateParse = true;
            this.requests = [];
            if (!dataSource && !this.dataSource) {
                dataSource = [];
            }
            adaptor = adaptor || dataSource.adaptor;
            var data;
            if (dataSource instanceof Array) {
                data = {
                    json: dataSource,
                    offline: true
                };
            }
            else if (typeof dataSource === 'object') {
                if (!dataSource.json) {
                    dataSource.json = [];
                }
                data = {
                    url: dataSource.url,
                    insertUrl: dataSource.insertUrl,
                    removeUrl: dataSource.removeUrl,
                    updateUrl: dataSource.updateUrl,
                    crudUrl: dataSource.crudUrl,
                    batchUrl: dataSource.batchUrl,
                    json: dataSource.json,
                    headers: dataSource.headers,
                    accept: dataSource.accept,
                    data: dataSource.data,
                    timeTillExpiration: dataSource.timeTillExpiration,
                    cachingPageSize: dataSource.cachingPageSize,
                    enableCaching: dataSource.enableCaching,
                    requestType: dataSource.requestType,
                    key: dataSource.key,
                    crossDomain: dataSource.crossDomain,
                    jsonp: dataSource.jsonp,
                    dataType: dataSource.dataType,
                    offline: dataSource.offline !== undefined ? dataSource.offline
                        : dataSource.adaptor instanceof adaptors_1.RemoteSaveAdaptor ? false : dataSource.url ? false : true,
                    requiresFormat: dataSource.requiresFormat
                };
            }
            else {
                util_2.DataUtil.throwError('DataManager: Invalid arguments');
            }
            if (data.requiresFormat === undefined && !util_2.DataUtil.isCors()) {
                data.requiresFormat = util_1.isNullOrUndefined(data.crossDomain) ? true : data.crossDomain;
            }
            if (data.dataType === undefined) {
                data.dataType = 'json';
            }
            this.dataSource = data;
            this.defaultQuery = query;
            if (data.url && data.offline && !data.json.length) {
                this.isDataAvailable = false;
                this.adaptor = adaptor || new adaptors_1.ODataAdaptor();
                this.dataSource.offline = false;
                this.ready = this.executeQuery(query || new query_1.Query());
                this.ready.then(function (e) {
                    _this.dataSource.offline = true;
                    _this.isDataAvailable = true;
                    data.json = e.result;
                    _this.adaptor = new adaptors_1.JsonAdaptor();
                });
            }
            else {
                this.adaptor = data.offline ? new adaptors_1.JsonAdaptor() : new adaptors_1.ODataAdaptor();
            }
            if (!data.jsonp && this.adaptor instanceof adaptors_1.ODataAdaptor) {
                data.jsonp = 'callback';
            }
            this.adaptor = adaptor || this.adaptor;
            if (data.enableCaching) {
                this.adaptor = new adaptors_1.CacheAdaptor(this.adaptor, data.timeTillExpiration, data.cachingPageSize);
            }
            return this;
        }
        DataManager.prototype.setDefaultQuery = function (query) {
            this.defaultQuery = query;
            return this;
        };
        DataManager.prototype.executeLocal = function (query) {
            if (!this.defaultQuery && !(query instanceof query_1.Query)) {
                util_2.DataUtil.throwError('DataManager - executeLocal() : A query is required to execute');
            }
            if (!this.dataSource.json) {
                util_2.DataUtil.throwError('DataManager - executeLocal() : Json data is required to execute');
            }
            query = query || this.defaultQuery;
            var result = this.adaptor.processQuery(this, query);
            if (query.subQuery) {
                var from = query.subQuery.fromTable;
                var lookup = query.subQuery.lookups;
                var res = query.requiresCounts ? result.result :
                    result;
                if (lookup && lookup instanceof Array) {
                    util_2.DataUtil.buildHierarchy(query.subQuery.fKey, from, res, lookup, query.subQuery.key);
                }
                for (var j = 0; j < res.length; j++) {
                    if (res[j][from] instanceof Array) {
                        res[j] = util_1.extend({}, {}, res[j]);
                        res[j][from] = this.adaptor.processResponse(query.subQuery.using(new DataManager(res[j][from].slice(0))).executeLocal(), this, query);
                    }
                }
            }
            return this.adaptor.processResponse(result, this, query);
        };
        DataManager.prototype.executeQuery = function (query, done, fail, always) {
            var _this = this;
            if (typeof query === 'function') {
                always = fail;
                fail = done;
                done = query;
                query = null;
            }
            if (!query) {
                query = this.defaultQuery;
            }
            if (!(query instanceof query_1.Query)) {
                util_2.DataUtil.throwError('DataManager - executeQuery() : A query is required to execute');
            }
            var deffered = new Deferred();
            var args = { query: query };
            if (!this.dataSource.offline && this.dataSource.url !== undefined) {
                var result = this.adaptor.processQuery(this, query);
                this.makeRequest(result, deffered, args, query);
            }
            else {
                DataManager.nextTick(function () {
                    var res = _this.executeLocal(query);
                    args = DataManager.getDeferedArgs(query, res, args);
                    deffered.resolve(args);
                });
            }
            return deffered.promise;
        };
        DataManager.getDeferedArgs = function (query, result, args) {
            if (query.requiresCounts) {
                args.result = result.result;
                args.count = result.count;
            }
            else {
                args.result = result;
            }
            return args;
        };
        DataManager.nextTick = function (fn) {
            (window.setImmediate || window.setTimeout)(fn, 0);
        };
        DataManager.prototype.extendRequest = function (url, fnSuccess, fnFail) {
            return util_1.extend({}, {
                type: 'GET',
                dataType: this.dataSource.dataType,
                crossDomain: this.dataSource.crossDomain,
                jsonp: this.dataSource.jsonp,
                cache: true,
                processData: false,
                onSuccess: fnSuccess,
                onFailure: fnFail
            }, url);
        };
        DataManager.prototype.makeRequest = function (url, deffered, args, query) {
            var _this = this;
            var isSelector = !!query.subQuerySelector;
            var fnFail = function (e) {
                args.error = e;
                deffered.reject(args);
            };
            var process = function (data, count, xhr, request, actual, aggregates, virtualSelectRecords) {
                args.xhr = xhr;
                args.count = count ? parseInt(count.toString(), 10) : 0;
                args.result = data;
                args.request = request;
                args.aggregates = aggregates;
                args.actual = actual;
                args.virtualSelectRecords = virtualSelectRecords;
                deffered.resolve(args);
            };
            var fnQueryChild = function (data, selector) {
                var subDeffer = new Deferred();
                var childArgs = { parent: args };
                query.subQuery.isChild = true;
                var subUrl = _this.adaptor.processQuery(_this, query.subQuery, data ? _this.adaptor.processResponse(data) : selector);
                var childReq = _this.makeRequest(subUrl, subDeffer, childArgs, query.subQuery);
                if (!isSelector) {
                    subDeffer.then(function (subData) {
                        if (data) {
                            util_2.DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, data, subData, query.subQuery.key);
                            process(data, subData.count, subData.xhr);
                        }
                    }, fnFail);
                }
                return childReq;
            };
            var fnSuccess = function (data, request) {
                if (request.httpRequest.getResponseHeader('Content-Type').indexOf('xml') === -1 && _this.dateParse) {
                    data = util_2.DataUtil.parse.parseJson(data);
                }
                var result = _this.adaptor.processResponse(data, _this, query, request.httpRequest, request);
                var count = 0;
                var aggregates = null;
                var virtualSelectRecords = 'virtualSelectRecords';
                var virtualRecords = data[virtualSelectRecords];
                if (query.requiresCounts) {
                    count = result.count;
                    aggregates = result.aggregates;
                    result = result.result;
                }
                if (!query.subQuery) {
                    process(result, count, request.httpRequest, request.type, data, aggregates, virtualRecords);
                    return;
                }
                if (!isSelector) {
                    fnQueryChild(result, request);
                }
            };
            var req = this.extendRequest(url, fnSuccess, fnFail);
            var ajax = new ej2_base_1.Ajax(req);
            ajax.beforeSend = function () {
                _this.beforeSend(ajax.httpRequest, ajax);
            };
            req = ajax.send();
            this.requests.push(ajax);
            if (isSelector) {
                var promise = void 0;
                var res = query.subQuerySelector.call(this, { query: query.subQuery, parent: query });
                if (res && res.length) {
                    promise = Promise.all([req, fnQueryChild(null, res)]);
                    promise.then(function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var result = args[0];
                        var pResult = _this.adaptor.processResponse(result[0], _this, query, _this.requests[0].httpRequest, _this.requests[0]);
                        var count = 0;
                        if (query.requiresCounts) {
                            count = pResult.count;
                            pResult = pResult.result;
                        }
                        var cResult = _this.adaptor.processResponse(result[1], _this, query.subQuery, _this.requests[1].httpRequest, _this.requests[1]);
                        count = 0;
                        if (query.subQuery.requiresCounts) {
                            count = cResult.count;
                            cResult = cResult.result;
                        }
                        util_2.DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, pResult, cResult, query.subQuery.key);
                        isSelector = false;
                        process(pResult, count, _this.requests[0].httpRequest);
                    });
                }
                else {
                    isSelector = false;
                }
            }
            return req;
        };
        DataManager.prototype.beforeSend = function (request, settings) {
            this.adaptor.beforeSend(this, request, settings);
            var headers = this.dataSource.headers;
            var props;
            for (var i = 0; headers && i < headers.length; i++) {
                props = [];
                var keys = Object.keys(headers[i]);
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var prop = keys_1[_i];
                    props.push(prop);
                    request.setRequestHeader(prop, headers[i][prop]);
                }
            }
        };
        DataManager.prototype.saveChanges = function (changes, key, tableName, query) {
            var _this = this;
            if (tableName instanceof query_1.Query) {
                query = tableName;
                tableName = null;
            }
            var args = {
                url: tableName,
                key: key || this.dataSource.key
            };
            var req = this.adaptor.batchRequest(this, changes, args, query);
            if (this.dataSource.offline) {
                return req;
            }
            var deff = new Deferred();
            var ajax = new ej2_base_1.Ajax(req);
            ajax.beforeSend = function () {
                _this.beforeSend(ajax.httpRequest, ajax);
            };
            ajax.onSuccess = function (data, request) {
                deff.resolve(_this, [_this.adaptor.processResponse(data, _this, null, request.httpRequest, request, changes)]);
            };
            ajax.onFailure = function (e) {
                deff.reject([{ error: e }]);
            };
            ajax.send();
            return deff.promise;
        };
        DataManager.prototype.insert = function (data, tableName, query) {
            data = util_2.DataUtil.parse.replacer(data);
            if (tableName instanceof query_1.Query) {
                query = tableName;
                tableName = null;
            }
            var req = this.adaptor.insert(this, data, tableName, query);
            if (this.dataSource.offline) {
                return req;
            }
            return this.doAjaxRequest(req);
        };
        DataManager.prototype.remove = function (keyField, value, tableName, query) {
            if (typeof value === 'object') {
                value = value[keyField];
            }
            if (tableName instanceof query_1.Query) {
                query = tableName;
                tableName = null;
            }
            var res = this.adaptor.remove(this, keyField, value, tableName, query);
            if (this.dataSource.offline) {
                return res;
            }
            return this.doAjaxRequest(res);
        };
        DataManager.prototype.update = function (keyField, value, tableName, query) {
            value = util_2.DataUtil.parse.replacer(value);
            if (tableName instanceof query_1.Query) {
                query = tableName;
                tableName = null;
            }
            var res = this.adaptor.update(this, keyField, value, tableName, query);
            if (this.dataSource.offline) {
                return res;
            }
            return this.doAjaxRequest(res);
        };
        DataManager.prototype.doAjaxRequest = function (res) {
            var _this = this;
            var defer = new Deferred();
            res = util_1.extend({}, {
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                processData: false
            }, res);
            var ajax = new ej2_base_1.Ajax(res);
            ajax.beforeSend = function () {
                _this.beforeSend(ajax.httpRequest, ajax);
            };
            ajax.onSuccess = function (record, request) {
                try {
                    util_2.DataUtil.parse.parseJson(record);
                }
                catch (e) {
                    record = [];
                }
                record = _this.adaptor.processResponse(util_2.DataUtil.parse.parseJson(record), _this, null, request.httpRequest, request);
                defer.resolve(_this, [{ record: record, dataManager: _this }]);
            };
            ajax.onFailure = function (e) {
                defer.reject([{ error: e }]);
            };
            ajax.send();
            return defer.promise;
        };
        return DataManager;
    }());
    exports.DataManager = DataManager;
    var Deferred = (function () {
        function Deferred() {
            var _this = this;
            this.promise = new Promise(function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            });
            this.then = this.promise.then.bind(this.promise);
            this.catch = this.promise.catch.bind(this.promise);
        }
        return Deferred;
    }());
    exports.Deferred = Deferred;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(17), __webpack_require__(10), __webpack_require__(16), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, manager_1, query_1, adaptors_1, util_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(manager_1);
    __export(query_1);
    __export(adaptors_1);
    __export(util_1);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(18)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, index_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(index_1);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export basicPatterns */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateFormat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser_base__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__intl_base__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);



var abbreviateRegexGlobal = /\/MMMMM|MMMM|MMM|a|LLL|EEEEE|EEEE|E|K|ccc|G+|z+/gi;
var standalone = 'stand-alone';
var weekdayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var basicPatterns = ['short', 'medium', 'long', 'full'];
var timeSetter = {
    m: 'getMinutes',
    h: 'getHours',
    H: 'getHours',
    s: 'getSeconds',
    d: 'getDate',
};
var datePartMatcher = {
    'M': 'month',
    'd': 'day',
    'E': 'weekday',
    'c': 'weekday',
    'y': 'year',
    'm': 'minute',
    'h': 'hour',
    'H': 'hour',
    's': 'second',
    'L': 'month',
    'a': 'designator',
    'z': 'timeZone',
    'Z': 'timeZone',
    'G': 'era'
};
var timeSeparator = 'timeSeparator';
var DateFormat = (function () {
    function DateFormat() {
    }
    DateFormat.dateFormat = function (culture, option, cldr) {
        var _this = this;
        var dependable = __WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].getDependables(cldr, culture);
        var formatOptions = {};
        var resPattern = option.format || __WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].getResultantPattern(option.skeleton, dependable.dateObject, option.type);
        formatOptions.dateSeperator = __WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].getDateSeparator(dependable.dateObject);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(resPattern)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["i" /* throwError */])('Format options or type given must be invalid');
        }
        else {
            formatOptions.pattern = resPattern;
            formatOptions.numMapper = __WEBPACK_IMPORTED_MODULE_0__parser_base__["a" /* ParserBase */].getNumberMapper(dependable.parserObject, __WEBPACK_IMPORTED_MODULE_0__parser_base__["a" /* ParserBase */].getNumberingSystem(cldr));
            var patternMatch = resPattern.match(abbreviateRegexGlobal) || [];
            for (var _i = 0, patternMatch_1 = patternMatch; _i < patternMatch_1.length; _i++) {
                var str = patternMatch_1[_i];
                var len = str.length;
                var char = str[0];
                if (char === 'K') {
                    char = 'h';
                }
                var charKey = datePartMatcher[char];
                switch (char) {
                    case 'E':
                    case 'c':
                        formatOptions.weekday = dependable.dateObject[__WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].days][standalone][__WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].monthIndex[len]];
                        break;
                    case 'M':
                    case 'L':
                        formatOptions.month = dependable.dateObject[__WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].month][standalone][__WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].monthIndex[len]];
                        break;
                    case 'a':
                        formatOptions.designator = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('dayPeriods.format.wide', dependable.dateObject);
                        break;
                    case 'G':
                        var eText = (len <= 3) ? 'eraAbbr' : (len === 4) ? 'eraNames' : 'eraNarrow';
                        formatOptions.era = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('eras.' + eText, dependable.dateObject);
                        break;
                    case 'z':
                        formatOptions.timeZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('dates.timeZoneNames', dependable.parserObject);
                        break;
                }
            }
        }
        return function (value) {
            if (isNaN(value.getDate())) {
                return null;
            }
            return _this.intDateFormatter(value, formatOptions);
        };
    };
    DateFormat.intDateFormatter = function (value, options) {
        var pattern = options.pattern;
        var ret = '';
        var matches = pattern.match(__WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].dateParseRegex);
        for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
            var match = matches_1[_i];
            var length_1 = match.length;
            var char = match[0];
            if (char === 'K') {
                char = 'h';
            }
            var curval = void 0;
            var isNumber = void 0;
            var processNumber = void 0;
            var curstr = '';
            switch (char) {
                case 'M':
                case 'L':
                    curval = value.getMonth() + 1;
                    if (length_1 > 2) {
                        ret += options.month[curval];
                    }
                    else {
                        isNumber = true;
                    }
                    break;
                case 'E':
                case 'c':
                    ret += options.weekday[weekdayKey[value.getDay()]];
                    break;
                case 'H':
                case 'h':
                case 'm':
                case 's':
                case 'd':
                    isNumber = true;
                    curval = value[timeSetter[char]]();
                    if (char === 'h') {
                        curval = curval % 12 || 12;
                    }
                    break;
                case 'y':
                    processNumber = true;
                    curstr += value.getFullYear();
                    if (length_1 === 2) {
                        curstr = curstr.substr(curstr.length - 2);
                    }
                    break;
                case 'a':
                    var desig = value.getHours() < 12 ? 'am' : 'pm';
                    ret += options.designator[desig];
                    break;
                case 'G':
                    var dec = value.getFullYear() < 0 ? 0 : 1;
                    ret += options.era[dec];
                    break;
                case '\'':
                    ret += (match === '\'\'') ? '\'' : match.replace(/\'/g, '');
                    break;
                case 'z':
                    var timezone = value.getTimezoneOffset();
                    var pattern_1 = (length_1 < 4) ? '+H;-H' : options.timeZone.hourFormat;
                    pattern_1 = pattern_1.replace(/:/g, options.numMapper.timeSeparator);
                    if (timezone === 0) {
                        ret += options.timeZone.gmtZeroFormat;
                    }
                    else {
                        processNumber = true;
                        curstr = this.getTimeZoneValue(timezone, pattern_1);
                    }
                    curstr = options.timeZone.gmtFormat.replace(/\{0\}/, curstr);
                    break;
                case ':':
                    ret += options.numMapper.numberSymbols[timeSeparator];
                    break;
                case '/':
                    ret += options.dateSeperator;
                    break;
                default:
                    ret += match;
            }
            if (isNumber) {
                processNumber = true;
                curstr = this.checkTwodigitNumber(curval, length_1);
            }
            if (processNumber) {
                ret += __WEBPACK_IMPORTED_MODULE_0__parser_base__["a" /* ParserBase */].convertValueParts(curstr, __WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].latnParseRegex, options.numMapper.mapper);
            }
        }
        return ret;
    };
    DateFormat.checkTwodigitNumber = function (val, len) {
        var ret = val + '';
        if (len === 2 && ret.length !== 2) {
            return '0' + ret;
        }
        return ret;
    };
    DateFormat.getTimeZoneValue = function (tVal, pattern) {
        var _this = this;
        var splt = pattern.split(';');
        var curPattern = splt[tVal > 0 ? 1 : 0];
        var no = Math.abs(tVal);
        return curPattern = curPattern.replace(/HH?|mm/g, function (str) {
            var len = str.length;
            var ishour = str.indexOf('H') !== -1;
            return _this.checkTwodigitNumber(Math.floor(ishour ? (no / 60) : (no % 60)), len);
        });
    };
    return DateFormat;
}());



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateParser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__intl_base__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parser_base__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);



var number = 'numbers';
var defNoSystem = 'defaultNumberingSystem';
var noSystem = 'numberingSystem';
var standalone = 'stand-alone';
var curWeekDay = 'curWeekDay';
var latnRegex = /^[0-9]*$/;
var abbreviateRegex = /\/MMMMM|MMMM|MMM|a|LLL|EEEEE|EEEE|E|ccc/;
var timeSetter = {
    minute: 'setMinutes',
    hour: 'setHours',
    second: 'setSeconds',
    day: 'setDate',
    month: 'setMonth'
};
var month = 'months';
var datePartMatcher = {
    'M': 'month',
    'd': 'day',
    'E': 'weekday',
    'c': 'weekday',
    'y': 'year',
    'm': 'minute',
    'h': 'hour',
    'H': 'hour',
    's': 'second',
    'L': 'month',
    'a': 'designator',
    'z': 'timeZone',
    'Z': 'timeZone',
    'G': 'era'
};
var DateParser = (function () {
    function DateParser() {
    }
    DateParser.dateParser = function (culture, option, cldr) {
        var _this = this;
        var dependable = __WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].getDependables(cldr, culture);
        var numOptions = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getCurrentNumericOptions(dependable.parserObject, __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getNumberingSystem(cldr));
        var parseOptions = {};
        var resPattern = option.format || __WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].getResultantPattern(option.skeleton, dependable.dateObject, option.type);
        var regexString = '';
        var hourOnly;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(resPattern)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["i" /* throwError */])('Format options or type given must be invalid');
        }
        else {
            parseOptions = { pattern: resPattern, evalposition: {} };
            var patternMatch = resPattern.match(__WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].dateParseRegex) || [];
            var length_1 = patternMatch.length;
            var nRegx = numOptions.numericRegex;
            for (var i = 0; i < length_1; i++) {
                var str = patternMatch[i];
                var len = str.length;
                var char = (str[0] === 'K') ? 'h' : str[0];
                var isNumber = void 0;
                var canUpdate = void 0;
                var charKey = datePartMatcher[char];
                var optional = (len === 2) ? '' : '?';
                switch (char) {
                    case 'E':
                    case 'c':
                        var weekObject = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].reverseObject(dependable.dateObject[__WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].days][standalone][__WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].monthIndex[len]]);
                        regexString += '(' + Object.keys(weekObject).join('|') + ')';
                        break;
                    case 'M':
                    case 'L':
                    case 'd':
                    case 'm':
                    case 's':
                    case 'h':
                    case 'H':
                        canUpdate = true;
                        if ((char === 'M' || char === 'L') && len > 2) {
                            parseOptions[charKey] = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].reverseObject(dependable.dateObject[month][standalone][__WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].monthIndex[len]]);
                            regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + ')';
                        }
                        else {
                            isNumber = true;
                            regexString += '(' + nRegx + nRegx + optional + ')';
                        }
                        if (char === 'h') {
                            parseOptions.hour12 = true;
                        }
                        break;
                    case 'y':
                        canUpdate = isNumber = true;
                        if (len === 2) {
                            regexString += '(' + nRegx + nRegx + ')';
                        }
                        else {
                            regexString += '(' + nRegx + '+)';
                        }
                        break;
                    case 'a':
                        canUpdate = true;
                        parseOptions[charKey] = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].reverseObject(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('dayPeriods.format.wide', dependable.dateObject));
                        regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + ')';
                        break;
                    case 'G':
                        canUpdate = true;
                        var eText = (len <= 3) ? 'eraAbbr' : (len === 4) ? 'eraNames' : 'eraNarrow';
                        parseOptions[charKey] = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].reverseObject(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('eras.' + eText, dependable.dateObject));
                        regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + '?)';
                        break;
                    case 'z':
                        var tval = new Date().getTimezoneOffset();
                        canUpdate = (tval !== 0);
                        parseOptions[charKey] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('dates.timeZoneNames', dependable.parserObject);
                        var tzone = parseOptions[charKey];
                        hourOnly = (len < 4);
                        var hpattern = hourOnly ? '+H;-H' : tzone.hourFormat;
                        regexString += '(' + this.parseTimeZoneRegx(hpattern, tzone, nRegx) + ')?';
                        break;
                    case '\'':
                        var iString = str.replace(/\'/g, '');
                        regexString += '(' + iString + ')?';
                        break;
                    default:
                        regexString += '(.)?';
                        break;
                }
                if (canUpdate) {
                    parseOptions.evalposition[charKey] = { isNumber: isNumber, pos: i + 1, hourOnly: hourOnly };
                }
                if (i === length_1 - 1 && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(regexString)) {
                    parseOptions.parserRegex = new RegExp('^' + regexString + '$');
                }
            }
        }
        return function (value) {
            var parsedDateParts = _this.internalDateParse(value, parseOptions, numOptions);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(parsedDateParts) || !Object.keys(parsedDateParts).length) {
                return null;
            }
            return _this.getDateObject(parsedDateParts);
        };
    };
    DateParser.getDateObject = function (options, value) {
        var res = value || new Date();
        var tKeys = ['hour', 'minute', 'second', 'month', 'day'];
        var y = options.year;
        var desig = options.designator;
        var tzone = options.timeZone;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(y)) {
            var len = (y + '').length;
            if (len === 2) {
                var century = Math.floor(res.getFullYear() / 100) * 100;
                y += century;
            }
            res.setFullYear(y);
        }
        for (var _i = 0, tKeys_1 = tKeys; _i < tKeys_1.length; _i++) {
            var key = tKeys_1[_i];
            var tValue = options[key];
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(tValue)) {
                if (key === 'month') {
                    tValue -= 1;
                    if (tValue < 0 || tValue > 11) {
                        return new Date('invalid');
                    }
                    var pDate = res.getDate();
                    res.setDate(1);
                    res[timeSetter[key]](tValue);
                    var lDate = new Date(res.getFullYear(), tValue + 1, 0).getDate();
                    res.setDate(pDate < lDate ? pDate : lDate);
                }
                else {
                    if (key === 'day' && (tValue < 1 || tValue > 31)) {
                        return new Date('invalid');
                    }
                    res[timeSetter[key]](tValue);
                }
            }
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(desig)) {
            var hour = res.getHours();
            if (desig === 'pm') {
                res.setHours(hour + (hour === 12 ? 0 : 12));
            }
            else if (hour === 12) {
                res.setHours(0);
            }
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(tzone)) {
            var tzValue = tzone - res.getTimezoneOffset();
            if (tzValue !== 0) {
                res.setMinutes(res.getMinutes() + tzValue);
            }
        }
        return res;
    };
    DateParser.internalDateParse = function (value, parseOptions, num) {
        var matches = value.match(parseOptions.parserRegex);
        var retOptions = { 'hour': 0, 'minute': 0, 'second': 0 };
        var nRegx = num.numericRegex;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(matches)) {
            return null;
        }
        else {
            var props = Object.keys(parseOptions.evalposition);
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var prop = props_1[_i];
                var curObject = parseOptions.evalposition[prop];
                var matchString = matches[curObject.pos];
                if (curObject.isNumber) {
                    retOptions[prop] = this.internalNumberParser(matchString, num);
                }
                else {
                    if (prop === 'timeZone' && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(matchString)) {
                        var pos = curObject.pos;
                        var val = void 0;
                        var tmatch = matches[pos + 1];
                        var flag = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(tmatch);
                        if (curObject.hourOnly) {
                            val = this.getZoneValue(flag, tmatch, matches[pos + 4], num) * 60;
                        }
                        else {
                            val = this.getZoneValue(flag, tmatch, matches[pos + 7], num) * 60;
                            val += this.getZoneValue(flag, matches[pos + 4], matches[pos + 10], num);
                        }
                        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(val)) {
                            retOptions[prop] = val;
                        }
                    }
                    else {
                        retOptions[prop] = parseOptions[prop][matchString];
                    }
                }
            }
            if (parseOptions.hour12) {
                retOptions.hour12 = true;
            }
        }
        return retOptions;
    };
    DateParser.internalNumberParser = function (value, option) {
        value = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].convertValueParts(value, option.numberParseRegex, option.numericPair);
        if (latnRegex.test(value)) {
            return +value;
        }
        return null;
    };
    DateParser.parseTimeZoneRegx = function (hourFormat, tZone, nRegex) {
        var pattern = tZone.gmtFormat;
        var ret;
        var result;
        var cRegex = '(' + nRegex + ')' + '(' + nRegex + ')';
        var splitStr;
        ret = hourFormat.replace('+', '\\+');
        if (hourFormat.indexOf('HH') !== -1) {
            ret = ret.replace(/HH|mm/g, '(' + cRegex + ')');
        }
        else {
            ret = ret.replace(/H|m/g, '(' + cRegex + '?)');
        }
        splitStr = (ret.split(';').map(function (str) {
            return pattern.replace('{0}', str);
        }));
        ret = splitStr.join('|') + '|' + tZone.gmtZeroFormat;
        return ret;
    };
    DateParser.getZoneValue = function (flag, val1, val2, num) {
        var value = this.internalNumberParser(flag ? val1 : val2, num);
        if (flag) {
            return -value;
        }
        return value;
    };
    return DateParser;
}());



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberParser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parser_base__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intl_base__ = __webpack_require__(5);



var formatRegex = /(^[ncpa]{1})([0-1]?[0-9]|20)?$/i;
var parseRegex = /^([^0-9]*)(([0-9,]*[0-9]+)(\.[0-9]+)?)([Ee][+-]?[0-9]+)?([^0-9]*)$/;
var groupRegex = /,/g;
var latnDecimalRegex = /^[0-9]*(\.[0-9]+)?$/;
var keys = ['minusSign', 'infinity'];
var NumberParser = (function () {
    function NumberParser() {
    }
    NumberParser.numberParser = function (culture, option, cldr) {
        var _this = this;
        var dependable = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getDependables(cldr, culture, true);
        var parseOptions = { custom: true };
        var numOptions;
        if ((__WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].formatRegex.test(option.format)) || !(option.format)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(parseOptions, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getProperNumericSkeleton(option.format || 'N'));
            parseOptions.custom = false;
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(parseOptions, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].customFormat(option.format, null, null));
        }
        numOptions = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getCurrentNumericOptions(dependable.parserObject, __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getNumberingSystem(cldr), true);
        parseOptions.symbolRegex = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getSymbolRegex(Object.keys(numOptions.symbolMatch));
        parseOptions.infinity = numOptions.symbolNumberSystem[keys[1]];
        var symbolpattern = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getSymbolPattern(parseOptions.type, numOptions.numberSystem, dependable.numericObject, parseOptions.isAccount);
        if (symbolpattern) {
            symbolpattern = symbolpattern.replace(/\u00A4/g, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].defaultCurrency);
            var split = symbolpattern.split(';');
            parseOptions.nData = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getFormatData(split[1] || '-' + split[0], true, '');
            parseOptions.pData = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getFormatData(split[0], true, '');
        }
        return function (value) {
            return _this.getParsedNumber(value, parseOptions, numOptions);
        };
    };
    NumberParser.getParsedNumber = function (value, options, numOptions) {
        var isNegative;
        var isPercent;
        var tempValue;
        var lead;
        var end;
        var ret;
        if (value.indexOf(options.infinity) !== -1) {
            return Infinity;
        }
        else {
            value = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].convertValueParts(value, options.symbolRegex, numOptions.symbolMatch);
            value = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].convertValueParts(value, numOptions.numberParseRegex, numOptions.numericPair);
            if (value.indexOf('.') === 0) {
                value = '0' + value;
            }
            var matches = value.match(parseRegex);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(matches)) {
                return NaN;
            }
            lead = matches[1];
            tempValue = matches[2];
            var exponent = matches[5];
            end = matches[6];
            isNegative = options.custom ? ((lead === options.nData.nlead) && (end === options.nData.nend)) :
                ((lead.indexOf(options.nData.nlead) !== -1) && (end.indexOf(options.nData.nend) !== -1));
            isPercent = isNegative ?
                options.nData.isPercent :
                options.pData.isPercent;
            tempValue = tempValue.replace(groupRegex, '');
            if (exponent) {
                tempValue += exponent;
            }
            ret = +tempValue;
            if (options.type === 'percent' || isPercent) {
                ret = ret / 100;
            }
            if (options.custom || options.fractionDigits) {
                ret = parseFloat(ret.toFixed(options.custom ?
                    (isNegative ? options.nData.maximumFractionDigits : options.pData.maximumFractionDigits) : options.fractionDigits));
            }
            if (isNegative) {
                ret *= -1;
            }
            return ret;
        }
    };
    return NumberParser;
}());



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ajax; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

var headerRegex = /^(.*?):[ \t]*([^\r\n]*)$/gm;
var defaultType = 'GET';
var Ajax = (function () {
    function Ajax(options, type, async) {
        this.mode = true;
        this.options = {};
        if (typeof options === 'string') {
            this.url = options;
            this.type = type ? type.toUpperCase() : defaultType;
            this.mode = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(async) ? async : true;
        }
        else if (typeof options === 'object') {
            this.options = options;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(this, this.options);
        }
        this.type = this.type ? this.type.toUpperCase() : defaultType;
    }
    Ajax.prototype.send = function (data) {
        var _this = this;
        this.data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(data) ? this.data : data;
        var promise = new Promise(function (resolve, reject) {
            _this.httpRequest = new XMLHttpRequest();
            _this.httpRequest.onreadystatechange = function () { _this.stateChange(resolve, reject); };
            _this.httpRequest.open(_this.type, _this.url, _this.mode);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(_this.data)) {
                _this.httpRequest.setRequestHeader('Content-Type', _this.contentType || 'application/json; charset=utf-8');
            }
            if (_this.beforeSend) {
                _this.beforeSend();
            }
            _this.httpRequest.send(!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(_this.data) ? _this.data : null);
        });
        return promise;
    };
    Ajax.prototype.successHandler = function (data) {
        if (this.onSuccess) {
            this.onSuccess(data, this);
        }
        return data;
    };
    Ajax.prototype.failureHandler = function (reason) {
        if (this.onFailure) {
            this.onFailure(this.httpRequest);
        }
        return reason;
    };
    Ajax.prototype.stateChange = function (resolve, reject) {
        var data = this.httpRequest.responseText;
        if (this.dataType && this.dataType.toLowerCase() === 'json') {
            if (data === '') {
                data = undefined;
            }
            else {
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                }
            }
        }
        if (this.httpRequest.readyState === 4) {
            if (this.httpRequest.status === 200 || this.httpRequest.status === 304) {
                resolve(this.successHandler(data));
            }
            else {
                reject(new Error(this.failureHandler(this.httpRequest.statusText)));
            }
        }
    };
    Ajax.prototype.getResponseHeader = function (key) {
        var responseHeaders;
        var header;
        responseHeaders = {};
        var headers = headerRegex.exec(this.httpRequest.getAllResponseHeaders());
        while (headers) {
            responseHeaders[headers[1].toLowerCase()] = headers[2];
            headers = headerRegex.exec(this.httpRequest.getAllResponseHeaders());
        }
        header = responseHeaders[key.toLowerCase()];
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(header) ? null : header;
    };
    return Ajax;
}());



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Animation; });
/* harmony export (immutable) */ __webpack_exports__["b"] = ripple;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notify_property_change__ = __webpack_require__(2);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var Animation = Animation_1 = (function (_super) {
    __extends(Animation, _super);
    function Animation(options) {
        var _this = _super.call(this, options, undefined) || this;
        _this.easing = {
            ease: 'cubic-bezier(0.250, 0.100, 0.250, 1.000)',
            linear: 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
            easeIn: 'cubic-bezier(0.420, 0.000, 1.000, 1.000)',
            easeOut: 'cubic-bezier(0.000, 0.000, 0.580, 1.000)',
            easeInOut: 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
            elasticInOut: 'cubic-bezier(0.5,-0.58,0.38,1.81)',
            elasticIn: 'cubic-bezier(0.17,0.67,0.59,1.81)',
            elasticOut: 'cubic-bezier(0.7,-0.75,0.99,1.01)'
        };
        return _this;
    }
    Animation.prototype.animate = function (element, options) {
        options = !options ? {} : options;
        var model = this.getModel(options);
        if (typeof element === 'string') {
            var elements = Array.prototype.slice.call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])(element, document));
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var element_1 = elements_1[_i];
                model.element = element_1;
                Animation_1.delayAnimation(model);
            }
        }
        else {
            model.element = element;
            Animation_1.delayAnimation(model);
        }
    };
    Animation.stop = function (element, model) {
        element.style.animation = '';
        element.removeAttribute('e-animate');
        var animationId = element.getAttribute('e-animation-id');
        if (animationId) {
            var frameId = parseInt(animationId, 10);
            cancelAnimationFrame(frameId);
            element.removeAttribute('e-animation-id');
        }
        if (model && model.end) {
            model.end.call(this, model);
        }
    };
    Animation.delayAnimation = function (model) {
        if (model.delay) {
            setTimeout(function () { Animation_1.applyAnimation(model); }, model.delay);
        }
        else {
            Animation_1.applyAnimation(model);
        }
    };
    Animation.applyAnimation = function (model) {
        var _this = this;
        model.timeStamp = 0;
        var step = 0;
        var timerId = 0;
        var startTime = 0;
        var prevTimeStamp = 0;
        var duration = model.duration;
        model.element.setAttribute('e-animate', 'true');
        var startAnimation = function (timeStamp) {
            try {
                if (timeStamp) {
                    prevTimeStamp = prevTimeStamp === 0 ? timeStamp : prevTimeStamp;
                    model.timeStamp = (timeStamp + model.timeStamp) - prevTimeStamp;
                    prevTimeStamp = timeStamp;
                    if (!step && model.begin) {
                        model.begin.call(_this, model);
                    }
                    step = step + 1;
                    var avg = model.timeStamp / step;
                    if (model.timeStamp < duration && model.timeStamp + avg < duration && model.element.getAttribute('e-animate')) {
                        model.element.style.animation = model.name + ' ' + model.duration + 'ms ' + model.timingFunction;
                        if (model.progress) {
                            model.progress.call(_this, model);
                        }
                        requestAnimationFrame(startAnimation);
                    }
                    else {
                        cancelAnimationFrame(timerId);
                        model.element.removeAttribute('e-animation-id');
                        model.element.removeAttribute('e-animate');
                        model.element.style.animation = '';
                        if (model.end) {
                            model.end.call(_this, model);
                        }
                    }
                }
                else {
                    startTime = performance.now();
                    timerId = requestAnimationFrame(startAnimation);
                    model.element.setAttribute('e-animation-id', timerId.toString());
                }
            }
            catch (e) {
                cancelAnimationFrame(timerId);
                model.element.removeAttribute('e-animation-id');
                if (model.fail) {
                    model.fail.call(_this, e);
                }
            }
        };
        startAnimation();
    };
    Animation.prototype.getModel = function (options) {
        return {
            name: options.name || this.name,
            delay: options.delay || this.delay,
            duration: (options.duration !== undefined ? options.duration : this.duration),
            begin: options.begin || this.begin,
            end: options.end || this.end,
            fail: options.fail || this.fail,
            progress: options.progress || this.progress,
            timingFunction: this.easing[options.timingFunction] ? this.easing[options.timingFunction] :
                (options.timingFunction || this.easing[this.timingFunction])
        };
    };
    Animation.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    Animation.prototype.getModuleName = function () {
        return 'animation';
    };
    Animation.prototype.destroy = function () {
    };
    return Animation;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])('FadeIn')
], Animation.prototype, "name", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(400)
], Animation.prototype, "duration", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])('ease')
], Animation.prototype, "timingFunction", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(0)
], Animation.prototype, "delay", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Animation.prototype, "progress", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Animation.prototype, "begin", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Animation.prototype, "end", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Animation.prototype, "fail", void 0);
Animation = Animation_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_3__notify_property_change__["e" /* NotifyPropertyChanges */]
], Animation);

function ripple(element, selector) {
    element.setAttribute('e-ripple', 'true');
    __WEBPACK_IMPORTED_MODULE_2__event_handler__["a" /* EventHandler */].add(element, 'mousedown', rippleHandler, { parent: element, selector: selector });
    __WEBPACK_IMPORTED_MODULE_2__event_handler__["a" /* EventHandler */].add(element, 'mouseup', rippleRemoveHandler, { parent: element, selector: selector });
    return (function () {
        element.removeAttribute('e-ripple');
        __WEBPACK_IMPORTED_MODULE_2__event_handler__["a" /* EventHandler */].remove(element, 'mousedown', rippleHandler);
        __WEBPACK_IMPORTED_MODULE_2__event_handler__["a" /* EventHandler */].remove(element, 'mouseup', rippleHandler);
    });
}
function rippleHandler(e) {
    var target = (e.target);
    var element = this.selector ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["g" /* closest */])(target, this.selector) : target;
    if (!element) {
        return;
    }
    var offset = element.getBoundingClientRect();
    var offsetX = e.pageX - document.body.scrollLeft;
    var offsetY = e.pageY - document.body.scrollTop;
    var pageX = Math.max(Math.abs(offsetX - offset.left), Math.abs(offsetX - offset.right));
    var pageY = Math.max(Math.abs(offsetY - offset.top), Math.abs(offsetY - offset.bottom));
    var radius = Math.sqrt(pageX * pageX + pageY * pageY);
    var diameter = radius * 2;
    var x = offsetX - offset.left - radius;
    var y = offsetY - offset.top - radius;
    element.classList.add('e-ripple');
    var styles = 'width: ' + diameter + 'px;height: ' + diameter + 'px;left: ' + x + 'px;top: ' + y + 'px;' +
        'transition-duration: 350ms;';
    var rippleElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["c" /* createElement */])('div', { className: 'e-ripple-element', styles: styles });
    element.appendChild(rippleElement);
    window.getComputedStyle(rippleElement).getPropertyValue('opacity');
    rippleElement.style.transform = 'scale(1)';
}
function rippleRemoveHandler(e) {
    var duration = 350;
    var target = (e.target);
    var element = this.selector ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["g" /* closest */])(target, this.selector) : target;
    if (!element) {
        return;
    }
    var rippleElements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])('.e-ripple-element', element);
    var rippleElement = rippleElements[rippleElements.length - 1];
    setTimeout(function () {
        rippleElement.parentNode.removeChild(rippleElement);
        if (!element.getElementsByClassName('e-ripple-element').length) {
            element.classList.remove('e-ripple');
        }
    }, duration);
}
var Animation_1;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanvasRenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

var CanvasRenderer = (function () {
    function CanvasRenderer(rootID) {
        this.rootId = rootID;
    }
    CanvasRenderer.prototype.getOptionValue = function (options, key) {
        return options[key];
    };
    CanvasRenderer.prototype.createCanvas = function (options) {
        var canvasObj = document.createElement('canvas');
        canvasObj.setAttribute('id', this.rootId + '_canvas');
        this.ctx = canvasObj.getContext('2d');
        this.canvasObj = canvasObj;
        this.setCanvasSize(options.width, options.height);
        return this.canvasObj;
    };
    CanvasRenderer.prototype.setCanvasSize = function (width, height) {
        var element = document.getElementById(this.rootId);
        var size = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(element) ? element.getBoundingClientRect() : null;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.width)) {
            this.canvasObj.setAttribute('width', width ? width.toString() : size.width.toString());
        }
        else {
            this.canvasObj.setAttribute('width', this.width.toString());
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.height)) {
            this.canvasObj.setAttribute('height', height ? height.toString() : '450');
        }
        else {
            this.canvasObj.setAttribute('height', this.height.toString());
        }
    };
    CanvasRenderer.prototype.setAttributes = function (options) {
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        var dashArray = this.getOptionValue(options, 'stroke-dasharray');
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(dashArray)) {
            var dashArrayString = dashArray.split(',');
            this.ctx.setLineDash([parseInt(dashArrayString[0], 10), parseInt(dashArrayString[1], 10)]);
        }
        this.ctx.strokeStyle = this.getOptionValue(options, 'stroke');
    };
    CanvasRenderer.prototype.drawLine = function (options) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        this.ctx.strokeStyle = options.stroke;
        this.ctx.moveTo(options.x1, options.y1);
        this.ctx.lineTo(options.x2, options.y2);
        this.ctx.stroke();
        this.ctx.restore();
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawRectangle = function (options) {
        var canvasCtx = this.ctx;
        var cornerRadius = options.rx;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.globalAlpha = this.getOptionValue(options, 'opacity');
        this.setAttributes(options);
        this.ctx.rect(options.x, options.y, options.width, options.height);
        if (cornerRadius !== null && cornerRadius >= 0) {
            this.drawCornerRadius(options);
        }
        else {
            if (options.fill === 'none') {
                options.fill = 'transparent';
            }
            this.ctx.fillStyle = options.fill;
            this.ctx.fillRect(options.x, options.y, options.width, options.height);
            this.ctx.stroke();
        }
        this.ctx.restore();
        this.ctx = canvasCtx;
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawCornerRadius = function (options) {
        var cornerRadius = options.rx;
        var x = options.x;
        var y = options.y;
        var width = options.width;
        var height = options.height;
        if (options.fill === 'none') {
            options.fill = 'transparent';
        }
        this.ctx.fillStyle = options.fill;
        if (width < 2 * cornerRadius) {
            cornerRadius = width / 2;
        }
        if (height < 2 * cornerRadius) {
            cornerRadius = height / 2;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(x + width - cornerRadius, y);
        this.ctx.arcTo(x + width, y, x + width, y + height, cornerRadius);
        this.ctx.arcTo(x + width, y + height, x, y + height, cornerRadius);
        this.ctx.arcTo(x, y + height, x, y, cornerRadius);
        this.ctx.arcTo(x, y, x + width, y, cornerRadius);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawPath = function (options, canvasTranslate) {
        var path = options.d;
        var dataSplit = path.split(' ');
        var borderWidth = this.getOptionValue(options, 'stroke-width');
        var canvasCtx = this.ctx;
        var flag = true;
        this.ctx.save();
        this.ctx.beginPath();
        if (canvasTranslate) {
            this.ctx.translate(canvasTranslate[0], canvasTranslate[1]);
        }
        this.ctx.globalAlpha = options.opacity ? options.opacity : this.getOptionValue(options, 'fill-opacity');
        this.setAttributes(options);
        for (var i = 0; i < dataSplit.length; i = i + 3) {
            var x1 = parseFloat(dataSplit[i + 1]);
            var y1 = parseFloat(dataSplit[i + 2]);
            switch (dataSplit[i]) {
                case 'M':
                    if (!options.innerR && !options.cx) {
                        this.ctx.moveTo(x1, y1);
                    }
                    break;
                case 'L':
                    if (!options.innerR) {
                        this.ctx.lineTo(x1, y1);
                    }
                    break;
                case 'C':
                    var c1 = parseFloat(dataSplit[i + 3]);
                    var c2 = parseFloat(dataSplit[i + 4]);
                    var c3 = parseFloat(dataSplit[i + 5]);
                    var c4 = parseFloat(dataSplit[i + 6]);
                    this.ctx.bezierCurveTo(x1, y1, c1, c2, c3, c4);
                    i = i + 4;
                    break;
                case 'A':
                    if (!options.innerR) {
                        if (options.cx) {
                            this.ctx.arc(options.cx, options.cy, options.radius, 0, 2 * Math.PI, options.counterClockWise);
                        }
                        else {
                            this.ctx.moveTo(options.x, options.y);
                            this.ctx.arc(options.x, options.y, options.radius, options.start, options.end, options.counterClockWise);
                            this.ctx.lineTo(options.x, options.y);
                        }
                    }
                    else if (flag) {
                        this.ctx.arc(options.x, options.y, options.radius, options.start, options.end, options.counterClockWise);
                        this.ctx.arc(options.x, options.y, options.innerR, options.end, options.start, !options.counterClockWise);
                        flag = false;
                    }
                    i = i + 5;
                    break;
                case 'z':
                    this.ctx.closePath();
                    break;
            }
        }
        if (options.fill !== 'none' && options.fill !== undefined) {
            this.ctx.fillStyle = options.fill;
            this.ctx.fill();
        }
        if (borderWidth > 0) {
            this.ctx.stroke();
        }
        this.ctx.restore();
        this.ctx = canvasCtx;
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawText = function (options, label) {
        var fontWeight = this.getOptionValue(options, 'font-weight');
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(fontWeight) && fontWeight.toLowerCase() === 'regular') {
            fontWeight = 'normal';
        }
        var fontSize = this.getOptionValue(options, 'font-size');
        var fontFamily = this.getOptionValue(options, 'font-family');
        var fontStyle = this.getOptionValue(options, 'font-style').toLowerCase();
        var font = (fontStyle + ' ' + fontWeight + ' ' + fontSize + ' ' + fontFamily);
        var anchor = this.getOptionValue(options, 'text-anchor');
        var opacity = options.opacity !== undefined ? options.opacity : 1;
        if (anchor === 'middle') {
            anchor = 'center';
        }
        this.ctx.save();
        this.ctx.fillStyle = options.fill;
        this.ctx.font = font;
        this.ctx.textAlign = anchor;
        this.ctx.globalAlpha = opacity;
        if (options.baseline) {
            this.ctx.textBaseline = options.baseline;
        }
        var txtlngth = 0;
        this.ctx.translate(options.x + (txtlngth / 2), options.y);
        this.ctx.rotate(options.labelRotation * Math.PI / 180);
        this.ctx.fillText(label, 0, 0);
        this.ctx.restore();
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawCircle = function (options) {
        var canvasCtx = this.ctx;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(options.cx, options.cy, options.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = options.fill;
        this.ctx.globalAlpha = options.opacity;
        this.ctx.fill();
        this.setAttributes(options);
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx = canvasCtx;
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawPolyline = function (options) {
        this.ctx.save();
        this.ctx.beginPath();
        var points = options.points.split(' ');
        for (var i = 0; i < points.length - 1; i++) {
            var point = points[i].split(',');
            var x = parseFloat(point[0]);
            var y = parseFloat(point[1]);
            if (i === 0) {
                this.ctx.moveTo(x, y);
            }
            else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        this.ctx.strokeStyle = options.stroke;
        this.ctx.stroke();
        this.ctx.restore();
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawEllipse = function (options) {
        var canvasCtx = this.ctx;
        var circumference = Math.max(options.rx, options.ry);
        var scaleX = options.rx / circumference;
        var scaleY = options.ry / circumference;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(options.cx, options.cy);
        this.ctx.save();
        this.ctx.scale(scaleX, scaleY);
        this.ctx.arc(0, 0, circumference, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = options.fill;
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        this.ctx.strokeStyle = options.stroke;
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx = canvasCtx;
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawImage = function (options) {
        this.ctx.save();
        var imageObj = new Image();
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(options.href)) {
            imageObj.src = options.href;
            this.ctx.drawImage(imageObj, options.x, options.y, options.width, options.height);
        }
        this.ctx.restore();
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.createLinearGradient = function (colors) {
        var myGradient;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(colors[0].colorStop)) {
            myGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvasObj.height);
        }
        var color = this.setGradientValues(colors, myGradient);
        return color;
    };
    CanvasRenderer.prototype.createRadialGradient = function (colors) {
        var myGradient;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(colors[0].colorStop)) {
            myGradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, this.canvasObj.height);
        }
        var colorName = this.setGradientValues(colors, myGradient);
        return colorName;
    };
    CanvasRenderer.prototype.setGradientValues = function (colors, myGradient) {
        var colorName;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(colors[0].colorStop)) {
            for (var i = 0; i <= colors.length - 1; i++) {
                var color = colors[i].color;
                var newColorStop = (colors[i].colorStop).slice(0, -1);
                var stopColor = parseInt(newColorStop, 10) / 100;
                myGradient.addColorStop(stopColor, color);
            }
            colorName = myGradient.toString();
        }
        else {
            colorName = colors[0].color.toString();
        }
        this.dataUrl = this.canvasObj.toDataURL();
        return colorName;
    };
    CanvasRenderer.prototype.setElementAttributes = function (options, element) {
        var keys = Object.keys(options);
        var values = Object.keys(options).map(function (key) { return options[key]; });
        for (var i = 0; i < keys.length; i++) {
            element.setAttribute(keys[i], values[i]);
        }
        return element;
    };
    CanvasRenderer.prototype.updateCanvasAttributes = function (options) {
        this.setElementAttributes(options, this.canvasObj);
        var ctx = this.ctx;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.dataUrl)) {
            var img_1 = new Image;
            img_1.onload = function () {
                ctx.drawImage(img_1, 0, 0);
            };
            img_1.src = this.dataUrl;
        }
    };
    return CanvasRenderer;
}());



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_loader__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__observer__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__child_property__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notify_property_change__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__internationalization__ = __webpack_require__(9);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var Component = (function (_super) {
    __extends(Component, _super);
    function Component(options, selector) {
        var _this = _super.call(this, options, selector) || this;
        _this.needsID = false;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(_this.enableRtl)) {
            _this.setProperties({ 'enableRtl': __WEBPACK_IMPORTED_MODULE_6__internationalization__["b" /* rightToLeft */] }, true);
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(_this.locale)) {
            _this.setProperties({ 'locale': __WEBPACK_IMPORTED_MODULE_6__internationalization__["d" /* defaultCulture */] }, true);
        }
        _this.moduleLoader = new __WEBPACK_IMPORTED_MODULE_1__module_loader__["a" /* ModuleLoader */](_this);
        _this.localObserver = new __WEBPACK_IMPORTED_MODULE_3__observer__["a" /* Observer */](_this);
        _this.detectFunction = new Function('args', 'var prop = Object.keys(args); if(prop.length){this[prop[0]] = args[prop[0]];}');
        __WEBPACK_IMPORTED_MODULE_6__internationalization__["a" /* onIntlChange */].on('notifyExternalChange', _this.detectFunction, _this);
        if (_this.enablePersistence) {
            window.addEventListener('unload', _this.setPersistData.bind(_this));
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(selector)) {
            _this.appendTo();
        }
        return _this;
    }
    Component.prototype.requiredModules = function () {
        return [];
    };
    ;
    Component.prototype.destroy = function () {
        this.trigger('destroyed', { cancel: false });
        _super.prototype.destroy.call(this);
        __WEBPACK_IMPORTED_MODULE_6__internationalization__["a" /* onIntlChange */].off('notifyExternalChange', this.detectFunction);
        this.moduleLoader.clean();
        this.localObserver.destroy();
        if (this.enablePersistence) {
            this.setPersistData();
        }
    };
    Component.prototype.refresh = function () {
        this.clearChanges();
        this.preRender();
        this.injectModules();
        this.render();
    };
    Component.prototype.appendTo = function (selector) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(selector) && typeof (selector) === 'string') {
            this.element = document.querySelector(selector);
        }
        else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(selector)) {
            this.element = selector;
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.element)) {
            if (this.needsID && !this.element.id) {
                this.element.id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["m" /* getUniqueID */])(this.getModuleName());
            }
            this.isProtectedOnChange = false;
            var inst = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('ej2_instances', this.element);
            if (!inst || inst.indexOf(this) === -1) {
                _super.prototype.addInstance.call(this);
            }
            this.preRender();
            if (this.enablePersistence) {
                this.mergePersistData();
            }
            this.injectModules();
            this.render();
            this.trigger('created');
        }
    };
    Component.prototype.dataBind = function () {
        this.injectModules();
        _super.prototype.dataBind.call(this);
    };
    ;
    Component.prototype.on = function (event, handler, context) {
        if (typeof event === 'string') {
            this.localObserver.on(event, handler, context);
        }
        else {
            for (var _i = 0, event_1 = event; _i < event_1.length; _i++) {
                var arg = event_1[_i];
                this.localObserver.on(arg.event, arg.handler, arg.context);
            }
        }
    };
    Component.prototype.off = function (event, handler) {
        if (typeof event === 'string') {
            this.localObserver.off(event, handler);
        }
        else {
            for (var _i = 0, event_2 = event; _i < event_2.length; _i++) {
                var arg = event_2[_i];
                this.localObserver.off(arg.event, arg.handler);
            }
        }
    };
    Component.prototype.notify = function (property, argument) {
        this.localObserver.notify(property, argument);
    };
    Component.prototype.getInjectedModules = function () {
        return this.injectedModules;
    };
    ;
    Component.Inject = function () {
        var moduleList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            moduleList[_i] = arguments[_i];
        }
        if (!this.prototype.injectedModules) {
            this.prototype.injectedModules = [];
        }
        for (var i = 0; i < moduleList.length; i++) {
            if (this.prototype.injectedModules.indexOf(moduleList[i]) === -1) {
                this.prototype.injectedModules.push(moduleList[i]);
            }
        }
    };
    Component.prototype.injectModules = function () {
        if (this.injectedModules && this.injectedModules.length) {
            this.moduleLoader.inject(this.requiredModules(), this.injectedModules);
        }
    };
    Component.prototype.mergePersistData = function () {
        var data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        if (!(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(data) || (data === ''))) {
            this.setProperties(JSON.parse(data), true);
        }
    };
    Component.prototype.setPersistData = function () {
        window.localStorage.setItem(this.getModuleName() + this.element.id, this.getPersistData());
    };
    Component.prototype.addOnPersist = function (options) {
        var _this = this;
        var persistObj = {};
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var key = options_1[_i];
            var objValue = void 0;
            objValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(key, this);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(objValue)) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])(key, this.getActualProperties(objValue), persistObj);
            }
        }
        return JSON.stringify(persistObj, function (key, value) {
            return _this.getActualProperties(value);
        });
    };
    Component.prototype.getActualProperties = function (obj) {
        if (obj instanceof __WEBPACK_IMPORTED_MODULE_4__child_property__["a" /* ChildProperty */]) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('properties', obj);
        }
        else {
            return obj;
        }
    };
    Component.prototype.ignoreOnPersist = function (options) {
        return JSON.stringify(this.iterateJsonProperties(this.properties, options));
    };
    Component.prototype.iterateJsonProperties = function (obj, ignoreList) {
        var newObj = {};
        var _loop_1 = function (key) {
            if (ignoreList.indexOf(key) === -1) {
                var value = obj[key];
                if (typeof value === 'object' && !(value instanceof Array)) {
                    var newList = ignoreList.filter(function (str) {
                        return new RegExp(key + '.').test(str);
                    }).map(function (str) {
                        return str.replace(key + '.', '');
                    });
                    newObj[key] = this_1.iterateJsonProperties(this_1.getActualProperties(value), newList);
                }
                else {
                    newObj[key] = value;
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_1(key);
        }
        return newObj;
    };
    return Component;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* Base */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__notify_property_change__["a" /* Property */])(false)
], Component.prototype, "enablePersistence", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__notify_property_change__["a" /* Property */])()
], Component.prototype, "enableRtl", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__notify_property_change__["a" /* Property */])()
], Component.prototype, "locale", void 0);
Component = __decorate([
    __WEBPACK_IMPORTED_MODULE_5__notify_property_change__["e" /* NotifyPropertyChanges */]
], Component);



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Draggable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notify_property_change__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__child_property__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var defaultPosition = { left: 0, right: 0, top: 0, bottom: 0 };
var positionProp = ['offsetLeft', 'offsetTop'];
var Position = (function (_super) {
    __extends(Position, _super);
    function Position() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Position;
}(__WEBPACK_IMPORTED_MODULE_5__child_property__["a" /* ChildProperty */]));

__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(0)
], Position.prototype, "left", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(0)
], Position.prototype, "right", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(0)
], Position.prototype, "top", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(0)
], Position.prototype, "bottom", void 0);
var Draggable = Draggable_1 = (function (_super) {
    __extends(Draggable, _super);
    function Draggable(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.dragLimit = Draggable_1.getDefaultPosition();
        _this.borderWidth = Draggable_1.getDefaultPosition();
        _this.padding = Draggable_1.getDefaultPosition();
        _this.diffX = 0;
        _this.diffY = 0;
        _this.droppables = {};
        _this.bind();
        return _this;
    }
    Draggable.prototype.bind = function () {
        this.toggleEvents();
        if (__WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].isIE) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["f" /* addClass */])([this.element], 'e-block-touch');
        }
        this.droppables[this.scope] = {};
    };
    Draggable.getDefaultPosition = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["a" /* extend */])({}, defaultPosition);
    };
    Draggable.prototype.toggleEvents = function (isUnWire) {
        var ele;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* isUndefined */])(this.handle)) {
            ele = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["a" /* select */])(this.handle);
        }
        if (isUnWire) {
            __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(ele || this.element, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchStartEvent, this.initialize);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(ele || this.element, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchStartEvent, this.initialize, this);
        }
    };
    Draggable.prototype.initialize = function (evt) {
        this.target = evt.currentTarget;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* isUndefined */])(evt.changedTouches)) {
            evt.preventDefault();
        }
        if (this.abort) {
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* isNullOrUndefined */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["g" /* closest */])(evt.target, this.abort))) {
                return;
            }
        }
        this.element.setAttribute('aria-grabbed', 'true');
        var intCoord = this.getCoordinates(evt);
        this.initialPosition = { x: intCoord.pageX, y: intCoord.pageY };
        if (!this.clone) {
            var pos = this.element.getBoundingClientRect();
            this.relativeXPosition = intCoord.pageX - pos.left;
            this.relativeYPosition = intCoord.pageY - pos.top;
        }
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchMoveEvent, this.intDragStart, this);
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDestroy, this);
        this.toggleEvents(true);
        document.body.classList.add('e-prevent-select');
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].trigger(document.documentElement, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchStartEvent, evt);
    };
    Draggable.prototype.intDragStart = function (evt) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* isUndefined */])(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
            return;
        }
        var intCordinate = this.getCoordinates(evt);
        var pos;
        var styleProp = getComputedStyle(this.element);
        this.margin = {
            left: parseInt(styleProp.marginLeft, 10),
            top: parseInt(styleProp.marginTop, 10),
            right: parseInt(styleProp.marginRight, 10),
            bottom: parseInt(styleProp.marginBottom, 10),
        };
        var element = this.element;
        if (this.clone && this.dragTarget) {
            var intClosest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["g" /* closest */])(evt.target, this.dragTarget);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* isNullOrUndefined */])(intClosest)) {
                element = intClosest;
            }
        }
        this.offset = this.calculateParentPosition(element);
        this.position = this.getMousePosition(evt);
        var x = this.initialPosition.x - intCordinate.pageX;
        var y = this.initialPosition.y - intCordinate.pageY;
        var distance = Math.sqrt((x * x) + (y * y));
        if (distance >= this.distance) {
            var ele = this.getHelperElement(evt);
            if (!ele || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* isNullOrUndefined */])(ele)) {
                return;
            }
            var dragTargetElement = this.helperElement = ele;
            this.parentClientRect = this.calculateParentPosition(dragTargetElement.offsetParent);
            if (this.dragStart) {
                var curTarget = this.getProperTargetElement(evt);
                this.trigger('dragStart', { event: evt, element: element, target: curTarget });
            }
            if (this.dragArea) {
                this.setDragArea();
            }
            else {
                this.dragLimit = { left: 0, right: 0, bottom: 0, top: 0 };
                this.borderWidth = { top: 0, left: 0 };
            }
            pos = { left: this.position.left - this.parentClientRect.left, top: this.position.top - this.parentClientRect.top };
            if (this.clone) {
                this.diffX = this.position.left - this.offset.left;
                this.diffY = this.position.top - this.offset.top;
            }
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["h" /* setStyleAttribute */])(dragTargetElement, {
                position: 'absolute', top: (pos.top - this.diffY) + 'px', left: (pos.left - this.diffX) + 'px'
            });
            __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchMoveEvent, this.intDragStart);
            __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDestroy);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["d" /* isVisible */])(dragTargetElement)) {
                __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchMoveEvent, this.intDrag, this);
                __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDragStop, this);
                this.setGlobalDroppables(false, this.element, dragTargetElement);
            }
            else {
                document.body.classList.remove('e-prevent-select');
            }
        }
    };
    Draggable.prototype.calculateParentPosition = function (ele) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* isNullOrUndefined */])(ele)) {
            return { left: 0, top: 0 };
        }
        var rect = ele.getBoundingClientRect();
        var style = getComputedStyle(ele);
        return {
            left: (rect.left + window.pageXOffset) - parseInt(style.marginLeft, 10),
            top: (rect.top + window.pageYOffset) - parseInt(style.marginTop, 10)
        };
    };
    Draggable.prototype.intDrag = function (evt) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* isUndefined */])(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
            return;
        }
        var left;
        var top;
        this.position = this.getMousePosition(evt);
        var docHeight = this.getDocumentWidthHeight('Height');
        if (docHeight < this.position.top) {
            this.position.top = docHeight;
        }
        var docWidth = this.getDocumentWidthHeight('Width');
        if (docWidth < this.position.left) {
            this.position.left = docWidth;
        }
        if (this.drag) {
            var curTarget = this.getProperTargetElement(evt);
            this.trigger('drag', { event: evt, element: this.element, target: curTarget });
        }
        var eleObj = this.checkTargetElement(evt);
        if (eleObj.target && eleObj.instance) {
            eleObj.instance.intOver(evt, eleObj.target);
            eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
            this.hoverObject = eleObj;
        }
        else if (this.hoverObject) {
            this.hoverObject.instance.intOut(evt, eleObj.target);
            this.hoverObject.instance.dragData[this.scope] = null;
            this.hoverObject = null;
        }
        var helperElement = this.droppables[this.scope].helper;
        this.parentClientRect = this.calculateParentPosition(this.helperElement.offsetParent);
        var tLeft = this.parentClientRect.left;
        var tTop = this.parentClientRect.top;
        var intCoord = this.getCoordinates(evt);
        var pagex = intCoord.pageX;
        var pagey = intCoord.pageY;
        var dLeft = this.position.left - this.diffX;
        var dTop = this.position.top - this.diffY;
        if (this.dragArea) {
            var styles = getComputedStyle(helperElement);
            if (this.pageX !== pagex) {
                var helperWidth = helperElement.offsetWidth + (parseFloat(styles.marginLeft)
                    + parseFloat(styles.marginRight));
                if (this.dragLimit.left > dLeft) {
                    left = this.dragLimit.left;
                }
                else if (this.dragLimit.right < dLeft + helperWidth) {
                    left = this.dragLimit.right - helperWidth;
                }
                else {
                    left = dLeft;
                }
            }
            if (this.pageY !== pagey) {
                var helperHeight = helperElement.offsetHeight + (parseFloat(styles.marginTop)
                    + parseFloat(styles.marginBottom));
                if (this.dragLimit.top > dTop) {
                    top = this.dragLimit.top;
                }
                else if (this.dragLimit.bottom < dTop + helperHeight) {
                    top = this.dragLimit.bottom - helperHeight;
                }
                else {
                    top = dTop;
                }
            }
        }
        else {
            left = dLeft;
            top = dTop;
        }
        var iTop = tTop + this.borderWidth.top;
        var iLeft = tLeft + this.borderWidth.left;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["h" /* setStyleAttribute */])(helperElement, { top: (top - iTop) + 'px', left: (left - iLeft) + 'px' });
        this.position.left = left;
        this.position.top = top;
        this.pageX = pagex;
        this.pageY = pagey;
    };
    Draggable.prototype.getDocumentWidthHeight = function (str) {
        var docBody = document.body;
        var docEle = document.documentElement;
        var returnValue = Math.max(docBody['scroll' + str], docEle['scroll' + str], docBody['offset' + str], docEle['offset' + str], docEle['client' + str]);
        return returnValue;
    };
    Draggable.prototype.intDragStop = function (evt) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* isUndefined */])(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
            return;
        }
        var type = ['touchend', 'pointerup', 'mouseup'];
        if (type.indexOf(evt.type) !== -1) {
            if (this.dragStop) {
                var curTarget = this.getProperTargetElement(evt);
                this.trigger('dragStop', { event: evt, element: this.element, target: curTarget, helper: this.helperElement });
            }
            this.intDestroy(evt);
        }
        else {
            this.element.setAttribute('aria-grabbed', 'false');
        }
        var eleObj = this.checkTargetElement(evt);
        if (eleObj.target && eleObj.instance) {
            eleObj.instance.dragStopCalled = true;
            eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
            eleObj.instance.intDrop(evt, eleObj.target);
        }
        this.setGlobalDroppables(true);
        document.body.classList.remove('e-prevent-select');
    };
    Draggable.prototype.intDestroy = function (evt) {
        this.toggleEvents();
        document.body.classList.remove('e-prevent-select');
        this.element.setAttribute('aria-grabbed', 'false');
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchMoveEvent, this.intDragStart);
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDragStop);
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDestroy);
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchMoveEvent, this.intDrag);
    };
    Draggable.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    Draggable.prototype.getModuleName = function () {
        return 'draggable';
    };
    Draggable.prototype.setDragArea = function () {
        var eleWidthBound;
        var eleHeightBound;
        var top = 0;
        var left = 0;
        var ele;
        var type = typeof this.dragArea;
        if (type === 'string') {
            ele = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["a" /* select */])(this.dragArea);
        }
        else {
            ele = this.dragArea;
        }
        if (ele) {
            var elementArea = ele.getBoundingClientRect();
            eleWidthBound = elementArea.width ? elementArea.width : elementArea.right - elementArea.left;
            eleHeightBound = elementArea.height ? elementArea.height : elementArea.bottom - elementArea.top;
            var keys = ['Top', 'Left', 'Bottom', 'Right'];
            var styles = getComputedStyle(ele);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var tborder = styles['border' + key + 'Width'];
                var tpadding = styles['padding' + key];
                var lowerKey = key.toLowerCase();
                this.borderWidth[lowerKey] = isNaN(parseFloat(tborder)) ? 0 : parseFloat(tborder);
                this.padding[lowerKey] = isNaN(parseFloat(tpadding)) ? 0 : parseFloat(tpadding);
            }
            top = elementArea.top;
            left = elementArea.left;
            this.dragLimit.left = left + this.borderWidth.left + this.padding.left;
            this.dragLimit.top = top + this.borderWidth.top + this.padding.top;
            this.dragLimit.right = left + eleWidthBound - (this.borderWidth.right + this.padding.right);
            this.dragLimit.bottom = top + eleHeightBound - (this.borderWidth.bottom + this.padding.bottom);
        }
    };
    Draggable.prototype.getProperTargetElement = function (evt) {
        var intCoord = this.getCoordinates(evt);
        var ele;
        if (evt.target === this.helperElement || evt.type.indexOf('touch') !== -1) {
            this.helperElement.style.display = 'none';
            ele = document.elementFromPoint(intCoord.clientX, intCoord.clientY);
            this.helperElement.style.display = '';
        }
        else {
            ele = evt.target;
        }
        return ele;
    };
    Draggable.prototype.getMousePosition = function (evt) {
        var intCoord = this.getCoordinates(evt);
        var pageX = this.clone ? intCoord.pageX : intCoord.pageX - this.relativeXPosition;
        var pageY = this.clone ? intCoord.pageY : intCoord.pageY - this.relativeYPosition;
        return {
            left: pageX - (this.margin.left + this.cursorAt.left),
            top: pageY - (this.margin.top + this.cursorAt.top)
        };
    };
    Draggable.prototype.getCoordinates = function (evt) {
        if (evt.type.indexOf('touch') > -1) {
            return evt.changedTouches[0];
        }
        return evt;
    };
    Draggable.prototype.getHelperElement = function (evt) {
        var element;
        if (this.clone) {
            if (this.helper) {
                element = this.helper({ sender: evt, element: this.target });
            }
            else {
                element = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["c" /* createElement */])('div', { className: 'e-drag-helper e-block-touch', innerHTML: 'Draggable' });
                document.body.appendChild(element);
            }
        }
        else {
            element = this.element;
        }
        return element;
    };
    Draggable.prototype.setGlobalDroppables = function (reset, drag, helper) {
        this.droppables[this.scope] = reset ? null : {
            draggable: drag,
            helper: helper
        };
    };
    Draggable.prototype.checkTargetElement = function (evt) {
        var target = this.getProperTargetElement(evt);
        if (this.helperElement && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["k" /* compareElementParent */])(target, this.helperElement)) {
            this.helperElement.style.display = 'none';
            var cord = this.getCoordinates(evt);
            target = document.elementFromPoint(cord.clientX, cord.clientY);
            this.helperElement.style.display = '';
        }
        var dropIns = this.getDropInstance(target);
        if (!dropIns && target && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* isNullOrUndefined */])(target.parentNode)) {
            var parent_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["g" /* closest */])(target.parentNode, '.e-droppable') || target.parentElement;
            if (parent_1) {
                dropIns = this.getDropInstance(parent_1);
            }
        }
        return { target: target, instance: dropIns };
    };
    Draggable.prototype.getDropInstance = function (ele) {
        var name = 'getModuleName';
        var drop;
        var eleInst = ele && ele.ej2_instances;
        if (eleInst) {
            for (var _i = 0, eleInst_1 = eleInst; _i < eleInst_1.length; _i++) {
                var inst = eleInst_1[_i];
                if (inst[name]() === 'droppable') {
                    drop = inst;
                    break;
                }
            }
        }
        return drop;
    };
    Draggable.prototype.destroy = function () {
        this.toggleEvents(true);
        _super.prototype.destroy.call(this);
    };
    return Draggable;
}(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["b" /* Complex */])({}, Position)
], Draggable.prototype, "cursorAt", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(true)
], Draggable.prototype, "clone", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])()
], Draggable.prototype, "dragArea", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Draggable.prototype, "drag", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Draggable.prototype, "dragStart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Draggable.prototype, "dragStop", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(1)
], Draggable.prototype, "distance", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])()
], Draggable.prototype, "handle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])()
], Draggable.prototype, "abort", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])()
], Draggable.prototype, "helper", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])('default')
], Draggable.prototype, "scope", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])('')
], Draggable.prototype, "dragTarget", void 0);
Draggable = Draggable_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_3__notify_property_change__["e" /* NotifyPropertyChanges */]
], Draggable);

var Draggable_1;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Droppable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notify_property_change__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var Droppable = (function (_super) {
    __extends(Droppable, _super);
    function Droppable(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.mouseOver = false;
        _this.dragData = {};
        _this.dragStopCalled = false;
        _this.bind();
        return _this;
    }
    Droppable.prototype.bind = function () {
        this.wireEvents();
    };
    Droppable.prototype.wireEvents = function () {
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(this.element, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDrop, this);
    };
    Droppable.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    Droppable.prototype.getModuleName = function () {
        return 'droppable';
    };
    Droppable.prototype.intOver = function (event, element) {
        if (!this.mouseOver) {
            this.trigger('over', { event: event, target: element });
            this.mouseOver = true;
        }
    };
    Droppable.prototype.intOut = function (event, element) {
        if (this.mouseOver) {
            this.trigger('out', { evt: event, target: element });
            this.mouseOver = false;
        }
    };
    Droppable.prototype.intDrop = function (evt, element) {
        if (!this.dragStopCalled) {
            return;
        }
        else {
            this.dragStopCalled = false;
        }
        var accept = true;
        var drag = this.dragData[this.scope];
        var isDrag = drag ? (drag.helper && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["d" /* isVisible */])(drag.helper)) : false;
        var area;
        if (isDrag) {
            area = this.isDropArea(evt, drag.helper, element);
            if (this.accept) {
                accept = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["e" /* matches */])(drag.helper, this.accept);
            }
        }
        if (isDrag && this.drop && area.canDrop && accept) {
            this.trigger('drop', { event: evt, target: area.target, droppedElement: drag.helper, dragData: drag });
        }
    };
    Droppable.prototype.isDropArea = function (evt, helper, element) {
        var area = { canDrop: true, target: element || evt.target };
        var isTouch = evt.type === 'touchend';
        if (isTouch || area.target === helper) {
            helper.style.display = 'none';
            var coord = isTouch ? (evt.changedTouches[0]) : evt;
            var ele = document.elementFromPoint(coord.clientX, coord.clientY);
            area.canDrop = false;
            area.canDrop = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["k" /* compareElementParent */])(ele, this.element);
            if (area.canDrop) {
                area.target = ele;
            }
            helper.style.display = '';
        }
        return area;
    };
    Droppable.prototype.destroy = function () {
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(this.element, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDrop);
        _super.prototype.destroy.call(this);
    };
    return Droppable;
}(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])()
], Droppable.prototype, "accept", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])('default')
], Droppable.prototype, "scope", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Droppable.prototype, "drop", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Droppable.prototype, "over", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Droppable.prototype, "out", void 0);
Droppable = __decorate([
    __WEBPACK_IMPORTED_MODULE_3__notify_property_change__["e" /* NotifyPropertyChanges */]
], Droppable);



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FormValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notify_property_change__ = __webpack_require__(2);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ErrorOption;
(function (ErrorOption) {
    ErrorOption[ErrorOption["Message"] = 0] = "Message";
    ErrorOption[ErrorOption["Label"] = 1] = "Label";
})(ErrorOption || (ErrorOption = {}));
var FormValidator = FormValidator_1 = (function (_super) {
    __extends(FormValidator, _super);
    function FormValidator(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.validated = [];
        _this.errorRules = [];
        _this.allowSubmit = false;
        _this.required = 'required';
        _this.infoElement = null;
        _this.inputElement = null;
        _this.selectQuery = 'input:not([type=reset]):not([type=button]), select, textarea';
        _this.defaultMessages = {
            required: 'This field is required.',
            email: 'Please enter a valid email address.',
            url: 'Please enter a valid URL.',
            date: 'Please enter a valid date.',
            dateIso: 'Please enter a valid date ( ISO ).',
            number: 'Please enter a valid number.',
            digits: 'Please enter only digits.',
            maxLength: 'Please enter no more than {0} characters.',
            minLength: 'Please enter at least {0} characters.',
            rangeLength: 'Please enter a value between {0} and {1} characters long.',
            range: 'Please enter a value between {0} and {1}.',
            max: 'Please enter a value less than or equal to {0}.',
            min: 'Please enter a value greater than or equal to {0}.',
            regex: 'Please enter a correct value.'
        };
        element = typeof element === 'string' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["a" /* select */])(element, document) : element;
        if (_this.element != null) {
            _this.element.setAttribute('novalidate', '');
            _this.wireEvents();
        }
        else {
            return undefined;
        }
        return _this;
    }
    FormValidator.prototype.addRules = function (name, rules) {
        if (this.rules.hasOwnProperty(name)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* extend */])(this.rules[name], rules, {});
        }
        else {
            this.rules[name] = rules;
        }
    };
    FormValidator.prototype.removeRules = function (name, rules) {
        if (!name && !rules) {
            this.rules = {};
        }
        else if (this.rules[name] && !rules) {
            delete this.rules[name];
        }
        else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(this.rules[name] && rules)) {
            for (var i = 0; i < rules.length; i++) {
                delete this.rules[name][rules[i]];
            }
        }
        else {
            return;
        }
    };
    FormValidator.prototype.validate = function (selected) {
        if (selected) {
            this.validateRules(selected);
        }
        else {
            var rules = Object.keys(this.rules);
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var name_1 = rules_1[_i];
                if (this.rules[name_1][this.required]) {
                    this.validateRules(name_1);
                }
            }
        }
        return this.errorRules.length === 0;
    };
    FormValidator.prototype.reset = function () {
        this.errorRules = [];
        this.validated = [];
        this.element.reset();
        var elements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])(this.selectQuery, this.element);
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            var input = element;
            input.removeAttribute('aria-invalid');
            input.classList.remove(this.errorClass);
            if (input.name.length > 0) {
                this.getInputElement(input.name);
                this.getErrorElement(input.name);
                this.hideMessage(input.name);
            }
            input.classList.remove(this.validClass);
        }
    };
    FormValidator.prototype.getInputElement = function (name) {
        this.inputElement = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["a" /* select */])('[name=' + name + ']', this.element));
        return this.inputElement;
    };
    FormValidator.prototype.destroy = function () {
        this.reset();
        this.unwireEvents();
        var elements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])('.' + this.errorClass + ', .' + this.validClass, this.element);
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            element.remove();
        }
        _super.prototype.destroy.call(this);
    };
    FormValidator.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    ;
    FormValidator.prototype.getModuleName = function () {
        return 'formValidator';
    };
    FormValidator.prototype.wireEvents = function () {
        var inputElements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])(this.selectQuery, this.element);
        for (var _i = 0, inputElements_1 = inputElements; _i < inputElements_1.length; _i++) {
            var input = inputElements_1[_i];
            if (FormValidator_1.isCheckable(input)) {
                __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].add(input, 'click', this.clickHandler, this);
            }
            else if (input.tagName === 'SELECT') {
                __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].add(input, 'change', this.changeHandler, this);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].add(input, 'focusout', this.focusOutHandler, this);
                __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].add(input, 'keyup', this.keyUpHandler, this);
            }
        }
        __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].add(this.element, 'submit', this.submitHandler, this);
    };
    FormValidator.prototype.unwireEvents = function () {
        var inputElements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])(this.selectQuery, this.element);
        for (var _i = 0, inputElements_2 = inputElements; _i < inputElements_2.length; _i++) {
            var input = inputElements_2[_i];
            __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].clearEvents(input);
        }
        __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].remove(this.element, 'submit', this.submitHandler);
    };
    FormValidator.prototype.focusOutHandler = function (e) {
        this.trigger('focusout', e);
        var element = e.target;
        if (this.rules[element.name]) {
            if (this.rules[element.name][this.required] || element.value.length > 0) {
                this.validate(element.name);
            }
            else if (this.validated.indexOf(element.name) === -1) {
                this.validated.push(element.name);
            }
        }
    };
    FormValidator.prototype.keyUpHandler = function (e) {
        this.trigger('keyup', e);
        var element = e.target;
        var excludeKeys = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
        if (e.which === 9 && !this.rules[element.name][this.required]) {
            return;
        }
        if (this.validated.indexOf(element.name) !== -1 && this.rules[element.name] && excludeKeys.indexOf(e.which) === -1) {
            this.validate(element.name);
        }
    };
    FormValidator.prototype.clickHandler = function (e) {
        this.trigger('click', e);
        var element = e.target;
        if (element.type !== 'submit') {
            this.validate(element.name);
        }
        else if (element.getAttribute('formnovalidate') !== null) {
            this.allowSubmit = true;
        }
    };
    FormValidator.prototype.changeHandler = function (e) {
        this.trigger('change', e);
        var element = e.target;
        this.validate(element.name);
    };
    FormValidator.prototype.submitHandler = function (e) {
        this.trigger('submit', e);
        if (!this.allowSubmit && !this.validate()) {
            e.preventDefault();
        }
        else {
            this.allowSubmit = false;
        }
    };
    FormValidator.prototype.validateRules = function (name) {
        var rules = Object.keys(this.rules[name]);
        this.getInputElement(name);
        this.getErrorElement(name);
        for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
            var rule = rules_2[_i];
            var errorRule = { name: name, message: this.getErrorMessage(this.rules[name][rule], rule) };
            if (!this.isValid(name, rule) && !this.inputElement.classList.contains(this.ignore)) {
                this.removeErrorRules(name);
                this.errorRules.push(errorRule);
                this.inputElement.setAttribute('aria-invalid', 'true');
                this.inputElement.setAttribute('aria-describedby', this.inputElement.id + '-info');
                if (!this.infoElement) {
                    this.createErrorElement(name, errorRule.message);
                }
                else {
                    this.showMessage(errorRule);
                }
                this.inputElement.classList.add(this.errorClass);
                this.inputElement.classList.remove(this.validClass);
                this.trigger('validationComplete', errorRule);
                if (rule === 'required') {
                    this.inputElement.setAttribute('aria-required', 'true');
                    break;
                }
            }
            else {
                this.hideMessage(name);
            }
        }
    };
    FormValidator.prototype.isValid = function (name, rule) {
        var params = this.rules[name][rule];
        var param = (params instanceof Array && typeof params[1] === 'string') ? params[0] : params;
        var currentRule = this.rules[name][rule];
        var args = { value: this.inputElement.value, param: param, element: this.inputElement };
        this.trigger('validationBegin', args);
        if (typeof currentRule[0] === 'function') {
            var fn = currentRule[0];
            return fn.call(this, { element: this.inputElement, value: this.inputElement.value });
        }
        else if (FormValidator_1.isCheckable(this.inputElement)) {
            if (rule !== 'required') {
                return true;
            }
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])('input[name=' + name + ']:checked', this.element).length > 0;
        }
        else {
            return FormValidator_1.checkValidator[rule](args);
        }
    };
    FormValidator.prototype.getErrorMessage = function (ruleValue, rule) {
        var message = (ruleValue instanceof Array && typeof ruleValue[1] === 'string') ? ruleValue[1] : this.defaultMessages[rule];
        var formats = message.match(/{(\d)}/g);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(formats)) {
            for (var i = 0; i < formats.length; i++) {
                var value = ruleValue instanceof Array ? ruleValue[i] : ruleValue;
                message = message.replace(formats[i], value);
            }
        }
        return message;
    };
    FormValidator.prototype.createErrorElement = function (name, message) {
        var errorElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["c" /* createElement */])(this.errorElement, {
            className: this.errorClass,
            innerHTML: message,
            attrs: { for: name }
        });
        if (this.errorOption === ErrorOption.Message) {
            errorElement.classList.remove(this.errorClass);
            errorElement.classList.add('e-message');
            errorElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["c" /* createElement */])(this.errorContainer, { className: this.errorClass, innerHTML: errorElement.outerHTML });
        }
        errorElement.id = this.inputElement.name + '-info';
        if (this.customPlacement != null) {
            this.customPlacement.call(this, this.inputElement, errorElement);
        }
        else {
            this.inputElement.parentNode.insertBefore(errorElement, this.inputElement.nextSibling);
        }
        errorElement.style.display = 'block';
        this.getErrorElement(name);
        this.validated.push(name);
        this.checkRequired(name);
    };
    FormValidator.prototype.getErrorElement = function (name) {
        this.infoElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["a" /* select */])(this.errorElement + '.' + this.errorClass, this.inputElement.parentElement);
        if (!this.infoElement) {
            this.infoElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["a" /* select */])(this.errorElement + '.' + this.errorClass + '[for="' + name + '"]');
        }
        return this.infoElement;
    };
    FormValidator.prototype.removeErrorRules = function (name) {
        for (var i = 0; i < this.errorRules.length; i++) {
            var rule = this.errorRules[i];
            if (rule.name === name) {
                this.errorRules.splice(i, 1);
            }
        }
    };
    FormValidator.prototype.showMessage = function (errorRule) {
        this.infoElement.style.display = 'block';
        this.infoElement.innerHTML = errorRule.message;
        this.checkRequired(errorRule.name);
    };
    FormValidator.prototype.hideMessage = function (name) {
        if (this.infoElement) {
            this.infoElement.style.display = 'none';
            this.removeErrorRules(name);
            this.inputElement.classList.add(this.validClass);
            this.inputElement.classList.remove(this.errorClass);
            this.inputElement.setAttribute('aria-invalid', 'false');
        }
    };
    FormValidator.prototype.checkRequired = function (name) {
        if (!this.rules[name][this.required] && !this.inputElement.value.length) {
            this.infoElement.innerHTML = this.inputElement.value;
            this.infoElement.setAttribute('aria-invalid', 'false');
            this.hideMessage(name);
        }
    };
    FormValidator.isCheckable = function (input) {
        var inputType = input.getAttribute('type');
        return inputType && (inputType === 'checkbox' || inputType === 'radio' || inputType === 'submit');
    };
    return FormValidator;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */]));
FormValidator.checkValidator = {
    required: function (option) {
        return option.value.length > 0;
    },
    email: function (option) {
        return new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
            '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$').test(option.value);
    },
    url: function (option) {
        return new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_\‌​+~#=]+)' +
            '+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?').test(option.value);
    },
    date: function (option) {
        return !isNaN(new Date(option.value).getTime());
    },
    dateIso: function (option) {
        return new RegExp('^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$').test(option.value);
    },
    number: function (option) {
        return !isNaN(Number(option.value));
    },
    digits: function (option) {
        return new RegExp('^[0-9]*$').test(option.value);
    },
    maxLength: function (option) {
        return option.value.length <= option.param;
    },
    minLength: function (option) {
        return option.value.length >= option.param;
    },
    rangeLength: function (option) {
        var param = option.param;
        return option.value.length >= param[0] && option.value.length <= param[1];
    },
    range: function (option) {
        var param = option.param;
        return !isNaN(Number(option.value)) && Number(option.value) >= param[0] && Number(option.value) <= param[1];
    },
    max: function (option) {
        return !isNaN(Number(option.value)) && Number(option.value) <= option.param;
    },
    min: function (option) {
        return !isNaN(Number(option.value)) && Number(option.value) >= option.param;
    },
    regex: function (option) {
        return new RegExp(option.param).test(option.value);
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])('e-hidden')
], FormValidator.prototype, "ignore", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])({})
], FormValidator.prototype, "rules", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])('e-error')
], FormValidator.prototype, "errorClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])('e-valid')
], FormValidator.prototype, "validClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])('label')
], FormValidator.prototype, "errorElement", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])('div')
], FormValidator.prototype, "errorContainer", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])(ErrorOption.Label)
], FormValidator.prototype, "errorOption", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "focusout", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "keyup", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "click", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "change", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "submit", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "validationBegin", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "validationComplete", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "customPlacement", void 0);
FormValidator = FormValidator_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_4__notify_property_change__["e" /* NotifyPropertyChanges */]
], FormValidator);

var FormValidator_1;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(23);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Ajax", function() { return __WEBPACK_IMPORTED_MODULE_0__ajax__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation__ = __webpack_require__(24);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return __WEBPACK_IMPORTED_MODULE_1__animation__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ripple", function() { return __WEBPACK_IMPORTED_MODULE_1__animation__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(1);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return __WEBPACK_IMPORTED_MODULE_2__base__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__browser__ = __webpack_require__(7);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Browser", function() { return __WEBPACK_IMPORTED_MODULE_3__browser__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__canvas_renderer__ = __webpack_require__(25);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CanvasRenderer", function() { return __WEBPACK_IMPORTED_MODULE_4__canvas_renderer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component__ = __webpack_require__(26);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return __WEBPACK_IMPORTED_MODULE_5__component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__child_property__ = __webpack_require__(8);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ChildProperty", function() { return __WEBPACK_IMPORTED_MODULE_6__child_property__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__draggable__ = __webpack_require__(27);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return __WEBPACK_IMPORTED_MODULE_7__draggable__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return __WEBPACK_IMPORTED_MODULE_7__draggable__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__droppable__ = __webpack_require__(28);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Droppable", function() { return __WEBPACK_IMPORTED_MODULE_8__droppable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__event_handler__ = __webpack_require__(3);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EventHandler", function() { return __WEBPACK_IMPORTED_MODULE_9__event_handler__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__form_validator__ = __webpack_require__(29);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ErrorOption", function() { return __WEBPACK_IMPORTED_MODULE_10__form_validator__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FormValidator", function() { return __WEBPACK_IMPORTED_MODULE_10__form_validator__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__internationalization__ = __webpack_require__(9);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "onIntlChange", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "rightToLeft", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "cldrData", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "defaultCulture", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "defaultCurrencyCode", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Internationalization", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "setCulture", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "setCurrencyCode", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "loadCldr", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "enableRtl", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getNumericObject", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getDefaultDateObject", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["l"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__keyboard__ = __webpack_require__(31);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "KeyboardEvents", function() { return __WEBPACK_IMPORTED_MODULE_12__keyboard__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__l10n__ = __webpack_require__(32);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "L10n", function() { return __WEBPACK_IMPORTED_MODULE_13__l10n__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__module_loader__ = __webpack_require__(15);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModuleLoader", function() { return __WEBPACK_IMPORTED_MODULE_14__module_loader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__notify_property_change__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Property", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Complex", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Collection", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NotifyPropertyChanges", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CreateBuilder", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__svg_renderer__ = __webpack_require__(33);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SvgRenderer", function() { return __WEBPACK_IMPORTED_MODULE_16__svg_renderer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__touch__ = __webpack_require__(35);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SwipeSettings", function() { return __WEBPACK_IMPORTED_MODULE_17__touch__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Touch", function() { return __WEBPACK_IMPORTED_MODULE_17__touch__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__template__ = __webpack_require__(34);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "expression", function() { return __WEBPACK_IMPORTED_MODULE_18__template__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "compile", function() { return __WEBPACK_IMPORTED_MODULE_18__template__["b"]; });





















/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyboardEvents; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notify_property_change__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var keyCode = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'control': 17,
    'alt': 18,
    'pause': 19,
    'capslock': 20,
    'space': 22,
    'escape': 27,
    'pageup': 33,
    'pagedown': 34,
    'end': 35,
    'home': 36,
    'leftarrow': 37,
    'uparrow': 38,
    'rightarrow': 39,
    'downarrow': 40,
    'insert': 45,
    'delete': 46,
    'f1': 112,
    'f2': 113,
    'f3': 114,
    'f4': 115,
    'f5': 116,
    'f6': 117,
    'f7': 118,
    'f8': 119,
    'f9': 120,
    'f10': 121,
    'f11': 122,
    'f12': 123,
    'semicolon': 186,
    'plus': 187,
    'comma': 188,
    'minus': 189,
    'dot': 190,
    'forwardslash': 191,
    'graveaccent': 192,
    'openbracket': 219,
    'backslash': 220,
    'closebracket': 221,
    'singlequote': 222
};
var KeyboardEvents = KeyboardEvents_1 = (function (_super) {
    __extends(KeyboardEvents, _super);
    function KeyboardEvents(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.keyPressHandler = function (e) {
            var isAltKey = e.altKey;
            var isCtrlKey = e.ctrlKey;
            var isShiftKey = e.shiftKey;
            var curkeyCode = e.which;
            var keys = Object.keys(_this.keyConfigs);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var rKeyObj = KeyboardEvents_1.getKeyConfigData(_this.keyConfigs[key]);
                if (isAltKey === rKeyObj.altKey && isCtrlKey === rKeyObj.ctrlKey &&
                    isShiftKey === rKeyObj.shiftKey && curkeyCode === rKeyObj.keyCode) {
                    e.action = key;
                    if (_this.keyAction) {
                        _this.keyAction(e);
                    }
                }
            }
        };
        _this.bind();
        return _this;
    }
    KeyboardEvents.prototype.destroy = function () {
        this.unwireEvents();
        _super.prototype.destroy.call(this);
    };
    KeyboardEvents.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    ;
    KeyboardEvents.prototype.bind = function () {
        this.wireEvents();
    };
    KeyboardEvents.prototype.getModuleName = function () {
        return 'keyboard';
    };
    KeyboardEvents.prototype.wireEvents = function () {
        this.element.addEventListener(this.eventName, this.keyPressHandler);
    };
    KeyboardEvents.prototype.unwireEvents = function () {
        this.element.removeEventListener(this.eventName, this.keyPressHandler);
    };
    KeyboardEvents.getKeyConfigData = function (config) {
        if (config in this.configCache) {
            return this.configCache[config];
        }
        var keys = config.toLowerCase().split('+');
        var keyData = {
            altKey: (keys.indexOf('alt') !== -1 ? true : false),
            ctrlKey: (keys.indexOf('ctrl') !== -1 ? true : false),
            shiftKey: (keys.indexOf('shift') !== -1 ? true : false),
            keyCode: null
        };
        if (keys[keys.length - 1].length > 1 && !!Number(keys[keys.length - 1])) {
            keyData.keyCode = Number(keys[keys.length - 1]);
        }
        else {
            keyData.keyCode = KeyboardEvents_1.getKeyCode(keys[keys.length - 1]);
        }
        KeyboardEvents_1.configCache[config] = keyData;
        return keyData;
    };
    KeyboardEvents.getKeyCode = function (keyVal) {
        return keyCode[keyVal] || keyVal.toUpperCase().charCodeAt(0);
    };
    return KeyboardEvents;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */]));
KeyboardEvents.configCache = {};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__notify_property_change__["a" /* Property */])({})
], KeyboardEvents.prototype, "keyConfigs", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__notify_property_change__["a" /* Property */])('keyup')
], KeyboardEvents.prototype, "eventName", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__notify_property_change__["d" /* Event */])()
], KeyboardEvents.prototype, "keyAction", void 0);
KeyboardEvents = KeyboardEvents_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__notify_property_change__["e" /* NotifyPropertyChanges */]
], KeyboardEvents);

var KeyboardEvents_1;


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return L10n; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internationalization__ = __webpack_require__(9);


var L10n = (function () {
    function L10n(controlName, localeStrings, locale) {
        this.controlName = controlName;
        this.localeStrings = localeStrings;
        this.setLocale(locale || __WEBPACK_IMPORTED_MODULE_1__internationalization__["d" /* defaultCulture */]);
    }
    L10n.prototype.setLocale = function (locale) {
        var intLocale = this.intGetControlConstant(L10n.locale, locale);
        if (!intLocale) {
            if (locale !== 'en-US') {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["i" /* throwError */])('The specified locale or controlname not found in the locale object');
            }
            else {
                this.currentLocale = this.localeStrings;
            }
        }
        else {
            this.currentLocale = intLocale;
        }
    };
    L10n.load = function (localeObject) {
        this.locale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(this.locale, localeObject, {}, true);
    };
    L10n.prototype.getConstant = function (prop) {
        return this.currentLocale[prop] || this.localeStrings[prop] || '';
    };
    L10n.prototype.intGetControlConstant = function (curObject, locale) {
        if (curObject[locale]) {
            return curObject[locale][this.controlName];
        }
        return null;
    };
    return L10n;
}());

L10n.locale = {};


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvgRenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

var SvgRenderer = (function () {
    function SvgRenderer(rootID) {
        this.svgLink = 'http://www.w3.org/2000/svg';
        this.rootId = rootID;
    }
    SvgRenderer.prototype.getOptionValue = function (options, key) {
        return options[key];
    };
    SvgRenderer.prototype.createSvg = function (options) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(options.id)) {
            options.id = this.rootId + '_svg';
        }
        this.svgObj = document.getElementById(options.id);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(document.getElementById(options.id))) {
            this.svgObj = document.createElementNS(this.svgLink, 'svg');
        }
        this.svgObj = this.setElementAttributes(options, this.svgObj);
        this.setSVGSize(options.width, options.height);
        return this.svgObj;
    };
    SvgRenderer.prototype.setSVGSize = function (width, height) {
        var element = document.getElementById(this.rootId);
        var size = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(element) ? element.getBoundingClientRect() : null;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.width) || this.width <= 0) {
            this.svgObj.setAttribute('width', width ? width.toString() : size.width.toString());
        }
        else {
            this.svgObj.setAttribute('width', this.width.toString());
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.height) || this.height <= 0) {
            this.svgObj.setAttribute('height', height ? height.toString() : '450');
        }
        else {
            this.svgObj.setAttribute('height', this.height.toString());
        }
    };
    SvgRenderer.prototype.drawPath = function (options) {
        var path = document.getElementById(options.id);
        if (path === null) {
            path = document.createElementNS(this.svgLink, 'path');
        }
        path = this.setElementAttributes(options, path);
        return path;
    };
    SvgRenderer.prototype.drawLine = function (options) {
        var line = document.getElementById(options.id);
        if (line === null) {
            line = document.createElementNS(this.svgLink, 'line');
        }
        line = this.setElementAttributes(options, line);
        return line;
    };
    SvgRenderer.prototype.drawRectangle = function (options) {
        var rectangle = document.getElementById(options.id);
        if (rectangle === null) {
            rectangle = document.createElementNS(this.svgLink, 'rect');
        }
        rectangle = this.setElementAttributes(options, rectangle);
        return rectangle;
    };
    SvgRenderer.prototype.drawCircle = function (options) {
        var circle = document.getElementById(options.id);
        if (circle === null) {
            circle = document.createElementNS(this.svgLink, 'circle');
        }
        circle = this.setElementAttributes(options, circle);
        return circle;
    };
    SvgRenderer.prototype.drawPolyline = function (options) {
        var polyline = document.getElementById(options.id);
        if (polyline === null) {
            polyline = document.createElementNS(this.svgLink, 'polyline');
        }
        polyline = this.setElementAttributes(options, polyline);
        return polyline;
    };
    SvgRenderer.prototype.drawEllipse = function (options) {
        var ellipse = document.getElementById(options.id);
        if (ellipse === null) {
            ellipse = document.createElementNS(this.svgLink, 'ellipse');
        }
        ellipse = this.setElementAttributes(options, ellipse);
        return ellipse;
    };
    SvgRenderer.prototype.drawPolygon = function (options) {
        var polygon = document.getElementById(options.id);
        if (polygon === null) {
            polygon = document.createElementNS(this.svgLink, 'polygon');
        }
        polygon = this.setElementAttributes(options, polygon);
        return polygon;
    };
    SvgRenderer.prototype.drawImage = function (options) {
        var img = document.createElementNS(this.svgLink, 'image');
        img.setAttributeNS(null, 'height', options.height.toString());
        img.setAttributeNS(null, 'width', options.width.toString());
        img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', options.href);
        img.setAttributeNS(null, 'x', options.x.toString());
        img.setAttributeNS(null, 'y', options.y.toString());
        img.setAttributeNS(null, 'id', options.id);
        img.setAttributeNS(null, 'visibility', options.visibility);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.getOptionValue(options, 'clip-path'))) {
            img.setAttributeNS(null, 'clip-path', this.getOptionValue(options, 'clip-path'));
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(options.preserveAspectRatio)) {
            img.setAttributeNS(null, 'preserveAspectRatio', options.preserveAspectRatio);
        }
        return img;
    };
    SvgRenderer.prototype.createText = function (options, label) {
        var text = document.createElementNS(this.svgLink, 'text');
        text = this.setElementAttributes(options, text);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(label)) {
            text.textContent = label;
        }
        return text;
    };
    SvgRenderer.prototype.createTSpan = function (options, label) {
        var tSpan = document.createElementNS(this.svgLink, 'tspan');
        tSpan = this.setElementAttributes(options, tSpan);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(label)) {
            tSpan.textContent = label;
        }
        return tSpan;
    };
    SvgRenderer.prototype.createTitle = function (text) {
        var title = document.createElementNS(this.svgLink, 'title');
        title.textContent = text;
        return title;
    };
    SvgRenderer.prototype.createDefs = function () {
        var defs = document.createElementNS(this.svgLink, 'defs');
        return defs;
    };
    SvgRenderer.prototype.createClipPath = function (options) {
        var clipPath = document.createElementNS(this.svgLink, 'clipPath');
        clipPath = this.setElementAttributes(options, clipPath);
        return clipPath;
    };
    SvgRenderer.prototype.createForeignObject = function (options) {
        var foreignObject = document.createElementNS(this.svgLink, 'foreignObject');
        foreignObject = this.setElementAttributes(options, foreignObject);
        return foreignObject;
    };
    SvgRenderer.prototype.createGroup = function (options) {
        var group = document.createElementNS(this.svgLink, 'g');
        group = this.setElementAttributes(options, group);
        return group;
    };
    SvgRenderer.prototype.createPattern = function (options, element) {
        var pattern = document.createElementNS(this.svgLink, element);
        pattern = this.setElementAttributes(options, pattern);
        return pattern;
    };
    SvgRenderer.prototype.createRadialGradient = function (colors, name, options) {
        var colorName;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(colors[0].colorStop)) {
            var newOptions = {
                'id': this.rootId + '_' + name + 'radialGradient',
                'cx': options.cx + '%',
                'cy': options.cy + '%',
                'r': options.r + '%',
                'fx': options.fx + '%',
                'fy': options.fy + '%'
            };
            this.drawGradient('radialGradient', newOptions, colors);
            colorName = 'url(#' + this.rootId + '_' + name + 'radialGradient)';
        }
        else {
            colorName = colors[0].color.toString();
        }
        return colorName;
    };
    SvgRenderer.prototype.createLinearGradient = function (colors, name, options) {
        var colorName;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(colors[0].colorStop)) {
            var newOptions = {
                'id': this.rootId + '_' + name + 'linearGradient',
                'x1': options.x1 + '%',
                'y1': options.y1 + '%',
                'x2': options.x2 + '%',
                'y2': options.y2 + '%'
            };
            this.drawGradient('linearGradient', newOptions, colors);
            colorName = 'url(#' + this.rootId + '_' + name + 'linearGradient)';
        }
        else {
            colorName = colors[0].color.toString();
        }
        return colorName;
    };
    SvgRenderer.prototype.drawGradient = function (gradientType, options, colors) {
        var defs = this.createDefs();
        var gradient = document.createElementNS(this.svgLink, gradientType);
        gradient = this.setElementAttributes(options, gradient);
        for (var i = 0; i < colors.length; i++) {
            var stop_1 = document.createElementNS(this.svgLink, 'stop');
            stop_1.setAttribute('offset', colors[i].colorStop);
            stop_1.setAttribute('stop-color', colors[i].color);
            stop_1.setAttribute('stop-opacity', '1');
            gradient.appendChild(stop_1);
        }
        defs.appendChild(gradient);
        return defs;
    };
    SvgRenderer.prototype.drawClipPath = function (options) {
        var defs = this.createDefs();
        var clipPath = this.createClipPath({ 'id': options.id });
        var rect = this.drawRectangle(options);
        clipPath.appendChild(rect);
        defs.appendChild(clipPath);
        return defs;
    };
    SvgRenderer.prototype.drawCircularClipPath = function (options) {
        var defs = this.createDefs();
        var clipPath = this.createClipPath({ 'id': options.id });
        var circle = this.drawCircle(options);
        clipPath.appendChild(circle);
        defs.appendChild(clipPath);
        return defs;
    };
    SvgRenderer.prototype.setElementAttributes = function (options, element) {
        var keys = Object.keys(options);
        for (var i = 0; i < keys.length; i++) {
            element.setAttribute(keys[i], options[keys[i]]);
        }
        return element;
    };
    return SvgRenderer;
}());



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = expression;
/* harmony export (immutable) */ __webpack_exports__["b"] = compile;
var LINES = new RegExp('\\n|\\r|\\s\\s+', 'g');
var QUOTES = new RegExp(/'|"/g);
var IF_STMT = new RegExp('if ?\\(');
var ELSE_STMT = new RegExp('else');
var FOR_STMT = new RegExp('for ?\\(');
var IF_OR_FOR = new RegExp('(\/if|\/for)');
var CALL_FUNCTION = new RegExp('\\((.*)\\)', '');
var NOT_NUMBER = new RegExp('^[0-9]+$', 'g');
var WORD = new RegExp('[\\w"\'.\\s+]+', 'g');
var DBL_QUOTED_STR = new RegExp('"(.*?)"', 'g');
var exp = new RegExp('\\${([^}]*)}', 'g');
function expression(value) {
    if (value) {
        exp = value;
    }
    return exp;
}
function compile(template, helper) {
    var argName = 'data';
    var evalExpResult = evalExp(template, argName, helper);
    var fnCode = "var str=\"" + evalExpResult + "\"; return str;";
    var fn = new Function(argName, fnCode);
    return fn.bind(helper);
}
function evalExp(str, nameSpace, helper) {
    var localKeys = [];
    return str.replace(LINES, '').replace(DBL_QUOTED_STR, '\'$1\'').replace(exp, function (match, cnt, offset, matchStr) {
        var matches = cnt.match(CALL_FUNCTION);
        if (matches) {
            var rlStr = matches[1];
            if (IF_STMT.test(cnt)) {
                cnt = '"; ' + cnt.replace(matches[1], rlStr.replace(WORD, function (str) {
                    str = str.trim();
                    return addNameSpace(str, !(QUOTES.test(str)) && (localKeys.indexOf(str) === -1), nameSpace, localKeys);
                })) + '{ \n str = str + "';
            }
            else if (FOR_STMT.test(cnt)) {
                var rlStr_1 = matches[1].split(' of ');
                cnt = '"; ' + cnt.replace(matches[1], function (mtc) {
                    localKeys.push(rlStr_1[0]);
                    localKeys.push(rlStr_1[0] + 'Index');
                    return 'var i=0; i < ' + addNameSpace(rlStr_1[1], true, nameSpace, localKeys) + '.length; i++';
                }) + '{ \n ' + rlStr_1[0] + '= ' + addNameSpace(rlStr_1[1], true, nameSpace, localKeys)
                    + '[i]; \n var ' + rlStr_1[0] + 'Index=i; \n str = str + "';
            }
            else {
                var fnStr = cnt.split('(');
                var fNameSpace = (helper && helper.hasOwnProperty(fnStr[0]) ? 'this.' : 'global');
                fNameSpace = (/\./.test(fnStr[0]) ? '' : fNameSpace);
                cnt = '" + ' + (fNameSpace === 'global' ? '' : fNameSpace) +
                    cnt.replace(rlStr, addNameSpace(matches[1].replace(',', nameSpace + '.'), (fNameSpace === 'global' ? false : true), nameSpace, localKeys)) +
                    '+"';
            }
        }
        else if (ELSE_STMT.test(cnt)) {
            cnt = '"; ' + cnt.replace(ELSE_STMT, '} else { \n str = str + "');
        }
        else if (!!cnt.match(IF_OR_FOR)) {
            cnt = cnt.replace(IF_OR_FOR, '"; \n } \n str = str + "');
        }
        else {
            cnt = '"+' + addNameSpace(cnt, (localKeys.indexOf(cnt) === -1), nameSpace, localKeys) + '+"';
        }
        return cnt;
    });
}
function addNameSpace(str, addNS, nameSpace, ignoreList) {
    return ((addNS && !(NOT_NUMBER.test(str)) && ignoreList.indexOf(str.split('.')[0]) === -1) ? nameSpace + '.' + str : str);
}


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwipeSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Touch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notify_property_change__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__child_property__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_handler__ = __webpack_require__(3);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SwipeSettings = (function (_super) {
    __extends(SwipeSettings, _super);
    function SwipeSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SwipeSettings;
}(__WEBPACK_IMPORTED_MODULE_4__child_property__["a" /* ChildProperty */]));

__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["a" /* Property */])(50)
], SwipeSettings.prototype, "swipeThresholdDistance", void 0);
var swipeRegex = /(Up|Down)/;
var Touch = (function (_super) {
    __extends(Touch, _super);
    function Touch(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.startEvent = function (evt) {
            var point = (evt.changedTouches ? evt.changedTouches[0] : evt);
            _this.isTouchMoved = false;
            _this.movedDirection = '';
            _this.startPoint = _this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
            _this.startEventData = point;
            _this.hScrollLocked = _this.vScrollLocked = false;
            _this.tStampStart = Date.now();
            _this.timeOutTapHold = setTimeout(function () { _this.tapholdEvent(evt); }, _this.tapholdThreshold);
            __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].add(_this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchMoveEvent, _this.moveEvent, _this);
            __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].add(_this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchEndEvent, _this.endEvent, _this);
        };
        _this.moveEvent = function (evt) {
            var point = evt.changedTouches ? evt.changedTouches[0] : evt;
            _this.movedPoint = point;
            _this.isTouchMoved = !(point.clientX === _this.startPoint.clientX && point.clientY === _this.startPoint.clientY);
            var eScrollArgs = {};
            if (_this.isTouchMoved) {
                clearTimeout(_this.timeOutTapHold);
                _this.calcScrollPoints(evt);
                var scrollArg = {
                    startEvents: _this.startEventData,
                    originalEvent: evt, startX: _this.startPoint.clientX,
                    startY: _this.startPoint.clientY, distanceX: _this.distanceX,
                    distanceY: _this.distanceY, scrollDirection: _this.scrollDirection,
                    velocity: _this.getVelocity(point)
                };
                eScrollArgs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(eScrollArgs, {}, scrollArg);
                _this.trigger('scroll', eScrollArgs);
                _this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
            }
        };
        _this.endEvent = function (evt) {
            clearTimeout(_this.timeOutTapHold);
            var point = evt;
            if (evt.changedTouches) {
                point = evt.changedTouches[0];
            }
            _this.isTouchMoved = !(point.clientX === _this.startPoint.clientX && point.clientY === _this.startPoint.clientY);
            _this.endPoint = point;
            var dblTapTriggred = false;
            var eDblTapArgs;
            var eTapArgs;
            var eSwipeArgs;
            var tDistance = _this.swipeSettings.swipeThresholdDistance;
            _this.calcPoints(evt);
            var swipeArgs = {
                originalEvent: evt,
                startEvents: _this.startEventData,
                startX: _this.startPoint.clientX,
                startY: _this.startPoint.clientY,
                distanceX: _this.distanceX, distanceY: _this.distanceY, swipeDirection: _this.movedDirection,
                velocity: _this.getVelocity(point)
            };
            if (!_this.isTouchMoved) {
                eDblTapArgs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(eDblTapArgs, _this.defaultArgs, {});
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(_this.lastTapTime) && (new Date().getTime() - _this.lastTapTime) < _this.doubleTapThreshold) {
                    clearTimeout(_this.timeOutTap);
                    dblTapTriggred = true;
                    _this.trigger('doubleTap', eDblTapArgs);
                }
                if (!dblTapTriggred) {
                    eTapArgs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(eTapArgs, _this.defaultArgs, {});
                    _this.timeOutTap = setTimeout(function () {
                        _this.trigger('tap', eTapArgs);
                    }, (typeof _this.doubleTap !== 'function' ? 0 : _this.doubleTapThreshold));
                }
            }
            else {
                eSwipeArgs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(eSwipeArgs, _this.defaultArgs, swipeArgs);
                var canTrigger = false;
                var ele = _this.element;
                var scrollBool = _this.isScrollable(ele);
                var moved = swipeRegex.test(_this.movedDirection);
                if ((tDistance < _this.distanceX && !moved) || (tDistance < _this.distanceY && moved)) {
                    if (!scrollBool) {
                        canTrigger = true;
                    }
                    else {
                        canTrigger = _this.checkSwipe(ele, moved);
                    }
                }
                if (canTrigger) {
                    _this.trigger('swipe', eSwipeArgs);
                }
            }
            _this.lastTapTime = new Date().getTime();
            __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].remove(_this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchMoveEvent, _this.moveEvent);
            __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].remove(_this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchEndEvent, _this.endEvent);
        };
        _this.bind();
        return _this;
    }
    Touch.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    Touch.prototype.bind = function () {
        this.wireEvents();
        if (__WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].isIE) {
            this.element.classList.add('e-block-touch');
        }
    };
    Touch.prototype.destroy = function () {
        this.unwireEvents();
        _super.prototype.destroy.call(this);
    };
    Touch.prototype.wireEvents = function () {
        __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].add(this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchStartEvent, this.startEvent, this);
    };
    Touch.prototype.unwireEvents = function () {
        __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].remove(this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchStartEvent, this.startEvent);
    };
    Touch.prototype.getModuleName = function () {
        return 'touch';
    };
    Touch.prototype.isScrollable = function (element) {
        var eleStyle = getComputedStyle(element);
        var style = eleStyle.overflow + eleStyle.overflowX + eleStyle.overflowY;
        if ((/(auto|scroll)/).test(style)) {
            return true;
        }
        return false;
    };
    Touch.prototype.tapholdEvent = function (evt) {
        var eTapArgs;
        __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].remove(this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchMoveEvent, this.moveEvent);
        __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].remove(this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchEndEvent, this.endEvent);
        eTapArgs = { originalEvent: evt };
        this.trigger('taphold', eTapArgs);
    };
    Touch.prototype.calcPoints = function (evt) {
        var point = evt.changedTouches ? evt.changedTouches[0] : evt;
        this.defaultArgs = { originalEvent: evt };
        this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.startPoint.clientX)));
        this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.startPoint.clientY)));
        if (this.distanceX > this.distanceY) {
            this.movedDirection = (point.clientX > this.startPoint.clientX) ? 'Right' : 'Left';
        }
        else {
            this.movedDirection = (point.clientY < this.startPoint.clientY) ? 'Up' : 'Down';
        }
    };
    Touch.prototype.calcScrollPoints = function (evt) {
        var point = evt.changedTouches ? evt.changedTouches[0] : evt;
        this.defaultArgs = { originalEvent: evt };
        this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.lastMovedPoint.clientX)));
        this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.lastMovedPoint.clientY)));
        if ((this.distanceX > this.distanceY || this.hScrollLocked === true) && this.vScrollLocked === false) {
            this.scrollDirection = (point.clientX > this.lastMovedPoint.clientX) ? 'Right' : 'Left';
            this.hScrollLocked = true;
        }
        else {
            this.scrollDirection = (point.clientY < this.lastMovedPoint.clientY) ? 'Up' : 'Down';
            this.vScrollLocked = true;
        }
    };
    Touch.prototype.getVelocity = function (pnt) {
        var newX = pnt.clientX;
        var newY = pnt.clientY;
        var newT = Date.now();
        var xDist = newX - this.startPoint.clientX;
        var yDist = newY - this.startPoint.clientX;
        var interval = newT - this.tStampStart;
        return Math.sqrt(xDist * xDist + yDist * yDist) / interval;
    };
    Touch.prototype.checkSwipe = function (ele, flag) {
        var keys = ['scroll', 'offset'];
        var temp = flag ? ['Height', 'Top'] : ['Width', 'Left'];
        if ((ele[keys[0] + temp[0]] <= ele[keys[1] + temp[0]])) {
            return true;
        }
        return (ele[keys[0] + temp[1]] === 0) ||
            (ele[keys[1] + temp[0]] + ele[keys[0] + temp[1]] >= ele[keys[0] + temp[0]]);
    };
    return Touch;
}(__WEBPACK_IMPORTED_MODULE_3__base__["a" /* Base */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["d" /* Event */])()
], Touch.prototype, "tap", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["d" /* Event */])()
], Touch.prototype, "doubleTap", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["d" /* Event */])()
], Touch.prototype, "taphold", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["d" /* Event */])()
], Touch.prototype, "swipe", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["d" /* Event */])()
], Touch.prototype, "scroll", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["a" /* Property */])(500)
], Touch.prototype, "doubleTapThreshold", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["a" /* Property */])(750)
], Touch.prototype, "tapholdThreshold", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["b" /* Complex */])({}, SwipeSettings)
], Touch.prototype, "swipeSettings", void 0);
Touch = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__notify_property_change__["e" /* NotifyPropertyChanges */]
], Touch);



/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var instances = 'ej2_instances';
    var uid = 0;
    function createInstance(classFunction, params) {
        var arrayParam = params;
        arrayParam.unshift(undefined);
        return new (Function.prototype.bind.apply(classFunction, arrayParam));
    }
    exports.createInstance = createInstance;
    function setImmediate(handler) {
        var unbind;
        var num = new Uint16Array(5);
        var intCrypto = window.msCrypto || window.crypto;
        intCrypto.getRandomValues(num);
        var secret = 'ej2' + combineArray(num);
        var messageHandler = function (event) {
            if (event.source === window && typeof event.data === 'string' && event.data.length <= 32 && event.data === secret) {
                handler();
                unbind();
            }
        };
        window.addEventListener('message', messageHandler, false);
        window.postMessage(secret, '*');
        return unbind = function () {
            window.removeEventListener('message', messageHandler);
        };
    }
    exports.setImmediate = setImmediate;
    function getValue(nameSpace, obj) {
        var value = obj;
        var splits = nameSpace.split('.');
        for (var i = 0; i < splits.length && !isUndefined(value); i++) {
            value = value[splits[i]];
        }
        return value;
    }
    exports.getValue = getValue;
    function setValue(nameSpace, value, obj) {
        var keys = nameSpace.split('.');
        var start = obj || {};
        var fromObj = start;
        var i;
        var length = keys.length;
        var key;
        for (i = 0; i < length; i++) {
            key = keys[i];
            if (i + 1 === length) {
                fromObj[key] = value === undefined ? {} : value;
            }
            else if (isNullOrUndefined(fromObj[key])) {
                fromObj[key] = {};
            }
            fromObj = fromObj[key];
        }
        return start;
    }
    exports.setValue = setValue;
    function deleteObject(obj, key) {
        delete obj[key];
    }
    exports.deleteObject = deleteObject;
    function isObject(obj) {
        var objCon = {};
        return (!isNullOrUndefined(obj) && obj.constructor === objCon.constructor);
    }
    exports.isObject = isObject;
    function getEnumValue(enumObject, enumValue) {
        return enumObject[enumValue];
    }
    exports.getEnumValue = getEnumValue;
    function merge(source, destination) {
        if (!isNullOrUndefined(destination)) {
            var temrObj = source;
            var tempProp = destination;
            var keys = Object.keys(destination);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                temrObj[key] = tempProp[key];
            }
        }
    }
    exports.merge = merge;
    function extend(copied, first, second, deep) {
        var result = copied || {};
        var length = arguments.length;
        if (deep) {
            length = length - 1;
        }
        var _loop_1 = function (i) {
            if (!arguments_1[i]) {
                return "continue";
            }
            var obj1 = arguments_1[i];
            Object.keys(obj1).forEach(function (key) {
                var src = result[key];
                var copy = obj1[key];
                var clone;
                if (deep && isObject(copy)) {
                    clone = isObject(src) ? src : {};
                    result[key] = extend({}, clone, copy, true);
                }
                else {
                    result[key] = copy;
                }
            });
        };
        var arguments_1 = arguments;
        for (var i = 1; i < length; i++) {
            _loop_1(i);
        }
        return result;
    }
    exports.extend = extend;
    function isNullOrUndefined(value) {
        return value === undefined || value === null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isUndefined(value) {
        return ('undefined' === typeof value);
    }
    exports.isUndefined = isUndefined;
    function getUniqueID(definedName) {
        return definedName + '_' + uid++;
    }
    exports.getUniqueID = getUniqueID;
    function debounce(eventFunction, delay) {
        var _this = this;
        var out;
        return function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            var args = arg[0];
            var later = function () {
                out = null;
                return eventFunction.call(_this, args);
            };
            clearTimeout(out);
            out = setTimeout(later, delay);
        };
    }
    exports.debounce = debounce;
    function queryParams(data) {
        var array = [];
        var keys = Object.keys(data);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            array.push(encodeURIComponent(key) + '=' + encodeURIComponent('' + data[key]));
        }
        return array.join('&');
    }
    exports.queryParams = queryParams;
    function isObjectArray(value) {
        var parser = Object.prototype.toString;
        if (parser.call(value) === '[object Array]') {
            if (parser.call(value[0]) === '[object Object]') {
                return true;
            }
        }
        return false;
    }
    exports.isObjectArray = isObjectArray;
    function compareElementParent(child, parent) {
        var node = child;
        if (node === parent) {
            return true;
        }
        else if (node === document || !node) {
            return false;
        }
        else {
            return compareElementParent(node.parentNode, parent);
        }
    }
    exports.compareElementParent = compareElementParent;
    function throwError(message) {
        try {
            throw new Error(message);
        }
        catch (e) {
            throw e.message + '\n' + e.stack;
        }
    }
    exports.throwError = throwError;
    function print(element, printWindow) {
        var div = document.createElement('div');
        var links = [].slice.call(document.getElementsByTagName('head')[0].querySelectorAll('link, style'));
        var reference = '';
        if (isNullOrUndefined(printWindow)) {
            printWindow = window.open('', 'print', 'height=452,width=1024,tabbar=no');
        }
        div.appendChild(element.cloneNode(true));
        for (var i = 0, len = links.length; i < len; i++) {
            reference += links[i].outerHTML;
        }
        printWindow.document.write('<!DOCTYPE html> <html><head>' + reference + '</head><body>' + div.innerHTML +
            '<script> (function() { window.ready = true; })(); </script>' + '</body></html>');
        printWindow.document.close();
        printWindow.focus();
        var interval = setInterval(function () {
            if (printWindow.ready) {
                printWindow.print();
                printWindow.close();
                clearInterval(interval);
            }
        }, 500);
        return printWindow;
    }
    exports.print = print;
    function formatUnit(value) {
        var result = value + '';
        if (result === 'auto' || result.indexOf('%') !== -1 || result.indexOf('px') !== -1) {
            return result;
        }
        return result + 'px';
    }
    exports.formatUnit = formatUnit;
    function getInstance(element, component) {
        var elem = (typeof (element) === 'string') ? document.querySelector(element) : element;
        if (elem[instances]) {
            for (var _i = 0, _a = elem[instances]; _i < _a.length; _i++) {
                var inst = _a[_i];
                if (inst instanceof component) {
                    return inst;
                }
            }
        }
        return null;
    }
    exports.getInstance = getInstance;
    function addInstance(element, instance) {
        var elem = (typeof (element) === 'string') ? document.querySelector(element) : element;
        if (elem[instances]) {
            elem[instances].push(instance);
        }
        else {
            elem[instances] = [instance];
        }
    }
    exports.addInstance = addInstance;
    function combineArray(num) {
        var ret = '';
        for (var i = 0; i < 5; i++) {
            ret += (i ? ',' : '') + num[i];
        }
        return ret;
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39).setImmediate))

/***/ }),
/* 37 */
/***/ (function(module, exports) {

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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40), __webpack_require__(37)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(38);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);