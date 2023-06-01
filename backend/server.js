// J'importe le fichier pour les variables d'environnements
require('dotenv').config();
// J'importe le package http de Node
const http = require('http');
// J'importe notre application app.js
const app = require('./app');
// Je crée la fonction normalizePort qui renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Stockage des variables environnement
const port = normalizePort(process.env.PORT ||'3000');
// Je précise à l'application express sur quel port elle doit tourner :
app.set('port', port);
// Je crée la fonction errorHandler qui va rechercher et gérer les différents type d'erreurs possible de manière appropriée
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Je crée le serveur et je lui passe en argument notre application
const server = http.createServer(app);

// Je crée un écouteur d'évènements qui consigne le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

