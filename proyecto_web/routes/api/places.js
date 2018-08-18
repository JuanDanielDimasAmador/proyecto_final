const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const validateRegisterPlaceInput = require("../../validation/register_place");

const Place = require("../../models/place");

//@route    POST api/places/
//@desc     register a place
//@access   public
router.post("/",  (req,res) => {
    const { errors, isValid } = validateRegisterPlaceInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newPlace = new Place({
        name: req.body.name,
        type: req.body.type,
        direction: req.body.direction
    });
    newPlace.save()
    .then(place => res.json(place))
    //Si hubo un error, lo manda a consola
    .catch(err => console.log(err));
});


//@route    GET api/places/
//@desc     find all places
//@access   public
router.get("/", (req,res) => {
    const errors = { };
    Place.find()
        .sort({date: -1})
        .then(places => {
            errors.noPlaces = "No existe ningun lugar";
            if (!places) return res.status(404).json(errors);
            res.json(places);
        })
        .catch(err => res.status(404).json(err));
});

//@route    GET api/places/:id
//@desc     find place by ID
//@access   public
router.get("/:id", (req,res) => {
    const errors = { };
    const {id} = req.params;
    Place.findById(id)
        .then(places => {
            errors.noPlaces = "No existe ningun lugar";
            if(!places) return res.status(404).json(errors);
            res.json(places);
        })
        .catch(err => res.status(404). json(err));
});

//@route    DELETE api/places/:id
//@desc     borrar lugar
//@access   private
router.delete("/:id", passport.authenticate('jwt', {session: false}), (req,res) =>{
    const errors = { };
    Place.findById(req.params.id)
        .then(place => {
            if (place.user.toString() === req.user.id) {
                place.remove().then(res.json("Success"));
            } else {
                errors.unauthorized = "Usuario no autorizado para borrar eso";
                return res.json(errors.unauthorized);
            }
        }).catch(err => res.json(err))
});


module.exports = router;