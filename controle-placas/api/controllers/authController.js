// controllers/authController.js
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// authController.js

exports.registrarUsuario = async (req, res) => {
  const { nome, email, senha, telefone, endereco } = req.body;  // Agora inclui telefone e endereco

  try {
    // Verifica se o email já está cadastrado
    const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Faz o hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Insere o novo usuário com os novos campos
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email, senha, telefone, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
      [nome, email, senhaHash, telefone, endereco]
    );

    // Exibe no terminal
    console.log("Novo usuário cadastrado:", result.rows[0]);  // Mostra os dados do novo usuário

    // Responde ao cliente com sucesso
    res.status(201).json({ success: true, message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro ao registrar usuário.' });
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (resultado.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const usuario = resultado.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login bem-sucedido!',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    // Consulta para listar todos os usuários
    const resultado = await pool.query('SELECT id, nome, email, telefone, endereco FROM usuarios');
    
    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    }

    res.json(resultado.rows);  // Retorna todos os usuários encontrados
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
};