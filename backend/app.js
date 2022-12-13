// J'importe express 
const express = require ('express');
// J'importe mongoose
const mongoose = require('mongoose');
// J'importe
const Sauce = require('./models/Sauce');
// J'importe le nouveau routeur crée pour les utilisateurs
const userRoutes = require('./routes/user');
// J'importe le nouveau routeur crée pour les sauces
const sauceRoutes = require('./routes/sauce');
// J'importe le cors
const cors = require('cors');

// Je relie mon api à mongoDB
mongoose.connect('mongodb+srv://nestea_93:Rc1YCEEAMCVcS0Wt@atlascluster.kswowam.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Je crée une constante pour l'application express
const app = express();

/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); */

//
app.use(cors());

// Je crée un middleware pour analyser le corps de la requête (idem que bodyparser)
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/sauce', sauceRoutes);

// J'exporte cette constante pour pouvoir y accèder depuis les autres fichiers de notre projet (Notamment notre server node)
module.exports = app;

