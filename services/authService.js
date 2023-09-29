const bcrypt = require("bcrypt");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Función para registrar un nuevo usuario
async function registerUser({ first_name, last_name, email, password }) {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("El correo electrónico ya está registrado.");
    }

    // Hashear la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    return { message: "Usuario registrado con éxito." };
  } catch (error) {
    throw error;
  }
}

// Función para autenticar un usuario
async function authenticateUser(email, password) {
  try {
    // Buscar al usuario por su correo electrónico
    const user = await User.findOne({ email });

    // Verificar si el usuario existe
    if (!user) {
      throw new Error("El usuario no existe.");
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta.");
    }

    // Puedes generar un token JWT aquí para la autenticación si lo necesitas

    return { message: "Autenticación exitosa", user };
  } catch (error) {
    throw error;
  }
}

// Función para enviar un correo de recuperación de contraseña
async function sendPasswordResetEmail(email) {
  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("El usuario no existe.");
    }

    // Generar un token de restablecimiento de contraseña y establecer una fecha de vencimiento
    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Expira en 1 hora

    // Guardar el usuario con el token de restablecimiento de contraseña
    await user.save();

    // Configurar el transporte de correo (debes configurar tu propio transporte)
    const transporter = nodemailer.createTransport({
      // Configuración de tu servidor de correo
    });

    // Enviar el correo con el enlace de restablecimiento de contraseña
    const resetLink = `http://tu-sitio-web.com/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: user.email,
      subject: "Restablecer contraseña",
      text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`,
    });

    return { message: "Correo de restablecimiento de contraseña enviado." };
  } catch (error) {
    throw error;
  }
}

// Función para restablecer la contraseña
async function resetPassword(token, newPassword) {
  try {
    // Buscar al usuario por el token de restablecimiento
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Token inválido o vencido.");
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña y eliminar el token de restablecimiento
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Guardar el usuario con la nueva contraseña
    await user.save();

    return { message: "Contraseña restablecida con éxito." };
  } catch (error) {
    throw error;
  }
}

// Función para generar un token de restablecimiento de contraseña (puedes usar una librería como 'crypto' para esto)
function generateResetToken() {
  // Implementa la generación de un token seguro aquí
}

module.exports = {
  registerUser,
  authenticateUser,
  sendPasswordResetEmail,
  resetPassword,
};
