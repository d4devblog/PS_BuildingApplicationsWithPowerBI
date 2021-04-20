import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { KeyboardDatePicker } from "@material-ui/pickers";
import * as models from "powerbi-models";
import {
  FilterBuilder,
  IFilterConfiguration,
  IFilterValues
} from "../PowerBI/FilterBuilder";

export interface IFilterProps {
  theme: Theme;
  filterConfiguration: IFilterConfiguration;
  applyFilterCallback: (filters: Array<models.IFilter>) => void;
}

export default function ReportFilters(props: IFilterProps) {
  const useStyles = makeStyles(theme => ({
    reportFilters: {
      float: "right",
      margin: "10px"
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    modalContent: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #f7f7f7",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 2),
      maxWidth: 450
    },
    header: {
      margin: "5, 0"
    },
    actions: {
      float: "right"
    },
    textField: {
      minWidth: 200,
      width: "50%"
    },
    formControl: {
      minWidth: 200,
      width: "100%"
    }
  }));

  const classes = useStyles(props.theme);
  const filterBuilder = new FilterBuilder();
  const [filterOpen, setFilterOpen] = useState(false);

  let defaultFilterValues = {
    orderId: "",
    locations: [],
    dateFrom: null,
    dateTo: null,
    totalSalesSelection: "",
    productCode: ""
  } as IFilterValues;

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleCancelFilter = () => {
    setFilterValues(appliedFilters);
    setFilterOpen(false);
  };
  const handleApplyFilter = () => {
    let powerBiFilterArray = filterBuilder.buildReportFilters(
      filterValues,
      props.filterConfiguration
    );
    props.applyFilterCallback(powerBiFilterArray);

    setAppliedFilters(filterValues);
    setFilterOpen(false);
  };

  const [appliedFilters, setAppliedFilters] = useState(defaultFilterValues);
  const [filterValues, setFilterValues] = useState(defaultFilterValues);

  const handleFilterValueChange = name => event => {
    setFilterValues({ ...filterValues, [name]: event.target.value });
  };

  const handleFilterDateValueChange = name => value => {
    if (value != null) {
      const date: Date = value.$d;
      date.setHours(0, 0, 0, 0);

      if (name === "dateTo") {
        date.setHours(23, 59, 59, 0);
      }

      setFilterValues({ ...filterValues, [name]: value.$d });
    } else {
      setFilterValues({ ...filterValues, [name]: null });
    }
  };

  // Order Id Filter
  let orderFilter;
  if (props.filterConfiguration.filterOrderId) {
    orderFilter = (
      <Grid item xs={12}>
        <TextField
          id="orderId"
          label="Order Id"
          className={classes.textField}
          value={filterValues.orderId}
          onChange={handleFilterValueChange("orderId")}
          margin="dense"
        />
      </Grid>
    );
  }

  const locationOptions = [
    "Atlanta",
    "Baltimore",
    "Cincinnati",
    "Denver",
    "Houston",
    "Memphis",
    "Miami",
    "Portland",
    "Salt Lake City",
    "Seattle"
  ];

  const locationStyle = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 250
      }
    }
  };

  // Location Filter
  let locationFilter;
  if (props.filterConfiguration.filterLocations) {
    locationFilter = (
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Locations</InputLabel>
          <Select
            multiple
            value={filterValues.locations}
            onChange={handleFilterValueChange("locations")}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={(selected: any) => selected.join(", ")}
            MenuProps={locationStyle}
          >
            {locationOptions.map(loc => (
              <MenuItem key={loc} value={loc}>
                <Checkbox
                  color="primary"
                  checked={filterValues.locations.indexOf(loc) > -1}
                />
                <ListItemText primary={loc} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  }

  // Dates (from and to)
  let dateFilters;
  if (props.filterConfiguration.filterOrderDates) {
    dateFilters = (
      <Grid item xs={12}>
        <KeyboardDatePicker
          margin="normal"
          id="date-from"
          label="Order Date From"
          format="DD/MMM/YY"
          disableFuture={true}
          value={filterValues.dateFrom}
          onChange={handleFilterDateValueChange("dateFrom")}
          KeyboardButtonProps={{
            "aria-label": "change order from date"
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-to"
          label="Order Date To"
          format="DD/MMM/YY"
          disableFuture={true}
          value={filterValues.dateTo}
          onChange={handleFilterDateValueChange("dateTo")}
          KeyboardButtonProps={{
            "aria-label": "change order to date"
          }}
        />
      </Grid>
    );
  }

  // Total Sales Range
  let salesFilter;
  if (props.filterConfiguration.filterTotalSales) {
    salesFilter = (
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="total-sales">Sale Value</InputLabel>
          <Select
            value={filterValues.totalSalesSelection}
            onChange={handleFilterValueChange("totalSalesSelection")}
            inputProps={{
              name: "Sale Value",
              id: "total-sales"
            }}
          >
            <MenuItem value={"all"}>Show All</MenuItem>
            <MenuItem value={"small"}>Small - Under $250</MenuItem>
            <MenuItem value={"large"}>Large - Over $250</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    );
  }

  // Product Code
  let productCodeFilter;
  if (props.filterConfiguration.filterProductCode) {
    productCodeFilter = (
      <Grid item xs={12}>
        <TextField
          id="product-code"
          label="Product Code"
          className={classes.textField}
          value={filterValues.productCode}
          onChange={handleFilterValueChange("productCode")}
          margin="dense"
        />
      </Grid>
    );
  }

  return (
    <div className={classes.reportFilters}>
      <IconButton
        aria-haspopup="true"
        title={props.filterConfiguration.title}
        size="small"
        onClick={handleOpenFilter}
      >
        <FilterListIcon />
      </IconButton>
      <Modal open={filterOpen} className={classes.modal}>
        <div className={classes.modalContent}>
          <h2 className={classes.header}>{props.filterConfiguration.title}</h2>
          <Grid container spacing={2} direction="row" justify="flex-start">

            {orderFilter}
            {locationFilter}
            {dateFilters}
            {salesFilter}
            {productCodeFilter}

            <Grid item xs={12}>
              <div className={classes.actions}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleApplyFilter}
                >
                  Apply
                </Button>
                <Button onClick={handleCancelFilter}>Cancel</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
