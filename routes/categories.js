const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.render("categories", { title: "Frootie Categories" });
});

module.exports = router;
