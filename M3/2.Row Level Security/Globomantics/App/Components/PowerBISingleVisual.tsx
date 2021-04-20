import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { SingleVisualEmbedding } from "./../PowerBI/SingleVisualEmbedding";

export interface IVisualProps {
  reportName: string;
  pageName: string;
  visualName: string;
  theme: Theme;
}

export default function PowerBIVisual(props: IVisualProps) {
  const reportContainer = React.createRef<HTMLDivElement>();
  const singleVisualEmbedding = new SingleVisualEmbedding();

  const useStyles = makeStyles(theme => ({
    container: {
      height: "100%"
    }
  }));

  const classes = useStyles(props.theme);

  useEffect(() => {
    singleVisualEmbedding.embedVisual(
      props.reportName,
      props.pageName,
      props.visualName,
      reportContainer.current
    );
  }, []);

  return <div ref={reportContainer} className={classes.container} />;
}
