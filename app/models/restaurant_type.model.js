module.exports =(sequelize, Sequelize)=>{
    const Resto_Type = sequelize.define("restoran_type",{
        res_typeID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        }
    })
    return Resto_Type
}