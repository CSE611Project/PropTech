import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import HomePage from "./HomePage.js";
import PropManaAfterSign from "./PropManaAfterSign.js";
import PropertyInfo from "./PropertyInfo.js";
import EditTenant from "./EditTenant";
import AddTenant from "./AddTenant";
import DeleteTenant from "./DeleteTenant";
import Submeters from "./Submeters";
import Meters from "./Meters";
import MeterBillPage from "./MeterBillPage"
import SubmeterBill from "./SubmeterBill.js";
import CollapseSubmeter from "./CollapseSubmeter"
import { Component } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

class UtilityBillSubmeter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meter_list: this.props.meter_list,
            meter_id: this.props.meter_id,
            property_id: this.props.property_id,
            tenant_id: [],
            tenant_list: [],
            submeter_list: []


        }
        this.generateTable = this.generateTable.bind(this);
        this.getSubmeterList = this.getSubmeterList.bind(this);
        this.getTenantList = this.getTenantList.bind(this);
    }

    componentDidMount() {
        this.generateTable();
    }


    getTenantList() {
        return new Promise((resolve, reject) => {
            axios.get(`/tenant/${this.state.property_id}`).then((response) => {
                this.setState({ tenant_list: response.data });
                resolve();
            });
            console.log(this.state.tenant_list)
        });
    }

    getSubmeterList() {
        return new Promise((resolve, reject) => {
            axios.get(`/submeter/${this.state.tenant_id}`).then((response) => {
                this.setState({ submeter_list: response.data });
                resolve();
            });
        });
    }

    generateTable() {
        //call updateTable everytime when we need to generate a list of submeter and multiplier
        // see hardcode below in render() function
        this.getTenantList().then(() => {
            var res = [];
            let tableData = this.state.tenant_list;
            var gg = 0;
            for (var i = 0; i < tableData.length; i++) {
                this.state.tenant_id = tableData[i].tenant_id;
                this.getSubmeterList().then(() => {
                    let tableDataSub = this.state.submeter_list;
                    for (var j = 0; j < tableDataSub.length; j++) {
           
                        res.push(
                            
                            <TableRow key={gg} id={gg}>
                                <TableCell>{tableDataSub[j].submeter_id}</TableCell>
                                <TableCell>{tableDataSub[j].multiplier}</TableCell>
                                <TableCell>{tableDataSub[j].meter_id}</TableCell>
                                <TableCell>
                                    <SubmeterBill
                                        submeter_id={tableDataSub[j].submeter_id}
                                        tenant_id={tableDataSub[j].tenant_id}
                                        info={this}
                                        meter_id={tableDataSub[j].meter_id}
                                        property_id={this.state.property_id}
                                        multiplier={tableDataSub[j].multiplier}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                        gg++;
                    }
                
                });
            }
            console.log("ressfsafas",res.length);
            this.res = res;
            this.forceUpdate();
        });
    }

    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Submeters</Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Submeter numbers</TableCell>
                            <TableCell>Multiplier</TableCell>
                            <TableCell>Associated Meter</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.res}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default UtilityBillSubmeter;