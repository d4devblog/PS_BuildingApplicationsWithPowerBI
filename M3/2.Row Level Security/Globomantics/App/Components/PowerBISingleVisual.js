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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var SingleVisualEmbedding_1 = require("./../PowerBI/SingleVisualEmbedding");
function PowerBIVisual(props) {
    var reportContainer = react_1.default.createRef();
    var singleVisualEmbedding = new SingleVisualEmbedding_1.SingleVisualEmbedding();
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        container: {
            height: "100%"
        }
    }); });
    var classes = useStyles(props.theme);
    react_1.useEffect(function () {
        singleVisualEmbedding.embedVisual(props.reportName, props.pageName, props.visualName, reportContainer.current);
    }, []);
    return react_1.default.createElement("div", { ref: reportContainer, className: classes.container });
}
exports.default = PowerBIVisual;
