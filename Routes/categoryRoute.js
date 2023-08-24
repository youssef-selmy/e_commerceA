const express = require('express');
const { getCategoryvalidator, updatecategoryvalidator, creatCategoryvalidator, deletecategoryvalidator } = require('../utils/validators/categoryValidators')

const { getCategories, createCategory, getCategory, upduateCategory, deletecategory, updateCategoryImageCtrl } = require('../controllers/categoryController');

//const subcategoriesroute = require("./subCategoryroute")
const authController = require('../controllers/authController')
const photoUpload = require("../middlewares/uploadPhoto");

const router = express.Router();

//router.use("/:categoryId/subcategoris", subcategoriesroute)

router.route('/').get(authController.protect,getCategories).post(authController.protect,authController.restictTo('admin'), creatCategoryvalidator, createCategory);
router.route('/:id')
    .get(authController.protect,getCategoryvalidator, getCategory)
    .put(authController.protect,authController.restictTo('admin'),updatecategoryvalidator, upduateCategory)
    .delete(authController.protect,authController.restictTo('admin'),deletecategoryvalidator, deletecategory);
    router.route('/uploadImage/:id')
    .put(authController.protect,authController.restictTo('admin'),photoUpload.single("image"), updateCategoryImageCtrl)
module.exports = router;