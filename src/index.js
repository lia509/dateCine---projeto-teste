require('dotenv').config();
const express = require('express');
const filmesRoutes = require('./routes/filmesRoutes');

const app = express();
const port = process.env.PORT || 3100;  // Default to 3000 if PORT is not set

app.use(express.json());

app.use('/', filmesRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}🧙🪄✨`);
});