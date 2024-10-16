const db = require("../db/queries");

async function getAllProducts(req, res) {
  const sort = req.query.sort;
  const selectedCategory = req.query.category;
  const selectedColors = req.query.color;

  const listedCategories = await db.getUniqueCategories();
  const listedColors = await db.getUniqueColors();

  let products;

  if (sort === "priceAsc" || sort === "priceDesc") {
    products = await db.sortByPrice({ sort });
  } else if (sort === "nameAsc" || sort === "nameDesc") {
    products = await db.sortByName({ sort });
  } else if (selectedCategory) {
    products = await db.filterByCategory({ selectedCategory });
  } else if (selectedColors) {
    products = await db.filterByColor({ selectedColors });
  } else {
    products = await db.showAllProducts();
  }
  res.render("products", {
    title: "Products",
    products,
    sort,
    selectedCategory,
    listedCategories,
    selectedColors,
    listedColors,
  });
}

module.exports = {
  getAllProducts,
};
