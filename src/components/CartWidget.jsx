import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

function CartWidget() {
  const { carrito, cantidadTotal, precioTotal, eliminarDelCarrito, vaciarCarrito, actualizarCantidad } = useContext(CartContext);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  return (
    <div className="relative">
      {/* Botón del carrito */}
      <button
        onClick={() => setMostrarCarrito(!mostrarCarrito)}
        className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
      >
        🛒 {cantidadTotal}
      </button>

      {/* Dropdown del carrito */}
      {mostrarCarrito && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Mi Carrito</h3>

            {carrito.length === 0 ? (
              <p className="text-gray-600 text-center py-4">El carrito está vacío</p>
            ) : (
              <>
                {/* Lista de productos */}
                <div className="max-h-64 overflow-y-auto mb-4">
                  {carrito.map(item => (
                    <div key={item.id} className="border-b pb-3 mb-3 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm line-clamp-2">{item.title || 'Producto sin nombre'}</h4>
                          <p className="text-green-600 font-bold text-sm">
                            ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}
                          </p>
                        </div>
                        <button
                          onClick={() => eliminarDelCarrito(item.id)}
                          className="text-red-600 hover:text-red-800 ml-2"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          −
                        </button>
                        <span className="px-3">{item.cantidad}</span>
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          +
                        </button>
                        <span className="ml-auto font-bold">
                          ${item.price ? parseFloat(item.price * item.cantidad).toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total y botones */}
                <div className="border-t pt-3">
                  <div className="flex justify-between mb-4">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-green-600 text-lg">${precioTotal.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={vaciarCarrito}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-2"
                  >
                    Vaciar Carrito
                  </button>

                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Ir al Carrito
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartWidget;