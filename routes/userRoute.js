const express = require('express');
const { logForm, login, regForm, register, dashboard, logout } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

const userRouter = express.Router();

userRouter.get("/", (req, resp) => resp.redirect("/login"));

userRouter.get("/register", regForm);
userRouter.post("/register", register);

userRouter.get("/login", logForm);
userRouter.post("/login", login);

userRouter.get("/dashboard", isAuthenticated, dashboard);
userRouter.get("/logout", logout);

module.exports = userRouter;