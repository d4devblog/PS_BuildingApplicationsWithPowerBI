"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterBuilder = void 0;
var models = __importStar(require("powerbi-models"));
var FilterBuilder = /** @class */ (function () {
    function FilterBuilder() {
    }
    FilterBuilder.prototype.buildReportFilters = function (values, configuration) {
        var filters = new Array();
        if (configuration.filterOrderId) {
            filters.push(this.buildOrderIdFilter(values.orderId));
        }
        if (configuration.filterLocations) {
            filters.push(this.buildLocationFilter(values.locations));
        }
        if (configuration.filterOrderDates) {
            var dateFilter = this.buildDateFilter(values.dateFrom, values.dateTo);
            if (dateFilter) {
                filters.push(dateFilter);
            }
        }
        if (configuration.filterTotalSales) {
            filters.push(this.buildSalesValueFilter(values.totalSalesSelection));
        }
        if (configuration.filterProductCode) {
            var productFilter = this.buildProductCodeFilter(values.productCode);
            if (productFilter) {
                filters.push(productFilter);
            }
        }
        return filters;
    };
    FilterBuilder.prototype.buildOrderIdFilter = function (orderId) {
        var condition;
        if (orderId !== "") {
            condition = {
                operator: "Is",
                value: orderId
            };
        }
        else {
            condition = {
                operator: "IsNotBlank"
            };
        }
        return {
            $schema: "http://powerbi.com/product/schema#advanced",
            target: {
                table: "Orders",
                column: "OrderId"
            },
            logicalOperator: "And",
            conditions: [condition],
            filterType: models.FilterType.Advanced
        };
    };
    FilterBuilder.prototype.buildLocationFilter = function (locations) {
        var operator = "All";
        if (locations && locations.length > 0) {
            operator = "In";
        }
        return {
            $schema: "http://powerbi.com/product/schema#basic",
            target: {
                table: "StoreLocations",
                column: "City"
            },
            operator: operator,
            values: locations,
            filterType: models.FilterType.Basic
        };
    };
    FilterBuilder.prototype.buildDateFilter = function (dateFrom, dateTo) {
        var conditions = new Array();
        if (dateFrom !== null) {
            conditions.push({
                operator: "GreaterThanOrEqual",
                value: dateFrom.toISOString()
            });
        }
        if (dateTo !== null) {
            conditions.push({
                operator: "LessThanOrEqual",
                value: dateTo.toISOString()
            });
        }
        if (conditions.length > 0) {
            return {
                $schema: "http://powerbi.com/product/schema#advanced",
                target: {
                    table: "Orders",
                    column: "OrderDate"
                },
                logicalOperator: "And",
                conditions: conditions,
                filterType: models.FilterType.Advanced
            };
        }
        return null;
    };
    FilterBuilder.prototype.buildSalesValueFilter = function (selection) {
        var condition;
        switch (selection) {
            default:
            case "all":
                condition = {
                    operator: "GreaterThanOrEqual",
                    value: 0
                };
                break;
            case "small":
                condition = {
                    operator: "LessThan",
                    value: 250
                };
                break;
            case "large":
                condition = {
                    operator: "GreaterThanOrEqual",
                    value: 250
                };
                break;
        }
        return {
            $schema: "http://powerbi.com/product/schema#advanced",
            target: {
                table: "Orders",
                column: "SaleValue"
            },
            logicalOperator: "And",
            conditions: [condition],
            filterType: models.FilterType.Advanced
        };
    };
    FilterBuilder.prototype.buildProductCodeFilter = function (product) {
        if (product !== null && product.length > 0) {
            return {
                $schema: "http://powerbi.com/product/schema#advanced",
                target: {
                    table: "Products",
                    column: "ProductCode"
                },
                logicalOperator: "And",
                conditions: [
                    {
                        operator: "Contains",
                        value: product
                    }
                ],
                filterType: models.FilterType.Advanced
            };
        }
        return null;
    };
    return FilterBuilder;
}());
exports.FilterBuilder = FilterBuilder;
