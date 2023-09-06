// userDTO.js

// Función para mapear un objeto de usuario de modelo a un objeto de transferencia de datos (DTO)
function mapToDTO(user) {
  return {
    id: user._id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    age: user.age,
    role: user.role,
  };
}

// Función para mapear un objeto de usuario de DTO a un objeto de modelo
function mapToModel(userDTO) {
  return {
    first_name: userDTO.firstName,
    last_name: userDTO.lastName,
    email: userDTO.email,
    age: userDTO.age,
    role: userDTO.role,
  };
}

module.exports = {
  mapToDTO,
  mapToModel,
};
