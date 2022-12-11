// J'importe express
const express = require('express');

// Je crée un routeur
const router = express.Router();

// J'importe mon controlleur
const sauceCtrl = require('../controllers/sauce');

// Route POST : Pour créer une sauce dans la base de données
router.post('/', sauceCtrl.createSauce);

// Route PUT : Pour modifier/mettre à jour une sauce dans la base de données
router.put('/:id', sauceCtrl.modifySauce);
 
// Route DELETE : Pour supprimer une sauce de la base de données
router.delete('/:id', sauceCtrl.deleteSauce);

// Route GET : Renvoie la sauce avec l'id fourni
router.get('/:id', sauceCtrl.getOneSauce );

// Route GET : Renvoie un tableau de toutes les sauces de la base de données
router.get('/', sauceCtrl.getAllSauce);

// J'exporte le routeur de ce fichier
module.exports = router;