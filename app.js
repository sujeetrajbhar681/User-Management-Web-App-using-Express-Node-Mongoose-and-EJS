const express = require('express');
const path = require('path');
const session = require('express-session');
const { connectDB } = require('./db');
const userRouter = require('./routes/userRoute');
const profileRouter = require('./routes/profileRoute');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: false
}));

app.use("/", userRouter);
app.use("/", profileRouter);

app.listen(4000, () => {
    console.log("Server is running..");
});