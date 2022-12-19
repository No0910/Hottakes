// J'importe mongoose
const mongoose = require ('mongoose');

// Méthode Schéma de Mongoose : Je crée un schéma de données avec la liste d'informations que mes objets auront besoin:
const sauceSchema = mongoose.Schema({
    userId : {type: String, required : true},
    name : {type: String, required : true},
    manufacturer: {type: String, required : true},
    description: {type: String, required : true},
    mainPepper: {type: String, required : true},
    imageUrl:{type: String, required : true},
    heat:{type: Number, required : true},
    // Partie likes/dislikes
    likes:{type: Number, required : false, default : 0},
    dislikes:{type: Number, required : false, default : 0},
    usersLiked: { type: Array, required: false, default: []},
    usersDisliked: { type: Array, required: false, default: []},
  },
);

// J'exporte le modèle terminé: 1er argument le nom du modèle (sauce ici), et 2e argument le schéma de données utilisé (sauceSchema ici)
module.exports = mongoose.model('Sauce', sauceSchema);


