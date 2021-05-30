require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.encrypt = (req, res, next) => {
    req.profile = jwt.decode(req.body.token, process.env.JWT_SECRET);

    if (req.profile) {
        if (req.profile.password) {
            // Se encripta la contraseña para ser almacenada en la base de datos
            const salt = bcrypt.genSaltSync(10);
            req.profile.password = bcrypt.hashSync(req.profile.password, salt);
        }    
    
        next();
    } else {
        return res.status(400).json({
            error: 'Something went wrong || Invalid data'
        });
    }

    
}