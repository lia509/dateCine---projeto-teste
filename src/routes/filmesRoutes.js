const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController');

router.post('/filmes', filmesController.createFilmes);
router.get('/filmes', filmesController.getAllFilmes);
router.put('/filmes/:id', filmesController.updateFilmes);
router.delete('/filmes/:id', filmesController.deleteFilmes);

module.exports = router;