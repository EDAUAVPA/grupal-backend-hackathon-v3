const User = require('../models/user.model');
const Card = require('../models/card.model');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.createCard = async (req, res) => {

    req.body.owner = req.user._id;

    req.body.number = req.body.number.replace(/\s/g, "");

    let card = new Card(req.body);

    console.log(req.body);

    await card.save((err, card) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }

        res.json(card);
    });
}

exports.getCard = (req, res) => {

}

exports.updateCard = (req, res) => {

}

exports.addCredits = (req, res) => {

}

exports.removeCredits = (req, res) => {

}

exports.deleteCard = (req, res) => {

}