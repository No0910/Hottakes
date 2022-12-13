// J'importe mongoose
const mongoose = require('mongoose');

// J'importe mongoose-unique-validator qui m'assure que deux utilisateurs ne puissent pas utiliser la même adresse e-mail
const uniqueValidator = require('mongoose-unique-validator');

// Méthode Schéma de Mongoose : Je crée un schéma de données avec la liste d'informations que mon email et mot de passe auront besoin:
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// L'élément mongoose-unique-validator passé comme plug-in, s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail
userSchema.plugin(uniqueValidator);

// J'exporte le modèle terminé: 1er argument le nom du modèle (user ici), et 2e argument le schéma de données utilisé (userSchema ici)
module.exports = mongoose.model('User', userSchema);

