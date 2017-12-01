import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager } from './manager';
import { Query } from './query';
var consts = { GroupGuid: '{271bbba0-1ee7}' };
/**
 * Data manager common utility methods.
 * @hidden
 */
var DataUtil = /** @class */ (function () {
    function DataUtil() {
    }
    /**
     * Returns the value by invoking the provided parameter function.
     * If the paramater is not of type function then it will be returned as it is.
     * @param  {Function|string|string[]|number} value
     * @param  {Object} inst?
     * @hidden
     */
    DataUtil.getValue = function (value, inst) {
        if (typeof value === 'function') {
            return value.call(inst || {});
        }
        return value;
    };
    /**
     * Returns true if the input string ends with given string.
     * @param  {string} input
     * @param  {string} substr
     */
    DataUtil.endsWith = function (input, substr) {
        return input.slice(-substr.length) === substr;
    };
    /**
     * Returns true if the input string starts with given string.
     * @param  {string} str
     * @param  {string} startstr
     */
    DataUtil.startsWith = function (input, start) {
        return input.slice(0, start.length) === start;
    };
    /**
     * To return the sorting function based on the string.
     * @param  {string} order
     * @hidden
     */
    DataUtil.fnSort = function (order) {
        order = order ? order.toLowerCase() : 'ascending';
        if (order === 'ascending') {
            return this.fnAscending;
        }
        return this.fnDescending;
    };
    /**
     * Comparer function which is used to sort the data in ascending order.
     * @param  {string|number} x
     * @param  {string|number} y
     * @returns number
     */
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
    /**
     * Comparer function which is used to sort the data in descending order.
     * @param  {string|number} x
     * @param  {string|number} y
     * @returns number
     */
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
    /**
     * Select objects by given fields from jsonArray.
     * @param  {Object[]} jsonArray
     * @param  {string[]} fields
     */
    DataUtil.select = function (jsonArray, fields) {
        var newData = [];
        for (var i = 0; i < jsonArray.length; i++) {
            newData.push(this.extractFields(jsonArray[i], fields));
        }
        return newData;
    };
    /**
     * Group the input data based on the field name.
     * It also performs aggregation of the grouped records based on the aggregates paramater.
     * @param  {Object[]} jsonArray
     * @param  {string} field?
     * @param  {Object[]} agg?
     * @param  {number} level?
     * @param  {Object[]} groupDs?
     */
    DataUtil.group = function (jsonArray, field, aggregates, level, groupDs, format) {
        level = level || 1;
        var jsonData = jsonArray;
        var guid = 'GroupGuid';
        if (jsonData.GroupGuid === consts[guid]) {
            var _loop_1 = function (j) {
                if (!isNullOrUndefined(groupDs)) {
                    var indx = -1;
                    var temp = groupDs.filter(function (e) { return e.key === jsonData[j].key; });
                    indx = groupDs.indexOf(temp[0]);
                    jsonData[j].items = this_1.group(jsonData[j].items, field, aggregates, jsonData.level + 1, groupDs[indx].items, format);
                    jsonData[j].count = groupDs[indx].count;
                }
                else {
                    jsonData[j].items = this_1.group(jsonData[j].items, field, aggregates, jsonData.level + 1, null, format);
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
                    var tempObj = groupDs.filter(function (e) { return e.key === grouped[val].key; });
                    grouped[val].count = tempObj[0].count;
                }
            }
            grouped[val].count = !isNullOrUndefined(groupDs) ? grouped[val].count : grouped[val].count += 1;
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
                    if (!isNullOrUndefined(groupDs)) {
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
    /**
     * The method used to get the field names which started with specified characters.
     * @param  {Object} obj
     * @param  {string[]} fields?
     * @param  {string} prefix?
     * @hidden
     */
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
    /**
     * Gets the value of the property in the given object.
     * The complex object can be accessed by providing the field names concatenated with dot(.).
     * @param  {string} nameSpace - The name of the property to be accessed.
     * @param  {Object} from - Defines the source object.
     */
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
    /**
     * Sort the given data based on the field and comparer.
     * @param  {Object[]} ds - Defines the input data.
     * @param  {string} field - Defines the field to be sorted.
     * @param  {Function} comparer - Defines the comparer function used to sort the records.
     */
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
    /**
     * To perform the filter operation with specified adaptor and returns the result.
     * @param  {Object} adaptor
     * @param  {string} fnName
     * @param  {Object} param1?
     * @param  {Object} param2?
     * @hidden
     */
    DataUtil.callAdaptorFunction = function (adaptor, fnName, param1, param2) {
        if (fnName in adaptor) {
            var res = adaptor[fnName](param1, param2);
            if (!this.fnOperators.isnull(res)) {
                param1 = res;
            }
        }
        return param1;
    };
    /**
     * Checks wheather the given input is a plain object or not.
     * @param  {Object|Object[]} obj
     */
    DataUtil.isPlainObject = function (obj) {
        return (!!obj) && (obj.constructor === Object);
    };
    /**
     * Returns true when the browser cross origin request.
     */
    DataUtil.isCors = function () {
        var xhr = null;
        var request = 'XMLHttpRequest';
        try {
            xhr = new window[request]();
        }
        catch (e) {
            // No exception handling
        }
        return !!xhr && ('withCredentials' in xhr);
    };
    /**
     * Generate random GUID value which will be prefixed with the given value.
     * @param  {string} prefix
     */
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
    /**
     * Checks wheather the given value is null or not.
     * @param  {string|Object} val
     * @returns boolean
     */
    DataUtil.isNull = function (val) {
        return val === undefined || val === null;
    };
    /**
     * To get the required items from collection of objects.
     * @param  {Object[]} array
     * @param  {string} field
     * @param  {Function} comparer
     * @returns Object
     * @hidden
     */
    DataUtil.getItemFromComparer = function (array, field, comparer) {
        var keyVal;
        var current;
        var key;
        var i = 0;
        var castRequired = typeof DataUtil.getVal(array, 0, field) === 'string';
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
    };
    /**
     * To get distinct values of Array or Array of Objects.
     * @param  {Object[]} json
     * @param  {string} field
     * @param  {boolean} requiresCompleteRecord
     * @returns Object[]
     * * distinct array of objects is return when requiresCompleteRecord set as true.
     * @hidden
     */
    DataUtil.distinct = function (json, fieldName, requiresCompleteRecord) {
        requiresCompleteRecord = isNullOrUndefined(requiresCompleteRecord) ? false : requiresCompleteRecord;
        var result = [];
        var val;
        var tmp = {};
        json.forEach(function (data, index) {
            val = DataUtil.getVal(json, index, fieldName);
            if (!(val in tmp)) {
                result.push(!requiresCompleteRecord ? val : json[index]);
                tmp[val] = 1;
            }
        });
        return result;
    };
    /**
     * Specifies the value which will be used to adjust the date value to server timezone.
     * @default 0
     */
    DataUtil.serverTimezoneOffset = 0;
    /**
     * Throw error with the given string as message.
     * @param  {string} er
     */
    DataUtil.throwError = function (error) {
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
        /**
         * Calculate average value of the given field in the data.
         * @param  {Object[]} ds
         * @param  {string} field
         */
        average: function (ds, field) {
            return DataUtil.aggregates.sum(ds, field) / ds.length;
        },
        /**
         * Returns the min value of the data based on the field.
         * @param  {Object[]} ds
         * @param  {string|Function} field
         */
        min: function (ds, field) {
            var comparer;
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
        max: function (ds, field) {
            var comparer;
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
        truecount: function (ds, field) {
            return new DataManager(ds).executeLocal(new Query().where(field, 'equal', true, true)).length;
        },
        /**
         * Returns the total number of false value present in the data based on the given boolean field name.
         * @param  {Object[]} ds
         * @param  {string} field
         */
        falsecount: function (ds, field) {
            return new DataManager(ds).executeLocal(new Query().where(field, 'equal', false, true)).length;
        },
        /**
         * Returns the length of the given data.
         * @param  {Object[]} ds
         * @param  {string} field?
         * @returns number
         */
        count: function (ds, field) {
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
        equal: function (actual, expected, ignoreCase) {
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
        notequal: function (actual, expected, ignoreCase) {
            return !DataUtil.fnOperators.equal(actual, expected, ignoreCase);
        },
        /**
         * Returns true when the actual input is less than to the given input.
         * @param  {string|number|boolean} actual
         * @param  {string|number|boolean} expected
         * @param  {boolean} ignoreCase?
         */
        lessthan: function (actual, expected, ignoreCase) {
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
        greaterthan: function (actual, expected, ignoreCase) {
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
        lessthanorequal: function (actual, expected, ignoreCase) {
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
        greaterthanorequal: function (actual, expected, ignoreCase) {
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
        contains: function (actual, expected, ignoreCase) {
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
        notnull: function (actual) {
            return actual !== null;
        },
        /**
         * Returns true when the given input value is null.
         * @param  {string|number} actual
         * @returns boolean
         */
        isnull: function (actual) {
            return actual === null;
        },
        /**
         * Returns true when the actual input starts with the given string
         * @param  {string} actual
         * @param  {string} expected
         * @param  {boolean} ignoreCase?
         */
        startswith: function (actual, expected, ignoreCase) {
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
        endswith: function (actual, expected, ignoreCase) {
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
        processSymbols: function (operator) {
            var fnName = DataUtil.operatorSymbols[operator];
            if (fnName) {
                var fn = DataUtil.fnOperators[fnName];
                return fn;
            }
            return DataUtil.throwError('Query - Process Operator : Invalid operator');
        },
        /**
         * It will return the valid filter operator based on the specified operators.
         * @param  {string} operator
         * @hidden
         */
        processOperator: function (operator) {
            var fn = DataUtil.fnOperators[operator];
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
        /**
         * It will perform on array of values.
         * @param  {string[]|Object[]} array
         * @hidden
         */
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
        /**
         * It will perform on JSON values
         * @param  {JSON} json
         * @hidden
         */
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
        /**
         * It will perform on JSON values
         * @param  {string} field
         * @param  {string|Date} value
         * @hidden
         */
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
        /**
         * Check wheather the given value is JSON or not.
         * @param  {Object[]} jsonData
         */
        isJson: function (jsonData) {
            if (typeof jsonData[0] === 'string') {
                return jsonData;
            }
            return DataUtil.parse.parseJson(jsonData);
        },
        /**
         * Checks wheather the given value is GUID or not.
         * @param  {string} value
         */
        isGuid: function (value) {
            var regex = /[A-Fa-f0-9]{8}(?:-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}/i;
            var match = regex.exec(value);
            return match != null;
        },
        /**
         * The method used to replace the value based on the type.
         * @param  {Object} value
         * @param  {boolean} stringify
         * @hidden
         */
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
        /**
         * It will replace the JSON value.
         * @param  {string} key
         * @param  {Object} val
         * @hidden
         */
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
        /**
         * It will replace the Array of value.
         * @param  {string} key
         * @param  {Object[]} val
         * @hidden
         */
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
    return DataUtil;
}());
export { DataUtil };
