import Button from "./Button";

function Navbar() {
  return (
    <header className='bg-blue-900 p-3 flex justify-between'>
      <h1 className="p-4 text-white text-xl font-bold">Got Faith</h1>
      <nav className="text-white flex items-center gap-4">
        <a href="">remeras</a>
        <a href="">pantalones</a>
        <a href="">ropa interior</a>
        <a href="">calzado</a>
      </nav>
      <Button text={'Carrito 0'} />
    </header>
  );
}

export default Navbar;
