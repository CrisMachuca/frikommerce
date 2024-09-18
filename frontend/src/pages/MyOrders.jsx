import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchMyOrders = async () => {
    const response = await fetch('http://localhost:5000/my-orders', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div>
      <Link
        to="/"
        className='inline-block mb-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-400'
      >
        Volver a inicio
      </Link>
      <h1 className="text-3xl font-semibold mb-6">Mis Pedidos</h1>
      {orders.length === 0 ? (
        <p>No tienes pedidos todavía.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="bg-white p-4 shadow rounded">
              <h2 className="text-2xl font-semibold">Pedido #{order.id}</h2>
              <p>Total: ${order.total}</p>
              <p className="text-gray-500">Fecha: {new Date(order.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
