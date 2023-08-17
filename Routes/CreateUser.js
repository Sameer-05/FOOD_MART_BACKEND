const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "My name is sah okokkk";
router.post(
  "/createuser",
  [
    // Validate and sanitize the email
    body("email").isEmail(),

    // Validate the password (add more conditions as per your requirements)
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters long"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
//login
router.post(
  "/loginuser",
  [
    body("email").isEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "try login with correct id" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare == userData.password) {
        return res.status(400).json({ errors: "try login with correct id" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken=jwt.sign(data,jwtSecret)
      return res.json({ success: true ,authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
