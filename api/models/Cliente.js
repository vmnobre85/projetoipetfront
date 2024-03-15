const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  nome: { type: String, require: true },
  nomePet: { type: String, require: true },
  cpf: { type: String, require: true },
  endereco: { type: String, require: true },
  racaPet: { type: String, require: true },
  bairro: { type: String, require: true },
  telefone: { type: String, require: true },
  email: { type: String, require: true },
  nascimento: { type: Date, require: true },
  src: { type: String, require: true },
});

module.exports = mongoose.model("Cliente", ClienteSchema);
