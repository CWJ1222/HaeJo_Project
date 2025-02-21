const express = require("express");
const router = express.Router();
const userController = require("../controller/Cuser");
const mainController = require("../controller/Cmain");
const requestController = require("../controller/Crequest");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/session", userController.checkSession);

router.get("/", mainController.getIndex);
router.get("/user", mainController.getUser);
router.put("/update-profile", userController.updateProfile);

router.post("/request", requestController.createRequest);

module.exports = router;
