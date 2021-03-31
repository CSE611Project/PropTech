var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "proptech-test-db.cojysjcyt3zb.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "BtEbh9FnbMV2SwNCEc9J",
  port: "3306",
  database: "PropTech_Test_DB",
});

function establishDatabaseConnection() {
  connection.connect(function (err) {
    if (err) {
      console.error("Database connection failed: " + err.stack);
      return;
    }
    console.log("Connected to database.");
  });
}

// Insert user_id to database
function insertUserId(user_id, callback) {
  let sql = `INSERT INTO user (user_id) VALUES (?)`;
  let inserts = [user_id];
  connection.query(sql, inserts, function (err, result) {
    // check error type later
    if (err) {
      console.log(`not able to add user_id: ${user_id} in to database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log(`user_id: ${user_id} added`);
        callback(true);
      } else {
        console.log(`user_id: ${user_id} add failed`);
        callback(false);
      }
    }
  });
}

// delete user_id from user table
// should able to delete all data related to the user needs to be deleted
function deleteUserId(user_id, callback) {
  let sql = `DELETE FROM user WHERE ?? = ?`;
  let inserts = ["user_id", user_id];
  connection.query(sql, inserts, function (err, result) {
    // check error type later
    if (err) {
      console.log(`not able to delete user_id: ${user_id} from database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log("deleted");
        callback(true);
      } else {
        console.log("deleted");
        callback(false);
      }
    }
  });
}

// return list of JSON contains all tenant info for a property
function selectAllTenants(property_id, callback) {
  let sql = `SELECT * FROM tenant WHERE ?? = ?`;
  let inserts = ["property_id", property_id];
  connection.query(sql, inserts, function (err, tenantList) {
    if (err) {
      console.log(`not able to select tenantList of property_id: ${property_id} from database`);
      callback(false);
    } else {
      console.log(`property_id: ${property_id} tenant list returned`);
      callback(tenantList);
    }
  });
}

// update tenant info
// update_info is a JSON contains name, email, address, landlord_phone, rubs
// return true if update successful
// return false if update failed
function updateTenant(tenant_id, update_info, callback) {
  let name = update_info.name;
  let email = update_info.email;
  let address = update_info.address;
  let landlord_phone = update_info.landlord_phone;
  let rubs = update_info.rubs;

  let sql = `UPDATE tenant set ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
  let inserts = ["name", name,
                 "email", email,
                 "address", address,
                 "landlord_phone", landlord_phone,
                 "rubs", rubs,
                 "tenant_id", tenant_id];

  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(`not able to update tenant_id: ${tenant_id} from database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log(`updated!`);
        callback(true);
      } else {
        console.log("update failed");
        callback(false);
      }
    }
  });
}

// add new tenant for a property
// tenant_info is a JSON contains name, email, address, landlord_phone, rubs
// return true for added successfully
// return false for added failed
function insertTenant(property_id, tenant_info, callback) {
  let name = tenant_info.name;
  let email = tenant_info.email;
  let address = tenant_info.address;
  let landlord_phone = tenant_info.landlord_phone;
  let rubs = tenant_info.rubs;

  let sql = `INSERT INTO tenant(property_id,name,email,address,landlord_phone, rubs) VALUES(?,?,?,?,?,?)`;
  let inserts = [property_id, name, email, address, landlord_phone, rubs];

  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(err);
      console.log(`not able to add new tenant for property_id: ${property_id} into database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log("added");
        callback(true);
      } else {
        console.log("add new tenant failed");
        callback(false);
      }
    }
  });
}

// delete tenant by property_id and tenant_id
// return true if delete successfully
// return false if delete failed
function deleteTenant(property_id, tenant_id, callback) {
  let sql = `DELETE FROM tenant WHERE ?? = ? AND ?? = ?`;
  let inserts = ["property_id", property_id,
                 "tenant_id", tenant_id];
  connection.query(sql, inserts, function (err, result) {
    // check error type later
    if (err) {
      console.log(err);
      console.log(`not able to delete property_id: ${property_id} tenant_id: ${tenant_id} from database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log(`property_id: ${property_id} tenant_id: ${tenant_id} deleted`);
        callback(true);
      } else {
        console.log(`property_id: ${property_id} tenant_id: ${tenant_id} delete failed`);
        callback(false);
      }
    }
  });
}

