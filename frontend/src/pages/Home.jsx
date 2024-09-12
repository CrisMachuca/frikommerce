import React, { useEffect, useState } from 'react';
import Register from './Register';
import Login from './Login';
import Products from './Products';
import AddProduct from './AddProduct';
import DirectSaleProducts from './DirectSaleProducts';
import AddProductToSell from './AddProductToSell';
import Modal from './Modal';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsToSell, setProductsToSell] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const profilePicture = localStorage.getItem('profile_picture');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/products');
    const data = await response.json();
    setProducts(data);
  };
  const fetchProductsToSell = async () => {
    const response = await fetch('http://localhost:5000/direct-sale-products');
    const data = await response.json();
    setProductsToSell(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchProductsToSell();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  // Mantenemos la sesión abierta si existe el token
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('profile_picture');
    setIsLoggedIn(false);
    navigate('/')
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-indigo-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Tienda de Subastas Frikis</h1>
          <div className="flex space-x-4">
            {!isLoggedIn && (
              <>
                <button
                  className="bg-green-500 hover:text-indigo-200"
                  onClick={() => setShowLoginModal(true)}
                >
                  Iniciar Sesión
                </button>
                <button
                  className="bg-yellow-500 hover:text-indigo-200"
                  onClick={() => setShowRegisterModal(true)}
                >
                  Registro
                </button>
              </>
            )}
            {isLoggedIn && (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-400"
                >
                  Cerrar Sesión
                </button> 
              </>
            )}
          </div>
        </div>
      </nav>

      <header className="bg-indigo-500 py-8 text-center text-white">
        <h1 className="text-4xl font-bold">Bienvenido a la Tienda de Subastas Frikis</h1>
      </header>

      <div className="flex">
        {isLoggedIn && (
          <aside className="w-44 bg-white shadow-lg p-4 h-screen sticky top-0">
            <h2 className="text-2xl font-semibold mb-4">Mi Cuenta</h2>
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Foto de perfil"
                className="mt-2 w-16 h-16 rounded-full border border-gray-300"
              />
            )}
            {username && (
              <p className="mt-2 text-center text-gray-700 text-sm font-semibold">
                {username}
              </p>
            )}
            <ul className="space-y-4">
              <li>
                <Link to="/my-products" className="text-indigo-600 hover:text-indigo-400">
                  Mis Productos
                </Link>
              </li>
              <li>
                <Link to="/my-bids" className="text-indigo-600 hover:text-indigo-400">
                  Mis Pujas
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className="text-indigo-600 hover:text-indigo-400">
                  Mis Pedidos
                </Link>
              </li>
              <li>
                <Link to="/my-account" className="text-indigo-600 hover:text-indigo-400">
                  Mi Cuenta
                </Link>
              </li>
            </ul>
            <button
              onClick={handleLogout}
              className="absolute bottom-4 left-4 w-auto bg-red-500 text-white py-2 rounded-lg hover:bg-red-400"
            >
              Cerrar Sesión
            </button>
          </aside>
        )}

        <main className={`flex-1 p-8 ${isLoggedIn ? 'ml-0' : ''}`}>
          {isLoggedIn && (
            <div className="flex flex-col md:flex-row gap-6 mb-10">
              <div id="add-product" className="flex-1">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Añadir Subasta</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <AddProduct fetchProducts={fetchProducts} />
                </div>
              </div>
              <div id="add-product-to-sell" className="flex-1">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Añadir Venta</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <AddProductToSell fetchProductsToSell={fetchProductsToSell} />
                </div>
              </div>
            </div>
          )}

          <div id="products" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Productos en Subasta</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Products products={products} />
            </div>
          </div>

          <div id="productsForSale" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Compra Directa</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <DirectSaleProducts productsToSell={productsToSell} />
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-indigo-600 py-4 text-center text-white">
        <p>© 2024 Tienda de Subastas Frikis. Todos los derechos reservados.</p>
      </footer>

      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <Login onLogin={handleLogin} />
        </Modal>
      )}

      {showRegisterModal && (
        <Modal onClose={() => setShowRegisterModal(false)}>
          <Register />
        </Modal>
      )}
    </div>
  );
};

export default Home;
