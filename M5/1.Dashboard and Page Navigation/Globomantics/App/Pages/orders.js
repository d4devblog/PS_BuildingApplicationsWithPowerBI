"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var Table_1 = __importDefault(require("@material-ui/core/Table"));
var TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var TableHead_1 = __importDefault(require("@material-ui/core/TableHead"));
var TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
var TableFooter_1 = __importDefault(require("@material-ui/core/TableFooter"));
var TablePagination_1 = __importDefault(require("@material-ui/core/TablePagination"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Box_1 = __importDefault(require("@material-ui/core/Box"));
function Orders(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        paper: {
            background: theme.palette.type == "light" ? "#fff" : "#474747"
        },
        search: {
            paddingBottom: 10
        }
    }); });
    var classes = useStyles(props.theme);
    function createRow(orderId, customer, date, product, discount, total) {
        return { orderId: orderId, customer: customer, date: date, product: product, discount: discount, total: total };
    }
    var dataRows = [
        createRow(40605, 3364, "Oct 11th", "t-0101x", "0.00", "3500.00"),
        createRow(40606, 2724, "Oct 11th", "ca-0351z", "0.00", "92.50"),
        createRow(40607, 2729, "Oct 11th", "ca-0492z", "0.00", "40.50"),
        createRow(40608, 2420, "Oct 11th", "t-0222x", "0.00", "1150.50"),
        createRow(40609, 5096, "Oct 11th", "ca-0381z", "0.00", "82.10"),
        createRow(40610, 5126, "Oct 11th", "ca-0491z", "0.00", "42.50"),
        createRow(40611, 5112, "Oct 11th", "t-0188x", "0.00", "1600.50"),
        createRow(40612, 2449, "Oct 11th", "ca-0371z", "4.25", "80.75"),
        createRow(40613, 2188, "Oct 12th", "ca-0431z", "3.15", "59.76"),
        createRow(40614, 1201, "Oct 12th", "t-0101x", "175.00", "3325.00")
    ];
    function emptyPageChange() {
        return;
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Paper_1.default, { className: classes.paper },
            react_1.default.createElement(Box_1.default, { p: 3 },
                react_1.default.createElement(TextField_1.default, { label: "Search", margin: "normal", className: classes.search }),
                react_1.default.createElement(Table_1.default, { size: "small" },
                    react_1.default.createElement(TableHead_1.default, null,
                        react_1.default.createElement(TableRow_1.default, null,
                            react_1.default.createElement(TableCell_1.default, null, "Order Id"),
                            react_1.default.createElement(TableCell_1.default, null, "Customer"),
                            react_1.default.createElement(TableCell_1.default, null, "Order Date"),
                            react_1.default.createElement(TableCell_1.default, null, "Product"),
                            react_1.default.createElement(TableCell_1.default, { align: "right" }, "Discount"),
                            react_1.default.createElement(TableCell_1.default, { align: "right" }, "Total Sales ($)"))),
                    react_1.default.createElement(TableBody_1.default, null, dataRows.map(function (row) { return (react_1.default.createElement(TableRow_1.default, { key: row.orderId },
                        react_1.default.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.orderId),
                        react_1.default.createElement(TableCell_1.default, null, row.customer),
                        react_1.default.createElement(TableCell_1.default, null, row.date),
                        react_1.default.createElement(TableCell_1.default, null, row.product),
                        react_1.default.createElement(TableCell_1.default, { align: "right" }, row.discount),
                        react_1.default.createElement(TableCell_1.default, { align: "right" }, row.total))); })),
                    react_1.default.createElement(TableFooter_1.default, null,
                        react_1.default.createElement(TableRow_1.default, null,
                            react_1.default.createElement(TableCell_1.default, { colSpan: 2 },
                                react_1.default.createElement(Button_1.default, { color: "primary" }, "Export Order List")),
                            react_1.default.createElement(TablePagination_1.default, { colSpan: 4, rowsPerPage: 10, page: 0, count: 61, onChangePage: function () { return emptyPageChange; } }))))))));
}
exports.Orders = Orders;
