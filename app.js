const path = require("path");
require("dotenv").config();
const express=require("express");
require("./api/data/db");
const app = express();


const routes = require('./api/routes');

app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api",routes);

const server=app.listen(process.env.PORT, function(){
    const port = server.address().port;
    console.log("listening on port"+port);
});

