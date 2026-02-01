import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import CartWidget from "./CartWidget";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const categories = [
    { name: 'Todos', path: '/products' },
    { name: 'Remeras', path: '/category/remeras' },
    { name: 'Pantalones', path: '/category/pantalones' },
    { name: 'Gorras', path: '/category/gorras' },
    { name: 'Zapatos', path: '/category/zapatos' }
  ];

  const handleCategoryClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className='bg-blue-900 p-3 flex justify-between items-center'>
      <Link to="/" className="p-4 text-white text-xl font-bold hover:text-gray-200 transition">
        Got Faith
      </Link>
      <nav className="text-white flex items-center gap-6">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded transition"
          >
            Categorías ▼
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 bg-blue-800 rounded shadow-lg mt-2 w-48">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  onClick={handleCategoryClick}
                  className="block px-4 py-2 hover:bg-blue-700 first:rounded-t last:rounded-b transition"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
      <CartWidget />
    </header>
  );
}

export default Navbar;
