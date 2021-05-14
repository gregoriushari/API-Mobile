module.exports =(sequelize, Sequelize)=>{
    const Resto = sequelize.define("restoran",{
        restoranId:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        res_typeID: {
            type: Sequelize.INTEGER
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
    return Resto
}