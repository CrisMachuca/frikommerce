import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    return (
        <div>
            <h2>Productos Disponibles</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>
                            <Link to={`/products/${product.id}`}>
                            {product.name}
                            </Link>    
                        </h3>
                        <p>{product.description}</p>
                        <p>Starting Bid: ${product.starting_bid}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
