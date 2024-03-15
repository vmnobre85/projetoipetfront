const Comentario = require("../models/Comentario");
const fs = require("fs");

exports.criar = async (req, res) => {
  const cmm = buildComentario(req, res, true);

  if (cmm.erros) return res.status(400).json(cmm.erros);

  const comentario = new Comentario({
    nome: cmm.nome,
    comentario: cmm.comentario,
  });

  await comentario.save();
  return res.send(comentario);
};

exports.listar = async (req, res) => {
  const comentarios = await Comentario.find();
  return res.send(comentarios);
};

function buildComentario(req, res, reg) {
  const { nome, comentario } = req.body;
  var erros = [];

  if (nome == "" || nome == undefined)
    erros.push({ campo: "Nome", erro: "O campo 'Nome' é obrigatório" });

  if (comentario == "" || comentario == undefined)
    erros.push({
      campo: "Comentário",
      erro: "O campo 'Comentário' é obrigatório",
    });

  if (erros.length > 0) return { erros: erros };

  const infos = {
    nome: nome,
    comentario: comentario,
  };

  return infos;
}
