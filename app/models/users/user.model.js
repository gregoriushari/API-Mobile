module.exports =(sequelize, Sequelize)=>{
    const User = sequelize.define("users",{
        userID:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
        }
    })
    return User
}