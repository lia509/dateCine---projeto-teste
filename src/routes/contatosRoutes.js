const express = require('express');
const router = express.Router();
const contatosController = require('../controllers/contatosController');

router.get('/contatos', contatosController.getAllContatos);
router.get('/contatos/:param', contatosController.getContatoByParam)
router.post('/contatos', contatosController.createContato)
router.put('/contatos/:id', contatosController.updateContato)
router.delete('/contatos/:id', contatosController.deleteContato)

module.exports = router;