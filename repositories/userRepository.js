const User = require("../models/User");

// Funciones del repositorio de usuarios

// Obtener todos los usuarios
async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
}

// Obtener un usuario por su ID
async function getUserById(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
}

// Crear un nuevo usuario
async function createUser(userData) {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
}

// Actualizar un usuario por su ID
async function updateUser(userId, userData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true, // Devuelve el usuario actualizado
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

// Eliminar un usuario por su ID
async function deleteUser(userId) {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw error;
  }
}

// Exporta las funciones del repositorio de usuarios
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
