const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const User = require("../../models/user");
const Critic = require("../../models/critic");
const validateUpdatePassInput = require("../../validation/update-pass");


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

router.post("/updatePassword", passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = { errors, isValid } = validateUpdatePassInput(req.body);
    //Validación de campos
    if (!isValid){
        return res.status(400).json(errors);
    }
    const newPass = new Pass({
        user: req.user.id,
        password: req.body.password,
        password2: req.body.password2
    });
    //Enontrar usuario via id
    User.find({user: req.user.id})
        .then(User =>{
            errors.noPosts = "No se encuentra al usuario";
        })
        .catch(err => res.status(404).json(err));
    User.update().then(user => res.json(user)) .catch(err => console.log(err));
});


module.exports = router;