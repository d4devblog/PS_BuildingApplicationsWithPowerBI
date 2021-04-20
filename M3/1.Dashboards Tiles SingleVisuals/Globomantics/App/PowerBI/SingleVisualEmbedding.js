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
exports.SingleVisualEmbedding = void 0;
var pbi = __importStar(require("powerbi-client"));
var SingleVisualEmbedding = /** @class */ (function () {
    function SingleVisualEmbedding() {
        this.pbiService = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    }
    SingleVisualEmbedding.prototype.embedVisual = function (reportName, pageName, visualName, hostContainer) {
        var _this = this;
        this.getReportEmbedModel(reportName)
            .then(function (apiResponse) { return _this.getReportEmbedModelFromResponse(apiResponse); })
            .then(function (responseContent) {
            return _this.buildReportEmbedConfiguration(responseContent, pageName, visualName);
        })
            .then(function (reportConfiguration) {
            return _this.runEmbedding(reportConfiguration, hostContainer);
        });
    };
    SingleVisualEmbedding.prototype.getReportEmbedModel = function (reportName) {
        var request = new Request("/api/embedding/report", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ reportName: reportName })
        });
        return fetch(request);
    };
    SingleVisualEmbedding.prototype.getReportEmbedModelFromResponse = function (response) {
        if (response.status === 200) {
            return response.json();
        }
        else
            throw "Error fetching report embed model";
    };
    SingleVisualEmbedding.prototype.buildReportEmbedConfiguration = function (embedModel, pageName, visualName) {
        return {
            id: embedModel.id,
            embedUrl: embedModel.embedUrl,
            accessToken: embedModel.accessToken,
            type: "visual",
            pageName: pageName,
            visualName: visualName,
            tokenType: pbi.models.TokenType.Embed,
            permissions: pbi.models.Permissions.Read
        };
    };
    SingleVisualEmbedding.prototype.runEmbedding = function (visualConfiguration, hostContainer) {
        this.pbiService.embed(hostContainer, visualConfiguration);
    };
    return SingleVisualEmbedding;
}());
exports.SingleVisualEmbedding = SingleVisualEmbedding;
