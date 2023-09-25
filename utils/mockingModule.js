// mockingModule.js
const generateMockProducts = () => {
  const mockProducts = [];

  for (let i = 1; i <= 100; i++) {
    const product = {
      _id: `mocked-product-${i}`,
      title: `Mocked Product ${i}`,
      description: "This is a mocked product description.",
      price: Math.floor(Math.random() * 100) + 1,
      stock: Math.floor(Math.random() * 100) + 1,
      category: "Mocked Category",
      thumbnails: ["mocked-image-url.jpg"],
    };
    mockProducts.push(product);
  }

  return mockProducts;
};

module.exports = { generateMockProducts };
