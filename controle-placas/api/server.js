require("dotenv").config();
const express = require("express");
const cors = require("cors");

const placaRoutes = require("./routes/placaRoutes");
const authRoutes = require("./routes/authRoutes"); // Importe corretamente as rotas de autenticação

const app = express();
app.use(cors());
app.use(express.json());

// Usando as rotas de autenticação
app.use('/api/auth', authRoutes);  // Isso fará com que as rotas de autenticação fiquem acessíveis em /api/auth

// Usando as rotas de placas
app.use("/api", placaRoutes);

app.get("/api", (req, res) => {
  res.json({ success: true, serverTime: new Date() });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});