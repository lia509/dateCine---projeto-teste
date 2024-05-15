const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController');

router.get('/filmes', filmesController.getAllMovies);
router.get('/filmes/:param', filmesController.getMovieByParam)
router.post('/filmes', filmesController.createMovie)
router.put('/filmes/:id', filmesController.updateMovie)
router.delete('/filmes/:id', filmesController.deleteMovie)

module.exports = router;