// J'importe mongoose
const mongoose = require ('mongoose');

// Méthode Schéma de Mongoose : Je crée un schéma de données avec la liste d'informations que mes objets auront besoin:
const sauceSchema = mongoose.Schema({
    name : {type: String, required : true},
    manufacturer: {type: String, required : true},
    description: {type: String, required : true},
    mainPepper: {type: String, required : true},
    imageUrl:{type: String, required : true},
    heat:{type: Number, required : true},
    likes:{type: Number, required : true},
    dislikes:{type: Number, required : true},
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true},
  },
);

// J'exporte le modèle terminé: 1er argument le nom du modèle (sauce ici), et 2e argument le schéma de données utilisé (sauceSchema ici)
module.exports = mongoose.model('sauce', sauceSchema);


