import "date-fns";
import React from "react";
import "./../App.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
    };
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
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

  render() {
    return (
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Invoice meter Statement History
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

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Tenant Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Meter ID</TableCell>
              <TableCell>RUB</TableCell>
              <TableCell>Unit Charge $</TableCell>
              <TableCell>Total Charge $</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>101026</TableCell>
              <TableCell>101026</TableCell>
              <TableCell>111</TableCell>
              <TableCell>1234</TableCell>
              <TableCell>245</TableCell>
              <TableCell>1</TableCell>
              <TableCell>3000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>101026</TableCell>
              <TableCell>101026</TableCell>
              <TableCell>101026</TableCell>
              <TableCell>1234</TableCell>
              <TableCell>200</TableCell>
              <TableCell>425</TableCell>
              <TableCell>19.87</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}
export default InvoiceHistory_m;
