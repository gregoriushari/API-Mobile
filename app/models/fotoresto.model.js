module.exports=(sequelize, Sequelize)=>{
    const Resto_Photo = sequelize.define("restoran_foto",{
        photoId:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        restoranId:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        link: {
            type: Sequelize.STRING
        }
    })
    return Resto_Photo
}