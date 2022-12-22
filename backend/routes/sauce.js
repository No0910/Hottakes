// J'importe express
const express = require('express');
// Je crée un routeur
const router = express.Router();
// J'importe mon token d'authentification (hashage du mot de passe)
const auth = require('../middleware/auth');
// J'importe le multer
const multer = require('../middleware/multer-config');
// J'importe mon controlleur de sauces
const sauceCtrl = require('../controllers/sauce');

// Route POST : Pour créer une sauce dans la base de données
router.post('/', auth, multer, sauceCtrl.createSauce);
// Route PUT : Pour modifier/mettre à jour une sauce dans la base de données
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// Route DELETE : Pour supprimer une sauce de la base de données
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Route GET : Renvoie la sauce avec l'id fourni
router.get('/:id', auth, sauceCtrl.getOneSauce );
// Route GET : Renvoie un tableau de toutes les sauces de la base de données
router.get('/', auth, sauceCtrl.getAllSauce);
// Route POST: Renvoie le like ou le dislike d'un userId
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);

// J'exporte le routeur de ce fichier
module.exports = router;