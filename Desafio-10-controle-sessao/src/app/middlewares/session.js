const session = require("express-session")

function onlyUsers(req, res, next) {
    
    if(!req.session.userId)
        return res.redirect('/users/login')
        next()
}

function isLoggedToRedirectToUsers(req, res, next) {
    if(req,session.userId)
        return res.redirect('/users')
    
    
    next()
}

module.exports = {
    onlyUsers,
    isLoggedToRedirectToUsers

}