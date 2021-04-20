import React, { useState } from "react";
import { Theme, MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";

// components
import * as AppHeader from "./components/AppHeader";
import { AppNavigation } from "./components/AppNavigation";

// pages
import { Home } from "./pages/home";
import { Purchasing } from "./pages/purchasing";
import { SalesReports } from "./pages/salesReports";
import { Orders } from "./pages/orders";

// theme
import DefaultTheme from "./theme/default";
import DarkTheme from "./theme/dark";
const defaultTheme = new DefaultTheme().theme;
const darkTheme = new DarkTheme().theme;

export function App(props) {
  const useStyles = makeStyles(theme => ({
    main: {
      marginLeft: navigationWidth,
      padding: 15
    }
  }));

  const [theme, setTheme] = useState(defaultTheme);
  const toggleTheme = () => {
    let newTheme = theme.palette.type === "light" ? darkTheme : defaultTheme;
    setTheme(newTheme);
  };

  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const navigationWidth: number = matches ? 240 : 60;

  const classes = useStyles(theme);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <AppHeader.default
          theme={theme}
          toggleTheme={toggleTheme}
          navigationWidth={navigationWidth}
        />
        <AppNavigation
          theme={theme}
          navigationWidth={navigationWidth}
          {...props}
        />
        <main className={classes.main}>
          <Route path="/" exact component={Home} />
          <Route path="/sales-reports/" component={SalesReports} />
          <Route path="/purchasing/" component={Purchasing} />
          <Route path="/orders/" component={Orders} />
        </main>
      </Router>
    </MuiThemeProvider>
  );
}
