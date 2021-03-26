var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : "proptech-test-db.cojysjcyt3zb.us-east-2.rds.amazonaws.com",
    user     : "admin",
    password : "BtEbh9FnbMV2SwNCEc9J",
    port     : "3306",
    database : "PropTech_Test_DB"
});

function establishDatabaseConnection() {
    connection.connect(function(err) {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }
        console.log('Connected to database.');
    });
};

// Insert user_id to database
function insertUserIdToDatabase(user_id, callback) {
    let sql = `INSERT INTO user (user_id) VALUES (?)`;
    let inserts = [user_id];
    connection.query(sql,inserts, function(err, result){
        // check error type later
        if(err) {
            console.log(`not able to add user_id: ${user_id} in to database`);
            callback(false);
        } else {
            if(result.affectedRows == 1){
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
function deleteUserIdFromDatabase(user_id, callback){
    let sql = `DELETE FROM user WHERE ?? = ?`;
    let inserts = ["user_id", user_id];
    connection.query(sql, inserts, function(err, result){
        // check error type later
        if(err) {
            console.log(`not able to delete user_id: ${user_id} from database`);
            callback(false);
        } else {
            if(result.affectedRows == 1){
                console.log('deleted');
                callback(true);
            } else {
                console.log('deleted');
                callback(false);
            }

        }
    });
}

// return list of JSON contains all tenant info for a property
function getAllTenantInfo(property_id, callback){
    let sql = `SELECT * FROM tenant WHERE ?? = ?`;
    let inserts = ["property_id", property_id];
    connection.query(sql,inserts, function(err,tenantList){
        if(err) {
            console.log(`not able to select tenantList of property_id: ${property_id} from database`);
            callback(false);
        } else {
            console.log(`property_id: ${property_id} tenant list returned`);
            callback(tenantList);
        }
    });
}

// update tenant info
// update_info is a JSON contains name, email, address, property_share
// return true if update successful
// return false if update failed
function updateTenantInfo(tenant_id, update_info, callback){
    let name = update_info.name;
    let email = update_info.email;
    let address = update_info.address;
    let property_share = update_info.property_share;

    let sql = `UPDATE tenant set ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    let inserts = ["name", name, "email", email, "address", address, "property_share", property_share, "tenant_id", tenant_id];

    connection.query(sql, inserts, function (err, result) {
        if(err) {
            console.log(`not able to update tenant_id: ${tenant_id} from database`);
            callback(false);
        } else {
            if(result.affectedRows == 1){
                console.log(`updated!`);
                callback(true);
            } else {
                console.log('update failed');
                callback(false);
            }
        }
    })
}

// add new tenant for a property
// tenant_info is a JSON contains name, email, address, property_share
// return true for added successfully
// return false for added failed
function addNewTenant(property_id, tenant_info, callback){
    let name = tenant_info.name;
    let email = tenant_info.email;
    let address = tenant_info.address;
    let property_share = tenant_info.property_share;

    let sql = `INSERT INTO tenant(property_id,name,email,address,property_share) VALUES(?,?,?,?,?)`;
    let inserts = [property_id,name,email,address,property_share];

    connection.query(sql, inserts, function (err, result) {
        if(err) {
            console.log(`not able to add new tenant for property_id: ${property_id} into database`);
            callback(false);
        } else {
            if(result.affectedRows == 1){
                console.log('added');
                callback(true);
            } else {
                console.log('add new tenant failed');
                callback(false);
            }
        }
    })

}


// delete tenant by property_id and tenant_id
// return true if delete successfully
// return false if delete failed
function deleteTenant(property_id, tenant_id, callback){
    let sql = `DELETE FROM tenant WHERE ?? = ? AND ?? = ?`;
    let inserts = ["property_id", property_id, "tenant_id", tenant_id];
    connection.query(sql, inserts, function(err, result){
        // check error type later
        if(err) {
            console.log(err);
            console.log(`not able to delete property_id: ${property_id} tenant_id: ${tenant_id} from database`);
            callback(false);
        } else {
            if(result.affectedRows == 1){
                console.log(`property_id: ${property_id} tenant_id: ${tenant_id} deleted`);
                callback(true);
            }
            else{
                console.log(`property_id: ${property_id} tenant_id: ${tenant_id} delete failed`);
                callback(false);
            }
        }
    });

}

// return a list of JSON contains all of the properties owned by user
function selectAllProperties(user_id, callback){
    let sql = `SELECT * FROM property WHERE ?? = ?`;
    let inserts = ["user_id",user_id];
    connection.query(sql,inserts, function(err,propertyList){
        if(err) {
            console.log(`not able to select property of user_id: ${user_id} from database`);
            callback(false);
        } else {
            console.log(`user_id: ${user_id} property list returned`);
            callback(propertyList);
        }
    });
}

// insert property info
// property_info is a JSON with name, address, property_type
// return true if it success
// return false if it failed
function addNewProperty(user_id, property_info, callback){
    let name = property_info.name;
    let address = property_info.address;
    let property_type = property_info.property_type;

    let sql = `INSERT INTO property(user_id,name,address,property_type) VALUES(?,?,?,?)`;
    let inserts = [user_id,name,address,property_type];

    connection.query(sql, inserts, function (err, result) {
        if(err) {
            console.log(`not able to add new property for user_id: ${user_id} into database`);
            callback(false);
        } else {
            if(result.affectedRows == 1) {
                console.log('added');
                callback(true);
            } else{
                console.log('error');
                callback(true);
            }

        }
    })

}

// update property info
// property_info is a JSON with name, address, property_type
// return true if update successful
// return false if update failed
function updatePropertyInfo(user_id, property_id, property_info, callback){
    let name = property_info.name;
    let address = property_info.address;
    let property_type = property_info.property_type;

    let sql = `UPDATE property set ?? = ?, ?? = ?, ?? = ? WHERE ?? = ? AND ?? = ?`;
    let inserts = ["name", name, "address", address, "property_type", property_type, "user_id", user_id, "property_id", property_id];

    connection.query(sql, inserts, function (err, result) {
        if(err) {
            console.log(`not able to update property info for user_id: ${user_id} property_id: ${property_id} into database`);
            callback(false);
        } else {
            if(result.affectedRows == 1) {
                console.log('updated!');
                callback(true);
            } else{
                console.log(`error! not able to update property info for user_id: ${user_id} property_id: ${property_id} into database`);
                callback(false);
            }

        }
    })
}


// delete property by property_id and user_id
// return true if delete successfully
// return false if delete fails
// delete property by property_id and user_id
function deletePropertyFromDatabase(property_id, user_id, callback){
    let sql = `DELETE FROM property WHERE ?? = ? AND ?? = ?`;
    let inserts = ["property_id", property_id, "user_id", user_id];
    connection.query(sql, inserts, function(err, result){
        // check error type later
        if(err) {
            console.log(err);
            console.log(`not able to delete property_id: ${property_id} user_id: ${user_id} from database`);
            callback(false);
        } else {
            if(result.affectedRows == 1) {
                callback(true);
            } else {
                console.log(`not able to delete property_id: ${property_id} user_id: ${user_id} from database`);
                callback(false);
            }
        }
    });
}

exports.establishDatabaseConnection = establishDatabaseConnection;
exports.connection = connection;
exports.insertUserIdToDatabase = insertUserIdToDatabase;
exports.deleteUserIdFromDatabase = deleteUserIdFromDatabase;
exports.updateTenantInfo = updateTenantInfo;
exports.deletePropertyFromDatabase = deletePropertyFromDatabase;
exports.addNewTenant = addNewTenant;
exports.deleteTenant = deleteTenant;
exports.selectAllProperties = selectAllProperties;
exports.getAllTenantInfo = getAllTenantInfo;
exports.addNewProperty = addNewProperty;
exports.updatePropertyInfo = updatePropertyInfo;