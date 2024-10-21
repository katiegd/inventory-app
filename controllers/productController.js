const db = require("../db/queries");

async function getAllProducts(req, res) {
  const sort = req.query.sort;
  const selectedCategory = req.query.category;

  const listedCategories = await db.getCategories();

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
  const listedCategories = await db.getCategories();

  res.render("newProduct", { listedCategories });
}

async function addProductToDb(req, res) {
  const newProduct = {
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    brand: req.body.brand,
    description: req.body.description,
    category: req.body.category,
    src: req.file ? `/uploads/${req.file.filename}` : "/images/default.svg",
    isDefault: false,
  };

  try {
    await db.addProductToDb(newProduct);
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding product to database.");
  }
}

module.exports = {
  getAllProducts,
  showProduct,
  addProduct,
  addProductToDb,
};
