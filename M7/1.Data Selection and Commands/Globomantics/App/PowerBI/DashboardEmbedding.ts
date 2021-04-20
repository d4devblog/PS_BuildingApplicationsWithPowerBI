import * as pbi from "powerbi-client";
import * as models from "powerbi-models";
import { IEmbedConfiguration } from "powerbi-client";

interface IDashboardEmbedModel {
  id: string;
  embedUrl: string;
  accessToken: string;
}

export class DashboardEmbedding {
  private pbiService: pbi.service.Service;
  private redirectionCallback: Function;

  constructor(redirectionCallback: (location: string) => void) {
    this.pbiService = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );

    this.redirectionCallback = redirectionCallback;
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
    const dashboard = this.pbiService.embed(
      hostContainer,
      dashboardConfiguration
    ) as pbi.Dashboard;

    dashboard.off("tileClicked");
    dashboard.on("tileClicked", e => {
      const eventDetail = e.detail as any;

      this.getRedirectionLocation(
        dashboardConfiguration.id,
        eventDetail.tileId
      ).then(location => this.redirectToLocation(location));
    });

    dashboard.off("error");
    dashboard.on("error", e => {
      const error = e.detail as models.IError;
        if (error.level >= models.TraceType.Error) {
        console.log("Handled Embedding Error:", error);
      }
    });
  }

  private getRedirectionLocation(
    dashboardId: string,
    tileId: string
  ): Promise<string> {
    const request = new Request("/api/embedding/tile/redirection", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ dashboardId: dashboardId, tileId: tileId })
    });

    return fetch(request).then(apiResponse => {
      if (apiResponse.status === 200) {
        return apiResponse.text();
      }
    });
  }

  private redirectToLocation(tileLocation: string): void {
    if (this.redirectionCallback && tileLocation) {
      this.redirectionCallback(tileLocation);
    }
  }
}
