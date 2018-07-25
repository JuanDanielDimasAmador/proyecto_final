//libraries
const bprs = require("body-parser");
const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');

//usage
const compiler = webpack(webpackConfig);

//api routes


//initialize
const app = express();

//Middle wares
app.use(bprs.urlencoded({extended: false}));//Body parser itself
app.use(bprs.json());                       //Json parser
app.use(passport.initialize());             //passport Middle Ware

//passport config
require("./config/passport")(passport);

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongoDB
mongoose.connect(db).then(() => console.log("Connected")).catch((err) => console.log(err));

//use routes



//compiling webpack
app.use(express.static(__dirname + '/static'));

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

//initializing server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});