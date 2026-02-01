import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { crearOrden } from '../firebase/db';

function Checkout() {
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    direccion: ''
  });

  const [errors, setErrors] = useState({});
  const [ordenId, setOrdenId] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!formData.edad || formData.edad < 18) {
      nuevosErrores.edad = 'Debes ser mayor de 18 años';
    }

    if (!formData.direccion.trim()) {
      nuevosErrores.direccion = 'La dirección es obligatoria';
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    if (carrito.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de comprar.');
      return;
    }

    setCargando(true);

    try {
      const idOrden = await crearOrden({
        cliente: {
          nombre: formData.nombre,
          edad: formData.edad,
          direccion: formData.direccion
        },
        productos: carrito,
        total: precioTotal,
        fecha: new Date()
      });

      setOrdenId(idOrden);
      vaciarCarrito();
    } catch (error) {
      console.error('Error al crear la orden:', error);
      alert('Error al procesar tu compra. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  if (ordenId) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-4 text-5xl">✅</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">¡Compra Realizada!</h1>
          <p className="text-gray-700 mb-6">Gracias por tu compra. Tu orden ha sido procesada correctamente.</p>
          
          <div className="bg-gray-100 rounded p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">ID de tu orden:</p>
            <p className="text-2xl font-bold text-blue-600 break-all">{ordenId}</p>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            Guarda este número para hacer seguimiento de tu pedido.
          </p>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Volver
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formulario */}
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nombre ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tu nombre completo"
                />
                {errors.nombre && (
                  <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Edad *
                </label>
                <input
                  type="number"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.edad ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tu edad"
                  min="18"
                />
                {errors.edad && (
                  <p className="text-red-600 text-sm mt-1">{errors.edad}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Dirección *
                </label>
                <textarea
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.direccion ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tu dirección de entrega"
                  rows="3"
                />
                {errors.direccion && (
                  <p className="text-red-600 text-sm mt-1">{errors.direccion}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={cargando}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
              >
                {cargando ? 'Procesando...' : 'Completar Compra'}
              </button>
            </form>

            <p className="text-gray-600 text-sm mt-4">* Campos obligatorios</p>
          </div>

          {/* Resumen del carrito */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>

            {carrito.length === 0 ? (
              <p className="text-gray-600 text-center py-8">Tu carrito está vacío</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {carrito.map(item => (
                    <div key={item.id} className="border-b pb-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                        <span className="text-gray-600">x{item.cantidad}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${item.price ? parseFloat(item.price).toFixed(2) : '0.00'} c/u</span>
                        <span className="font-semibold">${item.price ? parseFloat(item.price * item.cantidad).toFixed(2) : '0.00'}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">${precioTotal.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
