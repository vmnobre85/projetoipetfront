const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ComentarioSchema = new Schema({
  nome: { type: String, require: true },
  comentario: { type: String, require: true },
});

module.exports = mongoose.model("Comentario", ComentarioSchema);
