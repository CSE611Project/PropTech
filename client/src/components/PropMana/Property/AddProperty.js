import React from "react";
import "./../../../App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

class AddProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      address: "",
      total_footage: "",
      landlord_phone: "",
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeTotal_footage = this.changeTotal_footage.bind(this);
    this.changeLandlord_phone = this.changeLandlord_phone.bind(this);
  }
  addProperty(property_info) {
    axios.post("/property", { sub: this.props.sub, property_info: property_info }).then((response) => {
      this.props.generateTableData();
    });
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

  changeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  changeAddress(event) {
    this.setState({
      address: event.target.value,
    });
  }

  changeTotalFootage(event) {
    this.setState({
      total_footage: event.target.value,
    });
  }
  changeTotal_footage(event) {
    this.setState({
      total_footage: event.target.value,
    });
  }

  changeLandlord_phone(event) {
    this.setState({
      landlord_phone: event.target.value,
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      open: false,
    });

    var property_info = {
      name: this.state.name,
      address: this.state.address,
      property_type: "residential", // TODO get rid of this on backend and then here
      total_footage: this.state.total_footage,
      landlord_phone: this.state.landlord_phone,
    };

    this.addProperty(property_info);
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          Add Property
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Enter Property Info</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="Name" type="text" onChange={this.changeName} fullWidth />
            <TextField autoFocus margin="dense" id="address" label="Address" type="text" onChange={this.changeAddress} fullWidth />
            <TextField autoFocus margin="dense" id="totalfootage" label="Total Building Square Footage" type="text" onChange={this.changeTotal_footage} fullWidth />
            <TextField autoFocus margin="dense" id="landlord_phone" label="Landlord Phone Number" type="text" onChange={this.changeLandlord_phone} fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddProperty;
