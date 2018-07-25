//libraries
const bprs = require("body-parser");
const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");


//api routes


//initialize
const app = express();

//Middle wares   -- Descomentar unicamente cuando se tengan hechos los esquemas del usuario, ya que son los necesarios
//app.use(bprs.urlencoded({extended: false}));//Body parser itself
//app.use(bprs.json());                       //Json parser
//app.use(passport.initialize());             //passport Middle Ware

//passport config   -- Descomentar unicamente cuando se tengan hechos los esquemas del usuario, ya que aqui se manda llamar y autoejecutar al archivo passport
//require("./config/passport")(passport);

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongoDB
mongoose.connect(db).then(() => console.log("Connected")).catch((err) => console.log(err));

//use routes

//using static files

//initializing server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});