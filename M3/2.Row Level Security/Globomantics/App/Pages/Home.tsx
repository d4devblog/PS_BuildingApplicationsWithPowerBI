import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import PowerBIDashboard from "../Components/PowerBIDashboard";

export function Home(props) {
  const useStyles = makeStyles(theme => ({
    paper: {
      background: theme.palette.type == "light" ? "#fff" : "#474747"
    },
    dashboardContainer: {
      height: "calc(100vh - 100px)"
    }
  }));

  const classes = useStyles(props.theme);

  return (
    <Box className={classes.dashboardContainer}>
      <PowerBIDashboard dashboardName="GlobomanticsHome" {...props} />
    </Box>
  );
}
