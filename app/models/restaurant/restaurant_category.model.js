module.exports =(sequelize, Sequelize)=>{
  const RestaurantCategory= sequelize.define("restaurant_category",{
      restaurant_categoryID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
      },
      name: {
          type: Sequelize.STRING
      }
  })
  return RestaurantCategory
}