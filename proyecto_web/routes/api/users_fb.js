const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const router = express.Router();

const Nickname = require("../../models/nickname");
const User = require("../../models/user");
//const dataUser = require("../../client/src/components/auth/login");

//@route    POST/api/users/register
//@desc     Register a Facebook user
//@access   public
router.post("/registerFb", (req,res) => {
    const nick = Nickname;
    //Busca al usuario en base al email
    User.findOne({email: req.body.email})
        .then(user =>{
            if(user){
                //Si existe, retorna el error
                return res.status(400).json({email: "Esta cuenta ya existe."});
            } else {
                //Si no existe, se crea el objeto
                const newUser = new User({
                    nickname: nick,
                    name: req.body.name,
                    facebook_id: req.body.id,
                    email: req.body.email
                });
                newUser.save()
                .then(user => res.json(user))
                //Si hubo un error, lo manda a consola
                .catch(err => console.log(err));
            }
        });
});

//@route    POST/api/users_fb/loginfb
//@desc     Login a Facebook user
//@access   public
router.post("/loginfb", (req,res) =>{
    //Busca al usuario en base al email
    User.findOne({email: req.body.email})
        .then(user =>{
            //Si el usuario no existe, manda error
            if(!user){
                //console
            }
            //Si el usuario coincide, jwt carga el payload y genera una clave o token el cual expirará en una hora
            if (user){
                const payload = {id: user.id, nickname: user.nickname};
                jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600},
                (token) =>{
                    //Si hubo un error, se muestra, de no ser así, envia el token
                    res.json({ succes: true, token: 'Bearer' + token });
                }
            );
            } else{
                //console
            }
            
        })
});


module.exports = router;