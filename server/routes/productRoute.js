const express = require("express");

const formidable = require("express-formidable");
const authMiddleware = require("../middlewere/auth-middlewere");
const adminmiddlewere = require("../middlewere/admin-middlewere");
const { createProductController, updateProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController } = require("../controllers/prodcutcontroller");

const router = express.Router();

//routes
router.post("/create-product", authMiddleware, adminmiddlewere, formidable(), createProductController)
//routes
router.put("/update-product/:pid", authMiddleware, adminmiddlewere, formidable(), updateProductController);

//get products
router.get("/get-products", getProductController);
//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete/:pid",deleteProductController)
//delete rproduct
module.exports = router;