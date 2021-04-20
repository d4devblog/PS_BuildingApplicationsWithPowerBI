import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import PowerBIReport, {
  IReportCustomCommand,
  IReportExternalAction
} from "../Components/PowerBIReport";
import { IFilterConfiguration } from "../PowerBI/FilterBuilder";
import { ISelection } from "powerbi-models";
import * as DataPointReader from "../Utils/DataPointReader";
import * as ReportDataExport from "../Utils/ReportDataExport";
import OrderDetailDialog, {
  IDialogValues
} from "../Components/OrderDetailsDialog";

export function Orders(props) {
  const useStyles = makeStyles(theme => ({
    paper: {
      background: theme.palette.type == "light" ? "#fff" : "#474747"
    },
    reportContainer: {
      minHeight: "calc(100vw * 0.50)"
    }
  }));

  const classes = useStyles(props.theme);

  const [downloadTriggered, setdownloadTriggered] = React.useState(false);
  const handleDownloadNotification = () => {
    setdownloadTriggered(false);
  };

  const [orderDialogOpen, setOrderDialogOpen] = React.useState(false);
  const [orderDialogValues, setOrderDialogValues] = React.useState(
    {} as IDialogValues
  );

  const filterConfig = {
    title: "Filter Orders:",
    filterOrderId: true,
    filterLocations: true,
    filterOrderDates: true,
    filterTotalSales: true,
    filterProductCode: true
  } as IFilterConfiguration;

  const commands = new Array<IReportCustomCommand>();
  commands.push({
    commandName: "ViewDetails",
    commandTitle: "Show Order Details",
    commandFunction: (selection: ISelection) => {
      let orderId = DataPointReader.readDataPoint(
        selection,
        "Orders",
        "OrderId"
      );
      let customerId = DataPointReader.readDataPoint(
        selection,
        "Orders",
        "CustomerId"
      );
      let orderDate = DataPointReader.readDataPoint(
        selection,
        "Orders",
        "OrderDate"
      );

      setOrderDialogValues({
        orderId: orderId,
        customerId: customerId,
        orderDate: orderDate
      } as IDialogValues);

      setOrderDialogOpen(true);
    }
  } as IReportCustomCommand);

  const externalActions = new Array<IReportExternalAction>();
  externalActions.push({
    actionTitle: "Export Recent Orders",
    actionFunction: (report: any) => {
      ReportDataExport.exportReportData(
        report,
        0,
        "RecentOrders",
        "RecentOrders.csv"
      );
      setdownloadTriggered(true);
    }
  } as IReportExternalAction);

  const downloadNotification = (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={downloadTriggered}
      autoHideDuration={6000}
      onClose={handleDownloadNotification}
      color="primary"
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">Downloading Recent Orders...</span>}
    />
  );

  const orderDetailDialog = (
    <OrderDetailDialog
      dialogOpen={orderDialogOpen}
      dialogValues={orderDialogValues}
      closeDialogFunction={() => setOrderDialogOpen(false)}
      {...props}
    />
  );

  return (
    <Paper className={classes.paper}>
      <Box p={3} className={classes.reportContainer}>
        <PowerBIReport
          reportName="Orders"
          filterConfiguration={filterConfig}
          reportCommands={commands}
          externalActions={externalActions}
          {...props}
        />
      </Box>
      {downloadNotification}
      {orderDetailDialog}
    </Paper>
  );
}