// return a list of JSON contains all of the properties owned by user
function selectAllProperties(user_id, callback) {
  let sql = `SELECT * FROM property WHERE ?? = ?`;
  let inserts = ["user_id", user_id];
  connection.query(sql, inserts, function (err, propertyList) {
    if (err) {
      console.log(`not able to select property of user_id: ${user_id} from database`);
      callback(false);
    } else {
      console.log(`user_id: ${user_id} property list returned`);
      callback(propertyList);
    }
  });
}

// insert property info
// property_info is a JSON with name, address, property_type, landlord_phone
// return true if it success
// return false if it failed
function insertProperty(user_id, property_info, callback) {
  let name = property_info.name;
  let address = property_info.address;
  let property_type = property_info.property_type;
  let landlord_phone = property_info.landlord_phone;

  let sql = `INSERT INTO property(user_id,name,address,property_type,landlord_phone) VALUES(?,?,?,?,?)`;
  let inserts = [user_id, name, address, property_type, landlord_phone];

  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(err);
      console.log(`not able to add new property for user_id: ${user_id} into database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log("added");
        callback(true);
      } else {
        console.log("error");
        callback(false);
      }
    }
  });
}

// update property info
// property_info is a JSON with name, address, property_type, landlord phone
// return true if update successful
// return false if update failed
function updateProperty(user_id, property_info, callback) {
  let name = property_info.name;
  let address = property_info.address;
  let property_type = property_info.property_type;
  let landlord_phone = property_info.landlord_phone;
  let property_id = property_info.property_id;

  let sql = `UPDATE property set ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ? AND ?? = ?`;
  let inserts = ["name",  name,
                 "address", address,
                 "property_type", property_type,
                 "landlord_phone", landlord_phone,
                 "user_id", user_id,
                 "property_id", property_id];

  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(`not able to update property info for user_id: ${user_id} property_id: ${property_id} into database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log("updated!");
        callback(true);
      } else {
        console.log(`error! not able to update property info for user_id: ${user_id} property_id: ${property_id} into database`);
        callback(false);
      }
    }
  });
}

// delete property by property_id and user_id
// return true if delete successfully
// return false if delete fails
function deleteProperty(user_id, property_id, callback) {
  let sql = `DELETE FROM property WHERE ?? = ? AND ?? = ?`;
  let inserts = ["property_id", property_id,
                 "user_id", user_id];
  connection.query(sql, inserts, function (err, result) {
    // check error type later
    if (err) {
      console.log(err);
      console.log(`not able to delete property_id: ${property_id} user_id: ${user_id} from database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        callback(true);
      } else {
        console.log(`not able to delete property_id: ${property_id} user_id: ${user_id} from database`);
        callback(false);
      }
    }
  });
}

// add new meter to a property
// return true if adds successfully
// return false if adds failed
function insertMeter(property_id, meter_id, callback) {
  let sql = `INSERT INTO meter(property_id,meter_id) VALUES(?,?)`;
  let inserts = [property_id, meter_id];
  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(`not able to add meter_id: ${meter_id} for property_id: ${property_id} into database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log("added");
        callback(true);
      } else {
        console.log("add new meter failed");
        callback(false);
      }
    }
  });
}

