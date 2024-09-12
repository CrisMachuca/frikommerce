import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyBids = () => {
  const [bids, setBids] = useState([]);

  const fetchMyBids = async () => {
    const response = await fetch('http://localhost:5000/my-bids', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    setBids(data);
  };

  useEffect(() => {
    fetchMyBids();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className='inline-block mb-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-400'
      >
        Volver a inicio
      </Link>
      <h1 className="text-3xl font-semibold mb-6 text-indigo-600">Mis Pujas</h1>
      {bids.length === 0 ? (
        <p className="text-gray-700">No has hecho pujas todavía.</p>
      ) : (
        <ul className="space-y-6">
          {bids.map((bid) => (
            <li key={bid.id} className="bg-white p-6 shadow-md rounded-lg flex items-center space-x-4">
              {/* Imagen del producto */}
              {bid.image_url && (
                <img
                  src={bid.image_url}
                  alt={bid.product_name}
                  className="w-32 h-32 object-contain rounded-lg"
                />
              )}
              <div>
                {/* Información del producto */}
                <h2 className="text-2xl font-semibold text-gray-800">{bid.product_name}</h2>
                <p className="text-gray-700">Pujaste: <span className="font-bold text-green-600">${bid.amount}</span></p>
                <p className="text-gray-500">Fecha: {new Date(bid.created_at).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBids;
