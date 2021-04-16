import React from "react";
import "./../App.css";
import UtilityBillMeter from "./UtilityBillMeter";
import UtilityBillSubmeter from "./UtilityBillSubmeter";
import BillingHistory from "./BillingHistory";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

class UtilityBillingHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant_list: [],
    };
    this.getTenantList = this.getTenantList.bind(this);
    this.getTenantList();
  }

  getTenantList() {
    return new Promise((resolve, reject) => {
      axios.get(`/tenant/${this.props.property_id}`).then((response) => {
        this.setState({ tenant_list: response.data });
        resolve();
      });
    });
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
                  <BillingHistory className="display_item" property_id={this.props.property_id} tenant_list={this.state.tenant_list} info={this} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper>
                  <UtilityBillMeter className="display_item" property_id={this.props.property_id} info={this} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper>
                  <UtilityBillSubmeter className="display_item" property_id={this.props.property_id} tenant_list={this.state.tenant_list} info={this} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}

export default UtilityBillingHistory;
