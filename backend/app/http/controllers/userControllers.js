const User = require("../../models/Users");
const Role = require("../../models/Roles");
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roles");

    return res.status(200).json({ successful: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({});

    return res.status(200).json({ successful: true, data: roles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 }).populate(
      "roles"
    );

    return res.status(200).json({ successful: true, data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserRoleById = async (req, res) => {
  const { roles } = req.body;

  try {
    let roleFound = await Role.findOne({ name: roles });

    if (!roleFound)
      return res
        .status(404)
        .json({ success: false, message: "not role provided" });

    let user = await User.findById(req.params.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { roles: roleFound._id } },
      { new: true }
    );
    updatedUser = await user.save();

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    const id = mongoose.Types.ObjectId();
    
    const user = new User({
      _id: id,
      name,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const savedUser = await user.save();

    return res.status(201).json({
      success: true,
      data: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "something went wrong, fail to create user ",
    });
  }
};
const updateProfileById = async (req, res) => {
  
  const number = parseInt(req.body.number);

  try {
    let userFound = await User.findById(req.userId);

    if (!userFound)
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });

    let encodedPassword;

    if (newPassword && password) {
      const matchPassword = await User.comparePassword(
        password,
        userFound.password
      );

      if (!matchPassword)
        return res.status(401).json({
          token: null,
          message: "Invalid Password",
        });

      encodedPassword = await User.encryptPassword(newPassword);
    } else {
      encodedPassword = undefined;
    }

    let profileState;

    if (
      (req.userAddress || userFound.address) &&
      (number || userFound.number)
    ) {
      profileState = "completed";
    } else {
      profileState = "uncompleted";
    }

    const updatedUser = await User.findByIdAndUpdate(
      userFound.id,
      {
        name: req.userName || userFound.name,
        password: encodedPassword || userFound.password,
        email: userFound.email,
        roles: userFound.roles,
        address: req.userAddress || userFound.address,
        number: number || userFound.number,
        profileState: profileState,
        client: userFound.client,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: `User updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "server side error" });
  }
};

const updateUserById = async (req, res) => {
  const { newPassword,password, email, name,roles } = req.body;

  try {
    let userFound = await User.findById(req.params.id);
    const rolesFound = await Role.find({ name: { $in: roles } });

    if (!userFound)
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });

    let encodedPassword;

    if (newPassword && password) {
      const matchPassword = await User.comparePassword(
        password,
        userFound.password
      );

      if (!matchPassword)
        return res.status(401).json({
          token: null,
          message: "Invalid Password",
        });

      encodedPassword = await User.encryptPassword(newPassword);
    } else {
      encodedPassword = undefined;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userFound.id,
      {
        name: name,
        password: encodedPassword || userFound.password,
        email: email,
        roles: rolesFound.map((role) => role._id)
      }      
    );

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: `User updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "server side error" });
  }
};

const updateUserPassword = async (req, res) => {
  const { newPassword,password} = req.body;

  try {
    let userFound = await User.findById(req.params.id);

    if (!userFound)
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });

    let encodedPassword;

    if (newPassword && password) {
      const matchPassword = await User.comparePassword(
        password,
        userFound.password
      );

      if (!matchPassword)
        return res.status(401).json({
          token: null,
          message: "Invalid Password",
        });

      encodedPassword = await User.encryptPassword(newPassword);
    } else {
      encodedPassword = undefined;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userFound.id,
      {
        password: encodedPassword || userFound.password,
      }      
    );

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: `User password updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "server side error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);

    return res.status(200).json({
      successful: true,
      message: `User  successfully deleted`,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      successful: false,
      message: "Something went wrong, could delate category",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserRoleById,
  updateProfileById,
  getAllRoles,
  updateUserById,
  updateUserPassword,
  deleteUser
};