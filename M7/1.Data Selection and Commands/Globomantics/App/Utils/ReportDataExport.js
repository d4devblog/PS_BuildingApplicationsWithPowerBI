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
exports.exportReportData = void 0;
var pbi = __importStar(require("powerbi-client"));
var file_saver_1 = require("file-saver");
function exportReportData(report, pageIndex, visualTitle, fileName) {
    report.getPages().then(function (pages) {
        pages[pageIndex].getVisuals().then(function (visuals) {
            var targetVisual = visuals.find(function (x) { return x.title === visualTitle; });
            if (targetVisual) {
                exportVisualData(targetVisual, fileName);
            }
        });
    });
}
exports.exportReportData = exportReportData;
function exportVisualData(visual, fileName) {
    visual.exportData(pbi.models.ExportDataType.Summarized).then(function (data) {
        triggerFileDownload(fileName, data.data);
    });
}
function triggerFileDownload(fileName, fileContents) {
    if (fileContents && fileName) {
        try {
            var blob = new Blob([fileContents], {
                type: "text/plain;charset=utf-8"
            });
            file_saver_1.saveAs(blob, fileName);
        }
        catch (ex) {
            console.error(ex);
        }
    }
}
