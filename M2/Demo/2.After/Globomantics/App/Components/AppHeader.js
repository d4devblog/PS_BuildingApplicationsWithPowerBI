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
var react_router_dom_1 = require("react-router-dom");
var AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
var Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Search_1 = __importDefault(require("@material-ui/icons/Search"));
var AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var Menu_1 = __importDefault(require("@material-ui/core/Menu"));
var InputBase_1 = __importDefault(require("@material-ui/core/InputBase"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var core_1 = require("@material-ui/core");
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
function AppHeader(props) {
    var useStyles = styles_1.makeStyles(function (theme) {
        var _a, _b;
        return ({
            root: {
                background: theme.palette.background.default,
                boxShadow: "none",
                marginLeft: props.navigationWidth,
                width: "auto"
            },
            title: {
                marginTop: 5,
                fontWeight: "lighter",
                color: theme.palette.text.primary
            },
            toolbarSearch: {
                marginLeft: "auto"
            },
            toolbarUser: {
                marginLeft: "auto",
                width: "100px",
                color: theme.palette.text.primary
            },
            userIcon: {
                marginLeft: 10
            },
            search: (_a = {
                    position: "relative",
                    color: theme.palette.text.primary,
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: styles_1.fade(theme.palette.common.black, 0.05),
                    "&:hover": {
                        backgroundColor: styles_1.fade(theme.palette.common.black, 0.15)
                    },
                    marginTop: 2,
                    marginLeft: 0,
                    width: "100%"
                },
                _a[theme.breakpoints.up("sm")] = {
                    marginLeft: theme.spacing(1),
                    width: "auto"
                },
                _a),
            searchIcon: {
                width: theme.spacing(7),
                height: "100%",
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            inputRoot: {
                color: "inherit"
            },
            inputInput: (_b = {
                    padding: theme.spacing(1, 1, 1, 7),
                    transition: theme.transitions.create("width"),
                    width: "100%"
                },
                _b[theme.breakpoints.up("sm")] = {
                    width: 120,
                    "&:focus": {
                        width: 200
                    }
                },
                _b)
        });
    });
    var _a = react_1.useState(false), isOpen = _a[0], setOpen = _a[1];
    var _b = react_1.useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var classes = useStyles(props.theme);
    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    }
    function handleThemeChange() {
        props.toggleTheme();
        setOpen(false);
    }
    function handleLogoutRequest() {
        setOpen(false);
        window.location.href = "/auth/logout";
    }
    function getPageTitle() {
        var path = props.location.pathname.toString();
        path = path.replace(/\/|\\/gi, "");
        switch (path.toLowerCase()) {
            case "sales-reports":
                return "Sales Reports";
            case "purchasing":
                return "Purchasing";
            case "orders":
                return "Orders";
            default:
                return "Home";
        }
    }
    function getTitleSize() {
        if (props.navigationWidth > 60) {
            return "h5";
        }
        else {
            return "h6";
        }
    }
    return (react_1.default.createElement(AppBar_1.default, { position: "static", className: classes.root },
        react_1.default.createElement(Toolbar_1.default, { variant: "regular" },
            react_1.default.createElement(Grid_1.default, { container: true, direction: "row", alignItems: "center" },
                react_1.default.createElement(Grid_1.default, { item: true, xs: 9, sm: 8 },
                    react_1.default.createElement(core_1.Typography, { variant: getTitleSize(), component: "h1", className: classes.title }, getPageTitle())),
                react_1.default.createElement(Grid_1.default, { item: true, xs: 2, sm: 3 },
                    react_1.default.createElement("div", { className: classes.search },
                        react_1.default.createElement("div", { className: classes.searchIcon },
                            react_1.default.createElement(Search_1.default, null)),
                        react_1.default.createElement(InputBase_1.default, { placeholder: "Search\u2026", classes: {
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }, inputProps: { "aria-label": "search" } }))),
                react_1.default.createElement(Grid_1.default, { item: true, xs: 1, sm: 1 },
                    react_1.default.createElement(core_1.ClickAwayListener, { onClickAway: function () { return setOpen(false); } },
                        react_1.default.createElement(IconButton_1.default, { id: "user-icon", "aria-label": "account of current user", "aria-controls": "menu-appbar", "aria-haspopup": "true", className: classes.userIcon, onClick: handleProfileMenuOpen },
                            react_1.default.createElement(AccountCircle_1.default, null))),
                    react_1.default.createElement(Menu_1.default, { id: "menu-appbar", anchorEl: anchorEl, anchorOrigin: {
                            vertical: "top",
                            horizontal: "right"
                        }, keepMounted: true, transformOrigin: {
                            vertical: "top",
                            horizontal: "right"
                        }, open: isOpen },
                        react_1.default.createElement(MenuItem_1.default, { onClick: function () { return setOpen(false); } }, "Profile"),
                        react_1.default.createElement(MenuItem_1.default, { onClick: function () { return handleThemeChange(); } }, "Change Theme"),
                        react_1.default.createElement(Divider_1.default, null),
                        react_1.default.createElement(MenuItem_1.default, { onClick: function () { return handleLogoutRequest(); } }, "Logout")))))));
}
exports.default = react_router_dom_1.withRouter(AppHeader);
