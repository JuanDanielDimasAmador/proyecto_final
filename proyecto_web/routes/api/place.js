const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const router = express.Router();

const validateCriticInput = require("../../validation/critic");
const critic = require("../../models/critic");






module.exports = router;