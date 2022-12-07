//On va importer express 
const express = require('express');

//On crée une constante pour notre application express
const app = express();

// On crée un premier middleware qui enregistre « Requête reçue ! » dans la console et passe l'exécution
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
 });

// On crée un deuxième qui ajoute un code d'état 201 à la réponse et passe l'exécution
app.use((req, res, next) => {
    res.status(201);
    next();
 });

// On crée un troisième qui envoie la réponse JSON et passe l'exécution
app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
    next();
 });

 // On crée le dernier élément de middleware qui enregistre « Réponse envoyée avec succès ! » dans la console.
app.use((req, res) => {
   console.log('Réponse envoyée avec succès');
 });


// On exporte cette constante pour pouvoir y accèder depuis les autres fichiers de notre projet (Notamment notre server node)
module.exports = app;

