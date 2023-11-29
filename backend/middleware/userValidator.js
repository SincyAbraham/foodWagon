const checkIsValidUser = (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password)
    res.status(400).json({
      successful: false,
      message: `Missing inputs, name: ${name} email:${email} password:${password}`,
    });

  let reg =
    /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

  let isValidEmail = reg.test(email);

  if (!isValidEmail)
    return res
      .status(400)
      .json({ successful: false, message: `Email is not valid` });

  if (!name)
    return res
      .status(400)
      .json({ successful: false, message: `Full name is required` });

  if (typeof name !== "string")
    return res
      .status(400)
      .json({ successful: false, message: ` Name is not valid` });

  if (password.length < 5)
    return res
      .status(400)
      .json({ successful: false, message: `Password min length is 5` });

  next();
};
const checkIsValidUpdate = (req, res, next) => {
  const { name, newPassword} = req.body;

  if (!name)
    return res
      .status(400)
      .json({ successful: false, message: `Full name is required` });

  if (typeof name !== "string")
    return res
      .status(400)
      .json({ successful: false, message: ` Name is not valid` });
  next();
};
module.exports = { checkIsValidUser, checkIsValidUpdate };