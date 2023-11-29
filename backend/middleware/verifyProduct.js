const Category = require("../app/models/Category");

const checkCategoryExist = async (req, res, next) => {
  try {
    const categoryFound = await Category.findOne({ name: req.body.category });

    if (!categoryFound)
      return res
        .status(404)
        .json({ successful: false, message: "Not category found" });

    req.id = categoryFound._id;

    next();
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Something went wrong, category existence verification fail",
    });
  }
};

module.exports = checkCategoryExist;