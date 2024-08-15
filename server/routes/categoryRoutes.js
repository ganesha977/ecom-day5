//require express
const express = require('express');
const authMiddleware = require('../middlewere/auth-middlewere');
const adminmiddlewere = require('../middlewere/admin-middlewere');
// const getallusers = require('../controllers/admin-controller');
//categorycontroller
const categoryController = require('../controllers/categoryController');
const router = express.Router();

//router






router.post('/create-category',authMiddleware,adminmiddlewere,categoryController.createCategoryController);
 //update category
 router.put(
    "/update-category/:id",
    authMiddleware,
    adminmiddlewere,
    categoryController.updateCategoryController
  );
  
  //getALl category
  router.get("/get-category",authMiddleware,adminmiddlewere,categoryController.categoryControlller);
  
  //single category
  router.get("/single-category/:slug", authMiddleware,adminmiddlewere,categoryController.singleCategoryController);
  
  //delete category
  router.delete(
    "/delete-category/:id",
    authMiddleware,
    adminmiddlewere,
    categoryController.deleteCategoryCOntroller
  );



module.exports=router;
