"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppNavigation = void 0;
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Drawer_1 = __importDefault(require("@material-ui/core/Drawer"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var InsertChart_1 = __importDefault(require("@material-ui/icons/InsertChart"));
var Receipt_1 = __importDefault(require("@material-ui/icons/Receipt"));
var Home_1 = __importDefault(require("@material-ui/icons/Home"));
var LocalShipping_1 = __importDefault(require("@material-ui/icons/LocalShipping"));
var react_router_dom_1 = require("react-router-dom");
function AppNavigation(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        root: {
            display: "flex"
        },
        appBar: {
            width: "calc(100% - " + drawerWidth + "px)",
            marginLeft: drawerWidth
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            overflowX: "hidden"
        },
        drawerPaper: {
            width: drawerWidth,
            background: "linear-gradient(45deg, #4316A6 30%, #5207F2 90%)",
            overflowX: "hidden"
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3)
        },
        listItem: {
            color: theme.palette.common.white
        },
        listIcon: {
            color: theme.palette.common.white
        }
    }); });
    var drawerWidth = props.navigationWidth;
    var classes = useStyles(props.theme);
    return (react_1.default.createElement(Drawer_1.default, { className: classes.drawer, variant: "permanent", classes: {
            paper: classes.drawerPaper
        }, anchor: "left" },
        react_1.default.createElement("div", { className: classes.toolbar },
            react_1.default.createElement("span", { className: drawerWidth > 60 ? "nav-logo" : "nav-logo-small", "aria-label": "Globomantics Logo" }, "Globomantics")),
        react_1.default.createElement(Divider_1.default, null),
        react_1.default.createElement(List_1.default, null,
            react_1.default.createElement(react_router_dom_1.Link, { to: "/" },
                react_1.default.createElement(ListItem_1.default, { button: true, className: classes.listItem },
                    react_1.default.createElement(ListItemIcon_1.default, { title: "Home" },
                        react_1.default.createElement(Home_1.default, { className: classes.listIcon })),
                    react_1.default.createElement(ListItemText_1.default, { primary: "Home" }))),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/sales-reports/" },
                react_1.default.createElement(ListItem_1.default, { button: true, className: classes.listItem },
                    react_1.default.createElement(ListItemIcon_1.default, { title: "Sales Reports" },
                        react_1.default.createElement(InsertChart_1.default, { className: classes.listIcon })),
                    react_1.default.createElement(ListItemText_1.default, { primary: "Sales Reports" }))),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/purchasing/" },
                react_1.default.createElement(ListItem_1.default, { button: true, className: classes.listItem },
                    react_1.default.createElement(ListItemIcon_1.default, { title: "Purchasing" },
                        react_1.default.createElement(Receipt_1.default, { className: classes.listIcon })),
                    react_1.default.createElement(ListItemText_1.default, { primary: "Purchasing" }))),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/orders/" },
                react_1.default.createElement(ListItem_1.default, { button: true, className: classes.listItem },
                    react_1.default.createElement(ListItemIcon_1.default, { title: "Orders" },
                        react_1.default.createElement(LocalShipping_1.default, { className: classes.listIcon })),
                    react_1.default.createElement(ListItemText_1.default, { primary: "Orders" })))),
        react_1.default.createElement(Divider_1.default, null)));
}
exports.AppNavigation = AppNavigation;
