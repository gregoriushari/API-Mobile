const db = require("../models")
const Restoran = db.restoran
const Op = db.Sequelize.Op;

exports.create = (req, res)=>{
    //validate request
    if(!req.body.name){
        res.status(400).send({
            message:"Content can't be empty"
        });
        return;
    }else if(!req.body.address){
        res.status(400).send({
            message:"Content can't be empty"
        });
        return;
    }

    //create a restoran
    const restoran = {
        name : req.body.name,
        res_type: req.body.res_type,
        location : req.body.location,
        avg_price: req.body.avg_price 
    };

    Restoran.create(restoran)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Restoran."
            })
        })
};

exports.findAll = (req,res)=>{
    const name = req.query.name;
    let condition = name ? {name : {[Op.like]: `%${name}%`}} : null;

    Restoran.findAll({where : condition})
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

exports.findOne=(req,res)=>{
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