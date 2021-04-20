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
exports.App = void 0;
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var react_router_dom_1 = require("react-router-dom");
var useMediaQuery_1 = __importDefault(require("@material-ui/core/useMediaQuery"));
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
// components
var AppHeader = __importStar(require("./components/AppHeader"));
var AppNavigation_1 = require("./components/AppNavigation");
// pages
var home_1 = require("./pages/home");
var purchasing_1 = require("./pages/purchasing");
var salesReports_1 = require("./pages/salesReports");
var orders_1 = require("./pages/orders");
// theme
var default_1 = __importDefault(require("./theme/default"));
var dark_1 = __importDefault(require("./theme/dark"));
var defaultTheme = new default_1.default().theme;
var darkTheme = new dark_1.default().theme;
function App(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        main: {
            marginLeft: navigationWidth,
            padding: 15
        }
    }); });
    var _a = react_1.useState(defaultTheme), theme = _a[0], setTheme = _a[1];
    var toggleTheme = function () {
        var newTheme = theme.palette.type === "light" ? darkTheme : defaultTheme;
        setTheme(newTheme);
    };
    var matches = useMediaQuery_1.default(theme.breakpoints.up("md"));
    var navigationWidth = matches ? 240 : 60;
    var classes = useStyles(theme);
    return (react_1.default.createElement(styles_1.MuiThemeProvider, { theme: theme },
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(CssBaseline_1.default, null),
            react_1.default.createElement(AppHeader.default, { theme: theme, toggleTheme: toggleTheme, navigationWidth: navigationWidth }),
            react_1.default.createElement(AppNavigation_1.AppNavigation, __assign({ theme: theme, navigationWidth: navigationWidth }, props)),
            react_1.default.createElement("main", { className: classes.main },
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", exact: true, component: home_1.Home }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/sales-reports/", component: salesReports_1.SalesReports }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/purchasing/", component: purchasing_1.Purchasing }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/orders/", component: orders_1.Orders })))));
}
exports.App = App;
