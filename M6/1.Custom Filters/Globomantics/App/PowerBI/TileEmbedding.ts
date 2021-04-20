import * as pbi from "powerbi-client";
import { IEmbedConfiguration } from "powerbi-client";

interface ITileEmbedModel {
  id: string;
  dashboardId: string;
  embedUrl: string;
  accessToken: string;
}

export class TileEmbedding {
  private pbiService: pbi.service.Service;

  constructor() {
    this.pbiService = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
  }

  public embedTile(
    dashboardName: string,
    tileName: string,
    hostContainer: HTMLDivElement
  ): void {
    this.getTileEmbedModel(dashboardName, tileName)
      .then(apiResponse => this.getTileEmbedModelFromResponse(apiResponse))
      .then(responseContent =>
        this.buildTileEmbedConfiguration(responseContent)
      )
      .then(tileConfiguration =>
        this.runEmbedding(tileConfiguration, hostContainer)
      );
  }

  private getTileEmbedModel(
    dashboardName: string,
    tileName: string
  ): Promise<Response> {
    const request = new Request("/api/embedding/tile", {
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
  }

  private getTileEmbedModelFromResponse(response: Response): Promise<any> {
    if (response.status === 200) {
      return response.json();
    } else throw "Error fetching report embed model";
  }

  private buildTileEmbedConfiguration(
    embedModel: ITileEmbedModel
  ): IEmbedConfiguration {
    return {
      id: embedModel.id,
      dashboardId: embedModel.dashboardId,
      embedUrl: embedModel.embedUrl,
      accessToken: embedModel.accessToken,
      type: "tile",
      tokenType: pbi.models.TokenType.Embed,
        permissions: pbi.models.Permissions.Read
    } as IEmbedConfiguration;
  }

  private runEmbedding(
    tileConfiguration: IEmbedConfiguration,
    hostContainer: HTMLDivElement
  ): void {
    this.pbiService.embed(hostContainer, tileConfiguration);
  }
}
