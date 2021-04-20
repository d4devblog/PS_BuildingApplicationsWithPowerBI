import * as pbi from "powerbi-client";
import * as models from "powerbi-models";

export interface IFilterConfiguration {
  title: string;
  filterOrderId: boolean;
  filterLocations: boolean;
  filterOrderDates: boolean;
  filterTotalSales: boolean;
  filterProductCode: boolean;
}

export interface IFilterValues {
  orderId: string;
  locations: Array<string>;
  dateFrom: Date;
  dateTo: Date;
  totalSalesSelection: string;
  productCode: string;
}

export class FilterBuilder {
  public buildReportFilters(
    values: IFilterValues,
    configuration: IFilterConfiguration
  ): Array<models.IFilter> {
    const filters = new Array<models.IFilter>();

    if (configuration.filterOrderId) {
      filters.push(this.buildOrderIdFilter(values.orderId));
    }

    if (configuration.filterLocations) {
      filters.push(this.buildLocationFilter(values.locations));
    }

    if (configuration.filterOrderDates) {
      const dateFilter = this.buildDateFilter(values.dateFrom, values.dateTo);
      if (dateFilter) {
        filters.push(dateFilter);
      }
    }

    if (configuration.filterTotalSales) {
      filters.push(this.buildSalesValueFilter(values.totalSalesSelection));
    }

    if (configuration.filterProductCode) {
      const productFilter = this.buildProductCodeFilter(values.productCode);
      if (productFilter) {
        filters.push(productFilter);
      }
    }

    return filters;
  }

  private buildOrderIdFilter(orderId: string): pbi.models.IFilter {
    let condition: models.IAdvancedFilterCondition;

    if (orderId !== "") {
      condition = {
        operator: "Is",
        value: orderId
      } as models.IAdvancedFilterCondition;
    } else {
      condition = {
        operator: "IsNotBlank"
      } as models.IAdvancedFilterCondition;
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
    } as pbi.models.IAdvancedFilter;
  }

  private buildLocationFilter(locations: Array<string>): pbi.models.IFilter {
    let operator: models.BasicFilterOperators = "All";
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
    } as pbi.models.IBasicFilter;
  }

  private buildDateFilter(dateFrom: Date, dateTo: Date): pbi.models.IFilter {
    const conditions = new Array<models.IAdvancedFilterCondition>();

    if (dateFrom !== null) {
      conditions.push({
        operator: "GreaterThanOrEqual",
        value: dateFrom.toISOString()
      } as models.IAdvancedFilterCondition);
    }

    if (dateTo !== null) {
      conditions.push({
        operator: "LessThanOrEqual",
        value: dateTo.toISOString()
      } as models.IAdvancedFilterCondition);
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
      } as pbi.models.IAdvancedFilter;
    }

    return null;
  }

  private buildSalesValueFilter(selection: string): pbi.models.IFilter {
    let condition: models.IAdvancedFilterCondition;

    switch (selection) {
      default:
      case "all":
        condition = {
          operator: "GreaterThanOrEqual",
          value: 0
        } as models.IAdvancedFilterCondition;
        break;
      case "small":
        condition = {
          operator: "LessThan",
          value: 250
        } as models.IAdvancedFilterCondition;
        break;
      case "large":
        condition = {
          operator: "GreaterThanOrEqual",
          value: 250
        } as models.IAdvancedFilterCondition;
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
    } as pbi.models.IAdvancedFilter;
  }

  private buildProductCodeFilter(product: string): pbi.models.IFilter {
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
      } as pbi.models.IAdvancedFilter;
    }

    return null;
  }
}
