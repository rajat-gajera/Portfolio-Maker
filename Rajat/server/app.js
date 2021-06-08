const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./db/dbconnection");
const PORT = process.env.PORT;
app.use(express.json());

const cookieParser = require("cookie-Parser");
app.use(cookieParser());
app.use(require("./router/auth"));
app.use(require("./router/routers"));
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}!`);
});
