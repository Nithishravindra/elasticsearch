const express = require('express');
const indexController = require('../controller/indexerController')
const router = express.Router();

router.route('/:fileName').post(indexController.indexTextFile);

module.exports = router;
