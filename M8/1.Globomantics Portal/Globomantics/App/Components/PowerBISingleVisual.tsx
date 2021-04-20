import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { SingleVisualEmbedding } from "./../PowerBI/SingleVisualEmbedding";
import * as pbi from "powerbi-client";
import { ICustomEvent } from "service";

export interface IVisualProps {
  reportName: string;
  pageName: string;
  visualName: string;
  theme: Theme;
  dataSelectionCallback: (
    dataSelection: ICustomEvent<pbi.models.ISelection>
  ) => void;
}

export default function PowerBIVisual(props: IVisualProps) {
  const reportContainer = React.createRef<HTMLDivElement>();
  const singleVisualEmbedding = new SingleVisualEmbedding(
    props.dataSelectionCallback
  );

  const useStyles = makeStyles(theme => ({
    container: {
      height: "100%",
      visibility: "hidden"
    },
    visualWrapper: {
      height: "100%",
      backgroundImage: "url('/images/globomantics_loader.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      backgroundSize: "contain"
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

  return (
    <div className={classes.visualWrapper}>
      <div ref={reportContainer} className={classes.container} />
    </div>
  );
}
