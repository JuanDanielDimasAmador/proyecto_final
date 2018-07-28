const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const router = express.Router();

const validateRegisterInput = require("../../validation/register");

const Nickname = require("../../models/nickname");
const User = require("../../models/user");
// @route   GET api/users/test
// @desc    tests users route
// @access  public
router.get("/test",(req,res) => res.json({msg:"Users works"}));

// @route   POST api/users/register
// @desc    log an user
// @access  public
router.post("/register", (req,res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    //check validation
    const nick = Nickname;

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({email: "email already exists"});
            } else {

                const newUser = new User({
                    nickname: nick,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    security: {
                        question: req.body.question,
                        answer: req.body.answer
                    }
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log(err);
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});


module.exports = router;