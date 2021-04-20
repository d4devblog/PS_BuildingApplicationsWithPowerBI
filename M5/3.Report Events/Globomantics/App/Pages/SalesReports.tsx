import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import PowerBIReport, { IReportButtonFunction } from "../Components/PowerBIReport";

export function SalesReports(props) {
  const useStyles = makeStyles(theme => ({
    paper: {
      background: theme.palette.type == "light" ? "#fff" : "#474747"
    },
    reportContainer: {
      minHeight: "calc(100vw * 0.50)"
    }
  }));

    const classes = useStyles(props.theme);

    const buttonEvents = new Array<IReportButtonFunction>();
    buttonEvents.push({
        buttonTitle: "NavigateToOrders",
        buttonFunction: () => { props.history.push("/orders"); }
    } as IReportButtonFunction);

  return (
    <Paper className={classes.paper}>
          <Box p={3} className={classes.reportContainer}>
              <PowerBIReport reportName="sales_v5" buttonEvents={buttonEvents} {...props} />
      </Box>
    </Paper>
  );
}
