import React from "react";
import { HorizontalBar } from "react-chartjs-2";
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
import Red from "@material-ui/core/colors/red";

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
    }
  }));

  const classes = useStyles(props.theme);

  const lowStockData = {
    labels: ["t-0155X", "c-0391r", "ca-0401z"],
    datasets: [
      {
        label: "Units",
        data: [15, 8, 3],
        backgroundColor: Red[900],
        borderWidth: 2
      }
    ]
  };

  const highStockData = {
    labels: ["c-1386r", "l-0231s"],
    datasets: [
      {
        label: "Units",
        data: [204, 179],
        backgroundColor: "#62BEC4",
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          ticks: {
            suggestedMin: 0
          }
        }
      ]
    }
  };

  return (
    <div>
      <Grid container direction="row" spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Box mb={3}>
                <Typography>Low Stock</Typography>
                <Divider />
              </Box>
              <Box>
                <HorizontalBar data={lowStockData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Box mb={3}>
                <Typography>High Stock</Typography>
                <Divider />
              </Box>
              <Box>
                <HorizontalBar data={highStockData} options={chartOptions} />
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
                defaultValue="-"
              >
                <option>-</option>
                <option>Increase Stock</option>
                <option>Sell Excess Stock</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formElement}>
              <InputLabel htmlFor="StockType">Product Code</InputLabel>
              <Select native inputProps={{ id: "StockType" }} defaultValue="-">
                <option>-</option>
                <option>t-0124</option>
                <option>t-0552r</option>
                <option>a-0321t</option>
                <option>a-0341t</option>
                <option>a-0351t</option>
                <option>a-0361t</option>
                <option>a-0381t</option>
                <option>a-0391t</option>
                <option>a-0401t</option>
                <option>a-0431t</option>
                <option>a-0501t</option>
                <option>a-0551t</option>
                <option>a-0651t</option>
                <option>a-0751t</option>
                <option>a-0851t</option>
                <option>a-1951t</option>
                <option>c-0321r</option>
                <option>c-0331r</option>
                <option>c-0341r</option>
                <option>c-0351r</option>
                <option>c-0361r</option>
                <option>c-0371r</option>
                <option>c-0381r</option>
                <option>c-0391r</option>
                <option>c-0401r</option>
                <option>c-0411r</option>
                <option>c-0421r</option>
                <option>c-0431r</option>
                <option>c-0441r</option>
                <option>c-0451r</option>
                <option>c-0551r</option>
                <option>c-0651r</option>
                <option>c-0751r</option>
                <option>c-1386r</option>
                <option>c-1387r</option>
                <option>c-1388r</option>
                <option>c-1390r</option>
                <option>c-1400r</option>
                <option>c-1451r</option>
                <option>c-1481r</option>
                <option>c-1501r</option>
                <option>c-1551r</option>
                <option>c-1601r</option>
                <option>c-1701r</option>
                <option>c-1801r</option>
                <option>c-1851r</option>
                <option>ca-0311z</option>
                <option>ca-0321z</option>
                <option>ca-0331z</option>
                <option>ca-0341z</option>
                <option>ca-0351z</option>
                <option>ca-0361z</option>
                <option>ca-0371z</option>
                <option>ca-0381z</option>
                <option>ca-0391z</option>
                <option>ca-0394z</option>
                <option>ca-0401z</option>
                <option>ca-0421z</option>
                <option>ca-0431z</option>
                <option>ca-0444z</option>
                <option>ca-0445z</option>
                <option>ca-0446z</option>
                <option>ca-0460z</option>
                <option>ca-0480z</option>
                <option>ca-0490z</option>
                <option>ca-0491z</option>
                <option>ca-0492z</option>
                <option>l-0201s</option>
                <option>l-0211s</option>
                <option>l-0221s</option>
                <option>l-0231s</option>
                <option>l-0241s</option>
                <option>l-0251s</option>
                <option>l-0261s</option>
                <option>l-0271s</option>
                <option>l-0281s</option>
                <option>l-0291s</option>
                <option>l-0301s</option>
                <option>l-0401s</option>
                <option>l-0451s</option>
                <option>t-0101x</option>
                <option>t-0122x</option>
                <option>t-0133x</option>
                <option>t-0144x</option>
                <option>t-0155x</option>
                <option>t-0166x</option>
                <option>t-0177x</option>
                <option>t-0188x</option>
                <option>t-0199x</option>
                <option>t-0211x</option>
                <option>t-0222x</option>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formElement}>
              <TextField label="Amount" />
            </FormControl>
          </div>
          <div>
            <Button color="primary">Submit Request</Button>
          </div>
        </Box>
      </Paper>
    </div>
  );
}
