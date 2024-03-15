const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServicoSchema = new Schema({
  servico: { type: String, require: true },
  nome: { type: String, require: true },
  descricao: { type: String, require: true },
  sexo: { type: String, require: true },
  registro: { type: String, require: true },
  valor: { type: Number, require: true },
  promo: { type: Number, require: true },
  especialidade: { type: String, require: true },
  atendimento: {
    type: {
      domingo: {
        entrada1: { type: String, required: false },
        saida1: { type: String, required: false },
        entrada2: { type: String, required: false },
        saida2: { type: String, required: false },
      },
      segunda: {
        entrada1: { type: String, required: false },
        saida1: { type: String, required: false },
        entrada2: { type: String, required: false },
        saida2: { type: String, required: false },
      },
      terca: {
        entrada1: { type: String, required: false },
        saida1: { type: String, required: false },
        entrada2: { type: String, required: false },
        saida2: { type: String, required: false },
      },
      quarta: {
        entrada1: { type: String, required: false },
        saida1: { type: String, required: false },
        entrada2: { type: String, required: false },
        saida2: { type: String, required: false },
      },
      quinta: {
        entrada1: { type: String, required: false },
        saida1: { type: String, required: false },
        entrada2: { type: String, required: false },
        saida2: { type: String, required: false },
      },
      sexta: {
        entrada1: { type: String, required: false },
        saida1: { type: String, required: false },
        entrada2: { type: String, required: false },
        saida2: { type: String, required: false },
      },
      sabado: {
        entrada1: { type: String, required: false },
        saida1: { type: String, required: false },
        entrada2: { type: String, required: false },
        saida2: { type: String, required: false },
      },
    },
    require: true,
  },
  src: { type: String, require: true },
});

module.exports = mongoose.model("Servico", ServicoSchema);
