define(["require", "exports", "../src/manager", "../src/adaptors", "../src/adaptors", "../src/query", "../src/util", "@syncfusion/ej2-base/util", "../node_modules/es6-promise/dist/es6-promise"], function (require, exports, manager_1, adaptors_1, adaptors_2, query_1, util_1, util_2) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Json Adaptor', function () {
        var data = [
            { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' },
            { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61, Guid: 'db2d2186-1c29-4d1e-88ef-a127f521b9c6' },
            { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83, Guid: '6F9619FF-8B86-D011-B42D-00C04FC964FF' },
            { OrderID: 10251, CustomerID: 'VINET', EmployeeID: 7, Freight: 70.63, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c8' },
            { OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 6, Freight: 45.45, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c9' }
        ];
        var crudData = [
            { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 },
            { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61 },
            { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83 },
            { OrderID: 10251, CustomerID: 'VINET', EmployeeID: 7, Freight: 70.63 },
            { OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 6, Freight: 45.45 }
        ];
        var aggData = [
            { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38, Verified: true },
            { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61, Verified: false },
            { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83, Verified: true },
            { OrderID: 10251, CustomerID: 'SUPRD', EmployeeID: 7, Freight: 70.63, Verified: false }
        ];
        var dataManager;
        describe('To check DataManager', function () {
            it('generated data properly', function () {
                dataManager = new manager_1.DataManager(data, new query_1.Query(), new adaptors_1.JsonAdaptor);
                expect(dataManager.executeLocal().length).toBe(data.length);
            });
            describe('batchRequst method', function () {
                var result;
                var changes = { changedRecords: [], addedRecords: [], deletedRecords: [] };
                beforeAll(function (done) {
                    changes.changedRecords.push({ OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 1, Freight: 65.83 });
                    changes.addedRecords.push({ OrderID: 10253, CustomerID: 'ANNARS', EmployeeID: 4, Freight: 22.33 });
                    changes.deletedRecords.push({ OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 });
                    dataManager = new manager_1.DataManager(crudData, new query_1.Query(), new adaptors_1.JsonAdaptor);
                    dataManager.dataSource.key = 'OrderID';
                    dataManager.saveChanges(changes);
                    result = dataManager.executeLocal();
                    done();
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(5);
                });
                it('check data added properly', function () {
                    expect(result[4]["OrderID"]).toBe(10253);
                });
                it('check data cheanges reflected properly', function () {
                    expect(result[1]["EmployeeID"]).toBe(1);
                });
                it('check data deleted properly', function () {
                    expect(result[0]).not.toEqual(data[0]);
                });
            });
            describe('batchRequst method with query', function () {
                var result;
                var changes = { changedRecords: [], addedRecords: [], deletedRecords: [] };
                beforeAll(function (done) {
                    changes.changedRecords.push({ OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 2, Freight: 65.83 });
                    dataManager = new manager_1.DataManager(crudData, new query_1.Query(), new adaptors_1.JsonAdaptor);
                    dataManager.dataSource.key = 'OrderID';
                    dataManager.saveChanges(changes, 'OrderID', new query_1.Query());
                    result = dataManager.executeLocal();
                    done();
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(5);
                });
                it('check data added properly', function () {
                    expect(result[4]["OrderID"]).toBe(10253);
                });
                it('check data cheanges reflected properly', function () {
                    expect(result[1]["EmployeeID"]).toBe(2);
                });
                it('check data deleted properly', function () {
                    expect(result[0]).not.toEqual(data[0]);
                });
            });
            describe('page method', function () {
                it('check length of the data', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().page(2, 3), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(2);
                });
                it('check data paging properly', function () {
                    var result = dataManager.executeLocal();
                    expect(result[0]).toEqual(data[3]);
                });
                it('check data paging without data', function () {
                    dataManager = new manager_1.DataManager([], new query_1.Query().page(1, 2), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(0);
                });
            });
            describe('range method', function () {
                it('check length of the data', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().page(1, 2), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(2);
                });
                it('check data paging properly', function () {
                    var result = dataManager.executeLocal();
                    expect(result[0]).toEqual(data[0]);
                    expect(result[1]).toEqual(data[1]);
                });
                it('check data range without data', function () {
                    dataManager = new manager_1.DataManager([], new query_1.Query().range(1, 2), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(0);
                });
            });
            describe('where method', function () {
                it('check length of the data', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().where('CustomerID', 'equal', 'VINET'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(2);
                });
                it('check filtered data without data in dataManager', function () {
                    dataManager = new manager_1.DataManager([], new query_1.Query().where('CustomerID', 'equal', 'VINET'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(0);
                });
            });
            describe('aggregate method', function () {
                var result;
                describe('sum method', function () {
                    it('check length of the data', function () {
                        dataManager = new manager_1.DataManager(aggData, new query_1.Query().aggregate('sum', 'Freight').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Freight - sum']).toBe(180.45);
                    });
                    it('check aggregate data without data', function () {
                        dataManager = new manager_1.DataManager([], new query_1.Query().aggregate('sum', 'Freight').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Freight - sum']).toBeNull();
                    });
                });
                describe('average method', function () {
                    it('check length of the data', function () {
                        dataManager = new manager_1.DataManager(aggData, new query_1.Query().aggregate('average', 'Freight').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Freight - average']).toBe(45.1125);
                    });
                    it('check aggregate data without data', function () {
                        dataManager = new manager_1.DataManager([], new query_1.Query().aggregate('average', 'Freight').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Freight - average']).toBeNull();
                    });
                });
                describe('minimum method', function () {
                    it('check length of the data', function () {
                        dataManager = new manager_1.DataManager(aggData, new query_1.Query().aggregate('min', 'Freight').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Freight - min']).toBe(11.61);
                    });
                    it('check aggregate data without data', function () {
                        dataManager = new manager_1.DataManager([], new query_1.Query().aggregate('min', 'Freight').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Freight - min']).toBeNull();
                    });
                });
                describe('maximum method', function () {
                    it('check length of the data', function () {
                        dataManager = new manager_1.DataManager(aggData, new query_1.Query().aggregate('max', 'Freight').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Freight - max']).toBe(70.63);
                    });
                    it('check aggregate data without data', function () {
                        dataManager = new manager_1.DataManager([], new query_1.Query().aggregate('max', 'Freight').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Freight - max']).toBeNull();
                    });
                });
                describe('count method', function () {
                    it('check length of the data', function () {
                        dataManager = new manager_1.DataManager(aggData, new query_1.Query().aggregate('count', 'Freight').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Freight - count']).toBe(4);
                    });
                    it('check aggregate data without data', function () {
                        dataManager = new manager_1.DataManager([], new query_1.Query().aggregate('count', 'Freight').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Freight - count']).toBeNull();
                    });
                });
                describe('truecount method', function () {
                    it('check length of the data', function () {
                        dataManager = new manager_1.DataManager(aggData, new query_1.Query().aggregate('truecount', 'Verified').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Verified - truecount']).toBe(2);
                    });
                    it('check aggregate data without data', function () {
                        dataManager = new manager_1.DataManager([], new query_1.Query().aggregate('truecount', 'Verified').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Verified - truecount']).toBeNull();
                    });
                });
                describe('falsecount method', function () {
                    it('check length of the data', function () {
                        dataManager =
                            new manager_1.DataManager(aggData, new query_1.Query().aggregate('falsecount', 'Verified').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Verified - falsecount']).toBe(2);
                    });
                    it('check aggregate data without data', function () {
                        dataManager = new manager_1.DataManager([], new query_1.Query().aggregate('falsecount', 'Verified').requiresCount(), new adaptors_1.JsonAdaptor);
                        result = dataManager.executeLocal();
                        expect(result.aggregates['Verified - falsecount']).toBeNull();
                    });
                });
            });
            describe('search method', function () {
                it('check length of the data', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().search(7, 'EmployeeID', 'equal'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(2);
                });
                it('check length of the data', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().
                        search('f89dee73-af9f-4cd4-b330-db93c25ff3c9', 'Guid', 'equal'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(1);
                });
                it('check searched data without data', function () {
                    dataManager = new manager_1.DataManager([], new query_1.Query().search(7, 'EmployeeID', 'equal'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(0);
                });
                it('check searched data without field name', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().search(7, [], 'equal'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(2);
                });
            });
            describe('sortyBy method', function () {
                it('check length of the data', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().sortBy('Freight', 'descending'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(5);
                });
                it('check sorted data without data in dataManager', function () {
                    dataManager = new manager_1.DataManager([], new query_1.Query().sortBy('Freight', 'descending'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(0);
                });
                it('check sorted data without field name', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().sortBy(null, 'descending'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(5);
                });
                it('check sorted data with array of field name', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().sortBy(['Freight'], 'descending'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(5);
                });
                it('check sorted data with array of empty field', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().sortBy([null, 'Freight desc']), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(5);
                });
                it('check sorted data with guid field descending', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().sortBy('Guid', 'descending'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(5);
                });
                it('check sorted data with guid field ascending', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().sortBy('Guid', 'ascending'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(5);
                });
            });
            describe('group method', function () {
                it('check length of the data', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().group('EmployeeID'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(4);
                });
                it('check length of the data when using guid', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().group('Guid'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(5);
                });
                it('check length of the data when using guid with multiple group', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().group('Guid').group('EmployeeID').group('CustomerID'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(1);
                });
                it('check searched data without data', function () {
                    dataManager = new manager_1.DataManager([], new query_1.Query().group('EmployeeID'), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(0);
                });
                it('check length of the data', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().group('EmployeeID').aggregate('sum', 'Freight').requiresCount(), new adaptors_1.JsonAdaptor);
                    var result = dataManager.executeLocal();
                    expect(result.result.length).toBe(4);
                    expect(result.result[0].aggregates['Freight - sum']).toBe(11.61);
                });
            });
            describe('take method', function () {
                it('check length of the data', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().take(3), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(3);
                });
                it('check take without data', function () {
                    dataManager = new manager_1.DataManager([], new query_1.Query().take(3), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(0);
                });
            });
            describe('skip method', function () {
                it('check length of the data', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().skip(3), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(2);
                });
                it('check skip without data', function () {
                    dataManager = new manager_1.DataManager([], new query_1.Query().skip(3), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(0);
                });
            });
            describe('select method', function () {
                it('check length of the data', function () {
                    dataManager = new manager_1.DataManager(data, new query_1.Query().select(['OrderID', 'CustomerID', 'Freight']), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toBe(5);
                });
                it('check selected field without data', function () {
                    dataManager = new manager_1.DataManager([], new query_1.Query().select(['OrderID', 'CustomerID', 'Freight']), new adaptors_1.JsonAdaptor);
                    expect(dataManager.executeLocal().length).toEqual(0);
                });
            });
            describe('insert method', function () {
                var record = { OrderID: 10254, CustomerID: 'ANNARS', EmployeeID: 4, Freight: 22.33 };
                var result;
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager(crudData, new query_1.Query(), new adaptors_1.JsonAdaptor);
                    dataManager.insert(record);
                    result = dataManager.executeLocal();
                    done();
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(6);
                });
                it('check data added properly', function () {
                    expect(result[5]["OrderID"]).toBe(10254);
                });
            });
            describe('insert method with query', function () {
                var record = { OrderID: 10255, CustomerID: 'ANNARS', EmployeeID: 4, Freight: 22.33 };
                var result;
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager(crudData, new query_1.Query(), new adaptors_1.JsonAdaptor);
                    dataManager.insert(record, new query_1.Query());
                    result = dataManager.executeLocal();
                    done();
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(7);
                });
                it('check data added properly', function () {
                    expect(result[6]["OrderID"]).toBe(10255);
                });
            });
            describe('update method', function () {
                var record = { OrderID: 10254, CustomerID: 'ANNARS', EmployeeID: 3, Freight: 22.33 };
                var result;
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager(crudData, new query_1.Query(), new adaptors_1.JsonAdaptor);
                    dataManager.update('OrderID', record, 'crudData');
                    result = dataManager.executeLocal();
                    done();
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(7);
                });
                it('check data updated properly', function () {
                    expect(result[5]["EmployeeID"]).toBe(3);
                });
                it('check data updated when empty dataSource', function () {
                    dataManager = new manager_1.DataManager([], new query_1.Query(), new adaptors_1.JsonAdaptor);
                    dataManager.update('OrderID', 10249, 'crudData');
                    result = dataManager.executeLocal();
                    expect(result.length).toBe(0);
                });
            });
            describe('update method with query', function () {
                var record = { OrderID: 10255, CustomerID: 'ANNARS', EmployeeID: 3, Freight: 22.33 };
                var result;
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager(crudData, new query_1.Query(), new adaptors_1.JsonAdaptor);
                    dataManager.update('OrderID', record, new query_1.Query());
                    result = dataManager.executeLocal();
                    done();
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(7);
                });
                it('check data updated properly', function () {
                    expect(result[5]["EmployeeID"]).toBe(3);
                });
            });
            describe('remove method', function () {
                var result;
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager(crudData, new query_1.Query(), new adaptors_1.JsonAdaptor);
                    dataManager.remove('OrderID', 10249, 'crudData');
                    result = dataManager.executeLocal();
                    done();
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(6);
                });
                it('check data removed properly', function () {
                    expect(result[0]["OrderID"]).toBe(10250);
                });
                it('check data removed properly when pass object of data', function () {
                    dataManager.remove('OrderID', { OrderID: 10254, CustomerID: 'ANNARS', EmployeeID: 4, Freight: 22.33 });
                    result = dataManager.executeLocal();
                    expect(result.length).toBe(5);
                });
                it('check data removed when empty dataSource', function () {
                    dataManager = new manager_1.DataManager([], new query_1.Query(), new adaptors_1.JsonAdaptor);
                    dataManager.remove('OrderID', 10249, 'crudData');
                    result = dataManager.executeLocal();
                    expect(result.length).toBe(0);
                });
            });
            describe('remove method with query', function () {
                var result;
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager(crudData, new query_1.Query(), new adaptors_1.JsonAdaptor);
                    dataManager.remove('OrderID', 10255, new query_1.Query());
                    result = dataManager.executeLocal();
                    done();
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(4);
                });
            });
        });
    });
    describe('OData Adaptor', function () {
        var result;
        var request;
        var dataManager;
        var data = [
            { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' },
            { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61, Guid: 'db2d2186-1c29-4d1e-88ef-a127f521b9c6' },
            { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83, Guid: '6F9619FF-8B86-D011-B42D-00C04FC964FF' },
            { OrderID: 10251, CustomerID: 'VINET', EmployeeID: 7, Freight: 70.63, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c8' },
            { OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 6, Freight: 45.45, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c9' }
        ];
        var crudData = [
            { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 },
            { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61 },
            { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83 },
            { OrderID: 10251, CustomerID: 'VINET', EmployeeID: 7, Freight: 70.63 },
            { OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 6, Freight: 45.45 }
        ];
        var aggData = [
            { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38, Verified: true },
            { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61, Verified: false },
            { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83, Verified: true },
            { OrderID: 10251, CustomerID: 'SUPRD', EmployeeID: 7, Freight: 70.63, Verified: false }
        ];
        var mockAjax = function (data, query, response) {
            jasmine.Ajax.install();
            dataManager = new manager_1.DataManager({
                url: '/api/Employees',
                adaptor: new adaptors_2.ODataAdaptor
            });
            var prom = dataManager.executeQuery(query);
            var defaults = {
                'status': 200,
                'contentType': 'application/json',
                'responseText': JSON.stringify(data)
            };
            var responses = {};
            request = jasmine.Ajax.requests.mostRecent();
            util_2.extend(responses, defaults, response);
            request.respondWith(responses);
            return {
                promise: prom,
                request: request
            };
        };
        describe('basic request with no  - Verbose response', function () {
            var result;
            var mAjax;
            beforeAll(function (done) {
                mAjax = mockAjax({ d: data }, new query_1.Query());
                mAjax.promise.then(function (e) {
                    result = e;
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('basic request - Verbose response - check url', function () {
                expect(request.url).toBe('/api/Employees/');
            });
            it('basic request - Verbose response - response - data check', function () {
                expect(result.result.length).toBe(5);
            });
            it('basic request - - Verbose response - count value check', function () {
                expect(result.count).toBe(0);
            });
        });
        describe('basic request with no query - JSON Light response', function () {
            var result;
            var mAjax;
            var request;
            beforeAll(function (done) {
                mAjax = mockAjax({ "value": data }, new query_1.Query(), { 'responseHeaders': { "DataServiceVersion": "3.0", "Content-Type": "application/json" } });
                mAjax.promise.then(function (e) {
                    result = e;
                    done();
                });
                request = mAjax.request;
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('basic request - JSON Light response - check url', function () {
                expect(request.url).toBe('/api/Employees/');
            });
            it('basic request - JSON Light response - data check', function () {
                expect(result.result.length).toBe(5);
            });
            it('basic request - JSON Light response - count value check', function () {
                expect(result.count).toBe(0);
            });
        });
        describe('basic request with no query - Failed request', function () {
            var request;
            var error;
            var mAjax;
            beforeAll(function (done) {
                mAjax = mockAjax({ message: "Dude something went wrong..!!" }, new query_1.Query(), { status: 500 });
                mAjax.promise.catch(function (e) {
                    error = JSON.parse(e.error.response);
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('basic request - Failed request - check url', function () {
                expect(error.message).toBe('Dude something went wrong..!!');
            });
        });
        describe('basic request with requiresCount - Verbose response', function () {
            var request;
            var result;
            var res;
            var mAjax;
            beforeAll(function (done) {
                mAjax = mockAjax({ d: { result: data, count: 5 } }, new query_1.Query().requiresCount());
                mAjax.promise.then(function (e) {
                    result = e;
                    res = e.result;
                    done();
                });
                request = mAjax.request;
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('requiresCount - Verbose response - check url', function () {
                expect(request.url).toBe('/api/Employees/?$inlinecount=allpages');
            });
            it('requiresCount - Verbose response - data check', function () {
                expect(res.length).toBe(5);
            });
            it('requiresCount - Verbose response - count value check', function () {
                expect(result.count).toBe(5);
            });
        });
        describe('basic request with requiresCount - JSON Light response', function () {
            var request;
            var result;
            var res;
            var mAjax;
            beforeAll(function (done) {
                mAjax = mockAjax({ "value": data, "odata.count": "5" }, new query_1.Query().requiresCount(), { 'responseHeaders': { "DataServiceVersion": "3.0", "Content-Type": "application/json" } });
                mAjax.promise.then(function (e) {
                    result = e;
                    res = e.result;
                    done();
                });
                request = mAjax.request;
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('requiresCount - JSON Light response - check url', function () {
                expect(request.url).toBe('/api/Employees/?$inlinecount=allpages');
            });
            it('requiresCount - JSON Light response - data check', function () {
                expect(res.length).toBe(5);
            });
            it('requiresCount - JSON Light response - count value check', function () {
                expect(result.count).toBe(5);
            });
        });
        describe('requireFormat check', function () {
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataAdaptor,
                    requiresFormat: true
                });
                var prom = dataManager.executeQuery(new query_1.Query());
                var result;
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': JSON.stringify({ d: data })
                });
                prom.then(function (e) {
                    _this.result = e.result;
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('requireFormat - request URL check', function () {
                expect(request.url).toBe("/api/Employees/?$format=json");
            });
        });
        describe('page method', function () {
            var request;
            var result;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataAdaptor
                });
                var prom = dataManager.executeQuery(new query_1.Query().page(1, 2));
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': JSON.stringify({ d: data.slice(0, 2) })
                });
                prom.then(function (e) {
                    _this.result = e;
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it("Page method url check", function () {
                expect(request.url).toBe("/api/Employees/?$skip=0&$top=2");
            });
            it("Page method data check", function () {
                expect(_this.result.result.length).toBe(2);
            });
            it("Page method skip check", function () {
                expect(_this.result.result[0]["OrderID"]).toEqual(10248);
            });
        });
        describe('range method', function () {
            var result;
            var mAjax;
            var req;
            beforeAll(function (done) {
                mAjax = mockAjax({ d: data.slice(1, 4) }, new query_1.Query().range(1, 4));
                mAjax.promise.then(function (e) {
                    result = e;
                    done();
                });
                req = mAjax.request;
            });
            it('Range method - url check', function () {
                expect(req.url).toBe("/api/Employees/?$skip=1&$top=3");
            });
            it('Range method - data length check', function () {
                expect(result.result.length).toBe(3);
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
        });
        describe('where method', function () {
            var dataMock = function (field, operator, val, icase) {
                var fn = util_1.DataUtil.fnOperators;
                return data.filter(function (o) {
                    return fn[operator](o[field], val, icase);
                });
            };
            describe("where basic check - ignoreCase - true", function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: dataMock("CustomerID", "equal", "VINET", true) }, new query_1.Query().where('CustomerID', 'equal', 'VINET', true));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=tolower(CustomerID) eq 'vinet'");
                });
                it('generated data properly', function () {
                    expect(result.result.length).toBe(2);
                });
                it('To check filtered properly', function () {
                    expect(result.result[0]["CustomerID"]).toEqual('VINET');
                    expect(result.result[1]["CustomerID"]).toEqual('VINET');
                });
            });
            describe("where basic check - ignoreCase - false", function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: dataMock("CustomerID", "equal", "VINET", false) }, new query_1.Query().where('CustomerID', 'equal', 'VINET', false));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=CustomerID eq 'VINET'");
                });
                it('generated data properly', function () {
                    expect(result.result.length).toBe(2);
                });
                it('To check filtered properly', function () {
                    expect(result.result[0]["CustomerID"]).toEqual('VINET');
                    expect(result.result[1]["CustomerID"]).toEqual('VINET');
                });
            });
            describe("where basic check - ignoreCase in number value  - true", function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: dataMock("OrderID", 'equal', 10248, true) }, new query_1.Query().where('OrderID', 'equal', 10248, true));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=OrderID eq 10248");
                });
                it('generated data properly', function () {
                    expect(result.result.length).toBe(1);
                });
                it('To check filtered properly', function () {
                    expect(result.result[0]["OrderID"]).toEqual(10248);
                });
            });
            describe("where basic check - ignoreCase in number value - false", function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: dataMock("OrderID", 'equal', 10248, false) }, new query_1.Query().where('OrderID', 'equal', 10248, false));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=OrderID eq 10248");
                });
                it('generated data properly', function () {
                    expect(result.result.length).toBe(1);
                });
                it('To check filtered properly', function () {
                    expect(result.result[0]["OrderID"]).toEqual(10248);
                });
            });
            describe('startswith filter - ignoreCase - false', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: dataMock('CustomerID', 'startswith', 'vi', false) }, new query_1.Query().where('CustomerID', 'startswith', 'vi', false));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - startswith - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=startswith(CustomerID,'vi')");
                });
                it('where method - startswith - data check', function () {
                    expect(result.result.length).toBe(0);
                });
            });
            describe('startswith filter - ignoreCase - true', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: dataMock('CustomerID', 'startswith', 'vi', true) }, new query_1.Query().where('CustomerID', 'startswith', 'vi', true));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - startswith - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=startswith(tolower(CustomerID),'vi')");
                });
                it('where method - startswith - data check', function () {
                    expect(result.result.length).toBe(3);
                });
            });
            describe('endswith filter - ignoreCase - false', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: dataMock('CustomerID', 'endswith', 'ET', false) }, new query_1.Query().where('CustomerID', 'endswith', 'ET', false));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - endswith - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=endswith(CustomerID,'ET')");
                });
                it('where method - endswith - data check', function () {
                    expect(result.result.length).toBe(2);
                });
            });
            describe('endswith filter - ignoreCase - true', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: dataMock('CustomerID', 'endswith', 'ET', true) }, new query_1.Query().where('CustomerID', 'endswith', 'ET', true));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - endswith - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=endswith(tolower(CustomerID),'et')");
                });
                it('where method - endswith - data check', function () {
                    expect(result.result.length).toBe(2);
                });
            });
            describe('Contains filter - ignoreCase - true', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: dataMock('CustomerID', 'contains', 'NA', true) }, new query_1.Query().where('CustomerID', 'contains', 'NA', true));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - contains - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=substringof('na',tolower(CustomerID))");
                });
                it('where method - contains - data check', function () {
                    expect(result.result.length).toBe(1);
                });
            });
            describe('Contains filter - ignoreCase - false', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: dataMock('CustomerID', 'contains', 'NA', false) }, new query_1.Query().where('CustomerID', 'contains', 'NA', false));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - contains - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=substringof('NA',CustomerID)");
                });
                it('where method - contains - data check', function () {
                    expect(result.result.length).toBe(1);
                });
            });
            describe('greaterthan/lessthan/greaterthanorequal/lessthanorequal/notequal check using AND', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    var predicate = [];
                    predicate.push(new query_1.Predicate("OrderID", ">=", 10255));
                    predicate.push(new query_1.Predicate("OrderID", "<=", 10248));
                    predicate.push(new query_1.Predicate("OrderID", ">", 10249));
                    predicate.push(new query_1.Predicate("OrderID", "<", 10254));
                    predicate.push(new query_1.Predicate("OrderID", "!=", 10250));
                    mAjax = mockAjax({ d: [{ OrderID: 10251 }, { OrderID: 10252 }] }, new query_1.Query().where(query_1.Predicate.and(predicate)));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - </>/<=/>=/!= - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=(OrderID ge 10255) and (OrderID le 10248) and (OrderID gt 10249) and (OrderID lt 10254) and (OrderID ne 10250)");
                });
                it('where method - </>/<=/>=/!= - data check', function () {
                    expect(result.result.length).toBe(2);
                });
            });
            describe('greaterthan/lessthan/greaterthanorequal/lessthanorequal/notequal check using OR', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    var predicate = [];
                    predicate.push(new query_1.Predicate("OrderID", ">=", 10255));
                    predicate.push(new query_1.Predicate("OrderID", "<=", 10248));
                    predicate.push(new query_1.Predicate("OrderID", ">", 10249));
                    predicate.push(new query_1.Predicate("OrderID", "<", 10254));
                    predicate.push(new query_1.Predicate("OrderID", "!=", 10250));
                    mAjax = mockAjax({ d: new manager_1.DataManager(data).executeLocal(new query_1.Query().where(query_1.Predicate.or(predicate))) }, new query_1.Query().where(query_1.Predicate.or(predicate)));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - </>/<=/>=/!= - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=(OrderID ge 10255) or (OrderID le 10248) or (OrderID gt 10249) or (OrderID lt 10254) or (OrderID ne 10250)");
                });
                it('where method - </>/<=/>=/!= - data check', function () {
                    expect(result.result.length).toBe(5);
                });
            });
            describe('date filtering', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: [{ Date: new Date(2015, 7, 7).toJSON() }] }, new query_1.Query().where('Date', '==', new Date(2015, 7, 7)));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it("where method - contains - url check", function () {
                    expect(request.url).toBe("/api/Employees/?$filter=Date eq datetime'2015-08-07T00:00:00.000Z'");
                });
                it('where method - contains - data check', function () {
                    expect(result.result.length).toBe(1);
                });
            });
        });
        describe('search method - field as string', function () {
            var result;
            var mAjax;
            var request;
            beforeAll(function (done) {
                mAjax = mockAjax({ d: data }, new query_1.Query().search('VI', "CustomerID"));
                mAjax.promise.then(function (e) {
                    result = e;
                    done();
                });
                request = mAjax.request;
            });
            it('search method - field as string - url check', function () {
                expect(request.url).toBe("/api/Employees/?$filter=(substringof('VI',cast(CustomerID, 'Edm.String')))");
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
        });
        describe('search method - field as Array', function () {
            var result;
            var mAjax;
            var request;
            beforeAll(function (done) {
                mAjax = mockAjax({ d: data }, new query_1.Query().search('VI', ["CustomerID", "EmployeeID"]));
                mAjax.promise.then(function (e) {
                    result = e;
                    done();
                });
                request = mAjax.request;
            });
            it('search method - field as Array - url check', function () {
                expect(request.url).toBe("/api/Employees/?$filter=(substringof('VI',cast(CustomerID, 'Edm.String'))) or (substringof('VI',cast(EmployeeID, 'Edm.String')))");
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
        });
        describe('search method with operator defined', function () {
            var result;
            var mAjax;
            var request;
            beforeAll(function (done) {
                mAjax = mockAjax({ d: data }, new query_1.Query().search('VI', ["CustomerID", "EmployeeID"], "startswith"));
                mAjax.promise.then(function (e) {
                    result = e;
                    done();
                });
                request = mAjax.request;
            });
            it('search method - operator defined - url check', function () {
                expect(request.url).toBe("/api/Employees/?$filter=(startswith(cast(CustomerID, 'Edm.String'),'VI')) or (startswith(cast(EmployeeID, 'Edm.String'),'VI'))");
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
        });
        describe('search method with ignoreCase true', function () {
            var result;
            var mAjax;
            var request;
            beforeAll(function (done) {
                mAjax = mockAjax({ d: data }, new query_1.Query().search('VI', ["CustomerID", "EmployeeID"], "contains", true));
                mAjax.promise.then(function (e) {
                    result = e;
                    done();
                });
                request = mAjax.request;
            });
            it('search method - ignoreCase true - url check', function () {
                expect(request.url).toBe("/api/Employees/?$filter=(substringof('vi',tolower(cast(CustomerID, 'Edm.String')))) or (substringof('vi',tolower(cast(EmployeeID, 'Edm.String'))))");
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
        });
        describe('sort method', function () {
            describe('sort method - fieldname & no comparer', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: data }, new query_1.Query().sortBy("EmployeeID"));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                it('sort method - fieldname & no comparer - url check', function () {
                    expect(request.url).toBe('/api/Employees/?$orderby=EmployeeID');
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('sort method - Array of fieldname', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: data }, new query_1.Query().sortBy(["EmployeeID", "CustomerID"]));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                it('sort method - Array of fieldname - url check', function () {
                    expect(request.url).toBe('/api/Employees/?$orderby=EmployeeID,CustomerID');
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('sort method - multiple field with same direction', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: data }, new query_1.Query().sortBy(["EmployeeID", "CustomerID"], "descending"));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                it('sort method - multiple field with same direction - url check', function () {
                    expect(request.url).toBe('/api/Employees/?$orderby=EmployeeID desc,CustomerID desc');
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('sort method - multiple field with different direction', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: data }, new query_1.Query().sortBy("EmployeeID").sortBy("CustomerID", "descending"));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                it('sort method - multiple field with different direction - url check', function () {
                    expect(request.url).toBe('/api/Employees/?$orderby=CustomerID desc,EmployeeID');
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('sort method - comparer as string(asc)', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: data }, new query_1.Query().sortBy("EmployeeID", "ascending"));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                it('sort method - comparer as string(asc) - url check', function () {
                    expect(request.url).toBe('/api/Employees/?$orderby=EmployeeID');
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('sort method - comparer as string(desc)', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: data }, new query_1.Query().sortBy("EmployeeID", "descending"));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                it('sort method - comparer as string(asc) - url check', function () {
                    expect(request.url).toBe('/api/Employees/?$orderby=EmployeeID desc');
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('sort method - invalid direction', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: data }, new query_1.Query().sortBy("EmployeeID", "green"));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                it('sort method - invalid direction - url check', function () {
                    expect(request.url).toBe('/api/Employees/?$orderby=EmployeeID');
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('sort method - invalid direction - array of field name', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: data }, new query_1.Query().sortBy(['EmployeeID', 'CustomerID'], 'descend'));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                it('sort method - invalid direction - array of field name - url check', function () {
                    expect(request.url).toBe('/api/Employees/?$orderby=EmployeeID,CustomerID');
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
        });
        describe('group method', function () {
            describe('Single group method', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: util_1.DataUtil.sort(data, "EmployeeID", util_1.DataUtil.fnAscending) }, new query_1.Query().group("EmployeeID"));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                it('Single group method - check url', function () {
                    expect(request.url).toBe('/api/Employees/?$orderby=EmployeeID');
                });
                it('Single group method - check data length', function () {
                    expect(result.result.length).toEqual(4);
                });
                it('Single group method - check data objects', function () {
                    var obj = result.result[3];
                    expect(obj["field"]).toEqual("EmployeeID");
                    expect(obj["key"]).toEqual(7);
                    expect(obj["count"]).toBe(obj["items"].length);
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('multiple group method', function () {
                var result;
                var mAjax;
                var request;
                beforeAll(function (done) {
                    mAjax = mockAjax({ d: util_1.DataUtil.sort(data, "EmployeeID", util_1.DataUtil.fnAscending) }, new query_1.Query().group("EmployeeID").group("CustomerID"));
                    mAjax.promise.then(function (e) {
                        result = e;
                        done();
                    });
                    request = mAjax.request;
                });
                it('multiple group method - check url', function () {
                    expect(request.url).toBe('/api/Employees/?$orderby=CustomerID,EmployeeID');
                });
                it('multiple group method - check data length', function () {
                    expect(result.result.length).toEqual(4);
                });
                it('multiple group method - check data objects', function () {
                    var obj = result.result[3];
                    expect(obj["field"]).toEqual("EmployeeID");
                    expect(obj["key"]).toEqual(7);
                    expect(obj["count"]).toBe(obj["items"].length);
                });
                it('multiple group method - check level-2 data objects', function () {
                    var obj = result.result[3];
                    var item = obj["items"];
                    expect(obj["count"]).toBe(obj["items"].length);
                    expect(item.level).toBe(2);
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
        });
        describe('xml format check', function () {
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataAdaptor,
                    requiresFormat: true
                });
                var prom = dataManager.executeQuery(new query_1.Query());
                var result;
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/xml',
                    'responseText': '<xml><order></order></xml>'
                });
                prom.then(function (e) {
                    _this.result = e.result;
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('xml format  - data check', function () {
                expect(_this.result.length).toBe(0);
            });
        });
        describe('xml format check - no count', function () {
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataAdaptor
                });
                var prom = dataManager.executeQuery(new query_1.Query().requiresCount());
                var result;
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/xml',
                    'responseText': '<xml><order></order></xml>'
                });
                prom.then(function (e) {
                    _this.result = e.result;
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('xml format  - data check', function () {
                expect(_this.result.length).toBe(0);
            });
        });
    });
    describe('ODataV4 Adaptor', function () {
        var result;
        var dataManager;
        describe('To check DataManager', function () {
            beforeAll(function (done) {
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor
                });
                var promise = dataManager.executeQuery(new query_1.Query().take(5));
                promise.then(function (e) {
                    result = e.result;
                    done();
                });
            });
            it('generated data properly', function () {
                expect(result.length).toBe(5);
            });
        });
        describe('xml format check', function () {
            var request;
            var result;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor,
                    requiresFormat: true
                });
                var prom = dataManager.executeQuery(new query_1.Query());
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/xml',
                    'responseText': '<xml><order></order></xml>'
                });
                prom.then(function (e) {
                    _this.result = e.result;
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('xml format  - data check', function () {
                expect(_this.result.length).toBe(0);
            });
        });
        describe('xml format check - no count', function () {
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor
                });
                var prom = dataManager.executeQuery(new query_1.Query().requiresCount());
                var result;
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/xml',
                    'responseText': '<xml><order></order></xml>'
                });
                prom.then(function (e) {
                    _this.result = e.result;
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('xml format  - data check', function () {
                expect(_this.result.length).toBe(0);
            });
        });
        describe('page method', function () {
            beforeAll(function (done) {
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor
                });
                var promise = dataManager.executeQuery(new query_1.Query().page(2, 3).take(5));
                promise.then(function (e) {
                    result = e.result;
                    done();
                });
            });
            it('check length of the data', function () {
                expect(result.length).toBe(3);
            });
        });
        describe('range method', function () {
            beforeAll(function (done) {
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor
                });
                var promise = dataManager.executeQuery(new query_1.Query().range(1, 2).take(5));
                promise.then(function (e) {
                    result = e.result;
                    done();
                });
            });
            it('check length of the data', function () {
                expect(result.length).toBe(1);
            });
        });
        describe('where method', function () {
            beforeAll(function (done) {
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor
                });
                var promise = dataManager.executeQuery(new query_1.Query().where('LastName', 'equal', 'Andrew'));
                promise.then(function (e) {
                    result = e.result;
                    done();
                });
            });
            it('generated data properly', function () {
                expect(result.length).toBe(1);
            });
            it('To check filtered properly".', function () {
                expect(result[0]["LastName"]).toEqual('Andrew');
            });
            describe('date filtering', function () {
                var request;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: 'http://services.odata.org/V4/OData/OData.svc/Products',
                        adaptor: new adaptors_2.ODataV4Adaptor
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().
                        where('ReleaseDate', 'lessThan', new Date('December 30, 1995 12:13:00')));
                    request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify({
                            value: [{
                                    'ReleaseDate': new Date('December 30, 1994 12:13:00').toJSON()
                                }]
                        })
                    });
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('generated data properly', function () {
                    expect(result.length).toBe(1);
                });
                it('generated data filtered properly', function () {
                    expect(new Date(result[0]["ReleaseDate"]) < new Date('December 30, 1995 12:13:00')).toBe(true);
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('guid filtering', function () {
                var request;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/api/Employees',
                        adaptor: new adaptors_2.ODataV4Adaptor
                    });
                    dataManager.executeQuery(new query_1.Query().
                        where('Guid', 'equal', 'f89dee73-af9f-4cd4-b330-db93c25ff3c9', true));
                    request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify({
                            value: [{
                                    '_id': 5, 'EmployeeID': 1005, 'Guid': 'f89dee73-af9f-4cd4-b330-db93c25ff3c9', 'FirstName': 'Buchanan',
                                    'LastName': 'Steven', 'DOB': new Date('October 2, 1990 08:13:00')
                                }]
                        })
                    });
                    done();
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('generated guid filter url properly', function () {
                    expect(request.url).
                        toEqual('/api/Employees/?$filter=Guid eq guid' + '\'' + 'f89dee73-af9f-4cd4-b330-db93c25ff3c9' + '\'');
                });
            });
            describe('startsWith guid filtering', function () {
                var request;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/api/Employees',
                        adaptor: new adaptors_2.ODataV4Adaptor
                    });
                    dataManager.executeQuery(new query_1.Query().
                        where('Guid', 'startsWith', 'f89dee73-af9f-4cd4-b330-db93c25ff3c9', true));
                    request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify({
                            value: [{
                                    '_id': 5, 'EmployeeID': 1005, 'Guid': 'f89dee73-af9f-4cd4-b330-db93c25ff3c9', 'FirstName': 'Buchanan',
                                    'LastName': 'Steven', 'DOB': new Date('October 2, 1990 08:13:00')
                                }]
                        })
                    });
                    done();
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('generated guid filter url properly', function () {
                    expect(request.url).
                        toEqual('/api/Employees/?$filter=startswith(Guid,guid' + '\'' + 'f89dee73-af9f-4cd4-b330-db93c25ff3c9' + '\')');
                });
            });
        });
        describe('search method', function () {
            beforeAll(function (done) {
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor
                });
                var promise = dataManager.executeQuery(new query_1.Query().search(7, 'EmployeeID', 'equal'));
                promise.then(function (e) {
                    result = e.result;
                    done();
                });
            });
            it('To check filtered data length".', function () {
                expect(result.length).toBe(9);
            });
        });
        describe('sort method', function () {
            beforeAll(function (done) {
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor
                });
                var promise = dataManager.executeQuery(new query_1.Query().sortBy('EmployeeID', 'descending').take(5));
                promise.then(function (e) {
                    result = e.result;
                    done();
                });
            });
            it('To check sorted data length properly".', function () {
                expect(result.length).toBe(5);
            });
            it('To check filtered properly".', function () {
                expect(result[0]["_id"] > result[1]["_id"]).toEqual(true);
                expect(result[1]["_id"] > result[2]["_id"]).toEqual(true);
            });
            describe('array of field name in sort method', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: '/api/Employees',
                        adaptor: new adaptors_2.ODataV4Adaptor
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().sortBy(['EmployeeID'], 'descending').take(5));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('To check sorted data length properly".', function () {
                    expect(result.length).toBe(5);
                });
                it('To check sorted properly".', function () {
                    expect(result[0]["_id"] > result[1]["_id"]).toEqual(true);
                    expect(result[1]["_id"] > result[2]["_id"]).toEqual(true);
                });
            });
            describe('invalid operator in sort method', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: '/api/Employees',
                        adaptor: new adaptors_2.ODataV4Adaptor
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().sortBy('EmployeeID', 'descend').take(5));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('To check sorted data length properly".', function () {
                    expect(result.length).toBe(5);
                });
            });
        });
        describe('aggregate method', function () {
            beforeAll(function (done) {
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor
                });
                var promise = dataManager.executeQuery(new query_1.Query().requiresCount().aggregate('count', 'EmployeeID'));
                promise.then(function (e) {
                    result = e;
                    done();
                });
            });
            it('To check take data legnth.', function () {
                expect(result.aggregates['EmployeeID - count']).toBe(9);
            });
        });
        describe('group method', function () {
            beforeAll(function (done) {
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor
                });
                var promise = dataManager.executeQuery(new query_1.Query().group('EmployeeID'));
                promise.then(function (e) {
                    result = e.result;
                    done();
                });
            });
            it('check length of the data', function () {
                expect(result[0]["items"].length).toBe(1);
            });
            it('check field name from result', function () {
                expect(result[0]["field"]).toEqual('EmployeeID');
            });
        });
        describe('insert method', function () {
            var record = { EmployeeId: 10, LastName: 'John', FirstName: 'Stephen' };
            var result;
            var query = new query_1.Query();
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor,
                    offline: true
                });
                var promise = dataManager.insert(record, query);
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': JSON.stringify(record)
                });
                promise.then(function (e) {
                    result = 'Inserted successfully';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check data added properly', function () {
                expect(result).toBe('Inserted successfully');
            });
            it('check type of post', function () {
                expect(request.method).toEqual('POST');
            });
            it('check params', function () {
                expect(request.params).toEqual('{"EmployeeId":10,"LastName":"John","FirstName":"Stephen"}');
            });
        });
        describe('insert method when failure', function () {
            var record = { EmployeeId: 10, LastName: 'John', FirstName: 'Stephen' };
            var result;
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Orders',
                    adaptor: new adaptors_2.ODataV4Adaptor,
                    offline: true
                });
                var promise = dataManager.insert(record);
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({});
                promise.then(function (e) {
                    result = 'Inserted successfully';
                    done();
                }, function (e) {
                    result = 'Inserted failed';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check data added properly', function () {
                expect(result).toBe('Inserted failed');
            });
        });
        describe('update method', function () {
            var record = { _id: 9, EmployeeId: 1009, LastName: 'John', FirstName: 'Smith' };
            var result;
            var query = new query_1.Query();
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor,
                    offline: true
                });
                var promise = dataManager.update('_id', record, query);
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': JSON.stringify(record)
                });
                promise.then(function (e) {
                    result = 'Updated successfully';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check updated data', function () {
                expect(result).toBe('Updated successfully');
            });
            it('check type of post', function () {
                expect(request.method).toEqual('PUT');
            });
            it('check params', function () {
                expect(request.params).toEqual('{"_id":9,"EmployeeId":1009,"LastName":"John","FirstName":"Smith"}');
            });
        });
        describe('update method when failure', function () {
            var record = { _id: 9, EmployeeId: 1009, LastName: 'John', FirstName: 'Smith' };
            var result;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Orders',
                    adaptor: new adaptors_2.ODataV4Adaptor,
                    offline: true
                });
                var promise = dataManager.update('_id', record);
                var request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({});
                promise.then(function (e) {
                    result = 'Updated successfully';
                    done();
                }, function (e) {
                    result = 'Updated failed';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check updated data', function () {
                expect(result).toBe('Updated failed');
            });
        });
        describe('remove method', function () {
            var result;
            var query = new query_1.Query();
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor,
                    offline: true
                });
                var promise = dataManager.remove('RegionID', 4, query);
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': JSON.stringify({})
                });
                promise.then(function (e) {
                    result = 'Removed successfully';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check data Removed properly', function () {
                expect(result).toBe('Removed successfully');
            });
            it('check type of post', function () {
                expect(request.method).toEqual('DELETE');
            });
            it('check params', function () {
                expect(request.params).toBeNull;
            });
        });
        describe('remove method when failure', function () {
            var result;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: '/api/Region',
                    adaptor: new adaptors_2.ODataV4Adaptor,
                    offline: true
                });
                var promise = dataManager.remove('RegionID', 4);
                var request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({});
                promise.then(function (e) {
                    result = 'Removed successfully';
                    done();
                }, function (e) {
                    result = 'Removed failed';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check data Removed properly', function () {
                expect(result).toBe('Removed failed');
            });
        });
        describe('batchRequst method', function () {
            var result;
            var changes = { changedRecords: [], addedRecords: [], deletedRecords: [] };
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                changes.changedRecords.push({ RegionID: 1, RegionDescription: 'Southern' });
                changes.addedRecords.push({ RegionID: 5, RegionDescription: 'Southern' });
                changes.deletedRecords.push({ RegionID: 2, RegionDescription: 'Western' });
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataV4Adaptor
                });
                var promise = dataManager.saveChanges(changes, 'RegionID', new query_1.Query());
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'multipart/mixed; boundary=batchresponse_5daab2ca-9817-42f6-a786-2ae12905c96b',
                    'responseText': '--batchresponse_5daab2ca-9817-42f6-a786-2ae12905c96b'
                        + 'Content-Type: multipart/mixed; boundary=changesetresponse_97fbbbfb-e199-48b2-9005-67cac1e30c87'
                        + '--changesetresponse_97fbbbfb-e199-48b2-9005-67cac1e30c87'
                        + 'Content-Type: application/http'
                        + 'Content-Transfer-Encoding: binary'
                        + 'Content-ID: 0'
                        + 'HTTP/1.1 200 OK'
                        + 'Content-Type: application/json; odata.metadata=minimal'
                        + 'OData-Version: 4.0'
                        + '{'
                        + '  "@odata.context":"http://localhost:49439/odata/$metadata#Orders/$entity","OrderID":10260,"CustomerID":"OTTIK","EmployeeID":345,"OrderDate":"1996-07-19T00:00:00+05:30","RequiredDate":"1996-08-16T00:00:00+05:30","ShippedDate":"1996-07-29T00:00:00+05:30","ShipVia":1,"Freight":55.09,'
                        + '  "ShipName":"Ottilies K\u00e4seladen","ShipAddress":"Mehrheimerstr. 369","ShipCity":"Test","ShipRegion":null,"ShipPostalCode":"50739","ShipCountry":"Germany"'
                        + '}'
                        + '--changesetresponse_97fbbbfb-e199-48b2-9005-67cac1e30c87--'
                        + '--batchresponse_5daab2ca-9817-42f6-a786-2ae12905c96b--'
                });
                promise.then(function (e) {
                    result = 'Batch request successfully';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check data updated properly', function () {
                expect(result).toBe('Batch request successfully');
            });
            it('check type of the request', function () {
                expect(request.method).toEqual('POST');
            });
        });
        describe('batchRequst method using null value', function () {
            var result;
            var changes = { changedRecords: [], addedRecords: [], deletedRecords: [] };
            beforeAll(function (done) {
                jasmine.Ajax.install();
                changes.addedRecords.push({
                    'Id': 24, 'OrderID': 23, 'EmployeeID': 4, 'Freight': null,
                    'City': null, 'CreatedBy': 'TestUser', 'Created': '2015-11-06T11:28:19.211Z',
                    'ModifiedBy': 'TestUser', 'Modified': '2015-11-06T11:28:19.211Z', 'RowVersion': 'AAAAAAAANsg='
                });
                dataManager = new manager_1.DataManager({
                    url: '/api/Employees',
                    adaptor: new adaptors_2.ODataAdaptor,
                    offline: true
                });
                var promise = dataManager.saveChanges(changes, 'Id', new query_1.Query());
                var request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': '--batch_ea328062-14e7-44ae-a023-6f14a5bac3a2 Content-Type: multipart/mixed; ' +
                        'boundary=changeset_b5af43a3-f35f-41a8-b048-201f404cfb4c --changeset_b5af43a3-f35f-41a8-b048-201f404cfb4c ' +
                        'Content-Type: application/http Content-Transfer-Encoding: binary PUT Table1Items(24) HTTP/1.1 If-Match : * ' +
                        'Accept: application/json;odata=light;q=1,application/json;odata=verbose;q=0.5 Content-Id: 0 ' +
                        'Content-Type: application/json; charset=utf-8 {"Id":24,"OrderID":23,"EmployeeID":4,"Freight":null,"City":null,' +
                        '"CreatedBy":"TestUser","Created":"2015-11-06T11:28:19.211Z","ModifiedBy":"TestUser",' +
                        '"Modified":"2015-11-06T11:28:19.211Z","RowVersion":"AAAAAAAANsg="} ' +
                        '--changeset_b5af43a3-f35f-41a8-b048-201f404cfb4c-- --batch_ea328062-14e7-44ae-a023-6f14a5bac3a2-- '
                });
                promise.then(function (e) {
                    result = e;
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check data updated properly', function () {
                expect(result).not.toBeNull;
            });
        });
        describe('batchRequst method when failure', function () {
            var result;
            var changes = { changedRecords: [], addedRecords: [], deletedRecords: [] };
            beforeAll(function (done) {
                jasmine.Ajax.install();
                changes.changedRecords.push({ RegionID: 1, RegionDescription: 'Southern' });
                changes.addedRecords.push({ RegionID: 5, RegionDescription: 'Southern' });
                changes.deletedRecords.push({ RegionID: 2, RegionDescription: 'Western' });
                dataManager = new manager_1.DataManager({
                    url: '/api/Region',
                    adaptor: new adaptors_2.ODataAdaptor,
                    offline: true
                });
                var promise = dataManager.saveChanges(changes, 'RegionID', new query_1.Query());
                var request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({});
                promise.then(function (e) {
                    result = 'Batch request successfully';
                    done();
                }, function (e) {
                    result = 'Batch request failed';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check data updated properly', function () {
                expect(result).toBe('Batch request failed');
            });
        });
    });
    describe('WebApi Adaptor', function () {
        var result;
        var dataManager;
        var request;
        var data = [
            { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 7, Freight: 32.38, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' },
            { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61, Guid: 'db2d2186-1c29-4d1e-88ef-a127f521b9c6' },
            { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83, Guid: '6F9619FF-8B86-D011-B42D-00C04FC964FF' },
            { OrderID: 10251, CustomerID: 'VINET', EmployeeID: 7, Freight: 70.63, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' },
            { OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 6, Freight: 45.45, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c9' }
        ];
        var mockAjax = function (data, query, response) {
            jasmine.Ajax.install();
            dataManager = new manager_1.DataManager({
                url: '/api/Employees',
                adaptor: new adaptors_2.WebApiAdaptor
            });
            var prom = dataManager.executeQuery(query);
            var defaults = {
                'status': 200,
                'contentType': 'application/json',
                'responseText': JSON.stringify(data)
            };
            var responses = {};
            request = jasmine.Ajax.requests.mostRecent();
            util_2.extend(responses, defaults, response);
            request.respondWith(responses);
            return {
                promise: prom,
                request: request
            };
        };
        var mAjax;
        describe('To check DataManager', function () {
            beforeAll(function (done) {
                mAjax = mockAjax({ Items: data }, new query_1.Query());
                mAjax.promise.then(function (e) {
                    result = e.result;
                    done();
                });
            });
            it('generated data properly', function () {
                expect(result.length).not.toBe(0);
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
        });
        describe('group method', function () {
            beforeAll(function (done) {
                dataManager = new manager_1.DataManager({
                    url: 'http://mvc.syncfusion.com/UGService/api/Orders/',
                    adaptor: new adaptors_2.WebApiAdaptor
                });
                mAjax = mockAjax({ Items: data }, new query_1.Query().take(10).group('EmployeeID'));
                mAjax.promise.then(function (e) {
                    result = e.result;
                    done();
                });
            });
            it('check length of the data', function () {
                expect(result[0]["items"].length).not.toBe(0);
            });
            it('check field name from result', function () {
                expect(result[0]["field"]).toEqual('EmployeeID');
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
        });
        describe('insert method', function () {
            var record = { OrderID: 10980, EmployeeId: 4, Freight: 25.55, CustomerID: 'TOMSP' };
            var result;
            var query = new query_1.Query();
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: 'http://mvc.syncfusion.com/UGService/api/Orders/',
                    adaptor: new adaptors_2.WebApiAdaptor,
                    offline: true
                });
                var promise = dataManager.insert(record, query);
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': 'Response from WebApiAdaptor'
                });
                promise.then(function (e) {
                    result = 'Inserted successfully';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check data added properly', function () {
                expect(result).toBe('Inserted successfully');
            });
            it('check dparams of post', function () {
                expect(request.params).toEqual('{"OrderID":10980,"EmployeeId":4,"Freight":25.55,"CustomerID":"TOMSP"}');
            });
        });
        describe('update method', function () {
            var record = { OrderID: 10248, EmployeeId: 4, Freight: 78.55, CustomerID: 'VINET' };
            var result;
            var query = new query_1.Query();
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: 'http://mvc.syncfusion.com/UGService/api/Orders/',
                    adaptor: new adaptors_2.WebApiAdaptor,
                    offline: true
                });
                var promise = dataManager.update('OrderID', record, query);
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': 'Response from WebApiAdaptor'
                });
                promise.then(function (e) {
                    result = 'Updated successfully';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check updated data', function () {
                expect(result).toBe('Updated successfully');
            });
            it('check params of post', function () {
                expect(request.params).toEqual('{"OrderID":10248,"EmployeeId":4,"Freight":78.55,"CustomerID":"VINET"}');
            });
        });
        describe('remove method', function () {
            var result;
            var query = new query_1.Query();
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                dataManager = new manager_1.DataManager({
                    url: 'http://mvc.syncfusion.com/UGService/api/Orders/',
                    adaptor: new adaptors_2.WebApiAdaptor,
                    offline: true
                });
                var promise = dataManager.remove('RegionID', 10980, query);
                request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': 'Response from WebApiAdaptor'
                });
                promise.then(function (e) {
                    result = 'Removed successfully';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check data Removed properly', function () {
                expect(result).toBe('Removed successfully');
            });
            it('check params of post', function () {
                expect(request.params).toEqual('10980');
            });
        });
        describe('batchRequst method', function () {
            var result;
            var changes = { changedRecords: [], addedRecords: [], deletedRecords: [] };
            beforeAll(function (done) {
                jasmine.Ajax.install();
                changes.changedRecords.push({ OrderID: 10248, EmployeeId: 4, Freight: 53.55, CustomerID: 'VINET' });
                changes.addedRecords.push({ OrderID: 10981, EmployeeId: 6, Freight: 78.55, CustomerID: 'VINET' });
                changes.deletedRecords.push({ OrderID: 10250, EmployeeId: 9, Freight: 8.0000, CustomerID: 'HANAR' });
                dataManager = new manager_1.DataManager({
                    url: 'http://mvc.syncfusion.com/UGService/api/Orders/',
                    adaptor: new adaptors_2.WebApiAdaptor,
                    offline: true
                });
                var promise = dataManager.saveChanges(changes, 'RegionID', new query_1.Query());
                var request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': 'Response from WebApiAdaptor'
                });
                promise.then(function (e) {
                    result = 'Batch request successfully';
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check data updated properly', function () {
                expect(result).toBe('Batch request successfully');
            });
        });
        describe('Aggregate checking', function () {
            var request;
            var dataManager;
            var query = new query_1.Query().aggregate("min", "OrderID").requiresCount();
            var result;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                _this.dataManager = new manager_1.DataManager({
                    url: '/Home/Employees',
                    adaptor: new adaptors_2.WebApiAdaptor
                });
                var promise = _this.dataManager.executeQuery(query);
                _this.request = jasmine.Ajax.requests.mostRecent();
                _this.request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': JSON.stringify({ Items: [{ OrderID: 1 }, { OrderID: 2 }], Count: 2 }),
                    'requestHeaders': {
                        'DataServiceVersion': '3.0'
                    }
                });
                promise.then(function (e) {
                    _this.result = e;
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check whether the args wrapped in "value"', function () {
                expect(_this.result.aggregates["OrderID - min"]).toBe(1);
            });
        });
        describe('WebMethod Adaptor', function () {
            var dataManager;
            var result;
            var data = [
                { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 7, Freight: 32.38, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' },
                { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61, Guid: 'db2d2186-1c29-4d1e-88ef-a127f521b9c6' },
                { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83, Guid: '6F9619FF-8B86-D011-B42D-00C04FC964FF' },
                { OrderID: 10251, CustomerID: 'VINET', EmployeeID: 7, Freight: 70.63, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' },
                { OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 6, Freight: 45.45, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c9' }
            ];
            describe('Process Query check', function () {
                var request;
                var dataManager;
                var query = new query_1.Query().addParams("hi", "test");
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    _this.dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: new adaptors_1.WebMethodAdaptor
                    });
                    var promise = _this.dataManager.executeQuery(query);
                    _this.request = jasmine.Ajax.requests.mostRecent();
                    _this.request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify({ d: data })
                    });
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check whether the args wrapped in "value"', function () {
                    expect(_this.request.data().value).not.toBeNull();
                });
            });
            describe('insert method', function () {
                var record = { EmployeeId: 10, LastName: 'John', FirstName: 'Stephen' };
                var result;
                var query = new query_1.Query();
                var request;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Default/Orders',
                        adaptor: new adaptors_1.WebMethodAdaptor
                    });
                    var promise = dataManager.insert(record, query);
                    request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': 'Response from WebMethodAdaptor'
                    });
                    promise.then(function (e) {
                        result = 'Inserted successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data added properly', function () {
                    expect(result).toBe('Inserted successfully');
                });
                it('check params of post', function () {
                    expect(request.params).
                        toEqual('{"value":{"EmployeeId":10,"LastName":"John","FirstName":"Stephen"},"table":null,"action":"insert"}');
                });
            });
            describe('update method', function () {
                var record = { _id: 9, EmployeeId: 1009, LastName: 'John', FirstName: 'Smith' };
                var result;
                var query = new query_1.Query();
                var request;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Default/Orders',
                        adaptor: new adaptors_1.WebMethodAdaptor
                    });
                    var promise = dataManager.update('_id', record, query);
                    request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': 'Response from WebMethodAdaptor'
                    });
                    promise.then(function (e) {
                        result = 'Updated successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check updated data', function () {
                    expect(result).toBe('Updated successfully');
                });
                it('check params of post', function () {
                    expect(request.params).
                        toEqual('{"value":{"_id":9,"EmployeeId":1009,"LastName":"John","FirstName":"Smith"},"action":"update","keyColumn":"_id","key":9,"table":null}');
                });
            });
            describe('remove method', function () {
                var result;
                var query = new query_1.Query();
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Default/Orders',
                        adaptor: new adaptors_1.WebMethodAdaptor
                    });
                    var promise = dataManager.remove('RegionID', 4, query);
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': 'Response from WebMethodAdaptor'
                    });
                    promise.then(function (e) {
                        result = 'Removed successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data added properly', function () {
                    expect(result).toBe('Removed successfully');
                });
            });
            describe('batchRequst method', function () {
                var result;
                var changes = { changedRecords: [], addedRecords: [], deletedRecords: [] };
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    changes.changedRecords.push({ RegionID: 1, RegionDescription: 'Southern' });
                    changes.addedRecords.push({ RegionID: 5, RegionDescription: 'Southern' });
                    changes.deletedRecords.push({ RegionID: 2, RegionDescription: 'Western' });
                    dataManager = new manager_1.DataManager({
                        url: '/Default/Orders',
                        adaptor: new adaptors_1.WebMethodAdaptor
                    });
                    var promise = dataManager.saveChanges(changes, 'RegionID', new query_1.Query());
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify(changes)
                    });
                    promise.then(function (e) {
                        result = 'Batch request successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data updated properly', function () {
                    expect(result).toBe('Batch request successfully');
                });
            });
        });
        describe('RemoteSaveAdaptor Adaptor', function () {
            var dataManager;
            describe('batchRequst method', function () {
                var result;
                var changes = { changedRecords: [], addedRecords: [], deletedRecords: [] };
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    changes.changedRecords.push({ RegionID: 1, RegionDescription: 'Southern' });
                    changes.addedRecords.push({ RegionID: 5, RegionDescription: 'Southern' });
                    changes.deletedRecords.push({ RegionID: 2, RegionDescription: 'Western' });
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Orders',
                        adaptor: new adaptors_1.RemoteSaveAdaptor
                    });
                    var promise = dataManager.saveChanges(changes, 'RegionID', new query_1.Query());
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': 'Response from WebMethodAdaptor'
                    });
                    promise.then(function (e) {
                        result = 'Batch request successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data updated properly', function () {
                    expect(result).toBe('Batch request successfully');
                });
            });
        });
        describe('Cache Adaptor', function () {
            var result;
            var dataManager;
            describe('To check DataManager with timeTillExpiration', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().skip(10).take(5));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('generated data properly', function () {
                    expect(result.length).toBe(5);
                });
            });
            describe('To check DataManager without timeTillExpiration', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().skip(10).take(5));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('generated data properly', function () {
                    expect(result.length).toBe(5);
                });
            });
            describe('To check DataManager without enableCaching', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        timeTillExpiration: 1,
                        adaptor: new adaptors_2.CacheAdaptor
                    });
                    done();
                });
                it('generated data properly', function () {
                    expect(dataManager).not.toBeNull;
                });
            });
            describe('page method', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 1
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().page(2, 3).take(15));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(3);
                });
            });
            describe('range method', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().range(1, 2).take(5));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(1);
                });
            });
            describe('where method', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().where('CustomerID', 'equal', 'VINET').take(5));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('generated data properly', function () {
                    expect(result.length).toBe(5);
                });
                it('To check filtered properly".', function () {
                    expect(result[0]["CustomerID"]).toEqual('VINET');
                    expect(result[1]["CustomerID"]).toEqual('VINET');
                });
                describe('date filtering', function () {
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager({
                            url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                            enableCaching: true,
                            cachingPageSize: 10,
                            timeTillExpiration: 120000
                        });
                        var promise = dataManager.executeQuery(new query_1.Query().
                            where('OrderDate', 'greaterThan', new Date('December 30, 2006 12:13:00')).take(5));
                        promise.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    it('generated data properly', function () {
                        expect(result.length).toBe(5);
                    });
                    it('generated data filtered properly', function () {
                        expect(new Date(result[0]["OrderDate"]) > new Date('December 30, 2006 12:13:00')).toBe(true);
                    });
                });
            });
            describe('search method', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().search(7, 'EmployeeID', 'equal').take(5));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('To check filtered data length".', function () {
                    expect(result.length).toBe(5);
                });
                it('To check filtered properly".', function () {
                    expect(result[0]["EmployeeID"]).toEqual(7);
                    expect(result[1]["EmployeeID"]).toEqual(7);
                });
            });
            describe('sort method', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().sortBy('EmployeeID', 'descending').take(5));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('To check sorted data length properly".', function () {
                    expect(result.length).toBe(5);
                });
                it('To check filtered properly".', function () {
                    expect(result[0]["EmployeeID"] >= result[1]["EmployeeID"]).toEqual(true);
                    expect(result[1]["EmployeeID"] >= result[2]["EmployeeID"]).toEqual(true);
                });
                describe('array of field name in sort method', function () {
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager({
                            url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                            enableCaching: true,
                            cachingPageSize: 10,
                            timeTillExpiration: 120000
                        });
                        var promise = dataManager.executeQuery(new query_1.Query().sortBy(['EmployeeID'], 'descending').take(5));
                        promise.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    it('To check sorted data length properly".', function () {
                        expect(result.length).toBe(5);
                    });
                    it('To check filtered properly".', function () {
                        expect(result[0]["EmployeeID"] >= result[1]["EmployeeID"]).toEqual(true);
                        expect(result[1]["EmployeeID"] >= result[2]["EmployeeID"]).toEqual(true);
                    });
                });
                describe('invalid operator in sort method', function () {
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager({
                            url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                            enableCaching: true,
                            cachingPageSize: 10,
                            timeTillExpiration: 120000
                        });
                        var promise = dataManager.executeQuery(new query_1.Query().sortBy('EmployeeID', 'descend').take(5));
                        promise.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    it('To check sorted data length properly".', function () {
                        expect(result.length).toBe(5);
                    });
                });
                describe('array of field name with invalid operator in sort method', function () {
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager({
                            url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                            enableCaching: true,
                            cachingPageSize: 10,
                            timeTillExpiration: 120000
                        });
                        var promise = dataManager.executeQuery(new query_1.Query().sortBy(['EmployeeID'], 'descend').take(5));
                        promise.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    it('To check sorted data length properly".', function () {
                        expect(result.length).toBe(5);
                    });
                });
            });
            describe('aggregate method', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().take(10).requiresCount().aggregate('sum', 'Freight'));
                    promise.then(function (e) {
                        result = e;
                        done();
                    });
                });
                it('To check take data legnth.', function () {
                    expect(result.aggregates['Freight - sum']).toBe(409.88);
                });
            });
            describe('group method', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().take(10).group('EmployeeID'));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('check length of the data', function () {
                    expect(result[0]["items"].length).toBe(10);
                });
                it('check field name from result', function () {
                    expect(result[0]["field"]).toEqual('EmployeeID');
                });
            });
            describe('insert method', function () {
                var record = { OrderID: 10980, EmployeeId: 4, Freight: 25.55, CustomerID: 'TOMSP' };
                var result;
                var query = new query_1.Query();
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.insert(record, query);
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': 'Response from Cache Adaptor'
                    });
                    promise.then(function (e) {
                        result = 'Inserted successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data added properly', function () {
                    expect(result).toBe('Inserted successfully');
                });
            });
            describe('update method', function () {
                var record = { OrderID: 10248, EmployeeId: 4, Freight: 78.55, CustomerID: 'VINET' };
                var result;
                var query = new query_1.Query();
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.update('OrderID', record, query);
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': 'Response from CacheAdaptor'
                    });
                    promise.then(function (e) {
                        result = 'Updated successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check updated data', function () {
                    expect(result).toBe('Updated successfully');
                });
            });
            describe('remove method', function () {
                var result;
                var query = new query_1.Query();
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.remove('OrderID', 10980, query);
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': 'Response from CacheAdaptor'
                    });
                    promise.then(function (e) {
                        result = 'Removed successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data Removed properly', function () {
                    expect(result).toBe('Removed successfully');
                });
            });
            describe('batchRequst method', function () {
                var result;
                var changes = { changedRecords: [], addedRecords: [], deletedRecords: [] };
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    changes.changedRecords.push({ OrderID: 10248, EmployeeId: 4, Freight: 53.55, CustomerID: 'VINET' });
                    changes.addedRecords.push({ OrderID: 10981, EmployeeId: 6, Freight: 78.55, CustomerID: 'VINET' });
                    changes.deletedRecords.push({ OrderID: 10250, EmployeeId: 9, Freight: 8.0000, CustomerID: 'HANAR' });
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.saveChanges(changes, 'OrderID', new query_1.Query());
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': 'Response from CacheAdaptor'
                    });
                    promise.then(function (e) {
                        result = 'Batch request successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data updated properly', function () {
                    expect(result).toBe('Batch request successfully');
                });
            });
        });
        describe('UrlAdaptor Adaptor', function () {
            var dataManager;
            var result;
            var data = [
                { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 7, Freight: 32.38, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' },
                { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61, Guid: 'db2d2186-1c29-4d1e-88ef-a127f521b9c6' },
                { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83, Guid: '6F9619FF-8B86-D011-B42D-00C04FC964FF' },
                { OrderID: 10251, CustomerID: 'VINET', EmployeeID: 7, Freight: 70.63, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' },
                { OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 6, Freight: 45.45, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c9' }
            ];
            describe('page method', function () {
                var adaptor = new adaptors_1.UrlAdaptor;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: adaptor
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().page(2, 3).take(5));
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify(data)
                    });
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(5);
                    expect(adaptor.convertToQueryString({}, null, null)).toBe('');
                });
            });
            describe('range method', function () {
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: new adaptors_1.UrlAdaptor
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().range(1, 2).take(5));
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify(data)
                    });
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check length of the data', function () {
                    expect(result.length).toBe(5);
                });
            });
            describe('where method', function () {
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: new adaptors_1.UrlAdaptor
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().where('CustomerID', 'equal', 'VINET', true).take(5));
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify(data)
                    });
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('generated data properly', function () {
                    expect(result.length).toBe(5);
                });
            });
            describe('group column', function () {
                var result;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: new adaptors_1.UrlAdaptor
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().group('EmployeeID').group('CustomerID'));
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify(data)
                    });
                    promise.then(function (e) {
                        result = e;
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data filtered properly', function () {
                    expect(result.result[0]["items"].length).toBe(2);
                });
            });
            describe('group column with group data source', function () {
                var result;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: new adaptors_1.UrlAdaptor
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().group('EmployeeID').group('CustomerID').group('Guid'));
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify({ result: data, groupDs: data })
                    });
                    promise.then(function (e) {
                        result = e;
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data filtered properly', function () {
                    expect(result.result[0]["items"].length).toBe(2);
                });
            });
            describe('aggregate method', function () {
                var result;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: new adaptors_1.UrlAdaptor
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().take(10).requiresCount().
                        aggregate('count', 'EmployeeID'));
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify({ result: data, count: 5 })
                    });
                    promise.then(function (e) {
                        result = e;
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data aggregate properly', function () {
                    expect(result.aggregates['EmployeeID - count']).toBe(5);
                });
            });
            describe('aggregate method with return options', function () {
                var result;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: new adaptors_1.UrlAdaptor
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().take(10).requiresCount().
                        aggregate('count', 'EmployeeID'));
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify({ result: data, count: 5, aggregate: { 'EmployeeID - count': 5 } })
                    });
                    promise.then(function (e) {
                        result = e;
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data result properly', function () {
                    expect(result.result.length).toBe(5);
                });
                it('check data count properly', function () {
                    expect(result.count).toBe(5);
                });
            });
            describe('insert method', function () {
                var record = { EmployeeId: 10, LastName: 'John', FirstName: 'Stephen' };
                var result;
                var query = new query_1.Query();
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: new adaptors_1.UrlAdaptor
                    });
                    var promise = dataManager.insert(record, query);
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify({ d: data })
                    });
                    promise.then(function (e) {
                        result = 'Inserted successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data added properly', function () {
                    expect(result).toBe('Inserted successfully');
                });
            });
            describe('update method', function () {
                var record = { _id: 9, EmployeeId: 1009, LastName: 'John', FirstName: 'Smith' };
                var result;
                var query = new query_1.Query();
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: new adaptors_1.UrlAdaptor
                    });
                    var promise = dataManager.update('_id', record, query);
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify(data)
                    });
                    promise.then(function (e) {
                        result = 'Updated successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check updated data', function () {
                    expect(result).toBe('Updated successfully');
                });
            });
            describe('remove method', function () {
                var result;
                var query = new query_1.Query();
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: new adaptors_1.UrlAdaptor
                    });
                    var promise = dataManager.remove('EmployeeID', 4, query);
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify(data)
                    });
                    promise.then(function (e) {
                        result = 'Removed successfully';
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data Removed properly', function () {
                    expect(result).toBe('Removed successfully');
                });
            });
            describe('batchRequst method', function () {
                var result;
                var changes = { changedRecords: [], addedRecords: [], deletedRecords: [] };
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    changes.changedRecords.push({ OrderID: 10248, CustomerID: 'AANAR', EmployeeID: 7, Freight: 23.38, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' });
                    changes.addedRecords.push({ OrderID: 10253, CustomerID: 'VINET', EmployeeID: 4, Freight: 35.38, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' });
                    changes.deletedRecords.push({ OrderID: 10253, CustomerID: 'VINET', EmployeeID: 4, Freight: 35.38, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7' });
                    dataManager = new manager_1.DataManager({
                        url: '/Home/Employees',
                        adaptor: new adaptors_1.UrlAdaptor
                    });
                    var promise = dataManager.saveChanges(changes, 'OrderID', new query_1.Query());
                    var request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/json',
                        'responseText': JSON.stringify({
                            result: data,
                            addedRecords: [{
                                    OrderID: 10253, CustomerID: 'VINET', EmployeeID: 4,
                                    Freight: 35.38, Guid: 'f89dee73-af9f-4cd4-b330-db93c25ff3c7'
                                }]
                        })
                    });
                    promise.then(function (e) {
                        result = e;
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('check data updated properly', function () {
                    expect(result).not.toBeNull;
                });
            });
            describe('xml format check', function () {
                var request;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/api/Employees',
                        adaptor: new adaptors_1.UrlAdaptor,
                        requiresFormat: true
                    });
                    var prom = dataManager.executeQuery(new query_1.Query());
                    var result;
                    request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/xml',
                        'responseText': '<xml><order></order></xml>'
                    });
                    prom.then(function (e) {
                        _this.result = e.result;
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('xml format  - data check', function () {
                    expect(_this.result.length).toBe(0);
                });
            });
            describe('xml format check - no count', function () {
                var request;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: '/api/Employees',
                        adaptor: new adaptors_1.UrlAdaptor
                    });
                    var prom = dataManager.executeQuery(new query_1.Query().requiresCount());
                    var result;
                    request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith({
                        'status': 200,
                        'contentType': 'application/xml',
                        'responseText': '<xml><order></order></xml>'
                    });
                    prom.then(function (e) {
                        _this.result = e.result;
                        done();
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
                it('xml format  - data check', function () {
                    expect(_this.result.length).toBe(0);
                });
            });
        });
    });
});
