const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const router = express.Router();

const Nickname = require("../../models/nickname");
const User = require("../../models/user");
const dataUser = require("../../client/src/components/auth/login");

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
                    name: res.body.name,
                    facebook_id: res.body.id,
                    email: res.body.email
                });
            }
        });
        newUser.save()
            .then(user => res.json(user))
            //Si hubo un error, lo manda a consola
            .catch(err => console.log(err));
});