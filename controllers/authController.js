const User = require("../models/User");
const nodemailer = require("nodemailer");

// Generar y enviar un enlace de recuperación de contraseña por correo
exports.sendPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generar un token de recuperación de contraseña (puedes usar una librería como 'crypto')
    const resetToken = "genera_un_token_unico_aqui";

    // Guardar el token en la base de datos y establecer su expiración (1 hora)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora en milisegundos
    await user.save();

    // Configurar el transporte de correo (usando nodemailer)
    const transporter = nodemailer.createTransport({
      // Configuración de transporte de correo (puedes usar Gmail, SendGrid, etc.)
    });

    // Construir el enlace de recuperación de contraseña
    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${resetToken}`;

    // Enviar el correo con el enlace de recuperación
    await transporter.sendMail({
      to: email,
      subject: "Recuperación de contraseña",
      html: `Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${resetLink}">${resetLink}</a>`,
    });

    res
      .status(200)
      .json({ message: "Correo de recuperación de contraseña enviado" });
  } catch (error) {
    console.error(
      "Error al enviar el correo de recuperación de contraseña:",
      error
    );
    res
      .status(500)
      .json({
        error: "Error al enviar el correo de recuperación de contraseña",
      });
  }
};

// Restablecer la contraseña utilizando el token
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verificar si el token es válido y aún no ha expirado
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token no válido o expirado" });
    }

    // Establecer la nueva contraseña y borrar el token de recuperación
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    res.status(500).json({ error: "Error al restablecer la contraseña" });
  }
};
