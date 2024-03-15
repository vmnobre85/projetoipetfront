const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const Controller = require("../controllers/produtoController");

router.post("/", upload.single("file"), Controller.criar);
router.get("/", Controller.listar);
router.get("/:id", Controller.detalhar);
router.delete("/:id", Controller.deletar);
router.put("/:id", upload.single("file"), Controller.editar);

module.exports = router;
