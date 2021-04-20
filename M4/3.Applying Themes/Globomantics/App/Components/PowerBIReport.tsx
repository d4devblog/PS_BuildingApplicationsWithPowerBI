import React, { useEffect } from "react";
import { useTheme, makeStyles, Theme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ReportEmbedding } from "./../PowerBI/ReportEmbedding";

export interface IReportProps {
  reportName: string;
  theme: Theme;
}

export default function PowerBIReport(props: IReportProps) {
  const reportContainer = React.createRef<HTMLDivElement>();
  const reportEmbedding = new ReportEmbedding();

  const useStyles = makeStyles(theme => ({
    container: {
      height: isMobileViewport ? "calc(100vh - 140px)" : "100%",
      visibility: "hidden"
    },
    reportWrapper: {
      height: "200px",
      backgroundImage: "url('/images/globomantics_loader.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      backgroundSize: "contain"
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

  return (
    <div className={classes.reportWrapper}>
      <div ref={reportContainer} className={classes.container} />
    </div>
  );
}
