const bcrypt = require('bcrypt');
const { userModel } = require('../models/userModel');

const regForm = (req, resp) => {
    resp.render("register", { error: null });
}

const register = async (req, resp) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return resp.render("register", { error: "All fields are required." });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return resp.render("register", { error: "Please enter a valid email address." });
        }

        const existing = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return resp.render("register", { error: "Username or email already in use." });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        await userModel.create({ username, email, password: hashpassword });
        resp.redirect("/login");
    } catch (error) {
        console.log(error);
        resp.render("register", { error: "Something went wrong. Please try again." });
    }
}

const logForm = (req, resp) => {
    resp.render("login", { error: null });
}

const login = async (req, resp) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return resp.render("login", { error: "Email and password are required." });
        }

        const user = await userModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.username = user.username;
            req.session.userId = user._id;
            resp.redirect("/dashboard");
        } else {
            resp.render("login", { error: "Invalid email or password." });
        }
    } catch (error) {
        console.log(error);
        resp.render("login", { error: "Something went wrong. Please try again." });
    }
};

const dashboard = (req, resp) => {
    resp.render("dashboard", { username: req.session.username });
}

const logout = (req, resp) => {
    req.session.destroy(() => {
        resp.redirect("/login");
    });
}

module.exports = { regForm, register, logForm, login, dashboard, logout };