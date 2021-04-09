import { Component } from "react";
import axios from "axios";
import { userPool, cognito, region } from "./UserPool";
import { Table, TableBody, TableCell, TableRow, TextField, Button } from "@material-ui/core";
const aws = require("aws-sdk");

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: sessionStorage.getItem("username"),
      "custom:company_name": sessionStorage.getItem("custom:company_name"),
      "custom:street_name": sessionStorage.getItem("custom:street_name"),
      "custom:suite_number": sessionStorage.getItem("custom:suite_number"),
      "custom:city": sessionStorage.getItem("custom:city"),
      "custom:state": sessionStorage.getItem("custom:state"),
      "custom:zipcode": sessionStorage.getItem("custom:zipcode"),
    };
  }

  edit_attributes(attribute_name) {
    var params = {
      AccessToken: JSON.parse(sessionStorage.getItem("accessToken")).jwtToken,
      UserAttributes: [
        {
          Name: attribute_name,
          Value: this.state[attribute_name],
        },
      ],
    };
    var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ region: region });
    cognitoidentityserviceprovider.updateUserAttributes(params, (err, data) => {
      if (err) console.log(err);
      else sessionStorage.setItem(attribute_name, this.state[attribute_name]);
    });
  }

  changeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  changeCompanyName = (event) => {
    this.setState({
      "custom:company_name": event.target.value,
    });
  };

  changeStreetName = (event) => {
    this.setState({
      "custom:street_name": event.target.value,
    });
  };

  changeSuiteNumber = (event) => {
    this.setState({
      "custom:suite_number": event.target.value,
    });
  };

  changeCity = (event) => {
    this.setState({
      "custom:city": event.target.value,
    });
  };

  changeState = (event) => {
    this.setState({
      "custom:state": event.target.value,
    });
  };

  changeZipcode = (event) => {
    this.setState({
      "custom:zipcode": event.target.value,
    });
  };

  render() {
    return (
      <div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>email</TableCell>
              <TableCell>
                <TextField type="text" value={this.state.email} onChange={this.changeEmail} fullWidth />
              </TableCell>
              <TableCell>
                <Button onClick={() => this.edit_attributes("email")}>Change</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>
                <TextField type="text" value={this.state["custom:company_name"]} onChange={this.changeCompanyName} fullWidth />
              </TableCell>
              <TableCell>
                <Button onClick={() => this.edit_attributes("custom:company_name")}>Change</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Street Address</TableCell>
              <TableCell>
                <TextField type="text" value={this.state["custom:street_name"]} onChange={this.changeStreetName} fullWidth />
              </TableCell>
              <TableCell>
                <Button onClick={() => this.edit_attributes("custom:street_name")}>Change</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Suite</TableCell>
              <TableCell>
                <TextField type="text" value={this.state["custom:suite_number"]} onChange={this.changeSuiteNumber} fullWidth />
              </TableCell>
              <TableCell>
                <Button onClick={() => this.edit_attributes("custom:suite_number")}>Change</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>
                <TextField type="text" value={this.state["custom:city"]} onChange={this.changeCity} fullWidth />
              </TableCell>
              <TableCell>
                <Button onClick={() => this.edit_attributes("custom:city")}>Change</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>State</TableCell>
              <TableCell>
                <TextField type="text" value={this.state["custom:state"]} onChange={this.changeState} fullWidth />
              </TableCell>
              <TableCell>
                <Button onClick={() => this.edit_attributes("custom:state")}>Change</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>zipcode</TableCell>
              <TableCell>
                <TextField type="text" value={this.state["custom:zipcode"]} onChange={this.changeZipcode} fullWidth />
              </TableCell>
              <TableCell>
                <Button onClick={() => this.edit_attributes("custom:zipcode")}>Change</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default UserProfile;
