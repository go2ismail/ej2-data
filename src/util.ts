import { merge, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager } from './manager';
import { Query } from './query';
const consts: { [key: string]: string } = { GroupGuid: '{271bbba0-1ee7}' };

/**
 * Data manager common utility methods.
 * @hidden
 */
export class DataUtil {
    /**
     * Specifies the value which will be used to adjust the date value to server timezone.
     * @default 0
     */
    public static serverTimezoneOffset: number = 0;

    /**
     * Returns the value by invoking the provided parameter function.
     * If the paramater is not of type function then it will be returned as it is.
     * @param  {Function|string|string[]|number} value
     * @param  {Object} inst?
     * @hidden
     */
    public static getValue<T>(value: T | Function, inst?: Object): T {
        if (typeof value === 'function') {
            return (<Function>value).call(inst || {});
        }
        return <T>value;
    }

    /**
     * Returns true if the input string ends with given string.
     * @param  {string} input
     * @param  {string} substr
     */
    public static endsWith(input: string, substr: string): boolean {
        return input.slice(-substr.length) === substr;
    }

    /**
     * Returns true if the input string starts with given string.
     * @param  {string} str
     * @param  {string} startstr
     */
    public static startsWith(input: string, start: string): boolean {
        return input.slice(0, start.length) === start;
    }

