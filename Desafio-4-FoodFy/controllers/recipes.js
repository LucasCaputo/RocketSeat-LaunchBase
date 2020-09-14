const fs = require("fs");
const data = require("../data.json");

exports.index = function(req, res) {
    return res.render("recipes/index", { recipes: data.recipes})
}

exports.create = function(req, res) { 
    return res.render("recipes/create")
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all");
        }
    }

    let {
        avatar_url,
        name,
        description,
        duration,
        price,
        chef
        
    } = req.body;

    const created_at = Date.now();
    const id = Number(data.recipes.length + 1);

    data.recipes.push({
        id,
        avatar_url,
        name,
        description,
        duration,
        price,
        chef,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error");
    });

    return res.redirect(`recipes/${id}`);
};

exports.home = function (req, res) {
    allData = data.recipes
    return res.render("home", {allData} );
}

exports.show = function (req, res) {
    const { id } = req.params;

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id;
    });

    if (!foundRecipe) return res.send("recipe not found");

    const recipe = {
        ...foundRecipe,
        created_at: Intl.DateTimeFormat("pt-BR").format(
            foundRecipe.created_at
        )
    };

    return res.render("recipes/show", { recipe });
};

exports.edit = function (req, res) {
    const { id } = req.params;

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id;
    });

    if (!foundRecipe) return res.send("recipe not found");

    const recipes = {
        ...foundRecipe,
    };

    return res.render("recipes/edit", { recipes });
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

