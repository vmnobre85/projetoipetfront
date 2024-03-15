require("dotenv").config();
require("./db");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

const produtoRouter = require("./routes/produto");
const clienteRouter = require("./routes/cliente");
const servicoRouter = require("./routes/servico");
const comentarioRouter = require("./routes/comentario");
const configuracaoRouter = require("./routes/configuracao");
const perfilRouter = require("./routes/perfil");

app.use("/produto", produtoRouter);
app.use("/cliente", clienteRouter);
app.use("/servico", servicoRouter);
app.use("/comentario", comentarioRouter);
app.use("/configuracao", configuracaoRouter);
app.use("/perfil", perfilRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
