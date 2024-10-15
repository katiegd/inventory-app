const db = require("../db/queries");

async function getAllProducts(req, res) {
  const products = await db.showAllProducts();
  res.render("products", { title: "Products", products });
}

module.exports = {
  getAllProducts,
};