    /**
     * To return the sorting function based on the string.
     * @param  {string} order
     * @hidden
     */
    public static fnSort(order: string): Function {
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
    public static fnAscending(x: string | number, y: string | number): number {
        if (y === null || y === undefined) {
            return -1;
        }
        if (typeof x === 'string') {
            return x.localeCompare(<string>y);
        }
        if (x === null || x === undefined) {
            return 1;
        }
        return <number>x - <number>y;
    }
    /**
     * Comparer function which is used to sort the data in descending order.
     * @param  {string|number} x
     * @param  {string|number} y
     * @returns number
     */
    public static fnDescending(x: string | number, y: string | number): number {
        if (y === null || y === undefined) {
            return 1;
        }
        if (typeof x === 'string') {
            return x.localeCompare(y as string) * -1;
        }
        if (x === null || x === undefined) {
            return -1;
        }

        return <number>y - <number>x;
    }
    private static extractFields(obj: Object, fields: string[]): Object {
        let newObj: { [key: string]: Object } = {};

        if (fields.length === 1) {
            return this.getObject(fields[0], obj);
        }

        for (let i: number = 0; i < fields.length; i++) {
            newObj[fields[i].replace('.', '_')] = this.getObject(fields[i], obj);
        }

        return newObj;
    }

    /**    
     * Select objects by given fields from jsonArray.
     * @param  {Object[]} jsonArray
     * @param  {string[]} fields
     */
    public static select(jsonArray: Object[], fields: string[]): Object[] {
        let newData: Object[] = [];

        for (let i: number = 0; i < jsonArray.length; i++) {
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
    public static group(jsonArray: Object[], field?: string, aggregates?: Object[], level?: number, groupDs?: Object[]): Object[] {
        level = level || 1;
        let jsonData: Group[] = jsonArray;
        let guid: string = 'GroupGuid';
        if ((<Group>jsonData).GroupGuid === consts[guid]) {
            for (let j: number = 0; j < jsonData.length; j++) {
                if (!isNullOrUndefined(groupDs)) {
                    let indx: number = -1;
                    let temp: Group[] = groupDs.filter((e: { key: string }) => { return e.key === jsonData[j].key; });
                    indx = groupDs.indexOf(temp[0]);
                    jsonData[j].items = this.group(
                        jsonData[j].items, field, aggregates, (jsonData as Group).level + 1, (groupDs as Group[])[indx].items);
                    jsonData[j].count = (groupDs as Group[])[indx].count;
                } else {
                    jsonData[j].items = this.group(jsonData[j].items, field, aggregates, (jsonData as Group).level + 1);
                    jsonData[j].count = jsonData[j].items.length;
                }
            }

            (jsonData as Group).childLevels += 1;
            return jsonData;
        }

        let grouped: { [key: string]: Group } = {};
        let groupedArray: Group[] = [];

        (groupedArray as Group).GroupGuid = consts[guid];
        (groupedArray as Group).level = level;
        (groupedArray as Group).childLevels = 0;
        (groupedArray as Group).records = jsonData;

        for (let i: number = 0; i < jsonData.length; i++) {
            let val: string = (<string>this.getVal(jsonData, i, field));

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
                    let tempObj: Group[] = groupDs.filter((e: { key: string }) => { return e.key === grouped[val].key; });
                    grouped[val].count = tempObj[0].count;
                }
            }

            grouped[val].count = !isNullOrUndefined(groupDs) ? grouped[val].count : grouped[val].count += 1;
            grouped[val].items.push(jsonData[i]);
        }
        if (aggregates && aggregates.length) {

            for (let i: number = 0; i < groupedArray.length; i++) {
                let res: { [key: string]: Object } = {};
                let fn: Function;
                let aggs: Aggregates[] = aggregates as Aggregates[];
                for (let j: number = 0; j < aggregates.length; j++) {
                    fn = DataUtil.aggregates[(aggregates[j] as Aggregates).type];
                    if (!isNullOrUndefined(groupDs)) {
                        let temp: Group[] = groupDs.filter((e: { key: string }) => { return e.key === groupedArray[i].key; });
                        if (fn) {
                            res[aggs[j].field + ' - ' + aggs[j].type] = fn(temp[0].items, aggs[j].field);
                        }
                    } else {
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
    public static buildHierarchy(fKey: string, from: string, source: Group, lookup?: Group, pKey?: string): void {
        let i: number;
        let grp: { [key: string]: Object[] } = {};
        let temp: Object[];
        if (lookup.result) { lookup = lookup.result; }

        if (lookup.GroupGuid) {
            this.throwError('DataManager: Do not have support Grouping in hierarchy');
        }

        for (i = 0; i < (<Group[]>lookup).length; i++) {
            let fKeyData: number = (<number>this.getObject(fKey, (<Group[]>lookup)[i]));
            temp = grp[fKeyData] || (grp[fKeyData] = []);
            temp.push((<Group[]>lookup)[i]);
        }

        for (i = 0; i < (<Group[]>source).length; i++) {
            let fKeyData: number = (<number>this.getObject(pKey || fKey, (<Group[]>source)[i]));
            (<Group[]>source)[i][from] = grp[fKeyData];
        }
    }

    /**
     * Throw error with the given string as message. 
     * @param  {string} er
     */
    public static throwError: Function = (error: string) => {
        try {
            throw new Error(error);
        } catch (e) {
            throw e.message + '\n' + e.stack;
        }
    }

    public static aggregates: Aggregates = {
        /**
         * Calculate sum of the given field in the data.
         * @param  {Object[]} ds
         * @param  {string} field
         */
        sum: (ds: Object[], field: string): number => {
            let result: number = 0;
            let val: number;
            let castRequired: boolean = typeof DataUtil.getVal(ds, 0, field) !== 'number';

            for (let i: number = 0; i < ds.length; i++) {
                val = DataUtil.getVal(ds, i, field) as number;
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
        average: (ds: Object[], field: string): number => {
            return DataUtil.aggregates.sum(ds, field) / ds.length;
        },
        /**
         * Returns the min value of the data based on the field.
         * @param  {Object[]} ds
         * @param  {string|Function} field
         */
        min: (ds: Object[], field: string | Function) => {
            let comparer: Function;
            if (typeof field === 'function') {
                comparer = <Function>field;
                field = null;
            }
            return DataUtil.getObject(<string>field, DataUtil.getItemFromComparer(ds, <string>field, comparer || DataUtil.fnAscending));
        },
        /**
         * Returns the max value of the data based on the field.
         * @param  {Object[]} ds
         * @param  {string} field
         * @returns number
         */
        max: (ds: Object[], field: string | Function) => {
            let comparer: Function;
            if (typeof field === 'function') {
                comparer = <Function>field;
                field = null;
            }
            return DataUtil.getObject(<string>field, DataUtil.getItemFromComparer(ds, <string>field, comparer || DataUtil.fnDescending));
        },
        /**
         * Returns the total number of true value present in the data based on the given boolean field name.
         * @param  {Object[]} ds
         * @param  {string} field
         */
        truecount: (ds: Object[], field: string): number => {
            return new DataManager(ds as JSON[]).executeLocal(new Query().where(field, 'equal', true, true)).length;
        },
        /**
         * Returns the total number of false value present in the data based on the given boolean field name.
         * @param  {Object[]} ds
         * @param  {string} field
         */
        falsecount: (ds: Object[], field: string): number => {
            return new DataManager(ds as JSON[]).executeLocal(new Query().where(field, 'equal', false, true)).length;
        },
        /**
         * Returns the length of the given data.
         * @param  {Object[]} ds
         * @param  {string} field?
         * @returns number
         */
        count: (ds: Object[], field?: string): number => {
            return ds.length;
        }
    };

    /**
     * The method used to get the field names which started with specified characters.
     * @param  {Object} obj
     * @param  {string[]} fields?
     * @param  {string} prefix?
     * @hidden
     */
    public static getFieldList(obj: Object, fields?: string[], prefix?: string): string[] {
        if (prefix === undefined) {
            prefix = '';
        }
        if (fields === undefined || fields === null) {
            return this.getFieldList(obj, [], prefix);
        }
        let copyObj: { [key: string]: Object } = (obj as { [key: string]: Object });
        let keys: string[] = Object.keys(obj);
        for (let prop of keys) {
            if (typeof copyObj[prop] === 'object' && !(copyObj[prop] instanceof Array)) {
                this.getFieldList((copyObj[prop] as Object), fields, prefix + prop + '.');
            } else {
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
    public static getObject(nameSpace: string, from: Object): Object {
        if (!nameSpace) { return from; }
        if (nameSpace.indexOf('.') === -1) {
            return from[nameSpace];
        }
        let value: Object = from;
        let splits: string[] = nameSpace.split('.');

        for (let i: number = 0; i < splits.length; i++) {
            if (value == null) { break; }
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
    public static sort(ds: Object[], field: string, comparer: Function): Object[] {
        if (ds.length <= 1) {
            return ds;
        }

        let middle: number = parseInt((ds.length / 2).toString(), 10);

        let left: Object[] = ds.slice(0, middle);
        let right: Object[] = ds.slice(middle);

        left = this.sort(left, field, comparer);
        right = this.sort(right, field, comparer);

        return this.merge(left, right, field, comparer);
    }

    private static merge(left: Object[], right: Object[], fieldName: string, comparer: Function): Object[] {
        let result: Object[] = [];
        let current: Object[];

        while (left.length > 0 || right.length > 0) {
            if (left.length > 0 && right.length > 0) {
                if (comparer) {
                    current = (<Function>comparer)(this.getVal(left, 0, fieldName), this.getVal(right, 0, fieldName)) <= 0 ? left : right;
                } else {
                    current = left[0][fieldName] < left[0][fieldName] ? left : right;
                }
            } else {
                current = left.length > 0 ? left : right;
            }
            result.push(current.shift());
        }
        return result;
    }
    private static getVal(array: Object[], index: number, field?: string): Object {
        return field ? this.getObject(field, array[index]) : array[index];
    }
    private static toLowerCase(val: string | number | boolean): string {
        return val ? typeof val === 'string' ? val.toLowerCase() : val.toString() : (val === 0 || val === false) ? val.toString() : '';
    }
    /**
     * Specifies the Object with filter operators.
     */
    public static operatorSymbols: { [key: string]: string } = {
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
    public static odBiOperator: { [key: string]: string } = {
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
    public static odUniOperator: { [key: string]: string } = {
        '$=': 'endswith',
        '^=': 'startswith',
        '*=': 'substringof',
        'endswith': 'endswith',
        'startswith': 'startswith',
        'contains': 'substringof'
    };

    public static fnOperators: Operators = {
        /**
         * Returns true when the actual input is equal to the given input.
         * @param  {string|number|boolean} actual
         * @param  {string|number|boolean} expected
         * @param  {boolean} ignoreCase?
         */
        equal: (actual: string | number | boolean, expected: string | number | boolean, ignoreCase?: boolean): boolean => {
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
        notequal: (actual: string | number | boolean, expected: string | number | boolean, ignoreCase?: boolean): boolean => {
            return !DataUtil.fnOperators.equal(actual, expected, ignoreCase);
        },
        /**
         * Returns true when the actual input is less than to the given input.
         * @param  {string|number|boolean} actual
         * @param  {string|number|boolean} expected
         * @param  {boolean} ignoreCase?
         */
        lessthan: (actual: string | number | boolean, expected: string | number | boolean, ignoreCase?: boolean): boolean => {
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
        greaterthan: (actual: string | number | boolean, expected: string | number | boolean, ignoreCase?: boolean): boolean => {
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
        lessthanorequal: (actual: string | number | boolean, expected: string | number | boolean, ignoreCase?: boolean): boolean => {
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
        greaterthanorequal: (actual: string | number | boolean, expected: string | number | boolean, ignoreCase?: boolean): boolean => {
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
        contains: (actual: string | number, expected: string | number, ignoreCase?: boolean): boolean => {
            if (ignoreCase) {
                return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) &&
                    DataUtil.toLowerCase(actual).indexOf(DataUtil.toLowerCase(expected)) !== -1;
            }
            return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) &&
                actual.toString().indexOf(expected as string) !== -1;
        },
        /**
         * Returns true when the given input value is not null.
         * @param  {string|number} actual
         * @returns boolean
         */
        notnull: (actual: string | number): boolean => {
            return actual !== null;
        },
        /**
         * Returns true when the given input value is null.
         * @param  {string|number} actual
         * @returns boolean
         */
        isnull: (actual: string | number): boolean => {
            return actual === null;
        },
        /**
         * Returns true when the actual input starts with the given string
         * @param  {string} actual
         * @param  {string} expected
         * @param  {boolean} ignoreCase?
         */
        startswith: (actual: string, expected: string, ignoreCase?: boolean): boolean => {
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
        endswith: (actual: string, expected: string, ignoreCase?: boolean): boolean => {
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
        processSymbols: (operator: string): string => {
            let fnName: string = DataUtil.operatorSymbols[operator];
            if (fnName) {
                let fn: string = DataUtil.fnOperators[fnName];
                return fn;
            }
            return DataUtil.throwError('Query - Process Operator : Invalid operator');
        },
        /**
         * It will return the valid filter operator based on the specified operators.
         * @param  {string} operator
         * @hidden
         */
        processOperator: (operator: string): string => {
            let fn: string = DataUtil.fnOperators[operator];
            if (fn) { return fn; }
            return DataUtil.fnOperators.processSymbols(operator);
        }
    };

    /**
     * To perform the filter operation with specified adaptor and returns the result.
     * @param  {Object} adaptor
     * @param  {string} fnName
     * @param  {Object} param1?
     * @param  {Object} param2?
     * @hidden
     */
    public static callAdaptorFunction(adaptor: Object, fnName: string, param1?: Object, param2?: Object): Object {
        if (fnName in adaptor) {
            let res: Query = adaptor[fnName](param1, param2);
            if (!this.fnOperators.isnull(res)) { param1 = res; }
        }
        return param1;
    }

    /**
     * To perform the parse operation on JSON data, like convert to string from JSON or convert to JSON from string.
     */
    public static parse: ParseOption = {
        /**
         * Parse the given string to the plain JavaScript object.
         * @param  {string|Object|Object[]} jsonText
         */
        parseJson: (jsonText: string | Object | Object[]): Object => {
            if (typeof jsonText === 'string') {
                jsonText = JSON.parse(<string>jsonText, DataUtil.parse.jsonReviver);
            } else if (jsonText instanceof Array) {
                DataUtil.parse.iterateAndReviveArray(jsonText);
            } else if (typeof jsonText === 'object') {
                DataUtil.parse.iterateAndReviveJson(jsonText);
            }
            return jsonText;
        },
        /**
         * It will perform on array of values.
         * @param  {string[]|Object[]} array
         * @hidden
         */
        iterateAndReviveArray: (array: string[] | Object[]): void => {
            for (let i: number = 0; i < array.length; i++) {
                if (typeof array[i] === 'object') {
                    DataUtil.parse.iterateAndReviveJson(array[i]);
                } else if (typeof array[i] === 'string' && !/^[\s]*\[|^[\s]*\{|\"/g.test(<string>array[i])) {
                    array[i] = DataUtil.parse.jsonReviver('', array[i]);
                } else {
                    array[i] = DataUtil.parse.parseJson(array[i]);
                }
            }
        },
        /**
         * It will perform on JSON values
         * @param  {JSON} json
         * @hidden
         */
        iterateAndReviveJson: (json: JSON): void => {
            let value: Object | string;

            let keys: string[] = Object.keys(json);
            for (let prop of keys) {
                if (DataUtil.startsWith(prop, '__')) {
                    continue;
                }

                value = json[prop];
                if (typeof value === 'object') {
                    if (value instanceof Array) {
                        DataUtil.parse.iterateAndReviveArray(value);
                    } else if (value) {
                        DataUtil.parse.iterateAndReviveJson(value);
                    }
                } else {
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
        jsonReviver: (field: string, value: string | Date): string | Date => {
            let dupValue: string | Date = value;
            if (typeof value === 'string') {
                let ms: string[] = /^\/Date\(([+-]?[0-9]+)([+-][0-9]{4})?\)\/$/.exec(<string>value);
                if (ms) {
                    return DataUtil.parse.jsonReplacer({ value: new Date(parseInt(ms[1], 10)) }, false).value;
                } else if (/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(<string>value)) {
                    let arr: string[] = (<string>dupValue).split(/[^0-9]/);
                    value = DataUtil.parse.jsonReplacer(
                        { value: new Date(
                        parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10),
                        parseInt(arr[4], 10), parseInt(arr[5], 10))},
                        false).value;
                }
            }
            return value;
        },
        /**
         * Check wheather the given value is JSON or not.
         * @param  {Object[]} jsonData
         */
        isJson: (jsonData: Object[]): Object => {
            if (typeof jsonData[0] === 'string') {
                return jsonData;
            }
            return DataUtil.parse.parseJson(jsonData);
        },
        /**
         * Checks wheather the given value is GUID or not. 
         * @param  {string} value
         */
        isGuid: (value: string): boolean => {
            let regex: RegExp = /[A-Fa-f0-9]{8}(?:-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}/i;
            let match: RegExpExecArray = regex.exec(value);
            return match != null;
        },
        /**
         * The method used to replace the value based on the type.
         * @param  {Object} value
         * @param  {boolean} stringify
         * @hidden
         */
        replacer: (value: Object, stringify?: boolean): Object => {

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
        jsonReplacer: (val: Object, stringify: boolean = true): Object => {
            let value: Date;
            let keys: string[] = Object.keys(val);
            for (let prop of keys) {
                value = val[prop];

                if (!(value instanceof Date)) {
                    continue;
                }
                let d: Date = value;
                let unixstamp: number = +d - (d.getTimezoneOffset() * 60000);
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
        arrayReplacer: (val: Object[]): Object => {

            for (let i: number = 0; i < val.length; i++) {
                if (DataUtil.isPlainObject(val[i])) {
                    val[i] = DataUtil.parse.jsonReplacer(val[i]);
                } else if (val[i] instanceof Date) {
                    val[i] = DataUtil.parse.jsonReplacer({ date: val[i] }).date;
                }
            }

            return val;
        }
    };

    /**
     * Checks wheather the given input is a plain object or not.
     * @param  {Object|Object[]} obj
     */
    public static isPlainObject(obj: Object | Object[]): boolean {
        return (!!obj) && (obj.constructor === Object);
    }

    /**
     * Returns true when the browser cross origin request.
     */
    public static isCors(): boolean {
        let xhr: XMLHttpRequest = null;
        let request: string = 'XMLHttpRequest';
        try {
            xhr = new window[request]();
        } catch (e) {
            // No exception handling
        }
        return !!xhr && ('withCredentials' in xhr);
    }
    /**
     * Generate random GUID value which will be prefixed with the given value.
     * @param  {string} prefix
     */
    public static getGuid(prefix: string): string {
        let hexs: string = '0123456789abcdef';
        let rand: number;
        return (prefix || '') + '00000000-0000-4000-0000-000000000000'.replace(/0/g, (val: string, i: number) => {
            if ('crypto' in window && 'getRandomValues' in crypto) {
                let arr: Uint8Array = new Uint8Array(1);
                window.crypto.getRandomValues(arr);
                rand = arr[0] % 16 | 0;
            } else {
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
    public static isNull(val: string | Object): boolean {
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
    public static getItemFromComparer(array: Object[], field: string, comparer: Function): Object {
        let keyVal: Object;
        let current: Object;
        let key: Object;
        let i: number = 0;
        let castRequired: boolean = typeof DataUtil.getVal(array, 0, field) === 'string';
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
}

/**
 * @hidden
 */
export interface Aggregates {
    sum?: Function;
    average?: Function;
    min?: Function;
    max?: Function;
    truecount?: Function;
    falsecount?: Function;
    count?: Function;
    type?: string;
    field?: string;
}

/**
 * @hidden
 */
export interface Operators {
    equal?: Function;
    notequal?: Function;
    lessthan?: Function;
    greaterthan?: Function;
    lessthanorequal?: Function;
    greaterthanorequal?: Function;
    contains?: Function;
    notnull?: Function;
    isnull?: Function;
    startswith?: Function;
    endswith?: Function;
    processSymbols?: Function;
    processOperator?: Function;
}

/**
 * @hidden
 */
export interface Group {
    GroupGuid?: string;
    level?: number;
    childLevels?: number;
    records?: Object[];
    key?: string;
    count?: number;
    items?: Object[];
    aggregates?: Object;
    field?: string;
    result?: Object;

}

/**
 * @hidden
 */
export interface ParseOption {
    parseJson?: Function;
    iterateAndReviveArray?: Function;
    iterateAndReviveJson?: Function;
    jsonReviver?: (key: string, value: Object) => Object;
    isJson?: Function;
    isGuid?: Function;
    replacer?: Function;
    jsonReplacer?: Function;
    arrayReplacer?: Function;
}