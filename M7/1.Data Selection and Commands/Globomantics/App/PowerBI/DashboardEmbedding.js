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
exports.DashboardEmbedding = void 0;
var pbi = __importStar(require("powerbi-client"));
var models = __importStar(require("powerbi-models"));
var DashboardEmbedding = /** @class */ (function () {
    function DashboardEmbedding(redirectionCallback) {
        this.pbiService = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        this.redirectionCallback = redirectionCallback;
    }
    DashboardEmbedding.prototype.embedDashboard = function (dashboardName, hostContainer, showMobileLayout) {
        var _this = this;
        this.getDashboardEmbedModel(dashboardName)
            .then(function (apiResponse) { return _this.getEmbedModelFromResponse(apiResponse); })
            .then(function (responseContent) {
            return _this.buildDashboardEmbedConfiguration(responseContent, showMobileLayout);
        })
            .then(function (dashboardConfiguration) {
            return _this.runEmbedding(dashboardConfiguration, hostContainer);
        });
    };
    DashboardEmbedding.prototype.getDashboardEmbedModel = function (dashboardName) {
        var request = new Request("/api/embedding/dashboard", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ dashboardName: dashboardName })
        });
        return fetch(request);
    };
    DashboardEmbedding.prototype.getEmbedModelFromResponse = function (response) {
        if (response.status === 200) {
            return response.json();
        }
        else
            throw "Error fetching report embed model";
    };
    DashboardEmbedding.prototype.buildDashboardEmbedConfiguration = function (embedModel, showMobileLayout) {
        var pageViewType = showMobileLayout ? "oneColumn" : "actualSize";
        return {
            id: embedModel.id,
            embedUrl: embedModel.embedUrl,
            accessToken: embedModel.accessToken,
            type: "dashboard",
            tokenType: pbi.models.TokenType.Embed,
            permissions: pbi.models.Permissions.Read,
            pageView: pageViewType
        };
    };
    DashboardEmbedding.prototype.runEmbedding = function (dashboardConfiguration, hostContainer) {
        var _this = this;
        var dashboard = this.pbiService.embed(hostContainer, dashboardConfiguration);
        dashboard.off("tileClicked");
        dashboard.on("tileClicked", function (e) {
            var eventDetail = e.detail;
            _this.getRedirectionLocation(dashboardConfiguration.id, eventDetail.tileId).then(function (location) { return _this.redirectToLocation(location); });
        });
        dashboard.off("error");
        dashboard.on("error", function (e) {
            var error = e.detail;
            if (error.level >= models.TraceType.Error) {
                console.log("Handled Embedding Error:", error);
            }
        });
    };
    DashboardEmbedding.prototype.getRedirectionLocation = function (dashboardId, tileId) {
        var request = new Request("/api/embedding/tile/redirection", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ dashboardId: dashboardId, tileId: tileId })
        });
        return fetch(request).then(function (apiResponse) {
            if (apiResponse.status === 200) {
                return apiResponse.text();
            }
        });
    };
    DashboardEmbedding.prototype.redirectToLocation = function (tileLocation) {
        if (this.redirectionCallback && tileLocation) {
            this.redirectionCallback(tileLocation);
        }
    };
    return DashboardEmbedding;
}());
exports.DashboardEmbedding = DashboardEmbedding;
