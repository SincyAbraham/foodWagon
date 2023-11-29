const Role = require("../app/models/Roles");
const User = require("../app/models/Users");
const Category = require("../app/models/Category");
const bcrypt = require("bcryptjs");

const createRoles = async () => {
  const ROLES = ["user", "admin"];
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;
    
    const defaultRoles = ROLES.map((role) => ({
      name: role,
    }));
    await Role.create(defaultRoles);
  } catch (err) {
    console.error(err);
  }
};

const createAdmin = async () => {
  try {
    const user = await User.findOne({ email: "admin@localhost.com" });

    const roles = await Role.find({ name: { $in: ["admin"] } });

    if (!user) {
      await User.create({
        name: "admin",
        email: "admin@localhost.com",
        password: await bcrypt.hash("admin", 10),
        roles: roles.map((role) => role._id),
      });
      console.log("Admin User Created!");
    }
  } catch (err) {
    console.log(err);
  }
};
const createUser = async () => {
  try {
    const user = await User.findOne({ email: "user@localhost.com" });

    const roles = await Role.find({ name: { $in: ["user"] } });

    if (!user) {
      await User.create({
        name: "user",
        email: "user@localhost.com",
        password: await bcrypt.hash("user", 10),
        roles: roles.map((role) => role._id),
      });

      console.log("User Created!");
    }
  } catch (err) {
    console.log(err);
  }
};
const createCategories = async () => {
  const CATEGORIES = [
    "Pizzas",
    "Hamburguesas",
    "Sandwiches",
    "Hot dogs",
    "Empanadas"
  ];
  try {
    const count = await Category.estimatedDocumentCount();

    if (count > 0) return;

    const defaultCategories = CATEGORIES.map((category) => ({
      name: category,
    }));

    await Category.create(defaultCategories);
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  createRoles,
  createAdmin,
  createUser,
  createCategories,
};