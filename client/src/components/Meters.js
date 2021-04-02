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
      property_id: this.props.property_id,
      meter_to_add: "",
      info: this.props.info,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getMeterList = this.getMeterList.bind(this);
    this.changeMeterToAdd = this.changeMeterToAdd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.generateMeter = this.generateMeter.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
    this.generateMeter();
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  getMeterList() {
    return new Promise((resolve, reject) => {
      axios.get(`/meter/${this.state.property_id}`).then((response) => {
        this.setState({ meter_list: response.data });
        resolve();
      });
    });
  }

  changeMeterToAdd(event) {
    this.setState({
      meter_to_add: event.target.value,
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
            <td key={this.state.meter_list[i].meter_id}>{this.state.meter_list[i].meter_id}</td>
            <td>
              <DeleteMeters meter_id={this.state.meter_list[i].meter_id} property_id={this.state.property_id} info={this} />
            </td>
          </tr>
        );
      }
      this.forceUpdate();
    });
  }

  addMeter = () => {
    axios.post("/meter", { property_id: this.state.property_id, meter_id: this.state.meter_to_add }).then((response) => {
      this.generateMeter();
    });
  };
  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Meters</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Manage Meters</DialogTitle>
          <table>
            <tbody>{this.res}</tbody>
          </table>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField autoFocus margin="dense" id="meter" label="Meter" type="text" onChange={this.changeMeterToAdd} fullWidth />
            <Button onClick={this.addMeter} color="primary">
              Add
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Back
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Meters;
