// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para registrar usuário
router.post('/registrar', authController.registrarUsuario);

// Rota para fazer login
router.post('/login', authController.loginUsuario);

// Rota para listar todos os usuários
router.get('/usuarios', authController.listarUsuarios);

module.exports = router;