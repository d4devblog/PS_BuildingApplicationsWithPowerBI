import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TileEmbedding } from "./../PowerBI/TileEmbedding";

export interface IReportProps {
  dashboardName: string;
  tileName: string;
  theme: Theme;
}

export default function PowerBIDashboard(props: IReportProps) {
  const tileContainer = React.createRef<HTMLDivElement>();
  const tileEmbedding = new TileEmbedding();

  const useStyles = makeStyles(theme => ({
    container: {
      height: "100%"
    }
  }));

  const classes = useStyles(props.theme);

  useEffect(() => {
    tileEmbedding.embedTile(
      props.dashboardName,
      props.tileName,
      tileContainer.current
    );
  }, []);

  return <div ref={tileContainer} className={classes.container} />;
}
