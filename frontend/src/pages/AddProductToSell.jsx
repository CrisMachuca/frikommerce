import React, { useState } from 'react';

const AddProductToSell = () => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('category', category);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        if (image) {
            formData.append('image', image);
        }

        const response = await fetch('http://localhost:5000/direct-sale-products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Product added successfully!');
            setName('');
            setDescription('');
            setPrice('');
            setImage(null);
        } else {
            setMessage(data.error || 'Error adding product');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Agregar Producto a Venta Directa</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="" disabled>Seleccione una categoría</option>
                    <option value="Figuras">Figuras</option>
                    <option value="Consolas">Consolas</option>
                    <option value="Comics">Comics</option>
                    <option value="Accesorios de consolas">Accesorios de consolas</option>
                    <option value="Otros">Otros</option>
                </select>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500"
                >
                    Agregar Producto
                </button>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
};

export default AddProductToSell;
