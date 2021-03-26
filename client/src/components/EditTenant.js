import React, { useState } from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import TenantInfo from "./TenantInfo.js"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
class EditTenant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            sub: this.props.sub,
            tenant_id: this.props.tenant_id,
            name: this.props.name,
            email: this.props.email,
            address: this.props.address,
            rented_area: this.props.rented_area,
            submeter: this.props.submeter,
            property_id: this.props.property_id
        }

        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeAddress = this.changeAddress.bind(this)
        this.changeRentedArea = this.changeRentedArea.bind(this)
        this.changeSubmeter = this.changeSubmeter.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    updateTenantInfo(tenant_id, update_info){
        axios.patch('/PropManaAfterSign/TenantInfo', {tenant_id: tenant_id, update_info: update_info}).then(
            response => {
                
            }
          )
    }
    handleClickOpen() {
        this.setState({
            open: true
        })
        console.log(this.state.name, this.state.email, this.state.address, this.state.rented_area, this.state.submeter, this.state.property_id);
    }
    handleClose() {
        this.setState({
            open: false
        })
    }

    changeName(event) {
        this.setState({
            name: event.target.value
        })
    }

    changeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    changeAddress(event) {
        this.setState({
            address: event.target.value
        })
    }

    changeRentedArea(event) {
        this.setState({
            rented_area: event.target.value
        })
    }

    changeSubmeter(event) {
        this.setState({
            submeter: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({
            open: false
        })
        var update_info = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            property_share: this.state.rented_area,
            submeter: this.state.submeter,
            property_id: this.state.property_id
        }
        var tenant_id = this.state.tenant_id;
        console.log("tenant_id: ", tenant_id);
        this.updateTenantInfo(tenant_id, update_info);
        //console.log(this.state.name, this.state.email, this.state.address, this.state.rented_area, this.state.submeter, this.state.property_id);
    }


    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>
                    Edit
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Enter Tenant Information</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            onChange={this.changeName}
                            fullWidth 
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            onChange={this.changeEmail}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="address"
                            label="Address"
                            type="text"
                            onChange={this.changeAddress}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="rented_area"
                            label="Rented Area(sqft)"
                            type="text"
                            onChange={this.changeRentedArea}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="submeter"
                            label="Submeter"
                            type="text"
                            onChange={this.changeSubmeter}
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