module.exports =(sequelize, Sequelize)=>{
    const RestaurantType = sequelize.define("restaurant_type",{
        restaurantID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        restaurant_categoryID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        }
    })
    return RestaurantType
}