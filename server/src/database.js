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

// Insert username to database
function insertUserIdToDatabase(user_id) {
    connection.query(`INSERT INTO user (user_id) VALUES ('`+user_id+`')`,function(err){
        // check error type later
        if(err) {
            console.log('not able to add in to database');
        } else {
            console.log('added');
        }
    });
}
exports.establishDatabaseConnection = establishDatabaseConnection;
exports.connection = connection;
exports.insertUserIdToDatabase = insertUserIdToDatabase;