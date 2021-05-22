const db = require("../../models")
const UserFavourites = db.user_favourites
const RestaurantData = db.restaurant_data
const RestaurantType = db.restaurant_type;
const RestaurantPhotos = db.restaurant_photos;

function formatJSON(data) {
  for (let singleData of data) {
      let new_photos_arr = [];
      let new_category_arr = [];
      for (let tmpPhotos of singleData.restaurant_photos) new_photos_arr.push(tmpPhotos.link);
      for (let tmpCats of singleData.restaurant_types) new_category_arr.push(tmpCats.restaurant_categoryID);
      singleData.restaurant_photos = new_photos_arr;
      singleData.restaurant_types = new_category_arr;
  } 
  return data
}

exports.addFavorites = (req,res) => {
  const { restaurantID } = req.body

  UserFavourites.create({
    userID: req.userID,
    restaurantID: restaurantID
  })
  .then(() => {
    res.status(200).send({ message: "New favourite restaurant has been added!"})
  })
  .catch((err) => {
    res.status(500).send({ message: "An error occured while adding new favourite restaurant."})
  })
}

exports.removeFavorites = (req,res) => {
  const { restaurantID } = req.body

  UserFavourites.destroy(
    {
      where: { 
        userID: req.userID,
        restaurantID: restaurantID
      }
    }
  )
  .then(() => {
    res.status(200).send({ message: "A favourite restaurant has been removed!"})
  })
  .catch((err) => {
    res.status(500).send({ message: "An error occured while removing favourite restaurant."})
  })
}

exports.getFavouriteRestaurant = (req,res) => {
  UserFavourites.findAll({
    where: { userID: req.userID }
  })
  .then((data) => {
    let RestaurantIDs = [];
    
    for (let temp of data) RestaurantIDs.push(temp.restaurantID);
    console.log('ini')
    RestaurantData.findAll({where : { restaurantID: RestaurantIDs }, include: [{ model: RestaurantPhotos, attributes: ['link'] }, { model: RestaurantType, attributes: ['restaurant_categoryID']}] })
    .then(dataRes =>{
        console.log('itu')
        const stringed = JSON.stringify(dataRes);
        const jsonData = JSON.parse(stringed);
        console.log(jsonData);
        const new_formatted = formatJSON(jsonData)
        
        return res.status(200).send(new_formatted);
    })
    .catch(err => {
        res.status(500).send({
            message: "An error occured while finding restaurant by category"
        })
    });
  })
  .catch(err => {
    res.status(500).send({ message: "An error occured while fetching favourite restaurant."})
  })
}