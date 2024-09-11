import React, { useState } from 'react';

const AddProduct = ({ fetchProducts }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startingBid, setStartingBid] = useState('');
    const [image, setImage] = useState(null); // Para almacenar la imagen
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Usamos FormData para manejar el archivo de imagen y los datos del formulario
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('starting_bid', startingBid);
        if (image) {
            formData.append('image', image); // Agregar la imagen si se seleccionó
        }

        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` // No se incluye 'Content-Type' porque FormData lo gestiona automáticamente
            },
            body: formData // Enviamos el formData con los datos y la imagen
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Product added successfully!');
            setName(''); // Limpiar los campos después de enviar
            setDescription('');
            setStartingBid('');
            setImage(null);
            fetchProducts(); // Refrescar la lista de productos después de agregar uno
        } else {
            setMessage(data.error || 'Error adding product');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Precio Inicial"
                    value={startingBid}
                    onChange={(e) => setStartingBid(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])} // Guardamos el archivo de imagen seleccionado
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

export default AddProduct;
