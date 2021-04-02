import React from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import PropertyInfo from './PropertyInfo.js';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

class DeleteMeters extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          name: this.props.name,
          property_id: this.props.property_id,
          address: this.props.address,
          meter_list: this.props.meter_list,
          meter: this.props.meter,
          user_id: this.props.user_id,
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate() {
        if (this.props.property_id !== this.state.property_id) {
          this.setState({
            name: this.props.name,
            property_id: this.props.property_id,
            address: this.props.address,
            meter_list: this.props.meter_list,
            meter: this.props.meter,
            user_id: this.props.user_id,
          });
        }
    }

    deleteMeter() {
        {
          /*axios.delete('/property', {data: {property_id: this.state.property_id , user_id: this.state.user_id }}).then(response => {
                this.props.info.generateTableData();
            })*/
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
        this.deleteMeter();
    }
    
    render() {
        return (
          <div>
            <Button onClick={this.handleClickOpen} color="primary">
              Delete
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this meter?
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
        );
      }      
    
}
export default DeleteMeters;