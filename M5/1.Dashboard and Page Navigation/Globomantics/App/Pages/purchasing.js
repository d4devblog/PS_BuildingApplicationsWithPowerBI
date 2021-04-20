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
exports.Purchasing = void 0;
var react_1 = __importDefault(require("react"));
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
var PowerBITile_1 = __importDefault(require("../Components/PowerBITile"));
var PowerBISingleVisual_1 = __importDefault(require("../Components/PowerBISingleVisual"));
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
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Grid_1.default, { container: true, direction: "row", spacing: 2, alignItems: "stretch" },
            react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sm: 6 },
                react_1.default.createElement(Card_1.default, { className: classes.card },
                    react_1.default.createElement(CardContent_1.default, null,
                        react_1.default.createElement(Box_1.default, { className: classes.tileContainer },
                            react_1.default.createElement(PowerBITile_1.default, __assign({ dashboardName: "PurchasingTiles", tileName: "Low Stock" }, props)))))),
            react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sm: 6 },
                react_1.default.createElement(Card_1.default, { className: classes.card },
                    react_1.default.createElement(CardContent_1.default, null,
                        react_1.default.createElement(Box_1.default, { className: classes.tileContainer },
                            react_1.default.createElement(PowerBISingleVisual_1.default, __assign({ reportName: "PurchasingTiles_v1", pageName: "ReportSectione4379a349bdbc0ffabb1", visualName: "cfdf6e8cdb3f71b7d4ad" }, props))))))),
        react_1.default.createElement(Paper_1.default, { className: classes.paper },
            react_1.default.createElement(Box_1.default, { mt: 2, p: 2 },
                react_1.default.createElement(Box_1.default, { mb: 3 },
                    react_1.default.createElement(Typography_1.default, { variant: "h6" }, "Stock Change Request"),
                    react_1.default.createElement(Typography_1.default, { variant: "body2", className: classes.subtleText }, "Ensure stock change requests are validated before submission."),
                    react_1.default.createElement(Divider_1.default, null)),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(FormControl_1.default, { className: classes.formElement },
                        react_1.default.createElement(InputLabel_1.default, { htmlFor: "StockModification" }, "Action Required"),
                        react_1.default.createElement(Select_1.default, { native: true, inputProps: { id: "StockModification" }, defaultValue: "-" },
                            react_1.default.createElement("option", null, "-"),
                            react_1.default.createElement("option", null, "Increase Stock"),
                            react_1.default.createElement("option", null, "Sell Excess Stock"))),
                    react_1.default.createElement(FormControl_1.default, { className: classes.formElement },
                        react_1.default.createElement(InputLabel_1.default, { htmlFor: "StockType" }, "Product Code"),
                        react_1.default.createElement(Select_1.default, { native: true, inputProps: { id: "StockType" }, defaultValue: "-" },
                            react_1.default.createElement("option", null, "-"),
                            react_1.default.createElement("option", null, "t-0124"),
                            react_1.default.createElement("option", null, "t-0552r"),
                            react_1.default.createElement("option", null, "a-0321t"),
                            react_1.default.createElement("option", null, "a-0341t"),
                            react_1.default.createElement("option", null, "a-0351t"),
                            react_1.default.createElement("option", null, "a-0361t"),
                            react_1.default.createElement("option", null, "a-0381t"),
                            react_1.default.createElement("option", null, "a-0391t"),
                            react_1.default.createElement("option", null, "a-0401t"),
                            react_1.default.createElement("option", null, "a-0431t"),
                            react_1.default.createElement("option", null, "a-0501t"),
                            react_1.default.createElement("option", null, "a-0551t"),
                            react_1.default.createElement("option", null, "a-0651t"),
                            react_1.default.createElement("option", null, "a-0751t"),
                            react_1.default.createElement("option", null, "a-0851t"),
                            react_1.default.createElement("option", null, "a-1951t"),
                            react_1.default.createElement("option", null, "c-0321r"),
                            react_1.default.createElement("option", null, "c-0331r"),
                            react_1.default.createElement("option", null, "c-0341r"),
                            react_1.default.createElement("option", null, "c-0351r"),
                            react_1.default.createElement("option", null, "c-0361r"),
                            react_1.default.createElement("option", null, "c-0371r"),
                            react_1.default.createElement("option", null, "c-0381r"),
                            react_1.default.createElement("option", null, "c-0391r"),
                            react_1.default.createElement("option", null, "c-0401r"),
                            react_1.default.createElement("option", null, "c-0411r"),
                            react_1.default.createElement("option", null, "c-0421r"),
                            react_1.default.createElement("option", null, "c-0431r"),
                            react_1.default.createElement("option", null, "c-0441r"),
                            react_1.default.createElement("option", null, "c-0451r"),
                            react_1.default.createElement("option", null, "c-0551r"),
                            react_1.default.createElement("option", null, "c-0651r"),
                            react_1.default.createElement("option", null, "c-0751r"),
                            react_1.default.createElement("option", null, "c-1386r"),
                            react_1.default.createElement("option", null, "c-1387r"),
                            react_1.default.createElement("option", null, "c-1388r"),
                            react_1.default.createElement("option", null, "c-1390r"),
                            react_1.default.createElement("option", null, "c-1400r"),
                            react_1.default.createElement("option", null, "c-1451r"),
                            react_1.default.createElement("option", null, "c-1481r"),
                            react_1.default.createElement("option", null, "c-1501r"),
                            react_1.default.createElement("option", null, "c-1551r"),
                            react_1.default.createElement("option", null, "c-1601r"),
                            react_1.default.createElement("option", null, "c-1701r"),
                            react_1.default.createElement("option", null, "c-1801r"),
                            react_1.default.createElement("option", null, "c-1851r"),
                            react_1.default.createElement("option", null, "ca-0311z"),
                            react_1.default.createElement("option", null, "ca-0321z"),
                            react_1.default.createElement("option", null, "ca-0331z"),
                            react_1.default.createElement("option", null, "ca-0341z"),
                            react_1.default.createElement("option", null, "ca-0351z"),
                            react_1.default.createElement("option", null, "ca-0361z"),
                            react_1.default.createElement("option", null, "ca-0371z"),
                            react_1.default.createElement("option", null, "ca-0381z"),
                            react_1.default.createElement("option", null, "ca-0391z"),
                            react_1.default.createElement("option", null, "ca-0394z"),
                            react_1.default.createElement("option", null, "ca-0401z"),
                            react_1.default.createElement("option", null, "ca-0421z"),
                            react_1.default.createElement("option", null, "ca-0431z"),
                            react_1.default.createElement("option", null, "ca-0444z"),
                            react_1.default.createElement("option", null, "ca-0445z"),
                            react_1.default.createElement("option", null, "ca-0446z"),
                            react_1.default.createElement("option", null, "ca-0460z"),
                            react_1.default.createElement("option", null, "ca-0480z"),
                            react_1.default.createElement("option", null, "ca-0490z"),
                            react_1.default.createElement("option", null, "ca-0491z"),
                            react_1.default.createElement("option", null, "ca-0492z"),
                            react_1.default.createElement("option", null, "l-0201s"),
                            react_1.default.createElement("option", null, "l-0211s"),
                            react_1.default.createElement("option", null, "l-0221s"),
                            react_1.default.createElement("option", null, "l-0231s"),
                            react_1.default.createElement("option", null, "l-0241s"),
                            react_1.default.createElement("option", null, "l-0251s"),
                            react_1.default.createElement("option", null, "l-0261s"),
                            react_1.default.createElement("option", null, "l-0271s"),
                            react_1.default.createElement("option", null, "l-0281s"),
                            react_1.default.createElement("option", null, "l-0291s"),
                            react_1.default.createElement("option", null, "l-0301s"),
                            react_1.default.createElement("option", null, "l-0401s"),
                            react_1.default.createElement("option", null, "l-0451s"),
                            react_1.default.createElement("option", null, "t-0101x"),
                            react_1.default.createElement("option", null, "t-0122x"),
                            react_1.default.createElement("option", null, "t-0133x"),
                            react_1.default.createElement("option", null, "t-0144x"),
                            react_1.default.createElement("option", null, "t-0155x"),
                            react_1.default.createElement("option", null, "t-0166x"),
                            react_1.default.createElement("option", null, "t-0177x"),
                            react_1.default.createElement("option", null, "t-0188x"),
                            react_1.default.createElement("option", null, "t-0199x"),
                            react_1.default.createElement("option", null, "t-0211x"),
                            react_1.default.createElement("option", null, "t-0222x")))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(FormControl_1.default, { className: classes.formElement },
                        react_1.default.createElement(TextField_1.default, { label: "Amount" }))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(Button_1.default, { color: "primary" }, "Submit Request"))))));
}
exports.Purchasing = Purchasing;
