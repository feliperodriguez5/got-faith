import { Link } from 'react-router-dom';

function ItemList({ productos, loading, title = null, error = null }) {
  if (loading) {
    return <div className="p-4 text-center">Cargando productos...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  if (productos.length === 0) {
    return <div className="p-4 text-center text-gray-600">No hay productos disponibles</div>;
  }

  return (
    <div className="p-4">
      {title && <h2 className="text-3xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div key={producto.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <img 
              src={producto.image || 'https://via.placeholder.com/150'} 
              alt={producto.title || 'Producto'}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="text-lg font-semibold line-clamp-2">{producto.title || 'Sin nombre'}</h3>
            <p className="text-green-600 font-bold my-2">
              ${producto.price ? parseFloat(producto.price).toFixed(2) : '0.00'}
            </p>
            <Link
              to={`/item/${producto.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Ver Detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
