import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

interface IOrderHistory {
  customerId: number;
  orderId: number;
  orderDate: string;
  itemsReturned?: number;
  numberOfItems: number;
  salesValue?: number;
}

export interface IOrderHistoryProps {
  customerId: number;
  theme: Theme;
}

export default function OrderHistory(props: IOrderHistoryProps) {
  const useStyles = makeStyles(theme => ({
    container: {
      maxHeight: 250,
      overflowY: "auto",
      overflowX: "hidden"
    },
    historyTable: {
      minWidth: 400,
      marginBottom: 20
    }
  }));
  const classes = useStyles(props.theme);

  function getOrderHistory(customerId: number): Promise<Response> {
    let request = new Request("/api/xmla/orderHistory/customer/" + customerId, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    return fetch(request);
  }

  function getOrderHistoryFromResponse(response: Response): Promise<any> {
    if (response.status === 200) {
      return response.json();
    } else throw "Error fetching report embed model";
  }

  const [orderHistory, setOrderHistory] = useState(new Array<IOrderHistory>());

  useEffect(
    () => {
      getOrderHistory(props.customerId).then(response =>
        getOrderHistoryFromResponse(response).then(history => {
          setOrderHistory(history);
        })
      );
    },
    [props.customerId]
  );

  function getDateValue(date: string): string {
    if (date != null) {
      let d = new Date(date);
      return d.toLocaleDateString();
    }
    return "";
  }

  return (
    <div className={classes.container}>
      <Table className={classes.historyTable} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell align="right">Items</TableCell>
            <TableCell align="right">Sale Value ($)</TableCell>
            <TableCell align="right">Items Returned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderHistory.map(row => (
            <TableRow key={row.orderId}>
              <TableCell component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell>{getDateValue(row.orderDate)}</TableCell>
              <TableCell align="right">{row.numberOfItems}</TableCell>
              <TableCell align="right">${row.salesValue}</TableCell>
              <TableCell align="right">{row.itemsReturned}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
