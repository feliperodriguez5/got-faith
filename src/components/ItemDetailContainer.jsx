import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${itemId}`);
        
        if (!response.ok) {
          setProducto(null);
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error('Error al cargar producto:', error);
        setProducto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [itemId]);

  return (
    <ItemDetail 
      producto={producto} 
      loading={loading} 
      onNavigateBack={() => navigate(-1)} 
    />
  );
}

export default ItemDetailContainer;
