module.exports =(sequelize, Sequelize)=>{
    const RestaurantData = sequelize.define("restaurant_data",{
        restaurantID:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        avg_price: {
            type: Sequelize.INTEGER
        }
    })
    return RestaurantData
}