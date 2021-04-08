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
import { Component } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DialogContent, DialogContentText, Tab } from "@material-ui/core";

class CollapseSubmeter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            name: this.props.name,
            tenant_id: this.props.tenant_id,
            email: this.props.email,
            address: this.props.address,
            phone_number: this.props.phone_number,
            submeter_list: [],
            submeter: "",
            multiplier_list: [],
            multiplier: "",
            property_id: this.props.property_id,
            meter_id: this.props.meter_id,
            meter_list: [],
            meter: ""
        }
        this.getSubmeterList = this.getSubmeterList.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.generateTable = this.generateTable.bind(this);
    }

    componentDidUpdate() {
        if (this.props.tenant_id !== this.state.tenant_id) {
            this.setState({
                name: this.props.name,
                tenant_id: this.props.tenant_id,
                email: this.props.email,
                address: this.props.address,
                phone_number: this.props.phone_number,
                submeter_list: [],
                submeter: "",
                multiplier_list: [],
                multiplier: "",
                property_id: this.props.property_id,
                meter_id: this.props.meter_id,
                meter_list: [],
                meter: "",
            });
        }
    }

    getSubmeterList() {
        return new Promise((resolve, reject) => {
            axios.get(`/submeter/${this.state.tenant_id}`).then((response) => {
                this.setState({ submeter_list: response.data });
                resolve();
            });
        });
    }

    onOpen(event) {
        this.setState({
            open: !this.open
        })
        this.generateTable();
    }

    generateTable() {
        //call updateTable everytime when we need to generate a list of submeter and multiplier
        // see hardcode below in render() function
        this.getSubmeterList().then(() => {
            var res = [];
            let tableData = this.state.submeter_list;
            for (var i = 0; i < tableData.length; i++) {
                res.push(
                    <TableRow key={i} id={i}>
                        <TableCell>{tableData[i].submeter_id}</TableCell>
                        <TableCell>{tableData[i].multiplier}</TableCell>
                        <TableCell>{tableData[i].meter_id}</TableCell>
                    </TableRow>
                );
            }
            this.res = res;
            this.forceUpdate();
        });
    }

    render() {
        return (
           <div>
                <TableCell>
                    <IconButton aria-label="expand row" size="large" onClick={this.onOpen}>
                        {this.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={this.open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Submeters
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Submeter</TableCell>
                                            <TableCell>Multiplier</TableCell>
                                            <TableCell>Associated Meter</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.res}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
                </div>
        );
    }
}

export default CollapseSubmeter;