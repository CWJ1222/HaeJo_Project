const express = require("express");
const router = express.Router();
const userController = require("../controller/Cuser");
const mainController = require("../controller/Cmain");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/session", userController.checkSession);

router.get("/", mainController.getIndex);
router.get("/user", mainController.getUser);

module.exports = router;
