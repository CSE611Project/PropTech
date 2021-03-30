const express = require("express");
const app = express();
const routesUrls = require("./router");
const database = require("./database");
const databaseRouter = require("./database_router");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("", routesUrls);
app.use("", databaseRouter);
app.listen(3000, () => {
  console.log("server is running");
  database.establishDatabaseConnection();
});
