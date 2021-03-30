import React, {useState} from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import PropertyInfo from './PropertyInfo.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

class AddProperty extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
            name: '',
            address: '',
            property_type: '',
            meters:''
        }

        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changeAddress = this.changeAddress.bind(this)
        this.changePropertyType = this.changePropertyType.bind(this)
        this.changeMeters = this.changeMeters.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    addProperty(property_info){
        axios.post('/property', {property_info: property_info}).then(response => {
            this.props.info.generateTableData();
        })
    }
    handleClickOpen() {
        this.setState({
            open: true
        })
    }
    handleClose() {
        this.setState({
            open: false
        })
    }

    changeName(event){
        this.setState({
            name: event.target.value
        })
    }

    changeAddress(event){
        this.setState({
            address: event.target.value
        })
    }

    changePropertyType(event){
        this.setState({
            property_type:event.target.value
        })
    }

    changeMeters(event){
        this.setState({
            meters: event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault();
        this.setState({
            open: false
        })

        var property_info = {
            name:this.state.name,
            address:this.state.address,
            property_type:this.state.property_type,   
        }

        this.addProperty(property_info);
    }

    render(){    
        return (
            <div>
                <Button onClick={this.handleClickOpen}>
                    Add Property
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Enter Property Info</DialogTitle>
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
                            id="address"
                            label="Address"
                            type="text"
                            onChange={this.changeAddress}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="property_type"
                            label="Property Type"
                            type="text"
                            onChange={this.changePropertyType}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="meters"
                            label="Meter List"
                            type="text"
                            onChange={this.changeMeters}
                            fullWidth
                        />
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