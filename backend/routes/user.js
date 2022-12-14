// J'importe express
const express = require('express');
// Je crée un routeur
const router = express.Router();
// J'importe mon controlleur
const userCtrl = require('../controllers/user');

// Route POST: Pour le sign up
router.post('/signup', userCtrl.signup);
// Route POST: Pour le login
router.post('/login', userCtrl.login);

// J'exporte le routeur de ce fichier
module.exports = router;
