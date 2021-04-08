import React, { useState } from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import TenantInfo from "./TenantInfo.js"
import DatePicker from './DatePicker.js'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

class SubmeterBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            submeter_bill_id: '',
            bill_id: '',
            submeter_id: '',
            prior_read: '',
            current_read: '',
            from_date: '',
            to_date: '',
            amt_due: '',
        }

        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.changePriorRead = this.changePriorRead.bind(this)
        this.changeCurrentRead = this.changeCurrentRead.bind(this)
        this.changeAmountDue = this.changeAmountDue.bind(this)
        this.calculate = this.calculate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidUpdate() {
        {/*if (this.props.tenant_id !== this.state.tenant_id) {
            this.setState({name: this.props.name,
                tenant_id: this.props.tenant_id,
                email: this.props.email,
                address: this.props.address,
                phone_number: this.props.phone_number,
                submeter: this.props.submeter,
                property_id: this.props.property_id});
        }*/}
    }
    updateBill(submeter_id, bill_id) {
        {/*axios.patch('/tenant', {tenant_id: tenant_id, tenant_info: tenant_info}).then(response => {
            this.props.info.generateTableData();
        })*/}
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

    changePriorRead(event) {
        this.setState({
            prior_read: event.target.value
        })
    }

    changeCurrentRead(event) {
        this.setState({
            current_read: event.target.value
        })
    }

    changeAmountDue(event) {
        this.setState({
            amt_due: event.target.value
        })
    }

    calculate() {

    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({
            open: false
        })

        {/* updateBill not so sure about parameter */ }
        this.updateBill(this.state.submeter_id, this.state.submeter);
        console.log(this.state.submeter)
    }


    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen} color="primary">
                    Create Submeter Bill
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Input utility bill manually</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="submeter"
                            label="Submeter"
                            type="text"
                            //value will be current submeter value
                            value={this.props.submeter_id}
                            fullWidth
                        />
                        <DialogContent></DialogContent>
                        <DatePicker />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="prior_read"
                            label="Prior read"
                            type="text"
                            onChange={this.changePriorRead}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="current_read"
                            label="Current read"
                            type="text"
                            onChange={this.changeCurrentRead}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="amt_due"
                            label="Amount due"
                            type="text"
                            onChange={this.changeAmountDue}
                            fullWidth
                        />
                        <Button color="primary" onClick={this.calculate}>Calculate</Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onSubmit} color="primary">
                            Update Bill
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}
export default SubmeterBill;