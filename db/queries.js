const pool = require("./pool");

async function showAllProducts() {
  const { rows } = await pool.query("SELECT * FROM inventory;");
  console.log(rows);
  return rows;
}

module.exports = {
  showAllProducts,
};
