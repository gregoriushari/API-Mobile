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
db.review.belongsTo(db.user, {foreignKey: 'userId'})

db.photo_review = require("../models/fotoreview.model")(sequelize,Sequelize)
//2
db.review.hasMany(db.photo_review,{foreignKey:'reviewId'})
db.photo_review.belongsTo(db.review,{foreignKey:'reviewId'})

db.restoran = require("../models/restaurant.model")(sequelize, Sequelize)
//3
db.restoran.hasMany(db.review, {foreignKey:'restoranId'})
db.review.belongsTo(db.restoran, {foreignKey:'restoranId'})

db.photo_restoran = require("../models/fotoresto.model")(sequelize,Sequelize)
//4
db.restoran.hasMany(db.photo_restoran,{foreignKey: 'restoranId'})
db.photo_restoran.belongsTo(db.restoran,{foreignKey: 'restoranId'})

db.restaurant_type = require("../models/restaurant_type.model")(sequelize, Sequelize)
//5
db.restaurant_type.hasMany(db.restoran,{foreignKey:'res_typeID'})
db.restoran.belongsTo(db.restaurant_type,{foreignKey:'res_typeID'})

module.exports = db
