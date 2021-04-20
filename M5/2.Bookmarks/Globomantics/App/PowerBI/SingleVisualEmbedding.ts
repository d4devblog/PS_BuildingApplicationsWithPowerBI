import * as pbi from "powerbi-client";
import { IVisualEmbedConfiguration } from "embed";
import * as pbiTheme from "../Theme/PowerBI";

interface IReportEmbedModel {
  id: string;
  embedUrl: string;
  accessToken: string;
}

export class SingleVisualEmbedding {
  private pbiService: pbi.service.Service;

  constructor() {
    this.pbiService = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
  }

  public embedVisual(
    reportName: string,
    pageName: string,
    visualName: string,
    hostContainer: HTMLDivElement
  ): void {
    this.getReportEmbedModel(reportName)
      .then(apiResponse => this.getReportEmbedModelFromResponse(apiResponse))
      .then(responseContent =>
        this.buildReportEmbedConfiguration(
          responseContent,
          pageName,
          visualName
        )
      )
      .then(reportConfiguration =>
        this.runEmbedding(reportConfiguration, hostContainer, reportName)
      );
  }

  private getReportEmbedModel(reportName: string): Promise<Response> {
    const request = new Request("/api/embedding/report", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ reportName: reportName })
    });

    return fetch(request);
  }

  private getReportEmbedModelFromResponse(response: Response): Promise<any> {
    if (response.status === 200) {
      return response.json();
    } else throw "Error fetching report embed model";
  }

  private buildReportEmbedConfiguration(
    embedModel: IReportEmbedModel,
    pageName: string,
    visualName: string
  ): IVisualEmbedConfiguration {
    return {
      id: embedModel.id,
      embedUrl: embedModel.embedUrl,
      accessToken: embedModel.accessToken,
      type: "visual",
      pageName: pageName,
      visualName: visualName,
      tokenType: pbi.models.TokenType.Embed,
        permissions: pbi.models.Permissions.Read
    } as IVisualEmbedConfiguration;
  }

  private runEmbedding(
    visualConfiguration: IVisualEmbedConfiguration,
    hostContainer: HTMLDivElement,
    reportName: string
  ): void {
    const reportVisual = this.pbiService.embed(
      hostContainer,
      visualConfiguration
    );

    reportVisual.off("loaded");
    reportVisual.on("loaded", () => {
        this.handleTokenExpiration(reportVisual, reportName);
        this.showReport(hostContainer);
    });
  }

  private handleTokenExpiration(reportVisual: pbi.Embed, reportName: string) {
    const timeoutMilliseconds = 55 * 60 * 1000;
    setTimeout(() => {
      this.getReportEmbedModel(reportName)
        .then(apiResponse => this.getReportEmbedModelFromResponse(apiResponse))
        .then(responseContent =>
          this.updateEmbedToken(responseContent, reportVisual, reportName)
        );
    }, timeoutMilliseconds);
  }

  private updateEmbedToken(
    embedModel: IReportEmbedModel,
    report: pbi.Embed,
    reportName: string
  ): void {
    report
      .setAccessToken(embedModel.accessToken)
      .then(() => this.handleTokenExpiration(report, reportName));
    }

    private showReport(hostContainer: HTMLDivElement): void {
        window.setTimeout(() => {
            hostContainer.style.visibility = "visible";
        }, 300);
    }
}
