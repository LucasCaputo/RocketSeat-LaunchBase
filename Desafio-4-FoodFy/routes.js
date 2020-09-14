const express = require("express");
const routes = express.Router();
const recipes = require("./controllers/recipes");
const dataRecipes = require("./data.json")

routes.get("/", function (req, res) {
    return res.redirect("/home");
});


routes.get("/home", recipes.home);

// receitas

routes.get("/recipes", recipes.index);

routes.get("/recipes/create", recipes.create);

routes.get("/recipes/:id", recipes.show);

routes.get("/recipes/:id/edit", recipes.edit);

routes.post("/recipes", recipes.post);

routes.put("/recipes", recipes.put);

routes.delete("/recipes", recipes.delete);


module.exports = routes;
