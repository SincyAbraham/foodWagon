const User = require("../app/models/Users");
const TemporalUser = require("../app/models/TemporalUser");
const ROLES = ["user", "admin"];

const checkDuplicatedEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "The email already exists" });

    const tempUser = await TemporalUser.findOne({ email: req.body.email });

    if (tempUser)
      return res.status(302).json({
        successful: false,
        message: "Email unverified",
        redirect: `/#/authentication/confirmation`,
        id: tempUser._id,
      });

    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong , signup fail" });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    if (!ROLES.includes(req.body.roles)) {
      return res.status(400).json({
        message: `Role ${req.body.roles} does not exist`,
      });
    }    
  }

  next();
};

module.exports = { checkDuplicatedEmail, checkRolesExisted };