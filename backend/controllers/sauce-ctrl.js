// J'importe ma constante 'Sauce'
const Sauce = require('../models/sauce')


// J'exporte la fonction createSauce pour la création d'une sauce
exports.createSauce =  (req, res, next) => {
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
};


// J'exporte la fonction 'modifySauce' pour la modification d'une sauce
exports.modifySauce = (req, res, next) => {
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
  };

// J'exporte la fonction 'deleteSauce' pour la suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
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
