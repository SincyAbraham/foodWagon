const user = require("../../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../../../config/application").key;
const Role = require("../../../models/Roles");

exports.login = (req, res) => {
  // Find user by email
  user.findOne({ email: req.body.email }).populate("roles").then(user => {
    // Check for user
    if (!user) {
      // errors.email = "User not found";
      return res.status(404).json(
        {
          success: false,
          message: "user not found"
        }
      );
    }

    if(!req.body.password){
      return res.status(404).json(
        {
          success: false,
          message: "Please enter Password"
        }
      );
    }

    // Check Password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {      
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, email: user.email }; // Create JWT Payload       
        let roleFound = Role.findOne({ _id: user.roles[0] }); 
        // Sign Token
        jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
          return res.json({
            success: true,
            token: token,
            type:user.roles[0].name,
            name:user.name,
            id:user._id,
            email:user.email
          });
        });
      } else {
        // errors.password = "Password incorrect";
        return res.status(400).json({
            success: false,
            message: "Password Incorrect"
          });
      }
    });
  });
};

exports.currentUser = (req, res) => {
  return res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};
