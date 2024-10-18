const db = require("../db/queries");

async function getAllProducts(req, res) {
  const sort = req.query.sort;
  const selectedCategory = req.query.category;

  const listedCategories = await db.getUniqueCategories();

  let products;

  if (sort === "priceAsc" || sort === "priceDesc") {
    products = await db.sortByPrice({ sort });
  } else if (sort === "nameAsc" || sort === "nameDesc") {
    products = await db.sortByName({ sort });
  } else if (selectedCategory) {
    products = await db.filterByCategory({ selectedCategory });
  } else {
    products = await db.showAllProducts();
  }
  res.render("products", {
    title: "Products",
    products,
    sort,
    selectedCategory,
    listedCategories,
  });
}

async function showProduct(req, res) {
  const id = req.params.id;
  const products = await db.filterById(id);

  res.render("viewProduct", { product: products });
}

async function addProduct(req, res) {
  res.render("newProduct");
}

module.exports = {
  getAllProducts,
  showProduct,
  addProduct,
};
