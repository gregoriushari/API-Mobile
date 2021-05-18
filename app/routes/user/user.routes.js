const UserController = require("../../controllers/user/user.controller");
const authJwt = require("../../middleware/authJwt");

module.exports = app => {
  app.post("/api/user/profile_picture", [authJwt.verifyToken], UserController.addProfilePicture);
  app.get("/api/user/info", [authJwt.verifyToken], UserController.getUserInfo)
  app.post("/api/user/info", [authJwt.verifyToken], UserController.updateUserInfo)
}