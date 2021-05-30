const express = require('express');
const router = express.Router();

const {
  createTeam,
  getOneTeam,
  getAllTeams,
  updateTeam,
  addMember,
  removeMember,
  deleteTeam,
} = require('../controllers/equipo.controller')

// Ruta para crear un equipo
router.post('/', createTeam);

// Ruta para obtener todos los equipos
router.get('/', getAllTeams);

// Ruta para obtener un equipo en base a su ID
router.get('/:equipoId', getOneTeam);

// Ruta para actualizar los datos del equipo
router.put('/:equipoId', updateTeam);

//Ruta para agregar un miembro al equipo
router.put('/addMember/:equipoId', addMember)

//Ruta para eliminar un miembro del equipo
router.put('/removeMember/:equipoId', removeMember)

// Ruta para eliminar a un equipo
router.delete('/', deleteTeam);

module.exports = router;