const mongoose = require("mongoose");
const User = require("../models/User");

class UserDAO {
  // Agregar un nuevo usuario
  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Obtener un usuario por su ID
  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Obtener un usuario por su correo electrónico
  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un usuario por su ID
  async updateUser(userId, userData) {
    try {
      const user = await User.findByIdAndUpdate(userId, userData, {
        new: true,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un usuario por su ID
  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndRemove(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserDAO();
