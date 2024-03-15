const Produto = require("../models/Produto");
const fs = require("fs");

exports.criar = async (req, res) => {
  const prd = buildProduto(req, res, true);

  if (prd.erros) return res.status(400).json(prd.erros);

  const produto = new Produto({
    marca: prd.marca,
    nome: prd.nome,
    quantidade: prd.quantidade,
    validade: prd.validade,
    descricao: prd.descricao,
    tipo: prd.tipo,
    src: prd.src,
  });

  await produto.save();
  return res.send(produto);
};

exports.listar = async (req, res) => {
  const produtos = await Produto.find();
  return res.send(produtos);
};

exports.detalhar = async (req, res) => {
  const produto = await Produto.findById(req.params.id);
  return res.send(produto);
};

exports.editar = async (req, res) => {
  const prd = buildProduto(req, res, false);

  if (prd.erros) return res.status(400).json(prd.erros);

  Produto.findByIdAndUpdate(
    req.params.id,
    {
      marca: prd.marca,
      nome: prd.nome,
      quantidade: prd.quantidade,
      validade: prd.validade,
      descricao: prd.descricao,
      tipo: prd.tipo,
      src: prd.src,
    },
    { new: true }
  )
    .then((produto) => {
      return res.send(produto);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ error: `Erro ao atualizar o produto: ${error}` });
    });
};

exports.deletar = async (req, res) => {
  const produto = await Produto.findById(req.params.id);
  if (!produto)
    return res.status(404).json({ message: "Produto não encontrado" });

  if (produto.src) fs.unlinkSync(produto.src);
  else console.log(`${req.params.id} - Sem imagem`);
  
  await Produto.deleteOne({ _id: req.params.id });

  return res.send(produto);
};

function buildProduto(req, res, reg) {
  const data = reg ? JSON.parse(req.body.dados) : req.body;
  const file = req.file;
  const { marca, nome, quantidade, validade, descricao, tipo }= data;

  var erros = [];

  if (marca == "" || marca == undefined)
    erros.push({ campo: "Marca", erro: "O campo 'Marca' é obrigatório" });

  if (nome == "" || nome == undefined)
    erros.push({ campo: "Mome", erro: "O campo 'Mome' é obrigatório" });

  if (quantidade == "" || quantidade == undefined)
    erros.push({
      campo: "Quantidade",
      erro: "O campo 'Quantidade' é obrigatório",
    });

  if (quantidade < 0)
    erros.push({
      campo: "Quantidade",
      erro: "A 'Quantidade' deve ser maior que Zero (0)",
    });

  if (validade == "" || validade == undefined)
    erros.push({ campo: "Validade", erro: "O campo 'Validade' é obrigatório" });

  const dataAtual = new Date();
  dataAtual.setHours(dataAtual.getHours() - 3);
  if (!(new Date(validade) > dataAtual))
    erros.push({
      campo: "Validade",
      erro: "A 'Validade' deve ser maior que a data atual",
    });

  if (descricao == "" || descricao == undefined)
    erros.push({
      campo: "Descrição",
      erro: "O campo 'Descrição' é obrigatório",
    });

  if (tipo == "" || tipo == undefined)
    erros.push({ campo: "Tipo", erro: "O campo 'Tipo' é obrigatório" });

  if (reg) {
    if (!file)
      erros.push({ campo: "Imagem", erro: "O campo 'Imagem' é obrigatório" });
  }

  if (erros.length > 0) return { erros: erros };

  const infos = {
    marca: marca,
    nome: nome,
    quantidade: quantidade,
    validade: validade,
    descricao: descricao,
    tipo: tipo,
  };

  if (reg) infos.src = file.path;

  return infos;
}
