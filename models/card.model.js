const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema(
    {
        owner: {
            type: ObjectId, 
            required: true
        },
        name: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        exp_date: {
            type: Date,
            required: true
        },
        credits: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Card", cardSchema);