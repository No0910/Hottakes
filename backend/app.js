// On va importer express 
const express = require('express');

// On crée une constante pour notre application express
const app = express();

// Middleware Header pour la sécurité CORS: C'est le 1er middleware qui sera exécuté par notre serveur = middleware général
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Méthode use avec en 1er arguement : String de l'url visée par l'application (/api/sauces) = n point = route pour laquelle nous souhaitons enregistrer cet élément de middleware
app.use('/api/sauces', (req, res, next) => {
    const sauces = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: '',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: '',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(sauces);
  });

// On exporte cette constante pour pouvoir y accèder depuis les autres fichiers de notre projet (Notamment notre server node)
module.exports = app;

