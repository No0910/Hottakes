// J'importe multer
const multer = require('multer');

// La constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

// Je crée une constante "storage" , à passer à 'multer' comme configuration, qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
// La fonction "destination" indique à 'multer' d'enregistrer les fichiers dans le dossier images
destination: (req, file, callback) => {
    callback(null, 'images');
},
// La fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier.
filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
}
});
  
  module.exports = multer({storage: storage}).single('image');