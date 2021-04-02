import React from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import TenantInfo from "./TenantInfo.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

class DeleteSubmeters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: this.props.name,
      tenant_id: this.props.tenant_id,
      email: this.props.email,
      address: this.props.address,
      rented_area: this.props.rented_area,
      submeter_list: this.props.submeter_list,
      submeter: this.props.submeter,
      property_id: this.props.property_id,
      submeter_id: this.props.submeter_id,
      meter_id: this.props.meter_id,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteSubmeter = this.deleteSubmeter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate() {
    if (this.props.submeter_id !== this.state.submeter_id) {
      this.setState({
        name: this.props.name,
        tenant_id: this.props.tenant_id,
        email: this.props.email,
        address: this.props.address,
        rented_area: this.props.rented_area,
        submeter_list: this.props.submeter_list,
        submeter: this.props.submeter,
        property_id: this.props.property_id,
        submeter_id: this.props.submeter_id,
        meter_id: this.props.meter_id,
      });
    }
  }
  deleteSubmeter() {
    {
      console.log("this tenant id:", this.state.tenant_id);
      console.log("this submeter_id: ", this.state.submeter_id);
      axios.delete("/delete_submeter", { data: { tenant_id: this.state.tenant_id, submeter_id: this.state.submeter_id } }).then((response) => {
        this.props.info.generateTable();
      });
    }
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

  onSubmit() {
    this.setState({
      open: false,
    });
    this.deleteSubmeter();
    console.log(this.state.submeter);
  }
  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen} color="primary">
          Delete
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Are you sure you want to delete this submeter?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Back
            </Button>
            <Button onClick={this.onSubmit} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteSubmeters;
