import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import TenantInfo from "./TenantInfo.js";
import DeleteSubmeters from "./DeleteSubmeters.js";
import EditSubmeters from "./EditSubmeters.js";
import SubmeterBill from "./SubmeterBill.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import MeterCheckBox from "./MeterCheckbox";

{
  /* should import all information of certain tenant
    new variables: submeter_list, multiplier_list, submeter, multiplier, meter_id, submeter_id
*/
}
class Submeters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: this.props.name,
      tenant_id: this.props.tenant_id,
      email: this.props.email,
      address: this.props.address,
      phone_number: this.props.phone_number,
      submeter_list: [],
      submeter: "",
      multiplier_list: [],
      multiplier: "",
      property_id: this.props.property_id,
      meter_id: this.props.meter_id,
      meter_list: [],
      meter: "",
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getSubmeterList = this.getSubmeterList.bind(this);
    this.changeSubmeter = this.changeSubmeter.bind(this);
    this.changeMultiplier = this.changeMultiplier.bind(this);
    this.addSubmeter = this.addSubmeter.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.generateTable = this.generateTable.bind(this);
    this.getAssociatedMeter = this.getAssociatedMeter.bind(this);
  }

  componentDidUpdate() {
    if (this.props.tenant_id !== this.state.tenant_id) {
      this.setState({
        name: this.props.name,
        tenant_id: this.props.tenant_id,
        email: this.props.email,
        address: this.props.address,
        phone_number: this.props.phone_number,
        submeter_list: [],
        submeter: "",
        multiplier_list: [],
        multiplier: "",
        property_id: this.props.property_id,
        meter_id: this.props.meter_id,
        meter_list: [],
        meter: "",
      });
    }
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
    this.generateTable();
  }
  handleClose() {
    this.setState({
      open: false,
    });
  }

  getSubmeterList() {
    return new Promise((resolve, reject) => {
      axios.get(`/submeter/${this.state.tenant_id}`).then((response) => {
        this.setState({ submeter_list: response.data });
        resolve();
      });
    });
  }

  changeSubmeter(event) {
    this.setState({
      submeter: event.target.value,
    });
  }

  changeMultiplier(event) {
    this.setState({
      multiplier: event.target.value,
    });
  }

  addSubmeter() {
    axios.post("/add_submeter", { submeter_id: this.state.submeter, tenant_id: this.state.tenant_id, meter_id: this.state.meter_id, multiplier: this.state.multiplier }).then((response) => {
      this.generateTable();
    });
  }

  onAdd(event) {
    {
      /* this function add submeter into submeterlist and multiplier list associated with one tenant 
            as well as connect to a meter in database
        */
    }
    event.preventDefault();
    this.addSubmeter();
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      open: false,
    });
  }

  getAssociatedMeter(meters) {
    this.setState({ meter_id: meters });
  }

  generateTable() {
    //call updateTable everytime when we need to generate a list of submeter and multiplier
    // see hardcode below in render() function
    this.getSubmeterList().then(() => {
      var res = [];
      let tableData = this.state.submeter_list;
      for (var i = 0; i < tableData.length; i++) {
        res.push(
          <tr key={i} id={i}>
            <td>{tableData[i].submeter_id}</td>
            <td>
              <EditSubmeters
                tenant_id={tableData[i].tenant_id}
                // name={tableData[i].name}
                // email={tableData[i].email}
                // address={tableData[i].address}
                // phone_number={tableData[i].phone_number}
                meter={tableData[i].meter_id}
                submeter={tableData[i].submeter_id}
                property_id={this.state.property_id}
              />
            </td>
            <td>
              <DeleteSubmeters
                tenant_id={tableData[i].tenant_id}
                // name={tableData[i].name}
                // email={tableData[i].email}
                // address={tableData[i].address}
                // phone_number={tableData[i].phone_number}
                info={this}
                meter={tableData[i].meter_id}
                submeter_id={tableData[i].submeter_id}
                property_id={this.state.property_id}
              />
            </td>
            {/* <td> TODO what is this???
              <SubmeterBill submeter={tableData[i].submeter_id} />
            </td> */}
          </tr>
        );
      }
      this.res = res;
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Submeters</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Manage Submeters</DialogTitle>
          <table className="table">
            <tbody>{this.res}</tbody>
          </table>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField autoFocus margin="dense" id="submeter" label="Enter new submeter" type="text" onChange={this.changeSubmeter} fullWidth />
            <TextField autoFocus margin="dense" id="multiplier" label="Enter associated multiplier if has one" type="text" onChange={this.changeMultiplier} fullWidth />
            <MeterCheckBox const methodfromparent={this.getAssociatedMeter} property_id={this.state.property_id} />
            <Button onClick={this.onAdd} color="primary">
              Add
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Submeters;
