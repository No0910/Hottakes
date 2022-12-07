// J'importe express 
const express = require ('express');
// J'importe mongoose
const mongoose = require ('mongoose');
// Je crée une constante pour l'application express
const app = express();

// Je relie mon 
mongoose.connect('mongodb+srv://nestea_93:Rc1YCEEAMCVcS0Wt@atlascluster.kswowam.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Je crée un middleware pour accèder au corps de la requête (idem que bodyparser)
app.use(express.json());

// Je crée un middleware Header pour la sécurité CORS: C'est le 1er middleware qui sera exécuté par notre serveur = middleware général
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Route POST
app.post('/api/sauces', (req, res, next) => {
  // Je contrôle notre requête au body
  console.log(req.body);
  // Je retourne une réponse avec requête 201 (code 201 = Création de ressources)
  res.status(201).json({
    message:'Objet crée !'
  });
});


// Route GET avec en 1er arguement : String de l'url visée par l'application (/api/sauces) = n point = route pour laquelle nous souhaitons enregistrer cet élément de middleware
app.get('/api/sauces', (req, res, next) => {
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

// J'exporte cette constante pour pouvoir y accèder depuis les autres fichiers de notre projet (Notamment notre server node)
module.exports = app;

