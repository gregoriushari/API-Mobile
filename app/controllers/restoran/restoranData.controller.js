const db = require("../../models");
const Restoran = db.restoran;
const Photo_Restoran = db.photo_restoran;
const Op = db.Sequelize.Op;

exports.createRestaurant = (req, res)=>{
    const { name, res_type, address, location, phone_number, avg_price } = req.body;
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
        res_type: res_type,
        address: address,
        location : location,
        phone_number: phone_number,
        avg_price: avg_price 
    };

    Restoran.create(restoran)
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

exports.updateRestaurant = (req,res) => {
    const { restoranId, name, res_type, address, location, phone_number, avg_price } = req.body;
    
    const restoran = {
        name : name,
        res_type: res_type,
        address: address,
        location : location,
        phone_number: phone_number,
        avg_price: avg_price 
    };

    Restoran.update(restoran, { where: { restoranId: restoranId } })
        .then(data => {
            res.status(200).send({ message: "Berhasil Update!" });
        })
        .catch(err => {
            res.status(500).send({ message: "Terjadi kesalahan saat mengupdate data restoran." })
        })
}

exports.findAllRestaurant = (req,res)=>{
    const name = req.query.name;
    let condition = name ? {name : {[Op.like]: `%${name}%`}} : null;

    Restoran.findAll({where : condition, include: [{ model: Photo_Restoran, attributes: ['link'] }]})
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

exports.findRestaurant = (req,res)=>{
    const name = req.params.name;
    Restoran.findOne({ where: { name: name  } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving Restoran with name=" + name
        });
    });
};