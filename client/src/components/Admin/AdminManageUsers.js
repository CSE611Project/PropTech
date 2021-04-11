import { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { userPool, cognito, region, poolData } from "./../UserPool";
import axios from "axios";
const aws = require("aws-sdk");

class AdminManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_list: [],
    };
    this.generateTableData();
  }

  getUserList = () => {
    return new Promise((resolve, reject) => {
      axios.get(`/users`).then((response) => {
        this.setState({ user_list: response.data.Users });
        resolve();
      });
    });
  };

  generateTableData = () => {
    this.getUserList().then(() => {
      this.res = [];
      for (var i = 0; i < this.state.user_list.length; i++) {
        var attributes = this.state.user_list[i].Attributes.reduce((att, item) => Object.assign(att, { [item.Name]: item.Value }), {});
        console.log(attributes);
        this.res.push(
          <TableRow key={i} id={i}>
            <TableCell>{attributes["sub"]}</TableCell>
            <TableCell>{attributes["email"]}</TableCell>
            <TableCell>{attributes["custom:company_name"]}</TableCell>
            <TableCell>{attributes["custom:street_name"]}</TableCell>
            <TableCell>{attributes["custom:suite_number"]}</TableCell>
            <TableCell>{attributes["custom:city"]}</TableCell>
            <TableCell>{attributes["custom:state"]}</TableCell>
            <TableCell>{attributes["custom:zipcode"]}</TableCell>
          </TableRow>
        );
      }
      this.forceUpdate();
    });
  };
  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>UserId</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Street Name</TableCell>
              <TableCell>Suite Number</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Zipcode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.res}</TableBody>
        </Table>
      </div>
    );
  }
}

export default AdminManageUsers;
