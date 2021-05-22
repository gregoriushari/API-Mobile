const RestaurantDataController = require("../../controllers/restaurant/restaurantData.controller");
const RestaurantPhotosController = require("../../controllers/restaurant/restaurantPhoto.controller");

module.exports= app => {
    app.post("/api/restaurant/", RestaurantDataController.addRestaurantData);
    app.get("/api/restaurant/", RestaurantDataController.findAllRestaurant);
    app.get("/api/restaurant/name/:name_param", RestaurantDataController.findRestaurantByName);
    app.get("/api/restaurant/category/:category_id", RestaurantDataController.findRestaurantByCategory);
    //photo
    app.post("/api/restaurant/photo", RestaurantPhotosController.addRestaurantPhoto);
    //test
    //app.post("/api/restaurant/review", RestaurantDataController.testAverage)
}