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
     * @default null
     */
    public static serverTimezoneOffset: number = null;

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
        order = order ? DataUtil.toLowerCase(order) : 'ascending';
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
        let newObj: { [key: string]: Object } | Object = {};

        for (let i: number = 0; i < fields.length; i++) {
            newObj = this.setValue(fields[i], this.getObject(fields[i], obj), newObj);
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
    public static group(jsonArray: Object[], field?: string, aggregates?: Object[], level?: number, groupDs?: Object[], format?: Function):
        Object[] {
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
                        jsonData[j].items, field, aggregates, (jsonData as Group).level + 1, (groupDs as Group[])[indx].items, format);
                    jsonData[j].count = (groupDs as Group[])[indx].count;
                } else {
                    jsonData[j].items = this.group(jsonData[j].items, field, aggregates, (jsonData as Group).level + 1, null, format);
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
        return jsonData.length && groupedArray || jsonData;
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
            let result: Object;
            let comparer: Function;
            if (typeof field === 'function') {
                comparer = <Function>field;
                field = null;
            }
            result = DataUtil.getObject(<string>field, DataUtil.getItemFromComparer(ds, <string>field, comparer || DataUtil.fnAscending));
            return isNullOrUndefined(result) ? null : result;
        },
        /**
         * Returns the max value of the data based on the field.
         * @param  {Object[]} ds
         * @param  {string} field
         * @returns number
         */
        max: (ds: Object[], field: string | Function) => {
            let result: Object;
            let comparer: Function;
            if (typeof field === 'function') {
                comparer = <Function>field;
                field = null;
            }
            /* tslint:disable-next-line:no-any */
            result = DataUtil.getObject(<string>field, DataUtil.getItemFromComparer(ds, <string>field, comparer || DataUtil.fnDescending));
            return isNullOrUndefined(result) ? null : result;
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
     * To set value for the nameSpace in desired object.
     * @param {string} nameSpace - String value to the get the inner object.
     * @param {Object} value - Value that you need to set.
     * @param {Object} obj - Object to get the inner object value.
     * @return { [key: string]: Object; } | Object
     * @hidden
     */
    public static setValue(nameSpace: string, value: Object, obj: Object): { [key: string]: Object; } | Object {
        let keys: string[] = nameSpace.toString().split('.');
        let start: Object = obj || {};
        let fromObj: Object = start;
        let i: number;
        let length: number = keys.length;
        let key: string;
        for (i = 0; i < length; i++) {
            key = keys[i];
            if (i + 1 === length) {
                fromObj[key] = value === undefined ? undefined : value;
            } else if (isNullOrUndefined(fromObj[key])) {
                fromObj[key] = {};
            }
            fromObj = fromObj[key];
        }
        return start;
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
    public static ignoreDiacritics(value: string | number | boolean): string | Object {
        if (typeof value !== 'string') {
            return value;
        }
        let result: string[] = value.split('');
        let newValue: string[] = result.map((temp: string) => temp in DataUtil.diacritics ? DataUtil.diacritics[temp] : temp);
        return newValue.join('');
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

    /**
     * Specifies the Object with filter operators which will be used for ODataV4 filter query generation.
     * It will be used for string type filter query.
     */
    public static odv4UniOperator: { [key: string]: string } = {
        '$=': 'endswith',
        '^=': 'startswith',
        '*=': 'contains',
        'endswith': 'endswith',
        'startswith': 'startswith',
        'contains': 'contains'
    };
    public static diacritics: { [key: string]: string } = {
        '\u24B6': 'A',
        '\uFF21': 'A',
        '\u00C0': 'A',
        '\u00C1': 'A',
        '\u00C2': 'A',
        '\u1EA6': 'A',
        '\u1EA4': 'A',
        '\u1EAA': 'A',
        '\u1EA8': 'A',
        '\u00C3': 'A',
        '\u0100': 'A',
        '\u0102': 'A',
        '\u1EB0': 'A',
        '\u1EAE': 'A',
        '\u1EB4': 'A',
        '\u1EB2': 'A',
        '\u0226': 'A',
        '\u01E0': 'A',
        '\u00C4': 'A',
        '\u01DE': 'A',
        '\u1EA2': 'A',
        '\u00C5': 'A',
        '\u01FA': 'A',
        '\u01CD': 'A',
        '\u0200': 'A',
        '\u0202': 'A',
        '\u1EA0': 'A',
        '\u1EAC': 'A',
        '\u1EB6': 'A',
        '\u1E00': 'A',
        '\u0104': 'A',
        '\u023A': 'A',
        '\u2C6F': 'A',
        '\uA732': 'AA',
        '\u00C6': 'AE',
        '\u01FC': 'AE',
        '\u01E2': 'AE',
        '\uA734': 'AO',
        '\uA736': 'AU',
        '\uA738': 'AV',
        '\uA73A': 'AV',
        '\uA73C': 'AY',
        '\u24B7': 'B',
        '\uFF22': 'B',
        '\u1E02': 'B',
        '\u1E04': 'B',
        '\u1E06': 'B',
        '\u0243': 'B',
        '\u0182': 'B',
        '\u0181': 'B',
        '\u24B8': 'C',
        '\uFF23': 'C',
        '\u0106': 'C',
        '\u0108': 'C',
        '\u010A': 'C',
        '\u010C': 'C',
        '\u00C7': 'C',
        '\u1E08': 'C',
        '\u0187': 'C',
        '\u023B': 'C',
        '\uA73E': 'C',
        '\u24B9': 'D',
        '\uFF24': 'D',
        '\u1E0A': 'D',
        '\u010E': 'D',
        '\u1E0C': 'D',
        '\u1E10': 'D',
        '\u1E12': 'D',
        '\u1E0E': 'D',
        '\u0110': 'D',
        '\u018B': 'D',
        '\u018A': 'D',
        '\u0189': 'D',
        '\uA779': 'D',
        '\u01F1': 'DZ',
        '\u01C4': 'DZ',
        '\u01F2': 'Dz',
        '\u01C5': 'Dz',
        '\u24BA': 'E',
        '\uFF25': 'E',
        '\u00C8': 'E',
        '\u00C9': 'E',
        '\u00CA': 'E',
        '\u1EC0': 'E',
        '\u1EBE': 'E',
        '\u1EC4': 'E',
        '\u1EC2': 'E',
        '\u1EBC': 'E',
        '\u0112': 'E',
        '\u1E14': 'E',
        '\u1E16': 'E',
        '\u0114': 'E',
        '\u0116': 'E',
        '\u00CB': 'E',
        '\u1EBA': 'E',
        '\u011A': 'E',
        '\u0204': 'E',
        '\u0206': 'E',
        '\u1EB8': 'E',
        '\u1EC6': 'E',
        '\u0228': 'E',
        '\u1E1C': 'E',
        '\u0118': 'E',
        '\u1E18': 'E',
        '\u1E1A': 'E',
        '\u0190': 'E',
        '\u018E': 'E',
        '\u24BB': 'F',
        '\uFF26': 'F',
        '\u1E1E': 'F',
        '\u0191': 'F',
        '\uA77B': 'F',
        '\u24BC': 'G',
        '\uFF27': 'G',
        '\u01F4': 'G',
        '\u011C': 'G',
        '\u1E20': 'G',
        '\u011E': 'G',
        '\u0120': 'G',
        '\u01E6': 'G',
        '\u0122': 'G',
        '\u01E4': 'G',
        '\u0193': 'G',
        '\uA7A0': 'G',
        '\uA77D': 'G',
        '\uA77E': 'G',
        '\u24BD': 'H',
        '\uFF28': 'H',
        '\u0124': 'H',
        '\u1E22': 'H',
        '\u1E26': 'H',
        '\u021E': 'H',
        '\u1E24': 'H',
        '\u1E28': 'H',
        '\u1E2A': 'H',
        '\u0126': 'H',
        '\u2C67': 'H',
        '\u2C75': 'H',
        '\uA78D': 'H',
        '\u24BE': 'I',
        '\uFF29': 'I',
        '\u00CC': 'I',
        '\u00CD': 'I',
        '\u00CE': 'I',
        '\u0128': 'I',
        '\u012A': 'I',
        '\u012C': 'I',
        '\u0130': 'I',
        '\u00CF': 'I',
        '\u1E2E': 'I',
        '\u1EC8': 'I',
        '\u01CF': 'I',
        '\u0208': 'I',
        '\u020A': 'I',
        '\u1ECA': 'I',
        '\u012E': 'I',
        '\u1E2C': 'I',
        '\u0197': 'I',
        '\u24BF': 'J',
        '\uFF2A': 'J',
        '\u0134': 'J',
        '\u0248': 'J',
        '\u24C0': 'K',
        '\uFF2B': 'K',
        '\u1E30': 'K',
        '\u01E8': 'K',
        '\u1E32': 'K',
        '\u0136': 'K',
        '\u1E34': 'K',
        '\u0198': 'K',
        '\u2C69': 'K',
        '\uA740': 'K',
        '\uA742': 'K',
        '\uA744': 'K',
        '\uA7A2': 'K',
        '\u24C1': 'L',
        '\uFF2C': 'L',
        '\u013F': 'L',
        '\u0139': 'L',
        '\u013D': 'L',
        '\u1E36': 'L',
        '\u1E38': 'L',
        '\u013B': 'L',
        '\u1E3C': 'L',
        '\u1E3A': 'L',
        '\u0141': 'L',
        '\u023D': 'L',
        '\u2C62': 'L',
        '\u2C60': 'L',
        '\uA748': 'L',
        '\uA746': 'L',
        '\uA780': 'L',
        '\u01C7': 'LJ',
        '\u01C8': 'Lj',
        '\u24C2': 'M',
        '\uFF2D': 'M',
        '\u1E3E': 'M',
        '\u1E40': 'M',
        '\u1E42': 'M',
        '\u2C6E': 'M',
        '\u019C': 'M',
        '\u24C3': 'N',
        '\uFF2E': 'N',
        '\u01F8': 'N',
        '\u0143': 'N',
        '\u00D1': 'N',
        '\u1E44': 'N',
        '\u0147': 'N',
        '\u1E46': 'N',
        '\u0145': 'N',
        '\u1E4A': 'N',
        '\u1E48': 'N',
        '\u0220': 'N',
        '\u019D': 'N',
        '\uA790': 'N',
        '\uA7A4': 'N',
        '\u01CA': 'NJ',
        '\u01CB': 'Nj',
        '\u24C4': 'O',
        '\uFF2F': 'O',
        '\u00D2': 'O',
        '\u00D3': 'O',
        '\u00D4': 'O',
        '\u1ED2': 'O',
        '\u1ED0': 'O',
        '\u1ED6': 'O',
        '\u1ED4': 'O',
        '\u00D5': 'O',
        '\u1E4C': 'O',
        '\u022C': 'O',
        '\u1E4E': 'O',
        '\u014C': 'O',
        '\u1E50': 'O',
        '\u1E52': 'O',
        '\u014E': 'O',
        '\u022E': 'O',
        '\u0230': 'O',
        '\u00D6': 'O',
        '\u022A': 'O',
        '\u1ECE': 'O',
        '\u0150': 'O',
        '\u01D1': 'O',
        '\u020C': 'O',
        '\u020E': 'O',
        '\u01A0': 'O',
        '\u1EDC': 'O',
        '\u1EDA': 'O',
        '\u1EE0': 'O',
        '\u1EDE': 'O',
        '\u1EE2': 'O',
        '\u1ECC': 'O',
        '\u1ED8': 'O',
        '\u01EA': 'O',
        '\u01EC': 'O',
        '\u00D8': 'O',
        '\u01FE': 'O',
        '\u0186': 'O',
        '\u019F': 'O',
        '\uA74A': 'O',
        '\uA74C': 'O',
        '\u01A2': 'OI',
        '\uA74E': 'OO',
        '\u0222': 'OU',
        '\u24C5': 'P',
        '\uFF30': 'P',
        '\u1E54': 'P',
        '\u1E56': 'P',
        '\u01A4': 'P',
        '\u2C63': 'P',
        '\uA750': 'P',
        '\uA752': 'P',
        '\uA754': 'P',
        '\u24C6': 'Q',
        '\uFF31': 'Q',
        '\uA756': 'Q',
        '\uA758': 'Q',
        '\u024A': 'Q',
        '\u24C7': 'R',
        '\uFF32': 'R',
        '\u0154': 'R',
        '\u1E58': 'R',
        '\u0158': 'R',
        '\u0210': 'R',
        '\u0212': 'R',
        '\u1E5A': 'R',
        '\u1E5C': 'R',
        '\u0156': 'R',
        '\u1E5E': 'R',
        '\u024C': 'R',
        '\u2C64': 'R',
        '\uA75A': 'R',
        '\uA7A6': 'R',
        '\uA782': 'R',
        '\u24C8': 'S',
        '\uFF33': 'S',
        '\u1E9E': 'S',
        '\u015A': 'S',
        '\u1E64': 'S',
        '\u015C': 'S',
        '\u1E60': 'S',
        '\u0160': 'S',
        '\u1E66': 'S',
        '\u1E62': 'S',
        '\u1E68': 'S',
        '\u0218': 'S',
        '\u015E': 'S',
        '\u2C7E': 'S',
        '\uA7A8': 'S',
        '\uA784': 'S',
        '\u24C9': 'T',
        '\uFF34': 'T',
        '\u1E6A': 'T',
        '\u0164': 'T',
        '\u1E6C': 'T',
        '\u021A': 'T',
        '\u0162': 'T',
        '\u1E70': 'T',
        '\u1E6E': 'T',
        '\u0166': 'T',
        '\u01AC': 'T',
        '\u01AE': 'T',
        '\u023E': 'T',
        '\uA786': 'T',
        '\uA728': 'TZ',
        '\u24CA': 'U',
        '\uFF35': 'U',
        '\u00D9': 'U',
        '\u00DA': 'U',
        '\u00DB': 'U',
        '\u0168': 'U',
        '\u1E78': 'U',
        '\u016A': 'U',
        '\u1E7A': 'U',
        '\u016C': 'U',
        '\u00DC': 'U',
        '\u01DB': 'U',
        '\u01D7': 'U',
        '\u01D5': 'U',
        '\u01D9': 'U',
        '\u1EE6': 'U',
        '\u016E': 'U',
        '\u0170': 'U',
        '\u01D3': 'U',
        '\u0214': 'U',
        '\u0216': 'U',
        '\u01AF': 'U',
        '\u1EEA': 'U',
        '\u1EE8': 'U',
        '\u1EEE': 'U',
        '\u1EEC': 'U',
        '\u1EF0': 'U',
        '\u1EE4': 'U',
        '\u1E72': 'U',
        '\u0172': 'U',
        '\u1E76': 'U',
        '\u1E74': 'U',
        '\u0244': 'U',
        '\u24CB': 'V',
        '\uFF36': 'V',
        '\u1E7C': 'V',
        '\u1E7E': 'V',
        '\u01B2': 'V',
        '\uA75E': 'V',
        '\u0245': 'V',
        '\uA760': 'VY',
        '\u24CC': 'W',
        '\uFF37': 'W',
        '\u1E80': 'W',
        '\u1E82': 'W',
        '\u0174': 'W',
        '\u1E86': 'W',
        '\u1E84': 'W',
        '\u1E88': 'W',
        '\u2C72': 'W',
        '\u24CD': 'X',
        '\uFF38': 'X',
        '\u1E8A': 'X',
        '\u1E8C': 'X',
        '\u24CE': 'Y',
        '\uFF39': 'Y',
        '\u1EF2': 'Y',
        '\u00DD': 'Y',
        '\u0176': 'Y',
        '\u1EF8': 'Y',
        '\u0232': 'Y',
        '\u1E8E': 'Y',
        '\u0178': 'Y',
        '\u1EF6': 'Y',
        '\u1EF4': 'Y',
        '\u01B3': 'Y',
        '\u024E': 'Y',
        '\u1EFE': 'Y',
        '\u24CF': 'Z',
        '\uFF3A': 'Z',
        '\u0179': 'Z',
        '\u1E90': 'Z',
        '\u017B': 'Z',
        '\u017D': 'Z',
        '\u1E92': 'Z',
        '\u1E94': 'Z',
        '\u01B5': 'Z',
        '\u0224': 'Z',
        '\u2C7F': 'Z',
        '\u2C6B': 'Z',
        '\uA762': 'Z',
        '\u24D0': 'a',
        '\uFF41': 'a',
        '\u1E9A': 'a',
        '\u00E0': 'a',
        '\u00E1': 'a',
        '\u00E2': 'a',
        '\u1EA7': 'a',
        '\u1EA5': 'a',
        '\u1EAB': 'a',
        '\u1EA9': 'a',
        '\u00E3': 'a',
        '\u0101': 'a',
        '\u0103': 'a',
        '\u1EB1': 'a',
        '\u1EAF': 'a',
        '\u1EB5': 'a',
        '\u1EB3': 'a',
        '\u0227': 'a',
        '\u01E1': 'a',
        '\u00E4': 'a',
        '\u01DF': 'a',
        '\u1EA3': 'a',
        '\u00E5': 'a',
        '\u01FB': 'a',
        '\u01CE': 'a',
        '\u0201': 'a',
        '\u0203': 'a',
        '\u1EA1': 'a',
        '\u1EAD': 'a',
        '\u1EB7': 'a',
        '\u1E01': 'a',
        '\u0105': 'a',
        '\u2C65': 'a',
        '\u0250': 'a',
        '\uA733': 'aa',
        '\u00E6': 'ae',
        '\u01FD': 'ae',
        '\u01E3': 'ae',
        '\uA735': 'ao',
        '\uA737': 'au',
        '\uA739': 'av',
        '\uA73B': 'av',
        '\uA73D': 'ay',
        '\u24D1': 'b',
        '\uFF42': 'b',
        '\u1E03': 'b',
        '\u1E05': 'b',
        '\u1E07': 'b',
        '\u0180': 'b',
        '\u0183': 'b',
        '\u0253': 'b',
        '\u24D2': 'c',
        '\uFF43': 'c',
        '\u0107': 'c',
        '\u0109': 'c',
        '\u010B': 'c',
        '\u010D': 'c',
        '\u00E7': 'c',
        '\u1E09': 'c',
        '\u0188': 'c',
        '\u023C': 'c',
        '\uA73F': 'c',
        '\u2184': 'c',
        '\u24D3': 'd',
        '\uFF44': 'd',
        '\u1E0B': 'd',
        '\u010F': 'd',
        '\u1E0D': 'd',
        '\u1E11': 'd',
        '\u1E13': 'd',
        '\u1E0F': 'd',
        '\u0111': 'd',
        '\u018C': 'd',
        '\u0256': 'd',
        '\u0257': 'd',
        '\uA77A': 'd',
        '\u01F3': 'dz',
        '\u01C6': 'dz',
        '\u24D4': 'e',
        '\uFF45': 'e',
        '\u00E8': 'e',
        '\u00E9': 'e',
        '\u00EA': 'e',
        '\u1EC1': 'e',
        '\u1EBF': 'e',
        '\u1EC5': 'e',
        '\u1EC3': 'e',
        '\u1EBD': 'e',
        '\u0113': 'e',
        '\u1E15': 'e',
        '\u1E17': 'e',
        '\u0115': 'e',
        '\u0117': 'e',
        '\u00EB': 'e',
        '\u1EBB': 'e',
        '\u011B': 'e',
        '\u0205': 'e',
        '\u0207': 'e',
        '\u1EB9': 'e',
        '\u1EC7': 'e',
        '\u0229': 'e',
        '\u1E1D': 'e',
        '\u0119': 'e',
        '\u1E19': 'e',
        '\u1E1B': 'e',
        '\u0247': 'e',
        '\u025B': 'e',
        '\u01DD': 'e',
        '\u24D5': 'f',
        '\uFF46': 'f',
        '\u1E1F': 'f',
        '\u0192': 'f',
        '\uA77C': 'f',
        '\u24D6': 'g',
        '\uFF47': 'g',
        '\u01F5': 'g',
        '\u011D': 'g',
        '\u1E21': 'g',
        '\u011F': 'g',
        '\u0121': 'g',
        '\u01E7': 'g',
        '\u0123': 'g',
        '\u01E5': 'g',
        '\u0260': 'g',
        '\uA7A1': 'g',
        '\u1D79': 'g',
        '\uA77F': 'g',
        '\u24D7': 'h',
        '\uFF48': 'h',
        '\u0125': 'h',
        '\u1E23': 'h',
        '\u1E27': 'h',
        '\u021F': 'h',
        '\u1E25': 'h',
        '\u1E29': 'h',
        '\u1E2B': 'h',
        '\u1E96': 'h',
        '\u0127': 'h',
        '\u2C68': 'h',
        '\u2C76': 'h',
        '\u0265': 'h',
        '\u0195': 'hv',
        '\u24D8': 'i',
        '\uFF49': 'i',
        '\u00EC': 'i',
        '\u00ED': 'i',
        '\u00EE': 'i',
        '\u0129': 'i',
        '\u012B': 'i',
        '\u012D': 'i',
        '\u00EF': 'i',
        '\u1E2F': 'i',
        '\u1EC9': 'i',
        '\u01D0': 'i',
        '\u0209': 'i',
        '\u020B': 'i',
        '\u1ECB': 'i',
        '\u012F': 'i',
        '\u1E2D': 'i',
        '\u0268': 'i',
        '\u0131': 'i',
        '\u24D9': 'j',
        '\uFF4A': 'j',
        '\u0135': 'j',
        '\u01F0': 'j',
        '\u0249': 'j',
        '\u24DA': 'k',
        '\uFF4B': 'k',
        '\u1E31': 'k',
        '\u01E9': 'k',
        '\u1E33': 'k',
        '\u0137': 'k',
        '\u1E35': 'k',
        '\u0199': 'k',
        '\u2C6A': 'k',
        '\uA741': 'k',
        '\uA743': 'k',
        '\uA745': 'k',
        '\uA7A3': 'k',
        '\u24DB': 'l',
        '\uFF4C': 'l',
        '\u0140': 'l',
        '\u013A': 'l',
        '\u013E': 'l',
        '\u1E37': 'l',
        '\u1E39': 'l',
        '\u013C': 'l',
        '\u1E3D': 'l',
        '\u1E3B': 'l',
        '\u017F': 'l',
        '\u0142': 'l',
        '\u019A': 'l',
        '\u026B': 'l',
        '\u2C61': 'l',
        '\uA749': 'l',
        '\uA781': 'l',
        '\uA747': 'l',
        '\u01C9': 'lj',
        '\u24DC': 'm',
        '\uFF4D': 'm',
        '\u1E3F': 'm',
        '\u1E41': 'm',
        '\u1E43': 'm',
        '\u0271': 'm',
        '\u026F': 'm',
        '\u24DD': 'n',
        '\uFF4E': 'n',
        '\u01F9': 'n',
        '\u0144': 'n',
        '\u00F1': 'n',
        '\u1E45': 'n',
        '\u0148': 'n',
        '\u1E47': 'n',
        '\u0146': 'n',
        '\u1E4B': 'n',
        '\u1E49': 'n',
        '\u019E': 'n',
        '\u0272': 'n',
        '\u0149': 'n',
        '\uA791': 'n',
        '\uA7A5': 'n',
        '\u01CC': 'nj',
        '\u24DE': 'o',
        '\uFF4F': 'o',
        '\u00F2': 'o',
        '\u00F3': 'o',
        '\u00F4': 'o',
        '\u1ED3': 'o',
        '\u1ED1': 'o',
        '\u1ED7': 'o',
        '\u1ED5': 'o',
        '\u00F5': 'o',
        '\u1E4D': 'o',
        '\u022D': 'o',
        '\u1E4F': 'o',
        '\u014D': 'o',
        '\u1E51': 'o',
        '\u1E53': 'o',
        '\u014F': 'o',
        '\u022F': 'o',
        '\u0231': 'o',
        '\u00F6': 'o',
        '\u022B': 'o',
        '\u1ECF': 'o',
        '\u0151': 'o',
        '\u01D2': 'o',
        '\u020D': 'o',
        '\u020F': 'o',
        '\u01A1': 'o',
        '\u1EDD': 'o',
        '\u1EDB': 'o',
        '\u1EE1': 'o',
        '\u1EDF': 'o',
        '\u1EE3': 'o',
        '\u1ECD': 'o',
        '\u1ED9': 'o',
        '\u01EB': 'o',
        '\u01ED': 'o',
        '\u00F8': 'o',
        '\u01FF': 'o',
        '\u0254': 'o',
        '\uA74B': 'o',
        '\uA74D': 'o',
        '\u0275': 'o',
        '\u01A3': 'oi',
        '\u0223': 'ou',
        '\uA74F': 'oo',
        '\u24DF': 'p',
        '\uFF50': 'p',
        '\u1E55': 'p',
        '\u1E57': 'p',
        '\u01A5': 'p',
        '\u1D7D': 'p',
        '\uA751': 'p',
        '\uA753': 'p',
        '\uA755': 'p',
        '\u24E0': 'q',
        '\uFF51': 'q',
        '\u024B': 'q',
        '\uA757': 'q',
        '\uA759': 'q',
        '\u24E1': 'r',
        '\uFF52': 'r',
        '\u0155': 'r',
        '\u1E59': 'r',
        '\u0159': 'r',
        '\u0211': 'r',
        '\u0213': 'r',
        '\u1E5B': 'r',
        '\u1E5D': 'r',
        '\u0157': 'r',
        '\u1E5F': 'r',
        '\u024D': 'r',
        '\u027D': 'r',
        '\uA75B': 'r',
        '\uA7A7': 'r',
        '\uA783': 'r',
        '\u24E2': 's',
        '\uFF53': 's',
        '\u00DF': 's',
        '\u015B': 's',
        '\u1E65': 's',
        '\u015D': 's',
        '\u1E61': 's',
        '\u0161': 's',
        '\u1E67': 's',
        '\u1E63': 's',
        '\u1E69': 's',
        '\u0219': 's',
        '\u015F': 's',
        '\u023F': 's',
        '\uA7A9': 's',
        '\uA785': 's',
        '\u1E9B': 's',
        '\u24E3': 't',
        '\uFF54': 't',
        '\u1E6B': 't',
        '\u1E97': 't',
        '\u0165': 't',
        '\u1E6D': 't',
        '\u021B': 't',
        '\u0163': 't',
        '\u1E71': 't',
        '\u1E6F': 't',
        '\u0167': 't',
        '\u01AD': 't',
        '\u0288': 't',
        '\u2C66': 't',
        '\uA787': 't',
        '\uA729': 'tz',
        '\u24E4': 'u',
        '\uFF55': 'u',
        '\u00F9': 'u',
        '\u00FA': 'u',
        '\u00FB': 'u',
        '\u0169': 'u',
        '\u1E79': 'u',
        '\u016B': 'u',
        '\u1E7B': 'u',
        '\u016D': 'u',
        '\u00FC': 'u',
        '\u01DC': 'u',
        '\u01D8': 'u',
        '\u01D6': 'u',
        '\u01DA': 'u',
        '\u1EE7': 'u',
        '\u016F': 'u',
        '\u0171': 'u',
        '\u01D4': 'u',
        '\u0215': 'u',
        '\u0217': 'u',
        '\u01B0': 'u',
        '\u1EEB': 'u',
        '\u1EE9': 'u',
        '\u1EEF': 'u',
        '\u1EED': 'u',
        '\u1EF1': 'u',
        '\u1EE5': 'u',
        '\u1E73': 'u',
        '\u0173': 'u',
        '\u1E77': 'u',
        '\u1E75': 'u',
        '\u0289': 'u',
        '\u24E5': 'v',
        '\uFF56': 'v',
        '\u1E7D': 'v',
        '\u1E7F': 'v',
        '\u028B': 'v',
        '\uA75F': 'v',
        '\u028C': 'v',
        '\uA761': 'vy',
        '\u24E6': 'w',
        '\uFF57': 'w',
        '\u1E81': 'w',
        '\u1E83': 'w',
        '\u0175': 'w',
        '\u1E87': 'w',
        '\u1E85': 'w',
        '\u1E98': 'w',
        '\u1E89': 'w',
        '\u2C73': 'w',
        '\u24E7': 'x',
        '\uFF58': 'x',
        '\u1E8B': 'x',
        '\u1E8D': 'x',
        '\u24E8': 'y',
        '\uFF59': 'y',
        '\u1EF3': 'y',
        '\u00FD': 'y',
        '\u0177': 'y',
        '\u1EF9': 'y',
        '\u0233': 'y',
        '\u1E8F': 'y',
        '\u00FF': 'y',
        '\u1EF7': 'y',
        '\u1E99': 'y',
        '\u1EF5': 'y',
        '\u01B4': 'y',
        '\u024F': 'y',
        '\u1EFF': 'y',
        '\u24E9': 'z',
        '\uFF5A': 'z',
        '\u017A': 'z',
        '\u1E91': 'z',
        '\u017C': 'z',
        '\u017E': 'z',
        '\u1E93': 'z',
        '\u1E95': 'z',
        '\u01B6': 'z',
        '\u0225': 'z',
        '\u0240': 'z',
        '\u2C6C': 'z',
        '\uA763': 'z',
        '\u0386': '\u0391',
        '\u0388': '\u0395',
        '\u0389': '\u0397',
        '\u038A': '\u0399',
        '\u03AA': '\u0399',
        '\u038C': '\u039F',
        '\u038E': '\u03A5',
        '\u03AB': '\u03A5',
        '\u038F': '\u03A9',
        '\u03AC': '\u03B1',
        '\u03AD': '\u03B5',
        '\u03AE': '\u03B7',
        '\u03AF': '\u03B9',
        '\u03CA': '\u03B9',
        '\u0390': '\u03B9',
        '\u03CC': '\u03BF',
        '\u03CD': '\u03C5',
        '\u03CB': '\u03C5',
        '\u03B0': '\u03C5',
        '\u03C9': '\u03C9',
        '\u03C2': '\u03C3'
    };

    public static fnOperators: Operators = {
        /**
         * Returns true when the actual input is equal to the given input.
         * @param  {string|number|boolean} actual
         * @param  {string|number|boolean} expected
         * @param  {boolean} ignoreCase?
         * @param  {boolean} ignoreAccent?
         */
        equal: (actual: string | number | boolean, expected: string | number | boolean, ignoreCase?: boolean,
            ignoreAccent?: boolean): boolean => {
            if (ignoreAccent) {
                actual = <string>DataUtil.ignoreDiacritics(actual);
                expected = <string>DataUtil.ignoreDiacritics(expected);
            }
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
        notequal: (actual: string | number | boolean, expected: string | number | boolean, ignoreCase?: boolean,
            ignoreAccent?: boolean): boolean => {
            if (ignoreAccent) {
                actual = <string>DataUtil.ignoreDiacritics(actual);
                expected = <string>DataUtil.ignoreDiacritics(expected);
            }
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
        contains: (actual: string | number, expected: string | number, ignoreCase?: boolean, ignoreAccent?: boolean): boolean => {
            if (ignoreAccent) {
                actual = <string>DataUtil.ignoreDiacritics(actual);
                expected = <string>DataUtil.ignoreDiacritics(expected);
            }
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
        startswith: (actual: string, expected: string, ignoreCase?: boolean, ignoreAccent?: boolean): boolean => {
            if (ignoreAccent) {
                actual = <string>DataUtil.ignoreDiacritics(actual);
                expected = <string>DataUtil.ignoreDiacritics(expected);
            }
            if (ignoreCase) {
                return actual && expected && DataUtil.startsWith(DataUtil.toLowerCase(actual), DataUtil.toLowerCase(expected));
            }
            return actual && expected && DataUtil.startsWith(actual, expected);
        },
        /**
         * Returns true when the actual input ends with the given string.
         * @param  {string} actual
         * @param  {string} expected
         * @param  {boolean} ignoreCase?
         */
        endswith: (actual: string, expected: string, ignoreCase?: boolean, ignoreAccent?: boolean): boolean => {
            if (ignoreAccent) {
                actual = <string>DataUtil.ignoreDiacritics(actual);
                expected = <string>DataUtil.ignoreDiacritics(expected);
            }
            if (ignoreCase) {
                return actual && expected && DataUtil.endsWith(DataUtil.toLowerCase(actual), DataUtil.toLowerCase(expected));
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
                    return DataUtil.dateParse.toTimeZone(new Date(parseInt(ms[1], 10)), DataUtil.serverTimezoneOffset, true);
                } else if (/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(<string>value)) {
                    let arr: string[] = (<string>dupValue).split(/[^0-9]/);
                    value = DataUtil.dateParse
                        .toTimeZone(
                            new Date(
                                parseInt(arr[0], 10),
                                parseInt(arr[1], 10) - 1,
                                parseInt(arr[2], 10),
                                parseInt(arr[3], 10),
                                parseInt(arr[4], 10),
                                parseInt(arr[5], 10)
                            ),
                            DataUtil.serverTimezoneOffset, true);
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
        jsonReplacer: (val: Object, stringify: boolean): Object => {
            let value: Date;
            let keys: string[] = Object.keys(val);
            for (let prop of keys) {
                value = val[prop];

                if (!(value instanceof Date)) {
                    continue;
                }
                let d: Date = value;
                val[prop] = DataUtil.dateParse.toTimeZone(DataUtil.dateParse.addSelfOffset(d), DataUtil.serverTimezoneOffset).toJSON();
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

    /**
     * To get distinct values of Array or Array of Objects.
     * @param  {Object[]} json
     * @param  {string} field
     * @param  {boolean} requiresCompleteRecord
     * @returns Object[]
     * * distinct array of objects is return when requiresCompleteRecord set as true.
     * @hidden
     */
    public static distinct(json: Object[], fieldName: string, requiresCompleteRecord?: boolean): Object[] {
        requiresCompleteRecord = isNullOrUndefined(requiresCompleteRecord) ? false : requiresCompleteRecord;
        let result: Object[] = [];
        let val: string;
        let tmp: Object = {};
        json.forEach((data: Object, index: number) => {
            val = DataUtil.getVal(json, index, fieldName) as string;
            if (!(val in tmp)) {
                result.push(!requiresCompleteRecord ? val : json[index]);
                tmp[val] = 1;
            }
        });
        return result;
    }
    /**
     * @hidden
     */
    public static dateParse: DateParseOption = {
        addSelfOffset: (input: Date) => {
            return new Date(+input - (input.getTimezoneOffset() * 60000));
        },
        toUTC: (input: Date) => {
            return new Date(+input + (input.getTimezoneOffset() * 60000));
        },
        toTimeZone: (input: Date, offset?: number, utc?: boolean) => {
            if (offset === null) { return input; }
            let unix: Date = utc ? DataUtil.dateParse.toUTC(input) : input;
            return new Date(+unix - (offset * 3600000));
        }
    };
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
/**
 * @hidden
 */
export interface DateParseOption {
    addSelfOffset?: (input: Date) => Date;
    toUTC?: (input: Date) => Date;
    toTimeZone?: (input: Date, offset?: number, utc?: boolean) => Date;
}