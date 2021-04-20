import * as pbi from "powerbi-client";
import { IEmbedConfiguration } from "powerbi-client";

interface IReportEmbedModel {
  id: string;
  embedUrl: string;
  accessToken: string;
}

export class ReportEmbedding {
  private pbiService: pbi.service.Service;

  constructor() {
    this.pbiService = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
  }

  public embedReport(reportName: string, hostContainer: HTMLDivElement): void {
    this.getReportEmbedModel(reportName)
        .then(apiResponse => this.getReportEmbedModelFromResponse(apiResponse))
        .then(responseContent => this.buildReportEmbedConfiguration(responseContent))
        .then(reportConfiguration => this.runEmbedding(reportConfiguration, hostContainer));
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
    embedModel: IReportEmbedModel
  ): IEmbedConfiguration {
    return {
      id: embedModel.id,
      embedUrl: embedModel.embedUrl,
      accessToken: embedModel.accessToken,
      type: "report",
      tokenType: pbi.models.TokenType.Embed,
      permissions: pbi.models.Permissions.Read
    } as IEmbedConfiguration;
  }

  private runEmbedding(
    reportConfiguration: IEmbedConfiguration,
    hostContainer: HTMLDivElement
  ): void {
    this.pbiService.embed(hostContainer, reportConfiguration);
  }
}
