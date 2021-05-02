const config = require("../config/db.config")
const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    { 
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("../models/user.model")(sequelize, Sequelize)
db.review = require("../models/reviews.model")(sequelize,Sequelize)
//1
db.user.hasMany(db.review, {foreignKey :'userId'})
db.review.hasMany(db.user, {foreignKey: 'userId'})

db.photo_review = require("../models/fotoreview.model")(sequelize,Sequelize)
//2
db.review.hasMany(db.photo_review,{foreignKey:'reviewId'})
db.photo_review.hasMany(db.review,{foreignKey:'reviewId'})

db.restoran = require("../models/restaurant.model")(sequelize, Sequelize)
//3
db.restoran.hasMany(db.review, {foreignKey:'restoranId'})
db.review.hasMany(db.restoran, {foreignKey:'restoranId'})

db.photo_restoran = require("../models/fotoresto.model")(sequelize,Sequelize)
//4
db.restoran.hasMany(db.photo_restoran,{foreignKey: 'restoranId'})
db.photo_restoran.hasMany(db.review,{foreignKey: 'restoranId'})


module.exports = db
