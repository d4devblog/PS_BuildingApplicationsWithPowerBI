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
var DashboardEmbedding = /** @class */ (function () {
    function DashboardEmbedding() {
        this.pbiService = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    }
    DashboardEmbedding.prototype.embedDashboard = function (dashboardName, hostContainer) {
        var _this = this;
        this.getDashboardEmbedModel(dashboardName)
            .then(function (apiResponse) { return _this.getEmbedModelFromResponse(apiResponse); })
            .then(function (responseContent) {
            return _this.buildDashboardEmbedConfiguration(responseContent);
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
    DashboardEmbedding.prototype.buildDashboardEmbedConfiguration = function (embedModel) {
        return {
            id: embedModel.id,
            embedUrl: embedModel.embedUrl,
            accessToken: embedModel.accessToken,
            type: "dashboard",
            tokenType: pbi.models.TokenType.Embed,
            permissions: pbi.models.Permissions.Read
        };
    };
    DashboardEmbedding.prototype.runEmbedding = function (dashboardConfiguration, hostContainer) {
        this.pbiService.embed(hostContainer, dashboardConfiguration);
    };
    return DashboardEmbedding;
}());
exports.DashboardEmbedding = DashboardEmbedding;
