const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const router = express.Router();

const User = require("../../models/user");
// @route   GET api/users/test
// @desc    tests users route
// @access  public
router.get("/test",(req,res) => res.json({msg:"Users works"}));