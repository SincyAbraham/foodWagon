const user = require("../../../models/Users");
const Role = require("../../../models/Roles");
const validateRegisterInput = require("../../../validations/auth/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../../../config/application").key;

exports.register = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(422).json({status:false,message:errors.message});
  }
  const roles = await Role.find({name:'user'});
  const users = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    roles:roles[0]._id
  });
  var UserFind = await user.findOne({ email: req.body.email });
  
  if(UserFind){
    return res.status(422).json({status:false,message:'Email Already Exists'});
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(users.password, salt, (err, hash) => {
      if (err) throw err;
      users.password = hash;
      users
        .save()
        .then(user => res.json({status:true,message:'User Registered Successfully'}))
        .catch(err => console.log(err));
    });
  });
};
