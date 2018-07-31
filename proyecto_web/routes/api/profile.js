const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const router = express.Router();

const User = require("../../models/user");
const errors = { };

router.get("/", passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOne( { email: req.user.email } )
    .then( user => {
        errors.noUser = "No existe el usuario"
        if(!user) { return res.status(404).json(errors)};
        res.json(user);
    })
    .catch(err => res.status(404).json(err));        
});

module.exports = router;


