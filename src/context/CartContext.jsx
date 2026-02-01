import { createContext, useState } from 'react';

// Crear el contexto del carrito
export const CartContext = createContext();

// Proveedor del carrito
export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto, cantidad) => {
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
      // Si ya existe, aumentar cantidad
      setCarrito(
        carrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      );
    } else {
      // Si no existe, agregar nuevo
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  // Actualizar cantidad
  const actualizarCantidad = (productoId, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(productoId);
    } else {
      setCarrito(
        carrito.map(item =>
          item.id === productoId
            ? { ...item, cantidad }
            : item
        )
      );
    }
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Cantidad total de productos
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Precio total
  const precioTotal = carrito.reduce((total, item) => total + (item.price * item.cantidad), 0);

  return (
    <CartContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      actualizarCantidad,
      vaciarCarrito,
      cantidadTotal,
      precioTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}
