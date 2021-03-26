import React, { useState } from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import Navigation from "./Navigation.js"
import HomePage from "./HomePage.js"
import PropManaAfterSign from "./PropManaAfterSign.js"
import EditTenant from "./EditTenant"
import AddTenant from "./AddTenant"
import DeleteTenant from "./DeleteTenant"
import { Component } from "react";
import { TableBody } from "@material-ui/core";
import axios from "axios";
//import { router } from "./server/src/router.js";
class TenantInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            sub: this.props.sub,
            property_id: "123",
            tenant_list: [
                {
                tenant_id: "1",
                name: "xianx",
                email:"1233",
                address: "gggg",
                rented_area: "1231",
                submeter:"120"
                },
                {
                tenant_id: "2",
                name: "link",
                email:"1233",
                address: "gggg",
                rented_area: "1231",
                submeter:"120"
                }
            ]

        }
    }
    getTenantList(){
        axios.get('/PropManaAfterSign/TenantInfo', {sub : this.state.sub, property_id : this.state.property_id }).then(
            response => {

            }
          )
    }

    delte(){
        axios.get('/PropManaAfterSign/TenantInfo', this.state.sub).then(
            response => {
                
            }
          )
    }

    delete_tenant = (i) => {
        console.log(i);
        //console.log(this.state.tenant_list[i].name);
    }
    handleDelete = tenant_id => {
        console.log(tenant_id)
    }
    updateTenantTable(sub,  propery_id, tenant_list){        
                // res.json(db.); TODO get tenant list under this property
                var tenant_list;
                for(var i = 0; i < tenant_list.length; i++){
                    this.state.tenant_list.push({
                        name: tenant_list[i].name,
                        email: tenant_list[i].email,
                        address: tenant_list[i].address,
                        rented_area: tenant_list[i].rented_area,
                        submeter: tenant_list[i].submeter

                    })
                }

            }
    

    


    

    //get tenant_list from database  implement get_tenant_list function here

    

    generateTableData(){
        //call updateTable everytime when we need to generate a list of tenants
        //this.updateTenantTable(this.state.sub, this.state.property_id);
        let res=[];
        let tableData = this.state.tenant_list;
        for(var i =0; i < tableData.length; i++){
            res.push(
              
             <tr key={i} id={i}>
                <td key={tableData[i].tenant_id}></td>
                <td key={tableData[i].name}>{tableData[i].name}</td>
                <td key={tableData[i].email}>{tableData[i].email}</td>
                <td key={tableData[i].address}>{tableData[i].address}</td>
                <td key={tableData[i].rented_area}>{tableData[i].rented_area}</td>
                <td key={tableData[i].submeter}>{tableData[i].submeter}</td>
                <td className= "edit_delete">
                    <ul className="edit_delete_ul">
                        <EditTenant 
                            name={tableData[i].name}
                            email={tableData[i].email}
                            address={tableData[i].address}
                            rented_area={tableData[i].rented_area}
                            submeter={tableData[i].submeter}
                            property_id={this.state.property_id}
                        />
                        <DeleteTenant 
                            name={tableData[i].name}
                            email={tableData[i].email}
                            address={tableData[i].address}
                            rented_area={tableData[i].rented_area}
                            submeter={tableData[i].submeter}
                            property_id={this.state.property_id}
                        />
                    </ul>
                </td>
            </tr>
            )


        }
        return res;
    }
    render(){
        return (
            <div>
                <div className="AdminAfterSign">
                    <header className="Admin_menu">
                        <h1>Tenants information</h1>
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
                                    <th>Tenant ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Rented Area(sqft)</th>
                                    <th>Submeter</th>

                                </tr>
                                {this.generateTableData()}
                                </tbody>
                            </table>
                            <AddTenant property_id={this.state.property_id}/>   
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

        </div>
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
function addNewTenant(sub, property_id, new_tenant){

    //call add_new_tenant function here to add to database


}

export default TenantInfo;
