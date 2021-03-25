import React, { useState } from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import TenantInfo from './TenantInfo.js'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddTenant = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);
    const [rented_area, setRentedArea] = useState(null);
    const [submeter, setSubmeter] = useState(null);
    
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const changeName = (event) => {
        setName(event.target.value)
    }

    const changeEmail = (event) => {
        setEmail(event.target.value)
    }

    const changeAddress = (event) => {
        setAddress(event.target.value)
    }

    const changeRentedArea = (event) => {
        setRentedArea(event.target.value)
    }

    const changeSubmeter = (event) => {
        setSubmeter(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setOpen(false);
        console.log(name, email, address, rented_area, submeter);
        <TenantInfo name={name} email={email} address={address} rented_area={rented_area} submeter={submeter} />
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Add Tenant
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Enter Tenant Info</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        onChange={changeName}
                        fullWidth 
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        onChange={changeEmail}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        onChange={changeAddress}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="rented_area"
                        label="Rented Area(sqft)"
                        type="text"
                        onChange={changeRentedArea}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="submeter"
                        label="Submeter"
                        type="text"
                        onChange={changeSubmeter}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTenant;