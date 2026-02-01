import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemListContainer isHome={true} />} />
          <Route path="/products" element={<ItemListContainer isHome={false} />} />
          <Route path="/category/:categoryId" element={<ItemListContainer isHome={false} />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
    </Router>
  )
}

export default App