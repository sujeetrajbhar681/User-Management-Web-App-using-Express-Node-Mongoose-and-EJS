const isAuthenticated = (req, resp, next) => {
    if (req.session && req.session.username) {
        return next();
    }
    resp.redirect("/login");
}

module.exports = { isAuthenticated };