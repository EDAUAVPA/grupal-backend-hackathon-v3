const User = require('../models/user.model');
const Card = require('../models/card.model');
const { errorHandler } = require('../helpers/dbErrorHandler');

/**
 * Crea una tarjeta de crédito asociada a un usuario
 * @param {Object} req 
 * @param {Object} res 
 */
exports.createCard = async (req, res) => {

    req.body.owner = req.user._id;

    let card = new Card(req.body);

    await card.save((err, card) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }

        res.json(card);
    });
}

/**
 * Obtiene la información de la tarjeta de crédito asociada al usuario
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getCard = async (req, res) => {
    await Card.findOne({owner: req.user._id}, (err, card) => {
        if (err || !card) {
            return res.status(400).json({
                error: 'Card Not Found',
            });
        }

        res.json(card);
    })
}

/**
 * Obtiene la información del formulario y la actualiza la tarjeta de crédito mediante su ID
 * @param {Object} req 
 * @param {Object} res 
 */
exports.updateCard = async (req, res) => {
    let {cardId} = req.params;

    await Card.findOneAndUpdate(
        {_id: cardId}, 
        {$set: req.body}, 
        {new: true}, 
        (err, card) => {
        if (err || !card) {
            return res.status(400).json({
              error: "Card couldn't be updated",
            });
        }

        // Devuelve la tarjeta encontrada y editada
        res.json(card);
    })
}

/**
 * Añade créditos a la tarjeta de crédito
 * @param {Object} req 
 * @param {Object} res 
 */
exports.addCredits = async (req, res) => {
    let {cardId} = req.params;

    await Card.findOneAndUpdate(
        {_id: cardId}, 
        {$inc: {credits: parseInt(req.body.credits)}}, 
        {new: true}, 
        (err, card) => {

        if (err || !card) {
            return res.status(400).json({
              error: "Couldn't add credits to your card",
            });
        }

        // Devuelve la tarjeta encontrada y editada
        res.json(card);
    })
}

/**
 * Disminuye el número de créditos a la tarjeta de crédito
 * @param {Object} req 
 * @param {Object} res 
 */
exports.removeCredits = async (req, res) => {
    let {cardId} = req.params;

    let payment = parseInt(req.body.credits);

    // La tarjeta es encontrada en al BD
    await Card.findOne({_id: cardId}, async (err, card) => {
        if (err || !card) {
            return res.status(400).json({
              error: "Couldn't remove credits from your card",
            });
        }

        // Si se encuentra se procede a restar el nro. de créditos
        // Si la diferencia es positiva, se procede a hacer el pago
        if (card.credits - payment >= 0) {
            card.credits = card.credits - payment;

            await Card.findOneAndUpdate(
                {_id: card._id},
                {$set: {credits: card.credits}},
                {new: true}, (err, card) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Something went wrong",
                        });
                    }

                    res.json(card);
                })
        // De lo contrario el pago no procede y se envia este error
        } else {
            return res.status(400).json({
                error: "You don't have enough credits on your Card",
            });
        }
        
    })

}

/**
 * Se elimina la tarjeta de crédito del usuario
 * @param {Object} req 
 * @param {Object} res 
 */
exports.deleteCard = async (req, res) => {
    let {cardId} = req.params;

    // Encuentra y elimina la tarjeta por su ID
    await Card.findByIdAndDelete({_id: cardId}, async (err, card) => {
        if (err || !card) {
            return res.status(400).json({
                error: "Card couldn't be deleted",
            });
        }

        res.json({message: 'Credit Card succesfully deleted', card});
    });
}