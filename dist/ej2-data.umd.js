/*!
*  filename: ej2-data.umd.js
*  version : 1.0.19
*  Copyright Syncfusion Inc. 2001 - 2017. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@syncfusion/ej2-base"));
	else if(typeof define === 'function' && define.amd)
		define(["@syncfusion/ej2-base"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@syncfusion/ej2-base")) : factory(root["@syncfusion/ej2-base"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, manager_1, query_1, adaptors_1, util_1) {
	    "use strict";
	    function __export(m) {
	        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	    Object.defineProperty(exports, "__esModule", { value: true });
	    __export(manager_1);
	    __export(query_1);
	    __export(adaptors_1);
	    __export(util_1);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, ej2_base_2, util_1, query_1, adaptors_1) {
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
	                util_1.DataUtil.throwError('DataManager: Invalid arguments');
	            }
	            if (data.requiresFormat === undefined && !util_1.DataUtil.isCors()) {
	                data.requiresFormat = ej2_base_2.isNullOrUndefined(data.crossDomain) ? true : data.crossDomain;
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
	                util_1.DataUtil.throwError('DataManager - executeLocal() : A query is required to execute');
	            }
	            if (!this.dataSource.json) {
	                util_1.DataUtil.throwError('DataManager - executeLocal() : Json data is required to execute');
	            }
	            query = query || this.defaultQuery;
	            var result = this.adaptor.processQuery(this, query);
	            if (query.subQuery) {
	                var from = query.subQuery.fromTable;
	                var lookup = query.subQuery.lookups;
	                var res = query.requiresCounts ? result.result :
	                    result;
	                if (lookup && lookup instanceof Array) {
	                    util_1.DataUtil.buildHierarchy(query.subQuery.fKey, from, res, lookup, query.subQuery.key);
	                }
	                for (var j = 0; j < res.length; j++) {
	                    if (res[j][from] instanceof Array) {
	                        res[j] = ej2_base_2.extend({}, {}, res[j]);
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
	                util_1.DataUtil.throwError('DataManager - executeQuery() : A query is required to execute');
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
	                args.aggregates = result.aggregates;
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
	            return ej2_base_2.extend({}, {
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
	                            util_1.DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, data, subData, query.subQuery.key);
	                            process(data, subData.count, subData.xhr);
	                        }
	                    }, fnFail);
	                }
	                return childReq;
	            };
	            var fnSuccess = function (data, request) {
	                if (request.httpRequest.getResponseHeader('Content-Type').indexOf('xml') === -1 && _this.dateParse) {
	                    data = util_1.DataUtil.parse.parseJson(data);
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
	                        util_1.DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, pResult, cResult, query.subQuery.key);
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
	        DataManager.prototype.insert = function (data, tableName, query, position) {
	            data = util_1.DataUtil.parse.replacer(data);
	            if (tableName instanceof query_1.Query) {
	                query = tableName;
	                tableName = null;
	            }
	            var req = this.adaptor.insert(this, data, tableName, query, position);
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
	            value = util_1.DataUtil.parse.replacer(value, !this.dataSource.offline);
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
	            res = ej2_base_2.extend({}, {
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
	                    util_1.DataUtil.parse.parseJson(record);
	                }
	                catch (e) {
	                    record = [];
	                }
	                record = _this.adaptor.processResponse(util_1.DataUtil.parse.parseJson(record), _this, null, request.httpRequest, request);
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(1), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, manager_1, query_1) {
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
	                    if (!ej2_base_1.isNullOrUndefined(groupDs)) {
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
	                    if (!ej2_base_1.isNullOrUndefined(groupDs)) {
	                        var tempObj = groupDs.filter(function (e) { return e.key === grouped[val].key; });
	                        grouped[val].count = tempObj[0].count;
	                    }
	                }
	                grouped[val].count = !ej2_base_1.isNullOrUndefined(groupDs) ? grouped[val].count : grouped[val].count += 1;
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
	                        if (!ej2_base_1.isNullOrUndefined(groupDs)) {
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
	                while (ej2_base_1.isNullOrUndefined(keyVal) && i < array.length) {
	                    keyVal = DataUtil.getVal(array, i, field);
	                    key = array[i++];
	                }
	            }
	            for (; i < array.length; i++) {
	                current = DataUtil.getVal(array, i, field);
	                if (ej2_base_1.isNullOrUndefined(current)) {
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
	    DataUtil.odv4UniOperator = {
	        '$=': 'endswith',
	        '^=': 'startswith',
	        '*=': 'contains',
	        'endswith': 'endswith',
	        'startswith': 'startswith',
	        'contains': 'contains'
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
	                return !ej2_base_1.isNullOrUndefined(actual) && !ej2_base_1.isNullOrUndefined(expected) &&
	                    DataUtil.toLowerCase(actual).indexOf(DataUtil.toLowerCase(expected)) !== -1;
	            }
	            return !ej2_base_1.isNullOrUndefined(actual) && !ej2_base_1.isNullOrUndefined(expected) &&
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
	                    value = DataUtil.parse.jsonReplacer({
	                        value: new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5], 10))
	                    }, false).value;
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
	        replacer: function (value, stringify) {
	            if (DataUtil.isPlainObject(value)) {
	                return DataUtil.parse.jsonReplacer(value, stringify);
	            }
	            if (value instanceof Array) {
	                return DataUtil.parse.arrayReplacer(value);
	            }
	            if (value instanceof Date) {
	                return DataUtil.parse.jsonReplacer({ val: value }, stringify).val;
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 5 */
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, util_1, query_1) {
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
	            var fn = util_1.DataUtil.aggregates[e.type];
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
	                util_1.DataUtil.getFieldList(ds[0], e.fieldNames);
	            }
	            return ds.filter(function (obj) {
	                for (var j = 0; j < e.fieldNames.length; j++) {
	                    if (e.comparer.call(obj, util_1.DataUtil.getObject(e.fieldNames[j], obj), e.searchKey, e.ignoreCase)) {
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
	            var field = util_1.DataUtil.getValue(e.fieldName, query);
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
	                    if (util_1.DataUtil.endsWith(field[i], ' desc')) {
	                        fnCompare = util_1.DataUtil.fnSort('descending');
	                        field[i] = field[i].replace(' desc', '');
	                    }
	                    ds = util_1.DataUtil.sort(ds, field[i], fnCompare);
	                }
	                return ds;
	            }
	            return util_1.DataUtil.sort(ds, field, e.comparer);
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
	                    agg.push({ type: tmp.type, field: util_1.DataUtil.getValue(tmp.field, query) });
	                }
	            }
	            return util_1.DataUtil.group(ds, util_1.DataUtil.getValue(e.fieldName, query), agg);
	        };
	        JsonAdaptor.prototype.onPage = function (ds, e, query) {
	            var size = util_1.DataUtil.getValue(e.pageSize, query);
	            var start = (util_1.DataUtil.getValue(e.pageIndex, query) - 1) * size;
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
	            return ds.slice(util_1.DataUtil.getValue(e.start), util_1.DataUtil.getValue(e.end));
	        };
	        JsonAdaptor.prototype.onTake = function (ds, e) {
	            if (!ds || !ds.length) {
	                return ds;
	            }
	            return ds.slice(0, util_1.DataUtil.getValue(e.nos));
	        };
	        JsonAdaptor.prototype.onSkip = function (ds, e) {
	            if (!ds || !ds.length) {
	                return ds;
	            }
	            return ds.slice(util_1.DataUtil.getValue(e.nos));
	        };
	        JsonAdaptor.prototype.onSelect = function (ds, e) {
	            if (!ds || !ds.length) {
	                return ds;
	            }
	            return util_1.DataUtil.select(ds, util_1.DataUtil.getValue(e.fieldNames));
	        };
	        JsonAdaptor.prototype.insert = function (dm, data, tableName, query, position) {
	            if (ej2_base_1.isNullOrUndefined(position)) {
	                return dm.dataSource.json.push(data);
	            }
	            else {
	                return dm.dataSource.json.splice(position, 0, data);
	            }
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
	            return i < ds.length ? ej2_base_1.merge(ds[i], value) : null;
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
	                skip = util_1.DataUtil.getValue(temp.pageIndex, query);
	                take = util_1.DataUtil.getValue(temp.pageSize, query);
	                skip = (skip - 1) * take;
	            }
	            else if ('onRange' in singles) {
	                temp = singles.onRange;
	                skip = temp.start;
	                take = temp.end - temp.start;
	            }
	            for (var i = 0; i < queries.sorts.length; i++) {
	                temp = util_1.DataUtil.getValue(queries.sorts[i].e.fieldName, query);
	                request.sorts.push(util_1.DataUtil.callAdaptorFunction(this, 'onEachSort', { name: temp, direction: queries.sorts[i].e.direction }, query));
	            }
	            if (hierarchyFilters) {
	                temp = this.getFiltersFrom(hierarchyFilters, query);
	                if (temp) {
	                    request.filters.push(util_1.DataUtil.callAdaptorFunction(this, 'onEachWhere', temp.toJson(), query));
	                }
	            }
	            for (var i = 0; i < queries.filters.length; i++) {
	                request.filters.push(util_1.DataUtil.callAdaptorFunction(this, 'onEachWhere', queries.filters[i].e.toJson(), query));
	                var keys_1 = typeof request.filters[i] === 'object' ? Object.keys(request.filters[i]) : [];
	                for (var _i = 0, keys_2 = keys_1; _i < keys_2.length; _i++) {
	                    var prop = keys_2[_i];
	                    if (util_1.DataUtil.isNull((request)[prop])) {
	                        delete request[prop];
	                    }
	                }
	            }
	            for (var i = 0; i < queries.searches.length; i++) {
	                temp = queries.searches[i].e;
	                request.searches.push(util_1.DataUtil.callAdaptorFunction(this, 'onEachSearch', {
	                    fields: temp.fieldNames,
	                    operator: temp.operator,
	                    key: temp.searchKey,
	                    ignoreCase: temp.ignoreCase
	                }, query));
	            }
	            for (var i = 0; i < queries.groups.length; i++) {
	                request.groups.push(util_1.DataUtil.getValue(queries.groups[i].e.fieldName, query));
	            }
	            for (var i = 0; i < queries.aggregates.length; i++) {
	                temp = queries.aggregates[i].e;
	                request.aggregates.push({ type: temp.type, field: util_1.DataUtil.getValue(temp.field, query) });
	            }
	            var req = {};
	            this.getRequestQuery(options, query, singles, request, req);
	            util_1.DataUtil.callAdaptorFunction(this, 'addParams', { dm: dm, query: query, params: params, reqParams: req });
	            var keys = Object.keys(req);
	            for (var _a = 0, keys_3 = keys; _a < keys_3.length; _a++) {
	                var prop = keys_3[_a];
	                if (util_1.DataUtil.isNull(req[prop]) || req[prop] === '' || req[prop].length === 0) {
	                    delete req[prop];
	                }
	            }
	            if (!(options.skip in req && options.take in req) && take !== null) {
	                req[options.skip] = util_1.DataUtil.callAdaptorFunction(this, 'onSkip', skip, query);
	                req[options.take] = util_1.DataUtil.callAdaptorFunction(this, 'onTake', take, query);
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
	                util_1.DataUtil.callAdaptorFunction(this, 'onSelect', util_1.DataUtil.getValue(singles.onSelect.fieldNames, query), query) : '';
	            req[options.count] = query.requiresCounts ? util_1.DataUtil.callAdaptorFunction(this, 'onCount', query.requiresCounts, query) : '';
	            req[options.search] = request.searches.length ? util_1.DataUtil.callAdaptorFunction(this, 'onSearch', request.searches, query) : '';
	            req[options.skip] = 'onSkip' in singles ?
	                util_1.DataUtil.callAdaptorFunction(this, 'onSkip', util_1.DataUtil.getValue(singles.onSkip.nos, query), query) : '';
	            req[options.take] = 'onTake' in singles ?
	                util_1.DataUtil.callAdaptorFunction(this, 'onTake', util_1.DataUtil.getValue(singles.onTake.nos, query), query) : '';
	            req[options.where] = request.filters.length || request.searches.length ?
	                util_1.DataUtil.callAdaptorFunction(this, 'onWhere', request.filters, query) : '';
	            req[options.sortBy] = request.sorts.length ? util_1.DataUtil.callAdaptorFunction(this, 'onSortBy', request.sorts, query) : '';
	            req[options.group] = request.groups.length ? util_1.DataUtil.callAdaptorFunction(this, 'onGroup', request.groups, query) : '';
	            req[options.aggregates] = request.aggregates.length ?
	                util_1.DataUtil.callAdaptorFunction(this, 'onAggregates', request.aggregates, query) : '';
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
	                return (query.requiresCounts ? { result: [], count: 0 } : []);
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
	            return util_1.DataUtil.isNull(args.count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
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
	                    value = util_1.DataUtil.getObject(pKey || prop, data[i]);
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
	                    fn = util_1.DataUtil.aggregates[agg[i].type];
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
	                    if (!ej2_base_1.isNullOrUndefined(groupDs)) {
	                        groupDs = util_1.DataUtil.group(groupDs, groups[i]);
	                    }
	                    pData = util_1.DataUtil.group(pData, groups[i], pvt.aggregates, level, groupDs);
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
	        UrlAdaptor.prototype.addParams = function (options) {
	            var req = options.reqParams;
	            if (options.params.length) {
	                req.params = {};
	            }
	            for (var _i = 0, _a = options.params; _i < _a.length; _i++) {
	                var tmp = _a[_i];
	                if (req[tmp.key]) {
	                    throw new Error('Query() - addParams: Custom Param is conflicting other request arguments');
	                }
	                req[tmp.key] = tmp.value;
	                if (tmp.fn) {
	                    req[tmp.key] = tmp.fn.call(options.query, tmp.key, options.query, options.dm);
	                }
	                req.params[tmp.key] = req[tmp.key];
	            }
	        };
	        return UrlAdaptor;
	    }(Adaptor));
	    exports.UrlAdaptor = UrlAdaptor;
	    var ODataAdaptor = (function (_super) {
	        __extends(ODataAdaptor, _super);
	        function ODataAdaptor() {
	            var _this = _super.call(this) || this;
	            _this.options = ej2_base_1.extend({}, _this.options, {
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
	            _this.getModuleName = ej2_base_1.getValue('getModulename', _this);
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
	                val = 'datetime\'' + util_1.DataUtil.parse.replacer(val) + '\'';
	            }
	            if (type === 'string') {
	                val = '\'' + val + '\'';
	                if (requiresCast) {
	                    field = 'cast(' + field + ', \'Edm.String\')';
	                }
	                if (util_1.DataUtil.parse.isGuid(val)) {
	                    guid = 'guid';
	                }
	                if (predicate.ignoreCase) {
	                    if (!guid) {
	                        field = 'tolower(' + field + ')';
	                    }
	                    val = val.toLowerCase();
	                }
	            }
	            operator = util_1.DataUtil.odBiOperator[predicate.operator];
	            if (operator) {
	                returnValue += field;
	                returnValue += operator;
	                if (guid) {
	                    returnValue += guid;
	                }
	                return returnValue + val;
	            }
	            if (!ej2_base_1.isNullOrUndefined(this.getModuleName)) {
	                if (this.getModuleName() === 'ODataV4Adaptor') {
	                    operator = util_1.DataUtil.odv4UniOperator[predicate.operator];
	                }
	            }
	            else {
	                operator = util_1.DataUtil.odUniOperator[predicate.operator];
	            }
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
	                util_1.DataUtil.throwError('Query() - Search : oData search requires list of field names to search');
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
	            if (util_1.DataUtil.endsWith(settings.url, this.options.batch) && settings.type.toLowerCase() === 'post') {
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
	            if (!ej2_base_1.isNullOrUndefined(data.d)) {
	                var dataCopy = (query && query.requiresCounts) ? data.d.results : data.d;
	                var metaData = '__metadata';
	                if (!ej2_base_1.isNullOrUndefined(dataCopy)) {
	                    for (var i = 0; i < dataCopy.length; i++) {
	                        if (!ej2_base_1.isNullOrUndefined(dataCopy[i][metaData])) {
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
	            return util_1.DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
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
	            var initialGuid = e.guid = util_1.DataUtil.getGuid(this.options.batchPre);
	            var url = dm.dataSource.url.replace(/\/*$/, '/' + this.options.batch);
	            var args = {
	                url: e.url,
	                key: e.key,
	                cid: 1,
	                cSet: util_1.DataUtil.getGuid(this.options.changeSet)
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
	                return (query.requiresCounts ? { result: [], count: 0 } : []);
	            }
	            if (request && this.options.batch && util_1.DataUtil.endsWith(request.url, this.options.batch) && request.type.toLowerCase() === 'post') {
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
	                        jsonObj = util_1.DataUtil.parse.parseJson(/^\{.+\}/m.exec(data[i])[0]);
	                        ej2_base_1.extend({}, changes.addedRecords[cIdx], this.processResponse(jsonObj));
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
	            _this.options = ej2_base_1.extend({}, _this.options, {
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
	        ODataV4Adaptor.prototype.getModulename = function () {
	            return 'ODataV4Adaptor';
	        };
	        ;
	        ODataV4Adaptor.prototype.onCount = function (e) {
	            return e === true ? 'true' : '';
	        };
	        ODataV4Adaptor.prototype.onPredicate = function (predicate, query, requiresCast) {
	            var returnValue = '';
	            var val = predicate.value;
	            var isDate = val instanceof Date;
	            returnValue = _super.prototype.onPredicate.call(this, predicate, query, requiresCast);
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
	            return util_1.DataUtil.isNull(count) ? args.result : { result: args.result, count: count, aggregates: args.aggregates };
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
	                    if (!util_1.DataUtil.isNull(data.Count)) {
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
	            return util_1.DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
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
	            var data = util_1.DataUtil.parse.parseJson(obj[getData]);
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
	            ej2_base_1.setValue('beforeSend', UrlAdaptor.prototype.beforeSend, _this);
	            ej2_base_1.setValue('insert', UrlAdaptor.prototype.insert, _this);
	            ej2_base_1.setValue('update', UrlAdaptor.prototype.update, _this);
	            ej2_base_1.setValue('remove', UrlAdaptor.prototype.remove, _this);
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
	            if (!ej2_base_1.isNullOrUndefined(adaptor)) {
	                _this.cacheAdaptor = adaptor;
	            }
	            _this.pageSize = pageSize;
	            _this.guidId = util_1.DataUtil.getGuid('cacheAdaptor');
	            var obj = { keys: [], results: [] };
	            window.localStorage.setItem(_this.guidId, JSON.stringify(obj));
	            var guid = _this.guidId;
	            if (!ej2_base_1.isNullOrUndefined(timeStamp)) {
	                setInterval(function () {
	                    var data;
	                    data = util_1.DataUtil.parse.parseJson(window.localStorage.getItem(guid));
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
	            cachedItems = util_1.DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
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
	                util_1.DataUtil.endsWith(request.url, this.cacheAdaptor.options.batch) && request.type.toLowerCase() === 'post')) {
	                return this.cacheAdaptor.processResponse(data, ds, query, xhr, request, changes);
	            }
	            data = this.cacheAdaptor.processResponse.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
	            var key = query ? this.generateKey(ds.dataSource.url, query) : ds.dataSource.url;
	            var obj = {};
	            obj = util_1.DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
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
	            if (util_1.DataUtil.endsWith(settings.url, this.cacheAdaptor.options.batch) && settings.type.toLowerCase() === 'post') {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMjM2ODI2ODU5MTIzNmYyZjg0NyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQHN5bmNmdXNpb24vZWoyLWJhc2VcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkYXB0b3JzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztpRUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFrRCxjQUFjO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztpRUNWRDtBQUNBO0FBQ0EsbURBQWtELGNBQWM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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YjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixlQUFlO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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QUFDQTtBQUNBO0FBQ0Esd0JBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLHlCQUF5QjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQyxtQkFBbUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsaUNBQWdDLGlDQUFpQztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQyx1Q0FBdUM7QUFDMUUsZ0RBQStDLGdGQUFnRjtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQyIsImZpbGUiOiJlajItZGF0YS51bWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJAc3luY2Z1c2lvbi9lajItYmFzZVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJAc3luY2Z1c2lvbi9lajItYmFzZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwiQHN5bmNmdXNpb24vZWoyLWJhc2VcIikpIDogZmFjdG9yeShyb290W1wiQHN5bmNmdXNpb24vZWoyLWJhc2VcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzIzNjgyNjg1OTEyMzZmMmY4NDciLCJkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuL21hbmFnZXJcIiwgXCIuL3F1ZXJ5XCIsIFwiLi9hZGFwdG9yc1wiLCBcIi4vdXRpbFwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIG1hbmFnZXJfMSwgcXVlcnlfMSwgYWRhcHRvcnNfMSwgdXRpbF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgICAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBfX2V4cG9ydChtYW5hZ2VyXzEpO1xuICAgIF9fZXhwb3J0KHF1ZXJ5XzEpO1xuICAgIF9fZXhwb3J0KGFkYXB0b3JzXzEpO1xuICAgIF9fZXhwb3J0KHV0aWxfMSk7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIkBzeW5jZnVzaW9uL2VqMi1iYXNlXCIsIFwiQHN5bmNmdXNpb24vZWoyLWJhc2VcIiwgXCIuL3V0aWxcIiwgXCIuL3F1ZXJ5XCIsIFwiLi9hZGFwdG9yc1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIGVqMl9iYXNlXzEsIGVqMl9iYXNlXzIsIHV0aWxfMSwgcXVlcnlfMSwgYWRhcHRvcnNfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICB2YXIgRGF0YU1hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBEYXRhTWFuYWdlcihkYXRhU291cmNlLCBxdWVyeSwgYWRhcHRvcikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBhcnNlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdHMgPSBbXTtcbiAgICAgICAgICAgIGlmICghZGF0YVNvdXJjZSAmJiAhdGhpcy5kYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgZGF0YVNvdXJjZSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRhcHRvciA9IGFkYXB0b3IgfHwgZGF0YVNvdXJjZS5hZGFwdG9yO1xuICAgICAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgICAgICBpZiAoZGF0YVNvdXJjZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAganNvbjogZGF0YVNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgb2ZmbGluZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZGF0YVNvdXJjZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGFTb3VyY2UuanNvbikge1xuICAgICAgICAgICAgICAgICAgICBkYXRhU291cmNlLmpzb24gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBkYXRhU291cmNlLnVybCxcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0VXJsOiBkYXRhU291cmNlLmluc2VydFVybCxcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlVXJsOiBkYXRhU291cmNlLnJlbW92ZVVybCxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVXJsOiBkYXRhU291cmNlLnVwZGF0ZVVybCxcbiAgICAgICAgICAgICAgICAgICAgY3J1ZFVybDogZGF0YVNvdXJjZS5jcnVkVXJsLFxuICAgICAgICAgICAgICAgICAgICBiYXRjaFVybDogZGF0YVNvdXJjZS5iYXRjaFVybCxcbiAgICAgICAgICAgICAgICAgICAganNvbjogZGF0YVNvdXJjZS5qc29uLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBkYXRhU291cmNlLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdDogZGF0YVNvdXJjZS5hY2NlcHQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFTb3VyY2UuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgdGltZVRpbGxFeHBpcmF0aW9uOiBkYXRhU291cmNlLnRpbWVUaWxsRXhwaXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgY2FjaGluZ1BhZ2VTaXplOiBkYXRhU291cmNlLmNhY2hpbmdQYWdlU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlQ2FjaGluZzogZGF0YVNvdXJjZS5lbmFibGVDYWNoaW5nLFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0VHlwZTogZGF0YVNvdXJjZS5yZXF1ZXN0VHlwZSxcbiAgICAgICAgICAgICAgICAgICAga2V5OiBkYXRhU291cmNlLmtleSxcbiAgICAgICAgICAgICAgICAgICAgY3Jvc3NEb21haW46IGRhdGFTb3VyY2UuY3Jvc3NEb21haW4sXG4gICAgICAgICAgICAgICAgICAgIGpzb25wOiBkYXRhU291cmNlLmpzb25wLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogZGF0YVNvdXJjZS5kYXRhVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgb2ZmbGluZTogZGF0YVNvdXJjZS5vZmZsaW5lICE9PSB1bmRlZmluZWQgPyBkYXRhU291cmNlLm9mZmxpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZGF0YVNvdXJjZS5hZGFwdG9yIGluc3RhbmNlb2YgYWRhcHRvcnNfMS5SZW1vdGVTYXZlQWRhcHRvciA/IGZhbHNlIDogZGF0YVNvdXJjZS51cmwgPyBmYWxzZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVzRm9ybWF0OiBkYXRhU291cmNlLnJlcXVpcmVzRm9ybWF0XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHV0aWxfMS5EYXRhVXRpbC50aHJvd0Vycm9yKCdEYXRhTWFuYWdlcjogSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLnJlcXVpcmVzRm9ybWF0ID09PSB1bmRlZmluZWQgJiYgIXV0aWxfMS5EYXRhVXRpbC5pc0NvcnMoKSkge1xuICAgICAgICAgICAgICAgIGRhdGEucmVxdWlyZXNGb3JtYXQgPSBlajJfYmFzZV8yLmlzTnVsbE9yVW5kZWZpbmVkKGRhdGEuY3Jvc3NEb21haW4pID8gdHJ1ZSA6IGRhdGEuY3Jvc3NEb21haW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5kYXRhVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5kYXRhVHlwZSA9ICdqc29uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IGRhdGE7XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeSA9IHF1ZXJ5O1xuICAgICAgICAgICAgaWYgKGRhdGEudXJsICYmIGRhdGEub2ZmbGluZSAmJiAhZGF0YS5qc29uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNEYXRhQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGFwdG9yID0gYWRhcHRvciB8fCBuZXcgYWRhcHRvcnNfMS5PRGF0YUFkYXB0b3IoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2Uub2ZmbGluZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVhZHkgPSB0aGlzLmV4ZWN1dGVRdWVyeShxdWVyeSB8fCBuZXcgcXVlcnlfMS5RdWVyeSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWR5LnRoZW4oZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGF0YVNvdXJjZS5vZmZsaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaXNEYXRhQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5qc29uID0gZS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFkYXB0b3IgPSBuZXcgYWRhcHRvcnNfMS5Kc29uQWRhcHRvcigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGFwdG9yID0gZGF0YS5vZmZsaW5lID8gbmV3IGFkYXB0b3JzXzEuSnNvbkFkYXB0b3IoKSA6IG5ldyBhZGFwdG9yc18xLk9EYXRhQWRhcHRvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkYXRhLmpzb25wICYmIHRoaXMuYWRhcHRvciBpbnN0YW5jZW9mIGFkYXB0b3JzXzEuT0RhdGFBZGFwdG9yKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5qc29ucCA9ICdjYWxsYmFjayc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFkYXB0b3IgPSBhZGFwdG9yIHx8IHRoaXMuYWRhcHRvcjtcbiAgICAgICAgICAgIGlmIChkYXRhLmVuYWJsZUNhY2hpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkYXB0b3IgPSBuZXcgYWRhcHRvcnNfMS5DYWNoZUFkYXB0b3IodGhpcy5hZGFwdG9yLCBkYXRhLnRpbWVUaWxsRXhwaXJhdGlvbiwgZGF0YS5jYWNoaW5nUGFnZVNpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgRGF0YU1hbmFnZXIucHJvdG90eXBlLnNldERlZmF1bHRRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnkgPSBxdWVyeTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhTWFuYWdlci5wcm90b3R5cGUuZXhlY3V0ZUxvY2FsID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGVmYXVsdFF1ZXJ5ICYmICEocXVlcnkgaW5zdGFuY2VvZiBxdWVyeV8xLlF1ZXJ5KSkge1xuICAgICAgICAgICAgICAgIHV0aWxfMS5EYXRhVXRpbC50aHJvd0Vycm9yKCdEYXRhTWFuYWdlciAtIGV4ZWN1dGVMb2NhbCgpIDogQSBxdWVyeSBpcyByZXF1aXJlZCB0byBleGVjdXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZS5qc29uKSB7XG4gICAgICAgICAgICAgICAgdXRpbF8xLkRhdGFVdGlsLnRocm93RXJyb3IoJ0RhdGFNYW5hZ2VyIC0gZXhlY3V0ZUxvY2FsKCkgOiBKc29uIGRhdGEgaXMgcmVxdWlyZWQgdG8gZXhlY3V0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVlcnkgPSBxdWVyeSB8fCB0aGlzLmRlZmF1bHRRdWVyeTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmFkYXB0b3IucHJvY2Vzc1F1ZXJ5KHRoaXMsIHF1ZXJ5KTtcbiAgICAgICAgICAgIGlmIChxdWVyeS5zdWJRdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gcXVlcnkuc3ViUXVlcnkuZnJvbVRhYmxlO1xuICAgICAgICAgICAgICAgIHZhciBsb29rdXAgPSBxdWVyeS5zdWJRdWVyeS5sb29rdXBzO1xuICAgICAgICAgICAgICAgIHZhciByZXMgPSBxdWVyeS5yZXF1aXJlc0NvdW50cyA/IHJlc3VsdC5yZXN1bHQgOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKGxvb2t1cCAmJiBsb29rdXAgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICB1dGlsXzEuRGF0YVV0aWwuYnVpbGRIaWVyYXJjaHkocXVlcnkuc3ViUXVlcnkuZktleSwgZnJvbSwgcmVzLCBsb29rdXAsIHF1ZXJ5LnN1YlF1ZXJ5LmtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNbal1bZnJvbV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzW2pdID0gZWoyX2Jhc2VfMi5leHRlbmQoe30sIHt9LCByZXNbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzW2pdW2Zyb21dID0gdGhpcy5hZGFwdG9yLnByb2Nlc3NSZXNwb25zZShxdWVyeS5zdWJRdWVyeS51c2luZyhuZXcgRGF0YU1hbmFnZXIocmVzW2pdW2Zyb21dLnNsaWNlKDApKSkuZXhlY3V0ZUxvY2FsKCksIHRoaXMsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYXB0b3IucHJvY2Vzc1Jlc3BvbnNlKHJlc3VsdCwgdGhpcywgcXVlcnkpO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhTWFuYWdlci5wcm90b3R5cGUuZXhlY3V0ZVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5LCBkb25lLCBmYWlsLCBhbHdheXMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgYWx3YXlzID0gZmFpbDtcbiAgICAgICAgICAgICAgICBmYWlsID0gZG9uZTtcbiAgICAgICAgICAgICAgICBkb25lID0gcXVlcnk7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFxdWVyeSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5kZWZhdWx0UXVlcnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShxdWVyeSBpbnN0YW5jZW9mIHF1ZXJ5XzEuUXVlcnkpKSB7XG4gICAgICAgICAgICAgICAgdXRpbF8xLkRhdGFVdGlsLnRocm93RXJyb3IoJ0RhdGFNYW5hZ2VyIC0gZXhlY3V0ZVF1ZXJ5KCkgOiBBIHF1ZXJ5IGlzIHJlcXVpcmVkIHRvIGV4ZWN1dGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZWZmZXJlZCA9IG5ldyBEZWZlcnJlZCgpO1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSB7IHF1ZXJ5OiBxdWVyeSB9O1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGFTb3VyY2Uub2ZmbGluZSAmJiB0aGlzLmRhdGFTb3VyY2UudXJsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5hZGFwdG9yLnByb2Nlc3NRdWVyeSh0aGlzLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYWtlUmVxdWVzdChyZXN1bHQsIGRlZmZlcmVkLCBhcmdzLCBxdWVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBEYXRhTWFuYWdlci5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXMgPSBfdGhpcy5leGVjdXRlTG9jYWwocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gRGF0YU1hbmFnZXIuZ2V0RGVmZXJlZEFyZ3MocXVlcnksIHJlcywgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmZlcmVkLnJlc29sdmUoYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmZmVyZWQucHJvbWlzZTtcbiAgICAgICAgfTtcbiAgICAgICAgRGF0YU1hbmFnZXIuZ2V0RGVmZXJlZEFyZ3MgPSBmdW5jdGlvbiAocXVlcnksIHJlc3VsdCwgYXJncykge1xuICAgICAgICAgICAgaWYgKHF1ZXJ5LnJlcXVpcmVzQ291bnRzKSB7XG4gICAgICAgICAgICAgICAgYXJncy5yZXN1bHQgPSByZXN1bHQucmVzdWx0O1xuICAgICAgICAgICAgICAgIGFyZ3MuY291bnQgPSByZXN1bHQuY291bnQ7XG4gICAgICAgICAgICAgICAgYXJncy5hZ2dyZWdhdGVzID0gcmVzdWx0LmFnZ3JlZ2F0ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmdzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhTWFuYWdlci5uZXh0VGljayA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgKHdpbmRvdy5zZXRJbW1lZGlhdGUgfHwgd2luZG93LnNldFRpbWVvdXQpKGZuLCAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgRGF0YU1hbmFnZXIucHJvdG90eXBlLmV4dGVuZFJlcXVlc3QgPSBmdW5jdGlvbiAodXJsLCBmblN1Y2Nlc3MsIGZuRmFpbCkge1xuICAgICAgICAgICAgcmV0dXJuIGVqMl9iYXNlXzIuZXh0ZW5kKHt9LCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IHRoaXMuZGF0YVNvdXJjZS5kYXRhVHlwZSxcbiAgICAgICAgICAgICAgICBjcm9zc0RvbWFpbjogdGhpcy5kYXRhU291cmNlLmNyb3NzRG9tYWluLFxuICAgICAgICAgICAgICAgIGpzb25wOiB0aGlzLmRhdGFTb3VyY2UuanNvbnAsXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogZm5TdWNjZXNzLFxuICAgICAgICAgICAgICAgIG9uRmFpbHVyZTogZm5GYWlsXG4gICAgICAgICAgICB9LCB1cmwpO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhTWFuYWdlci5wcm90b3R5cGUubWFrZVJlcXVlc3QgPSBmdW5jdGlvbiAodXJsLCBkZWZmZXJlZCwgYXJncywgcXVlcnkpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgaXNTZWxlY3RvciA9ICEhcXVlcnkuc3ViUXVlcnlTZWxlY3RvcjtcbiAgICAgICAgICAgIHZhciBmbkZhaWwgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGFyZ3MuZXJyb3IgPSBlO1xuICAgICAgICAgICAgICAgIGRlZmZlcmVkLnJlamVjdChhcmdzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcHJvY2VzcyA9IGZ1bmN0aW9uIChkYXRhLCBjb3VudCwgeGhyLCByZXF1ZXN0LCBhY3R1YWwsIGFnZ3JlZ2F0ZXMsIHZpcnR1YWxTZWxlY3RSZWNvcmRzKSB7XG4gICAgICAgICAgICAgICAgYXJncy54aHIgPSB4aHI7XG4gICAgICAgICAgICAgICAgYXJncy5jb3VudCA9IGNvdW50ID8gcGFyc2VJbnQoY291bnQudG9TdHJpbmcoKSwgMTApIDogMDtcbiAgICAgICAgICAgICAgICBhcmdzLnJlc3VsdCA9IGRhdGE7XG4gICAgICAgICAgICAgICAgYXJncy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgICAgICAgICBhcmdzLmFnZ3JlZ2F0ZXMgPSBhZ2dyZWdhdGVzO1xuICAgICAgICAgICAgICAgIGFyZ3MuYWN0dWFsID0gYWN0dWFsO1xuICAgICAgICAgICAgICAgIGFyZ3MudmlydHVhbFNlbGVjdFJlY29yZHMgPSB2aXJ0dWFsU2VsZWN0UmVjb3JkcztcbiAgICAgICAgICAgICAgICBkZWZmZXJlZC5yZXNvbHZlKGFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBmblF1ZXJ5Q2hpbGQgPSBmdW5jdGlvbiAoZGF0YSwgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3ViRGVmZmVyID0gbmV3IERlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkQXJncyA9IHsgcGFyZW50OiBhcmdzIH07XG4gICAgICAgICAgICAgICAgcXVlcnkuc3ViUXVlcnkuaXNDaGlsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHN1YlVybCA9IF90aGlzLmFkYXB0b3IucHJvY2Vzc1F1ZXJ5KF90aGlzLCBxdWVyeS5zdWJRdWVyeSwgZGF0YSA/IF90aGlzLmFkYXB0b3IucHJvY2Vzc1Jlc3BvbnNlKGRhdGEpIDogc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZFJlcSA9IF90aGlzLm1ha2VSZXF1ZXN0KHN1YlVybCwgc3ViRGVmZmVyLCBjaGlsZEFyZ3MsIHF1ZXJ5LnN1YlF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzU2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViRGVmZmVyLnRoZW4oZnVuY3Rpb24gKHN1YkRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbF8xLkRhdGFVdGlsLmJ1aWxkSGllcmFyY2h5KHF1ZXJ5LnN1YlF1ZXJ5LmZLZXksIHF1ZXJ5LnN1YlF1ZXJ5LmZyb21UYWJsZSwgZGF0YSwgc3ViRGF0YSwgcXVlcnkuc3ViUXVlcnkua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzKGRhdGEsIHN1YkRhdGEuY291bnQsIHN1YkRhdGEueGhyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZm5GYWlsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkUmVxO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBmblN1Y2Nlc3MgPSBmdW5jdGlvbiAoZGF0YSwgcmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0Lmh0dHBSZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKS5pbmRleE9mKCd4bWwnKSA9PT0gLTEgJiYgX3RoaXMuZGF0ZVBhcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB1dGlsXzEuRGF0YVV0aWwucGFyc2UucGFyc2VKc29uKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gX3RoaXMuYWRhcHRvci5wcm9jZXNzUmVzcG9uc2UoZGF0YSwgX3RoaXMsIHF1ZXJ5LCByZXF1ZXN0Lmh0dHBSZXF1ZXN0LCByZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHZhciBhZ2dyZWdhdGVzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgdmlydHVhbFNlbGVjdFJlY29yZHMgPSAndmlydHVhbFNlbGVjdFJlY29yZHMnO1xuICAgICAgICAgICAgICAgIHZhciB2aXJ0dWFsUmVjb3JkcyA9IGRhdGFbdmlydHVhbFNlbGVjdFJlY29yZHNdO1xuICAgICAgICAgICAgICAgIGlmIChxdWVyeS5yZXF1aXJlc0NvdW50cykge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IHJlc3VsdC5jb3VudDtcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlcyA9IHJlc3VsdC5hZ2dyZWdhdGVzO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXF1ZXJ5LnN1YlF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3MocmVzdWx0LCBjb3VudCwgcmVxdWVzdC5odHRwUmVxdWVzdCwgcmVxdWVzdC50eXBlLCBkYXRhLCBhZ2dyZWdhdGVzLCB2aXJ0dWFsUmVjb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc1NlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuUXVlcnlDaGlsZChyZXN1bHQsIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcmVxID0gdGhpcy5leHRlbmRSZXF1ZXN0KHVybCwgZm5TdWNjZXNzLCBmbkZhaWwpO1xuICAgICAgICAgICAgdmFyIGFqYXggPSBuZXcgZWoyX2Jhc2VfMS5BamF4KHJlcSk7XG4gICAgICAgICAgICBhamF4LmJlZm9yZVNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuYmVmb3JlU2VuZChhamF4Lmh0dHBSZXF1ZXN0LCBhamF4KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXEgPSBhamF4LnNlbmQoKTtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdHMucHVzaChhamF4KTtcbiAgICAgICAgICAgIGlmIChpc1NlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdmFyIHJlcyA9IHF1ZXJ5LnN1YlF1ZXJ5U2VsZWN0b3IuY2FsbCh0aGlzLCB7IHF1ZXJ5OiBxdWVyeS5zdWJRdWVyeSwgcGFyZW50OiBxdWVyeSB9KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IFByb21pc2UuYWxsKFtyZXEsIGZuUXVlcnlDaGlsZChudWxsLCByZXMpXSk7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwUmVzdWx0ID0gX3RoaXMuYWRhcHRvci5wcm9jZXNzUmVzcG9uc2UocmVzdWx0WzBdLCBfdGhpcywgcXVlcnksIF90aGlzLnJlcXVlc3RzWzBdLmh0dHBSZXF1ZXN0LCBfdGhpcy5yZXF1ZXN0c1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXJ5LnJlcXVpcmVzQ291bnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQgPSBwUmVzdWx0LmNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSZXN1bHQgPSBwUmVzdWx0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjUmVzdWx0ID0gX3RoaXMuYWRhcHRvci5wcm9jZXNzUmVzcG9uc2UocmVzdWx0WzFdLCBfdGhpcywgcXVlcnkuc3ViUXVlcnksIF90aGlzLnJlcXVlc3RzWzFdLmh0dHBSZXF1ZXN0LCBfdGhpcy5yZXF1ZXN0c1sxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnkuc3ViUXVlcnkucmVxdWlyZXNDb3VudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudCA9IGNSZXN1bHQuY291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY1Jlc3VsdCA9IGNSZXN1bHQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbF8xLkRhdGFVdGlsLmJ1aWxkSGllcmFyY2h5KHF1ZXJ5LnN1YlF1ZXJ5LmZLZXksIHF1ZXJ5LnN1YlF1ZXJ5LmZyb21UYWJsZSwgcFJlc3VsdCwgY1Jlc3VsdCwgcXVlcnkuc3ViUXVlcnkua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0b3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MocFJlc3VsdCwgY291bnQsIF90aGlzLnJlcXVlc3RzWzBdLmh0dHBSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdG9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcTtcbiAgICAgICAgfTtcbiAgICAgICAgRGF0YU1hbmFnZXIucHJvdG90eXBlLmJlZm9yZVNlbmQgPSBmdW5jdGlvbiAocmVxdWVzdCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRvci5iZWZvcmVTZW5kKHRoaXMsIHJlcXVlc3QsIHNldHRpbmdzKTtcbiAgICAgICAgICAgIHZhciBoZWFkZXJzID0gdGhpcy5kYXRhU291cmNlLmhlYWRlcnM7XG4gICAgICAgICAgICB2YXIgcHJvcHM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaGVhZGVycyAmJiBpIDwgaGVhZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHByb3BzID0gW107XG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhoZWFkZXJzW2ldKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGtleXNfMSA9IGtleXM7IF9pIDwga2V5c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGtleXNfMVtfaV07XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLnB1c2gocHJvcCk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihwcm9wLCBoZWFkZXJzW2ldW3Byb3BdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIERhdGFNYW5hZ2VyLnByb3RvdHlwZS5zYXZlQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzLCBrZXksIHRhYmxlTmFtZSwgcXVlcnkpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBpZiAodGFibGVOYW1lIGluc3RhbmNlb2YgcXVlcnlfMS5RdWVyeSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gdGFibGVOYW1lO1xuICAgICAgICAgICAgICAgIHRhYmxlTmFtZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgICAgICB1cmw6IHRhYmxlTmFtZSxcbiAgICAgICAgICAgICAgICBrZXk6IGtleSB8fCB0aGlzLmRhdGFTb3VyY2Uua2V5XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHJlcSA9IHRoaXMuYWRhcHRvci5iYXRjaFJlcXVlc3QodGhpcywgY2hhbmdlcywgYXJncywgcXVlcnkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZS5vZmZsaW5lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZWZmID0gbmV3IERlZmVycmVkKCk7XG4gICAgICAgICAgICB2YXIgYWpheCA9IG5ldyBlajJfYmFzZV8xLkFqYXgocmVxKTtcbiAgICAgICAgICAgIGFqYXguYmVmb3JlU2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5iZWZvcmVTZW5kKGFqYXguaHR0cFJlcXVlc3QsIGFqYXgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGFqYXgub25TdWNjZXNzID0gZnVuY3Rpb24gKGRhdGEsIHJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICBkZWZmLnJlc29sdmUoX3RoaXMsIFtfdGhpcy5hZGFwdG9yLnByb2Nlc3NSZXNwb25zZShkYXRhLCBfdGhpcywgbnVsbCwgcmVxdWVzdC5odHRwUmVxdWVzdCwgcmVxdWVzdCwgY2hhbmdlcyldKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhamF4Lm9uRmFpbHVyZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZGVmZi5yZWplY3QoW3sgZXJyb3I6IGUgfV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGFqYXguc2VuZCgpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmYucHJvbWlzZTtcbiAgICAgICAgfTtcbiAgICAgICAgRGF0YU1hbmFnZXIucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIChkYXRhLCB0YWJsZU5hbWUsIHF1ZXJ5LCBwb3NpdGlvbikge1xuICAgICAgICAgICAgZGF0YSA9IHV0aWxfMS5EYXRhVXRpbC5wYXJzZS5yZXBsYWNlcihkYXRhKTtcbiAgICAgICAgICAgIGlmICh0YWJsZU5hbWUgaW5zdGFuY2VvZiBxdWVyeV8xLlF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSB0YWJsZU5hbWU7XG4gICAgICAgICAgICAgICAgdGFibGVOYW1lID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXEgPSB0aGlzLmFkYXB0b3IuaW5zZXJ0KHRoaXMsIGRhdGEsIHRhYmxlTmFtZSwgcXVlcnksIHBvc2l0aW9uKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2Uub2ZmbGluZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb0FqYXhSZXF1ZXN0KHJlcSk7XG4gICAgICAgIH07XG4gICAgICAgIERhdGFNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5RmllbGQsIHZhbHVlLCB0YWJsZU5hbWUsIHF1ZXJ5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVba2V5RmllbGRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRhYmxlTmFtZSBpbnN0YW5jZW9mIHF1ZXJ5XzEuUXVlcnkpIHtcbiAgICAgICAgICAgICAgICBxdWVyeSA9IHRhYmxlTmFtZTtcbiAgICAgICAgICAgICAgICB0YWJsZU5hbWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlcyA9IHRoaXMuYWRhcHRvci5yZW1vdmUodGhpcywga2V5RmllbGQsIHZhbHVlLCB0YWJsZU5hbWUsIHF1ZXJ5KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2Uub2ZmbGluZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb0FqYXhSZXF1ZXN0KHJlcyk7XG4gICAgICAgIH07XG4gICAgICAgIERhdGFNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoa2V5RmllbGQsIHZhbHVlLCB0YWJsZU5hbWUsIHF1ZXJ5KSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHV0aWxfMS5EYXRhVXRpbC5wYXJzZS5yZXBsYWNlcih2YWx1ZSwgIXRoaXMuZGF0YVNvdXJjZS5vZmZsaW5lKTtcbiAgICAgICAgICAgIGlmICh0YWJsZU5hbWUgaW5zdGFuY2VvZiBxdWVyeV8xLlF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSB0YWJsZU5hbWU7XG4gICAgICAgICAgICAgICAgdGFibGVOYW1lID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLmFkYXB0b3IudXBkYXRlKHRoaXMsIGtleUZpZWxkLCB2YWx1ZSwgdGFibGVOYW1lLCBxdWVyeSk7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhU291cmNlLm9mZmxpbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9BamF4UmVxdWVzdChyZXMpO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhTWFuYWdlci5wcm90b3R5cGUuZG9BamF4UmVxdWVzdCA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSBuZXcgRGVmZXJyZWQoKTtcbiAgICAgICAgICAgIHJlcyA9IGVqMl9iYXNlXzIuZXh0ZW5kKHt9LCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgICAgICAgICB9LCByZXMpO1xuICAgICAgICAgICAgdmFyIGFqYXggPSBuZXcgZWoyX2Jhc2VfMS5BamF4KHJlcyk7XG4gICAgICAgICAgICBhamF4LmJlZm9yZVNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuYmVmb3JlU2VuZChhamF4Lmh0dHBSZXF1ZXN0LCBhamF4KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhamF4Lm9uU3VjY2VzcyA9IGZ1bmN0aW9uIChyZWNvcmQsIHJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB1dGlsXzEuRGF0YVV0aWwucGFyc2UucGFyc2VKc29uKHJlY29yZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY29yZCA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZWNvcmQgPSBfdGhpcy5hZGFwdG9yLnByb2Nlc3NSZXNwb25zZSh1dGlsXzEuRGF0YVV0aWwucGFyc2UucGFyc2VKc29uKHJlY29yZCksIF90aGlzLCBudWxsLCByZXF1ZXN0Lmh0dHBSZXF1ZXN0LCByZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKF90aGlzLCBbeyByZWNvcmQ6IHJlY29yZCwgZGF0YU1hbmFnZXI6IF90aGlzIH1dKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhamF4Lm9uRmFpbHVyZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVqZWN0KFt7IGVycm9yOiBlIH1dKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhamF4LnNlbmQoKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRGF0YU1hbmFnZXI7XG4gICAgfSgpKTtcbiAgICBleHBvcnRzLkRhdGFNYW5hZ2VyID0gRGF0YU1hbmFnZXI7XG4gICAgdmFyIERlZmVycmVkID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRGVmZXJyZWQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIF90aGlzLnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy50aGVuID0gdGhpcy5wcm9taXNlLnRoZW4uYmluZCh0aGlzLnByb21pc2UpO1xuICAgICAgICAgICAgdGhpcy5jYXRjaCA9IHRoaXMucHJvbWlzZS5jYXRjaC5iaW5kKHRoaXMucHJvbWlzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIERlZmVycmVkO1xuICAgIH0oKSk7XG4gICAgZXhwb3J0cy5EZWZlcnJlZCA9IERlZmVycmVkO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAc3luY2Z1c2lvbi9lajItYmFzZVwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcIkBzeW5jZnVzaW9uL2VqMi1iYXNlXCIsIFwiLi9tYW5hZ2VyXCIsIFwiLi9xdWVyeVwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIGVqMl9iYXNlXzEsIG1hbmFnZXJfMSwgcXVlcnlfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICB2YXIgY29uc3RzID0geyBHcm91cEd1aWQ6ICd7MjcxYmJiYTAtMWVlN30nIH07XG4gICAgdmFyIERhdGFVdGlsID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRGF0YVV0aWwoKSB7XG4gICAgICAgIH1cbiAgICAgICAgRGF0YVV0aWwuZ2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGluc3QpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUuY2FsbChpbnN0IHx8IHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgRGF0YVV0aWwuZW5kc1dpdGggPSBmdW5jdGlvbiAoaW5wdXQsIHN1YnN0cikge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnNsaWNlKC1zdWJzdHIubGVuZ3RoKSA9PT0gc3Vic3RyO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhVXRpbC5zdGFydHNXaXRoID0gZnVuY3Rpb24gKGlucHV0LCBzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnNsaWNlKDAsIHN0YXJ0Lmxlbmd0aCkgPT09IHN0YXJ0O1xuICAgICAgICB9O1xuICAgICAgICBEYXRhVXRpbC5mblNvcnQgPSBmdW5jdGlvbiAob3JkZXIpIHtcbiAgICAgICAgICAgIG9yZGVyID0gb3JkZXIgPyBvcmRlci50b0xvd2VyQ2FzZSgpIDogJ2FzY2VuZGluZyc7XG4gICAgICAgICAgICBpZiAob3JkZXIgPT09ICdhc2NlbmRpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm5Bc2NlbmRpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mbkRlc2NlbmRpbmc7XG4gICAgICAgIH07XG4gICAgICAgIERhdGFVdGlsLmZuQXNjZW5kaW5nID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgIGlmICh5ID09PSBudWxsIHx8IHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geC5sb2NhbGVDb21wYXJlKHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHggPT09IG51bGwgfHwgeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geCAtIHk7XG4gICAgICAgIH07XG4gICAgICAgIERhdGFVdGlsLmZuRGVzY2VuZGluZyA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgICAgICBpZiAoeSA9PT0gbnVsbCB8fCB5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geC5sb2NhbGVDb21wYXJlKHkpICogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeCA9PT0gbnVsbCB8fCB4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geSAtIHg7XG4gICAgICAgIH07XG4gICAgICAgIERhdGFVdGlsLmV4dHJhY3RGaWVsZHMgPSBmdW5jdGlvbiAob2JqLCBmaWVsZHMpIHtcbiAgICAgICAgICAgIHZhciBuZXdPYmogPSB7fTtcbiAgICAgICAgICAgIGlmIChmaWVsZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T2JqZWN0KGZpZWxkc1swXSwgb2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmV3T2JqW2ZpZWxkc1tpXS5yZXBsYWNlKCcuJywgJ18nKV0gPSB0aGlzLmdldE9iamVjdChmaWVsZHNbaV0sIG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3T2JqO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhVXRpbC5zZWxlY3QgPSBmdW5jdGlvbiAoanNvbkFycmF5LCBmaWVsZHMpIHtcbiAgICAgICAgICAgIHZhciBuZXdEYXRhID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpzb25BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG5ld0RhdGEucHVzaCh0aGlzLmV4dHJhY3RGaWVsZHMoanNvbkFycmF5W2ldLCBmaWVsZHMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhVXRpbC5ncm91cCA9IGZ1bmN0aW9uIChqc29uQXJyYXksIGZpZWxkLCBhZ2dyZWdhdGVzLCBsZXZlbCwgZ3JvdXBEcykge1xuICAgICAgICAgICAgbGV2ZWwgPSBsZXZlbCB8fCAxO1xuICAgICAgICAgICAgdmFyIGpzb25EYXRhID0ganNvbkFycmF5O1xuICAgICAgICAgICAgdmFyIGd1aWQgPSAnR3JvdXBHdWlkJztcbiAgICAgICAgICAgIGlmIChqc29uRGF0YS5Hcm91cEd1aWQgPT09IGNvbnN0c1tndWlkXSkge1xuICAgICAgICAgICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGopIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlajJfYmFzZV8xLmlzTnVsbE9yVW5kZWZpbmVkKGdyb3VwRHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5keCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBncm91cERzLmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5rZXkgPT09IGpzb25EYXRhW2pdLmtleTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmR4ID0gZ3JvdXBEcy5pbmRleE9mKHRlbXBbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAganNvbkRhdGFbal0uaXRlbXMgPSB0aGlzXzEuZ3JvdXAoanNvbkRhdGFbal0uaXRlbXMsIGZpZWxkLCBhZ2dyZWdhdGVzLCBqc29uRGF0YS5sZXZlbCArIDEsIGdyb3VwRHNbaW5keF0uaXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAganNvbkRhdGFbal0uY291bnQgPSBncm91cERzW2luZHhdLmNvdW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAganNvbkRhdGFbal0uaXRlbXMgPSB0aGlzXzEuZ3JvdXAoanNvbkRhdGFbal0uaXRlbXMsIGZpZWxkLCBhZ2dyZWdhdGVzLCBqc29uRGF0YS5sZXZlbCArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAganNvbkRhdGFbal0uY291bnQgPSBqc29uRGF0YVtqXS5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZhciB0aGlzXzEgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwganNvbkRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgX2xvb3BfMShqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAganNvbkRhdGEuY2hpbGRMZXZlbHMgKz0gMTtcbiAgICAgICAgICAgICAgICByZXR1cm4ganNvbkRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZ3JvdXBlZCA9IHt9O1xuICAgICAgICAgICAgdmFyIGdyb3VwZWRBcnJheSA9IFtdO1xuICAgICAgICAgICAgZ3JvdXBlZEFycmF5Lkdyb3VwR3VpZCA9IGNvbnN0c1tndWlkXTtcbiAgICAgICAgICAgIGdyb3VwZWRBcnJheS5sZXZlbCA9IGxldmVsO1xuICAgICAgICAgICAgZ3JvdXBlZEFycmF5LmNoaWxkTGV2ZWxzID0gMDtcbiAgICAgICAgICAgIGdyb3VwZWRBcnJheS5yZWNvcmRzID0ganNvbkRhdGE7XG4gICAgICAgICAgICB2YXIgX2xvb3BfMiA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IHRoaXNfMi5nZXRWYWwoanNvbkRhdGEsIGksIGZpZWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoIWdyb3VwZWRbdmFsXSkge1xuICAgICAgICAgICAgICAgICAgICBncm91cGVkW3ZhbF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlczoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogZmllbGRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBlZEFycmF5LnB1c2goZ3JvdXBlZFt2YWxdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlajJfYmFzZV8xLmlzTnVsbE9yVW5kZWZpbmVkKGdyb3VwRHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcE9iaiA9IGdyb3VwRHMuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLmtleSA9PT0gZ3JvdXBlZFt2YWxdLmtleTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cGVkW3ZhbF0uY291bnQgPSB0ZW1wT2JqWzBdLmNvdW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdyb3VwZWRbdmFsXS5jb3VudCA9ICFlajJfYmFzZV8xLmlzTnVsbE9yVW5kZWZpbmVkKGdyb3VwRHMpID8gZ3JvdXBlZFt2YWxdLmNvdW50IDogZ3JvdXBlZFt2YWxdLmNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZFt2YWxdLml0ZW1zLnB1c2goanNvbkRhdGFbaV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciB0aGlzXzIgPSB0aGlzO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqc29uRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIF9sb29wXzIoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWdncmVnYXRlcyAmJiBhZ2dyZWdhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBfbG9vcF8zID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhZ2dzID0gYWdncmVnYXRlcztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhZ2dyZWdhdGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbiA9IERhdGFVdGlsLmFnZ3JlZ2F0ZXNbYWdncmVnYXRlc1tqXS50eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZWoyX2Jhc2VfMS5pc051bGxPclVuZGVmaW5lZChncm91cERzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gZ3JvdXBEcy5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUua2V5ID09PSBncm91cGVkQXJyYXlbaV0ua2V5OyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzW2FnZ3Nbal0uZmllbGQgKyAnIC0gJyArIGFnZ3Nbal0udHlwZV0gPSBmbih0ZW1wWzBdLml0ZW1zLCBhZ2dzW2pdLmZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzW2FnZ3Nbal0uZmllbGQgKyAnIC0gJyArIGFnZ3Nbal0udHlwZV0gPSBmbihncm91cGVkQXJyYXlbaV0uaXRlbXMsIGFnZ3Nbal0uZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBncm91cGVkQXJyYXlbaV0uYWdncmVnYXRlcyA9IHJlcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBlZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIF9sb29wXzMoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdyb3VwZWRBcnJheTtcbiAgICAgICAgfTtcbiAgICAgICAgRGF0YVV0aWwuYnVpbGRIaWVyYXJjaHkgPSBmdW5jdGlvbiAoZktleSwgZnJvbSwgc291cmNlLCBsb29rdXAsIHBLZXkpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgdmFyIGdycCA9IHt9O1xuICAgICAgICAgICAgdmFyIHRlbXA7XG4gICAgICAgICAgICBpZiAobG9va3VwLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGxvb2t1cCA9IGxvb2t1cC5yZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobG9va3VwLkdyb3VwR3VpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcignRGF0YU1hbmFnZXI6IERvIG5vdCBoYXZlIHN1cHBvcnQgR3JvdXBpbmcgaW4gaGllcmFyY2h5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbG9va3VwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZLZXlEYXRhID0gdGhpcy5nZXRPYmplY3QoZktleSwgbG9va3VwW2ldKTtcbiAgICAgICAgICAgICAgICB0ZW1wID0gZ3JwW2ZLZXlEYXRhXSB8fCAoZ3JwW2ZLZXlEYXRhXSA9IFtdKTtcbiAgICAgICAgICAgICAgICB0ZW1wLnB1c2gobG9va3VwW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZktleURhdGEgPSB0aGlzLmdldE9iamVjdChwS2V5IHx8IGZLZXksIHNvdXJjZVtpXSk7XG4gICAgICAgICAgICAgICAgc291cmNlW2ldW2Zyb21dID0gZ3JwW2ZLZXlEYXRhXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgRGF0YVV0aWwuZ2V0RmllbGRMaXN0ID0gZnVuY3Rpb24gKG9iaiwgZmllbGRzLCBwcmVmaXgpIHtcbiAgICAgICAgICAgIGlmIChwcmVmaXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHByZWZpeCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpZWxkcyA9PT0gdW5kZWZpbmVkIHx8IGZpZWxkcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpZWxkTGlzdChvYmosIFtdLCBwcmVmaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNvcHlPYmogPSBvYmo7XG4gICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGtleXNfMSA9IGtleXM7IF9pIDwga2V5c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wID0ga2V5c18xW19pXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvcHlPYmpbcHJvcF0gPT09ICdvYmplY3QnICYmICEoY29weU9ialtwcm9wXSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEZpZWxkTGlzdChjb3B5T2JqW3Byb3BdLCBmaWVsZHMsIHByZWZpeCArIHByb3AgKyAnLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzLnB1c2gocHJlZml4ICsgcHJvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZpZWxkcztcbiAgICAgICAgfTtcbiAgICAgICAgRGF0YVV0aWwuZ2V0T2JqZWN0ID0gZnVuY3Rpb24gKG5hbWVTcGFjZSwgZnJvbSkge1xuICAgICAgICAgICAgaWYgKCFuYW1lU3BhY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lU3BhY2UuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmcm9tW25hbWVTcGFjZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmcm9tO1xuICAgICAgICAgICAgdmFyIHNwbGl0cyA9IG5hbWVTcGFjZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtzcGxpdHNbaV1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhVXRpbC5zb3J0ID0gZnVuY3Rpb24gKGRzLCBmaWVsZCwgY29tcGFyZXIpIHtcbiAgICAgICAgICAgIGlmIChkcy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtaWRkbGUgPSBwYXJzZUludCgoZHMubGVuZ3RoIC8gMikudG9TdHJpbmcoKSwgMTApO1xuICAgICAgICAgICAgdmFyIGxlZnQgPSBkcy5zbGljZSgwLCBtaWRkbGUpO1xuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gZHMuc2xpY2UobWlkZGxlKTtcbiAgICAgICAgICAgIGxlZnQgPSB0aGlzLnNvcnQobGVmdCwgZmllbGQsIGNvbXBhcmVyKTtcbiAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5zb3J0KHJpZ2h0LCBmaWVsZCwgY29tcGFyZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVyZ2UobGVmdCwgcmlnaHQsIGZpZWxkLCBjb21wYXJlcik7XG4gICAgICAgIH07XG4gICAgICAgIERhdGFVdGlsLm1lcmdlID0gZnVuY3Rpb24gKGxlZnQsIHJpZ2h0LCBmaWVsZE5hbWUsIGNvbXBhcmVyKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICB2YXIgY3VycmVudDtcbiAgICAgICAgICAgIHdoaWxlIChsZWZ0Lmxlbmd0aCA+IDAgfHwgcmlnaHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChsZWZ0Lmxlbmd0aCA+IDAgJiYgcmlnaHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGFyZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjb21wYXJlcih0aGlzLmdldFZhbChsZWZ0LCAwLCBmaWVsZE5hbWUpLCB0aGlzLmdldFZhbChyaWdodCwgMCwgZmllbGROYW1lKSkgPD0gMCA/IGxlZnQgOiByaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBsZWZ0WzBdW2ZpZWxkTmFtZV0gPCBsZWZ0WzBdW2ZpZWxkTmFtZV0gPyBsZWZ0IDogcmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBsZWZ0Lmxlbmd0aCA+IDAgPyBsZWZ0IDogcmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGN1cnJlbnQuc2hpZnQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICBEYXRhVXRpbC5nZXRWYWwgPSBmdW5jdGlvbiAoYXJyYXksIGluZGV4LCBmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpZWxkID8gdGhpcy5nZXRPYmplY3QoZmllbGQsIGFycmF5W2luZGV4XSkgOiBhcnJheVtpbmRleF07XG4gICAgICAgIH07XG4gICAgICAgIERhdGFVdGlsLnRvTG93ZXJDYXNlID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbCA/IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gdmFsLnRvTG93ZXJDYXNlKCkgOiB2YWwudG9TdHJpbmcoKSA6ICh2YWwgPT09IDAgfHwgdmFsID09PSBmYWxzZSkgPyB2YWwudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhVXRpbC5jYWxsQWRhcHRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGFkYXB0b3IsIGZuTmFtZSwgcGFyYW0xLCBwYXJhbTIpIHtcbiAgICAgICAgICAgIGlmIChmbk5hbWUgaW4gYWRhcHRvcikge1xuICAgICAgICAgICAgICAgIHZhciByZXMgPSBhZGFwdG9yW2ZuTmFtZV0ocGFyYW0xLCBwYXJhbTIpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5mbk9wZXJhdG9ycy5pc251bGwocmVzKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbTEgPSByZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtMTtcbiAgICAgICAgfTtcbiAgICAgICAgRGF0YVV0aWwuaXNQbGFpbk9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiAoISFvYmopICYmIChvYmouY29uc3RydWN0b3IgPT09IE9iamVjdCk7XG4gICAgICAgIH07XG4gICAgICAgIERhdGFVdGlsLmlzQ29ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB4aHIgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSAnWE1MSHR0cFJlcXVlc3QnO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB4aHIgPSBuZXcgd2luZG93W3JlcXVlc3RdKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICEheGhyICYmICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhVXRpbC5nZXRHdWlkID0gZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgICAgICAgdmFyIGhleHMgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG4gICAgICAgICAgICB2YXIgcmFuZDtcbiAgICAgICAgICAgIHJldHVybiAocHJlZml4IHx8ICcnKSArICcwMDAwMDAwMC0wMDAwLTQwMDAtMDAwMC0wMDAwMDAwMDAwMDAnLnJlcGxhY2UoLzAvZywgZnVuY3Rpb24gKHZhbCwgaSkge1xuICAgICAgICAgICAgICAgIGlmICgnY3J5cHRvJyBpbiB3aW5kb3cgJiYgJ2dldFJhbmRvbVZhbHVlcycgaW4gY3J5cHRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmFuZCA9IGFyclswXSAlIDE2IHwgMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmQgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaGV4c1tpID09PSAxOSA/IHJhbmQgJiAweDMgfCAweDggOiByYW5kXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhVXRpbC5pc051bGwgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsID09PSB1bmRlZmluZWQgfHwgdmFsID09PSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhVXRpbC5nZXRJdGVtRnJvbUNvbXBhcmVyID0gZnVuY3Rpb24gKGFycmF5LCBmaWVsZCwgY29tcGFyZXIpIHtcbiAgICAgICAgICAgIHZhciBrZXlWYWw7XG4gICAgICAgICAgICB2YXIgY3VycmVudDtcbiAgICAgICAgICAgIHZhciBrZXk7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICB2YXIgY2FzdFJlcXVpcmVkID0gdHlwZW9mIERhdGFVdGlsLmdldFZhbChhcnJheSwgMCwgZmllbGQpID09PSAnc3RyaW5nJztcbiAgICAgICAgICAgIGlmIChhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZWoyX2Jhc2VfMS5pc051bGxPclVuZGVmaW5lZChrZXlWYWwpICYmIGkgPCBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5VmFsID0gRGF0YVV0aWwuZ2V0VmFsKGFycmF5LCBpLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGFycmF5W2krK107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICg7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBEYXRhVXRpbC5nZXRWYWwoYXJyYXksIGksIGZpZWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoZWoyX2Jhc2VfMS5pc051bGxPclVuZGVmaW5lZChjdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNhc3RSZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICBrZXlWYWwgPSAra2V5VmFsO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gK2N1cnJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlcihrZXlWYWwsIGN1cnJlbnQpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBrZXlWYWwgPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBhcnJheVtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRGF0YVV0aWw7XG4gICAgfSgpKTtcbiAgICBEYXRhVXRpbC5zZXJ2ZXJUaW1lem9uZU9mZnNldCA9IDA7XG4gICAgRGF0YVV0aWwudGhyb3dFcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgZS5tZXNzYWdlICsgJ1xcbicgKyBlLnN0YWNrO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEYXRhVXRpbC5hZ2dyZWdhdGVzID0ge1xuICAgICAgICBzdW06IGZ1bmN0aW9uIChkcywgZmllbGQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICAgICAgdmFyIHZhbDtcbiAgICAgICAgICAgIHZhciBjYXN0UmVxdWlyZWQgPSB0eXBlb2YgRGF0YVV0aWwuZ2V0VmFsKGRzLCAwLCBmaWVsZCkgIT09ICdudW1iZXInO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhbCA9IERhdGFVdGlsLmdldFZhbChkcywgaSwgZmllbGQpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4odmFsKSAmJiB2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhc3RSZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gK3ZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGF2ZXJhZ2U6IGZ1bmN0aW9uIChkcywgZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5hZ2dyZWdhdGVzLnN1bShkcywgZmllbGQpIC8gZHMubGVuZ3RoO1xuICAgICAgICB9LFxuICAgICAgICBtaW46IGZ1bmN0aW9uIChkcywgZmllbGQpIHtcbiAgICAgICAgICAgIHZhciBjb21wYXJlcjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb21wYXJlciA9IGZpZWxkO1xuICAgICAgICAgICAgICAgIGZpZWxkID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5nZXRPYmplY3QoZmllbGQsIERhdGFVdGlsLmdldEl0ZW1Gcm9tQ29tcGFyZXIoZHMsIGZpZWxkLCBjb21wYXJlciB8fCBEYXRhVXRpbC5mbkFzY2VuZGluZykpO1xuICAgICAgICB9LFxuICAgICAgICBtYXg6IGZ1bmN0aW9uIChkcywgZmllbGQpIHtcbiAgICAgICAgICAgIHZhciBjb21wYXJlcjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb21wYXJlciA9IGZpZWxkO1xuICAgICAgICAgICAgICAgIGZpZWxkID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5nZXRPYmplY3QoZmllbGQsIERhdGFVdGlsLmdldEl0ZW1Gcm9tQ29tcGFyZXIoZHMsIGZpZWxkLCBjb21wYXJlciB8fCBEYXRhVXRpbC5mbkRlc2NlbmRpbmcpKTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJ1ZWNvdW50OiBmdW5jdGlvbiAoZHMsIGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG1hbmFnZXJfMS5EYXRhTWFuYWdlcihkcykuZXhlY3V0ZUxvY2FsKG5ldyBxdWVyeV8xLlF1ZXJ5KCkud2hlcmUoZmllbGQsICdlcXVhbCcsIHRydWUsIHRydWUpKS5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlY291bnQ6IGZ1bmN0aW9uIChkcywgZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbWFuYWdlcl8xLkRhdGFNYW5hZ2VyKGRzKS5leGVjdXRlTG9jYWwobmV3IHF1ZXJ5XzEuUXVlcnkoKS53aGVyZShmaWVsZCwgJ2VxdWFsJywgZmFsc2UsIHRydWUpKS5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIGNvdW50OiBmdW5jdGlvbiAoZHMsIGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gZHMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEYXRhVXRpbC5vcGVyYXRvclN5bWJvbHMgPSB7XG4gICAgICAgICc8JzogJ2xlc3N0aGFuJyxcbiAgICAgICAgJz4nOiAnZ3JlYXRlcnRoYW4nLFxuICAgICAgICAnPD0nOiAnbGVzc3RoYW5vcmVxdWFsJyxcbiAgICAgICAgJz49JzogJ2dyZWF0ZXJ0aGFub3JlcXVhbCcsXG4gICAgICAgICc9PSc6ICdlcXVhbCcsXG4gICAgICAgICchPSc6ICdub3RlcXVhbCcsXG4gICAgICAgICcqPSc6ICdjb250YWlucycsXG4gICAgICAgICckPSc6ICdlbmRzd2l0aCcsXG4gICAgICAgICdePSc6ICdzdGFydHN3aXRoJ1xuICAgIH07XG4gICAgRGF0YVV0aWwub2RCaU9wZXJhdG9yID0ge1xuICAgICAgICAnPCc6ICcgbHQgJyxcbiAgICAgICAgJz4nOiAnIGd0ICcsXG4gICAgICAgICc8PSc6ICcgbGUgJyxcbiAgICAgICAgJz49JzogJyBnZSAnLFxuICAgICAgICAnPT0nOiAnIGVxICcsXG4gICAgICAgICchPSc6ICcgbmUgJyxcbiAgICAgICAgJ2xlc3N0aGFuJzogJyBsdCAnLFxuICAgICAgICAnbGVzc3RoYW5vcmVxdWFsJzogJyBsZSAnLFxuICAgICAgICAnZ3JlYXRlcnRoYW4nOiAnIGd0ICcsXG4gICAgICAgICdncmVhdGVydGhhbm9yZXF1YWwnOiAnIGdlICcsXG4gICAgICAgICdlcXVhbCc6ICcgZXEgJyxcbiAgICAgICAgJ25vdGVxdWFsJzogJyBuZSAnXG4gICAgfTtcbiAgICBEYXRhVXRpbC5vZFVuaU9wZXJhdG9yID0ge1xuICAgICAgICAnJD0nOiAnZW5kc3dpdGgnLFxuICAgICAgICAnXj0nOiAnc3RhcnRzd2l0aCcsXG4gICAgICAgICcqPSc6ICdzdWJzdHJpbmdvZicsXG4gICAgICAgICdlbmRzd2l0aCc6ICdlbmRzd2l0aCcsXG4gICAgICAgICdzdGFydHN3aXRoJzogJ3N0YXJ0c3dpdGgnLFxuICAgICAgICAnY29udGFpbnMnOiAnc3Vic3RyaW5nb2YnXG4gICAgfTtcbiAgICBEYXRhVXRpbC5vZHY0VW5pT3BlcmF0b3IgPSB7XG4gICAgICAgICckPSc6ICdlbmRzd2l0aCcsXG4gICAgICAgICdePSc6ICdzdGFydHN3aXRoJyxcbiAgICAgICAgJyo9JzogJ2NvbnRhaW5zJyxcbiAgICAgICAgJ2VuZHN3aXRoJzogJ2VuZHN3aXRoJyxcbiAgICAgICAgJ3N0YXJ0c3dpdGgnOiAnc3RhcnRzd2l0aCcsXG4gICAgICAgICdjb250YWlucyc6ICdjb250YWlucydcbiAgICB9O1xuICAgIERhdGFVdGlsLmZuT3BlcmF0b3JzID0ge1xuICAgICAgICBlcXVhbDogZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIGlnbm9yZUNhc2UpIHtcbiAgICAgICAgICAgIGlmIChpZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFVdGlsLnRvTG93ZXJDYXNlKGFjdHVhbCkgPT09IERhdGFVdGlsLnRvTG93ZXJDYXNlKGV4cGVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY3R1YWwgPT09IGV4cGVjdGVkO1xuICAgICAgICB9LFxuICAgICAgICBub3RlcXVhbDogZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIGlnbm9yZUNhc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAhRGF0YVV0aWwuZm5PcGVyYXRvcnMuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgaWdub3JlQ2FzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxlc3N0aGFuOiBmdW5jdGlvbiAoYWN0dWFsLCBleHBlY3RlZCwgaWdub3JlQ2FzZSkge1xuICAgICAgICAgICAgaWYgKGlnbm9yZUNhc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0YVV0aWwudG9Mb3dlckNhc2UoYWN0dWFsKSA8IERhdGFVdGlsLnRvTG93ZXJDYXNlKGV4cGVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY3R1YWwgPCBleHBlY3RlZDtcbiAgICAgICAgfSxcbiAgICAgICAgZ3JlYXRlcnRoYW46IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBpZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICBpZiAoaWdub3JlQ2FzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC50b0xvd2VyQ2FzZShhY3R1YWwpID4gRGF0YVV0aWwudG9Mb3dlckNhc2UoZXhwZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjdHVhbCA+IGV4cGVjdGVkO1xuICAgICAgICB9LFxuICAgICAgICBsZXNzdGhhbm9yZXF1YWw6IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBpZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICBpZiAoaWdub3JlQ2FzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC50b0xvd2VyQ2FzZShhY3R1YWwpIDw9IERhdGFVdGlsLnRvTG93ZXJDYXNlKGV4cGVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY3R1YWwgPD0gZXhwZWN0ZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGdyZWF0ZXJ0aGFub3JlcXVhbDogZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIGlnbm9yZUNhc2UpIHtcbiAgICAgICAgICAgIGlmIChpZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFVdGlsLnRvTG93ZXJDYXNlKGFjdHVhbCkgPj0gRGF0YVV0aWwudG9Mb3dlckNhc2UoZXhwZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjdHVhbCA+PSBleHBlY3RlZDtcbiAgICAgICAgfSxcbiAgICAgICAgY29udGFpbnM6IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBpZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICBpZiAoaWdub3JlQ2FzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhZWoyX2Jhc2VfMS5pc051bGxPclVuZGVmaW5lZChhY3R1YWwpICYmICFlajJfYmFzZV8xLmlzTnVsbE9yVW5kZWZpbmVkKGV4cGVjdGVkKSAmJlxuICAgICAgICAgICAgICAgICAgICBEYXRhVXRpbC50b0xvd2VyQ2FzZShhY3R1YWwpLmluZGV4T2YoRGF0YVV0aWwudG9Mb3dlckNhc2UoZXhwZWN0ZWQpKSAhPT0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gIWVqMl9iYXNlXzEuaXNOdWxsT3JVbmRlZmluZWQoYWN0dWFsKSAmJiAhZWoyX2Jhc2VfMS5pc051bGxPclVuZGVmaW5lZChleHBlY3RlZCkgJiZcbiAgICAgICAgICAgICAgICBhY3R1YWwudG9TdHJpbmcoKS5pbmRleE9mKGV4cGVjdGVkKSAhPT0gLTE7XG4gICAgICAgIH0sXG4gICAgICAgIG5vdG51bGw6IGZ1bmN0aW9uIChhY3R1YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBhY3R1YWwgIT09IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGlzbnVsbDogZnVuY3Rpb24gKGFjdHVhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGFjdHVhbCA9PT0gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnRzd2l0aDogZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIGlnbm9yZUNhc2UpIHtcbiAgICAgICAgICAgIGlmIChpZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdHVhbCAmJiBleHBlY3RlZCAmJiBEYXRhVXRpbC5zdGFydHNXaXRoKGFjdHVhbC50b0xvd2VyQ2FzZSgpLCBleHBlY3RlZC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY3R1YWwgJiYgZXhwZWN0ZWQgJiYgRGF0YVV0aWwuc3RhcnRzV2l0aChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5kc3dpdGg6IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBpZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICBpZiAoaWdub3JlQ2FzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3R1YWwgJiYgZXhwZWN0ZWQgJiYgRGF0YVV0aWwuZW5kc1dpdGgoYWN0dWFsLnRvTG93ZXJDYXNlKCksIGV4cGVjdGVkLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjdHVhbCAmJiBleHBlY3RlZCAmJiBEYXRhVXRpbC5lbmRzV2l0aChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJvY2Vzc1N5bWJvbHM6IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICAgICAgdmFyIGZuTmFtZSA9IERhdGFVdGlsLm9wZXJhdG9yU3ltYm9sc1tvcGVyYXRvcl07XG4gICAgICAgICAgICBpZiAoZm5OYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZuID0gRGF0YVV0aWwuZm5PcGVyYXRvcnNbZm5OYW1lXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRGF0YVV0aWwudGhyb3dFcnJvcignUXVlcnkgLSBQcm9jZXNzIE9wZXJhdG9yIDogSW52YWxpZCBvcGVyYXRvcicpO1xuICAgICAgICB9LFxuICAgICAgICBwcm9jZXNzT3BlcmF0b3I6IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICAgICAgdmFyIGZuID0gRGF0YVV0aWwuZm5PcGVyYXRvcnNbb3BlcmF0b3JdO1xuICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIERhdGFVdGlsLmZuT3BlcmF0b3JzLnByb2Nlc3NTeW1ib2xzKG9wZXJhdG9yKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGF0YVV0aWwucGFyc2UgPSB7XG4gICAgICAgIHBhcnNlSnNvbjogZnVuY3Rpb24gKGpzb25UZXh0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGpzb25UZXh0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGpzb25UZXh0ID0gSlNPTi5wYXJzZShqc29uVGV4dCwgRGF0YVV0aWwucGFyc2UuanNvblJldml2ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoanNvblRleHQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIERhdGFVdGlsLnBhcnNlLml0ZXJhdGVBbmRSZXZpdmVBcnJheShqc29uVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YganNvblRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgRGF0YVV0aWwucGFyc2UuaXRlcmF0ZUFuZFJldml2ZUpzb24oanNvblRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGpzb25UZXh0O1xuICAgICAgICB9LFxuICAgICAgICBpdGVyYXRlQW5kUmV2aXZlQXJyYXk6IGZ1bmN0aW9uIChhcnJheSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJyYXlbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIERhdGFVdGlsLnBhcnNlLml0ZXJhdGVBbmRSZXZpdmVKc29uKGFycmF5W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGFycmF5W2ldID09PSAnc3RyaW5nJyAmJiAhL15bXFxzXSpcXFt8XltcXHNdKlxce3xcXFwiL2cudGVzdChhcnJheVtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlbaV0gPSBEYXRhVXRpbC5wYXJzZS5qc29uUmV2aXZlcignJywgYXJyYXlbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlbaV0gPSBEYXRhVXRpbC5wYXJzZS5wYXJzZUpzb24oYXJyYXlbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXRlcmF0ZUFuZFJldml2ZUpzb246IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGpzb24pO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBrZXlzXzIgPSBrZXlzOyBfaSA8IGtleXNfMi5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGtleXNfMltfaV07XG4gICAgICAgICAgICAgICAgaWYgKERhdGFVdGlsLnN0YXJ0c1dpdGgocHJvcCwgJ19fJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhbHVlID0ganNvbltwcm9wXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRGF0YVV0aWwucGFyc2UuaXRlcmF0ZUFuZFJldml2ZUFycmF5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRGF0YVV0aWwucGFyc2UuaXRlcmF0ZUFuZFJldml2ZUpzb24odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBqc29uW3Byb3BdID0gRGF0YVV0aWwucGFyc2UuanNvblJldml2ZXIoanNvbltwcm9wXSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAganNvblJldml2ZXI6IGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBkdXBWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB2YXIgbXMgPSAvXlxcL0RhdGVcXCgoWystXT9bMC05XSspKFsrLV1bMC05XXs0fSk/XFwpXFwvJC8uZXhlYyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5wYXJzZS5qc29uUmVwbGFjZXIoeyB2YWx1ZTogbmV3IERhdGUocGFyc2VJbnQobXNbMV0sIDEwKSkgfSwgZmFsc2UpLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgvXihcXGR7NH1cXC1cXGRcXGRcXC1cXGRcXGQoW3RUXVtcXGQ6XFwuXSopezF9KShbelpdfChbK1xcLV0pKFxcZFxcZCk6PyhcXGRcXGQpKT8kLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyID0gZHVwVmFsdWUuc3BsaXQoL1teMC05XS8pO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IERhdGFVdGlsLnBhcnNlLmpzb25SZXBsYWNlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbmV3IERhdGUocGFyc2VJbnQoYXJyWzBdLCAxMCksIHBhcnNlSW50KGFyclsxXSwgMTApIC0gMSwgcGFyc2VJbnQoYXJyWzJdLCAxMCksIHBhcnNlSW50KGFyclszXSwgMTApLCBwYXJzZUludChhcnJbNF0sIDEwKSwgcGFyc2VJbnQoYXJyWzVdLCAxMCkpXG4gICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlKS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGlzSnNvbjogZnVuY3Rpb24gKGpzb25EYXRhKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGpzb25EYXRhWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBqc29uRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5wYXJzZS5wYXJzZUpzb24oanNvbkRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBpc0d1aWQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlZ2V4ID0gL1tBLUZhLWYwLTldezh9KD86LVtBLUZhLWYwLTldezR9KXszfS1bQS1GYS1mMC05XXsxMn0vaTtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IHJlZ2V4LmV4ZWModmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoICE9IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIHJlcGxhY2VyOiBmdW5jdGlvbiAodmFsdWUsIHN0cmluZ2lmeSkge1xuICAgICAgICAgICAgaWYgKERhdGFVdGlsLmlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFVdGlsLnBhcnNlLmpzb25SZXBsYWNlcih2YWx1ZSwgc3RyaW5naWZ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFVdGlsLnBhcnNlLmFycmF5UmVwbGFjZXIodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5wYXJzZS5qc29uUmVwbGFjZXIoeyB2YWw6IHZhbHVlIH0sIHN0cmluZ2lmeSkudmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBqc29uUmVwbGFjZXI6IGZ1bmN0aW9uICh2YWwsIHN0cmluZ2lmeSkge1xuICAgICAgICAgICAgaWYgKHN0cmluZ2lmeSA9PT0gdm9pZCAwKSB7IHN0cmluZ2lmeSA9IHRydWU7IH1cbiAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsKTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwga2V5c18zID0ga2V5czsgX2kgPCBrZXlzXzMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBrZXlzXzNbX2ldO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsW3Byb3BdO1xuICAgICAgICAgICAgICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIHVuaXhzdGFtcCA9ICtkIC0gKGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKTtcbiAgICAgICAgICAgICAgICB2YWxbcHJvcF0gPSBuZXcgRGF0ZSh1bml4c3RhbXAgLSAoRGF0YVV0aWwuc2VydmVyVGltZXpvbmVPZmZzZXQgKiAzNjAwMDAwKSk7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZ2lmeSkge1xuICAgICAgICAgICAgICAgICAgICB2YWxbcHJvcF0gPSB2YWxbcHJvcF0udG9KU09OKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgYXJyYXlSZXBsYWNlcjogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoRGF0YVV0aWwuaXNQbGFpbk9iamVjdCh2YWxbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbFtpXSA9IERhdGFVdGlsLnBhcnNlLmpzb25SZXBsYWNlcih2YWxbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWxbaV0gaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbFtpXSA9IERhdGFVdGlsLnBhcnNlLmpzb25SZXBsYWNlcih7IGRhdGU6IHZhbFtpXSB9KS5kYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV4cG9ydHMuRGF0YVV0aWwgPSBEYXRhVXRpbDtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuL3V0aWxcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCB1dGlsXzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgdmFyIFF1ZXJ5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUXVlcnkoZnJvbSkge1xuICAgICAgICAgICAgdGhpcy5zdWJRdWVyeSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmlzQ2hpbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucXVlcmllcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5rZXkgPSAnJztcbiAgICAgICAgICAgIHRoaXMuZktleSA9ICcnO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmcm9tID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJvbVRhYmxlID0gZnJvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGZyb20gJiYgZnJvbSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb29rdXBzID0gZnJvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXhwYW5kcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zb3J0ZWRDb2x1bW5zID0gW107XG4gICAgICAgICAgICB0aGlzLmdyb3VwZWRDb2x1bW5zID0gW107XG4gICAgICAgICAgICB0aGlzLnN1YlF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuaXNDaGlsZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIFF1ZXJ5LnByb3RvdHlwZS5zZXRLZXkgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgIHRoaXMua2V5ID0gZmllbGQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgUXVlcnkucHJvdG90eXBlLnVzaW5nID0gZnVuY3Rpb24gKGRhdGFNYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFNYW5hZ2VyID0gZGF0YU1hbmFnZXI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgUXVlcnkucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbiAoZGF0YU1hbmFnZXIsIGRvbmUsIGZhaWwsIGFsd2F5cykge1xuICAgICAgICAgICAgZGF0YU1hbmFnZXIgPSBkYXRhTWFuYWdlciB8fCB0aGlzLmRhdGFNYW5hZ2VyO1xuICAgICAgICAgICAgaWYgKGRhdGFNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFNYW5hZ2VyLmV4ZWN1dGVRdWVyeSh0aGlzLCBkb25lLCBmYWlsLCBhbHdheXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHV0aWxfMS5EYXRhVXRpbC50aHJvd0Vycm9yKCdRdWVyeSAtIGV4ZWN1dGUoKSA6IGRhdGFNYW5hZ2VyIG5lZWRzIHRvIGJlIGlzIHNldCB1c2luZyBcInVzaW5nXCIgZnVuY3Rpb24gb3Igc2hvdWxkIGJlIHBhc3NlZCBhcyBhcmd1bWVudCcpO1xuICAgICAgICB9O1xuICAgICAgICBRdWVyeS5wcm90b3R5cGUuZXhlY3V0ZUxvY2FsID0gZnVuY3Rpb24gKGRhdGFNYW5hZ2VyKSB7XG4gICAgICAgICAgICBkYXRhTWFuYWdlciA9IGRhdGFNYW5hZ2VyIHx8IHRoaXMuZGF0YU1hbmFnZXI7XG4gICAgICAgICAgICBpZiAoZGF0YU1hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YU1hbmFnZXIuZXhlY3V0ZUxvY2FsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHV0aWxfMS5EYXRhVXRpbC50aHJvd0Vycm9yKCdRdWVyeSAtIGV4ZWN1dGVMb2NhbCgpIDogZGF0YU1hbmFnZXIgbmVlZHMgdG8gYmUgaXMgc2V0IHVzaW5nIFwidXNpbmdcIiBmdW5jdGlvbiBvciBzaG91bGQgYmUgcGFzc2VkIGFzIGFyZ3VtZW50Jyk7XG4gICAgICAgIH07XG4gICAgICAgIFF1ZXJ5LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjbG9uZWQgPSBuZXcgUXVlcnkoKTtcbiAgICAgICAgICAgIGNsb25lZC5xdWVyaWVzID0gdGhpcy5xdWVyaWVzLnNsaWNlKDApO1xuICAgICAgICAgICAgY2xvbmVkLmtleSA9IHRoaXMua2V5O1xuICAgICAgICAgICAgY2xvbmVkLmlzQ2hpbGQgPSB0aGlzLmlzQ2hpbGQ7XG4gICAgICAgICAgICBjbG9uZWQuZGF0YU1hbmFnZXIgPSB0aGlzLmRhdGFNYW5hZ2VyO1xuICAgICAgICAgICAgY2xvbmVkLmZyb21UYWJsZSA9IHRoaXMuZnJvbVRhYmxlO1xuICAgICAgICAgICAgY2xvbmVkLnBhcmFtcyA9IHRoaXMucGFyYW1zLnNsaWNlKDApO1xuICAgICAgICAgICAgY2xvbmVkLmV4cGFuZHMgPSB0aGlzLmV4cGFuZHMuc2xpY2UoMCk7XG4gICAgICAgICAgICBjbG9uZWQuc29ydGVkQ29sdW1ucyA9IHRoaXMuc29ydGVkQ29sdW1ucy5zbGljZSgwKTtcbiAgICAgICAgICAgIGNsb25lZC5ncm91cGVkQ29sdW1ucyA9IHRoaXMuZ3JvdXBlZENvbHVtbnMuc2xpY2UoMCk7XG4gICAgICAgICAgICBjbG9uZWQuc3ViUXVlcnlTZWxlY3RvciA9IHRoaXMuc3ViUXVlcnlTZWxlY3RvcjtcbiAgICAgICAgICAgIGNsb25lZC5zdWJRdWVyeSA9IHRoaXMuc3ViUXVlcnk7XG4gICAgICAgICAgICBjbG9uZWQuZktleSA9IHRoaXMuZktleTtcbiAgICAgICAgICAgIGNsb25lZC5yZXF1aXJlc0NvdW50cyA9IHRoaXMucmVxdWlyZXNDb3VudHM7XG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkO1xuICAgICAgICB9O1xuICAgICAgICBRdWVyeS5wcm90b3R5cGUuZnJvbSA9IGZ1bmN0aW9uICh0YWJsZU5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZnJvbVRhYmxlID0gdGFibGVOYW1lO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFF1ZXJ5LnByb3RvdHlwZS5hZGRQYXJhbXMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLnB1c2goeyBrZXk6IGtleSwgZm46IHZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMucHVzaCh7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgUXVlcnkucHJvdG90eXBlLmV4cGFuZCA9IGZ1bmN0aW9uICh0YWJsZXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFibGVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kcyA9IFtdLnNsaWNlLmNhbGwoW3RhYmxlc10sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRzID0gdGFibGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFF1ZXJ5LnByb3RvdHlwZS53aGVyZSA9IGZ1bmN0aW9uIChmaWVsZE5hbWUsIG9wZXJhdG9yLCB2YWx1ZSwgaWdub3JlQ2FzZSkge1xuICAgICAgICAgICAgb3BlcmF0b3IgPSBvcGVyYXRvciA/IChvcGVyYXRvcikudG9Mb3dlckNhc2UoKSA6IG51bGw7XG4gICAgICAgICAgICB2YXIgcHJlZGljYXRlID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGROYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHByZWRpY2F0ZSA9IG5ldyBQcmVkaWNhdGUoZmllbGROYW1lLCBvcGVyYXRvciwgdmFsdWUsIGlnbm9yZUNhc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZmllbGROYW1lIGluc3RhbmNlb2YgUHJlZGljYXRlKSB7XG4gICAgICAgICAgICAgICAgcHJlZGljYXRlID0gZmllbGROYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5xdWVyaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGZuOiAnb25XaGVyZScsXG4gICAgICAgICAgICAgICAgZTogcHJlZGljYXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBRdWVyeS5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKHNlYXJjaEtleSwgZmllbGROYW1lcywgb3BlcmF0b3IsIGlnbm9yZUNhc2UpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGROYW1lcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzID0gW2ZpZWxkTmFtZXNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3BlcmF0b3IgPSBvcGVyYXRvciB8fCAnY29udGFpbnMnO1xuICAgICAgICAgICAgdmFyIGNvbXBhcmVyID0gdXRpbF8xLkRhdGFVdGlsLmZuT3BlcmF0b3JzW29wZXJhdG9yXTtcbiAgICAgICAgICAgIHRoaXMucXVlcmllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBmbjogJ29uU2VhcmNoJyxcbiAgICAgICAgICAgICAgICBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZXM6IGZpZWxkTmFtZXMsXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yOiBvcGVyYXRvcixcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoS2V5OiBzZWFyY2hLZXksXG4gICAgICAgICAgICAgICAgICAgIGlnbm9yZUNhc2U6IGlnbm9yZUNhc2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmVyOiBjb21wYXJlclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFF1ZXJ5LnByb3RvdHlwZS5zb3J0QnkgPSBmdW5jdGlvbiAoZmllbGROYW1lLCBjb21wYXJlciwgaXNGcm9tR3JvdXApIHtcbiAgICAgICAgICAgIHZhciBvcmRlciA9ICdhc2NlbmRpbmcnO1xuICAgICAgICAgICAgdmFyIHNvcnRzO1xuICAgICAgICAgICAgdmFyIHRlbXA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkTmFtZSA9PT0gJ3N0cmluZycgJiYgdXRpbF8xLkRhdGFVdGlsLmVuZHNXaXRoKGZpZWxkTmFtZS50b0xvd2VyQ2FzZSgpLCAnIGRlc2MnKSkge1xuICAgICAgICAgICAgICAgIGZpZWxkTmFtZSA9IGZpZWxkTmFtZS5yZXBsYWNlKC8gZGVzYyQvaSwgJycpO1xuICAgICAgICAgICAgICAgIGNvbXBhcmVyID0gJ2Rlc2NlbmRpbmcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjb21wYXJlciB8fCB0eXBlb2YgY29tcGFyZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgb3JkZXIgPSBjb21wYXJlciA/IGNvbXBhcmVyLnRvTG93ZXJDYXNlKCkgOiAnYXNjZW5kaW5nJztcbiAgICAgICAgICAgICAgICBjb21wYXJlciA9IHV0aWxfMS5EYXRhVXRpbC5mblNvcnQoY29tcGFyZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRnJvbUdyb3VwKSB7XG4gICAgICAgICAgICAgICAgc29ydHMgPSBRdWVyeS5maWx0ZXJRdWVyaWVzKHRoaXMucXVlcmllcywgJ29uU29ydEJ5Jyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3J0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gc29ydHNbaV0uZS5maWVsZE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGVtcCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wID09PSBmaWVsZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0ZW1wIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGVtcC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wW2pdID09PSBmaWVsZE5hbWUgfHwgZmllbGROYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRlbXBbal0gKyAnIGRlc2MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucXVlcmllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBmbjogJ29uU29ydEJ5JyxcbiAgICAgICAgICAgICAgICBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZTogZmllbGROYW1lLFxuICAgICAgICAgICAgICAgICAgICBjb21wYXJlcjogY29tcGFyZXIsXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogb3JkZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBRdWVyeS5wcm90b3R5cGUuc29ydEJ5RGVzYyA9IGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNvcnRCeShmaWVsZE5hbWUsICdkZXNjZW5kaW5nJyk7XG4gICAgICAgIH07XG4gICAgICAgIFF1ZXJ5LnByb3RvdHlwZS5ncm91cCA9IGZ1bmN0aW9uIChmaWVsZE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydEJ5KGZpZWxkTmFtZSwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgZm46ICdvbkdyb3VwJyxcbiAgICAgICAgICAgICAgICBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZTogZmllbGROYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgUXVlcnkucHJvdG90eXBlLnBhZ2UgPSBmdW5jdGlvbiAocGFnZUluZGV4LCBwYWdlU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5xdWVyaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGZuOiAnb25QYWdlJyxcbiAgICAgICAgICAgICAgICBlOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VJbmRleDogcGFnZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBRdWVyeS5wcm90b3R5cGUucmFuZ2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgdGhpcy5xdWVyaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGZuOiAnb25SYW5nZScsXG4gICAgICAgICAgICAgICAgZToge1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGVuZDogZW5kXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgUXVlcnkucHJvdG90eXBlLnRha2UgPSBmdW5jdGlvbiAobm9zKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgZm46ICdvblRha2UnLFxuICAgICAgICAgICAgICAgIGU6IHtcbiAgICAgICAgICAgICAgICAgICAgbm9zOiBub3NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBRdWVyeS5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIChub3MpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcmllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBmbjogJ29uU2tpcCcsXG4gICAgICAgICAgICAgICAgZTogeyBub3M6IG5vcyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBRdWVyeS5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKGZpZWxkTmFtZXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGROYW1lcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzID0gW10uc2xpY2UuY2FsbChbZmllbGROYW1lc10sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5xdWVyaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGZuOiAnb25TZWxlY3QnLFxuICAgICAgICAgICAgICAgIGU6IHsgZmllbGROYW1lczogZmllbGROYW1lcyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBRdWVyeS5wcm90b3R5cGUuaGllcmFyY2h5ID0gZnVuY3Rpb24gKHF1ZXJ5LCBzZWxlY3RvckZuKSB7XG4gICAgICAgICAgICB0aGlzLnN1YlF1ZXJ5U2VsZWN0b3IgPSBzZWxlY3RvckZuO1xuICAgICAgICAgICAgdGhpcy5zdWJRdWVyeSA9IHF1ZXJ5O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFF1ZXJ5LnByb3RvdHlwZS5mb3JlaWduS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdGhpcy5mS2V5ID0ga2V5O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFF1ZXJ5LnByb3RvdHlwZS5yZXF1aXJlc0NvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yZXF1aXJlc0NvdW50cyA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgUXVlcnkucHJvdG90eXBlLmFnZ3JlZ2F0ZSA9IGZ1bmN0aW9uICh0eXBlLCBmaWVsZCkge1xuICAgICAgICAgICAgdGhpcy5xdWVyaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGZuOiAnb25BZ2dyZWdhdGVzJyxcbiAgICAgICAgICAgICAgICBlOiB7IGZpZWxkOiBmaWVsZCwgdHlwZTogdHlwZSB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBRdWVyeS5maWx0ZXJRdWVyaWVzID0gZnVuY3Rpb24gKHF1ZXJpZXMsIG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWVyaWVzLmZpbHRlcihmdW5jdGlvbiAocSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBxLmZuID09PSBuYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFF1ZXJ5LmZpbHRlclF1ZXJ5TGlzdHMgPSBmdW5jdGlvbiAocXVlcmllcywgc2luZ2xlcykge1xuICAgICAgICAgICAgdmFyIGZpbHRlcmVkID0gcXVlcmllcy5maWx0ZXIoZnVuY3Rpb24gKHEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2luZ2xlcy5pbmRleE9mKHEuZm4pICE9PSAtMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHJlcyA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghcmVzW2ZpbHRlcmVkW2ldLmZuXSkge1xuICAgICAgICAgICAgICAgICAgICByZXNbZmlsdGVyZWRbaV0uZm5dID0gZmlsdGVyZWRbaV0uZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUXVlcnk7XG4gICAgfSgpKTtcbiAgICBleHBvcnRzLlF1ZXJ5ID0gUXVlcnk7XG4gICAgdmFyIFByZWRpY2F0ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFByZWRpY2F0ZShmaWVsZCwgb3BlcmF0b3IsIHZhbHVlLCBpZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICBpZiAoaWdub3JlQ2FzZSA9PT0gdm9pZCAwKSB7IGlnbm9yZUNhc2UgPSBmYWxzZTsgfVxuICAgICAgICAgICAgdGhpcy5pc0NvbXBsZXggPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkO1xuICAgICAgICAgICAgICAgIHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlnbm9yZUNhc2UgPSBpZ25vcmVDYXNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNDb21wbGV4ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wYXJlciA9IHV0aWxfMS5EYXRhVXRpbC5mbk9wZXJhdG9ycy5wcm9jZXNzT3BlcmF0b3IodGhpcy5vcGVyYXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChmaWVsZCBpbnN0YW5jZW9mIFByZWRpY2F0ZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIFByZWRpY2F0ZSB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NvbXBsZXggPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uID0gb3BlcmF0b3IudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZWRpY2F0ZXMgPSBbZmllbGRdO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIFtdLnB1c2guYXBwbHkodGhpcy5wcmVkaWNhdGVzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZWRpY2F0ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgUHJlZGljYXRlLmFuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcmVkaWNhdGUuY29tYmluZVByZWRpY2F0ZXMoW10uc2xpY2UuY2FsbChhcmdzLCAwKSwgJ2FuZCcpO1xuICAgICAgICB9O1xuICAgICAgICBQcmVkaWNhdGUucHJvdG90eXBlLmFuZCA9IGZ1bmN0aW9uIChmaWVsZCwgb3BlcmF0b3IsIHZhbHVlLCBpZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJlZGljYXRlLmNvbWJpbmUodGhpcywgZmllbGQsIG9wZXJhdG9yLCB2YWx1ZSwgJ2FuZCcsIGlnbm9yZUNhc2UpO1xuICAgICAgICB9O1xuICAgICAgICBQcmVkaWNhdGUub3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJlZGljYXRlLmNvbWJpbmVQcmVkaWNhdGVzKFtdLnNsaWNlLmNhbGwoYXJncywgMCksICdvcicpO1xuICAgICAgICB9O1xuICAgICAgICBQcmVkaWNhdGUucHJvdG90eXBlLm9yID0gZnVuY3Rpb24gKGZpZWxkLCBvcGVyYXRvciwgdmFsdWUsIGlnbm9yZUNhc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcmVkaWNhdGUuY29tYmluZSh0aGlzLCBmaWVsZCwgb3BlcmF0b3IsIHZhbHVlLCAnb3InLCBpZ25vcmVDYXNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgUHJlZGljYXRlLmZyb21Kc29uID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgICAgIGlmIChqc29uIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGpzb24ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2godGhpcy5mcm9tSlNPTkRhdGEoanNvbltpXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByZWQgPSBqc29uO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJvbUpTT05EYXRhKHByZWQpO1xuICAgICAgICB9O1xuICAgICAgICBQcmVkaWNhdGUucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgICAgICAgdmFyIHByZWRpY2F0ZSA9IHRoaXMucHJlZGljYXRlcyA/IHRoaXMucHJlZGljYXRlcyA6IFtdO1xuICAgICAgICAgICAgdmFyIGlzQW5kO1xuICAgICAgICAgICAgdmFyIHJldDtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbXBsZXggJiYgdGhpcy5jb21wYXJlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVyLmNhbGwodGhpcywgdXRpbF8xLkRhdGFVdGlsLmdldE9iamVjdCh0aGlzLmZpZWxkLCByZWNvcmQpLCB0aGlzLnZhbHVlLCB0aGlzLmlnbm9yZUNhc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNBbmQgPSB0aGlzLmNvbmRpdGlvbiA9PT0gJ2FuZCc7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWRpY2F0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJldCA9IHByZWRpY2F0ZVtpXS52YWxpZGF0ZShyZWNvcmQpO1xuICAgICAgICAgICAgICAgIGlmIChpc0FuZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpc0FuZDtcbiAgICAgICAgfTtcbiAgICAgICAgUHJlZGljYXRlLnByb3RvdHlwZS50b0pzb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcHJlZGljYXRlcztcbiAgICAgICAgICAgIHZhciBwO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDb21wbGV4KSB7XG4gICAgICAgICAgICAgICAgcHJlZGljYXRlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHAgPSB0aGlzLnByZWRpY2F0ZXM7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZXMucHVzaChwW2ldLnRvSnNvbigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlzQ29tcGxleDogdGhpcy5pc0NvbXBsZXgsXG4gICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMuZmllbGQsXG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgaWdub3JlQ2FzZTogdGhpcy5pZ25vcmVDYXNlLFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdGhpcy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgcHJlZGljYXRlczogcHJlZGljYXRlc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgUHJlZGljYXRlLmNvbWJpbmVQcmVkaWNhdGVzID0gZnVuY3Rpb24gKHByZWRpY2F0ZXMsIG9wZXJhdG9yKSB7XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIShwcmVkaWNhdGVzWzBdIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmVkaWNhdGVzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmVkaWNhdGVzID0gcHJlZGljYXRlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJlZGljYXRlKHByZWRpY2F0ZXNbMF0sIG9wZXJhdG9yLCBwcmVkaWNhdGVzLnNsaWNlKDEpKTtcbiAgICAgICAgfTtcbiAgICAgICAgUHJlZGljYXRlLmNvbWJpbmUgPSBmdW5jdGlvbiAocHJlZCwgZmllbGQsIG9wZXJhdG9yLCB2YWx1ZSwgY29uZGl0aW9uLCBpZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICBpZiAoZmllbGQgaW5zdGFuY2VvZiBQcmVkaWNhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJlZGljYXRlW2NvbmRpdGlvbl0ocHJlZCwgZmllbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJlZGljYXRlW2NvbmRpdGlvbl0ocHJlZCwgbmV3IFByZWRpY2F0ZShmaWVsZCwgb3BlcmF0b3IsIHZhbHVlLCBpZ25vcmVDYXNlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXRpbF8xLkRhdGFVdGlsLnRocm93RXJyb3IoJ1ByZWRpY2F0ZSAtICcgKyBjb25kaXRpb24gKyAnIDogaW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfTtcbiAgICAgICAgUHJlZGljYXRlLmZyb21KU09ORGF0YSA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgICAgICB2YXIgcHJlZHMgPSBqc29uLnByZWRpY2F0ZXMgfHwgW107XG4gICAgICAgICAgICB2YXIgbGVuID0gcHJlZHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHByZWRpY2F0ZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcHJlZGljYXRlcy5wdXNoKHRoaXMuZnJvbUpTT05EYXRhKHByZWRzW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWpzb24uaXNDb21wbGV4KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFByZWRpY2F0ZShqc29uLmZpZWxkLCBqc29uLm9wZXJhdG9yLCBqc29uLnZhbHVlLCBqc29uLmlnbm9yZUNhc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFByZWRpY2F0ZShwcmVkaWNhdGVzWzBdLCBqc29uLmNvbmRpdGlvbiwgcHJlZGljYXRlcy5zbGljZSgxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUHJlZGljYXRlO1xuICAgIH0oKSk7XG4gICAgZXhwb3J0cy5QcmVkaWNhdGUgPSBQcmVkaWNhdGU7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3F1ZXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiQHN5bmNmdXNpb24vZWoyLWJhc2VcIiwgXCIuL3V0aWxcIiwgXCIuL3F1ZXJ5XCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgZWoyX2Jhc2VfMSwgdXRpbF8xLCBxdWVyeV8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIHZhciBBZGFwdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gQWRhcHRvcihkcykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGZyb206ICd0YWJsZScsXG4gICAgICAgICAgICAgICAgcmVxdWVzdFR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzb3J0Qnk6ICdzb3J0ZWQnLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogJ3NlbGVjdCcsXG4gICAgICAgICAgICAgICAgc2tpcDogJ3NraXAnLFxuICAgICAgICAgICAgICAgIGdyb3VwOiAnZ3JvdXAnLFxuICAgICAgICAgICAgICAgIHRha2U6ICd0YWtlJyxcbiAgICAgICAgICAgICAgICBzZWFyY2g6ICdzZWFyY2gnLFxuICAgICAgICAgICAgICAgIGNvdW50OiAncmVxdWlyZXNDb3VudHMnLFxuICAgICAgICAgICAgICAgIHdoZXJlOiAnd2hlcmUnLFxuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZXM6ICdhZ2dyZWdhdGVzJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IEFkYXB0b3I7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBkcztcbiAgICAgICAgICAgIHRoaXMucHZ0ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgQWRhcHRvci5wcm90b3R5cGUucHJvY2Vzc1Jlc3BvbnNlID0gZnVuY3Rpb24gKGRhdGEsIGRzLCBxdWVyeSwgeGhyKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEFkYXB0b3I7XG4gICAgfSgpKTtcbiAgICBleHBvcnRzLkFkYXB0b3IgPSBBZGFwdG9yO1xuICAgIHZhciBKc29uQWRhcHRvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhKc29uQWRhcHRvciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gSnNvbkFkYXB0b3IoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgSnNvbkFkYXB0b3IucHJvdG90eXBlLnByb2Nlc3NRdWVyeSA9IGZ1bmN0aW9uIChkYXRhTWFuYWdlciwgcXVlcnkpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBkYXRhTWFuYWdlci5kYXRhU291cmNlLmpzb24uc2xpY2UoMCk7XG4gICAgICAgICAgICB2YXIgY291bnQgPSByZXN1bHQubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvdW50RmxnID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciByZXQ7XG4gICAgICAgICAgICB2YXIga2V5O1xuICAgICAgICAgICAgdmFyIGFnZyA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVyeS5xdWVyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gcXVlcnkucXVlcmllc1tpXTtcbiAgICAgICAgICAgICAgICByZXQgPSB0aGlzW2tleS5mbl0uY2FsbCh0aGlzLCByZXN1bHQsIGtleS5lLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgaWYgKGtleS5mbiA9PT0gJ29uQWdncmVnYXRlcycpIHtcbiAgICAgICAgICAgICAgICAgICAgYWdnW2tleS5lLmZpZWxkICsgJyAtICcgKyBrZXkuZS50eXBlXSA9IHJldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJldCAhPT0gdW5kZWZpbmVkID8gcmV0IDogcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoa2V5LmZuID09PSAnb25QYWdlJyB8fCBrZXkuZm4gPT09ICdvblNraXAnIHx8IGtleS5mbiA9PT0gJ29uVGFrZScgfHwga2V5LmZuID09PSAnb25SYW5nZScpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRGbGcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50RmxnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gcmVzdWx0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocXVlcnkucmVxdWlyZXNDb3VudHMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBjb3VudDogY291bnQsXG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZXM6IGFnZ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICBKc29uQWRhcHRvci5wcm90b3R5cGUuYmF0Y2hSZXF1ZXN0ID0gZnVuY3Rpb24gKGRtLCBjaGFuZ2VzLCBlKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGFuZ2VzLmFkZGVkUmVjb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGRtLCBjaGFuZ2VzLmFkZGVkUmVjb3Jkc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hhbmdlcy5jaGFuZ2VkUmVjb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKGRtLCBlLmtleSwgY2hhbmdlcy5jaGFuZ2VkUmVjb3Jkc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hhbmdlcy5kZWxldGVkUmVjb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGRtLCBlLmtleSwgY2hhbmdlcy5kZWxldGVkUmVjb3Jkc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2hhbmdlcztcbiAgICAgICAgfTtcbiAgICAgICAgSnNvbkFkYXB0b3IucHJvdG90eXBlLm9uV2hlcmUgPSBmdW5jdGlvbiAoZHMsIGUpIHtcbiAgICAgICAgICAgIGlmICghZHMgfHwgIWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkcy5maWx0ZXIoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLnZhbGlkYXRlKG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIEpzb25BZGFwdG9yLnByb3RvdHlwZS5vbkFnZ3JlZ2F0ZXMgPSBmdW5jdGlvbiAoZHMsIGUpIHtcbiAgICAgICAgICAgIHZhciBmbiA9IHV0aWxfMS5EYXRhVXRpbC5hZ2dyZWdhdGVzW2UudHlwZV07XG4gICAgICAgICAgICBpZiAoIWRzIHx8ICFmbiB8fCBkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmbihkcywgZS5maWVsZCk7XG4gICAgICAgIH07XG4gICAgICAgIEpzb25BZGFwdG9yLnByb3RvdHlwZS5vblNlYXJjaCA9IGZ1bmN0aW9uIChkcywgZSkge1xuICAgICAgICAgICAgaWYgKCFkcyB8fCAhZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGUuZmllbGROYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB1dGlsXzEuRGF0YVV0aWwuZ2V0RmllbGRMaXN0KGRzWzBdLCBlLmZpZWxkTmFtZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRzLmZpbHRlcihmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBlLmZpZWxkTmFtZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuY29tcGFyZXIuY2FsbChvYmosIHV0aWxfMS5EYXRhVXRpbC5nZXRPYmplY3QoZS5maWVsZE5hbWVzW2pdLCBvYmopLCBlLnNlYXJjaEtleSwgZS5pZ25vcmVDYXNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIEpzb25BZGFwdG9yLnByb3RvdHlwZS5vblNvcnRCeSA9IGZ1bmN0aW9uIChkcywgZSwgcXVlcnkpIHtcbiAgICAgICAgICAgIGlmICghZHMgfHwgIWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBmbkNvbXBhcmU7XG4gICAgICAgICAgICB2YXIgZmllbGQgPSB1dGlsXzEuRGF0YVV0aWwuZ2V0VmFsdWUoZS5maWVsZE5hbWUsIHF1ZXJ5KTtcbiAgICAgICAgICAgIGlmICghZmllbGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZHMuc29ydChlLmNvbXBhcmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWVsZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgZmllbGQgPSBmaWVsZC5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gZmllbGQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWVsZFtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm5Db21wYXJlID0gZS5jb21wYXJlcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxfMS5EYXRhVXRpbC5lbmRzV2l0aChmaWVsZFtpXSwgJyBkZXNjJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuQ29tcGFyZSA9IHV0aWxfMS5EYXRhVXRpbC5mblNvcnQoJ2Rlc2NlbmRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkW2ldID0gZmllbGRbaV0ucmVwbGFjZSgnIGRlc2MnLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZHMgPSB1dGlsXzEuRGF0YVV0aWwuc29ydChkcywgZmllbGRbaV0sIGZuQ29tcGFyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1dGlsXzEuRGF0YVV0aWwuc29ydChkcywgZmllbGQsIGUuY29tcGFyZXIpO1xuICAgICAgICB9O1xuICAgICAgICBKc29uQWRhcHRvci5wcm90b3R5cGUub25Hcm91cCA9IGZ1bmN0aW9uIChkcywgZSwgcXVlcnkpIHtcbiAgICAgICAgICAgIGlmICghZHMgfHwgIWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBhZ2dRdWVyeSA9IHF1ZXJ5XzEuUXVlcnkuZmlsdGVyUXVlcmllcyhxdWVyeS5xdWVyaWVzLCAnb25BZ2dyZWdhdGVzJyk7XG4gICAgICAgICAgICB2YXIgYWdnID0gW107XG4gICAgICAgICAgICBpZiAoYWdnUXVlcnkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRtcCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZ1F1ZXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IGFnZ1F1ZXJ5W2ldLmU7XG4gICAgICAgICAgICAgICAgICAgIGFnZy5wdXNoKHsgdHlwZTogdG1wLnR5cGUsIGZpZWxkOiB1dGlsXzEuRGF0YVV0aWwuZ2V0VmFsdWUodG1wLmZpZWxkLCBxdWVyeSkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHV0aWxfMS5EYXRhVXRpbC5ncm91cChkcywgdXRpbF8xLkRhdGFVdGlsLmdldFZhbHVlKGUuZmllbGROYW1lLCBxdWVyeSksIGFnZyk7XG4gICAgICAgIH07XG4gICAgICAgIEpzb25BZGFwdG9yLnByb3RvdHlwZS5vblBhZ2UgPSBmdW5jdGlvbiAoZHMsIGUsIHF1ZXJ5KSB7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHV0aWxfMS5EYXRhVXRpbC5nZXRWYWx1ZShlLnBhZ2VTaXplLCBxdWVyeSk7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSAodXRpbF8xLkRhdGFVdGlsLmdldFZhbHVlKGUucGFnZUluZGV4LCBxdWVyeSkgLSAxKSAqIHNpemU7XG4gICAgICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBzaXplO1xuICAgICAgICAgICAgaWYgKCFkcyB8fCAhZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRzLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgICB9O1xuICAgICAgICBKc29uQWRhcHRvci5wcm90b3R5cGUub25SYW5nZSA9IGZ1bmN0aW9uIChkcywgZSkge1xuICAgICAgICAgICAgaWYgKCFkcyB8fCAhZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRzLnNsaWNlKHV0aWxfMS5EYXRhVXRpbC5nZXRWYWx1ZShlLnN0YXJ0KSwgdXRpbF8xLkRhdGFVdGlsLmdldFZhbHVlKGUuZW5kKSk7XG4gICAgICAgIH07XG4gICAgICAgIEpzb25BZGFwdG9yLnByb3RvdHlwZS5vblRha2UgPSBmdW5jdGlvbiAoZHMsIGUpIHtcbiAgICAgICAgICAgIGlmICghZHMgfHwgIWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkcy5zbGljZSgwLCB1dGlsXzEuRGF0YVV0aWwuZ2V0VmFsdWUoZS5ub3MpKTtcbiAgICAgICAgfTtcbiAgICAgICAgSnNvbkFkYXB0b3IucHJvdG90eXBlLm9uU2tpcCA9IGZ1bmN0aW9uIChkcywgZSkge1xuICAgICAgICAgICAgaWYgKCFkcyB8fCAhZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRzLnNsaWNlKHV0aWxfMS5EYXRhVXRpbC5nZXRWYWx1ZShlLm5vcykpO1xuICAgICAgICB9O1xuICAgICAgICBKc29uQWRhcHRvci5wcm90b3R5cGUub25TZWxlY3QgPSBmdW5jdGlvbiAoZHMsIGUpIHtcbiAgICAgICAgICAgIGlmICghZHMgfHwgIWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1dGlsXzEuRGF0YVV0aWwuc2VsZWN0KGRzLCB1dGlsXzEuRGF0YVV0aWwuZ2V0VmFsdWUoZS5maWVsZE5hbWVzKSk7XG4gICAgICAgIH07XG4gICAgICAgIEpzb25BZGFwdG9yLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoZG0sIGRhdGEsIHRhYmxlTmFtZSwgcXVlcnksIHBvc2l0aW9uKSB7XG4gICAgICAgICAgICBpZiAoZWoyX2Jhc2VfMS5pc051bGxPclVuZGVmaW5lZChwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG0uZGF0YVNvdXJjZS5qc29uLnB1c2goZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG0uZGF0YVNvdXJjZS5qc29uLnNwbGljZShwb3NpdGlvbiwgMCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEpzb25BZGFwdG9yLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZG0sIGtleUZpZWxkLCB2YWx1ZSwgdGFibGVOYW1lKSB7XG4gICAgICAgICAgICB2YXIgZHMgPSBkbS5kYXRhU291cmNlLmpzb247XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtrZXlGaWVsZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZHNbaV1ba2V5RmllbGRdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaSAhPT0gZHMubGVuZ3RoID8gZHMuc3BsaWNlKGksIDEpIDogbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgSnNvbkFkYXB0b3IucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkbSwga2V5RmllbGQsIHZhbHVlLCB0YWJsZU5hbWUpIHtcbiAgICAgICAgICAgIHZhciBkcyA9IGRtLmRhdGFTb3VyY2UuanNvbjtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgdmFyIGtleSA9IHZhbHVlW2tleUZpZWxkXTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChkc1tpXVtrZXlGaWVsZF0gPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaSA8IGRzLmxlbmd0aCA/IGVqMl9iYXNlXzEubWVyZ2UoZHNbaV0sIHZhbHVlKSA6IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBKc29uQWRhcHRvcjtcbiAgICB9KEFkYXB0b3IpKTtcbiAgICBleHBvcnRzLkpzb25BZGFwdG9yID0gSnNvbkFkYXB0b3I7XG4gICAgdmFyIFVybEFkYXB0b3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoVXJsQWRhcHRvciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gVXJsQWRhcHRvcigpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICBVcmxBZGFwdG9yLnByb3RvdHlwZS5wcm9jZXNzUXVlcnkgPSBmdW5jdGlvbiAoZG0sIHF1ZXJ5LCBoaWVyYXJjaHlGaWx0ZXJzKSB7XG4gICAgICAgICAgICB2YXIgcXVlcmllcyA9IHRoaXMuZ2V0UXVlcnlSZXF1ZXN0KHF1ZXJ5KTtcbiAgICAgICAgICAgIHZhciBzaW5nbGVzID0gcXVlcnlfMS5RdWVyeS5maWx0ZXJRdWVyeUxpc3RzKHF1ZXJ5LnF1ZXJpZXMsIFsnb25TZWxlY3QnLCAnb25QYWdlJywgJ29uU2tpcCcsICdvblRha2UnLCAnb25SYW5nZSddKTtcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBxdWVyeS5wYXJhbXM7XG4gICAgICAgICAgICB2YXIgdXJsID0gZG0uZGF0YVNvdXJjZS51cmw7XG4gICAgICAgICAgICB2YXIgdGVtcDtcbiAgICAgICAgICAgIHZhciBza2lwO1xuICAgICAgICAgICAgdmFyIHRha2UgPSBudWxsO1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IHsgc29ydHM6IFtdLCBncm91cHM6IFtdLCBmaWx0ZXJzOiBbXSwgc2VhcmNoZXM6IFtdLCBhZ2dyZWdhdGVzOiBbXSB9O1xuICAgICAgICAgICAgaWYgKCdvblBhZ2UnIGluIHNpbmdsZXMpIHtcbiAgICAgICAgICAgICAgICB0ZW1wID0gc2luZ2xlcy5vblBhZ2U7XG4gICAgICAgICAgICAgICAgc2tpcCA9IHV0aWxfMS5EYXRhVXRpbC5nZXRWYWx1ZSh0ZW1wLnBhZ2VJbmRleCwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIHRha2UgPSB1dGlsXzEuRGF0YVV0aWwuZ2V0VmFsdWUodGVtcC5wYWdlU2l6ZSwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIHNraXAgPSAoc2tpcCAtIDEpICogdGFrZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCdvblJhbmdlJyBpbiBzaW5nbGVzKSB7XG4gICAgICAgICAgICAgICAgdGVtcCA9IHNpbmdsZXMub25SYW5nZTtcbiAgICAgICAgICAgICAgICBza2lwID0gdGVtcC5zdGFydDtcbiAgICAgICAgICAgICAgICB0YWtlID0gdGVtcC5lbmQgLSB0ZW1wLnN0YXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVyaWVzLnNvcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGVtcCA9IHV0aWxfMS5EYXRhVXRpbC5nZXRWYWx1ZShxdWVyaWVzLnNvcnRzW2ldLmUuZmllbGROYW1lLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zb3J0cy5wdXNoKHV0aWxfMS5EYXRhVXRpbC5jYWxsQWRhcHRvckZ1bmN0aW9uKHRoaXMsICdvbkVhY2hTb3J0JywgeyBuYW1lOiB0ZW1wLCBkaXJlY3Rpb246IHF1ZXJpZXMuc29ydHNbaV0uZS5kaXJlY3Rpb24gfSwgcXVlcnkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoaWVyYXJjaHlGaWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgdGVtcCA9IHRoaXMuZ2V0RmlsdGVyc0Zyb20oaGllcmFyY2h5RmlsdGVycywgcXVlcnkpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuZmlsdGVycy5wdXNoKHV0aWxfMS5EYXRhVXRpbC5jYWxsQWRhcHRvckZ1bmN0aW9uKHRoaXMsICdvbkVhY2hXaGVyZScsIHRlbXAudG9Kc29uKCksIHF1ZXJ5KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVyaWVzLmZpbHRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmZpbHRlcnMucHVzaCh1dGlsXzEuRGF0YVV0aWwuY2FsbEFkYXB0b3JGdW5jdGlvbih0aGlzLCAnb25FYWNoV2hlcmUnLCBxdWVyaWVzLmZpbHRlcnNbaV0uZS50b0pzb24oKSwgcXVlcnkpKTtcbiAgICAgICAgICAgICAgICB2YXIga2V5c18xID0gdHlwZW9mIHJlcXVlc3QuZmlsdGVyc1tpXSA9PT0gJ29iamVjdCcgPyBPYmplY3Qua2V5cyhyZXF1ZXN0LmZpbHRlcnNbaV0pIDogW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBrZXlzXzIgPSBrZXlzXzE7IF9pIDwga2V5c18yLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGtleXNfMltfaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlsXzEuRGF0YVV0aWwuaXNOdWxsKChyZXF1ZXN0KVtwcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0W3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVyaWVzLnNlYXJjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGVtcCA9IHF1ZXJpZXMuc2VhcmNoZXNbaV0uZTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNlYXJjaGVzLnB1c2godXRpbF8xLkRhdGFVdGlsLmNhbGxBZGFwdG9yRnVuY3Rpb24odGhpcywgJ29uRWFjaFNlYXJjaCcsIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiB0ZW1wLmZpZWxkTmFtZXMsXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yOiB0ZW1wLm9wZXJhdG9yLFxuICAgICAgICAgICAgICAgICAgICBrZXk6IHRlbXAuc2VhcmNoS2V5LFxuICAgICAgICAgICAgICAgICAgICBpZ25vcmVDYXNlOiB0ZW1wLmlnbm9yZUNhc2VcbiAgICAgICAgICAgICAgICB9LCBxdWVyeSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVyaWVzLmdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuZ3JvdXBzLnB1c2godXRpbF8xLkRhdGFVdGlsLmdldFZhbHVlKHF1ZXJpZXMuZ3JvdXBzW2ldLmUuZmllbGROYW1lLCBxdWVyeSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVyaWVzLmFnZ3JlZ2F0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0ZW1wID0gcXVlcmllcy5hZ2dyZWdhdGVzW2ldLmU7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5hZ2dyZWdhdGVzLnB1c2goeyB0eXBlOiB0ZW1wLnR5cGUsIGZpZWxkOiB1dGlsXzEuRGF0YVV0aWwuZ2V0VmFsdWUodGVtcC5maWVsZCwgcXVlcnkpIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlcSA9IHt9O1xuICAgICAgICAgICAgdGhpcy5nZXRSZXF1ZXN0UXVlcnkob3B0aW9ucywgcXVlcnksIHNpbmdsZXMsIHJlcXVlc3QsIHJlcSk7XG4gICAgICAgICAgICB1dGlsXzEuRGF0YVV0aWwuY2FsbEFkYXB0b3JGdW5jdGlvbih0aGlzLCAnYWRkUGFyYW1zJywgeyBkbTogZG0sIHF1ZXJ5OiBxdWVyeSwgcGFyYW1zOiBwYXJhbXMsIHJlcVBhcmFtczogcmVxIH0pO1xuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZXEpO1xuICAgICAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBrZXlzXzMgPSBrZXlzOyBfYSA8IGtleXNfMy5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGtleXNfM1tfYV07XG4gICAgICAgICAgICAgICAgaWYgKHV0aWxfMS5EYXRhVXRpbC5pc051bGwocmVxW3Byb3BdKSB8fCByZXFbcHJvcF0gPT09ICcnIHx8IHJlcVtwcm9wXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlcVtwcm9wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShvcHRpb25zLnNraXAgaW4gcmVxICYmIG9wdGlvbnMudGFrZSBpbiByZXEpICYmIHRha2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXFbb3B0aW9ucy5za2lwXSA9IHV0aWxfMS5EYXRhVXRpbC5jYWxsQWRhcHRvckZ1bmN0aW9uKHRoaXMsICdvblNraXAnLCBza2lwLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgcmVxW29wdGlvbnMudGFrZV0gPSB1dGlsXzEuRGF0YVV0aWwuY2FsbEFkYXB0b3JGdW5jdGlvbih0aGlzLCAnb25UYWtlJywgdGFrZSwgcXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHAgPSB0aGlzLnB2dDtcbiAgICAgICAgICAgIHRoaXMucHZ0ID0ge307XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlcXVlc3RUeXBlID09PSAnanNvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShyZXEpLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgcHZ0RGF0YTogcCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXAgPSB0aGlzLmNvbnZlcnRUb1F1ZXJ5U3RyaW5nKHJlcSwgcXVlcnksIGRtKTtcbiAgICAgICAgICAgIHRlbXAgPSAoZG0uZGF0YVNvdXJjZS51cmwuaW5kZXhPZignPycpICE9PSAtMSA/ICcmJyA6ICcvJykgKyB0ZW1wO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJywgdXJsOiB0ZW1wLmxlbmd0aCA/IHVybC5yZXBsYWNlKC9cXC8qJC8sIHRlbXApIDogdXJsLCBwdnREYXRhOiBwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBVcmxBZGFwdG9yLnByb3RvdHlwZS5nZXRSZXF1ZXN0UXVlcnkgPSBmdW5jdGlvbiAob3B0aW9ucywgcXVlcnksIHNpbmdsZXMsIHJlcXVlc3QsIHJlcXVlc3QxKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW0gPSAncGFyYW0nO1xuICAgICAgICAgICAgdmFyIHJlcSA9IHJlcXVlc3QxO1xuICAgICAgICAgICAgcmVxW29wdGlvbnMuZnJvbV0gPSBxdWVyeS5mcm9tVGFibGU7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5leHBhbmQpIHtcbiAgICAgICAgICAgICAgICByZXFbb3B0aW9ucy5leHBhbmRdID0gcXVlcnkuZXhwYW5kcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcVtvcHRpb25zLnNlbGVjdF0gPSAnb25TZWxlY3QnIGluIHNpbmdsZXMgP1xuICAgICAgICAgICAgICAgIHV0aWxfMS5EYXRhVXRpbC5jYWxsQWRhcHRvckZ1bmN0aW9uKHRoaXMsICdvblNlbGVjdCcsIHV0aWxfMS5EYXRhVXRpbC5nZXRWYWx1ZShzaW5nbGVzLm9uU2VsZWN0LmZpZWxkTmFtZXMsIHF1ZXJ5KSwgcXVlcnkpIDogJyc7XG4gICAgICAgICAgICByZXFbb3B0aW9ucy5jb3VudF0gPSBxdWVyeS5yZXF1aXJlc0NvdW50cyA/IHV0aWxfMS5EYXRhVXRpbC5jYWxsQWRhcHRvckZ1bmN0aW9uKHRoaXMsICdvbkNvdW50JywgcXVlcnkucmVxdWlyZXNDb3VudHMsIHF1ZXJ5KSA6ICcnO1xuICAgICAgICAgICAgcmVxW29wdGlvbnMuc2VhcmNoXSA9IHJlcXVlc3Quc2VhcmNoZXMubGVuZ3RoID8gdXRpbF8xLkRhdGFVdGlsLmNhbGxBZGFwdG9yRnVuY3Rpb24odGhpcywgJ29uU2VhcmNoJywgcmVxdWVzdC5zZWFyY2hlcywgcXVlcnkpIDogJyc7XG4gICAgICAgICAgICByZXFbb3B0aW9ucy5za2lwXSA9ICdvblNraXAnIGluIHNpbmdsZXMgP1xuICAgICAgICAgICAgICAgIHV0aWxfMS5EYXRhVXRpbC5jYWxsQWRhcHRvckZ1bmN0aW9uKHRoaXMsICdvblNraXAnLCB1dGlsXzEuRGF0YVV0aWwuZ2V0VmFsdWUoc2luZ2xlcy5vblNraXAubm9zLCBxdWVyeSksIHF1ZXJ5KSA6ICcnO1xuICAgICAgICAgICAgcmVxW29wdGlvbnMudGFrZV0gPSAnb25UYWtlJyBpbiBzaW5nbGVzID9cbiAgICAgICAgICAgICAgICB1dGlsXzEuRGF0YVV0aWwuY2FsbEFkYXB0b3JGdW5jdGlvbih0aGlzLCAnb25UYWtlJywgdXRpbF8xLkRhdGFVdGlsLmdldFZhbHVlKHNpbmdsZXMub25UYWtlLm5vcywgcXVlcnkpLCBxdWVyeSkgOiAnJztcbiAgICAgICAgICAgIHJlcVtvcHRpb25zLndoZXJlXSA9IHJlcXVlc3QuZmlsdGVycy5sZW5ndGggfHwgcmVxdWVzdC5zZWFyY2hlcy5sZW5ndGggP1xuICAgICAgICAgICAgICAgIHV0aWxfMS5EYXRhVXRpbC5jYWxsQWRhcHRvckZ1bmN0aW9uKHRoaXMsICdvbldoZXJlJywgcmVxdWVzdC5maWx0ZXJzLCBxdWVyeSkgOiAnJztcbiAgICAgICAgICAgIHJlcVtvcHRpb25zLnNvcnRCeV0gPSByZXF1ZXN0LnNvcnRzLmxlbmd0aCA/IHV0aWxfMS5EYXRhVXRpbC5jYWxsQWRhcHRvckZ1bmN0aW9uKHRoaXMsICdvblNvcnRCeScsIHJlcXVlc3Quc29ydHMsIHF1ZXJ5KSA6ICcnO1xuICAgICAgICAgICAgcmVxW29wdGlvbnMuZ3JvdXBdID0gcmVxdWVzdC5ncm91cHMubGVuZ3RoID8gdXRpbF8xLkRhdGFVdGlsLmNhbGxBZGFwdG9yRnVuY3Rpb24odGhpcywgJ29uR3JvdXAnLCByZXF1ZXN0Lmdyb3VwcywgcXVlcnkpIDogJyc7XG4gICAgICAgICAgICByZXFbb3B0aW9ucy5hZ2dyZWdhdGVzXSA9IHJlcXVlc3QuYWdncmVnYXRlcy5sZW5ndGggP1xuICAgICAgICAgICAgICAgIHV0aWxfMS5EYXRhVXRpbC5jYWxsQWRhcHRvckZ1bmN0aW9uKHRoaXMsICdvbkFnZ3JlZ2F0ZXMnLCByZXF1ZXN0LmFnZ3JlZ2F0ZXMsIHF1ZXJ5KSA6ICcnO1xuICAgICAgICAgICAgcmVxW3BhcmFtXSA9IFtdO1xuICAgICAgICB9O1xuICAgICAgICBVcmxBZGFwdG9yLnByb3RvdHlwZS5jb252ZXJ0VG9RdWVyeVN0cmluZyA9IGZ1bmN0aW9uIChyZXF1ZXN0LCBxdWVyeSwgZG0pIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfTtcbiAgICAgICAgVXJsQWRhcHRvci5wcm90b3R5cGUucHJvY2Vzc1Jlc3BvbnNlID0gZnVuY3Rpb24gKGRhdGEsIGRzLCBxdWVyeSwgeGhyLCByZXF1ZXN0LCBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdHMgPSByZXF1ZXN0O1xuICAgICAgICAgICAgdmFyIHB2dCA9IHJlcXVlc3RzLnB2dERhdGEgfHwge307XG4gICAgICAgICAgICB2YXIgZ3JvdXBEcyA9IGRhdGEuZ3JvdXBEcztcbiAgICAgICAgICAgIGlmICh4aHIgJiYgeGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKSAmJlxuICAgICAgICAgICAgICAgIHhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJykuaW5kZXhPZigneG1sJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChxdWVyeS5yZXF1aXJlc0NvdW50cyA/IHsgcmVzdWx0OiBbXSwgY291bnQ6IDAgfSA6IFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkID0gSlNPTi5wYXJzZShyZXF1ZXN0cy5kYXRhKTtcbiAgICAgICAgICAgIGlmIChkICYmIGQuYWN0aW9uID09PSAnYmF0Y2gnICYmIGRhdGEuYWRkZWRSZWNvcmRzKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5hZGRlZFJlY29yZHMgPSBkYXRhLmFkZGVkUmVjb3JkcztcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hhbmdlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmQpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFyZ3MgPSB7fTtcbiAgICAgICAgICAgIGlmICgnY291bnQnIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBhcmdzLmNvdW50ID0gZGF0YS5jb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFyZ3MucmVzdWx0ID0gZGF0YS5yZXN1bHQgPyBkYXRhLnJlc3VsdCA6IGRhdGE7XG4gICAgICAgICAgICB0aGlzLmdldEFnZ3JlZ2F0ZVJlc3VsdChwdnQsIGRhdGEsIGFyZ3MsIGdyb3VwRHMpO1xuICAgICAgICAgICAgcmV0dXJuIHV0aWxfMS5EYXRhVXRpbC5pc051bGwoYXJncy5jb3VudCkgPyBhcmdzLnJlc3VsdCA6IHsgcmVzdWx0OiBhcmdzLnJlc3VsdCwgY291bnQ6IGFyZ3MuY291bnQsIGFnZ3JlZ2F0ZXM6IGFyZ3MuYWdncmVnYXRlcyB9O1xuICAgICAgICB9O1xuICAgICAgICBVcmxBZGFwdG9yLnByb3RvdHlwZS5vbkdyb3VwID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMucHZ0Lmdyb3VwcyA9IGU7XG4gICAgICAgIH07XG4gICAgICAgIFVybEFkYXB0b3IucHJvdG90eXBlLm9uQWdncmVnYXRlcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB0aGlzLnB2dC5hZ2dyZWdhdGVzID0gZTtcbiAgICAgICAgfTtcbiAgICAgICAgVXJsQWRhcHRvci5wcm90b3R5cGUuYmF0Y2hSZXF1ZXN0ID0gZnVuY3Rpb24gKGRtLCBjaGFuZ2VzLCBlKSB7XG4gICAgICAgICAgICB2YXIgdXJsO1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogZG0uZGF0YVNvdXJjZS5iYXRjaFVybCB8fCBkbS5kYXRhU291cmNlLmNydWRVcmwgfHwgZG0uZGF0YVNvdXJjZS5yZW1vdmVVcmwgfHwgZG0uZGF0YVNvdXJjZS51cmwsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZDogY2hhbmdlcy5jaGFuZ2VkUmVjb3JkcyxcbiAgICAgICAgICAgICAgICAgICAgYWRkZWQ6IGNoYW5nZXMuYWRkZWRSZWNvcmRzLFxuICAgICAgICAgICAgICAgICAgICBkZWxldGVkOiBjaGFuZ2VzLmRlbGV0ZWRSZWNvcmRzLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdiYXRjaCcsXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBlW3VybF0sXG4gICAgICAgICAgICAgICAgICAgIGtleTogZVtrZXldXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIFVybEFkYXB0b3IucHJvdG90eXBlLmJlZm9yZVNlbmQgPSBmdW5jdGlvbiAoZG0sIHJlcXVlc3QpIHtcbiAgICAgICAgfTtcbiAgICAgICAgVXJsQWRhcHRvci5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKGRtLCBkYXRhLCB0YWJsZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdXJsOiBkbS5kYXRhU291cmNlLmluc2VydFVybCB8fCBkbS5kYXRhU291cmNlLmNydWRVcmwgfHwgZG0uZGF0YVNvdXJjZS51cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgdGFibGU6IHRhYmxlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnaW5zZXJ0J1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBVcmxBZGFwdG9yLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZG0sIGtleUZpZWxkLCB2YWx1ZSwgdGFibGVOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6IGRtLmRhdGFTb3VyY2UucmVtb3ZlVXJsIHx8IGRtLmRhdGFTb3VyY2UuY3J1ZFVybCB8fCBkbS5kYXRhU291cmNlLnVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGtleUNvbHVtbjoga2V5RmllbGQsXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiB0YWJsZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ3JlbW92ZSdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgVXJsQWRhcHRvci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRtLCBrZXlGaWVsZCwgdmFsdWUsIHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiBkbS5kYXRhU291cmNlLnVwZGF0ZVVybCB8fCBkbS5kYXRhU291cmNlLmNydWRVcmwgfHwgZG0uZGF0YVNvdXJjZS51cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIGtleUNvbHVtbjoga2V5RmllbGQsXG4gICAgICAgICAgICAgICAgICAgIGtleTogdmFsdWVba2V5RmllbGRdLFxuICAgICAgICAgICAgICAgICAgICB0YWJsZTogdGFibGVOYW1lXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIFVybEFkYXB0b3IucHJvdG90eXBlLmdldEZpbHRlcnNGcm9tID0gZnVuY3Rpb24gKGRhdGEsIHF1ZXJ5KSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcXVlcnkuZktleTtcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgIHZhciBwcm9wID0ga2V5O1xuICAgICAgICAgICAgdmFyIHBLZXkgPSBxdWVyeS5rZXk7XG4gICAgICAgICAgICB2YXIgcHJlZGljYXRzID0gW107XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbMF0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgcHJvcCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdXRpbF8xLkRhdGFVdGlsLmdldE9iamVjdChwS2V5IHx8IHByb3AsIGRhdGFbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmVkaWNhdHMucHVzaChuZXcgcXVlcnlfMS5QcmVkaWNhdGUoa2V5LCAnZXF1YWwnLCB2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5XzEuUHJlZGljYXRlLm9yKHByZWRpY2F0cyk7XG4gICAgICAgIH07XG4gICAgICAgIFVybEFkYXB0b3IucHJvdG90eXBlLmdldEFnZ3JlZ2F0ZVJlc3VsdCA9IGZ1bmN0aW9uIChwdnQsIGRhdGEsIGFyZ3MsIGdyb3VwRHMpIHtcbiAgICAgICAgICAgIHZhciBwRGF0YSA9IGRhdGE7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHBEYXRhID0gZGF0YS5yZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHZ0ICYmIHB2dC5hZ2dyZWdhdGVzICYmIHB2dC5hZ2dyZWdhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBhZ2cgPSBwdnQuYWdncmVnYXRlcztcbiAgICAgICAgICAgICAgICB2YXIgZm4gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdmFyIGFnZ3JlZ2F0ZURhdGEgPSBwRGF0YTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzID0ge307XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYWdncmVnYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZURhdGEgPSBkYXRhLmFnZ3JlZ2F0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm4gPSB1dGlsXzEuRGF0YVV0aWwuYWdncmVnYXRlc1thZ2dbaV0udHlwZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzW2FnZ1tpXS5maWVsZCArICcgLSAnICsgYWdnW2ldLnR5cGVdID0gZm4oYWdncmVnYXRlRGF0YSwgYWdnW2ldLmZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmdzLmFnZ3JlZ2F0ZXMgPSByZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHZ0ICYmIHB2dC5ncm91cHMgJiYgcHZ0Lmdyb3Vwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ3JvdXBzID0gcHZ0Lmdyb3VwcztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGV2ZWwgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVqMl9iYXNlXzEuaXNOdWxsT3JVbmRlZmluZWQoZ3JvdXBEcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwRHMgPSB1dGlsXzEuRGF0YVV0aWwuZ3JvdXAoZ3JvdXBEcywgZ3JvdXBzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwRGF0YSA9IHV0aWxfMS5EYXRhVXRpbC5ncm91cChwRGF0YSwgZ3JvdXBzW2ldLCBwdnQuYWdncmVnYXRlcywgbGV2ZWwsIGdyb3VwRHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmdzLnJlc3VsdCA9IHBEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICAgIH07XG4gICAgICAgIFVybEFkYXB0b3IucHJvdG90eXBlLmdldFF1ZXJ5UmVxdWVzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICAgICAgdmFyIHJlcSA9IHsgc29ydHM6IFtdLCBncm91cHM6IFtdLCBmaWx0ZXJzOiBbXSwgc2VhcmNoZXM6IFtdLCBhZ2dyZWdhdGVzOiBbXSB9O1xuICAgICAgICAgICAgcmVxLnNvcnRzID0gcXVlcnlfMS5RdWVyeS5maWx0ZXJRdWVyaWVzKHF1ZXJ5LnF1ZXJpZXMsICdvblNvcnRCeScpO1xuICAgICAgICAgICAgcmVxLmdyb3VwcyA9IHF1ZXJ5XzEuUXVlcnkuZmlsdGVyUXVlcmllcyhxdWVyeS5xdWVyaWVzLCAnb25Hcm91cCcpO1xuICAgICAgICAgICAgcmVxLmZpbHRlcnMgPSBxdWVyeV8xLlF1ZXJ5LmZpbHRlclF1ZXJpZXMocXVlcnkucXVlcmllcywgJ29uV2hlcmUnKTtcbiAgICAgICAgICAgIHJlcS5zZWFyY2hlcyA9IHF1ZXJ5XzEuUXVlcnkuZmlsdGVyUXVlcmllcyhxdWVyeS5xdWVyaWVzLCAnb25TZWFyY2gnKTtcbiAgICAgICAgICAgIHJlcS5hZ2dyZWdhdGVzID0gcXVlcnlfMS5RdWVyeS5maWx0ZXJRdWVyaWVzKHF1ZXJ5LnF1ZXJpZXMsICdvbkFnZ3JlZ2F0ZXMnKTtcbiAgICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgIH07XG4gICAgICAgIFVybEFkYXB0b3IucHJvdG90eXBlLmFkZFBhcmFtcyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgcmVxID0gb3B0aW9ucy5yZXFQYXJhbXM7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wYXJhbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVxLnBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IG9wdGlvbnMucGFyYW1zOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciB0bXAgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKHJlcVt0bXAua2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1F1ZXJ5KCkgLSBhZGRQYXJhbXM6IEN1c3RvbSBQYXJhbSBpcyBjb25mbGljdGluZyBvdGhlciByZXF1ZXN0IGFyZ3VtZW50cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXFbdG1wLmtleV0gPSB0bXAudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5mbikge1xuICAgICAgICAgICAgICAgICAgICByZXFbdG1wLmtleV0gPSB0bXAuZm4uY2FsbChvcHRpb25zLnF1ZXJ5LCB0bXAua2V5LCBvcHRpb25zLnF1ZXJ5LCBvcHRpb25zLmRtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVxLnBhcmFtc1t0bXAua2V5XSA9IHJlcVt0bXAua2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFVybEFkYXB0b3I7XG4gICAgfShBZGFwdG9yKSk7XG4gICAgZXhwb3J0cy5VcmxBZGFwdG9yID0gVXJsQWRhcHRvcjtcbiAgICB2YXIgT0RhdGFBZGFwdG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKE9EYXRhQWRhcHRvciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gT0RhdGFBZGFwdG9yKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgICAgIF90aGlzLm9wdGlvbnMgPSBlajJfYmFzZV8xLmV4dGVuZCh7fSwgX3RoaXMub3B0aW9ucywge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RUeXBlOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBhY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uO29kYXRhPWxpZ2h0O3E9MSxhcHBsaWNhdGlvbi9qc29uO29kYXRhPXZlcmJvc2U7cT0wLjUnLFxuICAgICAgICAgICAgICAgIG11bHRpcGFydEFjY2VwdDogJ211bHRpcGFydC9taXhlZCcsXG4gICAgICAgICAgICAgICAgc29ydEJ5OiAnJG9yZGVyYnknLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogJyRzZWxlY3QnLFxuICAgICAgICAgICAgICAgIHNraXA6ICckc2tpcCcsXG4gICAgICAgICAgICAgICAgdGFrZTogJyR0b3AnLFxuICAgICAgICAgICAgICAgIGNvdW50OiAnJGlubGluZWNvdW50JyxcbiAgICAgICAgICAgICAgICB3aGVyZTogJyRmaWx0ZXInLFxuICAgICAgICAgICAgICAgIGV4cGFuZDogJyRleHBhbmQnLFxuICAgICAgICAgICAgICAgIGJhdGNoOiAnJGJhdGNoJyxcbiAgICAgICAgICAgICAgICBjaGFuZ2VTZXQ6ICctLWNoYW5nZXNldF8nLFxuICAgICAgICAgICAgICAgIGJhdGNoUHJlOiAnYmF0Y2hfJyxcbiAgICAgICAgICAgICAgICBjb250ZW50SWQ6ICdDb250ZW50LUlkOiAnLFxuICAgICAgICAgICAgICAgIGJhdGNoQ29udGVudDogJ0NvbnRlbnQtVHlwZTogbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT0nLFxuICAgICAgICAgICAgICAgIGNoYW5nZVNldENvbnRlbnQ6ICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2h0dHBcXG5Db250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiaW5hcnkgJyxcbiAgICAgICAgICAgICAgICBiYXRjaENoYW5nZVNldENvbnRlbnRUeXBlOiAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04ICdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMuZ2V0TW9kdWxlTmFtZSA9IGVqMl9iYXNlXzEuZ2V0VmFsdWUoJ2dldE1vZHVsZW5hbWUnLCBfdGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgIH1cbiAgICAgICAgT0RhdGFBZGFwdG9yLnByb3RvdHlwZS5vblByZWRpY2F0ZSA9IGZ1bmN0aW9uIChwcmVkaWNhdGUsIHF1ZXJ5LCByZXF1aXJlc0Nhc3QpIHtcbiAgICAgICAgICAgIHZhciByZXR1cm5WYWx1ZSA9ICcnO1xuICAgICAgICAgICAgdmFyIG9wZXJhdG9yO1xuICAgICAgICAgICAgdmFyIGd1aWQ7XG4gICAgICAgICAgICB2YXIgdmFsID0gcHJlZGljYXRlLnZhbHVlO1xuICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICAgICAgICAgICAgdmFyIGZpZWxkID0gcHJlZGljYXRlLmZpZWxkID8gT0RhdGFBZGFwdG9yLmdldEZpZWxkKHByZWRpY2F0ZS5maWVsZCkgOiBudWxsO1xuICAgICAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSAnZGF0ZXRpbWVcXCcnICsgdXRpbF8xLkRhdGFVdGlsLnBhcnNlLnJlcGxhY2VyKHZhbCkgKyAnXFwnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHZhbCA9ICdcXCcnICsgdmFsICsgJ1xcJyc7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVzQ2FzdCkge1xuICAgICAgICAgICAgICAgICAgICBmaWVsZCA9ICdjYXN0KCcgKyBmaWVsZCArICcsIFxcJ0VkbS5TdHJpbmdcXCcpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHV0aWxfMS5EYXRhVXRpbC5wYXJzZS5pc0d1aWQodmFsKSkge1xuICAgICAgICAgICAgICAgICAgICBndWlkID0gJ2d1aWQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlLmlnbm9yZUNhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFndWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZCA9ICd0b2xvd2VyKCcgKyBmaWVsZCArICcpJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcGVyYXRvciA9IHV0aWxfMS5EYXRhVXRpbC5vZEJpT3BlcmF0b3JbcHJlZGljYXRlLm9wZXJhdG9yXTtcbiAgICAgICAgICAgIGlmIChvcGVyYXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlICs9IGZpZWxkO1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlICs9IG9wZXJhdG9yO1xuICAgICAgICAgICAgICAgIGlmIChndWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlICs9IGd1aWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZSArIHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZWoyX2Jhc2VfMS5pc051bGxPclVuZGVmaW5lZCh0aGlzLmdldE1vZHVsZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0TW9kdWxlTmFtZSgpID09PSAnT0RhdGFWNEFkYXB0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yID0gdXRpbF8xLkRhdGFVdGlsLm9kdjRVbmlPcGVyYXRvcltwcmVkaWNhdGUub3BlcmF0b3JdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wZXJhdG9yID0gdXRpbF8xLkRhdGFVdGlsLm9kVW5pT3BlcmF0b3JbcHJlZGljYXRlLm9wZXJhdG9yXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ3N1YnN0cmluZ29mJykge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gdmFsO1xuICAgICAgICAgICAgICAgIHZhbCA9IGZpZWxkO1xuICAgICAgICAgICAgICAgIGZpZWxkID0gdGVtcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVyblZhbHVlICs9IG9wZXJhdG9yICsgJygnO1xuICAgICAgICAgICAgcmV0dXJuVmFsdWUgKz0gZmllbGQgKyAnLCc7XG4gICAgICAgICAgICBpZiAoZ3VpZCkge1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlICs9IGd1aWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm5WYWx1ZSArPSB2YWwgKyAnKSc7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5wcm90b3R5cGUub25Db21wbGV4UHJlZGljYXRlID0gZnVuY3Rpb24gKHByZWRpY2F0ZSwgcXVlcnksIHJlcXVpcmVzQ2FzdCkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmVkaWNhdGUucHJlZGljYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlcy5wdXNoKCcoJyArIHRoaXMub25FYWNoV2hlcmUocHJlZGljYXRlLnByZWRpY2F0ZXNbaV0sIHF1ZXJ5LCByZXF1aXJlc0Nhc3QpICsgJyknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXMuam9pbignICcgKyBwcmVkaWNhdGUuY29uZGl0aW9uICsgJyAnKTtcbiAgICAgICAgfTtcbiAgICAgICAgT0RhdGFBZGFwdG9yLnByb3RvdHlwZS5vbkVhY2hXaGVyZSA9IGZ1bmN0aW9uIChmaWx0ZXIsIHF1ZXJ5LCByZXF1aXJlc0Nhc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXIuaXNDb21wbGV4ID8gdGhpcy5vbkNvbXBsZXhQcmVkaWNhdGUoZmlsdGVyLCBxdWVyeSwgcmVxdWlyZXNDYXN0KSA6IHRoaXMub25QcmVkaWNhdGUoZmlsdGVyLCBxdWVyeSwgcmVxdWlyZXNDYXN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgT0RhdGFBZGFwdG9yLnByb3RvdHlwZS5vbldoZXJlID0gZnVuY3Rpb24gKGZpbHRlcnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnB2dC5zZWFyY2gpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJzLnB1c2godGhpcy5vbkVhY2hXaGVyZSh0aGlzLnB2dC5zZWFyY2gsIG51bGwsIHRydWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJzLmpvaW4oJyBhbmQgJyk7XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5wcm90b3R5cGUub25FYWNoU2VhcmNoID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmZpZWxkcyAmJiBlLmZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB1dGlsXzEuRGF0YVV0aWwudGhyb3dFcnJvcignUXVlcnkoKSAtIFNlYXJjaCA6IG9EYXRhIHNlYXJjaCByZXF1aXJlcyBsaXN0IG9mIGZpZWxkIG5hbWVzIHRvIHNlYXJjaCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHRoaXMucHZ0LnNlYXJjaCB8fCBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5maWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIucHVzaChuZXcgcXVlcnlfMS5QcmVkaWNhdGUoZS5maWVsZHNbaV0sIGUub3BlcmF0b3IsIGUua2V5LCBlLmlnbm9yZUNhc2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHZ0LnNlYXJjaCA9IGZpbHRlcjtcbiAgICAgICAgfTtcbiAgICAgICAgT0RhdGFBZGFwdG9yLnByb3RvdHlwZS5vblNlYXJjaCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB0aGlzLnB2dC5zZWFyY2ggPSBxdWVyeV8xLlByZWRpY2F0ZS5vcih0aGlzLnB2dC5zZWFyY2gpO1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9O1xuICAgICAgICBPRGF0YUFkYXB0b3IucHJvdG90eXBlLm9uRWFjaFNvcnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICAgICAgaWYgKGUubmFtZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlLm5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goT0RhdGFBZGFwdG9yLmdldEZpZWxkKGUubmFtZVtpXSkgKyAoZS5kaXJlY3Rpb24gPT09ICdkZXNjZW5kaW5nJyA/ICcgZGVzYycgOiAnJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcy5wdXNoKE9EYXRhQWRhcHRvci5nZXRGaWVsZChlLm5hbWUpICsgKGUuZGlyZWN0aW9uID09PSAnZGVzY2VuZGluZycgPyAnIGRlc2MnIDogJycpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXMuam9pbignLCcpO1xuICAgICAgICB9O1xuICAgICAgICBPRGF0YUFkYXB0b3IucHJvdG90eXBlLm9uU29ydEJ5ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlLnJldmVyc2UoKS5qb2luKCcsJyk7XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5wcm90b3R5cGUub25Hcm91cCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB0aGlzLnB2dC5ncm91cHMgPSBlO1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9O1xuICAgICAgICBPRGF0YUFkYXB0b3IucHJvdG90eXBlLm9uU2VsZWN0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGVbaV0gPSBPRGF0YUFkYXB0b3IuZ2V0RmllbGQoZVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZS5qb2luKCcsJyk7XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5wcm90b3R5cGUub25BZ2dyZWdhdGVzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMucHZ0LmFnZ3JlZ2F0ZXMgPSBlO1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9O1xuICAgICAgICBPRGF0YUFkYXB0b3IucHJvdG90eXBlLm9uQ291bnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUgPT09IHRydWUgPyAnYWxscGFnZXMnIDogJyc7XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5wcm90b3R5cGUuYmVmb3JlU2VuZCA9IGZ1bmN0aW9uIChkbSwgcmVxdWVzdCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGlmICh1dGlsXzEuRGF0YVV0aWwuZW5kc1dpdGgoc2V0dGluZ3MudXJsLCB0aGlzLm9wdGlvbnMuYmF0Y2gpICYmIHNldHRpbmdzLnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3Bvc3QnKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCB0aGlzLm9wdGlvbnMubXVsdGlwYXJ0QWNjZXB0KTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0RhdGFTZXJ2aWNlVmVyc2lvbicsICcyLjAnKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUoJ3RleHQvcGxhaW47IGNoYXJzZXQ9eC11c2VyLWRlZmluZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgdGhpcy5vcHRpb25zLmFjY2VwdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0RhdGFTZXJ2aWNlVmVyc2lvbicsICcyLjAnKTtcbiAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignTWF4RGF0YVNlcnZpY2VWZXJzaW9uJywgJzIuMCcpO1xuICAgICAgICB9O1xuICAgICAgICBPRGF0YUFkYXB0b3IucHJvdG90eXBlLnByb2Nlc3NSZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhLCBkcywgcXVlcnksIHhociwgcmVxdWVzdCwgY2hhbmdlcykge1xuICAgICAgICAgICAgdmFyIHB2dERhdGEgPSAncHZ0RGF0YSc7XG4gICAgICAgICAgICBpZiAoIWVqMl9iYXNlXzEuaXNOdWxsT3JVbmRlZmluZWQoZGF0YS5kKSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhQ29weSA9IChxdWVyeSAmJiBxdWVyeS5yZXF1aXJlc0NvdW50cykgPyBkYXRhLmQucmVzdWx0cyA6IGRhdGEuZDtcbiAgICAgICAgICAgICAgICB2YXIgbWV0YURhdGEgPSAnX19tZXRhZGF0YSc7XG4gICAgICAgICAgICAgICAgaWYgKCFlajJfYmFzZV8xLmlzTnVsbE9yVW5kZWZpbmVkKGRhdGFDb3B5KSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFDb3B5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVqMl9iYXNlXzEuaXNOdWxsT3JVbmRlZmluZWQoZGF0YUNvcHlbaV1bbWV0YURhdGFdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhQ29weVtpXVttZXRhRGF0YV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcHZ0ID0gcmVxdWVzdCAmJiByZXF1ZXN0W3B2dERhdGFdO1xuICAgICAgICAgICAgdmFyIGVtcHR5QW5kQmF0Y2ggPSB0aGlzLnByb2Nlc3NCYXRjaFJlc3BvbnNlKGRhdGEsIHF1ZXJ5LCB4aHIsIHJlcXVlc3QsIGNoYW5nZXMpO1xuICAgICAgICAgICAgaWYgKGVtcHR5QW5kQmF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHlBbmRCYXRjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2ZXJzaW9uQ2hlY2sgPSB4aHIgJiYgcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcignRGF0YVNlcnZpY2VWZXJzaW9uJyk7XG4gICAgICAgICAgICB2YXIgY291bnQgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHZlcnNpb24gPSAodmVyc2lvbkNoZWNrICYmIHBhcnNlSW50KHZlcnNpb25DaGVjaywgMTApKSB8fCAyO1xuICAgICAgICAgICAgaWYgKHF1ZXJ5ICYmIHF1ZXJ5LnJlcXVpcmVzQ291bnRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9EYXRhQ291bnQgPSAnX19jb3VudCc7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbb0RhdGFDb3VudF0gfHwgZGF0YVsnb2RhdGEuY291bnQnXSkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IGRhdGFbb0RhdGFDb3VudF0gfHwgZGF0YVsnb2RhdGEuY291bnQnXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5kO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtvRGF0YUNvdW50XSB8fCBkYXRhWydvZGF0YS5jb3VudCddKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gZGF0YVtvRGF0YUNvdW50XSB8fCBkYXRhWydvZGF0YS5jb3VudCddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2ZXJzaW9uID09PSAzICYmIGRhdGEudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmQpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZlcnNpb24gPCAzICYmIGRhdGEucmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnJlc3VsdHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYXJncyA9IHt9O1xuICAgICAgICAgICAgYXJncy5jb3VudCA9IGNvdW50O1xuICAgICAgICAgICAgYXJncy5yZXN1bHQgPSBkYXRhO1xuICAgICAgICAgICAgdGhpcy5nZXRBZ2dyZWdhdGVSZXN1bHQocHZ0LCBkYXRhLCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiB1dGlsXzEuRGF0YVV0aWwuaXNOdWxsKGNvdW50KSA/IGFyZ3MucmVzdWx0IDogeyByZXN1bHQ6IGFyZ3MucmVzdWx0LCBjb3VudDogYXJncy5jb3VudCwgYWdncmVnYXRlczogYXJncy5hZ2dyZWdhdGVzIH07XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5wcm90b3R5cGUuY29udmVydFRvUXVlcnlTdHJpbmcgPSBmdW5jdGlvbiAocmVxdWVzdCwgcXVlcnksIGRtKSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgICAgICB2YXIgdGFibGUgPSAndGFibGUnO1xuICAgICAgICAgICAgdmFyIHRhYmxlTmFtZSA9IHJlcXVlc3RbdGFibGVdIHx8ICcnO1xuICAgICAgICAgICAgdmFyIGZvcm1hdCA9ICckZm9ybWF0JztcbiAgICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0W3RhYmxlXTtcbiAgICAgICAgICAgIGlmIChkbS5kYXRhU291cmNlLnJlcXVpcmVzRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdFtmb3JtYXRdID0gJ2pzb24nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZXF1ZXN0KTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwga2V5c180ID0ga2V5czsgX2kgPCBrZXlzXzQubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBrZXlzXzRbX2ldO1xuICAgICAgICAgICAgICAgIHJlcy5wdXNoKHByb3AgKyAnPScgKyByZXF1ZXN0W3Byb3BdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcyA9IHJlcy5qb2luKCcmJyk7XG4gICAgICAgICAgICBpZiAoZG0uZGF0YVNvdXJjZS51cmwgJiYgZG0uZGF0YVNvdXJjZS51cmwuaW5kZXhPZignPycpICE9PSAtMSAmJiAhdGFibGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXMubGVuZ3RoID8gdGFibGVOYW1lICsgJz8nICsgcmVzIDogdGFibGVOYW1lIHx8ICcnO1xuICAgICAgICB9O1xuICAgICAgICBPRGF0YUFkYXB0b3IucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIChkbSwgZGF0YSwgdGFibGVOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHVybDogZG0uZGF0YVNvdXJjZS51cmwucmVwbGFjZSgvXFwvKiQvLCB0YWJsZU5hbWUgPyAnLycgKyB0YWJsZU5hbWUgOiAnJyksXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGRtLCBrZXlGaWVsZCwgdmFsdWUsIHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcbiAgICAgICAgICAgICAgICB1cmw6IGRtLmRhdGFTb3VyY2UudXJsLnJlcGxhY2UoL1xcLyokLywgdGFibGVOYW1lID8gJy8nICsgdGFibGVOYW1lIDogJycpICsgJygnICsgdmFsdWUgKyAnKSdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRtLCBrZXlGaWVsZCwgdmFsdWUsIHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUFVUJyxcbiAgICAgICAgICAgICAgICB1cmw6IGRtLmRhdGFTb3VyY2UudXJsLnJlcGxhY2UoL1xcLyokLywgdGFibGVOYW1lID8gJy8nICsgdGFibGVOYW1lIDogJycpICsgJygnICsgdmFsdWVba2V5RmllbGRdICsgJyknLFxuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHZhbHVlKSxcbiAgICAgICAgICAgICAgICBhY2NlcHQ6IHRoaXMub3B0aW9ucy5hY2NlcHRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5wcm90b3R5cGUuYmF0Y2hSZXF1ZXN0ID0gZnVuY3Rpb24gKGRtLCBjaGFuZ2VzLCBlKSB7XG4gICAgICAgICAgICB2YXIgaW5pdGlhbEd1aWQgPSBlLmd1aWQgPSB1dGlsXzEuRGF0YVV0aWwuZ2V0R3VpZCh0aGlzLm9wdGlvbnMuYmF0Y2hQcmUpO1xuICAgICAgICAgICAgdmFyIHVybCA9IGRtLmRhdGFTb3VyY2UudXJsLnJlcGxhY2UoL1xcLyokLywgJy8nICsgdGhpcy5vcHRpb25zLmJhdGNoKTtcbiAgICAgICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgICAgIHVybDogZS51cmwsXG4gICAgICAgICAgICAgICAga2V5OiBlLmtleSxcbiAgICAgICAgICAgICAgICBjaWQ6IDEsXG4gICAgICAgICAgICAgICAgY1NldDogdXRpbF8xLkRhdGFVdGlsLmdldEd1aWQodGhpcy5vcHRpb25zLmNoYW5nZVNldClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcmVxID0gJy0tJyArIGluaXRpYWxHdWlkICsgJ1xcbic7XG4gICAgICAgICAgICByZXEgKz0gJ0NvbnRlbnQtVHlwZTogbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT0nICsgYXJncy5jU2V0LnJlcGxhY2UoJy0tJywgJycpICsgJ1xcbic7XG4gICAgICAgICAgICB0aGlzLnB2dC5jaGFuZ2VTZXQgPSAwO1xuICAgICAgICAgICAgcmVxICs9IHRoaXMuZ2VuZXJhdGVJbnNlcnRSZXF1ZXN0KGNoYW5nZXMuYWRkZWRSZWNvcmRzLCBhcmdzKTtcbiAgICAgICAgICAgIHJlcSArPSB0aGlzLmdlbmVyYXRlVXBkYXRlUmVxdWVzdChjaGFuZ2VzLmNoYW5nZWRSZWNvcmRzLCBhcmdzKTtcbiAgICAgICAgICAgIHJlcSArPSB0aGlzLmdlbmVyYXRlRGVsZXRlUmVxdWVzdChjaGFuZ2VzLmRlbGV0ZWRSZWNvcmRzLCBhcmdzKTtcbiAgICAgICAgICAgIHJlcSArPSBhcmdzLmNTZXQgKyAnLS1cXG4nO1xuICAgICAgICAgICAgcmVxICs9ICctLScgKyBpbml0aWFsR3VpZCArICctLSc7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnbXVsdGlwYXJ0L21peGVkOyBjaGFyc2V0PVVURi04O2JvdW5kYXJ5PScgKyBpbml0aWFsR3VpZCxcbiAgICAgICAgICAgICAgICBkYXRhOiByZXFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5wcm90b3R5cGUuZ2VuZXJhdGVEZWxldGVSZXF1ZXN0ID0gZnVuY3Rpb24gKGFyciwgZSkge1xuICAgICAgICAgICAgaWYgKCFhcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVxID0gJyc7XG4gICAgICAgICAgICB2YXIgc3RhdCA9IHtcbiAgICAgICAgICAgICAgICAnbWV0aG9kJzogJ0RFTEVURSAnLFxuICAgICAgICAgICAgICAgICd1cmwnOiBmdW5jdGlvbiAoZGF0YSwgaSwga2V5KSB7IHJldHVybiAnKCcgKyBkYXRhW2ldW2tleV0gKyAnKSc7IH0sXG4gICAgICAgICAgICAgICAgJ2RhdGEnOiBmdW5jdGlvbiAoZGF0YSwgaSkgeyByZXR1cm4gJyc7IH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXEgPSB0aGlzLmdlbmVyYXRlQm9keUNvbnRlbnQoYXJyLCBlLCBzdGF0KTtcbiAgICAgICAgICAgIHJldHVybiByZXEgKyAnXFxuJztcbiAgICAgICAgfTtcbiAgICAgICAgT0RhdGFBZGFwdG9yLnByb3RvdHlwZS5nZW5lcmF0ZUluc2VydFJlcXVlc3QgPSBmdW5jdGlvbiAoYXJyLCBlKSB7XG4gICAgICAgICAgICBpZiAoIWFycikge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXEgPSAnJztcbiAgICAgICAgICAgIHZhciBzdGF0ID0ge1xuICAgICAgICAgICAgICAgICdtZXRob2QnOiAnUE9TVCAnLFxuICAgICAgICAgICAgICAgICd1cmwnOiBmdW5jdGlvbiAoZGF0YSwgaSwga2V5KSB7IHJldHVybiAnJzsgfSxcbiAgICAgICAgICAgICAgICAnZGF0YSc6IGZ1bmN0aW9uIChkYXRhLCBpKSB7IHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhW2ldKSArICdcXG5cXG4nOyB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVxID0gdGhpcy5nZW5lcmF0ZUJvZHlDb250ZW50KGFyciwgZSwgc3RhdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICB9O1xuICAgICAgICBPRGF0YUFkYXB0b3IucHJvdG90eXBlLmdlbmVyYXRlVXBkYXRlUmVxdWVzdCA9IGZ1bmN0aW9uIChhcnIsIGUpIHtcbiAgICAgICAgICAgIGlmICghYXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlcSA9ICcnO1xuICAgICAgICAgICAgdmFyIHN0YXQgPSB7XG4gICAgICAgICAgICAgICAgJ21ldGhvZCc6ICdQVVQgJyxcbiAgICAgICAgICAgICAgICAndXJsJzogZnVuY3Rpb24gKGRhdGEsIGksIGtleSkgeyByZXR1cm4gJygnICsgZGF0YVtpXVtrZXldICsgJyknOyB9LFxuICAgICAgICAgICAgICAgICdkYXRhJzogZnVuY3Rpb24gKGRhdGEsIGkpIHsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGFbaV0pICsgJ1xcblxcbic7IH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXEgPSB0aGlzLmdlbmVyYXRlQm9keUNvbnRlbnQoYXJyLCBlLCBzdGF0KTtcbiAgICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5nZXRGaWVsZCA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcC5yZXBsYWNlKC9cXC4vZywgJy8nKTtcbiAgICAgICAgfTtcbiAgICAgICAgT0RhdGFBZGFwdG9yLnByb3RvdHlwZS5nZW5lcmF0ZUJvZHlDb250ZW50ID0gZnVuY3Rpb24gKGFyciwgZSwgc3RhdCkge1xuICAgICAgICAgICAgdmFyIHJlcSA9ICcnO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXEgKz0gJ1xcbicgKyBlLmNTZXQgKyAnXFxuJztcbiAgICAgICAgICAgICAgICByZXEgKz0gdGhpcy5vcHRpb25zLmNoYW5nZVNldENvbnRlbnQgKyAnXFxuXFxuJztcbiAgICAgICAgICAgICAgICByZXEgKz0gc3RhdC5tZXRob2Q7XG4gICAgICAgICAgICAgICAgcmVxICs9IGUudXJsICsgc3RhdC51cmwoYXJyLCBpLCBlLmtleSkgKyAnIEhUVFAvMS4xXFxuJztcbiAgICAgICAgICAgICAgICByZXEgKz0gJ0FjY2VwdDogJyArIHRoaXMub3B0aW9ucy5hY2NlcHQgKyAnXFxuJztcbiAgICAgICAgICAgICAgICByZXEgKz0gJ0NvbnRlbnQtSWQ6ICcgKyB0aGlzLnB2dC5jaGFuZ2VTZXQrKyArICdcXG4nO1xuICAgICAgICAgICAgICAgIHJlcSArPSB0aGlzLm9wdGlvbnMuYmF0Y2hDaGFuZ2VTZXRDb250ZW50VHlwZSArICdcXG5cXG4nO1xuICAgICAgICAgICAgICAgIHJlcSArPSBzdGF0LmRhdGEoYXJyLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhQWRhcHRvci5wcm90b3R5cGUucHJvY2Vzc0JhdGNoUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSwgcXVlcnksIHhociwgcmVxdWVzdCwgY2hhbmdlcykge1xuICAgICAgICAgICAgaWYgKHhociAmJiB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpICYmIHhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJykuaW5kZXhPZigneG1sJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChxdWVyeS5yZXF1aXJlc0NvdW50cyA/IHsgcmVzdWx0OiBbXSwgY291bnQ6IDAgfSA6IFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0ICYmIHRoaXMub3B0aW9ucy5iYXRjaCAmJiB1dGlsXzEuRGF0YVV0aWwuZW5kc1dpdGgocmVxdWVzdC51cmwsIHRoaXMub3B0aW9ucy5iYXRjaCkgJiYgcmVxdWVzdC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdwb3N0Jykge1xuICAgICAgICAgICAgICAgIHZhciBndWlkID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICAgICAgICAgICAgICB2YXIgY0lkeCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICB2YXIganNvbk9iaiA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBndWlkID0gZ3VpZC5zdWJzdHJpbmcoZ3VpZC5pbmRleE9mKCc9YmF0Y2hyZXNwb25zZScpICsgMSk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuc3BsaXQoZ3VpZCk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhWzFdO1xuICAgICAgICAgICAgICAgIHZhciBleFZhbCA9IC8oPzpcXGJDb250ZW50LVR5cGUuK2JvdW5kYXJ5PSkoY2hhbmdlc2V0cmVzcG9uc2UuKykvaS5leGVjKGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChleFZhbCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnJlcGxhY2UoZXhWYWxbMF0sICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZUd1aWQgPSBleFZhbCA/IGV4VmFsWzFdIDogJyc7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuc3BsaXQoY2hhbmdlR3VpZCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRhdGEubGVuZ3RoOyBpID4gLTE7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIS9cXGJDb250ZW50LUlEOi9pLnRlc3QoZGF0YVtpXSkgfHwgIS9cXGJIVFRQLisyMDEvLnRlc3QoZGF0YVtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNJZHggPSBwYXJzZUludCgvXFxiQ29udGVudC1JRDogKFxcZCspL2kuZXhlYyhkYXRhW2ldKVsxXSwgMTApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlcy5hZGRlZFJlY29yZHNbY0lkeF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzb25PYmogPSB1dGlsXzEuRGF0YVV0aWwucGFyc2UucGFyc2VKc29uKC9eXFx7LitcXH0vbS5leGVjKGRhdGFbaV0pWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVqMl9iYXNlXzEuZXh0ZW5kKHt9LCBjaGFuZ2VzLmFkZGVkUmVjb3Jkc1tjSWR4XSwgdGhpcy5wcm9jZXNzUmVzcG9uc2UoanNvbk9iaikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjaGFuZ2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBPRGF0YUFkYXB0b3I7XG4gICAgfShVcmxBZGFwdG9yKSk7XG4gICAgZXhwb3J0cy5PRGF0YUFkYXB0b3IgPSBPRGF0YUFkYXB0b3I7XG4gICAgdmFyIE9EYXRhVjRBZGFwdG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKE9EYXRhVjRBZGFwdG9yLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBPRGF0YVY0QWRhcHRvcigpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICAgICAgX3RoaXMub3B0aW9ucyA9IGVqMl9iYXNlXzEuZXh0ZW5kKHt9LCBfdGhpcy5vcHRpb25zLCB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdFR5cGU6ICdnZXQnLFxuICAgICAgICAgICAgICAgIGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdCwgKi8qOyBxPTAuMDEnLFxuICAgICAgICAgICAgICAgIG11bHRpcGFydEFjY2VwdDogJ211bHRpcGFydC9taXhlZCcsXG4gICAgICAgICAgICAgICAgc29ydEJ5OiAnJG9yZGVyYnknLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogJyRzZWxlY3QnLFxuICAgICAgICAgICAgICAgIHNraXA6ICckc2tpcCcsXG4gICAgICAgICAgICAgICAgdGFrZTogJyR0b3AnLFxuICAgICAgICAgICAgICAgIGNvdW50OiAnJGNvdW50JyxcbiAgICAgICAgICAgICAgICBzZWFyY2g6ICckc2VhcmNoJyxcbiAgICAgICAgICAgICAgICB3aGVyZTogJyRmaWx0ZXInLFxuICAgICAgICAgICAgICAgIGV4cGFuZDogJyRleHBhbmQnLFxuICAgICAgICAgICAgICAgIGJhdGNoOiAnJGJhdGNoJyxcbiAgICAgICAgICAgICAgICBjaGFuZ2VTZXQ6ICctLWNoYW5nZXNldF8nLFxuICAgICAgICAgICAgICAgIGJhdGNoUHJlOiAnYmF0Y2hfJyxcbiAgICAgICAgICAgICAgICBjb250ZW50SWQ6ICdDb250ZW50LUlkOiAnLFxuICAgICAgICAgICAgICAgIGJhdGNoQ29udGVudDogJ0NvbnRlbnQtVHlwZTogbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT0nLFxuICAgICAgICAgICAgICAgIGNoYW5nZVNldENvbnRlbnQ6ICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2h0dHBcXG5Db250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiaW5hcnkgJyxcbiAgICAgICAgICAgICAgICBiYXRjaENoYW5nZVNldENvbnRlbnRUeXBlOiAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04ICdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgICB9XG4gICAgICAgIE9EYXRhVjRBZGFwdG9yLnByb3RvdHlwZS5nZXRNb2R1bGVuYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICdPRGF0YVY0QWRhcHRvcic7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgT0RhdGFWNEFkYXB0b3IucHJvdG90eXBlLm9uQ291bnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUgPT09IHRydWUgPyAndHJ1ZScgOiAnJztcbiAgICAgICAgfTtcbiAgICAgICAgT0RhdGFWNEFkYXB0b3IucHJvdG90eXBlLm9uUHJlZGljYXRlID0gZnVuY3Rpb24gKHByZWRpY2F0ZSwgcXVlcnksIHJlcXVpcmVzQ2FzdCkge1xuICAgICAgICAgICAgdmFyIHJldHVyblZhbHVlID0gJyc7XG4gICAgICAgICAgICB2YXIgdmFsID0gcHJlZGljYXRlLnZhbHVlO1xuICAgICAgICAgICAgdmFyIGlzRGF0ZSA9IHZhbCBpbnN0YW5jZW9mIERhdGU7XG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IF9zdXBlci5wcm90b3R5cGUub25QcmVkaWNhdGUuY2FsbCh0aGlzLCBwcmVkaWNhdGUsIHF1ZXJ5LCByZXF1aXJlc0Nhc3QpO1xuICAgICAgICAgICAgaWYgKGlzRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gcmV0dXJuVmFsdWUucmVwbGFjZSgvZGF0ZXRpbWUnKC4qKSckLywgJyQxJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhVjRBZGFwdG9yLnByb3RvdHlwZS5vbkVhY2hTZWFyY2ggPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHNlYXJjaCA9IHRoaXMucHZ0LnNlYXJjaGVzIHx8IFtdO1xuICAgICAgICAgICAgc2VhcmNoLnB1c2goZS5rZXkpO1xuICAgICAgICAgICAgdGhpcy5wdnQuc2VhcmNoZXMgPSBzZWFyY2g7XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhVjRBZGFwdG9yLnByb3RvdHlwZS5vblNlYXJjaCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdnQuc2VhcmNoZXMuam9pbignIE9SICcpO1xuICAgICAgICB9O1xuICAgICAgICBPRGF0YVY0QWRhcHRvci5wcm90b3R5cGUuYmVmb3JlU2VuZCA9IGZ1bmN0aW9uIChkbSwgcmVxdWVzdCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgdGhpcy5vcHRpb25zLmFjY2VwdCk7XG4gICAgICAgIH07XG4gICAgICAgIE9EYXRhVjRBZGFwdG9yLnByb3RvdHlwZS5wcm9jZXNzUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSwgZHMsIHF1ZXJ5LCB4aHIsIHJlcXVlc3QsIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHZhciBwdnREYXRhID0gJ3B2dERhdGEnO1xuICAgICAgICAgICAgdmFyIHB2dCA9IHJlcXVlc3QgJiYgcmVxdWVzdFtwdnREYXRhXTtcbiAgICAgICAgICAgIHZhciBlbXB0eUFuZEJhdGNoID0gX3N1cGVyLnByb3RvdHlwZS5wcm9jZXNzQmF0Y2hSZXNwb25zZS5jYWxsKHRoaXMsIGRhdGEsIHF1ZXJ5LCB4aHIsIHJlcXVlc3QsIGNoYW5nZXMpO1xuICAgICAgICAgICAgaWYgKGVtcHR5QW5kQmF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHlBbmRCYXRjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjb3VudCA9IG51bGw7XG4gICAgICAgICAgICB2YXIgZGF0YUNvdW50ID0gJ0BvZGF0YS5jb3VudCc7XG4gICAgICAgICAgICBpZiAocXVlcnkgJiYgcXVlcnkucmVxdWlyZXNDb3VudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YUNvdW50IGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSBkYXRhW2RhdGFDb3VudF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICB2YXIgYXJncyA9IHt9O1xuICAgICAgICAgICAgYXJncy5jb3VudCA9IGNvdW50O1xuICAgICAgICAgICAgYXJncy5yZXN1bHQgPSBkYXRhO1xuICAgICAgICAgICAgdGhpcy5nZXRBZ2dyZWdhdGVSZXN1bHQocHZ0LCBkYXRhLCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiB1dGlsXzEuRGF0YVV0aWwuaXNOdWxsKGNvdW50KSA/IGFyZ3MucmVzdWx0IDogeyByZXN1bHQ6IGFyZ3MucmVzdWx0LCBjb3VudDogY291bnQsIGFnZ3JlZ2F0ZXM6IGFyZ3MuYWdncmVnYXRlcyB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gT0RhdGFWNEFkYXB0b3I7XG4gICAgfShPRGF0YUFkYXB0b3IpKTtcbiAgICBleHBvcnRzLk9EYXRhVjRBZGFwdG9yID0gT0RhdGFWNEFkYXB0b3I7XG4gICAgdmFyIFdlYkFwaUFkYXB0b3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoV2ViQXBpQWRhcHRvciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gV2ViQXBpQWRhcHRvcigpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICBXZWJBcGlBZGFwdG9yLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoZG0sIGRhdGEsIHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiBkbS5kYXRhU291cmNlLnVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgV2ViQXBpQWRhcHRvci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGRtLCBrZXlGaWVsZCwgdmFsdWUsIHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcbiAgICAgICAgICAgICAgICB1cmw6IGRtLmRhdGFTb3VyY2UudXJsICsgJy8nICsgdmFsdWUsXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodmFsdWUpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBXZWJBcGlBZGFwdG9yLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG0sIGtleUZpZWxkLCB2YWx1ZSwgdGFibGVOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQVVQnLFxuICAgICAgICAgICAgICAgIHVybDogZG0uZGF0YVNvdXJjZS51cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodmFsdWUpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBXZWJBcGlBZGFwdG9yLnByb3RvdHlwZS5iZWZvcmVTZW5kID0gZnVuY3Rpb24gKGRtLCByZXF1ZXN0LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9qYXZhc2NyaXB0LCAqLyo7IHE9MC4wMScpO1xuICAgICAgICB9O1xuICAgICAgICBXZWJBcGlBZGFwdG9yLnByb3RvdHlwZS5wcm9jZXNzUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSwgZHMsIHF1ZXJ5LCB4aHIsIHJlcXVlc3QsIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHZhciBwdnREYXRhID0gJ3B2dERhdGEnO1xuICAgICAgICAgICAgdmFyIHB2dCA9IHJlcXVlc3QgJiYgcmVxdWVzdFtwdnREYXRhXTtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IG51bGw7XG4gICAgICAgICAgICB2YXIgYXJncyA9IHt9O1xuICAgICAgICAgICAgaWYgKHJlcXVlc3QgJiYgcmVxdWVzdC50eXBlLnRvTG93ZXJDYXNlKCkgIT09ICdwb3N0Jykge1xuICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9uQ2hlY2sgPSB4aHIgJiYgcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcignRGF0YVNlcnZpY2VWZXJzaW9uJyk7XG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb24gPSAodmVyc2lvbkNoZWNrICYmIHBhcnNlSW50KHZlcnNpb25DaGVjaywgMTApKSB8fCAyO1xuICAgICAgICAgICAgICAgIGlmIChxdWVyeSAmJiBxdWVyeS5yZXF1aXJlc0NvdW50cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXV0aWxfMS5EYXRhVXRpbC5pc051bGwoZGF0YS5Db3VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ID0gZGF0YS5Db3VudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmVyc2lvbiA8IDMgJiYgZGF0YS5JdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5JdGVtcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJncy5jb3VudCA9IGNvdW50O1xuICAgICAgICAgICAgICAgIGFyZ3MucmVzdWx0ID0gZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEFnZ3JlZ2F0ZVJlc3VsdChwdnQsIGRhdGEsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJncy5yZXN1bHQgPSBhcmdzLnJlc3VsdCB8fCBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIHV0aWxfMS5EYXRhVXRpbC5pc051bGwoY291bnQpID8gYXJncy5yZXN1bHQgOiB7IHJlc3VsdDogYXJncy5yZXN1bHQsIGNvdW50OiBhcmdzLmNvdW50LCBhZ2dyZWdhdGVzOiBhcmdzLmFnZ3JlZ2F0ZXMgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFdlYkFwaUFkYXB0b3I7XG4gICAgfShPRGF0YUFkYXB0b3IpKTtcbiAgICBleHBvcnRzLldlYkFwaUFkYXB0b3IgPSBXZWJBcGlBZGFwdG9yO1xuICAgIHZhciBXZWJNZXRob2RBZGFwdG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFdlYk1ldGhvZEFkYXB0b3IsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFdlYk1ldGhvZEFkYXB0b3IoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgV2ViTWV0aG9kQWRhcHRvci5wcm90b3R5cGUucHJvY2Vzc1F1ZXJ5ID0gZnVuY3Rpb24gKGRtLCBxdWVyeSwgaGllcmFyY2h5RmlsdGVycykge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyBVcmxBZGFwdG9yKCkucHJvY2Vzc1F1ZXJ5KGRtLCBxdWVyeSwgaGllcmFyY2h5RmlsdGVycyk7XG4gICAgICAgICAgICB2YXIgZ2V0RGF0YSA9ICdkYXRhJztcbiAgICAgICAgICAgIHZhciBkYXRhID0gdXRpbF8xLkRhdGFVdGlsLnBhcnNlLnBhcnNlSnNvbihvYmpbZ2V0RGF0YV0pO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gJ3ZhbHVlJztcbiAgICAgICAgICAgIGlmIChkYXRhLnBhcmFtKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnBhcmFtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbSA9IGRhdGEucGFyYW1baV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBPYmplY3Qua2V5cyhwYXJhbSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gcGFyYW1ba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRbdmFsdWVdID0gZGF0YTtcbiAgICAgICAgICAgIHZhciBwdnREYXRhID0gJ3B2dERhdGEnO1xuICAgICAgICAgICAgdmFyIHVybCA9ICd1cmwnO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShyZXN1bHQpLFxuICAgICAgICAgICAgICAgIHVybDogb2JqW3VybF0sXG4gICAgICAgICAgICAgICAgcHZ0RGF0YTogb2JqW3B2dERhdGFdLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gV2ViTWV0aG9kQWRhcHRvcjtcbiAgICB9KFVybEFkYXB0b3IpKTtcbiAgICBleHBvcnRzLldlYk1ldGhvZEFkYXB0b3IgPSBXZWJNZXRob2RBZGFwdG9yO1xuICAgIHZhciBSZW1vdGVTYXZlQWRhcHRvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhSZW1vdGVTYXZlQWRhcHRvciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gUmVtb3RlU2F2ZUFkYXB0b3IoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICAgICAgZWoyX2Jhc2VfMS5zZXRWYWx1ZSgnYmVmb3JlU2VuZCcsIFVybEFkYXB0b3IucHJvdG90eXBlLmJlZm9yZVNlbmQsIF90aGlzKTtcbiAgICAgICAgICAgIGVqMl9iYXNlXzEuc2V0VmFsdWUoJ2luc2VydCcsIFVybEFkYXB0b3IucHJvdG90eXBlLmluc2VydCwgX3RoaXMpO1xuICAgICAgICAgICAgZWoyX2Jhc2VfMS5zZXRWYWx1ZSgndXBkYXRlJywgVXJsQWRhcHRvci5wcm90b3R5cGUudXBkYXRlLCBfdGhpcyk7XG4gICAgICAgICAgICBlajJfYmFzZV8xLnNldFZhbHVlKCdyZW1vdmUnLCBVcmxBZGFwdG9yLnByb3RvdHlwZS5yZW1vdmUsIF90aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcztcbiAgICAgICAgfVxuICAgICAgICBSZW1vdGVTYXZlQWRhcHRvci5wcm90b3R5cGUuYmF0Y2hSZXF1ZXN0ID0gZnVuY3Rpb24gKGRtLCBjaGFuZ2VzLCBlKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGFuZ2VzLmFkZGVkUmVjb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIEpzb25BZGFwdG9yLnByb3RvdHlwZS5pbnNlcnQoZG0sIGNoYW5nZXMuYWRkZWRSZWNvcmRzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGFuZ2VzLmNoYW5nZWRSZWNvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgSnNvbkFkYXB0b3IucHJvdG90eXBlLnVwZGF0ZShkbSwgZS5rZXksIGNoYW5nZXMuY2hhbmdlZFJlY29yZHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoYW5nZXMuZGVsZXRlZFJlY29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBKc29uQWRhcHRvci5wcm90b3R5cGUucmVtb3ZlKGRtLCBlLmtleSwgY2hhbmdlcy5kZWxldGVkUmVjb3Jkc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6IGRtLmRhdGFTb3VyY2UuYmF0Y2hVcmwgfHwgZG0uZGF0YVNvdXJjZS5jcnVkVXJsIHx8IGRtLmRhdGFTb3VyY2UudXJsLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWQ6IGNoYW5nZXMuY2hhbmdlZFJlY29yZHMsXG4gICAgICAgICAgICAgICAgICAgIGFkZGVkOiBjaGFuZ2VzLmFkZGVkUmVjb3JkcyxcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlZDogY2hhbmdlcy5kZWxldGVkUmVjb3JkcyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnYmF0Y2gnLFxuICAgICAgICAgICAgICAgICAgICB0YWJsZTogZS51cmwsXG4gICAgICAgICAgICAgICAgICAgIGtleTogZS5rZXlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFJlbW90ZVNhdmVBZGFwdG9yO1xuICAgIH0oSnNvbkFkYXB0b3IpKTtcbiAgICBleHBvcnRzLlJlbW90ZVNhdmVBZGFwdG9yID0gUmVtb3RlU2F2ZUFkYXB0b3I7XG4gICAgdmFyIENhY2hlQWRhcHRvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhDYWNoZUFkYXB0b3IsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIENhY2hlQWRhcHRvcihhZGFwdG9yLCB0aW1lU3RhbXAsIHBhZ2VTaXplKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICAgICAgX3RoaXMuaXNDcnVkQWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICBfdGhpcy5pc0luc2VydEFjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFlajJfYmFzZV8xLmlzTnVsbE9yVW5kZWZpbmVkKGFkYXB0b3IpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2FjaGVBZGFwdG9yID0gYWRhcHRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnBhZ2VTaXplID0gcGFnZVNpemU7XG4gICAgICAgICAgICBfdGhpcy5ndWlkSWQgPSB1dGlsXzEuRGF0YVV0aWwuZ2V0R3VpZCgnY2FjaGVBZGFwdG9yJyk7XG4gICAgICAgICAgICB2YXIgb2JqID0geyBrZXlzOiBbXSwgcmVzdWx0czogW10gfTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShfdGhpcy5ndWlkSWQsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgICAgICAgICAgdmFyIGd1aWQgPSBfdGhpcy5ndWlkSWQ7XG4gICAgICAgICAgICBpZiAoIWVqMl9iYXNlXzEuaXNOdWxsT3JVbmRlZmluZWQodGltZVN0YW1wKSkge1xuICAgICAgICAgICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB1dGlsXzEuRGF0YVV0aWwucGFyc2UucGFyc2VKc29uKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShndWlkKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmb3JEZWwgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVlc3RUaW1lID0gK25ldyBEYXRlKGRhdGEucmVzdWx0c1tpXS50aW1lU3RhbXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5yZXN1bHRzW2ldLnRpbWVTdGFtcCA9IGN1cnJlbnRUaW1lIC0gcmVxdWVzdFRpbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRpbWUgLSByZXF1ZXN0VGltZSA+IHRpbWVTdGFtcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvckRlbC5wdXNoKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm9yRGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnJlc3VsdHMuc3BsaWNlKGZvckRlbFtpXSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmtleXMuc3BsaWNlKGZvckRlbFtpXSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGd1aWQpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oZ3VpZCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVTdGFtcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgIH1cbiAgICAgICAgQ2FjaGVBZGFwdG9yLnByb3RvdHlwZS5nZW5lcmF0ZUtleSA9IGZ1bmN0aW9uICh1cmwsIHF1ZXJ5KSB7XG4gICAgICAgICAgICB2YXIgcXVlcmllcyA9IHRoaXMuZ2V0UXVlcnlSZXF1ZXN0KHF1ZXJ5KTtcbiAgICAgICAgICAgIHZhciBzaW5nbGVzID0gcXVlcnlfMS5RdWVyeS5maWx0ZXJRdWVyeUxpc3RzKHF1ZXJ5LnF1ZXJpZXMsIFsnb25TZWxlY3QnLCAnb25QYWdlJywgJ29uU2tpcCcsICdvblRha2UnLCAnb25SYW5nZSddKTtcbiAgICAgICAgICAgIHZhciBrZXkgPSB1cmw7XG4gICAgICAgICAgICB2YXIgcGFnZSA9ICdvblBhZ2UnO1xuICAgICAgICAgICAgaWYgKHBhZ2UgaW4gc2luZ2xlcykge1xuICAgICAgICAgICAgICAgIGtleSArPSBzaW5nbGVzW3BhZ2VdLnBhZ2VJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXJpZXMuc29ydHMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAga2V5ICs9IG9iai5lLmRpcmVjdGlvbiArIG9iai5lLmZpZWxkTmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcXVlcmllcy5ncm91cHMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAga2V5ICs9IG9iai5lLmZpZWxkTmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcXVlcmllcy5zZWFyY2hlcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICBrZXkgKz0gb2JqLmUuc2VhcmNoS2V5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKHZhciBmaWx0ZXIgPSAwOyBmaWx0ZXIgPCBxdWVyaWVzLmZpbHRlcnMubGVuZ3RoOyBmaWx0ZXIrKykge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50RmlsdGVyID0gcXVlcmllcy5maWx0ZXJzW2ZpbHRlcl07XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRGaWx0ZXIuZS5pc0NvbXBsZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1F1ZXJ5ID0gcXVlcnkuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UXVlcnkucXVlcmllcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRGaWx0ZXIuZS5wcmVkaWNhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdRdWVyeS5xdWVyaWVzLnB1c2goeyBmbjogJ29uV2hlcmUnLCBlOiBjdXJyZW50RmlsdGVyLmUucHJlZGljYXRlc1tpXSwgZmlsdGVyOiBxdWVyeS5xdWVyaWVzLmZpbHRlciB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBrZXkgKz0gY3VycmVudEZpbHRlci5lLmNvbmRpdGlvbiArIHRoaXMuZ2VuZXJhdGVLZXkodXJsLCBuZXdRdWVyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBrZXkgKz0gY3VycmVudEZpbHRlci5lLmZpZWxkICsgY3VycmVudEZpbHRlci5lLm9wZXJhdG9yICsgY3VycmVudEZpbHRlci5lLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH07XG4gICAgICAgIENhY2hlQWRhcHRvci5wcm90b3R5cGUucHJvY2Vzc1F1ZXJ5ID0gZnVuY3Rpb24gKGRtLCBxdWVyeSwgaGllcmFyY2h5RmlsdGVycykge1xuICAgICAgICAgICAgdmFyIGtleSA9IHRoaXMuZ2VuZXJhdGVLZXkoZG0uZGF0YVNvdXJjZS51cmwsIHF1ZXJ5KTtcbiAgICAgICAgICAgIHZhciBjYWNoZWRJdGVtcztcbiAgICAgICAgICAgIGNhY2hlZEl0ZW1zID0gdXRpbF8xLkRhdGFVdGlsLnBhcnNlLnBhcnNlSnNvbih3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5ndWlkSWQpKTtcbiAgICAgICAgICAgIHZhciBkYXRhID0gY2FjaGVkSXRlbXMgPyBjYWNoZWRJdGVtcy5yZXN1bHRzW2NhY2hlZEl0ZW1zLmtleXMuaW5kZXhPZihrZXkpXSA6IG51bGw7XG4gICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsICYmICF0aGlzLmlzQ3J1ZEFjdGlvbiAmJiAhdGhpcy5pc0luc2VydEFjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pc0NydWRBY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5pc0luc2VydEFjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZUFkYXB0b3IucHJvY2Vzc1F1ZXJ5LmFwcGx5KHRoaXMuY2FjaGVBZGFwdG9yLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICB9O1xuICAgICAgICBDYWNoZUFkYXB0b3IucHJvdG90eXBlLnByb2Nlc3NSZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhLCBkcywgcXVlcnksIHhociwgcmVxdWVzdCwgY2hhbmdlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnNlcnRBY3Rpb24gfHwgKHJlcXVlc3QgJiYgdGhpcy5jYWNoZUFkYXB0b3Iub3B0aW9ucy5iYXRjaCAmJlxuICAgICAgICAgICAgICAgIHV0aWxfMS5EYXRhVXRpbC5lbmRzV2l0aChyZXF1ZXN0LnVybCwgdGhpcy5jYWNoZUFkYXB0b3Iub3B0aW9ucy5iYXRjaCkgJiYgcmVxdWVzdC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdwb3N0JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZUFkYXB0b3IucHJvY2Vzc1Jlc3BvbnNlKGRhdGEsIGRzLCBxdWVyeSwgeGhyLCByZXF1ZXN0LCBjaGFuZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNhY2hlQWRhcHRvci5wcm9jZXNzUmVzcG9uc2UuYXBwbHkodGhpcy5jYWNoZUFkYXB0b3IsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB2YXIga2V5ID0gcXVlcnkgPyB0aGlzLmdlbmVyYXRlS2V5KGRzLmRhdGFTb3VyY2UudXJsLCBxdWVyeSkgOiBkcy5kYXRhU291cmNlLnVybDtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgICAgIG9iaiA9IHV0aWxfMS5EYXRhVXRpbC5wYXJzZS5wYXJzZUpzb24od2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuZ3VpZElkKSk7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBvYmoua2V5cy5pbmRleE9mKGtleSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgb2JqLnJlc3VsdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBvYmoua2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqLnJlc3VsdHNbb2JqLmtleXMucHVzaChrZXkpIC0gMV0gPSB7IGtleXM6IGtleSwgcmVzdWx0OiBkYXRhLnJlc3VsdCwgdGltZVN0YW1wOiBuZXcgRGF0ZSgpLCBjb3VudDogZGF0YS5jb3VudCB9O1xuICAgICAgICAgICAgd2hpbGUgKG9iai5yZXN1bHRzLmxlbmd0aCA+IHRoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgICBvYmoucmVzdWx0cy5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgb2JqLmtleXMuc3BsaWNlKDAsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuZ3VpZElkLCBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9O1xuICAgICAgICBDYWNoZUFkYXB0b3IucHJvdG90eXBlLmJlZm9yZVNlbmQgPSBmdW5jdGlvbiAoZG0sIHJlcXVlc3QsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBpZiAodXRpbF8xLkRhdGFVdGlsLmVuZHNXaXRoKHNldHRpbmdzLnVybCwgdGhpcy5jYWNoZUFkYXB0b3Iub3B0aW9ucy5iYXRjaCkgJiYgc2V0dGluZ3MudHlwZS50b0xvd2VyQ2FzZSgpID09PSAncG9zdCcpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsIHRoaXMuY2FjaGVBZGFwdG9yLm9wdGlvbnMubXVsdGlwYXJ0QWNjZXB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZG0uZGF0YVNvdXJjZS5jcm9zc0RvbWFpbikge1xuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgdGhpcy5jYWNoZUFkYXB0b3Iub3B0aW9ucy5hY2NlcHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBDYWNoZUFkYXB0b3IucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkbSwga2V5RmllbGQsIHZhbHVlLCB0YWJsZU5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNDcnVkQWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlQWRhcHRvci51cGRhdGUoZG0sIGtleUZpZWxkLCB2YWx1ZSwgdGFibGVOYW1lKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ2FjaGVBZGFwdG9yLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoZG0sIGRhdGEsIHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5pc0luc2VydEFjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZUFkYXB0b3IuaW5zZXJ0KGRtLCBkYXRhLCB0YWJsZU5hbWUpO1xuICAgICAgICB9O1xuICAgICAgICBDYWNoZUFkYXB0b3IucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChkbSwga2V5RmllbGQsIHZhbHVlLCB0YWJsZU5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNDcnVkQWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlQWRhcHRvci5yZW1vdmUoZG0sIGtleUZpZWxkLCB2YWx1ZSwgdGFibGVOYW1lKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ2FjaGVBZGFwdG9yLnByb3RvdHlwZS5iYXRjaFJlcXVlc3QgPSBmdW5jdGlvbiAoZG0sIGNoYW5nZXMsIGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlQWRhcHRvci5iYXRjaFJlcXVlc3QoZG0sIGNoYW5nZXMsIGUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ2FjaGVBZGFwdG9yO1xuICAgIH0oVXJsQWRhcHRvcikpO1xuICAgIGV4cG9ydHMuQ2FjaGVBZGFwdG9yID0gQ2FjaGVBZGFwdG9yO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hZGFwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9