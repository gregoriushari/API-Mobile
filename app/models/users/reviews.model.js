module.exports=(sequelize,Sequelize)=>{
    const Review = sequelize.define("review",{
        reviewID:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        restoranID:{
            type:Sequelize.INTEGER,
            primaryKey: true
        },
        userID:{
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