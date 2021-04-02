import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import PropertyInfo from "./PropertyInfo.js";
import DeleteMeters from "./DeleteMeters.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DatePicker from "./DatePicker.js";

class MeterBillPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,

      checked: false /*for check box status*/,
      setCheck: false /*for check box status*/,

      meter_id: "",
      begin: "",
      end: "",
      KWH_usage: "",
      amount: "",
      user_id: this.props.user_id,

      /*second bill info */
      sec_KWH_usage: "",
      sec_bill_amount: "",
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeMeter = this.changeMeter.bind(this);
    this.changeBegin = this.changeBegin.bind(this);
    this.changeEnd = this.changeEnd.bind(this);
    this.changeKWH = this.changeKWH.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    /*second bill handlers */
    this.change_sec_KWH = this.change_sec_KWH.bind(this);
    this.change_sec_bill_amount = this.change_sec_bill_amount.bind(this);

    /*handle check box change event*/
    this.changeCheckBox = this.changeCheckBox.bind(this);
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

  changeMeter(event) {
    this.setState({
      meter_id: event.target.value,
    });
  }

  changeBegin(event) {
    this.setState({
      begin: event.target.value,
    });
  }

  changeEnd(event) {
    this.setState({
      end: event.target.value,
    });
  }

  changeKWH(event) {
    this.setState({
      KWH_usage: event.target.value,
    });
  }

  changeAmount(event) {
    this.setState({
      amount: event.target.value,
    });
  }

  change_sec_KWH(event) {
    this.setState({
      sec_KWH_usage: event.target.value,
    });
  }

  change_sec_bill_amount(event) {
    this.setState({
      sec_bill_amount: event.target.value,
    });
  }

  changeCheckBox(event) {
    this.setState({
      setCheck: event.target.checked,
    });
  }

  updateAmount(meter_id, bill_id) {
    /*    axios.post("/bill", { bill_info: bill_info }).then((response) => {
          this.props.info.generateTableBill();
        });
    */
    /* the bill should be saved in somewhere of database */
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      open: false,
    });

    /*
        var bill_info = {
            meter_id: this.state.meter_id,
            begin: this.state.begin,
            end: this.state.end,
            KWH_usage: this.state.KWH_usage,
            bill: this.state.bill,
            /*second bill info */
    /*    sec_KWH_usage: this.state.sec_KWH_usage,*/
    /*     sec_bill: this.state.sec_bill,*/
    /* }*/
    /**/
    this.updateBill(this.state.meter_id, this.state.meter);
    console.log(this.state.meter);
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Manually Input The Bill</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Enter Billing Info</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>

            <TextField autoFocus margin="dense" id="meter_code" label="meter#" type="text" onChange={this.changeMeter} fullWidth />
            <DatePicker />
            <TextField autoFocus margin="dense" id="kwh_rate" label="KWH" type="text" onChange={this.changeKWH} fullWidth />
            <TextField autoFocus margin="dense" id="bill_amount" label="bill $" type="text" onChange={this.changeBill} fullWidth />

            <FormControlLabel
              control={<Checkbox checked={this.state.setCheck} onChange={this.changeCheckBox} inputProps={{ "aria-label": "primary checkbox" }} />}
              label="I have second bill/constellation company need to input"
            />

            <TextField autoFocus margin="dense" id="kwh_rate" label="KWH" type="text" disabled={!this.state.setCheck} onChange={this.changeKWH} fullWidth />
            <TextField autoFocus margin="dense" id="bill_amount" label="bill $" type="text" disabled={!this.state.setCheck} onChange={this.changeBill} fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Update Bill
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Fetch Bill by API
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default MeterBillPage;
