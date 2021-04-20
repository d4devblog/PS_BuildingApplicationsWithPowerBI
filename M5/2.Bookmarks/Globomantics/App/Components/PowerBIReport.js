"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var useMediaQuery_1 = __importDefault(require("@material-ui/core/useMediaQuery"));
var ReportEmbedding_1 = require("./../PowerBI/ReportEmbedding");
var ReportMenu_1 = __importDefault(require("./ReportMenu"));
var ReportPages_1 = __importDefault(require("./ReportPages"));
function PowerBIReport(props) {
    var reportContainer = react_1.default.createRef();
    var reportEmbedding = new ReportEmbedding_1.ReportEmbedding(updatePageList, updateBookmarkList);
    var useStyles = styles_1.makeStyles(function (theme) { return ({
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
    }); });
    var theme = styles_1.useTheme();
    var isMobileViewport = useMediaQuery_1.default(theme.breakpoints.down("xs"), {
        noSsr: true
    });
    var classes = useStyles(props.theme);
    react_1.useEffect(function () {
        reportEmbedding.embedReport(props.reportName, reportContainer.current, isMobileViewport, theme.palette.type);
    }, []);
    var _a = react_1.useState(new Array()), pages = _a[0], updatePageState = _a[1];
    var _b = react_1.useState(new Array()), bookmarks = _b[0], updateBookmarkState = _b[1];
    function updatePageList(pages) {
        updatePageState(pages);
    }
    function updateBookmarkList(bookmarks) {
        updateBookmarkState(bookmarks);
    }
    // Pages
    function selectPage(page) {
        reportEmbedding.selectPage(page, reportContainer.current);
    }
    var reportPages = (react_1.default.createElement(ReportPages_1.default, __assign({ pageChangeHandler: selectPage, pages: pages }, props)));
    // Menu Items (Bookmarks)
    function selectBookmark(bookmark) {
        reportEmbedding.selectBookmark(bookmark, reportContainer.current);
    }
    var menuItems = bookmarks.map(function (bookmark) {
        return {
            name: bookmark.displayName,
            action: function () { return selectBookmark(bookmark); }
        };
    });
    var reportMenu;
    if (menuItems.length > 0) {
        reportMenu = react_1.default.createElement(ReportMenu_1.default, { menuItems: menuItems });
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: classes.reportOptionsContainer },
            reportPages,
            reportMenu),
        react_1.default.createElement("div", { className: classes.reportWrapper },
            react_1.default.createElement("div", { ref: reportContainer, className: classes.container }))));
}
exports.default = PowerBIReport;
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
