import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';

function ItemDetail({ producto, loading, error, onNavigateBack }) {
  if (loading) {
    return <div className="p-4 text-center">Cargando producto...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 mb-4">Producto no encontrado</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const categoryUrl = encodeURIComponent(producto.category || '');

  return (
    <div className="p-4">
      <button
        onClick={onNavigateBack}
        className="mb-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        ← Volver
      </button>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
            <img 
              src={producto.image || 'https://via.placeholder.com/300'} 
              alt={producto.title || 'Producto'}
              className="max-h-96 object-contain"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-4">{producto.title || 'Sin nombre'}</h1>
            
            {producto.category && (
              <div className="mb-4">
                <span className="text-gray-600">Categoría: </span>
                <Link
                  to={`/category/${categoryUrl}`}
                  className="text-blue-600 hover:underline capitalize"
                >
                  {producto.category}
                </Link>
              </div>
            )}

            <p className="text-2xl text-green-600 font-bold mb-4">
              ${producto.price ? parseFloat(producto.price).toFixed(2) : '0.00'}
            </p>

            {producto.description && (
              <p className="text-gray-700 mb-4">{producto.description}</p>
            )}

            {producto.rating && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Calificación:</span> ⭐ {producto.rating.rate}/5 ({producto.rating.count} opiniones)
                </p>
              </div>
            )}

            <ItemCount producto={producto} stock={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
