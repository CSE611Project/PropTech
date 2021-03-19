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
exports.establishDatabaseConnection = establishDatabaseConnection;
exports.connection = connection;
exports.insertUserIdToDatabase = insertUserIdToDatabase;
exports.deleteUserIdFromDatabase = deleteUserIdFromDatabase;