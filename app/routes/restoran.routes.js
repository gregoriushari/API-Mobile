const restoran = require("../controllers/restoran/restoranData.controller");


module.exports= app => {
    app.post("/api/restoran/", restoran.createRestaurant);
    app.get("/api/restoran/", restoran.findAllRestaurant);
    app.get("/api/restoran/:name", restoran.findRestaurant)
}