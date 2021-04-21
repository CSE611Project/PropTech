import "date-fns";
import React from "react";
import "./../App.css";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IndividualTenantInvoice from "./new_IndividualTenantInvoice"

class InvoiceHistory_m extends React.Component {
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
      invoice_list: [],
      property_id: this.props.property_id,
      tenant_list: this.props.tenant_list,
      property_info: this.props.property_info,
    };
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.getMeterInvoiceList = this.getMeterInvoiceList.bind(this);
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

  getMeterInvoiceList() {
    return new Promise((resolve, reject) => {
      axios.post("/invoice_history", { property_id: this.state.property_id, from_date: this.state.from_date, to_date: this.state.to_date }).then((response) => {
        console.log("invoice history response:", response.data);
        this.setState({
          invoice_list: response.data.invoice_list,
          tenant_list: response.data.tenant_list,
          property_info: response.data.property_info,
        });
        this.forceUpdate();
        resolve();
        if (response.data.invoice_list == false || response.data.invoice_list.length === 0) {
          alert("no invoice in selecting time peirod, make sure  generate invoice first using {Generate Invoice} on the side bar");
          return;
        }
      });
    });
  }

  generateMeterTable() {
    var res = [];
    var resm = [];
    var name = "";
    var rubs = 0;
    var total_footage = 0;
    var total_building_amt_due = 0;
    var total_kwh_usage = 0;
    this.getMeterInvoiceList().then(() => {
      var tableData = this.state.invoice_list;
      var tableDataTenant = this.state.tenant_list;
      var tableDataProperty = this.state.property_info;
      console.log(this.state.invoice_list);
      console.log(tableDataTenant);
      console.log(tableDataProperty);
      for (var i = 0; i < tableData.length; i++) {
        for (var j = 0; j < tableDataTenant.length; j++) {
          if (tableData[i].tenant_id === tableDataTenant[j].tenant_id) {
            name = tableDataTenant[j].name;
            rubs = tableDataTenant[j].rubs;
            total_footage = rubs * tableDataProperty[0].total_footage;
            total_building_amt_due = tableData[i].total_charge / rubs;
            total_building_amt_due = total_building_amt_due.toFixed(2);
            if (tableData[i].has_submeter === "y") {
              total_kwh_usage = tableData[i].cur_read - tableData[i].prior_read;
            }
          }
        }
        if (rubs !== 0) {
          res.push(
            <TableRow key={i} id={i}>
              <TableCell>{tableData[i].invoice_id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{tableData[i].meter_id}</TableCell>
              <TableCell>{tableData[i].from_date.split("T")[0]}</TableCell>
              <TableCell>{tableData[i].to_date.split("T")[0]}</TableCell>
              <TableCell>{tableData[i].meter_amt_due}</TableCell>
              <TableCell>{rubs}</TableCell>
              <TableCell>{total_footage}</TableCell>
              <TableCell>{tableDataProperty[0].total_footage}</TableCell>
              <TableCell>{total_building_amt_due}</TableCell>
              <TableCell>{tableData[i].total_charge}</TableCell>
            </TableRow>
          );
        } else {
          resm.push(
            <TableRow key={i} id={i}>
              <TableCell>{tableData[i].invoice_id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{tableData[i].submeter_id}</TableCell>
              <TableCell>{tableData[i].from_date.split("T")[0]}</TableCell>
              <TableCell>{tableData[i].to_date.split("T")[0]}</TableCell>
              <TableCell>{tableData[i].submeter_charge}</TableCell>
              <TableCell>{tableData[i].prior_read}</TableCell>
              <TableCell>{tableData[i].cur_read}</TableCell>
              <TableCell>{total_kwh_usage}</TableCell>
              <TableCell>{tableData[i].unit_charge}</TableCell>
              <TableCell>{tableData[i].total_charge}</TableCell>
            </TableRow>
          );
        }
      }
      this.res = res;
      this.resm = resm;
      this.forceUpdate();
    });
  }

  onSubmit() {
    this.generateMeterTable();
  }

  render() {
    return (
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Invoice Statement History
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
              <TableCell>Meter ID</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Meter Amount Due</TableCell>
              <TableCell>RUBS</TableCell>
              <TableCell>User Footage</TableCell>
              <TableCell>Total Footage</TableCell>
              <TableCell>Total Building Amount Due</TableCell>
              <TableCell>Total Tenant Amount Due</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.res}</TableBody>
          <TableRow>
            <TableCell>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </TableCell>
            <TableCell>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </TableCell>
            <TableCell>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </TableCell>
            <TableCell>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </TableCell>
            <TableCell>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </TableCell>
            <TableCell>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </TableCell>
            <TableCell>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </TableCell>
            <TableCell>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </TableCell>
            <TableCell>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </TableCell>
            <TableCell>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </TableCell>
            <TableCell>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </TableCell>
          </TableRow>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Tenant Name</TableCell>
              <TableCell>Submeter ID</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Submeter Charge</TableCell>
              <TableCell>Prior Read</TableCell>
              <TableCell>Current Read</TableCell>
              <TableCell>Total KWH Usage</TableCell>
              <TableCell>Unit Charge</TableCell>
              <TableCell>Total Amount Due</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.resm}</TableBody>
        </Table>
        <IndividualTenantInvoice 
          property_info ={this.state.property_info}
          tenant_list ={this.state.tenant_list}
          invoice_list = {this.state.invoice_list}
        />
      </React.Fragment>
      
    );
  }
}
export default InvoiceHistory_m;
