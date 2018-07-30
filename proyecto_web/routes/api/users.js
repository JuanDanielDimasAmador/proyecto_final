const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const router = express.Router();

const validateRegisterInput = require("../../validation/register");

const Nickname = require("../../models/nickname");
const User = require("../../models/user");


//  READ
router.get('/users', async (req, res) => {  //Ruta GET para el servidor
    //const users = await User.find(); //Consulta. Guarda Datos.
    //res.json(users);
    res.json({msg:"get is working"});


});

// READ ONE
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});


// @route   GET api/users/test
// @desc    tests users route
// @access  public
router.get("/test",(req,res) => res.json({msg:"Users works"}));

// @route   POST api/users/register
// @desc    log an user
// @access  public
router.post("/register", (req,res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    //check validation - Initializa a value from the nickname
    const nick = Nickname;

    if (!isValid) {
        return res.status(400).json(errors);
    }
    //busca en base al email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                //si existe, retorna el error
                return res.status(400).json({email: "email already exists"});
            } else {
                //si no existe, continua a crear un objeto en base al modelo usuario
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
                //encripta la contraseña
                bcrypt.genSalt(10, (err, salt) => {

                    //guarda todo en un objeto
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log(err);
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            //si hubo algun error, lo manda a consola
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

module.exports = router;