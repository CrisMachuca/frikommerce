import React, { useState, useEffect } from 'react';

const MyAccount = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    profile_picture: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/my-account', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    if (newPassword) {
      formData.append('password', newPassword);
    }
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    try {
      const response = await fetch('http://localhost:5000/update-account', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMessage('Cuenta actualizada con éxito');
        fetchUserData(); // Actualizar datos después de cambiar la cuenta
      } else {
        setMessage('Error al actualizar la cuenta');
      }
    } catch (error) {
      console.error('Error updating account', error);
      setMessage('Error al actualizar la cuenta');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Mi Cuenta</h1>

      <form onSubmit={handleUpdateAccount}>
        {/* Nombre de Usuario */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Correo Electrónico */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Nueva Contraseña */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="newPassword">
            Nueva Contraseña
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Dejar en blanco para mantener la contraseña actual"
          />
        </div>

        {/* Foto de Perfil */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="profilePicture">
            Foto de Perfil
          </label>
          <input
            type="file"
            id="profilePicture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Botón de Actualizar */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500"
        >
          Actualizar Cuenta
        </button>
      </form>

      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default MyAccount;
