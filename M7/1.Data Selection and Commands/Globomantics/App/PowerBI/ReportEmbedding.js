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
    function ReportEmbedding(pageNavigationCallback, bookmarkSelectionCallback, buttonCallback, commandCallback, renderCompleteCallback) {
        this.pbiService = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        this.pageNavigationCallback = pageNavigationCallback;
        this.bookmarkSelectionCallback = bookmarkSelectionCallback;
        this.buttonCallback = buttonCallback;
        this.commandCallback = commandCallback;
        this.renderCompleteCallback = renderCompleteCallback;
    }
    ReportEmbedding.prototype.embedReport = function (reportName, hostContainer, showMobileLayout, themeType, customCommands) {
        var _this = this;
        this.getReportEmbedModel(reportName)
            .then(function (apiResponse) { return _this.getReportEmbedModelFromResponse(apiResponse); })
            .then(function (responseContent) {
            return _this.buildReportEmbedConfiguration(responseContent, showMobileLayout, themeType, customCommands);
        })
            .then(function (reportConfiguration) {
            return _this.runEmbedding(reportConfiguration, hostContainer, reportName, showMobileLayout);
        });
    };
    ReportEmbedding.prototype.selectPage = function (page, hostContainer) {
        page.setActive();
        var report = this.pbiService.get(hostContainer);
        this.setReportPages(report);
    };
    ReportEmbedding.prototype.selectBookmark = function (bookmark, hostContainer) {
        var report = this.pbiService.get(hostContainer);
        report.bookmarksManager.apply(bookmark.name);
    };
    ReportEmbedding.prototype.applyReportFilters = function (filters, hostContainer) {
        var report = this.pbiService.get(hostContainer);
        report.setFilters(filters).catch(function (error) {
            console.log("Error applying filter", error);
        });
    };
    ReportEmbedding.prototype.getReportInstance = function (hostContainer) {
        return this.pbiService.get(hostContainer);
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
    ReportEmbedding.prototype.buildReportEmbedConfiguration = function (embedModel, showMobileLayout, themeType, customCommands) {
        var layoutSettings = {
            displayOption: models.DisplayOption.FitToWidth
        };
        var customCommandExtensions = customCommands.map(function (c) {
            return {
                command: c
            };
        });
        var renderSettings = {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
            layoutType: showMobileLayout
                ? models.LayoutType.MobilePortrait
                : models.LayoutType.Custom,
            customLayout: layoutSettings,
            commands: [
                {
                    copy: { displayOption: models.CommandDisplayOption.Hidden }
                },
                {
                    seeData: { displayOption: models.CommandDisplayOption.Hidden }
                },
                {
                    exportData: { displayOption: models.CommandDisplayOption.Hidden }
                },
                {
                    includeExclude: { displayOption: models.CommandDisplayOption.Hidden }
                }
            ],
            extensions: customCommandExtensions
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
            _this.setReportPages(report);
            _this.setReportBookmarks(report);
        });
        report.off("buttonClicked");
        report.on("buttonClicked", function (e) {
            console.log(e);
            if (_this.buttonCallback) {
                _this.buttonCallback(e);
            }
        });
        report.off("commandTriggered");
        report.on("commandTriggered", function (e) {
            if (_this.commandCallback) {
                var commandDetail = e.detail;
                var dataSelection = e.detail;
                _this.commandCallback(commandDetail.command, dataSelection);
            }
        });
        report.off("rendered");
        report.on("rendered", function () {
            if (_this.renderCompleteCallback) {
                _this.renderCompleteCallback();
            }
        });
        report.off("error");
        report.on("error", function (e) {
            var error = e.detail;
            if (error.level >= models.TraceType.Error) {
                console.log("Handled Embedding Error:", error);
            }
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
    ReportEmbedding.prototype.setReportPages = function (report) {
        var _this = this;
        report.getPages().then(function (pages) {
            _this.pageNavigationCallback(pages);
        });
    };
    ReportEmbedding.prototype.setReportBookmarks = function (report) {
        var _this = this;
        report.bookmarksManager
            .getBookmarks()
            .then(function (bookmarks) {
            _this.bookmarkSelectionCallback(bookmarks);
        });
    };
    return ReportEmbedding;
}());
exports.ReportEmbedding = ReportEmbedding;
