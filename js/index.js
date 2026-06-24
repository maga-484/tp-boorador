//Funciones para enviar objetos al array
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

//🖼️Funcion que creamos que se ocupe de renderizar las tarjetas de producto
const renderizarProductos = () => {
  //Agarramos el div para meter las tarjetas
  const contenedor = document.getElementById("contenedor-tarjetas");

  if (!contenedor) {
    console.error("No se encontró el contenedor");
    return;
  }

  fetch("../data/productos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Limpiar el contenedor
      contenedor.innerHTML = "";

      data.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card", "text-dark");

        const img = document.createElement("img");
        // ✅ CORREGIDO: Ruta de imagen desde js/
        img.src = `../${producto.img.replace("./", "")}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio.toLocaleString()}`;

        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-secondary", "text-dark");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
          // ✅ Actualizar contador después de agregar
          actualizarContador(obtenerCarrito());
        });

        // Armar la estructura de la tarjeta
        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);

        //Agregamos la tarjeta al DOM
        contenedor.appendChild(tarjeta);
      });
    })
    .catch((error) => {
      console.error("Error al cargar productos:", error);
      contenedor.innerHTML = `<p style="color: red;">Error al cargar productos: ${error.message}</p>`;
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  renderizarProductos();
});
