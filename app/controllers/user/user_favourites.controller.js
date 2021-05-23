const db = require("../../models")
const UserFavourites = db.user_favourites
const RestaurantData = db.restaurant_data
const RestaurantType = db.restaurant_type;
const RestaurantPhotos = db.restaurant_photos;
const Review = db.review;
const Sequelize = db.Sequelize

async function getIsFavourite(restaurantID, userID) {
  const isFavResult = await UserFavourites.count({
      where: {
          userID: userID,
          restaurantID: restaurantID
      }
  })
  
  if (isFavResult > 0) return true;
  else return false;
}

async function getAverage(restaurantID) {
  const data = await Review.findAll({
      where: { restaurantID: restaurantID },
      attributes: [[Sequelize.fn('avg', Sequelize.col('score')),'rating']]
  })
  const rating_stringified = JSON.stringify(data)
  const rating_parsed = JSON.parse(rating_stringified)
  let rating = parseFloat(rating_parsed[0].rating)
  return parseFloat(rating_parsed[0].rating)
}

async function formatJSON(data, userID) {
  for (let singleData of data) {
      let new_photos_arr = [];
      let new_category_arr = [];
      for (let tmpPhotos of singleData.restaurant_photos) new_photos_arr.push(tmpPhotos.link);
      for (let tmpCats of singleData.restaurant_types) new_category_arr.push(tmpCats.restaurant_categoryID);
      singleData.restaurant_photos = new_photos_arr;
      singleData.restaurant_types = new_category_arr;
      singleData.rating = await getAverage(singleData.restaurantID)
      singleData.isFavourite = await getIsFavourite(singleData.restaurantID, userID)
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
    .then(async(dataRes) =>{
        console.log('itu')
        const stringed = JSON.stringify(dataRes);
        const jsonData = JSON.parse(stringed);
        console.log(jsonData);
        const new_formatted = await formatJSON(jsonData, req.userID)
        
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

exports.getIsUserFav = (req,res) => {
  UserFavourites.count({
    where: {
      userID: req.userID,
      restaurantID: req.params.restaurantID
    }
  })
  .then(count_res => {
    if (count_res > 0) return res.status(200).send({ isFavourite: true })
    else return res.status(200).send({ isFavourite: false })
  })
  .catch(err => {
    res.status(500).send({ message: "An error occured while fetching status of favourite restaurant."})
  })
}