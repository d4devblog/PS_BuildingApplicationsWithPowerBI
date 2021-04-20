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
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var pbi = __importStar(require("powerbi-client"));
function ReportPages(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        pageListContainer: {
            float: "left"
        },
        button: {
            margin: theme.spacing(1)
        }
    }); });
    var classes = useStyles(props.theme);
    var pageList = props.pages.map(function (page) {
        if (page.visibility === pbi.models.SectionVisibility.HiddenInViewMode) {
            return null;
        }
        else if (page.isActive) {
            return (react_1.default.createElement(Button_1.default, { key: page.name, className: classes.button, color: "primary" }, page.displayName));
        }
        else {
            return (react_1.default.createElement(Button_1.default, { key: page.name, className: classes.button, onClick: function () { return props.pageChangeHandler(page); } }, page.displayName));
        }
    });
    return react_1.default.createElement("div", { className: classes.pageListContainer }, pageList);
}
exports.default = ReportPages;
