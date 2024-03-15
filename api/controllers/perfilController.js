const fs = require("fs").promises;

const filePath = "./local/perfil.json";

exports.detalhar = async (req, res) => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(content);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro na leitura.");
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome, email, telefone, descricao } = req.body;

    const data = {
      nome,
      email,
      telefone,
      descricao,
    };

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro na leitura.");
  }
};