// delete meter info
// return true if adds successfully
// return false if adds failed
function deleteMeter(property_id, meter_id, callback) {
  let sql = `DELETE FROM meter WHERE ?? = ? AND ?? = ?`;
  let inserts = ["property_id", property_id,
                 "meter_id", meter_id];
  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(err);
      console.log(`not able to delete property_id: ${property_id} meter_id: ${meter_id} from database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        callback(true);
      } else {
        console.log(`not able to delete property_id: ${property_id} user_id: ${meter_id} from database`);
        callback(false);
      }
    }
  });
}

// return a list of JSON contains meter list of a property
function selectAllMeters(property_id, callback) {
  let sql = `SELECT meter_id FROM meter WHERE ?? = ?`;
  let inserts = ["property_id", property_id];
  connection.query(sql, inserts, function (err, meterList) {
    if (err) {
      console.log(`not able to select meterList of property_id: ${property_id} from database`);
      callback(false);
    } else {
      console.log(`property_id: ${property_id} meter list returned`);
      callback(meterList);
    }
  });
}

// add a submeter for a tenant
// submeter_info is a JSON contains submeter_id, tenant_id, meter_id, multiplier
// return true if adds successfully
// return false if adds failed
function insertSubmeter(submeter_info, callback) {
  let submeter_id = submeter_info.submeter_id;
  let tenant_id = submeter_info.tenant_id;
  let meter_id = submeter_info.meter_id;
  let multiplier = submeter_info.multiplier;

  let sql = `INSERT INTO submeter(submeter_id, tenant_id, meter_id, multiplier) VALUES(?,?,?,?)`;
  let inserts = [submeter_id, tenant_id, meter_id, multiplier];
  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(`not able to add submeter_id: ${submeter_id} for tenant_id: ${tenant_id} into database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log("added");
        callback(true);
      } else {
        console.log("add new submeter failed");
        callback(false);
      }
    }
  });
}

// update submeter info
// update_info is a JSON contains tenant_id, meter_id, multiplier
// return true if update successfully
// return false if update failed
function updateSubmeter(submeter_id, update_info, callback){
  let tenant_id = update_info.tenant_id;
  let meter_id = update_info.meter_id;
  let multiplier = update_info.multiplier;

  let sql = `UPDATE tenant SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
  let inserts = ["tenant_id", tenant_id,
                 "meter_id", meter_id,
                 "multiplier", multiplier,
                 "submeter_id", submeter_id];
  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(`not able to update submeter_id: ${submeter_id} into database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log("updated");
        callback(true);
      } else {
        console.log(`update submeter_id: ${submeter_id} failed`);
        callback(false);
      }
    }
  });
}

