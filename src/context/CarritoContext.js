// src/context/CarritoContext.js
import { createContext, useState } from "react";

const CarritoContext = createContext();

function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarProducto = (producto) => {
    setCarrito((prevCarrito) => {
      console.log("Agregando producto:", producto);  
      const existe = prevCarrito.find((p) => p.id === producto.id);
      if (existe) {
        // Si ya existe, aumentamos cantidad
        return prevCarrito.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        // Si no existe, agregar con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Modificar cantidad de producto
  const modificarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      eliminarProducto(id);
      return;
    }
    setCarrito((prevCarrito) =>
      prevCarrito.map((p) =>
        p.id === id ? { ...p, cantidad: cantidad } : p
      )
    );
  };

  // Eliminar producto del carrito
  const eliminarProducto = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((p) => p.id !== id));
  };

  // Calcular total acumulado
  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const limpiarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        modificarCantidad,
        eliminarProducto,
        total,
        limpiarCarrito,
        setCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext, CarritoProvider };

