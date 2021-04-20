import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Red from "@material-ui/core/colors/red";
import Grey from "@material-ui/core/colors/grey";

export function SalesReports(props) {
  const useStyles = makeStyles(theme => ({
    paper: {
      background: theme.palette.type == "light" ? "#fff" : "#474747"
    },
    chartLabel: {
      paddingBottom: 20
    }
  }));

  const classes = useStyles(props.theme);

  const totalSalesData = {
    labels: ["P1", "P2", "P3", "P4"],
    datasets: [
      {
        label: "Total Sales ($)",
        data: [101932, 148832, 144142, 129021],
        borderColor: "#62BEC4",
        borderWidth: 2
      }
    ]
  };

  const regionalReturnsData = {
    labels: [
      "Miami",
      "Houston",
      "Seatle",
      "Atlanta",
      "Salt Lake City",
      "Baltimore",
      "Portland",
      "Denver"
    ],
    datasets: [
      {
        label: "% Items returned",
        data: [21, 20, 17.2, 16.8, 14.3, 9.6, 8.2, 7.9],
        backgroundColor: [
          Red[900],
          Red[800],
          Red[700],
          Red[600],
          Red[500],
          Red[400],
          Red[300],
          Red[200]
        ],
        borderWidth: 1
      }
    ]
  };

  const saleTypeData = {
    labels: ["Card", "Cash", "Finance"],
    datasets: [
      {
        label: "% Sales",
        data: [65, 20, 15],
        backgroundColor: [Grey[300], Grey[300], "#62BEC4"],
        borderWidth: 1
      }
    ]
  };

  const financeSalesData = {
    labels: ["P1", "P2", "P3", "P4"],
    datasets: [
      {
        label: "% Finance Sales",
        data: [15.2, 14.1, 11.6, 10.2],
        backgroundColor: "#62BEC4",
        borderWidth: 1
      }
    ]
  };

  const targetData = {
    labels: ["Target", "Actual"],
    datasets: [
      {
        label: "Sales ($)",
        data: [140500, 129021],
        backgroundColor: [Grey[300], Red[900]],
        borderWidth: 1
      }
    ]
  };

  const defaultScaleOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0
          }
        }
      ]
    }
  };

  const scaleOptionsWithoutLegend = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0
          }
        }
      ]
    }
  };

  return (
    <Paper className={classes.paper}>
      <Box p={3}>
        <Grid container direction="row" spacing={3} justify="space-between">
          <Grid item xs={5}>
            <Typography className={classes.chartLabel}>Sales Trend</Typography>
            <Line data={totalSalesData} options={scaleOptionsWithoutLegend} />
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.chartLabel}>
              Percentage of Items Returned
            </Typography>
            <Bar
              data={regionalReturnsData}
              options={scaleOptionsWithoutLegend}
            />
          </Grid>

          <Grid item xs={4}>
            <Typography className={classes.chartLabel}>
              Payment Types
            </Typography>
            <Bar data={saleTypeData} options={defaultScaleOptions} />
          </Grid>

          <Grid item xs={4}>
            <Typography className={classes.chartLabel}>
              Finance Sales
            </Typography>
            <Line data={financeSalesData} options={defaultScaleOptions} />
          </Grid>

          <Grid item xs={4}>
            <Typography className={classes.chartLabel}>Targets</Typography>
            <Bar data={targetData} options={defaultScaleOptions} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
