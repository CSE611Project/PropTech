import React from "react";
import "./../../../App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import NumberFormat from 'react-number-format';
import axios from "axios";

class EditTenant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      tenant_id: this.props.tenant_id,
      name: this.props.name,
      email: this.props.email,
      address: this.props.address,
      landlord_phone: this.props.landlord_phone,
      rubs: this.props.rubs,
      property_id: this.props.property_id,
      nameError: "",
      addressError: "",
      emailError: "",
      phoneError: "",
      name_errors: false,
      address_errors: false,
      email_errors: false,
      phone_errors: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changeLandlordPhone = this.changeLandlordPhone.bind(this);
    this.changeRubs = this.changeRubs.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validation = this.validation.bind(this);
  }
  componentDidUpdate() {
    if (this.props.tenant_id !== this.state.tenant_id) {
      this.setState({
        tenant_id: this.props.tenant_id,
        name: this.props.name,
        email: this.props.email,
        address: this.props.address,
        landlord_phone: this.props.landlord_phone,
        rubs: this.props.rubs,
        property_id: this.props.property_id,
      });
    }
  }
  updateTenantInfo(tenant_id, tenant_info) {
    axios.patch("/tenant", { sub: this.props.sub, tenant_id: tenant_id, tenant_info: tenant_info }).then((response) => {
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
      nameError: "",
      addressError: "",
      emailError: "",
      phoneError: "",
      name_errors: false,
      address_errors: false,
      email_errors: false,
      phone_errors: false,
    });
  }

  changeName(event) {
    this.setState({
      name: event.target.value,
      nameError: "",
      name_errors: false
    });
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value,
      emailError: "",
      email_errors: false
    });
  }

  changeAddress(event) {
    this.setState({
      address: event.target.value,
      addressError: "",
      address_errors: false
    });
  }

  changeLandlordPhone(event) {
    this.setState({
      landlord_phone: event.target.value,
      phoneError: "",
      phone_errors: false
    });
  }

  changeRubs(event) {
    this.setState({
      rubs: event.target.value,
    });
  }

  validation() {
    var isValidate = true;
    var email_pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var name_pattern = new RegExp(/^[a-z ,.'-]+$/i);
    if (this.state.name === "" || !name_pattern.test(this.state.name)) {
      var nameMessage = "Please enter a valid name"
      this.setState({
        nameError: nameMessage,
        name_errors: true
      })
      isValidate = false;
    }
    if (this.state.email === "" ) {
      var emailMessage = "Please enter a valid email address"
      this.setState({
        emailError: emailMessage,
        email_errors: true
      })
      isValidate = false;
    }
    if (!email_pattern.test(this.state.email)) {
      var emailMessage = "Please enter a valid email address"
      this.setState({
        emailError: emailMessage,
        email_errors: true
      })
      isValidate = false;
    }
    if (this.state.address === "") {
      var addressMessage = "Please enter a valid address"
      this.setState({
        addressError: addressMessage,
        address_errors: true
      })
      isValidate = false;
    }
    var phone_pattern = new RegExp(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);
    if (this.state.landlord_phone === "" || !phone_pattern.test(this.state.landlord_phone)) {
      var phoneMessage = "Please enter a valid phone number"
      this.setState({
        phoneError: phoneMessage,
        phone_errors: true
      })
      isValidate = false;
    }
    return isValidate;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.validation()) {
      this.setState({
        open: false,
        nameError: "",
        addressError: "",
        emailError: "",
        phoneError: "",
        name_errors: false,
        address_errors: false,
        email_errors: false,
        phone_errors: false,
      });
      var tenant_info = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        landlord_phone: this.state.landlord_phone,
        rubs: this.state.rubs,
        property_id: this.state.property_id,
      };
      var tenant_id = this.state.tenant_id;
      this.updateTenantInfo(tenant_id, tenant_info);
    }
  }

  render() {
    var is_validate_name = this.state.name_errors;
    var is_validate_address = this.state.address_errors;
    var is_validate_email = this.state.email_errors;
    var is_validate_phone = this.state.phone_errors;
    var name_message = this.state.nameError;
    var address_message = this.state.addressError;
    var email_message = this.state.emailError;
    var phone_message = this.state.phoneError;
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          Edit
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Enter Tenant Information</DialogTitle>
          <DialogContent>
            <TextField 
              autoFocus 
              margin="dense" 
              id="name" 
              label="Name" 
              type="text" 
              value={this.state.name}
              onChange={this.changeName} 
              helperText={is_validate_name ? name_message : null}
              error={this.state.name_errors}
              fullWidth 
            />
            <TextField 
              autoFocus 
              margin="dense" 
              id="email" 
              label="Email Address" 
              type="email" 
              value={this.state.email} 
              onChange={this.changeEmail} 
              helperText={is_validate_email ? email_message : null}
              error={this.state.email_errors}
              fullWidth 
            />
            <TextField 
              autoFocus 
              margin="dense" 
              id="address" 
              label="Address" 
              type="text" 
              value={this.state.address} 
              onChange={this.changeAddress} 
              helperText={is_validate_address ? address_message : null}
              error={this.state.address_errors}
              fullWidth 
            />
            <NumberFormat 
              customInput={TextField}
              autoFocus 
              margin="dense" 
              id="landlord_phone" 
              label="Landlord Phone" 
              type="text" 
              value={this.state.landlord_phone} 
              onChange={this.changeLandlordPhone} 
              helperText={is_validate_phone ? phone_message : null}
              error={this.state.phone_errors}
              fullWidth 
              format="(###) ###-####" 
            />          
            <TextField 
              autoFocus 
              margin="dense" 
              id="rubs" 
              label="rubs" 
              type="text" 
              value={this.state.rubs} 
              onChange={this.changeRubs} 
              fullWidth 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
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

export default EditTenant;
