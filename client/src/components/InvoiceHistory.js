import { Component } from "react";
import InvoiceHistory_m from "./InvoiceHistory_m";
import InvoiceHistory_sub from "./InvoiceHistory_sub";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

class InvoiceHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const useStyles = makeStyles((theme) => ({
      container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
      paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
      },
      fixedHeight: {
        height: 240,
      },
    }));
    return (
      <Container maxWidth="lg" className={useStyles.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper>
              <InvoiceHistory_m />
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Paper>
              <InvoiceHistory_sub />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default InvoiceHistory;
