import { Ajax } from '@syncfusion/ej2-base';
import { merge, extend, isNullOrUndefined, setValue } from '@syncfusion/ej2-base';
import { DataUtil, Aggregates } from './util';
import { DataManager, DataOptions } from './manager';
import { Query, Predicate, QueryOptions, QueryList, ParamOption } from './query';
/**
 * Adaptors are specific data source type aware interfaces that are used by DataManager to communicate with DataSource.
 * This is the base adaptor class that other adaptors can extend.
 * @hidden
 */
export class Adaptor {
    /**
     * Specifies the datasource option.
     * @default null
     */
    public dataSource: DataOptions;

    /**
     * It contains the datamanager operations list like group, searches, etc.,
     * @default null
     * @hidden
     */
    public pvt: PvtOptions;

    /**
     * Constructor for Adaptor class
     * @param  {DataOptions} ds?
     * @hidden
     * @returns aggregates
     */
    constructor(ds?: DataOptions) {
        this.dataSource = ds;
        this.pvt = {};
    }

    // common options for all the adaptors 
    protected options: RemoteOptions = {
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

    /**
     * Returns the data from the query processing.
     * @param  {Object} data
     * @param  {DataOptions} ds?
     * @param  {Query} query?
     * @param  {XMLHttpRequest} xhr?
     * @returns Object
     */
    public processResponse(data: Object, ds?: DataOptions, query?: Query, xhr?: XMLHttpRequest): Object {
        return data;
    }

    /**
     * Specifies the type of adaptor.
     * @default Adaptor
     */
    public type: Object = Adaptor;
}

/**
 * JsonAdaptor is used to process JSON data. It contains methods to process the given JSON data based on the queries.
 * @hidden
 */
export class JsonAdaptor extends Adaptor {

