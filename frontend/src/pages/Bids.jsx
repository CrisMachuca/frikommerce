import React, { useEffect, useState } from 'react';

const Bids = ({ productId }) => {
    const [bids, setBids] = useState([]);

    useEffect(() => {
        const fetchBids = async () => {
            const response = await fetch(`http://localhost:5000/products/${productId}/bids`);
            const data = await response.json();
            setBids(data);
        };

        fetchBids();
    }, [productId]);

    return (
        <div>
            <h2>Pujas:</h2>
            <ul>
                {bids.map(bid => (
                    <li key={bid.id}>
                        <p>Importe: ${bid.amount}</p>
                        <p>Usuario: {bid.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Bids;