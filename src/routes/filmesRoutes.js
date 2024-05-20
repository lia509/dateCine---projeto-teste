const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController');

router.get('/filmes', filmesController.getAllMovies);
router.get('/filmes/:param', filmesController.getMovieByParam)
router.get('/filmes/produtor_id/:produtor_id', filmesController.getAllMoviesByProductor)
router.post('/filmes', filmesController.createMovie)
router.put('/filmes/:id_filme', filmesController.updateMovie)
router.delete('/filmes/:id_filme', filmesController.deleteMovie)

module.exports = router;