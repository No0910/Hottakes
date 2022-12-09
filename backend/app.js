// J'importe express 
const express = require ('express');
// J'importe mongoose
const mongoose = require ('mongoose');
// J'importe le modèle crée
const Sauce = require('./models/sauce');

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
app.post('/api/sauces', (req, res, next) => {
  //J'enlève le champ "userId" du corps de la requête
  delete req.body._id;
  // Je crée une constante contenant la nouvelle instance de notre modèle 'sauce'
  const sauce = new Sauce({
    //Je récupère l'objet du corps de la requête avec l'opérateur spread 
    ...req.body
  });
  //J'enregistre cet objet dans la base de données
  sauce.save()
  .then(() => res.status(201).json({message : 'Sauce enregistrée !'}))
  .catch(error => res.status(400).json({error}));
});

// Je crée un middleware Header pour la sécurité CORS: C'est le 1er middleware qui sera exécuté par notre serveur = middleware général
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Route PUT : Pour modifier/mettre à jour une sauce dans la base de données
app.put('/api/sauces/:id',(req, res, next) => {
  Sauce.updateOne({_id: req.params.id},{ ...req.body, _id: req.params.id})
  .then(() => res.status(200).json({message: 'Sauce Modifiée ! '}))
  .catch( error => res.status(400).json({error}));
});

// Route DELETE : Pour supprimer une sauce de la base de données
app.delete('api/sauces/:id', (req, res, next) => {
  Sauce.deleteOne({_id: req.params.id})
  .then(() => res.status(200).json({message: 'Sauce supprimée ! '}))
  .catch(error => res.status(404).json({error}));
});

// Route GET : Renvoie la sauce avec l'id fourni
app.get('/api/sauces/:id', (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
});

// Route GET : Renvoie un tableau de toutes les sauces de la base de données
app.get('/api/sauces', (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error =>res.status(400).json({error}));
  });

// J'exporte cette constante pour pouvoir y accèder depuis les autres fichiers de notre projet (Notamment notre server node)
module.exports = app;

