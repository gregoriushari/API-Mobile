const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

let corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//upload gambar
app.use(fileUpload());

const db = require("./app/models");

function initRestoType() {
  const RestaurantCategory = db.restaurant_category;
  RestaurantCategory.bulkCreate(
    [
      { restaurant_categoryID: 1, name: "Noodles"},
      { restaurant_categoryID: 2, name: "Pizza"},
      { restaurant_categoryID: 3, name: "Kebab"},
      { restaurant_categoryID: 4, name: "Meat"},
      { restaurant_categoryID: 5, name: "Street Food"},
      { restaurant_categoryID: 6, name: "Vegan"},
      { restaurant_categoryID: 7, name: "Fast Food"},
      { restaurant_categoryID: 8, name: "Japanese"},
    ]
  )
}

db.sequelize.sync();
//db.sequelize.sync({force: true}).then(() => {
//  console.log('Drop and Resync Db');
//  initRestoType();
//});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MOBILE RESTAURANT API, MADE WITH LOVE." });
});

require('./app/routes/auth.routes')(app)
//restoran
require('./app/routes/restoran/restoran.routes')(app)


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
