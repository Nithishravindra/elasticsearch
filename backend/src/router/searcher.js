const express = require('express');
const searchController = require('../controller/searchController');
const router = express.Router();

router.route('/').get(searchController.query);

module.exports = router;
