"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesReports = void 0;
var react_1 = __importDefault(require("react"));
var react_chartjs_2_1 = require("react-chartjs-2");
var styles_1 = require("@material-ui/core/styles");
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var red_1 = __importDefault(require("@material-ui/core/colors/red"));
var grey_1 = __importDefault(require("@material-ui/core/colors/grey"));
function SalesReports(props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        paper: {
            background: theme.palette.type == "light" ? "#fff" : "#474747"
        },
        chartLabel: {
            paddingBottom: 20
        }
    }); });
    var classes = useStyles(props.theme);
    var totalSalesData = {
        labels: ["P1", "P2", "P3", "P4"],
        datasets: [
            {
                label: "Total Sales ($)",
                data: [101932, 148832, 144142, 129021],
                borderColor: "#62BEC4",
                borderWidth: 2
            }
        ]
    };
    var regionalReturnsData = {
        labels: [
            "Miami",
            "Houston",
            "Seatle",
            "Atlanta",
            "Salt Lake City",
            "Baltimore",
            "Portland",
            "Denver"
        ],
        datasets: [
            {
                label: "% Items returned",
                data: [21, 20, 17.2, 16.8, 14.3, 9.6, 8.2, 7.9],
                backgroundColor: [
                    red_1.default[900],
                    red_1.default[800],
                    red_1.default[700],
                    red_1.default[600],
                    red_1.default[500],
                    red_1.default[400],
                    red_1.default[300],
                    red_1.default[200]
                ],
                borderWidth: 1
            }
        ]
    };
    var saleTypeData = {
        labels: ["Card", "Cash", "Finance"],
        datasets: [
            {
                label: "% Sales",
                data: [65, 20, 15],
                backgroundColor: [grey_1.default[300], grey_1.default[300], "#62BEC4"],
                borderWidth: 1
            }
        ]
    };
    var financeSalesData = {
        labels: ["P1", "P2", "P3", "P4"],
        datasets: [
            {
                label: "% Finance Sales",
                data: [15.2, 14.1, 11.6, 10.2],
                backgroundColor: "#62BEC4",
                borderWidth: 1
            }
        ]
    };
    var targetData = {
        labels: ["Target", "Actual"],
        datasets: [
            {
                label: "Sales ($)",
                data: [140500, 129021],
                backgroundColor: [grey_1.default[300], red_1.default[900]],
                borderWidth: 1
            }
        ]
    };
    var defaultScaleOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0
                    }
                }
            ]
        }
    };
    var scaleOptionsWithoutLegend = {
        legend: {
            display: false
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0
                    }
                }
            ]
        }
    };
    return (react_1.default.createElement(Paper_1.default, { className: classes.paper },
        react_1.default.createElement(Box_1.default, { p: 3 },
            react_1.default.createElement(Grid_1.default, { container: true, direction: "row", spacing: 3, justify: "space-between" },
                react_1.default.createElement(Grid_1.default, { item: true, xs: 5 },
                    react_1.default.createElement(Typography_1.default, { className: classes.chartLabel }, "Sales Trend"),
                    react_1.default.createElement(react_chartjs_2_1.Line, { data: totalSalesData, options: scaleOptionsWithoutLegend })),
                react_1.default.createElement(Grid_1.default, { item: true, xs: 6 },
                    react_1.default.createElement(Typography_1.default, { className: classes.chartLabel }, "Percentage of Items Returned"),
                    react_1.default.createElement(react_chartjs_2_1.Bar, { data: regionalReturnsData, options: scaleOptionsWithoutLegend })),
                react_1.default.createElement(Grid_1.default, { item: true, xs: 4 },
                    react_1.default.createElement(Typography_1.default, { className: classes.chartLabel }, "Payment Types"),
                    react_1.default.createElement(react_chartjs_2_1.Bar, { data: saleTypeData, options: defaultScaleOptions })),
                react_1.default.createElement(Grid_1.default, { item: true, xs: 4 },
                    react_1.default.createElement(Typography_1.default, { className: classes.chartLabel }, "Finance Sales"),
                    react_1.default.createElement(react_chartjs_2_1.Line, { data: financeSalesData, options: defaultScaleOptions })),
                react_1.default.createElement(Grid_1.default, { item: true, xs: 4 },
                    react_1.default.createElement(Typography_1.default, { className: classes.chartLabel }, "Targets"),
                    react_1.default.createElement(react_chartjs_2_1.Bar, { data: targetData, options: defaultScaleOptions }))))));
}
exports.SalesReports = SalesReports;
