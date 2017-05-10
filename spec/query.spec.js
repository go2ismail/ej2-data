define(["require", "exports", "../src/manager", "../src/util", "../src/query"], function (require, exports, manager_1, util_1, query_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Query', function () {
        describe('Query generated properly without queries', function () {
            var query = new query_1.Query();
            it('To check length of generated data.', function () {
                expect(query.queries.length).toBe(0);
            });
        });
        describe('Query operation in JSON data', function () {
            var data = [
                { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 },
                { OrderID: 10249, CustomerID: 'AANAR', EmployeeID: 2, Freight: 11.61 },
                { OrderID: 10250, CustomerID: 'VICTE', EmployeeID: 7, Freight: 65.83 },
                { OrderID: 10251, CustomerID: 'VINET', EmployeeID: 7, Freight: 70.63 },
                { OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 6, Freight: 45.45 }
            ];
            var dataManager = new manager_1.DataManager(data);
            var query = new query_1.Query();
            describe('JSON data is generated properly', function () {
                var result = query.executeLocal(dataManager);
                it('To check length of generated data.', function () {
                    expect(result.length).toBe(data.length);
                });
            });
            describe('setKey method', function () {
                it('To check key in queries.', function () {
                    expect(query["key"]).toBe('');
                    query.setKey('OrderID');
                    expect(query["key"]).toBe('OrderID');
                });
            });
            describe('using method', function () {
                var dm;
                var result;
                it('To check datamanager is empty on initial.', function () {
                    expect(query.dataManager === undefined).toBe(true);
                });
                it('To check length of generated data.', function () {
                    result = query.executeLocal(dataManager);
                    expect(result.length).toBe(data.length);
                });
                it('To check datamanager is changed as new.', function () {
                    dm = new manager_1.DataManager([{ OrderID: 10251, CustomerID: 'TOMSP', EmployeeID: 7, Freight: 70.63 }]);
                    query.using(dm);
                    expect(query.dataManager).toEqual(dm);
                });
                it('To check length of data from new datamanager.', function () {
                    result = query.executeLocal();
                    expect(result.length).toEqual(1);
                });
            });
            describe('execute method', function () {
                var result;
                beforeAll(function (done) {
                    var dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/'
                    });
                    var query = new query_1.Query().select(['OrderID', 'CustomerID', 'ShipName']).take(3);
                    var promise = query.execute(dataManager, done);
                    promise.then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('To check length of the generated data.', function () {
                    expect(result.length).toBe(3);
                });
                it('To check the result key is equal to select query.', function () {
                    expect(Object.keys(result[0])).toEqual(['OrderID', 'CustomerID', 'ShipName']);
                });
                it('To check without dataManager.', function () {
                    expect(function () { new query_1.Query().execute(); }).toThrow();
                });
            });
            describe('executeLocal method', function () {
                it('To check the generated data.', function () {
                    var result = query.executeLocal(dataManager);
                    expect(result.length).toBe(data.length);
                });
                it('To check without dataManager.', function () {
                    expect(function () { new query_1.Query().executeLocal(); }).toThrow();
                });
            });
            describe('clone method', function () {
                query = new query_1.Query().select(['OrderID', 'CustomerID', 'Freight']);
                var result = query.executeLocal(dataManager);
                var clonedQuery = query.clone();
                var clonedResult = clonedQuery.executeLocal(dataManager);
                it('To check query cloned properly.', function () {
                    expect(clonedQuery instanceof query_1.Query).toBe(true);
                });
                it('To check data from cloned query.', function () {
                    expect(result).toEqual(clonedResult);
                });
            });
            describe('from method', function () {
                it('To check data in from query.', function () {
                    query = new query_1.Query().from('Orders');
                    var result = query.executeLocal(dataManager);
                    expect(result.length).toBe(data.length);
                });
            });
            describe('from in constructor', function () {
                it('To check data using string param.', function () {
                    query = new query_1.Query('Orders');
                    var result = query.executeLocal(dataManager);
                    expect(result.length).toBe(data.length);
                });
                it('To check data using array param.', function () {
                    query = new query_1.Query(['Orders']);
                    var result = query.executeLocal(dataManager);
                    expect(result.length).toBe(data.length);
                });
            });
            describe('addParams method', function () {
                it('To check string params.', function () {
                    query = new query_1.Query().addParams('key1', 'Success');
                    expect(query.params[0]["key"]).toEqual('key1');
                    expect(query.params[0].value).toEqual('Success');
                });
                it('To check function params.', function () {
                    query = query.addParams('key2', function () { });
                    expect(query.params[1]["key"]).toEqual('key2');
                    expect(typeof query.params[1].fn).toBe('function');
                });
            });
            describe('expand method', function () {
                it('To check string for expand.', function () {
                    query = new query_1.Query().expand('OrderDetails');
                    expect(query.expands[0]).toEqual('OrderDetails');
                });
                it('To check Object for expand.', function () {
                    var arrayData = [{
                            OrderDetails: [{ OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, Freight: 32.38 }]
                        }, {
                            EmployeeDetails: [{ EmployeeID: 10248, FirstName: 'Jhon', LastName: 'Joe' }]
                        }];
                    query = new query_1.Query().expand(arrayData);
                    expect(query.expands[0]).toEqual(arrayData[0]);
                });
            });
            describe('where method', function () {
                var result;
                it('To check queries added.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().where('CustomerID', 'equal', 'VINET');
                    expect(query.queries.length).toEqual(1);
                });
                it('To check added queries as "where".', function () {
                    expect(query.queries[0].fn).toEqual('onWhere');
                });
                it('To check filtered data length".', function () {
                    result = query.executeLocal(dataManager);
                    expect(result.length).toBe(2);
                });
                it('To check filtered properly".', function () {
                    result = query.executeLocal(dataManager);
                    expect(result[0]["CustomerID"]).toEqual('VINET');
                    expect(result[1]["CustomerID"]).toEqual('VINET');
                });
                it('To check null param".', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().where(null);
                    result = query.executeLocal(dataManager);
                    expect(result.length).toEqual(0);
                });
            });
            describe('search method', function () {
                var result;
                it('To check queries added.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().search(7, 'EmployeeID', 'equal');
                    expect(query.queries.length).toEqual(1);
                });
                it('To check added queries as "search".', function () {
                    expect(query.queries[0].fn).toEqual('onSearch');
                });
                it('To check filtered properly".', function () {
                    result = query.executeLocal(dataManager);
                    expect(result.length).toBe(2);
                });
                it('To check filtered properly".', function () {
                    result = query.executeLocal(dataManager);
                    expect(result[0]["EmployeeID"]).toEqual(7);
                    expect(result[1]["EmployeeID"]).toEqual(7);
                });
                it('To check field name as array type.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().search(7, ['EmployeeID'], 'equal');
                    expect(query.queries.length).toEqual(1);
                });
                it('To check without operators.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().search(7, 'EmployeeID');
                    expect(query.queries.length).toEqual(1);
                });
            });
            describe('sortBy method', function () {
                var result;
                describe('descending', function () {
                    it('To check queries added.', function () {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().sortBy('Freight', 'descending');
                        expect(query.queries.length).toEqual(1);
                    });
                    it('To check added queries as "sortBy".', function () {
                        expect(query.queries[0].fn).toEqual('onSortBy');
                    });
                    it('To check direction of "sortBy".', function () {
                        expect(query.queries[0].e.direction).toEqual('descending');
                    });
                    it('To check sorted data legnth.', function () {
                        result = query.executeLocal(dataManager);
                        expect(result.length).toBe(data.length);
                    });
                    it('To check sorted properly".', function () {
                        expect(result[0]["Freight"] > result[1]["Freight"]).toBe(true);
                        expect(result[1]["Freight"] > result[2]["Freight"]).toEqual(true);
                        expect(result[3]["Freight"] > result[4]["Freight"]).toEqual(true);
                    });
                    it('To check with group enabled.', function () {
                        query = new query_1.Query().sortBy('CustomerID', 'descending', true);
                        expect(query.queries.length).toEqual(1);
                    });
                });
                describe('sortBy method with desc keyword', function () {
                    var result;
                    describe('descending', function () {
                        it('To check queries added.', function () {
                            dataManager = new manager_1.DataManager(data);
                            query = new query_1.Query().sortBy('Freight desc');
                            expect(query.queries.length).toEqual(1);
                        });
                        it('To check added queries as "sortBy".', function () {
                            expect(query.queries[0].fn).toEqual('onSortBy');
                        });
                        it('To check direction of "sortBy".', function () {
                            expect(query.queries[0].e.direction).toEqual('descending');
                        });
                        it('To check sorted data legnth.', function () {
                            result = query.executeLocal(dataManager);
                            expect(result.length).toBe(data.length);
                        });
                        it('To check sorted properly".', function () {
                            expect(result[0]["Freight"] > result[1]["Freight"]).toBe(true);
                            expect(result[1]["Freight"] > result[2]["Freight"]).toEqual(true);
                            expect(result[3]["Freight"] > result[4]["Freight"]).toEqual(true);
                        });
                        it('To check with group enabled.', function () {
                            query = new query_1.Query().sortBy('Freight', 'descending', true);
                            expect(query.queries.length).toEqual(1);
                        });
                    });
                });
                describe('descending', function () {
                    it('To check queries added.', function () {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().sortBy('Freight', 'ascending');
                        expect(query.queries.length).toEqual(1);
                    });
                    it('To check added queries as "sortBy".', function () {
                        expect(query.queries[0].fn).toEqual('onSortBy');
                    });
                    it('To check direction of "sortBy".', function () {
                        expect(query.queries[0].e.direction).toEqual('ascending');
                    });
                    it('To check sorted data legnth.', function () {
                        result = query.executeLocal(dataManager);
                        expect(result.length).toBe(data.length);
                    });
                    it('To check sorted properly".', function () {
                        expect(result[0]["Freight"] < result[1]["Freight"]).toBe(true);
                        expect(result[1]["Freight"] < result[2]["Freight"]).toEqual(true);
                        expect(result[3]["Freight"] < result[4]["Freight"]).toEqual(true);
                    });
                    it('To check with group enabled.', function () {
                        query = new query_1.Query().sortBy('Freight', 'descending', true);
                        expect(query.queries.length).toEqual(1);
                    });
                });
                describe('multi sorting', function () {
                    it('To check queries added.', function () {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().sortBy('CustomerID', 'ascending', true).sortBy('EmployeeID', 'descending', true);
                        expect(query.queries.length).toEqual(2);
                    });
                    it('To check added queries as "sortBy".', function () {
                        expect(query.queries[0].fn).toEqual('onSortBy');
                        expect(query.queries[1].fn).toEqual('onSortBy');
                    });
                    it('To check direction of "sortBy".', function () {
                        expect(query.queries[0].e.direction).toEqual('ascending');
                        expect(query.queries[1].e.direction).toEqual('descending');
                    });
                    it('To check fieldNames of "sortBy".', function () {
                        expect(query.queries[0].e.fieldName).toEqual('CustomerID');
                        expect(query.queries[1].e.fieldName).toEqual('EmployeeID');
                    });
                    it('To check sorted data legnth.', function () {
                        result = query.executeLocal(dataManager);
                        expect(result.length).toBe(data.length);
                    });
                    it('To check sorted properly".', function () {
                        expect(result[0]["EmployeeID"] >= result[1]["EmployeeID"]).toBe(true);
                        expect(result[1]["EmployeeID"] >= result[2]["EmployeeID"]).toEqual(true);
                        expect(result[3]["EmployeeID"] >= result[4]["EmployeeID"]).toEqual(true);
                    });
                    it('multi sorting with same fieldName.', function () {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().sortBy('CustomerID', 'descending', true).sortBy('CustomerID', 'ascending', true);
                        expect(query.queries.length).toEqual(1);
                    });
                    it('multi sorting with null fieldName.', function () {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().sortBy(null, 'descending', true).sortBy('CustomerID', 'ascending', true);
                        expect(query.queries.length).toEqual(2);
                    });
                    it('multi sorting with array of fieldName.', function () {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().sortBy(['CustomerID'], 'descending', true).sortBy('EmployeeID', 'ascending', true);
                        expect(query.queries.length).toEqual(2);
                    });
                    it('multi sorting with array of fieldNames as same.', function () {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().sortBy(['CustomerID'], 'descending', true).sortBy('CustomerID', 'ascending', true);
                        expect(query.queries.length).toEqual(1);
                    });
                });
                describe('multi sorting with string field', function () {
                    it('To check queries added.', function () {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().sortBy('CustomerID', 'descending', true).sortBy('EmployeeID', 'ascending', true);
                        expect(query.queries.length).toEqual(2);
                    });
                    it('To check added queries as "sortBy".', function () {
                        expect(query.queries[0].fn).toEqual('onSortBy');
                        expect(query.queries[1].fn).toEqual('onSortBy');
                    });
                    it('To check direction of "sortBy".', function () {
                        expect(query.queries[1].e.direction).toEqual('ascending');
                        expect(query.queries[0].e.direction).toEqual('descending');
                    });
                    it('To check fieldNames of "sortBy".', function () {
                        expect(query.queries[0].e.fieldName).toEqual('CustomerID');
                        expect(query.queries[1].e.fieldName).toEqual('EmployeeID');
                    });
                    it('To check sorted data legnth.', function () {
                        result = query.executeLocal(dataManager);
                        expect(result.length).toBe(data.length);
                    });
                    it('To check sorted properly".', function () {
                        expect(result[0]["EmployeeID"] <= result[1]["EmployeeID"]).toBe(true);
                        expect(result[1]["EmployeeID"] <= result[2]["EmployeeID"]).toEqual(true);
                        expect(result[3]["EmployeeID"] <= result[4]["EmployeeID"]).toEqual(true);
                    });
                });
            });
            describe('sortByDesc method', function () {
                var result;
                it('To check queries added.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().sortByDesc('Freight');
                    expect(query.queries.length).toEqual(1);
                });
                it('To check added queries as "sortBy".', function () {
                    expect(query.queries[0].fn).toEqual('onSortBy');
                });
                it('To check direction of "sortBy".', function () {
                    expect(query.queries[0].e.direction).toEqual('descending');
                });
                it('To check sorted data legnth.', function () {
                    result = query.executeLocal(dataManager);
                    expect(result.length).toBe(data.length);
                });
                it('To check sorted properly".', function () {
                    expect(result[0]["Freight"] > result[1]["Freight"]).toBe(true);
                    expect(result[1]["Freight"] > result[2]["Freight"]).toEqual(true);
                    expect(result[3]["Freight"] > result[4]["Freight"]).toEqual(true);
                });
            });
            describe('group method', function () {
                var result;
                it('To check queries added.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().group('EmployeeID');
                    expect(query.queries.length).toEqual(2);
                });
                it('To check added queries as "sortBy" and "group".', function () {
                    expect(query.queries[0].fn).toEqual('onSortBy');
                    expect(query.queries[1].fn).toEqual('onGroup');
                });
                it('To check direction of "sortBy".', function () {
                    expect(query.queries[0].e.direction).toEqual('ascending');
                });
                it('To check grouped data.', function () {
                    result = query.executeLocal(dataManager);
                    expect(result[3]["items"].length).toBe(2);
                    expect(result[3]["key"] === 7).toBe(true);
                });
                it('To check grouped field.', function () {
                    expect(result[3]["field"] === 'EmployeeID').toBe(true);
                });
            });
            describe('page method', function () {
                var result;
                it('To check queries added.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().page(1, 3);
                    expect(query.queries.length).toEqual(1);
                });
                it('To check added queries as "page".', function () {
                    expect(query.queries[0].fn).toEqual('onPage');
                });
                it('To check size and index.', function () {
                    expect(query.queries[0].e.pageIndex).toEqual(1);
                    expect(query.queries[0].e.pageSize).toEqual(3);
                });
                it('To check paged data legnth.', function () {
                    result = query.executeLocal(dataManager);
                    expect(result.length).toBe(3);
                });
            });
            describe('range method', function () {
                var result;
                it('To check queries added.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().range(3, 4);
                    expect(query.queries.length).toEqual(1);
                });
                it('To check added queries as "range".', function () {
                    expect(query.queries[0].fn).toEqual('onRange');
                });
                it('To check index of range.', function () {
                    expect(query.queries[0].e.start).toEqual(3);
                    expect(query.queries[0].e.end).toEqual(4);
                });
                it('To check range data legnth.', function () {
                    result = query.executeLocal(dataManager);
                    expect(result.length).toBe(1);
                });
                it('To check range data.', function () {
                    expect(result[0]).toEqual(data[3]);
                });
            });
            describe('skip method', function () {
                var result;
                it('To check queries added.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().skip(2);
                    expect(query.queries.length).toEqual(1);
                });
                it('To check added queries as "skip".', function () {
                    expect(query.queries[0].fn).toEqual('onSkip');
                });
                it('To check skip data legnth.', function () {
                    result = query.executeLocal(dataManager);
                    expect(result.length).toBe(data.length - 2);
                });
                it('To check skip data.', function () {
                    expect(result[0]).toEqual(data[2]);
                });
            });
            describe('take method', function () {
                var result;
                it('To check queries added.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().take(3);
                    expect(query.queries.length).toEqual(1);
                });
                it('To check added queries as "take".', function () {
                    expect(query.queries[0].fn).toEqual('onTake');
                });
                it('To check take data legnth.', function () {
                    result = query.executeLocal(dataManager);
                    expect(result.length).toBe(3);
                });
                it('To check take data.', function () {
                    expect(result[0]).toEqual(data[0]);
                });
            });
            describe('aggregate method', function () {
                var result;
                it('To check queries added.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().aggregate('sum', 'Freight').requiresCount();
                    expect(query.queries.length).toEqual(1);
                });
                it('To check added queries as "aggregates".', function () {
                    expect(query.queries[0].fn).toEqual('onAggregates');
                });
                it('To check field and type.', function () {
                    expect(query.queries[0].e["field"]).toBe('Freight');
                    expect(query.queries[0].e.type).toBe('sum');
                });
                it('To check take data legnth.', function () {
                    result = query.executeLocal(dataManager);
                    expect(result.aggregates['Freight - sum']).toBe(225.89999999999998);
                });
            });
            describe('select method', function () {
                var result;
                describe('Array params', function () {
                    it('To check queries added.', function () {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().select(['OrderID', 'CustomerID', 'Freight']);
                        expect(query.queries.length).toEqual(1);
                    });
                    it('To check added queries as "select".', function () {
                        expect(query.queries[0].fn).toEqual('onSelect');
                    });
                    it('To check selected fieldNames legnth.', function () {
                        expect(query.queries[0].e.fieldNames.length).toBe(3);
                    });
                    it('To check selected fieldNames.', function () {
                        expect(query.queries[0].e.fieldNames[0]).toBe('OrderID');
                        expect(query.queries[0].e.fieldNames[1]).toBe('CustomerID');
                        expect(query.queries[0].e.fieldNames[2]).toBe('Freight');
                    });
                    it('To check selected data.', function () {
                        result = query.executeLocal(dataManager);
                        expect(result[0]).not.toBe(data[0]);
                    });
                    it('To check keys of selected data.', function () {
                        var keys = Object.keys(result[0]);
                        expect(keys[0]).toBe('OrderID');
                        expect(keys[1]).toBe('CustomerID');
                        expect(keys[2]).toBe('Freight');
                    });
                });
                describe('String Paramas', function () {
                    it('To check queries added.', function () {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().select('OrderID');
                        expect(query.queries.length).toEqual(1);
                    });
                    it('To check added queries as "select".', function () {
                        expect(query.queries[0].fn).toEqual('onSelect');
                    });
                    it('To check selected fieldNames legnth.', function () {
                        expect(query.queries[0].e.fieldNames.length).toBe(1);
                    });
                    it('To check selected fieldNames.', function () {
                        expect(query.queries[0].e.fieldNames[0]).toBe('OrderID');
                    });
                    it('To check selected data.', function () {
                        result = query.executeLocal(dataManager);
                        expect(result[0]).not.toBe(data[0]);
                    });
                    it('To check keys of selected data.', function () {
                        expect(result[0]).toBe(data[0]["OrderID"]);
                        expect(result[4]).toBe(data[4]["OrderID"]);
                    });
                });
            });
            describe('foreignKey method', function () {
                it('To check added queries.', function () {
                    dataManager = new manager_1.DataManager(data);
                    query = new query_1.Query().foreignKey('Orders');
                    expect(query.fKey).toEqual('Orders');
                });
            });
            describe('requiresCounts method', function () {
                it('To check added queries.', function () {
                    dataManager = new manager_1.DataManager(data);
                    expect(query.requiresCounts).toBeUndefined();
                    query = new query_1.Query().requiresCount();
                    expect(query.requiresCounts).toBe(true);
                });
            });
            describe('filtering operations', function () {
                describe('for lessThan', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('OrderID', 'lessThan', 10250, false);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(2);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0].OrderID < 10250).toBe(true);
                        expect(result[1].OrderID < 10250).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('lessthan');
                        expect(query.queries[0].e.value).toEqual(10250);
                        expect(query.queries[0].e["field"]).toEqual('OrderID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for greaterThan', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('OrderID', 'greaterThan', 10250, false);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(2);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0].OrderID > 10250).toBe(true);
                        expect(result[1].OrderID > 10250).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('greaterthan');
                        expect(query.queries[0].e.value).toEqual(10250);
                        expect(query.queries[0].e["field"]).toEqual('OrderID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for greaterThan with ignorecase', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('OrderID', 'greaterThan', 10250, true);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(2);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0].OrderID > 10250).toBe(true);
                        expect(result[1].OrderID > 10250).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('greaterthan');
                        expect(query.queries[0].e.value).toEqual(10250);
                        expect(query.queries[0].e["field"]).toEqual('OrderID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for greaterThan using symbols', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('OrderID', '>', 10250, false);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(2);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0].OrderID > 10250).toBe(true);
                        expect(result[1].OrderID > 10250).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('>');
                        expect(query.queries[0].e.value).toEqual(10250);
                        expect(query.queries[0].e["field"]).toEqual('OrderID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for lessThanOrEqual', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('OrderID', 'lessThanOrEqual', 10250, false);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0].OrderID < 10250).toBe(true);
                        expect(result[1].OrderID < 10250).toBe(true);
                        expect(result[2].OrderID === 10250).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('lessthanorequal');
                        expect(query.queries[0].e.value).toEqual(10250);
                        expect(query.queries[0].e["field"]).toEqual('OrderID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for invalid symbols in operator', function () {
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(function () { new query_1.Query().where('OrderID', '$', 10250, false); }).toThrow();
                    });
                });
                describe('for lessThanOrEqual with ignorecase', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('OrderID', 'lessThanOrEqual', 10250, true);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0].OrderID < 10250).toBe(true);
                        expect(result[1].OrderID < 10250).toBe(true);
                        expect(result[2].OrderID === 10250).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('lessthanorequal');
                        expect(query.queries[0].e.value).toEqual(10250);
                        expect(query.queries[0].e["field"]).toEqual('OrderID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for greaterThanOrEqual', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('OrderID', 'greaterThanOrEqual', 10250, false);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0].OrderID === 10250).toBe(true);
                        expect(result[1].OrderID > 10250).toBe(true);
                        expect(result[2].OrderID > 10250).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('greaterthanorequal');
                        expect(query.queries[0].e.value).toEqual(10250);
                        expect(query.queries[0].e["field"]).toEqual('OrderID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for greaterThanOrEqual with ignorecase', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('OrderID', 'greaterThanOrEqual', 10250, true);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0].OrderID === 10250).toBe(true);
                        expect(result[1].OrderID > 10250).toBe(true);
                        expect(result[2].OrderID > 10250).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('greaterthanorequal');
                        expect(query.queries[0].e.value).toEqual(10250);
                        expect(query.queries[0].e["field"]).toEqual('OrderID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for equal', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('CustomerID', 'equal', 'VINET', false);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(2);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0]["CustomerID"] === 'VINET').toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('equal');
                        expect(query.queries[0].e.value).toEqual('VINET');
                        expect(query.queries[0].e["field"]).toEqual('CustomerID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for notEqual', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('CustomerID', 'notEqual', 'VINET', false);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0]["CustomerID"] !== 'VINET').toBe(true);
                        expect(result[1]["CustomerID"] !== 'VINET').toBe(true);
                        expect(result[2]["CustomerID"] !== 'VINET').toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('notequal');
                        expect(query.queries[0].e.value).toEqual('VINET');
                        expect(query.queries[0].e["field"]).toEqual('CustomerID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for contains', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('CustomerID', 'contains', 'VI', false);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check data filtered properly.', function () {
                        expect(util_1.DataUtil.startsWith(result[0]["CustomerID"], 'VI')).toBe(true);
                        expect(util_1.DataUtil.startsWith(result[1]["CustomerID"], 'VI')).toBe(true);
                        expect(util_1.DataUtil.startsWith(result[2]["CustomerID"], 'VI')).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('contains');
                        expect(query.queries[0].e.value).toEqual('VI');
                        expect(query.queries[0].e["field"]).toEqual('CustomerID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for contains with ignorecase', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('CustomerID', 'contains', 'VI', true);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check data filtered properly.', function () {
                        expect(util_1.DataUtil.startsWith(result[0]["CustomerID"], 'VI')).toBe(true);
                        expect(util_1.DataUtil.startsWith(result[1]["CustomerID"], 'VI')).toBe(true);
                        expect(util_1.DataUtil.startsWith(result[2]["CustomerID"], 'VI')).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('contains');
                        expect(query.queries[0].e.value).toEqual('VI');
                        expect(query.queries[0].e["field"]).toEqual('CustomerID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for startsWith with ignorecase', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('CustomerID', 'startsWith', 'VI', false);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check data filtered properly.', function () {
                        expect(util_1.DataUtil.startsWith(result[0]["CustomerID"], 'VI')).toBe(true);
                        expect(util_1.DataUtil.startsWith(result[1]["CustomerID"], 'VI')).toBe(true);
                        expect(util_1.DataUtil.startsWith(result[2]["CustomerID"], 'VI')).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('startswith');
                        expect(query.queries[0].e.value).toEqual('VI');
                        expect(query.queries[0].e["field"]).toEqual('CustomerID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for startsWith with ignorecase', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('CustomerID', 'startsWith', 'VI', true);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check data filtered properly.', function () {
                        expect(util_1.DataUtil.startsWith(result[0]["CustomerID"], 'VI')).toBe(true);
                        expect(util_1.DataUtil.startsWith(result[1]["CustomerID"], 'VI')).toBe(true);
                        expect(util_1.DataUtil.startsWith(result[2]["CustomerID"], 'VI')).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('startswith');
                        expect(query.queries[0].e.value).toEqual('VI');
                        expect(query.queries[0].e["field"]).toEqual('CustomerID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for endsWith', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('CustomerID', 'endsWith', 'ET', false);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(2);
                    });
                    it('To check data filtered properly.', function () {
                        expect(util_1.DataUtil.endsWith(result[0]["CustomerID"], 'ET')).toBe(true);
                        expect(util_1.DataUtil.endsWith(result[1]["CustomerID"], 'ET')).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('endswith');
                        expect(query.queries[0].e.value).toEqual('ET');
                        expect(query.queries[0].e["field"]).toEqual('CustomerID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for endsWith with ignorecase', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        query = new query_1.Query().where('CustomerID', 'endsWith', 'ET', true);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(2);
                    });
                    it('To check data filtered properly.', function () {
                        expect(util_1.DataUtil.endsWith(result[0]["CustomerID"], 'ET')).toBe(true);
                        expect(util_1.DataUtil.endsWith(result[1]["CustomerID"], 'ET')).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.operator).toEqual('endswith');
                        expect(query.queries[0].e.value).toEqual('ET');
                        expect(query.queries[0].e["field"]).toEqual('CustomerID');
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('for and predicate', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        var predicate = new query_1.Predicate('OrderID', 'lessThan', 10251, true).
                            and('CustomerID', 'startsWith', 'VI', true);
                        query = new query_1.Query().where(predicate);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data length.', function () {
                        expect(result.length).toBe(2);
                    });
                    it('To check data filtered properly.', function () {
                        expect(util_1.DataUtil.startsWith(result[0]["CustomerID"], 'VI')).toBe(true);
                        expect(result[0].OrderID < 10251).toBe(true);
                        expect(result[1].OrderID < 10251).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.condition).toEqual('and');
                        expect(query.queries[0].e.predicates.length).toEqual(2);
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                    it('To check field name as predicate.', function () {
                        var pred = new query_1.Predicate('CustomerID', 'startsWith', 'VI', true);
                        var predicate = new query_1.Predicate('OrderID', 'lessThan', 10251, true).and(pred);
                        query = new query_1.Query().where(predicate);
                        result = query.executeLocal(dataManager);
                        expect(result.length).toBe(2);
                    });
                });
                describe('for or predicate', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        var predicate = new query_1.Predicate('OrderID', 'lessThan', 10251, true).
                            or('CustomerID', 'startsWith', 'VI', true);
                        query = new query_1.Query().where(predicate);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data length.', function () {
                        expect(result.length).toBe(4);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0].OrderID < 10251 || util_1.DataUtil.startsWith(result[0]["CustomerID"], 'VI')).toBe(true);
                        expect(result[1].OrderID < 10251 || util_1.DataUtil.startsWith(result[1]["CustomerID"], 'VI')).toBe(true);
                        expect(result[2].OrderID < 10251 || util_1.DataUtil.startsWith(result[2]["CustomerID"], 'VI')).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.condition).toEqual('or');
                        expect(query.queries[0].e.predicates.length).toEqual(2);
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                    it('To check null field name.', function () {
                        expect(function () { new query_1.Predicate('OrderID', 'lessThan', 10251, true).or(null, 'startsWith', 'VI', true); }).toThrow();
                    });
                    it('To check field name as predicate.', function () {
                        var pred = new query_1.Predicate('CustomerID', 'startsWith', 'VI', true);
                        var predicate = new query_1.Predicate('OrderID', 'lessThan', 10251, true).or(pred);
                        query = new query_1.Query().where(predicate);
                        result = query.executeLocal(dataManager);
                        expect(result.length).toBe(4);
                    });
                });
                describe('for array of predicate', function () {
                    var result;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        var pred = new query_1.Predicate('CustomerID', 'startsWith', 'VI', false);
                        var predicate = new query_1.Predicate(pred, 'lessThan', [new query_1.Predicate('CustomerID', 'startsWith', 'VI', false)]).
                            or('CustomerID', 'startsWith', 'VI', true);
                        query = new query_1.Query().where(predicate);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(3);
                    });
                    it('To check data filtered properly.', function () {
                        expect(result[0].OrderID < 10251 || util_1.DataUtil.startsWith(result[0]["CustomerID"], 'VI')).toBe(true);
                        expect(result[1].OrderID < 10251 || util_1.DataUtil.startsWith(result[1]["CustomerID"], 'VI')).toBe(true);
                        expect(result[2].OrderID < 10251 || util_1.DataUtil.startsWith(result[2]["CustomerID"], 'VI')).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.condition).toEqual('or');
                        expect(query.queries[0].e.predicates.length).toEqual(2);
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                    it('To check predicate field as null.', function () {
                        dataManager = new manager_1.DataManager(data);
                        var predicate = new query_1.Predicate(null, 'equal', 10248);
                        query = new query_1.Query().where(predicate);
                        result = query.executeLocal(dataManager);
                        expect(result.length).toBe(0);
                    });
                });
                describe('for json to predicate conversion', function () {
                    var result;
                    var parsedPred;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        var predicate = new query_1.Predicate('OrderID', 'lessThan', 10251, true).
                            and('CustomerID', 'startsWith', 'VI', true);
                        var strPred = JSON.stringify(predicate);
                        parsedPred = JSON.parse(strPred);
                        query = new query_1.Query().where(parsedPred);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(0);
                    });
                    it('To check filtered data after parsed from json.', function () {
                        var formJson = query_1.Predicate.fromJson(parsedPred);
                        query = new query_1.Query().where(formJson);
                        result = query.executeLocal(dataManager);
                        expect(result.length).toBe(2);
                    });
                    it('To check data filtered properly.', function () {
                        expect(util_1.DataUtil.startsWith(result[0]["CustomerID"], 'VI')).toBe(true);
                        expect(result[0].OrderID < 10251).toBe(true);
                        expect(result[1].OrderID < 10251).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.condition).toEqual('and');
                        expect(query.queries[0].e.predicates.length).toEqual(2);
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                    it('To check filtered data after parsed from json.', function () {
                        var formJson = query_1.Predicate.fromJson([parsedPred]);
                        query = new query_1.Query().where(formJson[0]);
                        result = query.executeLocal(dataManager);
                        expect(result.length).toBe(2);
                    });
                });
                describe('for array of json to predicate conversion', function () {
                    var result;
                    var parsedPred;
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        var predicate = new query_1.Predicate('OrderID', 'lessThan', 10251, true).
                            and('CustomerID', 'startsWith', 'VI', true);
                        var strPred = JSON.stringify(predicate);
                        parsedPred = JSON.parse(strPred);
                        query = new query_1.Query().where(parsedPred);
                        result = query.executeLocal(dataManager);
                        done();
                    });
                    it('To check filtered data legnth.', function () {
                        expect(result.length).toBe(0);
                    });
                    it('To check filtered data after parsed from json.', function () {
                        var formJson = query_1.Predicate.fromJson([parsedPred]);
                        query = new query_1.Query().where(formJson[0]);
                        result = query.executeLocal(dataManager);
                        expect(result.length).toBe(2);
                    });
                    it('To check data filtered properly.', function () {
                        expect(util_1.DataUtil.startsWith(result[0]["CustomerID"], 'VI')).toBe(true);
                        expect(result[0].OrderID < 10251).toBe(true);
                        expect(result[1].OrderID < 10251).toBe(true);
                    });
                    it('To check the query added properly.', function () {
                        expect(query.queries[0].e.condition).toEqual('and');
                        expect(query.queries[0].e.predicates.length).toEqual(2);
                        expect(query.queries[0].fn).toEqual('onWhere');
                    });
                });
                describe('Predicate check', function () {
                    beforeAll(function (done) {
                        dataManager = new manager_1.DataManager(data);
                        done();
                    });
                    it('To check the static and function.', function () {
                        var pred = query_1.Predicate.and(new query_1.Predicate('OrderID', 'equal', 10248));
                        query = new query_1.Query().where(pred);
                        var result = query.executeLocal(dataManager);
                        expect(result.length).toBe(1);
                    });
                    it('To check the static or function.', function () {
                        var pred = query_1.Predicate.or(new query_1.Predicate('OrderID', 'equal', 10248));
                        query = new query_1.Query().where(pred);
                        var result = query.executeLocal(dataManager);
                        expect(result.length).toBe(1);
                    });
                });
            });
        });
        describe('Query operation in remote data', function () {
            var dataManager;
            var query;
            var result;
            describe('Remote data is generated properly', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/'
                    });
                    query = new query_1.Query().take(10);
                    query.execute(dataManager).then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('To check length of generated data.', function () {
                    expect(result.length).toBe(10);
                });
            });
            describe('from method', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/'
                    });
                    query = new query_1.Query().from('Orders').take(10);
                    query.execute(dataManager).then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('To check data in from query.', function () {
                    expect(result.length).toBe(10);
                });
            });
            describe('multiple select method', function () {
                beforeAll(function (done) {
                    dataManager = new manager_1.DataManager({
                        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Orders/'
                    });
                    query = new query_1.Query().select(['OrderID', 'CustomerID', 'Freight']).select(['CustomerID', 'Freight']).take(10);
                    query.execute(dataManager).then(function (e) {
                        result = e.result;
                        done();
                    });
                });
                it('To check multiple selected method.', function () {
                    expect(Object.keys(result[0])).toEqual(['OrderID', 'CustomerID', 'Freight']);
                });
                it('To check data in from query.', function () {
                    expect(result.length).toBe(10);
                });
            });
        });
    });
});
