const express = require('express');
const { listProfiles, createForm, createProfile, editForm, updateProfile, deleteProfile } = require('../controllers/profileController');
const { isAuthenticated } = require('../middleware/auth');

const profileRouter = express.Router();

profileRouter.get("/profiles", isAuthenticated, listProfiles);
profileRouter.get("/profiles/create", isAuthenticated, createForm);
profileRouter.post("/profiles/create", isAuthenticated, createProfile);
profileRouter.get("/profiles/edit/:id", isAuthenticated, editForm);
profileRouter.post("/profiles/edit/:id", isAuthenticated, updateProfile);
profileRouter.post("/profiles/delete/:id", isAuthenticated, deleteProfile);

module.exports = profileRouter;