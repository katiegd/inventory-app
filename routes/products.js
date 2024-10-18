const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.route("/").get(productController.getAllProducts);
router.route("/new").get(productController.addProduct);

//Put this route last otherwise it will mess up links
router.route("/:id").get(productController.showProduct);

module.exports = router;
