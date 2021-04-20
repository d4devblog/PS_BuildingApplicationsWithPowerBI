import React, { useEffect, useState } from "react";
import { useTheme, makeStyles, Theme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as pbi from "powerbi-client";
import { ReportEmbedding } from "./../PowerBI/ReportEmbedding";
import ReportMenu, { IReportMenuItem } from "./ReportMenu";
import ReportPages from "./ReportPages";

export interface IReportButtonFunction {
  buttonTitle: string;
  buttonFunction: Function;
}

export interface IReportProps {
  reportName: string;
  theme: Theme;
  buttonEvents: Array<IReportButtonFunction>;
}

export default function PowerBIReport(props: IReportProps) {
  const reportContainer = React.createRef<HTMLDivElement>();
  const reportEmbedding = new ReportEmbedding(
    updatePageList,
    updateBookmarkList
  );

  const useStyles = makeStyles(theme => ({
    container: {
      height: isMobileViewport ? "calc(100vh - 140px)" : "100%",
      visibility: "hidden"
    },
    reportWrapper: {
      minHeight: "200px",
      backgroundImage: "url('/images/globomantics_loader.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      backgroundSize: "200px 200px"
    },
    button: {
      margin: theme.spacing(1)
    },
    reportOptionsContainer: {
      borderBottom: "1px solid #eaeaea",
      marginBottom: "10px",
      display: "inline-block",
      width: "100%"
    },
    reportMenu: {
      float: "right",
      margin: "10px"
    }
  }));

  const theme = useTheme();
  const isMobileViewport = useMediaQuery(theme.breakpoints.down("xs"), {
    noSsr: true
  });

  const classes = useStyles(props.theme);

  useEffect(() => {
    reportEmbedding.embedReport(
      props.reportName,
      reportContainer.current,
      isMobileViewport,
      theme.palette.type
    );
  }, []);

  const [pages, updatePageState] = useState(new Array<pbi.Page>());
  const [bookmarks, updateBookmarkState] = useState(
    new Array<pbi.models.IReportBookmark>()
  );

  function updatePageList(pages: pbi.Page[]): void {
    updatePageState(pages);
  }

  function updateBookmarkList(bookmarks: pbi.models.IReportBookmark[]): void {
    updateBookmarkState(bookmarks);
  }

  // Pages
  function selectPage(page: pbi.Page): void {
    reportEmbedding.selectPage(page, reportContainer.current);
  }

  const reportPages = (
    <ReportPages pageChangeHandler={selectPage} pages={pages} {...props} />
  );

  // Menu Items (Bookmarks)
  function selectBookmark(bookmark: pbi.models.IReportBookmark): void {
    reportEmbedding.selectBookmark(bookmark, reportContainer.current);
  }

  const menuItems = bookmarks.map(bookmark => {
    return {
      name: bookmark.displayName,
      action: () => selectBookmark(bookmark)
    } as IReportMenuItem;
  });

  let reportMenu;
  if (menuItems.length > 0) {
    reportMenu = <ReportMenu menuItems={menuItems} />;
  }

  return (
    <div>
      <div className={classes.reportOptionsContainer}>
        {reportPages}
        {reportMenu}
      </div>
      <div className={classes.reportWrapper}>
        <div ref={reportContainer} className={classes.container} />
      </div>
    </div>
  );
}

//import React, { useEffect, useState } from "react";
//import { useTheme, makeStyles, Theme } from "@material-ui/core/styles";
//import useMediaQuery from "@material-ui/core/useMediaQuery";
//import Button from "@material-ui/core/Button";
//import Menu from "@material-ui/core/Menu";
//import MenuItem from "@material-ui/core/MenuItem";
//import IconButton from "@material-ui/core/IconButton";
//import MoreVertIcon from "@material-ui/icons/MoreVert";
//import * as pbi from "powerbi-client";
//import { ReportEmbedding } from "./../PowerBI/ReportEmbedding";

//export interface IReportProps {
//  reportName: string;
//  theme: Theme;
//}

//export default function PowerBIReport(props: IReportProps) {
//  const reportContainer = React.createRef<HTMLDivElement>();
//  const reportEmbedding = new ReportEmbedding(
//    updatePageList,
//    updateBookmarkList
//  );

//  const useStyles = makeStyles(theme => ({
//    container: {
//      height: isMobileViewport ? "calc(100vh - 140px)" : "100%",
//      visibility: "hidden"
//    },
//    reportWrapper: {
//      minHeight: "200px",
//      backgroundImage: "url('/images/globomantics_loader.png')",
//      backgroundRepeat: "no-repeat",
//      backgroundPosition: "50% 50%",
//      backgroundSize: "200px 200px"
//    },
//    button: {
//      margin: theme.spacing(1)
//    },
//    reportOptionsContainer: {
//      borderBottom: "1px solid #eaeaea",
//      marginBottom: "10px"
//    },
//    reportMenu: {
//      float: "right",
//      margin: "10px"
//    }
//  }));

//  const theme = useTheme();
//  const isMobileViewport = useMediaQuery(theme.breakpoints.down("xs"), {
//    noSsr: true
//  });

//  const classes = useStyles(props.theme);

//  useEffect(() => {
//    reportEmbedding.embedReport(
//      props.reportName,
//      reportContainer.current,
//      isMobileViewport,
//      theme.palette.type
//    );
//  }, []);

//  const [pages, updatePageState] = useState(new Array<pbi.Page>());
//  const [bookmarks, updateBookmarkState] = useState(
//    new Array<pbi.models.IReportBookmark>()
//  );

//  function updatePageList(pages: pbi.Page[]): void {
//    updatePageState(pages);
//  }

//  function selectPage(page: pbi.Page): void {
//    reportEmbedding.selectPage(page, reportContainer.current);
//  }

//  function updateBookmarkList(bookmarks: pbi.models.IReportBookmark[]): void {
//    updateBookmarkState(bookmarks);
//  }

//  function selectBookmark(bookmark: pbi.models.IReportBookmark): void {
//    reportEmbedding.selectBookmark(bookmark, reportContainer.current);
//    menuClose();
//  }

//  const pageList = pages.map(page => {
//    if (page.visibility === pbi.models.SectionVisibility.HiddenInViewMode) {
//      return null;
//    } else if (page.isActive) {
//      return (
//        <Button key={page.name} className={classes.button} color="primary">
//          {page.displayName}
//        </Button>
//      );
//    } else {
//      return (
//        <Button
//          key={page.name}
//          className={classes.button}
//          onClick={() => selectPage(page)}
//        >
//          {page.displayName}
//        </Button>
//      );
//    }
//  });

//  const [menuElement, setMenuElement] = React.useState<null | HTMLElement>(
//    null
//  );
//  const menuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
//    setMenuElement(event.currentTarget);
//  };
//  const menuClose = () => {
//    setMenuElement(null);
//  };

//  let bookmarkMenu;
//  if (bookmarks.length > 0) {
//    bookmarkMenu = (
//      <div className={classes.reportMenu}>
//        <IconButton
//          aria-label="more"
//          aria-controls="long-menu"
//          aria-haspopup="true"
//          size="small"
//          onClick={menuOpen}
//        >
//          <MoreVertIcon />
//        </IconButton>
//        <Menu
//          id="simple-menu"
//          anchorEl={menuElement}
//          keepMounted
//          open={Boolean(menuElement)}
//          onClose={menuClose}
//        >
//          {bookmarks.map(bookmark => {
//            return (
//              <MenuItem
//                key={bookmark.name}
//                onClick={() => selectBookmark(bookmark)}
//              >
//                {bookmark.displayName}
//              </MenuItem>
//            );
//          })}
//        </Menu>
//      </div>
//    );
//  }

//  return (
//    <div>
//      <div className={classes.reportOptionsContainer}>
//        {pageList}
//        {bookmarkMenu}
//      </div>
//      <div className={classes.reportWrapper}>
//        <div ref={reportContainer} className={classes.container} />
//      </div>
//    </div>
//  );
//}
