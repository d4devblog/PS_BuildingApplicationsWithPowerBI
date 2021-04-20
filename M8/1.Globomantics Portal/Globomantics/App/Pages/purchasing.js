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
exports.Purchasing = void 0;
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var Select_1 = __importDefault(require("@material-ui/core/Select"));
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var Snackbar_1 = __importDefault(require("@material-ui/core/Snackbar"));
var PowerBISingleVisual_1 = __importDefault(require("../Components/PowerBISingleVisual"));
var DataPointReader = __importStar(require("../Utils/DataPointReader"));
function Purchasing(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        card: {
            background: theme.palette.type == "light" ? "#fff" : "#474747"
        },
        paper: {
            background: theme.palette.type == "light" ? "#fff" : "#474747"
        },
        subtleText: {
            color: theme.palette.text.secondary
        },
        formElement: {
            margin: theme.spacing(1),
            minWidth: 180
        },
        tileContainer: {
            height: 300
        }
    }); });
    var classes = useStyles(props.theme);
    var _a = react_1.default.useState(false), confirmationOpen = _a[0], setConfirmationOpen = _a[1];
    var handleConfirmationClose = function () {
        setConfirmationOpen(false);
    };
    var _b = react_1.useState({
        type: "",
        productCode: "",
        amount: ""
    }), stockRequest = _b[0], updateStockRequest = _b[1];
    var handleValueChange = function (name) { return function (event) {
        var _a;
        updateStockRequest(__assign(__assign({}, stockRequest), (_a = {}, _a[name] = event.target.value, _a)));
    }; };
    function handleFormSubmit() {
        updateStockRequest({
            type: "",
            productCode: "",
            amount: ""
        });
        setConfirmationOpen(true);
    }
    function lowStockDataSelectionHandler(selection) {
        if (selection.detail.dataPoints.length > 0) {
            var selectedProduct = DataPointReader.readDataPoint(selection.detail, "Products", "ProductCode");
            updateStockRequest(__assign(__assign({}, stockRequest), { productCode: selectedProduct, type: "increase" }));
        }
        else {
            updateStockRequest(__assign(__assign({}, stockRequest), { productCode: "", type: "" }));
        }
    }
    function highStockDataSelectionHandler(selection) {
        if (selection.detail.dataPoints.length > 0) {
            var selectedProduct = DataPointReader.readDataPoint(selection.detail, "Products", "ProductCode");
            updateStockRequest(__assign(__assign({}, stockRequest), { productCode: selectedProduct, type: "sell" }));
        }
        else {
            updateStockRequest(__assign(__assign({}, stockRequest), { productCode: "", type: "" }));
        }
    }
    var productCodes = [
        "a-0321t",
        "a-0341t",
        "a-0351t",
        "a-0361t",
        "a-0381t",
        "a-0391t",
        "a-0401t",
        "a-0431t",
        "a-0501t",
        "a-0551t",
        "a-0651t",
        "a-0751t",
        "a-0851t",
        "a-1951t",
        "c-0321r",
        "c-0331r",
        "c-0341r",
        "c-0351r",
        "c-0361r",
        "c-0371r",
        "c-0381r",
        "c-0391r",
        "c-0401r",
        "c-0411r",
        "c-0421r",
        "c-0431r",
        "c-0441r",
        "c-0451r",
        "c-0551r",
        "c-0651r",
        "c-0751r",
        "c-1386r",
        "c-1387r",
        "c-1388r",
        "c-1390r",
        "c-1400r",
        "c-1451r",
        "c-1481r",
        "c-1501r",
        "c-1551r",
        "c-1601r",
        "c-1701r",
        "c-1801r",
        "c-1851r",
        "ca-0311z",
        "ca-0321z",
        "ca-0331z",
        "ca-0341z",
        "ca-0351z",
        "ca-0361z",
        "ca-0371z",
        "ca-0381z",
        "ca-0391z",
        "ca-0394z",
        "ca-0401z",
        "ca-0421z",
        "ca-0431z",
        "ca-0444z",
        "ca-0445z",
        "ca-0446z",
        "ca-0460z",
        "ca-0480z",
        "ca-0490z",
        "ca-0491z",
        "ca-0492z",
        "l-0201s",
        "l-0211s",
        "l-0221s",
        "l-0231s",
        "l-0241s",
        "l-0251s",
        "l-0261s",
        "l-0271s",
        "l-0281s",
        "l-0291s",
        "l-0301s",
        "l-0401s",
        "t-0101x",
        "t-0122x",
        "t-0133x",
        "t-0144x",
        "t-0155x",
        "t-0166x",
        "t-0177x",
        "t-0188x",
        "t-0199x",
        "t-0211x",
        "t-0222x"
    ];
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Grid_1.default, { container: true, direction: "row", spacing: 2, alignItems: "stretch" },
            react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sm: 6 },
                react_1.default.createElement(Card_1.default, { className: classes.card },
                    react_1.default.createElement(CardContent_1.default, null,
                        react_1.default.createElement(Box_1.default, { className: classes.tileContainer },
                            react_1.default.createElement(PowerBISingleVisual_1.default, __assign({ reportName: "PurchasingTiles_v1", pageName: "ReportSectione4379a349bdbc0ffabb1", visualName: "eca581019a399acc9638", dataSelectionCallback: lowStockDataSelectionHandler }, props)))))),
            react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sm: 6 },
                react_1.default.createElement(Card_1.default, { className: classes.card },
                    react_1.default.createElement(CardContent_1.default, null,
                        react_1.default.createElement(Box_1.default, { className: classes.tileContainer },
                            react_1.default.createElement(PowerBISingleVisual_1.default, __assign({ reportName: "PurchasingTiles_v1", pageName: "ReportSectione4379a349bdbc0ffabb1", visualName: "cfdf6e8cdb3f71b7d4ad", dataSelectionCallback: highStockDataSelectionHandler }, props))))))),
        react_1.default.createElement(Paper_1.default, { className: classes.paper },
            react_1.default.createElement(Box_1.default, { mt: 2, p: 2 },
                react_1.default.createElement(Box_1.default, { mb: 3 },
                    react_1.default.createElement(Typography_1.default, { variant: "h6" }, "Stock Change Request"),
                    react_1.default.createElement(Typography_1.default, { variant: "body2", className: classes.subtleText }, "Ensure stock change requests are validated before submission."),
                    react_1.default.createElement(Divider_1.default, null)),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(FormControl_1.default, { className: classes.formElement },
                        react_1.default.createElement(InputLabel_1.default, { htmlFor: "StockModification" }, "Action Required"),
                        react_1.default.createElement(Select_1.default, { native: true, inputProps: { id: "StockModification" }, value: stockRequest.type },
                            react_1.default.createElement("option", { value: "" }, "-"),
                            react_1.default.createElement("option", { value: "increase" }, "Increase Stock"),
                            react_1.default.createElement("option", { value: "sell" }, "Sell Excess Stock"))),
                    react_1.default.createElement(FormControl_1.default, { className: classes.formElement },
                        react_1.default.createElement(InputLabel_1.default, { htmlFor: "StockType" }, "Product Code"),
                        react_1.default.createElement(Select_1.default, { inputProps: { id: "StockType", name: "stock-type" }, value: stockRequest.productCode, onChange: handleValueChange("productCode") },
                            react_1.default.createElement(MenuItem_1.default, { value: "" }, "-"),
                            productCodes.map(function (code) {
                                return (react_1.default.createElement(MenuItem_1.default, { key: code, value: code }, code));
                            })))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(FormControl_1.default, { className: classes.formElement },
                        react_1.default.createElement(TextField_1.default, { label: "Amount", value: stockRequest.amount, onChange: handleValueChange("amount") }))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(Button_1.default, { color: "primary", onClick: handleFormSubmit }, "Submit Request")))),
        react_1.default.createElement(Snackbar_1.default, { anchorOrigin: {
                vertical: "bottom",
                horizontal: "right"
            }, open: confirmationOpen, autoHideDuration: 6000, onClose: handleConfirmationClose, color: "primary", ContentProps: {
                "aria-describedby": "message-id"
            }, message: react_1.default.createElement("span", { id: "message-id" }, "Stock Request Submitted") })));
}
exports.Purchasing = Purchasing;
