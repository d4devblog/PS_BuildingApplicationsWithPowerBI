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
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Modal_1 = __importDefault(require("@material-ui/core/Modal"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var ListItemAvatar_1 = __importDefault(require("@material-ui/core/ListItemAvatar"));
var LocalShipping_1 = __importDefault(require("@material-ui/icons/LocalShipping"));
var AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
var Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var OrderHistory_1 = __importDefault(require("../Components/OrderHistory"));
function OrderDetailsDialog(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        contents: {
            width: "100%"
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
            maxWidth: 650
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
        },
        primaryAction: {
            marginRight: 10
        },
        bigDivider: {
            margin: 20
        },
        historyTitle: {
            marginBottom: 10,
            marginLeft: 12
        }
    }); });
    var classes = useStyles(props.theme);
    var orderDetailText;
    if (props.dialogValues.orderDate != null) {
        orderDetailText = (react_1.default.createElement(ListItemText_1.default, { primary: "Order: " + props.dialogValues.orderId, secondary: props.dialogValues.orderDate.toLocaleDateString() }));
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Modal_1.default, { open: props.dialogOpen, className: classes.modal },
            react_1.default.createElement("div", { className: classes.modalContent },
                react_1.default.createElement(Grid_1.default, { container: true, direction: "row", justify: "flex-start" },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                        react_1.default.createElement(List_1.default, { className: classes.contents },
                            react_1.default.createElement(ListItem_1.default, null,
                                react_1.default.createElement(ListItemAvatar_1.default, null,
                                    react_1.default.createElement(Avatar_1.default, null,
                                        react_1.default.createElement(LocalShipping_1.default, null))),
                                orderDetailText),
                            react_1.default.createElement(Divider_1.default, { variant: "inset", component: "li" }),
                            react_1.default.createElement(ListItem_1.default, null,
                                react_1.default.createElement(ListItemAvatar_1.default, null,
                                    react_1.default.createElement(Avatar_1.default, null,
                                        react_1.default.createElement(AccountCircle_1.default, null))),
                                react_1.default.createElement(ListItemText_1.default, { primary: "Customer: " + props.dialogValues.customerId })))),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                        react_1.default.createElement("div", { className: classes.actions },
                            react_1.default.createElement(Button_1.default, { className: classes.primaryAction, variant: "contained", color: "primary", onClick: function () { return props.closeDialogFunction(); } }, "Contact Customer"),
                            react_1.default.createElement(Button_1.default, { onClick: function () { return props.closeDialogFunction(); } }, "Close"))),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                        react_1.default.createElement(Divider_1.default, { className: classes.bigDivider }),
                        react_1.default.createElement(Typography_1.default, { className: classes.historyTitle, variant: "subtitle1" }, "Order History:"),
                        react_1.default.createElement(OrderHistory_1.default, __assign({}, props, { customerId: props.dialogValues.customerId }))))))));
}
exports.default = OrderDetailsDialog;
