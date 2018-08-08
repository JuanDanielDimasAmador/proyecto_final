const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

const validateCriticInput = require("../../validation/critic");
const Critic = require("../../models/critic");

// @route   POST api/critics/
// @desc    create a new critic
// @access  private
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

//@route    GET api/critics/
//@desc     find all critics
//@access   private
router.get("/", passport.authenticate('jwt', {session: false}), (req,res) => {
    const errors = { };
    Critic.find()
        .then(critics => {
            errors.noCritics = "No existe ninguna critica";
            if (!critics) return res.status(404).json(errors);
            res.json(critics);
        })
        .catch(err => res.status(404).json(err));
});

//@route    GET api/critics/
//@desc     find critic by ID
//@access   private
router.get("/:id", passport.authenticate('jwt', {session: false}), (req,res) => {
    const errors = { };
    const {id} = req.params;
    Critic.findById(id)
        .then(critics => {
            errors.noCritics = "No existe ninguna critica";
            if(!critics) return res.status(404).json(errors);
            res.json(critics);
        })
        .catch(err => res.status(404). json(err));
});

module.exports = router;