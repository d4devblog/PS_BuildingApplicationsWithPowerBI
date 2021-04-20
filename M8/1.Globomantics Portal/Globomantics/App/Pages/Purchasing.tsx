import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import PowerBISingleVisual from "../Components/PowerBISingleVisual";
import * as DataPointReader from "../Utils/DataPointReader";
import * as pbi from "powerbi-client";
import { ICustomEvent } from "service";

interface IStockChangeRequest {
  type: string;
  productCode: string;
  amount: string;
}

export function Purchasing(props) {
  const useStyles = makeStyles(theme => ({
    card: {
      background: theme.palette.type == "light" ? "#fff" : "#474747"
    },
    paper: {
      background: theme.palette.type == "light" ? "#fff" : "#474747"
    },
    subtleText: {
      color: theme.palette.text.secondary
    },
    formElement: {
      margin: theme.spacing(1),
      minWidth: 180
    },
    tileContainer: {
      height: 300
    }
  }));
  const classes = useStyles(props.theme);

  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const [stockRequest, updateStockRequest] = useState({
    type: "",
    productCode: "",
    amount: ""
  } as IStockChangeRequest);
  const handleValueChange = name => event => {
    updateStockRequest({ ...stockRequest, [name]: event.target.value });
  };

  function handleFormSubmit() {
    updateStockRequest({
      type: "",
      productCode: "",
      amount: ""
    } as IStockChangeRequest);
    setConfirmationOpen(true);
  }

  function lowStockDataSelectionHandler(
    selection: ICustomEvent<pbi.models.ISelection>
  ): void {
    if (selection.detail.dataPoints.length > 0) {
      const selectedProduct = DataPointReader.readDataPoint(
        selection.detail,
        "Products",
        "ProductCode"
      );

      updateStockRequest({
        ...stockRequest,
        productCode: selectedProduct,
        type: "increase"
      });
    } else {
      updateStockRequest({ ...stockRequest, productCode: "", type: "" });
    }
  }

  function highStockDataSelectionHandler(
    selection: ICustomEvent<pbi.models.ISelection>
  ): void {
    if (selection.detail.dataPoints.length > 0) {
      const selectedProduct = DataPointReader.readDataPoint(
        selection.detail,
        "Products",
        "ProductCode"
      );

      updateStockRequest({
        ...stockRequest,
        productCode: selectedProduct,
        type: "sell"
      });
    } else {
      updateStockRequest({ ...stockRequest, productCode: "", type: "" });
    }
  }

  const productCodes: Array<string> = [
    "a-0321t",
    "a-0341t",
    "a-0351t",
    "a-0361t",
    "a-0381t",
    "a-0391t",
    "a-0401t",
    "a-0431t",
    "a-0501t",
    "a-0551t",
    "a-0651t",
    "a-0751t",
    "a-0851t",
    "a-1951t",
    "c-0321r",
    "c-0331r",
    "c-0341r",
    "c-0351r",
    "c-0361r",
    "c-0371r",
    "c-0381r",
    "c-0391r",
    "c-0401r",
    "c-0411r",
    "c-0421r",
    "c-0431r",
    "c-0441r",
    "c-0451r",
    "c-0551r",
    "c-0651r",
    "c-0751r",
    "c-1386r",
    "c-1387r",
    "c-1388r",
    "c-1390r",
    "c-1400r",
    "c-1451r",
    "c-1481r",
    "c-1501r",
    "c-1551r",
    "c-1601r",
    "c-1701r",
    "c-1801r",
    "c-1851r",
    "ca-0311z",
    "ca-0321z",
    "ca-0331z",
    "ca-0341z",
    "ca-0351z",
    "ca-0361z",
    "ca-0371z",
    "ca-0381z",
    "ca-0391z",
    "ca-0394z",
    "ca-0401z",
    "ca-0421z",
    "ca-0431z",
    "ca-0444z",
    "ca-0445z",
    "ca-0446z",
    "ca-0460z",
    "ca-0480z",
    "ca-0490z",
    "ca-0491z",
    "ca-0492z",
    "l-0201s",
    "l-0211s",
    "l-0221s",
    "l-0231s",
    "l-0241s",
    "l-0251s",
    "l-0261s",
    "l-0271s",
    "l-0281s",
    "l-0291s",
    "l-0301s",
    "l-0401s",
    "t-0101x",
    "t-0122x",
    "t-0133x",
    "t-0144x",
    "t-0155x",
    "t-0166x",
    "t-0177x",
    "t-0188x",
    "t-0199x",
    "t-0211x",
    "t-0222x"
  ];

  return (
    <div>
      <Grid container direction="row" spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Box className={classes.tileContainer}>
                <PowerBISingleVisual
                  reportName="PurchasingTiles_v1"
                  pageName="ReportSectione4379a349bdbc0ffabb1"
                  visualName="eca581019a399acc9638"
                  dataSelectionCallback={lowStockDataSelectionHandler}
                  {...props}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Box className={classes.tileContainer}>
                <PowerBISingleVisual
                  reportName="PurchasingTiles_v1"
                  pageName="ReportSectione4379a349bdbc0ffabb1"
                  visualName="cfdf6e8cdb3f71b7d4ad"
                  dataSelectionCallback={highStockDataSelectionHandler}
                  {...props}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper className={classes.paper}>
        <Box mt={2} p={2}>
          <Box mb={3}>
            <Typography variant="h6">Stock Change Request</Typography>
            <Typography variant="body2" className={classes.subtleText}>
              Ensure stock change requests are validated before submission.
            </Typography>
            <Divider />
          </Box>
          <div>
            <FormControl className={classes.formElement}>
              <InputLabel htmlFor="StockModification">
                Action Required
              </InputLabel>
              <Select
                native
                inputProps={{ id: "StockModification" }}
                value={stockRequest.type}
              >
                <option value="">-</option>
                <option value="increase">Increase Stock</option>
                <option value="sell">Sell Excess Stock</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formElement}>
              <InputLabel htmlFor="StockType">Product Code</InputLabel>
              <Select
                inputProps={{ id: "StockType", name: "stock-type" }}
                value={stockRequest.productCode}
                onChange={handleValueChange("productCode")}
              >
                <MenuItem value={""}>-</MenuItem>
                {productCodes.map(code => {
                  return (
                    <MenuItem key={code} value={code}>
                      {code}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formElement}>
              <TextField
                label="Amount"
                value={stockRequest.amount}
                onChange={handleValueChange("amount")}
              />
            </FormControl>
          </div>
          <div>
            <Button color="primary" onClick={handleFormSubmit}>
              Submit Request
            </Button>
          </div>
        </Box>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={confirmationOpen}
        autoHideDuration={6000}
        onClose={handleConfirmationClose}
        color="primary"
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Stock Request Submitted</span>}
      />
    </div>
  );
}
