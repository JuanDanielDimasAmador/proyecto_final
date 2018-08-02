const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const User = require("../../models/user");
const Critic = require("../../models/critic");


// @route   GET api/profile/
// @desc    gets the user information
// @access  private
router.get("/", passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = { };
    User.findOne( { _id: req.user.id } )
    .then( user => {
        errors.noUser = "No existe el usuario";
        if(!user) { return res.status(404).json(errors)}
        res.json(user);
    })
    .catch(err => res.status(404).json(err));        
});

// @route   GET api/profile/posts
// @desc    gets user's posts
// @access  public
router.get("/posts",passport.authenticate('jwt', {session:false}), (req,res) => {
    const errors = { };
    Critic.find({ user: req.user.id })
        .then( critics => {
            errors.noPosts = "No se ha creado ninguna publicacion aun";
            if (!critics) return res.status(404).json(errors);
            res.json(critics);
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;