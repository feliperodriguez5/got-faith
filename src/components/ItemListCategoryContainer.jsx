import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';

function ItemListCategoryContainer() {
  const { categoryId } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/category/${categoryId}`);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoryId]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 capitalize">{decodeURIComponent(categoryId)}</h2>
      <ItemList productos={productos} loading={loading} />
    </div>
  );
}

export default ItemListCategoryContainer;
