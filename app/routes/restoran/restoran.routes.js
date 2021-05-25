const RestaurantDataController = require("../../controllers/restaurant/restaurantData.controller");
const RestaurantPhotosController = require("../../controllers/restaurant/restaurantPhoto.controller");
const authJwt = require("../../middleware/authJwt")

module.exports= app => {
    app.post("/api/restaurant/", [authJwt.verifyToken], RestaurantDataController.addRestaurantData);
    app.get("/api/restaurant/", [authJwt.verifyToken], RestaurantDataController.findAllRestaurant);
    app.get("/api/restaurant/name/:name_param", [authJwt.verifyToken], RestaurantDataController.findRestaurantByName);
    app.get("/api/restaurant/category/:category_id", [authJwt.verifyToken], RestaurantDataController.findRestaurantByCategory);
    app.get("/api/restaurant/id/:restaurantID", [authJwt.verifyToken], RestaurantDataController.findRestaurantByID);
    app.get("/api/restaurant/:category_id/:name", [authJwt.verifyToken], RestaurantDataController.findRestaurantByCategoryAndName);
    //photo
    app.post("/api/restaurant/photo", [authJwt.verifyToken], RestaurantPhotosController.addRestaurantPhoto);
}