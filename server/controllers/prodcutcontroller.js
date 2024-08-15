const fs = require("fs");
const slugify = require("slugify");
const productModel = require("../models/productmodel");

const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      originalPrice,
      discountedPrice,
      discount,
      rating
    } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !originalPrice:
        return res.status(500).send({ error: "Original Price is Required" });
      case !discountedPrice:
        return res.status(500).send({ error: "Discounted Price is Required" });
      case !discount:
        return res.status(500).send({ error: "Discount is Required" });
      case !rating:
        return res.status(500).send({ error: "Rating is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Photo should be less than 1MB" });
    }

    const products = new productModel({
      ...req.fields,
      slug: slugify(name)
    });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product"
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products",
      products
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product
    });
    console.log(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error
    });
  }
};

const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    console.log(product)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      originalPrice,
      discountedPrice,
      discount,
      rating
    } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !originalPrice:
        return res.status(500).send({ error: "Original Price is Required" });
      case !discountedPrice:
        return res.status(500).send({ error: "Discounted Price is Required" });
      case !discount:
        return res.status(500).send({ error: "Discount is Required" });
      case !rating:
        return res.status(500).send({ error: "Rating is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Photo should be less than 1MB" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name)
      },
      { new: true }
    );

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product"
    });
  }
};

module.exports = {
  getProductController,
  createProductController,
  deleteProductController,
  getSingleProductController,
  updateProductController,
  productPhotoController
};
