const express = require('express');
const router = express.Router();
const netflixSerieControlleur = require('../controllers/netflix-serie.controller.js');


router.get('/:type_titre', (req, res) => {
    netflixSerieControlleur.obtenirPageNetflix(req, res);
});

module.exports = router;