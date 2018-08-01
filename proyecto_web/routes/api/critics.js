const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

const validateCriticInput = require("../../validation/critic");
const Critic = require("../../models/critic");

router.post("/",passport.authenticate("jwt",{session: false}),(req,res) => {
    const { errors, isValid } = validateCriticInput(req.body);
    //validar campos
    if (!isValid){
        return res.status(400).json(errors);
    }
    const newCritic = new Critic({
        user: req.user.id,
        title: req.body.title,
        text: req.body.text,
        classification : req.body.classification
    });
    newCritic.save().then(critic => res.json(critic)).catch(err => console.log(err));
});

module.exports = router;