const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema(
    {
        author: {
            type: ObjectId, 
            required: true
        },
        name: {
            type: String
        },
        url: {
            type: String
        },
        description: {
            type: String
        },
        stack: []
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Card", cardSchema);