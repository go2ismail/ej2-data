define(["require", "exports", "../src/manager", "../src/util", "../src/query"], function (require, exports, manager_1, util_1, query_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('DataUtil', function () {
        var dataManager;
        var query;
        var result;
        var data = [
            { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' },
            { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61, Guid: 'db2d2186-1c29-4d1e-88ef-a127f521b9c6' },
            { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: null, Freight: 65.83, Guid: '6F9619FF-8B86-D011-B42D-00C04FC964FF' },
            { OrderID: 10251, CustomerID: 'VINET', EmployeeID: 7, Freight: 70.63, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c8' },
            { OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: null, Freight: 45.45, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c9' }
        ];
        describe('sorting for null data method', function () {
            it('To check null value sorting in ascending.', function () {
                dataManager = new manager_1.DataManager(data);
                query = new query_1.Query().sortBy('EmployeeID', 'ascending');
                result = query.executeLocal(dataManager);
                expect(result[0] <= result[1]).toBe(true);
            });
            it('To check null value sorting in descending.', function () {
                dataManager = new manager_1.DataManager(data);
                query = new query_1.Query().sortBy('EmployeeID', 'descending');
                result = query.executeLocal(dataManager);
                expect(result[0] >= result[1]).toBe(true);
            });
        });
        describe('getValue method', function () {
            it('To check function in getValue method.', function () {
                new util_1.DataUtil();
                expect(util_1.DataUtil.getValue(function () { return 'called'; })).toBe('called');
            });
        });
        describe('getObject method', function () {
            it('To check data returned properly.', function () {
                var result = util_1.DataUtil.getObject('Employee.FirstName', { Employee: null, FirstName: 'Smith' });
                expect(result).toBeNull;
            });
        });
        describe('min method', function () {
            it('To check function instead of field name.', function () {
                var result = util_1.DataUtil.aggregates.min(data, util_1.DataUtil.fnAscending);
                expect(result).toBeNull;
            });
        });
        describe('max method', function () {
            it('To check function instead of field name.', function () {
                var result = util_1.DataUtil.aggregates.max(data, util_1.DataUtil.fnAscending);
                expect(result).toBeNull;
            });
        });
        describe('notnull method', function () {
            it('To check method is properly working.', function () {
                expect(util_1.DataUtil.fnOperators.notnull(null)).toBeTruthy;
                expect(util_1.DataUtil.fnOperators.notnull('Called')).toBeFalsy;
            });
        });
        describe('processSymbols method', function () {
            it('To check method is properly working.', function () {
                expect(util_1.DataUtil.fnOperators.notnull(null)).toBeTruthy;
                expect(util_1.DataUtil.fnOperators.notnull('Called')).toBeFalsy;
            });
        });
        describe('parse method', function () {
            it('To check method is properly working when given text as boolean.', function () {
                expect(util_1.DataUtil.parse.parseJson(true)).toBe(true);
            });
            it('To check method is properly working when array of data.', function () {
                expect(util_1.DataUtil.parse.parseJson(['John'])).toEqual(['John']);
            });
            it('To check method is properly working when array of data.', function () {
                expect(util_1.DataUtil.parse.parseJson([1, 2])).toEqual([1, 2]);
            });
        });
        describe('isJson method', function () {
            it('To check method is properly working.', function () {
                expect(util_1.DataUtil.parse.isJson([{ Name: 'John' }])).not.toBe(null);
            });
        });
        describe('isJson method using array', function () {
            it('To check method is properly working.', function () {
                expect(util_1.DataUtil.parse.isJson(['John'])).toEqual(['John']);
            });
        });
        describe('replacer method', function () {
            it('To check method is properly working.', function () {
                result = util_1.DataUtil.parse.replacer([{ name: 'John' }]);
                expect(result).not.toBeNull;
            });
            it('To check method using date value.', function () {
                result = util_1.DataUtil.parse.replacer([new Date()]);
                expect(result).not.toBeNull;
            });
            it('To check method using string value.', function () {
                result = util_1.DataUtil.parse.replacer(['John']);
                expect(result).not.toBeNull;
            });
        });
        describe('group method with aggregates', function () {
            var gpds = util_1.DataUtil.group(data, "OrderID");
            var gp = util_1.DataUtil.group(data.slice(2), "OrderID", [{ type: "sum", field: "OrderID" }], 0, gpds);
            it('check aggregate data', function () {
                expect(gp[0].aggregates["OrderID - sum"]).toBe(10250);
            });
        });
    });
});
