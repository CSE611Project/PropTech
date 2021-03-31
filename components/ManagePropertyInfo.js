import React,{useState} from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import "./../ManagerProperty.css";
import Navigation from "./Navigation.js"
import HomePage from "./HomePage.js"
import PropManaAfterSign from "./PropManaAfterSign.js"
import EditProperty from "./EditProperty"
import AddProperty from "./AddProperty"
import DeleteProperty from "./DeleteProperty"
import { Component } from "react";
import { TableBody } from "@material-ui/core";
import axios from "axios";
class ManagePropertyInfo extends Component{

    constructor(props){
      super(props);
      this.state = {
        sub: this.props.sub,
        user_id: "123",
        property_list:[
          {
            property_id: "1",
            property_name: "xianx",
            property_address: "gggg",
            property_type: "1231",
            meters:"120"
          },
          {
            property_id: "2",
            property_name: "link",
            property_address: "gggg",
            property_type: "1231",
            meters:"120"

          }
        ]
      }
    }


    render(){
        return(
          <div>
            <div className="AdminAfterSign">
              <header className="Admin_menu">
                <h1>Property Manager Dashboard</h1>
                
                <ul className="buttonUL">
                  <button className="Admin_option" onClick={manage_tenant}>Manage Tenant Info</button>
                  <button className="Admin_option" onClick={manage_property}>Manage Property Info</button>
                  <button className="Admin_option" onClick={edit_profile}>Edit Profile Info</button>
                  <button className="Admin_option" onClick={manage_utility}>Manage Utility Bill</button>
                  <button className="Admin_option" onClick={manage_invoice}>Manage Invoice History</button>
                  <button className="Admin_option" onClick={generate_invoice}>Generate Invoice</button>
                  <button className="Admin_option" onClick={log_out}>Log Out</button>
                </ul>
              </header>
              <div className="property_list">
                        <table>
                            <tr>
                                <th>Property ID</th>
                                <th>Property Name</th> 
                                <th>Property Address</th>
                                <th>Property Type</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>Davis Hall</td>
                                <td>UB NorthCampus</td>
                                <td>Commerical Building</td><EditProperty />
                                <td><DeleteProperty /></td>
                            </tr>
                        </table>
                         
                        {/* <button onClick={select_property}>Select Property</button>   */}

                        <AddProperty />
                        
                    </div>
                                 
            </div>
            
          </div>


        );
    }
}


function manage_tenant() {
    const ele =
      <div>
  
      </div>
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

  function select_property(){
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
    return (ReactDOM.render(<ManagePropertyInfo />, document.getElementById('root')));
  }
  
  export default ManagePropertyInfo;