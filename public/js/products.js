async function getProducts() {
  try {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return [];
  }
}

async function showProducts() {
  const productList = document.getElementById("product-list");
  const products = await getProducts();

  if (products && products.length > 0) {
    productList.innerHTML = "";

    products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.innerHTML = `
        <h2>${product.title}</h2>
        <p>Precio: $${product.price}</p>
        <p>Stock: ${product.stock}</p>
      `;
      productList.appendChild(productItem);
    });
  } else {
    productList.innerHTML = "<p>No hay productos disponibles.</p>";
  }
}

async function getCurrentUser() {
  try {
    const response = await fetch("/api/sessions/current", {
      credentials: "include",
    });
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error obteniendo usuario actual:", error);
    return null;
  }
}

async function showUserInfo() {
  const userInfo = document.getElementById("user-info");
  const user = await getCurrentUser();

  if (user) {
    userInfo.innerHTML = `
      <h2>Bienvenido, ${user.first_name} ${user.last_name} (${user.email})</h2>
      <p>Rol: ${user.role}</p>
    `;
  } else {
    userInfo.innerHTML = "<p>No hay usuario en la sesión.</p>";
  }
}

window.addEventListener("load", () => {
  showProducts();
  showUserInfo();
});
