module.exports=(sequelize, Sequelize)=>{
    const RestaurantPhotos = sequelize.define("restaurant_photos",{
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
    return RestaurantPhotos
}