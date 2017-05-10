define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base/util", "./util", "./query", "./adaptors"], function (require, exports, ej2_base_1, util_1, util_2, query_1, adaptors_1) {
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
});
