import React, { useState } from 'react';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startingBid, setStartingBid] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, description, starting_bid: parseFloat(startingBid) })
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Product added successfully!');
            fetchProducts();
        } else {
            setMessage(data.error || 'Error adding product');
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Starting Bid" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} />
                <button type="submit">Add Product</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default AddProduct;
