module.exports =(sequelize, Sequelize)=>{
  const UserFavourites = sequelize.define("user_favourites",{
      userID:{
          type:Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      restaurantID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
      }
  })
  return UserFavourites
}