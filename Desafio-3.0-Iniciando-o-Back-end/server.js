const express = require("express");
const nunjucks = require("nunjucks");
const videos = require("./data");

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false
});

server.get("/", function (req, res) {
    const data = {
        avatarUrl:
            "https://avatars2.githubusercontent.com/u/51523433?s=460&u=b484a77c22f9ff70c975e242ae41fabdce39c780&v=4",
        name: "Lucas Reis Caputo",
        role: "Desenvolvedor",
        description: "Focado em transformar ideias em produtos",
        links: [
            {
                name: "GitHub",
                url: "https://github.com/LucasCaputo"
            },
            {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/lucascaputo/"
            }
        ]
    };

    return res.render("about", { about: data });
});

server.get("/courses", function (req, res) {
    return res.render("courses", { items: videos });
});

server.use(function (req, res) {
    res.status(404).render("not-found");
});

server.listen(5000, function () {
    console.log("Server is run mano");
});
