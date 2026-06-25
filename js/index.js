// Funciones para enviar objetos al array
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

// 🖼️ Función que se ocupa de renderizar las tarjetas de producto
const renderizarProductos = () => {
    // Buscamos el div contenedor
    const contenedor = document.getElementById("contenedor-tarjetas");
    if (!contenedor) {
        console.error("No se encontró el contenedor con id 'contenedor-tarjetas'");
        return;
    }

    // Ajuste de ruta: Si index.html está en la raíz, la ruta correcta es ./data/...
    fetch("./data/productos.json")
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
                img.src = `./${producto.img.replace("./", "")}`;
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
                    actualizarContador(obtenerCarrito());
                });

                tarjeta.appendChild(img);
                tarjeta.appendChild(titulo);
                tarjeta.appendChild(precio); // Corregido: antes decía "pr ecio"
                tarjeta.appendChild(boton);

                contenedor.appendChild(tarjeta);
            });
        })
        .catch((error) => {
            console.error("Error al cargar productos: ", error);
            contenedor.innerHTML = `<p style="color: red;">Error al cargar productos: ${error.message}</p>`;
        });
};

document.addEventListener("DOMContentLoaded", () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
    renderizarProductos();
});