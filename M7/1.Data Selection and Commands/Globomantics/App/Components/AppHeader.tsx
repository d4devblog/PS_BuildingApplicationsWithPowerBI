import React, { useState } from "react";
import { Theme, fade, makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import { Typography, ClickAwayListener } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

export interface IProps {
  toggleTheme: any;
  theme: Theme;
  navigationWidth: number;
  location: any;
}

function AppHeader(props: IProps) {
  const useStyles = makeStyles(theme => ({
    root: {
      background: theme.palette.background.default, // "#fff",
      boxShadow: "none",
      marginLeft: props.navigationWidth,
      width: "auto"
    },
    title: {
      marginTop: 5,
      fontWeight: "lighter",
      color: theme.palette.text.primary
    },
    toolbarSearch: {
      marginLeft: "auto"
    },
    toolbarUser: {
      marginLeft: "auto",
      width: "100px",
      color: theme.palette.text.primary
    },
    userIcon: {
      marginLeft: 10
    },
    search: {
      position: "relative",
      color: theme.palette.text.primary,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.05),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.15)
      },
      marginTop: 2,
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 120,
        "&:focus": {
          width: 200
        }
      }
    }
  }));

  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles(props.theme);

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  function handleThemeChange() {
    props.toggleTheme();
    setOpen(false);
  }

  function handleLogoutRequest() {
    setOpen(false);
    window.location.href = "/auth/logout";
  }

  function getPageTitle() {
    let path: string = props.location.pathname.toString();
    path = path.replace(/\/|\\/gi, "");

    switch (path.toLowerCase()) {
      case "sales-reports":
        return "Sales Reports";
      case "purchasing":
        return "Purchasing";
      case "orders":
        return "Orders";
      default:
        return "Home";
    }
  }

  function getTitleSize() {
    if (props.navigationWidth > 60) {
      return "h5";
    } else {
      return "h6";
    }
  }

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar variant="regular">
        <Grid container direction="row" alignItems="center">
          <Grid item xs={9} sm={8}>
            <Typography
              variant={getTitleSize()}
              component="h1"
              className={classes.title}
            >
              {getPageTitle()}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={3}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
          <Grid item xs={1} sm={1}>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <IconButton
                id="user-icon"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                className={classes.userIcon}
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle />
              </IconButton>
            </ClickAwayListener>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={isOpen}
            >
              <MenuItem onClick={() => setOpen(false)}>Profile</MenuItem>
              <MenuItem onClick={() => handleThemeChange()}>
                Change Theme
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleLogoutRequest()}>Logout</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(AppHeader);
