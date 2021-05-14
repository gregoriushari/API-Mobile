module.exports=(sequelize, Sequelize)=>{
    const ReviewPhoto = sequelize.define("review_photos",{
        review_photoID:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reviewID:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        link: {
            type: Sequelize.STRING
        }
    })
    return ReviewPhoto
}