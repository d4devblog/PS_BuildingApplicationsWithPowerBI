import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export function Orders(props) {
  const useStyles = makeStyles(theme => ({
    paper: {
      background: theme.palette.type == "light" ? "#fff" : "#474747"
    },
    search: {
      paddingBottom: 10
    }
  }));

  const classes = useStyles(props.theme);

  function createRow(
    orderId: number,
    customer: number,
    date: string,
    product: string,
    discount: string,
    total: string
  ) {
    return { orderId, customer, date, product, discount, total };
  }

  const dataRows = [
    createRow(40605, 3364, "Oct 11th", "t-0101x", "0.00", "3500.00"),
    createRow(40606, 2724, "Oct 11th", "ca-0351z", "0.00", "92.50"),
    createRow(40607, 2729, "Oct 11th", "ca-0492z", "0.00", "40.50"),
    createRow(40608, 2420, "Oct 11th", "t-0222x", "0.00", "1150.50"),
    createRow(40609, 5096, "Oct 11th", "ca-0381z", "0.00", "82.10"),
    createRow(40610, 5126, "Oct 11th", "ca-0491z", "0.00", "42.50"),
    createRow(40611, 5112, "Oct 11th", "t-0188x", "0.00", "1600.50"),
    createRow(40612, 2449, "Oct 11th", "ca-0371z", "4.25", "80.75"),
    createRow(40613, 2188, "Oct 12th", "ca-0431z", "3.15", "59.76"),
    createRow(40614, 1201, "Oct 12th", "t-0101x", "175.00", "3325.00")
  ];

  function emptyPageChange() {
    return;
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <Box p={3}>
          <TextField
            label="Search"
            margin="normal"
            className={classes.search}
          />

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Product</TableCell>
                <TableCell align="right">Discount</TableCell>
                <TableCell align="right">Total Sales ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRows.map(row => (
                <TableRow key={row.orderId}>
                  <TableCell component="th" scope="row">
                    {row.orderId}
                  </TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell align="right">{row.discount}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>
                  <Button color="primary">Export Order List</Button>
                </TableCell>
                <TablePagination
                  colSpan={4}
                  rowsPerPage={10}
                  page={0}
                  count={61}
                  onChangePage={() => emptyPageChange}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
      </Paper>
    </div>
  );
}
