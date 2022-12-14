// J'importe express
const express = require('express');
// Je crée un routeur
const router = express.Router();
// J'importe mon token d'authentification
const auth = require('../middleware/auth');
// J'importe le multer
const multer = require('../middleware/multer-config');

// J'importe mon controlleur
const sauceCtrl = require('../controllers/sauce');

// Route GET : Renvoie un tableau de toutes les sauces de la base de données
router.get('/', auth, sauceCtrl.getAllSauce);
// Route GET : Renvoie la sauce avec l'id fourni
router.get('/:id', auth, sauceCtrl.getOneSauce );
// Route POST : Pour créer une sauce dans la base de données
router.post('/', auth, multer, sauceCtrl.createSauce);
// Route PUT : Pour modifier/mettre à jour une sauce dans la base de données
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// Route DELETE : Pour supprimer une sauce de la base de données
router.delete('/:id', auth, sauceCtrl.deleteSauce);


// J'exporte le routeur de ce fichier
module.exports = router;