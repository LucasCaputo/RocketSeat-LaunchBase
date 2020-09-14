const express = require("express");
const routes = express.Router();
const recipes = require("./controllers/recipes");
const foods = require("./food")

routes.get("/", function (req, res) {
    return res.redirect("/home");
});


routes.get("/home", function (req, res) {
    const data = {
        title: "As Melhores Receitas",
        description:
            "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro."
    };

    return res.render("home.njk", { data, foods });;
});

// receitas

routes.get("/recipes", recipes.index);

routes.get("/recipes/create", recipes.create);

routes.get("/recipes/:id", recipes.show);

routes.get("/recipes/:id/edit", recipes.edit);

routes.post("/recipes", recipes.post);

routes.put("/recipes", recipes.put);

routes.delete("/recipes", recipes.delete);


module.exports = routes;
