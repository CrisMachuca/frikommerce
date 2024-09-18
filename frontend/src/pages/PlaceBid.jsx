import React, { useState } from 'react';

const PlaceBid = ({ productId }) => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/products/${productId}/bids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount: parseFloat(amount) })
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Bid placed successfully!');
        } else {
            setMessage(data.error || 'Error placing bid');
        }
    };

    return (
        <div>
            <h2>Haz una nueva puja</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Importe" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <button type="submit">Pujar</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default PlaceBid;
