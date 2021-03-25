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
    let building_share = ready_to_update.building_share;

    let sql = `UPDATE tenant set ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    let inserts = ["name", name, "email", email, "address", address, "building_share", building_share, "tenant_id", tenant_id];

    connection.query(sql, inserts, function (err) {
        if(err) {
            console.log(`not able to update tenant_id: ${tenant_id} from database`);
        } else {
            console.log('updated');
        }
    })

}

// // add new tenant for a property
// function addNewTenant(property_id, tenant_info){
//
// }

// // delete tenant
// function deleteTenant(property_id, tenant_id){
//
// }
exports.establishDatabaseConnection = establishDatabaseConnection;
exports.connection = connection;
exports.insertUserIdToDatabase = insertUserIdToDatabase;
exports.deleteUserIdFromDatabase = deleteUserIdFromDatabase;
exports.updateTenantInfo = updateTenantInfo;