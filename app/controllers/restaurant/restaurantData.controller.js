const db = require("../../models");
const RestaurantData = db.restaurant_data;
const RestaurantType = db.restaurant_type;
const RestaurantPhotos = db.restaurant_photos;
const Op = db.Sequelize.Op;

exports.addRestaurantData = (req, res)=>{
    const { name, address, location, phone_number, avg_price } = req.body;
    //validate request
    if(!name || !res_type || !location || !avg_price){
        res.status(400).send({
            message:"Content can't be empty"
        });
        return;
    }

    //create a restoran
    const restoran = {
        name : name,
        address: address,
        location : location,
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
    const { restaurantID, name, res_type, address, location, phone_number, avg_price } = req.body;
    
    const restoran = {
        name : name,
        res_type: res_type,
        address: address,
        location : location,
        phone_number: phone_number,
        avg_price: avg_price 
    };

    RestaurantData.update(restoran, { where: { restaurantID: restaurantID } })
        .then(data => {
            res.status(200).send({ message: "Berhasil Update!" });
        })
        .catch(err => {
            res.status(500).send({ message: "Terjadi kesalahan saat mengupdate data restoran." })
        })
}

exports.addRestaurantCategory = (req,res) => {
    const { restaurantID, categoryID } = req.body;
    
    RestaurantType.create({
        restaurantID: restaurantID,
        categoryID: categoryID
    })
    .then(data => {
        res.status(200).send({ message: "Berhasil Input!" });
    })
    .catch(err => {
        res.status(500).send({ message: "Terjadi kesalahan saat memasukkan data kategori restoran." })
    })
}

exports.findAllRestaurant = (req,res)=>{
    RestaurantData.findAll({include: [{ model: RestaurantPhotos, attributes: ['link'] }, { model: RestaurantType, attributes: ['restaurant_categoryID']}] })
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "tidak ada"
        })
    });
};

exports.findRestaurantByName = (req,res)=>{
    const name = req.params.name_param;
    let condition = name ? {name : {[Op.like]: `%${name}%`}} : null;

    RestaurantData.findAll({where : condition, include: [{ model: RestaurantPhotos, attributes: ['link'] }, { model: RestaurantType, attributes: ['restaurant_categoryID']}] })
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "tidak ada"
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
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "tidak ada"
        })
    });
};