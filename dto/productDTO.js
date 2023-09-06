// Función para mapear un objeto modelo Product a un objeto DTO
function mapToDTO(product) {
  return {
    id: product._id, // Puedes renombrar campos según sea necesario
    title: product.title,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    thumbnails: product.thumbnails,
  };
}

// Función para mapear un objeto DTO a un objeto modelo Product
function mapToModel(productDTO) {
  return {
    title: productDTO.title,
    description: productDTO.description,
    price: productDTO.price,
    stock: productDTO.stock,
    category: productDTO.category,
    thumbnails: productDTO.thumbnails,
  };
}

module.exports = {
  mapToDTO,
  mapToModel,
};
