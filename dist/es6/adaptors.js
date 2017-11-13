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
import { merge, extend, isNullOrUndefined, setValue, getValue } from '@syncfusion/ej2-base';
import { DataUtil } from './util';
import { Query, Predicate } from './query';
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
export { Adaptor };
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
        var fn = DataUtil.aggregates[e.type];
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
            DataUtil.getFieldList(ds[0], e.fieldNames);
        }
        return ds.filter(function (obj) {
            for (var j = 0; j < e.fieldNames.length; j++) {
                if (e.comparer.call(obj, DataUtil.getObject(e.fieldNames[j], obj), e.searchKey, e.ignoreCase)) {
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
        var field = DataUtil.getValue(e.fieldName, query);
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
                if (DataUtil.endsWith(field[i], ' desc')) {
                    fnCompare = DataUtil.fnSort('descending');
                    field[i] = field[i].replace(' desc', '');
                }
                ds = DataUtil.sort(ds, field[i], fnCompare);
            }
            return ds;
        }
        return DataUtil.sort(ds, field, e.comparer);
    };
    JsonAdaptor.prototype.onGroup = function (ds, e, query) {
        if (!ds || !ds.length) {
            return ds;
        }
        var aggQuery = Query.filterQueries(query.queries, 'onAggregates');
        var agg = [];
        if (aggQuery.length) {
            var tmp = void 0;
            for (var i = 0; i < aggQuery.length; i++) {
                tmp = aggQuery[i].e;
                agg.push({ type: tmp.type, field: DataUtil.getValue(tmp.field, query) });
            }
        }
        return DataUtil.group(ds, DataUtil.getValue(e.fieldName, query), agg, null, null, e.comparer);
    };
    JsonAdaptor.prototype.onPage = function (ds, e, query) {
        var size = DataUtil.getValue(e.pageSize, query);
        var start = (DataUtil.getValue(e.pageIndex, query) - 1) * size;
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
        return ds.slice(DataUtil.getValue(e.start), DataUtil.getValue(e.end));
    };
    JsonAdaptor.prototype.onTake = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(0, DataUtil.getValue(e.nos));
    };
    JsonAdaptor.prototype.onSkip = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(DataUtil.getValue(e.nos));
    };
    JsonAdaptor.prototype.onSelect = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return DataUtil.select(ds, DataUtil.getValue(e.fieldNames));
    };
    JsonAdaptor.prototype.insert = function (dm, data, tableName, query, position) {
        if (isNullOrUndefined(position)) {
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
        return i < ds.length ? merge(ds[i], value) : null;
    };
    return JsonAdaptor;
}(Adaptor));
export { JsonAdaptor };
var UrlAdaptor = (function (_super) {
    __extends(UrlAdaptor, _super);
    function UrlAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UrlAdaptor.prototype.processQuery = function (dm, query, hierarchyFilters) {
        var queries = this.getQueryRequest(query);
        var singles = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        var params = query.params;
        var url = dm.dataSource.url;
        var temp;
        var skip;
        var take = null;
        var options = this.options;
        var request = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        if ('onPage' in singles) {
            temp = singles.onPage;
            skip = DataUtil.getValue(temp.pageIndex, query);
            take = DataUtil.getValue(temp.pageSize, query);
            skip = (skip - 1) * take;
        }
        else if ('onRange' in singles) {
            temp = singles.onRange;
            skip = temp.start;
            take = temp.end - temp.start;
        }
        for (var i = 0; i < queries.sorts.length; i++) {
            temp = DataUtil.getValue(queries.sorts[i].e.fieldName, query);
            request.sorts.push(DataUtil.callAdaptorFunction(this, 'onEachSort', { name: temp, direction: queries.sorts[i].e.direction }, query));
        }
        if (hierarchyFilters) {
            temp = this.getFiltersFrom(hierarchyFilters, query);
            if (temp) {
                request.filters.push(DataUtil.callAdaptorFunction(this, 'onEachWhere', temp.toJson(), query));
            }
        }
        for (var i = 0; i < queries.filters.length; i++) {
            request.filters.push(DataUtil.callAdaptorFunction(this, 'onEachWhere', queries.filters[i].e.toJson(), query));
            var keys_1 = typeof request.filters[i] === 'object' ? Object.keys(request.filters[i]) : [];
            for (var _i = 0, keys_2 = keys_1; _i < keys_2.length; _i++) {
                var prop = keys_2[_i];
                if (DataUtil.isNull((request)[prop])) {
                    delete request[prop];
                }
            }
        }
        for (var i = 0; i < queries.searches.length; i++) {
            temp = queries.searches[i].e;
            request.searches.push(DataUtil.callAdaptorFunction(this, 'onEachSearch', {
                fields: temp.fieldNames,
                operator: temp.operator,
                key: temp.searchKey,
                ignoreCase: temp.ignoreCase
            }, query));
        }
        for (var i = 0; i < queries.groups.length; i++) {
            request.groups.push(DataUtil.getValue(queries.groups[i].e.fieldName, query));
        }
        for (var i = 0; i < queries.aggregates.length; i++) {
            temp = queries.aggregates[i].e;
            request.aggregates.push({ type: temp.type, field: DataUtil.getValue(temp.field, query) });
        }
        var req = {};
        this.getRequestQuery(options, query, singles, request, req);
        DataUtil.callAdaptorFunction(this, 'addParams', { dm: dm, query: query, params: params, reqParams: req });
        var keys = Object.keys(req);
        for (var _a = 0, keys_3 = keys; _a < keys_3.length; _a++) {
            var prop = keys_3[_a];
            if (DataUtil.isNull(req[prop]) || req[prop] === '' || req[prop].length === 0) {
                delete req[prop];
            }
        }
        if (!(options.skip in req && options.take in req) && take !== null) {
            req[options.skip] = DataUtil.callAdaptorFunction(this, 'onSkip', skip, query);
            req[options.take] = DataUtil.callAdaptorFunction(this, 'onTake', take, query);
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
            DataUtil.callAdaptorFunction(this, 'onSelect', DataUtil.getValue(singles.onSelect.fieldNames, query), query) : '';
        req[options.count] = query.requiresCounts ? DataUtil.callAdaptorFunction(this, 'onCount', query.requiresCounts, query) : '';
        req[options.search] = request.searches.length ? DataUtil.callAdaptorFunction(this, 'onSearch', request.searches, query) : '';
        req[options.skip] = 'onSkip' in singles ?
            DataUtil.callAdaptorFunction(this, 'onSkip', DataUtil.getValue(singles.onSkip.nos, query), query) : '';
        req[options.take] = 'onTake' in singles ?
            DataUtil.callAdaptorFunction(this, 'onTake', DataUtil.getValue(singles.onTake.nos, query), query) : '';
        req[options.where] = request.filters.length || request.searches.length ?
            DataUtil.callAdaptorFunction(this, 'onWhere', request.filters, query) : '';
        req[options.sortBy] = request.sorts.length ? DataUtil.callAdaptorFunction(this, 'onSortBy', request.sorts, query) : '';
        req[options.group] = request.groups.length ? DataUtil.callAdaptorFunction(this, 'onGroup', request.groups, query) : '';
        req[options.aggregates] = request.aggregates.length ?
            DataUtil.callAdaptorFunction(this, 'onAggregates', request.aggregates, query) : '';
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
        return DataUtil.isNull(args.count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    };
    UrlAdaptor.prototype.onGroup = function (e) {
        this.pvt.groups = e;
        return e;
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
                value = DataUtil.getObject(pKey || prop, data[i]);
            }
            else {
                value = data[i];
            }
            predicats.push(new Predicate(key, 'equal', value));
        }
        return Predicate.or(predicats);
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
                fn = DataUtil.aggregates[agg[i].type];
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
                if (!isNullOrUndefined(groupDs)) {
                    groupDs = DataUtil.group(groupDs, groups[i]);
                }
                pData = DataUtil.group(pData, groups[i], pvt.aggregates, level, groupDs);
            }
            args.result = pData;
        }
        return args;
    };
    UrlAdaptor.prototype.getQueryRequest = function (query) {
        var req = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        req.sorts = Query.filterQueries(query.queries, 'onSortBy');
        req.groups = Query.filterQueries(query.queries, 'onGroup');
        req.filters = Query.filterQueries(query.queries, 'onWhere');
        req.searches = Query.filterQueries(query.queries, 'onSearch');
        req.aggregates = Query.filterQueries(query.queries, 'onAggregates');
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
export { UrlAdaptor };
var ODataAdaptor = (function (_super) {
    __extends(ODataAdaptor, _super);
    function ODataAdaptor() {
        var _this = _super.call(this) || this;
        _this.options = extend({}, _this.options, {
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
        _this.getModuleName = getValue('getModulename', _this);
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
            val = 'datetime\'' + DataUtil.parse.replacer(val) + '\'';
        }
        if (type === 'string') {
            val = '\'' + val + '\'';
            if (requiresCast) {
                field = 'cast(' + field + ', \'Edm.String\')';
            }
            if (DataUtil.parse.isGuid(val)) {
                guid = 'guid';
            }
            if (predicate.ignoreCase) {
                if (!guid) {
                    field = 'tolower(' + field + ')';
                }
                val = val.toLowerCase();
            }
        }
        operator = DataUtil.odBiOperator[predicate.operator];
        if (operator) {
            returnValue += field;
            returnValue += operator;
            if (guid) {
                returnValue += guid;
            }
            return returnValue + val;
        }
        if (!isNullOrUndefined(this.getModuleName)) {
            if (this.getModuleName() === 'ODataV4Adaptor') {
                operator = DataUtil.odv4UniOperator[predicate.operator];
            }
        }
        else {
            operator = DataUtil.odUniOperator[predicate.operator];
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
            DataUtil.throwError('Query() - Search : oData search requires list of field names to search');
        }
        var filter = this.pvt.search || [];
        for (var i = 0; i < e.fields.length; i++) {
            filter.push(new Predicate(e.fields[i], e.operator, e.key, e.ignoreCase));
        }
        this.pvt.search = filter;
    };
    ODataAdaptor.prototype.onSearch = function (e) {
        this.pvt.search = Predicate.or(this.pvt.search);
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
        return [];
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
        if (DataUtil.endsWith(settings.url, this.options.batch) && settings.type.toLowerCase() === 'post') {
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
        if (!isNullOrUndefined(data.d)) {
            var dataCopy = (query && query.requiresCounts) ? data.d.results : data.d;
            var metaData = '__metadata';
            if (!isNullOrUndefined(dataCopy)) {
                for (var i = 0; i < dataCopy.length; i++) {
                    if (!isNullOrUndefined(dataCopy[i][metaData])) {
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
        return DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
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
        var initialGuid = e.guid = DataUtil.getGuid(this.options.batchPre);
        var url = dm.dataSource.url.replace(/\/*$/, '/' + this.options.batch);
        var args = {
            url: e.url,
            key: e.key,
            cid: 1,
            cSet: DataUtil.getGuid(this.options.changeSet)
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
        if (request && this.options.batch && DataUtil.endsWith(request.url, this.options.batch) && request.type.toLowerCase() === 'post') {
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
                    jsonObj = DataUtil.parse.parseJson(/^\{.+\}/m.exec(data[i])[0]);
                    extend({}, changes.addedRecords[cIdx], this.processResponse(jsonObj));
                }
            }
            return changes;
        }
        return null;
    };
    return ODataAdaptor;
}(UrlAdaptor));
export { ODataAdaptor };
var ODataV4Adaptor = (function (_super) {
    __extends(ODataV4Adaptor, _super);
    function ODataV4Adaptor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = extend({}, _this.options, {
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
        return DataUtil.isNull(count) ? args.result : { result: args.result, count: count, aggregates: args.aggregates };
    };
    return ODataV4Adaptor;
}(ODataAdaptor));
export { ODataV4Adaptor };
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
                if (!DataUtil.isNull(data.Count)) {
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
        return DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    };
    return WebApiAdaptor;
}(ODataAdaptor));
export { WebApiAdaptor };
var WebMethodAdaptor = (function (_super) {
    __extends(WebMethodAdaptor, _super);
    function WebMethodAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebMethodAdaptor.prototype.processQuery = function (dm, query, hierarchyFilters) {
        var obj = new UrlAdaptor().processQuery(dm, query, hierarchyFilters);
        var getData = 'data';
        var data = DataUtil.parse.parseJson(obj[getData]);
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
export { WebMethodAdaptor };
var RemoteSaveAdaptor = (function (_super) {
    __extends(RemoteSaveAdaptor, _super);
    function RemoteSaveAdaptor() {
        var _this = _super.call(this) || this;
        setValue('beforeSend', UrlAdaptor.prototype.beforeSend, _this);
        setValue('insert', UrlAdaptor.prototype.insert, _this);
        setValue('update', UrlAdaptor.prototype.update, _this);
        setValue('remove', UrlAdaptor.prototype.remove, _this);
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
export { RemoteSaveAdaptor };
var CacheAdaptor = (function (_super) {
    __extends(CacheAdaptor, _super);
    function CacheAdaptor(adaptor, timeStamp, pageSize) {
        var _this = _super.call(this) || this;
        _this.isCrudAction = false;
        _this.isInsertAction = false;
        if (!isNullOrUndefined(adaptor)) {
            _this.cacheAdaptor = adaptor;
        }
        _this.pageSize = pageSize;
        _this.guidId = DataUtil.getGuid('cacheAdaptor');
        var obj = { keys: [], results: [] };
        window.localStorage.setItem(_this.guidId, JSON.stringify(obj));
        var guid = _this.guidId;
        if (!isNullOrUndefined(timeStamp)) {
            setInterval(function () {
                var data;
                data = DataUtil.parse.parseJson(window.localStorage.getItem(guid));
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
        var singles = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
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
        cachedItems = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
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
            DataUtil.endsWith(request.url, this.cacheAdaptor.options.batch) && request.type.toLowerCase() === 'post')) {
            return this.cacheAdaptor.processResponse(data, ds, query, xhr, request, changes);
        }
        data = this.cacheAdaptor.processResponse.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
        var key = query ? this.generateKey(ds.dataSource.url, query) : ds.dataSource.url;
        var obj = {};
        obj = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
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
        if (DataUtil.endsWith(settings.url, this.cacheAdaptor.options.batch) && settings.type.toLowerCase() === 'post') {
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
export { CacheAdaptor };
