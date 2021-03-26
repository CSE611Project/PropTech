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
function insertUserIdToDatabase(user_id) {
    let sql = `INSERT INTO user (user_id) VALUES (?)`;
    let inserts = [user_id];
    connection.query(sql,inserts, function(err){
        // check error type later
        if(err) {
            console.log(`not able to add user_id: ${user_id} in to database`);
        } else {
            console.log(`user_id: ${user_id} added`);
        }
    });
}

// delete user_id from user table
// should able to delete all data related to the user needs to be deleted
function deleteUserIdFromDatabase(user_id){
    let sql = `DELETE FROM user WHERE ?? = ?`;
    let inserts = ["user_id", user_id];
    connection.query(sql, inserts, function(err){
        // check error type later
        if(err) {
            console.log(`not able to delete user_id: ${user_id} from database`);
        } else {
            console.log('deleted');
        }
    });
}

// // return JSON contains all tenant info for a property
// function getAllTenantInfo(property_id, user_id){
//     let sql = `SELECT * FROM tenant WHERE ?? = ?`;
//     let inserts = ["property_id", property_id];
//
//
// }

// update tenant info
function updateTenantInfo(tenant_id, update_info){
    const ready_to_update = JSON.parse(update_info);
    let name = ready_to_update.name;
    let email = ready_to_update.email;
    let address = ready_to_update.address;
    let property_share = ready_to_update.property_share;

    let sql = `UPDATE tenant set ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    let inserts = ["name", name, "email", email, "address", address, "property_share", property_share, "tenant_id", tenant_id];

    connection.query(sql, inserts, function (err) {
        if(err) {
            console.log(`not able to update tenant_id: ${tenant_id} from database`);
        } else {
            console.log('updated');
        }
    })
}

// add new tenant for a property
// return true for added successfully
// return false for added failed
function addNewTenant(property_id, tenant_info){
    const newTenant = JSON.parse(tenant_info);
    let name = newTenant.name;
    let email = newTenant.email;
    let address = newTenant.address;
    let property_share = newTenant.property_share;

    let sql = `INSERT INTO tenant(property_id,name,email,address,property_share) VALUES(?,?,?,?,?)`;
    let inserts = [property_id,name,email,address,property_share];

    connection.query(sql, inserts, function (err) {
        if(err) {
            console.log(`not able to add new tenant for property_id: ${property_id} into database`);
            return false;
        } else {
            console.log('added');
            return true;
        }
    })

}


// delete tenant by property_id and tenant_id
// return true if delete successfully
// return false if delete failed
function deleteTenant(property_id, tenant_id){
    let sql = `DELETE FROM tenant WHERE ?? = ? AND ?? = ?`;
    let inserts = ["property_id", property_id, "tenant_id", tenant_id];
    connection.query(sql, inserts, function(err){
        // check error type later
        if(err) {
            console.log(err);
            console.log(`not able to delete property_id: ${property_id} tenant_id: ${tenant_id} from database`);
            return false;
        } else {
            if(result.affectedRows == 1){
                return true;
            }
            else{
                console.log(`property_id: ${property_id} tenant_id: ${tenant_id} deleted`);
                return false;
            }
        }
    });

}

// return a list of JSON contains all of the properties owned by user
function selectAllProperties(user_id){
    let sql = `SELECT * FROM property WHERE ?? = ?`;
    let inserts = ["user_id",user_id];
    connection.query(sql,inserts, function(err,propertyList){
        if(err) {
            console.log(`not able to select property of user_id: ${user_id} from database`);
        } else {
            console.log(`user_id: ${user_id} property list returned`);
            return propertyList;
        }
    });
}

// // insert/update property info
// function insertUpdateProperty(property){
//     INSERT INTO table property
//     VALUES (values)
//     ON DUPLICATE KEY UPDATE
//     col1 = val1,
//         col2 = val2 ...
//
//
// }

// delete property by property_id and user_id
// return true if delete successfully
// return false if delete fails
// delete property by property_id and user_id
function deletePropertyFromDatabase(property_id, user_id){
    let sql = `DELETE FROM property WHERE ?? = ? AND ?? = ?`;
    let inserts = ["property_id", property_id, "user_id", user_id];
    connection.query(sql, inserts, function(err, result){
        // check error type later
        if(err) {
            console.log(err);
            console.log(`not able to delete property_id: ${property_id} user_id: ${user_id} from database`);
            return false;
        } else {
            if(result.affectedRows == 1) {
                return true;
            } else {
                console.log(`not able to delete property_id: ${property_id} user_id: ${user_id} from database`);
                return false;
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