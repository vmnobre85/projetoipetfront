const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
  marca: { type: String, require: true },
  nome: { type: String, require: true },
  quantidade: { type: Number, require: true },
  validade: { type: Date, require: true },
  descricao: { type: String, require: true },
  tipo: { type: String, require: true },
  src: { type: String, require: true },
});

module.exports = mongoose.model("Produto", ProdutoSchema);
