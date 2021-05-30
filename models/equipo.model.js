const mongoose = require("mongoose");

const equipoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String
  },
    users:[]
  },{
    timestamps: true,
  }
);

module.exports = mongoose.model("Equipo", equipoSchema);