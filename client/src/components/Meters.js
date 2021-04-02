import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import PropertyInfo from "./PropertyInfo.js";
import DeleteMeters from "./DeleteMeters.js";
import EditMeters from "./EditMeters.js";
import MeterBillPage from "./MeterBillPage";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

class Meters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      meter_list: [],
      info: this.props.info,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getMeterList = this.getMeterList.bind(this);
    this.changeMeter = this.changeMeter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.generateMeter = this.generateMeter.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  getMeterList() {
    {
      /*return new Promise((resolve, reject) => {
            axios.get(`/property/${this.state.user_id}`).then((response) => {
                this.setState({ meter_list: response.data })
                resolve();
            })
        })*/
    }
  }

  changeMeter(event) {
    this.setState({
      meter: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      open: false,
    });
  }

  generateMeter() {
    //call updateTable everytime when we need to generate a list of tenants
    //this.updateTenantTable(this.state.sub, this.state.property_id);
    this.getMeterList().then(() => {
      this.res = [];
      for (var i = 0; i < this.state.meter_list.length; i++) {
        this.res.push(
          <tr key={i} id={i}>
            <td key={this.state.meter_list[i]}>{this.state.meter_list[i]}</td>
            <td>
              <EditMeters
                properity_id={this.state.meter_list[i].property_id}
                name={this.state.meter_list[i].name}
                address={this.state.meter_list[i].address}
                meter={this.state.meter_list[i].meter}
                user_id={this.state.user_id}
              />
            </td>
            <td>
              <DeleteMeters
                properity_id={this.state.meter_list[i].property_id}
                name={this.state.meter_list[i].name}
                address={this.state.meter_list[i].address}
                meter={this.state.meter_list[i].meter}
                user_id={this.state.user_id}
              />
            </td>
          </tr>
        );
      }
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Meters</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Manage Meters</DialogTitle>
          {this.res}
          <table>
            <tr>
              <th>Meter</th>
            </tr>
            <tr>
              <td>192962</td>
              <td>
                <EditMeters submeter="192962" />
              </td>
              <td>
                <DeleteMeters submeter="192962" />
              </td>
              <td>
                <MeterBillPage submeter="192962" />
              </td>
            </tr>
          </table>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField autoFocus margin="dense" id="meter" label="Meter" type="text" onChange={this.changeMeter} fullWidth />
            <Button onClick={this.onAdd} color="primary">
              Add
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Meters;
