const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

exports.index = function(req, res) {
    return res.render("instructors/index", { instructors: data.instructors})
}

exports.create = function(req, res) { 
    return res.render("instructors/create")
}


exports.show = function (req, res) {
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id;
    });

    if (!foundInstructor) return res.send("instructor not found");

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        gender: "",
        services: foundInstructor.services.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(
            foundInstructor.created_at
        )
    };

    return res.render("instructors/show", { instructor });
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
    const id = Number(data.instructors.length + 1);

    data.instructors.push({
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

    return res.redirect(`/instructors/${id}`);
};

exports.edit = function (req, res) {
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id;
    });

    if (!foundInstructor) return res.send("instructor not found");

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    };

    return res.render("instructors/edit", { instructor });
};

exports.put = function (req, res) {
    const { id } = req.body;

    let index = 0;

    const foundInstructor = data.instructors.find(function (
        instructor,
        foundIndex
    ) {
        if (id == instructor.id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundInstructor) return res.send("instructor not found");

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    };

    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write error!");

        return res.redirect(`/instructors/${id}`);
    });
};

exports.delete = function(req, res) {
    const {id} = req.body
    const filteresINstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
    })

    data.instructors = filteresINstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write error!");

        return res.redirect(`/instructors`);
    })
}

