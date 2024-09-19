import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:5000/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const calculateTimeLeft = (endTime) => {
        const now = dayjs();
        const end = dayjs(endTime);
        const diff = end.diff(now); // diferencia en milisegundos

        if (diff <= 0) {
            return "Subasta terminada";
        }

        const duration = dayjs.duration(diff);

        if (duration.asHours() < 24) {
            return `${Math.floor(duration.asHours())} horas y ${duration.minutes()} minutos`;
        } else if (duration.asHours() < 48) {
            const days = Math.floor(duration.asDays());
            const hours = duration.hours();
            return `${days} día y ${hours} horas`;
        } else {
            const days = Math.floor(duration.asDays());
            const hours = duration.hours();
            return `${days} días y ${hours} horas`;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Subastas Disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <h2>{product.category}</h2>
                        <h3 className="text-xl font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                            <Link to={`/products/${product.id}`}>
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
                        <p className="text-gray-500 mt-4">Precio Inicial: <span className="text-lg font-bold">${product.starting_bid}</span></p>
                        <p className="text-red-500 mt-2">Tiempo restante: {calculateTimeLeft(product.end_time)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
