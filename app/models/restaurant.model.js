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
        res_type: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        avg_price: {
            type: Sequelize.INTEGER
        }
    })
    return Resto
}