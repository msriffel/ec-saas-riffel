const db = require("../db");

const PlacaModel = {
  async criarPlaca({ codigo, descricao }) {
    const query = `
      INSERT INTO placas (codigo, descricao)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [codigo, descricao];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listarPlacas() {
    const result = await db.query("SELECT * FROM placas ORDER BY id DESC");
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await db.query("SELECT * FROM placas WHERE id = $1", [id]);
    return result.rows[0];
  },

  async atualizarPlaca(id, { codigo, descricao }) {
    const query = `
      UPDATE placas
      SET codigo = $1, descricao = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [codigo, descricao, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async excluirPlaca(id) {
    await db.query("DELETE FROM placas WHERE id = $1", [id]);
  }
};

module.exports = PlacaModel;