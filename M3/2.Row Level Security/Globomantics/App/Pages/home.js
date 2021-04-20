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
exports.Home = void 0;
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var PowerBIDashboard_1 = __importDefault(require("../Components/PowerBIDashboard"));
function Home(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        paper: {
            background: theme.palette.type == "light" ? "#fff" : "#474747"
        },
        dashboardContainer: {
            height: "calc(100vh - 100px)"
        }
    }); });
    var classes = useStyles(props.theme);
    return (react_1.default.createElement(Box_1.default, { className: classes.dashboardContainer },
        react_1.default.createElement(PowerBIDashboard_1.default, __assign({ dashboardName: "GlobomanticsHome" }, props))));
}
exports.Home = Home;
