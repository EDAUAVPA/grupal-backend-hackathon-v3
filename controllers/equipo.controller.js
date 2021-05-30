const Equipo = require('../models/equipo.model');
const User = require('../models/user.model');

/**
 * Crea un equipo en la base de datos 
 * @param {Object} req 
 * @param {Object} res 
 */
exports.createTeam = async (req, res) => {

  const { name, description, users } = JSON.parse(req.body);
  const newEquipo = {
    name: name,
    description: description,
    users: users,
  }

  // Se crea el objeto del Equipo siguiendo el model establecido
  let equipo = new Equipo(newEquipo);

  // Se guarda el objeto en la base de datos
  await equipo.save(async (err, equipo) => {
      if (err) {
          return res.status(400).json({
            error: 'Something went wrong',
          });
      }
      res.json(equipo)
  });
}
/**
 * Obtiene un equipo a partir de su ID
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getOneTeam = async (req, res) => {
  let {equipoId} = req.params;

  await Equipo.findById(equipoId).exec((err, equipo) => {
      if (err || !equipo) {
          return res.status(400).json({
            error: 'Repository Not Found',
          });
      }

      res.json(equipo);
  })
}
/**
 * Obtiene todos los equipos registrados en la base de datos
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getAllTeams = async (req, res) => {
  await Equipo.find().exec((err, equipos) => {
      if (err) {
          return res.status(400).json({
            error: 'Something went wrong',
          });
      }

      if (equipos.length == 0) {
          res.json({message: 'No teams were found'})
      } else {
          res.json(equipos);
      }
  })
}
/**
 * Encuentra el equipo por su ID y lo actualiza
 * @param {Object} req 
 * @param {Object} res 
 */
exports.updateTeam = async (req, res) => {
  let {equipoId} = req.params;

  await Equipo.findByIdAndUpdate({_id: equipoId}, {$set: req.body}, {new: true}, (err, equipo) => {
      if (err || !equipo) {
          return res.status(400).json({
            error: "Team couldn't be updated",
          });
      }

      res.json(equipo);
  });
}
/**
 * Encuentra un equipo por su Id y le agrega el usuario del payload
 * @param {Object} req 
 * @param {Object} res 
 */
exports.addMember = async (req,res) => {
  let {equipoId} = req.params
  let newUser = req.body
  let usersArray = await Equipo.findById(equipoId).users
  let newUsersArray = usersArray.push(newUser)
  await Equipo.findByIdAndUpdate({_id: equipoID}, {users: newUsersArray }, {new: true}, (err, equipo) => {
    if (err || !equipo) {
      return res.status(400).json({
          error: "Team couldn't be updated",
        });
      }
    res.json(equipo);
  });
}
/**
 * Encuentra un equipo por su Id y le quita el usuario del payload
 * @param {Object} req 
 * @param {Object} res 
 */
exports.removeMember = async (req, res) => {
  let {equipoId} = req.params
  let {userId} = req.body
  let usersArray = await Equipo.findById(equipoId).users
  if( ! usersArray.includes(userId) ) return res.status(400).json({
    error: "Team didn't contain that member",
  });
  let newUsersArray = usersArray.filter(user => user !== userId)
  await Equipo.findByIdAndUpdate({_id: equipoID}, {users: newUsersArray }, {new: true}, (err, equipo) => {
    if (err || !equipo) {
      return res.status(400).json({
          error: "Team couldn't be updated",
        });
      }
    res.json(equipo);
  });
}
/**
 * Elimina el Equipo de la base de datos
 * @param {Object} req 
 * @param {Object} res 
 */
exports.deleteTeam = async (req, res) => {
  let {equipoId} = req.params;

  // Encuentra y elimina el equipo por su ID
  await Equipo.findByIdAndDelete({_id: equipoId}, async (err, equipo) => {
    if (err || !equipo) {
      return res.status(400).json({
        error: "Team couldn't be deleted",
      });
    }
    res.json({message: 'Team succesfully deleted', equipo});
    });
}