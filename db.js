const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect("mongodb://localhost/userManagementDB")
        .then(() => {
            console.log("Connected..");
        }).catch((err) => {
            console.log(err);
        });
}

module.exports = { connectDB };