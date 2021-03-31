import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import HomePage from "./HomePage.js";
import PropManaAfterSign from "./PropManaAfterSign.js";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";
import DeleteProperty from "./DeleteProperty";
import TenantInfo from "./TenantInfo";
import { Component } from "react";
import Button from "@material-ui/core/Button";
import { TableBody } from "@material-ui/core";
import axios from "axios";

class PropertyInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          display: this.props.display,
          sub: this.props.sub,
          property_list: [],
        };
        this.generateTableData();
      }

    componentDidUpdate() {
        if (this.props.sub !== this.state.sub) {
          this.setState({
            display: this.props.display,
            sub: this.props.sub,
            property_list: [],
          });
          this.generateTableData();
        }
      }

      getPropertyList() {
        return new Promise((resolve, reject) => {
          axios.get(`/property`).then((response) => {
            this.setState({ property_list: response.data });
            resolve();
          });
        });
      }

      viewTenants = (property) => {
        console.log(this.state.display);
        this.state.display.setState({
          page: <TenantInfo display={this.state.display} property_id={property[0]} />,
          page_stack: [this.state.display.state.page_stack, this],
          page_name: [this.state.display.state.page_name, `Property:${property.slice(2)}`],
        });
      };

      generateTableData = () => {
        this.getPropertyList().then(() => {
          this.res = [];
          for (var i = 0; i < this.state.property_list.length; i++) {
            this.res.push(
              <tr key={i} id={i}>
                <td>{this.state.property_list[i].name}</td>
                <td>{this.state.property_list[i].address}</td>
                <td>{this.state.property_list[i].property_type}</td>
                <td>{this.state.property_list[i].meters}</td>
                <td>
                  <Button value={[this.state.property_list[i].property_id, this.state.property_list[i].name]} onClick={(e) => this.viewTenants(e.currentTarget.value)} color="inherit">
                    View Tenants
                  </Button>
                </td>
                <td>
                  <EditProperty
                    property_id={this.state.property_list[i].property_id}
                    name={this.state.property_list[i].name}
                    address={this.state.property_list[i].address}
                    property_type={this.state.property_list[i].property_type}
                    meters={this.state.property_list[i].meters}
                    user_id={this.state.user_id}
                    info={this}
                  />
                </td>
                <td>
                  <DeleteProperty
                    property_id={this.state.property_list[i].property_id}
                    name={this.state.property_list[i].name}
                    address={this.state.property_list[i].address}
                    property_type={this.state.property_list[i].property_type}
                    meters={this.state.property_list[i].meters}
                    user_id={this.state.user_id}
                    info={this}
                  />
                </td>
              </tr>
            );
          }
          this.forceUpdate();
        });
      };


    render(){
        return (
            <div>
                <body>
                <div className="sidenav">
                    <header>
                        <ul>
                            <a onClick={manage_tenant}>Manage Tenant Info</a>
                            <a onClick={manage_property}>Manage Property Info</a>
                            <a onClick={edit_profile}>Edit Profile Info</a>
                            <a onClick={manage_utility}>Manage Utility Bill</a>
                            <a onClick={manage_invoice}>Manage Invoice History</a>
                            <a onClick={generate_invoice}>Generate Invoice</a>
                            <a onClick={log_out}>Log Out</a>
                            </ul>
                            </header>
                    </div>
                    <div className="main">
                    <h1 className="AdminAfterSign">Property Information</h1>
                    <table className="display_item" >
                                <tbody>
                                <tr>
                                    <th>PropertyID</th>
                                    <th>PropertyName</th>
                                    <th>PropertyAddress</th>
                                    <th>PropertyType</th>
                                    <th>Meters</th>
                                    <AddProperty user_id={this.state.user_id} info={this} />
                                </tr>
                                {this.res}
                                </tbody>
                            </table>
                            
                        
                        </div>
                              
                </body>
            </div>
        );
    }


}

function manage_tenant() {
    const ele =
        <div>
            <TenantInfo />
        </div>
    window.location = "./TenantInfo"
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function manage_property() {
    const ele =
        <div>
            <PropertyInfo />
        </div>
    window.location = "./PropertyInfo"
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