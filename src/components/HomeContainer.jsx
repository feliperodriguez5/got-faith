import { useEffect, useState } from 'react';
import FeaturedProducts from './FeaturedProducts';

function HomeContainer() {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=4');
        const data = await response.json();
        setProductosDestacados(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setProductosDestacados([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return <FeaturedProducts productos={productosDestacados} loading={loading} />;
}

export default HomeContainer;
