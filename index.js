const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

require('./config/Connection.js')

app.use(express.json());

app.use("/api", require("./router/router.js"));

const PORT = 3500;

app.listen(PORT, (err) => {
    if(err){
        console.log(`error server ${err}`);
    }else{
        console.log(`Server running succesfully on port  ${PORT}`);
    }
});