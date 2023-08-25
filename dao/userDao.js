const User = require("../models/User");

// Obtener un usuario por su correo electrónico
exports.getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by email");
  }
};

// Crear un nuevo usuario
exports.createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

// Obtener un usuario por su ID
exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Error fetching user by ID");
  }
};

// Actualizar un usuario por su ID
exports.updateUser = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

// Eliminar un usuario por su ID
exports.deleteUser = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error("Error deleting user");
  }
};
