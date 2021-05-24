module.exports=(sequelize, Sequelize)=>{
    const RestaurantMenus = sequelize.define("restaurant_menus",{
        photoID:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        restaurantID:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        link: {
            type: Sequelize.STRING
        }
    })
    return RestaurantMenus
}