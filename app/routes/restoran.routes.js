const restoran = require("../controllers/restoran.controller")


module.exports= app =>{

    app.post("/api/restoran/", restoran.create);
    app.get("/api/restoran/", restoran.findAll);
    app.get("/api/restoran/:name", restoran.findOne)
}