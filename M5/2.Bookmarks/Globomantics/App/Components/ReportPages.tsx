import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as pbi from "powerbi-client";

export interface IReportPagesProps {
  pages: Array<pbi.Page>;
  pageChangeHandler: (page: pbi.Page) => void;
  theme: Theme;
}

export default function ReportPages(props: IReportPagesProps) {
  const useStyles = makeStyles(theme => ({
    pageListContainer: {
      float: "left"
    },
    button: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles(props.theme);

  const pageList = props.pages.map(page => {
    if (page.visibility === pbi.models.SectionVisibility.HiddenInViewMode) {
      return null;
    } else if (page.isActive) {
      return (
        <Button key={page.name} className={classes.button} color="primary">
          {page.displayName}
        </Button>
      );
    } else {
      return (
        <Button
          key={page.name}
          className={classes.button}
          onClick={() => props.pageChangeHandler(page)}
        >
          {page.displayName}
        </Button>
      );
    }
  });

  return <div className={classes.pageListContainer}>{pageList}</div>;
}
