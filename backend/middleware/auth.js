// J'importe la dépendance dotenv
require('dotenv').config();
// J'importe Jsonwebtoken
const jwt = require('jsonwebtoken');

// Middleware qui va extraire les infos contenues dans le token
module.exports = (req, res, next) => {
    try {
        // J'extraye le token du header 'Authorization' de la requête entrante. La fonction 'split' permet de tout récupérer après l'espace dans le header
        const token = req.headers.authorization.split(' ')[1];
        // J'utilise la fonction 'verify' pour décoder le token. Si celui-ci n'est pas valide, une erreur sera générée.
        const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
        // J'extraye l'ID utilisateur du token et le rajoute à l’objet 'Request' afin que nos différentes routes puissent l’exploiter
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
     next();
    } catch(error) {
        // Affichage des erreurs générées
        res.status(401).json({ error });
    }
 };
