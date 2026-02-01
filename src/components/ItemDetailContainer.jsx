import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../firebase/db';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  // useParams obtiene itemId de la URL
  const { itemId } = useParams();
  const navigate = useNavigate();
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para cargar el producto por ID
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Usar getDoc para obtener un documento específico por ID
        const datos = await getProductById(itemId);
        
        if (datos) {
          setProducto(datos);
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [itemId]);

  return (
    <ItemDetail 
      producto={producto} 
      loading={loading} 
      error={error}
      onNavigateBack={() => navigate(-1)} 
    />
  );
}

export default ItemDetailContainer;
