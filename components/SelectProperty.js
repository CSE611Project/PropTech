import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import "./../ManagerProperty.css";
import Navigation from "./Navigation.js"
import HomePage from "./HomePage.js"
import EditProperty from "./EditProperty"
import AddProperty from "./AddProperty"
class SelectProperty extends React.Component{
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
                                <td>0001</td>
                            </tr>

                            <tr>
                                <th>Property Name</th>
                                <td>Davis Hall</td>
                            </tr>

                            <tr>
                                <th>Property Address</th>
                                <td>UB NorthCampus</td>
                            </tr>

                            <tr>
                                <th>Property Type</th>
                                <td>Commerical Building</td>
                            </tr>
                            <tr>
                                <th>meter #123456</th>
                                <td><EditProperty /></td>
                            </tr>

                            <tr>
                                <td>meter #156789</td>
                                <td><AddProperty /></td>
                            </tr>
                        </table>
                        
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
  
  export default SelectProperty;