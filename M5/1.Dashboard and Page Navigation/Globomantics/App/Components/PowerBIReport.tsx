import React, { useEffect, useState } from "react";
import { useTheme, makeStyles, Theme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import * as pbi from "powerbi-client";
import { ReportEmbedding } from "./../PowerBI/ReportEmbedding";
import ReportPages from "./ReportPages";

export interface IReportProps {
  reportName: string;
  theme: Theme;
}

export default function PowerBIReport(props: IReportProps) {
  const reportContainer = React.createRef<HTMLDivElement>();
  const reportEmbedding = new ReportEmbedding(updatePageList);

  const useStyles = makeStyles(theme => ({
    container: {
      height: isMobileViewport ? "calc(100vh - 140px)" : "100%",
      visibility: "hidden"
    },
    reportWrapper: {
      minheight: "200px",
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

  useEffect(() => {
    reportEmbedding.embedReport(
      props.reportName,
      reportContainer.current,
      isMobileViewport,
      theme.palette.type
    );
  }, []);

  const [pages, updatePageState] = useState(new Array<pbi.Page>());

  function updatePageList(pages: pbi.Page[]): void {
    updatePageState(pages);
  }

  function selectPage(page: pbi.Page): void {
    reportEmbedding.selectPage(page, reportContainer.current);
  }

  const reportPages = (
    <ReportPages pageChangeHandler={selectPage} pages={pages} {...props} />
  );

  return (
    <div>
      <div className={classes.reportOptionsContainer}>{reportPages}</div>
      <div className={classes.reportWrapper}>
        <div ref={reportContainer} className={classes.container} />
      </div>
    </div>
  );
}
