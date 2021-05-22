const FavouriteController = require("../../controllers/user/user_favourites.controller")
const authJwt = require("../../middleware/authJwt")

module.exports= app => {
    app.post("/api/user/favourites/add", [authJwt.verifyToken], FavouriteController.addFavorites)
    app.post("/api/user/favourites/delete", [authJwt.verifyToken], FavouriteController.removeFavorites)
    app.get("/api/user/favourites", [authJwt.verifyToken], FavouriteController.getFavouriteRestaurant)
}