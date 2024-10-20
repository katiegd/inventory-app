const express = require("express");
const multer = require("multer");
const router = express.Router();
const productController = require("../controllers/productController");

const { upload } = require("../controllers/uploadMiddleware");

router.route("/").get(productController.getAllProducts);

router
  .route("/new")
  .get(productController.addProduct)
  .post(upload.single("src"), productController.addProductToDb);

//Put this route last otherwise it will mess up links
router.route("/:id").get(productController.showProduct);

module.exports = router;
