import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export interface IReportMenuItem {
  name: string;
  action: Function;
}

export interface IReportMenuProps {
  menuItems: Array<IReportMenuItem>;
}

export default function ReportMenu(props) {
  const useStyles = makeStyles(theme => ({
    reportMenu: {
      float: "right",
      margin: "10px"
    }
  }));

  const classes = useStyles(props.theme);

  const [menuElement, setMenuElement] = React.useState<null | HTMLElement>(
    null
  );

  const menuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuElement(event.currentTarget);
  };

  const menuClose = () => {
    setMenuElement(null);
  };

  return (
    <div className={classes.reportMenu}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        size="small"
        onClick={menuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={menuElement}
        keepMounted
        open={Boolean(menuElement)}
        onClose={menuClose}
      >
        {props.menuItems.map(menuItem => {
          return (
            <MenuItem
              key={menuItem.name}
              onClick={() => {
                menuClose();
                menuItem.action();
              }}
            >
              {menuItem.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}