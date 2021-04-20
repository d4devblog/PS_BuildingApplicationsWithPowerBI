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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Table_1 = __importDefault(require("@material-ui/core/Table"));
var TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var TableHead_1 = __importDefault(require("@material-ui/core/TableHead"));
var TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
function OrderHistory(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        container: {
            maxHeight: 250,
            overflowY: "auto",
            overflowX: "hidden"
        },
        historyTable: {
            minWidth: 400,
            marginBottom: 20
        }
    }); });
    var classes = useStyles(props.theme);
    function getOrderHistory(customerId) {
        var request = new Request("/api/xmla/orderHistory/customer/" + customerId, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });
        return fetch(request);
    }
    function getOrderHistoryFromResponse(response) {
        if (response.status === 200) {
            return response.json();
        }
        else
            throw "Error fetching report embed model";
    }
    var _a = react_1.useState(new Array()), orderHistory = _a[0], setOrderHistory = _a[1];
    react_1.useEffect(function () {
        getOrderHistory(props.customerId).then(function (response) {
            return getOrderHistoryFromResponse(response).then(function (history) {
                setOrderHistory(history);
            });
        });
    }, [props.customerId]);
    function getDateValue(date) {
        if (date != null) {
            var d = new Date(date);
            return d.toLocaleDateString();
        }
        return "";
    }
    return (react_1.default.createElement("div", { className: classes.container },
        react_1.default.createElement(Table_1.default, { className: classes.historyTable, size: "small" },
            react_1.default.createElement(TableHead_1.default, null,
                react_1.default.createElement(TableRow_1.default, null,
                    react_1.default.createElement(TableCell_1.default, null, "Order Id"),
                    react_1.default.createElement(TableCell_1.default, null, "Order Date"),
                    react_1.default.createElement(TableCell_1.default, { align: "right" }, "Items"),
                    react_1.default.createElement(TableCell_1.default, { align: "right" }, "Sale Value ($)"),
                    react_1.default.createElement(TableCell_1.default, { align: "right" }, "Items Returned"))),
            react_1.default.createElement(TableBody_1.default, null, orderHistory.map(function (row) { return (react_1.default.createElement(TableRow_1.default, { key: row.orderId },
                react_1.default.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.orderId),
                react_1.default.createElement(TableCell_1.default, null, getDateValue(row.orderDate)),
                react_1.default.createElement(TableCell_1.default, { align: "right" }, row.numberOfItems),
                react_1.default.createElement(TableCell_1.default, { align: "right" },
                    "$",
                    row.salesValue),
                react_1.default.createElement(TableCell_1.default, { align: "right" }, row.itemsReturned))); })))));
}
exports.default = OrderHistory;
