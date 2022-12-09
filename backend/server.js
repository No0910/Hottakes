// On importe le package http de Node
const http = require('http');

// On importe notre application app.js
const app = require('./app');

// On crée la fonction normalizePort qui renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
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
const port = normalizePort(process.env.PORT || '3000');

// On précise à l'application express sur quel port elle doit tourner :
app.set('port', port);

// On crée la fonction errorHandler qui va rechercher et gérer les différents type d'erreurs possible de manière appropriée

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


// On crée notre serveur et on lui passe en argument l'application
const server = http.createServer(app);

// On crée un écouteur d'évènements qui consigne le port ou le canal nommé sur lequel le serveur s'exécute dans la console

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

