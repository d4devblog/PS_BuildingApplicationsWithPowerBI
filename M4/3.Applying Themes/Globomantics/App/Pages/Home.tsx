import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
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

  const theme = useTheme();
  const classes = useStyles(props.theme);
  const dashboardName =
    theme.palette.type === "dark"
      ? "GlobomanticsHome_Dark"
      : "GlobomanticsHome_Light";

  return (
    <Box className={classes.dashboardContainer}>
      <PowerBIDashboard dashboardName={dashboardName} {...props} />
    </Box>
  );
}
