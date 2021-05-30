const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const User = require('./user.model')

const equipoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
  },
    users:[{type: ObjectId, ref: User}],
  },{
    timestamps: true,
  }
);

module.exports = mongoose.model("Equipo", equipoSchema);