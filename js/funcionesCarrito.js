import {
  guardarCarrito,
  obtenerCarrito,
  vaciarCarritoStorage,
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  carrito.push(producto);
  guardarCarrito(carrito);
  actualizarContador(carrito);
  console.log(carrito);
  mostrarMensaje("Producto agregado ");
};

export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();
  carrito.splice(indice, 1);
  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto eliminado ");
};

export const vaciarCarrito = () => {
  vaciarCarritoStorage(); // Usa la función de storage
  actualizarContador([]);
  mostrarMensaje("Carrito vaciado 🗑️");
};
