import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar";
import HomeContainer from "./components/HomeContainer";
import ItemListContainer from "./components/ItemListContainer";
import ItemListCategoryContainer from "./components/ItemListCategoryContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/products" element={<ItemListContainer />} />
        <Route path="/category/:categoryId" element={<ItemListCategoryContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
      </Routes>
    </Router>
  )
}

export default App
