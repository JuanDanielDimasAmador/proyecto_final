const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const User = require("../../models/user");
const Critic = require("../../models/critic");
const validateUpdatePassInput = require("../../validation/update-pass");
const validateUpdateEmailInput = require("../../validation/update-email");


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
// @access  private
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


// @route   GET api/profile/updatePassword
// @desc    actualiza la contraseña
// @access  private
router.post("/updatePassword", passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validateUpdatePassInput(req.body);
    //Validación de campos
    if (!isValid){
        return res.status(400).json(errors);
    }
    //pone la contraseña actual como la nueva contraseña
    const newUser = {
        password: req.body.password2
    };
    //busca el usuario por ID
    User.findOne({_id: req.user.id}).then(user => {
        if (user){
            //si lo encuentra, compara la contraseña actual con la de la peticion
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    //si coincide
                    if (isMatch) {
                        //va a generar el hash
                        bcrypt.genSalt(10, (err,salt) => {
                            //genera el hash en base a la contraseña del objeto
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                //si hubo un error mandalo a consola
                                if (err) console.log(err);
                                //asigna al objeto la contraseña hasheada
                                newUser.password = hash;
                                //encuentra y actualiza, setea los parametros y los regresa por JSON
                                User.findOneAndUpdate(
                                    { _id: req.user.id},
                                    { $set: newUser },
                                    { new: true }
                                ).then(updated => res.json(updated));

                            });
                        });
                    } else {
                        //si no coincidio, es contraseña incorrecta
                        errors.password = "contraseña incorrecta";
                        res.status(404).json(errors);
                    }
                    //atrapa los errores y los manda a consola
                }).catch(err => console.log(err));
        } else {
            //si no encontro el usuario, manda los errores por JSOn
            errors.noUser = "No existe el usuario";
            res.status(404).json(errors.noUser);
        }
    });
});

//@route    GET api/profile/updateEmail
//@desc     Actualiza el email
//access    private
router.post("/updateEmail", passport.authenticate('jwt', {session: false}), (req, res) =>{
    const { errors, isValid } = validateUpdateEmailInput(req.body);
    //Validación de campos
    if (!isValid){
        return res.status(400).json(errors);
    }
    //Se pone el email actual como el nuevo email
    const newUser = {
        email: req.body.email2
    };
    //Busca el usuario mediante el ID
    User.findOne({_id: req.body.id}).then(user =>{
        if(user){
            //Si lo encuentra, compara el email con el de la petición
            bcrypt.compare(req.body.email, user.email)
            .then(isMatch =>{
                //Si coincide
                if (isMatch){
                    //Encuentra y actualiza, setea los parametros y los regresa por JSON
                    User.findOneAndUpdate(
                        { _id: req.user.id },
                        { $set: newUser },
                        { new: true }
                    ).then(updated => res.json(updated));
                } else {
                    //Si no coincidio, es email incorrecto
                    errors.email = "Email incorrrecto";
                    res.status(404).json(errors);
                }
            }).catch(err => console.log(err));
        } else {
           //Si no se encontro el usuario, manda los errores por JSON
           errors.noUser = "No existe el usuario";
           res.status(404).json(errors.noUser); 
        }
    });
});

module.exports = router;