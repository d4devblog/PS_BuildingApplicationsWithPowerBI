"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Menu_1 = __importDefault(require("@material-ui/core/Menu"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var MoreVert_1 = __importDefault(require("@material-ui/icons/MoreVert"));
function ReportMenu(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        reportMenu: {
            float: "right",
            margin: "10px"
        }
    }); });
    var classes = useStyles(props.theme);
    var _a = react_1.default.useState(null), menuElement = _a[0], setMenuElement = _a[1];
    var menuOpen = function (event) {
        setMenuElement(event.currentTarget);
    };
    var menuClose = function () {
        setMenuElement(null);
    };
    return (react_1.default.createElement("div", { className: classes.reportMenu },
        react_1.default.createElement(IconButton_1.default, { "aria-label": "more", "aria-controls": "long-menu", "aria-haspopup": "true", size: "small", onClick: menuOpen },
            react_1.default.createElement(MoreVert_1.default, null)),
        react_1.default.createElement(Menu_1.default, { id: "simple-menu", anchorEl: menuElement, keepMounted: true, open: Boolean(menuElement), onClose: menuClose }, props.menuItems.map(function (menuItem) {
            return (react_1.default.createElement(MenuItem_1.default, { key: menuItem.name, onClick: function () {
                    menuClose();
                    menuItem.action();
                } }, menuItem.name));
        }))));
}
exports.default = ReportMenu;
