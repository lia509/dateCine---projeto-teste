require('dotenv').config();
const express = require('express');
const filmesRoutes = require('./routes/filmesRoutes');
const cors = require('cors');
const contatosRoutes = require('./routes/contatosRoutes');

const app = express();
const port = process.env.PORT || 3000;  
app.use(cors({ origin: 'http://localhost:8081' }));
app.use(express.json());

app.use('/', filmesRoutes);



app.use('/', contatosRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}🧙🪄✨`);
});