import React, { useState, useEffect } from 'react';

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
    <div>
      <h1 className="text-3xl font-semibold mb-6">Mis Pujas</h1>
      {bids.length === 0 ? (
        <p>No has hecho pujas todavía.</p>
      ) : (
        <ul className="space-y-4">
          {bids.map((bid) => (
            <li key={bid.id} className="bg-white p-4 shadow rounded">
              <h2 className="text-2xl font-semibold">{bid.product_name}</h2>
              <p>Pujaste: ${bid.amount}</p>
              <p className="text-gray-500">Fecha: {new Date(bid.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBids;
