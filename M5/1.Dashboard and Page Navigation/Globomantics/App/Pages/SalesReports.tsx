import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import PowerBIReport from "../Components/PowerBIReport";

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

  return (
    <Paper className={classes.paper}>
      <Box p={3} className={classes.reportContainer}>
        <PowerBIReport reportName="sales_v5" {...props} />
      </Box>
    </Paper>
  );
}
