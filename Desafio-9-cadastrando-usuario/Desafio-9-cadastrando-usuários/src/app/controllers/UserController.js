const User = require('../models/Users')

module.exports = {
    registerForm(req, res) {
        
        return res.render("users/register")
    },
    show(req, res) {
        return res.send('ok , cadsatrado')
    },
    async post(req, res) {
        
        const userId = await User.create(req.body)

        return res.redirect("/users")
    }
}