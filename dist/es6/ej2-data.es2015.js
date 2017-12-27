import { Ajax, extend, getValue, isNullOrUndefined, merge, setValue } from '@syncfusion/ej2-base';

/**
 * Query class is used to build query which is used by the DataManager to communicate with datasource.
 */
class Query {
    /**
     * Constructor for Query class.
     * @param  {string|string[]} from?
     * @hidden
     */
    constructor(from) {
        /** @hidden */
        this.subQuery = null;
        /** @hidden */
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
    /**
     * Sets the primary key.
     * @param  {string} field - Defines the column field.
     */
    setKey(field) {
        this.key = field;
        return this;
    }
    /**
     * Sets default DataManager to execute query.
     * @param  {DataManager} dataManager - Defines the DataManager.
     */
    using(dataManager) {
        this.dataManager = dataManager;
        return this;
    }
    /**
     * Executes query with the given DataManager.
     * @param  {DataManager} dataManager - Defines the DataManager.
     * @param  {Function} done - Defines the success callback.
     * @param  {Function} fail - Defines the failure callback.
     * @param  {Function} always - Defines the callback which will be invoked on either success or failure.
     *
     * <pre>
     * let dataManager: DataManager = new DataManager([{ ID: '10' }, { ID: '2' }, { ID: '1' }, { ID: '20' }]);
     * let query: Query = new Query();
     * query.sortBy('ID', (x: string, y: string): number => { return parseInt(x, 10) - parseInt(y, 10) });
     * let promise: Promise< Object > = query.execute(dataManager);
     * promise.then((e: { result: Object }) => { });
     * </pre>
     */
    execute(dataManager, done, fail, always) {
        dataManager = dataManager || this.dataManager;
        if (dataManager) {
            return dataManager.executeQuery(this, done, fail, always);
        }
        return DataUtil.throwError('Query - execute() : dataManager needs to be is set using "using" function or should be passed as argument');
    }
    /**
     * Executes query with the local datasource.
     * @param  {DataManager} dataManager - Defines the DataManager.
     */
    executeLocal(dataManager) {
        dataManager = dataManager || this.dataManager;
        if (dataManager) {
            return dataManager.executeLocal(this);
        }
        return DataUtil.throwError('Query - executeLocal() : dataManager needs to be is set using "using" function or should be passed as argument');
    }
    /**
     * Creates deep copy of the Query object.
     */
    clone() {
        let cloned = new Query();
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
        cloned.isCountRequired = this.isCountRequired;
        return cloned;
    }
    /**
     * Specifies the name of table to retrieve data in query execution.
     * @param  {string} tableName - Defines the table name.
     */
    from(tableName) {
        this.fromTable = tableName;
        return this;
    }
    /**
     * Adds additional parameter which will be sent along with the request which will be generated while DataManager execute.
     * @param  {string} key - Defines the key of additional parameter.
     * @param  {Function|string} value - Defines the value for the key.
     */
    addParams(key, value) {
        if (typeof value === 'function') {
            this.params.push({ key: key, fn: value });
        }
        else {
            this.params.push({ key: key, value: value });
        }
        return this;
    }
    /**
     * Expands the related table.
     * @param  {string|Object[]} tables
     */
    expand(tables) {
        if (typeof tables === 'string') {
            this.expands = [].slice.call([tables], 0);
        }
        else {
            this.expands = tables.slice(0);
        }
        return this;
    }
    /**
     * Filter data with given filter criteria.
     * @param  {string|Predicate} fieldName - Defines the column field or Predicate.
     * @param  {string} operator - Defines the operator how to filter data.
     * @param  {string|number|boolean} value - Defines the values to match with data.
     * @param  {boolean} ignoreCase - If ignore case set to false, then filter data with exact match or else
     * filter data with case insensitive.
     */
    where(fieldName, operator, value, ignoreCase) {
        operator = operator ? (operator).toLowerCase() : null;
        let predicate = null;
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
    }
    /**
     * Search data with given search criteria.
     * @param  {string|number|boolean} searchKey - Defines the search key.
     * @param  {string|string[]} fieldNames - Defines the collection of column fields.
     * @param  {string} operator - Defines the operator how to search data.
     * @param  {boolean} ignoreCase - If ignore case set to false, then filter data with exact match or else
     * filter data with case insensitive.
     */
    search(searchKey, fieldNames, operator, ignoreCase) {
        if (typeof fieldNames === 'string') {
            fieldNames = [fieldNames];
        }
        operator = operator || 'contains';
        let comparer = DataUtil.fnOperators[operator];
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
    }
    /**
     * Sort the data with given sort criteria.
     * By default, sort direction is ascending.
     * @param  {string|string[]} fieldName - Defines the single or collection of column fields.
     * @param  {string|Function} comparer - Defines the sort direction or custom sort comparer function.
     */
    sortBy(fieldName, comparer, isFromGroup) {
        let order = 'ascending';
        let sorts;
        let temp;
        if (typeof fieldName === 'string' && DataUtil.endsWith(fieldName.toLowerCase(), ' desc')) {
            fieldName = fieldName.replace(/ desc$/i, '');
            comparer = 'descending';
        }
        if (!comparer || typeof comparer === 'string') {
            order = comparer ? comparer.toLowerCase() : 'ascending';
            comparer = DataUtil.fnSort(comparer);
        }
        if (isFromGroup) {
            sorts = Query.filterQueries(this.queries, 'onSortBy');
            for (let i = 0; i < sorts.length; i++) {
                temp = sorts[i].e.fieldName;
                if (typeof temp === 'string') {
                    if (temp === fieldName) {
                        return this;
                    }
                }
                else if (temp instanceof Array) {
                    for (let j = 0; j < temp.length; j++) {
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
    }
    /**
     * Sorts data in descending order.
     * @param  {string} fieldName - Defines the column field.
     */
    sortByDesc(fieldName) {
        return this.sortBy(fieldName, 'descending');
    }
    /**
     * Groups data with the given field name.
     * @param  {string} fieldName - Defines the column field.
     */
    group(fieldName, fn, format) {
        this.sortBy(fieldName, null, true);
        this.queries.push({
            fn: 'onGroup',
            e: {
                fieldName: fieldName,
                comparer: fn ? fn : null,
                format: format ? format : null
            }
        });
        return this;
    }
    /**
     * Gets data based on the given page index and size.
     * @param  {number} pageIndex - Defines the current page index.
     * @param  {number} pageSize - Defines the no of records per page.
     */
    page(pageIndex, pageSize) {
        this.queries.push({
            fn: 'onPage',
            e: {
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        });
        return this;
    }
    /**
     * Gets data based on the given start and end index.
     * @param  {number} start - Defines the start index of the datasource.
     * @param  {number} end - Defines the end index of the datasource.
     */
    range(start, end) {
        this.queries.push({
            fn: 'onRange',
            e: {
                start: start,
                end: end
            }
        });
        return this;
    }
    /**
     * Gets data from the top of the data source based on given number of records count.
     * @param  {number} nos - Defines the no of records to retrieve from datasource.
     */
    take(nos) {
        this.queries.push({
            fn: 'onTake',
            e: {
                nos: nos
            }
        });
        return this;
    }
    /**
     * Skips data with given number of records count from the top of the data source.
     * @param  {number} nos - Defines the no of records skip in the datasource.
     */
    skip(nos) {
        this.queries.push({
            fn: 'onSkip',
            e: { nos: nos }
        });
        return this;
    }
    /**
     * Selects specified columns from the data source.
     * @param  {string|string[]} fieldNames - Defines the collection of column fields.
     */
    select(fieldNames) {
        if (typeof fieldNames === 'string') {
            fieldNames = [].slice.call([fieldNames], 0);
        }
        this.queries.push({
            fn: 'onSelect',
            e: { fieldNames: fieldNames }
        });
        return this;
    }
    /**
     * Gets the records in hierarchical relationship from two tables. It requires the foreign key to relate two tables.
     * @param  {Query} query - Defines the query to relate two tables.
     * @param  {Function} selectorFn - Defines the custom function to select records.
     */
    hierarchy(query, selectorFn) {
        this.subQuerySelector = selectorFn;
        this.subQuery = query;
        return this;
    }
    /**
     * Sets the foreign key which is used to get data from the related table.
     * @param  {string} key - Defines the foreign key.
     */
    foreignKey(key) {
        this.fKey = key;
        return this;
    }
    /**
     * It is used to get total number of records in the DataManager execution result.
     */
    requiresCount() {
        this.isCountRequired = true;
        return this;
    }
    //type - sum, avg, min, max
    /**
     * Aggregate the data with given type and field name.
     * @param  {string} type - Defines the aggregate type.
     * @param  {string} field - Defines the column field to aggregate.
     */
    aggregate(type, field) {
        this.queries.push({
            fn: 'onAggregates',
            e: { field: field, type: type }
        });
        return this;
    }
    /**
     * Pass array of filterColumn query for performing filter operation.
     * @param  {QueryOptions[]} queries
     * @param  {string} name
     * @hidden
     */
    static filterQueries(queries, name) {
        return queries.filter((q) => {
            return q.fn === name;
        });
    }
    /**
     * To get the list of queries which is already filtered in current data source.
     * @param  {Object[]} queries
     * @param  {string[]} singles
     * @hidden
     */
    static filterQueryLists(queries, singles) {
        let filtered = queries.filter((q) => {
            return singles.indexOf(q.fn) !== -1;
        });
        let res = {};
        for (let i = 0; i < filtered.length; i++) {
            if (!res[filtered[i].fn]) {
                res[filtered[i].fn] = filtered[i].e;
            }
        }
        return res;
    }
}
/**
 * Predicate class is used to generate complex filter criteria.
 * This will be used by DataManager to perform multiple filtering operation.
 */
class Predicate {
    /**
     * Constructor for Predicate class.
     * @param  {string|Predicate} field
     * @param  {string} operator
     * @param  {string|number|boolean|Predicate|Predicate[]} value
     * @param  {boolean=false} ignoreCase
     * @hidden
     */
    constructor(field, operator, value, ignoreCase = false) {
        /** @hidden */
        this.isComplex = false;
        if (typeof field === 'string') {
            this.field = field;
            this.operator = operator.toLowerCase();
            this.value = value;
            this.ignoreCase = ignoreCase;
            this.isComplex = false;
            this.comparer = DataUtil.fnOperators.processOperator(this.operator);
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
    /**
     * Adds n-number of new predicates on existing predicate with “and” condition.
     * @param  {Object[]} args - Defines the collection of predicates.
     */
    static and(...args) {
        return Predicate.combinePredicates([].slice.call(args, 0), 'and');
    }
    /**
     * Adds new predicate on existing predicate with “and” condition.
     * @param  {string} field - Defines the column field.
     * @param  {string} operator - Defines the operator how to filter data.
     * @param  {string} value - Defines the values to match with data.
     * @param  {boolean} ignoreCase? - If ignore case set to false, then filter data with exact match or else
     * filter data with case insensitive.
     */
    and(field, operator, value, ignoreCase) {
        return Predicate.combine(this, field, operator, value, 'and', ignoreCase);
    }
    /**
     * Adds n-number of new predicates on existing predicate with “or” condition.
     * @param  {Object[]} args - Defines the collection of predicates.
     */
    static or(...args) {
        return Predicate.combinePredicates([].slice.call(args, 0), 'or');
    }
    /**
     * Adds new predicate on existing predicate with “or” condition.
     * @param  {string} field - Defines the column field.
     * @param  {string} operator - Defines the operator how to filter data.
     * @param  {string} value - Defines the values to match with data.
     * @param  {boolean} ignoreCase? - If ignore case set to false, then filter data with exact match or else
     * filter data with case insensitive.
     */
    or(field, operator, value, ignoreCase) {
        return Predicate.combine(this, field, operator, value, 'or', ignoreCase);
    }
    /**
     * Converts plain JavaScript object to Predicate object.
     * @param  {Predicate[]|Predicate} json - Defines single or collection of Predicate.
     */
    static fromJson(json) {
        if (json instanceof Array) {
            let res = [];
            for (let i = 0, len = json.length; i < len; i++) {
                res.push(this.fromJSONData(json[i]));
            }
            return res;
        }
        let pred = json;
        return this.fromJSONData(pred);
    }
    /**
     * Validate the record based on the predicates.
     * @param  {Object} record - Defines the datasource record.
     */
    validate(record) {
        let predicate = this.predicates ? this.predicates : [];
        let isAnd;
        let ret;
        if (!this.isComplex && this.comparer) {
            return this.comparer.call(this, DataUtil.getObject(this.field, record), this.value, this.ignoreCase);
        }
        isAnd = this.condition === 'and';
        for (let i = 0; i < predicate.length; i++) {
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
    }
    /**
     * Converts predicates to plain JavaScript.
     * This method is uses Json stringify when serializing Predicate object.
     */
    toJson() {
        let predicates;
        let p;
        if (this.isComplex) {
            predicates = [];
            p = this.predicates;
            for (let i = 0; i < p.length; i++) {
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
    }
    static combinePredicates(predicates, operator) {
        if (predicates.length === 1) {
            if (!(predicates[0] instanceof Array)) {
                return predicates[0];
            }
            predicates = predicates[0];
        }
        return new Predicate(predicates[0], operator, predicates.slice(1));
    }
    static combine(pred, field, operator, value, condition, ignoreCase) {
        if (field instanceof Predicate) {
            return Predicate[condition](pred, field);
        }
        if (typeof field === 'string') {
            return Predicate[condition](pred, new Predicate(field, operator, value, ignoreCase));
        }
        return DataUtil.throwError('Predicate - ' + condition + ' : invalid arguments');
    }
    static fromJSONData(json) {
        let preds = json.predicates || [];
        let len = preds.length;
        let predicates = [];
        let result;
        for (let i = 0; i < len; i++) {
            predicates.push(this.fromJSONData(preds[i]));
        }
        if (!json.isComplex) {
            result = new Predicate(json.field, json.operator, json.value, json.ignoreCase);
        }
        else {
            result = new Predicate(predicates[0], json.condition, predicates.slice(1));
        }
        return result;
    }
}

const consts = { GroupGuid: '{271bbba0-1ee7}' };
/**
 * Data manager common utility methods.
 * @hidden
 */
class DataUtil {
    /**
     * Returns the value by invoking the provided parameter function.
     * If the paramater is not of type function then it will be returned as it is.
     * @param  {Function|string|string[]|number} value
     * @param  {Object} inst?
     * @hidden
     */
    static getValue(value, inst) {
        if (typeof value === 'function') {
            return value.call(inst || {});
        }
        return value;
    }
    /**
     * Returns true if the input string ends with given string.
     * @param  {string} input
     * @param  {string} substr
     */
    static endsWith(input, substr) {
        return input.slice(-substr.length) === substr;
    }
    /**
     * Returns true if the input string starts with given string.
     * @param  {string} str
     * @param  {string} startstr
     */
    static startsWith(input, start) {
        return input.slice(0, start.length) === start;
    }
    /**
     * To return the sorting function based on the string.
     * @param  {string} order
     * @hidden
     */
    static fnSort(order) {
        order = order ? order.toLowerCase() : 'ascending';
        if (order === 'ascending') {
            return this.fnAscending;
        }
        return this.fnDescending;
    }
    /**
     * Comparer function which is used to sort the data in ascending order.
     * @param  {string|number} x
     * @param  {string|number} y
     * @returns number
     */
    static fnAscending(x, y) {
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
    }
    /**
     * Comparer function which is used to sort the data in descending order.
     * @param  {string|number} x
     * @param  {string|number} y
     * @returns number
     */
    static fnDescending(x, y) {
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
    }
    static extractFields(obj, fields) {
        let newObj = {};
        if (fields.length === 1) {
            return this.getObject(fields[0], obj);
        }
        for (let i = 0; i < fields.length; i++) {
            newObj[fields[i].replace('.', '_')] = this.getObject(fields[i], obj);
        }
        return newObj;
    }
    /**
     * Select objects by given fields from jsonArray.
     * @param  {Object[]} jsonArray
     * @param  {string[]} fields
     */
    static select(jsonArray, fields) {
        let newData = [];
        for (let i = 0; i < jsonArray.length; i++) {
            newData.push(this.extractFields(jsonArray[i], fields));
        }
        return newData;
    }
    /**
     * Group the input data based on the field name.
     * It also performs aggregation of the grouped records based on the aggregates paramater.
     * @param  {Object[]} jsonArray
     * @param  {string} field?
     * @param  {Object[]} agg?
     * @param  {number} level?
     * @param  {Object[]} groupDs?
     */
    static group(jsonArray, field, aggregates, level, groupDs, format) {
        level = level || 1;
        let jsonData = jsonArray;
        let guid = 'GroupGuid';
        if (jsonData.GroupGuid === consts[guid]) {
            for (let j = 0; j < jsonData.length; j++) {
                if (!isNullOrUndefined(groupDs)) {
                    let indx = -1;
                    let temp = groupDs.filter((e) => { return e.key === jsonData[j].key; });
                    indx = groupDs.indexOf(temp[0]);
                    jsonData[j].items = this.group(jsonData[j].items, field, aggregates, jsonData.level + 1, groupDs[indx].items, format);
                    jsonData[j].count = groupDs[indx].count;
                }
                else {
                    jsonData[j].items = this.group(jsonData[j].items, field, aggregates, jsonData.level + 1, null, format);
                    jsonData[j].count = jsonData[j].items.length;
                }
            }
            jsonData.childLevels += 1;
            return jsonData;
        }
        let grouped = {};
        let groupedArray = [];
        groupedArray.GroupGuid = consts[guid];
        groupedArray.level = level;
        groupedArray.childLevels = 0;
        groupedArray.records = jsonData;
        for (let i = 0; i < jsonData.length; i++) {
            let val = this.getVal(jsonData, i, field);
            if (!isNullOrUndefined(format)) {
                val = format(val, field);
            }
            if (!grouped[val]) {
                grouped[val] = {
                    key: val,
                    count: 0,
                    items: [],
                    aggregates: {},
                    field: field
                };
                groupedArray.push(grouped[val]);
                if (!isNullOrUndefined(groupDs)) {
                    let tempObj = groupDs.filter((e) => { return e.key === grouped[val].key; });
                    grouped[val].count = tempObj[0].count;
                }
            }
            grouped[val].count = !isNullOrUndefined(groupDs) ? grouped[val].count : grouped[val].count += 1;
            grouped[val].items.push(jsonData[i]);
        }
        if (aggregates && aggregates.length) {
            for (let i = 0; i < groupedArray.length; i++) {
                let res = {};
                let fn;
                let aggs = aggregates;
                for (let j = 0; j < aggregates.length; j++) {
                    fn = DataUtil.aggregates[aggregates[j].type];
                    if (!isNullOrUndefined(groupDs)) {
                        let temp = groupDs.filter((e) => { return e.key === groupedArray[i].key; });
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
            }
        }
        return groupedArray;
    }
    /**
     * It is used to categorize the multiple items based on a specific field in jsonArray.
     * The hierarchical queries are commonly required when you use foreign key binding.
     * @param  {string} fKey
     * @param  {string} from
     * @param  {Object[]} source
     * @param  {Group} lookup?
     * @param  {string} pKey?
     * @hidden
     */
    static buildHierarchy(fKey, from, source, lookup, pKey) {
        let i;
        let grp = {};
        let temp;
        if (lookup.result) {
            lookup = lookup.result;
        }
        if (lookup.GroupGuid) {
            this.throwError('DataManager: Do not have support Grouping in hierarchy');
        }
        for (i = 0; i < lookup.length; i++) {
            let fKeyData = this.getObject(fKey, lookup[i]);
            temp = grp[fKeyData] || (grp[fKeyData] = []);
            temp.push(lookup[i]);
        }
        for (i = 0; i < source.length; i++) {
            let fKeyData = this.getObject(pKey || fKey, source[i]);
            source[i][from] = grp[fKeyData];
        }
    }
    /**
     * The method used to get the field names which started with specified characters.
     * @param  {Object} obj
     * @param  {string[]} fields?
     * @param  {string} prefix?
     * @hidden
     */
    static getFieldList(obj, fields, prefix) {
        if (prefix === undefined) {
            prefix = '';
        }
        if (fields === undefined || fields === null) {
            return this.getFieldList(obj, [], prefix);
        }
        let copyObj = obj;
        let keys = Object.keys(obj);
        for (let prop of keys) {
            if (typeof copyObj[prop] === 'object' && !(copyObj[prop] instanceof Array)) {
                this.getFieldList(copyObj[prop], fields, prefix + prop + '.');
            }
            else {
                fields.push(prefix + prop);
            }
        }
        return fields;
    }
    /**
     * Gets the value of the property in the given object.
     * The complex object can be accessed by providing the field names concatenated with dot(.).
     * @param  {string} nameSpace - The name of the property to be accessed.
     * @param  {Object} from - Defines the source object.
     */
    static getObject(nameSpace, from) {
        if (!nameSpace) {
            return from;
        }
        if (nameSpace.indexOf('.') === -1) {
            return from[nameSpace];
        }
        let value = from;
        let splits = nameSpace.split('.');
        for (let i = 0; i < splits.length; i++) {
            if (value == null) {
                break;
            }
            value = value[splits[i]];
        }
        return value;
    }
    /**
     * Sort the given data based on the field and comparer.
     * @param  {Object[]} ds - Defines the input data.
     * @param  {string} field - Defines the field to be sorted.
     * @param  {Function} comparer - Defines the comparer function used to sort the records.
     */
    static sort(ds, field, comparer) {
        if (ds.length <= 1) {
            return ds;
        }
        let middle = parseInt((ds.length / 2).toString(), 10);
        let left = ds.slice(0, middle);
        let right = ds.slice(middle);
        left = this.sort(left, field, comparer);
        right = this.sort(right, field, comparer);
        return this.merge(left, right, field, comparer);
    }
    static merge(left, right, fieldName, comparer) {
        let result = [];
        let current;
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
    }
    static getVal(array, index, field) {
        return field ? this.getObject(field, array[index]) : array[index];
    }
    static toLowerCase(val) {
        return val ? typeof val === 'string' ? val.toLowerCase() : val.toString() : (val === 0 || val === false) ? val.toString() : '';
    }
    /**
     * To perform the filter operation with specified adaptor and returns the result.
     * @param  {Object} adaptor
     * @param  {string} fnName
     * @param  {Object} param1?
     * @param  {Object} param2?
     * @hidden
     */
    static callAdaptorFunction(adaptor, fnName, param1, param2) {
        if (fnName in adaptor) {
            let res = adaptor[fnName](param1, param2);
            if (!this.fnOperators.isnull(res)) {
                param1 = res;
            }
        }
        return param1;
    }
    /**
     * Checks wheather the given input is a plain object or not.
     * @param  {Object|Object[]} obj
     */
    static isPlainObject(obj) {
        return (!!obj) && (obj.constructor === Object);
    }
    /**
     * Returns true when the browser cross origin request.
     */
    static isCors() {
        let xhr = null;
        let request = 'XMLHttpRequest';
        try {
            xhr = new window[request]();
        }
        catch (e) {
            // No exception handling
        }
        return !!xhr && ('withCredentials' in xhr);
    }
    /**
     * Generate random GUID value which will be prefixed with the given value.
     * @param  {string} prefix
     */
    static getGuid(prefix) {
        let hexs = '0123456789abcdef';
        let rand;
        return (prefix || '') + '00000000-0000-4000-0000-000000000000'.replace(/0/g, (val, i) => {
            if ('crypto' in window && 'getRandomValues' in crypto) {
                let arr = new Uint8Array(1);
                window.crypto.getRandomValues(arr);
                rand = arr[0] % 16 | 0;
            }
            else {
                rand = Math.random() * 16 | 0;
            }
            return hexs[i === 19 ? rand & 0x3 | 0x8 : rand];
        });
    }
    /**
     * Checks wheather the given value is null or not.
     * @param  {string|Object} val
     * @returns boolean
     */
    static isNull(val) {
        return val === undefined || val === null;
    }
    /**
     * To get the required items from collection of objects.
     * @param  {Object[]} array
     * @param  {string} field
     * @param  {Function} comparer
     * @returns Object
     * @hidden
     */
    static getItemFromComparer(array, field, comparer) {
        let keyVal;
        let current;
        let key;
        let i = 0;
        let castRequired = typeof DataUtil.getVal(array, 0, field) === 'string';
        if (array.length) {
            while (isNullOrUndefined(keyVal) && i < array.length) {
                keyVal = DataUtil.getVal(array, i, field);
                key = array[i++];
            }
        }
        for (; i < array.length; i++) {
            current = DataUtil.getVal(array, i, field);
            if (isNullOrUndefined(current)) {
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
    }
    /**
     * To get distinct values of Array or Array of Objects.
     * @param  {Object[]} json
     * @param  {string} field
     * @param  {boolean} requiresCompleteRecord
     * @returns Object[]
     * * distinct array of objects is return when requiresCompleteRecord set as true.
     * @hidden
     */
    static distinct(json, fieldName, requiresCompleteRecord) {
        requiresCompleteRecord = isNullOrUndefined(requiresCompleteRecord) ? false : requiresCompleteRecord;
        let result = [];
        let val;
        let tmp = {};
        json.forEach((data, index) => {
            val = DataUtil.getVal(json, index, fieldName);
            if (!(val in tmp)) {
                result.push(!requiresCompleteRecord ? val : json[index]);
                tmp[val] = 1;
            }
        });
        return result;
    }
}
/**
 * Specifies the value which will be used to adjust the date value to server timezone.
 * @default 0
 */
DataUtil.serverTimezoneOffset = 0;
/**
 * Throw error with the given string as message.
 * @param  {string} er
 */
DataUtil.throwError = (error) => {
    try {
        throw new Error(error);
    }
    catch (e) {
        throw e.message + '\n' + e.stack;
    }
};
DataUtil.aggregates = {
    /**
     * Calculate sum of the given field in the data.
     * @param  {Object[]} ds
     * @param  {string} field
     */
    sum: (ds, field) => {
        let result = 0;
        let val;
        let castRequired = typeof DataUtil.getVal(ds, 0, field) !== 'number';
        for (let i = 0; i < ds.length; i++) {
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
    /**
     * Calculate average value of the given field in the data.
     * @param  {Object[]} ds
     * @param  {string} field
     */
    average: (ds, field) => {
        return DataUtil.aggregates.sum(ds, field) / ds.length;
    },
    /**
     * Returns the min value of the data based on the field.
     * @param  {Object[]} ds
     * @param  {string|Function} field
     */
    min: (ds, field) => {
        let comparer;
        if (typeof field === 'function') {
            comparer = field;
            field = null;
        }
        return DataUtil.getObject(field, DataUtil.getItemFromComparer(ds, field, comparer || DataUtil.fnAscending));
    },
    /**
     * Returns the max value of the data based on the field.
     * @param  {Object[]} ds
     * @param  {string} field
     * @returns number
     */
    max: (ds, field) => {
        let comparer;
        if (typeof field === 'function') {
            comparer = field;
            field = null;
        }
        return DataUtil.getObject(field, DataUtil.getItemFromComparer(ds, field, comparer || DataUtil.fnDescending));
    },
    /**
     * Returns the total number of true value present in the data based on the given boolean field name.
     * @param  {Object[]} ds
     * @param  {string} field
     */
    truecount: (ds, field) => {
        return new DataManager(ds).executeLocal(new Query().where(field, 'equal', true, true)).length;
    },
    /**
     * Returns the total number of false value present in the data based on the given boolean field name.
     * @param  {Object[]} ds
     * @param  {string} field
     */
    falsecount: (ds, field) => {
        return new DataManager(ds).executeLocal(new Query().where(field, 'equal', false, true)).length;
    },
    /**
     * Returns the length of the given data.
     * @param  {Object[]} ds
     * @param  {string} field?
     * @returns number
     */
    count: (ds, field) => {
        return ds.length;
    }
};
/**
 * Specifies the Object with filter operators.
 */
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
/**
 * Specifies the Object with filter operators which will be used for OData filter query generation.
 * * It will be used for date/number type filter query.
 */
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
/**
 * Specifies the Object with filter operators which will be used for OData filter query generation.
 * It will be used for string type filter query.
 */
DataUtil.odUniOperator = {
    '$=': 'endswith',
    '^=': 'startswith',
    '*=': 'substringof',
    'endswith': 'endswith',
    'startswith': 'startswith',
    'contains': 'substringof'
};
/**
 * Specifies the Object with filter operators which will be used for ODataV4 filter query generation.
 * It will be used for string type filter query.
 */
DataUtil.odv4UniOperator = {
    '$=': 'endswith',
    '^=': 'startswith',
    '*=': 'contains',
    'endswith': 'endswith',
    'startswith': 'startswith',
    'contains': 'contains'
};
DataUtil.fnOperators = {
    /**
     * Returns true when the actual input is equal to the given input.
     * @param  {string|number|boolean} actual
     * @param  {string|number|boolean} expected
     * @param  {boolean} ignoreCase?
     */
    equal: (actual, expected, ignoreCase) => {
        if (ignoreCase) {
            return DataUtil.toLowerCase(actual) === DataUtil.toLowerCase(expected);
        }
        return actual === expected;
    },
    /**
     * Returns true when the actual input is not equal to the given input.
     * @param  {string|number|boolean} actual
     * @param  {string|number|boolean} expected
     * @param  {boolean} ignoreCase?
     */
    notequal: (actual, expected, ignoreCase) => {
        return !DataUtil.fnOperators.equal(actual, expected, ignoreCase);
    },
    /**
     * Returns true when the actual input is less than to the given input.
     * @param  {string|number|boolean} actual
     * @param  {string|number|boolean} expected
     * @param  {boolean} ignoreCase?
     */
    lessthan: (actual, expected, ignoreCase) => {
        if (ignoreCase) {
            return DataUtil.toLowerCase(actual) < DataUtil.toLowerCase(expected);
        }
        return actual < expected;
    },
    /**
     * Returns true when the actual input is greater than to the given input.
     * @param  {string|number|boolean} actual
     * @param  {string|number|boolean} expected
     * @param  {boolean} ignoreCase?
     */
    greaterthan: (actual, expected, ignoreCase) => {
        if (ignoreCase) {
            return DataUtil.toLowerCase(actual) > DataUtil.toLowerCase(expected);
        }
        return actual > expected;
    },
    /**
     * Returns true when the actual input is less than or equal to the given input.
     * @param  {string|number|boolean} actual
     * @param  {string|number|boolean} expected
     * @param  {boolean} ignoreCase?
     */
    lessthanorequal: (actual, expected, ignoreCase) => {
        if (ignoreCase) {
            return DataUtil.toLowerCase(actual) <= DataUtil.toLowerCase(expected);
        }
        return actual <= expected;
    },
    /**
     * Returns true when the actual input is greater than or equal to the given input.
     * @param  {string|number|boolean} actual
     * @param  {string|number|boolean} expected
     * @param  {boolean} ignoreCase?
     */
    greaterthanorequal: (actual, expected, ignoreCase) => {
        if (ignoreCase) {
            return DataUtil.toLowerCase(actual) >= DataUtil.toLowerCase(expected);
        }
        return actual >= expected;
    },
    /**
     * Returns true when the actual input contains the given string.
     * @param  {string|number} actual
     * @param  {string|number} expected
     * @param  {boolean} ignoreCase?
     */
    contains: (actual, expected, ignoreCase) => {
        if (ignoreCase) {
            return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) &&
                DataUtil.toLowerCase(actual).indexOf(DataUtil.toLowerCase(expected)) !== -1;
        }
        return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) &&
            actual.toString().indexOf(expected) !== -1;
    },
    /**
     * Returns true when the given input value is not null.
     * @param  {string|number} actual
     * @returns boolean
     */
    notnull: (actual) => {
        return actual !== null;
    },
    /**
     * Returns true when the given input value is null.
     * @param  {string|number} actual
     * @returns boolean
     */
    isnull: (actual) => {
        return actual === null;
    },
    /**
     * Returns true when the actual input starts with the given string
     * @param  {string} actual
     * @param  {string} expected
     * @param  {boolean} ignoreCase?
     */
    startswith: (actual, expected, ignoreCase) => {
        if (ignoreCase) {
            return actual && expected && DataUtil.startsWith(actual.toLowerCase(), expected.toLowerCase());
        }
        return actual && expected && DataUtil.startsWith(actual, expected);
    },
    /**
     * Returns true when the actual input ends with the given string.
     * @param  {string} actual
     * @param  {string} expected
     * @param  {boolean} ignoreCase?
     */
    endswith: (actual, expected, ignoreCase) => {
        if (ignoreCase) {
            return actual && expected && DataUtil.endsWith(actual.toLowerCase(), expected.toLowerCase());
        }
        return actual && expected && DataUtil.endsWith(actual, expected);
    },
    /**
     * It will return the filter operator based on the filter symbol.
     * @param  {string} operator
     * @hidden
     */
    processSymbols: (operator) => {
        let fnName = DataUtil.operatorSymbols[operator];
        if (fnName) {
            let fn = DataUtil.fnOperators[fnName];
            return fn;
        }
        return DataUtil.throwError('Query - Process Operator : Invalid operator');
    },
    /**
     * It will return the valid filter operator based on the specified operators.
     * @param  {string} operator
     * @hidden
     */
    processOperator: (operator) => {
        let fn = DataUtil.fnOperators[operator];
        if (fn) {
            return fn;
        }
        return DataUtil.fnOperators.processSymbols(operator);
    }
};
/**
 * To perform the parse operation on JSON data, like convert to string from JSON or convert to JSON from string.
 */
DataUtil.parse = {
    /**
     * Parse the given string to the plain JavaScript object.
     * @param  {string|Object|Object[]} jsonText
     */
    parseJson: (jsonText) => {
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
    /**
     * It will perform on array of values.
     * @param  {string[]|Object[]} array
     * @hidden
     */
    iterateAndReviveArray: (array) => {
        for (let i = 0; i < array.length; i++) {
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
    /**
     * It will perform on JSON values
     * @param  {JSON} json
     * @hidden
     */
    iterateAndReviveJson: (json) => {
        let value;
        let keys = Object.keys(json);
        for (let prop of keys) {
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
    /**
     * It will perform on JSON values
     * @param  {string} field
     * @param  {string|Date} value
     * @hidden
     */
    jsonReviver: (field, value) => {
        let dupValue = value;
        if (typeof value === 'string') {
            let ms = /^\/Date\(([+-]?[0-9]+)([+-][0-9]{4})?\)\/$/.exec(value);
            if (ms) {
                return DataUtil.parse.jsonReplacer({ value: new Date(parseInt(ms[1], 10)) }, false).value;
            }
            else if (/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
                let arr = dupValue.split(/[^0-9]/);
                value = DataUtil.parse.jsonReplacer({
                    value: new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5], 10))
                }, false).value;
            }
        }
        return value;
    },
    /**
     * Check wheather the given value is JSON or not.
     * @param  {Object[]} jsonData
     */
    isJson: (jsonData) => {
        if (typeof jsonData[0] === 'string') {
            return jsonData;
        }
        return DataUtil.parse.parseJson(jsonData);
    },
    /**
     * Checks wheather the given value is GUID or not.
     * @param  {string} value
     */
    isGuid: (value) => {
        let regex = /[A-Fa-f0-9]{8}(?:-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}/i;
        let match = regex.exec(value);
        return match != null;
    },
    /**
     * The method used to replace the value based on the type.
     * @param  {Object} value
     * @param  {boolean} stringify
     * @hidden
     */
    replacer: (value, stringify) => {
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
    /**
     * It will replace the JSON value.
     * @param  {string} key
     * @param  {Object} val
     * @hidden
     */
    jsonReplacer: (val, stringify = true) => {
        let value;
        let keys = Object.keys(val);
        for (let prop of keys) {
            value = val[prop];
            if (!(value instanceof Date)) {
                continue;
            }
            let d = value;
            let unixstamp = +d - (d.getTimezoneOffset() * 60000);
            val[prop] = new Date(unixstamp - (DataUtil.serverTimezoneOffset * 3600000));
            if (stringify) {
                val[prop] = val[prop].toJSON();
            }
        }
        return val;
    },
    /**
     * It will replace the Array of value.
     * @param  {string} key
     * @param  {Object[]} val
     * @hidden
     */
    arrayReplacer: (val) => {
        for (let i = 0; i < val.length; i++) {
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

/**
 * Adaptors are specific data source type aware interfaces that are used by DataManager to communicate with DataSource.
 * This is the base adaptor class that other adaptors can extend.
 * @hidden
 */
class Adaptor {
    /**
     * Constructor for Adaptor class
     * @param  {DataOptions} ds?
     * @hidden
     * @returns aggregates
     */
    constructor(ds) {
        // common options for all the adaptors 
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
        /**
         * Specifies the type of adaptor.
         * @default Adaptor
         */
        this.type = Adaptor;
        this.dataSource = ds;
        this.pvt = {};
    }
    /**
     * Returns the data from the query processing.
     * @param  {Object} data
     * @param  {DataOptions} ds?
     * @param  {Query} query?
     * @param  {XMLHttpRequest} xhr?
     * @returns Object
     */
    processResponse(data, ds, query, xhr) {
        return data;
    }
}
/**
 * JsonAdaptor is used to process JSON data. It contains methods to process the given JSON data based on the queries.
 * @hidden
 */
class JsonAdaptor extends Adaptor {
    /**
     * Process the JSON data based on the provided queries.
     * @param  {DataManager} dataManager
     * @param  {Query} query
     * @returns Object
     */
    processQuery(dataManager, query) {
        let result = dataManager.dataSource.json.slice(0);
        let count = result.length;
        let countFlg = true;
        let ret;
        let key;
        let agg = {};
        for (let i = 0; i < query.queries.length; i++) {
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
        if (query.isCountRequired) {
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
    batchRequest(dm, changes, e) {
        let i;
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
    onWhere(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.filter((obj) => {
            if (e) {
                return e.validate(obj);
            }
        });
    }
    /**
     * Returns aggregate function based on the aggregate type.
     * @param  {Object[]} ds
     * @param  {{field:string} e
     * @param  {string}} type
     */
    onAggregates(ds, e) {
        let fn = DataUtil.aggregates[e.type];
        if (!ds || !fn || ds.length === 0) {
            return null;
        }
        return fn(ds, e.field);
    }
    /**
     * Performs search operation based on the given query.
     * @param  {Object[]} ds
     * @param  {QueryOptions} e
     */
    onSearch(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        if (e.fieldNames.length === 0) {
            DataUtil.getFieldList(ds[0], e.fieldNames);
        }
        return ds.filter((obj) => {
            for (let j = 0; j < e.fieldNames.length; j++) {
                if (e.comparer.call(obj, DataUtil.getObject(e.fieldNames[j], obj), e.searchKey, e.ignoreCase)) {
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
    onSortBy(ds, e, query) {
        if (!ds || !ds.length) {
            return ds;
        }
        let fnCompare;
        let field = DataUtil.getValue(e.fieldName, query);
        if (!field) {
            return ds.sort(e.comparer);
        }
        if (field instanceof Array) {
            field = field.slice(0);
            for (let i = field.length - 1; i >= 0; i--) {
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
    }
    /**
     * Group the data based on the given query.
     * @param  {Object[]} ds
     * @param  {QueryOptions} e
     * @param  {Query} query
     */
    onGroup(ds, e, query) {
        if (!ds || !ds.length) {
            return ds;
        }
        let aggQuery = Query.filterQueries(query.queries, 'onAggregates');
        let agg = [];
        if (aggQuery.length) {
            let tmp;
            for (let i = 0; i < aggQuery.length; i++) {
                tmp = aggQuery[i].e;
                agg.push({ type: tmp.type, field: DataUtil.getValue(tmp.field, query) });
            }
        }
        return DataUtil.group(ds, DataUtil.getValue(e.fieldName, query), agg, null, null, e.comparer);
    }
    /**
     * Retrieves records based on the given page index and size.
     * @param  {Object[]} ds
     * @param  {{pageSize:number} e
     * @param  {number}} pageIndex
     * @param  {Query} query
     */
    onPage(ds, e, query) {
        let size = DataUtil.getValue(e.pageSize, query);
        let start = (DataUtil.getValue(e.pageIndex, query) - 1) * size;
        let end = start + size;
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(start, end);
    }
    /**
     * Retrieves records based on the given start and end index from query.
     * @param  {Object[]} ds
     * @param  {{start:number} e
     * @param  {number}} end
     */
    onRange(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(DataUtil.getValue(e.start), DataUtil.getValue(e.end));
    }
    /**
     * Picks the given count of records from the top of the datasource.
     * @param  {Object[]} ds
     * @param  {{nos:number}} e
     */
    onTake(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(0, DataUtil.getValue(e.nos));
    }
    /**
     * Skips the given count of records from the data source.
     * @param  {Object[]} ds
     * @param  {{nos:number}} e
     */
    onSkip(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(DataUtil.getValue(e.nos));
    }
    /**
     * Selects specified columns from the data source.
     * @param  {Object[]} ds
     * @param  {{fieldNames:string}} e
     */
    onSelect(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return DataUtil.select(ds, DataUtil.getValue(e.fieldNames));
    }
    /**
     * Inserts new record in the table.
     * @param  {DataManager} dm
     * @param  {Object} data
     * @param  {number} position
     */
    insert(dm, data, tableName, query, position) {
        if (isNullOrUndefined(position)) {
            return dm.dataSource.json.push(data);
        }
        else {
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
    remove(dm, keyField, value, tableName) {
        let ds = dm.dataSource.json;
        let i;
        if (typeof value === 'object') {
            value = value[keyField];
        }
        for (i = 0; i < ds.length; i++) {
            if (ds[i][keyField] === value) {
                break;
            }
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
    update(dm, keyField, value, tableName) {
        let ds = dm.dataSource.json;
        let i;
        let key = value[keyField];
        for (i = 0; i < ds.length; i++) {
            if (ds[i][keyField] === key) {
                break;
            }
        }
        return i < ds.length ? merge(ds[i], value) : null;
    }
}
/**
 * URL Adaptor of DataManager can be used when you are required to use remote service to retrieve data.
 * It interacts with server-side for all DataManager Queries and CRUD operations.
 * @hidden
 */
class UrlAdaptor extends Adaptor {
    /**
     * Process the query to generate request body.
     * @param  {DataManager} dm
     * @param  {Query} query
     * @param  {Object[]} hierarchyFilters?
     * @returns p
     */
    processQuery(dm, query, hierarchyFilters) {
        let queries = this.getQueryRequest(query);
        let singles = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        let params = query.params;
        let url = dm.dataSource.url;
        let temp;
        let skip;
        let take = null;
        let options = this.options;
        let request = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        // calc Paging & Range
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
        // Sorting
        for (let i = 0; i < queries.sorts.length; i++) {
            temp = DataUtil.getValue(queries.sorts[i].e.fieldName, query);
            request.sorts.push(DataUtil.callAdaptorFunction(this, 'onEachSort', { name: temp, direction: queries.sorts[i].e.direction }, query));
        }
        // hierarchy
        if (hierarchyFilters) {
            temp = this.getFiltersFrom(hierarchyFilters, query);
            if (temp) {
                request.filters.push(DataUtil.callAdaptorFunction(this, 'onEachWhere', temp.toJson(), query));
            }
        }
        // Filters
        for (let i = 0; i < queries.filters.length; i++) {
            request.filters.push(DataUtil.callAdaptorFunction(this, 'onEachWhere', queries.filters[i].e.toJson(), query));
            let keys = typeof request.filters[i] === 'object' ? Object.keys(request.filters[i]) : [];
            for (let prop of keys) {
                if (DataUtil.isNull((request)[prop])) {
                    delete request[prop];
                }
            }
        }
        // Searches
        for (let i = 0; i < queries.searches.length; i++) {
            temp = queries.searches[i].e;
            request.searches.push(DataUtil.callAdaptorFunction(this, 'onEachSearch', {
                fields: temp.fieldNames,
                operator: temp.operator,
                key: temp.searchKey,
                ignoreCase: temp.ignoreCase
            }, query));
        }
        // Grouping
        for (let i = 0; i < queries.groups.length; i++) {
            request.groups.push(DataUtil.getValue(queries.groups[i].e.fieldName, query));
        }
        // aggregates
        for (let i = 0; i < queries.aggregates.length; i++) {
            temp = queries.aggregates[i].e;
            request.aggregates.push({ type: temp.type, field: DataUtil.getValue(temp.field, query) });
        }
        let req = {};
        this.getRequestQuery(options, query, singles, request, req);
        // Params
        DataUtil.callAdaptorFunction(this, 'addParams', { dm: dm, query: query, params: params, reqParams: req });
        // cleanup
        let keys = Object.keys(req);
        for (let prop of keys) {
            if (DataUtil.isNull(req[prop]) || req[prop] === '' || req[prop].length === 0) {
                delete req[prop];
            }
        }
        if (!(options.skip in req && options.take in req) && take !== null) {
            req[options.skip] = DataUtil.callAdaptorFunction(this, 'onSkip', skip, query);
            req[options.take] = DataUtil.callAdaptorFunction(this, 'onTake', take, query);
        }
        let p = this.pvt;
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
    }
    getRequestQuery(options, query, singles, request, request1) {
        let param = 'param';
        let req = request1;
        req[options.from] = query.fromTable;
        if (options.expand) {
            req[options.expand] = query.expands;
        }
        req[options.select] = 'onSelect' in singles ?
            DataUtil.callAdaptorFunction(this, 'onSelect', DataUtil.getValue(singles.onSelect.fieldNames, query), query) : '';
        req[options.count] = query.isCountRequired ? DataUtil.callAdaptorFunction(this, 'onCount', query.isCountRequired, query) : '';
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
    convertToQueryString(request, query, dm) {
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
    processResponse(data, ds, query, xhr, request, changes) {
        let requests = request;
        let pvt = requests.pvtData || {};
        let groupDs = data.groupDs;
        if (xhr && xhr.getResponseHeader('Content-Type') &&
            xhr.getResponseHeader('Content-Type').indexOf('xml') !== -1) {
            return (query.isCountRequired ? { result: [], count: 0 } : []);
        }
        let d = JSON.parse(requests.data);
        if (d && d.action === 'batch' && data.addedRecords) {
            changes.addedRecords = data.addedRecords;
            return changes;
        }
        if (data.d) {
            data = data.d;
        }
        let args = {};
        if ('count' in data) {
            args.count = data.count;
        }
        args.result = data.result ? data.result : data;
        this.getAggregateResult(pvt, data, args, groupDs);
        return DataUtil.isNull(args.count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    }
    /**
     * Add the group query to the adaptor`s option.
     * @param  {Object[]} e
     * @returns void
     */
    onGroup(e) {
        this.pvt.groups = e;
        return e;
    }
    /**
     * Add the aggregate query to the adaptor`s option.
     * @param  {Aggregates[]} e
     * @returns void
     */
    onAggregates(e) {
        this.pvt.aggregates = e;
    }
    /**
     * Prepare the request body based on the newly added, removed and updated records.
     * The result is used by the batch request.
     * @param  {DataManager} dm
     * @param  {CrudOptions} changes
     * @param  {Object} e
     */
    batchRequest(dm, changes, e) {
        let url;
        let key;
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
    beforeSend(dm, request) {
        // need to extend this method
    }
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     * @param  {DataManager} dm
     * @param  {Object} data
     * @param  {string} tableName
     */
    insert(dm, data, tableName) {
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
    remove(dm, keyField, value, tableName) {
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
    update(dm, keyField, value, tableName) {
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
    getFiltersFrom(data, query) {
        let key = query.fKey;
        let value;
        let prop = key;
        let pKey = query.key;
        let predicats = [];
        if (typeof data[0] !== 'object') {
            prop = null;
        }
        for (let i = 0; i < data.length; i++) {
            if (typeof data[0] === 'object') {
                value = DataUtil.getObject(pKey || prop, data[i]);
            }
            else {
                value = data[i];
            }
            predicats.push(new Predicate(key, 'equal', value));
        }
        return Predicate.or(predicats);
    }
    getAggregateResult(pvt, data, args, groupDs) {
        let pData = data;
        if (data && data.result) {
            pData = data.result;
        }
        if (pvt && pvt.aggregates && pvt.aggregates.length) {
            let agg = pvt.aggregates;
            let fn;
            let aggregateData = pData;
            let res = {};
            if (data.aggregate) {
                aggregateData = data.aggregate;
            }
            for (let i = 0; i < agg.length; i++) {
                fn = DataUtil.aggregates[agg[i].type];
                if (fn) {
                    res[agg[i].field + ' - ' + agg[i].type] = fn(aggregateData, agg[i].field);
                }
            }
            args.aggregates = res;
        }
        if (pvt && pvt.groups && pvt.groups.length) {
            let groups = pvt.groups;
            for (let i = 0; i < groups.length; i++) {
                let level = null;
                if (!isNullOrUndefined(groupDs)) {
                    groupDs = DataUtil.group(groupDs, groups[i]);
                }
                pData = DataUtil.group(pData, groups[i], pvt.aggregates, level, groupDs);
            }
            args.result = pData;
        }
        return args;
    }
    getQueryRequest(query) {
        let req = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        req.sorts = Query.filterQueries(query.queries, 'onSortBy');
        req.groups = Query.filterQueries(query.queries, 'onGroup');
        req.filters = Query.filterQueries(query.queries, 'onWhere');
        req.searches = Query.filterQueries(query.queries, 'onSearch');
        req.aggregates = Query.filterQueries(query.queries, 'onAggregates');
        return req;
    }
    addParams(options) {
        let req = options.reqParams;
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
class ODataAdaptor extends UrlAdaptor {
    constructor() {
        super();
        // options replaced the default adaptor options
        this.options = extend({}, this.options, {
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
        this.getModuleName = getValue('getModulename', this);
    }
    /**
     * Generate request string based on the filter criteria from query.
     * @param  {Predicate} pred
     * @param  {boolean} requiresCast?
     */
    onPredicate(predicate, query, requiresCast) {
        let returnValue = '';
        let operator;
        let guid;
        let val = predicate.value;
        let type = typeof val;
        let field = predicate.field ? ODataAdaptor.getField(predicate.field) : null;
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
            let temp = val;
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
    }
    /**
     * Generate request string based on the multiple filter criteria from query.
     * @param  {Predicate} pred
     * @param  {boolean} requiresCast?
     */
    onComplexPredicate(predicate, query, requiresCast) {
        let res = [];
        for (let i = 0; i < predicate.predicates.length; i++) {
            res.push('(' + this.onEachWhere(predicate.predicates[i], query, requiresCast) + ')');
        }
        return res.join(' ' + predicate.condition + ' ');
    }
    /**
     * Generate query string based on the multiple filter criteria from query.
     * @param  {Predicate} filter
     * @param  {boolean} requiresCast?
     */
    onEachWhere(filter, query, requiresCast) {
        return filter.isComplex ? this.onComplexPredicate(filter, query, requiresCast) : this.onPredicate(filter, query, requiresCast);
    }
    /**
     * Generate query string based on the multiple filter criteria from query.
     * @param  {string[]} filters
     */
    onWhere(filters) {
        if (this.pvt.search) {
            filters.push(this.onEachWhere(this.pvt.search, null, true));
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
    onEachSearch(e) {
        if (e.fields && e.fields.length === 0) {
            DataUtil.throwError('Query() - Search : oData search requires list of field names to search');
        }
        let filter = this.pvt.search || [];
        for (let i = 0; i < e.fields.length; i++) {
            filter.push(new Predicate(e.fields[i], e.operator, e.key, e.ignoreCase));
        }
        this.pvt.search = filter;
    }
    /**
     * Generate query string based on the search criteria from query.
     * @param  {Object} e
     */
    onSearch(e) {
        this.pvt.search = Predicate.or(this.pvt.search);
        return '';
    }
    /**
     * Generate query string based on multiple sort criteria from query.
     * @param  {QueryOptions} e
     */
    onEachSort(e) {
        let res = [];
        if (e.name instanceof Array) {
            for (let i = 0; i < e.name.length; i++) {
                res.push(ODataAdaptor.getField(e.name[i]) + (e.direction === 'descending' ? ' desc' : ''));
            }
        }
        else {
            res.push(ODataAdaptor.getField(e.name) + (e.direction === 'descending' ? ' desc' : ''));
        }
        return res.join(',');
    }
    /**
     * Returns sort query string.
     * @param  {string[]} e
     */
    onSortBy(e) {
        return e.reverse().join(',');
    }
    /**
     * Adds the group query to the adaptor option.
     * @param  {Object[]} e
     * @returns string
     */
    onGroup(e) {
        this.pvt.groups = e;
        return [];
    }
    /**
     * Returns the select query string.
     * @param  {string[]} e
     */
    onSelect(e) {
        for (let i = 0; i < e.length; i++) {
            e[i] = ODataAdaptor.getField(e[i]);
        }
        return e.join(',');
    }
    /**
     * Add the aggregate query to the adaptor option.
     * @param  {Object[]} e
     * @returns string
     */
    onAggregates(e) {
        this.pvt.aggregates = e;
        return '';
    }
    /**
     * Returns the query string which requests total count from the data source.
     * @param  {boolean} e
     * @returns string
     */
    onCount(e) {
        return e === true ? 'allpages' : '';
    }
    /**
     * Method will trigger before send the request to server side.
     * Used to set the custom header or modify the request options.
     * @param  {DataManager} dm
     * @param  {XMLHttpRequest} request
     * @param  {Ajax} settings?
     */
    beforeSend(dm, request, settings) {
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
    processResponse(data, ds, query, xhr, request, changes) {
        let pvtData = 'pvtData';
        if (!isNullOrUndefined(data.d)) {
            let dataCopy = ((query && query.isCountRequired) ? data.d.results : data.d);
            let metaData = '__metadata';
            if (!isNullOrUndefined(dataCopy)) {
                for (let i = 0; i < dataCopy.length; i++) {
                    if (!isNullOrUndefined(dataCopy[i][metaData])) {
                        delete dataCopy[i][metaData];
                    }
                }
            }
        }
        let pvt = request && request[pvtData];
        let emptyAndBatch = this.processBatchResponse(data, query, xhr, request, changes);
        if (emptyAndBatch) {
            return emptyAndBatch;
        }
        let versionCheck = xhr && request.getResponseHeader('DataServiceVersion');
        let count = null;
        let version = (versionCheck && parseInt(versionCheck, 10)) || 2;
        if (query && query.isCountRequired) {
            let oDataCount = '__count';
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
        let args = {};
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
    convertToQueryString(request, query, dm) {
        let res = [];
        let table = 'table';
        let tableName = request[table] || '';
        let format = '$format';
        delete request[table];
        if (dm.dataSource.requiresFormat) {
            request[format] = 'json';
        }
        let keys = Object.keys(request);
        for (let prop of keys) {
            res.push(prop + '=' + request[prop]);
        }
        res = res.join('&');
        if (dm.dataSource.url && dm.dataSource.url.indexOf('?') !== -1 && !tableName) {
            return res;
        }
        return res.length ? tableName + '?' + res : tableName || '';
    }
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     * @param  {DataManager} dm
     * @param  {Object} data
     * @param  {string} tableName?
     */
    insert(dm, data, tableName) {
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
    remove(dm, keyField, value, tableName) {
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
    update(dm, keyField, value, tableName) {
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
    batchRequest(dm, changes, e) {
        let initialGuid = e.guid = DataUtil.getGuid(this.options.batchPre);
        let url = dm.dataSource.url.replace(/\/*$/, '/' + this.options.batch);
        let args = {
            url: e.url,
            key: e.key,
            cid: 1,
            cSet: DataUtil.getGuid(this.options.changeSet)
        };
        let req = '--' + initialGuid + '\n';
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
    generateDeleteRequest(arr, e) {
        if (!arr) {
            return '';
        }
        let req = '';
        let stat = {
            'method': 'DELETE ',
            'url': (data, i, key) => '(' + data[i][key] + ')',
            'data': (data, i) => ''
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
    generateInsertRequest(arr, e) {
        if (!arr) {
            return '';
        }
        let req = '';
        let stat = {
            'method': 'POST ',
            'url': (data, i, key) => '',
            'data': (data, i) => JSON.stringify(data[i]) + '\n\n'
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
    generateUpdateRequest(arr, e) {
        if (!arr) {
            return '';
        }
        let req = '';
        let stat = {
            'method': 'PUT ',
            'url': (data, i, key) => '(' + data[i][key] + ')',
            'data': (data, i) => JSON.stringify(data[i]) + '\n\n'
        };
        req = this.generateBodyContent(arr, e, stat);
        return req;
    }
    static getField(prop) {
        return prop.replace(/\./g, '/');
    }
    generateBodyContent(arr, e, stat) {
        let req = '';
        for (let i = 0; i < arr.length; i++) {
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
    processBatchResponse(data, query, xhr, request, changes) {
        if (xhr && xhr.getResponseHeader('Content-Type') && xhr.getResponseHeader('Content-Type').indexOf('xml') !== -1) {
            return (query.isCountRequired ? { result: [], count: 0 } : []);
        }
        if (request && this.options.batch && DataUtil.endsWith(request.url, this.options.batch) && request.type.toLowerCase() === 'post') {
            let guid = xhr.getResponseHeader('Content-Type');
            let cIdx;
            let jsonObj;
            let d = data + '';
            guid = guid.substring(guid.indexOf('=batchresponse') + 1);
            d = d.split(guid);
            if (d.length < 2) {
                return {};
            }
            d = d[1];
            let exVal = /(?:\bContent-Type.+boundary=)(changesetresponse.+)/i.exec(d);
            if (exVal) {
                d.replace(exVal[0], '');
            }
            let changeGuid = exVal ? exVal[1] : '';
            d = d.split(changeGuid);
            for (let i = d.length; i > -1; i--) {
                if (!/\bContent-ID:/i.test(d[i]) || !/\bHTTP.+201/.test(d[i])) {
                    continue;
                }
                cIdx = parseInt(/\bContent-ID: (\d+)/i.exec(d[i])[1], 10);
                if (changes.addedRecords[cIdx]) {
                    jsonObj = DataUtil.parse.parseJson(/^\{.+\}/m.exec(d[i])[0]);
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
class ODataV4Adaptor extends ODataAdaptor {
    constructor() {
        super(...arguments);
        // options replaced the default adaptor options
        this.options = extend({}, this.options, {
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
    }
    /**
     * @hidden
     */
    getModulename() {
        return 'ODataV4Adaptor';
    }
    ;
    /**
     * Returns the query string which requests total count from the data source.
     * @param  {boolean} e
     * @returns string
     */
    onCount(e) {
        return e === true ? 'true' : '';
    }
    /**
     * Generate request string based on the filter criteria from query.
     * @param  {Predicate} pred
     * @param  {boolean} requiresCast?
     */
    onPredicate(predicate, query, requiresCast) {
        let returnValue = '';
        let val = predicate.value;
        let isDate = val instanceof Date;
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
    onEachSearch(e) {
        let search = this.pvt.searches || [];
        search.push(e.key);
        this.pvt.searches = search;
    }
    /**
     *  Generate query string based on the search criteria from query.
     * @param  {Object} e
     */
    onSearch(e) {
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
    beforeSend(dm, request, settings) {
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
    processResponse(data, ds, query, xhr, request, changes) {
        let pvtData = 'pvtData';
        let pvt = request && request[pvtData];
        let emptyAndBatch = super.processBatchResponse(data, query, xhr, request, changes);
        if (emptyAndBatch) {
            return emptyAndBatch;
        }
        let count = null;
        let dataCount = '@odata.count';
        if (query && query.isCountRequired) {
            if (dataCount in data) {
                count = data[dataCount];
            }
        }
        data = data.value;
        let args = {};
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
class WebApiAdaptor extends ODataAdaptor {
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     * @param  {DataManager} dm
     * @param  {Object} data
     * @param  {string} tableName?
     */
    insert(dm, data, tableName) {
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
    remove(dm, keyField, value, tableName) {
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
    update(dm, keyField, value, tableName) {
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
    beforeSend(dm, request, settings) {
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
    processResponse(data, ds, query, xhr, request, changes) {
        let pvtData = 'pvtData';
        let pvt = request && request[pvtData];
        let count = null;
        let args = {};
        if (request && request.type.toLowerCase() !== 'post') {
            let versionCheck = xhr && request.getResponseHeader('DataServiceVersion');
            let version = (versionCheck && parseInt(versionCheck, 10)) || 2;
            if (query && query.isCountRequired) {
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
    }
}
/**
 * WebMethodAdaptor can be used by DataManager to interact with web method.
 * @hidden
 */
class WebMethodAdaptor extends UrlAdaptor {
    /**
     * Prepare the request body based on the query.
     * The query information can be accessed at the WebMethod using variable named `value`.
     * @param  {DataManager} dm
     * @param  {Query} query
     * @param  {Object[]} hierarchyFilters?
     * @returns application
     */
    processQuery(dm, query, hierarchyFilters) {
        let obj = new UrlAdaptor().processQuery(dm, query, hierarchyFilters);
        let getData = 'data';
        let data = DataUtil.parse.parseJson(obj[getData]);
        let result = {};
        let value = 'value';
        if (data.param) {
            for (let i = 0; i < data.param.length; i++) {
                let param = data.param[i];
                let key = Object.keys(param)[0];
                result[key] = param[key];
            }
        }
        result[value] = data;
        let pvtData = 'pvtData';
        let url = 'url';
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
class RemoteSaveAdaptor extends JsonAdaptor {
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
    batchRequest(dm, changes, e) {
        let i;
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
class CacheAdaptor extends UrlAdaptor {
    /**
     * Constructor for CacheAdaptor class.
     * @param  {CacheAdaptor} adaptor?
     * @param  {number} timeStamp?
     * @param  {number} pageSize?
     * @hidden
     */
    constructor(adaptor, timeStamp, pageSize) {
        super();
        this.isCrudAction = false;
        this.isInsertAction = false;
        if (!isNullOrUndefined(adaptor)) {
            this.cacheAdaptor = adaptor;
        }
        this.pageSize = pageSize;
        this.guidId = DataUtil.getGuid('cacheAdaptor');
        let obj = { keys: [], results: [] };
        window.localStorage.setItem(this.guidId, JSON.stringify(obj));
        let guid = this.guidId;
        if (!isNullOrUndefined(timeStamp)) {
            setInterval(() => {
                let data;
                data = DataUtil.parse.parseJson(window.localStorage.getItem(guid));
                let forDel = [];
                for (let i = 0; i < data.results.length; i++) {
                    let currentTime = +new Date();
                    let requestTime = +new Date(data.results[i].timeStamp);
                    data.results[i].timeStamp = currentTime - requestTime;
                    if (currentTime - requestTime > timeStamp) {
                        forDel.push(i);
                    }
                }
                for (let i = 0; i < forDel.length; i++) {
                    data.results.splice(forDel[i], 1);
                    data.keys.splice(forDel[i], 1);
                }
                window.localStorage.removeItem(guid);
                window.localStorage.setItem(guid, JSON.stringify(data));
            }, timeStamp);
        }
    }
    /**
     * It will generate the key based on the URL when we send a request to server.
     * @param  {string} url
     * @param  {Query} query?
     * @hidden
     */
    generateKey(url, query) {
        let queries = this.getQueryRequest(query);
        let singles = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        let key = url;
        let page = 'onPage';
        if (page in singles) {
            key += singles[page].pageIndex;
        }
        queries.sorts.forEach((obj) => {
            key += obj.e.direction + obj.e.fieldName;
        });
        queries.groups.forEach((obj) => {
            key += obj.e.fieldName;
        });
        queries.searches.forEach((obj) => {
            key += obj.e.searchKey;
        });
        for (let filter = 0; filter < queries.filters.length; filter++) {
            let currentFilter = queries.filters[filter];
            if (currentFilter.e.isComplex) {
                let newQuery = query.clone();
                newQuery.queries = [];
                for (let i = 0; i < currentFilter.e.predicates.length; i++) {
                    newQuery.queries.push({ fn: 'onWhere', e: currentFilter.e.predicates[i], filter: query.queries.filter });
                }
                key += currentFilter.e.condition + this.generateKey(url, newQuery);
            }
            else {
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
    processQuery(dm, query, hierarchyFilters) {
        let key = this.generateKey(dm.dataSource.url, query);
        let cachedItems;
        cachedItems = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
        let data = cachedItems ? cachedItems.results[cachedItems.keys.indexOf(key)] : null;
        if (data != null && !this.isCrudAction && !this.isInsertAction) {
            return data;
        }
        this.isCrudAction = null;
        this.isInsertAction = null;
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
    processResponse(data, ds, query, xhr, request, changes) {
        if (this.isInsertAction || (request && this.cacheAdaptor.options.batch &&
            DataUtil.endsWith(request.url, this.cacheAdaptor.options.batch) && request.type.toLowerCase() === 'post')) {
            return this.cacheAdaptor.processResponse(data, ds, query, xhr, request, changes);
        }
        data = this.cacheAdaptor.processResponse.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
        let key = query ? this.generateKey(ds.dataSource.url, query) : ds.dataSource.url;
        let obj = {};
        obj = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
        let index = obj.keys.indexOf(key);
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
    beforeSend(dm, request, settings) {
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
    update(dm, keyField, value, tableName) {
        this.isCrudAction = true;
        return this.cacheAdaptor.update(dm, keyField, value, tableName);
    }
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     * @param  {DataManager} dm
     * @param  {Object} data
     * @param  {string} tableName?
     */
    insert(dm, data, tableName) {
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
    remove(dm, keyField, value, tableName) {
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
    batchRequest(dm, changes, e) {
        return this.cacheAdaptor.batchRequest(dm, changes, e);
    }
}

/**
 * DataManager is used to manage and manipulate relational data.
 */
class DataManager {
    /**
     * Constructor for DataManager class
     * @param  {DataOptions|JSON[]} dataSource?
     * @param  {Query} query?
     * @param  {AdaptorOptions|string} adaptor?
     * @hidden
     */
    constructor(dataSource, query, adaptor) {
        /** @hidden */
        this.dateParse = true;
        this.requests = [];
        if (!dataSource && !this.dataSource) {
            dataSource = [];
        }
        adaptor = adaptor || dataSource.adaptor;
        let data;
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
                    : dataSource.adaptor instanceof RemoteSaveAdaptor ? false : dataSource.url ? false : true,
                requiresFormat: dataSource.requiresFormat
            };
        }
        else {
            DataUtil.throwError('DataManager: Invalid arguments');
        }
        if (data.requiresFormat === undefined && !DataUtil.isCors()) {
            data.requiresFormat = isNullOrUndefined(data.crossDomain) ? true : data.crossDomain;
        }
        if (data.dataType === undefined) {
            data.dataType = 'json';
        }
        this.dataSource = data;
        this.defaultQuery = query;
        if (data.url && data.offline && !data.json.length) {
            this.isDataAvailable = false;
            this.adaptor = adaptor || new ODataAdaptor();
            this.dataSource.offline = false;
            this.ready = this.executeQuery(query || new Query());
            this.ready.then((e) => {
                this.dataSource.offline = true;
                this.isDataAvailable = true;
                data.json = e.result;
                this.adaptor = new JsonAdaptor();
            });
        }
        else {
            this.adaptor = data.offline ? new JsonAdaptor() : new ODataAdaptor();
        }
        if (!data.jsonp && this.adaptor instanceof ODataAdaptor) {
            data.jsonp = 'callback';
        }
        this.adaptor = adaptor || this.adaptor;
        if (data.enableCaching) {
            this.adaptor = new CacheAdaptor(this.adaptor, data.timeTillExpiration, data.cachingPageSize);
        }
        return this;
    }
    /**
     * Overrides DataManager's default query with given query.
     * @param  {Query} query - Defines the new default query.
     */
    setDefaultQuery(query) {
        this.defaultQuery = query;
        return this;
    }
    /**
     * Executes the given query with local data source.
     * @param  {Query} query - Defines the query to retrieve data.
     */
    executeLocal(query) {
        if (!this.defaultQuery && !(query instanceof Query)) {
            DataUtil.throwError('DataManager - executeLocal() : A query is required to execute');
        }
        if (!this.dataSource.json) {
            DataUtil.throwError('DataManager - executeLocal() : Json data is required to execute');
        }
        query = query || this.defaultQuery;
        let result = this.adaptor.processQuery(this, query);
        if (query.subQuery) {
            let from = query.subQuery.fromTable;
            let lookup = query.subQuery.lookups;
            let res = query.isCountRequired ? result.result :
                result;
            if (lookup && lookup instanceof Array) {
                DataUtil.buildHierarchy(query.subQuery.fKey, from, res, lookup, query.subQuery.key);
            }
            for (let j = 0; j < res.length; j++) {
                if (res[j][from] instanceof Array) {
                    res[j] = extend({}, {}, res[j]);
                    res[j][from] = this.adaptor.processResponse(query.subQuery.using(new DataManager(res[j][from].slice(0))).executeLocal(), this, query);
                }
            }
        }
        return this.adaptor.processResponse(result, this, query);
    }
    /**
     * Executes the given query with either local or remote data source.
     * It will be executed as asynchronously and returns Promise object which will be resolved or rejected after action completed.
     * @param  {Query|Function} query - Defines the query to retrieve data.
     * @param  {Function} done - Defines the callback function and triggers when the Promise is resolved.
     * @param  {Function} fail - Defines the callback function and triggers when the Promise is rejected.
     * @param  {Function} always - Defines the callback function and triggers when the Promise is resolved or rejected.
     */
    executeQuery(query, done, fail, always) {
        if (typeof query === 'function') {
            always = fail;
            fail = done;
            done = query;
            query = null;
        }
        if (!query) {
            query = this.defaultQuery;
        }
        if (!(query instanceof Query)) {
            DataUtil.throwError('DataManager - executeQuery() : A query is required to execute');
        }
        let deffered = new Deferred();
        let args = { query: query };
        if (!this.dataSource.offline && this.dataSource.url !== undefined) {
            let result = this.adaptor.processQuery(this, query);
            this.makeRequest(result, deffered, args, query);
        }
        else {
            DataManager.nextTick(() => {
                let res = this.executeLocal(query);
                args = DataManager.getDeferedArgs(query, res, args);
                deffered.resolve(args);
            });
        }
        return deffered.promise;
    }
    static getDeferedArgs(query, result, args) {
        if (query.isCountRequired) {
            args.result = result.result;
            args.count = result.count;
            args.aggregates = result.aggregates;
        }
        else {
            args.result = result;
        }
        return args;
    }
    static nextTick(fn) {
        (window.setImmediate || window.setTimeout)(fn, 0);
    }
    extendRequest(url, fnSuccess, fnFail) {
        return extend({}, {
            type: 'GET',
            dataType: this.dataSource.dataType,
            crossDomain: this.dataSource.crossDomain,
            jsonp: this.dataSource.jsonp,
            cache: true,
            processData: false,
            onSuccess: fnSuccess,
            onFailure: fnFail
        }, url);
    }
    makeRequest(url, deffered, args, query) {
        let isSelector = !!query.subQuerySelector;
        let fnFail = (e) => {
            args.error = e;
            deffered.reject(args);
        };
        let process = (data, count, xhr, request, actual, aggregates, virtualSelectRecords) => {
            args.xhr = xhr;
            args.count = count ? parseInt(count.toString(), 10) : 0;
            args.result = data;
            args.request = request;
            args.aggregates = aggregates;
            args.actual = actual;
            args.virtualSelectRecords = virtualSelectRecords;
            deffered.resolve(args);
        };
        let fnQueryChild = (data, selector) => {
            let subDeffer = new Deferred();
            let childArgs = { parent: args };
            query.subQuery.isChild = true;
            let subUrl = this.adaptor.processQuery(this, query.subQuery, data ? this.adaptor.processResponse(data) : selector);
            let childReq = this.makeRequest(subUrl, subDeffer, childArgs, query.subQuery);
            if (!isSelector) {
                subDeffer.then((subData) => {
                    if (data) {
                        DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, data, subData, query.subQuery.key);
                        process(data, subData.count, subData.xhr);
                    }
                }, fnFail);
            }
            return childReq;
        };
        let fnSuccess = (data, request) => {
            if (request.httpRequest.getResponseHeader('Content-Type').indexOf('xml') === -1 && this.dateParse) {
                data = DataUtil.parse.parseJson(data);
            }
            let result = this.adaptor.processResponse(data, this, query, request.httpRequest, request);
            let count = 0;
            let aggregates = null;
            let virtualSelectRecords = 'virtualSelectRecords';
            let virtualRecords = data[virtualSelectRecords];
            if (query.isCountRequired) {
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
        let req = this.extendRequest(url, fnSuccess, fnFail);
        let ajax = new Ajax(req);
        ajax.beforeSend = () => {
            this.beforeSend(ajax.httpRequest, ajax);
        };
        req = ajax.send();
        req.catch((e) => true); // to handle failure remote requests.        
        this.requests.push(ajax);
        if (isSelector) {
            let promise;
            let res = query.subQuerySelector.call(this, { query: query.subQuery, parent: query });
            if (res && res.length) {
                promise = Promise.all([req, fnQueryChild(null, res)]);
                promise.then((...args) => {
                    let result = args[0];
                    let pResult = this.adaptor.processResponse(result[0], this, query, this.requests[0].httpRequest, this.requests[0]);
                    let count = 0;
                    if (query.isCountRequired) {
                        count = pResult.count;
                        pResult = pResult.result;
                    }
                    let cResult = this.adaptor.processResponse(result[1], this, query.subQuery, this.requests[1].httpRequest, this.requests[1]);
                    count = 0;
                    if (query.subQuery.isCountRequired) {
                        count = cResult.count;
                        cResult = cResult.result;
                    }
                    DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, pResult, cResult, query.subQuery.key);
                    isSelector = false;
                    process(pResult, count, this.requests[0].httpRequest);
                });
            }
            else {
                isSelector = false;
            }
        }
        return req;
    }
    beforeSend(request, settings) {
        this.adaptor.beforeSend(this, request, settings);
        let headers = this.dataSource.headers;
        let props;
        for (let i = 0; headers && i < headers.length; i++) {
            props = [];
            let keys = Object.keys(headers[i]);
            for (let prop of keys) {
                props.push(prop);
                request.setRequestHeader(prop, headers[i][prop]);
            }
        }
    }
    /**
     * Save bulk changes to the given table name.
     * User can add a new record, edit an existing record, and delete a record at the same time.
     * If the datasource from remote, then updated in a single post.
     * @param  {Object} changes - Defines the CrudOptions.
     * @param  {string} key - Defines the column field.
     * @param  {string|Query} tableName - Defines the table name.
     * @param  {Query} query - Sets default query for the DataManager.
     */
    saveChanges(changes, key, tableName, query) {
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        let args = {
            url: tableName,
            key: key || this.dataSource.key
        };
        let req = this.adaptor.batchRequest(this, changes, args, query);
        if (this.dataSource.offline) {
            return req;
        }
        let deff = new Deferred();
        let ajax = new Ajax(req);
        ajax.beforeSend = () => {
            this.beforeSend(ajax.httpRequest, ajax);
        };
        ajax.onSuccess = (data, request) => {
            deff.resolve(this, [this.adaptor.processResponse(data, this, null, request.httpRequest, request, changes)]);
        };
        ajax.onFailure = (e) => {
            deff.reject([{ error: e }]);
        };
        ajax.send().catch((e) => true); // to handle the failure requests.        
        return deff.promise;
    }
    /**
     * Inserts new record in the given table.
     * @param  {Object} data - Defines the data to insert.
     * @param  {string|Query} tableName - Defines the table name.
     * @param  {Query} query - Sets default query for the DataManager.
     */
    insert(data, tableName, query, position) {
        data = DataUtil.parse.replacer(data);
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        let req = this.adaptor.insert(this, data, tableName, query, position);
        if (this.dataSource.offline) {
            return req;
        }
        return this.doAjaxRequest(req);
    }
    /**
     * Removes data from the table with the given key.
     * @param  {string} keyField - Defines the column field.
     * @param  {Object} value - Defines the value to find the data in the specified column.
     * @param  {string|Query} tableName - Defines the table name
     * @param  {Query} query - Sets default query for the DataManager.
     */
    remove(keyField, value, tableName, query) {
        if (typeof value === 'object') {
            value = value[keyField];
        }
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        let res = this.adaptor.remove(this, keyField, value, tableName, query);
        if (this.dataSource.offline) {
            return res;
        }
        return this.doAjaxRequest(res);
    }
    /**
     * Updates existing record in the given table.
     * @param  {string} keyField - Defines the column field.
     * @param  {Object} value - Defines the value to find the data in the specified column.
     * @param  {string|Query} tableName - Defines the table name
     * @param  {Query} query - Sets default query for the DataManager.
     */
    update(keyField, value, tableName, query) {
        value = DataUtil.parse.replacer(value, !this.dataSource.offline);
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        let res = this.adaptor.update(this, keyField, value, tableName, query);
        if (this.dataSource.offline) {
            return res;
        }
        return this.doAjaxRequest(res);
    }
    doAjaxRequest(res) {
        let defer = new Deferred();
        res = extend({}, {
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            processData: false
        }, res);
        let ajax = new Ajax(res);
        ajax.beforeSend = () => {
            this.beforeSend(ajax.httpRequest, ajax);
        };
        ajax.onSuccess = (record, request) => {
            try {
                DataUtil.parse.parseJson(record);
            }
            catch (e) {
                record = [];
            }
            record = this.adaptor.processResponse(DataUtil.parse.parseJson(record), this, null, request.httpRequest, request);
            defer.resolve(this, [{ record: record, dataManager: this }]);
        };
        ajax.onFailure = (e) => {
            defer.reject([{ error: e }]);
        };
        ajax.send().catch((e) => true); // to handle the failure requests.
        return defer.promise;
    }
}
/**
 * Deferred is used to handle asynchronous operation.
 */
class Deferred {
    constructor() {
        /**
         * Promise is an object that represents a value that may not be available yet, but will be resolved at some point in the future.
         */
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        /**
         * Defines the callback function triggers when the Deferred object is resolved.
         */
        this.then = this.promise.then.bind(this.promise);
        /**
         * Defines the callback function triggers when the Deferred object is rejected.
         */
        this.catch = this.promise.catch.bind(this.promise);
    }
}

/**
 * Data modules
 */

export { DataManager, Deferred, Query, Predicate, Adaptor, JsonAdaptor, UrlAdaptor, ODataAdaptor, ODataV4Adaptor, WebApiAdaptor, WebMethodAdaptor, RemoteSaveAdaptor, CacheAdaptor, DataUtil };
//# sourceMappingURL=ej2-data.es2015.js.map
