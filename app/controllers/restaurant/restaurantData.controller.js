const db = require("../../models");
const Sequelize = db.Sequelize
const RestaurantData = db.restaurant_data;
const RestaurantType = db.restaurant_type;
const RestaurantPhotos = db.restaurant_photos;
const Review = db.review
const UserFavourites = db.user_favourites
const Op = db.Sequelize.Op;

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

exports.addRestaurantData = (req, res)=>{
    const { name, res_type, address, latitude, longitude, phone_number, avg_price } = req.body;
    //validate request
    if(!name || !res_type || !address || !latitude || !longitude || !phone_number || !avg_price){
        res.status(400).send({
            message:"Content can't be empty"
        });
        return;
    }

    //create a restoran
    const restoran = {
        name : name,
        res_type: res_type,
        address: address,
        latitude: latitude,
        longitude: longitude,
        phone_number: phone_number,
        avg_price: avg_price 
    };

    RestaurantData.create(restoran)
        .then(data =>{
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Restoran."
            })
        })
};

exports.updateRestaurantData = (req,res) => {
    const { restaurantID, name, res_type, address, latitude, longitude, phone_number, avg_price } = req.body;
    
    const restoran = {
        name : name,
        res_type: res_type,
        address: address,
        latitude: latitude,
        longitude: longitude,
        phone_number: phone_number,
        avg_price: avg_price 
    };

    RestaurantData.update(restoran, { where: { restaurantID: restaurantID } })
        .then(data => {
            res.status(200).send({ message: "Update Successful!" });
        })
        .catch(err => {
            res.status(500).send({ message: "An error occured while updating restaurant data." })
        })
}

exports.addRestaurantCategory = (req,res) => {
    const { restaurantID, categoryID } = req.body;
    
    RestaurantType.create({
        restaurantID: restaurantID,
        categoryID: categoryID
    })
    .then(data => {
        res.status(200).send({ message: "Input Successful!" });
    })
    .catch(err => {
        res.status(500).send({ message: "An error occured while entering restaurant category." })
    })
}

exports.findAllRestaurant = (req,res)=>{
    RestaurantData.findAll({include: [{ model: RestaurantPhotos, attributes: ['link'] }, { model: RestaurantType, attributes: ['restaurant_categoryID']}] })
    .then(async(data) =>{
        const stringed = JSON.stringify(data);
        const jsonData = JSON.parse(stringed);
        const new_formatted = await formatJSON(jsonData, req.userID)
        
        return res.status(200).send(new_formatted);
    })
    .catch(err => {
        res.status(500).send({
            message: "An error occured while finding restaurant"
        })
    });
};

exports.findRestaurantByName = (req,res)=>{
    const name = req.params.name_param;
    let condition = name ? {name : {[Op.like]: `%${name}%`}} : null;

    RestaurantData.findAll({where : condition, include: [{ model: RestaurantPhotos, attributes: ['link'] }, { model: RestaurantType, attributes: ['restaurant_categoryID']}] })
    .then(async(data) =>{
        const stringed = JSON.stringify(data);
        const jsonData = JSON.parse(stringed);
        const new_formatted = await formatJSON(jsonData, req.userID)
        
        return res.status(200).send(new_formatted);
    })
    .catch(err => {
        res.status(500).send({
            message: "An error occured while finding restaurant by name"
        })
    });
};

exports.findRestaurantByCategory = async(req,res)=>{
    const category_id = req.params.category_id;

    const QueryOne = 
        await RestaurantType.findAll({ where: { restaurant_categoryID: category_id }})
    
    let RestaurantIDs = [];
    
    for (let temp of QueryOne) RestaurantIDs.push(temp.restaurantID);

    RestaurantData.findAll({where : { restaurantID: RestaurantIDs }, include: [{ model: RestaurantPhotos, attributes: ['link'] }, { model: RestaurantType, attributes: ['restaurant_categoryID']}] })
    .then(async(data) =>{
        const stringed = JSON.stringify(data);
        const jsonData = JSON.parse(stringed);
        const new_formatted = await formatJSON(jsonData, req.userID)
        console.log('lewat sini')
        return res.status(200).send(new_formatted);
    })
    .catch(err => {
        res.status(500).send({
            message: "An error occured while finding restaurant by category"
        })
    });
};

exports.findRestaurantByID = (req,res)=>{
    const restaurantID = req.params.restaurantID;

    RestaurantData.findAll({where : { restaurantID: restaurantID }, include: [{ model: RestaurantPhotos, attributes: ['link'] }, { model: RestaurantType, attributes: ['restaurant_categoryID']}] })
    .then(async(data) =>{
        const stringed = JSON.stringify(data);
        const jsonData = JSON.parse(stringed);
        const new_formatted = await formatJSON(jsonData, req.userID)
        
        return res.status(200).send(new_formatted);
    })
    .catch(err => {
        res.status(500).send({
            message: "An error occured while finding restaurant by ID"
        })
    });
};