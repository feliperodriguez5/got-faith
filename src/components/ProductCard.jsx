import { Link } from 'react-router-dom';

function ProductCard({ producto, onViewDetail }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <img 
        src={producto.image} 
        alt={producto.title}
        className="w-full h-40 object-contain mb-2"
      />
      <h3 className="text-lg font-semibold line-clamp-2">{producto.title}</h3>
      <p className="text-green-600 font-bold my-2">${producto.price.toFixed(2)}</p>
      <Link
        to={`/item/${producto.id}`}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
      >
        Ver Detalle
      </Link>
    </div>
  );
}

export default ProductCard;
