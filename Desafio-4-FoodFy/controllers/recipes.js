const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

exports.index = function(req, res) {
    return res.render("recipes/index", { recipes: data.recipes})
}

exports.create = function(req, res) { 
    return res.render("recipes/create")
}


exports.show = function (req, res) {
    const { id } = req.params;

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id;
    });

    if (!foundRecipe) return res.send("recipe not found");

    const recipe = {
        ...foundRecipe,
        age: age(foundRecipe.birth),
        gender: "",
        services: foundRecipe.services.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(
            foundRecipe.created_at
        )
    };

    return res.render("recipes/show", { recipe });
};

exports.post = function (req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all");
        }
    }

    let {
        avatar_url,
        birth,
        gender,
        class_type,
        services,
        name,
        educational_level
    } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.recipes.length + 1);

    data.recipes.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        class_type,
        services,
        created_at,
        educational_level
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error");
    });

    return res.redirect(`recipes/${id}`);
};

exports.edit = function (req, res) {
    const { id } = req.params;

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id;
    });

    if (!foundRecipe) return res.send("recipe not found");

    const recipe = {
        ...foundRecipe,
        birth: date(foundRecipe.birth).iso
    };

    return res.render("recipes/edit", { recipe });
};

exports.put = function (req, res) {
    const { id } = req.body;

    let index = 0;

    const foundRecipe = data.recipes.find(function (
        recipe,
        foundIndex
    ) {
        if (id == recipe.id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundRecipe) return res.send("recipe not found");

    const recipe = {
        ...foundRecipe,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    };

    data.recipes[index] = recipe;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write error!");

        return res.redirect(`recipes/${id}`);
    });
};

exports.delete = function(req, res) {
    const {id} = req.body
    const filteresrecipes = data.recipes.filter(function(recipe) {
        return recipe.id != id
    })

    data.recipes = filteresrecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write error!");

        return res.redirect(`recipes`);
    })
}

