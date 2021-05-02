module.exports=(sequelize,Sequelize)=>{
    const Review = sequelize.define("review",{
        reviewId:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        restoranId:{
            type:Sequelize.INTEGER,
            primaryKey: true
        },
        userId:{
            type:Sequelize.INTEGER,
            primaryKey: true
        },
        review: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.INTEGER
        },
        media_link: {
            type: Sequelize.STRING
        },
    })
    return Review
}