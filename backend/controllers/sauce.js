// J'importe ma constante 'Sauce'
const Sauce = require('../models/Sauce');
// Je crée ma constante 'fs' qui donne accès aux fonctions qui permettent de modifier le système de fichiers
const fs = require('fs');


// J'exporte la fonction createSauce pour la création d'une sauce
exports.createSauce =  (req, res, next) => {
// Je crée une constante contenant la nouvelle instance de notre modèle 'sauce': JSON.parse() transformera un objet stringifié en Object JavaScript exploitable.
const sauceObject = JSON.parse(req.body.sauce);
delete sauceObject._id;
// Je supprime le champ "_userId" de la requête envoyée par le client
delete sauceObject._userId;
const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    // Je reconstruis l'URL complète du fichier enregistré
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
});
  //J'enregistre cet objet dans la base de données
  sauce
  .save()
  .then(() => { res.status(201).json({message: 'Sauce enregistrée !'})})
  .catch(error => { res.status(400).json( { error })})
};

// J'exporte la fonction 'modifySauce' pour la modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({_id: req.params.id})
      .then((sauce) => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
              Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};


// J'exporte la fonction 'deleteSauce' pour la suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
      .then(sauce => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({message: 'Non autorisé ! '});
          } else {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Sauce.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

// J'exporte la fonction 'getOneSauce' pour la récupérer une sauce
exports.getOneSauce = (req, res, next) => {
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
  };

// J'exporte la fonction 'getAllSauce' pour récupérer toutes les sauces
exports.getAllSauce =  (req, res, next) => {
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
};
