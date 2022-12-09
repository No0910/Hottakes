// J'importe express 
const express = require ('express');
// J'importe mongoose
const mongoose = require ('mongoose');
// J'importe le modèle crée
const Thing = require('./models/thing');

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

// Route POST
app.post('/api/auth/login', (req, res, next) => {
  //J'enlève le champ "userId" du corps de la requête
  delete req.body.userId;
  // Je crée une constante contenant la nouvelle instance de notre modèle 'thing'
  const thing = new Thing({
    //Je récupère l'objet du corps de la requête avec l'opérateur spread 
    ...req.body
  });
  //J'enregistre cet objet dans la base de données
  thing.save()
  .then(() => res.status(201).json({message : 'Objet enregistré !'}))
  .catch(error => res.status(400).json({error}));
});

// Je crée un middleware Header pour la sécurité CORS: C'est le 1er middleware qui sera exécuté par notre serveur = middleware général
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Route GET avec en 1er argument : String de l'url visée par l'application (/api/sauces) = n point = route pour laquelle nous souhaitons enregistrer cet élément de middleware
app.get('/api/sauces', (req, res, next) => {
    const sauces = [
      {
        userId: '',
        name: '',
        manufacturer: '',
        description: '',
        mainPepper: '',
        imageUrl: '',
        heat:'',
        likes:'',
        dislikes:'',
        usersLiked:'',
        usersDisliked:'',
      },
      {
        userId: '',
        name: '',
        manufacturer: '',
        description: '',
        mainPepper: '',
        imageUrl: '',
        heat:'',
        likes:'',
        dislikes:'',
        usersLiked:'',
        usersDisliked:'',
      },
    ];
    res.status(200).json(sauces);
  });

// J'exporte cette constante pour pouvoir y accèder depuis les autres fichiers de notre projet (Notamment notre server node)
module.exports = app;

