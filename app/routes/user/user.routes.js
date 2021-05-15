const UserController = require("../../controllers/user/user.controller");
const authJwt = require("../../middleware/authJwt");

module.exports = app => {
  app.post("/api/user/profile_picture", [authJwt.verifyToken], UserController.addProfilePicture);
}