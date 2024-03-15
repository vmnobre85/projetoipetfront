const express = require("express");
const router = express.Router();

const Controller = require("../controllers/comentarioController");

router.post("/", Controller.criar);
router.get("/", Controller.listar);

module.exports = router;
