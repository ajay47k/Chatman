const express = require("express");
const { protect } = require("../config/AUTH");
const {
  loginController,
  registerController, 
  logoutController,
  getUsersController
} = require("../controller/userController");
// Middleware to log each request to the console

const Router = express.Router();
Router.post("/login", loginController); 
Router.post("/register", registerController);
Router.post("/logout", logoutController);
Router.get("/getUsers", protect,getUsersController);

module.exports = Router; 