"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styles_1 = require("@material-ui/core/styles");
var DefaultTheme = /** @class */ (function () {
    function DefaultTheme() {
        this.theme = styles_1.createMuiTheme({
            palette: {
                type: "light",
                primary: { main: "#62BEC4" },
                secondary: { main: "#4F575C" },
                background: {
                    default: "#f0f0f0",
                    paper: "#f0f0f0"
                }
            }
        });
    }
    return DefaultTheme;
}());
exports.default = DefaultTheme;
