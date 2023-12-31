const Category = require("../../models/Category");
const Product = require("../../models/Product");
const { cloudinary } = require("../../../config/cloudinary");
const fs = require("fs");
const path = require("path");

const getAllProducts = async (req, res) => {
  try {
    let query = {};
    let sort = "-createdAt";
    let page = 1;
    let limit = 6;

    if (req.query.title) {
      query.name = { $regex: `${req.query.title}`, $options: "i" };
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.active) {
      req.query.active === "true"
        ? (query.active = true)
        : (query.active = false);
    }

    if (req.query.sort) {
      sort = req.query.sort;
    }
    if (req.query.page) {
      page = parseInt(req.query.page);
    }
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    let skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();
    const totalResults = await Product.find(query);

    return res
      .status(200)
      .json({ success: true, data: products, total: totalResults.length });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const postNewProduct = async (req, res) => {	
  //return res.json(req.file);
  try {
    const { name, category, description, active } = req.body;
    const price = parseInt(req.body.price);

    //const imageUploaded = await cloudinary.v2.uploader.upload(req.file.path);
    //let base64 = req.file.toString('base64');
    //let imagebase = new Buffer(base64, 'base64');
    const product = new Product({
      name,
      price,
      category,
      description,
      img:{
      	data: fs.readFileSync(path.join('storage/media/' + req.file.filename)),
        contentType: 'image/png'
      },
    });

    /*fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });*/

    await Category.findByIdAndUpdate(
      req.id,
      { $inc: { quantity: 1 } },
      { new: true }
    );

    const newProduct = await product.save();

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateProductById = async (req, res) => {
  const { name, category, description, active } = req.body;
  const price = parseInt(req.body.price);
  try {
    const productFound = await Product.findById(req.params.id);

    if (!productFound)
      return res
        .status(404)
        .json({ success: false, message: "product not found" });

    let image;

    if (req.file) {
      image = {data: fs.readFileSync(path.join('storage/media/' + req.file.filename)),
        contentType: 'image/png'}
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name || productFound.name,
        description: description || productFound.description,
        category: category || productFound.category,
        price: price || productFound.price,
        img : image || productFound.img,
        active: active || productFound.active,
      },
      { new: true }
    );

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};


const deleteProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "product not found" });

    //await Category.decrementCategoryProducts(product.category);

    await Product.findByIdAndRemove(req.params.id);

    return res
      .status(200)
      .json({ success: true, message: "Product has been deleted" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "something went wrong, product was not delete correctly",
    });
  }
};

const Capitalize = (str) =>{
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getProductSearchByName = async (req,res) => {
  const search = Capitalize(req.params.name);
  const products = await Product.find({"name": new RegExp('.*' + search + '.*')});
  return res
      .status(200)
      .json(products);
}

module.exports = {
  getAllProducts,
  getProductById,
  postNewProduct,
  updateProductById,
  deleteProductById,
  getProductSearchByName
};