//J'importe mon package de chiffrement bcrypt
const bcrypt = require('bcrypt');
// J'importe Jsonwebtoken
const jwt = require('jsonwebtoken');
// J'importe mon modèle de user
const User = require('../models/User');


// J'exporte ma fonction signup
exports.signup = (req, res, next) => {
    // On va hasher le mot de passe avec bcrypt
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        // On crée un nouvel utilisateur
        const user = new User({
          email: req.body.email,
          password: hash
        });
        // On enregistre le nouvel utilisateur
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// J'exporte ma fonction login
exports.login = (req, res, next) => {
    // On vérifie que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données 
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            // La fonction 'compare' de bcrypt compare le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                       userId: user._id,
                       token: jwt.sign(
                           { userId: user._id },
                           'RANDOM_TOKEN_SECRET',
                           { expiresIn: '24h' }
                       )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };