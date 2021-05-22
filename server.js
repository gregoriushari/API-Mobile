require('dotenv').config()
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

  const User = db.user;
  User.create({
    name: "Test", email: "test@test.com", password: "$2a$08$qqaItXA5ps.2cuVxRluEKe28MVYksgMA4lqzPxzfANWQokJCapqs2"
  })

  const RestaurantData = db.restaurant_data;
  RestaurantData.create({
    name: "McDonalds", address: "SDC", latitude: "-6.25752", longitude: "106.61660", phone_number: "12345", avg_price: 30000
  })
    .then(() => {
      const RestaurantPhotos = db.restaurant_photos;
      RestaurantPhotos.bulkCreate(
        [
          { restaurantID: 1, link: "https://akcdn.detik.net.id/visual/2020/03/11/a74f8ad0-5ae6-43c0-932a-ef23c7e717c5_169.jpeg"},
          { restaurantID: 1, link: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/09/05/2316288780.jpeg"}
        ]
      )

      const RestaurantTypes = db.restaurant_type;
      RestaurantTypes.bulkCreate(
        [
          { restaurantID: 1, restaurant_categoryID: 4},
          { restaurantID: 1, restaurant_categoryID: 7}
        ]
      )
    })
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

require('./app/routes/user/auth.routes')(app)
//restoran
require('./app/routes/restoran/restoran.routes')(app)
//review
require('./app/routes/user/review.routes')(app)
//user
require('./app/routes/user/user.routes')(app)
//favourites
require('./app/routes/user/favourites.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
