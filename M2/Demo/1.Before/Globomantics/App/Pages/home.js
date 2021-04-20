"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
var CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var Box_1 = __importDefault(require("@material-ui/core/Box"));
function Home(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        card: {
            background: theme.palette.type == "light" ? "#fff" : "#474747"
        },
        subtleText: {
            color: theme.palette.text.secondary
        }
    }); });
    var classes = useStyles(props.theme);
    function navigateToSales() {
        props.history.push("/sales-reports/");
    }
    function navigateToPurchasing() {
        props.history.push("/purchasing/");
    }
    function navigateToOrders() {
        props.history.push("/orders/");
    }
    return (react_1.default.createElement(Grid_1.default, { container: true, direction: "row", spacing: 2, alignItems: "stretch" },
        react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sm: 4 },
            react_1.default.createElement(Card_1.default, { className: classes.card },
                react_1.default.createElement(CardContent_1.default, null,
                    react_1.default.createElement(Box_1.default, { mb: 3 },
                        react_1.default.createElement(Typography_1.default, null, "Sales"),
                        react_1.default.createElement(Divider_1.default, null)),
                    react_1.default.createElement(Typography_1.default, { variant: "h5" }, "$129,021"),
                    react_1.default.createElement(Typography_1.default, { className: classes.subtleText, variant: "caption" }, "Current Month")),
                react_1.default.createElement(CardActions_1.default, null,
                    react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: function () { return navigateToSales(); } }, "View Sales Reports")))),
        react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sm: 4 },
            react_1.default.createElement(Card_1.default, { className: classes.card },
                react_1.default.createElement(CardContent_1.default, null,
                    react_1.default.createElement(Box_1.default, { mb: 3 },
                        react_1.default.createElement(Typography_1.default, null, "Stock & Purchasing"),
                        react_1.default.createElement(Divider_1.default, null)),
                    react_1.default.createElement(Typography_1.default, { variant: "h5" }, "5 Stock Warnings"),
                    react_1.default.createElement(Typography_1.default, { className: classes.subtleText, variant: "caption" }, "Includes low/overstocked items")),
                react_1.default.createElement(CardActions_1.default, null,
                    react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: function () { return navigateToPurchasing(); } }, "View Purchasing")))),
        react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sm: 4 },
            react_1.default.createElement(Card_1.default, { className: classes.card },
                react_1.default.createElement(CardContent_1.default, null,
                    react_1.default.createElement(Box_1.default, { mb: 3 },
                        react_1.default.createElement(Typography_1.default, null, "Orders"),
                        react_1.default.createElement(Divider_1.default, null)),
                    react_1.default.createElement(Typography_1.default, { variant: "h5" }, "61 Pending Orders"),
                    react_1.default.createElement(Typography_1.default, { className: classes.subtleText, variant: "caption" }, "4 Awaiting Stock")),
                react_1.default.createElement(CardActions_1.default, null,
                    react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: function () { return navigateToOrders(); } }, "View Orders"))))));
}
exports.Home = Home;
