const express = require("express");
const router = express.Router();

const Controller = require("../controllers/configuracaoController");

router.get("/", Controller.detalhar);
router.put("/", Controller.atualizar);

module.exports = router;
