import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../firebase/db';
import ItemList from './ItemList';

function ItemListContainer({ isHome = false }) {
  // useParams obtiene categoryId de la URL
  const { categoryId } = useParams();
  
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para cargar productos según la categoría
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let datos = [];
        
        // Si es home, obtener todos
        if (isHome) {
          datos = await getProducts();
        }
        // Si hay categoryId en URL, filtrar por categoría (usa WHERE)
        else if (categoryId) {
          datos = await getProductsByCategory(categoryId);
        }
        // Si no hay categoría, obtener todos
        else {
          datos = await getProducts();
        }
        
        setProductos(datos);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [categoryId, isHome]);

  // Determinar título
  let titulo = '';
  if (isHome) {
    titulo = 'Productos Destacados';
  } else if (categoryId) {
    titulo = decodeURIComponent(categoryId);
  } else {
    titulo = 'Todos los Productos';
  }

  return (
    <ItemList 
      productos={productos} 
      loading={loading} 
      title={titulo}
      error={error}
    />
  );
}

export default ItemListContainer;
