const express = require("express");
const bcrypt = require("bcryptjs");
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
    const { errors, isValid } = validateUpdatePassInput(req.body);
    //Validación de campos
    if (!isValid){
        return res.status(400).json(errors);
    }
    const newUser = {
        password: req.body.password2
    };
    User.findOne({_id: req.user.id}).then(user => {
        if (user){
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        bcrypt.genSalt(10, (err,salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) console.log(err);
                                newUser.password = hash;
                                User.findOneAndUpdate(
                                    { _id: req.user.id},
                                    { $set: newUser },
                                    { new: true }
                                ).then(updated => res.json(updated));

                            });
                        });
                    } else {
                        errors.password = "contraseña incorrecta";
                        res.status(404).json(errors);
                    }
                }).catch(err => {
                    console.log(err);
                    res.json(err);
                });
        } else {
            errors.noUser = "No existe el usuario";
            res.status(404).json(errors.noUser);
        }
    });
});


module.exports = router;