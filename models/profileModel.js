const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
    },
    age: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const profileModel = mongoose.model("Profile", profileSchema);
module.exports = { profileModel };