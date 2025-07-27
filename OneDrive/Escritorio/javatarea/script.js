const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
  const contenedor = document.querySelector('.contenedor-productos');
  contenedor.innerHTML = productos.map((producto, index) => `
    <div class="producto">
      <img src="${producto.img}" alt="${producto.nombre}" width="150"><br>
      <strong>${producto.nombre}</strong><br>
      <span>$${producto.precio}</span><br>
      <button class="btn-comprar" data-index="${index}">Comprar</button>
    </div>
  `).join('');

  agregarEventosDeCompra();
}

function agregarEventosDeCompra() {
  const botones = document.querySelectorAll('.btn-comprar');
  botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      const productoSeleccionado = productos[index];
      carrito.push(productoSeleccionado);
      guardarCarrito();
      mostrarCarrito();
    });
  });
}

function mostrarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total');
  
  if (!lista || !totalSpan) return; // 

  lista.innerHTML = carrito.map((item, index) => `
    <li>
      ${item.nombre} - $${item.precio}
      <button class="eliminar-item" data-index="${index}">❌</button>
    </li>
  `).join('');

  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  totalSpan.textContent = `Total: $${total}`;

  agregarEventosEliminar();
}

function agregarEventosEliminar() {
  const botonesEliminar = document.querySelectorAll('.eliminar-item');
  botonesEliminar.forEach(boton => {
    boton.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      guardarCarrito();
      mostrarCarrito();
    });
  });
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


const btnVaciar = document.getElementById("vaciar-carrito");
if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    carrito.length = 0;
    guardarCarrito();
    mostrarCarrito();
  });
}


const btnAbrirCarrito = document.getElementById("boton-carrito");
const panelCarrito = document.getElementById("carrito-flotante");
const btnCerrar = document.getElementById("cerrar-carrito");

if (btnAbrirCarrito && panelCarrito && btnCerrar) {
  btnAbrirCarrito.addEventListener("click", () => {
    panelCarrito.classList.add("activo");
  });

  btnCerrar.addEventListener("click", () => {
    panelCarrito.classList.remove("activo");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  mostrarCarrito();
});
