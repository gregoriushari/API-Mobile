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

//user
db.user = require("../models/users/user.model")(sequelize, Sequelize)

//reviews
db.review = require("../models/users/reviews.model")(sequelize,Sequelize)
db.user.hasMany(db.review, {foreignKey :'userID'})
db.review.belongsTo(db.user, {foreignKey: 'userID'})

//review photos
db.review_photos = require("../models/users/review_photos.model")(sequelize,Sequelize)
db.review.hasMany(db.review_photos,{foreignKey:'reviewID'})
db.review_photos.belongsTo(db.review,{foreignKey:'reviewID'})

//restaurant data
db.restaurant_data = require("../models/restaurant/restaurant_data.model")(sequelize, Sequelize)
db.restaurant_data.hasMany(db.review, {foreignKey:'restaurantID'})
db.review.belongsTo(db.restaurant_data, {foreignKey:'restaurantID'})

//restaurant photos
db.restaurant_photos = require("../models/restaurant/restaurant_photos.model")(sequelize,Sequelize)
db.restaurant_data.hasMany(db.restaurant_photos,{foreignKey: 'restaurantID'})
db.restaurant_photos.belongsTo(db.restaurant_data,{foreignKey: 'restaurantID'})

//restaurant category
db.restaurant_category = require("../models/restaurant/restaurant_category.model")(sequelize, Sequelize)

//restaurant type
db.restaurant_type = require("../models/restaurant/restaurant_type.model")(sequelize, Sequelize)
db.restaurant_data.hasMany(db.restaurant_type,{foreignKey: 'restaurantID'})
db.restaurant_category.hasMany(db.restaurant_type, {foreignKey: 'restaurant_categoryID'})
db.restaurant_type.belongsTo(db.restaurant_data,{foreignKey: 'restaurantID'})
db.restaurant_type.belongsTo(db.restaurant_category, {foreignKey: 'restaurant_categoryID'})

module.exports = db
