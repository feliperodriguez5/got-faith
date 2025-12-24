import ProductCard from './ProductCard';

function FeaturedProducts({ productos, loading }) {
  if (loading) {
    return <div className="p-4 text-center">Cargando productos destacados...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Productos Destacados</h2>
      {productos.length === 0 ? (
        <p className="text-gray-600">No hay productos disponibles</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedProducts;
