const pool = require('../db'); // Para usar o pool de conexões com o banco de dados
const PlacaModel = require("../models/placaModel");

const cadastrarPlaca = async (req, res) => {
    const { codigo, descricao, tipo } = req.body;
  
    try {
      // Inserir placa no banco
      const result = await pool.query(
        'INSERT INTO placas (codigo, descricao, tipo) VALUES ($1, $2, $3) RETURNING *',
        [codigo, descricao, tipo]
      );
  
      res.status(201).json({
        success: true,
        message: 'Placa cadastrada com sucesso!',
        placa: result.rows[0],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Erro ao cadastrar placa.' });
    }
  };

// Função para listar as placas
const listarPlacas = async (req, res) => {
    try {
      const resultado = await pool.query('SELECT * FROM placas'); // Consulta as placas no banco
      res.json({ success: true, data: resultado.rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Erro ao listar placas.' });
    }
  };
  

module.exports = { cadastrarPlaca, listarPlacas };