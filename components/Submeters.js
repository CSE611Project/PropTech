import React, { useState } from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import TenantInfo from './TenantInfo.js'
import DeleteSubmeters from './DeleteSubmeters.js'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

class Submeters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: this.props.name,
            tenant_id: this.props.tenant_id,
            email: this.props.email,
            address: this.props.address,
            rented_area: this.props.rented_area,
            submeter_list: [],
            submeter: "",
            property_id: this.props.property_id
        }

        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.getSubmeterList = this.getSubmeterList.bind(this)
        this.changeSubmeter = this.changeSubmeter.bind(this)
        this.addSubmeter = this.addSubmeter.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.generateSubmeter = this.generateSubmeter.bind(this)
    }

    componentDidUpdate() {
        if (this.props.property_id !== this.state.property_id) {
            this.setState({
                property_id: this.props.property_id
            });
        }
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

    getSubmeterList() {
        {/*return new Promise((resolve, reject) => {
            axios.get(`/tenant/${this.state.property_id}`).then((response) => {
                this.setState({ submeter_list: response.data })
                resolve();
            })
        })*/}
    }

    changeSubmeter(event) {
        this.setState({
            submeter: event.target.value
        })
    }

    addSubmeter(property_id, tenant_info){
        {/*axios.post('/tenant', {property_id: this.state.property_id, tenant_info: tenant_info}).then(response => {
            this.props.info.generateTableData();
        })*/}
    }

    onAdd(event) {
        event.preventDefault();
        this.addSubmeter()
        console.log(this.state.submeter)
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({
            open: false,
            submeter: ""
        })

    }

    generateSubmeter() {
        //call updateTable everytime when we need to generate a list of tenants
        //this.updateTenantTable(this.state.sub, this.state.property_id);
        this.getSubmeterList().then(() => {
            var res = [];
            let tableData = this.state.submeter_list;
            for (var i = 0; i < tableData.length; i++) {
                res.push(

                    <tr key={i} id={i}>
                        <td key={tableData[i]}>{tableData[i]}</td>
                        <td><DeleteSubmeters /></td>
                    </tr>
                )
            }
            this.res = res;
            this.forceUpdate();
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>
                    Submeters
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Manage Submeters</DialogTitle>
                    {this.res}
                    <table>
                        <td>192962</td>
                        <td><DeleteSubmeters /></td>
                    </table>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="submeter"
                            label="Submeter"
                            type="text"
                            onChange={this.changeSubmeter}
                            fullWidth
                        />
                        <Button onClick={this.onAdd} color="primary">
                            Add
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Submeters;