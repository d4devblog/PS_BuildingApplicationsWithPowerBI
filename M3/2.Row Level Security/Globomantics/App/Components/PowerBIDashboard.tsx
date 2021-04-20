import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
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

  const classes = useStyles(props.theme);

  useEffect(() => {
    dashboardEmbedding.embedDashboard(
      props.dashboardName,
      dashboardContainer.current
    );
  }, []);

  return <div ref={dashboardContainer} className={classes.container} />;
}