    /**
     * Process the JSON data based on the provided queries. 
     * @param  {DataManager} dataManager
     * @param  {Query} query
     * @returns Object
     */
    public processQuery(dataManager: DataManager, query: Query): Object {
        let result: Object = dataManager.dataSource.json.slice(0);
        let count: number = (result as Object[]).length;
        let countFlg: boolean = true;
        let ret: Object[];
        let key: QueryOptions;
        let agg: { [key: string]: Object } = {};
        for (let i: number = 0; i < query.queries.length; i++) {
            key = query.queries[i];
            ret = this[key.fn].call(this, result, key.e, query);
            if (key.fn === 'onAggregates') {
                agg[key.e.field + ' - ' + key.e.type] = ret;
            } else {
                result = ret !== undefined ? ret : result;
            }
            if (key.fn === 'onPage' || key.fn === 'onSkip' || key.fn === 'onTake' || key.fn === 'onRange') {
                countFlg = false;
            }
            if (countFlg) {
                count = (result as Object[]).length;
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
    }

    /**
     * Performs batch update in the JSON array which add, remove and update records. 
     * @param  {DataManager} dm
     * @param  {CrudOptions} changes
     * @param  {RemoteArgs} e
     */
    public batchRequest(dm: DataManager, changes: CrudOptions, e: RemoteArgs): CrudOptions {
        let i: number;
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
    }

    /**
     * Performs filter operation with the given data and where query.
     * @param  {Object[]} ds
     * @param  {{validate:Function}} e
     */
    public onWhere(ds: Object[], e: { validate: Function }): Object[] {
        if (!ds || !ds.length) { return ds; }
        return ds.filter((obj: Object) => {
            if (e) { return e.validate(obj); }
        });
    }

    /**
     * Returns aggregate function based on the aggregate type.
     * @param  {Object[]} ds
     * @param  {{field:string} e
     * @param  {string}} type
     */
    public onAggregates(ds: Object[], e: { field: string, type: string }): Function {
        let fn: Function = DataUtil.aggregates[e.type] as Function;
        if (!ds || !fn || ds.length === 0) { return null; }
        return fn(ds, e.field);
    }

    /**
     * Performs search operation based on the given query.
     * @param  {Object[]} ds
     * @param  {QueryOptions} e
     */
    public onSearch(ds: Object[], e: QueryOptions): Object[] {
        if (!ds || !ds.length) { return ds; }

        if (e.fieldNames.length === 0) {
            DataUtil.getFieldList(ds[0], <string[]>e.fieldNames);
        }

        return ds.filter((obj: Object): boolean => {
            for (let j: number = 0; j < e.fieldNames.length; j++) {
                if ((<Function>e.comparer).call(obj, DataUtil.getObject(e.fieldNames[j], obj), e.searchKey, e.ignoreCase)) {
                    return true;
                }
            }
            return false;
        });
    }

    /**
     * Sort the data with given direction and field.
     * @param  {Object[]} ds
     * @param  {{comparer:(a:Object} e
     * @param  {Object} b
     */
    public onSortBy(ds: Object[], e: { comparer: (a: Object, b: Object) => number, fieldName: string }, query: Query): Object[] {
        if (!ds || !ds.length) { return ds; }
        let fnCompare: Function;
        let field: string[] | string = <string[] | string>DataUtil.getValue(e.fieldName, query);
        if (!field) {
            return ds.sort(e.comparer);
        }

        if (field instanceof Array) {
            field = field.slice(0);

            for (let i: number = field.length - 1; i >= 0; i--) {
                if (!field[i]) { continue; }
                fnCompare = e.comparer;

                if (DataUtil.endsWith(field[i], ' desc')) {
                    fnCompare = DataUtil.fnSort('descending');
                    field[i] = field[i].replace(' desc', '');
                }

                ds = DataUtil.sort(ds, field[i], fnCompare);
            }
            return ds;
        }
        return DataUtil.sort(ds, <string>field, e.comparer);
    }

    /**
     * Group the data based on the given query.
     * @param  {Object[]} ds
     * @param  {QueryOptions} e
     * @param  {Query} query
     */
    public onGroup(ds: Object[], e: QueryOptions, query: Query): Object[] {
        if (!ds || !ds.length) { return ds; }
        let aggQuery: QueryOptions[] = Query.filterQueries(query.queries, 'onAggregates') as QueryOptions[];
        let agg: Object[] = [];
        if (aggQuery.length) {
            let tmp: QueryOptions;
            for (let i: number = 0; i < aggQuery.length; i++) {
                tmp = aggQuery[i].e;
                agg.push({ type: tmp.type, field: DataUtil.getValue(tmp.field, query) });
            }
        }
        return DataUtil.group(ds, DataUtil.getValue(e.fieldName, query), agg);
    }

    /**
     * Retrieves records based on the given page index and size.
     * @param  {Object[]} ds
     * @param  {{pageSize:number} e
     * @param  {number}} pageIndex
     * @param  {Query} query
     */
    public onPage(ds: Object[], e: { pageSize: number, pageIndex: number }, query: Query): Object[] {
        let size: number = DataUtil.getValue(e.pageSize, query);
        let start: number = (DataUtil.getValue(e.pageIndex, query) - 1) * size;
        let end: number = start + size;
        if (!ds || !ds.length) { return ds; }
        return ds.slice(start, end);
    }

    /**
     * Retrieves records based on the given start and end index from query. 
     * @param  {Object[]} ds
     * @param  {{start:number} e
     * @param  {number}} end
     */
    public onRange(ds: Object[], e: { start: number, end: number }): Object[] {
        if (!ds || !ds.length) { return ds; }
        return ds.slice(DataUtil.getValue(e.start), DataUtil.getValue(e.end));
    }

    /**
     * Picks the given count of records from the top of the datasource.
     * @param  {Object[]} ds
     * @param  {{nos:number}} e
     */
    public onTake(ds: Object[], e: { nos: number }): Object[] {
        if (!ds || !ds.length) { return ds; }
        return ds.slice(0, DataUtil.getValue(e.nos));
    }

    /**
     * Skips the given count of records from the data source.
     * @param  {Object[]} ds
     * @param  {{nos:number}} e
     */
    public onSkip(ds: Object[], e: { nos: number }): Object[] {
        if (!ds || !ds.length) { return ds; }
        return ds.slice(DataUtil.getValue(e.nos));
    }

    /**
     * Selects specified columns from the data source.
     * @param  {Object[]} ds
     * @param  {{fieldNames:string}} e
     */
    public onSelect(ds: Object[], e: { fieldNames: string[] | Function }): Object[] {
        if (!ds || !ds.length) { return ds; }
        return DataUtil.select(ds, DataUtil.getValue<string[]>(e.fieldNames));
    }

    /**
     * Inserts new record in the table.
     * @param  {DataManager} dm
     * @param  {Object} data
     * @param  {number}  position
     */
    public insert(dm: DataManager, data: Object, position?: number ): Object {
        if (isNullOrUndefined(position)) {
            return dm.dataSource.json.push(data);
        } else {
            return dm.dataSource.json.splice(position, 0, data);
        }
    }

    /**
     * Remove the data from the dataSource based on the key field value.
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {Object} value
     * @param  {string} tableName?
     * @returns null
     */
    public remove(dm: DataManager, keyField: string, value: Object, tableName?: string): Object[] {
        let ds: Object[] = dm.dataSource.json;
        let i: number;
        if (typeof value === 'object') {
            value = (value as { [key: string]: Object })[keyField];
        }
        for (i = 0; i < ds.length; i++) {
            if ((ds[i] as { [key: string]: Object })[keyField] === value) { break; }
        }

        return i !== ds.length ? ds.splice(i, 1) : null;
    }

    /**
     * Updates existing record and saves the changes to the table.
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {Object} value
     * @param  {string} tableName?
     * @returns null
     */
    public update(dm: DataManager, keyField: string, value: Object, tableName?: string): void {
        let ds: Object[] = dm.dataSource.json;
        let i: number;
        let key: string = (value as { [key: string]: string })[keyField];

        for (i = 0; i < ds.length; i++) {
            if ((ds[i] as { [key: string]: string })[keyField] === key) { break; }
        }
        return i < ds.length ? merge(ds[i], value) : null;
    }
}

/**
 * URL Adaptor of DataManager can be used when you are required to use remote service to retrieve data. 
 * It interacts with server-side for all DataManager Queries and CRUD operations.
 * @hidden
 */
export class UrlAdaptor extends Adaptor {

    /**
     * Process the query to generate request body. 
     * @param  {DataManager} dm
     * @param  {Query} query
     * @param  {Object[]} hierarchyFilters?
     * @returns p
     */
    public processQuery(dm: DataManager, query: Query, hierarchyFilters?: Object[]): Object {
        let queries: Requests = this.getQueryRequest(query);
        let singles: QueryList = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        let params: ParamOption[] = query.params;
        let url: string = dm.dataSource.url;
        let temp: QueryOptions;
        let skip: number;
        let take: number = null;
        let options: RemoteOptions = this.options;
        let request: Requests = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        // calc Paging & Range
        if ('onPage' in singles) {
            temp = singles.onPage;
            skip = DataUtil.getValue(temp.pageIndex, query);
            take = DataUtil.getValue(temp.pageSize, query);
            skip = (skip - 1) * take;
        } else if ('onRange' in singles) {
            temp = singles.onRange;
            skip = temp.start;
            take = temp.end - temp.start;
        }
        // Sorting
        for (let i: number = 0; i < queries.sorts.length; i++) {
            temp = DataUtil.getValue(queries.sorts[i].e.fieldName, query) as QueryOptions;
            request.sorts.push(DataUtil.callAdaptorFunction(
                this, 'onEachSort', { name: temp, direction: queries.sorts[i].e.direction }, query));
        }
        // hierarchy
        if (hierarchyFilters) {
            temp = (<Object>this.getFiltersFrom(hierarchyFilters, query));
            if (temp) {
                request.filters.push(DataUtil.callAdaptorFunction(this, 'onEachWhere', (<Predicate>temp).toJson(), query));
            }
        }
        // Filters
        for (let i: number = 0; i < queries.filters.length; i++) {
            request.filters.push(DataUtil.callAdaptorFunction(this, 'onEachWhere', (<Predicate>queries.filters[i].e).toJson(), query));
            let keys: string[] = typeof request.filters[i] === 'object' ? Object.keys(request.filters[i]) : [];
            for (let prop of keys) {
                if (DataUtil.isNull((request)[prop])) {
                    delete request[prop];
                }
            }
        }
        // Searches
        for (let i: number = 0; i < queries.searches.length; i++) {
            temp = queries.searches[i].e;
            request.searches.push(DataUtil.callAdaptorFunction(
                this, 'onEachSearch', {
                    fields: temp.fieldNames,
                    operator: temp.operator,
                    key: temp.searchKey,
                    ignoreCase: temp.ignoreCase
                },
                query));
        }
        // Grouping
        for (let i: number = 0; i < queries.groups.length; i++) {
            request.groups.push(DataUtil.getValue(queries.groups[i].e.fieldName, query) as QueryOptions);
        }
        // aggregates
        for (let i: number = 0; i < queries.aggregates.length; i++) {
            temp = queries.aggregates[i].e;
            request.aggregates.push({ type: temp.type, field: DataUtil.getValue(temp.field, query) });
        }
        let req: { [key: string]: Object } = {};
        this.getRequestQuery(options, query, singles, request, req);
        // Params
        DataUtil.callAdaptorFunction(this, 'addParams', { dm: dm, query: query, params: params, reqParams: req });
        // cleanup
        let keys: string[] = Object.keys(req);
        for (let prop of keys) {
            if (DataUtil.isNull(req[prop]) || req[prop] === '' || (<Object[]>req[prop]).length === 0) {
                delete req[prop];
            }
        }
        if (!(options.skip in req && options.take in req) && take !== null) {
            req[options.skip] = DataUtil.callAdaptorFunction(this, 'onSkip', skip, query);
            req[options.take] = DataUtil.callAdaptorFunction(this, 'onTake', take, query);
        }
        let p: PvtOptions = this.pvt;
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
        temp = this.convertToQueryString(req, query, dm) as QueryOptions;
        temp = (dm.dataSource.url.indexOf('?') !== -1 ? '&' : '/') + temp as QueryOptions;
        return {
            type: 'GET', url: (<string>temp).length ? url.replace(/\/*$/, <string>temp) : url, pvtData: p
        };
    }

    private getRequestQuery(
        options: RemoteOptions, query: Query, singles: QueryList, request: Requests, request1: { [key: string]: Object }): void {

        let param: string = 'param';
        let req: { [key: string]: Object } = request1;
        req[options.from] = query.fromTable;
        if (options.expand) { req[options.expand] = query.expands; }
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
    }

    /**
     * Convert the object from processQuery to string which can be added query string.
     * @param  {Object} req
     * @param  {Query} query
     * @param  {DataManager} dm
     */
    public convertToQueryString(request: Object, query: Query, dm: DataManager): string {
        return '';
        // this needs to be overridden
    }

    /**
     * Return the data from the data manager processing.
     * @param  {DataResult} data
     * @param  {DataOptions} ds?
     * @param  {Query} query?
     * @param  {XMLHttpRequest} xhr?
     * @param  {Object} request?
     * @param  {CrudOptions} changes?
     */
    public processResponse(
        data: DataResult, ds?: DataOptions, query?: Query, xhr?: XMLHttpRequest, request?: Object, changes?: CrudOptions): DataResult {
        let requests: { pvtData?: Object, data?: string } = request;
        let pvt: PvtOptions = requests.pvtData || {};
        let groupDs: Object[] = data.groupDs;
        if (xhr && xhr.getResponseHeader('Content-Type') &&
            xhr.getResponseHeader('Content-Type').indexOf('xml') !== -1) {
            return (query.requiresCounts ? { result: [], count: 0 } : []) as DataResult;
        }
        let d: { action: string } = JSON.parse(requests.data);
        if (d && d.action === 'batch' && data.addedRecords) {
            changes.addedRecords = data.addedRecords;
            return changes;
        }
        if (data.d) {
            data = data.d;
        }
        let args: DataResult = {};
        if ('count' in data) { args.count = data.count; }
        args.result = data.result ? data.result : data;

        this.getAggregateResult(pvt, data, args, groupDs);

        return DataUtil.isNull(args.count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    }

    /**
     * Add the group query to the adaptor`s option.
     * @param  {Object[]} e
     * @returns void
     */
    public onGroup(e: Object[]): void {
        this.pvt.groups = e;
    }

    /**
     * Add the aggregate query to the adaptor`s option.
     * @param  {Aggregates[]} e
     * @returns void
     */
    public onAggregates(e: Aggregates[]): void {
        this.pvt.aggregates = e;
    }

    /**
     * Prepare the request body based on the newly added, removed and updated records.
     * The result is used by the batch request. 
     * @param  {DataManager} dm
     * @param  {CrudOptions} changes
     * @param  {Object} e
     */
    public batchRequest(dm: DataManager, changes: CrudOptions, e: Object): Object {
        let url: string;
        let key: string;
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
    }

    /**
     * Method will trigger before send the request to server side. 
     * Used to set the custom header or modify the request options. 
     * @param  {DataManager} dm
     * @param  {XMLHttpRequest} request
     * @returns void
     */
    public beforeSend(dm: DataManager, request: XMLHttpRequest): void {
        // need to extend this method
    }

    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     * @param  {DataManager} dm
     * @param  {Object} data
     * @param  {string} tableName
     */
    public insert(dm: DataManager, data: Object, tableName: string): Object {
        return {
            url: dm.dataSource.insertUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify({
                value: data,
                table: tableName,
                action: 'insert'
            })
        };
    }

    /**
     * Prepare and return request body which is used to remove record from the table.
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {number|string} value
     * @param  {string} tableName
     */
    public remove(dm: DataManager, keyField: string, value: number | string, tableName: string): Object {
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
    }

    /**
     * Prepare and return request body which is used to update record.
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {Object} value
     * @param  {string} tableName
     */
    public update(dm: DataManager, keyField: string, value: Object, tableName: string): Object {
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
    }

    /**
     * To generate the predicate based on the filtered query.
     * @param  {Object[]|string[]|number[]} data
     * @param  {Query} query
     * @hidden
     */
    public getFiltersFrom(data: Object[] | string[] | number[], query: Query): Predicate {
        let key: string = query.fKey;
        let value: string | number | boolean;
        let prop: string = key;
        let pKey: string = query.key;
        let predicats: Predicate[] = [];

        if (typeof data[0] !== 'object') { prop = null; }

        for (let i: number = 0; i < data.length; i++) {
            if (typeof data[0] === 'object') {
                value = <string | number>DataUtil.getObject(pKey || prop, data[i]);
            } else {
                value = (<string[] | number[]>data)[i];
            }
            predicats.push(new Predicate(key, 'equal', value));
        }

        return Predicate.or(predicats);
    }

    protected getAggregateResult(pvt: PvtOptions, data: DataResult, args: DataResult, groupDs?: Object[]): DataResult {
        let pData: DataResult = data;
        if (data && data.result) { pData = data.result; }
        if (pvt && pvt.aggregates && pvt.aggregates.length) {
            let agg: Aggregates[] = pvt.aggregates;
            let fn: Function;
            let aggregateData: DataResult = pData;
            let res: { [key: string]: Aggregates } = {};
            if (data.aggregate) { aggregateData = data.aggregate; }
            for (let i: number = 0; i < agg.length; i++) {
                fn = DataUtil.aggregates[agg[i].type];
                if (fn) {
                    res[agg[i].field + ' - ' + agg[i].type] = fn(aggregateData, agg[i].field);
                }
            }
            args.aggregates = res;
        }

        if (pvt && pvt.groups && pvt.groups.length) {
            let groups: string[] = (<string[]>pvt.groups);
            for (let i: number = 0; i < groups.length; i++) {
                let level: number = null;
                if (!isNullOrUndefined(groupDs)) {
                    groupDs = DataUtil.group(groupDs, groups[i]);
                }
                pData = DataUtil.group(<Object[]>pData, groups[i], pvt.aggregates, level, groupDs) as DataResult;
            }
            args.result = pData;
        }
        return args;
    }

    protected getQueryRequest(query: Query): Requests {
        let req: Requests = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        req.sorts = Query.filterQueries(query.queries, 'onSortBy');
        req.groups = Query.filterQueries(query.queries, 'onGroup');
        req.filters = Query.filterQueries(query.queries, 'onWhere');
        req.searches = Query.filterQueries(query.queries, 'onSearch');
        req.aggregates = Query.filterQueries(query.queries, 'onAggregates');
        return req;
    }

    private addParams(options: { dm: DataManager, query: Query, params: ParamOption[], reqParams: { [key: string]: Object } }): void {
        let req: { params: Object } = options.reqParams as { params: Object };
        if (options.params.length) {
            req.params = {};
        }
        for (let tmp of options.params) {
            if (req[tmp.key]) {
                throw new Error('Query() - addParams: Custom Param is conflicting other request arguments');
            }
            req[tmp.key] = tmp.value;
            if (tmp.fn) {
                req[tmp.key] = tmp.fn.call(options.query, tmp.key, options.query, options.dm);
            }
            req.params[tmp.key] = req[tmp.key];
        }
    }

}

/**
 * OData Adaptor that is extended from URL Adaptor, is used for consuming data through OData Service. 
 * @hidden
 */
export class ODataAdaptor extends UrlAdaptor {

    // options replaced the default adaptor options
    protected options: RemoteOptions = extend({}, this.options, {
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

    /**
     * Generate request string based on the filter criteria from query.
     * @param  {Predicate} pred
     * @param  {boolean} requiresCast?
     */
    public onPredicate(predicate: Predicate, query: Query | boolean, requiresCast?: boolean): string {
        let returnValue: string = '';
        let operator: string;
        let guid: string;
        let val: string | Date = <string | Date>predicate.value;
        let type: string = typeof val;
        let field: string = predicate.field ? ODataAdaptor.getField(predicate.field) : null;

        if (val instanceof Date) {
            val = 'datetime\'' + DataUtil.parse.replacer(<Date>val) + '\'';
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
                if (!guid) { field = 'tolower(' + field + ')'; }
                val = (<string>val).toLowerCase();
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

        operator = DataUtil.odUniOperator[predicate.operator];

        if (operator === 'substringof') {
            let temp: string = <string>val;
            val = field;
            field = temp;
        }

        returnValue += operator + '(';
        returnValue += field + ',';
        if (guid) { returnValue += guid; }
        returnValue += val + ')';

        return returnValue;
    }

    /**
     * Generate request string based on the multiple filter criteria from query.
     * @param  {Predicate} pred
     * @param  {boolean} requiresCast?
     */
    public onComplexPredicate(predicate: Predicate, query: Query, requiresCast?: boolean): string {
        let res: string[] = [];
        for (let i: number = 0; i < predicate.predicates.length; i++) {
            res.push('(' + this.onEachWhere(predicate.predicates[i], query, requiresCast) + ')');
        }
        return res.join(' ' + predicate.condition + ' ');
    }

    /**
     * Generate query string based on the multiple filter criteria from query.
     * @param  {Predicate} filter
     * @param  {boolean} requiresCast?
     */
    public onEachWhere(filter: Predicate, query: Query, requiresCast?: boolean): string {
        return filter.isComplex ? this.onComplexPredicate(filter, query, requiresCast) : this.onPredicate(filter, query, requiresCast);
    }

    /**
     * Generate query string based on the multiple filter criteria from query.
     * @param  {string[]} filters
     */
    public onWhere(filters: string[]): string {
        if (this.pvt.search) {
            filters.push(this.onEachWhere((<Predicate>this.pvt.search), null, true));
        }
        return filters.join(' and ');
    }

    /**
     * Generate query string based on the multiple search criteria from query.
     * @param  {{fields:string[]} e
     * @param  {string} operator
     * @param  {string} key
     * @param  {boolean}} ignoreCase
     */
    public onEachSearch(e: { fields: string[], operator: string, key: string, ignoreCase: boolean }): void {
        if (e.fields && e.fields.length === 0) {
            DataUtil.throwError('Query() - Search : oData search requires list of field names to search');
        }

        let filter: Object[] = (<Object[]>this.pvt.search) || [];
        for (let i: number = 0; i < e.fields.length; i++) {
            filter.push(new Predicate(e.fields[i], e.operator, e.key, e.ignoreCase));
        }
        this.pvt.search = filter;
    }

    /**
     * Generate query string based on the search criteria from query.
     * @param  {Object} e
     */
    public onSearch(e: Object): string {
        this.pvt.search = Predicate.or(this.pvt.search);
        return '';
    }

    /**
     * Generate query string based on multiple sort criteria from query.
     * @param  {QueryOptions} e
     */
    public onEachSort(e: QueryOptions): string {
        let res: string[] = [];
        if (e.name instanceof Array) {
            for (let i: number = 0; i < e.name.length; i++) {
                res.push(ODataAdaptor.getField(e.name[i]) + (e.direction === 'descending' ? ' desc' : ''));
            }
        } else {
            res.push(ODataAdaptor.getField(<string>e.name) + (e.direction === 'descending' ? ' desc' : ''));
        }
        return res.join(',');
    }

    /**
     * Returns sort query string.
     * @param  {string[]} e
     */
    public onSortBy(e: string[]): string {
        return e.reverse().join(',');
    }

    /**
     * Adds the group query to the adaptor option.
     * @param  {Object[]} e
     * @returns string
     */
    public onGroup(e: Object[]): string {
        this.pvt.groups = e;
        return '';
    }

    /**
     * Returns the select query string.
     * @param  {string[]} e
     */
    public onSelect(e: string[]): string {
        for (let i: number = 0; i < e.length; i++) {
            e[i] = ODataAdaptor.getField(e[i]);
        }
        return e.join(',');
    }

    /**
     * Add the aggregate query to the adaptor option.
     * @param  {Object[]} e
     * @returns string
     */
    public onAggregates(e: Object[]): string {
        this.pvt.aggregates = e;
        return '';
    }

    /**
     * Returns the query string which requests total count from the data source.
     * @param  {boolean} e
     * @returns string
     */
    public onCount(e: boolean): string {
        return e === true ? 'allpages' : '';
    }

    /**
     * Method will trigger before send the request to server side. 
     * Used to set the custom header or modify the request options.
     * @param  {DataManager} dm
     * @param  {XMLHttpRequest} request
     * @param  {Ajax} settings?
     */
    public beforeSend(dm: DataManager, request: XMLHttpRequest, settings?: Ajax): void {
        if (DataUtil.endsWith(settings.url, this.options.batch) && settings.type.toLowerCase() === 'post') {
            request.setRequestHeader('Accept', this.options.multipartAccept);
            request.setRequestHeader('DataServiceVersion', '2.0');
            request.overrideMimeType('text/plain; charset=x-user-defined');
        } else {
            request.setRequestHeader('Accept', this.options.accept);
        }
        request.setRequestHeader('DataServiceVersion', '2.0');
        request.setRequestHeader('MaxDataServiceVersion', '2.0');
    }

    /**
     * Returns the data from the query processing.
     * @param  {DataResult} data
     * @param  {DataOptions} ds?
     * @param  {Query} query?
     * @param  {XMLHttpRequest} xhr?
     * @param  {Ajax} request?
     * @param  {CrudOptions} changes?
     * @returns aggregateResult
     */
    public processResponse(
        data: DataResult, ds?: DataOptions, query?: Query, xhr?: XMLHttpRequest, request?: Ajax, changes?: CrudOptions): Object {
        let pvtData: string = 'pvtData';
        if (!isNullOrUndefined(data.d)) {
            let dataCopy: DataResult[] = (query && query.requiresCounts) ? data.d.results : (<DataResult[]>data.d);
            let metaData: string = '__metadata';
            if (!isNullOrUndefined(dataCopy)) {
                for (let i: number = 0; i < dataCopy.length; i++) {
                    if (!isNullOrUndefined(dataCopy[i][metaData])) {
                        delete dataCopy[i][metaData];
                    }
                }
            }
        }
        let pvt: PvtOptions = request && request[pvtData];

        let emptyAndBatch: CrudOptions | DataResult = this.processBatchResponse(data, query, xhr, request, changes);
        if (emptyAndBatch) {
            return emptyAndBatch;
        }

        let versionCheck: string = xhr && request.getResponseHeader('DataServiceVersion');
        let count: number = null;
        let version: number = (versionCheck && parseInt(versionCheck, 10)) || 2;

        if (query && query.requiresCounts) {
            let oDataCount: string = '__count';
            if (data[oDataCount] || data['odata.count']) {
                count = data[oDataCount] || data['odata.count'];
            }
            if (data.d) { data = data.d; }
            if (data[oDataCount] || data['odata.count']) {
                count = data[oDataCount] || data['odata.count'];
            }
        }

        if (version === 3 && data.value) { data = data.value; }
        if (data.d) { data = data.d; }
        if (version < 3 && data.results) { data = data.results as DataResult; }

        let args: DataResult = {};
        args.count = count;
        args.result = data;
        this.getAggregateResult(pvt, data, args);

        return DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    }

    /**
     * Converts the request object to query string.
     * @param  {Object} req
     * @param  {Query} query
     * @param  {DataManager} dm
     * @returns tableName
     */
    public convertToQueryString(request: Object, query: Query, dm: DataManager): string {
        let res: string[] | string = [];
        let table: string = 'table';
        let tableName: string = request[table] || '';
        let format: string = '$format';
        delete request[table];

        if (dm.dataSource.requiresFormat) {
            request[format] = 'json';
        }
        let keys: string[] = Object.keys(request);
        for (let prop of keys) {
            (<string[]>res).push(prop + '=' + request[prop]);
        }
        res = (<string[]>res).join('&');

        if (dm.dataSource.url && dm.dataSource.url.indexOf('?') !== -1 && !tableName) {
            return (<string>res);
        }

        return res.length ? tableName + '?' + res : tableName || '';
    }

    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     * @param  {DataManager} dm
     * @param  {Object} data
     * @param  {string} tableName?
     */
    public insert(dm: DataManager, data: Object, tableName?: string): Object {
        return {
            url: dm.dataSource.url.replace(/\/*$/, tableName ? '/' + tableName : ''),
            data: JSON.stringify(data)
        };
    }

    /**
     * Prepare and return request body which is used to remove record from the table.
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {number} value
     * @param  {string} tableName?
     */
    public remove(dm: DataManager, keyField: string, value: number, tableName?: string): Object {
        return {
            type: 'DELETE',
            url: dm.dataSource.url.replace(/\/*$/, tableName ? '/' + tableName : '') + '(' + value + ')'
        };
    }

    /**
     * Updates existing record and saves the changes to the table.
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {Object} value
     * @param  {string} tableName?
     * @returns this
     */
    public update(dm: DataManager, keyField: string, value: Object, tableName?: string): Object {
        return {
            type: 'PUT',
            url: dm.dataSource.url.replace(/\/*$/, tableName ? '/' + tableName : '') + '(' + value[keyField] + ')',
            data: JSON.stringify(value),
            accept: this.options.accept
        };
    }

    /**
     * Prepare the request body based on the newly added, removed and updated records.
     * The result is used by the batch request. 
     * @param  {DataManager} dm
     * @param  {CrudOptions} changes
     * @param  {RemoteArgs} e
     * @returns {Object}
     */
    public batchRequest(dm: DataManager, changes: CrudOptions, e: RemoteArgs): Object {
        let initialGuid: string = e.guid = DataUtil.getGuid(this.options.batchPre);
        let url: string = dm.dataSource.url.replace(/\/*$/, '/' + this.options.batch);
        let args: RemoteArgs = {
            url: e.url,
            key: e.key,
            cid: 1,
            cSet: DataUtil.getGuid(this.options.changeSet)
        };
        let req: string = '--' + initialGuid + '\n';

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
    }

    /**
     * Generate the string content from the removed records.
     * The result will be send during batch update.
     * @param  {Object[]} arr
     * @param  {RemoteArgs} e
     * @returns this
     */
    public generateDeleteRequest(arr: Object[], e: RemoteArgs): string {
        if (!arr) { return ''; }
        let req: string = '';

        let stat: { method: string, url: Function, data: Function } = {
            'method': 'DELETE ',
            'url': (data: Object[], i: number, key: string): string => '(' + data[i][key] as string + ')',
            'data': (data: Object[], i: number): string => ''
        };
        req = this.generateBodyContent(arr, e, stat);

        return req + '\n';
    }

    /**
     * Generate the string content from the inserted records.
     * The result will be send during batch update.
     * @param  {Object[]} arr
     * @param  {RemoteArgs} e
     */
    public generateInsertRequest(arr: Object[], e: RemoteArgs): string {
        if (!arr) { return ''; }
        let req: string = '';

        let stat: { method: string, url: Function, data: Function } = {
            'method': 'POST ',
            'url': (data: Object[], i: number, key: string): string => '',
            'data': (data: Object[], i: number): string => JSON.stringify(data[i]) + '\n\n'
        };
        req = this.generateBodyContent(arr, e, stat);

        return req;
    }

    /**
     * Generate the string content from the updated records.
     * The result will be send during batch update.
     * @param  {Object[]} arr
     * @param  {RemoteArgs} e
     */
    public generateUpdateRequest(arr: Object[], e: RemoteArgs): string {
        if (!arr) { return ''; }
        let req: string = '';
        let stat: { method: string, url: Function, data: Function } = {
            'method': 'PUT ',
            'url': (data: Object[], i: number, key: string): string => '(' + data[i][key] as string + ')',
            'data': (data: Object[], i: number): string => JSON.stringify(data[i]) + '\n\n'
        };
        req = this.generateBodyContent(arr, e, stat);

        return req;
    }

    private static getField(prop: string): string {
        return prop.replace(/\./g, '/');
    }

    private generateBodyContent(arr: Object[], e: RemoteArgs, stat: { method: string, url: Function, data: Function })
        : string {
        let req: string = '';
        for (let i: number = 0; i < arr.length; i++) {
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
    }

    protected processBatchResponse(
        data: DataResult, query?: Query, xhr?: XMLHttpRequest, request?: Ajax, changes?: CrudOptions): CrudOptions | DataResult {
        if (xhr && xhr.getResponseHeader('Content-Type') && xhr.getResponseHeader('Content-Type').indexOf('xml') !== -1) {
            return (query.requiresCounts ? { result: [], count: 0 } : []) as DataResult;
        }
        if (request && this.options.batch && DataUtil.endsWith(request.url, this.options.batch) && request.type.toLowerCase() === 'post') {
            let guid: string = xhr.getResponseHeader('Content-Type');
            let cIdx: number;
            let jsonObj: Object;
            guid = guid.substring(guid.indexOf('=batchresponse') + 1);
            data = (<string>data).split(guid) as DataResult;
            if ((<string[]>data).length < 2) { return {}; }

            data = (<string[]>data)[1] as DataResult;
            let exVal: RegExpExecArray = /(?:\bContent-Type.+boundary=)(changesetresponse.+)/i.exec(<string>data);
            if (exVal) { (<string>data).replace(exVal[0], ''); }

            let changeGuid: string = exVal ? exVal[1] : '';
            data = (<string>data).split(changeGuid) as DataResult;

            for (let i: number = (<string[]>data).length; i > -1; i--) {
                if (!/\bContent-ID:/i.test((<string[]>data)[i]) || !/\bHTTP.+201/.test((<string[]>data)[i])) {
                    continue;
                }

                cIdx = parseInt(/\bContent-ID: (\d+)/i.exec((<string[]>data)[i])[1], 10);

                if (changes.addedRecords[cIdx]) {
                    jsonObj = DataUtil.parse.parseJson(/^\{.+\}/m.exec(<string>data[i])[0]);
                    extend({}, changes.addedRecords[cIdx], this.processResponse(jsonObj));
                }
            }
            return changes;
        }
        return null;
    }
}

/**
 * The OData v4 is an improved version of OData protocols.
 * The DataManager uses the ODataV4Adaptor to consume OData v4 services.
 * @hidden
 */
export class ODataV4Adaptor extends ODataAdaptor {

    // options replaced the default adaptor options
    protected options: RemoteOptions = extend({}, this.options, {
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

    /**
     * Returns the query string which requests total count from the data source.
     * @param  {boolean} e
     * @returns string
     */
    public onCount(e: boolean): string {
        return e === true ? 'true' : '';
    }

    /**
     * Generate request string based on the filter criteria from query.
     * @param  {Predicate} pred
     * @param  {boolean} requiresCast?
     */
    public onPredicate(predicate: Predicate, query: Query | boolean, requiresCast?: boolean): string {
        let returnValue: string = '';
        let val: string | number | Date | boolean | Predicate | Predicate[] = predicate.value;
        let isDate: boolean = val instanceof Date;

        returnValue = super.onPredicate.call(this, predicate, query, requiresCast);

        if (isDate) {
            returnValue = returnValue.replace(/datetime'(.*)'$/, '$1');
        }
        return returnValue;
    }

    /**
     *  Generate query string based on the multiple search criteria from query.
     * @param  {{fields:string[]} e
     * @param  {string} operator
     * @param  {string} key
     * @param  {boolean}} ignoreCase
     */
    public onEachSearch(e: { fields: string[], operator: string, key: string, ignoreCase: boolean }): void {
        let search: Object[] = this.pvt.searches || [];
        search.push(e.key);
        this.pvt.searches = search;
    }

    /**
     *  Generate query string based on the search criteria from query.
     * @param  {Object} e
     */
    public onSearch(e: Object): string {
        return this.pvt.searches.join(' OR ');
    }

    /**
     * Method will trigger before send the request to server side. 
     * Used to set the custom header or modify the request options.
     * @param  {DataManager} dm
     * @param  {XMLHttpRequest} request
     * @param  {Ajax} settings
     * @returns void
     */
    public beforeSend(dm: DataManager, request: XMLHttpRequest, settings: Ajax): void {
        request.setRequestHeader('Accept', this.options.accept);
    }

    /**
     * Returns the data from the query processing.
     * @param  {DataResult} data
     * @param  {DataOptions} ds?
     * @param  {Query} query?
     * @param  {XMLHttpRequest} xhr?
     * @param  {Ajax} request?
     * @param  {CrudOptions} changes?
     * @returns aggregateResult
     */
    public processResponse(
        data: DataResult, ds?: DataOptions, query?: Query, xhr?: XMLHttpRequest, request?: Ajax, changes?: CrudOptions): Object {
        let pvtData: string = 'pvtData';
        let pvt: PvtOptions = request && request[pvtData];

        let emptyAndBatch: CrudOptions | DataResult = super.processBatchResponse(data, query, xhr, request, changes);
        if (emptyAndBatch) {
            return emptyAndBatch;
        }

        let count: number = null;
        let dataCount: string = '@odata.count';
        if (query && query.requiresCounts) {
            if (dataCount in data) { count = data[dataCount]; }
        }
        data = data.value;

        let args: DataResult = {};
        args.count = count;
        args.result = data;

        this.getAggregateResult(pvt, data, args);

        return DataUtil.isNull(count) ? args.result : { result: args.result, count: count, aggregates: args.aggregates };
    }
}

/**
 * The Web API is a programmatic interface to define the request and response messages system that is mostly exposed in JSON or XML. 
 * The DataManager uses the WebApiAdaptor to consume Web API.
 * Since this adaptor is targeted to interact with Web API created using OData endpoint, it is extended from ODataAdaptor
 * @hidden
 */
export class WebApiAdaptor extends ODataAdaptor {

    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     * @param  {DataManager} dm
     * @param  {Object} data
     * @param  {string} tableName?
     */
    public insert(dm: DataManager, data: Object, tableName?: string): Object {
        return {
            type: 'POST',
            url: dm.dataSource.url,
            data: JSON.stringify(data)
        };
    }

    /**
     * Prepare and return request body which is used to remove record from the table.
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {number} value
     * @param  {string} tableName?
     */
    public remove(dm: DataManager, keyField: string, value: number, tableName?: string): Object {
        return {
            type: 'DELETE',
            url: dm.dataSource.url + '/' + value,
            data: JSON.stringify(value)
        };
    }

    /**
     * Prepare and return request body which is used to update record.
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {Object} value
     * @param  {string} tableName?
     */
    public update(dm: DataManager, keyField: string, value: Object, tableName?: string): Object {
        return {
            type: 'PUT',
            url: dm.dataSource.url,
            data: JSON.stringify(value)
        };
    }

    /**
     * Method will trigger before send the request to server side. 
     * Used to set the custom header or modify the request options.
     * @param  {DataManager} dm
     * @param  {XMLHttpRequest} request
     * @param  {Ajax} settings
     * @returns void
     */
    public beforeSend(dm: DataManager, request: XMLHttpRequest, settings: Ajax): void {
        request.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
    }

    /**
     * Returns the data from the query processing.
     * @param  {DataResult} data
     * @param  {DataOptions} ds?
     * @param  {Query} query?
     * @param  {XMLHttpRequest} xhr?
     * @param  {Ajax} request?
     * @param  {CrudOptions} changes?
     * @returns aggregateResult
     */
    public processResponse(
        data: DataResult, ds?: DataOptions, query?: Query, xhr?: XMLHttpRequest, request?: Ajax, changes?: CrudOptions): Object {
        let pvtData: string = 'pvtData';
        let pvt: PvtOptions = request && request[pvtData];
        let count: number = null;
        let args: DataResult = {};
        if (request && request.type.toLowerCase() !== 'post') {
            let versionCheck: string = xhr && request.getResponseHeader('DataServiceVersion');
            let version: number = (versionCheck && parseInt(versionCheck, 10)) || 2;

            if (query && query.requiresCounts) {
                if (!DataUtil.isNull(data.Count)) { count = data.Count; }
            }

            if (version < 3 && data.Items) { data = data.Items as DataResult; }

            args.count = count;
            args.result = data;

            this.getAggregateResult(pvt, data, args);
        }
        args.result = args.result || data;
        return DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    }

}

/**
 * WebMethodAdaptor can be used by DataManager to interact with web method.
 * @hidden
 */
export class WebMethodAdaptor extends UrlAdaptor {

    /**
     * Prepare the request body based on the query.
     * The query information can be accessed at the WebMethod using variable named `value`.
     * @param  {DataManager} dm
     * @param  {Query} query
     * @param  {Object[]} hierarchyFilters?
     * @returns application
     */
    public processQuery(dm: DataManager, query: Query, hierarchyFilters?: Object[]): Object {
        let obj: Object = new UrlAdaptor().processQuery(dm, query, hierarchyFilters);
        let getData: string = 'data';
        let data: { param: Object[] } = DataUtil.parse.parseJson(obj[getData]);
        let result: { [key: string]: Object } = {};
        let value: string = 'value';

        if (data.param) {
            for (let i: number = 0; i < data.param.length; i++) {
                let param: Object = data.param[i];
                let key: string = Object.keys(param)[0];
                result[key] = param[key];
            }
        }
        result[value] = data;
        let pvtData: string = 'pvtData';
        let url: string = 'url';
        return {
            data: JSON.stringify(result),
            url: obj[url],
            pvtData: obj[pvtData],
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        };
    }
}

/**
 * RemoteSaveAdaptor, extended from JsonAdaptor and it is used for binding local data and performs all DataManager queries in client-side. 
 * It interacts with server-side only for CRUD operations.
 * @hidden
 */
export class RemoteSaveAdaptor extends JsonAdaptor {
    /**
     * @hidden
     */
    constructor() {
        super();
        setValue('beforeSend', UrlAdaptor.prototype.beforeSend, this);
        setValue('insert', UrlAdaptor.prototype.insert, this);
        setValue('update', UrlAdaptor.prototype.update, this);
        setValue('remove', UrlAdaptor.prototype.remove, this);
    }

    /**
     * Prepare the request body based on the newly added, removed and updated records.
     * Also perform the changes in the locally cached data to sync with the remote data.
     * The result is used by the batch request. 
     * @param  {DataManager} dm
     * @param  {CrudOptions} changes
     * @param  {RemoteArgs} e
     */
    public batchRequest(dm: DataManager, changes: CrudOptions, e: RemoteArgs): Object {
        let i: number;
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
    }
}

/**
 * Cache Adaptor is used to cache the data of the visited pages. It prevents new requests for the previously visited pages.
 * You can configure cache page size and duration of caching by using cachingPageSize and timeTillExpiration properties of the DataManager
 * @hidden
 */
export class CacheAdaptor extends UrlAdaptor {
    private cacheAdaptor: CacheAdaptor;
    private pageSize: number;
    private guidId: string;
    private isCrudAction: boolean = false;
    private isInsertAction: boolean = false;

    /**
     * Constructor for CacheAdaptor class.
     * @param  {CacheAdaptor} adaptor?
     * @param  {number} timeStamp?
     * @param  {number} pageSize?
     * @hidden
     */
    constructor(adaptor?: CacheAdaptor, timeStamp?: number, pageSize?: number) {
        super();
        if (!isNullOrUndefined(adaptor)) {
            this.cacheAdaptor = adaptor;
        }
        this.pageSize = pageSize;
        this.guidId = DataUtil.getGuid('cacheAdaptor');
        let obj: Object = { keys: [], results: [] };
        window.localStorage.setItem(this.guidId, JSON.stringify(obj));
        let guid: string = this.guidId;
        if (!isNullOrUndefined(timeStamp)) {
            setInterval(
                () => {
                    let data: { results: { timeStamp: number }[], keys: string[] };
                    data = DataUtil.parse.parseJson(window.localStorage.getItem(guid));
                    let forDel: Object[] = [];
                    for (let i: number = 0; i < data.results.length; i++) {
                        let currentTime: number = +new Date();
                        let requestTime: number = +new Date(data.results[i].timeStamp);
                        data.results[i].timeStamp = currentTime - requestTime;
                        if (currentTime - requestTime > timeStamp) {
                            forDel.push(i);
                        }
                    }
                    for (let i: number = 0; i < forDel.length; i++) {
                        data.results.splice((<number>forDel[i]), 1);
                        data.keys.splice((<number>forDel[i]), 1);
                    }
                    window.localStorage.removeItem(guid);
                    window.localStorage.setItem(guid, JSON.stringify(data));
                },
                timeStamp);
        }
    }

    /**
     * It will generate the key based on the URL when we send a request to server.
     * @param  {string} url
     * @param  {Query} query?
     * @hidden
     */
    public generateKey(url: string, query: Query): string {
        let queries: Requests = this.getQueryRequest(query);
        let singles: Object = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        let key: string = url;
        let page: string = 'onPage';
        if (page in singles) {
            key += singles[page].pageIndex;
        }
        queries.sorts.forEach((obj: QueryOptions) => {
            key += obj.e.direction + obj.e.fieldName;
        });
        queries.groups.forEach((obj: QueryOptions) => {
            key += obj.e.fieldName;
        });
        queries.searches.forEach((obj: QueryOptions) => {
            key += obj.e.searchKey;
        });

        for (let filter: number = 0; filter < queries.filters.length; filter++) {
            let currentFilter: QueryOptions = queries.filters[filter];
            if (currentFilter.e.isComplex) {
                let newQuery: Query = query.clone();
                newQuery.queries = [];
                for (let i: number = 0; i < currentFilter.e.predicates.length; i++) {
                    newQuery.queries.push({ fn: 'onWhere', e: currentFilter.e.predicates[i], filter: query.queries.filter });
                }
                key += currentFilter.e.condition + this.generateKey(url, newQuery);
            } else {
                key += currentFilter.e.field + currentFilter.e.operator + currentFilter.e.value;
            }
        }
        return key;
    }

    /**
     * Process the query to generate request body. 
     * If the data is already cached, it will return the cached data. 
     * @param  {DataManager} dm
     * @param  {Query} query?
     * @param  {Object[]} hierarchyFilters?
     */
    public processQuery(dm: DataManager, query?: Query, hierarchyFilters?: Object[]): Object {
        let key: string = this.generateKey(dm.dataSource.url, query);
        let cachedItems: DataResult;
        cachedItems = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
        let data: DataResult = cachedItems ? cachedItems.results[cachedItems.keys.indexOf(key)] : null;
        if (data != null && !this.isCrudAction && !this.isInsertAction) {
            return data;
        }
        this.isCrudAction = null; this.isInsertAction = null;
        return this.cacheAdaptor.processQuery.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
    }

    /**
     * Returns the data from the query processing.
     * It will also cache the data for later usage.
     * @param  {DataResult} data
     * @param  {DataManager} ds?
     * @param  {Query} query?
     * @param  {XMLHttpRequest} xhr?
     * @param  {Ajax} request?
     * @param  {CrudOptions} changes?
     */
    public processResponse(
        data: DataResult, ds?: DataManager, query?: Query, xhr?: XMLHttpRequest, request?: Ajax, changes?: CrudOptions): DataResult {
        if (this.isInsertAction || (request && this.cacheAdaptor.options.batch &&
            DataUtil.endsWith(request.url, this.cacheAdaptor.options.batch) && request.type.toLowerCase() === 'post')) {
            return this.cacheAdaptor.processResponse(data, ds, query, xhr, request, changes);
        }
        data = this.cacheAdaptor.processResponse.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
        let key: string = query ? this.generateKey(ds.dataSource.url, query) : ds.dataSource.url;
        let obj: DataResult = {};
        obj = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
        let index: number = obj.keys.indexOf(key);
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
    }

    /**
     * Method will trigger before send the request to server side. Used to set the custom header or modify the request options.
     * @param  {DataManager} dm
     * @param  {XMLHttpRequest} request
     * @param  {Ajax} settings?
     */
    public beforeSend(dm: DataManager, request: XMLHttpRequest, settings?: Ajax): void {
        if (DataUtil.endsWith(settings.url, this.cacheAdaptor.options.batch) && settings.type.toLowerCase() === 'post') {
            request.setRequestHeader('Accept', this.cacheAdaptor.options.multipartAccept);
        }

        if (!dm.dataSource.crossDomain) {
            request.setRequestHeader('Accept', this.cacheAdaptor.options.accept);
        }
    }

    /**
     * Updates existing record and saves the changes to the table.
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {Object} value
     * @param  {string} tableName
     */
    public update(dm: DataManager, keyField: string, value: Object, tableName: string): Object {
        this.isCrudAction = true;
        return this.cacheAdaptor.update(dm, keyField, value, tableName);
    }

    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     * @param  {DataManager} dm
     * @param  {Object} data
     * @param  {string} tableName?
     */
    public insert(dm: DataManager, data: Object, tableName?: string): Object {
        this.isInsertAction = true;
        return this.cacheAdaptor.insert(dm, data, tableName);
    }

    /**
     * Prepare and return request body which is used to remove record from the table.
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {Object} value
     * @param  {string} tableName?
     */
    public remove(dm: DataManager, keyField: string, value: Object, tableName?: string): Object[] {
        this.isCrudAction = true;
        return this.cacheAdaptor.remove(dm, keyField, value, tableName);
    }

    /**
     * Prepare the request body based on the newly added, removed and updated records.
     * The result is used by the batch request. 
     * @param  {DataManager} dm
     * @param  {CrudOptions} changes
     * @param  {RemoteArgs} e
     */
    public batchRequest(dm: DataManager, changes: CrudOptions, e: RemoteArgs): CrudOptions {
        return this.cacheAdaptor.batchRequest(dm, changes, e);
    }
}

/**
 * @hidden
 */
export interface CrudOptions {
    changedRecords?: Object[];
    addedRecords?: Object[];
    deletedRecords?: Object[];
    action?: string;
    table?: string;
    key?: string;
}

/**
 * @hidden
 */
export interface PvtOptions {
    groups?: Object[];
    aggregates?: Aggregates[];
    search?: Object | Predicate;
    changeSet?: number;
    searches?: Object[];
}

/**
 * @hidden
 */
export interface DataResult {
    nodeType?: number;
    addedRecords?: Object[];
    d?: DataResult;
    Count?: number;
    count?: number;
    result?: Object;
    results?: Object[];
    aggregate?: DataResult;
    aggregates?: Aggregates;
    value?: Object;
    Items?: Object[];
    keys?: string[];
    groupDs?: Object[];
}

/**
 * @hidden
 */
export interface Requests {
    sorts: QueryOptions[];
    groups: QueryOptions[];
    filters: QueryOptions[];
    searches: QueryOptions[];
    aggregates: QueryOptions[];
}

/**
 * @hidden
 */
export interface RemoteArgs {
    guid?: string;
    url?: string;
    key?: string;
    cid?: number;
    cSet?: string;
}

/**
 * @hidden
 */
export interface RemoteOptions {
    from?: string;
    requestType?: string;
    sortBy?: string;
    select?: string;
    skip?: string;
    group?: string;
    take?: string;
    search?: string;
    count?: string;
    where?: string;
    aggregates?: string;
    expand?: string;
    accept?: string;
    multipartAccept?: string;
    batch?: string;
    changeSet?: string;
    batchPre?: string;
    contentId?: string;
    batchContent?: string;
    changeSetContent?: string;
    batchChangeSetContentType?: string;
}

/**
 * @hidden
 */
interface TempOptions {
    pageIndex?: number;
    pageSize?: number;
    fn?: Function;
}