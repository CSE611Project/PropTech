import React, { useState } from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import Navigation from "./Navigation.js"
import HomePage from "./HomePage.js"
import PropManaAfterSign from "./PropManaAfterSign.js"
import AddProperty from "./AddProperty"
import EditProperty from "./EditProperty"
import DeleteProperty from "./DeleteProperty"
import TenantInfo from "./TenantInfo"
import { Component } from "react";
import { TableBody } from "@material-ui/core";
import axios from "axios";

class PropertyInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            sub: this.props.sub,
            property_list:[
            ]
        }
        this.generateTableData();
    }

    getPropertyList(){
        return new Promise((resolve, reject) => {
            axios.get(`/property`).then((response) => {
                this.setState({property_list: response.data})
                resolve();
            })
        })
    }

    // updatePropertyTable(sub, user_id, property_list){

    //     var property_list;
    //     for(var i=0; i<property_list.length;i++){
    //         this.state.property_list.push({

    //             property_name:property_list[i].property_name,
    //             property_address:property_list[i].property_address,
    //             property_type:property_list[i].property_type,
    //             meters: property_list[i].meters
    //         })
    //     }
    // }

    generateTableData(){
        this.getPropertyList().then(() => {
            this.res=[];
            let tableData = this.state.property_list;
            for(var i =0; i<tableData.length; i++){
                this.res.push(

                <tr key={i} id={i}>
                    <td key={tableData[i].name}>{tableData[i].name}</td>
                    <td key={tableData[i].address}>{tableData[i].address}</td>
                    <td key={tableData[i].property_type}>{tableData[i].property_type}</td>
                    <td key={tableData[i].meters}>{tableData[i].meters}</td>
                    <td><EditProperty
                                property_id={tableData[i].property_id}
                                name = {tableData[i].name}
                                address = {tableData[i].address}
                                property_type = {tableData[i].property_type}
                                meters = {tableData[i].meters}
                                user_id = {this.state.user_id}
                                info={this}
                            />
                    </td>
                    <td><DeleteProperty
                                property_id={tableData[i].property_id}
                                name = {tableData[i].name}
                                address = {tableData[i].address}
                                property_type = {tableData[i].property_type}
                                meters = {tableData[i].meters}
                                user_id = {this.state.user_id}
                                info={this}
                            />
                    </td>
                </tr>
            )}
            this.forceUpdate();
        })
    }

    render(){
    return (
        <div>
            <div className="AdminAfterSign">
                <header className="Admin_menu">
                    <h1>Property information</h1>
                    <ul className="buttonUL">
                        <button className="Admin_option" onClick={manage_tenant}>Manage Tenant Info</button>
                        <button className="Admin_option" onClick={manage_property}>Manage Property Info</button>
                        <button className="Admin_option" onClick={edit_profile}>Edit Profile Info</button>
                        <button className="Admin_option" onClick={manage_utility}>Manage Utility Bill</button>
                        <button className="Admin_option" onClick={manage_invoice}>Manage Invoice History</button>
                        <button className="Admin_option" onClick={generate_invoice}>Generate Invoice</button>
                        <button className="Admin_option" onClick={log_out}>Log Out</button>
                        </ul>
                    <div className="tenant_list" ref="tenant_list">
                    <table >
                                <tbody>
                                <tr>
                                    <th>Property Name</th>
                                    <th>Property Address</th>
                                    <th>Property Type</th>
                                    <th>Meters</th>
                                </tr>
                                {this.res}
                                </tbody>
                            </table>
                            <AddProperty user_id={this.state.user_id}
                            info={this}
                            />
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}

function manage_tenant() {
    const ele =
      <div>
        <TenantInfo />
      </div>
    window.location = "/PropManaAfterSign/TenantInfo"
    return (ReactDOM.render(ele, document.getElementById('root')));
  }
  
  function manage_property() {
    const ele =
    <div>
      <PropertyInfo />
    </div>
    window.location = "/PropManaAfterSign/PropertyInfo"
    return (ReactDOM.render(ele, document.getElementById('root')));
  }
  
function edit_profile() {
    const ele =
        <div>

        </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function manage_utility() {
    const ele =
        <div>

        </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function manage_invoice() {
    const ele =
        <div>

        </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function generate_invoice() {
    const ele =
        <div>

        </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function log_out() {
    const ele =
        <div>
            <div className="Admin_menu" id="logout">
                <header className="RegProcess-header">
                    <h1>You have successfully logout</h1>
                    <button className="button" onClick={homepage}>OK</button>
                </header>
            </div>
        </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function homepage() {
    window.location = "/"
    return (ReactDOM.render(<HomePage />, document.getElementById('root')));
}

function back() {
    return (ReactDOM.render(<PropManaAfterSign />, document.getElementById('root')));
}

function confirm_win() {
    window.confirm("Sure?");
}

function addNewProperty(sub, user_id, new_property){

    //call add_new_property function here to add to database


}

export default PropertyInfo;