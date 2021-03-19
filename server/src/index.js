const express = require('express');
const app = express();
const routesUrls = require('./router');
const database = require('./database');
const databaseRouter = require('./database_router');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(session({
    secret: 'key signature for cookie',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 4
    }
}))

app.use(express.json());
app.use(cookieParser());
app.use('', routesUrls);
app.use('', databaseRouter);
app.listen(3000, () => {
    console.log("server is running")
    database.establishDatabaseConnection();
});


