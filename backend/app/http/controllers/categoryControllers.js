const Category = require("../../models/Category");
const Products = require("../../models/Product");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    return res.status(200).json({ successful: true, data: categories });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      successful: false,
      message: "Something went wrong, could not get all categories",
    });
  }
};

const createCategory = async (req, res) => {
  try {  	
    const newCategory = new Category({ name: req.body.name });
    await newCategory.save();

    return res.status(201).json({
      successful: true,
      category: newCategory,
      message: `Category ${newCategory} created successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      successful: false,
      message: "Something went wrong, could create new category",
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.id);
    await Products.deleteMany({ category: req.categoryName });

    return res.status(200).json({
      successful: true,
      message: `Category  successfully deleted`,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      successful: false,
      message: "Something went wrong, could delate category",
    });
  }
};

const editCategoryName = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.id, {
      $set: { name: req.body.categoryname },
    });

    await Products.updateMany(
      { category: req.categoryName },
      { category: req.body.categoryname }
    );

    return res.status(200).json({
      successful: false,
      category: { ...category, name: req.body.categoryname },
      message: `Category successfully renamed`,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      successful: false,
      message: "Something went wrong, could not delate category",
    });
  }
};

module.exports = {
  getAllCategories,
  deleteCategory,
  editCategoryName,
  createCategory,
};