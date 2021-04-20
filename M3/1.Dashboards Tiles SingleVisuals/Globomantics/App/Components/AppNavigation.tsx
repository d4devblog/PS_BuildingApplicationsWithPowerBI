import React from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertChart from "@material-ui/icons/InsertChart";
import Receipt from "@material-ui/icons/Receipt";
import Home from "@material-ui/icons/Home";
import Shipping from "@material-ui/icons/LocalShipping";
import { BrowserRouter as Router, Link } from "react-router-dom";

export interface IProps {
  theme: Theme;
  navigationWidth: number;
}

export function AppNavigation(props: IProps) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex"
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      overflowX: "hidden"
    },
    drawerPaper: {
      width: drawerWidth,
      background: "linear-gradient(45deg, #4316A6 30%, #5207F2 90%)",
      overflowX: "hidden"
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    },
    listItem: {
      color: theme.palette.common.white
    },
    listIcon: {
      color: theme.palette.common.white
    }
  }));

  const drawerWidth = props.navigationWidth;
  const classes = useStyles(props.theme);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      <div className={classes.toolbar}>
        <span
          className={drawerWidth > 60 ? "nav-logo" : "nav-logo-small"}
          aria-label="Globomantics Logo"
        >
          Globomantics
        </span>
      </div>
      <Divider />
      <List>
        <Link to="/">
          <ListItem button className={classes.listItem}>
            <ListItemIcon title="Home">
              <Home className={classes.listIcon} />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        <Link to="/sales-reports/">
          <ListItem button className={classes.listItem}>
            <ListItemIcon title="Sales Reports">
              <InsertChart className={classes.listIcon} />
            </ListItemIcon>
            <ListItemText primary={"Sales Reports"} />
          </ListItem>
        </Link>
        <Link to="/purchasing/">
          <ListItem button className={classes.listItem}>
            <ListItemIcon title="Purchasing">
              <Receipt className={classes.listIcon} />
            </ListItemIcon>
            <ListItemText primary={"Purchasing"} />
          </ListItem>
        </Link>
        <Link to="/orders/">
          <ListItem button className={classes.listItem}>
            <ListItemIcon title="Orders">
              <Shipping className={classes.listIcon} />
            </ListItemIcon>
            <ListItemText primary={"Orders"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Drawer>
  );
}
