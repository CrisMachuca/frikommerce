import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Para saber qué producto se está editando
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    starting_bid: '',
    image: null, // Para almacenar la nueva imagen
  });

  const fetchMyProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/my-products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token en los headers
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Error al obtener los productos');
      }
    } catch (error) {
      console.error('Error en la conexión', error);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleEditClick = (product) => {
    setIsEditing(product.id);
    setEditForm({
      name: product.name,
      description: product.description,
      starting_bid: product.starting_bid,
      image: null, // Inicialmente sin imagen (si el usuario no selecciona una nueva)
    });
  };

  const handleSaveEdit = async (productId) => {
    const formData = new FormData();
    formData.append('name', editForm.name);
    formData.append('description', editForm.description);
    formData.append('starting_bid', editForm.starting_bid);
    if (editForm.image) {
      formData.append('image', editForm.image); // Si hay una imagen nueva, la añadimos
    }

    try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token en los headers
        },
        body: formData, // Enviar el formData
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map((product) => (product.id === productId ? updatedProduct.product : product)));
        setIsEditing(null); // Salimos del modo de edición
      } else {
        console.error('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error en la conexión', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token en los headers
        },
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId)); // Elimina el producto de la lista
      } else {
        console.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error en la conexión', error);
    }
  };

  return (
    <div>
      <Link
        to="/"
        className='inline-block mb-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-400'
      >
        Volver a inicio
      </Link>
      <h1 className="text-3xl font-semibold mb-6">Mis Productos</h1>
      {products.length === 0 ? (
        <p>No has subido productos todavía.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="bg-white p-4 shadow rounded">
              {isEditing === product.id ? (
                // Modo de edición
                <div>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="number"
                    value={editForm.starting_bid}
                    onChange={(e) => setEditForm({ ...editForm, starting_bid: e.target.value })}
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="file"
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })} // Seleccionar una nueva imagen
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  <button
                    onClick={() => handleSaveEdit(product.id)}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400"
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                // Modo de visualización
                <div>
                  <h2 className="text-2xl font-semibold">{product.name}</h2>
                  <p>{product.description}</p>
                  <p className="text-gray-500">Precio inicial: ${product.starting_bid}</p>
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-contain rounded-lg mt-4"
                    />
                  )}
                  <button
                    onClick={() => handleEditClick(product)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
                  >
                    Editar Producto
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="mt-4 ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400"
                  >
                    Eliminar Producto
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProducts;
