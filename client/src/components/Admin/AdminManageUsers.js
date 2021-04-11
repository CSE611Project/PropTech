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
        console.log(response.data);
        this.setState({ user_list: response.data });
        resolve();
      });
    });
  };

  generateTableData = () => {
    this.getUserList().then(() => {
      this.res = [];
      for (var i = 0; i < this.state.user_list.length; i++) {
        this.res.push(
          <TableRow key={i} id={i}>
            <TableCell>{this.state.user_list[i].name}</TableCell>
            <TableCell>{this.state.user_list[i].email}</TableCell>
            <TableCell>{this.state.user_list[i].address}</TableCell>
            <TableCell>{this.state.user_list[i].landlord_phone}</TableCell>
            <TableCell>{this.state.user_list[i].rubs}</TableCell>
          </TableRow>
        );
      }
    });
  };
  render() {
    return <div></div>;
  }
}

export default AdminManageUsers;
