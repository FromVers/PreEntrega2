const express = require('express');
const router = express.Router();

// Importar el modelo de producto
const Product = require('../models/Product');

// Ruta de ejemplo: Obtener todos los ejemplos
router.get('/', async (req, res) => {
  try {
    const examples = [
      { id: 1, name: 'Ejemplo 1' },
      { id: 2, name: 'Ejemplo 2' },
      { id: 3, name: 'Ejemplo 3' },
    ];
    res.json(examples);
  } catch (error) {
    console.error('Error fetching examples:', error);
    res.status(500).json({ error: 'An error occurred while fetching examples' });
  }
});

// Ruta de ejemplo: Obtener un ejemplo por su ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const example = { id, name: `Ejemplo ${id}` };
    res.json(example);
  } catch (error) {
    console.error('Error fetching example by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the example' });
  }
});

module.exports = router;
