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
exports.Orders = void 0;
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var Snackbar_1 = __importDefault(require("@material-ui/core/Snackbar"));
var PowerBIReport_1 = __importDefault(require("../Components/PowerBIReport"));
var DataPointReader = __importStar(require("../Utils/DataPointReader"));
var ReportDataExport = __importStar(require("../Utils/ReportDataExport"));
var OrderDetailsDialog_1 = __importDefault(require("../Components/OrderDetailsDialog"));
function Orders(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        paper: {
            background: theme.palette.type == "light" ? "#fff" : "#474747"
        },
        reportContainer: {
            minHeight: "calc(100vw * 0.50)"
        }
    }); });
    var classes = useStyles(props.theme);
    var _a = react_1.default.useState(false), downloadTriggered = _a[0], setdownloadTriggered = _a[1];
    var handleDownloadNotification = function () {
        setdownloadTriggered(false);
    };
    var _b = react_1.default.useState(false), orderDialogOpen = _b[0], setOrderDialogOpen = _b[1];
    var _c = react_1.default.useState({}), orderDialogValues = _c[0], setOrderDialogValues = _c[1];
    var filterConfig = {
        title: "Filter Orders:",
        filterOrderId: true,
        filterLocations: true,
        filterOrderDates: true,
        filterTotalSales: true,
        filterProductCode: true
    };
    var commands = new Array();
    commands.push({
        commandName: "ViewDetails",
        commandTitle: "Show Order Details",
        commandFunction: function (selection) {
            var orderId = DataPointReader.readDataPoint(selection, "Orders", "OrderId");
            var customerId = DataPointReader.readDataPoint(selection, "Orders", "CustomerId");
            var orderDate = DataPointReader.readDataPoint(selection, "Orders", "OrderDate");
            setOrderDialogValues({
                orderId: orderId,
                customerId: customerId,
                orderDate: orderDate
            });
            setOrderDialogOpen(true);
        }
    });
    var externalActions = new Array();
    externalActions.push({
        actionTitle: "Export Recent Orders",
        actionFunction: function (report) {
            ReportDataExport.exportReportData(report, 0, "RecentOrders", "RecentOrders.csv");
            setdownloadTriggered(true);
        }
    });
    var downloadNotification = (react_1.default.createElement(Snackbar_1.default, { anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
        }, open: downloadTriggered, autoHideDuration: 6000, onClose: handleDownloadNotification, color: "primary", ContentProps: {
            "aria-describedby": "message-id"
        }, message: react_1.default.createElement("span", { id: "message-id" }, "Downloading Recent Orders...") }));
    var orderDetailDialog = (react_1.default.createElement(OrderDetailsDialog_1.default, __assign({ dialogOpen: orderDialogOpen, dialogValues: orderDialogValues, closeDialogFunction: function () { return setOrderDialogOpen(false); } }, props)));
    return (react_1.default.createElement(Paper_1.default, { className: classes.paper },
        react_1.default.createElement(Box_1.default, { p: 3, className: classes.reportContainer },
            react_1.default.createElement(PowerBIReport_1.default, __assign({ reportName: "Orders", filterConfiguration: filterConfig, reportCommands: commands, externalActions: externalActions }, props))),
        downloadNotification,
        orderDetailDialog));
}
exports.Orders = Orders;
