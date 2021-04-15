import React, { Component } from "react";
import InvoiceHistory_m from "./InvoiceHistory_m";
import InvoiceHistory_sub from "./InvoiceHistory_sub";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { DialogContent, Typography } from "@material-ui/core";

class InvoiceHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display,
      property_id: this.props.property_id,
      tenant_list: this.props.tenant_list
    };
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
      <div className="main">
        <React.Fragment>
          <Container maxWidth="lg" className={useStyles.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper>
                  <InvoiceHistory_m
                    className="display_item"
                    property_id={this.state.property_id}
                    tenant_list={this.state.tenant_list}
                    info={this}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper>
                  <InvoiceHistory_sub
                    className="display_item"
                    property_id={this.state.property_id}
                    tenant_list={this.state.tenant_list}
                    info={this}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}

export default InvoiceHistory;
