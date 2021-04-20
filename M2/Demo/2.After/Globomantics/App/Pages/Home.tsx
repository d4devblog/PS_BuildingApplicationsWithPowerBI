import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

export function Home(props) {
  const useStyles = makeStyles(theme => ({
    card: {
      background: theme.palette.type == "light" ? "#fff" : "#474747"
    },
    subtleText: {
      color: theme.palette.text.secondary
    }
  }));

  const classes = useStyles(props.theme);

  function navigateToSales() {
    props.history.push("/sales-reports/");
  }

  function navigateToPurchasing() {
    props.history.push("/purchasing/");
  }

  function navigateToOrders() {
    props.history.push("/orders/");
  }

  return (
    <Grid container direction="row" spacing={2} alignItems="stretch">
      <Grid item xs={12} sm={4}>
        <Card className={classes.card}>
          <CardContent>
            <Box mb={3}>
              <Typography>Sales</Typography>
              <Divider />
            </Box>
            <Typography variant="h5">$129,021</Typography>
            <Typography className={classes.subtleText} variant="caption">
              Current Month
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => navigateToSales()}
            >
              View Sales Reports
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card className={classes.card}>
          <CardContent>
            <Box mb={3}>
              <Typography>Stock & Purchasing</Typography>
              <Divider />
            </Box>
            <Typography variant="h5">5 Stock Warnings</Typography>
            <Typography className={classes.subtleText} variant="caption">
              Includes low/overstocked items
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => navigateToPurchasing()}
            >
              View Purchasing
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card className={classes.card}>
          <CardContent>
            <Box mb={3}>
              <Typography>Orders</Typography>
              <Divider />
            </Box>
            <Typography variant="h5">61 Pending Orders</Typography>
            <Typography className={classes.subtleText} variant="caption">
              4 Awaiting Stock
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => navigateToOrders()}
            >
              View Orders
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
