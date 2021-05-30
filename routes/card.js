const express = require('express');
const router = express.Router();

const {
    createCard,
    getCard,
    updateCard,
    addCredits,
    removeCredits,
    deleteCard
} = require('../controllers/card.controller');

const { authToken } = require('../middleware/verifyToken');

// Ruta para crear tarjeta
router.post('/', authToken, createCard);

// Ruta para obtener tarjeta
router.get('/', authToken, getCard);

// Ruta para actualizar la tarjeta
router.put('/:cardId', authToken, updateCard);

// Ruta para agregar créditos a la tarjeta
router.put('/addCredits/:cardId', authToken, addCredits);

// Ruta para pagar alguna mejora (disminuir el número de creditos)
router.put('/pay/:cardId', authToken, removeCredits);

// Ruta para eliminar una tarjeta
router.delete('/:cardId', authToken, deleteCard);

module.exports = router;