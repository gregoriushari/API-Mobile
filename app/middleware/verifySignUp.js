const db = require("../models")
const User = db.user

checkEmail = (req, res, next)=>{
        //check email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user=>{
            if(user){
                res.status(400).send({
                    message: "Failed! Username is already in use!"
                })
                return
            }
            next()
        })
}

const verifySignUp = {
    checkEmail: checkEmail
}

module.exports = verifySignUp