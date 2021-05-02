module.exports=(sequelize, Sequelize)=>{
    const Review_Photo = sequelize.define("review_foto",{
        review_photoId:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reviewId:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        link: {
            type: Sequelize.STRING
        }
    })
    return Review_Photo
}