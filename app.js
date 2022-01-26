const path = require("path");
require("dotenv").config();
const express = require("express");

require("./api/data/db");
const app = express();
const routes = require('./api/routes');

app.use(function(req,res,next){
console.log(req.method,req.url);
next();
});

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api",function(req,res,next){
res.header("Access-Control-Allow-Origin","http://localhost:4200");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept");
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
       
next();
});

app.use("/api",routes);

const server=app.listen(process.env.PORT,function(){
    const port = server.address().port;
    console.log(process.env.MES_SERVER_START, port);
});