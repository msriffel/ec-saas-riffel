const pool = require('../db');

// Função para cadastrar uma placa
exports.cadastrarPlaca = async (req, res) => {
  const { codigo, descricao, tipo } = req.body;

  console.log('Dados recebidos:', { codigo, descricao, tipo });

  try {
    const result = await pool.query(
      'INSERT INTO placas (codigo, descricao, tipo) VALUES ($1, $2, $3) RETURNING *',
      [codigo, descricao, tipo]
    );
    console.log('Placa cadastrada:', result.rows[0]);
    res.status(201).json({ message: 'Placa cadastrada com sucesso!', placa: result.rows[0] });
  } catch (err) {
    console.error('Erro ao cadastrar placa:', err);
    res.status(500).json({ message: 'Erro ao cadastrar placa.', error: err.message });
  }
};

// Função para listar placas
exports.carregarPlacas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM placas');

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Nenhuma placa encontrada.' });
    }

    res.json({ data: result.rows });
  } catch (error) {
    console.error('Erro ao buscar placas:', error);
    res.status(500).json({ message: 'Erro ao buscar placas.' });
  }
};

// Função para excluir uma placa
exports.excluirPlaca = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM placas WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Placa não encontrada.' });
    }

    res.status(200).json({ message: 'Placa excluída com sucesso!', placa: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao excluir placa.' });
  }
};

// Função para editar uma placa
exports.editarPlaca = async (req, res) => {
  const { id } = req.params; // Pegamos o ID da placa a ser editada
  const { codigo, descricao, tipo } = req.body; // Pegamos os dados enviados para atualização

  console.log('Dados para edição:', { codigo, descricao, tipo });

  try {
    // Atualizando os dados da placa no banco de dados
    const result = await pool.query(
      'UPDATE placas SET codigo = $1, descricao = $2, tipo = $3 WHERE id = $4 RETURNING *',
      [codigo, descricao, tipo, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Placa não encontrada.' });
    }

    console.log('Placa atualizada:', result.rows[0]);
    res.json({ message: 'Placa atualizada com sucesso!', placa: result.rows[0] });
  } catch (err) {
    console.error('Erro ao editar placa:', err);
    res.status(500).json({ message: 'Erro ao editar placa.', error: err.message });
  }
};

exports.buscarPlacaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM placas WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Placa não encontrada.' });
    }

    res.json({ data: result.rows[0] });
  } catch (err) {
    console.error('Erro ao buscar placa:', err);
    res.status(500).json({ message: 'Erro ao buscar placa.' });
  }
};
