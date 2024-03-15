const Servico = require("../models/Servico");
const fs = require("fs");

exports.criar = async (req, res) => {
  const srv = buildServico(req, res, true);

  if (srv.erros) return res.status(400).json(srv.erros);

  const servico = new Servico({
    servico: srv.servico,
    nome: srv.nome,
    descricao: srv.descricao,
    sexo: srv.sexo,
    registro: srv.registro,
    valor: srv.valor,
    promo: srv.promo,
    especialidade: srv.especialidade,
    atendimento: srv.atendimento,
    src: srv.src,
  });

  await servico.save();
  return res.send(servico);
};

exports.listar = async (req, res) => {
  const servicos = await Servico.find();
  return res.send(servicos);
};

exports.detalhar = async (req, res) => {
  const servico = await Servico.findById(req.params.id);
  return res.send(servico);
};

exports.editar = async (req, res) => {
  const srv = buildServico(req, res, false);

  if (srv.erros) return res.status(400).json(srv.erros);

  Servico.findByIdAndUpdate(
    req.params.id,
    {
      servico: srv.servico,
      nome: srv.nome,
      descricao: srv.descricao,
      sexo: srv.sexo,
      registro: srv.registro,
      valor: srv.valor,
      promo: srv.promo,
      especialidade: srv.especialidade,
      atendimento: srv.atendimento,
      src: srv.src,
    },
    { new: true }
  )
    .then((servico) => {
      return res.send(servico);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ error: `Erro ao atualizar o serviço: ${error}` });
    });
};

exports.deletar = async (req, res) => {
  const servico = await Servico.findById(req.params.id);
  if (!servico)
    return res.status(404).json({ message: "Serviço não encontrado" });

  if (servico.src) fs.unlinkSync(servico.src);
  await Servico.deleteOne({ _id: req.params.id });

  return res.send(servico);
};

function buildServico(req, res, reg) {
  const data = reg ? JSON.parse(req.body.dados) : req.body;
  const file = req.file;
  const {
    servico,
    nome,
    descricao,
    sexo,
    registro,
    valor,
    promo,
    especialidade,
    atendimento,
  } = JSON.parse(req.body.dados);
  var erros = [];

  if (servico == "" || servico == undefined)
    erros.push({ campo: "Serviço", erro: "O campo 'Serviço' é obrigatório" });

  if (nome == "" || nome == undefined)
    erros.push({ campo: "Nome", erro: "O campo 'Nome' é obrigatório" });

  if (descricao == "" || descricao == undefined)
    erros.push({
      campo: "Descrição",
      erro: "O campo 'Descrição' é obrigatório",
    });

  if (sexo == "" || sexo == undefined)
    erros.push({ campo: "Sexo", erro: "O campo 'Sexo' é obrigatório" });

  if (sexo != "M" && sexo != "F")
    erros.push({
      campo: "Sexo",
      erro: "O campo 'Sexo' deve ser Masculino (M) ou Feminino (F)",
    });

  if (registro == "" || registro == undefined)
    erros.push({ campo: "Registro", erro: "O campo 'Registro' é obrigatório" });

  if (valor == "" || valor == undefined)
    erros.push({ campo: "Valor", erro: "O campo 'Valor' é obrigatório" });

  if (promo == "" || promo == undefined)
    erros.push({ campo: "Promoção", erro: "O campo 'Promoção' é obrigatório" });

  if (especialidade == "" || especialidade == undefined)
    erros.push({
      campo: "Especialidade",
      erro: "O campo 'Especialidade' é obrigatório",
    });

  if (atendimento == "" || atendimento == undefined)
    erros.push({
      campo: "Atendimento",
      erro: "O campo 'Atendimento' é obrigatório",
    });

  if (
    !(
      confereHorario(atendimento.domingo) &&
      confereHorario(atendimento.segunda) &&
      confereHorario(atendimento.terca) &&
      confereHorario(atendimento.quarta) &&
      confereHorario(atendimento.quinta) &&
      confereHorario(atendimento.sexta) &&
      confereHorario(atendimento.sabado)
    )
  )
    erros.push({
      campo: "Atendimento",
      erro: "O campo 'Atendimento' é inválido",
    });

  if (reg) {
    if (!file)
      erros.push({ campo: "Imagem", erro: "O campo 'Imagem' é obrigatório" });
  }

  if (erros.length > 0) return { erros: erros };

  const infos = {
    servico: servico,
    nome: nome,
    descricao: descricao,
    sexo: sexo,
    registro: registro,
    valor: valor,
    promo: promo,
    especialidade: especialidade,
    atendimento: atendimento,
  };

  if (reg) infos.src = file.path;

  return infos;
}

function confereHorario(horario) {
  if (horario === undefined) return true;

  if (horario.entrada1 === undefined || horario.saida1 === undefined)
    return false;

  if (horario.entrada2 !== undefined) return horario.saida2 !== undefined;
  else return horario.saida2 === undefined;
}
