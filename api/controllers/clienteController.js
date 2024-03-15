const Cliente = require("../models/Cliente");
const fs = require("fs");

exports.criar = async (req, res) => {
  const clt = buildCliente(req, res, true);

  if (clt.erros) return res.status(400).json(clt.erros);

  const cliente = new Cliente({
    nome: clt.nome,
    nomePet: clt.nomePet,
    cpf: clt.cpf,
    endereco: clt.endereco,
    racaPet: clt.racaPet,
    bairro: clt.bairro,
    telefone: clt.telefone,
    email: clt.email,
    nascimento: clt.nascimento,
    src: clt.src,
  });

  await cliente.save();
  return res.send(cliente);
};

exports.listar = async (req, res) => {
  const clientes = await Cliente.find();
  return res.send(clientes);
};

exports.detalhar = async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  return res.send(cliente);
};

exports.editar = async (req, res) => {
  const ctl = buildCliente(req, res, false);

  if (ctl.erros) return res.status(400).json(ctl.erros);

  Cliente.findByIdAndUpdate(
    req.params.id,
    {
      nome: ctl.nome,
      nomePet: ctl.nomePet,
      cpf: ctl.cpf,
      endereco: ctl.endereco,
      racaPet: ctl.racaPet,
      bairro: ctl.bairro,
      telefone: ctl.telefone,
      email: ctl.email,
      nascimento: ctl.nascimento,
    },
    { new: true }
  )
    .then((cliente) => {
      return res.send(cliente);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ error: `Erro ao atualizar o cliente: ${error}` });
    });
};

exports.deletar = async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  if (!cliente)
    return res.status(404).json({ message: "Cliente não encontrado" });

  fs.unlinkSync(cliente.src);
  await Cliente.deleteOne({ _id: req.params.id });
  return res.send(cliente);
};

function buildCliente(req, res, reg) {
  const data = reg ? JSON.parse(req.body.dados) : req.body;
  const file = req.file;
  const {
    nome,
    nomePet,
    cpf,
    endereco,
    racaPet,
    bairro,
    telefone,
    email,
    nascimento,
  } = data;
  var erros = [];

  if (nome == "")
    erros.push({ campo: "Nome", erro: "O campo 'Nome' é obrigatório" });

  if (nomePet == "")
    erros.push({
      campo: "Nome do Pet",
      erro: "O campo 'Nome do Pet' é obrigatório",
    });

  if (cpf == "" || cpf == undefined)
    erros.push({ campo: "CPF", erro: "O campo 'CPF' é obrigatório" });

  if (cpf.length < 11)
    erros.push({ campo: "CPF", erro: "O campo 'CPF' é inválido" });

  if (endereco == "" || endereco == undefined)
    erros.push({ campo: "Endereço", erro: "O campo 'Endereço' é obrigatório" });

  if (racaPet == "" || racaPet == undefined)
    erros.push({
      campo: "Raça do Pet",
      erro: "O campo 'Raça do Pet' é obrigatório",
    });

  if (bairro == "" || bairro == undefined)
    erros.push({ campo: "Bairro", erro: "O campo 'Bairro' é obrigatório" });

  if (telefone == "" || telefone == undefined)
    erros.push({ campo: "Telefone", erro: "O campo 'Telefone' é obrigatório" });

  if (telefone < 11)
    erros.push({ campo: "Telefone", erro: "O campo 'Telefone' é inválido" });

  if (email == "" || email == undefined)
    erros.push({ campo: "Email", erro: "O campo 'Email' é obrigatório" });

  if (!email.includes("@"))
    erros.push({ campo: "Email", erro: "O campo 'Email' é inválido" });

  if (nascimento == "" || nascimento == undefined)
    erros.push({
      campo: "Nascimento",
      erro: "O campo 'Nascimento' é obrigatório",
    });

  const dataAtual = new Date();
  dataAtual.setHours(dataAtual.getHours() - 3);
  if (!(new Date(nascimento) < dataAtual))
    erros.push({
      campo: "Nascimento",
      erro: "O 'Nascimento' deve ser menor que a data atual",
    });

  if (reg) {
    if (!file)
      erros.push({ campo: "Imagem", erro: "O campo 'Imagem' é obrigatório" });
  }

  if (erros.length > 0) return { erros: erros };

  const infos = {
    nome: nome,
    nomePet: nomePet,
    cpf: cpf,
    endereco: endereco,
    racaPet: racaPet,
    bairro: bairro,
    telefone: telefone,
    email: email,
    nascimento: nascimento,
  };

  if (reg) infos.src = file.path;

  return infos;
}
