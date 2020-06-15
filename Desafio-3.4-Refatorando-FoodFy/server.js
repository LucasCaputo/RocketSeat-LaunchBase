const express = require("express");
const nunjucks = require("nunjucks");
const receitas = require("./data");

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.get("/", function (req, res) {
    const data = {
        title: "As Melhores Receitas",
        description:
            "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro."
    };

    return res.render("home.njk", { data, receitas });
});

server.use(function (req, res) {
    res.status(404).render("not-found");
});

server.listen(3333, function () {
    console.log("Server desafio FoodFy Run JOOW");
});
