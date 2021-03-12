const express = require('express');
const app = express();
const routesUrls = require('./router');
const database = require('./database');
const databaseRouter = require('./database_router');
const session = require('express-session');

app.use(session({
    secret: 'key signature for cookie',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 4
    }
}))

app.use(express.json());
app.use('', routesUrls);
app.use('',databaseRouter);
app.listen(3000, () => {
    console.log("server is running")
    database.establishDatabaseConnection();
});


