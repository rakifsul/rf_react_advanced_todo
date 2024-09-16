const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.put("/logout", authController.logout);

router.post("/token", authController.token);

module.exports = router;
