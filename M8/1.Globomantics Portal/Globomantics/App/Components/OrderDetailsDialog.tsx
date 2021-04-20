import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import LocalShipping from "@material-ui/icons/LocalShipping";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import OrderHistory from "../Components/OrderHistory";

export interface IDialogValues {
  orderId: number;
  customerId: number;
  orderDate: Date;
}

export interface IOrderDialogProps {
  theme: Theme;
  dialogOpen: boolean;
  dialogValues: IDialogValues;
  closeDialogFunction: Function;
}

export default function OrderDetailsDialog(props: IOrderDialogProps) {
  const useStyles = makeStyles(theme => ({
    contents: {
      width: "100%"
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
      maxWidth: 650
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
    },
    primaryAction: {
      marginRight: 10
    },
    bigDivider: {
      margin: 20
    },
    historyTitle: {
      marginBottom: 10,
      marginLeft: 12
    }
  }));
  const classes = useStyles(props.theme);

  let orderDetailText;
  if (props.dialogValues.orderDate != null) {
    orderDetailText = (
      <ListItemText
        primary={"Order: " + props.dialogValues.orderId}
        secondary={props.dialogValues.orderDate.toLocaleDateString()}
      />
    );
  }

  return (
    <div>
      <Modal open={props.dialogOpen} className={classes.modal}>
        <div className={classes.modalContent}>
          <Grid container direction="row" justify="flex-start">
            <Grid item xs={12}>
              <List className={classes.contents}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalShipping />
                    </Avatar>
                  </ListItemAvatar>
                  {orderDetailText}
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircle />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Customer: " + props.dialogValues.customerId}
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.actions}>
                <Button
                  className={classes.primaryAction}
                  variant="contained"
                  color="primary"
                  onClick={() => props.closeDialogFunction()}
                >
                  Contact Customer
                </Button>
                <Button onClick={() => props.closeDialogFunction()}>
                  Close
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.bigDivider} />
              <Typography className={classes.historyTitle} variant="subtitle1">
                Order History:
              </Typography>

              <OrderHistory
                {...props}
                customerId={props.dialogValues.customerId}
              />

            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
