import { Link } from 'react-router-dom';
import CartWidget from "./CartWidget";

function Navbar() {
  return (
    <header className='bg-blue-900 p-3 flex justify-between items-center'>
      <Link to="/" className="p-4 text-white text-xl font-bold hover:text-gray-200 transition">
        Got Faith
      </Link>
      <nav className="text-white flex items-center gap-6">
        <Link to="/category/electronics" className="hover:text-gray-200 transition">
          Electronics
        </Link>
        <Link to="/category/jewelery" className="hover:text-gray-200 transition">
          Jewelery
        </Link>
        <Link to="/category/men%27s%20clothing" className="hover:text-gray-200 transition">
          Men's Clothing
        </Link>
        <Link to="/category/women%27s%20clothing" className="hover:text-gray-200 transition">
          Women's Clothing
        </Link>
      </nav>
      <CartWidget text={'🛒 0'} />
    </header>
  );
}

export default Navbar;
