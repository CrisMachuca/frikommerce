# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# Frikommerce

## Descripción
Frikommerce es una tienda online de subastas de artículos frikis como videojuegos, figuras, y merchandising, donde los usuarios pueden tanto pujar por los productos como comprarlos directamente.

## Estructura del Proyecto

- **Frontend**: Desarrollado con React y Vite.
- **Backend**: Desarrollado con Flask, usando SQLAlchemy para la base de datos.

## Instalación

### Requisitos previos
- Node.js y npm instalados
- Python y pip instalados

### Configuración del Frontend
1. Navega a la carpeta del frontend:
   ```bash
   cd frontend
2. npm run dev
   ```

### Configuración del Backend
1. Navega a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Crea un entorno virtual:
   ```bash
   python -m venv venv
   ```
3. Activa el entorno virtual:
   ```bash
   venv\Scripts\Activate.ps1
   ```
4. ejecuta el servidor:
    python wsgi.py
4. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
5. Crea la base de datos:
   ```bash
   flask db upgrade
   ```
6. Inicia el servidor:
   ```bash
   flask run
   ```

##

## base de datos en postgreSQL

nombre de la base de datos: mi_tienda
usuario: Cristina
password: niandra85

## probar el backend en postman

http://localhost:5000/auth/register - POST
{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "testpassword"
}

http://localhost:5000/auth/login
{
    "username": "testuser",
    "password": "testpassword"
}
