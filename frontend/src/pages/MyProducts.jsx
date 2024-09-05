import React, { useState, useEffect } from 'react';

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchMyProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/my-products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token en los headers
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Error al obtener los productos');
      }
    } catch (error) {
      console.error('Error en la conexión', error);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Mis Productos</h1>
      {products.length === 0 ? (
        <p>No has subido productos todavía.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="bg-white p-4 shadow rounded">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-gray-500">Precio inicial: ${product.starting_bid}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProducts;
