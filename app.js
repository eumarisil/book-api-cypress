const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conectar ao MongoDB
connectDB();

// Configurar as rotas da API
app.use('/api', bookRoutes);

// Definir a porta do servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
