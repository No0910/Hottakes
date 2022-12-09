// J'importe express
const express = require('express');

// Je crée un routeur
const router = express.Router();

// J'importe mon modèle 'sauce'
const Sauce = require('../models/sauce');


// Route POST
router.post('/', (req, res, next) => {
// Je crée une constante contenant la nouvelle instance de notre modèle 'sauce'
const sauce = new Sauce({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked
});
//J'enregistre cet objet dans la base de données
sauce.save().then(
    () => {
    res.status(201).json({
        message: 'Sauce enregistrée!'
    });
    }
).catch(
    (error) => {
    res.status(400).json({
        error: error
    });
    }
);
});

// Route PUT : Pour modifier/mettre à jour une sauce dans la base de données
router.put('/:id', (req, res, next) => {
    const sauce = new Sauce({
      _id: req.params.id,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      imageUrl: req.body.imageUrl,
      heat: req.body.heat,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      usersLiked: req.body.usersLiked,
      usersDisliked: req.body.usersDisliked
    });
    Sauce.updateOne({_id: req.params.id}, sauce).then(
      () => {
        res.status(201).json({
          message: 'Sauce mise à jour avec succès!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  
// Route DELETE : Pour supprimer une sauce de la base de données
router.delete('/:id', (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Sauce supprimée !'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

// Route GET : Renvoie la sauce avec l'id fourni
router.get('/:id', (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });

// Route GET : Renvoie un tableau de toutes les sauces de la base de données
router.get('/' +
  '', (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

// J'exporte le routeur de ce fichier
module.exports = router;