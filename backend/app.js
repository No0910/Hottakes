// J'importe express 
const express = require ('express');
// J'importe mongoose
const mongoose = require('mongoose');
// J'importe le user model
const user = require('./models/user');
// J'importe la sauce model
const sauce = require('./models/sauce');
// J'importe le nouveau routeur crée pour les utilisateurs
const userRoutes = require('./routes/user');
// J'importe le nouveau routeur crée pour les sauces
const sauceRoutes = require('./routes/sauce');
// J'importe le cors
const cors = require('cors');
//
const path = require('path');

// Je relie mon api à mongoDB
mongoose.connect('mongodb+srv://nestea_93:5TX3KydLpmV1kcfb@cluste-p6.8vusb6t.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Je crée une constante pour l'application express
const app = express();


// Je crée un middleware pour analyser le corps de la requête (idem que bodyparser)
app.use(express.json());

// Routes
app.use(cors());
app.use('/api/auth', userRoutes);
app.use('/api/sauce', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// J'exporte cette constante pour pouvoir y accèder depuis les autres fichiers de notre projet (Notamment notre server node)
module.exports = app;
