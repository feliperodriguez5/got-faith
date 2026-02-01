import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

function ItemCount({ producto, stock = 10 }) {
  const [count, setCount] = useState(1);
  const { agregarAlCarrito } = useContext(CartContext);

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    agregarAlCarrito(producto, count);
    setCount(1);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center border border-gray-300 rounded">
        <button
          onClick={handleDecrement}
          disabled={count === 1}
          className="px-4 py-2 disabled:opacity-50 hover:bg-gray-100"
        >
          −
        </button>
        <span className="px-6 py-2 font-semibold">{count}</span>
        <button
          onClick={handleIncrement}
          disabled={count === stock}
          className="px-4 py-2 disabled:opacity-50 hover:bg-gray-100"
        >
          +
        </button>
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={stock === 0}
        className="bg-red-900 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded flex-1"
      >
        🛒 Agregar al carrito ({count})
      </button>
    </div>
  );
}

export default ItemCount;
