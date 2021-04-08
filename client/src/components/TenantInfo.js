import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import HomePage from "./HomePage.js";
import PropManaAfterSign from "./PropManaAfterSign.js";
import PropertyInfo from "./PropertyInfo.js";
import EditTenant from "./EditTenant";
import AddTenant from "./AddTenant";
import DeleteTenant from "./DeleteTenant";
import Submeters from "./Submeters";
import Meters from "./Meters";
import UtilityBillMeter from "./UtilityBillMeter"
import UtilityBillSubmeter from "./UtilityBillSubmeter"
import BillingHistory from "./BillingHistory"
import CollapseSubmeter from "./CollapseSubmeter"
import { Component } from "react";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

class TenantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display,
      property_id: sessionStorage.getItem("property_id"),
      property_name: sessionStorage.getItem("property_name"),
      total_footage: sessionStorage.getItem("total_footage"),
      tenant_list: [],
      meter_list: [],
    };
    this.toManageUtilityBillPage = this.toManageUtilityBillPage.bind(this)
    this.generateTableData();
  }

  getTenantList() {
    console.log("tenantinfo: ", this.state.total_footage);
    return new Promise((resolve, reject) => {
      axios.get(`/tenant/${this.state.property_id}`).then((response) => {
        this.setState({ tenant_list: response.data });
        resolve();
      });
    });
  }

  generateTableData() {
    this.getTenantList().then(() => {
      this.res = [];
      for (var i = 0; i < this.state.tenant_list.length; i++) {
        this.res.push(

          <TableRow key={i} id={i}>
            <CollapseSubmeter />
            <TableCell>{this.state.tenant_list[i].name}</TableCell>
            <TableCell>{this.state.tenant_list[i].email}</TableCell>
            <TableCell>{this.state.tenant_list[i].address}</TableCell>
            <TableCell>{this.state.tenant_list[i].landlord_phone}</TableCell>
            <TableCell>{this.state.tenant_list[i].rubs}</TableCell>
            <TableCell>
              <EditTenant
                tenant_id={this.state.tenant_list[i].tenant_id}
                name={this.state.tenant_list[i].name}
                email={this.state.tenant_list[i].email}
                address={this.state.tenant_list[i].address}
                landlord_phone={this.state.tenant_list[i].landlord_phone}
                rubs={this.state.tenant_list[i].rubs}
                property_id={this.state.property_id}
                info={this}
              />
            </TableCell>
            <TableCell>
              <DeleteTenant tenant_id={this.state.tenant_list[i].tenant_id} info={this} />
            </TableCell>
            <TableCell>
              <Submeters
                tenant_id={this.state.tenant_list[i].tenant_id}
                name={this.state.tenant_list[i].name}
                email={this.state.tenant_list[i].email}
                address={this.state.tenant_list[i].address}
                rented_area={this.state.tenant_list[i].rented_area}
                submeter={this.state.tenant_list[i].submeter}
                property_id={this.state.property_id}
                info={this}
              />
            </TableCell>
          </TableRow>
        );
      }
      this.forceUpdate();
    });
  }

  toManageUtilityBillPage() {
    const useStyles = makeStyles((theme) => ({
      container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: 240,
      },
    }));
    const ele = <React.Fragment>
      <Container maxWidth="lg" className={useStyles.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper>
              <BillingHistory />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper>
              <UtilityBillMeter className="display_item" property_id={this.state.property_id} info={this} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper>
              <UtilityBillSubmeter
                className="display_item"
                property_id={this.state.property_id}
                tenant_list={this.state.tenant_list}
                info={this}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>;
    return ReactDOM.render(ele, document.getElementById("root"));
  }

  render() {
    return (
      <div className="main">
        <TableContainer>
          <Table>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell component={Paper}>
              <Meters className="display_item" property_id={this.state.property_id} info={this} />
            </TableCell>
            <TableCell></TableCell>
            <TableCell component={Paper}>
              <AddTenant className="display_item" property_id={this.state.property_id} total_footage={this.state.total_footage} info={this} />
            </TableCell>
            <TableCell component={Paper}>
              <Button onClick={this.toManageUtilityBillPage}>Manage Utility Bill</Button>
            </TableCell>
          </Table>

        </TableContainer>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Landlord Phone</TableCell>
                <TableCell>RUBS</TableCell>
                <TableCell />
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.res}</TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default TenantInfo;