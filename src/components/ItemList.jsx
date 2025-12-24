import Item from './Item';

function ItemList({ productos, loading }) {
  if (loading) {
    return <div className="p-4 text-center">Cargando productos...</div>;
  }

  if (productos.length === 0) {
    return <p className="text-gray-600">No hay productos disponibles</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default ItemList;
