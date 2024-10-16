const pool = require("./pool");

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

async function getUniqueCategories() {
  const { rows } = await pool.query(
    "SELECT DISTINCT category FROM inventory ORDER BY category ASC"
  );
  const categories = rows.map((row) => row.category);
  return categories;
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

async function getUniqueColors() {
  const { rows } = await pool.query(
    "SELECT DISTINCT color FROM inventory ORDER BY color ASC"
  );
  const colors = rows.map((row) => row.color);
  return colors;
}

async function filterByColor({ selectedColors }) {
  if (!Array.isArray(selectedColors)) {
    selectedColors = [selectedColors];
  }

  const placeholder = selectedColors
    .map((_, index) => `$${index + 1}`)
    .join(", ");

  const query = `SELECT * FROM inventory WHERE color IN (${placeholder})
  ORDER BY color ASC`;

  const { rows } = await pool.query(query, selectedColors);
  return rows;
}

module.exports = {
  showAllProducts,
  sortByPrice,
  sortByName,
  filterByCategory,
  getUniqueColors,
  getUniqueCategories,
  filterByColor,
};
