"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styles_1 = require("@material-ui/core/styles");
var DarkTheme = /** @class */ (function () {
    function DarkTheme() {
        this.theme = styles_1.createMuiTheme({
            palette: {
                type: "dark",
                primary: { main: "#f7f7f7" },
                secondary: { main: "#4F575C" },
                background: {
                    default: "#333",
                    paper: "#333"
                }
            }
        });
    }
    return DarkTheme;
}());
exports.default = DarkTheme;
