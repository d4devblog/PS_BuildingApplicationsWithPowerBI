import * as pbi from "powerbi-client";
import { IEmbedConfiguration } from "powerbi-client";

interface IDashboardEmbedModel {
  id: string;
  embedUrl: string;
  accessToken: string;
}

export class DashboardEmbedding {
  private pbiService: pbi.service.Service;

  constructor() {
    this.pbiService = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
  }

  public embedDashboard(
    dashboardName: string,
    hostContainer: HTMLDivElement,
    showMobileLayout: boolean
  ): void {
    this.getDashboardEmbedModel(dashboardName)
      .then(apiResponse => this.getEmbedModelFromResponse(apiResponse))
      .then(responseContent =>
        this.buildDashboardEmbedConfiguration(responseContent, showMobileLayout)
      )
      .then(dashboardConfiguration =>
        this.runEmbedding(dashboardConfiguration, hostContainer)
      );
  }

  private getDashboardEmbedModel(dashboardName: string): Promise<Response> {
    const request = new Request("/api/embedding/dashboard", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ dashboardName: dashboardName })
    });

    return fetch(request);
  }

  private getEmbedModelFromResponse(response: Response): Promise<any> {
    if (response.status === 200) {
      return response.json();
    } else throw "Error fetching report embed model";
  }

  private buildDashboardEmbedConfiguration(
    embedModel: IDashboardEmbedModel,
    showMobileLayout: boolean
  ): IEmbedConfiguration {
    const pageViewType = showMobileLayout ? "oneColumn" : "actualSize";

    return {
      id: embedModel.id,
      embedUrl: embedModel.embedUrl,
      accessToken: embedModel.accessToken,
      type: "dashboard",
      tokenType: pbi.models.TokenType.Embed,
      permissions: pbi.models.Permissions.Read,
      pageView: pageViewType
    } as IEmbedConfiguration;
  }

  private runEmbedding(
    dashboardConfiguration: IEmbedConfiguration,
    hostContainer: HTMLDivElement
  ): void {
    this.pbiService.embed(hostContainer, dashboardConfiguration);
  }
}
