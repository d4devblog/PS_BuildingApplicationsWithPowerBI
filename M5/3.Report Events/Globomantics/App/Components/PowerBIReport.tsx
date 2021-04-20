import React, { useEffect, useState } from "react";
import { useTheme, makeStyles, Theme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as pbi from "powerbi-client";
import { ReportEmbedding } from "./../PowerBI/ReportEmbedding";
import { ICustomEvent } from "service";
import ReportMenu, { IReportMenuItem } from "./ReportMenu";
import ReportPages from "./ReportPages";

export interface IReportButtonFunction {
  buttonTitle: string;
  buttonFunction: Function;
}

export interface IReportProps {
  reportName: string;
  theme: Theme;
  buttonEvents: Array<IReportButtonFunction>;
}

export default function PowerBIReport(props: IReportProps) {
  const reportContainer = React.createRef<HTMLDivElement>();
  const reportEmbedding = new ReportEmbedding(
    updatePageList,
    updateBookmarkList,
    handleButtonClickEvent
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
    },
    reportMenu: {
      float: "right",
      margin: "10px"
    }
  }));

  const theme = useTheme();
  const isMobileViewport = useMediaQuery(theme.breakpoints.down("xs"), {
    noSsr: true
  });

  const classes = useStyles(props.theme);

  useEffect(() => {
    reportEmbedding.embedReport(
      props.reportName,
      reportContainer.current,
      isMobileViewport,
      theme.palette.type
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
    if (props.buttonEvents) {
      var matchedEvent = props.buttonEvents.find(
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

  return (
    <div>
      <div className={classes.reportOptionsContainer}>
        {reportPages}
        {reportMenu}
      </div>
      <div className={classes.reportWrapper}>
        <div ref={reportContainer} className={classes.container} />
      </div>
    </div>
  );
}
