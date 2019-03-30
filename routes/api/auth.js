const express = require("express");
const router = express.Router();
const User = require("../../models/User"); //User
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
/*
 #  @route   POST api/auth
 #  @desc    Authenticate New User
 #  @access  Public
 */
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Validation -- simple
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    //Create salt and hash for password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
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

/*
 #  @route   POST api/auth/user
 #  @desc    Get User Data
 #  @access  Protected
 */
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
