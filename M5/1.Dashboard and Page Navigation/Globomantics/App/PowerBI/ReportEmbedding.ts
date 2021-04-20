import * as pbi from "powerbi-client";
import { IEmbedConfiguration } from "powerbi-client";
import * as models from "powerbi-models";
import * as pbiTheme from "../Theme/PowerBI";

interface IReportEmbedModel {
  id: string;
  embedUrl: string;
  accessToken: string;
}

export class ReportEmbedding {
  private pbiService: pbi.service.Service;
  private pageNavigationCallback: Function;

  constructor(pageNavigationCallback: (pages: pbi.Page[]) => void) {
    this.pbiService = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );

    this.pageNavigationCallback = pageNavigationCallback;
  }

  public embedReport(
    reportName: string,
    hostContainer: HTMLDivElement,
    showMobileLayout: boolean,
    themeType: string
  ): void {
    this.getReportEmbedModel(reportName)
      .then(apiResponse => this.getReportEmbedModelFromResponse(apiResponse))
      .then(responseContent =>
        this.buildReportEmbedConfiguration(
          responseContent,
          showMobileLayout,
          themeType
        )
      )
      .then(reportConfiguration =>
        this.runEmbedding(
          reportConfiguration,
          hostContainer,
          reportName,
          showMobileLayout
        )
      );
  }

  public selectPage(page: pbi.Page, hostContainer: HTMLDivElement): void {
    page.setActive();
    const report = this.pbiService.get(hostContainer) as pbi.Report;
    this.setReportPages(report);
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
    showMobileLayout: boolean,
    themeType: string
  ): IEmbedConfiguration {
    const layoutSettings = {
      displayOption: models.DisplayOption.FitToWidth
    } as models.ICustomLayout;

    const renderSettings = {
      filterPaneEnabled: false,
      navContentPaneEnabled: false,
      layoutType: showMobileLayout
        ? models.LayoutType.MobilePortrait
        : models.LayoutType.Custom,
      customLayout: layoutSettings
    } as models.ISettings;

    return {
      id: embedModel.id,
      embedUrl: embedModel.embedUrl,
      accessToken: embedModel.accessToken,
      type: "report",
      tokenType: pbi.models.TokenType.Embed,
      permissions: pbi.models.Permissions.Read,
      settings: renderSettings,
      theme: {
        themeJson:
          themeType === "dark"
            ? pbiTheme.GlobomanticsDarkTheme
            : pbiTheme.GlobomanticsLightTheme
      }
    } as IEmbedConfiguration;
  }

  private runEmbedding(
    reportConfiguration: IEmbedConfiguration,
    hostContainer: HTMLDivElement,
    reportName: string,
    showMobileLayout: boolean
  ): void {
    const report = this.pbiService.embed(
      hostContainer,
      reportConfiguration
    ) as pbi.Report;

    report.off("loaded");
    report.on("loaded", () => {
      this.handleTokenExpiration(report, reportName);
      this.setContainerHeight(report, hostContainer, showMobileLayout).then(
        () => this.showReport(hostContainer)
      );
      this.setReportPages(report);
    });
  }

  private handleTokenExpiration(report: pbi.Embed, reportName: string) {
    const timeoutMilliseconds = 55 * 60 * 1000;
    setTimeout(() => {
      this.getReportEmbedModel(reportName)
        .then(apiResponse => this.getReportEmbedModelFromResponse(apiResponse))
        .then(responseContent =>
          this.updateEmbedToken(responseContent, report, reportName)
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

  private setContainerHeight(
    report: pbi.Report,
    hostContainer: HTMLDivElement,
    showMobileLayout: boolean
  ) {
    return report.getPages().then((p: Array<pbi.Page>) => {
      p[0].hasLayout(models.LayoutType.MobilePortrait).then(hasMobileLayout => {
        if (!hasMobileLayout || !showMobileLayout) {
          const reportHeight = p[0].defaultSize.height;
          const reportWidth = p[0].defaultSize.width;

          const ratio = reportHeight / reportWidth;
          const containerWidth = hostContainer.clientWidth;
          const newContainerHeight = Math.round(containerWidth * ratio) + 10;

          hostContainer.style.height = `${newContainerHeight}px`;
        }
      });
    });
  }

  private showReport(hostContainer: HTMLDivElement): void {
    window.setTimeout(() => {
      hostContainer.style.visibility = "visible";
    }, 300);
  }

  private setReportPages(report: pbi.Report): void {
    report.getPages().then((pages: Array<pbi.Page>) => {
      this.pageNavigationCallback(pages);
    });
  }
}
