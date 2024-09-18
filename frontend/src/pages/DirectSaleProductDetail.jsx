import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const DirectSaleProductDetail = () => {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/direct-sale-products/${id}`);
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar el producto:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <h2 className="text-xl text-gray-700 mb-4">{product.category}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-2xl font-bold text-indigo-600 mb-4">${product.price}</p>
                {product.image_url && (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-64 object-contain rounded-lg mb-4"
                    />
                )}
                <Link
                    to="/"
                    className="inline-block bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-400"
                >
                    Volver a la lista
                </Link>
            </div>
        </div>
    );
};

export default DirectSaleProductDetail;
