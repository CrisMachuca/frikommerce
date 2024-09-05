import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PlaceBid from '../pages/PlaceBid';
import Bids from '../pages/Bids';

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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className='bg-pink-500 p-6'>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>Starting Bid: ${product.starting_bid}</p>
                    <PlaceBid productId={product.id} />
                    <Bids productId={product.id} />
                    <Link to={`/`}><p>Back to the list of products</p></Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
