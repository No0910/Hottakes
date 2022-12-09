// J'importe express 
const express = require ('express');
// J'importe mongoose
const mongoose = require ('mongoose');
// J'importe le nouveau routeur crée
const sauceRoutes = require('./routes/sauce')

// Je relie mon api à mongoDB
mongoose.connect('mongodb+srv://nestea_93:Rc1YCEEAMCVcS0Wt@atlascluster.kswowam.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Je crée une constante pour l'application express
const app = express();  

// Je crée un middleware pour analyser le corps de la requête (idem que bodyparser)
app.use(express.json());

// Je crée un middleware Header pour la sécurité CORS: C'est le 1er middleware qui sera exécuté par notre serveur = middleware général
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// J'exporte cette constante pour pouvoir y accèder depuis les autres fichiers de notre projet (Notamment notre server node)
module.exports = app;

// Routes
app.use('/api/sauce', sauceRoutes);