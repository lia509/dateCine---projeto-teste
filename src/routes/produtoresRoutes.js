const express = require('express');
const router = express.Router();
const produtoresController = require('../controllers/produtoresController');

router.post('/produtores', produtoresController.createProdutores);
router.get('/produtores', produtoresController.getAllProdutores);
router.put('/produtores/:produtor_id', produtoresController.updateProdutores);
router.delete('/produtores/:produtor_id', produtoresController.deleteProdutores);
router.get('/produtores/:param', produtoresController.getProdutoresByParam);

module.exports = router;