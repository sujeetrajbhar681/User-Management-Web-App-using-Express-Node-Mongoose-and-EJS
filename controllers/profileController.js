const { profileModel } = require('../models/profileModel');

const listProfiles = async (req, resp) => {
    try {
        const profiles = await profileModel.find();
        resp.render("profiles", { profiles, username: req.session.username });
    } catch (error) {
        console.log(error);
        resp.redirect("/dashboard");
    }
};

const createForm = (req, resp) => {
    resp.render("create-profile", { username: req.session.username, error: null });
};

const createProfile = async (req, resp) => {
    try {
        const { name, email, age } = req.body;
        if (!name || !email || !age) {
            return resp.render("create-profile", { username: req.session.username, error: "All fields are required." });
        }
        await profileModel.create({ name, email, age });
        resp.redirect("/profiles");
    } catch (error) {
        console.log(error);
        resp.render("create-profile", { username: req.session.username, error: "Something went wrong." });
    }
};

const editForm = async (req, resp) => {
    try {
        const profile = await profileModel.findById(req.params.id);
        if (!profile) return resp.redirect("/profiles");
        resp.render("edit-profile", { profile, username: req.session.username, error: null });
    } catch (error) {
        console.log(error);
        resp.redirect("/profiles");
    }
};

const updateProfile = async (req, resp) => {
    try {
        const { name, email, age } = req.body;
        await profileModel.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true });
        resp.redirect("/profiles");
    } catch (error) {
        console.log(error);
        resp.redirect("/profiles");
    }
};

const deleteProfile = async (req, resp) => {
    try {
        await profileModel.findByIdAndDelete(req.params.id);
        resp.redirect("/profiles");
    } catch (error) {
        console.log(error);
        resp.redirect("/profiles");
    }
};

module.exports = { listProfiles, createForm, createProfile, editForm, updateProfile, deleteProfile };