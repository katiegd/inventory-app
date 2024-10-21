const pool = require("./pool");

async function filterById(id) {
  const { rows } = await pool.query("SELECT * FROM inventory WHERE id = $1", [
    id,
  ]);
  // If you don't do rows[0], it returns an array which will result in undefined.
  return rows[0];
}

async function showAllProducts() {
  const { rows } = await pool.query("SELECT * FROM inventory;");
  return rows;
}

async function sortByPrice({ sort = "priceASC" }) {
  const order = sort.toUpperCase() === "PRICEDESC" ? "DESC" : "ASC";

  const { rows } = await pool.query(
    `SELECT * FROM inventory ORDER BY price ${order}`
  );
  return rows;
}

async function sortByName({ sort = "nameASC" }) {
  const order = sort.toUpperCase() === "NAMEDESC" ? "DESC" : "ASC";

  const { rows } = await pool.query(
    `SELECT * FROM inventory ORDER BY name ${order}`
  );
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query(
    "SELECT * FROM categories ORDER BY category ASC;"
  );
  return rows;
}

async function addCategory(newCategory) {
  await pool.query(
    "INSERT INTO categories (category, color) VALUES ($1, $2);",
    [newCategory.category, newCategory.color]
  );
}

async function filterByCategory({ selectedCategory }) {
  // Make sure selectedCategory is an array to use with .map()
  if (!Array.isArray(selectedCategory)) {
    selectedCategory = [selectedCategory];
  }

  // Make placeholder for each selection "COLOR, "
  const placeholder = selectedCategory
    .map((_, index) => `$${index + 1}`)
    .join(", ");
  const query = `SELECT * FROM inventory WHERE category IN (${placeholder})
  ORDER BY category ASC`;

  // Pass the query as well as the category for the placeholder function to work
  const { rows } = await pool.query(query, selectedCategory);
  return rows;
}

async function addProductToDb(newProduct) {
  await pool.query(`INSERT INTO inventory ( name,
    quantity,
    price,
    brand,
    description,
    category,
    src,
    isDefault) VALUES ('${newProduct.name}','${newProduct.quantity}','${newProduct.price}','${newProduct.brand}','${newProduct.description}','${newProduct.category}','${newProduct.src}', '${newProduct.isDefault}');`);
}

async function deleteProduct(id) {
  await pool.query("DELETE FROM inventory WHERE id = $1", [id]);
}

async function deleteCategory(category) {
  await pool.query("DELETE FROM categories WHERE category = $1", [category]);
}

async function editProduct({
  id,
  name,
  quantity,
  price,
  category,
  brand,
  src,
  description,
}) {
  const updates = [];
  const values = [];
  let index = 1;

  if (name) {
    updates.push(`name = $${index++}`);
    values.push(name);
    console.log("There were name changes.");
  }
  if (quantity) {
    updates.push(`quantity = $${index++}`);
    values.push(quantity);
    console.log("There were quantity changes.");
  }
  if (price) {
    updates.push(`price = $${index++}`);
    values.push(price);
  }
  if (category) {
    updates.push(`category = $${index++}`);
    values.push(category);
  }
  if (brand) {
    updates.push(`brand = $${index++}`);
    values.push(brand);
  }
  if (src) {
    updates.push(`src = $${index++}`);
    values.push(src);
  }
  if (description) {
    updates.push(`description = $${index++}`);
    values.push(description);
  }

  if (updates.length > 0) {
    const query = `UPDATE inventory SET ${updates.join(
      ", "
    )} WHERE id = $${index}`;
    values.push(id);
    await pool.query(query, values);
  }
}

module.exports = {
  filterById,
  showAllProducts,
  sortByPrice,
  sortByName,
  filterByCategory,
  getCategories,
  addProductToDb,
  addCategory,
  deleteProduct,
  deleteCategory,
  editProduct,
};
