import React, { useState } from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import PropertyInfo from './PropertyInfo.js';
import DeleteMeters from './DeleteMeters.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";

class MeterBillPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,

            checked: false,  /*for check box status*/
            setCheck:false, /*for check box status*/

            meter_code: "",
            begin: "",
            end: "",
            KWH_usage: "",
            bill:"",
            user_id: this.props.user_id,

            /*second bill info */
            sec_KWH_usage:"",
            sec_bill:"",
            
        }    
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.changeMeter = this.changeMeter.bind(this)
        this.changeBegin = this.changeBegin.bind(this)
        this.changeEnd = this.changeEnd.bind(this)
        this.changeKWH = this.changeKWH.bind(this)
        this.changeBill = this.changeBill.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        /*second bill handlers */
        this.change_sec_KWH = this.change_sec_KWH.bind(this)
        this.change_sec_bill = this.change_sec_bill.bind(this)

        /*handle check box change event*/
        this.changeCheckBox = this.changeCheckBox.bind(this)
        
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

    chagneMeter(event){
        this.setState({
            meter_code:event.target.value
        })
    }

    changeBegin(event){
        this.setState({
            begin: event.target.value
        })
    }

    changeEnd(event){
        this.setState({
            end: event.target.value
        })
    }

    changeKWH(event){
        this.setState({
            KWH_usage: event.target.value
        })
    }

    changeBill(event){
        this.setState({
            bill: event.target.value
        })
    }

    change_sec_KWH(event){
        this.setState({
            sec_KWH_usage: event.target.value
        })
    }

    change_sec_bill(event){
        this.setState({
            sec_bill: event.target.value
        })
    }

    changeCheckBox(event){
        this.setState({
            setCheck: event.target.checked
        })
    }

    addBill(bill_info) {
    /*    axios.post("/bill", { bill_info: bill_info }).then((response) => {
          this.props.info.generateTableBill();
        });
    */  
        /* the bill should be saved in somewhere of database */
      }

    onSubmit(event){
        event.preventDefault();
        this.setState({
            open: false,
        })

        var bill_info = {
            meter_code: this.state.meter_code,
            begin: this.state.begin,
            end: this.state.end,
            KWH_usage: this.state.KWH_usage,
            bill: this.state.bill,

            /*second bill info */
            sec_KWH_usage: this.state.sec_KWH_usage,
            sec_bill: this.state.sec_bill,
        }
        this.addBill(bill_info);
    }

    render() {
        return (
            <div>
            <Button onClick={this.handleClickOpen}>Manually Input The Bill</Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Enter Billing Info</DialogTitle>
              <DialogContent>
                <DialogContentText></DialogContentText>
                <TextField autoFocus margin="dense" id="meter_code" label="meter#" type="text" onChange={this.changeMeter} fullWidth />
                <TextField autoFocus margin="dense" id="s_date" label="start date" type="text" onChange={this.changeStart} fullWidth />
                <TextField autoFocus margin="dense" id="e_date" label="end date" type="text" onChange={this.changeEnd} fullWidth />
                <TextField autoFocus margin="dense" id="kwh_rate" label="KWH" type="text" onChange={this.changeKWH} fullWidth />
                <TextField autoFocus margin="dense" id="bill_amount" label="bill $" type="text" onChange={this.changeBill} fullWidth />

        
                <Checkbox checked={checked} onChange={this.changeCheckBox} 
                label = "I have second bill/constellation company need to input"
                inputProps={{ "aria-label": "primary checkbox" }}/>


              <ListItem alignItems="center">
              <DialogTitle id="form-dialog-title" disabled={!this.state.checked} onChange={this.changeKWH}>Enter Constellation Billing Info</DialogTitle>
              <TextField autoFocus margin="dense" id="kwh_rate" label="KWH" type="text" disabled={!this.state.checked} onChange={this.changeKWH} fullWidth />
              <TextField autoFocus margin="dense" id="bill_amount" label="bill $" type="text" disabled={!this.state.checked} onChange={this.changeBill} fullWidth />
              </ListItem>
              

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={this.onSubmit} color="primary">
                  Update Bill
                </Button>
                <Button onClick={this.onSubmit} color="primary">
                  Fetch Bill by API
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }



}
export default MeterBillPage;