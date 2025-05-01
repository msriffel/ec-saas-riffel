const express = require("express");
const router = express.Router();
const placaController = require("../controllers/placaController");

const db = require('../db'); // certifique-se que o caminho está certo

router.get('/placas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM placas WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Placa não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar placa por ID:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// DELETE /api/placas/:id
router.delete('/placas/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await db.query('DELETE FROM placas WHERE id = $1 RETURNING *', [id]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Placa não encontrada para exclusão' });
      }
  
      res.json({ message: 'Placa excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir placa:', error);
      res.status(500).json({ error: 'Erro ao excluir placa' });
    }
  });

router.post("/placas", placaController.cadastrarPlaca);
router.get('/placas', placaController.listarPlacas);

module.exports = router;