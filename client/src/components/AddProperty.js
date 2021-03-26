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

class AddProperty extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
            property_name: '',
            property_address: '',
            property_type: '',
            meters:'',
            user_id: this.props.user_id
        }

        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.changePropertyName = this.changePropertyName.bind(this)
        this.changePropertyAddress = this.changePropertyAddress.bind(this)
        this.changePropertyType = this.changePropertyType.bind(this)
        this.changeMeters = this.changeMeters.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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

    changePropertyName(event){
        this.setState({
            property_name: event.target.value
        })
    }

    changePropertyAddress(event){
        this.setState({
            property_address: event.target.value
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
        console.log(this.state.property_name, this.state.property_address, this.state.property_type, this.state.meters);
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
                        id="property_name"
                        label="Property Name"
                        type="text"
                        onChange={this.changePropertyName}
                        fullWidth 
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="property_address"
                        label="Property Address"
                        type="text"
                        onChange={this.changePropertyAddress}
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