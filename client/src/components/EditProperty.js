import React from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import PropertyInfo from "./PropertyInfo";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

class EditProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      property_id: this.props.property_id,
      name: this.props.name,
      address: this.props.address,
      property_type: this.props.property_type,
      total_footage: this.props.total_footage,
      landlord_phone: this.props.landlord_phone,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changePropertyType = this.changePropertyType.bind(this);
    this.changeTotalFootage = this.changeTotalFootage.bind(this);
    this.changeLandlordPhone = this.changeLandlordPhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate() {
    if (this.props.property_id !== this.state.property_id) {
      this.setState({
        property_id: this.props.property_id,
        name: this.props.name,
        address: this.props.address,
        property_type: this.props.property_type,
        total_footage: this.props.total_footage,
        landlord_phone: this.props.landlord_phone,
      });
    }
  }

  updatePropertyInfo(property_info) {
    axios.patch("/property", { property_info: property_info }).then((response) => {
      this.props.info.generateTableData();
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

  changePropertyType(event) {
    this.setState({
      property_type: event.target.value,
    });
  }

  changeTotalFootage(event) {
    this.setState({
      total_footage: event.target.value,
    });
  }

  changeLandlordPhone(event) {
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
      property_id: this.state.property_id,
      name: this.state.name,
      address: this.state.address,
      property_type: this.state.property_type,
      total_footage: this.state.total_footage,
      landlord_phone: this.state.landlord_phone,
    };
    this.updatePropertyInfo(property_info);
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>Edit</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Property Info</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="Property Name" type="text" value={this.state.name} onChange={this.changeName} fullWidth />
            <TextField autoFocus margin="dense" id="address" label="Property Address" type="text" value={this.state.address} onChange={this.changeAddress} fullWidth />
            <TextField autoFocus margin="dense" id="total_footage" label="Total Footage" type="text" value={this.state.total_footage} onChange={this.changeTotalFootage} fullWidth />
            <TextField autoFocus margin="dense" id="landlord_phone" label="Landlord Phone" type="text" value={this.state.landlord_phone} onChange={this.changeLandlordPhone} fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditProperty;
