const express = require("express");
const cors = require("cors");
const app = express();
const { ConnectionMongo } = require("./config/ConnectionMongo.js");
app.use(cors());

app.use(express.json());
require("./config/Connection.js");
ConnectionMongo();

app.use("/api", require("./router/router.js"));

const PORT = 3500;

app.listen(PORT, (err) => {
  if (err) {
    console.log(`error server ${err}`);
  } else {
    console.log(`Server running succesfully on port  ${PORT}`);
  }
});