// delete a Submeter for a tenant
// return true if deletes successfully
// return false if deletes failed
function deleteSubmeter(tenant_id, submeter_id, callback) {
  let sql = `DELETE FROM submeter WHERE ?? = ? AND ?? = ?`;
  let inserts = ["tenant_id", tenant_id,
                 "submeter_id", submeter_id];
  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(err);
      console.log(`not able to delete tenant_id: ${tenant_id} submeter_id: ${submeter_id} from database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        callback(true);
      } else {
        console.log(`not able to delete tenant_id: ${tenant_id} submeter_id: ${submeter_id} from database`);
        callback(false);
      }
    }
  });
}

// return a list of JSON contains Submeter list of a tenant
function selectAllSubmeters(tenant_id, callback) {
  let sql = `SELECT submeter_id FROM submeter WHERE ?? = ?`;
  let inserts = ["tenant_id", tenant_id];
  connection.query(sql, inserts, function (err, submeterList) {
    if (err) {
      console.log(`not able to select submeterList of tenant_id: ${tenant_id} from database`);
      callback(false);
    } else {
      console.log(`tenant_id: ${tenant_id} meter list returned`);
      callback(submeterList);
    }
  });
}

// insert new bill
// bill_info is a json with account_id, meter_id, m_kwh_usage(national grid),
// from_date, to_date, m_charge(national grid), s_kwh_usage(constellation), s_charge(constellation),
// total_kwh_usage, total_charge, unit_charge
// return true if insert successfully
// return false if insert failed
function insertBill(bill_info, callback) {
  let account_id = bill_info.account_id;
  let meter_id = bill_info.meter_id;
  let m_kwh_usage = bill_info.m_kwh_usage;
  let from_date = bill_info.from_date;
  let to_date = bill_info.to_date;
  let m_charge = bill_info.m_charge;
  let s_kwh_usage = bill_info.s_kwh_usage;
  let s_charge = bill_info.s_charge;
  let total_kwh_usage = bill_info.total_kwh_usage;
  let total_charge = bill_info.total_charge;
  let unit_charge = bill_info.unit_charge;

  let sql = `INSERT INTO bill(account_id,meter_id,m_kwh_usage,from_date, to_date,m_charge,s_kwh_usage,s_charge,total_kwh_usage,total_charge,unit_charge) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
  let inserts = [account_id, meter_id, m_kwh_usage, from_date, to_date,m_charge,s_kwh_usage,s_charge,total_kwh_usage,total_charge,unit_charge];

  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(err);
      console.log(`not able to add new bill account_id: ${account_id} meter_id: ${meter_id} from_date: ${from_date} to_date: ${to_date} into database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log("added");
        callback(true);
      } else {
        console.log("error");
        callback(false);
      }
    }
  });

}

// update bill
// bill_info is a json with account_id, meter_id, m_kwh_usage(national grid),
// from_date, to_date, m_charge(national grid), s_kwh_usage(constellation), s_charge(constellation),
// total_kwh_usage, total_charge, unit_charge
// return true if update successfully
// return false if update failed
function updateBill(bill_id,bill_info, callback) {
  let account_id = bill_info.account_id;
  let meter_id = bill_info.meter_id;
  let m_kwh_usage = bill_info.m_kwh_usage;
  let from_date = bill_info.from_date;
  let to_date = bill_info.to_date;
  let m_charge = bill_info.m_charge;
  let s_kwh_usage = bill_info.s_kwh_usage;
  let s_charge = bill_info.s_charge;
  let total_kwh_usage = bill_info.total_kwh_usage;
  let total_charge = bill_info.total_charge;
  let unit_charge = bill_info.unit_charge;

  let sql = `UPDATE bill set ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ? WHERE ?? = ?`;
  let inserts = ["account_id", account_id,
                 "meter_id", meter_id,
                 "m_kwh_usage", m_kwh_usage,
                 "from_date", from_date,
                 "to_date", to_date,
                 "m_charge", m_charge,
                 "s_kwh_usage", s_kwh_usage,
                 "s_charge", s_charge,
                 "total_kwh_usage", total_kwh_usage,
                 "total_charge", total_charge,
                 "unit_charge", unit_charge,
                 "bill_id", bill_id];
  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(`not able to update bill info for bill_id: ${bill_id}  into database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        console.log("updated!");
        callback(true);
      } else {
        console.log(`error! not able to update bill info for bill_id: ${bill_id} into database`);
        callback(false);
      }
    }
  });
}

// delete bill
// return true if delete successfully
// return false if delete failed
function deleteBill(bill_id, callback){
  let sql = `DELETE FROM bill WHERE ?? = ?`;
  let inserts = ["bill_id", bill_id];
  connection.query(sql, inserts, function (err, result) {
    if (err) {
      console.log(err);
      console.log(`not able to delete bill_id: ${bill_id} from database`);
      callback(false);
    } else {
      if (result.affectedRows == 1) {
        callback(true);
      } else {
        console.log(`not able to delete bill_id: ${bill_id} from database`);
        callback(false);
      }
    }
  });
}


// fetch bill by meter
// fetch bill by account
// fetch bill by property manager
// fetch bill by time period
// insert invoice into database
// fetch all available billing time period
exports.establishDatabaseConnection = establishDatabaseConnection;
exports.connection = connection;

exports.insertUserId = insertUserId;
exports.deleteUserId = deleteUserId;

exports.selectAllTenants = selectAllTenants;
exports.insertTenant = insertTenant;
exports.updateTenant = updateTenant;
exports.deleteTenant = deleteTenant;

exports.selectAllProperties = selectAllProperties;
exports.insertProperty = insertProperty;
exports.updateProperty = updateProperty;
exports.deleteProperty = deleteProperty;

exports.selectAllMeters = selectAllMeters;
exports.insertMeter = insertMeter;
exports.deleteMeter = deleteMeter;

exports.selectAllSubmeters = selectAllSubmeters;
exports.insertSubmeter = insertSubmeter;
exports.updateSubmeter = updateSubmeter;
exports.deleteSubmeter = deleteSubmeter;

exports.insertBill = insertBill;
exports.updateBill = updateBill;
exports.deleteBill = deleteBill;