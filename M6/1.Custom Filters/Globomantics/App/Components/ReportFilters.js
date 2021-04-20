"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Modal_1 = __importDefault(require("@material-ui/core/Modal"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var FilterList_1 = __importDefault(require("@material-ui/icons/FilterList"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var Input_1 = __importDefault(require("@material-ui/core/Input"));
var InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
var Select_1 = __importDefault(require("@material-ui/core/Select"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var pickers_1 = require("@material-ui/pickers");
var FilterBuilder_1 = require("../PowerBI/FilterBuilder");
function ReportFilters(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        reportFilters: {
            float: "right",
            margin: "10px"
        },
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        modalContent: {
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #f7f7f7",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(1, 2),
            maxWidth: 450
        },
        header: {
            margin: "5, 0"
        },
        actions: {
            float: "right"
        },
        textField: {
            minWidth: 200,
            width: "50%"
        },
        formControl: {
            minWidth: 200,
            width: "100%"
        }
    }); });
    var classes = useStyles(props.theme);
    var filterBuilder = new FilterBuilder_1.FilterBuilder();
    var _a = react_1.useState(false), filterOpen = _a[0], setFilterOpen = _a[1];
    var defaultFilterValues = {
        orderId: "",
        locations: [],
        dateFrom: null,
        dateTo: null,
        totalSalesSelection: "",
        productCode: ""
    };
    var handleOpenFilter = function () {
        setFilterOpen(true);
    };
    var handleCancelFilter = function () {
        setFilterValues(appliedFilters);
        setFilterOpen(false);
    };
    var handleApplyFilter = function () {
        var powerBiFilterArray = filterBuilder.buildReportFilters(filterValues, props.filterConfiguration);
        props.applyFilterCallback(powerBiFilterArray);
        setAppliedFilters(filterValues);
        setFilterOpen(false);
    };
    var _b = react_1.useState(defaultFilterValues), appliedFilters = _b[0], setAppliedFilters = _b[1];
    var _c = react_1.useState(defaultFilterValues), filterValues = _c[0], setFilterValues = _c[1];
    var handleFilterValueChange = function (name) { return function (event) {
        var _a;
        setFilterValues(__assign(__assign({}, filterValues), (_a = {}, _a[name] = event.target.value, _a)));
    }; };
    var handleFilterDateValueChange = function (name) { return function (value) {
        var _a, _b;
        if (value != null) {
            var date = value.$d;
            date.setHours(0, 0, 0, 0);
            if (name === "dateTo") {
                date.setHours(23, 59, 59, 0);
            }
            setFilterValues(__assign(__assign({}, filterValues), (_a = {}, _a[name] = value.$d, _a)));
        }
        else {
            setFilterValues(__assign(__assign({}, filterValues), (_b = {}, _b[name] = null, _b)));
        }
    }; };
    // Order Id Filter
    var orderFilter;
    if (props.filterConfiguration.filterOrderId) {
        orderFilter = (react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
            react_1.default.createElement(TextField_1.default, { id: "orderId", label: "Order Id", className: classes.textField, value: filterValues.orderId, onChange: handleFilterValueChange("orderId"), margin: "dense" })));
    }
    var locationOptions = [
        "Atlanta",
        "Baltimore",
        "Cincinnati",
        "Denver",
        "Houston",
        "Memphis",
        "Miami",
        "Portland",
        "Salt Lake City",
        "Seattle"
    ];
    var locationStyle = {
        PaperProps: {
            style: {
                maxHeight: 300,
                width: 250
            }
        }
    };
    // Location Filter
    var locationFilter;
    if (props.filterConfiguration.filterLocations) {
        locationFilter = (react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
            react_1.default.createElement(FormControl_1.default, { className: classes.formControl },
                react_1.default.createElement(InputLabel_1.default, { htmlFor: "select-multiple-checkbox" }, "Locations"),
                react_1.default.createElement(Select_1.default, { multiple: true, value: filterValues.locations, onChange: handleFilterValueChange("locations"), input: react_1.default.createElement(Input_1.default, { id: "select-multiple-checkbox" }), renderValue: function (selected) { return selected.join(", "); }, MenuProps: locationStyle }, locationOptions.map(function (loc) { return (react_1.default.createElement(MenuItem_1.default, { key: loc, value: loc },
                    react_1.default.createElement(Checkbox_1.default, { color: "primary", checked: filterValues.locations.indexOf(loc) > -1 }),
                    react_1.default.createElement(ListItemText_1.default, { primary: loc }))); })))));
    }
    // Dates (from and to)
    var dateFilters;
    if (props.filterConfiguration.filterOrderDates) {
        dateFilters = (react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
            react_1.default.createElement(pickers_1.KeyboardDatePicker, { margin: "normal", id: "date-from", label: "Order Date From", format: "DD/MMM/YY", disableFuture: true, value: filterValues.dateFrom, onChange: handleFilterDateValueChange("dateFrom"), KeyboardButtonProps: {
                    "aria-label": "change order from date"
                } }),
            react_1.default.createElement(pickers_1.KeyboardDatePicker, { margin: "normal", id: "date-to", label: "Order Date To", format: "DD/MMM/YY", disableFuture: true, value: filterValues.dateTo, onChange: handleFilterDateValueChange("dateTo"), KeyboardButtonProps: {
                    "aria-label": "change order to date"
                } })));
    }
    // Total Sales Range
    var salesFilter;
    if (props.filterConfiguration.filterTotalSales) {
        salesFilter = (react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
            react_1.default.createElement(FormControl_1.default, { className: classes.formControl },
                react_1.default.createElement(InputLabel_1.default, { htmlFor: "total-sales" }, "Sale Value"),
                react_1.default.createElement(Select_1.default, { value: filterValues.totalSalesSelection, onChange: handleFilterValueChange("totalSalesSelection"), inputProps: {
                        name: "Sale Value",
                        id: "total-sales"
                    } },
                    react_1.default.createElement(MenuItem_1.default, { value: "all" }, "Show All"),
                    react_1.default.createElement(MenuItem_1.default, { value: "small" }, "Small - Under $250"),
                    react_1.default.createElement(MenuItem_1.default, { value: "large" }, "Large - Over $250")))));
    }
    // Product Code
    var productCodeFilter;
    if (props.filterConfiguration.filterProductCode) {
        productCodeFilter = (react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
            react_1.default.createElement(TextField_1.default, { id: "product-code", label: "Product Code", className: classes.textField, value: filterValues.productCode, onChange: handleFilterValueChange("productCode"), margin: "dense" })));
    }
    return (react_1.default.createElement("div", { className: classes.reportFilters },
        react_1.default.createElement(IconButton_1.default, { "aria-haspopup": "true", title: props.filterConfiguration.title, size: "small", onClick: handleOpenFilter },
            react_1.default.createElement(FilterList_1.default, null)),
        react_1.default.createElement(Modal_1.default, { open: filterOpen, className: classes.modal },
            react_1.default.createElement("div", { className: classes.modalContent },
                react_1.default.createElement("h2", { className: classes.header }, props.filterConfiguration.title),
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, direction: "row", justify: "flex-start" },
                    orderFilter,
                    locationFilter,
                    dateFilters,
                    salesFilter,
                    productCodeFilter,
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                        react_1.default.createElement("div", { className: classes.actions },
                            react_1.default.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: handleApplyFilter }, "Apply"),
                            react_1.default.createElement(Button_1.default, { onClick: handleCancelFilter }, "Cancel"))))))));
}
exports.default = ReportFilters;
