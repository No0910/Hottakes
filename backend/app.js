//////////////////CREATION DE L'APPLICATION////////////////////////////

// j'importe dotenv (variables d'environnement)
require('dotenv').config();
// J'importe express 
const express = require ('express');
// J'importe mongoose
const mongoose = require('mongoose');
// J'importe le nouveau routeur crée pour les sauces
const sauceRoutes = require('./routes/sauce');;
// J'importe le nouveau routeur crée pour les utilisateurs
const userRoutes = require('./routes/user');

// J'importe node.js utilitaires pour travailler avec les chemins de fichiers
const path = require('path');

// Je relie mon api à mongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Je crée une constante pour l'application express
const app = express();

// Je crée un middleware pour analyser le corps de la requête (idem que bodyparser)
app.use(express.json());

// Gestion des CORS avec des Headers spécifiques de contrôle d'accès définis
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// J'exporte cette constante pour pouvoir y accèder depuis les autres fichiers de notre projet (Notamment notre server node)
module.exports = app;
