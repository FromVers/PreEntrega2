const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/MangaStore';

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error);
});
