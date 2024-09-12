import React, { useState, useEffect } from 'react';

const DirectSaleProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:5000/direct-sale-products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Productos en Venta Directa</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <li key={product.id} className="bg-white p-4 shadow-lg rounded-lg">
                        <h3 className="text-xl font-semibold text-indigo-600">{product.name}</h3>
                        <p className="mt-2 text-gray-700">{product.description}</p>
                        {product.image_url && (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-48 object-contain rounded-lg mt-4"
                            />
                        )}
                        <p className="text-gray-500 mt-2">Precio: ${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DirectSaleProducts;
