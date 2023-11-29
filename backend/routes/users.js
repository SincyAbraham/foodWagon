const router = require("express").Router();
const {
  getAllRoles,
  getAllUsers,
  getUserById,
  createUser,
  updateUserRoleById,
  updateProfileById,
  updateUserById,
  updateUserPassword,
  deleteUser
} = require("../app/http/controllers/userControllers");
const { verifyToken, isAdmin } = require("../middleware/authJwt");
const {
  checkDuplicatedEmail,
  checkRolesExisted,
} = require("../middleware/verifySignUp");
const {
  checkIsValidUser,
  checkIsValidUpdate,
} = require("../middleware/userValidator");
router.get("/roles", [verifyToken],getAllRoles);
router.get("/", [verifyToken], getAllUsers);
router.get("/:id", [verifyToken], getUserById);

router.put("/me", [verifyToken, checkIsValidUpdate], updateProfileById);
router.put("/:id", [verifyToken, checkIsValidUpdate], updateUserById);
router.put("/password/:id", [verifyToken], updateUserPassword);
router.delete("/:id", [verifyToken], deleteUser);
router.put(
  "/role/:id",
  [verifyToken, isAdmin, checkRolesExisted],
  updateUserRoleById
);
router.post(
  "/",
  [
    verifyToken,
    isAdmin,
    checkDuplicatedEmail,
    checkRolesExisted,
    checkIsValidUser,
  ],
  createUser
);

module.exports = router;