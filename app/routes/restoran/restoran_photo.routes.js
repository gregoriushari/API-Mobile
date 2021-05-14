const restoran = require("../../controllers/restoran/restoranPhoto.controller");


module.exports= app => {
    app.post("/api/restoran/photo", restoran.addRestaurantPhoto);
}