import React, { useEffect } from "react";
import { useTheme, makeStyles, Theme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { DashboardEmbedding } from "./../PowerBI/DashboardEmbedding";

export interface IReportProps {
  dashboardName: string;
  theme: Theme;
}

export default function PowerBIDashboard(props: IReportProps) {
  const dashboardContainer = React.createRef<HTMLDivElement>();
  const dashboardEmbedding = new DashboardEmbedding();

  const useStyles = makeStyles(theme => ({
    container: {
      height: "100%"
    }
  }));

  const theme = useTheme();
  const isMobileViewport = useMediaQuery(theme.breakpoints.down("xs"), {
    noSsr: true
  });

  const classes = useStyles(props.theme);

  useEffect(() => {
    dashboardEmbedding.embedDashboard(
      props.dashboardName,
      dashboardContainer.current,
      isMobileViewport
    );
  }, []);

  return <div ref={dashboardContainer} className={classes.container} />;
}
