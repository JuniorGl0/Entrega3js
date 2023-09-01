// Obtener referencias a los elementos del carrito y los botones de eliminar
const carritoItems = document.querySelector('.carrito-items');
const carritoTotal = document.querySelector('.carrito-precio-total');
const btnPagar = document.querySelector('.btn-pagar');

// Obtener los datos de los elementos del carrito
const obtenerDatosCarrito = () => {
  const items = [];
  const carritoItemsList = carritoItems.querySelectorAll('.carrito-item');
  carritoItemsList.forEach((item) => {
    const titulo = item.querySelector('.carrito-item-titulo').textContent;
    const precio = item.querySelector('.carrito-item-precio').textContent;
    const cantidad = item.querySelector('.carrito-item-cantidad').value;
    items.push({ titulo, precio, cantidad });
  });
  return items;
};

// Actualizar el carrito de compras en el almacenamiento local
const actualizarCarritoLocalStorage = () => {
  const items = obtenerDatosCarrito();
  localStorage.setItem('carrito', JSON.stringify(items));
};

// Cargar el carrito de compras desde el almacenamiento local
const cargarCarritoDesdeLocalStorage = () => {
  const items = JSON.parse(localStorage.getItem('carrito'));
  if (items) {
    items.forEach((item) => {
      crearItemEnCarrito(item.titulo, item.precio, item.cantidad);
    });
  }
};

// Crear un nuevo item en el carrito de compras
const crearItemEnCarrito = (titulo, precio, cantidad) => {
  const nuevoItem = document.createElement('div');
  nuevoItem.classList.add('carrito-item');
  nuevoItem.innerHTML = `
    <img src="img/tractor614.jpg" width="80px" alt="" />
    <div class="carrito-item-detalles">
      <span class="carrito-item-titulo">${titulo}</span>
      <div class="selector-cantidad">
        <i class="fa-solid fa-minus restar-cantidad"></i>
        <input
          type="text"
          value="${cantidad}"
          class="carrito-item-cantidad"
          disabled
        />
        <i class="fa-solid fa-plus sumar-cantidad"></i>
      </div>
      <span class="carrito-item-precio">${precio}</span>
    </div>
    <button class="btn-eliminar">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  carritoItems.appendChild(nuevoItem);
};

// Actualizar el total del carrito de compras
const actualizarTotalCarrito = () => {
  let total = 0;
  const carritoItemsList = carritoItems.querySelectorAll('.carrito-item');
  carritoItemsList.forEach((item) => {
    const precio = item.querySelector('.carrito-item-precio').textContent;
    total += parseFloat(precio.replace('$', ''));
  });
  carritoTotal.textContent = `$${total.toFixed(2)}`;
};

// Evento de clic en el botón de eliminar
carritoItems.addEventListener('click', (event) => {
  if (event.target.classList.contains('fa-trash')) {
    const item = event.target.parentElement.parentElement;
    item.remove();
    actualizarCarritoLocalStorage();
    actualizarTotalCarrito();
  }
});

// Evento de carga de página
window.addEventListener('load', () => {
  cargarCarritoDesdeLocalStorage();
  actualizarTotalCarrito();
});

// Evento de clic en el botón de pagar
btnPagar.addEventListener('click', () => {
  const items = obtenerDatosCarrito();
  // Realizar el proceso de pago con los datos del carrito
});

// Función para agregar un item al carrito de compras
function agregarItemAlCarrito(titulo, precio, imagen) {
  crearItemEnCarrito(titulo, precio, 1);
  actualizarCarritoLocalStorage();
  actualizarTotalCarrito();
}