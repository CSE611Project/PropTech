import "date-fns";
import React from "react";
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
import MeterBillPage from "./MeterBillPage";
import DatePicker from "./DatePicker";
import { Component } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class InvoiceHistory_sub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from_date: "",
      to_date: "",
      bill_id: "",
      meter_id: "",
      account_id: "",
      m_kwh_usage: "",
      s_kwh_usage: "",
      s_charge: "",
      total_kwh_usage: "",
      total_charge: "",
      unit_charge: "",
      submeter_invoice_list: [],
      property_id: this.props.property_id,
      tenant_list: this.props.tenant_list
    };
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.getSubmeterInvoiceList = this.getSubmeterInvoiceList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleFromDateChange(event) {
    this.setState(
      {
        from_date: event.target.value,
      },
      () => {
        console.log(this.state.from_date);
      }
    );
  }

  handleToDateChange(event) {
    this.setState(
      {
        to_date: event.target.value,
      },
      () => {
        console.log(this.state.to_date);
      }
    );
  }

  getSubmeterInvoiceList() {
    return new Promise((resolve, reject) => {
      axios.post("/invoice_history", { property_id: this.state.property_id, from_date: this.state.from_date, to_date: this.state.to_date }).then((response) => {
        console.log("invoice history response:",response.data);
        this.setState({
          submeter_invoice_list: response.data.invoice_list
        })
        resolve();
        if(response.data.invoice_list == false || response.data.invoice_list.length === 0){
          alert("no invoice in selecting time peirod, make sure  generate invoice first using {Generate Invoice} on the side bar");
          return;
        }
      });
    });
  }

  generateSubmeterTable() {
    var res = [];
    this.getSubmeterInvoiceList().then(() => {
      var tableData = this.state.submeter_invoice_list;
      console.log(this.state.submeter_invoice_list)
      for (var i = 0; i < tableData.length; i++) {
        res.push(
          <TableRow key={i} id={i}>
            <TableCell>{tableData[i].invoice_id}</TableCell>
            <TableCell>{tableData[i].name}</TableCell>
            <TableCell>{tableData[i].from_date}</TableCell>
            <TableCell>{tableData[i].to_date}</TableCell>
            <TableCell>{tableData[i].total_footage}</TableCell>
          </TableRow>
        );
      }
      this.res = res;
      this.forceUpdate();
    });
  }

  onSubmit() {
    this.generateSubmeterTable();
  }

  render() {
    return (
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Submeter Invoice Statement History
        </Typography>
        <form noValidate>
          <TextField
            id="from_date"
            label="From"
            type="date"
            defaultValue={this.state.from_date}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleFromDateChange}
          />

          <TextField
            id="to_date"
            label="To"
            type="date"
            defaultValue={this.state.to_date}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleToDateChange}
          />
        </form>
        <Button onClick={this.onSubmit} color="primary">
          Show
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Tenant Name</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Total Amount Due</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.res}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}
export default InvoiceHistory_sub;
