import React from "react";
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

class DeleteTenant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            name: this.props.name,
            tenant_id: this.props.tenant_id,
            email: this.props.email,
            address: this.props.address,
            rented_area: this.props.rented_area,
            submeter: this.props.submeter,
            property_id: this.props.property_id
        }
        
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    deleteTenant(){
        console.log(this.state.tenant_id);
        axios.delete('/PropManaAfterSign/TenantInfo', {user_id: this.state.tenant_id , property_id: this.property_id }).then(
            response => {
                
            }
          )


    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    };

    handleClose() {
        this.setState({
            open: false
        })
    };

    onSubmit() {
        this.setState({
            open: false
        })
        this.deleteTenant();

        console.log(this.state.name, this.state.email, this.state.address, this.state.rented_area, this.state.submeter, this.state.property_id)
    }
    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>
                    Delete
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the chosen tenant?
                        </DialogContentText>
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
        )
    }
}

export default DeleteTenant;