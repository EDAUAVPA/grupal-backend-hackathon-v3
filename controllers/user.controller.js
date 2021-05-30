require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Repository = require('../models/repository.model');
const { errorHandler } = require('../helpers/dbErrorHandler');



/**
 * Inicia sesión en base al correo y contraseña del usuario y devuelve un token
 * @param {Object} req 
 * @param {Object} res 
 */
exports.loginUser = async (req, res) => {
    try {
        let {email, password} = jwt.decode(req.body.token, process.env.JWT_SECRET);
        
        await User.findOne({email}, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                  error: 'Invalid Email',
                });
            }
    
            if(bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({_id: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET);
                res.json({token});
    
            } else {
                return res.status(400).json({
                    error: 'Invalid Password',
                  });
            }
            
        });

    } catch (err) {
        return res.status(400).json({
            error: 'Something went wrong || Invalid data'
        });
    }
    
}

/**
 * Recibe información de un usuario y lo registra en la base de datos
 * @param {Object} req 
 * @param {Object} res 
 */
exports.createUser = async (req, res) => {
    let user = new User(req.profile);

    await user.save((err, user) => {
        if (err) {
            return res.status(400).json({
            error: errorHandler(err),
            });
        }

        // Se oculta la contraseña
        user.password = undefined;

        //generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET);

        res.json({token, user});
    });
}

/**
 * Obtiene al usuario de la base de datos a partir de su ID
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getOneUser = async (req, res) => {
    let {userId} = req.params;

    await User.findById(userId, '-password').exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
              error: 'User not found',
            });
        }

        res.json(user);
    })
    
}

/**
 * Devuelve una lista completa de todos los usuarios
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getAllUsers = async (req, res) => {

    await User.find({}, '-password').exec((err, users) => {
        if (err) {
            return res.status(400).json({
              error: 'Something went wrong',
            });
        }

        if (users.length == 0) {
            res.json({message: 'No users were found here'})
        } else {
            res.json(users);
        }
    });
}

/**
 * Obtiene la información del formulario y la actualiza al encontrar al usuario mediante su ID
 * @param {Object} req 
 * @param {Object} res 
 */
exports.updateUser = async (req, res) => {
    // Encuentra el usuario con el ID proporcionado y lo actualiza
    await User.findOneAndUpdate(
        {_id: req.user._id}, 
        {$set: req.profile}, 
        {new: true, select: '-password'}, 
        (err, user) => {
        if (err || !user) {
            return res.status(400).json({
              error: "User couldn't be updated",
            });
        }

        // Devuelve el usuario encontrado y editado
        res.json(user);
    })
    
}

/**
 * Encuentra a un usuario en base a su ID y lo elimina de la base de datos,
 * junto a los repasitorios asociados al mismo
 * @param {Object} req 
 * @param {Object} res 
 */
exports.deleteUser = async (req, res) => {
    // Encuentra al usuario por id y lo elimina, al mismo tiempo que lo da como respuesta
    await User.findByIdAndDelete({_id: req.user._id}, async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
              error: "User couldn't be deleted",
            });
        }

        // Con el id del usuario, se buscan todos los repositorios que tengan el mismo
        // ID de autor y se eliminan
        await Repository.deleteMany({ author: user._id }, (err, repos) => {
            if (err) {
                return res.status(400).json({
                    error: "Repositories couldn't be deleted",
                });
            }

            console.log(repos);

             // Devuelve una contraseña vacia
            user.password = undefined;

            // limpia la cookie
            res.clearCookie("github_token");

            // devuelve el usuario que ha sido eliminado
            res.json({message: `User and ${repos.deletedCount} Repositories succesfully deleted`, user});
        })

       
    })
    
}
