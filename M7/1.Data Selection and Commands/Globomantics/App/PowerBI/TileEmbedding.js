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
exports.TileEmbedding = void 0;
var pbi = __importStar(require("powerbi-client"));
var models = __importStar(require("powerbi-models"));
var TileEmbedding = /** @class */ (function () {
    function TileEmbedding() {
        this.pbiService = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    }
    TileEmbedding.prototype.embedTile = function (dashboardName, tileName, hostContainer) {
        var _this = this;
        this.getTileEmbedModel(dashboardName, tileName)
            .then(function (apiResponse) { return _this.getTileEmbedModelFromResponse(apiResponse); })
            .then(function (responseContent) {
            return _this.buildTileEmbedConfiguration(responseContent);
        })
            .then(function (tileConfiguration) {
            return _this.runEmbedding(tileConfiguration, hostContainer);
        });
    };
    TileEmbedding.prototype.getTileEmbedModel = function (dashboardName, tileName) {
        var request = new Request("/api/embedding/tile", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                dashboardName: dashboardName,
                tileName: tileName
            })
        });
        return fetch(request);
    };
    TileEmbedding.prototype.getTileEmbedModelFromResponse = function (response) {
        if (response.status === 200) {
            return response.json();
        }
        else
            throw "Error fetching report embed model";
    };
    TileEmbedding.prototype.buildTileEmbedConfiguration = function (embedModel) {
        return {
            id: embedModel.id,
            dashboardId: embedModel.dashboardId,
            embedUrl: embedModel.embedUrl,
            accessToken: embedModel.accessToken,
            type: "tile",
            tokenType: pbi.models.TokenType.Embed,
            permissions: pbi.models.Permissions.Read
        };
    };
    TileEmbedding.prototype.runEmbedding = function (tileConfiguration, hostContainer) {
        var tile = this.pbiService.embed(hostContainer, tileConfiguration);
        tile.off("error");
        tile.on("error", function (e) {
            var error = e.detail;
            if (error.level >= models.TraceType.Error) {
                console.log("Handled Embedding Error:", error);
            }
        });
    };
    return TileEmbedding;
}());
exports.TileEmbedding = TileEmbedding;
