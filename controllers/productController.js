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

async function deleteProduct(req, res) {
  const id = req.params.id;

  await db.deleteProduct(id);

  res.redirect("/products");
}

async function editProductGet(req, res) {
  const id = req.params.id;
  const products = await db.filterById(id);
  const listedCategories = await db.getCategories();
  const selectedCategory = products.category;

  res.render("editProduct", {
    product: products,
    listedCategories,
    selectedCategory,
  });
}

async function editProductPost(req, res) {
  const id = req.params.id;
  let src;

  const { name, quantity, price, category, brand, description } = req.body;

  if (req.file) {
    src = `/uploads/${req.file.filename}`;
  }

  await db.editProduct({
    id,
    name,
    quantity,
    price,
    category,
    brand,
    src,
    description,
  });

  res.redirect(`/products/${id}`);
}

async function searchPost(req, res) {
  const query = req.body.search;
  const results = await db.search(query);

  res.render("search", { title: "Search", query, products: results });
}

module.exports = {
  getAllProducts,
  showProduct,
  addProduct,
  addProductToDb,
  deleteProduct,
  editProductGet,
  editProductPost,
  searchPost,
};
