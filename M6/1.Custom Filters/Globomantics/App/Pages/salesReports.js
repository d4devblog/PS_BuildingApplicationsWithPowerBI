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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesReports = void 0;
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var PowerBIReport_1 = __importDefault(require("../Components/PowerBIReport"));
function SalesReports(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        paper: {
            background: theme.palette.type == "light" ? "#fff" : "#474747"
        },
        reportContainer: {
            minHeight: "calc(100vw * 0.50)"
        }
    }); });
    var classes = useStyles(props.theme);
    var buttonFunctions = new Array();
    buttonFunctions.push({
        buttonTitle: "NavigateToOrders",
        buttonFunction: function () {
            props.history.push("/orders");
        }
    });
    var filterConfig = {
        title: "Filter Sales:",
        filterOrderId: false,
        filterLocations: true,
        filterOrderDates: false,
        filterTotalSales: false,
        filterProductCode: true
    };
    return (react_1.default.createElement(Paper_1.default, { className: classes.paper },
        react_1.default.createElement(Box_1.default, { p: 3, className: classes.reportContainer },
            react_1.default.createElement(PowerBIReport_1.default, __assign({ reportName: "sales_v5", buttonFunctions: buttonFunctions, filterConfiguration: filterConfig }, props)))));
}
exports.SalesReports = SalesReports;
