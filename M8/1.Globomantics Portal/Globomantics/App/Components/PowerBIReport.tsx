import React, { useEffect, useState } from "react";
import { useTheme, makeStyles, Theme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as pbi from "powerbi-client";
import { ReportEmbedding } from "./../PowerBI/ReportEmbedding";
import { ICustomEvent } from "service";
import ReportMenu, { IReportMenuItem } from "./ReportMenu";
import ReportPages from "./ReportPages";
import ReportFilters from "./ReportFilters";
import { IFilterConfiguration } from "../PowerBI/FilterBuilder";
import { ISelection, ICommandExtension } from "powerbi-models";
import { Button } from "@material-ui/core";

export interface IReportButtonFunction {
  buttonTitle: string;
  buttonFunction: Function;
}

export interface IReportCustomCommand {
  commandName: string;
  commandTitle: string;
  commandFunction: (selection: ISelection) => void;
}

export interface IReportExternalAction {
  actionTitle: string;
  actionFunction: (report: pbi.Report) => void;
}

export interface IReportProps {
  reportName: string;
  theme: Theme;
  buttonFunctions: Array<IReportButtonFunction>;
  filterConfiguration: IFilterConfiguration;
  reportCommands: Array<IReportCustomCommand>;
  externalActions: Array<IReportExternalAction>;
}

export default function PowerBIReport(props: IReportProps) {
  const reportContainer = React.createRef<HTMLDivElement>();
  const reportEmbedding = new ReportEmbedding(
    updatePageList,
    updateBookmarkList,
    handleButtonClickEvent,
    commandCallback,
    renderCompleteCallback
  );

  const useStyles = makeStyles(theme => ({
    container: {
      height: isMobileViewport ? "calc(100vh - 140px)" : "100%",
      visibility: "hidden"
    },
    reportWrapper: {
      minHeight: "200px",
      backgroundImage: "url('/images/globomantics_loader.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      backgroundSize: "200px 200px"
    },
    button: {
      margin: theme.spacing(1)
    },
    reportOptionsContainer: {
      borderBottom: "1px solid #eaeaea",
      marginBottom: "10px",
      display: "inline-block",
      width: "100%"
    }
  }));

  const theme = useTheme();
  const isMobileViewport = useMediaQuery(theme.breakpoints.down("xs"), {
    noSsr: true
  });

  const classes = useStyles(props.theme);

  const commands: Array<
    pbi.models.ICommandExtension
  > = props.reportCommands.map(command => {
    return {
      name: command.commandName,
      title: command.commandTitle,
      extend: {
        visualContextMenu: { title: command.commandTitle },
        visualOptionsMenu: { title: command.commandTitle }
      }
    } as ICommandExtension;
  });

  useEffect(() => {
    reportEmbedding.embedReport(
      props.reportName,
      reportContainer.current,
      isMobileViewport,
      theme.palette.type,
      commands
    );
  }, []);

  const [pages, updatePageState] = useState(new Array<pbi.Page>());
  const [bookmarks, updateBookmarkState] = useState(
    new Array<pbi.models.IReportBookmark>()
  );

  function updatePageList(pages: pbi.Page[]): void {
    updatePageState(pages);
  }

  function updateBookmarkList(bookmarks: pbi.models.IReportBookmark[]): void {
    updateBookmarkState(bookmarks);
  }

  function handleButtonClickEvent(event: ICustomEvent<any>): void {
    if (props.buttonFunctions) {
      var matchedEvent = props.buttonFunctions.find(
        x => x.buttonTitle == event.detail.title
      );
      if (matchedEvent) {
        matchedEvent.buttonFunction();
      }
    }
  }

  // Pages
  function selectPage(page: pbi.Page): void {
    reportEmbedding.selectPage(page, reportContainer.current);
  }

  const reportPages = (
    <ReportPages pageChangeHandler={selectPage} pages={pages} {...props} />
  );

  // Menu Items (Bookmarks)
  function selectBookmark(bookmark: pbi.models.IReportBookmark): void {
    reportEmbedding.selectBookmark(bookmark, reportContainer.current);
  }

  const menuItems = bookmarks.map(bookmark => {
    return {
      name: bookmark.displayName,
      action: () => selectBookmark(bookmark)
    } as IReportMenuItem;
  });

  let reportMenu;
  if (menuItems.length > 0) {
    reportMenu = <ReportMenu menuItems={menuItems} />;
  }

  // Report Filters
  function filterCallback(filters: Array<pbi.models.IFilter>): void {
    reportEmbedding.applyReportFilters(filters, reportContainer.current);
  }

  let reportFilters;
  reportFilters = (
    <ReportFilters
      applyFilterCallback={filterCallback}
      filterConfiguration={props.filterConfiguration}
      {...props}
    />
  );

  // Report Commands
  function commandCallback(
    commandName: string,
    selection: pbi.models.ISelection
  ) {
    if (props.reportCommands) {
      var matchedCommand = props.reportCommands.find(
        x => x.commandName == commandName
      );

      if (matchedCommand) {
        matchedCommand.commandFunction(selection);
      }
    }
  }

  // External Actions
  const [renderComplete, setRenderComplete] = useState(false);
  function renderCompleteCallback(): void {
    setRenderComplete(true);
  }

  let externalActions;
  if (props.externalActions.length > 0 && renderComplete) {
    externalActions = (
      <div>
        {props.externalActions.map(action => {
          return (
            <Button
              key={action.actionTitle}
              size="small"
              onClick={() => externalActionHandler(action)}
            >
              {action.actionTitle}
            </Button>
          );
        })}
      </div>
    );
  }

  function externalActionHandler(externalAction: IReportExternalAction): void {
    const report = reportEmbedding.getReportInstance(reportContainer.current);
    externalAction.actionFunction(report);
  }

  // Power BI Report Component
  return (
    <div>
      <div className={classes.reportOptionsContainer}>
        {reportPages}
        {reportMenu}
        {reportFilters}
      </div>
      <div className={classes.reportWrapper}>
        <div ref={reportContainer} className={classes.container} />
      </div>
      {externalActions}
    </div>
  );
}
