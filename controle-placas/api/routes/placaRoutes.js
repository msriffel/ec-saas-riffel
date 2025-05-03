// placaRoutes.js
const express = require("express");
const router = express.Router();
const placaController = require("../controllers/placaController");

// Rota para listar todas as placas
router.get('/placas', placaController.carregarPlacas);

// Rota para cadastrar uma nova placa
router.post('/placas', placaController.cadastrarPlaca);

// Rota para editar uma placa existente
router.put('/placas/:id', placaController.editarPlaca);

// Rota para excluir uma placa
router.delete('/placas/:id', placaController.excluirPlaca);

// Rota para buscar uma placa por ID
router.get('/placas/:id', placaController.buscarPlacaPorId);


module.exports = router;
