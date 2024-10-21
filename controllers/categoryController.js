db = require("../db/queries");

async function getAllCategories(req, res) {
  const listedCategories = await db.getCategories();

  res.render("categories", { title: "Frootie Categories", listedCategories });
}

async function newCategoryGet(req, res) {
  res.render("newCategory", { title: "Add a Category" });
}

async function newCategoryPost(req, res) {
  const input = {
    category: req.body.category,
    color: req.body.color,
  };
  console.log(input);
  try {
    await db.addCategory(input);
    res.redirect("/categories");
  } catch (err) {
    res.status(500).send("Error adding category to database.");
  }
}

module.exports = {
  getAllCategories,
  newCategoryGet,
  newCategoryPost,
};
