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
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var useMediaQuery_1 = __importDefault(require("@material-ui/core/useMediaQuery"));
var ReportEmbedding_1 = require("./../PowerBI/ReportEmbedding");
var ReportPages_1 = __importDefault(require("./ReportPages"));
function PowerBIReport(props) {
    var reportContainer = react_1.default.createRef();
    var reportEmbedding = new ReportEmbedding_1.ReportEmbedding(updatePageList);
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        container: {
            height: isMobileViewport ? "calc(100vh - 140px)" : "100%",
            visibility: "hidden"
        },
        reportWrapper: {
            minheight: "200px",
            backgroundImage: "url('/images/globomantics_loader.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            backgroundSize: "200px 200px"
        },
        button: {
            margin: theme.spacing(1)
        },
        reportOptionsContainer: {
            borderBottom: "1px solid #eaeaea",
            marginBottom: "10px",
            display: "inline-block",
            width: "100%"
        }
    }); });
    var theme = styles_1.useTheme();
    var isMobileViewport = useMediaQuery_1.default(theme.breakpoints.down("xs"), {
        noSsr: true
    });
    var classes = useStyles(props.theme);
    react_1.useEffect(function () {
        reportEmbedding.embedReport(props.reportName, reportContainer.current, isMobileViewport, theme.palette.type);
    }, []);
    var _a = react_1.useState(new Array()), pages = _a[0], updatePageState = _a[1];
    function updatePageList(pages) {
        updatePageState(pages);
    }
    function selectPage(page) {
        reportEmbedding.selectPage(page, reportContainer.current);
    }
    var reportPages = (react_1.default.createElement(ReportPages_1.default, __assign({ pageChangeHandler: selectPage, pages: pages }, props)));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: classes.reportOptionsContainer }, reportPages),
        react_1.default.createElement("div", { className: classes.reportWrapper },
            react_1.default.createElement("div", { ref: reportContainer, className: classes.container }))));
}
exports.default = PowerBIReport;
