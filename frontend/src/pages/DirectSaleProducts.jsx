import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DirectSaleProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/direct-sale-products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error al cargar los productos de venta directa:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Productos en Venta Directa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <h2 className="text-xl font-semibold text-indigo-600 mb-2">{product.category}</h2>
                        <h3 className="text-2xl font-semibold text-gray-900 hover:text-indigo-800 transition-colors duration-200">
                            <Link to={`/direct-sale-products/${product.id}`}>
                                {product.name}
                            </Link>
                        </h3>
                        {product.image_url && (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-48 object-contain rounded-lg mt-4"
                            />
                        )}
                        <p className="text-gray-600 mt-4">{product.description}</p>
                        <p className="text-gray-500 mt-2">
                            Precio: <span className="text-lg font-bold">${product.price}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DirectSaleProducts;
