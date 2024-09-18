import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PlaceBid from '../pages/PlaceBid';
import Bids from '../pages/Bids';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:5000/products/${id}`);
            const data = await response.json();
            setProduct(data);
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    // Calcular el tiempo restante usando dayjs
    const timeLeft = dayjs(product.end_time).fromNow(true);

    return (
        <div className="container mx-auto px-4 py-8 flex-row items-center justify-center min-h-screen bg-gray-100">
            <Link
        to="/"
        className='inline-block mb-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-400'
      >
        Volver a inicio
      </Link>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
                <h1 className="text-3xl font-bold mb-4 text-indigo-600">{product.name}</h1>

                {/* Mostrar la imagen del producto */}
                {product.image_url && (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-64 object-contain rounded-lg mb-6"
                    />
                )}

                <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                <p className="text-xl font-semibold text-gray-800 mb-6">
                    Precio Inicial: <span className="text-green-600">${product.starting_bid}</span>
                </p>
                <p>Time left: {timeLeft}</p> {/* Mostrar el tiempo restante */}

                <PlaceBid productId={product.id} />

                <div className="mt-8">
                    <Bids productId={product.id} />
                </div>

                <div className="mt-8">
                    <Link
                        to="/"
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                        Volver a la lista de productos
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
