define(["require", "exports", "../src/manager", "../src/adaptors", "../src/query", "@syncfusion/ej2-base/util"], function (require, exports, manager_1, adaptors_1, query_1, util_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('DataManager', function () {
        var employeesData = [{ EmployeeID: 1, LastName: "Davolio", FirstName: "Nancy", Title: "Sales Representative" },
            { EmployeeID: 2, LastName: "Fuller", FirstName: "Andrew", Title: "Vice President, Sales" },
            { EmployeeID: 3, LastName: "Leverling", FirstName: "Janet", Title: "Sales Representative" },
            { EmployeeID: 4, LastName: "Peacock", FirstName: "Margaret", Title: "Sales Representative" },
            { EmployeeID: 5, LastName: "Fuller", FirstName: "Andrew", Title: "Vice President, Sales" },
            { EmployeeID: 6, LastName: "Leverling", FirstName: "Janet", Title: "Sales Representative" },
            { EmployeeID: 7, LastName: "Peacock", FirstName: "Margaret", Title: "Sales Representative" },
            { EmployeeID: 8, LastName: "Fuller", FirstName: "Andrew", Title: "Vice President, Sales" },
            { EmployeeID: 9, LastName: "Leverling", FirstName: "Janet", Title: "Sales Representative" }
        ];
        var data = [
            { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 },
            { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61 },
            { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83 },
            { OrderID: 10251, CustomerID: 'TOMSP', EmployeeID: 7, Freight: 70.63 },
            { OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 6, Freight: 45.45 }
        ];
        var mockAjax = function (d, query, response) {
            jasmine.Ajax.install();
            var dataManager = d.dm || new manager_1.DataManager({
                url: '/api/Employees',
            });
            var prom = dataManager.executeQuery(query);
            var request;
            var defaults = {
                'status': 200,
                'contentType': 'application/json',
                'responseText': JSON.stringify(d.data)
            };
            var responses = {};
            request = jasmine.Ajax.requests.mostRecent();
            util_1.extend(responses, defaults, response);
            request.respondWith(responses);
            return {
                promise: prom,
                request: request
            };
        };
        describe('DataManager generated properly without data', function () {
            var dataManager = new manager_1.DataManager();
            it('To check length of generated data.', function () {
                expect(dataManager.dataSource.json.length).toBe(0);
            });
            it('To check the dataType.', function () {
                expect(dataManager.dataSource.dataType).toEqual('json');
            });
            it('To check offline mode.', function () {
                expect(dataManager.dataSource.offline).toEqual(true);
            });
            dataManager = new manager_1.DataManager({});
        });
        describe('JSON data', function () {
            var complexData = [
                {
                    OrderID: 10248, CustomerID: 'VINET', Freight: 32.38,
                    Order_Details: [{ OrderID: 10248, OrderName: 'Laptop' }, { OrderID: 10248, OrderName: 'Mobile' }]
                },
                {
                    OrderID: 10249, CustomerID: 'AANAR', Freight: 11.61,
                    Order_Details: [{ OrderID: 10249, OrderName: 'RAM' }, { OrderID: 10249, OrderName: 'Tap' }]
                },
                {
                    OrderID: 10250, CustomerID: 'VICTE', Freight: 65.83,
                    Order_Details: [{ OrderID: 10250, OrderName: 'Hard-Disk' }, { OrderID: 10250, OrderName: 'Laptop' }]
                },
                {
                    OrderID: 10251, CustomerID: 'TOMSP', Freight: 70.63,
                    Order_Details: [{ OrderID: 10251, OrderName: 'Pendrive' }, { OrderID: 10251, OrderName: 'Mobile' }]
                },
                {
                    OrderID: 10252, CustomerID: 'SUPRD', Freight: 45.45,
                    Order_Details: [{ OrderID: 10252, OrderName: 'Mouse' }, { OrderID: 10252, OrderName: 'Keyboard' }]
                }
            ];
            describe('JSON data is generated properly', function () {
                var dataManager = new manager_1.DataManager(data);
                it('To check length of generated data.', function () {
                    expect(dataManager.dataSource.json.length).toBe(data.length);
                });
                it('To check the dataType.', function () {
                    expect(dataManager.dataSource.dataType).toEqual('json');
                });
                it('To check offline mode.', function () {
                    expect(dataManager.dataSource.offline).toEqual(true);
                });
            });
            describe('executeLocal method', function () {
                it('without query.', function () {
                    var dataManager = new manager_1.DataManager(data);
                    expect(function () { dataManager.executeLocal(); }).toThrow();
                });
                it('with query.', function () {
                    var dataManager = new manager_1.DataManager(data);
                    var result = dataManager.executeLocal(new query_1.Query());
                    expect(result.length).toBe(data.length);
                });
                it('without json data', function () {
                    var dataManager = new manager_1.DataManager();
                    dataManager.dataSource.json = null;
                    expect(function () { dataManager.executeLocal(new query_1.Query()); }).toThrow();
                });
                it('without json data', function () {
                    var dataManager = new manager_1.DataManager(data).
                        setDefaultQuery(new query_1.Query().select(['OrderID', 'CustomerID', 'Freight']));
                    expect(dataManager.executeLocal().length).toBe(data.length);
                });
                it('with subquery', function () {
                    var dataManager = new manager_1.DataManager(data).
                        setDefaultQuery(new query_1.Query().from('Orders').select(['OrderID', 'CustomerID', 'Freight']).hierarchy(new query_1.Query(), function () {
                        return [10248];
                    }));
                    expect(dataManager.executeLocal().length).toBe(data.length);
                });
                it('with subquery and requiresCount', function () {
                    var dataManager = new manager_1.DataManager(complexData).
                        setDefaultQuery(new query_1.Query().from('Orders').requiresCount()
                        .hierarchy(new query_1.Query().foreignKey('OrderID').from('Order_Details').requiresCount(), function () {
                        return [10248];
                    }));
                    var result = dataManager.executeLocal();
                    expect(result.count && result.result.length).toBe(data.length);
                });
                it('array of table with hierarchy', function () {
                    var dataManager = new manager_1.DataManager(complexData).
                        setDefaultQuery(new query_1.Query(['Orders']).requiresCount()
                        .hierarchy(new query_1.Query(['Order_Details']).foreignKey('OrderID').requiresCount(), function () {
                        return [10248];
                    }));
                    var result = dataManager.executeLocal();
                    expect(result.count && result.result.length).toBe(data.length);
                });
            });
            describe('cors not supported browser check', function () {
                var request = 'XMLHttpRequest';
                var savedRequest = window[request];
                beforeAll(function () {
                    window[request] = undefined;
                });
                afterAll(function () {
                    window[request] = savedRequest;
                });
                it('To check the generated data without crossDomain.', function () {
                    var dataManager = new manager_1.DataManager(data);
                    var result = dataManager.executeLocal(new query_1.Query());
                    expect(result.length).toBe(data.length);
                });
                it('To check the generated data with crossDomain.', function () {
                    var dataManager = new manager_1.DataManager({ json: data, crossDomain: false });
                    var result = dataManager.executeLocal(new query_1.Query());
                    expect(result.length).toBe(data.length);
                });
            });
            describe('To pass dataType in dataManager Object', function () {
                var dataManager = new manager_1.DataManager({ json: data, crossDomain: false, dataType: 'json' });
                var result = dataManager.executeLocal(new query_1.Query());
                it('To check the generated data.', function () {
                    expect(result.length).toBe(data.length);
                });
                it('To check the generated data.', function () {
                    expect(dataManager.dataSource.dataType).toEqual('json');
                });
            });
            describe('setDefaultQuery method', function () {
                var dataManager = new manager_1.DataManager(data).setDefaultQuery(new query_1.Query().select(['OrderID', 'CustomerID', 'Freight']));
                it('To check the default query.', function () {
                    expect(dataManager.defaultQuery !== undefined).toBe(true);
                });
                it('To check the generated query.', function () {
                    expect(dataManager.defaultQuery instanceof query_1.Query).toBe(true);
                });
                it('To check the generated query length.', function () {
                    expect(dataManager.defaultQuery.queries.length).toEqual(1);
                });
                it('To check the generated query as onSelect.', function () {
                    expect(dataManager.defaultQuery.queries[0].fn).toEqual('onSelect');
                });
                it('To check the generated query as onSelect.', function () {
                    expect(dataManager.defaultQuery.queries[0].e.fieldNames).toEqual(['OrderID', 'CustomerID', 'Freight']);
                });
            });
            describe('executeQuery method', function () {
                describe('with select and take process', function () {
                    var result;
                    beforeAll(function (done) {
                        var mAjax = mockAjax({
                            data: {
                                d: new manager_1.DataManager(data).executeLocal(new query_1.Query().take(3).select(['OrderID', 'CustomerID', 'EmployeeID']))
                            }
                        }, new query_1.Query());
                        mAjax.promise.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    it('To check the result length of data.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check the result key is equal to select query.', function () {
                        expect(Object.keys(result[0])).toEqual(['OrderID', 'CustomerID', 'EmployeeID']);
                    });
                    afterAll(function () {
                        jasmine.Ajax.uninstall();
                    });
                });
                describe('done function in executeQuery method', function () {
                    var result;
                    beforeAll(function (done) {
                        var data1 = new manager_1.DataManager(data).executeLocal(new query_1.Query().take(3).select(['OrderID', 'CustomerID', 'EmployeeID']));
                        var doneFn = function (e) {
                            result = e.result;
                        };
                        var mAjax = mockAjax({
                            dm: new manager_1.DataManager({
                                url: '/api/Orders'
                            }).setDefaultQuery(new query_1.Query().select(['OrderID', 'CustomerID', 'EmployeeID']).take(3)),
                            data: { d: data1 }
                        }, doneFn);
                        mAjax.promise.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    it('To check the result length of data.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check the result key is equal to select query.', function () {
                        expect(Object.keys(result[0])).toEqual(['OrderID', 'CustomerID', 'EmployeeID']);
                    });
                    it('To check non valid query', function () {
                        var dataManager = new manager_1.DataManager({
                            url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/'
                        });
                        var done = function (e) {
                            return e.result;
                        };
                        expect(function () { dataManager.executeQuery(done); }).toThrow();
                    });
                    afterAll(function () {
                        jasmine.Ajax.uninstall();
                    });
                });
                describe('with hierarchy', function () {
                    var result;
                    var first;
                    var last;
                    beforeAll(function (done) {
                        jasmine.Ajax.install();
                        var dataManager = new manager_1.DataManager({
                            url: '/api/'
                        }).executeQuery(new query_1.Query().from('Orders').hierarchy(new query_1.Query().foreignKey('OrderID').from('Order_Details'), function () {
                            return [10248];
                        }));
                        first = jasmine.Ajax.requests.at(1);
                        first.respondWith({
                            'status': 200,
                            'contentType': 'application/json',
                            'responseText': JSON.stringify([{ OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 },
                                { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61 },
                                { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83 }])
                        });
                        last = jasmine.Ajax.requests.at(2);
                        last.respondWith({
                            'status': 200,
                            'contentType': 'application/json',
                            'responseText': JSON.stringify([{ OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 }])
                        });
                        dataManager.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    it('To check the result length of data.', function () {
                        expect(result.length).toBe(3);
                        expect(result[0]['Order_Details'].length).toBe(1);
                    });
                    afterAll(function () {
                        jasmine.Ajax.uninstall();
                    });
                });
                describe('with hierarchy and requirecounts', function () {
                    var result;
                    var first;
                    var last;
                    beforeAll(function (done) {
                        jasmine.Ajax.install();
                        var dataManager = new manager_1.DataManager({
                            url: '/api/'
                        }).executeQuery(new query_1.Query().from('Orders').requiresCount().hierarchy(new query_1.Query().foreignKey('OrderID').from('Order_Details').requiresCount(), function () {
                            return [10248];
                        }));
                        first = jasmine.Ajax.requests.at(1);
                        first.respondWith({
                            'status': 200,
                            'contentType': 'application/json',
                            'responseText': JSON.stringify({
                                d: [{ OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 },
                                    { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61 },
                                    { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83 }], __count: 3
                            })
                        });
                        last = jasmine.Ajax.requests.at(2);
                        last.respondWith({
                            'status': 200,
                            'contentType': 'application/json',
                            'responseText': JSON.stringify({ d: [{ OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 }], __count: 1 })
                        });
                        dataManager.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    it('To check the result length of data.', function () {
                        expect(result.length).toBe(3);
                        expect(result[0]['Order_Details'].length).toBe(1);
                    });
                    afterAll(function () {
                        jasmine.Ajax.uninstall();
                    });
                });
                describe('without url in dataManager', function () {
                    var result;
                    beforeAll(function (done) {
                        var dataManager = new manager_1.DataManager()
                            .executeQuery(new query_1.Query().requiresCount());
                        dataManager.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    it('To check the result length of data.', function () {
                        expect(result.length).toBe(0);
                    });
                });
                describe('invalid url in dataManager', function () {
                    var result;
                    beforeAll(function (done) {
                        var mAjax = mockAjax({
                            d: []
                        }, new query_1.Query(), {
                            status: 500,
                            statusText: 'Bad Request'
                        });
                        mAjax.promise.then(function (e) {
                            result = e.result;
                            done();
                        });
                        mAjax.promise.then(function (e) {
                            result = e.result;
                            done();
                        }, function (e) {
                            result = e;
                            done();
                        });
                    });
                    it('To check the result length of data.', function () {
                        expect(result.error.statusText).toEqual('Bad Request');
                    });
                    afterAll(function () {
                        jasmine.Ajax.uninstall();
                    });
                });
                describe('with hierarchy and without child selector', function () {
                    var result;
                    var first;
                    var last;
                    beforeAll(function (done) {
                        jasmine.Ajax.install();
                        var dataManager = new manager_1.DataManager({
                            url: '/api/'
                        }).executeQuery(new query_1.Query().from('Orders').hierarchy(new query_1.Query().foreignKey('OrderID').from('Order_Details'), function () {
                            return '';
                        }));
                        first = jasmine.Ajax.requests.at(1);
                        first.respondWith({
                            'status': 200,
                            'contentType': 'application/json',
                            'responseText': JSON.stringify([{ OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 },
                                { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61 },
                                { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83 }])
                        });
                        last = jasmine.Ajax.requests.at(2);
                        last.respondWith({
                            'status': 200,
                            'contentType': 'application/json',
                            'responseText': JSON.stringify([{ OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 },
                                { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61 },
                                { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83 }])
                        });
                        dataManager.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    afterAll(function () {
                        jasmine.Ajax.uninstall();
                    });
                    it('url check', function () {
                        expect(first.url).toBe('/api/Orders');
                        expect(last.url).toBe('/api/Order_Details?$filter=(OrderID eq 10248) or (OrderID eq 10249) or (OrderID eq 10250)');
                    });
                    it('data check', function () {
                        var firstdetails = result[0]["Order_Details"];
                        expect(firstdetails.length).toBe(1);
                        expect(firstdetails[0]["OrderID"]).toBe(10248);
                    });
                });
                describe('with hierarchy and without date parse options', function () {
                    var result;
                    beforeAll(function (done) {
                        var dm = new manager_1.DataManager({
                            url: 'temp/url',
                            headers: [{ 'Content-Type': 'text/html' }]
                        });
                        dm.dateParse = false;
                        var data1 = new manager_1.DataManager(data).executeLocal(new query_1.Query().take(3).select(['OrderID', 'CustomerID', 'EmployeeID']));
                        var mAjax = mockAjax({
                            data: data1,
                            dm: dm
                        }, new query_1.Query().from('Orders').take(3));
                        mAjax.promise.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    it('To check the result length of data.', function () {
                        expect(result.length).toBe(3);
                    });
                    afterAll(function () {
                        jasmine.Ajax.uninstall();
                    });
                });
                describe('adding dynamic headers', function () {
                    var result;
                    beforeAll(function (done) {
                        var data1 = new manager_1.DataManager(data).executeLocal(new query_1.Query().take(5).select(['OrderID', 'CustomerID', 'EmployeeID']));
                        var mAjax = mockAjax({
                            data: data1,
                            dm: new manager_1.DataManager({
                                url: 'temp/url',
                                headers: [{ 'Content-Type': 'text/html' }]
                            })
                        }, new query_1.Query().select(['OrderID', 'CustomerID', 'EmployeeID']).take(5));
                        mAjax.promise.then(function (e) {
                            result = e.result;
                            done();
                        });
                    });
                    it('To check the result length of data.', function () {
                        expect(result.length).toBe(5);
                    });
                    afterAll(function () {
                        jasmine.Ajax.uninstall();
                    });
                });
            });
        });
        describe('Remote data', function () {
            var result;
            var dataManager;
            describe('Remote data is generated properly', function () {
                beforeAll(function (done) {
                    var data1 = new manager_1.DataManager(data).executeLocal(new query_1.Query().take(5).select(['OrderID', 'CustomerID', 'EmployeeID']));
                    dataManager = new manager_1.DataManager({
                        url: 'api/Orders'
                    });
                    var mAjax = mockAjax({
                        data: data1,
                        dm: dataManager
                    }, new query_1.Query().select(['OrderID', 'CustomerID', 'EmployeeID']).take(5));
                    mAjax.promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('To check length of generated data.', function () {
                    expect(result.length).toBe(5);
                });
                it('To check the dataType.', function () {
                    expect(dataManager.dataSource.dataType).toEqual('json');
                });
                it('To check offline mode.', function () {
                    expect(dataManager.dataSource.offline).toEqual(false);
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('Remote url in constructor', function () {
                it('To check error throws when invalid arguments.', function () {
                    expect(function () { new manager_1.DataManager('http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/'); }).toThrow();
                });
            });
            describe('RemoteSaveAdaptor with offline', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        json: [{ OrderID: 10248, CustomerID: 'VINET', ShipName: 'SURINDER' }],
                        adaptor: new adaptors_1.RemoteSaveAdaptor
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().select(['OrderID', 'CustomerID', 'ShipName']).take(5));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                describe('Remote data is generated properly', function () {
                    it('To check length of generated data.', function () {
                        expect(result.length).toBe(1);
                    });
                    it('To check the dataType.', function () {
                        expect(dataManager.dataSource.dataType).toEqual('json');
                    });
                    it('To check offline mode.', function () {
                        expect(dataManager.dataSource.offline).toEqual(false);
                    });
                });
            });
            describe('Remote data with offline', function () {
                var resquest;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: 'service/Employees/',
                        offline: true
                    });
                    _this.request = jasmine.Ajax.requests.mostRecent();
                    _this.request.respondWith({
                        status: 200,
                        responseText: JSON.stringify({ d: employeesData, __count: 9 })
                    });
                    dataManager.ready.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                describe('Remote data is generated properly', function () {
                    it('To check length of generated data.', function () {
                        expect(result.length).toEqual(9);
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('EnableCaching options', function () {
                var resquest;
                beforeAll(function (done) {
                    jasmine.Ajax.install();
                    dataManager = new manager_1.DataManager({
                        url: 'service/Employees/',
                        enableCaching: true,
                        cachingPageSize: 10,
                        timeTillExpiration: 120000
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().select(['EmployeeID', 'LastName', 'FirstName']));
                    _this.request = jasmine.Ajax.requests.mostRecent();
                    _this.request.respondWith({
                        status: 200,
                        responseText: JSON.stringify({ d: employeesData, __count: 9 })
                    });
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                describe('Remote data is generated properly', function () {
                    it('To check length of generated data.', function () {
                        expect(result.length).toEqual(9);
                    });
                });
                afterAll(function () {
                    jasmine.Ajax.uninstall();
                });
            });
            describe('RemoteSaveAdaptor with offline', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        json: [{ OrderID: 10248, CustomerID: 'VINET', ShipName: 'SURINDER' }],
                        adaptor: new adaptors_1.RemoteSaveAdaptor,
                        offline: true
                    });
                    var promise = dataManager.executeQuery(new query_1.Query().select(['OrderID', 'CustomerID', 'ShipName']));
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                describe('Remote data is generated properly', function () {
                    it('To check length of generated data.', function () {
                        expect(result.length).toBe(1);
                    });
                    it('To check offline mode.', function () {
                        expect(dataManager.dataSource.offline).toEqual(true);
                    });
                });
            });
        });
    });
});
