db = require("../db/queries");

async function getAllCategories(req, res) {
  const listedCategories = await db.getUniqueCategories();

  res.render("categories", { title: "Frootie Categories", listedCategories });
}

module.exports = {
  getAllCategories,
};
