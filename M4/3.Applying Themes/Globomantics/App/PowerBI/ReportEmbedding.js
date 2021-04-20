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
exports.ReportEmbedding = void 0;
var pbi = __importStar(require("powerbi-client"));
var models = __importStar(require("powerbi-models"));
var pbiTheme = __importStar(require("../Theme/PowerBI"));
var ReportEmbedding = /** @class */ (function () {
    function ReportEmbedding() {
        this.pbiService = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    }
    ReportEmbedding.prototype.embedReport = function (reportName, hostContainer, showMobileLayout, themeType) {
        var _this = this;
        this.getReportEmbedModel(reportName)
            .then(function (apiResponse) { return _this.getReportEmbedModelFromResponse(apiResponse); })
            .then(function (responseContent) {
            return _this.buildReportEmbedConfiguration(responseContent, showMobileLayout, themeType);
        })
            .then(function (reportConfiguration) {
            return _this.runEmbedding(reportConfiguration, hostContainer, reportName, showMobileLayout);
        });
    };
    ReportEmbedding.prototype.getReportEmbedModel = function (reportName) {
        var request = new Request("/api/embedding/report", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ reportName: reportName })
        });
        return fetch(request);
    };
    ReportEmbedding.prototype.getReportEmbedModelFromResponse = function (response) {
        if (response.status === 200) {
            return response.json();
        }
        else
            throw "Error fetching report embed model";
    };
    ReportEmbedding.prototype.buildReportEmbedConfiguration = function (embedModel, showMobileLayout, themeType) {
        var layoutSettings = {
            displayOption: models.DisplayOption.FitToWidth
        };
        var renderSettings = {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
            layoutType: showMobileLayout
                ? models.LayoutType.MobilePortrait
                : models.LayoutType.Custom,
            customLayout: layoutSettings
        };
        return {
            id: embedModel.id,
            embedUrl: embedModel.embedUrl,
            accessToken: embedModel.accessToken,
            type: "report",
            tokenType: pbi.models.TokenType.Embed,
            permissions: pbi.models.Permissions.Read,
            settings: renderSettings,
            theme: {
                themeJson: themeType === "dark"
                    ? pbiTheme.GlobomanticsDarkTheme
                    : pbiTheme.GlobomanticsLightTheme
            }
        };
    };
    ReportEmbedding.prototype.runEmbedding = function (reportConfiguration, hostContainer, reportName, showMobileLayout) {
        var _this = this;
        var report = this.pbiService.embed(hostContainer, reportConfiguration);
        report.off("loaded");
        report.on("loaded", function () {
            _this.handleTokenExpiration(report, reportName);
            _this.setContainerHeight(report, hostContainer, showMobileLayout).then(function () { return _this.showReport(hostContainer); });
        });
    };
    ReportEmbedding.prototype.handleTokenExpiration = function (report, reportName) {
        var _this = this;
        var timeoutMilliseconds = 55 * 60 * 1000;
        setTimeout(function () {
            _this.getReportEmbedModel(reportName)
                .then(function (apiResponse) { return _this.getReportEmbedModelFromResponse(apiResponse); })
                .then(function (responseContent) {
                return _this.updateEmbedToken(responseContent, report, reportName);
            });
        }, timeoutMilliseconds);
    };
    ReportEmbedding.prototype.updateEmbedToken = function (embedModel, report, reportName) {
        var _this = this;
        report
            .setAccessToken(embedModel.accessToken)
            .then(function () { return _this.handleTokenExpiration(report, reportName); });
    };
    ReportEmbedding.prototype.setContainerHeight = function (report, hostContainer, showMobileLayout) {
        return report.getPages().then(function (p) {
            p[0].hasLayout(models.LayoutType.MobilePortrait).then(function (hasMobileLayout) {
                if (!hasMobileLayout || !showMobileLayout) {
                    var reportHeight = p[0].defaultSize.height;
                    var reportWidth = p[0].defaultSize.width;
                    var ratio = reportHeight / reportWidth;
                    var containerWidth = hostContainer.clientWidth;
                    var newContainerHeight = Math.round(containerWidth * ratio) + 10;
                    hostContainer.style.height = newContainerHeight + "px";
                }
            });
        });
    };
    ReportEmbedding.prototype.showReport = function (hostContainer) {
        window.setTimeout(function () {
            hostContainer.style.visibility = "visible";
        }, 300);
    };
    return ReportEmbedding;
}());
exports.ReportEmbedding = ReportEmbedding;
