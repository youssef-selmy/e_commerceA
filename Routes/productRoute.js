const express = require("express");
const {
  getProductValidator,
  updateProductValidator,
  createProductValidator,
  deleteProductValidator,
} = require("../utils/validators/prodectValidator");

const {
  getProducts,
  createProduct,
  getProduct,
  upduateProduct,
  deleteProduct,
  upduateProductReports,
  updateProductImageCtrl,
} = require("../controllers/prodectController");
const { protect } = require("../controllers/authController");
const authController = require("../controllers/authController");
const photoUpload = require("../middlewares/uploadPhoto");

const router = express.Router();

router
  .route("/")
  .get( getProducts)
  .post(
    protect,
    authController.restictTo("seller", "admin"),
    photoUpload.single("image"),
    createProductValidator,
    createProduct
  );
router
  .route("/:id")
  .get(protect, getProductValidator, getProduct)
  .put(
    protect,
    authController.restictTo("seller"),
    updateProductValidator,
    upduateProduct
  )
  .delete(
    protect,
    authController.restictTo("seller"),
    deleteProductValidator,
    deleteProduct
  );
router.route("/updateProductReports/:id").put(protect, upduateProductReports);
router
  .route("/uploadImage/:id")
  .put(
    protect,
    authController.restictTo("seller","admin"),
    photoUpload.single("image"),
    updateProductImageCtrl
  );
module.exports = router;
