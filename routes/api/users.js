const express = require("express");
const router = express.Router();
const User = require("../../models/User"); //User
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
/*
 #  @route   POST api/users
 #  @desc    Register New User
 #  @access  Public
 */
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //Validation -- simple
  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
    });

    //Create salt and hash for password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            {
              id: user.id,
            },
            config.get("jwtSecret"),
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
